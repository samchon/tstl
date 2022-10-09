//================================================================
/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IBidirectionalContainer } from "../ranges/container/IBidirectionalContainer";
import { IReversableIterator } from "./IReversableIterator";
import { IReverseIterator } from "./IReverseIterator";

import { IPointer } from "../functional/IPointer";
import { IForwardContainer } from "../ranges/container/IForwardContainer";
import { IInsert } from "../internal/container/partial/IInsert";
import { IPushFront } from "../internal/container/partial/IPushFront";
import { IPushBack } from "../internal/container/partial/IPushBack";

import { InsertIterator } from "./InsertIterator";
import { FrontInsertIterator } from "./FrontInsertIterator";
import { BackInsertIterator } from "./BackInsertIterator";
import { IForwardIterator } from "./IForwardIterator";
import { Vector } from "../container/Vector";

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
export function begin<Container extends Array<any> | IForwardContainer<any>>(
    container: Container,
): IForwardContainer.IteratorType<Container>;

export function begin<T>(container: Array<T> | Vector<T>): Vector.Iterator<T> {
    if (container instanceof Array) container = Vector.wrap(container);
    return container.begin();
}

/**
 * Iterator to the end.
 *
 * @param container Target container.
 * @return Iterator to the end.
 */
export function end<Container extends Array<any> | IForwardContainer<any>>(
    container: Container,
): IForwardContainer.IteratorType<Container>;

export function end<T>(container: Array<T> | Vector<T>): Vector.Iterator<T> {
    if (container instanceof Array) container = Vector.wrap(container);
    return container.end();
}

/**
 * Get reverse iterator to the first element in reverse.
 *
 * @param container Target container.
 * @return The reverse iterator to the first.
 */
export function rbegin<
    Container extends Array<any> | IBidirectionalContainer<any, any>,
>(container: Container): IBidirectionalContainer.ReverseIteratorType<Container>;

export function rbegin<T>(
    container: Array<T> | Vector<T>,
): Vector.ReverseIterator<T> {
    if (container instanceof Array) container = Vector.wrap(container);
    return container.rbegin();
}

/**
 * Get reverse iterator to the reverse end.
 *
 * @param container Target container.
 * @return The reverse iterator to the end.
 */
export function rend<
    Container extends Array<any> | IBidirectionalContainer<any, any>,
>(container: Container): IBidirectionalContainer.ReverseIteratorType<Container>;

export function rend<T>(
    container: Array<T> | Vector<T>,
): Vector.ReverseIterator<T> {
    if (container instanceof Array) container = Vector.wrap(container);
    return container.rend();
}

/**
 * Construct reverse iterator.
 *
 * @param it Target iterator that reversable.
 * @return The reverse iterator object.
 */
export function make_reverse_iterator<
    IteratorT extends IReversableIterator<
        IPointer.ValueType<IteratorT>,
        IteratorT,
        ReverseT
    >,
    ReverseT extends IReverseIterator<
        IPointer.ValueType<IteratorT>,
        IteratorT,
        ReverseT
    >,
>(it: IteratorT): ReverseT {
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
export function inserter<
    Container extends IInsert<Iterator>,
    Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>,
>(container: Container, it: Iterator): InsertIterator<Container, Iterator> {
    return new InsertIterator(container, it);
}

/**
 * Construct front insert iterator.
 *
 * @param source Target container.
 * @return The {@link FrontInsertIterator front insert iterator} object.
 */
export function front_inserter<
    Source extends IPushFront<FrontInsertIterator.ValueType<Source>>,
>(source: Source): FrontInsertIterator<Source> {
    return new FrontInsertIterator(source);
}

/**
 * Construct back insert iterator.
 *
 * @param source Target container.
 * @return The {@link back insert iterator} object.
 */
export function back_inserter<Source extends Array<any> | IPushBack<any>>(
    source: Source,
): BackInsertIterator<BackInsertIterator.SourceType<Source>>;

export function back_inserter<T>(
    source: Array<T> | Vector<T>,
): BackInsertIterator<Vector<T>> {
    if (source instanceof Array) source = Vector.wrap(source);
    return new BackInsertIterator(source);
}
