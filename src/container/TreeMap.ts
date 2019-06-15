//================================================================ 
/** @module std */
//================================================================
import { UniqueTreeMap } from "../base/container/UniqueTreeMap";
import { _Construct } from "../base/container/_ITreeContainer";

import { MapElementList } from "../base/container/MapElementList";
import { _UniqueMapTree } from "../base/tree/_UniqueMapTree";

import { IForwardIterator } from "../iterator/IForwardIterator";
import { IPair } from "../utility/IPair";
import { Entry } from "../utility/Entry";
import { Temporary } from "../base/Temporary";

/**
 * Unique-key Map based on Tree.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class TreeMap<Key, T>
    extends UniqueTreeMap<Key, T, 
        TreeMap<Key, T>, 
        TreeMap.Iterator<Key, T>, 
        TreeMap.ReverseIterator<Key, T>>
{
    /**
     * @hidden
     */
    private tree_!: _UniqueMapTree<Key, T, TreeMap<Key, T>>;

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
    public constructor(items: IPair<Key, T>[], comp?: (x: Key, y: Key) => boolean);

    /**
     * Copy Constructor.
     * 
     * @param obj Object to copy.
     */
    public constructor(obj: TreeMap<Key, T>);

    /**
     * Range Constructor.
     * 
     * @param first Input iterator of the first position.
     * @param last Input iterator of the last position.
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    public constructor
        (
            first: Readonly<IForwardIterator<IPair<Key, T>>>, 
            last: Readonly<IForwardIterator<IPair<Key, T>>>,
            comp?: (x: Key, y: Key) => boolean
        );
    
    public constructor(...args: any[])
    {
        // INITIALIZATION
        super(thisArg => new MapElementList(<Temporary>thisArg) as Temporary);
        
        // OVERLOADINGS
        _Construct<Key, Entry<Key, T>, 
                TreeMap<Key, T>,
                TreeMap.Iterator<Key, T>,
                TreeMap.ReverseIterator<Key, T>,
                IPair<Key, T>>
        (
            this, TreeMap, 
            comp => 
            {
                this.tree_ = new _UniqueMapTree(this as TreeMap<Key, T>, comp);
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
    public swap(obj: TreeMap<Key, T>): void
    {
        // SWAP CONTENTS
        [this.data_, obj.data_] = [obj.data_, this.data_];
        MapElementList._Swap_associative(this.data_ as Temporary, obj.data_ as Temporary);

        // SWAP RB-TREE
        _UniqueMapTree._Swap_source(this.tree_, obj.tree_);
        [this.tree_, obj.tree_] = [obj.tree_, this.tree_];
    }

    /**
     * @hidden
     */
    protected _Get_iterator_type(): typeof MapElementList.Iterator
    {
        return MapElementList.Iterator;
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
    public lower_bound(key: Key): TreeMap.Iterator<Key, T>
    {
        return this.tree_.lower_bound(key);
    }

    /**
     * @inheritDoc
     */
    public upper_bound(key: Key): TreeMap.Iterator<Key, T>
    {
        return this.tree_.upper_bound(key);
    }

    /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    protected _Handle_insert(first: TreeMap.Iterator<Key, T>, last: TreeMap.Iterator<Key, T>): void
    {
        for (; !first.equals(last); first = first.next())
            this.tree_.insert(first);
    }

    /**
     * @hidden
     */
    protected _Handle_erase(first: TreeMap.Iterator<Key, T>, last: TreeMap.Iterator<Key, T>): void
    {
        for (; !first.equals(last); first = first.next())
            this.tree_.erase(first);
    }
}

export namespace TreeMap
{
    //----
    // PASCAL NOTATION
    //----
    // HEAD
    export type Iterator<Key, T> = MapElementList.Iterator<Key, T, true, TreeMap<Key, T>>;
    export type ReverseIterator<Key, T> = MapElementList.ReverseIterator<Key, T, true, TreeMap<Key, T>>;

    // BODY
    export const Iterator = MapElementList.Iterator;
    export const ReverseIterator = MapElementList.ReverseIterator;

    //----
    // SNAKE NOTATION
    //----
    // HEAD
    export type iterator<Key, T> = Iterator<Key, T>;
    export type reverse_iterator<Key, T> = ReverseIterator<Key, T>;

    // BODY
    export const iterator = Iterator;
    export const reverse_iterator = ReverseIterator;
}
export import map = TreeMap;