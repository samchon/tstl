/// <reference path="../API.ts" />

namespace test
{
	export function test_binary_searches(): void
	{
		_Test_binary_search_of_atom();
		_Test_binary_search_of_pair();
	}

	function _Test_binary_search_of_atom(): void
	{
		let vec = new std.Vector<number>();
		let set = new std.TreeMultiSet<number>();

		//----
		// FILL VALUES
		//----
		// INSERT ELEMENTS
		for (let i: number = 0; i < 100; ++i)
		{
			let val: number = Math.random();

			vec.push_back(val);
			set.insert(val);
		}

		// SORT VECTOR
		std.sort(vec.begin(), vec.end());

		//----
		// VALIDATE
		//----
		for (let i: number = 0; i < 10000; ++i)
		{
			let val: number = Math.random();

			let v_it = std.equal_range(vec.begin(), vec.end(), val);
			let s_it = set.equal_range(val);

			// VALIDATE LOWER BOUND
			if (v_it.first.equals(vec.end()) === true)
				if (s_it.first.equals(set.end()) === false)
					throw new std.DomainError("Error std.lower_bound or Set.lower_bound; someone is out bound but the other is not.");
				else
					continue;
			else if (v_it.first.value !==s_it.first.value)
				throw new std.DomainError("Error std.lower_bound or Set.lower_bound; different value.");

			// VALIDATE UPPER BOUND
			if (v_it.second.equals(vec.end()) === true)
				if (s_it.second.equals(set.end()) === false)
					throw new std.DomainError("Error std.upper_bound or Set.upper_bound; someone is out bound but the other is not.");
				else
					continue;
			else if (v_it.second.value !==s_it.second.value)
				throw new std.DomainError("Error std.upper_bound or Set.upper_bound; different value.");
		}
	}

	function _Test_binary_search_of_pair(): void
	{
		let vec = new std.Vector<std.Pair<number, number>>();
		let map = new std.TreeMultiMap<number, number>();

		//----
		// FILL VALUES
		//----
		// INSERT ELEMENTS
		for (let i: number = 0; i < 100; ++i)
		{
			let pair = std.make_pair(Math.random(), 0);

			vec.push_back(pair);
			map.insert(pair);
		}
		
		// SORT VECTOR
		std.sort(vec.begin(), vec.end(), _Compare_numbers_pair);

		//----
		// VALIDATE
		//----
		for (let i: number = 0; i < 10000; ++i)
		{
			let pair = std.make_pair(Math.random(), 0);

			let v_it = std.equal_range(vec.begin(), vec.end(), pair, _Compare_numbers_pair);
			let m_it = map.equal_range(pair.first);

			// VALIDATE LOWER BOUND
			if (v_it.first.equals(vec.end()) === true)
				if (m_it.first.equals(map.end()) === false)
					throw new std.DomainError("Error std.lower_bound or Set.lower_bound; someone is out bound but the other is not.");
				else
					continue;
			else if (v_it.first.value.first !==m_it.first.first)
				throw new std.DomainError("Error std.lower_bound or Set.lower_bound; different value.");

			// VALIDATE UPPER BOUND
			if (v_it.second.equals(vec.end()) === true)
				if (m_it.second.equals(map.end()) === false)
					throw new std.DomainError("Error std.upper_bound or Set.upper_bound; someone is out bound but the other is not.");
				else
					continue;
			else if (v_it.second.value.first !==m_it.second.first)
				throw new std.DomainError("Error std.upper_bound or Set.upper_bound; different value.");
		}
	}

	function _Compare_numbers_pair(x: std.Pair<number, number>, y: std.Pair<number, number>): boolean
	{
		return x.first < y.first;
	}
}