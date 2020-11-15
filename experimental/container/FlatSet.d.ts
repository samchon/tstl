/**
 * @packageDocumentation
 * @module std.experimental
 */
import { UniqueTreeSet } from "../../internal/container/associative/UniqueTreeSet";
import { SetElementVector } from "../../internal/container/associative/SetElementVector";
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Comparator } from "../../internal/functional/Comparator";
/**
 * Unique-key Set based on sorted array.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class FlatSet<Key> extends UniqueTreeSet<Key, FlatSet<Key>, FlatSet.Iterator<Key>, FlatSet.ReverseIterator<Key>> {
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
    constructor(items: Key[], comp?: Comparator<Key>);
    /**
     * Copy Constructor.
     *
     * @param obj Object to copy.
     */
    constructor(obj: FlatSet<Key>);
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
    swap(obj: FlatSet<Key>): void;
    /**
     * @inheritDoc
     */
    nth(index: number): FlatSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    key_comp(): Comparator<Key>;
    /**
     * @inheritDoc
     */
    lower_bound(key: Key): FlatSet.Iterator<Key>;
    /**
     * @inheritDoc
     */
    upper_bound(key: Key): FlatSet.Iterator<Key>;
    protected _Handle_insert({}: {}, {}: {}): void;
    protected _Handle_erase({}: {}, {}: {}): void;
}
/**
 *
 */
export declare namespace FlatSet {
    type Iterator<Key> = SetElementVector.Iterator<Key, true, FlatSet<Key>>;
    type ReverseIterator<Key> = SetElementVector.ReverseIterator<Key, true, FlatSet<Key>>;
    const Iterator: typeof SetElementVector.Iterator;
    const ReverseIterator: typeof SetElementVector.ReverseIterator;
    const __MODULE = "experimental";
}
//# sourceMappingURL=FlatSet.d.ts.map