//================================================================ 
/** @module std.base */
//================================================================
import { IContainer } from "../container/IContainer";

import { Iterator } from "./Iterator";
import { IReverseIterator as _IReverse } from "../../iterator/IReverseIterator";

export interface IReverseIterator<T extends Elem, 
        Source extends IContainer<T, Source, Base, This, Elem>, 
        Base extends Iterator<T, Source, Base, This, Elem>, 
        This extends IReverseIterator<T, Source, Base, This, Elem>,
        Elem = T>
    extends Readonly<_IReverse<T, Base, This>>
{
    /**
     * Get source container.
     * 
     * @return The source container.
     */
    source(): Source;
}

/**
 * Base reverse iterator for {@link IContainer}
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export abstract class ReverseIterator<T extends Elem, 
        Source extends IContainer<T, Source, Base, This, Elem>, 
        Base extends Iterator<T, Source, Base, This, Elem>, 
        This extends ReverseIterator<T, Source, Base, This, Elem>,
        Elem = T>
    implements IReverseIterator<T, Source, Base, This, Elem>
{
    /**
     * @hidden
     */
    protected base_: Base;

    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor.
     * 
     * @param base The base iterator.
     */
    public constructor(base: Base)
    {
        this.base_ = base.prev();
    }

    // CREATE A NEW OBJECT WITH SAME (DERIVED) TYPE
    /**
     * @hidden
     */
    protected abstract _Create_neighbor(base: Base): This;

    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * Get source container.
     * 
     * @return The source container.
     */
    public source(): Source
    {
        return this.base_.source();
    }

    /**
     * @inheritDoc
     */
    public base(): Base
    {
        return this.base_.next();
    }
    
    /**
     * @inheritDoc
     */
    public get value(): T
    {
        return this.base_.value;
    }

    /* ---------------------------------------------------------
        MOVERS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public prev(): This
    {
        // this.base().next()
        return this._Create_neighbor(this.base().next());
    }

    /**
     * @inheritDoc
     */
    public next(): This
    {
        // this.base().prev()
        return this._Create_neighbor(this.base_);
    }

    /* ---------------------------------------------------------
        COMPARES
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public equals(obj: This): boolean
    {
        return this.base_.equals(obj.base_);
    }
}