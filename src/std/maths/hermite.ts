/// <reference path="../API.ts" />

namespace std
{
	export function hermite(n: number, x: number): number
	{
		// VALIDATE PARAMETER
		if (Math.floor(n) != n || n < 0)
			throw new std.InvalidArgument("Parameter n of hermite() must be unsigned integer.");

		// COMPUTE RETURN VALUE
		return _Hermite(n, x);
	}

	function _Hermite(n: number, x: number): number
	{
		if (n == 0)
			return 1;
		else if (n == 1)
			return 2*x;

		let hn_1: number = _Hermite(n - 1, x);
		let hn_2: number = _Hermite(n - 2, x);

		let ret: number = x*hn_1 - (n-1)*hn_2;
		ret *= 2;

		return ret;
	}
}