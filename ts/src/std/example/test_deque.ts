/// <reference path="../API.ts" />

namespace std.example
{
	export function test_deque(): void
	{
		let deque: std.Deque<number> = new std.Deque<number>();
		for (let i: number = 0; i < 10; i++)
			deque.push_back(i);

		let it = deque.begin().advance(3);
		it = deque.erase(it); // erase 3
		console.log(it.value); // print 4

		it = deque.begin().advance(2);
		it = deque.insert(it, -1); // insert -1
		console.log(it.next().value); // print 2

		it = deque.begin().advance(6);
		it = deque.erase(it, it.advance(3)); // erase from 6 to 9
		//console.log(it.value); // print 9
		console.log(it.equal_to(deque.end()));

		console.log("-------------------------------------");
		for (let it = deque.begin(); !it.equal_to(deque.end()); it = it.next())
			console.log(it.value);
	}
}