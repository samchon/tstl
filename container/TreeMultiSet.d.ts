/**
 * @packageDocumentation
 * @module std
 */
import { MultiTreeSet } from "../internal/container/associative/MultiTreeSet";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { SetElementList } from "../internal/container/associative/SetElementList";
import { Comparator } from "../internal/functional/Comparator";
/**
 * Multiple-key Set based on Tree.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class TreeMultiSet<Key> extends MultiTreeSet<Key, TreeMultiSet<Key>, TreeMultiSet.Iterator<Key>, TreeMultiSet.ReverseIterator<Key>> {
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
    constructor(items: Key[], comp?: Comparator<Key>);
    /**
     * Copy Constructor.
     *
     * @param obj Object to copy.
     */
    constructor(obj: TreeMultiSet<Key>);
    /**
     * Range Constructor.
     *
     * @param first Input iterator of the first position.
     * @param last Input iterator of the last position.
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    constructor(first: Readonly<IForwardIterator<Key>>, last: Readonly<IForwardIterator<Key>>, comp?: Comparator<Key>);
    /**
     * @inheritDoc
     */
    clear(): void;
    /**
     * @inheritDoc
     */
    swap(obj: TreeMultiSet<Key>): void;
    /**
     * @inheritDoc
     */
    key_comp(): Comparator<Key>;
    /**
     * @inheritDoc
     */
    lower_bound(key: Key): TreeMultiSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    upper_bound(key: Key): TreeMultiSet.Iterator<Key>;
    protected _Handle_insert(first: TreeMultiSet.Iterator<Key>, last: TreeMultiSet.Iterator<Key>): void;
    protected _Handle_erase(first: TreeMultiSet.Iterator<Key>, last: TreeMultiSet.Iterator<Key>): void;
}
/**
 *
 */
export declare namespace TreeMultiSet {
    /**
     * Iterator of {@link TreeMultiSet}
     */
    type Iterator<Key> = SetElementList.Iterator<Key, false, TreeMultiSet<Key>>;
    /**
     * Reverse iterator of {@link TreeMultiSet}
     */
    type ReverseIterator<Key> = SetElementList.ReverseIterator<Key, false, TreeMultiSet<Key>>;
    const Iterator: typeof SetElementList.Iterator;
    const ReverseIterator: typeof SetElementList.ReverseIterator;
}
//# sourceMappingURL=TreeMultiSet.d.ts.map