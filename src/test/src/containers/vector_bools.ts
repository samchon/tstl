/// <reference path="../API.ts" />

namespace test
{
	export function rand_bool(): boolean
	{
		return Math.random() < .5 ? false : true;
	}

	export function test_vector_bools()
	{
		_Test_vector_bool_elements_io();
		_Test_vector_bool_flip();
	}

	/* ---------------------------------------------------------
		ELEMENTS I/O
	--------------------------------------------------------- */
	function _Test_vector_bool_elements_io()
	{
		let v: std.Vector<boolean> = new std.Vector();
		let d: std.Deque<boolean> = new std.Deque();
		let l: std.List<boolean> = new std.List();
		let vb: std.VectorBoolean = new std.VectorBoolean();

		//----
		// PARTIAL TESTS
		//----
		// INITIALIZE WITH 10 FALSES
		_Modify_bool_containers(v, d, l, vb, function (obj)
		{
			obj.assign(10, false);
		});

		// REPEAT INSERTIONS
		for (let i: number = 0; i < 100; ++i)
		{
			let pos: number = std.experimental.randint(0, v.size());
			let size: number = std.experimental.randint(1, 10);
			let value: boolean = rand_bool();

			_Modify_bool_containers(v, d, l, vb, function (obj)
			{
				obj.insert(std.advance(obj.begin(), pos), size, value);
			});
			_Validate_bool_containers(v, d, l, vb);
		}

		// REPEAT DELETIONS
		for (let i: number = 0; i < 100; ++i)
		{
			let first: number = std.experimental.randint(0, v.size() - 1);
			let last: number = std.experimental.randint(first + 1, v.size());

			_Modify_bool_containers(v, d, l, vb, function (obj)
			{
				obj.erase(std.advance(obj.begin(), first), std.advance(obj.begin(), last));
			});
			_Validate_bool_containers(v, d, l, vb);
		}

		//----
		// REPEATED INSERTIONS & DELETIONS KEEPING SIZE
		//----
		// ASSIGN 10 FLAGS
		let initial_value: boolean = rand_bool();

		_Modify_bool_containers(v, d, l, vb, function (obj)
		{
			obj.assign(100, initial_value);
		});

		// CHANGE VALUES RANDOMLY
		for (let i = 0; i < 100; ++i)
		{
			let index: number = std.experimental.randint(0, 99);
			let value: boolean = rand_bool();

			_Modify_bool_containers(v, d, l, vb, function (obj)
			{
				std.advance(obj.begin(), index).value = value;
			});
			_Validate_bool_containers(v, d, l, vb);
		}

		// MASS DELETIONS AND INSERTIONS KEEPING SIZE
		for (let i = 0; i < 100; ++i)
		{
			// ERASE ELEMENTS
			let first_index: number = std.experimental.randint(0, v.size() - 1);
			let last_index: number = std.experimental.randint(first_index + 1, v.size());

			if (v.empty() || first_index >= last_index)
				continue;

			_Modify_bool_containers(v, d, l, vb, function (obj)
			{
				obj.erase(std.advance(obj.begin(), first_index), std.advance(obj.begin(), last_index));
			});

			// INSERT ELEMENTS
			let index: number = std.experimental.randint(0, v.size());
			let size: number = last_index - first_index;
			let value: boolean = rand_bool();

			_Modify_bool_containers(v, d, l, vb, function (obj)
			{
				obj.insert(std.advance(obj.begin(), index), size, value);
			});

			try
			{
				_Validate_bool_containers(v, d, l, vb);
			} 
			catch (exp)
			{
				console.log("Parameters", first_index, last_index, index, size, value);
				for (let i: number = 0; i < v.size(); ++i)
					if (v.at(i) != vb.at(i))
					{
						if (i != 0)
							console.log("Previous Index => " + (i-1), v.at(i-1), vb.at(i-1));
						console.log("Index => " + i, v.at(i), vb.at(i));
						
						break;
					}

				throw exp;
			}
		}
	}

	function _Validate_bool_containers
		(
			v: std.Vector<boolean>, 
			d: std.Deque<boolean>, 
			l: std.List<boolean>, 
			vb: std.VectorBoolean
		): void
	{
		if (v.size() != d.size() || std.equal(v.begin(), v.end(), d.begin()) == false)
			throw new std.DomainError("Invalid deque");
		else if (v.size() != l.size() || std.equal(v.begin(), v.end(), l.begin()) == false)
			throw new std.DomainError("Invalid list");
		else if (v.size() != vb.size() || std.equal(v.begin(), v.end(), vb.begin()) == false)
			throw new std.DomainError("Invalid vector_bool");
	}

	function _Modify_bool_containers
		(
			v: std.Vector<boolean>, 
			d: std.Deque<boolean>, 
			l: std.List<boolean>, 
			vb: std.VectorBoolean, 
			func: (container: std.base.ILinearContainer<boolean>) => void
		): void
	{
		func(v);
		func(d);
		func(l);
		func(vb);
	}

	/* ---------------------------------------------------------
		FLIP
	--------------------------------------------------------- */
	function _Test_vector_bool_flip()
	{
		let vb = new std.VectorBoolean();
		for (let i: number = 0; i < 100; ++i)
			vb.push_back(rand_bool());

		let cpy = new std.VectorBoolean(vb);
		cpy.flip();

		let valid = std.equal(vb.begin(), vb.end(), cpy.begin(), std.not_equal_to);
		if (valid == false)
			throw new std.DomainError("Error on std.vector_bool.flip().");
	}
}