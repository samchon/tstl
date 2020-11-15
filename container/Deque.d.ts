/**
 * @packageDocumentation
 * @module std
 */
import { IArrayContainer } from "../base/container/IArrayContainer";
import { ArrayContainer } from "../internal/container/linear/ArrayContainer";
import { ArrayIterator } from "../internal/iterator/ArrayIterator";
import { ArrayReverseIterator } from "../internal/iterator/ArrayReverseIterator";
import { IForwardIterator } from "../iterator/IForwardIterator";
/**
 * Double ended queue.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class Deque<T> extends ArrayContainer<T, Deque<T>, Deque<T>, Deque.Iterator<T>, Deque.ReverseIterator<T>, T> implements IArrayContainer<T, Deque<T>, Deque.Iterator<T>, Deque.ReverseIterator<T>> {
    private matrix_;
    private size_;
    private capacity_;
    /**
     * Default Constructor.
     */
    constructor();
    /**
     * Initializer Constructor.
     *
     * @param items Items to assign.
     */
    constructor(items: T[]);
    /**
     * Copy Constructor
     *
     * @param obj Object to copy.
     */
    constructor(obj: Deque<T>);
    /**
     * Fill Constructor.
     *
     * @param size Initial size.
     * @param val Value to fill.
     */
    constructor(size: number, val: T);
    /**
     * Range Constructor.
     *
     * @param first Input iterator of the first position.
     * @param last Input iterator of the last position.
     */
    constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>);
    /**
     * @inheritDoc
     */
    assign(n: number, val: T): void;
    /**
     * @inheritDoc
     */
    assign<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    /**
     * @inheritDoc
     */
    clear(): void;
    /**
     * @inheritDoc
     */
    resize(n: number): void;
    /**
     * Reserve {@link capacity} enable to store *n* elements.
     *
     * @param n The capacity to reserve.
     */
    reserve(n: number): void;
    private _Reserve;
    /**
     * Shrink {@link capacity} to actual {@link size}.
     */
    shrink_to_fit(): void;
    /**
     * @inheritDoc
     */
    swap(obj: Deque<T>): void;
    private _Swap;
    private static _Emend;
    /**
     * @inheritDoc
     */
    size(): number;
    /**
     * The capacity to store elements.
     *
     * @return The capacity.
     */
    capacity(): number;
    /**
     * @inheritDoc
     */
    nth(index: number): Deque.Iterator<T>;
    /**
     * @inheritDoc
     */
    [Symbol.iterator](): IterableIterator<T>;
    protected source(): Deque<T>;
    protected _At(index: number): T;
    protected _Set(index: number, val: T): void;
    private _Fetch_index;
    private _Compute_col_size;
    /**
     * @inheritDoc
     */
    push(...items: T[]): number;
    /**
     * @inheritDoc
     */
    push_front(val: T): void;
    /**
     * @inheritDoc
     */
    push_back(val: T): void;
    /**
     * @inheritDoc
     */
    pop_front(): void;
    protected _Pop_back(): void;
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(pos: Deque.Iterator<T>, first: InputIterator, last: InputIterator): Deque.Iterator<T>;
    private _Insert_to_middle;
    private _Insert_to_end;
    private _Try_expand_capacity;
    private _Try_add_row_at_front;
    private _Try_add_row_at_back;
    protected _Erase_by_range(first: Deque.Iterator<T>, last: Deque.Iterator<T>): Deque.Iterator<T>;
}
/**
 *
 */
export declare namespace Deque {
    /**
     * Iterator of {@link Deque}
     */
    type Iterator<T> = ArrayIterator<T, Deque<T>>;
    /**
     * Reverse iterator of {@link Deque}
     */
    type ReverseIterator<T> = ArrayReverseIterator<T, Deque<T>>;
    const Iterator: typeof ArrayIterator;
    const ReverseIterator: typeof ArrayReverseIterator;
    /**
     * Row size of the {@link Deque.matrix_ matrix} which contains elements.
     *
     * Note that the {@link ROW_SIZE} affects on time complexity of accessing and inserting element.
     * Accessing element is {@link ROW_SIZE} times slower than ordinary {@link Vector} and inserting element
     * in middle position is {@link ROW_SIZE} times faster than ordinary {@link Vector}.
     *
     * When the {@link ROW_SIZE} returns 8, time complexity of accessing element is O(8) and inserting
     * element in middle position is O(N/8). ({@link Vector}'s time complexity of accessement is O(1)
     * and inserting element is O(N)).
     */
    const ROW_SIZE = 8;
    /**
     * Minimum {@link Deque.capacity}.
     *
     * Although a {@link Deque} has few elements, even no element is belonged to, the {@link Deque}
     * keeps the minimum {@link Deque.capacity} at least.
     */
    const MIN_CAPACITY = 36;
    /**
     * Expansion ratio.
     */
    const MAGNIFIER = 1.5;
}
//# sourceMappingURL=Deque.d.ts.map