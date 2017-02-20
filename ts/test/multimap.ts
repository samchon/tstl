/// <reference path="API.ts" />

namespace example
{
	export function multimap(): void
	{
		const LAST = 10;
		const REPEAT = 1000;

		let map = new std.TreeMultiMap<number, number>();
		for (let i: number = 0; i < LAST; i++)
			for (let j: number = 0; j < REPEAT; j++)
				map.emplace(i, j);

		for (let i: number = 0; i < LAST; i++)
		{
			let it = map.find(i);
			console.log(it.first, it.second);

			if (it.second != 0)
				throw new std.DomainError("Invalid sorting.");
		}
	}
}