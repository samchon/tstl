/**
 * @packageDocumentation
 * @module std
 */
import { AdaptorContainer } from "../internal/container/linear/AdaptorContainer";
import { List } from "./List";
/**
 * Queue; FIFO (First In First Out).
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class Queue<T> extends AdaptorContainer<T, List<T>, Queue<T>> {
    /**
     * Default Constructor.
     */
    constructor();
    /**
     * Copy Constructor.
     *
     * @param obj Object to copy.
     */
    constructor(obj: Queue<T>);
    /**
     * Get the first element.
     *
     * @return The first element.
     */
    front(): T;
    /**
     * Get the last element.
     *
     * @return The last element.
     */
    back(): T;
    /**
     * @inheritDoc
     */
    pop(): void;
}
//# sourceMappingURL=Queue.d.ts.map