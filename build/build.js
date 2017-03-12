const fs = require("fs");
const process = require('child_process');

compile();
attach_header();
remove_dynamics();
test();
minify();

function compile()
{
	// KEEP COMMENTS ONLY IN THE DECLARATION
	process.execSync("tsc -p ../src/std/tsconfig.json");
	process.execSync("tsc -p ../src/std/tsconfig.json --removeComments --declaration false");

	// TESTING UNIT
	process.execSync("tsc -p ../src/test/tsconfig.json");
}

function attach_header()
{
	const TITLE_FILE = "../src/std/typings/tstl/tstl.d.ts";
	const HEADER_FILE = "../lib/tstl.d.ts";

	var text = fs.readFileSync(TITLE_FILE, "utf8");
	text += fs.readFileSync(HEADER_FILE, "utf8");

	fs.writeFileSync(HEADER_FILE, text, "utf8");
}

function remove_dynamics()
{
	const JS_FILE = "../lib/tstl.js";
	
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

function test()
{
	process.execSync("node ../src/test/test");
}

function minify()
{
	process.execSync("minify ../lib/tstl.js");
}
