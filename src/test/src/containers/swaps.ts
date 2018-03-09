/// <reference path="../API.ts" />

namespace test
{
	type P = std.Pair<number, number>

	export function test_swaps(): void
	{
		//----
		// REGULAR CONTAINERS
		//----
		// LINEARS
		_Test_container_swap("Vector", new std.Vector<P>(), new std.Vector<P>());
		_Test_container_swap("Deque", new std.Deque<P>(), new std.Deque<P>());
		_Test_container_swap("List", new std.List<P>(), new std.List<P>());

		// SET CONTAINERS
		_Test_container_swap("TreeSet", new std.TreeSet<P>(), new std.TreeSet<P>());
		_Test_container_swap("TreeMultiSet", new std.TreeMultiSet<P>(), new std.TreeMultiSet<P>());
		_Test_container_swap("HashSet", new std.HashSet<P>(), new std.HashSet<P>());
		_Test_container_swap("HashMultiSet", new std.HashMultiSet<P>(), new std.HashMultiSet<P>());

		// MAP CONTAINERS
		_Test_container_swap("TreeMap", new std.TreeMap<number, number>(), new std.TreeMap<number, number>());
		_Test_container_swap("TreeMultiMap", new std.TreeMultiMap<number, number>(), new std.TreeMultiMap<number, number>());
		_Test_container_swap("HashMap", new std.HashMap<number, number>(), new std.HashMap<number, number>());
		_Test_container_swap("HashMultiMap", new std.HashMultiMap<number, number>(), new std.HashMultiMap<number, number>());

		//----
		// SPECIAL CONTAINERS
		//----
		_Test_vector_bool_swap();
		_Test_forward_list_swap();
	}

	/* ---------------------------------------------------------
		REGULAR CONTAINERS
	--------------------------------------------------------- */
	function _Test_container_swap<SourceT extends std.base.Container<P, SourceT, IteratorT, ReverseT>, 
			IteratorT extends std.base.Iterator<P, SourceT, IteratorT, ReverseT>, 
			ReverseT extends std.base.ReverseIterator<P, SourceT, IteratorT, ReverseT>>
		(name: string, v1: SourceT, v2: SourceT): void
	{
		// INSERT ITEMS ON EACH CONTAINERS
		for (let i: number = 1; i <= 3; ++i)
		{
			v1.push(std.make_pair(i, i));
			v2.push(std.make_pair(i + 3, i + 3));
		}

		// SWAP THEM
		v1.swap(v2);

		// VALIDATE CONTENTS
		let sum: number = 0;
		for (let pair of v1)
			sum += pair.first;

		if (sum != 4 + 5 + 6)
			throw new std.DomainError(`Error on std.${name}.swap(); contents.`);
		else if (v1.begin().source() != v1)
			throw new std.DomainError(`Error on std.${name}.swap(); source.`);
		
		// VALIDATE NEW ITEMS
		v1.push(std.make_pair(7, 7));
		if (v1.end().prev().source() != v1)
			throw new std.DomainError(`Error on  std.${name}.swap(); source of newly inserted item.`);

		// VALIDATE ITERATORS' SOURCE
		_Validate_iterators_source(name, v1);
		_Validate_iterators_source(name, v2);

		// SPECIAL VALIDATION -> SET OR MAP
		if (v1 instanceof std.base.SetContainer && v2 instanceof std.base.SetContainer)
		{
			if (v1.find(std.make_pair(5, 5)).source() != v1 || v2.find(std.make_pair(2, 2)).source() != v2)
				throw new std.DomainError(`Error on std.${name}.swap(); Invalid key-source mapping.`);
		}
		else if (v1 instanceof std.base.MapContainer && v2 instanceof std.base.MapContainer)
		{
			if (v1.find(4).source() != v1 || v2.find(1).source() != v2)
				throw new std.DomainError(`Error on std.${name}.swap(); Invalid key-source mapping.`);
		}		
	}

	function _Validate_iterators_source<T,
			SourceT extends std.base.Container<T, SourceT, IteratorT, ReverseT>, 
			IteratorT extends std.base.Iterator<T, SourceT, IteratorT, ReverseT>, 
			ReverseT extends std.base.ReverseIterator<T, SourceT, IteratorT, ReverseT>>
		(name: string, container: SourceT): void
	{
		for (let it = container.begin(); !it.equals(container.end()); it = it.next())
			if (it.source() != container)
				throw new std.DomainError(`Error on std.${name}.swap(); reversable-iterator's source.`);

		for (let it = container.rbegin(); !it.equals(container.rend()); it = it.next())
			if (it.source() != container)
				throw new std.DomainError(`Error on std.${name}.swap(); reverse-iterator's source.`);
	}

	/* ---------------------------------------------------------
		SPECIAL CONTAINERS
	--------------------------------------------------------- */
	function _Test_vector_bool_swap(): void
	{
		let refer: std.VectorBoolean = new std.VectorBoolean();
		for (let i: number = 0; i < 100; ++i)
			refer.push_back(Math.random() < .5 ? false : true);

		let x: std.VectorBoolean = new std.VectorBoolean(refer);
		let y: std.VectorBoolean = new std.VectorBoolean(refer);
		y.flip(); // {y} = {!x}

		x.swap(y);
		if (std.equal(refer.begin(), refer.end(), y.begin()) == false)
			throw new std.DomainError("Error on std.vector_bool.swap(); contents.");

		_Validate_iterators_source("vector_bool", x);
		_Validate_iterators_source("vector_bool", y);
	}

	function _Test_forward_list_swap(): void
	{
		let x: std.ForwardList<number> = new std.ForwardList();
		let y: std.ForwardList<number> = new std.ForwardList();

		for (let i: number = 1; i <= 3; ++i)
		{
			x.push_front(i);
			y.push_front(i + 3);
		}
		x.swap(y);

		let sum: number = 0;
		for (let it = x.begin(); !it.equals(x.end()); it = it.next())
			sum += it.value;

		if (sum != 4 + 5 + 6)
			throw new std.DomainError("Error on std.forward_list.swap(); contents -> " + sum);

		_Validate_forward_list_iterator_source(x);
		_Validate_forward_list_iterator_source(y);
	}

	function _Validate_forward_list_iterator_source(source: std.ForwardList<number>): void
	{
		for (let it = source.before_begin(); !it.equals(source.end()); it = it.next())
			if (it.source() != source)
				throw new std.DomainError("Error on std.forward_list.swap(); source.");
	}
}