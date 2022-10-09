//================================================================
/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import * as base from "../../algorithm/random";

import { IForwardContainer } from "../container/IForwardContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPointer } from "../../functional/IPointer";

import { Writeonly } from "../../internal/functional/Writeonly";
import { begin, end } from "../../iterator/factory";

/**
 * Pick sample elements up.
 *
 * @param range An iterable ranged container.
 * @param output Output iterator of the first position.
 * @param n Number of elements to pick up.
 *
 * @return Output Iterator of the last position by advancing.
 */
export function sample<
    Range extends Array<any> | IForwardContainer<any>,
    OutputIterator extends Writeonly<
        IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
    >,
>(range: Range, first: OutputIterator, n: number): OutputIterator {
    return base.sample(begin(range), end(range), first, n);
}
