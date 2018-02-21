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

		// COMPUTE RETURN VALUE
		return _Compute_assoc_legendre(n, m, x);
	}

	function _Compute_legendre(l: number, x: number): number
	{
		if (l == 0)
			return 1;
		else if (l == 1)
			return x;

		let pn_1: number = _Compute_legendre(l - 1, x);
		let pn_2: number = _Compute_legendre(l - 2, x);

		let ret: number = (2*l - 1)*x*pn_1 - (l-1)*pn_2;
		ret /= l;

		return ret;
	}

	function _Compute_assoc_legendre(l: number, m: number, x: number): number
	{
		if (m == 0)
			return _Compute_legendre(l, x);

		let left: number = (l - m + 1) * (l - m + 2) * _Compute_assoc_legendre(l + 1, m - 1, x);
		let right: number = (l + m - 1) * (l + m) * _Compute_assoc_legendre(l - 1, m - 1, x);

		let ret: number = (left - right) / (2*l + 1);
		ret /= Math.sqrt(1 - x*x);

		return ret;
	}
}