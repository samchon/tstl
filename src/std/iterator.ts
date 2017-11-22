/// <reference path="API.ts" />

// Iterator definitions.
//
// @reference http://www.cplusplus.com/reference/iterator
// @author Jeongho Nam <http://samchon.org>

namespace std
{
	/* =========================================================
		GLOBAL FUNCTIONS
			- ACCESSORS
			- MOVERS
			- FACTORIES
	============================================================
		ACCESSORS
	--------------------------------------------------------- */
	export function size<T>(container: base.Container<T>): number
	{
		return container.size();
	}

	export function empty<T>(container: base.Container<T>): boolean
	{
		return container.empty();
	}

	export function distance<T, InputIterator extends IForwardIterator<T>>
		(first: InputIterator, last: InputIterator): number
	{
		if ((<any>first).index != undefined)
			return _Distance_via_index(<any>first, <any>last);

		let length: number = 0;
		for (; !first.equals(last); first = first.next() as InputIterator)
			length++;

		return length;
	}

	/**
	 * @hidden
	 */
	function _Distance_via_index<T>(first: base.IArrayIterator<T>, last: base.IArrayIterator<T>): number
	{
		let start: number = first.index();
		let end: number = last.index();

		if (start == -1)
			start = first.source().size();
		else if (end == -1)
			end = first.source().size();

		return Math.abs(end - start);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	export function advance<T, InputIterator extends IForwardIterator<T>>
		(it: InputIterator, n: number): InputIterator
	{
		return it.advance(n) as InputIterator;
	}
	
	export function prev<T, BidirectionalIterator extends IBidirectionalIterator<T>>
		(it: BidirectionalIterator, n: number = 1): BidirectionalIterator
	{
		return it.advance(-n) as BidirectionalIterator;
	}
	
	export function next<T, ForwardIterator extends IForwardIterator<T>>
		(it: ForwardIterator, n: number = 1): ForwardIterator
	{	
		return it.advance(n) as ForwardIterator;
	}

	/* ---------------------------------------------------------
		FACTORIES
	--------------------------------------------------------- */
	// BEGIN & END
	//--------
	export function begin<T>(container: Array<T>): JSArray.Iterator<T>;
	export function begin<T, Source extends base.IArrayContainer<T>>(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function begin<T>(container: List<T>): List.Iterator<T>;
	export function begin<T>(container: ForwardList<T>): ForwardList.Iterator<T>;
	export function begin<T, Source extends base.ISetContainer<T>>(container: base.SetContainer<T, Source>): base.SetIterator<T, Source>;
	export function begin<Key, T, Source extends base.IMapContainer<Key, T>>(container: base.MapContainer<Key, T, Source>): base.MapIterator<Key, T, Source>;

	// typedef is not specified in TypeScript yet.
	// Instead, I listed all the containers and its iterators as overloaded functions
	export function begin(container: any): any
	{
		if (container instanceof Array)
		{
			let vec = new std.Vector<any>();
			vec["data_"] = container;

			return vec.begin();
		}
		else
			return container.begin();
	}
	
	export function end<T>(container: Array<T>): JSArray.Iterator<T>;
	export function end<T, Source extends base.IArrayContainer<T>>(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function end<T>(container: List<T>): List.ReverseIterator<T>;
	export function end<T>(container: ForwardList<T>): ForwardList.Iterator<T>;
	export function end<T, Source extends base.ISetContainer<T>>(container: base.SetContainer<T, Source>): base.SetIterator<T, Source>;
	export function end<Key, T, Source extends base.IMapContainer<Key, T>>(container: base.MapContainer<Key, T, Source>): base.MapIterator<Key, T, Source>;

	export function end(container: any): any
	{
		if (container instanceof Array)
		{
			let vec = new std.Vector<any>();
			vec["data_"] = container;

			return vec.end();
		}
		else
			return container.end();
	}

	//--------
	// REVERSE ITERATORS
	//--------
	export function make_reverse_iterator<T, Source extends base.IArrayContainer<T>>(it: base.ArrayIterator<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function make_reverse_iterator<T>(it: List.Iterator<T>): List.ReverseIterator<T>;
	export function make_reverse_iterator<T, Source extends base.ISetContainer<T>>(it: base.SetIterator<T, Source>): base.SetReverseIterator<T, Source>;
	export function make_reverse_iterator<Key, T, Source extends base.IMapContainer<Key, T>>(it: base.MapIterator<Key, T, Source>): base.MapReverseIterator<Key, T, Source>;

	export function make_reverse_iterator(it: any): any
	{
		if (it instanceof base.ArrayIterator)
			return new base.ArrayReverseIterator<any, base.IArrayContainer<any>>(it);
		else if (it instanceof List.Iterator)
			return new List.ReverseIterator<any>(it);

		else if (it instanceof base.SetIterator)
			return new base.SetReverseIterator<any, any>(it);
		else if (it instanceof base.MapIterator)
			return new base.MapReverseIterator<any, any, any>(it);
	}
	
	export function rbegin<T, Source extends base.IArrayContainer<T>>(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function rbegin<T>(container: List<T>): List.ReverseIterator<T>;
	export function rbegin<T, Source extends base.ISetContainer<T>>(container: base.SetContainer<T, Source>): base.SetIterator<T, Source>;
	export function rbegin<Key, T, Source extends base.IMapContainer<Key, T>>(container: base.MapContainer<Key, T, Source>): base.MapIterator<Key, T, Source>;

	export function rbegin(container: any): any
	{
		make_reverse_iterator(end(container));
	}

	export function rend<T, Source extends base.IArrayContainer<T>>(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function rend<T>(container: List<T>): List.ReverseIterator<T>;
	export function rend<T, Source extends base.ISetContainer<T>>(container: base.SetContainer<T, Source>): base.SetIterator<T, Source>;
	export function rend<Key, T, Source extends base.IMapContainer<Key, T>>(container: base.MapContainer<Key, T, Source>): base.MapIterator<Key, T, Source>;

	export function rend(container: any): any
	{
		return make_reverse_iterator(begin(container));
	}
}