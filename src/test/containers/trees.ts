/// <reference path="../API.ts" />

namespace test
{
	export function test_trees(): void
	{
		_Test_tree_set(new std.TreeSet<number>());
		_Test_tree_set(new std.TreeMultiSet<number>());
		_Test_tree_map(new std.TreeMap<number, number>());
		_Test_tree_map(new std.TreeMultiMap<number, number>());

		_Test_tree_set_inserts_and_erases();
		_Test_bounds();
	}

	function _Test_tree_set_inserts_and_erases(): void
	{
		for (let k = 0; k < 1000; ++k)
		{
			let s = new std.TreeSet();
			for (let i = 0; i < 100; ++i)
				s.insert(Math.floor(Math.random() * 10000));

			for (let it = s.begin(); it !== s.end(); it = it.next())
				if (s.has(it.value) === false)
					console.log("something wrong.");

			while (!s.empty())
			{
				let advance = Math.floor(Math.random() * s.size());
				let it = std.advance(s.begin(), advance);

				s.erase(it);
				if (s.has(it.value))
					console.log("something wrong.");
			}
		}
	}

	function _Test_tree_set<Source extends std.base.SetContainer<number, Source>>
		(set: Source): void
	{
		for (let i: number = 0; i < 1000; ++i)
			set.push(Math.floor(Math.random() * 100));

		// VALIDATE SORTING
		if (std.is_sorted(set.begin(), set.end()) === false)
			throw new std.DomainError("Order of TreeSet or TreeMultiSet is wrong.");

		// VALIDATE FIND
		for (let i: number = 0; i < 10000; ++i)
		{
			let val: number = Math.floor(Math.random() * 100);

			let alg_it = std.find(set.begin(), set.end(), val);
			let set_it = set.find(val);

			if (alg_it === set.end())
				if (set_it === set.end())
					continue;
				else
					throw new std.DomainError("find() of TreeSet or TreeMultiSet is wrong; invalid out of range.");
			else if (alg_it.value !== set_it.value)
				throw new std.DomainError("find() of TreeSet or TreeMultiSet is wrong; different value.");
		}
	}
	
	function _Test_tree_map<Source extends std.base.ITreeMap<number, number, Source>>
		(map: Source): void
	{
		for (let i: number = 0; i < 1000; ++i)
			map.push(std.make_pair(Math.floor(Math.random() * 100), 0));

		// VALIDATE SORTING
		if (std.is_sorted(map.begin(), map.end()) === false)
			throw new std.DomainError("Order of TreeMap or TreeMultiMap is wrong.");

		// VALIDATE FIND
		for (let i: number = 0; i < 10000; ++i)
		{
			let val: number = Math.floor(Math.random() * 100);

			let alg_it = std.find_if(map.begin(), map.end(), (entry: std.Entry<number, number>) =>
				{
					return val === entry.first;
				});
			let set_it = map.find(val);

			if (alg_it === map.end())
				if (set_it === map.end())
					continue;
				else
					throw new std.DomainError("find() of TreeMap or TreeMultiMap is wrong; invalid out of range.");
			else if (alg_it.first !== set_it.first)
				throw new std.DomainError("find() of TreeMap or TreeMultiMap is wrong; different value.");
		}
	}

	function _Test_bounds(): void
	{
		// test tree container and algorithms' binary search at the same time
		test_binary_searches();
	}
}