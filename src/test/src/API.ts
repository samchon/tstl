/// <reference path="../typings/tstl.d.ts" />

eval('var std = require("./tstl")');

namespace test
{
	export async function main(): Promise<void>
	{
		await std.sleep_for(0);
		console.log("TEST ALL");
		
		for (let key in test)
		{
			if (key.indexOf("test_") != 0)
				continue;

			console.log(key);
			await test[key]();
		}
	}
}

test.main().then(() =>
{
	console.log("No error has detected.");
}).catch(error =>
{
	console.log(error);
	throw error;
});