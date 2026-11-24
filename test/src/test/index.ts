import * as cli from "cli";
import * as fs from "fs";

const EXTENSION = (() => {
  const index: number = __filename.lastIndexOf(".");
  return __filename.substring(index + 1);
})();
if (EXTENSION === "js" || EXTENSION === "mjs")
  require("source-map-support").install();

interface ICommand {
  target?: string;
  exclude?: string;
}
interface IModule {
  [key: string]: () => Promise<void>;
}

let running_test: string | undefined;

async function measure(job: () => Promise<void>): Promise<number> {
  const time: number = Date.now();
  await job();
  return Date.now() - time;
}

async function iterate(command: ICommand, path: string): Promise<number> {
  let passed = 0;
  const fileList: string[] = await fs.promises.readdir(path);
  for (const file of fileList) {
    const location: string = `${path}/${file}`;
    const stats: fs.Stats = await fs.promises.lstat(location);

    if (
      stats.isDirectory() === true &&
      file !== "internal" &&
      file !== "manual"
    ) {
      passed += await iterate(command, location);
      continue;
    } else if (
      file.substr(-(EXTENSION.length + 1)) !== `.${EXTENSION}` ||
      location === `${__dirname}/index.${EXTENSION}`
    )
      continue;

    const external: IModule = await import(location);
    for (const key in external) {
      // WHETHER TESTING TARGET OR NOT
      if (key.substr(0, 5) !== "test_") continue;
      if (command.exclude && command.exclude === key.substr(5)) continue;
      if (command.target && command.target !== key.substr(5)) continue;

      // PRINT TITLE & ELAPSED TIME
      process.stdout.write("  - " + key);

      running_test = key;
      const time: number = await measure(() => external[key]());
      running_test = undefined;
      ++passed;
      console.log(`: ${time} ms`);
    }
  }
  return passed;
}

async function main(directory: string): Promise<void> {
  //----
  // DO TEST
  //----
  console.log("==========================================================");
  console.log(" TSTL Test Automation Program");
  console.log("==========================================================");

  const command: ICommand = cli.parse();
  if (process.argv[2] && process.argv[2][0] !== "-")
    command.target = process.argv[2];

  const start = Date.now();
  const passed = await iterate(command, directory);
  if (passed === 0) throw new Error("No tests matched the selection.");
  const time = Date.now() - start;

  //----
  // TRACE BENCHMARK
  //----
  // ELAPSED TIME
  console.log("----------------------------------------------------------");
  console.log("Success");
  console.log(`  - elapsed time: ${time} ms`);

  // MEMORY USAGE
  const memory: NodeJS.MemoryUsage = process.memoryUsage();
  for (const property in memory) {
    const amount: number =
      memory[property as keyof NodeJS.MemoryUsage] / 10 ** 6;
    console.log(`  - ${property}: ${amount} MB`);
  }
  console.log("----------------------------------------------------------\n");
}
export function run_tests(directory: string): void {
  process.once("beforeExit", () => {
    if (running_test === undefined) return;
    console.error(`\nTest did not complete: ${running_test}`);
    process.exitCode = 1;
  });
  main(directory).catch((e) => {
    process.stdout.write("\n");
    console.log(e);
    process.exit(1);
  });
}

if (require.main === module) run_tests(__dirname);
