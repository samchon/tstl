/// <reference path="../API.ts" />

namespace std
{
	/**
	 * Beta function.
	 * 
	 * @reference https://en.wikipedia.org/wiki/Beta_function
	 */
	export function beta(x: number, y: number): number
	{
		return tgamma(x) * tgamma(y) / tgamma(x + y);
	}
}