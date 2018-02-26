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
	export function ellint_3(k: number, v: number, phi: number): number
	{
		// SPECIAL VALIDATIONS ONLY FOR SERIES-3
		if (v > 1 / Math.pow(Math.sin(phi), 2))
			throw new std.DomainError("ellint_3 function requires n < (1 / sin^2(phi))");
		
		return _Ellint_3(k, v, phi);
	}

	export function comp_ellint_3(k: number, n: number): number
	{
		return ellint_3(k, n, Math.PI / 2);
	}

	// function _Carlson_3(k: number, n: number, phi: number): number
	// {
	// 	// TRIANGLES
	// 	let sin: number = Math.sin(phi);
	// 	let sin2: number = sin * sin;
	// 	let sin3: number = sin * sin2;
	// 	let cos2: number = Math.pow(Math.cos(phi), 2);

	// 	// FORMULA
	// 	let ret: number = sin * base.Carlson.rf(cos2, 1 - k*k*sin2, 1);
	// 	ret += n / 3 * sin3 * base.Carlson.rj(cos2, 1 - k*k*sin2, 1, 1 - n*sin2);

	// 	return ret;
	// }

	function _Ellint_3(k: number, v: number, phi: number): number
	{
		let formula = function (x: number): number
		{
			let denominator: number = 1 - v * Math.pow(Math.sin(x), 2);
			denominator *= _Common_formula(k, x);

			return 1.0 / denominator;
		};
		return _Post_process(k, phi, formula);
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

		let area: number = base.MathUtil.integral(formula, 0, phi);
		return (phi < 0) ? -area : area;
	}
}