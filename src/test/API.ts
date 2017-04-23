/// <reference path="../../lib/tstl.d.ts" />

eval('var std = require("../../lib/tstl")');

namespace example
{
	export function main(): void
	{
		console.log("TEST ALL");
		
		for (let key in example)
			if (key != "main" && (example as any)[key] instanceof Function)
			{
				console.log("===================================================");
				console.log("	" + key);
				console.log("===================================================");

				(example as any)[key]();
				console.log("\n");
			}
	}
}
module.exports = example;