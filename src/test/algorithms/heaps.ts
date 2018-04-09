/// <reference path="../API.ts" />

namespace test
{
	export function test_heaps(): void
	{
		for (let i: number = 0; i < 100; ++i)
		{
			let elems: std.Vector<number> = _Create_elements();
			std.make_heap(elems.begin(), elems.end());

			if (std.is_heap(elems.begin(), elems.end()) === false)
				throw new std.DomainError("Error on std.push_heap() or std.is_heap().");

			std.sort_heap(elems.begin(), elems.end());
			if (std.is_sorted(elems.begin(), elems.end()) === false)
				throw new std.DomainError("Error on std.pop_heap().");
		}
	}

	function _Create_elements(): std.Vector<number>
	{
		let ret: std.Vector<number> = new std.Vector();
		let size: number = std.randint(20, 80);

		for (let i: number = 0; i < size; ++i)
			ret.push_back(Math.random() * 100.0);

		return ret;
	}
}