const fs = require("fs");
const process = require('child_process');
const minifier = require('minifier');

const std = require('typescript-stl');
const StringUtil = require('samchon-framework').library.StringUtil;

compile();
attach_header();
remove_dynamics();
minify();

function compile()
{
	process.execSync("tsc -p ts/tsconfig.json");
}

function attach_header()
{
	const TITLE_FILE = "./ts/src/typings/typescript-stl/typescript-stl.d.ts";
	const HEADER_FILE = "./lib/typescript-stl.d.ts";

	var text = fs.readFileSync(TITLE_FILE, "utf8");
	text += fs.readFileSync(HEADER_FILE, "utf8");

	fs.writeFileSync(HEADER_FILE, text, "utf8");
}

function remove_dynamics()
{
	const JS_FILE = "./lib/typescript-stl.js";
	
	var text = fs.readFileSync(JS_FILE, "utf8");
	var dynamics = new std.HashSet(StringUtil.betweens(text, '["', '"]'));

	for (var it = dynamics.begin(); !it.equal_to(dynamics.end()); it = it.next())
	{
		if (it.value.indexOf(',') != -1)
			continue;

		var org = '["' + it.value + '"]';
		var repl = '.' + it.value;
		
		text = StringUtil.replaceAll(text, org, repl);
	}
	fs.writeFileSync(JS_FILE, text, "utf8");
}

function minify()
{
	minifier.minify("lib/typescript-stl.js");
}
