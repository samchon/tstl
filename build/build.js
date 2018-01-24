const compile = require("./compile");
const process = require("child_process");

function main()
{
	const TEST_FILE = __dirname + "/../src/test/tsconfig.json";

	process.execSync("tsc -p " + TEST_FILE);
	process.execSync("node " + __dirname + "/../lib/test");
}