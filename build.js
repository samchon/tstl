const fs = require("fs");
const process = require('child_process');
const minifier = require('minifier'); // "npm install -g minifier"

compile();
attach_header();
remove_dynamics();
minify();

function compile()
{
	try
	{
		process.execSync("tsc -p ts/tsconfig.json");
	}
	catch (exception) {}
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
	const REPLACES = 
	[ 
		'prev_',	// ListIterator.prev_
		'next_',	// ListIterator.next_
		'tree_',	// Tree based Map & Set Container's ::tree_
		'compare_',	// (AtomicTree|PairTree).compare_
		'data_'		// (SetContainer|MapContainer).data_
	];

	var text = fs.readFileSync(JS_FILE, "utf8");
	for (var i = 0; i < REPLACES.length; i++)
		text = text.split('["' + REPLACES[i] + '"]').join("." + REPLACES[i]);

	fs.writeFileSync(JS_FILE, text, "utf8");
}

function minify()
{
	minifier.minify("lib/typescript-stl.js");
}
