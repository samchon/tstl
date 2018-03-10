import { UniqueSet } from "../base/containers/UniqueSet";
import { IHashSet } from "../base/interfaces/IHashSet";

import { _SetHashBuckets } from "../base/hashes/_SetHashBuckets";
import { SetIterator, SetReverseIterator } from "../base/iterators/SetIterator";

import { IForwardIterator } from "../iterators/IForwardIterator";
import { Pair } from "../utilities/Pair";
import { hash } from "../functional/hash";
import { equal_to } from "../functional/comparisons";

export class HashSet<T>
	extends UniqueSet<T, HashSet<T>>
	implements IHashSet<T, HashSet<T>>
{
	/**
	 * @hidden
	 */
	private buckets_: _SetHashBuckets<T, HashSet<T>>;

	/* =========================================================
		CONSTRUCTORS & SEMI-CONSTRUCTORS
			- CONSTRUCTORS
			- ASSIGN & CLEAR
	============================================================
		CONSTURCTORS
	--------------------------------------------------------- */
	public constructor();
	public constructor(hash: (val: T) => number);
	public constructor(hash: (val: T) => number, equal: (x: T, y: T) => boolean);

	public constructor(items: T[]);
	public constructor(items: T[], hash: (val: T) => number);
	public constructor(items: T[], hash: (val: T) => number, equal: (x: T, y: T) => boolean);

	public constructor(container: HashSet<T>);
	public constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>);
	public constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>, hash: (val: T) => number);
	public constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>, hash: (val: T) => number, equal: (x: T, y: T) => boolean);

	public constructor(...args: any[])
	{
		super();

		// DECLARE MEMBERS
		let hash_function: (val: T) => number = hash;
		let key_eq: (x: T, y: T) => boolean = equal_to;
		let post_process: () => void = null;

		//----
		// INITIALIZE MEMBERS AND POST-PROCESS
		//----
		// BRANCH - METHOD OVERLOADINGS
		if (args.length == 1 && args[0] instanceof HashSet)
		{
			// PARAMETERS
			let container: HashSet<T> = args[0];
			hash_function = container.hash_function();
			key_eq = container.key_eq();

			// COPY CONSTRUCTOR
			post_process = () =>
			{
				let first = container.begin();
				let last = container.end();

				this.assign(first, last);
			};
		}
		else if (args.length >= 1 && args[0] instanceof Array)
		{
			// FUNCTION TEMPLATES
			if (args.length >= 2)	hash_function = args[1];
			if (args.length == 3)	key_eq = args[2];

			// INITIALIZER LIST CONSTRUCTOR
			post_process = () =>
			{
				let items: T[] = args[0];

				this.reserve(items.length);
				this.push(...items);
			};
		}
		else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
		{
			// FUNCTION TEMPLATES
			if (args.length >= 3)	hash_function = args[2];
			if (args.length == 4)	key_eq = args[3];

			// RANGE CONSTRUCTOR
			post_process = () =>
			{
				let first: Readonly<IForwardIterator<T>> = args[0];
				let last: Readonly<IForwardIterator<T>> = args[1];

				this.assign(first, last);
			};
		}
		else
		{
			// FUNCTION TEMPLATES
			if (args.length >= 1)	hash_function = args[0];
			if (args.length == 2)	key_eq = args[1];
		}

		//----
		// DO PROCESS
		//----
		// CONSTRUCT BUCKET
		this.buckets_ = new _SetHashBuckets(this, hash_function, key_eq);

		// ACT POST-PROCESS
		if (post_process != null)
			post_process();
	}

	/* ---------------------------------------------------------
		ASSIGN & CLEAR
	--------------------------------------------------------- */
	public clear(): void
	{
		this.buckets_.clear();

		super.clear();
	}

	public swap(obj: HashSet<T>): void
	{
		// SWAP CONTENTS
		super.swap(obj);

		// SWAP BUCKETS
		[this.buckets_["source_"], obj.buckets_["source_"]] = [obj.buckets_["source_"], this.buckets_["source_"]];
		[this.buckets_, obj.buckets_] = [obj.buckets_, this.buckets_];
	}

	/* =========================================================
		ACCESSORS
			- MEMBER
			- HASH
	============================================================
		MEMBER
	--------------------------------------------------------- */
	public find(key: T): HashSet.Iterator<T>
	{
		return this.buckets_.find(key);
	}

	public begin(): HashSet.Iterator<T>;
	public begin(index: number): HashSet.Iterator<T>;
	public begin(index: number = null): HashSet.Iterator<T>
	{
		if (index == null)
			return super.begin();
		else
			return this.buckets_.at(index)[0];
	}

	public end(): HashSet.Iterator<T>;
	public end(index: number): HashSet.Iterator<T>
	public end(index: number = null): HashSet.Iterator<T>
	{
		if (index == null)
			return super.end();
		else
		{
			let bucket = this.buckets_.at(index);
			return bucket[bucket.length - 1].next();
		}
	}

	public rbegin(): HashSet.ReverseIterator<T>;
	public rbegin(index: number): HashSet.ReverseIterator<T>;
	public rbegin(index: number = null): HashSet.ReverseIterator<T>
	{
		return this.end(index).reverse();
	}

	public rend(): HashSet.ReverseIterator<T>;
	public rend(index: number): HashSet.ReverseIterator<T>;
	public rend(index: number = null): HashSet.ReverseIterator<T>
	{
		return this.begin(index).reverse();
	}

	/* ---------------------------------------------------------
		HASH
	--------------------------------------------------------- */
	public bucket_count(): number
	{
		return this.buckets_.size();
	}
	public bucket_size(n: number): number
	{
		return this.buckets_.at(n).length;
	}
	public load_factor(): number
	{
		return this.buckets_.load_factor();
	}

	public hash_function(): (val: T) => number
	{
		return this.buckets_.hash_function();
	}
	public key_eq(): (x: T, y: T) => boolean
	{
		return this.buckets_.key_eq();
	}
	public bucket(key: T): number
	{
		return this.hash_function()(key) % this.buckets_.size();
	}

	public max_load_factor(): number;
	public max_load_factor(z: number): void;
	public max_load_factor(z: number = null): any
	{
		return this.buckets_.max_load_factor(z);
	}
	public reserve(n: number): void
	{
		this.buckets_.rehash(Math.ceil(n * this.max_load_factor()));
	}
	public rehash(n: number): void
	{
		if (n <= this.bucket_count())
			return;

		this.buckets_.rehash(n);
	}
	
	/* =========================================================
		ELEMENTS I/O
			- INSERT
			- POST-PROCESS
			- SWAP
	============================================================
		INSERT
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	protected _Insert_by_val(val: T): Pair<HashSet.Iterator<T>, boolean>
	{
		// TEST WHETHER EXIST
		let it: HashSet.Iterator<T> = this.find(val);
		if (it.equals(this.end()) == false)
			return new Pair(it, false);

		// INSERT
		this["data_"].push(val);
		it = it.prev();

		// POST-PROCESS
		this._Handle_insert(it, it.next());

		return new Pair(it, true);
	}

	/**
	 * @hidden
	 */
	protected _Insert_by_hint(hint: HashSet.Iterator<T>, val: T): HashSet.Iterator<T>
	{
		// FIND DUPLICATED KEY
		let it: HashSet.Iterator<T> = this.find(val);
		if (it.equals(this.end()) == true)
		{
			// INSERT
			it = this["data_"].insert(hint, val);

			// POST-PROCESS
			this._Handle_insert(it, it.next());
		}
		return it;
	}

	/**
	 * @hidden
	 */
	protected _Insert_by_range<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
		(first: InputIterator, last: InputIterator): void
	{
		//--------
		// INSERTIONS
		//--------
		// PRELIMINARY
		let my_first: HashSet.Iterator<T> = this.end().prev();

		// INSERT ELEMENTS
		for (; !first.equals(last); first = first.next())
		{
			// TEST WHETER EXIST
			if (this.has(first.value))
				continue;
			
			// INSERTS
			this["data_"].push(first.value);
		}
		my_first = my_first.next();
		
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
	protected _Handle_insert(first: HashSet.Iterator<T>, last: HashSet.Iterator<T>): void
	{
		for (; !first.equals(last); first = first.next())
			this.buckets_.insert(first);
	}

	/**
	 * @hidden
	 */
	protected _Handle_erase(first: HashSet.Iterator<T>, last: HashSet.Iterator<T>): void
	{
		for (; !first.equals(last); first = first.next())
			this.buckets_.erase(first);
	}
}

export namespace HashSet
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator<T> = SetIterator<T, HashSet<T>>;
	export type ReverseIterator<T> = SetReverseIterator<T, HashSet<T>>;

	// BODY
	export var Iterator = SetIterator;
	export var ReverseIterator = SetReverseIterator;

	//----
	// SNAKE NOTATION
	//----
	// HEAD
	export type iterator<T> = Iterator<T>;
	export type reverse_iterator<T> = ReverseIterator<T>;

	// BODY
	export var iterator = Iterator;
	export var reverse_iterator = ReverseIterator;
}

export import unordered_set = HashSet;