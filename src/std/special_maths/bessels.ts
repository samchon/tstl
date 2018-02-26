/// <reference path="../API.ts" />

namespace std
{
	const MAX_K = 100; // (1 / 30!) is nearby 0.

	/* ---------------------------------------------------------------
		CYL_BESSEL_I
	--------------------------------------------------------------- */
	export function cyl_bessel_i(n: number, x: number): number
	{
		return _Bessel_i(n, x);
	}

	function _Bessel_i(v: number, x: number): number
	{
		let multiplier: number = Math.pow(.5 * x, v);
		let sigma: number = base.MathUtil.sigma(function (k: number): number
		{
			let numerator: number = Math.pow(.25 * x*x, k);
			let denominator: number = base.MathUtil.factorial(k);
			denominator *= tgamma(v + k + 1);

			return numerator / denominator
		}, 0, MAX_K);

		return multiplier * sigma;

		// return base.MathUtil.sigma(function (k: number): number
		// {
		// 	let numerator: number = Math.pow(x / 2, v + 2*k);
		// 	let denominator: number = base.MathUtil.factorial(k) * tgamma(v + k + 1);

		// 	return numerator / denominator;
		// }, 0, _MAX_K);
	}
	
	/* ---------------------------------------------------------------
		CYL_BESSEL_J
	--------------------------------------------------------------- */
	export function cyl_bessel_j(n: number, x: number): number
	{
		return _Bessel_j(n, x);
	}

	function _Bessel_j(v: number, x: number): number
	{
		let sigma: number = base.MathUtil.sigma(function (k: number): number
		{
			let ret: number = Math.pow(-1, k) * Math.pow(x/2, v + 2*k);
			ret /= base.MathUtil.factorial(k) * tgamma(v + k + 1);

			return ret;
		}, 0, MAX_K);

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