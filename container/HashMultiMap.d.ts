/**
 * @packageDocumentation
 * @module std
 */
import { MultiMap } from "../base/container/MultiMap";
import { IHashMap } from "../base/container/IHashMap";
import { MapElementList } from "../internal/container/associative/MapElementList";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IPair } from "../utility/IPair";
import { BinaryPredicator } from "../internal/functional/BinaryPredicator";
import { Hasher } from "../internal/functional/Hasher";
/**
 * Multiple-key Map based on Hash buckets.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class HashMultiMap<Key, T> extends MultiMap<Key, T, HashMultiMap<Key, T>, HashMultiMap.Iterator<Key, T>, HashMultiMap.ReverseIterator<Key, T>> implements IHashMap<Key, T, false, HashMultiMap<Key, T>> {
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
    constructor(items: IPair<Key, T>[], hash?: Hasher<Key>, equal?: BinaryPredicator<Key>);
    /**
     * Copy Constructor.
     *
     * @param obj Object to copy.
     */
    constructor(obj: HashMultiMap<Key, T>);
    /**
     * Range Constructor.
     *
     * @param first Input iterator of the first position.
     * @param last Input iterator of the last position.
     * @param hash An unary function returns hash code. Default is {hash}.
     * @param equal A binary function predicates two arguments are equal. Default is {@link equal_to}.
     */
    constructor(first: Readonly<IForwardIterator<IPair<Key, T>>>, last: Readonly<IForwardIterator<IPair<Key, T>>>, hash?: Hasher<Key>, equal?: BinaryPredicator<Key>);
    /**
     * @inheritDoc
     */
    clear(): void;
    /**
     * @inheritDoc
     */
    swap(obj: HashMultiMap<Key, T>): void;
    /**
     * @inheritDoc
     */
    find(key: Key): HashMultiMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    count(key: Key): number;
    /**
     * @inheritDoc
     */
    begin(): HashMultiMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    begin(index: number): HashMultiMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    end(): HashMultiMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    end(index: number): HashMultiMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    rbegin(): HashMultiMap.ReverseIterator<Key, T>;
    /**
     * @inheritDoc
     */
    rbegin(index: number): HashMultiMap.ReverseIterator<Key, T>;
    /**
     * @inheritDoc
     */
    rend(): HashMultiMap.ReverseIterator<Key, T>;
    /**
     * @inheritDoc
     */
    rend(index: number): HashMultiMap.ReverseIterator<Key, T>;
    /**
     * @inheritDoc
     */
    bucket_count(): number;
    /**
     * @inheritDoc
     */
    bucket_size(index: number): number;
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
    /**
     * @inheritDoc
     */
    emplace(key: Key, val: T): HashMultiMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    emplace_hint(hint: HashMultiMap.Iterator<Key, T>, key: Key, val: T): HashMultiMap.Iterator<Key, T>;
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>(first: InputIterator, last: InputIterator): void;
    protected _Handle_insert(first: HashMultiMap.Iterator<Key, T>, last: HashMultiMap.Iterator<Key, T>): void;
    protected _Handle_erase(first: HashMultiMap.Iterator<Key, T>, last: HashMultiMap.Iterator<Key, T>): void;
}
/**
 *
 */
export declare namespace HashMultiMap {
    /**
     * Iterator of {@link HashMultiMap}
     */
    type Iterator<Key, T> = MapElementList.Iterator<Key, T, false, HashMultiMap<Key, T>>;
    /**
     * Reverse iterator of {@link HashMultiMap}
     */
    type ReverseIterator<Key, T> = MapElementList.ReverseIterator<Key, T, false, HashMultiMap<Key, T>>;
    const Iterator: typeof MapElementList.Iterator;
    const ReverseIterator: typeof MapElementList.ReverseIterator;
}
//# sourceMappingURL=HashMultiMap.d.ts.map