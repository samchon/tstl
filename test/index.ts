const EXTENSION = __filename.substr(-2);
if (EXTENSION === "js")
    require("source-map-support").install();

import * as cli from "cli";
import * as fs from "fs";

interface ICommand
{
    target?: string;
    exclude?: string;
}
interface IModule
{
    [key: string]: () => Promise<void>;
}

async function measure(job: () => Promise<void>): Promise<number>
{
    const time: number = Date.now();
    await job();
    return Date.now() - time;
}

async function iterate(command: ICommand, path: string): Promise<void>
{
    const fileList: string[] = await fs.promises.readdir(path);
    for (const file of fileList)
    {
        const currentPath: string = `${path}/${file}`;
        const stats: fs.Stats = await fs.promises.lstat(currentPath);

        if (stats.isDirectory() === true && file !== "internal" && file !== "manual")
        {
            await iterate(command, currentPath);
            continue;
        }
        else if (file.substr(-3) !== `.${EXTENSION}` || currentPath === `${__dirname}/index.${EXTENSION}`)
            continue;

        const external: IModule = await import(currentPath.substr(0, currentPath.length - 3));
        for (const key in external)
        {
            // WHETHER TESTING TARGET OR NOT
            if (key.substr(0, 5) !== "test_")
                continue;
            if (command.exclude && command.exclude === key.substr(5))
                continue;
            if (command.target && command.target !== key.substr(5))
                continue;

            // PRINT TITLE & ELAPSED TIME
            process.stdout.write("  - " + key);

            const time: number = await measure(() => external[key]());
            console.log(`: ${time} ms`);
        }
    }
}

async function main(): Promise<void>
{
    //----
    // DO TEST
    //----
    console.log("==========================================================");
    console.log(" TSTL Test Automation Program");
    console.log("==========================================================");

    const command: ICommand = cli.parse();
    if (process.argv[2] && process.argv[2][0] !== '-')
        command.target = process.argv[2];

    const time: number = await measure(() => iterate(command, __dirname));

    //----
    // TRACE BENCHMARK
    //----
    // ELAPSED TIME
    console.log("----------------------------------------------------------");
    console.log("Success");
    console.log(`  - elapsed time: ${time} ms`);

    // MEMORY USAGE
    const memory: NodeJS.MemoryUsage = process.memoryUsage();
    for (const property in memory)
    {
        const amount: number = memory[property as keyof NodeJS.MemoryUsage] / 10**6;
        console.log(`  - ${property}: ${amount} MB`);
    }
    console.log("----------------------------------------------------------\n");
}
main().catch(e =>
{
    process.stdout.write("\n");
    console.log(e);
    
    process.exit(1);
});