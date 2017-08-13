/// <reference path="../API.ts" />

namespace test
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
		
		//----
		// ELEMENTS I/O
		//----
		// ERASE AN ELEMENT
		let it = vec.begin().advance(3); // STEP TO 3
		it = vec.erase(it); // AND ERASE THE 3
		
		if (it.value != 4) // MUST BE 4
			throw new std.DomainError("It's wrong");
		
		// INSERT AN ELEMENT
		it = vec.begin().advance(2);
		it = vec.insert(it, -1); // insert -1

		if (it.value != -1)
			throw new std.DomainError("It's wrong");

		// ERASE RANGE
		it = vec.begin().advance(6);
		it = vec.erase(it, it.advance(3)); // erase from 6 to 9

		if (it.value != 9)
			throw new std.DomainError("It's wrong");

		//----
		// FINAL VALIDATION
		//----
		_Validate_linear_elements(vec, [0, 1, -1, 2, 4, 5, 9]);
	}

	function _Validate_linear_elements(vec: std.base.ILinearContainer<number>, answer: number[]): void
	{
		if (vec.size() != answer.length)
			throw new std.DomainError("Number of elements are wrong.");

		let i: number = 0;
		for (let it = vec.begin(); !it.equals(vec.end()); it = it.next())
			if (it.value != answer[i++])
				throw new std.DomainError("Wrong element is inserted in.");
	}
}