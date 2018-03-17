/// <reference path="../API.ts" />

namespace test
{
	export function test_utilities()
	{
		_Test_pairs();
		_Test_entries();
	}

	function _Test_pairs(): void
	{
		let x = std.make_pair(1, 2);
		let y = std.make_pair(1, 2);
		let z = std.make_pair(1, 3);

		if (x.hashCode() != y.hashCode() || x.hashCode() == z.hashCode())
			throw new std.DomainError("Error in Pair.hashCode()");
		else if (x.equals(y) == false || x.equals(z) == true)
			throw new std.DomainError("Error in Pair.equals()");
	}

	function _Test_entries(): void
	{
		let x = new std.Entry<number, number>(1, 2);
		let y = new std.Entry<number, number>(1, 3);

		if (x.hashCode() != y.hashCode())
			throw new std.DomainError("Error in Entry.hashCode()");
		else if (x.equals(y) == false)
			throw new std.DomainError("Error in Pair.equals()");
	}
}