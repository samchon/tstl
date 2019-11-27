//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../../algorithm/random");

import { IForwardContainer } from "../../base/disposable/IForwardContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPointer } from "../../functional/IPointer";

import { Writeonly } from "../../iterator/IFake";
import { begin, end } from "../../iterator/factory";

export function sample<
        Range extends IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>
    (range: Range, first: OutputIterator, n: number): OutputIterator
{
    return base.sample(begin(range), end(range), first, n);
}