//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../../algorithm/heap");

import { IRandomAccessContainer } from "../container/IRandomAccessContainer";
import { Comparator } from "../../internal/functional/Comparator";
import { begin, end } from "../../iterator/factory";
import { less } from "../../functional/comparators";

/* ---------------------------------------------------------
    PUSH & POP
--------------------------------------------------------- */
export function make_heap<Range extends Array<any> | IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<IRandomAccessContainer.ValueType<Range>> = less): void
{
    return base.make_heap(begin(range), end(range), comp);
}

export function push_heap<Range extends Array<any> | IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<IRandomAccessContainer.ValueType<Range>> = less): void
{
    return base.push_heap(begin(range), end(range), comp);
}

export function pop_heap<Range extends Array<any> | IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<IRandomAccessContainer.ValueType<Range>> = less): void
{
    return base.pop_heap(begin(range), end(range), comp);
}

/* ---------------------------------------------------------
    SORT
--------------------------------------------------------- */
export function is_heap<Range extends Array<any> | IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<IRandomAccessContainer.ValueType<Range>> = less): boolean
{
    return base.is_heap(begin(range), end(range), comp);
}

export function is_heap_until<Range extends Array<any> | IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<IRandomAccessContainer.ValueType<Range>> = less): IRandomAccessContainer.IteratorType<Range>
{
    return base.is_heap_until(<any>begin(range), <any>end(range), <any>comp);
}

export function sort_heap<Range extends Array<any> | IRandomAccessContainer<any>>
    (range: Range, comp: Comparator<IRandomAccessContainer.ValueType<Range>> = less): void
{
    return base.sort_heap(begin(range), end(range), comp);
}