/**
 * @packageDocumentation
 * @module std
 */
import { UniqueSet } from "../base/container/UniqueSet";
import { IHashSet } from "../base/container/IHashSet";
import { SetElementList } from "../internal/container/associative/SetElementList";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { Pair } from "../utility/Pair";
import { BinaryPredicator } from "../internal/functional/BinaryPredicator";
import { Hasher } from "../internal/functional/Hasher";
/**
 * Unique-key Set based on Hash buckets.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class HashSet<Key> extends UniqueSet<Key, HashSet<Key>, HashSet.Iterator<Key>, HashSet.ReverseIterator<Key>> implements IHashSet<Key, true, HashSet<Key>> {
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
    constructor(obj: HashSet<Key>);
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
    swap(obj: HashSet<Key>): void;
    /**
     * @inheritDoc
     */
    find(key: Key): HashSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    begin(): HashSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    begin(index: number): HashSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    end(): HashSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    end(index: number): HashSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    rbegin(): HashSet.ReverseIterator<Key>;
    /**
     * @inheritDoc
     */
    rbegin(index: number): HashSet.ReverseIterator<Key>;
    /**
     * @inheritDoc
     */
    rend(): HashSet.ReverseIterator<Key>;
    /**
     * @inheritDoc
     */
    rend(index: number): HashSet.ReverseIterator<Key>;
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
    protected _Insert_by_key(key: Key): Pair<HashSet.Iterator<Key>, boolean>;
    protected _Insert_by_hint(hint: HashSet.Iterator<Key>, key: Key): HashSet.Iterator<Key>;
    protected _Handle_insert(first: HashSet.Iterator<Key>, last: HashSet.Iterator<Key>): void;
    protected _Handle_erase(first: HashSet.Iterator<Key>, last: HashSet.Iterator<Key>): void;
}
/**
 *
 */
export declare namespace HashSet {
    /**
     * Iterator of {@link HashSet}
     */
    type Iterator<Key> = SetElementList.Iterator<Key, true, HashSet<Key>>;
    /**
     * Reverse iterator of {@link HashSet}
     */
    type ReverseIterator<Key> = SetElementList.ReverseIterator<Key, true, HashSet<Key>>;
    const Iterator: typeof SetElementList.Iterator;
    const ReverseIterator: typeof SetElementList.ReverseIterator;
}
//# sourceMappingURL=HashSet.d.ts.map