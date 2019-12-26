//================================================================ 
/** @module std.base */
//================================================================
import { ILinearContainer } from "./ILinearContainer";
import { IRandomAccessIterator } from "../../iterator/IRandomAccessIterator";

/**
 * Interface for array containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface IArrayContainer<T extends ElemT, 
        SourceT extends IArrayContainer<T, SourceT, IteratorT, ReverseT, T>, 
        IteratorT extends IArrayContainer.Iterator<T, SourceT, IteratorT, ReverseT, T>, 
        ReverseT extends IArrayContainer.ReverseIterator<T, SourceT, IteratorT, ReverseT, T>,
        ElemT = T>
    extends ILinearContainer<T, SourceT, IteratorT, ReverseT, ElemT>
{
    /**
     * Get iterator at specific position.
     * 
     * @param index Specific position.
     * @return The iterator at the *index*.
     */
    nth(index: number): IteratorT;

    /**
     * Get element at specific position.
     * 
     * @param index Specific position.
     * @return The element at the *index*.
     */
    at(index: number): T;

    /**
     * Change element at specific position.
     * 
     * @param index Specific position.
     * @param val The new value to change.
     */
    set(index: number, val: T): void;
}

export namespace IArrayContainer
{
    export type Iterator<T extends ElemT, 
            SourceT extends IArrayContainer<T, SourceT, IteratorT, ReverseT, T>, 
            IteratorT extends IArrayContainer.Iterator<T, SourceT, IteratorT, ReverseT, T>, 
            ReverseT extends IArrayContainer.ReverseIterator<T, SourceT, IteratorT, ReverseT, T>,
            ElemT = T> 
        = ILinearContainer.Iterator<T, SourceT, IteratorT, ReverseT, ElemT> & IRandomAccessIterator<T, IteratorT>;
    
    export type ReverseIterator<T extends ElemT, 
            SourceT extends IArrayContainer<T, SourceT, IteratorT, ReverseT, T>, 
            IteratorT extends IArrayContainer.Iterator<T, SourceT, IteratorT, ReverseT, T>, 
            ReverseT extends IArrayContainer.ReverseIterator<T, SourceT, IteratorT, ReverseT, T>,
            ElemT = T> 
        = ILinearContainer.ReverseIterator<T, SourceT, IteratorT, ReverseT, ElemT> & IRandomAccessIterator<T, ReverseT>;
}