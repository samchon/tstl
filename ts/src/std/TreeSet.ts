/// <reference path="API.ts" />

/// <reference path="base/UniqueSet.ts" />
/// <reference path="base/MultiSet.ts" />

namespace std
{
	/**
	 * <p> Tree-structured set, <code>std::set</code> of STL. </p>
	 *
	 * <p> {@link TreeSet}s are containers that store unique elements following a specific order. </p>
	 *
	 * <p> In a {@link TreeSet}, the value of an element also identifies it (the value is itself the 
	 * <i>key</i>, of type <i>T</i>), and each value must be unique. The value of the elements in a 
	 * {@link TreeSet} cannot be modified once in the container (the elements are always const), but they 
	 * can be inserted or removed from the  </p>
	 *
	 * <p> Internally, the elements in a {@link TreeSet} are always sorted following a specific strict weak 
	 * ordering criterion indicated by its internal comparison method (of {@link less}). </p>
	 *
	 * <p> {@link TreeSet} containers are generally slower than {@link HashSet} containers to access 
	 * individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on their 
	 * order. </p>
	 *
	 * <p> {@link TreeSet}s are typically implemented as binary search trees. </p>
	 * 
	 * <p> <img src="../assets/images/design/set_containers.png" width="100%" /> </p>
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
	{
		/**
		 * <i>RB-Tree+</i> object for implemeting the {@link TreeSet}.
		 */
		private tree_: base.AtomicTree<T>;

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
		public constructor(compare: (left: T, right: T) => boolean);

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
		public constructor(array: Array<T>, compare: (left: T, right: T) => boolean);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: base.IContainer<T>);

		/**
		 * Copy Constructor with compare.
		 * 
		 * @param container A container to be copied.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(container: base.IContainer<T>, compare: (left: T, right: T) => boolean);

		/**
		 * Range Constructor.
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: Iterator<T>, end: Iterator<T>);

		/**
		 * Range Constructor with compare.
		 * 
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor
			(
				begin: Iterator<T>, end: Iterator<T>,
				compare: (left: T, right: T) => boolean
			);
		
		public constructor(...args: any[])
		{
			super();

			// CONSTRUCT TREE WITH COMPARE
			let compare: (left: T, right: T) => boolean = std.less;
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
			this.tree_ = new base.AtomicTree<T>(compare);

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
			this.tree_ = new base.AtomicTree<T>(this.tree_.get_compare());

			super.clear();
		}
		
		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public find(val: T): SetIterator<T>
		{
			let node = this.tree_.find(val);

			if (node == null || std.equal_to(node.value.value, val) == false)
				return this.end();
			else
				return node.value;
		}

		/**
		 * <p> Return iterator to lower bound. </p>
		 *
		 * <p> Returns an iterator pointing to the first element in the container which is not considered to go 
		 * before <i>val</i> (i.e., either it is equivalent or goes after). </p>
		 *
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(element, val) would return false. </p>
		 * 
		 * <p> If the {@link Set} class is instantiated with the default comparison type ({@link less}), the 
		 * function returns an iterator to the first element that is not less than <i>val</i>. </p>
		 * 
		 * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, 
		 * except in the case that the {@link Set} contains an element equivalent to <i>val</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} returns 
		 * an iterator pointing to the next element. </p>
		 * 
		 * @param val Value to compare.
		 * 
		 * @return An iterator to the the first element in the container which is not considered to go before 
		 *		   <i>val</i>, or {@link Set.end} if all elements are considered to go before <i>val</i>.
		 */
		public lower_bound(val: T): SetIterator<T>
		{
			let node: base.XTreeNode<SetIterator<T>> = this.tree_.find(val);

			if (node == null)
				return this.end();
			else if (std.less(node.value.value, val))
				return node.value.next();
			else
				return node.value;
		}

		/**
		 * <p> Return iterator to upper bound. </p>
		 *
		 * <p> Returns an iterator pointing to the first element in the container which is not considered to go 
		 * after <i>val</i>. </p>
		 *
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(element, val) would return true. </p>
		 * 
		 * <p> If the {@link Set} class is instantiated with the default comparison type ({@link less}), the 
		 * function returns an iterator to the first element that is greater than <i>val</i>. </p>
		 * 
		 * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except 
		 * in the case that the {@link Set} contains an element equivalent to <i>val</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} returns 
		 * an iterator pointing to the next element. </p>
		 * 
		 * @param val Value to compare.
		 * 
		 * @return An iterator to the the first element in the container which is not considered to go before 
		 *		   <i>val</i>, or {@link Set.end} if all elements are considered to go after <i>val</i>.
		 */
		public upper_bound(val: T): SetIterator<T>
		{
			let node: base.XTreeNode<SetIterator<T>> = this.tree_.find(val);

			if (node == null)
				return this.end();
			else if (!std.equal_to(node.value.value, val) && !std.less(node.value.value, val))
				return node.value;
			else
				return node.value.next();
		}

		/**
		 * <p> Get range of equal elements. </p>
		 * 
		 * <p> Because all elements in a {@link Set} container are unique, the range returned will contain a 
		 * single element at most. </p>
		 * 
		 * <p> If no matches are found, the range returned has a length of zero, with both iterators pointing to 
		 * the first element that is considered to go after <i>val</i> according to the container's 
		 * internal comparison object (key_comp). </p>
		 * 
		 * <p> Two elements of a {@link Set} are considered equivalent if the container's comparison object 
		 * returns false reflexively (i.e., no matter the order in which the elements are passed as arguments). 
		 * </p>
		 * 
		 * @param val Value to search for.
		 *
		 * @return The function returns a {@link Pair}, whose member {@link Pair.first} is the lower bound of
		 *		   the range (the same as {@link lower_bound}), and {@link Pair.second} is the upper bound
		 *		   (the same as {@link upper_bound}).
		 */
		public equal_range(val: T): Pair<SetIterator<T>, SetIterator<T>>
		{
			return new Pair<SetIterator<T>, SetIterator<T>>(this.lower_bound(val), this.upper_bound(val));
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
		protected insert_by_val(val: T): any
		{
			let node = this.tree_.find(val);

			// IF EQUALS, THEN RETURN FALSE
			if (node != null && std.equal_to(node.value.value, val) == true)
				return make_pair(node.value, false);
			
			// FIND NODE
			let it: SetIterator<T>;

			if (node == null)
				it = this.end();
			else if (std.less(node.value.value, val) == true)
				it = node.value.next();
			else
				it = node.value;

			/////
			// INSERTS
			/////
			it = new SetIterator<T>(this, this.data_.insert(it.get_list_iterator(), val));
			this.handle_insert(it, it.next()); // POST-PROCESS

			return make_pair(it, true);
		}

		protected insert_by_hint(hint: SetIterator<T>, val: T): SetIterator<T>
		{
			// FIND KEY
			if (this.has(val) == true)
				return this.end();

			// VALIDATE HINT
			let ret: SetIterator<T>;
			let compare = this.tree_.get_compare();

			// hint < current && current < next
			if (compare(hint.value, val) == true
				&& (hint.next().equal_to(this.end()) || compare(val, hint.next().value) == true))
			{
				///////
				// RIGHT HINT
				///////
				// INSERT
				ret = new SetIterator<T>(this, this.data_.insert(hint.get_list_iterator(), val));

				// POST-PROCESS
				this.handle_insert(ret, ret.next());
			}
			else
			{
				///////
				// WRONG HINT
				///////
				// INSERT BY AUTOMATIC NODE FINDING
				ret = this.insert_by_val(val).first;
			}
			return ret;
		}

		/**
		 * @hidden
		 */
		protected insert_by_range<U extends T, InputIterator extends Iterator<U>>
			(first: InputIterator, last: InputIterator): void
		{
			for (; !first.equal_to(last); first = first.next() as InputIterator)
				this.insert_by_val(first.value);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handle_insert(first: SetIterator<T>, last: SetIterator<T>): void
		{
			this.tree_.insert(first);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(first: SetIterator<T>, last: SetIterator<T>): void
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
		public swap(obj: base.UniqueSet<T>): void
		{
			if (obj instanceof TreeSet)
				this.swap_tree_set(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_tree_set(obj: TreeSet<T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.tree_, obj.tree_] = [obj.tree_, this.tree_];
		}
	}

	/**
	 * <p> Tree-structured multiple-key set. </p>
	 *
	 * <p> {@link TreeMultiSet TreeMultiSets} are containers that store elements following a specific order, and 
	 * where multiple elements can have equivalent values. </p>
	 *
	 * <p> In a {@link TreeMultiSet}, the value of an element also identifies it (the value is itself 
	 * the <i>key</i>, of type <i>T</i>). The value of the elements in a {@link TreeMultiSet} cannot 
	 * be modified once in the container (the elements are always const), but they can be inserted or removed 
	 * from the  </p>
	 *
	 * <p> Internally, the elements in a {@link TreeMultiSet TreeMultiSets} are always sorted following a strict 
	 * weak ordering criterion indicated by its internal comparison method (of {@link IComparable.less less}). </p>
	 *
	 * <p> {@link TreeMultiSet} containers are generally slower than {@link HashMultiSet} containers 
	 * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on 
	 * their order. </p>
	 *
	 * <p> {@link TreeMultiSet TreeMultiSets} are typically implemented as binary search trees. </p>
	 * 
	 * <p> <img src="../assets/images/design/set_containers.png" width="100%" /> </p>
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
	 *	<dt> Set </dt>
	 *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
	 *
	 *	<dt> Multiple equivalent keys </dt>
	 *	<dd> Multiple elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 * 
	 * @param <T> Type of the elements. Each element in a {@link TreeMultiSet} container is also identified 
	 *			  by this value (each value is itself also the element's <i>key</i>).
	 *
	 * @reference http://www.cplusplus.com/reference/set/multiset
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class TreeMultiSet<T>
		extends base.MultiSet<T>
	{
		/**
		 * <i>RB-Tree+</i> object for implemeting the {@link TreeMultiSet}.
		 */
		private tree_: base.AtomicTree<T>;

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
		public constructor(compare: (left: T, right: T) => boolean);

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
		public constructor(array: Array<T>, compare: (left: T, right: T) => boolean);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: base.Container<T>);

		/**
		 * Copy Constructor with compare.
		 * 
		 * @param container A container to be copied.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(container: base.Container<T>, compare: (left: T, right: T) => boolean);

		/**
		 * Range Constructor.
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: Iterator<T>, end: Iterator<T>);

		/**
		 * Construct from range and compare.
		 * 
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor
			(
				begin: Iterator<T>, end: Iterator<T>,
				compare: (left: T, right: T) => boolean
			);
		
		public constructor(...args: any[])
		{
			super();

			// CONSTRUCT TREE WITH COMPARE
			let compare: (left: T, right: T) => boolean = std.less;
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
			this.tree_ = new base.AtomicTree<T>(compare);

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
			this.tree_ = new base.AtomicTree<T>(this.tree_.get_compare());

			super.clear();
		}

		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public find(val: T): SetIterator<T>
		{
			var node = this.tree_.find(val);

			if (node == null || std.equal_to(val, node.value.value) == false)
				return this.end();
			else
				return node.value;
		}

		/**
		 * @inheritdoc
		 */
		public count(val: T): number
		{
			let it = this.find(val);
			let cnt: number = 0;

			for (; !it.equal_to(this.end()) && std.equal_to(it.value, val); it = it.next())
				cnt++;

			return cnt;
		}

		/**
		 * <p> Return iterator to lower bound. </p>
		 * 
		 * <p> Returns an iterator pointing to the first element in the container which is not considered to 
		 * go before <i>val</i> (i.e., either it is equivalent or goes after). </p>
		 * 
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(element,val) would return false. </p>
		 * 
		 * <p> If the {@link TreeMultiSet} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element that is not less than <i>val</i>. </p>

		 * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except 
		 * in the case that the {@link TreeMultiSet} contains elements equivalent to <i>val</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to the first of such elements, whereas 
		 * {@link upper_bound} returns an iterator pointing to the element following the last. </p>
		 * 
		 * @param val Value to compare.
		 *
		 * @return An iterator to the the first element in the container which is not considered to go before 
		 *		   <i>val</i>, or {@link TreeMultiSet.end} if all elements are considered to go before <i>val</i>.
		 */
		public lower_bound(val: T): SetIterator<T>
		{
			let node: base.XTreeNode<SetIterator<T>> = this.tree_.find(val);

			if (node == null)
				return this.end();
			else if (std.equal_to(node.value.value, val))
				return node.value;
			else
			{
				let it: SetIterator<T> = node.value;
				while (!std.equal_to(it, this.end()) && std.less(it.value, val))
					it = it.next();

				return it;
			}
		}

		/**
		 * <p> Return iterator to upper bound. </p>
		 * 
		 * <p> Returns an iterator pointing to the first element in the container which is considered to go after 
		 * <i>val</i>. </p>

		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(val,element) would return true. </p>

		 * <p> If the {@code TreeMultiSet} class is instantiated with the default comparison type (less), the 
		 * function returns an iterator to the first element that is greater than <i>val</i>. </p>
		 * 
		 * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except 
		 * in the case that the {@TreeMultiSet} contains elements equivalent to <i>val</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to the first of such elements, whereas 
		 * {@link upper_bound} returns an iterator pointing to the element following the last. </p>
		 * 
		 * @param val Value to compare.
		 *
		 * @return An iterator to the the first element in the container which is considered to go after 
		 *		   <i>val</i>, or {@link TreeMultiSet.end} if no elements are considered to go after <i>val</i>.
		 */
		public upper_bound(val: T): SetIterator<T>
		{
			let node: base.XTreeNode<SetIterator<T>> = this.tree_.find(val);

			if (node == null)
				return this.end();
			else
			{
				let it: SetIterator<T> = node.value;
				while (!std.equal_to(it, this.end()) && (std.equal_to(it.value, val) || std.less(it.value, val)))
					it = it.next();

				return it;
			}
		}

		/**
		 * <p> Get range of equal elements. </p>
		 * 
		 * <p> Returns the bounds of a range that includes all the elements in the container that are equivalent 
		 * to <i>val</i>. </p>
		 * 
		 * <p> If no matches are found, the range returned has a length of zero, with both iterators pointing to 
		 * the first element that is considered to go after val according to the container's 
		 * internal comparison object (key_comp). </p>
		 * 
		 * <p> Two elements of a multiset are considered equivalent if the container's comparison object returns 
		 * false reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
		 *
		 * @param key Value to search for.
		 * 
		 * @return The function returns a {@link Pair}, whose member {@link Pair.first} is the lower bound of 
		 *		   the range (the same as {@link lower_bound}), and {@link Pair.second} is the upper bound 
		 *		   (the same as {@link upper_bound}).
		 */
		public equal_range(val: T): Pair<SetIterator<T>, SetIterator<T>>
		{
			return new Pair<SetIterator<T>, SetIterator<T>>(this.lower_bound(val), this.upper_bound(val));
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
		protected insert_by_val(val: T): any
		{
			var node = this.tree_.find(val);
			var it: SetIterator<T>;

			// FIND NODE
			if (node == null)
			{
				it = this.end();
			}
			else if (std.equal_to(node.value.value, val) == true)
			{
				it = node.value.next();
			}
			else if (std.less(node.value.value, val) == true)
			{
				it = node.value.next();

				while (it.equal_to(this.end()) == false && std.less(it.value, val))
					it = it.next();
			}
			else
			{
				it = node.value;
			}

			/////
			// INSERTS
			/////
			it = new SetIterator<T>(this, this.data_.insert(it.get_list_iterator(), val));
			this.handle_insert(it, it.next()); // POST-PROCESS

			return it;
		}

		/**
		 * @hidden
		 */
		protected insert_by_hint(hint: SetIterator<T>, val: T): SetIterator<T>
		{
			// VALIDATE HINT
			let ret: SetIterator<T>;
			let compare = this.tree_.get_compare();

			// hint <= current && current <= next
			if ((compare(hint.value, val) || std.equal_to(hint.value, val))
				&& (hint.next().equal_to(this.end()) || (compare(val, hint.next().value) || std.equal_to(val, hint.next().value))))
			{
				///////
				// RIGHT HINT
				///////
				// INSERT
				ret = new SetIterator<T>(this, this.data_.insert(hint.get_list_iterator(), val));

				// POST-PROCESS
				this.handle_insert(ret, ret.next());
			}
			else
			{
				///////
				// WRONG HINT
				///////
				// INSERT BY AUTOMATIC NODE FINDING
				ret = this.insert_by_val(val);
			}
			return ret;
		}

		/**
		 * @hidden
		 */
		protected insert_by_range<U extends T, InputIterator extends Iterator<U>>
			(first: InputIterator, last: InputIterator): void
		{
			for (; !first.equal_to(last); first = first.next() as InputIterator)
				this.insert_by_val(first.value);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handle_insert(first: SetIterator<T>, last: SetIterator<T>): void
		{
			this.tree_.insert(first);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(first: SetIterator<T>, last: SetIterator<T>): void
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
		public swap(obj: base.MultiSet<T>): void
		{
			if (obj instanceof TreeMultiSet)
				this.swap_tree_set(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_tree_set(obj: TreeMultiSet<T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
			[this.tree_, obj.tree_] = [obj.tree_, this.tree_];
		}
	}
}