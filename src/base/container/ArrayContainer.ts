//================================================================ 
/** @module std.base */
//================================================================
import { Container } from "./Container";
import { ILinearContainer } from "./ILinearContainer";

import { IContainer } from "./IContainer";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { ArrayIteratorBase, ArrayReverseIteratorBase } from "../iterator/ArrayIteratorBase";

import { _Repeater } from "../iterator/_Repeater";
import { RangeError } from "../../exception/RuntimeError";
import { InvalidArgument, LengthError } from "../../exception/LogicError";

/**
 * Base array container.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export abstract class ArrayContainer<T extends ElemT, 
        SourceT extends IContainer<T, SourceT, IteratorT, ReverseT, ElemT>,
        ArrayT extends ArrayContainer<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>,
        IteratorT extends ArrayIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>,
        ReverseT extends ArrayReverseIteratorBase<T, SourceT, ArrayT, IteratorT, ReverseT, ElemT>,
        ElemT>
    extends Container<T, SourceT, IteratorT, ReverseT, ElemT>
    implements ILinearContainer<T, SourceT, IteratorT, ReverseT, ElemT>
{
    /**
     * @inheritDoc
     */
    public abstract resize(n: number): void;

    /* =========================================================
        ACCESSORS
            - ITERATORS
            - INDEXES
    ============================================================
        ITERATORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public begin(): IteratorT
    {
        return this.nth(0);
    }

    /**
     * @inheritDoc
     */
    public end(): IteratorT
    {
        return this.nth(this.size());
    }

    public abstract nth(index: number): IteratorT;

    /* ---------------------------------------------------------
        INDEXES
    --------------------------------------------------------- */
    /**
     * Get element at specific position.
     * 
     * @param index Specific position.
     * @return The element at the *index*.
     */
    public abstract at(index: number): T;

    /**
     * Change element at specific position.
     * 
     * @param index Specific position.
     * @param val The new value to change.
     */
    public abstract set(index: number, val: T): void;

    /**
     * @inheritDoc
     */
    public front(): T;
    /**
     * @inheritDoc
     */
    public front(val: T): void;
    public front(val?: T): T | void
    {
        if (arguments.length === 0)
            return this.at(0);
        else
            this.set(0, val!);
    }

    /**
     * @inheritDoc
     */
    public back(): T;
    /**
     * @inheritDoc
     */
    public back(val: T): void;
    public back(val?: T): T | void
    {
        let index: number = this.size() - 1;
        if (arguments.length === 0)
            return this.at(index);
        else
            this.set(index, val!);
    }

    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - ERASE
            - SWAP
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public abstract push_back(val: T): void;

    /**
     * @inheritDoc
     */
    public insert(pos: IteratorT, val: T): IteratorT;
    /**
     * @inheritDoc
     */
    public insert(pos: IteratorT, n: number, val: T): IteratorT;
    /**
     * @inheritDoc
     */
    public insert<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
        (pos: IteratorT, first: InputIterator, last: InputIterator): IteratorT;
    
    public insert(pos: IteratorT, ...args: any[]): IteratorT
    {
        // VALIDATION
        if (pos._Get_array() !== <any>this)
            throw new InvalidArgument("Parametric iterator is not this container's own.");
        else if (pos.index() < 0)
            throw new LengthError("Parametric iterator is directing invalid position.");
        else if (pos.index() > this.size())
            pos = this.end();

        // BRANCHES
        if (args.length === 1)
            return this._Insert_by_repeating_val(pos, 1, args[0]);
        else if (args.length === 2 && typeof args[0] === "number")
            return this._Insert_by_repeating_val(pos, args[0], args[1]);
        else
            return this._Insert_by_range(pos, args[0], args[1]);
    }

    /**
     * @hidden
     */
    protected _Insert_by_repeating_val(position: IteratorT, n: number, val: T): IteratorT
    {
        let first: _Repeater<T> = new _Repeater(0, val);
        let last: _Repeater<T> = new _Repeater(n);

        return this._Insert_by_range(position, first, last);
    }

    /**
     * @hidden
     */
    protected abstract _Insert_by_range<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
        (pos: IteratorT, first: InputIterator, last: InputIterator): IteratorT;

    /* ---------------------------------------------------------
        ERASE
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public abstract pop_back(): void;

    /**
     * @inheritDoc
     */
    public erase(it: IteratorT): IteratorT;
    /**
     * @inheritDoc
     */
    public erase(first: IteratorT, last: IteratorT): IteratorT;
    public erase(first: IteratorT, last: IteratorT = first.next()): IteratorT
    {
        // VALIDATION
        if (first._Get_array() !== <any>this || last._Get_array() !== <any>this)
            throw new InvalidArgument("Parametric iterator is not this container's own.");
        else if (first.index() < 0)
            throw new LengthError("Invalid parameter: first is directing negative index.");

        // ADJUSTMENTS
        if (first.index() >= this.size())
            return this.end();
        else if (first.index() > last.index())
            throw new RangeError("Invalid range. Paramter first is greater than last.");

        // ERASE ELEMENTS
        return this._Erase_by_range(first, last);
    }

    /**
     * @hidden
     */
    protected abstract _Erase_by_range(first: IteratorT, last: IteratorT): IteratorT;
}