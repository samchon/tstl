import { strict as assert } from "assert";
import { spawnSync } from "child_process";
import { join } from "path";

export function test_runner_reports_unsuccessful_runs(): void {
  const runner = require.resolve("./index");
  const fixtures = join(__dirname, "internal", "fixtures");
  const options = {
    cwd: join(__dirname, "../.."),
    encoding: "utf8" as const,
    timeout: 15000,
  };
  const bootstrap = __filename.endsWith(".ts")
    ? ["-r", require.resolve("ts-node/register")]
    : [];
  const run = (target: string) => {
    const script = `
      process.argv = [process.execPath, ${JSON.stringify(
        runner,
      )}, ${JSON.stringify(target)}];
      require(${JSON.stringify(runner)}).run_tests(${JSON.stringify(fixtures)});
    `;
    return spawnSync(process.execPath, [...bootstrap, "-e", script], options);
  };
  const missing = run("missing_regression_test");
  assert.ifError(missing.error);
  assert.equal(missing.status, 1);
  assert.match(missing.stdout, /No tests matched/);

  const abandoned = run("pending");
  assert.ifError(abandoned.error);
  assert.equal(abandoned.status, 1);
  assert.match(abandoned.stderr, /Test did not complete: test_pending/);
}
