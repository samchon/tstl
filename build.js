const fs = require("fs");
const FILE = "lib/typescript-stl.js";

var text = fs.readFileSync(FILE, "utf8");
const replaces = 
[
	{first: 'this["data_"]', second: 'this.data_'}
];

//for (var i = 0; i < replaces.length; i++)
	//text = text.split(replaces[i].first).join(replaces[i].second);

fs.writeFileSync(FILE, "utf8");