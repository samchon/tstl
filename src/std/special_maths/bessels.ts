/// <reference path="../API.ts" />

namespace std
{
	const INFINITY = 100; // (1 / 30!) is nearby 0.

	/* ---------------------------------------------------------------
		CYL_BESSEL_I
	--------------------------------------------------------------- */
	export function cyl_bessel_i(n: number, x: number): number
	{
		if (x < 0 && n != Math.floor(n))
			throw new std.DomainError("cyl_bessel_i function requires integer n when x < 0");
		else if (n == .5)
			return Math.sqrt(2.0 / (Math.PI*x)) * Math.sinh(x);

		return _Bessel_i(n, x);
	}

	function _Bessel_i(v: number, x: number): number
	{
		return base.MathUtil.sigma(function (k: number): number
		{
			let numerator: number = Math.pow(x / 2, v + 2*k);
			let denominator: number = base.MathUtil.factorial(k) * tgamma(v + k + 1);

			return numerator / denominator;
		}, 0, INFINITY);
	}
	
	/* ---------------------------------------------------------------
		CYL_BESSEL_J
	--------------------------------------------------------------- */
	export function cyl_bessel_j(n: number, x: number): number
	{
		if (x < 0 && Math.floor(n) != n)
			throw new std.DomainError("");
		else if (x == 0 && x != 0)
			throw new std.DomainError("");

		if (n == Math.floor(n))
			return _J_int(n, x);
		else
			return _J_positive(n, x);
	}

	function _J_int(n: number, x: number): number
	{
		if (n < 0)
			return Math.pow(-1, n) * _J_positive(-n, x);
		else
			return _J_positive(n, x);
	}

	function _J_positive(v: number, x: number): number
	{
		let sigma: number = base.MathUtil.sigma(function (k: number): number
		{
			let ret: number = Math.pow(-1, k) * Math.pow(x/2, v + 2*k);
			ret /= base.MathUtil.factorial(k) * tgamma(v + k + 1);

			return ret;
		}, 0, INFINITY);

		return sigma;
	}

	/* ---------------------------------------------------------------
		CYL_BESSEL_K
	--------------------------------------------------------------- */
	export function cyl_bessel_k(n: number, x: number): number
	{
		return _Bessel_k(n, x);
	}

	function _Bessel_k(v: number, z: number): number
	{
		let ret: number = Math.PI / 2;
		ret *= cyl_bessel_i(-v, z) - cyl_bessel_i(v, z);
		ret /= Math.sin(v*Math.PI);

		return ret;
	}

	/* ---------------------------------------------------------------
		CYL_BESSEL_Y
	--------------------------------------------------------------- */
	export function sph_bessel(n: number, x: number): number
	{
		return _Sph_bessel(n, x);
	}

	function _Sph_bessel(n: number, z: number): number
	{
		return Math.sqrt(Math.PI / (2*z)) * cyl_bessel_j(n+.5, z);
	}
}