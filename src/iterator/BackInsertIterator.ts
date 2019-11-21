//================================================================ 
/** @module std */
//================================================================
import { _InsertIterator } from "../base/iterator/_InsertIterator";

import { _IPushBack } from "../base/disposable/IPartialContainers";
import { equal_to } from "../functional/comparators";

/**
 * Back insert iterator.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class BackInsertIterator<Source extends _IPushBack<BackInasertIterator.ValueType<Source>>>
    extends _InsertIterator<BackInasertIterator.ValueType<Source>, BackInsertIterator<Source>>
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
    public set value(val: BackInasertIterator.ValueType<Source>)
    {
        this.source_.push_back(val);
    }

    /**
     * @inheritDoc
     */
    public equals(obj: BackInsertIterator<Source>): boolean
    {
        return equal_to(this.source_, obj.source_);
    }
}
export namespace BackInasertIterator
{
    export type ValueType<Source extends _IPushBack<any>> = 
        Source extends _IPushBack<infer T>
            ? T
            : unknown;
}