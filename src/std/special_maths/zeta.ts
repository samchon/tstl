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
		let sum: number = 0.0;

		for (let n: number = 1; n <= 100 * 1000; ++n)
			sum += Math.pow(-1, n+1) / Math.pow(n, s);

		return sum / divider;
	}

	function _Riemann_zeta_over_1(arg: number): number
	{
		let ret: number = 0.0;
		for (let n: number = 1; n < 1000; ++n)
			ret += Math.pow(n, -arg);
		
		return ret;
	}
}