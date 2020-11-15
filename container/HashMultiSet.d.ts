/**
 * @packageDocumentation
 * @module std
 */
import { MultiSet } from "../base/container/MultiSet";
import { IHashSet } from "../base/container/IHashSet";
import { SetElementList } from "../internal/container/associative/SetElementList";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { BinaryPredicator } from "../internal/functional/BinaryPredicator";
import { Hasher } from "../internal/functional/Hasher";
/**
 * Multiple-key Set based on Hash buckets.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class HashMultiSet<Key> extends MultiSet<Key, HashMultiSet<Key>, HashMultiSet.Iterator<Key>, HashMultiSet.ReverseIterator<Key>> implements IHashSet<Key, false, HashMultiSet<Key>> {
    private buckets_;
    /**
     * Default Constructor.
     *
     * @param hash An unary function returns hash code. Default is {hash}.
     * @param equal A binary function predicates two arguments are equal. Default is {@link equal_to}.
     */
    constructor(hash?: Hasher<Key>, equal?: BinaryPredicator<Key>);
    /**
     * Initializer Constructor.
     *
     * @param items Items to assign.
     * @param hash An unary function returns hash code. Default is {hash}.
     * @param equal A binary function predicates two arguments are equal. Default is {@link equal_to}.
     */
    constructor(items: Key[], hash?: Hasher<Key>, equal?: BinaryPredicator<Key>);
    /**
     * Copy Constructor.
     *
     * @param obj Object to copy.
     */
    constructor(obj: HashMultiSet<Key>);
    /**
     * Range Constructor.
     *
     * @param first Input iterator of the first position.
     * @param last Input iterator of the last position.
     * @param hash An unary function returns hash code. Default is {hash}.
     * @param equal A binary function predicates two arguments are equal. Default is {@link equal_to}.
     */
    constructor(first: Readonly<IForwardIterator<Key>>, last: Readonly<IForwardIterator<Key>>, hash?: Hasher<Key>, equal?: BinaryPredicator<Key>);
    /**
     * @inheritDoc
     */
    clear(): void;
    /**
     * @inheritDoc
     */
    swap(obj: HashMultiSet<Key>): void;
    /**
     * @inheritDoc
     */
    find(key: Key): HashMultiSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    count(key: Key): number;
    /**
     * @inheritDoc
     */
    begin(): HashMultiSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    begin(index: number): HashMultiSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    end(): HashMultiSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    end(index: number): HashMultiSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    rbegin(): HashMultiSet.ReverseIterator<Key>;
    /**
     * @inheritDoc
     */
    rbegin(index: number): HashMultiSet.ReverseIterator<Key>;
    /**
     * @inheritDoc
     */
    rend(): HashMultiSet.ReverseIterator<Key>;
    /**
     * @inheritDoc
     */
    rend(index: number): HashMultiSet.ReverseIterator<Key>;
    /**
     * @inheritDoc
     */
    bucket_count(): number;
    /**
     * @inheritDoc
     */
    bucket_size(n: number): number;
    /**
     * @inheritDoc
     */
    load_factor(): number;
    /**
     * @inheritDoc
     */
    hash_function(): Hasher<Key>;
    /**
     * @inheritDoc
     */
    key_eq(): BinaryPredicator<Key>;
    /**
     * @inheritDoc
     */
    bucket(key: Key): number;
    /**
     * @inheritDoc
     */
    max_load_factor(): number;
    /**
     * @inheritDoc
     */
    max_load_factor(z: number): void;
    /**
     * @inheritDoc
     */
    reserve(n: number): void;
    /**
     * @inheritDoc
     */
    rehash(n: number): void;
    protected _Key_eq(x: Key, y: Key): boolean;
    protected _Insert_by_key(key: Key): HashMultiSet.Iterator<Key>;
    protected _Insert_by_hint(hint: HashMultiSet.Iterator<Key>, key: Key): HashMultiSet.Iterator<Key>;
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    protected _Handle_insert(first: HashMultiSet.Iterator<Key>, last: HashMultiSet.Iterator<Key>): void;
    protected _Handle_erase(first: HashMultiSet.Iterator<Key>, last: HashMultiSet.Iterator<Key>): void;
}
/**
 *
 */
export declare namespace HashMultiSet {
    /**
     * Iterator of {@link HashMultiSet}
     */
    type Iterator<Key> = SetElementList.Iterator<Key, false, HashMultiSet<Key>>;
    /**
     * Reverse iterator of {@link HashMultiSet}
     */
    type ReverseIterator<Key> = SetElementList.ReverseIterator<Key, false, HashMultiSet<Key>>;
    const Iterator: typeof SetElementList.Iterator;
    const ReverseIterator: typeof SetElementList.ReverseIterator;
}
//# sourceMappingURL=HashMultiSet.d.ts.map