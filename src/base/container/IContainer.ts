//================================================================ 
/** @module std.base */
//================================================================
import { IBidirectionalContainer } from "../../internal/container/IBidirectionalContainer";
import { Iterator } from "../iterator/Iterator";
import { IReverseIterator } from "../iterator/ReverseIterator";

import { IForwardIterator } from "../../iterator/IForwardIterator";
import { _IEmpty, _ISize, _IPush } from "../../internal/container/IPartialContainers";

/**
 * Interface for Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface IContainer<T extends Elem, 
        SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
        IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
        ReverseIteratorT extends IReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
        Elem = T>
    extends IBidirectionalContainer<Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>, ReverseIteratorT>, 
        Iterable<T>, _IEmpty, _ISize, _IPush<Elem>
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