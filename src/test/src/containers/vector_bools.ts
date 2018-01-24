/// <reference path="../API.ts" />

namespace test
{
	export function test_vector_bools(): void
	{
		for (let k: number = 0; k < 100; ++k)
			_Test_vector_bool();
	}

	function _Test_vector_bool(): void
	{
		// ASSIGN INITIAL-ELEMENTS
		let x = new std.Vector(100, _Generate_random_bool());
		let y = new std.experiments.VectorBool(x.begin(), x.end());	

		// CHANGE VALUES RANDOMLY
		for (let i: number = 0; i < 100; ++i)
		{
			// GENERATE INDEX & VALUE
			let index: number = _Generate_random_between(0, 99);
			let value: boolean = _Generate_random_bool();

			// DO CHANGE
			x.set(index, value);
			y.set(index, value);
		}

		// REPEAT MASS DELETIONS AND INSERTIONS
		console.log("----------------------------------------");
		for (let i: number = 0; i < 100; ++i)
		{
			// ERASE ELEMENTS
			let first_index: number = _Generate_random_between(0, x.size());
			let last_index: number = _Generate_random_between(first_index + 1, x.size());
			
			x.erase(x.begin().advance(first_index), x.begin().advance(last_index));
			y.erase(y.begin().advance(first_index), y.begin().advance(last_index));
			
			// INSERT ELEMENTS
			let index: number = _Generate_random_between(0, 99);
			let size: number = last_index - first_index;
			let value: boolean = _Generate_random_bool();

			x.insert(x.begin().advance(index), size, value);
			y.insert(y.begin().advance(index), size, value);

			console.log(first_index, last_index);
		}

		// VALIDATE
		console.log("Sizes:" + x.size(), y.size());
		console.log("----------------------------------------");

		if (std.equal(x.begin(), x.end(), y.begin()) == false)
			throw new std.DomainError("vector_bool is invalid.");
	}

	function _Generate_random_between(x, y)
	{
		let ret = Math.random() * (y - x);
		return Math.round(ret) + x;
	}

	function _Generate_random_bool()
	{
		return (Math.random() < .5) ? false : true;
	}
}