import { UniqueSet } from "../base/containers/UniqueSet";
import { ITreeSet } from "../base/interfaces/ITreeSet";

import { _UniqueSetTree } from "../base/trees/_UniqueSetTree";
import { SetIterator, SetReverseIterator } from "../base/iterators/SetIterator";
import { IForwardIterator } from "../iterators/IForwardIterator";

import { less } from "../functional/comparisons";
import { is_sorted } from "../algorithms/sortings";
import { Pair } from "../utilities/Pair";
import { Vector } from "./Vector";

export class TreeSet<T>
	extends UniqueSet<T, TreeSet<T>>
	implements ITreeSet<T, TreeSet<T>>
{
	/**
	 * @hidden
	 */
	private tree_: _UniqueSetTree<T, TreeSet<T>>;

	/* =========================================================
		CONSTRUCTORS & SEMI-CONSTRUCTORS
			- CONSTRUCTORS
			- ASSIGN & CLEAR
	============================================================
		CONSTURCTORS
	--------------------------------------------------------- */
	public constructor(comp?: (x: T, y: T) => boolean);
	public constructor(array: Array<T>, comp?: (x: T, y: T) => boolean);
	public constructor(obj: TreeSet<T>);
	public constructor
	(
		first: Readonly<IForwardIterator<T>>, 
		last: Readonly<IForwardIterator<T>>, 
		comp?: (x: T, y: T) => boolean
	);

	public constructor(...args: any[])
	{
		super();

		// DECLARE MEMBERS
		let comp: (x: T, y: T) => boolean = less;
		let post_process: () => void = null;

		//----
		// INITIALIZE MEMBERS AND POST-PROCESS
		//----
		// BRANCH - METHOD OVERLOADINGS
		if (args.length == 1 && args[0] instanceof TreeSet)
		{
			// PARAMETERS
			let container: TreeSet<T> = args[0];
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
				let items: T[] = args[0];
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
				let first: Readonly<IForwardIterator<T>> = args[0];
				let last: Readonly<IForwardIterator<T>> = args[1];

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
		this.tree_ = new _UniqueSetTree<T, TreeSet<T>>(this, comp);
		
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

	public swap(obj: TreeSet<T>): void
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
	public find(val: T): TreeSet.Iterator<T>
	{
		let node = this.tree_.nearest_by_key(val);

		if (node == null || this.tree_.key_eq()(node.value.value, val) == false)
			return this.end();
		else
			return node.value;
	}
	
	public key_comp(): (x: T, y: T) => boolean
	{
		return this.tree_.key_comp();
	}
	public value_comp(): (x: T, y: T) => boolean
	{
		return this.tree_.key_comp();
	}

	public lower_bound(val: T): TreeSet.Iterator<T>
	{
		return this.tree_.lower_bound(val);
	}
	public upper_bound(val: T): TreeSet.Iterator<T>
	{
		return this.tree_.upper_bound(val);
	}
	public equal_range(val: T): Pair<TreeSet.Iterator<T>, TreeSet.Iterator<T>>
	{
		return this.tree_.equal_range(val);
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
	protected _Insert_by_val(val: T): Pair<TreeSet.Iterator<T>, boolean>
	{
		// FIND POSITION TO INSERT
		let it: TreeSet.Iterator<T> = this.lower_bound(val);
		if (!it.equals(this.end()) && this.tree_.key_eq()(it.value, val))
			return new Pair(it, false);

		// ITERATOR TO RETURN
		it = this["data_"].insert(it, val);
		this._Handle_insert(it, it.next()); // POST-PROCESS

		return new Pair(it, true);
	}

	protected _Insert_by_hint(hint: TreeSet.Iterator<T>, val: T): TreeSet.Iterator<T>
	{
		//--------
		// INSERT BRANCH
		//--------
		// prev < current < hint
		let prev: TreeSet.Iterator<T> = hint.prev();
		let keys: Vector<T> = new Vector<T>();

		// CONSTRUCT KEYS
		if (!prev.equals(this.end()))
			if (this.tree_.key_eq()(prev.value, val))
				return prev; // SAME KEY, THEN RETURNS IT`
			else
				keys.push_back(prev.value); // DIFFERENT KEY

		keys.push_back(val); // NEW ITEM'S KEY

		if (!hint.equals(this.end()))
			if (this.tree_.key_eq()(hint.value, val))
				return hint;
			else
				keys.push_back(hint.value);

		// IS THE HINT VALID ?
		let ret: TreeSet.Iterator<T>;

		if (is_sorted(keys.begin(), keys.end(), this.key_comp()))
		{
			// CORRECT HINT
			ret = this["data_"].insert(hint, val);

			// POST-PROCESS
			this._Handle_insert(ret, ret.next());
		}
		else // INVALID HINT
			ret = this._Insert_by_val(val).first;

		return ret;
	}

	/**
	 * @hidden
	 */
	protected _Insert_by_range<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
		(first: InputIterator, last: InputIterator): void
	{
		for (; !first.equals(last); first = first.next())
			this._Insert_by_val(first.value);
	}

	/* ---------------------------------------------------------
		POST-PROCESS
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	protected _Handle_insert(first: TreeSet.Iterator<T>, last: TreeSet.Iterator<T>): void
	{
		for (; !first.equals(last); first = first.next())
			this.tree_.insert(first);
	}

	/**
	 * @hidden
	 */
	protected _Handle_erase(first: TreeSet.Iterator<T>, last: TreeSet.Iterator<T>): void
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
	export type Iterator<T> = SetIterator<T, TreeSet<T>>;
	export type ReverseIterator<T> = SetReverseIterator<T, TreeSet<T>>;

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

export import set = TreeSet;