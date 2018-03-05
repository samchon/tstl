/// <reference path="API.ts" />

/// <reference path="iterators/InsertIterator.ts" />
/// <reference path="iterators/FrontInsertIterator.ts" />
/// <reference path="iterators/BackInsertIterator.ts" />
/// <reference path="iterators/JSArrayIterator.ts" />

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
	export function empty<T>(source: Array<T>): boolean;
	export function empty(source: base._IEmpty): boolean;

	export function empty(source: Array<any> | base._IEmpty): boolean
	{
		if (source instanceof Array)
			return source.length != 0;
		else
			return source.empty();
	}

	export function size<T>(source: Array<T>): number;
	export function size(source: base._ISize): number

	export function size(source: Array<any> | base._ISize): number
	{
		if (source instanceof Array)
			return source.length;
		else
			return source.size();
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
	function _Distance_via_index<T>(first: IRandomAccessIterator<T>, last: IRandomAccessIterator<T>): number
	{
		let start: number = first.index();
		let end: number = last.index();

		return Math.abs(end - start);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	export function advance<T, InputIterator extends IForwardIterator<T>>
		(it: InputIterator, n: number): InputIterator
	{
		if ((<any>it).advance instanceof Function)
			it = (<any>it).advance(n);
		else if (n > 0)
			for (let i: number = 0; i < n; ++i)
				it = it.next() as InputIterator;
		else
		{
			let p_it: IBidirectionalIterator<T> = <any>it;
			if (!(p_it.next instanceof Function))
				throw new std.OutOfRange("It's not bidirectional iterator. Advancing to negative value is impossible.");

			n = -n;
			for (let i: number = 0; i < n; ++i)
				p_it = p_it.prev();

			it = <any>p_it;
		}
		return it;
	}
	
	export function prev<T, BidirectionalIterator extends IBidirectionalIterator<T>>
		(it: BidirectionalIterator, n: number = 1): BidirectionalIterator
	{
		if (n == 1)
			return it.prev() as BidirectionalIterator;
		else
			return advance(it, -n);
	}
	
	export function next<T, ForwardIterator extends IForwardIterator<T>>
		(it: ForwardIterator, n: number = 1): ForwardIterator
	{	
		if (n == 1)
			return it.next() as ForwardIterator;
		else
			return advance(it, n);
	}

	/* ---------------------------------------------------------
		FACTORIES
	--------------------------------------------------------- */
	// BEGIN & END
	//----
	export function begin<T>(container: Array<T>): JSArray.Iterator<T>;
	export function begin<T, Source extends base.ArrayContainer<T, Source>>(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function begin<T>(container: List<T>): List.Iterator<T>;
	export function begin<T>(container: ForwardList<T>): ForwardList.Iterator<T>;
	export function begin<T, Source extends base.SetContainer<T, Source>>(container: base.SetContainer<T, Source>): base.SetIterator<T, Source>;
	export function begin<Key, T, Source extends base.MapContainer<Key, T, Source>>(container: base.MapContainer<Key, T, Source>): base.MapIterator<Key, T, Source>;

	// typedef is not specified in TypeScript yet.
	// Instead, I listed all the containers and its iterators as overloaded functions
	export function begin(container: any): any
	{
		if (container instanceof Array)
			container = _Capsule(container);
		
		return container.begin();
	}
	
	export function end<T>(container: Array<T>): JSArray.Iterator<T>;
	export function end<T, Source extends base.ArrayContainer<T, Source>>(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function end<T>(container: List<T>): List.ReverseIterator<T>;
	export function end<T>(container: ForwardList<T>): ForwardList.Iterator<T>;
	export function end<T, Source extends base.SetContainer<T, Source>>(container: base.SetContainer<T, Source>): base.SetIterator<T, Source>;
	export function end<Key, T, Source extends base.MapContainer<Key, T, Source>>(container: base.MapContainer<Key, T, Source>): base.MapIterator<Key, T, Source>;

	export function end(container: any): any
	{
		if (container instanceof Array)
			container = _Capsule(container);
		
		return container.end();
	}

	//----
	// INSERTERS
	//----
	export function inserter<T>
		(container: Array<T>, it: Vector.Iterator<T>): InsertIterator<T, Vector<T>, Vector.Iterator<T>>;

	export function inserter<T, Container extends base._IInsert<T, Iterator>, Iterator extends IForwardIterator<T>>
		(container: Container, it: Iterator): InsertIterator<T, Container, Iterator>;

	export function inserter<T>
		(container: Array<T> | base._IInsert<T, any>, it: IForwardIterator<T>): InsertIterator<T, any, any>
	{
		if (container instanceof Array)
			container = _Capsule(container);
		
		return new InsertIterator(<any>container, it);
	}

	export function front_inserter<T, Source extends base._IPushFront<T>>
		(source: Source): FrontInsertIterator<T, Source>
	{
		return new FrontInsertIterator(source);
	}

	export function back_inserter<T>
		(source: Array<T>): BackInsertIterator<T, Vector<T>>;
	
	export function back_inserter<T, Source extends base._IPushBack<T>>
		(source: Source): BackInsertIterator<T, Source>

	export function back_inserter<T>
		(source: Array<T> | base._IPushBack<T>): BackInsertIterator<T, any>
	{
		if (source instanceof Array)
			source = _Capsule(source);

		return new BackInsertIterator(<any>source);
	}

	//----
	// REVERSE ITERATORS
	//----
	export function make_reverse_iterator<T, Source extends base.ArrayContainer<T, Source>>(it: base.ArrayIterator<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function make_reverse_iterator<T>(it: List.Iterator<T>): List.ReverseIterator<T>;
	export function make_reverse_iterator<T, Source extends base.SetContainer<T, Source>>(it: base.SetIterator<T, Source>): base.SetReverseIterator<T, Source>;
	export function make_reverse_iterator<Key, T, Source extends base.MapContainer<Key, T, Source>>(it: base.MapIterator<Key, T, Source>): base.MapReverseIterator<Key, T, Source>;

	export function make_reverse_iterator(it: any): any
	{
		if (it instanceof base.ArrayIterator)
			return new base.ArrayReverseIterator(it);
		else if (it instanceof List.Iterator)
			return new List.ReverseIterator<any>(it);

		else if (it instanceof base.SetIterator)
			return new base.SetReverseIterator<any, any>(it);
		else if (it instanceof base.MapIterator)
			return new base.MapReverseIterator<any, any, any>(it);
	}
	
	export function rbegin<T, Source extends base.ArrayContainer<T, Source>>(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function rbegin<T>(container: List<T>): List.ReverseIterator<T>;
	export function rbegin<T, Source extends base.SetContainer<T, Source>>(container: base.SetContainer<T, Source>): base.SetIterator<T, Source>;
	export function rbegin<Key, T, Source extends base.MapContainer<Key, T, Source>>(container: base.MapContainer<Key, T, Source>): base.MapIterator<Key, T, Source>;

	export function rbegin(container: any): any
	{
		make_reverse_iterator(end(container));
	}

	export function rend<T, Source extends base.ArrayContainer<T, Source>>(container: base.ArrayContainer<T, Source>): base.ArrayReverseIterator<T, Source>;
	export function rend<T>(container: List<T>): List.ReverseIterator<T>;
	export function rend<T, Source extends base.SetContainer<T, Source>>(container: base.SetContainer<T, Source>): base.SetIterator<T, Source>;
	export function rend<Key, T, Source extends base.MapContainer<Key, T, Source>>(container: base.MapContainer<Key, T, Source>): base.MapIterator<Key, T, Source>;

	export function rend(container: any): any
	{
		return make_reverse_iterator(begin(container));
	}

	function _Capsule<T>(array: Array<T>): Vector<T>
	{
		let ret: Vector<T> = new Vector();
		ret["data_"] = array;

		return ret;
	}
}