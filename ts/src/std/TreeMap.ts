/// <reference path="API.ts" />

/// <reference path="base/UniqueMap.ts" />
/// <reference path="base/MultiMap.ts" />

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
	 * <p> <a href="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" style="max-width: 100%" /> </p>
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
		 * <i>RB-Tree+</i> object for implemeting the {@link TreeMap}.
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
		public constructor(container: base.MapContainer<Key, T>);

		/**
		 * Copy Constructor.
		 *
		 * @param container Another map to copy.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(container: base.MapContainer<Key, T>, compare: (x: Key, y: Key) => boolean);

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
			super();
			
			// CONSTRUCT TREE WITH COMPARE
			let compare: (x: Key, y: Key) => boolean = std.less;
			let fn: Function = null;

			// OVERLOADINGS
			if (args.length == 0) { } // DO NOTHING
			else if (args.length >= 1 && (args[0] instanceof base.Container || args[0] instanceof Vector))
			{
				fn = this.construct_from_container;

				if (args.length == 2)
					compare = args[1];
			}
			else if (args.length >= 1 && args[0] instanceof Array)
			{
				fn = this.construct_from_array;

				if (args.length == 2)
					compare = args[1];
			}
			else if (args.length >= 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
			{
				fn = this.construct_from_range;

				if (args.length == 3)
					compare = args[2];
			}
			else if (args.length == 1)
				compare = args[0];

			// CONSTRUCT TREE
			this.tree_ = new base.PairTree<Key, T>(this, compare);

			// BRANCH - CALL OVERLOADED CONSTRUCTORS
			if (fn != null)
				fn.apply(this, args);
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
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected insert_by_pair(pair: Pair<Key, T>): any
		{
			let node = this.tree_.find(pair.first);

			// IF EQUALS, THEN RETURN FALSE
			if (node != null && std.equal_to(node.value.first, pair.first) == true)
				return std.make_pair(node.value, false);
			
			// INSERTS
			let it: MapIterator<Key, T>;
			
			if (node == null)
				it = this.end();
			else if (this.tree_.key_comp()(node.value.first, pair.first) == true)
				it = node.value.next();
			else
				it = node.value;

			// ITERATOR TO RETURN
			it = new MapIterator<Key, T>(this, this.data_.insert(it.get_list_iterator(), pair));
			this.handle_insert(it, it.next()); // POST-PROCESS

			return std.make_pair(it, true);
		}

		/**
		 * @hidden
		 */
		protected insert_by_hint(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>
		{
			// FIND KEY
			if (this.has(pair.first) == true)
				return this.end();

			// VALIDATE HINT
			let ret: MapIterator<Key, T>;
			let compare = this.tree_.key_comp();

			// hint < current && current < next
			if (compare(hint.first, pair.first) == true
				&& (hint.next().equal_to(this.end()) || compare(pair.first, hint.next().first) == true))
			{ 
				///////
				// RIGHT HINT
				///////
				// INSERT
				ret = new MapIterator<Key, T>(this, this.data_.insert(hint.get_list_iterator(), pair));

				// POST-PROCESS
				this.handle_insert(ret, ret.next());
			}
			else
			{ 
				///////
				// WRONG HINT
				///////
				// INSERT BY AUTOMATIC NODE FINDING
				ret = this.insert_by_pair(pair).first;
			}
			return ret;
		}

		/**
		 * @hidden
		 */
		protected insert_by_range<L extends Key, U extends T, InputIterator extends Iterator<Pair<L, U>>>
			(first: InputIterator, last: InputIterator): void
		{
			for (; !first.equal_to(last); first = first.next() as InputIterator)
				this.insert_by_pair(make_pair<Key, T>(first.value.first, first.value.second));
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handle_insert(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
		{
			this.tree_.insert(first);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
		{
			for (; !first.equal_to(last); first = first.next())
				this.tree_.erase(last);
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		/**
		 * @inheritdoc
		 */
		public swap(obj: base.UniqueMap<Key, T>): void
		{
			if (obj instanceof TreeMap)
				this.swap_tree_map(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_tree_map(obj: TreeMap<Key, T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.tree_, obj.tree_] = [obj.tree_, this.tree_];
		}
	}
}

namespace std
{
	/**
	 * <p> Tree-structured multiple-key map. </p>
	 *
	 * <p> {@link TreeMultiMap TreeMultiMaps} are associative containers that store elements formed by a combination of 
	 * a <i>key value</i> and a <i>mapped value</i>, following a specific order, and where multiple elements can 
	 * have equivalent keys. </p>
	 *
	 * <p> In a {@link TreeMultiMap}, the <i>key values</i> are generally used to sort and uniquely identify 
	 * the elements, while the <i>mapped values</i> store the content associated to this <i>key</i>. The types of 
	 * <i>key</i> and <i>mapped value</i> may differ, and are grouped together in member type 
	 * <code>value_type</code>, which is a {@link Pair} type combining both: </p>
	 * 
	 * <p> <code>typedef Pair<const Key, T> value_type;</code> </p>
	 * 
	 * <p> Internally, the elements in a {@link TreeMultiMap}are always sorted by its key following a 
	 * strict weak ordering criterion indicated by its internal comparison method (of {@link less}). </p>
	 *
	 * <p> {@link TreeMultiMap}containers are generally slower than {@link HashMap} containers 
	 * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based 
	 * on their order. </p>
	 *
	 * <p> {@link TreeMultiMap TreeMultiMaps} are typically implemented as binary search trees. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" target="_blank"> <
	 * img src="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" style="max-width: 100%" /> </p>
	 * 
	 * <h3> Container properties </h3>
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
		public constructor(container: base.MapContainer<Key, T>);

		/**
		 * Copy Constructor.
		 *
		 * @param container Another map to copy.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(container: base.MapContainer<Key, T>, compare: (x: Key, y: Key) => boolean);

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
				begin: Iterator<Pair<Key, T>>, end: Iterator<Pair<Key, T>>, compare: (x: Key, y: Key) => boolean
			);
		
		public constructor(...args: any[])
		{
			super();

			// CONSTRUCT TREE WITH COMPARE
			let compare: (x: Key, y: Key) => boolean = std.less;
			let fn: Function = null;

			// OVERLOADINGS
			if (args.length == 0) { } // DO NOTHING
			else if (args.length >= 1 && (args[0] instanceof base.Container || args[0] instanceof Vector))
			{
				fn = this.construct_from_container;

				if (args.length == 2)
					compare = args[1];
			}
			else if (args.length >= 1 && args[0] instanceof Array)
			{
				fn = this.construct_from_array;

				if (args.length == 2)
					compare = args[1];
			}
			else if (args.length >= 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
			{
				fn = this.construct_from_range;

				if (args.length == 3)
					compare = args[2];
			}
			else if (args.length == 1)
				compare = args[0];

			// CONSTRUCT TREE
			this.tree_ = new base.PairTree<Key, T>(this, compare);

			// BRANCH - CALL OVERLOADED CONSTRUCTORS
			if (fn != null)
				fn.apply(this, args);
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
		public count(key: Key): number
		{
			let it = this.find(key);
			let cnt: number = 0;

			for (; !it.equal_to(this.end()) && std.equal_to(it.first, key); it = it.next())
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
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected insert_by_pair(pair: Pair<Key, T>): any
		{
			let node = this.tree_.find(pair.first);
			let it: MapIterator<Key, T>;

			if (node == null)
			{
				it = this.end();
			}
			else if (std.equal_to(node.value.first, pair.first) == true)
			{
				it = node.value.next();
			}
			else if (this.tree_.key_comp()(node.value.first, pair.first) == true)
			{
				it = node.value.next();

				while (it.equal_to(this.end()) == false && this.tree_.key_comp()(it.first, pair.first))
					it = it.next();
			}
			else
				it = node.value;

			// ITERATOR TO RETURN
			it = new MapIterator<Key, T>(this, this.data_.insert(it.get_list_iterator(), pair));
			this.handle_insert(it, it.next()); // POST-PROCESS

			return it;
		}

		/**
		 * @hidden
		 */
		protected insert_by_hint(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>
		{
			// FIND KEY
			if (this.has(pair.first) == true)
				return this.end();

			// VALIDATE HINT
			let ret: MapIterator<Key, T>;
			let compare = this.tree_.key_comp();

			// hint <= current && current <= next
			if ((compare(hint.first, pair.first) || std.equal_to(hint.first, pair.first))
				&& (hint.next().equal_to(this.end()) || (compare(pair.first, hint.next().first) || std.equal_to(pair.first, hint.next().first))))
			{
				///////
				// RIGHT HINT
				///////
				// INSERT
				ret = new MapIterator<Key, T>(this, this.data_.insert(hint.get_list_iterator(), pair));

				// POST-PROCESS
				this.handle_insert(ret, ret.next());
			}
			else
			{
				///////
				// WRONG HINT
				///////
				// INSERT BY AUTOMATIC NODE FINDING
				ret = this.insert_by_pair(pair);
			}
			return ret;
		}

		/**
		 * @hidden
		 */
		protected insert_by_range<L extends Key, U extends T, InputIterator extends Iterator<Pair<L, U>>>
			(first: InputIterator, last: InputIterator): void
		{
			for (; !first.equal_to(last); first = first.next() as InputIterator)
				this.insert_by_pair(make_pair<Key, T>(first.value.first, first.value.second));
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handle_insert(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
		{
			this.tree_.insert(first);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void
		{
			for (; !first.equal_to(last); first = first.next())
				this.tree_.erase(last);
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		/**
		 * @inheritdoc
		 */
		public swap(obj: base.MultiMap<Key, T>): void
		{
			if (obj instanceof TreeMultiMap)
				this.swap_tree_multimap(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_tree_multimap(obj: TreeMultiMap<Key, T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.tree_, obj.tree_] = [obj.tree_, this.tree_];
		}
	}
}