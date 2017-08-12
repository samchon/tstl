/// <reference path="API.ts" />

namespace example
{
	export function reverse_iterator(): void
	{
		console.log("Test Reverse Iterator");
		let vec: std.Vector<number> = new std.Vector<number>([0, 1, 2, 3, 4]);
		let list: std.List<number> = new std.List(vec.begin(), vec.end());
		let deque: std.Deque<number> = new std.Deque<number>(vec.begin(), vec.end());

		let set: std.HashSet<number> = new std.HashSet<number>(vec.begin(), vec.end());
		let map: std.HashMap<number, number> = new std.HashMap([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]);

		console.log(vec.rbegin().advance(2).value, vec.end().advance(-3).value);

		console.log("Vector's Reverse Iterator");
		reverse_iterate(vec);

		console.log("List's Reverse Iterator");
		reverse_iterate(list);

		console.log("Deque's Reverse Iterator");
		reverse_iterate(deque);

		console.log("HashSet's Reverse Iterator");
		reverse_iterate(set);

		console.log("HashMap's Reverse Iterator");
		reverse_iterate<std.Pair<number, number>>(map);
	}

	function reverse_iterate<T>(container: std.base.Container<T>): void
	{
		for (let it = container.rbegin(); !it.equals(container.rend()); it = it.next())
			console.log(it.value);
	}
}