/// <reference path="../API.ts" />

/// <reference path="../base/containers/MultiMap.ts" />
/// <reference path="../base/iterators/MapIterator.ts" />

namespace std
{
	export class TreeMultiMap<Key, T>
		extends base.MultiMap<Key, T, TreeMultiMap<Key, T>>
		implements base.ITreeMap<Key, T, TreeMultiMap<Key, T>>
	{
		/**
		 * @hidden
		 */
		private tree_: base._MultiMapTree<Key, T, TreeMultiMap<Key, T>>;

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

		public constructor(container: TreeMultiMap<Key, T>, compare: (x: Key, y: Key) => boolean);

		public constructor(begin: IForwardIterator<IPair<Key, T>>, end: IForwardIterator<IPair<Key, T>>);

		public constructor
		(
			begin: IForwardIterator<IPair<Key, T>>, 
			end: IForwardIterator<IPair<Key, T>>, 
			compare: (x: Key, y: Key) => boolean
		);

		public constructor(...args: any[])
		{
			super();

			//--------
			// SPECIFIY CONSTRUCTOR
			//--------
			let compare: (x: Key, y: Key) => boolean = less;
			let fn: Function = null;

			if (args.length >= 1 && args[0] instanceof TreeMultiMap)
			{
				// COPY CONSTRUCTOR
				let container: TreeMultiMap<Key, T> = args[0]; // PARAMETER
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					compare = args[1];

				fn = this.assign.bind(this, container.begin(), container.end());
			}
			else if (args.length >= 1 && args[0] instanceof Array)
			{
				// INITIALIZER LIST CONSTRUCTOR
				let items: IPair<Key, T>[] = args[0]; // PARAMETER
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					compare = args[1];

				fn = this.push.bind(this, ...items);
			}
			else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
			{
				// RANGE CONSTRUCTOR
				let first: IForwardIterator<IPair<Key, T>> = args[0]; // PARAMETER 1
				let last: IForwardIterator<IPair<Key, T>> = args[1]; // PARAMETER 2

				if (args.length == 3) // SPECIFIED COMPARISON FUNCTION
					compare = args[2];

				fn = this.assign.bind(this, first, last);
			}
			else if (args.length == 1)
			{
				// DEFAULT CONSTRUCTOR WITH SPECIFIED COMPARISON FUNCTION
				compare = args[0];
			}

			//--------
			// ADJUST THE SPECIFIED CONSTRUCTOR
			//--------
			this.tree_ = new base._MultiMapTree<Key, T, TreeMultiMap<Key, T>>(this, compare);
			if (fn != null)
				fn();
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		public clear(): void
		{
			super.clear();

			this.tree_.clear();
		}

		/* =========================================================
			ACCESSORS
		========================================================= */
		public find(key: Key): TreeMultiMap.Iterator<Key, T>
		{
			let node: base._XTreeNode<TreeMultiMap.Iterator<Key, T>> = this.tree_.find_by_key(key);
			
			if (node == null || equal_to(node.value.first, key) == false)
				return this.end();
			else
				return node.value;
		}

		public count(key: Key): number
		{
			let it = this.find(key);
			let cnt: number = 0;

			for (; !it.equals(this.end()) && equal_to(it.first, key); it = it.next())
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
			if (!prev.equals(this.end()) && !equal_to(prev.first, key))
				keys.push_back(prev.first); // NOT END() AND DIFFERENT WITH KEY

			keys.push_back(key); // NEW ITEM'S KEY

			if (!hint.equals(this.end()) && !equal_to(hint.first, key))
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
		protected _Insert_range<L extends Key, U extends T, InputIterator extends IForwardIterator<IPair<L, U>>>
			(first: InputIterator, last: InputIterator): void
		{
			for (let it = first; !it.equals(last); it = it.next() as InputIterator)
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

		/* ---------------------------------------------------------
			SWAP
		--------------------------------------------------------- */
		public swap(obj: TreeMultiMap<Key, T>): void
		{
			// SWAP CONTENTS
			super.swap(obj);

			// SWAP RB-TREE
			[this.tree_["source_"], obj.tree_["source_"]] = [obj.tree_["source_"], this.tree_["source_"]];
			[this.tree_, obj.tree_] = [obj.tree_, this.tree_];
		}
	}
}

namespace std.TreeMultiMap
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator<Key, T> = base.MapIterator<Key, T, TreeMultiMap<Key, T>>;
	export type ReverseIterator<Key, T> = base.MapReverseIterator<Key, T, TreeMultiMap<Key, T>>;

	// BODY
	export var Iterator = base.MapIterator;
	export var ReverseIterator = base.MapReverseIterator;

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