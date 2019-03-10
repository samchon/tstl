//================================================================ 
/** @module std */
//================================================================
import { UniqueTreeSet } from "../base/container/UniqueTreeSet";
import { _Construct, _Emplacable } from "../base/container/_ITreeContainer";

import { IForwardIterator } from "../iterator/IForwardIterator";
import { SetElementList } from "../base/container/_SetElementList";
import { _UniqueSetTree } from "../base/tree/_UniqueSetTree";

import { Temporary } from "../base/Temporary";

/**
 * Unique-key Set based on Tree.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class TreeSet<Key>
    extends UniqueTreeSet<Key, 
        TreeSet<Key>,
        TreeSet.Iterator<Key>,
        TreeSet.ReverseIterator<Key>>
{
    /**
     * @hidden
     */
    private tree_!: _UniqueSetTree<Key, TreeSet<Key>>;

    /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     * 
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    public constructor(comp?: (x: Key, y: Key) => boolean);

    /**
     * Initializer Constructor.
     * 
     * @param items Items to assign.
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    public constructor(items: Key[], comp?: (x: Key, y: Key) => boolean);

    /**
     * Copy Constructor.
     * 
     * @param obj Object to copy.
     */
    public constructor(container: TreeSet<Key>);

    /**
     * Range Constructor.
     * 
     * @param first Input iterator of the first position.
     * @param last Input iterator of the last position.
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    public constructor
    (
        first: Readonly<IForwardIterator<Key>>, 
        last: Readonly<IForwardIterator<Key>>, 
        comp?: (x: Key, y: Key) => boolean
    );

    public constructor(...args: any[])
    {
        super(thisArg => new SetElementList(<Temporary>thisArg) as Temporary);

        _Construct<Key, Key, 
                TreeSet<Key>,
                TreeSet.Iterator<Key>,
                TreeSet.ReverseIterator<Key>,
                Key>
        (
            this, TreeSet, 
            comp => 
            {
                this.tree_ = new _UniqueSetTree(this as TreeSet<Key>, comp);
            },
            ...args
        );
    }

    /**
     * @inheritDoc
     */
    public clear(): void
    {
        super.clear();

        this.tree_.clear();
    }

    /**
     * @inheritDoc
     */
    public swap(obj: TreeSet<Key>): void
    {
        // SWAP CONTENTS
        [this.data_, obj.data_] = [obj.data_, this.data_];
        SetElementList._Swap_associative(this.data_ as Temporary, obj.data_ as Temporary);

        // SWAP RB-TREE
        _UniqueSetTree._Swap_source(this.tree_, obj.tree_);
        [this.tree_, obj.tree_] = [obj.tree_, this.tree_];
    }

    /**
     * @hidden
     */
    protected _Get_iterator_type(): typeof SetElementList.Iterator
    {
        return SetElementList.Iterator;
    }
    
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public key_comp(): (x: Key, y: Key) => boolean
    {
        return this.tree_.key_comp();
    }

    /**
     * @inheritDoc
     */
    public lower_bound(key: Key): TreeSet.Iterator<Key>
    {
        return this.tree_.lower_bound(key);
    }

    /**
     * @inheritDoc
     */
    public upper_bound(key: Key): TreeSet.Iterator<Key>
    {
        return this.tree_.upper_bound(key);
    }

    /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    protected _Handle_insert(first: TreeSet.Iterator<Key>, last: TreeSet.Iterator<Key>): void
    {
        for (; !first.equals(last); first = first.next())
            this.tree_.insert(first);
    }

    /**
     * @hidden
     */
    protected _Handle_erase(first: TreeSet.Iterator<Key>, last: TreeSet.Iterator<Key>): void
    {
        for (; !first.equals(last); first = first.next())
            this.tree_.erase(first);
    }
}

export namespace TreeSet
{
    //----
    // PASCAL NOTATION
    //----
    // HEAD
    export type Iterator<Key> = SetElementList.Iterator<Key, true, TreeSet<Key>>;
    export type ReverseIterator<Key> = SetElementList.ReverseIterator<Key, true, TreeSet<Key>>;

    // BODY
    export const Iterator = SetElementList.Iterator;
    export const ReverseIterator = SetElementList.ReverseIterator;

    //----
    // SNAKE NOTATION
    //----
    // HEAD
    export type iterator<Key> = Iterator<Key>;
    export type reverse_iterator<Key> = ReverseIterator<Key>;

    // BODY
    export const iterator = Iterator;
    export const reverse_iterator = ReverseIterator;
}
export import set = TreeSet;