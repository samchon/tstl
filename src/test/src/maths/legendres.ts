/// <reference path="../API.ts" />

namespace test
{	
	export function test_legendres(): void
	{
		_Test_legendres();
		_Test_assoc_legendres();
	}

	function _Test_legendres(): void
	{
		const funcs: Array<(x: number) => number> = 
		[
			<any>_Compute_l0,
			_Compute_l1,
			_Compute_l2,
			_Compute_l3,
			_Compute_l4
		];

		for (let n: number = 0; n <= 4; ++n)
			for (let i: number = 0; i < 100; ++i)
			{
				let x: number = Math.random();
				
				let solution: number = funcs[n](x);
				let ret: number = std.legendre(n, x);

				if (similar(solution, ret) == false)
					throw new std.DomainError("Error on std.legendre().");
			}
	}

	function _Test_assoc_legendres(): void
	{
		let solutions: number[] = [-.125, -1.29904, 2.25];
		let results: number[] = 
		[
			std.assoc_legendre(2, 0, .5),
			std.assoc_legendre(2, 1, .5),
			std.assoc_legendre(2, 2, .5)
		];

		if (std.equal(std.begin(solutions), std.end(solutions), std.begin(results), similar) == false)
			throw new std.DomainError("Error on std.assoc_legendre().");
	}

	function _Compute_l0(): number
	{
		return 1;
	}
	function _Compute_l1(x: number): number
	{
		return x;
	}
	function _Compute_l2(x: number): number
	{
		return .5 * (3*x*x - 1);
	}
	function _Compute_l3(x: number): number
	{
		return .5 * (5*x*x*x - 3*x);
	}
	function _Compute_l4(x: number): number
	{
		return 1/8*(35*Math.pow(x, 4) - 30*x*x + 3);
	}
}