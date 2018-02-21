/// <reference path="../API.ts" />

namespace test
{
	export function similar(x: number, y: number): boolean
	{
		return Math.abs((y - x) / x) < .01;
	}
}