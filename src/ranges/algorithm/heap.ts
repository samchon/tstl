//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../../algorithm/heap");

import { IRandomAccessContainer } from "../../base/disposable/IRandomAccessContainer";
import { begin, end } from "../../iterator/factory";
import { less } from "../../functional/comparators";

/**
 * @hidden
 */
type Comparator<Range extends IRandomAccessContainer<any>> =
    (
        x: IRandomAccessContainer.ValueType<Range>, 
        y: IRandomAccessContainer.ValueType<Range>
    ) => boolean;

/* ---------------------------------------------------------
    PUSH & POP
--------------------------------------------------------- */
export function make_heap<Range extends IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<Range> = less): void
{
    return base.make_heap(begin(range), end(range), comp);
}

export function push_heap<Range extends IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<Range> = less): void
{
    return base.push_heap(begin(range), end(range), comp);
}

export function pop_heap<Range extends IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<Range> = less): void
{
    return base.pop_heap(begin(range), end(range), comp);
}

/* ---------------------------------------------------------
    SORT
--------------------------------------------------------- */
export function is_heap<Range extends IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<Range> = less): boolean
{
    return base.is_heap(begin(range), end(range), comp);
}

export function is_heap_until<Range extends IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<Range> = less): IRandomAccessContainer.IteratorType<Range>
{
    return base.is_heap_until(<any>begin(range), <any>end(range), <any>comp);
}

export function sort_heap<Range extends IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<Range> = less): void
{
    return base.sort_heap(begin(range), end(range), comp);
}