const cmd = require("child_process");
const Global = require("./global");

function main()
{
	const TEST_FILE = Global.TEST_PATH + "/tsconfig.json";

	try
	{
		cmd.execSync("tsc -p " + TEST_FILE).toString("utf8");
		console.log(cmd.execSync("node " + Global.RELEASE_PATH + "/test").toString("utf8"));
	}
	catch (exp)
	{
		console.log(exp.stdout.toString());
		process.exit();
	}
}
main();