/// <reference path="API.ts" />

/// <reference path="base/UniqueMap.ts" />

namespace std.TreeMap
{
	export type iterator<Key, T> = std.MapIterator<Key, T>;
	export type reverse_iterator<Key, T> = std.MapReverseIterator<Key, T>;
}

namespace std
{
	/**
	 * <p> Tree-structured map, <code>std::map</code> of STL. </p>
	 *
	 * <p> {@link TreeMap TreeMaps} are associative containers that store elements formed by a combination of a 
	 * <i>key value</i> (<i>Key</i>) and a <i>mapped value</i> (<i>T</i>), following order. </p>
	 *
	 * <p> In a {@link TreeMap}, the <i>key values</i> are generally used to sort and uniquely identify the elements, 
	 * while the <i>mapped values</i> store the content associated to this key. The types of <i>key</i> and 
	 * <i>mapped value</i> may differ, and are grouped together in member type <i>value_type</i>, which is a {@link Pair} 
	 * type combining both: </p>
	 *
	 * <p> <code>typedef Pair<Key, T> value_type;</code> </p>
	 *
	 * <p> Internally, the elements in a {@link TreeMap} are always sorted by its <i>key</i> following a 
	 * <i>strict weak ordering</i> criterion indicated by its internal comparison method {@link less}.
	 *
	 * <p> {@link TreeMap} containers are generally slower than {@link HashMap HashMap} containers to access individual 
	 * elements by their <i>key</i>, but they allow the direct iteration on subsets based on their order. </p>
	 *
	 * <p> {@link TreeMap}s are typically implemented as binary search trees. </p>
	 *
	 * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /> </a></p>
	 * 
	 * <h3> Container properties </h3>
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute 
	 *		 position in the container. </dd>
	 * 
	 *	<dt> Ordered </dt>
	 *	<dd> The elements in the container follow a strict order at all times. All inserted elements are 
	 *		 given a position in this order. </dd>
	 *
	 *	<dt> Map </dt>
	 *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>: 
	 *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
	 *
	 *	<dt> Unique keys </dt>
	 *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 *
	 * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
	 * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
	 *
	 * @reference http://www.cplusplus.com/reference/map/map
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class TreeMap<Key, T>
		extends base.UniqueMap<Key, T>
		implements base.ITreeMap<Key, T>
	{
		/**
		 * @hidden
		 */
		private tree_: base.PairTree<Key, T>;

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
		public constructor(container: TreeMap<Key, T>);

		/**
		 * Copy Constructor.
		 *
		 * @param container Another map to copy.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(container: TreeMap<Key, T>, compare: (x: Key, y: Key) => boolean);

		/**
		 * Range Constructor.
		 *
		 * @param begin nput interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: Iterator<Pair<Key, T>>, end: Iterator<Pair<Key, T>>);

		/**
		 * Range Constructor.
		 *
		 * @param begin nput interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor
			(
				begin: Iterator<Pair<Key, T>>, end: Iterator<Pair<Key, T>>,
				compare: (x: Key, y: Key) => boolean
			);
		
		public constructor(...args: any[])
		{
			// INIT MEMBERS
			super();
			this.tree_ = new base.PairTree<Key, T>(this);
			
			if (args.length >= 1 && args[0] instanceof TreeMap)
			{
				// COPY CONSTRUCTOR
				let container: TreeMap<Key, T> = args[0]; // PARAMETER
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					this.tree_["compare_"] = (args[1]);

				this.assign(container.begin(), container.end());
			}
			else if (args.length >= 1 && args[0] instanceof Array)
			{
				// INITIALIZER LIST CONSTRUCTOR
				let items: Pair<Key, T>[] = args[0]; // PARAMETER
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					this.tree_["compare_"] = (args[1]);

				this.push(...items);
			}
			else if (args.length >= 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
			{
				// RANGE CONSTRUCTOR
				let first: Iterator<Pair<Key, T>> = args[0]; // PARAMETER 1
				let last: Iterator<Pair<Key, T>> = args[1]; // PARAMETER 2
				if (args.length == 2) // SPECIFIED COMPARISON FUNCTION
					this.tree_["compare_"] = (args[2]);

				this.assign(first, last);
			}
			else if (args.length == 1)
			{
				// DEFAULT CONSTRUCTOR WITH SPECIFIED COMPARISON FUNCTION
				this.tree_["compare_"] = (args[0]);
			}
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
			let node = this.tree_.find(key);

			if (node == null || std.equal_to(node.value.first, key) == false)
				return this.end();
			else
				return node.value;
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
		protected _Insert_by_pair(pair: Pair<Key, T>): any
		{
			let node = this.tree_.find(pair.first);

			// IF EQUALS, THEN RETURN FALSE
			if (node != null && std.equal_to(node.value.first, pair.first) == true)
				return std.make_pair(node.value, false);
			
			// INSERTS
			let it: MapIterator<Key, T>;
			
			if (node == null)
				it = this.end();
			else if (this.key_comp()(node.value.first, pair.first) == true)
				it = node.value.next();
			else
				it = node.value;

			// ITERATOR TO RETURN
			it = this["data_"].insert(it, pair);
			this._Handle_insert(it, it.next()); // POST-PROCESS

			return std.make_pair(it, true);
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_hint(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>
		{
			// FIND KEY
			if (this.has(pair.first) == true)
				return this.end();

			// VALIDATE HINT
			let ret: MapIterator<Key, T>;
			let compare = this.key_comp();

			// hint < current && current < next
			if (compare(hint.first, pair.first) == true
				&& (hint.next().equal_to(this.end()) || compare(pair.first, hint.next().first) == true))
			{ 
				///////
				// RIGHT HINT
				///////
				// INSERT
				ret = this["data_"].insert(hint, pair);

				// POST-PROCESS
				this._Handle_insert(ret, ret.next());
			}
			else
			{ 
				///////
				// WRONG HINT
				///////
				// INSERT BY AUTOMATIC NODE FINDING
				ret = this._Insert_by_pair(pair).first;
			}
			return ret;
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<L extends Key, U extends T, InputIterator extends Iterator<Pair<L, U>>>
			(first: InputIterator, last: InputIterator): void
		{
			for (; !first.equal_to(last); first = first.next() as InputIterator)
				this._Insert_by_pair(make_pair<Key, T>(first.value.first, first.value.second));
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected _Handle_insert(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
		{
			this.tree_.insert(first);
		}

		/**
		 * @inheritdoc
		 */
		protected _Handle_erase(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
		{
			for (; !first.equal_to(last); first = first.next())
				this.tree_.erase(last);
		}

		/* ---------------------------------------------------------
			SWAP
		--------------------------------------------------------- */
		/**
		 * <p> Swap content. </p>
		 * 
		 * <p> Exchanges the content of the container by the content of <i>obj</i>, which is another 
		 * {@link TreeMap map} of the same type. Sizes abd container type may differ. </p>
		 * 
		 * <p> After the call to this member function, the elements in this container are those which were 
		 * in <i>obj</i> before the call, and the elements of <i>obj</i> are those which were in this. All 
		 * iterators, references and pointers remain valid for the swapped objects. </p>
		 *
		 * <p> Notice that a non-member function exists with the same name, {@link std.swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function. </p>
		 * 
		 * @param obj Another {@link TreeMap map container} of the same type of elements as this (i.e.,
		 *			  with the same template parameters, <b>Key</b> and <b>T</b>) whose content is swapped 
		 *			  with that of this {@link TreeMap container}.
		 */
		public swap(obj: TreeMap<Key, T>): void;

		/**
		 * @inheritdoc
		 */
		public swap(obj: base.IContainer<Pair<Key, T>>): void;

		/**
		 * @inheritdoc
		 */
		public swap(obj: TreeMap<Key, T> | base.IContainer<Pair<Key, T>>): void
		{
			if (obj instanceof TreeMap && this.key_comp() == obj.key_comp())
			{
				this._Swap(obj);
				[this.tree_, obj.tree_] = [obj.tree_, this.tree_];
			}
			else
				super.swap(obj);
		}
	}
}