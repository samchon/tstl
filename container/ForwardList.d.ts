/**
 * @packageDocumentation
 * @module std
 */
import { IForwardContainer } from "../ranges/container/IForwardContainer";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IClear } from "../internal/container/partial/IClear";
import { IEmpty } from "../internal/container/partial/IEmpty";
import { ISize } from "../internal/container/partial/ISize";
import { IDeque } from "../internal/container/partial/IDeque";
import { IFront } from "../internal/container/partial/IFront";
import { IListAlgorithm } from "../internal/container/linear/IListAlgorithm";
import { Comparator } from "../internal/functional/Comparator";
import { BinaryPredicator } from "../internal/functional/BinaryPredicator";
import { UnaryPredicator } from "../internal/functional/UnaryPredicator";
/**
 * Singly Linked List.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class ForwardList<T> implements IForwardContainer<ForwardList.Iterator<T>>, IClear, IEmpty, ISize, IDeque<T>, IFront<T>, Iterable<T>, IListAlgorithm<T, ForwardList<T>> {
    private ptr_;
    private size_;
    private before_begin_;
    private end_;
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
    constructor(obj: ForwardList<T>);
    /**
     * Fill Constructor.
     *
     * @param size Initial size.
     * @param val Value to fill.
     */
    constructor(n: number, val: T);
    /**
     * Range Constructor.
     *
     * @param first Input iterator of the first position.
     * @param last Input iterator of the last position.
     */
    constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>);
    /**
     * Fill Assigner.
     *
     * @param n Initial size.
     * @param val Value to fill.
     */
    assign(n: number, val: T): void;
    /**
     * Range Assigner.
     *
     * @param first Input iteartor of the first position.
     * @param last Input iterator of the last position.
     */
    assign<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    /**
     * @inheritDoc
     */
    clear(): void;
    /**
     * @inheritDoc
     */
    size(): number;
    /**
     * @inheritDoc
     */
    empty(): boolean;
    /**
     * @inheritDoc
     */
    front(): T;
    /**
     * @inheritDoc
     */
    front(val: T): void;
    /**
     * Iterator to before beginning.
     *
     * @return Iterator to the before beginning.
     */
    before_begin(): ForwardList.Iterator<T>;
    /**
     * @inheritDoc
     */
    begin(): ForwardList.Iterator<T>;
    /**
     * @inheritDoc
     */
    end(): ForwardList.Iterator<T>;
    /**
     * @inheritDoc
     */
    [Symbol.iterator](): IterableIterator<T>;
    /**
     * @inheritDoc
     */
    push_front(val: T): void;
    /**
     * Insert an element.
     *
     * @param pos Position to insert after.
     * @param val Value to insert.
     * @return An iterator to the newly inserted element.
     */
    insert_after(pos: ForwardList.Iterator<T>, val: T): ForwardList.Iterator<T>;
    /**
     * Inserted repeated elements.
     *
     * @param pos Position to insert after.
     * @param n Number of elements to insert.
     * @param val Value to insert repeatedly.
     * @return An iterator to the last of the newly inserted elements.
     */
    insert_after(pos: ForwardList.Iterator<T>, n: number, val: T): ForwardList.Iterator<T>;
    /**
     * Insert range elements.
     *
     * @param pos Position to insert after.
     * @param first Input iterator of the first position.
     * @param last Input iteartor of the last position.
     * @return An iterator to the last of the newly inserted elements.
     */
    insert_after<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>(pos: ForwardList.Iterator<T>, first: InputIterator, last: InputIterator): ForwardList.Iterator<T>;
    private _Insert_by_repeating_val;
    private _Insert_by_range;
    /**
     * @inheritDoc
     */
    pop_front(): void;
    /**
     * Erase an element.
     *
     * @param it Position to erase after.
     * @return Iterator to the erased element.
     */
    erase_after(it: ForwardList.Iterator<T>): ForwardList.Iterator<T>;
    /**
     * Erase elements.
     *
     * @param first Range of the first position to erase after.
     * @param last Rangee of the last position to erase.
     * @return Iterator to the last removed element.
     */
    erase_after(first: ForwardList.Iterator<T>, last: ForwardList.Iterator<T>): ForwardList.Iterator<T>;
    /**
     * @inheritDoc
     */
    unique(binary_pred?: BinaryPredicator<T>): void;
    /**
     * @inheritDoc
     */
    remove(val: T): void;
    /**
     * @inheritDoc
     */
    remove_if(pred: UnaryPredicator<T>): void;
    /**
     * @inheritDoc
     */
    merge(from: ForwardList<T>, comp?: Comparator<T>): void;
    /**
     * Transfer elements.
     *
     * @param pos Position to insert after.
     * @param from Target container to transfer.
     */
    splice_after(pos: ForwardList.Iterator<T>, from: ForwardList<T>): void;
    /**
     * Transfer a single element.
     *
     * @param pos Position to insert after.
     * @param from Target container to transfer.
     * @param before Previous position of the single element to transfer.
     */
    splice_after(pos: ForwardList.Iterator<T>, from: ForwardList<T>, before: ForwardList.Iterator<T>): void;
    /**
     * Transfer range elements.
     *
     * @param pos Position to insert after.
     * @param from Target container to transfer.
     * @param first Range of previous of the first position to transfer.
     * @param last Rangee of the last position to transfer.
     */
    splice_after(pos: ForwardList.Iterator<T>, from: ForwardList<T>, first_before: ForwardList.Iterator<T>, last: ForwardList.Iterator<T>): void;
    /**
     * @inheritDoc
     */
    sort(comp?: Comparator<T>): void;
    /**
     * @inheritDoc
     */
    reverse(): void;
    /**
     * @inheritDoc
     */
    swap(obj: ForwardList<T>): void;
    /**
     * Native function for `JSON.stringify()`.
     *
     * @return An array containing children elements.
     */
    toJSON(): Array<T>;
}
/**
 *
 */
export declare namespace ForwardList {
    /**
     * Iterator of {@link ForwardList}
     *
     * @author Jeongho Nam - https://github.com/samchon
     */
    class Iterator<T> implements IForwardIterator<T, Iterator<T>> {
        private source_ptr_;
        private next_;
        private value_;
        private constructor();
        /**
         * Get source container.
         *
         * @return The source container.
         */
        source(): ForwardList<T>;
        /**
         * @inheritDoc
         */
        get value(): T;
        /**
         * @inheritDoc
         */
        set value(val: T);
        private _Try_value;
        /**
         * @inheritDoc
         */
        next(): Iterator<T>;
        /**
         * @inheritDoc
         */
        equals(obj: Iterator<T>): boolean;
    }
}
//# sourceMappingURL=ForwardList.d.ts.map