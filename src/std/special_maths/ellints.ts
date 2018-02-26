/// <reference path="../API.ts" />

namespace std
{
	/* ---------------------------------------------------------------
		FIRST
	--------------------------------------------------------------- */
	export function ellint_1(k: number, phi: number): number
	{
		// FORMULA OF INTEGRAL
		let formula = function (x: number): number
		{
			return 1.0 / _Common_formula(k, x);
		};
		return _Post_process(k, phi, formula);
	}

	export function comp_ellint_1(k: number): number
	{
		return ellint_1(k, Math.PI / 2);
	}

	/* ---------------------------------------------------------------
		SECOND
	--------------------------------------------------------------- */
	export function ellint_2(k: number, phi: number): number
	{
		let formula = function (x: number): number
		{
			return _Common_formula(k, x);
		};
		return _Post_process(k, phi, formula);
	}

	export function comp_ellint_2(k: number): number
	{
		return ellint_2(k, Math.PI / 2);
	}

	/* ---------------------------------------------------------------
		THIRD
	--------------------------------------------------------------- */
	export function ellint_3(k: number, n: number, phi: number): number
	{
		// SPECIAL VALIDATION ONLY FOR SERIES-3
		if (n >= 1 / Math.pow(Math.sin(phi), 2))
			throw new std.DomainError("ellint_3 function requires n < (1 / sin^2(phi))");

		// CONSTRUCT FORMULA
		let formula = function (x: number): number
		{
			let denominator: number = 1 - n * Math.pow(Math.sin(x), 2);
			denominator *= _Common_formula(k, x);

			return 1.0 / denominator;
		};
		return _Post_process(k, phi, formula);
	}

	export function comp_ellint_3(k: number, n: number): number
	{
		return ellint_3(k, n, Math.PI / 2);
	}

	/* ---------------------------------------------------------------
		BACKGROUNDS
	--------------------------------------------------------------- */
	function _Common_formula(k: number, x: number): number
	{
		return Math.sqrt(1 - Math.pow(k * Math.sin(x), 2));
	}

	function _Post_process(k: number, phi: number, formula: (x: number) => number): number
	{
		if (Math.abs(k) > 1)
			throw new std.DomainError("ellint functions require |k| <= 1");

		let area: number = base.MathUtil.integral(formula, 0, phi, 100 * 100);
		return (phi < 0) ? -area : area;
	}
}