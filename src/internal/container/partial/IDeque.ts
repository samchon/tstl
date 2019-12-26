//================================================================ 
/** @module std.internal */
//================================================================
import { IPushFront } from "./IPushFront";

export interface IDeque<T> extends IPushFront<T>
{
    /**
     * @inheritDoc
     */
    push_front(val: T): void;

    /**
     * Erase the first element.
     */
    pop_front(): void;
}