/// <reference path="API.ts" />

namespace example
{
	export function algorithm(): void
	{
		let array: std.Vector<number> = new std.Vector<number>();
		for (let i: number = 1; i <= 15; i++)
			for (let j: number = 0; j < 3; j++)
				array.push_back(i);

		std.shuffle(array.begin(), array.end());
		std.stable_sort(array.begin(), array.end());
		
		console.log(std.is_sorted(array.begin(), array.end()));
		console.log(array.data());
	}
}