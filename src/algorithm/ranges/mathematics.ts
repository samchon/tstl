import base = require("../mathematics");

import { IBidirectionalContainer } from "../../base/disposable/IBidirectionalContainer";
import { IForwardContainer } from "../../base/disposable/IForwardContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPointer } from "../../functional/IPointer";

import { Pair } from "../../utility/Pair";
import { less, equal_to } from "../../functional/comparators";
import { begin, end } from "../../iterator/factory";

/**
 * @hiddn
 */
type Comparator<Range extends Array<any> | IForwardContainer<any>> =
    (
        x: IForwardContainer.ValueType<Range>,
        y: IForwardContainer.ValueType<Range>
    ) => boolean;

/**
 * @hiddn
 */
type Predicator<
        Range extends Array<any> | IForwardContainer<any>,
        Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>> =
    (
        x: IForwardContainer.ValueType<Range>,
        y: IPointer.ValueType<Iterator>
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
        Range extends Array<any> | IForwardContainer<any>,
        Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>
    (
        range: Range, 
        first: Iterator, 
        pred: Predicator<Range, Iterator> = <any>equal_to
    ): boolean
{
    return base.is_permutation(begin(range), end(range), first, pred);
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