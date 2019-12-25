//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../../algorithm/mathematics");

import { IBidirectionalContainer } from "../container/IBidirectionalContainer";
import { IForwardContainer } from "../container/IForwardContainer";
import { Pair } from "../../utility/Pair";
import { less, equal_to } from "../../functional/comparators";
import { begin, end } from "../../iterator/factory";

import { Temporary } from "../../internal/types/Temporary";

/**
 * @hiddn
 */
type Comparator<Range extends Array<any> | IForwardContainer<any>> =
    (
        x: IForwardContainer.ValueType<Range>,
        y: IForwardContainer.ValueType<Range>
    ) => boolean;

/* ---------------------------------------------------------
    MIN & MAX
--------------------------------------------------------- */
export function min_element<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, comp: Comparator<Range> = less): IForwardContainer.IteratorType<Range>
{
    return base.min_element(begin(range), end(range), comp);
}

export function max_element<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, comp: Comparator<Range> = less): IForwardContainer.IteratorType<Range>
{
    return base.max_element(begin(range), end(range), comp);
}

export function minmax_element<Range extends Array<any> | IForwardContainer<any>>
    (
        range: Range, 
        comp: Comparator<Range> = less
    ): Pair<IForwardContainer.IteratorType<Range>, IForwardContainer.IteratorType<Range>>
{
    return base.minmax_element(begin(range), end(range), comp);
}

/* ---------------------------------------------------------
    PERMUATATIONS
--------------------------------------------------------- */
export function is_permutation<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends IForwardContainer.SimilarType<Range1>>
    (
        range1: Range1, 
        range2: Range2, 
        pred: Comparator<Range1> = <any>equal_to
    ): boolean
{
    return base.is_permutation(begin(range1), end(range1), <Temporary>begin(range2), pred);
}

export function prev_permutation<Range extends Array<any> | IBidirectionalContainer<any, any>>
    (range: Range, comp: Comparator<Range> = less): boolean
{
    return base.prev_permutation(begin(range), end(range), comp);
}

export function next_permutation<Range extends Array<any> | IBidirectionalContainer<any, any>>
    (range: Range, comp: Comparator<Range> = less): boolean
{
    return base.next_permutation(begin(range), end(range), comp);
}