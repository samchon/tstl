/// <reference path="../API.ts" />

/// <reference path="../base/containers/UniqueMap.ts" />
/// <reference path="../base/iterators/MapIterator.ts" />

namespace std
{
	/**
	 * Unique-key Map based on Tree.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class TreeMap<Key, T>
		extends base.UniqueMap<Key, T, TreeMap<Key, T>>
		implements base.ITreeMap<Key, T, TreeMap<Key, T>>
	{
		/**
		 * @hidden
		 */
		private tree_: base._UniqueMapTree<Key, T, TreeMap<Key, T>>;

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
			if (args.length === 1 && args[0] instanceof TreeMap)
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
				if (args.length === 2)	comp = args[1];

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
				if (args.length === 3)	comp = args[2];

				// RANGE CONSTRUCTOR
				post_process = () =>
				{
					let first: Readonly<IForwardIterator<IPair<Key, T>>> = args[0];
					let last: Readonly<IForwardIterator<IPair<Key, T>>> = args[1];

					this.assign(first, last);
				};
			}
			else if (args.length === 1)
			{
				// DEFAULT CONSTRUCTOR WITH SPECIFIED COMPARISON FUNCTION
				comp = args[0];
			}

			//----
			// DO PROCESS
			//----
			// CONSTRUCT TREE
			this.tree_ = new base._UniqueMapTree<Key, T, TreeMap<Key, T>>(this, comp);
			
			// ACT POST-PROCESS
			if (post_process !==null)
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
				return make_pair(it, false);

			// ITERATOR TO RETURN
			it = this["data_"].insert(it, new Entry(key, val));
			this._Handle_insert(it, it.next()); // POST-PROCESS

			return make_pair(it, true);
		}

		/**
		 * @inheritDoc
		 */
		public emplace_hint(hint: TreeMap.Iterator<Key, T>, key: Key, val: T): TreeMap.Iterator<Key, T>
		{
			//--------
			// INSERT BRANCH
			//--------
			// prev < current < hint
			let prev: TreeMap.Iterator<Key, T> = hint.prev();
			let keys: Vector<Key> = new Vector<Key>();

			// CONSTRUCT KEYS
			if (!prev.equals(this.end()))
				if (this.tree_.key_eq()(prev.first, key))
					return prev; // SAME KEY, THEN RETURNS IT`
				else
					keys.push_back(prev.first); // DIFFERENT KEY

			keys.push_back(key); // NEW ITEM'S KEY

			if (!hint.equals(this.end()))
				if (this.tree_.key_eq()(hint.first, key))
					return hint;
				else
					keys.push_back(hint.first);

			// IS THE HINT VALID ?
			let ret: TreeMap.Iterator<Key, T>;

			if (is_sorted(keys.begin(), keys.end(), this.key_comp()))
			{
				// CORRECT HINT
				ret = this["data_"].insert(hint, new Entry(key, val));

				// POST-PROCESS
				this._Handle_insert(ret, ret.next());
			}
			else // INVALID HINT
				ret = this.emplace(key, val).first;

			return ret;
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
}

namespace std.TreeMap
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator<Key, T> = base.MapIterator<Key, T, TreeMap<Key, T>>;
	export type ReverseIterator<Key, T> = base.MapReverseIterator<Key, T, TreeMap<Key, T>>;

	// BODY
	export const Iterator = base.MapIterator;
	export const ReverseIterator = base.MapReverseIterator;

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