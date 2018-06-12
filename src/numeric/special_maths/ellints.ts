import { MathUtil } from "../../base/maths/MathUtil";
import { DomainError } from "../../exceptions/LogicError";

/* ---------------------------------------------------------------
	FIRST
--------------------------------------------------------------- */
/**
 * Incomplete elliptic integral of the 1st kind.
 * 
 * @reference https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_first_kind
 */
export function ellint_1(k: number, phi: number): number
{
	// FORMULA OF INTEGRAL
	let formula = function (x: number): number
	{
		return 1.0 / _Common_formula(k, x);
	};
	return _Post_process(k, phi, formula);
}

/**
 * Complete elliptic integral of the 1st kind.
 * 
 * @reference https://en.wikipedia.org/wiki/Elliptic_integral#Elliptic_integral_of_the_first_kind
 */
export function comp_ellint_1(k: number): number
{
	return ellint_1(k, Math.PI / 2);
}

/* ---------------------------------------------------------------
	SECOND
--------------------------------------------------------------- */
/**
 * Incomplete elliptic integral of the 2nd kind.
 * 
 * @reference https://en.wikipedia.org/wiki/Elliptic_integral#Incomplete_elliptic_integral_of_the_second_kind
 */
export function ellint_2(k: number, phi: number): number
{
	let formula = function (x: number): number
	{
		return _Common_formula(k, x);
	};
	return _Post_process(k, phi, formula);
}

/**
 * Complete elliptic integral of the 2nd kind.
 * 
 * @reference https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_second_kind
 */
export function comp_ellint_2(k: number): number
{
	return ellint_2(k, Math.PI / 2);
}

/* ---------------------------------------------------------------
	THIRD
--------------------------------------------------------------- */
/**
 * Incomplete elliptic integral of the 3rd kind.
 * 
 * @reference https://en.wikipedia.org/wiki/Elliptic_integral#Complete_elliptic_integral_of_the_third_kind
 */
export function ellint_3(k: number, v: number, phi: number): number
{
	// SPECIAL VALIDATIONS ONLY FOR SERIES-3
	if (v > 1 / Math.pow(Math.sin(phi), 2))
		throw new DomainError("ellint_3 function requires n < (1 / sin^2(phi))");
	
	return _Ellint_3(k, v, phi);
}

/**
 * Complete elliptic integral of the 3rd kind.
 * 
 * @reference https://en.wikipedia.org/wiki/Elliptic_integral#Incomplete_elliptic_integral_of_the_third_kind
 */
export function comp_ellint_3(k: number, n: number): number
{
	return ellint_3(k, n, Math.PI / 2);
}

/**
 * @hidden
 */
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
/**
 * @hidden
 */
function _Common_formula(k: number, x: number): number
{
	return Math.sqrt(1 - Math.pow(k * Math.sin(x), 2));
}

/**
 * @hidden
 */
function _Post_process(k: number, phi: number, formula: (x: number) => number): number
{
	if (Math.abs(k) > 1)
		throw new DomainError("ellint functions require |k| <= 1");

	let area: number = MathUtil.integral(formula, 0, phi);
	return (phi < 0) ? -area : area;
}