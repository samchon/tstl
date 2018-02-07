const fs = require("fs");
const cmd = require("child_process");
const Global = require("./global");

function main()
{
	compile();
	attach_header();
	
	replace_body('["', '"]', (value) => 
	{
		return "." + value;
	});
	replace_body('eval("', '");', (value) => {return value;});
}

function compile()
{
	const TS_FILE = Global.SOURCE_PATH + "/tsconfig.json";
	
	try
	{
		// KEEP COMMENTS ONLY IN THE DECLARATION
		cmd.execSync("tsc -p " + TS_FILE);
		cmd.execSync("tsc -p " + TS_FILE + " --removeComments --declaration false");
	}
	catch (exp)
	{
		console.log(exp.stdout.toString());
		process.exit();
	}
}

function attach_header()
{
	const HEAD = Global.SOURCE_PATH + "/typings/" + Global.FILE_NAME + ".d.ts";
	const BODY = Global.RELEASE_PATH + "/" + Global.FILE_NAME + ".d.ts";

	let text = fs.readFileSync(HEAD, "utf8");
	text += fs.readFileSync(BODY, "utf8");

	fs.writeFileSync(BODY, text, "utf8");
}

function replace_body(S1, S2, changer)
{
	const JS_FILE = Global.RELEASE_PATH + "/" + Global.FILE_NAME + ".js";
	var text = fs.readFileSync(JS_FILE, "utf8");
	if (text.indexOf(S1) == -1)
		return;

	let segments = text.split(S1);
	for (let part of segments)
	{
		if (part.indexOf(S2) == -1)
			continue;

		let value = part.substr(0, part.indexOf(S2));
		let org = S1 + value + S2;
		let repl = changer(value);

		text = text.split(org).join(repl);
	}
	fs.writeFileSync(JS_FILE, text, "utf8");
}

main();