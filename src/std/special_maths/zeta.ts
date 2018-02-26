/// <reference path="../API.ts" />

namespace std
{
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

	function _Negative(s: number): number
	{
		return Math.pow(2, s)
			* Math.pow(Math.PI, s - 1)
			* Math.sin(Math.PI * s / 2)
			* tgamma(1 - s)
			* riemann_zeta(1 - s);
	}

	function _Fractional(arg: number): number
	{
		let divider: number = 1 - Math.pow(2, 1 - arg);
		let sigma: number = base.MathUtil.sigma(function (n: number): number
		{
			return Math.pow(-1, n - 1) / Math.pow(n, -arg);
		}, 1, 100 * 1000);

		return sigma / divider;
	}

	function _Positive(s: number): number
	{
		return base.MathUtil.sigma(function (k: number): number
		{
			return Math.pow(k, -s);
		}, 1, 100 * 1000);
	}
}