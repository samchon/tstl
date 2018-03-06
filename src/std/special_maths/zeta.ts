/// <reference path="../API.ts" />

namespace std
{
	/**
	 * @hidden
	 */
	const INFINITY = 100 * 1000;

	export function riemann_zeta(arg: number): number
	{
		if (arg < 0)
			return _Negative(arg);
		else if (arg == 0)
			return -0.5;
		else if (arg < 1)
			return _Fractional(arg);
		else if (arg == 1)
			return Infinity;
		else
			return _Positive(arg);
	}

	/**
	 * @hidden
	 */
	function _Negative(arg: number): number
	{
		return Math.pow(2, arg)
			* Math.pow(Math.PI, arg - 1)
			* Math.sin(Math.PI * arg / 2)
			* tgamma(1 - arg)
			* riemann_zeta(1 - arg);
	}

	/**
	 * @hidden
	 */
	function _Fractional(arg: number): number
	{
		let divider: number = 1 - Math.pow(2, 1 - arg);
		let sigma: number = base.MathUtil.sigma(function (n: number): number
		{
			return Math.pow(-1, n - 1) * Math.pow(n, -arg);
		}, 1, INFINITY);

		return sigma / divider;
	}

	/**
	 * @hidden
	 */
	function _Positive(arg: number): number
	{
		return base.MathUtil.sigma(function (n: number): number
		{
			return Math.pow(n, -arg);
		}, 1, INFINITY);
	}
}