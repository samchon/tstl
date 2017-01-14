/// <reference path="../API.ts" />

/// <reference path="../Vector.ts" />

namespace example
{
	export function test_all(): void
	{
		console.log("TEST ALL");
		
		for (let key in example)
			if (key != "test_all" && (example as any)[key] instanceof Function)
			{
				console.log("===================================================");
				console.log("	" + key);
				console.log("===================================================");

				(example as any)[key]();
			}
	}
}