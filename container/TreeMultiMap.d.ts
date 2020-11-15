/**
 * @packageDocumentation
 * @module std
 */
import { MultiTreeMap } from "../internal/container/associative/MultiTreeMap";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { MapElementList } from "../internal/container/associative/MapElementList";
import { Comparator } from "../internal/functional/Comparator";
import { IPair } from "../utility/IPair";
/**
 * Multiple-key Map based on Tree.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class TreeMultiMap<Key, T> extends MultiTreeMap<Key, T, TreeMultiMap<Key, T>, TreeMultiMap.Iterator<Key, T>, TreeMultiMap.ReverseIterator<Key, T>> {
    private tree_;
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
    constructor(obj: TreeMultiMap<Key, T>);
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
    clear(): void;
    /**
     * @inheritDoc
     */
    swap(obj: TreeMultiMap<Key, T>): void;
    /**
     * @inheritDoc
     */
    key_comp(): Comparator<Key>;
    /**
     * @inheritDoc
     */
    lower_bound(key: Key): TreeMultiMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    upper_bound(key: Key): TreeMultiMap.Iterator<Key, T>;
    protected _Handle_insert(first: TreeMultiMap.Iterator<Key, T>, last: TreeMultiMap.Iterator<Key, T>): void;
    protected _Handle_erase(first: TreeMultiMap.Iterator<Key, T>, last: TreeMultiMap.Iterator<Key, T>): void;
}
/**
 *
 */
export declare namespace TreeMultiMap {
    /**
     * Iterator of {@link TreeMultiMap}
     */
    type Iterator<Key, T> = MapElementList.Iterator<Key, T, false, TreeMultiMap<Key, T>>;
    /**
     * Iterator of {@link TreeMultiMap}
     */
    type ReverseIterator<Key, T> = MapElementList.ReverseIterator<Key, T, false, TreeMultiMap<Key, T>>;
    const Iterator: typeof MapElementList.Iterator;
    const ReverseIterator: typeof MapElementList.ReverseIterator;
}
//# sourceMappingURL=TreeMultiMap.d.ts.map