/// <reference path="../API.ts" />

/// <reference path="../Vector.ts" />

namespace std.example
{
	export function test_all(): void
	{
		console.log("TEST ALL");

		for (let key in std.example)
			if (key != "test_all" && (std.example as any)[key] instanceof Function)
			{
				console.log("===================================================");
				console.log("	" + key);
				console.log("===================================================");

				(std.example as any)[key]();
			}
	}
}