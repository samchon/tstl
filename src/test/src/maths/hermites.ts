/// <reference path="../API.ts" />

namespace test
{
	export function test_hermites(): void
	{
		let funcs: Array<(x: number) => number> = 
		[
			_Compute_h0,
			_Compute_h1,
			_Compute_h2,
			_Compute_h3,
			_Compute_h4
		];
		for (let n: number = 0; n <= 4; ++n)
			for (let i: number = 0; i < 100; ++i)
			{
				let x: number = Math.random() * 100.0;

				let solution: number = funcs[n](x);
				let ret: number = std.hermite(n, x);

				if (similar(solution, ret) == false)
					throw new std.DomainError("Error on std.hermite().");
			}
	}

	function _Compute_h0(): number
	{
		return 1;
	}
	function _Compute_h1(x: number): number
	{
		return 2 * x;
	}
	function _Compute_h2(x: number): number
	{
		return 4*x*x - 2;
	}
	function _Compute_h3(x: number): number
	{
		return 8*x*x*x - 12*x;
	}
	function _Compute_h4(x: number): number
	{
		return 16*Math.pow(x, 4) - 48*x*x + 12;
	}
}