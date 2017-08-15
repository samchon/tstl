/// <reference path="../API.ts" />

namespace test
{
	export function test_atomic_sorting(): void
	{
		let array: std.Vector<number> = new std.Vector<number>();
		for (let i: number = 1; i <= 15; i++)
			for (let j: number = 0; j < 3; j++)
				array.push_back(i);

		std.shuffle(array.begin(), array.end());
		std.stable_sort(array.begin(), array.end());
		
		if (std.is_sorted(array.begin(), array.end()) == false)
			throw new std.DomainError("Wrong sorting.");
	}

	export function test_object_sorting(): void
	{
		//----
		// CONSTRUCT ITEMS
		//----
		let cubes: std.Deque<Cube> = new std.Deque<Cube>();
		for (let i: number = 0; i < 20; i++)
			cubes.push_back(new Cube());

		//----
		// SORT BY Cube.less()
		//----
		// DO SORT
		std.sort(cubes.begin(), cubes.end());
		
		// VALIDATION
		if (std.is_sorted(cubes.begin(), cubes.end()) == false)
			throw new std.DomainError("Wrong sorting.");

		//----
		// SORT BY inline function
		//----
		// DECLARE INLINE FUNCTION
		let inline_function = function (left: Cube, right: Cube): boolean
		{
			if (left.x != right.x) return left.x < right.x;
			else if (left.y != right.y) return left.y < right.y;
			else return left.z < right.z;
		};

		// DO SORT
		std.sort(cubes.begin(), cubes.end(), inline_function);

		// VALIDATION
		if (std.is_sorted(cubes.begin(), cubes.end(), inline_function) == false)
			throw new std.DomainError("Wrong sorting.");
	}
}