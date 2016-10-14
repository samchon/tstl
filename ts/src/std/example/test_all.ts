/// <reference path="../API.ts" />

/// <reference path="../Vector.ts" />

std.VectorIterator.prototype.valueOf = function ()
{
	return this.index;
}

namespace std.example
{
	export function test_all(): void
	{
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