/// <reference path="../API.ts" />

namespace test
{
	type P = std.Pair<number, number>

	export function test_swaps(): void
	{
		_Test_forward_list_swap();

		//----
		// TEST CONTAINERS
		//----
		// LINEARS
		_Test_container_swap("Vector", new std.Vector<P>(), new std.Vector<P>());
		_Test_container_swap("Deque", new std.Deque<P>(), new std.Deque<P>());
		_Test_container_swap("List", new std.List<P>(), new std.List<P>());

		// ASSOCIATIVES
		_Test_container_swap("HashSet", new std.HashSet<P>(), new std.HashSet<P>());
		_Test_container_swap("HashMap", new std.HashMap<number, number>(), new std.HashMap<number, number>());
	}

	function _Test_container_swap(name: string, v1: std.base.Container<P>, v2: std.base.Container<P>): void
	{
		// INSERT ITEMS ON EACH CONTAINERS
		for (let i: number = 1; i <= 3; ++i)
		{
			v1.push(std.make_pair(i, i));
			v2.push(std.make_pair(i + 3, i + 3));
		}

		// SWAP THEM
		v1.swap(v2);

		// VALIDATE CONTENTS
		let sum: number = 0;
		for (let pair of v1)
			sum += pair.first;

		if (sum != 4 + 5 + 6)
			throw new std.DomainError("Error on std." + name + ".swap(); contents.");
		else if (v1.begin().source() != v1)
			throw new std.DomainError("Error on std." + name + ".swap(); source.");
		
		// VALIDATE NEW ITEMS
		v1.push(std.make_pair(7, 7));
		v1.clear();

		if (v1.end().prev().source() != v1)
			throw new std.DomainError("Error on  std." + name + ".swap(); source of newly inserted item.");
	}

	function _Test_forward_list_swap(): void
	{
		let fl1 = new std.ForwardList<number>();
		let fl2 = new std.ForwardList<number>();

		fl1.push_front(1);
		fl2.push_front(2);

		fl1.swap(fl2);

		let first = fl2.begin();

		fl2.push_front(-1);
		let last = fl2.begin();

		if (first.value != 1 || first.source() != fl2 || last.source() != fl2)
			throw new std.DomainError("Error on ForwardList.swap().");
	}
}