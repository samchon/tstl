/// <reference path="../API.ts" />

namespace std.example
{
	export function test_anything(): void
	{
		let map: std.HashMap<string, number> = new std.HashMap<string, number>();
		map.insert(["samchon", 1]);
		map.insert(["FireFox", 2]);

		console.log(map.has("samchon"), "#" + map.size());
		for (let it = map.begin(); !it.equal_to(map.end()); it = it.next())
			console.log(it.first);

		map.erase("samchon");
		console.log(map.has("samchon"), "#" + map.size());
		for (let it = map.begin(); !it.equal_to(map.end()); it = it.next())
			console.log(it.first);

		console.log("first item", map.begin().first);
		console.log("last item", map.rbegin().first);

		/* --------------------------------------------------------- */

		//let list: std.List<string> = new std.List<string>();
		//list.push_back("samchon");
		//list.push_back("FireFox");

		//console.log("#" + list.size());

		//list.erase(list.begin());
		//console.log("#" + list.size());

		//for (let it = list.begin(); !it.equal_to(list.end()); it = it.next())
		//	console.log(it.value);
	}
}