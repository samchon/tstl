/// <reference path="../API.ts" />

namespace test
{
	export function test_forward_lists(): void
	{
		let v1 = new std.ForwardList<number>([1, 2, 3, 4, 7, 8]);
		let v2 = new std.ForwardList<number>([5, 6, 11, 12]);

		v1.merge(v2);
		if (v1.size() != v1.size() + v2.size() || std.is_sorted(v1.begin(), v1.end()) == false)
			throw new std.DomainError("Error on ForwradList.merge() or ForwardList.splice_after()");
	}
}