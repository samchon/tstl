/// <reference path="../API.ts" />

namespace std
{
	export function legendre(n: number, x: number): number
	{
		return assoc_legendre(n, 0, x);
	}

	export function assoc_legendre(n: number, m: number, x: number): number
	{
		// VALIDATE PARAMETERS
		if (Math.floor(n) != n || n < 0)
			throw new std.InvalidArgument("Parameter n of assoc_legendre() must be unsigned integer.");
		else if (Math.floor(m) != m || m < 0)
			throw new std.InvalidArgument("Parameter m of assoc_legendre() must be unsigned integer.");

		// MEMORIZATION
		let matrix: number[][] = [[1, x]];
		matrix.length = n + m + 2;
		
		for (let i: number = 1; i < matrix.length; ++i)
			matrix[i] = [];

		// COMPUTE RETURN VALUE
		return _Compute_assoc_legendre(n, m, x, matrix);
	}

	function _Compute_legendre(n: number, x: number, memory: number[]): number
	{
		if (memory.length > n)
			return memory[n];

		let pn_1: number = _Compute_legendre(n - 1, x, memory);
		let pn_2: number = _Compute_legendre(n - 2, x, memory);

		let ret: number = (2*n - 1)*x*pn_1 - (n-1)*pn_2;
		ret /= n;

		memory[n] = ret;
		return ret;
	}

	function _Compute_assoc_legendre(n: number, m: number, x: number, matrix: number[][]): number
	{
		if (n < 0)
			n = -n-1;

		if (m == 0)
			return _Compute_legendre(n, x, matrix[0]);
		else if (matrix[n].length > m && matrix[n][m] != undefined)
			return matrix[n][m];

		let left: number = (n - m + 1) * (n - m + 2) * _Compute_assoc_legendre(n + 1, m - 1, x, matrix);
		let right: number = (n + m - 1) * (n + m) * _Compute_assoc_legendre(n - 1, m - 1, x, matrix);

		let ret: number = (left - right) / (2*n + 1);
		ret /= Math.sqrt(1 - x*x);

		matrix[n][m] = ret;
		return ret;
	}
}