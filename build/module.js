const fs = require("fs");
const cmd = require("child_process");
const Global = require("./global");

function main()
{
	// COMPILE & EXPORT SYMBOL
	compile();
	attach_header();
	
	// REMOVE EVALS
	replace_body(content =>
	{
		let first = content.indexOf('eval("');
		let last = content.indexOf('");', first + 1);

		if (first == -1 || last == -1)
			return null;

		let repl = content.substring(first + 6, last);
		return content.substr(0, first) + repl + content.substr(last + 3);
	});

	// REMOVE DYNAMICS
	replace_body(content =>
	{
		let first = -1;

		while (true)
		{
			first = content.indexOf('["', first + 1);
			let last = content.indexOf('"]', first + 1);

			if (first == -1 || last == -1)
				return null;
			
			let repl = "." + content.substring(first + 2, last);
			if (repl.indexOf(",") != -1)
			{
				first = last;
				continue;
			}
			else
				return content.substr(0, first) + repl + content.substr(last + 2);
		}
	});
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
		process.exit(1);
	}
}

function attach_header()
{
	const HEAD = Global.SOURCE_PATH + "/typings/" + Global.FILE_NAME + ".d.ts";
	const BODY = Global.RELEASE_PATH + "/" + Global.FILE_NAME + ".d.ts";

	let content = fs.readFileSync(HEAD, "utf8");
	content += fs.readFileSync(BODY, "utf8");

	fs.writeFileSync(BODY, content, "utf8");
}

function replace_body(replacer)
{
	const JS_FILE = Global.RELEASE_PATH + "/" + Global.FILE_NAME + ".js";
	let content = fs.readFileSync(JS_FILE, "utf8");
	
	while (true)
	{
		let repl = replacer(content);
		if (repl == null)
			break;
		else
			content = repl;
	}
	fs.writeFileSync(JS_FILE, content, "utf8");
}

main();