/// <reference path="../API.ts" />

namespace test
{
	const HEAP_SZE: number = 8000;
	const SIZE: number = 10000;

	// NEED TO MODIFY HERE
	export function test_heaps(): void
	{
		let items = new std.Vector<number>();
		for (let i: number = 0; i < SIZE; ++i)
			items.push_back(Math.random());

		let first: std.Vector.Iterator<number> = items.begin();
		let last: std.Vector.Iterator<number> = items.begin().advance(HEAP_SZE);

		std.sort_heap(first, last);
		if (std.is_sorted(first, last) == false)
			throw new std.DomainError("Error on heaps of algorithms.");
	}
}