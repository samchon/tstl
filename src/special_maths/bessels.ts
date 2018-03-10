import { sigma, factorial } from "../base/maths/MathUtil";
import { tgamma } from "..";

import { DomainError } from "../exceptions/LogicError";

/**
 * @hidden
 */
const INFINITY = 100; // (1 / 30!) is nearby 0.

/*================================================================
	ORIGINAL FUNCTIONS
		- CYLINDRICAL
		- SPHERICAL
==================================================================
	FIRST KIND
--------------------------------------------------------------- */
export function cyl_bessel_j(n: number, x: number): number
{
	// VALIDATION
	if (x < 0 && Math.floor(n) != n)
		throw new DomainError("In cyl_bessel_j function, n must be integer when x is negative.");
	else if (x == 0 && n != 0)
		throw new DomainError("In cyl_bessel_j function, n must be zero when x is zero.");

	// COMPUTATION
	if (n == Math.floor(n))
		return _J_int(n, x);
	else
		return _J_positive(n, x);
}

export function cyl_neumann(v: number, x: number): number
{
	if (x <= 0)
		throw new DomainError("cyl_neumann function requires x > 0");

	let numerator: number = cyl_bessel_j(v, x) * Math.cos(v*Math.PI) - cyl_bessel_j(-v, x)
	let denominator: number = Math.sin(v * Math.PI);
	
	return numerator / denominator;
}

/**
 * @hidden
 */
function _J_int(n: number, x: number): number
{
	if (n < 0)
		return Math.pow(-1, n) * _J_positive(-n, x);
	else
		return _J_positive(n, x);
}

/**
 * @hidden
 */
function _J_positive(v: number, x: number): number
{
	return sigma(function (k: number): number
	{
		let ret: number = Math.pow(-1, k) * Math.pow(x/2, v + 2*k);
		ret /= factorial(k) * tgamma(v + k + 1);

		return ret;
	}, 0, INFINITY);
}

/* ---------------------------------------------------------------
	SPHERICAL
--------------------------------------------------------------- */
export function sph_bessel(n: number, x: number): number
{
	return Math.sqrt(Math.PI / (2*x)) * cyl_bessel_j(n+.5, x);
}

export function sph_neumann(n: number, x: number): number
{
	let ret: number = Math.sqrt(Math.PI / (2*x));
	ret *= cyl_neumann(n + .5, x);

	return ret;
}

/*================================================================
	REQGULAR MODIFIED
		- FIRST KIND
		- SECOND KIND
==================================================================
	FIRST KIND
--------------------------------------------------------------- */
export function cyl_bessel_i(n: number, x: number): number
{
	// VALIDATION
	if (x < 0 && n != Math.floor(n))
		throw new DomainError("In cyl_bessel_i function, n must integer when x < 0");
	else if (x == 0 && n != 0)
		throw new DomainError("In cyl_bessel_i function, n must be zero when x is zero.");
	
	// COMPUTATION
	if (n == .5)
		return Math.sqrt(2.0 / (Math.PI*x)) * Math.sinh(x);
	else
		return _Bessel_i(n, x);
}

/**
 * @hidden
 */
function _Bessel_i(v: number, x: number): number
{
	return sigma(function (k: number): number
	{
		let numerator: number = Math.pow(x / 2, v + 2*k);
		let denominator: number = factorial(k) * tgamma(v + k + 1);

		return numerator / denominator;
	}, 0, INFINITY);
}

/* ---------------------------------------------------------------
	SECOND KIND
--------------------------------------------------------------- */
export function cyl_bessel_k(n: number, x: number): number
{
	if (x <= 0)
		throw new DomainError("cyl_bessel_k function requires x <= 0");

	return _Bessel_k(n, x);
}

/**
 * @hidden
 */
function _Bessel_k(v: number, z: number): number
{
	let ret: number = Math.PI / 2;
	ret *= cyl_bessel_i(-v, z) - cyl_bessel_i(v, z);
	ret /= Math.sin(v*Math.PI);

	return ret;
}