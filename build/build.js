const x = require("./module");
const y = require("./test");

const cmd = require("child_process");
cmd.execSync("minify " + __dirname + "/../lib/tstl.js");