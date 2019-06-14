//================================================================ 
/** @module std */
//================================================================
import { IPointer } from "../functional";
import { IForwardIterator } from "./IForwardIterator";
import { IBidirectionalIterator } from "./IBidirectionalIterator";
import { IRandomAccessIterator } from "./IRandomAccessIterator";

import { InvalidArgument } from "../exception/LogicError";
import { _IEmpty, _ISize } from "../base/disposable/IPartialContainers";

/* =========================================================
    GLOBAL FUNCTIONS
        - ACCESSORS
        - MOVERS
        - FACTORIES
============================================================
    ACCESSORS
--------------------------------------------------------- */
/**
 * Test whether a container is empty.
 * 
 * @param source Target container.
 * @return Whether empty or not.
 */
export function empty(source: _IEmpty): boolean;

/**
 * @hidden
 */
export function empty<T>(source: Array<T>): boolean;
export function empty(source: any): boolean
{
    if (source instanceof Array)
        return source.length === 0;
    else
        return source.empty();
}

/**
 * Get number of elements of a container.
 * 
 * @param source Target container.
 * @return The number of elements in the container.
 */
export function size(source: _ISize): number

/**
 * @hidden
 */
export function size<T>(source: Array<T>): number;
export function size(source: any): number
{
    if (source instanceof Array)
        return source.length;
    else
        return source.size();
}

/**
 * Get distance between two iterators.
 * 
 * @param first Input iteartor of the first position.
 * @param last Input iterator of the last position.
 * 
 * @return The distance.
 */
export function distance<InputIterator extends IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>
    (first: InputIterator, last: InputIterator): number
{
    if ((first as any).index !== undefined)
        return _Distance_via_index(first as any, last);

    let ret: number = 0;
    for (; !first.equals(last); first = first.next())
        ++ret;

    return ret;
}

/**
 * @hidden
 */
function _Distance_via_index<RandomAccessIterator extends IRandomAccessIterator<IPointer.ValueType<RandomAccessIterator>, RandomAccessIterator>>
    (first: RandomAccessIterator, last: RandomAccessIterator): number
{
    let start: number = first.index();
    let end: number = last.index();

    if ((first as any).base instanceof Function)
        return start - end;
    else
        return end - start;    
}

/* ---------------------------------------------------------
    ACCESSORS
--------------------------------------------------------- */
/**
 * Advance iterator.
 * 
 * @param it Target iterator to advance.
 * @param n Step to advance.
 * 
 * @return The advanced iterator.
 */
export function advance<InputIterator extends IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>
    (it: InputIterator, n: number): InputIterator
{
    if ((it as any).advance instanceof Function)
        it = (it as any).advance(n);
    else if (n > 0)
        for (let i: number = 0; i < n; ++i)
            it = it.next();
    else
    {
        let p_it: IBidirectionalIterator<any, any> = it as any;
        if (!(p_it.prev instanceof Function))
            throw new InvalidArgument("Error on std.advance(): parametric iterator is not a bi-directional iterator, thus advancing to negative direction is not possible.");

        n = -n;
        for (let i: number = 0; i < n; ++i)
            p_it = p_it.prev();

        it = p_it as any;
    }
    return it;
}

/**
 * Get previous iterator.
 * 
 * @param it Iterator to move.
 * @param n Step to move prev.
 * @return An iterator moved to prev *n* steps.
 */
export function prev<BidirectionalIterator extends IBidirectionalIterator<IPointer.ValueType<BidirectionalIterator>, BidirectionalIterator>>
    (it: BidirectionalIterator, n: number = 1): BidirectionalIterator
{
    if (n === 1)
        return it.prev();
    else
        return advance(it, -n);
}

/**
 * Get next iterator.
 * 
 * @param it Iterator to move.
 * @param n Step to move next.
 * @return Iterator moved to next *n* steps.
 */
export function next<ForwardIterator extends IForwardIterator<IPointer.ValueType<ForwardIterator>, ForwardIterator>>
    (it: ForwardIterator, n: number = 1): ForwardIterator
{    
    if (n === 1)
        return it.next();
    else
        return advance(it, n);
}