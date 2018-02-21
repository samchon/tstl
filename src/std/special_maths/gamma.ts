/// <reference path="../API.ts" />

namespace std
{
	// Lanczos Approximation
	// - https://rosettacode.org/wiki/Gamma_function#JavaScript
	export function tgamma(x: number): number
	{
		
		if (x < 0.5)
			return Math.PI / (Math.sin(Math.PI * x) * tgamma(1 - x));
	 
		const P: number[] = 
		[
			0.99999999999980993, 676.5203681218851, -1259.1392167224028,
			771.32342877765313, -176.61502916214059, 12.507343278686905,
			-0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
		];
		const G: number = 7;

		x -= 1;
		let a: number = P[0];
		let t: number = x + G + 0.5;
		
		for (var i = 1; i < P.length; ++i)
			a += P[i] / (x + i);
	 
		return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
	}

	export function lgamma(x: number): number
	{
		return Math.log(tgamma(x));
	}
}