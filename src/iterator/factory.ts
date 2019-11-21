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
    ITERATORS
--------------------------------------------------------- */
// BEGIN & END
//----
/**
 * Iterator to the first element.
 * 
 * @param container Target container.
 * @return Iterator to the first element.
 */
export function begin<Source extends Array<any> | IForwardContainer<any>>
    (container: Source): IForwardContainer.IteratorType<Source>
{
    if (container instanceof Array)
        container = Vector.wrap(container) as any;
    
    return (container as IForwardContainer<any>).begin();
}

/**
 * Iterator to the end.
 * 
 * @param container Target container.
 * @return Iterator to the end.
 */
export function end<Source extends Array<any> | IForwardContainer<any>>
    (container: Source): IForwardContainer.IteratorType<Source>
{
    if (container instanceof Array)
        container = Vector.wrap(container) as any;
    
    return (container as IForwardContainer<any>).end();
}

/**
 * Get reverse iterator to the first element in reverse.
 * 
 * @param container Target container.
 * @return The reverse iterator to the first.
 */
export function rbegin<Source extends Array<any> | IBidirectionalContainer<any, any>>
    (container: Source): IBidirectionalContainer.ReverseIteratorType<Source>
{
    if (container instanceof Array)
        container = Vector.wrap(container) as any;
    
    return (container as IBidirectionalContainer<any, any>).rbegin();
}

/**
 * Get reverse iterator to the reverse end.
 * 
 * @param container Target container.
 * @return The reverse iterator to the end.
 */
export function rend<Source extends Array<any> | IBidirectionalContainer<any, any>>
    (container: Source): IBidirectionalContainer.ReverseIteratorType<Source>
{
    if (container instanceof Array)
        container = Vector.wrap(container) as any;
    
    return (container as IBidirectionalContainer<any, any>).rend();
}

/**
 * Construct reverse iterator.
 * 
 * @param it Target iterator that reversable.
 * @return The reverse iterator object.
 */
export function make_reverse_iterator<
        IteratorT extends IReversableIterator<IPointer.ValueType<IteratorT>, IteratorT, ReverseT>, 
        ReverseT extends IReverseIterator<IPointer.ValueType<IteratorT>, IteratorT, ReverseT>>
    (it: IteratorT): ReverseT
{
    return it.reverse();
}

/* ---------------------------------------------------------
    INSERTERS
--------------------------------------------------------- */
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
 * Construct insert iterator.
 * 
 * @param container Target array.
 * @param it Iterator to the first insertion position.
 * @return The {@link InsertIterator insert iterator} object.
 */
export function inserter<T>
    (container: Array<T>, it: Vector.Iterator<T>): InsertIterator<Vector<T>, Vector.Iterator<T>>;

export function inserter
    (container: Array<any> | _IInsert<any>, it: IForwardIterator<any, any>): InsertIterator<any, any>
{
    if (container instanceof Array)
        container = Vector.wrap(container);
    
    return new InsertIterator(container, it);
}

/**
 * Construct front insert iterator.
 * 
 * @param source Target container.
 * @return The {@link FrontInsertIterator front insert iterator} object.
 */
export function front_inserter<Source extends _IPushFront<FrontInsertIterator.ValueType<Source>>>
    (source: Source): FrontInsertIterator<Source>
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
    (source: Source): BackInsertIterator<Source>

/**
 * @hidden
 */
export function back_inserter<T>
    (source: Array<T>): BackInsertIterator<Vector<T>>;

export function back_inserter<T>
    (source: Array<T> | _IPushBack<T>): BackInsertIterator<any>
{
    if (source instanceof Array)
        source = Vector.wrap(source);

    return new BackInsertIterator(source);
}