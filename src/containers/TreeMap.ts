import { UniqueMap } from "../base/containers/UniqueMap";
import { ITreeMap } from "../base/containers/ITreeMap";

import { _UniqueMapTree } from "../base/trees/_UniqueMapTree";
import { MapIterator, MapReverseIterator } from "../base/iterators/MapIterator";
import { Entry } from "../utilities/Entry";

import { IForwardIterator } from "../iterators/IForwardIterator";
import { IPair } from "../utilities/IPair";
import { Pair } from "../utilities/Pair";

import { less } from "../functional/comparisons";

/**
 * Unique-key Map based on Tree.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class TreeMap<Key, T>
	extends UniqueMap<Key, T, TreeMap<Key, T>>
	implements ITreeMap<Key, T, true, TreeMap<Key, T>>
{
	/**
	 * @hidden
	 */
	private tree_: _UniqueMapTree<Key, T, TreeMap<Key, T>>;

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
		super();

		// DECLARE MEMBERS
		let comp: (x: Key, y: Key) => boolean = less;
		let post_process: () => void = null;

		//----
		// INITIALIZE MEMBERS AND POST-PROCESS
		//----
		// BRANCH - METHOD OVERLOADINGS
		if (args.length == 1 && args[0] instanceof TreeMap)
		{
			// PARAMETERS
			let container: TreeMap<Key, T> = args[0];
			comp = container.key_comp();

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
			// FUNCTION TEMPLATE
			if (args.length == 2)	comp = args[1];

			// INITIALIZER LIST CONSTRUCTOR
			post_process = () =>
			{
				let items: IPair<Key, T>[] = args[0];
				this.push(...items);
			};
		}
		else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
		{
			// FUNCTION TEMPLATE
			if (args.length == 3)	comp = args[2];

			// RANGE CONSTRUCTOR
			post_process = () =>
			{
				let first: Readonly<IForwardIterator<IPair<Key, T>>> = args[0];
				let last: Readonly<IForwardIterator<IPair<Key, T>>> = args[1];

				this.assign(first, last);
			};
		}
		else if (args.length == 1)
		{
			// DEFAULT CONSTRUCTOR WITH SPECIFIED COMPARISON FUNCTION
			comp = args[0];
		}

		//----
		// DO PROCESS
		//----
		// CONSTRUCT TREE
		this.tree_ = new _UniqueMapTree<Key, T, TreeMap<Key, T>>(this, comp);
		
		// ACT POST-PROCESS
		if (post_process != null)
			post_process();
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
	public swap(obj: TreeMap<Key, T>): void
	{
		// SWAP CONTENTS
		super.swap(obj);

		// SWAP RB-TREE
		[this.tree_["source_"], obj.tree_["source_"]] = [obj.tree_["source_"], this.tree_["source_"]];
		[this.tree_, obj.tree_] = [obj.tree_, this.tree_];
	}

	/* =========================================================
		ACCESSORS
	========================================================= */
	/**
	 * @inheritDoc
	 */
	public find(key: Key): TreeMap.Iterator<Key, T>
	{
		let node = this.tree_.nearest_by_key(key);

		if (node == null || this.tree_.key_eq()(node.value.first, key) == false)
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
	public value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean
	{
		return this.tree_.value_comp();
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

	/**
	 * @inheritDoc
	 */
	public equal_range(key: Key): Pair<TreeMap.Iterator<Key, T>, TreeMap.Iterator<Key, T>>
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
	 * @inheritDoc
	 */
	public emplace(key: Key, val: T): Pair<TreeMap.Iterator<Key, T>, boolean>
	{
		// FIND POSITION TO INSERT
		let it: TreeMap.Iterator<Key, T> = this.lower_bound(key);
		if (!it.equals(this.end()) && this.tree_.key_eq()(it.first, key))
			return new Pair(it, false);

		// ITERATOR TO RETURN
		it = this["data_"].insert(it, new Entry(key, val));
		this._Handle_insert(it, it.next()); // POST-PROCESS

		return new Pair(it, true);
	}

	/**
	 * @inheritDoc
	 */
	public emplace_hint(hint: TreeMap.Iterator<Key, T>, key: Key, val: T): TreeMap.Iterator<Key, T>
	{
		hint;
		return this.emplace(key, val).first;
	}

	/**
	 * @hidden
	 */
	protected _Insert_by_range<L extends Key, U extends T, InputIterator extends Readonly<IForwardIterator<IPair<L, U>, InputIterator>>>
		(first: InputIterator, last: InputIterator): void
	{
		for (let it = first; !it.equals(last); it = it.next())
			this.emplace(it.value.first, it.value.second);
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
	export type Iterator<Key, T> = MapIterator<Key, T, true, TreeMap<Key, T>>;
	export type ReverseIterator<Key, T> = MapReverseIterator<Key, T, true, TreeMap<Key, T>>;

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
export import map = TreeMap;