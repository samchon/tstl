const fs = require("fs");
const os = require("os");
const process = require('child_process');

/**
 * Directory to release the API documents.
 * 
 * Specify this constant value where you want.
 */
const RELEASE_DIR = "D:/Homepage/samchon.github.io/tstl/api";

if (fs.existsSync(RELEASE_DIR))
	if (os.platform().substr(0, 3) == "win")
		process.execSync("rd " + RELEASE_DIR.split("/").join("\\") + " /S /Q");
	else
		process.execSync("rm -rf " + RELEASE_DIR);

var command = "typedoc ../lib/tstl.d.ts --target ES6 --includeDeclarations --mode file --out " + RELEASE_DIR;
process.execSync(command);
