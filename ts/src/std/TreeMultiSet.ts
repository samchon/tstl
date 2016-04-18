/// <reference path="base/container/MultiSet.ts" />

namespace std
{
	/**
	 * <p> Tree-structured multiple-key set. </p>
	 *
	 * <p> {@link TreeMultiSet TreeMultiSets} are containers that store elements following a specific order, and 
	 * where multiple elements can have equivalent values. </p>
	 *
	 * <p> In a {@link TreeMultiSet}, the value of an element also identifies it (the value is itself 
	 * the <i>key</i>, of type <i>T</i>). The value of the elements in a {@link TreeMultiSet} cannot 
	 * be modified once in the container (the elements are always const), but they can be inserted or removed 
	 * from the container. </p>
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
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/set/multiset/ </li>
	 * </ul>
	 * 
	 * @param <T> Type of the elements. Each element in a {@link TreeMultiSet} container is also identified 
	 *			  by this value (each value is itself also the element's <i>key</i>).
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class TreeMultiSet<T>
		extends base.container.MultiSet<T>
	{
		/**
		 * <i>RB-Tree+</i> object for implemeting the {@link TreeMultiSet}.
		 */
		private tree_: base.tree.AtomicTree<T>;

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
		public constructor(container: base.container.Container<T>);

		/**
		 * Copy Constructor with compare.
		 * 
		 * @param container A container to be copied.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor(container: base.container.Container<T>, compare: (left: T, right: T) => boolean);

		/**
		 * Range Constructor.
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);

		/**
		 * Construct from range and compare.
		 * 
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 * @param compare A binary predicate determines order of elements.
		 */
		public constructor
			(
				begin: base.container.Iterator<T>, end: base.container.Iterator<T>,
				compare: (left: T, right: T) => boolean
			);
		
		public constructor(...args: any[])
		{
			super();

			// CONSTRUCT TREE WITH COMPARE
			let compare: (left: T, right: T) => boolean;

			if (args.length == 0 || args[args.length - 1] instanceof Function == false)
				compare = std.less;
			else
				compare = args[args.length - 1];

			this.tree_ = new base.tree.AtomicTree<T>(compare);

			// OVERLOADINGS
			if (args.length >= 1 && args[0] instanceof Array)
			{
				this.construct_from_array(args[0]);
			}
			else if (args.length >= 1 && args[0] instanceof base.container.SetContainer)
			{
				this.construct_from_container(args[0]);
			}
			else if (args.length >= 2 && args[0] instanceof SetIterator && args[1] instanceof SetIterator)
			{
				this.construct_from_range(args[0], args[1]);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<U extends T>
			(begin: base.container.Iterator<U>, end: base.container.Iterator<U>): void
		{
			super.assign(begin, end);
		}

		//public assign<U extends T, InputIterator extends base.container.Iterator<U>>
		//	(begin: InputIterator, end: InputIterator): void
		//{
		//	super.assign(begin, end);
		//}

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			super.clear();

			this.tree_ = new base.tree.AtomicTree<T>();
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

			if (node == null || std.equals(val, node.value.value) == false)
				return this.end();
			else
				return node.value;
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
			let node: base.tree.XTreeNode<SetIterator<T>> = this.tree_.find(val);

			if (node == null)
				return this.end();
			else if (std.equals(node.value.value, val))
				return node.value;
			else
			{
				let it: SetIterator<T> = node.value;
				while (!std.equals(it, this.end()) && std.less(it.value, val))
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
			let node: base.tree.XTreeNode<SetIterator<T>> = this.tree_.find(val);

			if (node == null)
				return this.end();
			else
			{
				let it: SetIterator<T> = node.value;
				while (!std.equals(it, this.end()) && (std.equals(it.value, val) || std.less(it.value, val)))
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

			if (node == null)
			{
				it = this.end();
			}
			else if (std.equals(node.value.value, val) == true)
			{
				it = node.value.next();
			}
			else if (std.less(node.value.value, val) == true)
			{
				it = node.value.next();

				while (it.equals(this.end()) == false && std.less(it.value, val))
					it = it.next();
			}
			else
			{
				it = node.value;
			}

			// ITERATOR TO RETURN
			return this.insert(it, val);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		protected handle_insert(item: SetIterator<T>): void
		{
			this.tree_.insert(item);
		}

		/**
		 * @inheritdoc
		 */
		protected handle_erase(item: SetIterator<T>): void
		{
			this.tree_.erase(item);
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		/**
		 * @inheritdoc
		 */
		public swap(obj: base.container.IContainer<T>): void
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
			let supplement: TreeMultiSet<T> = new TreeMultiSet<T>();
			supplement.data_ = this.data_;
			supplement.tree_ = this.tree_;

			this.data_ = obj.data_;
			this.tree_ = obj.tree_;

			obj.data_ = supplement.data_;
			obj.tree_ = supplement.tree_;
		}
	}
}