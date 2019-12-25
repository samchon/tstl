//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../../algorithm/partition");

import { IBidirectionalContainer } from "../container/IBidirectionalContainer";
import { IForwardContainer } from "../container/IForwardContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Writeonly } from "../../internal/types/Writeonly";

import { Pair } from "../../utility/Pair";
import { begin, end } from "../../iterator/factory";

/**
 * @hidden
 */
type Predicator<Range extends Array<any> | IForwardContainer<any>> =
    (val: IForwardContainer.ValueType<Range>) => boolean;

export function is_partitioned<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, pred: Predicator<Range>): boolean
{
    return base.is_partitioned(begin(range), end(range), pred);
}

export function partition_point<Range extends Array<any> | IForwardContainer<any>>
    (range: Range, pred: Predicator<Range>): IForwardContainer.IteratorType<Range>
{
    return base.partition_point(begin(range), end(range), pred);
}

export function partition<Range extends Array<any> | IBidirectionalContainer<any, any>>
    (range: Range, pred: Predicator<Range>): IBidirectionalContainer.IteratorType<Range>
{
    return <any>base.partition(begin(range), end(range), pred);
}

export function stable_partition<Range extends Array<any> | IBidirectionalContainer<any, any>>
    (range: Range, pred: Predicator<Range>): IBidirectionalContainer.IteratorType<Range>
{
    return <any>base.stable_partition(begin(range), end(range), pred);
}

export function partition_copy<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator1 extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator1>>, 
        OutputIterator2 extends Writeonly<IForwardIterator<IForwardContainer.ValueType<Range>, OutputIterator2>>>
    (
        range: Range,
        output_true: OutputIterator1,
        output_false: OutputIterator2,
        pred: Predicator<Range>
    ): Pair<OutputIterator1, OutputIterator2>
{
    return base.partition_copy(begin(range), end(range), output_true, output_false, pred);
}