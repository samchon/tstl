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
	 * weak ordering criterion indicated by its internal comparison method (of {@link IComparable.less less}).
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
	 *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute 
	 *		 position in the container. </dd>
	 * 
	 *	<dt> Ordered </dt>
	 *	<dd> The elements in the container follow a strict order at all times. All inserted elements are 
	 *		 given a position in this order. </dd>
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
		private tree: base.tree.AtomicTree<T>;

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

		public constructor(array: Array<T>);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: base.container.Container<T>);

		/**
		 * Range Constructor.
		 * 
		 * @param begin
		 * @param end
		 */
		public constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);

		public constructor(...args: any[])
		{
			super();

			this.tree = new base.tree.AtomicTree<T>();
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<U extends T>(begin: base.container.Iterator<U>, end: base.container.Iterator<U>): void
		{
			super.assign(begin, end);
		}

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			super.clear();

			this.tree = new base.tree.AtomicTree<T>();
		}

		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public find(val: T): SetIterator<T>
		{
			var node = this.tree.find(val);

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

		 * <p> A similar member function, {@link upperBound}, has the same behavior as {@link lowerBound}, except 
		 * in the case that the {@link TreeMultiSet} contains elements equivalent to <i>val</i>: In this case 
		 * {@link lowerBound} returns an iterator pointing to the first of such elements, whereas 
		 * {@link upperBound} returns an iterator pointing to the element following the last. </p>
		 * 
		 * @param val Value to compare.
		 *
		 * @return An iterator to the the first element in the container which is not considered to go before 
		 *		   <i>val</i>, or {@link TreeMultiSet.end} if all elements are considered to go before <i>val</i>.
		 */
		public lowerBound(val: T): SetIterator<T>
		{
			let node: base.tree.XTreeNode<SetIterator<T>> = this.tree.find(val);

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
		 * <p> A similar member function, {@link lowerBound}, has the same behavior as {@link upperBound}, except 
		 * in the case that the {@TreeMultiSet} contains elements equivalent to <i>val</i>: In this case 
		 * {@link lowerBound} returns an iterator pointing to the first of such elements, whereas 
		 * {@link upperBound} returns an iterator pointing to the element following the last. </p>
		 * 
		 * @param val Value to compare.
		 *
		 * @return An iterator to the the first element in the container which is considered to go after 
		 *		   <i>val</i>, or {@link TreeMultiSet.end} if no elements are considered to go after <i>val</i>.
		 */
		public upperBound(val: T): SetIterator<T>
		{
			let node: base.tree.XTreeNode<SetIterator<T>> = this.tree.find(val);

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
		 *		   the range (the same as {@link lowerBound}), and {@link Pair.second} is the upper bound 
		 *		   (the same as {@link upperBound}).
		 */
		public equalRange(val: T): Pair<SetIterator<T>, SetIterator<T>>
		{
			return new Pair<SetIterator<T>, SetIterator<T>>(this.lowerBound(val), this.upperBound(val));
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @private
		 */
		protected insertByVal(val: T): any
		{
			var node = this.tree.find(val);
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
		protected handleInsert(item: SetIterator<T>): void
		{
			this.tree.insert(item);
		}

		/**
		 * @inheritdoc
		 */
		protected handleErase(item: SetIterator<T>): void
		{
			this.tree.erase(item);
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		public swap(obj: TreeMultiSet<T>): void
		{
			super.swap(obj);

			let supplement: base.tree.AtomicTree<T> = this.tree;

			this.tree = obj.tree;
			obj.tree = supplement;
		}
	}
}