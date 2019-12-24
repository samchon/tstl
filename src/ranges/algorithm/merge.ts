//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../../algorithm/merge");

import { IBidirectionalContainer } from "../../base/disposable/IBidirectionalContainer";
import { IForwardContainer } from "../../base/disposable/IForwardContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";

import { Writeonly } from "../../iterator/IFake";
import { begin, end } from "../../iterator/factory";
import { size } from "../../iterator/global";
import { less } from "../../functional/comparators";

import { Temporary } from "../../base/Temporary";

/**
 * @hidden
 */
type Comparator<Range extends Array<any> | IForwardContainer<any>> =
    (
        x: IForwardContainer.ValueType<Range>, 
        y: IForwardContainer.ValueType<Range>
    ) => boolean;

/* ---------------------------------------------------------
    MERGE
--------------------------------------------------------- */
export function merge<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends IForwardContainer.SimilarType<Range1>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>>>
    (
        range1: Range1, 
        range2: Range2, 
        output: OutputIterator, 
        comp: Comparator<Range1> = less
    ): OutputIterator
{
    return base.merge(begin(range1), end(range1), <Temporary>begin(range2), end(range2), output, comp);
}

export function inplace_merge<Range extends Array<any> | IBidirectionalContainer<any, any>>
    (
        range: Range, 
        middle: IBidirectionalContainer.IteratorType<Range>, 
        comp: Comparator<Range> = less): void
{
    return base.inplace_merge(begin(range), <any>middle, end(range), comp);
}

/* ---------------------------------------------------------
    SET OPERATIONS
--------------------------------------------------------- */
export function includes<
        Range1 extends Array<any> | IForwardContainer.ISizable<any>,
        Range2 extends IForwardContainer.ISizable.SimilarType<Range1>>
    (range1: Range1, range2: Range2, comp: Comparator<Range1> = less): boolean
{
    if (size(range1) < size(range2))
        return false;
    else
        return base.includes(begin(range1), end(range1), <Temporary>begin(range2), end(range2), comp);
}

export function set_union<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends IForwardContainer.SimilarType<Range1>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>>>
    (
        range1: Range1, 
        range2: Range2, 
        output: OutputIterator, 
        comp: Comparator<Range1> = less
    ): OutputIterator
{
    return base.set_union(begin(range1), end(range1), <Temporary>begin(range2), end(range2), output, comp);
}

export function set_intersection<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends IForwardContainer.SimilarType<Range1>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>>>
    (
        range1: Range1, 
        range2: Range2, 
        output: OutputIterator, 
        comp: Comparator<Range1> = less
    ): OutputIterator
{
    return base.set_intersection(begin(range1), end(range1), <Temporary>begin(range2), end(range2), output, comp);
}

export function set_difference<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends IForwardContainer.SimilarType<Range1>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>>>
    (
        range1: Range1, 
        range2: Range2, 
        output: OutputIterator, 
        comp: Comparator<Range1> = less
    ): OutputIterator
{
    return base.set_difference(begin(range1), end(range1), <Temporary>begin(range2), end(range2), output, comp);
}

export function set_symmetric_difference<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends IForwardContainer.SimilarType<Range1>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range1>, OutputIterator>>>
    (
        range1: Range1, 
        range2: Range2, 
        output: OutputIterator, 
        comp: Comparator<Range1> = less
    ): OutputIterator
{
    return base.set_symmetric_difference(begin(range1), end(range1), <Temporary>begin(range2), end(range2), output, comp);
}