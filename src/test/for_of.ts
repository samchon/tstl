/// <reference path="API.ts" />

namespace example
{
	export function for_of(): void
	{
		let vec: std.Vector<number> = new std.Vector<number>();
		let dec: std.Deque<number> = new std.Deque<number>();
		let list: std.List<number> = new std.List<number>();
		let set: std.TreeSet<number> = new std.TreeSet<number>();

		_Fill_numbers(vec);
		_Fill_numbers(dec);
		_Fill_numbers(list);
		_Fill_numbers(set);

		let map: std.TreeMap<number, number> = new std.TreeMap<number, number>();
		map.push([1, 1], [2, 2,], [3, 3], [4, 4], [5, 5]);

		_For_of(vec);
		_For_of(dec);
		_For_of(list);
		_For_of(set);
		_For_of<std.Pair<number, number>>(map);
	}

	function _Fill_numbers(container: std.base.Container<number>): void
	{
		container.push(1, 2, 3, 4, 5);
	}

	function _For_of<T>(container: std.base.Container<T>): void
	{
		console.log(container.constructor["name"] + ": #" + container.size());
		for (let elem of container)
			console.log(elem);
	}
}