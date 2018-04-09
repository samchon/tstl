/// <reference path="../API.ts" />

namespace test
{
	export function test_randoms(): void
	{
		_Test_rand_ints();
		_Test_samples();
	}

	function _Test_rand_ints(): void
	{
		for (let i: number = 0; i < 100 * 100; ++i)
		{
			let x: number = Math.floor(Math.random() * 100);
			let y: number = Math.floor(Math.random() * 100);

			if (x > y)	[x, y] = [y, x];

			let rand: number = std.randint(x, y);
			if (rand < x || rand > y)
				throw new std.DomainError("Error on std.experimantal.randint().");
		}
	}

	function _Test_samples(): void
	{
		for (let i: number = 0; i < 100 * 100; ++i)
		{
			let size: number = std.randint(10, 100);
			let populations: std.Vector<number> = _Generate_populations(size);

			let n: number = Math.min(size, std.randint(5, 20));
			let samples: std.Vector<number> = new std.Vector();

			std.sample(populations.begin(), populations.end(), std.back_inserter(samples), n);
			if (std.is_sorted(samples.begin(), samples.end()) === false)
				throw new std.DomainError("Error on std.sample(); Elements are not sorted.");
			
			samples.erase(std.unique(samples.begin(), samples.end()), samples.end());
			if (samples.size() !==n)
				throw new std.DomainError("Error on std.sample(); Elements are not unique.");
		}
	}

	function _Generate_populations(size: number): std.Vector<number>
	{
		let ret: std.Vector<number> = new std.Vector(size, 0);
		for (let i: number = 0; i < ret.size(); ++i)
			ret.set(i, i);

		return ret;
	}
}