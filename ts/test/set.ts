/// <reference path="API.ts" />

namespace example
{
	export function set(): void
	{
		let set: std.TreeMultiSet<number> = new std.TreeMultiSet<number>();

		// INSERTS EVEN NUMBERS
		for (let i = 0; i <= 10; i += 2)
			for (let j = 0; j < 3; j++)
				set.insert(i);

		// FIND 4 -> HAS
		console.log("Matched node: 4");
		console.log("	lower bound: " + set.lower_bound(4).value);
		console.log("	upper bound: " + set.upper_bound(4).value);
		console.log(" ");

		// FIND ODD NUMBERS -> NOT EXIST
		for (let i = 1; i <= 10; i += 2)
		{
			console.log("Mis-matched node: " + i);
			console.log("	lower bound: " + set.lower_bound(i).value);
			console.log("	upper bound: " + set.upper_bound(i).value);
			console.log(" ");
		}
	}
}