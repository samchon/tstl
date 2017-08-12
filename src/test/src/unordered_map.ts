/// <reference path="API.ts" />

namespace example
{
	export function unordered_map(): void
	{
		let map: std.HashMap<string, number> = new std.HashMap<string, number>();
		map.insert(["first", 1]);
		map.insert(["second", 2]);

		for (let it = map.begin(); !it.equals(map.end()); it = it.next())
			console.log(it.first, it.second);
	}
}