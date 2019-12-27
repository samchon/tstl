//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../../algorithm/binary_search");

import { IForwardContainer } from "../container/IForwardContainer";
import { Pair } from "../../utility/Pair";
import { begin, end } from "../../iterator/factory";
import { less } from "../../functional/comparators";

import { Comparator } from "../../internal/functional/Comparator";

/* =========================================================
    BINARY SEARCH
========================================================= */
export function lower_bound<Range extends Array<any> | IForwardContainer<any>>
    (
        range: Range,
        val: IForwardContainer.ValueType<Range>,
        comp: Comparator<IForwardContainer.ValueType<Range>> = less
    ): IForwardContainer.IteratorType<Range>
{
    return base.lower_bound(begin(range), end(range), val, comp);
}

export function upper_bound<Range extends Array<any> | IForwardContainer<any>>
    (
        range: Range,
        val: IForwardContainer.ValueType<Range>,
        comp: Comparator<IForwardContainer.ValueType<Range>> = less
    ): IForwardContainer.IteratorType<Range>
{
    return base.upper_bound(begin(range), end(range), val, comp);
}

export function equal_range<Range extends Array<any> | IForwardContainer<any>>
    (
        range: Range,
        val: IForwardContainer.ValueType<Range>,
        comp: Comparator<IForwardContainer.ValueType<Range>> = less
    ): Pair<IForwardContainer.IteratorType<Range>, IForwardContainer.IteratorType<Range>>
{
    return base.equal_range(begin(range), end(range), val, comp);
}

export function binary_search<Range extends Array<any> | IForwardContainer<any>>
    (
        range: Range,
        val: IForwardContainer.ValueType<Range>,
        comp: Comparator<IForwardContainer.ValueType<Range>> = less
    ): boolean
{
    return base.binary_search(begin(range), end(range), val, comp);
}