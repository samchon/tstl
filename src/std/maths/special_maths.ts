/// <reference path="../API.ts" />

namespace std
{
	/* ---------------------------------------------------------
		LAGUERRE
	--------------------------------------------------------- */
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

		// COMPUTE RETURN VALUE
		return _Compute_assoc_laguerre(n, m, x);
	}

	function _Compute_assoc_laguerre(n: number, m: number, x: number): number
	{
		if (n == 0)
			return 1;
		else if (n == 1)
			return -x + m + 1;
		
		let ln_1: number = _Compute_assoc_laguerre(n - 1, m, x);
		let ln_2: number = _Compute_assoc_laguerre(n - 2, m, x);

		let ret: number = (2*n - 1 + m - x) * ln_1 - (n + m - 1)*ln_2;
		ret = ret / n;

		return ret;
	}

	/* ---------------------------------------------------------
		LEGENDRE
	--------------------------------------------------------- */
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

	function _Compute_assoc_legendre(n: number, m: number, x: number): number
	{
		if (n == 0)
			return 1;
		else if (n == 1)
			return x;

		let pn_1: number = _Compute_assoc_legendre(n - 1, m, x);
		let pn_2: number = _Compute_assoc_legendre(n - 1, m, x);

		let ret: number = (2*n - 1)*pn_1 - (n + m)*pn_2;
		ret = ret / (n - m);

		return ret;
	}

	/* ---------------------------------------------------------
		HERMITE
	--------------------------------------------------------- */
	export function hermite(n: number, x: number): number
	{
		// VALIDATE PARAMETER
		if (Math.floor(n) != n || n < 0)
			throw new std.InvalidArgument("Parameter n of assoc_legendre() must be unsigned integer.");

		// COMPUTE RETURN VALUE
		return _Hermite(n, x);
	}

	function _Hermite(n: number, x: number): number
	{
		if (n == 0)
			return 1;
		else if (n == 1)
			return 2*x;

		let hn_1: number = _Hermite(n - 1, x);
		let hn_2: number = _Hermite(n - 2, x);

		let ret: number = x*hn_1 - (n-1)*hn_2;
		ret *= 2;

		return ret;
	}
}
