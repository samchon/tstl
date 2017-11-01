/// <reference path="../API.ts" />

namespace test
{
	export function test_lists(): void
	{
		_Test_removes();
		_Test_merges();
	}

	function _Test_removes(): void
	{
		let v = new std.Vector<number>();
		for (let i: number = 0; i < 1000; ++i)
			v.push_back(Math.random());

		_Test_remove(std.List, v);
		_Test_remove(std.ForwardList as any, v);
	}

	function _Test_remove(creator: typeof std.List, v: std.Vector<number>): void
	{
		let l = new creator(v.begin(), v.end());
		l.remove_if(_Remove_if);
		l.reverse();

		std.remove_if(v.begin(), v.end(), _Remove_if);
		if (std.equal(l.begin(), l.end(), v.rbegin()) == false)
			throw new std.DomainError("Error on std." + creator.name + ".remove_if() or its dependency.");
	}
	function _Remove_if(val: number): boolean
	{
		return val < 0.5;
	}

	function _Test_merges(): void
	{
		//----
		// PRELIMINARIES
		//----
		// SAMPLE DATA
		let v1 = new std.Vector<number>([1, 2, 3, 7, 8, 15, 16]);
		let v2 = new std.Vector<number>([5, 6, 12, 13]);

		// ARE SHUFFLED
		std.shuffle(v1.begin(), v1.end());
		std.shuffle(v2.begin(), v2.end());

		// VALIDATOR; SORTED & MERGED BY TREE-SET
		let set = new std.TreeSet<number>(v1.data());
		set.push(...v2.data());

		//----
		// VALIDATE
		//----
		_Test_merge(std.List, v1, v2, set);
		_Test_merge(std.ForwardList as any, v1, v2, set);
	}

	function _Test_merge(creator: typeof std.List, v1: std.Vector<number>, v2: std.Vector<number>, set: std.TreeSet<number>): void
	{
		// CONSTRUCT LISTS
		let l1 = new creator(v1.data());
		let l2 = new creator(v2.data());

		// SORT THEM TO MERGE
		l1.sort();
		l2.sort();

		// DO MERGE
		l1.merge(l2);

		// VALIDATE
		if ((std.equal as Function)(l1.begin(), l1.end(), set.begin()) == false)
			throw new std.DomainError("Error on std." + creator.name + ".merge() or its dependency.");
	}
}