import { UniqueSet } from "../base/containers/UniqueSet";
import { ITreeSet } from "../base/containers/ITreeSet";
import { _Construct } from "../base/containers/_ITreeContainer";

import { _UniqueSetTree } from "../base/trees/_UniqueSetTree";
import { SetIterator, SetReverseIterator } from "../base/iterators/SetIterator";

import { IForwardIterator } from "../iterators/IForwardIterator";
import { Pair } from "../utilities/Pair";

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
	private tree_: _UniqueSetTree<Key, TreeSet<Key>>;

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
		_Construct.bind(this, TreeSet, _UniqueSetTree)(...args);

		// // DECLARE MEMBERS
		// let comp: (x: Key, y: Key) => boolean = less;
		// let post_process: () => void = null;

		// //----
		// // INITIALIZE MEMBERS AND POST-PROCESS
		// //----
		// // BRANCH - METHOD OVERLOADINGS
		// if (args.length === 1 && args[0] instanceof TreeSet)
		// {
		// 	// PARAMETERS
		// 	let container: TreeSet<Key> = args[0];
		// 	comp = container.key_comp();

		// 	// COPY CONSTRUCTOR
		// 	post_process = () =>
		// 	{
		// 		let first = container.begin();
		// 		let last = container.end();

		// 		this.assign(first, last);
		// 	};
		// }
		// else if (args.length >= 1 && args[0] instanceof Array)
		// {
		// 	// FUNCTION TEMPLATE
		// 	if (args.length === 2)	comp = args[1];

		// 	// INITIALIZER LIST CONSTRUCTOR
		// 	post_process = () => 
		// 	{
		// 		let items: Key[] = args[0];
		// 		this.push(...items);
		// 	};
		// }
		// else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
		// {
		// 	// FUNCTION TEMPLATE
		// 	if (args.length === 3)	comp = args[2];

		// 	// RANGE CONSTRUCTOR
		// 	post_process = () =>
		// 	{
		// 		let first: Readonly<IForwardIterator<Key>> = args[0];
		// 		let last: Readonly<IForwardIterator<Key>> = args[1];

		// 		this.assign(first, last);
		// 	};
		// }
		// else if (args.length === 1)
		// {
		// 	// DEFAULT CONSTRUCTOR WITH SPECIFIED COMPARISON FUNCTION
		// 	comp = args[0];
		// }

		// //----
		// // DO PROCESS
		// //----
		// // CONSTRUCT TREE
		// this.tree_ = new _UniqueSetTree<Key, TreeSet<Key>>(this, comp);
		
		// // ACT POST-PROCESS
		// if (post_process !== null)
		// 	post_process();
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
		[this.tree_["source_"], obj.tree_["source_"]] = [obj.tree_["source_"], this.tree_["source_"]];
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
		it = this["data_"].insert(it, key);
		this._Handle_insert(it, it.next()); // POST-PROCESS

		return new Pair(it, true);
	}

	/**
	 * @hidden
	 */
	protected _Insert_by_hint(hint: TreeSet.Iterator<Key>, key: Key): TreeSet.Iterator<Key>
	{
		hint;
		return this._Insert_by_key(key).first;
	}

	/**
	 * @hidden
	 */
	protected _Insert_by_range<U extends Key, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
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