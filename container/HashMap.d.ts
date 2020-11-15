/**
 * @packageDocumentation
 * @module std
 */
import { UniqueMap } from "../base/container/UniqueMap";
import { IHashMap } from "../base/container/IHashMap";
import { MapElementList } from "../internal/container/associative/MapElementList";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IPair } from "../utility/IPair";
import { Pair } from "../utility/Pair";
import { BinaryPredicator } from "../internal/functional/BinaryPredicator";
import { Hasher } from "../internal/functional/Hasher";
/**
 * Unique-key Map based on Hash buckets.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class HashMap<Key, T> extends UniqueMap<Key, T, HashMap<Key, T>, HashMap.Iterator<Key, T>, HashMap.ReverseIterator<Key, T>> implements IHashMap<Key, T, true, HashMap<Key, T>> {
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
    constructor(obj: HashMap<Key, T>);
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
    swap(obj: HashMap<Key, T>): void;
    /**
     * @inheritDoc
     */
    find(key: Key): HashMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    begin(): HashMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    begin(index: number): HashMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    end(): HashMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    end(index: number): HashMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    rbegin(): HashMap.ReverseIterator<Key, T>;
    /**
     * @inheritDoc
     */
    rbegin(index: number): HashMap.ReverseIterator<Key, T>;
    /**
     * @inheritDoc
     */
    rend(): HashMap.ReverseIterator<Key, T>;
    /**
     * @inheritDoc
     */
    rend(index: number): HashMap.ReverseIterator<Key, T>;
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
    /**
     * @inheritDoc
     */
    emplace(key: Key, val: T): Pair<HashMap.Iterator<Key, T>, boolean>;
    /**
     * @inheritDoc
     */
    emplace_hint(hint: HashMap.Iterator<Key, T>, key: Key, val: T): HashMap.Iterator<Key, T>;
    protected _Handle_insert(first: HashMap.Iterator<Key, T>, last: HashMap.Iterator<Key, T>): void;
    protected _Handle_erase(first: HashMap.Iterator<Key, T>, last: HashMap.Iterator<Key, T>): void;
}
/**
 *
 */
export declare namespace HashMap {
    /**
     * Iterator of {@link HashMap}
     */
    type Iterator<Key, T> = MapElementList.Iterator<Key, T, true, HashMap<Key, T>>;
    /**
     * Reverse iterator of {@link HashMap}
     */
    type ReverseIterator<Key, T> = MapElementList.ReverseIterator<Key, T, true, HashMap<Key, T>>;
    const Iterator: typeof MapElementList.Iterator;
    const ReverseIterator: typeof MapElementList.ReverseIterator;
}
//# sourceMappingURL=HashMap.d.ts.map