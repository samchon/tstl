//================================================================ 
/** @module std */
//================================================================
import { _InsertIterator } from "../base/iterator/_InsertIterator";

import { IForwardIterator } from "./IForwardIterator";
import { IPointer } from "../functional/IPointer";
import { IInsert } from "../internal/container/partial/IInsert";

import { equal_to } from "../functional/comparators";

/**
 * Insert iterator.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class InsertIterator<
        Container extends IInsert<Iterator>, 
        Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>
    extends _InsertIterator<IPointer.ValueType<Iterator>, InsertIterator<Container, Iterator>>
{
    /**
     * @hidden
     */
    private container_: Container;

    /**
     * @hidden
     */
    private it_: Iterator;

    /* ---------------------------------------------------------
        METHODS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     * 
     * @param container Target container to insert.
     * @param it Iterator to the position to insert.
     */
    public constructor(container: Container, it: Iterator)
    {
        super();

        this.container_ = container;
        this.it_ = it;
    }

    /**
     * @inheritDoc
     */
    public set value(val: IPointer.ValueType<Iterator>)
    {
        this.it_ = this.container_.insert(this.it_, val);
        this.it_ = this.it_.next() as Iterator;
    }

    /**
     * @inheritDoc
     */
    public equals(obj: InsertIterator<Container, Iterator>): boolean
    {
        return equal_to(this.it_, obj.it_);
    }
}