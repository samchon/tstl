/// <reference path="../API.ts" />

namespace std
{
	export function cyl_neumann(v: number, z: number): number
	{
		if (z <= 0)
			throw new DomainError("");

		// if (v < 0)
		// {
		// 	v = -v;
		// 	return Math.sin(v * Math.PI) * cyl_bessel_j(v, z)
		// 		+ Math.cos(v * Math.PI) * cyl_neumann(v, z);
		// }
		// else
			return _Cyl_neumann(v, z);
	}

	function _Cyl_neumann(v: number, x: number): number
	{
		let numerator: number = cyl_bessel_j(v, x) * Math.cos(v*Math.PI) - cyl_bessel_j(-v, x)
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