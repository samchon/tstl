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
	export function empty(source: any): boolean
	{
		if (source instanceof Array)
			return source.length != 0;
		else
			return source.empty();
	}

	export function size<T>(source: Array<T>): number;
	export function size(source: base._ISize): number
	export function size(source: any): number
	{
		if (source instanceof Array)
			return source.length;
		else
			return source.size();
	}

	export function distance<T, InputIterator extends IForwardIterator<T, InputIterator>>
		(first: InputIterator, last: InputIterator): number
	{
		if ((<any>first).index != undefined)
			return _Distance_via_index(<any>first, <any>last);

		let length: number = 0;
		for (; !first.equals(last); first = first.next())
			length++;

		return length;
	}

	/**
	 * @hidden
	 */
	function _Distance_via_index<T, RandomAccessIterator extends IRandomAccessIterator<T, RandomAccessIterator>>
		(first: RandomAccessIterator, last: RandomAccessIterator): number
	{
		let start: number = first.index();
		let end: number = last.index();

		return Math.abs(end - start);
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	export function advance<T, InputIterator extends IForwardIterator<T, InputIterator>>
		(it: InputIterator, n: number): InputIterator
	{
		if ((<any>it).advance instanceof Function)
			it = (<any>it).advance(n);
		else if (n > 0)
			for (let i: number = 0; i < n; ++i)
				it = it.next();
		else
		{
			let p_it: IBidirectionalIterator<T, any> = <any>it;
			if (!(p_it.next instanceof Function))
				throw new std.OutOfRange("It's not bidirectional iterator. Advancing to negative value is impossible.");

			n = -n;
			for (let i: number = 0; i < n; ++i)
				p_it = p_it.prev();

			it = <any>p_it;
		}
		return it;
	}
	
	export function prev<T, BidirectionalIterator extends IBidirectionalIterator<T, BidirectionalIterator>>
		(it: BidirectionalIterator, n: number = 1): BidirectionalIterator
	{
		if (n == 1)
			return it.prev();
		else
			return advance(it, -n);
	}
	
	export function next<T, ForwardIterator extends IForwardIterator<T, ForwardIterator>>
		(it: ForwardIterator, n: number = 1): ForwardIterator
	{	
		if (n == 1)
			return it.next();
		else
			return advance(it, n);
	}

	/* ---------------------------------------------------------
		FACTORIES
	--------------------------------------------------------- */
	// BEGIN & END
	//----
	export function begin<T>(container: Array<T>): Vector.Iterator<T>;
	export function begin<T, Iterator extends IForwardIterator<T, Iterator>>
		(container: IForwardContainer<T, Iterator>): Iterator;

	export function begin(container: any): any
	{
		if (container instanceof Array)
			container = _Capsule(container);
		
		return container.begin();
	}
	
	export function end<T>(container: Array<T>): Vector.Iterator<T>;
	export function end<T, Iterator extends IForwardIterator<T, Iterator>>
		(container: IForwardContainer<T, Iterator>): Iterator;

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

	export function inserter<T, Container extends base._IInsert<T, Iterator>, Iterator extends IForwardIterator<T, Iterator>>
		(container: Container, it: Iterator): InsertIterator<T, Container, Iterator>;

	export function inserter<T>
		(container: Array<T> | base._IInsert<T, any>, it: IForwardIterator<T, any>): InsertIterator<T, any, any>
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
	export function rbegin<T>(container: Array<T>): Vector.ReverseIterator<T>;
	export function rbegin<T, 
		Iterator extends IBidirectionalIterator<T, Iterator>,
		ReverseIterator extends IBidirectionalIterator<T, ReverseIterator>>
		(container: IBidirectionalContainer<T, Iterator, ReverseIterator>): ReverseIterator;

	export function rbegin(source: any): any
	{
		if (source instanceof Array)
			source = _Capsule(source);

		source.rbegin();
	}

	export function rend<T>(container: Array<T>): Vector.ReverseIterator<T>;
	export function rend<T, 
		Iterator extends IBidirectionalIterator<T, Iterator>,
		ReverseIterator extends IBidirectionalIterator<T, ReverseIterator>>
		(container: IBidirectionalContainer<T, Iterator, ReverseIterator>): ReverseIterator;

	export function rend(source: any): any
	{
		if (source instanceof Array)
			source = _Capsule(source);

		source.rend();
	}

	/**
	 * @hidden
	 */
	function _Capsule<T>(array: Array<T>): Vector<T>
	{
		let ret: Vector<T> = new Vector();
		ret["data_"] = array;

		return ret;
	}
}