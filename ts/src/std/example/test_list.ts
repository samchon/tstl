/// <reference path="../API.ts" />

/// <reference path="../List.ts" />

namespace std.example
{
	export function test_list(): void
	{
		let list: std.List<number> = new std.List<number>();
		for (let i: number = 0; i < 10; i++)
			list.push_back(i);

		let it = list.begin().advance(3);
		it = list.erase(it); // erase 3
		console.log(it.value); // print 4
		
		it = list.begin().advance(2);
		it = list.insert(it, -1); // insert -1
		console.log(it.next().value); // print 2

		it = list.begin().advance(6);
		it = list.erase(it, it.advance(3)); // erase from 6 to 9
		//console.log(it.value); // print 9
		console.log(it.equal_to(list.end()));

		console.log("-------------------------------------");
		for (let it = list.begin(); !it.equal_to(list.end()); it = it.next())
			console.log(it.value);
	}
}