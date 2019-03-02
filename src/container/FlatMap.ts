//================================================================ 
/** @module std */
//================================================================
import { Vector } from "./Vector";
import { Container } from "../base";
import { _ITreeContainer, _Construct, _Emplacable } from "../base/container/_ITreeContainer";

import { Iterator as _Iterator } from "../base/iterator/Iterator";
import { ReverseIterator as _ReverseIterator } from "../base/iterator/ReverseIterator";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IRandomAccessIterator } from "../iterator/IRandomAccessIterator";
import { _NativeArrayIterator } from "../base/iterator/_NativeArrayIterator";

import { IPair } from "../utility/IPair";
import { Pair } from "../utility/Pair";
import { Entry } from "../utility/Entry";

import { OutOfRange } from "../exception/LogicError";
import { lower_bound, upper_bound, equal_range } from "../algorithm/binary_search";

export class FlatMap<Key, T>
    extends Container<Entry<Key, T>, 
        FlatMap<Key, T>,
        FlatMap.Iterator<Key, T>, 
        FlatMap.ReverseIterator<Key, T>, 
        IPair<Key, T>>
    implements _ITreeContainer<Key, Entry<Key, T>,
        FlatMap<Key, T>,
        FlatMap.Iterator<Key, T>,
        FlatMap.ReverseIterator<Key, T>,
        IPair<Key, T>>
{
    /**
     * @hidden
     */
    private data_: Vector<Entry<Key, T>>;

    /**
     * @hidden
     */
    private key_comp_!: (x: Key, y: Key) => boolean;

    /**
     * @hidden
     */
    private key_eq_!: (x: Key, y: Key) => boolean;

    /**
     * @hidden
     */
    private value_comp_!: (x: IPair<Key, T>, y: IPair<Key, T>) => boolean;

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
    public constructor(items: IPair<Key, T>[], comp?: (x: Key, y: Key) => boolean);

    /**
     * Copy Constructor.
     * 
     * @param obj Object to copy.
     */
    public constructor(obj: FlatMap<Key, T>);

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
        super();
        
        this.data_ = new Vector();

        _Construct<Key, Entry<Key, T>,
            FlatMap<Key, T>,
            FlatMap.Iterator<Key, T>,
            FlatMap.ReverseIterator<Key, T>,
            IPair<Key, T>>
        (
            this, FlatMap,
            comp => 
            { 
                this.key_comp_ = comp;
                this.key_eq_ = (x, y) => !this.key_comp_(x, y) && !this.key_comp_(y, x);
                this.value_comp_ = (x, y) => this.key_comp_(x.first, y.first);
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
    public assign<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>
        (first: InputIterator, last: InputIterator): void
    {
        this.clear();
        this.insert(first, last);
    }

    /**
     * @inheritDoc
     */
    public clear(): void
    {
        this.data_.clear();
    }

    /* =========================================================
		ACCESSORS
			- ITERATORS
            - ELEMENTS
            - TREE
	============================================================
		ITERATOR
    --------------------------------------------------------- */
    public find(key: Key): FlatMap.Iterator<Key, T>
    {
        let it = this.lower_bound(key);
        if (!it.equals(this.end()) && this.key_eq_(key, it.first))
            return it;
        else
            return this.end();
    }

    /**
	 * @inheritDoc
	 */
    public begin(): FlatMap.Iterator<Key, T>
    {
        return this.nth(0);
    }

    /**
	 * @inheritDoc
	 */
    public end(): FlatMap.Iterator<Key, T>
    {
        return this.nth(this.size());
    }

    public nth(index: number): FlatMap.Iterator<Key, T>
    {
        return new FlatMap.Iterator(this, index);
    }
    
    /* ---------------------------------------------------------
		ELEMENTS
    --------------------------------------------------------- */
    /**
	 * @inheritDoc
	 */
    public size(): number
    {
        return this.data_.size();
    }

    /**
	 * @inheritDoc
	 */
    public has(key: Key): boolean
    {
        return !this.find(key).equals(this.end());
    }

    /**
	 * @inheritDoc
	 */
	public count(key: Key): number
	{
		return this.has(key) ? 1 : 0;
    }
    
    /**
	 * Get a value.
	 * 
	 * @param key Key to search for.
	 * @return The value mapped by the key.
	 */
	public get(key: Key): T
	{
		let it = this.find(key);
		if (it.equals(this.end()) === true)
			throw new OutOfRange("unable to find the matched key.");

		return it.second;
	}

	/**
	 * Set a value with key.
	 * 
	 * @param key Key to be mapped or search for.
	 * @param val Value to insert or assign.
	 */
	public set(key: Key, val: T): void
	{
		this.insert_or_assign(key, val);
	}

    /**
     * @internal
     */
    public _At(index: number): Entry<Key, T>
    {
        return this.data_.at(index);
    }

    /* ---------------------------------------------------------
		TREE
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public lower_bound(key: Key): FlatMap.Iterator<Key, T>
    {
        return lower_bound(this.begin(), this.end(), { first: key } as Entry<Key, T>, this.value_comp_);
    }

    /**
     * @inheritDoc
     */
    public upper_bound(key: Key): FlatMap.Iterator<Key, T>
    {
        return upper_bound(this.begin(), this.end(), { first: key } as Entry<Key, T>, this.value_comp_);
    }

    /**
     * @inheritDoc
     */
    public equal_range(key: Key): Pair<FlatMap.Iterator<Key, T>, FlatMap.Iterator<Key, T>>
    {
        return equal_range(this.begin(), this.end(), { first: key } as Entry<Key, T>, this.value_comp_);
    }

    /**
     * @inheritDoc
     */
    public key_comp(): (x: Key, y: Key) => boolean
    {
        return this.key_comp_;
    }

    /**
     * @inheritDoc
     */
    public value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean
    {
        return this.value_comp_;
    }

    /* =========================================================
		ELEMENTS I/O
			- INSERT
			- ERASE
			- UTILITY
	============================================================
		INSERT
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public push(...items: IPair<Key, T>[]): number
    {
        // INSERT BY RANGE
		let first = new _NativeArrayIterator(items, 0);
		let last = new _NativeArrayIterator(items, items.length);

		this.insert(first, last);

		// RETURN SIZE
		return this.size();
    }

    /**
     * @inheritDoc
     */
    public emplace(key: Key, value: T): Pair<FlatMap.Iterator<Key, T>, boolean>
    {
        // FIND DUPLICATED ITEM
        let it: FlatMap.Iterator<Key, T> = this.lower_bound(key);
        if (!it.equals(this.end()) && this.key_eq_(key, it.first))
            return new Pair(it, false);
        
        // INSERT NEW ONdE
        this.data_.insert(new Vector.Iterator(this.data_, it.index()), new Entry(key, value));
        return new Pair(it, true);
    }

    /**
     * @inheritDoc
     */
    public emplace_hint(hint: FlatMap.Iterator<Key, T>, key: Key, val: T): FlatMap.Iterator<Key, T>
    {
        let elem: Entry<Key, T> = new Entry(key, val);
        let validate: boolean = _Emplacable<Key, 
                Entry<Key, T>,
                FlatMap<Key, T>,
                FlatMap.Iterator<Key, T>,
                FlatMap.ReverseIterator<Key, T>,
                IPair<Key, T>>
            (this, hint, elem);

        if (validate)
        {
            this.data_.insert(new Vector.Iterator(this.data_, hint.index()), elem);
            return hint;
        }
        else
            return this.emplace(key, val).first;
    }

    public insert(pair: IPair<Key, T>): Pair<FlatMap.Iterator<Key, T>, boolean>;
	public insert(hint: FlatMap.Iterator<Key, T>, pair: IPair<Key, T>): FlatMap.Iterator<Key, T>;
	public insert<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>
        (first: InputIterator, last: InputIterator): void;
        
    public insert(...args: any[]): any
    {
        if (args.length === 1)
            return this.emplace(args[0].first, args[0].second);
        else if (args[0].next instanceof Function && args[1].next instanceof Function)
            return this._Insert_range(args[0], args[1]);
        else
            return this.emplace_hint(args[0], args[1].first, args[1].second);
    }

    /**
     * @hidden
     */
    private _Insert_range<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>
        (first: InputIterator, last: InputIterator): void
    {
        for (let it = first; !it.equals(last); it = it.next())
            this.emplace(it.value.first, it.value.second);
    }

    public insert_or_assign(key: Key, val: T): Pair<FlatMap.Iterator<Key, T>, boolean>
    public insert_or_assign(hint: FlatMap.Iterator<Key, T>, key: Key, val: T): FlatMap.Iterator<Key, T>;

    public insert_or_assign(...args: any[]): any
    {
        if (args.length === 2)
        {
            let ret: Pair<FlatMap.Iterator<Key, T>, boolean> = this.emplace(args[0], args[1]);
            if (ret.second === false)
                ret.first.second = args[1];

            return ret;
        }
        else
        {
            let ret: FlatMap.Iterator<Key, T> = this.emplace_hint(args[0], args[1], args[2]);
            if (ret.second !== args[2])
                ret.second = args[2];

            return ret;
        }
    }

    /* ---------------------------------------------------------
		ERASE
    --------------------------------------------------------- */
    public erase(key: Key): number;
    public erase(it: FlatMap.Iterator<Key, T>): FlatMap.Iterator<Key, T>;
    public erase(first: FlatMap.Iterator<Key, T>, last: FlatMap.Iterator<Key, T>): FlatMap.Iterator<Key, T>;

    public erase(...args: any[]): any
    {
        if (args.length === 1 && (args[0] instanceof FlatMap.Iterator === false || (args[0] as FlatMap.Iterator<Key, T>).source() as any !== this))
            return this._Erase_by_key(args[0]);
        else if (args.length === 1)
            return this._Erase_by_range(args[0], args[0].next());
        else
            return this._Erase_by_range(args[0], args[1]);
    }

    private _Erase_by_key(key: Key): number
    {
        let it = this.find(key);
        if (it.equals(this.end()))
            return 0;

        this.data_.erase(new Vector.Iterator(this.data_, it.index()));
        return 1;
    }

    private _Erase_by_range(first: FlatMap.Iterator<Key, T>, last: FlatMap.Iterator<Key, T>): FlatMap.Iterator<Key, T>
    {
        this.data_.erase
        (
            new Vector.Iterator(this.data_, first.index()),
            new Vector.Iterator(this.data_, last.index())
        );
        return first;
    }

    /* ---------------------------------------------------------
		UTILITY
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public swap(obj: FlatMap<Key, T>): void
    {
        [this.data_, obj.data_] = [obj.data_, this.data_];
        [this.key_comp_, obj.key_comp_] = [obj.key_comp_, this.key_comp_];
    }
}

export namespace FlatMap
{
    export class Iterator<Key, T>
        implements Readonly<_Iterator<Entry<Key, T>, 
                FlatMap<Key, T>, 
                Iterator<Key, T>,
                ReverseIterator<Key, T>,
                IPair<Key, T>>>,
            Readonly<IRandomAccessIterator<Entry<Key, T>, Iterator<Key, T>>>
    {
        /**
         * @hidden
         */
        private source_: FlatMap<Key, T>;

        /**
         * @hidden
         */
        private index_: number;

        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Initializer Constructor.
         * 
         * @param source Source container.
         * @param index Index number.
         */
        public constructor(source: FlatMap<Key, T>, index: number)
        {
            this.source_ = source;
            this.index_ = index;
        }

        /**
         * @inheritDoc
         */
        public reverse(): ReverseIterator<Key, T>
        {
            return new ReverseIterator(this);
        }

        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritDoc
         */
        public source(): FlatMap<Key, T>
        {
            return this.source_;
        }

        /**
         * @inheritDoc
         */
        public index(): number
        {
            return this.index_;
        }

        /**
         * @inheritDoc
         */
        public get value(): Entry<Key, T>
        {
            return this.source_._At(this.index_);
        }

        /**
         * Get the first, key element.
         * 
         * @return The first element.
         */
        public get first(): Key
        {
            return this.value.first;
        }

        /**
         * Get the second, stored element.
         * 
         * @return The second element.
         */
        public get second(): T
        {
            return this.value.second;
        }

        /**
         * Set the second, stored element.
         * 
         * @param val The value to set.
         */
        public set second(val: T)
        {
            this.value.second = val;
        }

        /**
         * @inheritDoc
         */
        public equals(obj: Iterator<Key, T>): boolean
        {
            return this.source_ === obj.source_ && this.index_ === obj.index_;
        }

        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritDoc
         */
        public prev(): Iterator<Key, T>
        {
            return this.advance(-1);
        }

        /**
         * @inheritDoc
         */
        public next(): Iterator<Key, T>
        {
            return this.advance(1);
        }

        /**
         * @inheritDoc
         */
        public advance(n: number): Iterator<Key, T>
        {
            return new Iterator(this.source_, this.index_ + n);
        }
    }

    export class ReverseIterator<Key, T>
        extends _ReverseIterator<Entry<Key, T>, 
            FlatMap<Key, T>, 
            Iterator<Key, T>,
            ReverseIterator<Key, T>,
            IPair<Key, T>>
    {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Initializer Constructor.
         * 
         * @param base The base iterator.
         */
        public constructor(base: Iterator<Key, T>)
        {
            super(base);
        }

        /**
         * @hidden
         */
        protected _Create_neighbor(base: Iterator<Key, T>): ReverseIterator<Key, T>
        {
            return new ReverseIterator(base);
        }

        /**
         * @inheritDoc
         */
        public advance(n: number): ReverseIterator<Key, T>
        {
            return this._Create_neighbor(this.base().advance(-n));
        }

        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritDoc
         */
        public index(): number
        {
            return this.base_.index();
        }

        /**
         * Get the first, key element.
         * 
         * @return The first element.
         */
        public get first(): Key
        {
            return this.base_.first;
        }

        /**
         * Get the second, stored element.
         * 
         * @return The second element.
         */
        public get second(): T
        {
            return this.base_.second;
        }

        /**
         * Set the second, stored element.
         * 
         * @param val The value to set.
         */
        public set second(val: T)
        {
            this.base_.second = val;
        }
    }
}