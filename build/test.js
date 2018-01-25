const cmd = require("child_process");

function main()
{
	const TEST_FILE = __dirname + "/../src/test/tsconfig.json";

	try
	{
		cmd.execSync("tsc -p " + TEST_FILE).toString("utf8");
		console.log(cmd.execSync("node " + __dirname + "/../lib/test").toString("utf8"));
	}
	catch (exp)
	{
		console.log(exp.stdout.toString());
		process.exit();
	}
}
main();