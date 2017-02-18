/// <reference path="API.ts" />

namespace example
{
	export function list(): void
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
		console.log(it.value); // print 9

		list.reverse();
		console.log("-------------------------------------");
		for (let it = list.rbegin(); !it.equals(list.rend()); it = it.next())
			console.log(it.value);
	}
}