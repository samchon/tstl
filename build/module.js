const fs = require("fs");
const cmd = require("child_process");
const Global = require("./global");

function compile()
{
	const STD_FILE = Global.SOURCE_PATH + "/tsconfig.json";
	
	try
	{
		// KEEP COMMENTS ONLY IN THE DECLARATION
		cmd.execSync("tsc -p " + STD_FILE);
		cmd.execSync("tsc -p " + STD_FILE + " --removeComments --declaration false");
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

	var text = fs.readFileSync(HEAD, "utf8");
	text += fs.readFileSync(BODY, "utf8");

	fs.writeFileSync(BODY, text, "utf8");
}

function remove_dynamics()
{
	const JS_FILE = Global.RELEASE_PATH + "/" + Global.FILE_NAME + ".js";
	
	var text = fs.readFileSync(JS_FILE, "utf8");
	if (text.indexOf('["') == -1)
		return;

	var dynamics = text.split('["');
	var used_keys = {};

	for (var i = 1; i < dynamics.length; i++)
	{
		if (dynamics[i].indexOf('"]') == -1)
			continue;
		
		var value = dynamics[i].substr(0, dynamics[i].indexOf('"]'));
		var org = '["' + value + '"]';
		var repl = '.' + value;

		if (value.indexOf(",") != -1)
			continue;
		else if (used_keys[value])
			continue;
		else
			used_keys[value] = true;
		
		text = text.split(org).join(repl);
	}
	fs.writeFileSync(JS_FILE, text, "utf8");
}

function main()
{
	compile();
	attach_header();
	remove_dynamics();
}
main();