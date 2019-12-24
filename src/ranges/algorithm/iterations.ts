//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../../algorithm/iterations");

import { IForwardContainer } from "../../internal/container/IForwardContainer";
import { Pair } from "../../utility/Pair";
import { begin, end } from "../../iterator/factory";
import { size } from "../../iterator/global";
import { equal_to, less } from "../../functional/comparators";

import { Temporary } from "../../internal/types/Temporary";

/**
 * @hidden
 */
type UnaryPredicator<Range extends Array<any> | IForwardContainer<any>> =
    (val: IForwardContainer.ValueType<Range>) => boolean;

/**
 * @hidden
 */
type BinaryPredicator<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer<any>> =
    (
        x: IForwardContainer.ValueType<Range1>,
        y: IForwardContainer.ValueType<Range2>
    ) => boolean;

/**
 * @hidden
 */
type Comparator<Range extends Array<any> | IForwardContainer<any>> =
    (
        x: IForwardContainer.ValueType<Range>,
        y: IForwardContainer.ValueType<Range>
    ) => boolean;

/* ---------------------------------------------------------
    FOR_EACH
--------------------------------------------------------- */
export function for_each<
        Range extends Array<any> | IForwardContainer<any>,
        Func extends (val: IForwardContainer.ValueType<Range>) => any>
    (range: Range, fn: Func) :Func
{
    return base.for_each(begin(range), end(range), fn);
}

export function for_each_n<
        Range extends Array<any> | IForwardContainer<any>,
        Func extends (val: IForwardContainer.ValueType<Range>) => any>
    (range: Range, n: number, fn: Func): IForwardContainer.IteratorType<Range>
{
    return base.for_each_n(begin(range), n, fn);
}

/* ---------------------------------------------------------
    AGGREGATE CONDITIONS
--------------------------------------------------------- */
export function all_of<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, pred: UnaryPredicator<Range>): boolean
{
    return base.all_of(begin(range), end(range), pred);
}

export function any_of<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, pred: UnaryPredicator<Range>): boolean
{
    return base.any_of(begin(range), end(range), pred);
}

export function none_of<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, pred: UnaryPredicator<Range>): boolean
{
    return base.none_of(begin(range), end(range), pred);
}

export function equal<
        Range1 extends Array<any> | (IForwardContainer.ISizable<any>),
        Range2 extends IForwardContainer.ISizable.SimilarType<Range1>>
    (range1: Range1, range2: Range2): boolean;

export function equal<
        Range1 extends Array<any> | IForwardContainer.ISizable<any>,
        Range2 extends Array<any> | IForwardContainer.ISizable<any>>
    (range1: Range1, range2: Range2, pred: BinaryPredicator<Range1, Range2>): boolean;

export function equal<
        Range1 extends Array<any> | IForwardContainer.ISizable<any>,
        Range2 extends Array<any> | IForwardContainer.ISizable<any>>
    (range1: Range1, range2: Range2, pred: BinaryPredicator<Range1, Range2> = <any>equal_to): boolean
{
    if (size(range1) !== size(range2))
        return false;
    else
        return base.equal(begin(range1), end(range1), begin(range2), pred);
}

export function lexicographical_compare<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends IForwardContainer.SimilarType<Range1>>
    (range1: Range1, range2: Range2, comp: BinaryPredicator<Range1, Range1> = less): boolean
{
    return base.lexicographical_compare(begin(range1), end(range1), <Temporary>begin(range2), end(range2), comp);
}

/* ---------------------------------------------------------
    FINDERS
--------------------------------------------------------- */
export function find<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, val: IForwardContainer.ValueType<Range>): IForwardContainer.IteratorType<Range>
{
    return base.find(begin(range), end(range), val);
}

export function find_if<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, pred: UnaryPredicator<Range>): IForwardContainer.IteratorType<Range>
{
    return base.find_if(begin(range), end(range), pred);
}

export function find_if_not<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, pred: UnaryPredicator<Range>): IForwardContainer.IteratorType<Range>
{
    return base.find_if_not(begin(range), end(range), pred);
}

export function find_end<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends IForwardContainer.SimilarType<Range1>>
    (range1: Range1, range2: Range2): IForwardContainer.IteratorType<Range1>;

export function find_end<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer<any>>
    (
        range1: Range1, 
        range2: Range2, 
        pred: BinaryPredicator<Range1, Range2>
    ): IForwardContainer.IteratorType<Range1>;

export function find_end<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer<any>>
    (
        range1: Range1, 
        range2: Range2, 
        pred: BinaryPredicator<Range1, Range2> = <any>equal_to
    ): IForwardContainer.IteratorType<Range1>
{
    return base.find_end(begin(range1), end(range1), begin(range2), end(range2), pred);
}

export function find_first_of<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends IForwardContainer.SimilarType<Range1>>
    (range1: Range1, range2: Range2): IForwardContainer.IteratorType<Range1>;

export function find_first_of<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer<any>>
    (
        range1: Range1, 
        range2: Range2, 
        pred: BinaryPredicator<Range1, Range2>
    ): IForwardContainer.IteratorType<Range1>;

export function find_first_of<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer<any>>
    (
        range1: Range1, 
        range2: Range2, 
        pred: BinaryPredicator<Range1, Range2> = <any>equal_to
    ): IForwardContainer.IteratorType<Range1>
{
    return base.find_first_of(begin(range1), end(range1), begin(range2), end(range2), pred);
}

export function adjacent_find<Range extends Array<any> | IForwardContainer<any>>
    (
        range: Range, 
        pred: Comparator<Range> = equal_to
    ): IForwardContainer.IteratorType<Range>
{
    return base.adjacent_find(begin(range), end(range), pred);
}

export function search<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer.SimilarType<Range1>>
    (range1: Range1, range2: Range2): IForwardContainer.IteratorType<Range1>;

export function search<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer<any>>
    (
        range1: Range1, 
        range2: Range2, 
        pred: BinaryPredicator<Range1, Range2>
    ): IForwardContainer.IteratorType<Range1>;

export function search<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer<any>>
    (
        range1: Range1, 
        range2: Range2, 
        pred: BinaryPredicator<Range1, Range2> = <any>equal_to
    ): IForwardContainer.IteratorType<Range1>
{
    return base.search(begin(range1), end(range1), begin(range2), end(range2), pred);
}

export function search_n<Range extends Array<any> | IForwardContainer<any>>
    (
        range: Range,
        count: number, val: IForwardContainer.ValueType<Range>,
        pred: Comparator<Range> = equal_to
    ): IForwardContainer.IteratorType<Range>
{
    return base.search_n(begin(range), end(range), count, val, pred);
}

export function mismatch<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer.SimilarType<Range1>>
    (range1: Range1, range2: Range2): Pair<IForwardContainer.IteratorType<Range1>, IForwardContainer.IteratorType<Range2>>;

export function mismatch<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer<any>>
    (
        range1: Range1, 
        range2: Range2, 
        pred: BinaryPredicator<Range1, Range2>
    ): Pair<IForwardContainer.IteratorType<Range1>, IForwardContainer.IteratorType<Range2>>;

export function mismatch<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer<any>>
    (
        range1: Range1, 
        range2: Range2, 
        pred: BinaryPredicator<Range1, Range2> = <any>equal_to
    ): Pair<IForwardContainer.IteratorType<Range1>, IForwardContainer.IteratorType<Range2>>
{
    return base.mismatch(begin(range1), end(range1), begin(range2), pred);
}

/* ---------------------------------------------------------
    COUNTERS
--------------------------------------------------------- */
export function count<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, val: IForwardContainer.ValueType<Range>): number
{
    return base.count(begin(range), end(range), val);
}

export function count_if<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, pred: UnaryPredicator<Range>): number
{
    return base.count_if(begin(range), end(range), pred);
}