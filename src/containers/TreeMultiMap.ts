import { MultiMap } from "../base/containers/MultiMap";
import { ITreeMap } from "../base/interfaces/ITreeMap";

import { _MultiMapTree } from "../base/trees/_MultiMapTree";
import { _XTreeNode } from "../base/trees/_XTreeNode";
import { MapIterator, MapReverseIterator } from "../base/iterators/MapIterator";

import { IForwardIterator } from "../iterators/IForwardIterator";
import { IPair } from "../utilities/IPair";
import { Pair } from "../utilities/Pair";
import { Entry } from "../utilities/Entry";

import { is_sorted } from "../algorithms/sortings";
import { less } from "../functional/comparisons";
import { Vector } from "./Vector";

export class TreeMultiMap<Key, T>
	extends MultiMap<Key, T, TreeMultiMap<Key, T>>
	implements ITreeMap<Key, T, TreeMultiMap<Key, T>>
{
	/**
	 * @hidden
	 */
	private tree_: _MultiMapTree<Key, T, TreeMultiMap<Key, T>>;

	/* =========================================================
		CONSTRUCTORS & SEMI-CONSTRUCTORS
			- CONSTRUCTORS
			- ASSIGN & CLEAR
	============================================================
		CONSTURCTORS
	--------------------------------------------------------- */
	public constructor();
	public constructor(compare: (x: Key, y: Key) => boolean);

	public constructor(array: Array<IPair<Key, T>>);
	public constructor(array: Array<IPair<Key, T>>, compare: (x: Key, y: Key) => boolean);

	public constructor(container: TreeMultiMap<Key, T>);
	public constructor(first: Readonly<IForwardIterator<IPair<Key, T>>>, last: Readonly<IForwardIterator<IPair<Key, T>>>);
	public constructor
	(
		first: Readonly<IForwardIterator<IPair<Key, T>>>, 
		last: Readonly<IForwardIterator<IPair<Key, T>>>, 
		compare: (x: Key, y: Key) => boolean
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
		if (args.length == 1 && args[0] instanceof TreeMultiMap)
		{
			// PARAMETERS
			let container: TreeMultiMap<Key, T> = args[0];
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
		this.tree_ = new _MultiMapTree<Key, T, TreeMultiMap<Key, T>>(this, comp);
		
		// ACT POST-PROCESS
		if (post_process != null)
			post_process();
	}

	/* ---------------------------------------------------------
		ASSIGN & CLEAR
	--------------------------------------------------------- */
	public clear(): void
	{
		super.clear();

		this.tree_.clear();
	}

	public swap(obj: TreeMultiMap<Key, T>): void
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
	public find(key: Key): TreeMultiMap.Iterator<Key, T>
	{
		let node: _XTreeNode<TreeMultiMap.Iterator<Key, T>> = this.tree_.nearest_by_key(key);
		
		if (node == null || this.tree_.key_eq()(node.value.first, key) == false)
			return this.end();
		else
			return node.value;
	}
	public count(key: Key): number
	{
		let it = this.find(key);
		let cnt: number = 0;

		for (; !it.equals(this.end()) && this.tree_.key_eq()(it.first, key); it = it.next())
			cnt++;

		return cnt;
	}

	public key_comp(): (x: Key, y: Key) => boolean
	{
		return this.tree_.key_comp();
	}
	public value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean
	{
		return this.tree_.value_comp();
	}

	public lower_bound(key: Key): TreeMultiMap.Iterator<Key, T>
	{
		return this.tree_.lower_bound(key);
	}
	public upper_bound(key: Key): TreeMultiMap.Iterator<Key, T>
	{
		return this.tree_.upper_bound(key);
	}
	public equal_range(key: Key): Pair<TreeMultiMap.Iterator<Key, T>, TreeMultiMap.Iterator<Key, T>>
	{
		return this.tree_.equal_range(key);
	}

	/**
	 * @hidden
	 */
	protected _Key_eq(x: Key, y: Key): boolean
	{
		return this.tree_.key_eq()(x, y);
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
	protected _Emplace(key: Key, val: T): TreeMultiMap.Iterator<Key, T>
	{
		// FIND POSITION TO INSERT
		let it: TreeMultiMap.Iterator<Key, T> = this.upper_bound(key);

		// ITERATOR TO RETURN
		it = this["data_"].insert(it, new Entry(key, val));
		this._Handle_insert(it, it.next()); // POST-PROCESS

		return it;
	}

	/**
	 * @hidden
	 */
	protected _Emplace_hint(hint: TreeMultiMap.Iterator<Key, T>, key: Key, val: T): TreeMultiMap.Iterator<Key, T>
	{
		//--------
		// INSERT BRANCH
		//--------
		// prev < current < hint
		let prev: TreeMultiMap.Iterator<Key, T> = hint.prev();
		let keys: Vector<Key> = new Vector<Key>();

		// CONSTRUCT KEYS
		if (!prev.equals(this.end()) && !this.tree_.key_eq()(prev.first, key))
			keys.push_back(prev.first); // NOT END() AND DIFFERENT WITH KEY

		keys.push_back(key); // NEW ITEM'S KEY

		if (!hint.equals(this.end()) && !this.tree_.key_eq()(hint.first, key))
			keys.push_back(hint.first);

		// IS THE HINT VALID ?
		let ret: TreeMultiMap.Iterator<Key, T>;
		
		if (is_sorted(keys.begin(), keys.end(), this.key_comp()))
		{
			// CORRECT HINT
			ret = this["data_"].insert(hint, new Entry(key, val));

			// POST-PROCESS
			this._Handle_insert(ret, ret.next());
		}
		else // INVALID HINT
			ret = this._Emplace(key, val);

		return ret;
	}

	/**
	 * @hidden
	 */
	protected _Insert_by_range<L extends Key, U extends T, InputIterator extends Readonly<IForwardIterator<IPair<L, U>, InputIterator>>>
		(first: InputIterator, last: InputIterator): void
	{
		for (let it = first; !it.equals(last); it = it.next())
			this._Emplace(it.value.first, it.value.second);
	}

	/* ---------------------------------------------------------
		POST-PROCESS
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	protected _Handle_insert(first: TreeMultiMap.Iterator<Key, T>, last: TreeMultiMap.Iterator<Key, T>): void
	{
		for (; !first.equals(last); first = first.next())
			this.tree_.insert(first);
	}

	/**
	 * @hidden
	 */
	protected _Handle_erase(first: TreeMultiMap.Iterator<Key, T>, last: TreeMultiMap.Iterator<Key, T>): void
	{
		for (; !first.equals(last); first = first.next())
			this.tree_.erase(first);
	}
}

export namespace TreeMultiMap
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator<Key, T> = MapIterator<Key, T, TreeMultiMap<Key, T>>;
	export type ReverseIterator<Key, T> = MapReverseIterator<Key, T, TreeMultiMap<Key, T>>;

	// BODY
	export var Iterator = MapIterator;
	export var ReverseIterator = MapReverseIterator;

	//----
	// SNAKE NOTATION
	//----
	// HEAD
	export type iterator<Key, T> = Iterator<Key, T>;
	export type reverse_iterator<Key, T> = ReverseIterator<Key, T>;

	// BODY
	export var iterator = Iterator;
	export var reverse_iterator = ReverseIterator;
}

export import multimap = TreeMultiMap;