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

		// VALIDATE
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