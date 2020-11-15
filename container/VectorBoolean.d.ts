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
 * Vector only for `boolean`.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class VectorBoolean extends ArrayContainer<boolean, VectorBoolean, VectorBoolean, VectorBoolean.Iterator, VectorBoolean.ReverseIterator, boolean> implements IArrayContainer<boolean, VectorBoolean, VectorBoolean.Iterator, VectorBoolean.ReverseIterator> {
    /**
     * Store not full elements, but their sequence.
     *
     *   - first: index
     *   - second: value
     */
    private data_;
    /**
     * Number of elements
     */
    private size_;
    /**
     * Default Constructor.
     */
    constructor();
    /**
     * Initializer Constructor.
     *
     * @param items Items to assign.
     */
    constructor(array: boolean[]);
    /**
     * Copy Constructor
     *
     * @param obj Object to copy.
     */
    constructor(obj: VectorBoolean);
    /**
     * Fill Constructor.
     *
     * @param size Initial size.
     * @param val Value to fill.
     */
    constructor(n: number, val: boolean);
    /**
     * Range Constructor.
     *
     * @param first Input iterator of the first position.
     * @param last Input iteartor of the last position.
     */
    constructor(first: Readonly<IForwardIterator<boolean>>, last: Readonly<IForwardIterator<boolean>>);
    /**
     * @inheritDoc
     */
    assign(n: number, val: boolean): void;
    /**
     * @inheritDoc
     */
    assign<InputIterator extends Readonly<IForwardIterator<boolean, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    /**
     * @inheritDoc
     */
    clear(): void;
    /**
     * @inheritDoc
     */
    resize(n: number): void;
    /**
     * Flip all values.
     */
    flip(): void;
    /**
     * @inheritDoc
     */
    swap(obj: VectorBoolean): void;
    protected source(): VectorBoolean;
    /**
     * @inheritDoc
     */
    size(): number;
    protected _At(index: number): boolean;
    protected _Set(index: number, val: boolean): void;
    /**
     * @inheritDoc
     */
    nth(index: number): VectorBoolean.Iterator;
    private _Find_node;
    /**
     * @inheritDoc
     */
    push(...items: boolean[]): number;
    /**
     * @inheritDoc
     */
    push_back(val: boolean): void;
    protected _Pop_back(): void;
    protected _Insert_by_repeating_val(pos: VectorBoolean.Iterator, n: number, val: boolean): VectorBoolean.Iterator;
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<boolean, InputIterator>>>(pos: VectorBoolean.Iterator, first: InputIterator, last: InputIterator): VectorBoolean.Iterator;
    private _Insert_to_middle;
    private _Insert_to_end;
    protected _Erase_by_range(first: VectorBoolean.Iterator, last: VectorBoolean.Iterator): VectorBoolean.Iterator;
}
/**
 *
 */
export declare namespace VectorBoolean {
    /**
     * Iterator of {@link VectorBoolean}
     */
    type Iterator = ArrayIterator<boolean, VectorBoolean>;
    /**
     * Reverse iterator of {@link VectorBoolean}
     */
    type ReverseIterator = ArrayReverseIterator<boolean, VectorBoolean>;
    const Iterator: typeof ArrayIterator;
    const ReverseIterator: typeof ArrayReverseIterator;
}
//# sourceMappingURL=VectorBoolean.d.ts.map