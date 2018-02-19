/// <reference path="../API.ts" />

namespace test
{
	export function test_laguerres(): void
	{
		_Test_laguerres();
	}

	function _Test_laguerres(): void
	{
		for (let i: number = 0; i < 100; ++i)
		{
			let n: number = (Math.random() < .5) ? 2 : 3;
			let m: number = Math.round(Math.random() * 100);
			let x: number = Math.random() * 100;

			let ret: number = std.assoc_laguerre(n, m, x);
			let solution: number = (n == 2) ? _Compute_l2(m, x) : _Compute_l3(m, x);

			if (similar(ret, solution) == false)
				throw new std.DomainError("Error on std.assoc_laguerre().");
		}
	}
	
	function _Compute_l2(a: number, x: number): number
	{
		return x*x/2 - (a+2)*x + (a+2)*(a+1)/2;
	}
	function _Compute_l3(a: number, x: number): number
	{
		return -x*x*x/6 + (a+3)*x*x/2 - (a+2)*(a+3)*x/2 + (a+1)*(a+2)*(a+3)/6;
	}
}
