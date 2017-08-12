/// <reference path="../API.ts" />

namespace example
{
	export function test_linear_containers(): void
	{
		_Test_linear(new std.Vector<number>());
		_Test_linear(new std.Deque<number>());
		_Test_linear(new std.List<number>());
	}

	function _Test_linear(vec: std.base.ILinearContainer<number>): void
	{
		//----
		// CONSTRUCT ELEMENTS
		//----
		for (let i: number = 0; i < 10; i++)
			vec.push_back(i);
		
		// ERASE AN ELEMENT
		let it = vec.begin().advance(3); // STEP TO 3
		it = vec.erase(it); // AND ERASE THE 3
		
		if (it.value != 4) // MUST BE 4
			throw new std.DomainError("It's wrong");
		
		// INSERT AN ELEMENT
		it = vec.begin().advance(2);
		it = vec.insert(it, -1); // insert -1
		console.log(it.next().value); // print 2

		it = vec.begin().advance(6);
		it = vec.erase(it, it.advance(3)); // erase from 6 to 9
		console.log(it.value); // print 9
	}
}