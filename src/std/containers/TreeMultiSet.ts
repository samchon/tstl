/// <reference path="../API.ts" />

/// <reference path="../base/containers/MultiSet.ts" />
/// <reference path="../base/iterators/SetIterator.ts" />

namespace std
{
	export class TreeMultiSet<T>
		extends base.MultiSet<T, TreeMultiSet<T>>
		implements base.ITreeSet<T, TreeMultiSet<T>>
	{
		/**
		 * @hidden
		 */
		private tree_: base._MultiSetTree<T, TreeMultiSet<T>>;

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
		public constructor(comp?: (x: T, y: T) => boolean);

		/**
		 * Initializer Constructor.
		 * 
		 * @param items Items to assign.
		 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
		 */
		public constructor(items: T[], comp?: (x: T, y: T) => boolean);
		
		/**
		 * Copy Constructor.
		 * 
		 * @param obj Object to copy.
		 */
		public constructor(obj: TreeMultiSet<T>);

		/**
		 * Range Constructor.
		 * 
		 * @param first Input iterator of the first position.
		 * @param last Input iterator of the last position.
		 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
		 */
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
			if (args.length == 1 && args[0] instanceof TreeMultiSet)
			{
				// PARAMETERS
				let container: TreeMultiSet<T> = args[0];
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
			this.tree_ = new base._MultiSetTree<T, TreeMultiSet<T>>(this, comp);
			
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

		public swap(obj: TreeMultiSet<T>): void
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
		public find(val: T): TreeMultiSet.Iterator<T>
		{
			let node = this.tree_.nearest_by_key(val);

			if (node == null || this.tree_.key_eq()(node.value.value, val) == false)
				return this.end();
			else
				return node.value;
		}
		public count(val: T): number
		{
			let it = this.find(val);
			let cnt: number = 0;

			for (; !it.equals(this.end()) && this.tree_.key_eq()(it.value, val); it = it.next())
				cnt++;

			return cnt;
		}

		public key_comp(): (x: T, y: T) => boolean
		{
			return this.tree_.key_comp();
		}
		public value_comp(): (x: T, y: T) => boolean
		{
			return this.tree_.key_comp();
		}

		public lower_bound(val: T): TreeMultiSet.Iterator<T>
		{
			return this.tree_.lower_bound(val);
		}
		public upper_bound(val: T): TreeMultiSet.Iterator<T>
		{
			return this.tree_.upper_bound(val);
		}
		public equal_range(val: T): Pair<TreeMultiSet.Iterator<T>, TreeMultiSet.Iterator<T>>
		{
			return this.tree_.equal_range(val);
		}

		/**
		 * @hidden
		 */
		protected _Key_eq(x: T, y: T): boolean
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
		protected _Insert_by_val(val: T): TreeMultiSet.Iterator<T>
		{
			// FIND POSITION TO INSERT
			let it: TreeMultiSet.Iterator<T> = this.upper_bound(val);

			// ITERATOR TO RETURN
			it = this["data_"].insert(it, val);
			this._Handle_insert(it, it.next()); // POST-PROCESS

			return it;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_hint(hint: TreeMultiSet.Iterator<T>, val: T): TreeMultiSet.Iterator<T>
		{
			//--------
			// INSERT BRANCH
			//--------
			// prev < current < hint
			let prev: TreeMultiSet.Iterator<T> = hint.prev();
			let keys: Vector<T> = new Vector<T>();

			// CONSTRUCT KEYS
			if (!prev.equals(this.end()) && !this.tree_.key_eq()(prev.value, val))
				keys.push_back(prev.value); // NOT END() AND DIFFERENT WITH KEY

			keys.push_back(val); // NEW ITEM'S KEY

			if (!hint.equals(this.end()) && !this.tree_.key_eq()(hint.value, val))
				keys.push_back(hint.value);

			// IS HINT VALID ?
			let ret: TreeMultiSet.Iterator<T>;
			
			if (is_sorted(keys.begin(), keys.end(), this.key_comp()))
			{
				// CORRECT HINT
				ret = this["data_"].insert(hint, val);

				// POST-PROCESS
				this._Handle_insert(ret, ret.next());
			}
			else // INVALID HINT
				ret = this._Insert_by_val(val);

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
		protected _Handle_insert(first: TreeMultiSet.Iterator<T>, last: TreeMultiSet.Iterator<T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.tree_.insert(first);
		}

		/**
		 * @hidden
		 */
		protected _Handle_erase(first: TreeMultiSet.Iterator<T>, last: TreeMultiSet.Iterator<T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.tree_.erase(first);
		}
	}
}

namespace std.TreeMultiSet
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator<T> = base.SetIterator<T, TreeMultiSet<T>>;
	export type ReverseIterator<T> = base.SetReverseIterator<T, TreeMultiSet<T>>;

	// BODY
	export const Iterator = base.SetIterator;
	export const ReverseIterator = base.SetReverseIterator;

	//----
	// SNAKE NOTATION
	//----
	// HEAD
	export type iterator<T> = Iterator<T>;
	export type reverse_iterator<T> = ReverseIterator<T>;

	// BODY
	export const iterator = Iterator;
	export const reverse_iterator = ReverseIterator;
}
