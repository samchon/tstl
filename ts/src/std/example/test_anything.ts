/// <reference path="../API.ts" />

namespace std.example
{
	export function test_anything(): void
	{
		let items: std.Vector<number> = new std.Vector<number>();
		items.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

		std.reverse(items.begin(), items.end());
		for (let it = items.begin(); !it.equal_to(items.end()); it = it.next())
			console.log(it.value);
	}
}