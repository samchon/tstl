//================================================================ 
/** @module std.base */
//================================================================
import { IContainer } from "./IContainer";
import { IDeque } from "../../internal/container/partial/IDeque";
import { ILinearContainer } from "./ILinearContainer";

/**
 * Interface for deque containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface IDequeContainer<T extends ElemT,
        SourceT extends IDequeContainer<T, SourceT, IteratorT, ReverseT, ElemT>, 
        IteratorT extends IContainer.Iterator<T, SourceT, IteratorT, ReverseT, ElemT>, 
        ReverseT extends IContainer.ReverseIterator<T, SourceT, IteratorT, ReverseT, ElemT>,
        ElemT = T>
    extends ILinearContainer<T, SourceT, IteratorT, ReverseT, ElemT>, IDeque<T>
{
}

export namespace IDequeContainer
{
    export type Iterator<T extends ElemT, 
            SourceT extends IDequeContainer<T, SourceT, IteratorT, ReverseT, T>, 
            IteratorT extends IDequeContainer.Iterator<T, SourceT, IteratorT, ReverseT, T>, 
            ReverseT extends IDequeContainer.ReverseIterator<T, SourceT, IteratorT, ReverseT, T>,
            ElemT = T> 
        = ILinearContainer.Iterator<T, SourceT, IteratorT, ReverseT, ElemT>;
    
    export type ReverseIterator<T extends ElemT, 
            SourceT extends IDequeContainer<T, SourceT, IteratorT, ReverseT, T>, 
            IteratorT extends IDequeContainer.Iterator<T, SourceT, IteratorT, ReverseT, T>, 
            ReverseT extends IDequeContainer.ReverseIterator<T, SourceT, IteratorT, ReverseT, T>,
            ElemT = T> 
        = ILinearContainer.ReverseIterator<T, SourceT, IteratorT, ReverseT, ElemT>;
}