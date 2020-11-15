/**
 * @packageDocumentation
 * @module std
 */
import { AdaptorContainer } from "../internal/container/linear/AdaptorContainer";
import { Vector } from "./Vector";
/**
 * Stack; LIFO (Last In First Out).
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class Stack<T> extends AdaptorContainer<T, Vector<T>, Stack<T>> {
    /**
     * Default Constructor.
     */
    constructor();
    /**
     * Copy Constructor.
     *
     * @param obj Object to copy.
     */
    constructor(obj: Stack<T>);
    /**
     * Get the last element.
     *
     * @return The last element.
     */
    top(): T;
    /**
     * @inheritDoc
     */
    pop(): void;
}
//# sourceMappingURL=Stack.d.ts.map