/// <reference path="base/container/UniqueSet.ts" />

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
	 * can be inserted or removed from the container. </p>
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
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/set/set/ </li>
	 * </ul>
	 *
	 * @param <T> Type of the elements. 
	 *			  Each element in an {@link TreeSet} is also uniquely identified by this value.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class TreeSet<T>
		extends base.container.UniqueSet<T>
	{
		/**
		 * <i>RB-Tree+</i> object for implemeting the {@link TreeSet}.
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
		 * Default Constructor
		 */
		public constructor();

		/**
		 * Contruct from elements.
		 *
		 * @param array Elements to be contained.
		 */
		public constructor(array: Array<T>);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: base.container.Container<T>);

		/**
		 * Range Constructor.
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);
		
		public constructor(...args: any[])
		{
			super();

			this.tree_ = new base.tree.AtomicTree<T>();
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<U extends T, InputIterator extends base.container.Iterator<U>>
			(begin: InputIterator, end: InputIterator): void
		{
			super.assign(begin, end);
		}

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
			let node = this.tree_.find(val);

			if (node == null || std.equals(node.value.value, val) == false)
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
			let node: base.tree.XTreeNode<SetIterator<T>> = this.tree_.find(val);

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
			let node: base.tree.XTreeNode<SetIterator<T>> = this.tree_.find(val);

			if (node == null)
				return this.end();
			else if (!std.equals(node.value.value, val) && !std.less(node.value.value, val))
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
			if (node != null && std.equals(node.value.value, val) == true)
				return new Pair<SetIterator<T>, boolean>(node.value, false);
			
			// INSERTS
			let it: SetIterator<T>;

			if (node == null)
				it = this.end();
			else if (std.less(node.value.value, val) == true)
				it = node.value.next();
			else
				it = node.value;

			// ITERATOR TO RETURN
			it = this.insert(it, val);

			return new Pair<SetIterator<T>, boolean>(it, true);
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
			let supplement: TreeSet<T> = new TreeSet<T>();
			supplement.data_ = this.data_;
			supplement.tree_ = this.tree_;

			this.data_ = obj.data_;
			this.tree_ = obj.tree_;

			obj.data_ = supplement.data_;
			obj.tree_ = supplement.tree_;
		}
	}
}