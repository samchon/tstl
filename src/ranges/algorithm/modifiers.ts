//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../../algorithm/modifiers");

import { IBidirectionalContainer } from "../../internal/container/IBidirectionalContainer";
import { IForwardContainer } from "../../internal/container/IForwardContainer";
import { IRandomAccessContainer } from "../../internal/container/IRandomAccessContainer";

import { IBidirectionalIterator } from "../../iterator/IBidirectionalIterator";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPointer } from "../../functional/IPointer";

import { Writeonly } from "../../internal/types/Writeonly";
import { Temporary } from "../../internal/types/Temporary";
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
type BinaryPredicator<Range extends Array<any> | IForwardContainer<any>> = 
    (x: IForwardContainer.ValueType<Range>, y: IForwardContainer.ValueType<Range>) => boolean;

/**
 * @hidden
 */
type UnaryOperator<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>> = 
    (val: IForwardContainer.ValueType<Range>) => IPointer.ValueType<OutputIterator>;

/**
 * @hidden
 */
type BinaryOperator<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>> = 
    (x: IForwardContainer.ValueType<Range1>, y: IForwardContainer.ValueType<Range2>) => IPointer.ValueType<OutputIterator>;

/* ---------------------------------------------------------
    FILL
--------------------------------------------------------- */
export function copy<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>
    (range: Range, output: OutputIterator): OutputIterator
{
    return base.copy(begin(range), end(range), output);
}

export function copy_n<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>
    (range: Range, n: number, output: OutputIterator): OutputIterator
{
    return base.copy_n(begin(range), n, output);
}

export function copy_if<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>
    (range: Range, output: OutputIterator, pred: UnaryPredicator<Range>): OutputIterator
{
    return base.copy_if(begin(range), end(range), output, pred);
}

export function copy_backward<
        Range extends Array<any> | IBidirectionalContainer<any, any>,
        OutputIterator extends Writeonly<IBidirectionalIterator<IBidirectionalContainer.ValueType<Range>, OutputIterator>>>
    (range: Range, output: OutputIterator): OutputIterator
{
    return base.copy_backward(begin(range), end(range), <Temporary>output);
}

export function fill<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, value: IForwardContainer.ValueType<Range>): void
{
    return base.fill(begin(range), end(range), value);
}

export function fill_n<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, n: number, value: IForwardContainer.ValueType<Range>): IForwardContainer.IteratorType<Range>
{
    return base.fill_n(begin(range), n, value);
}

export function transform<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>
    (range: Range, result: OutputIterator, op: UnaryOperator<Range, OutputIterator>): OutputIterator;

export function transform<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>
    (range: Range1, first: Range2, result: OutputIterator, op: BinaryOperator<Range1, Range2, OutputIterator>): OutputIterator;

export function transform<Range1 extends Array<any> | IForwardContainer<any>>
    (range1: Range1, ...args: any[]): any
{
    let fn: Function = base.transform.bind(undefined, begin(range1), end(range1));
    if (args.length === 3)
        return fn(...args);
    else // args: #4
        return fn(end(args[1]), args[2], args[3]);
}

export function generate<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, gen: () => IForwardContainer.ValueType<Range>): void
{
    return base.generate(begin(range), end(range), gen);
}

export function generate_n<Range extends Array<any> | IForwardContainer<any>>
    (
        range: Range, 
        n: number, 
        gen: () => IForwardContainer.ValueType<Range>
    ): IForwardContainer.IteratorType<Range>
{
    return base.generate_n(begin(range), n, gen);
}

/* ---------------------------------------------------------
    REMOVE
--------------------------------------------------------- */
export function unique<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, pred: BinaryPredicator<Range> = equal_to): IForwardContainer.IteratorType<Range>
{
    return base.unique(begin(range), end(range), pred);
}

export function unique_copy<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>
    (
        range: Range, 
        output: OutputIterator, 
        pred: BinaryPredicator<Range> = equal_to
    ): OutputIterator
{
    return base.unique_copy(begin(range), end(range), output, pred);
}

export function remove<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, val: IForwardContainer.ValueType<Range>): IForwardContainer.IteratorType<Range>
{
    return base.remove(begin(range), end(range), val);
}

export function remove_if<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, pred: UnaryPredicator<Range>): IForwardContainer.IteratorType<Range>
{
    return base.remove_if(begin(range), end(range), pred);
}

export function remove_copy<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>
    (
        range: Range, 
        output: OutputIterator, 
        val: IForwardContainer.ValueType<Range>
    ): OutputIterator
{
    return base.remove_copy(begin(range), end(range), output, val);
}

export function remove_copy_if<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>
    (
        range: Range, 
        output: OutputIterator, 
        pred: UnaryPredicator<Range>
    ): OutputIterator
{
    return base.remove_copy_if(begin(range), end(range), output, pred);
}

/* ---------------------------------------------------------
    REPLACE & SWAP
--------------------------------------------------------- */
export function replace<Range extends Array<any> | IForwardContainer<any>>
    (
        range: Range, 
        old_val: IForwardContainer.ValueType<Range>, 
        new_val: IForwardContainer.ValueType<Range>
    ): void
{
    return base.replace(begin(range), end(range), old_val, new_val);
}

export function replace_if<Range extends Array<any> | IForwardContainer<any>>
    (
        range: Range,
        pred: UnaryPredicator<Range>,
        new_val: IForwardContainer.ValueType<Range>
    ): void
{
    return base.replace_if(begin(range), end(range), pred, new_val);
}

export function replace_copy<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>
    (
        range: Range, 
        output: OutputIterator,
        old_val: IForwardContainer.ValueType<Range>, 
        new_val: IForwardContainer.ValueType<Range>
    ): OutputIterator
{
    return base.replace_copy(begin(range), end(range), output, old_val, new_val);
}

export function replace_copy_if<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>
    (
        range: Range, 
        output: OutputIterator,
        pred: UnaryPredicator<Range>,
        new_val: IForwardContainer.ValueType<Range>
    ): OutputIterator
{
    return base.replace_copy_if(begin(range), end(range), output, pred, new_val);
}

export function swap_ranges<
        Range1 extends Array<any> | IForwardContainer<any>,
        Range2 extends IForwardContainer.SimilarType<Range1>>
    (range1: Range1, range2: Range2): IForwardContainer.IteratorType<Range2>
{
    return base.swap_ranges(begin(range1), end(range1), <Temporary>begin(range2));
}

/* ---------------------------------------------------------
    RE-ARRANGEMENT
--------------------------------------------------------- */
export function reverse<Range extends Array<any> | IBidirectionalContainer<any, any>>
    (range: Range): void
{
    return base.reverse(begin(range), end(range));
}

export function reverse_copy<
        Range extends Array<any> | IBidirectionalContainer<any, any>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>
    (range: Range, output: OutputIterator): OutputIterator
{
    return base.reverse_copy(begin(range), end(range), output);
}

export function shift_left<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, n: number): void
{
    return base.shift_left(begin(range), end(range), n);
}

export function shift_right<Range extends Array<any> | IBidirectionalContainer<any, any>>
    (range: Range, n: number): void
{
    return base.shift_right(begin(range), end(range), n);
}

export function rotate<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, middle: IForwardContainer.IteratorType<Range>): IForwardContainer.IteratorType<Range>
{
    return base.rotate(begin(range), middle, end(range));
}

export function rotate_copy<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>
    (
        range: Range, 
        middle: IForwardContainer.IteratorType<Range>,
        output: OutputIterator
    ): OutputIterator
{
    return base.rotate_copy(begin(range), middle, end(range), output);
}

export function shuffle<Range extends Array<any> | IRandomAccessContainer<any>>
    (range: Range): void
{
    return base.shuffle(begin(range), end(range));
}