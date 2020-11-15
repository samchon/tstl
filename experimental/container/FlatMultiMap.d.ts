/**
 * @packageDocumentation
 * @module std.experimental
 */
import { MultiTreeMap } from "../../internal/container/associative/MultiTreeMap";
import { MapElementVector } from "../../internal/container/associative/MapElementVector";
import { IPair } from "../../utility/IPair";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Comparator } from "../../internal/functional/Comparator";
/**
 * Multiple-key Map based on sorted array.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class FlatMultiMap<Key, T> extends MultiTreeMap<Key, T, FlatMultiMap<Key, T>, FlatMultiMap.Iterator<Key, T>, FlatMultiMap.ReverseIterator<Key, T>> {
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
    constructor(obj: FlatMultiMap<Key, T>);
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
    swap(obj: FlatMultiMap<Key, T>): void;
    /**
     * @inheritDoc
     */
    nth(index: number): FlatMultiMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    key_comp(): Comparator<Key>;
    /**
     * @inheritDoc
     */
    lower_bound(key: Key): FlatMultiMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    upper_bound(key: Key): FlatMultiMap.Iterator<Key, T>;
    private _Capsule_key;
    protected _Handle_insert({}: {}, {}: {}): void;
    protected _Handle_erase({}: {}, {}: {}): void;
}
/**
 *
 */
export declare namespace FlatMultiMap {
    type Iterator<Key, T> = MapElementVector.Iterator<Key, T, false, FlatMultiMap<Key, T>>;
    type ReverseIterator<Key, T> = MapElementVector.ReverseIterator<Key, T, false, FlatMultiMap<Key, T>>;
    const Iterator: typeof MapElementVector.Iterator;
    const ReverseIterator: typeof MapElementVector.ReverseIterator;
    const __MODULE = "experimental";
}
//# sourceMappingURL=FlatMultiMap.d.ts.map