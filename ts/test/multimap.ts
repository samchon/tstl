/// <reference path="API.ts" />

namespace example
{
	export function multimap(): void
	{
		//let set: std.TreeMultiSet<number> = new std.TreeMultiSet<number>();
		//let map: std.TreeMultiMap<number, number> = new std.TreeMultiMap<number, number>();
		
		//for (let i: number = 0; i < 100; i++)
		//{
		//	let val: number = Math.floor(Math.random() * 10);

		//	set.insert(val);
		//	map.emplace(val, 1);
		//}

		//let s = set.begin();
		//for (let m = map.begin(); !m.equals(map.end()); m = m.next())
		//{
		//	console.log((s.value != m.first) ? "!" : "", s.value, m.first);
		//	s = s.next();
		//}

		let map = new std.TreeMultiMap<number, number>();
		for (let i: number = 0; i < 100; i++)
			map.emplace(1, i);

		for (let it = map.begin(); it != map.end(); it = it.next())
			console.log(it.first, it.second);
	}
}