/// <reference path="../API.ts" />

namespace test
{
	export function test_modifiers(): void
	{
		_Test_removes();
		_Test_replaces();

		_Test_uniques();
		_Test_rotate();
		_Test_shuffles();
	}

	function _Test_removes(): void
	{
		let v = _Create_sample();
		std.remove(v.begin(), v.end(), 2);

		let it = std.find(v.begin(), v.end(), 2);
		if (it.equals(v.end()) == false)
			throw new std.DomainError("Error on std.remove().");
	}
	function _Test_replaces(): void
	{
		let v = _Create_sample();
		std.replace(v.begin(), v.end(), 2, 4);

		let it = std.find(v.begin(), v.end(), 2);
		if (it.equals(v.end()) == false)
			throw new std.DomainError("Error on std.replace().");
	}

	function _Test_uniques(): void
	{
		let l = new std.List<number>();
		for (let i: number = 0; i < 1000; ++i)
			l.push_back(Math.floor(Math.random() * 50));

		l.sort();
		let v = new std.Vector<number>(l.begin(), l.end());

		l.unique();
		std.unique(v.begin(), v.end());

		if (std.equal(v.begin(), v.end(), l.begin()) == false)
			throw new std.DomainError("Error on std.unique().");
	}
	function _Test_rotate(): void
	{
		let x = new std.Vector<number>([0, 1, 2, 3, 4, 5]);
		let y = new std.Vector<number>([3, 4, 5, 0, 1, 2]);

		std.rotate(x.begin(), x.begin().advance(3), x.end());
		
		if (std.equal(x.begin(), x.end(), y.begin()) == false)
			throw new std.DomainError("Error on std.rotate().");
	}
	function _Test_shuffles(): void
	{
		let v = new std.Vector<number>();
		for (let i: number = 0; i < 1000; ++i)
			v.push_back(Math.floor(Math.random() * 50));

		std.shuffle(v.begin(), v.end());
		std.random_shuffle(v.begin(), v.end());
	}

	function _Create_sample(): std.Vector<number>
	{
		return new std.Vector<number>([1, 2, 2, 3, 3, 3]);
	}
}
