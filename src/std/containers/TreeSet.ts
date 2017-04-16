/// <reference path="../API.ts" />

/// <reference path="../base/containers/UniqueSet.ts" />

namespace std.TreeSet
{
	export type iterator<T> = SetIterator<T>;
	export type reverse_iterator<T> = SetReverseIterator<T>;
}

namespace std
{
	/**
	 * Tree-structured set, <code>std::set</code> of STL.
	 *
	 * {@link TreeSet}s are containers that store unique elements following a specific order.
	 *
	 * In a {@link TreeSet}, the value of an element also identifies it (the value is itself the 
	 * <i>key</i>, of type <i>T</i>), and each value must be unique. The value of the elements in a 
	 * {@link TreeSet} cannot be modified once in the container (the elements are always const), but they 
	 * can be inserted or removed from the container.
	 *
	 * Internally, the elements in a {@link TreeSet} are always sorted following a specific strict weak 
	 * ordering criterion indicated by its internal comparison method (of {@link less}).
	 *
	 * {@link TreeSet} containers are generally slower than {@link HashSet} containers to access 
	 * individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on their 
	 * order.
	 *
	 * {@link TreeSet}s are typically implemented as binary search trees.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/set_containers.png" style="max-width: 100%" /> </a></p>
	 * 
	 * ### Container properties
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd> 
	 *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute 
	 *		position in the container.
	 *	</dd>
	 * 
	 *	<dt> Ordered </dt>
	 *	<dd> 
	 *		The elements in the container follow a strict order at all times. All inserted elements are 
	 *		given a position in this order. 
	 *	</dd>
	 *
	 *	<dt> Set </dt>
	 *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
	 *
	 *	<dt> Unique keys </dt>
	 *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 *
	 * @param <T> Type of the elements. 
	 *			  Each element in an {@link TreeSet} is also uniquely identified by this value.
	 *
	 * @reference http://www.cplusplus.com/reference/set/set
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class TreeSet<T>
		extends base.UniqueSet<T>
		implements base.ITreeSet<T>
	{
		/**
		 * @hidden
		 */
		private tree_: base._UniqueSetTree<T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from compare.
		 * 
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(compare: (x: T, y: T) => boolean);

		/**
		 * Contruct from elements.
		 *
		 * @param array Elements to be contained.
		 */
		public constructor(array: Array<T>);

		/**
		 * Contruct from elements with compare.
		 *
		 * @param array Elements to be contained.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(array: Array<T>, compare: (x: T, y: T) => boolean);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: TreeMultiSet<T>);

		/**
		 * Copy Constructor with compare.
		 * 
		 * @param container A container to be copied.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(container: TreeMultiSet<T>, compare: (x: T, y: T) => boolean);

		/**
		 * Range Constructor.
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: base.Iterator<T>, end: base.Iterator<T>);

		/**
		 * Construct from range and compare.
		 * 
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(begin: base.Iterator<T>, end: base.Iterator<T>, compare: (x: T, y: T) => boolean);

		public constructor(...args: any[])
		{
			super();

			//--------
			// SPECIFIY CONSTRUCTOR
			//--------
			let compare: (x: T, y: T) => boolean = less;
			let fn: Function = null;

			if (args.length >= 1 && args[0] instanceof TreeSet)
			{
				// COPY CONSTRUCTOR
				let container: TreeSet<T> = args[0]; // PARAMETER
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					compare = args[1];

				fn = this.assign.bind(this, container.begin(), container.end());
			}
			else if (args.length >= 1 && args[0] instanceof Array)
			{
				// INITIALIZER LIST CONSTRUCTOR
				let items: T[] = args[0]; // PARAMETER
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					compare = args[1];

				fn = this.push.bind(this, ...items);
			}
			else if (args.length >= 2 && args[0] instanceof base.Iterator && args[1] instanceof base.Iterator)
			{
				// RANGE CONSTRUCTOR
				let first: base.Iterator<T> = args[0]; // PARAMETER 1
				let last: base.Iterator<T> = args[1]; // PARAMETER 2
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
			this.tree_ = new base._UniqueSetTree<T>(this, compare);
			if (fn != null)
				fn();
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			super.clear();

			this.tree_.clear();
		}
		
		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public find(val: T): SetIterator<T>
		{
			let node = this.tree_.find_by_val(val);

			if (node == null || equal_to(node.value.value, val) == false)
				return this.end();
			else
				return node.value;
		}

		/**
		 * @inheritdoc
		 */
		public key_comp(): (x: T, y: T) => boolean
		{
			return this.tree_.key_comp();
		}

		/**
		 * @inheritdoc
		 */
		public value_comp(): (x: T, y: T) => boolean
		{
			return this.tree_.key_comp();
		}

		/**
		 * @inheritdoc
		 */
		public lower_bound(val: T): SetIterator<T>
		{
			return this.tree_.lower_bound(val);
		}

		/**
		 * @inheritdoc
		 */
		public upper_bound(val: T): SetIterator<T>
		{
			return this.tree_.upper_bound(val);
		}

		/**
		 * @inheritdoc
		 */
		public equal_range(val: T): Pair<SetIterator<T>, SetIterator<T>>
		{
			return this.tree_.equal_range(val);
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
		protected _Insert_by_val(val: T): Pair<SetIterator<T>, boolean>
		{
			// FIND POSITION TO INSERT
			let it: SetIterator<T> = this.lower_bound(val);
			if (!it.equals(this.end()) && equal_to(it.value, val))
				return make_pair(it, false);

			// ITERATOR TO RETURN
			it = this["data_"].insert(it, val);
			this._Handle_insert(it, it.next()); // POST-PROCESS

			return make_pair(it, true);
		}

		protected _Insert_by_hint(hint: SetIterator<T>, val: T): SetIterator<T>
		{
			//--------
			// INSERT BRANCH
			//--------
			// prev < current < hint
			let prev: SetIterator<T> = hint.prev();
			let keys: Vector<T> = new Vector<T>();

			// CONSTRUCT KEYS
			if (!prev.equals(this.end()))
				if (equal_to(prev.value, val))
					return prev; // SAME KEY, THEN RETURNS IT`
				else
					keys.push_back(prev.value); // DIFFERENT KEY

			keys.push_back(val); // NEW ITEM'S KEY

			if (!hint.equals(this.end()))
				if (equal_to(hint.value, val))
					return hint;
				else
					keys.push_back(hint.value);

			// IS THE HINT VALID ?
			let ret: SetIterator<T>;

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
		protected _Insert_by_range<U extends T, InputIterator extends base.Iterator<U>>
			(first: InputIterator, last: InputIterator): void
		{
			for (; !first.equals(last); first = first.next() as InputIterator)
				this._Insert_by_val(first.value);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected _Handle_insert(first: SetIterator<T>, last: SetIterator<T>): void
		{
			this.tree_.insert(first);
		}

		/**
		 * @hidden
		 */
		protected _Handle_erase(first: SetIterator<T>, last: SetIterator<T>): void
		{
			for (; !first.equals(last); first = first.next())
				this.tree_.erase(first);
		}

		/* ---------------------------------------------------------
			SWAP
		--------------------------------------------------------- */
		/**
		 * Swap content.
		 * 
		 * Exchanges the content of the container by the content of <i>obj</i>, which is another 
		 * {@link TreeSet set} of the same type. Sizes abd container type may differ.
		 * 
		 * After the call to this member function, the elements in this container are those which were 
		 * in <i>obj</i> before the call, and the elements of <i>obj</i> are those which were in this. All 
		 * iterators, references and pointers remain valid for the swapped objects.
		 *
		 * Notice that a non-member function exists with the same name, {@link swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function.
		 * 
		 * @param obj Another {@link TreeSet set container} of the same type of elements as this (i.e.,
		 *			  with the same template parameters, <b>Key</b> and <b>T</b>) whose content is swapped 
		 *			  with that of this {@link TreeSet container}.
		 */
		public swap(obj: TreeSet<T>): void;

		/**
		 * @inheritdoc
		 */
		public swap(obj: base.Container<T>): void;
		
		public swap(obj: TreeSet<T> | base.Container<T>): void
		{
			if (obj instanceof TreeSet && this.key_comp() == obj.key_comp())
			{
				this._Swap(obj);
				[this.tree_, obj.tree_] = [obj.tree_, this.tree_];
			}
			else
				super.swap(obj);
		}
	}
}