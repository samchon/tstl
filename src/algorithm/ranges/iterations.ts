//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../iterations");

import { IForwardContainer } from "../../base/disposable/IForwardContainer";
import { IForwardIterator } from "../../iterator";
import { IPointer } from "../../functional/IPointer";
import { Pair } from "../../utility/Pair";

import { begin, end } from "../../iterator/factory";
import { equal_to } from "../../functional/comparators";

/**
 * @hidden
 */
type UnaryPredicator<Range extends Array<any> | IForwardContainer<any>> =
    (val: IForwardContainer.ValueType<Range>) => boolean;

/**
 * @hidden
 */
type BinaryPredicator<
        Range extends Array<any> | IForwardContainer<any>,
        Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>> =
    (
        x: IForwardContainer.ValueType<Range>,
        y: IPointer.ValueType<Iterator>
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
        Range extends Array<any> | IForwardContainer<any>,
        Iterator extends Readonly<IForwardIterator<IForwardContainer.ValueType<Range>, Iterator>>>
    (range: Range, first: Iterator): boolean;

export function equal<
        Range extends Array<any> | IForwardContainer<any>,
        Iterator extends Readonly<IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>>
    (range: Range, first: Iterator, pred: BinaryPredicator<Range, Iterator>): boolean;

export function equal<
        Range extends Array<any> | IForwardContainer<any>,
        Iterator extends Readonly<IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>>
    (
        range: Range, first: Iterator, 
        pred: BinaryPredicator<Range, Iterator> = <any>equal_to
    ): boolean
{
    return base.equal(begin(range), end(range), first, pred);
}

// @TODO: lexicographical_compare

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

// @TODO: find_end
// @TODO :find_first_of

export function adjacent_find<Range extends Array<any> | IForwardContainer<any>>
    (
        range: Range, 
        pred: Comparator<Range> = equal_to
    ): IForwardContainer.IteratorType<Range>
{
    return base.adjacent_find(begin(range), end(range), pred);
}

// @TODO: search

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
        Range extends Array<any> | IForwardContainer<any>,
        Iterator extends Readonly<IForwardIterator<IForwardContainer.ValueType<Range>, Iterator>>>
    (range: Range, fisrt: Iterator): Pair<IForwardContainer.IteratorType<Range>, Iterator>;

export function mismatch<
        Range extends Array<any> | IForwardContainer<any>,
        Iterator extends Readonly<IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>>
    (
        range: Range, 
        fisrt: Iterator, 
        pred: BinaryPredicator<Range, Iterator>
    ): Pair<IForwardContainer.IteratorType<Range>, Iterator>;

export function mismatch<
        Range extends Array<any> | IForwardContainer<any>,
        Iterator extends Readonly<IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>>
    (
        range: Range, 
        first: Iterator, 
        pred: BinaryPredicator<Range, Iterator> = <any>equal_to
    ): Pair<IForwardContainer.IteratorType<Range>, Iterator>
{
    return base.mismatch(begin(range), end(range), first, pred);
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