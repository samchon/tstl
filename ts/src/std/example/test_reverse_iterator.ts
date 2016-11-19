/// <reference path="../API.ts" />

namespace std.example
{
	export function test_reverse_iterator(): void
	{
		console.log("Test Reverse Iterator");
		let vec: Vector<number> = new Vector<number>([0, 1, 2, 3, 4]);
		let list: List<number> = new List(vec.begin(), vec.end());
		let deque: Deque<number> = new Deque<number>(vec.begin(), vec.end());

		let set: HashSet<number> = new HashSet<number>(vec.begin(), vec.end());
		let map: HashMap<number, number> = new HashMap([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]);

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
		reverse_iterate(map);
	}

	function reverse_iterate<T>(container: base.IContainer<T>): void
	{
		for (let it = container.rbegin(); !it.equals(container.rend()); it = it.next())
			console.log(it.value);
	}
}