/**
 * @packageDocumentation
 * @module std
 */
import { ListContainer } from "../internal/container/linear/ListContainer";
import { IDequeContainer } from "../base/container/IDequeContainer";
import { IListAlgorithm } from "../internal/container/linear/IListAlgorithm";
import { ListIterator } from "../internal/iterator/ListIterator";
import { ReverseIterator as ReverseIteratorBase } from "../internal/iterator/ReverseIterator";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { BinaryPredicator } from "../internal/functional/BinaryPredicator";
import { Comparator } from "../internal/functional/Comparator";
import { UnaryPredicator } from "../internal/functional/UnaryPredicator";
/**
 * Doubly Linked List.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class List<T> extends ListContainer<T, List<T>, List.Iterator<T>, List.ReverseIterator<T>> implements IDequeContainer<T, List<T>, List.Iterator<T>, List.ReverseIterator<T>>, IListAlgorithm<T, List<T>> {
    private ptr_;
    /**
     * Default Constructor.
     */
    constructor();
    /**
     * Initializer Constructor.
     *
     * @param items Items to assign.
     */
    constructor(items: Array<T>);
    /**
     * Copy Constructor
     *
     * @param obj Object to copy.
     */
    constructor(obj: List<T>);
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
     * @param last Input iteartor of the last position.
     */
    constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>);
    protected _Create_iterator(prev: List.Iterator<T>, next: List.Iterator<T>, val: T): List.Iterator<T>;
    /**
     * @inheritDoc
     */
    front(): T;
    /**
     * @inheritDoc
     */
    front(val: T): void;
    /**
     * @inheritDoc
     */
    back(): T;
    /**
     * @inheritDoc
     */
    back(val: T): void;
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
    merge(source: List<T>, comp?: Comparator<T>): void;
    /**
     * Transfer elements.
     *
     * @param pos Position to insert.
     * @param from Target container to transfer.
     */
    splice(pos: List.Iterator<T>, from: List<T>): void;
    /**
     * Transfer a single element.
     *
     * @param pos Position to insert.
     * @param from Target container to transfer.
     * @param it Position of the single element to transfer.
     */
    splice(pos: List.Iterator<T>, from: List<T>, it: List.Iterator<T>): void;
    /**
     * Transfer range elements.
     *
     * @param pos Position to insert.
     * @param from Target container to transfer.
     * @param first Range of the first position to transfer.
     * @param last Rangee of the last position to transfer.
     */
    splice(pos: List.Iterator<T>, from: List<T>, first: List.Iterator<T>, last: List.Iterator<T>): void;
    /**
     * @inheritDoc
     */
    sort(comp?: Comparator<T>): void;
    private _Quick_sort;
    private _Quick_sort_partition;
    /**
     * @inheritDoc
     */
    reverse(): void;
    /**
     * @inheritDoc
     */
    swap(obj: List<T>): void;
}
/**
 *
 */
export declare namespace List {
    /**
     * Iterator of {@link List}
     *
     * @author Jeongho Nam - https://github.com/samchon
     */
    class Iterator<T> extends ListIterator<T, List<T>, Iterator<T>, ReverseIterator<T>, T> {
        private source_ptr_;
        private constructor();
        /**
         * @inheritDoc
         */
        reverse(): ReverseIterator<T>;
        /**
         * @inheritDoc
         */
        source(): List<T>;
        /**
         * @inheritDoc
         */
        get value(): T;
        /**
         * @inheritDoc
         */
        set value(val: T);
        equals(obj: Iterator<T>): boolean;
    }
    /**
     * Reverse iterator of {@link List}
     *
     * @author Jeongho Nam - https://github.com/samchon
     */
    class ReverseIterator<T> extends ReverseIteratorBase<T, List<T>, Iterator<T>, ReverseIterator<T>, T> {
        protected _Create_neighbor(base: Iterator<T>): ReverseIterator<T>;
        /**
         * @inheritDoc
         */
        get value(): T;
        /**
         * @inheritDoc
         */
        set value(val: T);
    }
}
//# sourceMappingURL=List.d.ts.map