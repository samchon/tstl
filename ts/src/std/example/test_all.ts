/// <reference path="../API.ts" />

namespace std.example
{
	export function test_all(): void
	{
		//for (let key in std.example)
		//	if (key != "test_all" && std.example[key] instanceof Function)
		//		std.example[key]();

		let list: List<number> = new List<number>([1, 7, 5, 4, 2, 9, 3, 6, 0, 8]);
		list.sort();

		for (let it = list.begin(); it != list.end(); it = it.next())
			console.log(it.value);
	}
}