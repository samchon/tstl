/// <reference path="API.ts" />

namespace example
{
	export function map(): void
	{
		let map: std.TreeMap<number, number> = new std.TreeMap<number, number>();
		map.emplace(1, 1);
		map.emplace(2, 2);
		map.emplace(3, 3);

		map.insert(map.end(), [4, 4]);

		for (let it = map.begin(); it != map.end(); it = it.next())
			console.log(it.first, it.second);
	}
}