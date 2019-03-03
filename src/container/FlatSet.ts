import { Container } from "../base/container/Container";
import { _ITreeContainer, _Construct, _Emplacable } from "../base/container/_ITreeContainer";

import { Iterator as _Iterator } from "../base/iterator/Iterator";
import { ReverseIterator as _ReverseIterator } from "../base/iterator/ReverseIterator";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IRandomAccessIterator } from "../iterator/IRandomAccessIterator";
import { _NativeArrayIterator } from "../base/iterator/_NativeArrayIterator";

import { Vector } from "./Vector";
import { Pair } from "../utility/Pair";
import { sort } from "../algorithm/sorting";
import { lower_bound, upper_bound, equal_range } from "../algorithm/binary_search";

export class FlatSet<Key>
    extends Container<Key, FlatSet<Key>, FlatSet.Iterator<Key>, FlatSet.ReverseIterator<Key>, Key>
    implements _ITreeContainer<Key, Key, FlatSet<Key>, FlatSet.Iterator<Key>, FlatSet.ReverseIterator<Key>, Key>
{
    /**
     * @hidden
     */
    private data_: Vector<Key>;

    /**
     * @hidden
     */
    private key_comp_!: (x: Key, y: Key) => boolean;

    /**
     * @hidden
     */
    private key_eq_!: (x: Key, y: Key) => boolean;

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
    public constructor(obj: FlatSet<Key>);

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
        
        this.data_ = new Vector();

        _Construct<Key, Key,
            FlatSet<Key>,
            FlatSet.Iterator<Key>,
            FlatSet.ReverseIterator<Key>,
            Key>
        (
            this, FlatSet,
            comp => 
            { 
                this.key_comp_ = comp;
                this.key_eq_ = (x, y) => !this.key_comp_(x, y) && !this.key_comp_(y, x);
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
    public assign<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>
        (first: InputIterator, last: InputIterator): void
    {
        this.clear();
        this._Assign(first, last);
    }

    /**
     * @inheritDoc
     */
    public clear(): void
    {
        this.data_.clear();
    }

    /**
     * @hidden
     */
    private _Assign<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>
        (first: InputIterator, last: InputIterator): void
    {
        // INSERT FIRST
        this.data_.insert(this.data_.end(), first, last);

        // SORT LATER
        sort(this.data_.begin(), this.data_.end(), this.key_comp_);
    }

    /* =========================================================
		ACCESSORS
			- ITERATORS
            - ELEMENTS
            - TREE
	============================================================
		ITERATOR
    --------------------------------------------------------- */
    public find(key: Key): FlatSet.Iterator<Key>
    {
        let it = this.lower_bound(key);
        if (!it.equals(this.end()) && this.key_eq_(key, it.value))
            return it;
        else
            return this.end();
    }

    /**
	 * @inheritDoc
	 */
    public begin(): FlatSet.Iterator<Key>
    {
        return this.nth(0);
    }

    /**
	 * @inheritDoc
	 */
    public end(): FlatSet.Iterator<Key>
    {
        return this.nth(this.size());
    }

    public nth(index: number): FlatSet.Iterator<Key>
    {
        return new FlatSet.Iterator(this, index);
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
     * @internal
     */
    public _At(index: number): Key
    {
        return this.data_.at(index);
    }

    /* ---------------------------------------------------------
		TREE
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public lower_bound(key: Key): FlatSet.Iterator<Key>
    {
        return lower_bound(this.begin(), this.end(), key, this.key_comp_);
    }

    /**
     * @inheritDoc
     */
    public upper_bound(key: Key): FlatSet.Iterator<Key>
    {
        return upper_bound(this.begin(), this.end(), key, this.key_comp_);
    }

    /**
     * @inheritDoc
     */
    public equal_range(key: Key): Pair<FlatSet.Iterator<Key>, FlatSet.Iterator<Key>>
    {
        return equal_range(this.begin(), this.end(), key, this.key_comp_);
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
    public value_comp(): (x: Key, y: Key) => boolean
    {
        return this.key_comp_;
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
    public push(...items: Key[]): number
    {
        // INSERT BY RANGE
		let first = new _NativeArrayIterator(items, 0);
		let last = new _NativeArrayIterator(items, items.length);

		this.insert(first, last);

		// RETURN SIZE
		return this.size();
    }

    public insert(key: Key): Pair<FlatSet.Iterator<Key>, boolean>;
	public insert(hint: FlatSet.Iterator<Key>, key: Key): FlatSet.Iterator<Key>;
	public insert<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>
        (first: InputIterator, last: InputIterator): void;
        
    public insert(...args: any[]): any
    {
        if (args.length === 1)
            return this._Insert_by_key(args[0]);
        else if (args[0].next instanceof Function && args[1].next instanceof Function)
            return this._Insert_range(args[0], args[1]);
        else
            return this._Insert_by_hint(args[0], args[1]);
    }

    /**
     * @hidden
     */
    private _Insert_by_key(key: Key): Pair<FlatSet.Iterator<Key>, boolean>
    {
        // FIND DUPLICATED ITEM
        let it: FlatSet.Iterator<Key> = this.lower_bound(key);
        if (!it.equals(this.end()) && this.key_eq_(key, it.value))
            return new Pair(it, false);
        
        // INSERT NEW ONdE
        this.data_.insert(new Vector.Iterator(this.data_, it.index()), key);
        return new Pair(it, true);
    }

    /**
     * @hidden
     */
    private _Insert_by_hint(hint: FlatSet.Iterator<Key>, key: Key): FlatSet.Iterator<Key>
    {
        let validate: boolean = _Emplacable<Key, Key,
                FlatSet<Key>,
                FlatSet.Iterator<Key>,
                FlatSet.ReverseIterator<Key>,
                Key>
            (this, hint, key);

        if (validate)
        {
            this.data_.insert(new Vector.Iterator(this.data_, hint.index()), key);
            return hint;
        }
        else
            return this._Insert_by_key(key).first;
    }

    /**
     * @hidden
     */
    private _Insert_range<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>
        (first: InputIterator, last: InputIterator): void
    {
        if (this.empty())
            this._Assign(first, last);
        else
            for (let it = first; !it.equals(last); it = it.next())
                this._Insert_by_key(it.value);
    }

    /* ---------------------------------------------------------
		ERASE
    --------------------------------------------------------- */
    public erase(key: Key): number;
    public erase(it: FlatSet.Iterator<Key>): FlatSet.Iterator<Key>;
    public erase(first: FlatSet.Iterator<Key>, last: FlatSet.Iterator<Key>): FlatSet.Iterator<Key>;

    public erase(...args: any[]): any
    {
        if (args.length === 1 && (args[0] instanceof FlatSet.Iterator === false || (args[0] as FlatSet.Iterator<Key>).source() as any !== this))
            return this._Erase_by_key(args[0]);
        else if (args.length === 1)
            return this._Erase_by_range(args[0], args[0].next());
        else
            return this._Erase_by_range(args[0], args[1]);
    }

    /**
     * @hidden
     */
    private _Erase_by_key(key: Key): number
    {
        let it = this.find(key);
        if (it.equals(this.end()))
            return 0;

        this.data_.erase(new Vector.Iterator(this.data_, it.index()));
        return 1;
    }

    /**
     * @hidden
     */
    private _Erase_by_range(first: FlatSet.Iterator<Key>, last: FlatSet.Iterator<Key>): FlatSet.Iterator<Key>
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
    public swap(obj: FlatSet<Key>): void
    {
        [this.data_, obj.data_] = [obj.data_, this.data_];
        [this.key_comp_, obj.key_comp_] = [obj.key_comp_, this.key_comp_];
    }

    /**
     * @inheritDoc
     */
    public toJSON(): Array<Key>
    {
        return this.data_.toJSON();
    }
}

export namespace FlatSet
{
    export class Iterator<Key>
        implements Readonly<_Iterator<Key, FlatSet<Key>, FlatSet.Iterator<Key>, FlatSet.ReverseIterator<Key>, Key>>,
            Readonly<IRandomAccessIterator<Key, Iterator<Key>>>
    {
        /**
         * @hidden
         */
        private source_: FlatSet<Key>;

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
        public constructor(source: FlatSet<Key>, index: number)
        {
            this.source_ = source;
            this.index_ = index;
        }

        /**
         * @inheritDoc
         */
        public reverse(): ReverseIterator<Key>
        {
            return new ReverseIterator(this);
        }

        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritDoc
         */
        public source(): FlatSet<Key>
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
        public get value(): Key
        {
            return this.source_._At(this.index_);
        }

        /**
         * @inheritDoc
         */
        public equals(obj: Iterator<Key>): boolean
        {
            return this.source_ === obj.source_ && this.index_ === obj.index_;
        }

        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritDoc
         */
        public prev(): Iterator<Key>
        {
            return this.advance(-1);
        }

        /**
         * @inheritDoc
         */
        public next(): Iterator<Key>
        {
            return this.advance(1);
        }

        /**
         * @inheritDoc
         */
        public advance(n: number): Iterator<Key>
        {
            return new Iterator(this.source_, this.index_ + n);
        }
    }

    export class ReverseIterator<Key>
        extends _ReverseIterator<Key, FlatSet<Key>, FlatSet.Iterator<Key>, FlatSet.ReverseIterator<Key>, Key>
        implements Readonly<IRandomAccessIterator<Key, ReverseIterator<Key>>>
    {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Initializer Constructor.
         * 
         * @param base The base iterator.
         */
        public constructor(base: Iterator<Key>)
        {
            super(base);
        }

        /**
         * @hidden
         */
        protected _Create_neighbor(base: Iterator<Key>): ReverseIterator<Key>
        {
            return new ReverseIterator(base);
        }

        /**
         * @inheritDoc
         */
        public advance(n: number): ReverseIterator<Key>
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
    }
}