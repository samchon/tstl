//================================================================ 
/** @module std.ranges */
//================================================================
import base = require("../random");

import { IForwardContainer } from "../../base/disposable/IForwardContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IPointer } from "../../functional/IPointer";

import { Writeonly } from "../../iterator/IFake";
import { begin, end } from "../../iterator/factory";

export function sample<
        Range extends Array<any> | IForwardContainer<any>,
        Iterator extends Writeonly<IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>>
    (range: Range, first: Iterator, n: number): Iterator
{
    return base.sample(begin(range), end(range), first, n);
}