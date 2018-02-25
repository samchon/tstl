/// <reference path="../API.ts" />

namespace std
{
	export function laguerre(n: number, x: number): number
	{
		return assoc_laguerre(n, 0, x);
	}

	export function assoc_laguerre(n: number, m: number, x: number): number
	{
		// VALIDATE PARAMETERS
		if (Math.floor(n) != n || n < 0)
			throw new std.InvalidArgument("Parameter n of assoc_laguerre() must be unsigned integer.");
		else if (Math.floor(m) != m || m < 0)
			throw new std.InvalidArgument("Parameter m of assoc_laguerre() must be unsigned integer.");

		// MEMORIZATION
		let solutions: number[] = [1, -x+m+1];

		// COMPUTE RETURN VALUE
		return _Compute_assoc_laguerre(n, m, x, solutions);
	}

	function _Compute_assoc_laguerre(n: number, m: number, x: number, solutions: number[]): number
	{
		if (solutions.length > n)
			return solutions[n];

		let ln_1: number = _Compute_assoc_laguerre(n - 1, m, x, solutions);
		let ln_2: number = _Compute_assoc_laguerre(n - 2, m, x, solutions);

		let ret: number = (2*n - 1 + m - x) * ln_1 - (n + m - 1)*ln_2;
		ret = ret / n;

		solutions[n] = ret;
		return ret;
	}
}