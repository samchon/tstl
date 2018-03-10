import { IForwardIterator } from "./IForwardIterator";
import { IForwardContainer, IBidirectionalContainer } from "../base/disposable/IForwardContainer";
import { IReversableIterator, IReverseIterator } from "./IReverseIterator";

import { InsertIterator } from "./InsertIterator";
import { FrontInsertIterator } from "./FrontInsertIterator";
import { BackInsertIterator } from "./BackInsertIterator";

import { _IInsert, _IPushFront, _IPushBack } from "../base/disposable/IPartialContainers";
import { Vector } from "../containers/Vector";

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

export function inserter<T, Container extends _IInsert<T, Iterator>, Iterator extends IForwardIterator<T, Iterator>>
	(container: Container, it: Iterator): InsertIterator<T, Container, Iterator>;

export function inserter<T>
	(container: Array<T> | _IInsert<T, any>, it: IForwardIterator<T, any>): InsertIterator<T, any, any>
{
	if (container instanceof Array)
		container = _Capsule(container);
	
	return new InsertIterator(<any>container, it);
}

export function front_inserter<T, Source extends _IPushFront<T>>
	(source: Source): FrontInsertIterator<T, Source>
{
	return new FrontInsertIterator(source);
}

export function back_inserter<T>
	(source: Array<T>): BackInsertIterator<T, Vector<T>>;

export function back_inserter<T, Source extends _IPushBack<T>>
	(source: Source): BackInsertIterator<T, Source>

export function back_inserter<T>
	(source: Array<T> | _IPushBack<T>): BackInsertIterator<T, any>
{
	if (source instanceof Array)
		source = _Capsule(source);

	return new BackInsertIterator(<any>source);
}

//----
// REVERSE ITERATORS
//----
export function make_reverse_iterator<T, 
		IteratorT extends IReversableIterator<T, IteratorT, ReverseT>, 
		ReverseT extends IReverseIterator<T, IteratorT, ReverseT>>
	(it: IteratorT): ReverseT
{
	return it.reverse();
}

export function rbegin<T>(container: Array<T>): Vector.ReverseIterator<T>;
export function rbegin<T, 
	Iterator extends IReversableIterator<T, Iterator, ReverseIterator>,
	ReverseIterator extends IReverseIterator<T, Iterator, ReverseIterator>>
	(container: IBidirectionalContainer<T, Iterator, ReverseIterator>): ReverseIterator;

export function rbegin(source: any): any
{
	if (source instanceof Array)
		source = _Capsule(source);

	source.rbegin();
}

export function rend<T>(container: Array<T>): Vector.ReverseIterator<T>;
export function rend<T, 
	Iterator extends IReversableIterator<T, Iterator, ReverseIterator>,
	ReverseIterator extends IReverseIterator<T, Iterator, ReverseIterator>>
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