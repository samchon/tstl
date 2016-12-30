/// <reference path="../API.ts" />

namespace std.example
{
	export function test_tree_map(): void
	{
		let map: TreeMap<string, number> = new std.TreeMap<string, number>();
		map.insert(["first", 1]);
		map.insert(["second", 2]);

		map.erase(map.begin());

		for (let it = map.begin(); !it.equals(map.end()); it = it.next())
			console.log(it.first, it.second);
	}
}