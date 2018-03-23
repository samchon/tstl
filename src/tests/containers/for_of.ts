import * as std from "../../index";

export function test_for_of_iterations(): void
{
	// LINEAR CONTAINERS
	_Test_for_of_iteration(new std.Vector<number>());
	_Test_for_of_iteration(new std.Deque<number>());
	_Test_for_of_iteration(new std.List<number>());

	// ASSOCIATIVE CONTAINERS
	_Test_for_of_iteration(new std.TreeSet<number>());
	_Test_for_of_map_iteration();
}

function _Test_for_of_iteration<
		SourceT extends std.base.IContainer<number, SourceT, IteratorT, ReverseT>,
		IteratorT extends std.base.Iterator<number, SourceT, IteratorT, ReverseT>, 
		ReverseT extends std.base.ReverseIterator<number, SourceT, IteratorT, ReverseT>>
	(vec: SourceT): void
{
	//----
	// CONSTRUCTIONS
	//----
	// CONSTRUCT ITEMS TO VALIDATE
	let items: number[] = [];
	for (let i: number = 0; i < 10; ++i)
		items.push(i);

	// PUSH THEM ALL TO THE CONTAINER
	vec.push(...items);

	//----
	// VALIDATION
	//----
	let i: number = 0;

	for (let elem of vec)
		if (elem != items[i++])
			throw new std.DomainError("Wrong for of iteration.");
}

function _Test_for_of_map_iteration(): void
{
	//----
	// CONSTRUCTIONS
	//----
	// CONSTRUCT ITEMS TO VALIDATE
	let map = new std.TreeMap<number, number>();
	let items: std.Pair<number, number>[] = [];

	for (let i: number = 0; i < 10; ++i)
		items.push(std.make_pair(i, i));

	// PUSH THEM ALL TO THE CONTAINER
	map.push(...items);

	//----
	// VALIDATION
	//----
	let i: number = 0;

	for (let pair of map)
		if (std.equal_to(pair, items[i++]) == false)
			throw new std.DomainError("Wrong for of iteration.");
}