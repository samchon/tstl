import { UniqueMap } from "../base/container/UniqueMap";
import { ITreeMap } from "../base/container/ITreeMap";
import { _Construct, _Emplace_hint } from "../base/container/_ITreeContainer";

import { _UniqueMapTree } from "../base/tree/_UniqueMapTree";
import { MapIterator, MapReverseIterator } from "../base/iterator/MapIterator";
import { Entry } from "../utility/Entry";

import { IForwardIterator } from "../iterator/IForwardIterator";
import { IPair } from "../utility/IPair";
import { Pair } from "../utility/Pair";

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
		
		_Construct.bind(this, TreeMap, _UniqueMapTree)(...args);
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

		if (node === null || this.tree_.key_eq()(node.value.first, key) === false)
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
		return _Emplace_hint.bind(this)(hint, new Entry(key, val), () =>
		{
			return this.emplace(key, val).first;
		});
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