/// <reference path="../API.ts" />

namespace std
{
	export function riemann_zeta(arg: number): number
	{
		if (arg < 0)
			return _Riemann_zeta_negative(arg);
		else if (arg == 0)
			return -0.5;
		else if (arg < 1)
			return _Riemann_zeta_between_0_to_1(arg);
		else if (arg == 1)
			return Infinity;
		else
			return _Riemann_zeta_over_1(arg);
	}

	function _Riemann_zeta_negative(s: number): number
	{
		return Math.pow(2, s)
			* Math.pow(Math.PI, s - 1)
			* Math.sin(Math.PI * s / 2)
			* tgamma(1 - s)
			* riemann_zeta(1 - s);
	}

	function _Riemann_zeta_between_0_to_1(s: number): number
	{
		let divider: number = 1 - Math.pow(2, 1 - s);
		let sigma: number = base.MathUtil.sigma(function (k: number): number
		{
			return Math.pow(-1, k + 1) / Math.pow(k, s);
		}, 1, 100 * 1000);

		return sigma / divider;
	}

	function _Riemann_zeta_over_1(arg: number): number
	{
		return base.MathUtil.sigma(function (k: number): number
		{
			return Math.pow(k, -arg);
		}, 0, 1000);
	}
}