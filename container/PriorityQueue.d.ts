/**
 * @packageDocumentation
 * @module std
 */
import { AdaptorContainer } from "../internal/container/linear/AdaptorContainer";
import { Vector } from "./Vector";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { Comparator } from "../internal/functional/Comparator";
/**
 * Priority Queue; Greater Out First.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class PriorityQueue<T> extends AdaptorContainer<T, Vector<T>, PriorityQueue<T>> {
    private comp_;
    /**
     * Default Constructor.
     *
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    constructor(comp?: Comparator<T>);
    /**
     * Copy Constructor.
     *
     * @param obj Object to copy.
     */
    constructor(obj: PriorityQueue<T>);
    /**
     * Range Constructor.
     *
     * @param first Input iterator of the first position.
     * @param last Input iterator of the last position.
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>, comp?: Comparator<T>);
    /**
     * Get value comparison function.
     */
    value_comp(): Comparator<T>;
    /**
     * Get top element.
     */
    top(): T;
    /**
     * @inheritDoc
     */
    push(...elems: T[]): number;
    /**
     * @inheritDoc
     */
    pop(): void;
    /**
     * @inheritDoc
     */
    swap(obj: PriorityQueue<T>): void;
}
//# sourceMappingURL=PriorityQueue.d.ts.map