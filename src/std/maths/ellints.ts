/// <reference path="../API.ts" />

namespace std
{
	function ellint_k_imp(k: number): number
	{
		let x: number = 0;
		let y: number = 1 - k*k;
		let z: number = 1;

		return ellint_rf_imp(x, y, z);
	}

	function ellint_rf_imp(x: number, y: number, z: number): number
	{
		return 0;
	}
}