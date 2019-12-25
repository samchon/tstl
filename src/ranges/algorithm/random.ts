//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../../algorithm/random");

import { IForwardContainer } from "../container/IForwardContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPointer } from "../../functional/IPointer";

import { Writeonly } from "../../internal/types/Writeonly";
import { begin, end } from "../../iterator/factory";

export function sample<
        Range extends Array<any> | IForwardContainer<any>,
        OutputIterator extends Writeonly<IForwardIterator<IPointer.ValueType<OutputIterator>, OutputIterator>>>
    (range: Range, first: OutputIterator, n: number): OutputIterator
{
    return base.sample(begin(range), end(range), first, n);
}