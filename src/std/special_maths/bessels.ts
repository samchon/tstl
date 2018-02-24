/// <reference path="../API.ts" />

namespace std
{
	/* ---------------------------------------------------------------
		CYL_BESSEL_I
	--------------------------------------------------------------- */
	export function cyl_bessel_i(n: number, x: number): number
	{
		return _Bessel_i(n, x);
	}

	function _Bessel_i(v: number, x: number): number
	{
		let ret: number = 0.0;
		for (let k: number = 0; k < 100; ++k)
		{
			let elem: number = Math.pow(x/2, v+2*k);
			elem /= _Factorial(k) * tgamma(v + k + 1);

			ret += elem;
		}
		return ret;
	}
	
	/* ---------------------------------------------------------------
		CYL_BESSEL_J
	--------------------------------------------------------------- */
	export function cyl_bessel_j(n: number, x: number): number
	{
		return _Bessel_j(n, x);
	}

	function _Bessel_j(v: number, z: number): number
	{
		let multiplier: number = Math.pow(z/2, v);
		let sum: number = 0;

		for (let k: number = 0; k < 100; ++k)
		{
			let numerator: number = Math.pow(-.25*z*z, k);
			let denominator: number = _Factorial(k) * tgamma(v + k + 1);

			sum += numerator / denominator;
		}
		return sum * multiplier;
	}

	function _Factorial(k: number): number
	{
		if (k == 0 || k == 1)
			return 1;

		let ret: number = 1;
		while (k > 1)
			ret *= k--;
		return ret;
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