/// <reference path="../API.ts" />

namespace test
{
	export function test_union_sets(): void
	{
		_Test_includes();
	}

	function _Test_includes(): void
	{
		let v1 = new std.Vector<number>([1, 2, 3, 4, 5, 6, 7]);
		let v2 = new std.Vector<number>([2, 3, 4, 5]);
		let v3 = new std.Vector<number>([2, 4, 3, 5]);

		if (std.includes(v1.begin(), v1.end(), v2.begin(), v2.end()) == false)
			throw new std.DomainError("Error on std.includes().");
	}
}