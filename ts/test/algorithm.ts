/// <reference path="API.ts" />

namespace example
{
	export function algorithm(): void
	{
		let array: std.Vector<number> = new std.Vector<number>();
		for (let i: number = 1; i <= 15; i++)
			array.push_back(i);

		console.log(array.data());
		std.shuffle(array.begin(), array.end());
		console.log(array.data());
	}
}