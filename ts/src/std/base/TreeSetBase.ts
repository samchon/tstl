/// <reference path="../API.ts" />

/// <reference path="XTree.ts" />

namespace std.base
{
	/**
	 * <p> A common interface for tree-structured set. </p>
	 *
	 * <p> {@link ITreeSet TreeMultiSets} are containers that store elements following a specific order. </p>
	 *
	 * <p> In a {@link ITreeSet}, the value of an element also identifies it (the value is itself 
	 * the <i>key</i>, of type <i>T</i>). The value of the elements in a {@link ITreeSet} cannot 
	 * be modified once in the container (the elements are always const), but they can be inserted or removed 
	 * from the  </p>
	 *
	 * <p> Internally, the elements in a {@link ITreeSet TreeMultiSets} are always sorted following a strict 
	 * weak ordering criterion indicated by its internal comparison method (of {@link IComparable.less less}). </p>
	 *
	 * <p> {@link ITreeSet} containers are generally slower than {@link IHashSet} containers 
	 * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on 
	 * their order. </p>
	 *
	 * <p> {@link ITreeSet TreeMultiSets} are typically implemented as binary search trees. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/tstl/images/design/class_diagram/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/set_containers.png" style="max-width: 100%" /></a> </p>
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
	 * </dl>
	 * 
	 * @param <T> Type of the elements. Each element in a {@link ITreeSet} container is also identified 
	 *			  by this value (each value is itself also the element's <i>key</i>).
	 *
	 * @reference http://www.cplusplus.com/reference/set
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface ITreeSet<T>
	{
		/**
		 * <p> Return comparison function. </p>
		 * 
		 * <p> Returns a copy of the comparison function used by the container. </p>
		 * 
		 * <p> By default, this is a {@link less} object, which returns the same as <i>operator<</i>. </p>
		 * 
		 * <p> This object determines the order of the elements in the container: it is a function pointer or a function 
		 * object that takes two arguments of the same type as the container elements, and returns <code>true</code> if 
		 * the <i>first argument</i> is considered to go before the <i>second</i> in the <i>strict weak ordering</i> it 
		 * defines, and <code>false</code> otherwise. </p>
		 * 
		 * <p> Two elements of a {@link ITreeSet} are considered equivalent if {@link key_comp} returns <code>false</code> 
		 * reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
		 * 
		 * <p> In {@link ITreeSet} containers, the <i>keys</i> to sort the elements are the values (<i>T</i>) themselves, 
		 * therefore {@link key_comp} and its sibling member function {@link value_comp} are equivalent. </p>
		 * 
		 * @return The comparison function.
		 */
		key_comp(): (x: T, y: T) => boolean;

		/**
		 * <p> Return comparison function. </p>
		 * 
		 * <p> Returns a copy of the comparison function used by the container. </p>
		 * 
		 * <p> By default, this is a {@link less} object, which returns the same as <i>operator<</i>. </p>
		 * 
		 * <p> This object determines the order of the elements in the container: it is a function pointer or a function 
		 * object that takes two arguments of the same type as the container elements, and returns <code>true</code> if 
		 * the <i>first argument</i> is considered to go before the <i>second</i> in the <i>strict weak ordering</i> it 
		 * defines, and <code>false</code> otherwise. </p>
		 * 
		 * <p> Two elements of a {@link ITreeSet} are considered equivalent if {@link key_comp} returns <code>false</code> 
		 * reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
		 * 
		 * <p> In {@link ITreeSet} containers, the <i>keys</i> to sort the elements are the values (<i>T</i>) themselves, 
		 * therefore {@link key_comp} and its sibling member function {@link value_comp} are equivalent. </p>
		 * 
		 * @return The comparison function.
		 */
		value_comp(): (x: T, y: T) => boolean;

		/**
		 * <p> Return iterator to lower bound. </p>
		 * 
		 * <p> Returns an iterator pointing to the first element in the container which is not considered to 
		 * go before <i>val</i> (i.e., either it is equivalent or goes after). </p>
		 * 
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(element,val) would return false. </p>
		 * 
		 * <p> If the {@link ITreeSet} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element that is not less than <i>val</i>. </p>

		 * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except 
		 * in the case that the {@link ITreeSet} contains elements equivalent to <i>val</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to the first of such elements, whereas 
		 * {@link upper_bound} returns an iterator pointing to the element following the last. </p>
		 * 
		 * @param val Value to compare.
		 *
		 * @return An iterator to the the first element in the container which is not considered to go before 
		 *		   <i>val</i>, or {@link ITreeSet.end} if all elements are considered to go before <i>val</i>.
		 */
		lower_bound(val: T): SetIterator<T>;

		/**
		 * <p> Return iterator to upper bound. </p>
		 * 
		 * <p> Returns an iterator pointing to the first element in the container which is considered to go after 
		 * <i>val</i>. </p>

		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(val,element) would return true. </p>

		 * <p> If the {@code ITreeSet} class is instantiated with the default comparison type (less), the 
		 * function returns an iterator to the first element that is greater than <i>val</i>. </p>
		 * 
		 * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except 
		 * in the case that the {@ITreeSet} contains elements equivalent to <i>val</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to the first of such elements, whereas 
		 * {@link upper_bound} returns an iterator pointing to the element following the last. </p>
		 * 
		 * @param val Value to compare.
		 *
		 * @return An iterator to the the first element in the container which is considered to go after 
		 *		   <i>val</i>, or {@link TreeSet.end end} if no elements are considered to go after <i>val</i>.
		 */
		upper_bound(val: T): SetIterator<T>;

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
		equal_range(val: T): Pair<SetIterator<T>, SetIterator<T>>;
	}
}

namespace std.base
{
	/**
	 * <p> A red-black Tree storing {@link SetIterator SetIterators}. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/tstl/images/design/class_diagram/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/set_containers.png" style="max-width: 100%" /></a> </p>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class AtomicTree<T>
		extends XTree<SetIterator<T>>
	{
		/**
		 * @hidden
		 */
		private set_: TreeSet<T> | TreeMultiSet<T>;

		/**
		 * @hidden
		 */
		private compare_: (x: T, y: T) => boolean;

		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor(set: TreeSet<T> | TreeMultiSet<T>, compare: (x: T, y: T) => boolean = std.less)
		{
			super();

			this.set_ = set;
			this.compare_ = compare;
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public find(val: T): XTreeNode<SetIterator<T>>;

		public find(it: SetIterator<T>): XTreeNode<SetIterator<T>>;

		public find(val: any): XTreeNode<SetIterator<T>>
		{
			if (val instanceof SetIterator && (<SetIterator<T>>val).value instanceof SetIterator == false)
				return super.find(val);
			else
				return this._Find_by_val(val);
		}

		/**
		 * @hidden
		 */
		private _Find_by_val(val: T): XTreeNode<SetIterator<T>>
		{
			if (this.root_ == null)
				return null;

			let node: XTreeNode<SetIterator<T>> = this.root_;

			while (true)
			{
				let newNode: XTreeNode<SetIterator<T>> = null;

				if (std.equal_to(val, node.value.value))
					break; // EQUALS, MEANS MATCHED, THEN TERMINATE
				else if (this.compare_(val, node.value.value))
					newNode = node.left; // LESS, THEN TO THE LEFT
				else
					newNode = node.right; // GREATER, THEN TO THE RIGHT

				// ULTIL CHILD NODE EXISTS
				if (newNode == null)
					break;
				
				// SHIFT A NEW NODE TO THE NODE TO BE RETURNED
				node = newNode;
			}

			return node;
		}

		/* ---------------------------------------------------------
			BOUNDS
		--------------------------------------------------------- */
		/**
		 * <p> Return iterator to lower bound. </p>
		 * 
		 * <p> Returns an iterator pointing to the first element in the container which is not considered to 
		 * go before <i>val</i> (i.e., either it is equivalent or goes after). </p>
		 * 
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(element,val) would return false. </p>
		 * 
		 * <p> If the {@link ITreeSet} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element that is not less than <i>val</i>. </p>

		 * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except 
		 * in the case that the {@link ITreeSet} contains elements equivalent to <i>val</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to the first of such elements, whereas 
		 * {@link upper_bound} returns an iterator pointing to the element following the last. </p>
		 * 
		 * @param val Value to compare.
		 *
		 * @return An iterator to the the first element in the container which is not considered to go before 
		 *		   <i>val</i>, or {@link ITreeSet.end} if all elements are considered to go before <i>val</i>.
		 */
		public lower_bound(val: T): SetIterator<T>
		{
			let node: base.XTreeNode<SetIterator<T>> = this.find(val);

			if (node == null)
				return this.set_.end();
			else if (std.equal_to(node.value.value, val))
				return node.value;
			else
			{
				let it: SetIterator<T> = node.value;
				while (!std.equal_to(it, this.set_.end()) && this.compare_(it.value, val))
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

		 * <p> If the {@code ITreeSet} class is instantiated with the default comparison type (less), the 
		 * function returns an iterator to the first element that is greater than <i>val</i>. </p>
		 * 
		 * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except 
		 * in the case that the {@ITreeSet} contains elements equivalent to <i>val</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to the first of such elements, whereas 
		 * {@link upper_bound} returns an iterator pointing to the element following the last. </p>
		 * 
		 * @param val Value to compare.
		 *
		 * @return An iterator to the the first element in the container which is considered to go after 
		 *		   <i>val</i>, or {@link TreeSet.end end} if no elements are considered to go after <i>val</i>.
		 */
		public upper_bound(val: T): SetIterator<T>
		{
			let node: base.XTreeNode<SetIterator<T>> = this.find(val);

			if (node == null)
				return this.set_.end();
			else
			{
				let it: SetIterator<T> = node.value;
				while (!std.equal_to(it, this.set_.end()) && (std.equal_to(it.value, val) || this.compare_(it.value, val)))
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
			return std.make_pair(this.lower_bound(val), this.upper_bound(val));
		}

		/* ---------------------------------------------------------
			COMPARISON
		--------------------------------------------------------- */
		/**
		 * <p> Return comparison function. </p>
		 * 
		 * <p> Returns a copy of the comparison function used by the container. </p>
		 * 
		 * <p> By default, this is a {@link less} object, which returns the same as <i>operator<</i>. </p>
		 * 
		 * <p> This object determines the order of the elements in the container: it is a function pointer or a function 
		 * object that takes two arguments of the same type as the container elements, and returns <code>true</code> if 
		 * the <i>first argument</i> is considered to go before the <i>second</i> in the <i>strict weak ordering</i> it 
		 * defines, and <code>false</code> otherwise. </p>
		 * 
		 * <p> Two elements of a {@link ITreeSet} are considered equivalent if {@link key_comp} returns <code>false</code> 
		 * reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
		 * 
		 * <p> In {@link ITreeSet} containers, the <i>keys</i> to sort the elements are the values (<i>T</i>) themselves, 
		 * therefore {@link key_comp} and its sibling member function {@link value_comp} are equivalent. </p>
		 * 
		 * @return The comparison function.
		 */
		public key_comp(): (x: T, y: T) => boolean
		{
			return this.compare_;
		}

		/**
		 * <p> Return comparison function. </p>
		 * 
		 * <p> Returns a copy of the comparison function used by the container. </p>
		 * 
		 * <p> By default, this is a {@link less} object, which returns the same as <i>operator<</i>. </p>
		 * 
		 * <p> This object determines the order of the elements in the container: it is a function pointer or a function 
		 * object that takes two arguments of the same type as the container elements, and returns <code>true</code> if 
		 * the <i>first argument</i> is considered to go before the <i>second</i> in the <i>strict weak ordering</i> it 
		 * defines, and <code>false</code> otherwise. </p>
		 * 
		 * <p> Two elements of a {@link ITreeSet} are considered equivalent if {@link key_comp} returns <code>false</code> 
		 * reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
		 * 
		 * <p> In {@link ITreeSet} containers, the <i>keys</i> to sort the elements are the values (<i>T</i>) themselves, 
		 * therefore {@link key_comp} and its sibling member function {@link value_comp} are equivalent. </p>
		 * 
		 * @return The comparison function.
		 */
		public value_comp(): (x: T, y: T) => boolean
		{
			return this.compare_;
		}

		/**
		 * @inheritdoc
		 */
		public is_equal_to(left: SetIterator<T>, right: SetIterator<T>): boolean
		{
			return std.equal_to(left, right);
		}

		/**
		 * @inheritdoc
		 */
		public is_less(left: SetIterator<T>, right: SetIterator<T>): boolean
		{
			return this.compare_(left.value, right.value);
		}
	}
}