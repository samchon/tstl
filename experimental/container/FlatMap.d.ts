/**
 * @packageDocumentation
 * @module std.experimental
 */
import { UniqueTreeMap } from "../../internal/container/associative/UniqueTreeMap";
import { MapElementVector } from "../../internal/container/associative/MapElementVector";
import { IPair } from "../../utility/IPair";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Comparator } from "../../internal/functional/Comparator";
/**
 * Unique-key Map based on sorted array.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class FlatMap<Key, T> extends UniqueTreeMap<Key, T, FlatMap<Key, T>, FlatMap.Iterator<Key, T>, FlatMap.ReverseIterator<Key, T>> {
    private key_comp_;
    /**
     * Default Constructor.
     *
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    constructor(comp?: Comparator<Key>);
    /**
     * Initializer Constructor.
     *
     * @param items Items to assign.
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    constructor(items: IPair<Key, T>[], comp?: Comparator<Key>);
    /**
     * Copy Constructor.
     *
     * @param obj Object to copy.
     */
    constructor(obj: FlatMap<Key, T>);
    /**
     * Range Constructor.
     *
     * @param first Input iterator of the first position.
     * @param last Input iterator of the last position.
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    constructor(first: Readonly<IForwardIterator<IPair<Key, T>>>, last: Readonly<IForwardIterator<IPair<Key, T>>>, comp?: Comparator<Key>);
    /**
     * @inheritDoc
     */
    swap(obj: FlatMap<Key, T>): void;
    /**
     * @inheritDoc
     */
    nth(index: number): FlatMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    key_comp(): Comparator<Key>;
    /**
     * @inheritDoc
     */
    lower_bound(key: Key): FlatMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    upper_bound(key: Key): FlatMap.Iterator<Key, T>;
    private _Capsule_key;
    protected _Handle_insert({}: {}, {}: {}): void;
    protected _Handle_erase({}: {}, {}: {}): void;
}
/**
 *
 */
export declare namespace FlatMap {
    type Iterator<Key, T> = MapElementVector.Iterator<Key, T, true, FlatMap<Key, T>>;
    type ReverseIterator<Key, T> = MapElementVector.ReverseIterator<Key, T, true, FlatMap<Key, T>>;
    const Iterator: typeof MapElementVector.Iterator;
    const ReverseIterator: typeof MapElementVector.ReverseIterator;
    const __MODULE = "experimental";
}
//# sourceMappingURL=FlatMap.d.ts.map