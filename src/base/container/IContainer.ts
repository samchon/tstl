//================================================================ 
/** @module std.base */
//================================================================
import { IBidirectionalContainer } from "../../ranges/container/IBidirectionalContainer";
import { IEmpty } from "../../internal/container/partial/IEmpty";
import { ISize } from "../../internal/container/partial/ISize";
import { IPush } from "../../internal/container/partial/IPush";

import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IReversableIterator as IReversable } from "../../iterator/IReverseIterator";
import { IReverseIterator as IReverse } from "../../iterator/IReverseIterator";

/**
 * Interface for Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface IContainer<T extends Elem, 
        SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
        IteratorT extends IContainer.Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
        ReverseIteratorT extends IContainer.ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
        Elem = T>
    extends IBidirectionalContainer<IContainer.Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>, ReverseIteratorT>, 
        Iterable<T>, IEmpty, ISize, IPush<Elem>
{
    /* ---------------------------------------------------------
        ASSIGN & CLEAR
    --------------------------------------------------------- */
    /**
     * Range Assigner.
     * 
     * @param first Input iteartor of the first position.
     * @param last Input iterator of the last position.
     */
    assign<InputIterator extends Readonly<IForwardIterator<Elem, InputIterator>>>
        (first: InputIterator, last: InputIterator): void;

    /**
     * @inheritDoc
     */
    clear(): void;

    /* =========================================================
        ACCESSORS
            - SIZE
            - ITERATORS
    ============================================================
        SIZE
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    size(): number;
    
    /**
     * @inheritDoc
     */
    empty(): boolean;

    /* ---------------------------------------------------------
        ITERATORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    begin(): IteratorT;

    /**
     * @inheritDoc
     */
    end(): IteratorT;

    /**
     * @inheritDoc
     */
    rbegin(): ReverseIteratorT;

    /**
     * @inheritDoc
     */
    rend(): ReverseIteratorT;

    /**
     * @inheritDoc
     */
    [Symbol.iterator](): IterableIterator<T>;

    /* ---------------------------------------------------------
        ELEMENTS I/O
    --------------------------------------------------------- */
    push(...items: Elem[]): number;

    /**
     * Erase an element.
     * 
     * @param pos Position to erase.
     * @return Iterator following the *pos*, strained by the erasing.
     */
    erase(pos: IteratorT): IteratorT;

    /**
     * Erase elements in range.
     * 
     * @param first Range of the first position to erase.
     * @param last Rangee of the last position to erase.
     * @return Iterator following the last removed element, strained by the erasing.
     */
    erase(first: IteratorT, last: IteratorT): IteratorT;

    /* ---------------------------------------------------------------
        UTILITIES
    --------------------------------------------------------------- */
    /**
     * Swap elements.
     * 
     * @param obj Target container to swap.
     */
    swap(obj: SourceT): void;

    /**
     * Native function for `JSON.stringify()`.
     * 
     * @return An array containing children elements.
     */
    toJSON(): Array<T>;
}

export namespace IContainer
{
    /**
     * Base iterator for {@link IContainer}.
     * 
     * @author Jeongho Nam <http://samchon.org>
     */
    export interface Iterator<T extends Elem, 
            SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, Elem>, 
            IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
            ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
            Elem = T>
        extends Readonly<IReversable<T, IteratorT, ReverseIteratorT>>
    {
        /**
         * Get source container.
         * 
         * @return The source container.
         */
        source(): SourceT;

        /**
         * @inheritDoc
         */
        reverse(): ReverseIteratorT;
    }

    export interface ReverseIterator<T extends Elem, 
            Source extends IContainer<T, Source, Base, This, Elem>, 
            Base extends Iterator<T, Source, Base, This, Elem>, 
            This extends ReverseIterator<T, Source, Base, This, Elem>,
            Elem = T>
        extends Readonly<IReverse<T, Base, This>>
    {
        /**
         * Get source container.
         * 
         * @return The source container.
         */
        source(): Source;
    }
}