//================================================================ 
/** @module std */
//================================================================
import { IForwardIterator } from "./IForwardIterator";
import { IBidirectionalContainer } from "../base/disposable/IBidirectionalContainer";
import { IReversableIterator, IReverseIterator } from "./IReverseIterator";

import { IPointer } from "../functional/IPointer";
import { IForwardContainer } from "../base/disposable/IForwardContainer";
import { _IInsert, _IPushFront, _IPushBack } from "../base/disposable/IPartialContainers";
import { Vector } from "../container/Vector";

import { InsertIterator } from "./InsertIterator";
import { FrontInsertIterator } from "./FrontInsertIterator";
import { BackInsertIterator } from "./BackInsertIterator";

/* ---------------------------------------------------------
    FACTORIES
--------------------------------------------------------- */
// BEGIN & END
//----
/**
 * Iterator to the first element.
 * 
 * @param container Target container.
 * @return Iterator to the first element.
 */
export function begin<Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>
    (container: IForwardContainer<Iterator>): Iterator;

/**
 * @hidden
 */
export function begin<T>(container: Array<T>): Vector.Iterator<T>;
export function begin(container: any): any
{
    if (container instanceof Array)
        container = Vector._Capsule(container);
    
    return container.begin();
}

/**
 * Iterator to the end.
 * 
 * @param container Target container.
 * @return Iterator to the end.
 */
export function end<Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>
    (container: IForwardContainer<Iterator>): Iterator;

/**
 * @hidden
 */
export function end<T>(container: Array<T>): Vector.Iterator<T>;
export function end(container: any): any
{
    if (container instanceof Array)
        container = Vector._Capsule(container);
    
    return container.end();
}

//----
// INSERTERS
//----
/**
 * Construct insert iterator.
 * 
 * @param container Target container.
 * @param it Iterator to the first insertion position.
 * @return The {@link InsertIterator insert iterator} object.
 */
export function inserter<Container extends _IInsert<Iterator>, Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>
    (container: Container, it: Iterator): InsertIterator<Container, Iterator>;

/**
 * @hidden
 */
export function inserter<T>
    (container: Array<T>, it: Vector.Iterator<T>): InsertIterator<Vector<T>, Vector.Iterator<T>>;

export function inserter
    (container: Array<any> | _IInsert<any>, it: IForwardIterator<any, any>): InsertIterator<any, any>
{
    if (container instanceof Array)
        container = Vector._Capsule(container);
    
    return new InsertIterator(<any>container, it);
}

/**
 * Construct front insert iterator.
 * 
 * @param source Target container.
 * @return The {@link FrontInsertIterator front insert iterator} object.
 */
export function front_inserter<T, Source extends _IPushFront<T>>
    (source: Source): FrontInsertIterator<T, Source>
{
    return new FrontInsertIterator(source);
}

/**
 * Construct back insert iterator.
 * 
 * @param source Target container.
 * @return The {@link back insert iterator} object.
 */
export function back_inserter<T, Source extends _IPushBack<T>>
    (source: Source): BackInsertIterator<T, Source>

/**
 * @hidden
 */
export function back_inserter<T>
    (source: Array<T>): BackInsertIterator<T, Vector<T>>;

export function back_inserter<T>
    (source: Array<T> | _IPushBack<T>): BackInsertIterator<T, any>
{
    if (source instanceof Array)
        source = Vector._Capsule(source);

    return new BackInsertIterator(<any>source);
}

//----
// REVERSE ITERATORS
//----
/**
 * Construct reverse iterator.
 * 
 * @param it Target iterator that reversable.
 * @return The reverse iterator object.
 */
export function make_reverse_iterator<T, 
        IteratorT extends IReversableIterator<T, IteratorT, ReverseT>, 
        ReverseT extends IReverseIterator<T, IteratorT, ReverseT>>
    (it: IteratorT): ReverseT
{
    return it.reverse();
}

/**
 * Get reverse iterator to the first element in reverse.
 * 
 * @param container Target container.
 * @return The reverse iterator to the first.
 */
export function rbegin<
        Iterator extends IReversableIterator<IPointer.ValueType<Iterator>, Iterator, ReverseIterator>,
        ReverseIterator extends IReverseIterator<IPointer.ValueType<Iterator>, Iterator, ReverseIterator>>
    (container: IBidirectionalContainer<Iterator, ReverseIterator>): ReverseIterator;

/**
 * @hidden
 */
export function rbegin<T>(container: Array<T>): Vector.ReverseIterator<T>;
export function rbegin(source: any): any
{
    if (source instanceof Array)
        source = Vector._Capsule(source);

    source.rbegin();
}

/**
 * Get reverse iterator to the reverse end.
 * 
 * @param container Target container.
 * @return The reverse iterator to the end.
 */
export function rend<
        Iterator extends IReversableIterator<IPointer.ValueType<Iterator>, Iterator, ReverseIterator>,
        ReverseIterator extends IReverseIterator<IPointer.ValueType<Iterator>, Iterator, ReverseIterator>>
    (container: IBidirectionalContainer<Iterator, ReverseIterator>): ReverseIterator;

/**
 * @hidden
 */
export function rend<T>(container: Array<T>): Vector.ReverseIterator<T>;
export function rend(source: any): any
{
    if (source instanceof Array)
        source = Vector._Capsule(source);

    source.rend();
}