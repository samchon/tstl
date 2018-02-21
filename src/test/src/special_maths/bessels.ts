/// <reference path="../API.ts" />

namespace test
{
	export function test_bessels(): void
	{
		const X = 1.2345;

		if (!similar(std.cyl_bessel_i(0, X), 1.41886))
			throw new std.DomainError("Error on std.cyl_bessel_i().");
		else if (!similar(std.cyl_bessel_j(0, X), 0.653792))
			throw new std.DomainError("Error on std.cyl_bessel_j().");
	}
}