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

	class Cube
	{
		public width: number;
		public height: number;
		public length: number;
		public x: number;
		public y: number;
		public z: number;

		public constructor()
		{
			this.width = Math.random() * 10;
			this.height = Math.random() * 10;
			this.length = Math.random() * 10;
			this.x = Math.random() * 100 - 50;
			this.y = Math.random() * 100 - 50;
			this.z = Math.random() * 100 - 50;
		}
		public get volume(): number
		{
			return this.width * this.height * this.length;
		}

		public less(obj: Cube): boolean
		{
			return this.volume < obj.volume;
		}

		public debug_size(): void
		{
			console.log(this.width, this.height, this.length + " => " + this.volume);
		}
		public debug_position(): void
		{
			console.log(this.x, this.y, this.z);
		}
	}
}