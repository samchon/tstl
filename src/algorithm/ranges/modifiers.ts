//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../modifiers");

import { IBidirectionalContainer } from "../../base/disposable/IBidirectionalContainer";
import { IBidirectionalIterator } from "../../iterator/IBidirectionalIterator";
import { IForwardContainer } from "../../base/disposable/IForwardContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPointer } from "../../functional/IPointer";

import { Temporary } from "../../base/Temporary";
import { Writeonly } from "../../iterator/IFake";
import { begin, end } from "../../iterator/factory";

/**
 * @hidden
 */
type Predicator<Range extends Array<any> | IForwardContainer<any>> = 
    (val: IForwardContainer.ValueType<Range>) => boolean;

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
        Range extends Array<any> | IForwardContainer<any>,
        InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>,
        OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>> = 
    (x: IForwardContainer.ValueType<Range>, y: IPointer.ValueType<InputIterator>) => IPointer.ValueType<OutputIterator>;

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

export function copy_if<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator>>>
    (range: Range, output: OutputIterator, pred: Predicator<Range>): OutputIterator
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

export function transform<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>
    (range: Range, result: OutputIterator, op: UnaryOperator<Range, OutputIterator>): OutputIterator;

export function transform<
        Range extends Array<any> | IForwardContainer<any>,
        InputIterator extends Readonly<IForwardIterator<IPointer.ValueType<InputIterator>, InputIterator>>,
        OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>
    (range: Range, first: InputIterator, op: BinaryOperator<Range, InputIterator, OutputIterator>): OutputIterator;

export function transform(...args: any[]): any
{
    return (base.transform as Function)(...args);
}

export function generate<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, gen: () => IForwardContainer.ValueType<Range>): void
{
    return base.generate(begin(range), end(range), gen);
}

/* ---------------------------------------------------------
    REMOVE
--------------------------------------------------------- */
