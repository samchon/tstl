//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../../algorithm/sorting");

import { IForwardContainer } from "../container/IForwardContainer";
import { IForwardIterator } from "../../iterator";
import { IRandomAccessContainer } from "../container/IRandomAccessContainer";
import { General } from "../../internal/types/General";

import { begin, end } from "../../iterator/factory";
import { less } from "../../functional/comparators";

/**
 * @hidden
 */
type Comparator<Range extends Array<any> | IForwardContainer<any>> =
    (
        x: IForwardContainer.ValueType<Range>,
        y: IForwardContainer.ValueType<Range>
    ) => boolean;

/* ---------------------------------------------------------
    SORT
--------------------------------------------------------- */
export function sort<Range extends Array<any> | IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<Range> = less): void
{
    return base.sort(begin(range), end(range), comp);
}

export function stable_sort<Range extends Array<any> | IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<Range> = less): void
{
    return base.stable_sort(begin(range), end(range), comp);
}

export function partial_sort<Range extends Array<any> | IRandomAccessContainer<any>>
    (
        range: Range, 
        middle: IRandomAccessContainer.IteratorType<Range>, 
        comp: Comparator<Range> = less
    ): void
{
    return base.partial_sort(begin(range), <any>middle, end(range), comp);
}

export function partial_sort_copy<
        Range extends Array<any> | IRandomAccessContainer<any>,
        OutputIterator extends General<IForwardIterator<IRandomAccessContainer.ValueType<Range>, OutputIterator>>>
    (
        range: Range, 
        output_first: OutputIterator, 
        output_last: OutputIterator,
        comp: Comparator<Range> = less
    ): OutputIterator
{
    return base.partial_sort_copy(begin(range), end(range), output_first, output_last, comp);
}

export function nth_element<Range extends Array<any> | IRandomAccessContainer<any>>
    (
        range: Range,
        nth: IRandomAccessContainer.IteratorType<Range>,
        comp: Comparator<Range> = less
    ): void
{
    return base.nth_element(begin(range), <any>nth, end(range), comp);
}

/* ---------------------------------------------------------
    INSPECTOR
--------------------------------------------------------- */
export function is_sorted<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, comp: Comparator<Range> = less): boolean
{
    return base.is_sorted(begin(range), end(range), comp);
}

export function is_sorted_until<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, comp: Comparator<Range> = less): IForwardContainer.IteratorType<Range>
{
    return base.is_sorted_until(begin(range), end(range), comp);
}