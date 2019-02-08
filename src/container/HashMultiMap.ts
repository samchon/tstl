//================================================================ 
/** @module std */
//================================================================
import { MultiMap } from "../base/container/MultiMap";
import { IHashMap } from "../base/container/IHashMap";
import { _Construct } from "../base/container/_IHashContainer";

import { _MapHashBuckets } from "../base/hash/_MapHashBuckets";
import { MapIterator, MapReverseIterator } from "../base/iterator/MapIterator";
import { Entry } from "../utility/Entry";

import { IForwardIterator } from "../iterator/IForwardIterator";
import { _NativeArrayIterator } from "../base/iterator/_NativeArrayIterator";
import { IPair } from "../utility/IPair";

/**
 * Multiple-key Map based on Hash buckets.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class HashMultiMap<Key, T>
    extends MultiMap<Key, T, HashMultiMap<Key, T>>
    implements IHashMap<Key, T, false, HashMultiMap<Key, T>>
{
    /**
     * @hidden
     */
    private buckets_!: _MapHashBuckets<Key, T, false, HashMultiMap<Key, T>>;

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
     * @param hash An unary function returns hash code. Default is {hash}.
     * @param equal A binary function predicates two arguments are equal. Default is {@link equal_to}.
     */
    public constructor(hash?: (key: Key) => number, equal?: (x: Key, y: Key) => boolean);
    
    /**
     * Initializer Constructor.
     * 
     * @param items Items to assign.
     * @param hash An unary function returns hash code. Default is {hash}.
     * @param equal A binary function predicates two arguments are equal. Default is {@link equal_to}.
     */
    public constructor(items: IPair<Key, T>[], hash?: (key: Key) => number, equal?: (x: Key, y: Key) => boolean);
    
    /**
     * Copy Constructor.
     * 
     * @param obj Object to copy. 
     */
    public constructor(obj: HashMultiMap<Key, T>);
    
    /**
     * Range Constructor.
     * 
     * @param first Input iterator of the first position.
     * @param last Input iterator of the last position.
     * @param hash An unary function returns hash code. Default is {hash}.
     * @param equal A binary function predicates two arguments are equal. Default is {@link equal_to}.
     */
    public constructor
    (
        first: Readonly<IForwardIterator<IPair<Key, T>>>, 
        last: Readonly<IForwardIterator<IPair<Key, T>>>, 
        hash?: (key: Key) => number, equal?: (x: Key, y: Key) => boolean
    );

    public constructor(...args: any[])
    {
        super();

        _Construct<Key, Entry<Key, T>, 
                HashMultiMap<Key, T>,
                HashMultiMap.Iterator<Key, T>,
                HashMultiMap.ReverseIterator<Key, T>,
                IPair<Key, T>>
        (
            this, HashMultiMap, 
            (hash, pred) =>
            {
                this.buckets_ = new _MapHashBuckets(this, hash, pred);
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
        this.buckets_.clear();

        super.clear();
    }

    /**
     * @inheritDoc
     */
    public swap(obj: HashMultiMap<Key, T>): void
    {
        // SWAP CONTENTS
        super.swap(obj);

        // SWAP BUCKETS
        _MapHashBuckets._Swap_source(this.buckets_, obj.buckets_);
        [this.buckets_, obj.buckets_] = [obj.buckets_, this.buckets_];
    }

    /* =========================================================
        ACCESSORS
            - MEMBER
            - HASH
    ============================================================
        MEMBER
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public find(key: Key): HashMultiMap.Iterator<Key, T>
    {
        return this.buckets_.find(key);
    }

    /**
     * @inheritDoc
     */
    public count(key: Key): number
    {
        // FIND MATCHED BUCKET
        let index = this.bucket(key);
        let bucket = this.buckets_.at(index);

        // ITERATE THE BUCKET
        let cnt: number = 0;
        for (let it of bucket)
            if (this.buckets_.key_eq()(it.first, key))
                ++cnt;

        return cnt;
    }

    /**
     * @inheritDoc
     */
    public begin(): HashMultiMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    public begin(index: number): HashMultiMap.Iterator<Key, T>;
    public begin(index: number | null = null): HashMultiMap.Iterator<Key, T>
    {
        if (index === null)
            return super.begin();
        else
            return this.buckets_.at(index)[0];
    }

    /**
     * @inheritDoc
     */
    public end(): HashMultiMap.Iterator<Key, T>;
    /**
     * @inheritDoc
     */
    public end(index: number): HashMultiMap.Iterator<Key, T>
    public end(index: number | null = null): HashMultiMap.Iterator<Key, T>
    {
        if (index === null)
            return super.end();
        else
        {
            let bucket = this.buckets_.at(index);
            return bucket[bucket.length - 1].next();
        }
    }

    /**
     * @inheritDoc
     */
    public rbegin(): HashMultiMap.ReverseIterator<Key, T>;
    /**
     * @inheritDoc
     */
    public rbegin(index: number): HashMultiMap.ReverseIterator<Key, T>;
    public rbegin(index: number | null = null): HashMultiMap.ReverseIterator<Key, T>
    {
        return this.end(index!).reverse();
    }

    /**
     * @inheritDoc
     */
    public rend(): HashMultiMap.ReverseIterator<Key, T>;
    /**
     * @inheritDoc
     */
    public rend(index: number): HashMultiMap.ReverseIterator<Key, T>;
    public rend(index: number | null = null): HashMultiMap.ReverseIterator<Key, T>
    {
        return this.begin(index!).reverse();
    }

    /* ---------------------------------------------------------
        HASH
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public bucket_count(): number
    {
        return this.buckets_.size();
    }

    /**
     * @inheritDoc
     */
    public bucket_size(index: number): number
    {
        return this.buckets_.at(index).length;
    }

    /**
     * @inheritDoc
     */
    public load_factor(): number
    {
        return this.buckets_.load_factor();
    }

    /**
     * @inheritDoc
     */
    public hash_function(): (key: Key) => number
    {
        return this.buckets_.hash_function();
    }

    /**
     * @inheritDoc
     */
    public key_eq(): (x: Key, y: Key) => boolean
    {
        return this.buckets_.key_eq();
    }

    /**
     * @inheritDoc
     */
    public bucket(key: Key): number
    {
        return this.hash_function()(key) % this.buckets_.size();
    }

    /**
     * @inheritDoc
     */
    public max_load_factor(): number;
    /**
     * @inheritDoc
     */
    public max_load_factor(z: number): void;
    public max_load_factor(z: number | null = null): any
    {
        return this.buckets_.max_load_factor(z!);
    }

    /**
     * @inheritDoc
     */
    public reserve(n: number): void
    {
        this.buckets_.reserve(n);
    }

    /**
     * @inheritDoc
     */
    public rehash(n: number): void
    {
        if (n <= this.bucket_count())
            return;

        this.buckets_.rehash(n);
    }

    /**
     * @hidden
     */
    protected _Key_eq(x: Key, y: Key): boolean
    {
        return this.key_eq()(x, y);
    }

    /* =========================================================
        ELEMENTS I/O
            - INSERT
            - POST-PROCESS
    ============================================================
        INSERT
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public emplace(key: Key, val: T): HashMultiMap.Iterator<Key, T>
    {
        // INSERT
        let it = this.data_.insert(this.data_.end(), new Entry(key, val));

        this._Handle_insert(it, it.next()); // POST-PROCESS
        return it;
    }

    /**
     * @inheritDoc
     */
    public emplace_hint(hint: HashMultiMap.Iterator<Key, T>, key: Key, val: T): HashMultiMap.Iterator<Key, T>
    {
        // INSERT
        let it = this.data_.insert(hint, new Entry(key, val));

        // POST-PROCESS
        this._Handle_insert(it, it.next());

        return it;
    }

    /**
     * @hidden
     */
    protected _Insert_by_range<L extends Key, U extends T, InputIterator extends Readonly<IForwardIterator<IPair<L, U>, InputIterator>>>
        (first: InputIterator, last: InputIterator): void
    {
        //--------
        // INSERTIONS
        //--------
        // PRELIMINARIES
        let entries: Array<Entry<Key, T>> = [];
        for (let it = first; !it.equals(last); it = it.next())
            entries.push(new Entry(it.value.first, it.value.second));
        
        // INSERT ELEMENTS
        let my_first = this.data_.insert
            (
                this.data_.end(), 
                new _NativeArrayIterator(entries, 0), 
                new _NativeArrayIterator(entries, entries.length)
            );

        //--------
        // HASHING INSERTED ITEMS
        //--------
        // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
        if (this.size() > this.buckets_.capacity())
            this.reserve(Math.max(this.size(), this.buckets_.capacity() * 2));
        
        // POST-PROCESS
        this._Handle_insert(my_first, this.end());
    }

    /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    protected _Handle_insert(first: HashMultiMap.Iterator<Key, T>, last: HashMultiMap.Iterator<Key, T>): void
    {
        for (; !first.equals(last); first = first.next())
            this.buckets_.insert(first);
    }

    /**
     * @hidden
     */
    protected _Handle_erase(first: HashMultiMap.Iterator<Key, T>, last: HashMultiMap.Iterator<Key, T>): void
    {
        for (; !first.equals(last); first = first.next())
            this.buckets_.erase(first);
    }
}

export namespace HashMultiMap
{
    //----
    // PASCAL NOTATION
    //----
    // HEAD
    export type Iterator<Key, T> = MapIterator<Key, T, false, HashMultiMap<Key, T>>;
    export type ReverseIterator<Key, T> = MapReverseIterator<Key, T, false, HashMultiMap<Key, T>>;

    // BODY
    export const Iterator = MapIterator;
    export const ReverseIterator = MapReverseIterator;

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
export import unordered_multimap = HashMultiMap;