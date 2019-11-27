//================================================================ 
/** @module std */
//================================================================
import { IBidirectionalContainer } from "../base/disposable/IBidirectionalContainer";
import { IReversableIterator, IReverseIterator } from "./IReverseIterator";

import { IPointer } from "../functional/IPointer";
import { IForwardContainer } from "../base/disposable/IForwardContainer";
import { _IInsert, _IPushFront, _IPushBack } from "../base/disposable/IPartialContainers";

import { InsertIterator } from "./InsertIterator";
import { FrontInsertIterator } from "./FrontInsertIterator";
import { BackInsertIterator } from "./BackInsertIterator";
import { IForwardIterator } from "./IForwardIterator";

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
export function begin<Container extends IForwardContainer<any>>
    (container: Container): IForwardContainer.IteratorType<Container>
{
    return container.begin();
}

/**
 * Iterator to the end.
 * 
 * @param container Target container.
 * @return Iterator to the end.
 */
export function end<Container extends IForwardContainer<any>>
    (container: Container): IForwardContainer.IteratorType<Container>
{
    return container.end();
}

/**
 * Get reverse iterator to the first element in reverse.
 * 
 * @param container Target container.
 * @return The reverse iterator to the first.
 */
export function rbegin<Container extends IBidirectionalContainer<any, any>>
    (container: Container): IBidirectionalContainer.ReverseIteratorType<Container>
{
    return container.rbegin();
}

/**
 * Get reverse iterator to the reverse end.
 * 
 * @param container Target container.
 * @return The reverse iterator to the end.
 */
export function rend<Source extends IBidirectionalContainer<any, any>>
    (container: Source): IBidirectionalContainer.ReverseIteratorType<Source>
{
    return container.rend();
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
export function inserter<
        Container extends _IInsert<Iterator>,
        Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>
    (container: Container, it: Iterator): InsertIterator<Container, Iterator>
{    
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
export function back_inserter<Source extends _IPushBack<any>>
    (source: Source): BackInsertIterator<Source>
{
    return new BackInsertIterator(source);
}