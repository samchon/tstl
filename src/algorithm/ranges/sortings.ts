//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../sorting");

import { IForwardContainer } from "../../base/disposable/IForwardContainer";
import { IRandomAccessContainer } from "../../base/disposable/IRandomAccessContainer";
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

