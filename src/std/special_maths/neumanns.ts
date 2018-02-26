/// <reference path="../API.ts" />

namespace std
{
	export function cyl_neumann(n: number, x: number): number
	{
		return _Cyl_neumann(n, x);
	}

	function _Cyl_neumann(v: number, z: number): number
	{
		let numerator: number = cyl_bessel_j(v, z) * Math.cos(v*Math.PI) - cyl_bessel_j(-v, z)
		let denominator: number = Math.sin(v * Math.PI);

		return numerator / denominator;
	}

	export function sph_neumann(n: number, x: number): number
	{
		return _Sph_neumann(n, x);
	}

	function _Sph_neumann(n: number, z: number): number
	{
		let ret: number = Math.sqrt(Math.PI / (2*z));
		ret *= cyl_neumann(n + .5, z);

		return ret;
	}
}