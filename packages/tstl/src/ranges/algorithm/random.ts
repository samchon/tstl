//================================================================

/**
 * @packageDocumentation
 * @module std.ranges
 */
//================================================================
import * as base from "../../algorithm/random";
import { IPointer } from "../../functional/IPointer";
import { Writeonly } from "../../internal/functional/Writeonly";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { begin, end } from "../../iterator/factory";
import { IForwardContainer } from "../container/IForwardContainer";

/**
 * Select up to `n` elements without replacement and write them in input order.
 * The destination must be outside the input range. Runs in linear time with
 * constant extra storage.
 *
 * @param range Input range.
 * @param first Iterator to the start of the destination.
 * @param n Maximum number of elements to select.
 *
 * @return The iterator immediately after the last value written.
 */
export function sample<
  Range extends Array<any> | IForwardContainer<any>,
  OutputIterator extends Writeonly<
    IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>
  >,
>(range: Range, first: OutputIterator, n: number): OutputIterator {
  return base.sample(begin(range), end(range), first, n);
}
