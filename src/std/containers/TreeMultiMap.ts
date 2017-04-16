/// <reference path="../API.ts" />

/// <reference path="../base/containers/MultiMap.ts" />

namespace std.TreeMultiMap
{
	export type iterator<Key, T> = MapIterator<Key, T>;
	export type reverse_iterator<Key, T> = MapReverseIterator<Key, T>;
}

namespace std
{
	/**
	 * Tree-structured multiple-key map.
	 *
	 * {@link TreeMultiMap TreeMultiMaps} are associative containers that store elements formed by a combination of 
	 * a <i>key value</i> and a <i>mapped value</i>, following a specific order, and where multiple elements can 
	 * have equivalent keys.
	 *
	 * In a {@link TreeMultiMap}, the <i>key values</i> are generally used to sort and uniquely identify 
	 * the elements, while the <i>mapped values</i> store the content associated to this <i>key</i>. The types of 
	 * <i>key</i> and <i>mapped value</i> may differ, and are grouped together in member type 
	 * <code>value_type</code>, which is a {@link Pair} type combining both:
	 * 
	 * <code>typedef Pair<const Key, T> value_type;</code>
	 * 
	 * Internally, the elements in a {@link TreeMultiMap}are always sorted by its key following a 
	 * strict weak ordering criterion indicated by its internal comparison method (of {@link less}).
	 *
	 * {@link TreeMultiMap}containers are generally slower than {@link HashMap} containers 
	 * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based 
	 * on their order.
	 *
	 * {@link TreeMultiMap TreeMultiMaps} are typically implemented as binary search trees.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/map_containers.png" target="_blank"> <
	 * img src="http://samchon.github.io/tstl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /> </a></p>
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
	 *	<dt> Map </dt>
	 *	<dd> 
	 *		Each element associates a <i>key</i> to a <i>mapped value</i>: 
	 *		<i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. 
	 *	</dd>
	 * 
	 *	<dt> Multiple equivalent keys </dt>
	 *	<dd> Multiple elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 *
	 * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
	 * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
	 *
	 * @reference http://www.cplusplus.com/reference/map/multimap
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class TreeMultiMap<Key, T>
		extends base.MultiMap<Key, T>
		implements base.ITreeMap<Key, T>
	{
		/**
		 * @hidden
		 */
		private tree_: base._MultiMapTree<Key, T>;

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
		public constructor(compare: (x: Key, y: Key) => boolean);

		/**
		 * Contruct from elements.
		 *
		 * @param array Elements to be contained.
		 */
		public constructor(array: Array<Pair<Key, T>>);

		/**
		 * Contruct from elements.
		 *
		 * @param array Elements to be contained.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(array: Array<Pair<Key, T>>, compare: (x: Key, y: Key) => boolean);

		/**
		 * Contruct from tuples.
		 *
		 * @param array Tuples to be contained.
		 */
		public constructor(array: Array<[Key, T]>);

		/**
		 * Contruct from tuples.
		 *
		 * @param array Tuples to be contained.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(array: Array<[Key, T]>, compare: (x: Key, y: Key) => boolean);

		/**
		 * Copy Constructor.
		 *
		 * @param container Another map to copy.
		 */
		public constructor(container: TreeMultiMap<Key, T>);

		/**
		 * Copy Constructor.
		 *
		 * @param container Another map to copy.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(container: TreeMultiMap<Key, T>, compare: (x: Key, y: Key) => boolean);

		/**
		 * Range Constructor.
		 *
		 * @param begin nput interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: base.Iterator<Pair<Key, T>>, end: base.Iterator<Pair<Key, T>>);

		/**
		 * Range Constructor.
		 *
		 * @param begin nput interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor
		(
			begin: base.Iterator<Pair<Key, T>>, end: base.Iterator<Pair<Key, T>>, compare: (x: Key, y: Key) => boolean
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
				let items: Pair<Key, T>[] = args[0]; // PARAMETER
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					compare = args[1];

				fn = this.push.bind(this, ...items);
			}
			else if (args.length >= 2 && args[0] instanceof base.Iterator && args[1] instanceof base.Iterator)
			{
				// RANGE CONSTRUCTOR
				let first: base.Iterator<Pair<Key, T>> = args[0]; // PARAMETER 1
				let last: base.Iterator<Pair<Key, T>> = args[1]; // PARAMETER 2
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
			this.tree_ = new base._MultiMapTree<Key, T>(this, compare);
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
		public find(key: Key): MapIterator<Key, T>
		{
			let node: base._XTreeNode<MapIterator<Key, T>> = this.tree_.find_by_key(key);
			
			if (node == null || equal_to(node.value.first, key) == false)
				return this.end();
			else
				return node.value;
		}

		/**
		 * @inheritdoc
		 */
		public count(key: Key): number
		{
			let it = this.find(key);
			let cnt: number = 0;

			for (; !it.equals(this.end()) && equal_to(it.first, key); it = it.next())
				cnt++;

			return cnt;
		}

		/**
		 * @inheritdoc
		 */
		public key_comp(): (x: Key, y: Key) => boolean
		{
			return this.tree_.key_comp();
		}

		/**
		 * @inheritdoc
		 */
		public value_comp(): (x: Pair<Key, T>, y: Pair<Key, T>) => boolean
		{
			return this.tree_.value_comp();
		}

		/**
		 * @inheritdoc
		 */
		public lower_bound(key: Key): MapIterator<Key, T>
		{
			return this.tree_.lower_bound(key);
		}

		/**
		 * @inheritdoc
		 */
		public upper_bound(key: Key): MapIterator<Key, T>
		{
			return this.tree_.upper_bound(key);
		}

		/**
		 * @inheritdoc
		 */
		public equal_range(key: Key): Pair<MapIterator<Key, T>, MapIterator<Key, T>>
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
		protected _Insert_by_pair(pair: Pair<Key, T>): MapIterator<Key, T>
		{
			// FIND POSITION TO INSERT
			let it: MapIterator<Key, T> = this.upper_bound(pair.first);

			// ITERATOR TO RETURN
			it = this["data_"].insert(it, pair);
			this._Handle_insert(it, it.next()); // POST-PROCESS

			return it;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_hint(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>
		{
			let key: Key = pair.first;

			//--------
			// INSERT BRANCH
			//--------
			// prev < current < hint
			let prev: MapIterator<Key, T> = hint.prev();
			let keys: Vector<Key> = new Vector<Key>();

			// CONSTRUCT KEYS
			if (!prev.equals(this.end()) && !equal_to(prev.first, key))
				keys.push_back(prev.first); // NOT END() AND DIFFERENT WITH KEY

			keys.push_back(key); // NEW ITEM'S KEY

			if (!hint.equals(this.end()) && !equal_to(hint.first, key))
				keys.push_back(hint.first);

			// IS THE HINT VALID ?
			let ret: MapIterator<Key, T>;
			
			if (is_sorted(keys.begin(), keys.end(), this.key_comp()))
			{
				// CORRECT HINT
				ret = this["data_"].insert(hint, pair);

				// POST-PROCESS
				this._Handle_insert(ret, ret.next());
			}
			else // INVALID HINT
				ret = this._Insert_by_pair(pair);

			return ret;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<L extends Key, U extends T, InputIterator extends base.Iterator<Pair<L, U>>>
			(first: InputIterator, last: InputIterator): void
		{
			for (; !first.equals(last); first = first.next() as InputIterator)
				this._Insert_by_pair(make_pair<Key, T>(first.value.first, first.value.second));
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected _Handle_insert(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
		{
			this.tree_.insert(first);
		}

		/**
		 * @hidden
		 */
		protected _Handle_erase(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
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
		 * {@link TreeMapMulti map} of the same type. Sizes abd container type may differ.
		 * 
		 * After the call to this member function, the elements in this container are those which were 
		 * in <i>obj</i> before the call, and the elements of <i>obj</i> are those which were in this. All 
		 * iterators, references and pointers remain valid for the swapped objects.
		 *
		 * Notice that a non-member function exists with the same name, {@link swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function.
		 * 
		 * @param obj Another {@link TreeMapMulti map container} of the same type of elements as this (i.e.,
		 *			  with the same template parameters, <b>Key</b> and <b>T</b>) whose content is swapped 
		 *			  with that of this {@link TreeMapMulti container}.
		 */
		public swap(obj: TreeMultiMap<Key, T>): void;

		/**
		 * @inheritdoc
		 */
		public swap(obj: base.Container<Pair<Key, T>>): void;

		/**
		 * @inheritdoc
		 */
		public swap(obj: TreeMultiMap<Key, T> | base.Container<Pair<Key, T>>): void
		{
			if (obj instanceof TreeMultiMap && this.key_comp() == obj.key_comp())
			{
				this._Swap(obj);
				[this.tree_, obj.tree_] = [obj.tree_, this.tree_];
			}
			else
				super.swap(obj);
		}
	}
}