//================================================================ 
/** @module std */
//================================================================
import { UniqueSet } from "../base/container/UniqueSet";
import { ITreeSet } from "../base/container/ITreeSet";
import { _Construct, _Emplace_hint } from "../base/container/_ITreeContainer";

import { _UniqueSetTree } from "../base/tree/_UniqueSetTree";
import { SetIterator, SetReverseIterator } from "../base/iterator/SetIterator";

import { IForwardIterator } from "../iterator/IForwardIterator";
import { Pair } from "../utility/Pair";

/**
 * Unique-key Set based on Tree.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class TreeSet<Key>
    extends UniqueSet<Key, TreeSet<Key>>
    implements ITreeSet<Key, true, TreeSet<Key>>
{
    /**
     * @hidden
     */
    private tree_!: _UniqueSetTree<Key, TreeSet<Key>>;

    /* =========================================================
        CONSTRUCTORS & SEMI-CONSTRUCTORS
            - CONSTRUCTORS
            - ASSIGN & CLEAR
    ============================================================
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
        super();

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

    /* ---------------------------------------------------------
        ASSIGN & CLEAR
    --------------------------------------------------------- */
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
        super.swap(obj);

        // SWAP RB-TREE
        _UniqueSetTree._Swap_source(this.tree_, obj.tree_);
        [this.tree_, obj.tree_] = [obj.tree_, this.tree_];
    }
    
    /* =========================================================
        ACCESSORS
    ========================================================= */
    /**
     * @inheritDoc
     */
    public find(key: Key): TreeSet.Iterator<Key>
    {
        let node = this.tree_.nearest_by_key(key);

        if (node === null || this.tree_.key_eq()(node.value.value, key) === false)
            return this.end();
        else
            return node.value;
    }
    
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
    public value_comp(): (x: Key, y: Key) => boolean
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

    /**
     * @inheritDoc
     */
    public equal_range(key: Key): Pair<TreeSet.Iterator<Key>, TreeSet.Iterator<Key>>
    {
        return this.tree_.equal_range(key);
    }

    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - POST-PROCESS
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    protected _Insert_by_key(key: Key): Pair<TreeSet.Iterator<Key>, boolean>
    {
        // FIND POSITION TO INSERT
        let it: TreeSet.Iterator<Key> = this.lower_bound(key);
        if (!it.equals(this.end()) && this.tree_.key_eq()(it.value, key))
            return new Pair(it, false);

        // ITERATOR TO RETURN
        it = this.data_.insert(it, key);
        this._Handle_insert(it, it.next()); // POST-PROCESS

        return new Pair(it, true);
    }

    /**
     * @hidden
     */
    protected _Insert_by_hint(hint: TreeSet.Iterator<Key>, key: Key): TreeSet.Iterator<Key>
    {
        return _Emplace_hint<Key, Key, 
                TreeSet<Key>,
                TreeSet.Iterator<Key>,
                TreeSet.ReverseIterator<Key>,
                Key>
        (
            this, hint, key, this.data_, this._Handle_insert.bind(this),
            () => this._Insert_by_key(key).first
        );
    }

    /**
     * @hidden
     */
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>
        (first: InputIterator, last: InputIterator): void
    {
        for (; !first.equals(last); first = first.next())
            this._Insert_by_key(first.value);
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
    export type Iterator<Key> = SetIterator<Key, true, TreeSet<Key>>;
    export type ReverseIterator<Key> = SetReverseIterator<Key, true, TreeSet<Key>>;

    // BODY
    export const Iterator = SetIterator;
    export const ReverseIterator = SetReverseIterator;

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