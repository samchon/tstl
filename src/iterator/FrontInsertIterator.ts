//================================================================ 
/** @module std */
//================================================================
import { _InsertIterator } from "../base/iterator/_InsertIterator";

import { IPushFront } from "../internal/container/partial/IPushFront";
import { equal_to } from "../functional/comparators";

/**
 * Front insert iterator.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class FrontInsertIterator<Source extends IPushFront<FrontInsertIterator.ValueType<Source>>>
    extends _InsertIterator<FrontInsertIterator.ValueType<Source>, FrontInsertIterator<Source>>
{
    /**
     * @hidden
     */
    private source_: Source;

    /* ---------------------------------------------------------
        METHODS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     * 
     * @param source The source container.
     */
    public constructor(source: Source)
    {
        super();
        this.source_ = source;
    }

    /**
     * @inheritDoc
     */
    public set value(val: FrontInsertIterator.ValueType<Source>)
    {
        this.source_.push_front(val);
    }

    /**
     * @inheritDoc
     */
    public equals(obj: FrontInsertIterator<Source>): boolean
    {
        return equal_to(this.source_, obj.source_);
    }
}
export namespace FrontInsertIterator
{
    export type ValueType<Source extends IPushFront<any>> = 
        Source extends IPushFront<infer T>
            ? T
            : unknown;
}