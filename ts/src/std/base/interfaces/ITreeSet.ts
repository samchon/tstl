namespace std.base
{
	/**
	 * A common interface for tree-structured set.
	 *
	 * {@link ITreeSet TreeMultiSets} are containers that store elements following a specific order.
	 *
	 * In a {@link ITreeSet}, the value of an element also identifies it (the value is itself 
	 * the <i>key</i>, of type <i>T</i>). The value of the elements in a {@link ITreeSet} cannot 
	 * be modified once in the container (the elements are always const), but they can be inserted or removed 
	 * from the 
	 *
	 * Internally, the elements in a {@link ITreeSet TreeMultiSets} are always sorted following a strict 
	 * weak ordering criterion indicated by its internal comparison method (of {@link IComparable.less less}).
	 *
	 * {@link ITreeSet} containers are generally slower than {@link IHashSet} containers 
	 * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on 
	 * their order.
	 *
	 * {@link ITreeSet TreeMultiSets} are typically implemented as binary search trees.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/set_containers.png" style="max-width: 100%" /></a>
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
	 * </dl>
	 * 
	 * @param <T> Type of the elements. Each element in a {@link ITreeSet} container is also identified 
	 *			  by this value (each value is itself also the element's <i>key</i>).
	 *
	 * @reference http://www.cplusplus.com/reference/set
	 * @author Jeongho Nam <http://samchon.org>
	 */
    export interface ITreeSet<T>
        extends SetContainer<T>
	{
		/**
		 * Return comparison function.
		 * 
		 * Returns a copy of the comparison function used by the container.
		 * 
		 * By default, this is a {@link less} object, which returns the same as <i>operator<</i>.
		 * 
		 * This object determines the order of the elements in the container: it is a function pointer or a function 
		 * object that takes two arguments of the same type as the container elements, and returns <code>true</code> if 
		 * the <i>first argument</i> is considered to go before the <i>second</i> in the <i>strict weak ordering</i> it 
		 * defines, and <code>false</code> otherwise.
		 * 
		 * Two elements of a {@link ITreeSet} are considered equivalent if {@link key_comp} returns <code>false</code> 
		 * reflexively (i.e., no matter the order in which the elements are passed as arguments).
		 * 
		 * In {@link ITreeSet} containers, the <i>keys</i> to sort the elements are the values (<i>T</i>) themselves, 
		 * therefore {@link key_comp} and its sibling member function {@link value_comp} are equivalent.
		 * 
		 * @return The comparison function.
		 */
		key_comp(): (x: T, y: T) => boolean;

		/**
		 * Return comparison function.
		 * 
		 * Returns a copy of the comparison function used by the container.
		 * 
		 * By default, this is a {@link less} object, which returns the same as <i>operator<</i>.
		 * 
		 * This object determines the order of the elements in the container: it is a function pointer or a function 
		 * object that takes two arguments of the same type as the container elements, and returns <code>true</code> if 
		 * the <i>first argument</i> is considered to go before the <i>second</i> in the <i>strict weak ordering</i> it 
		 * defines, and <code>false</code> otherwise.
		 * 
		 * Two elements of a {@link ITreeSet} are considered equivalent if {@link key_comp} returns <code>false</code> 
		 * reflexively (i.e., no matter the order in which the elements are passed as arguments).
		 * 
		 * In {@link ITreeSet} containers, the <i>keys</i> to sort the elements are the values (<i>T</i>) themselves, 
		 * therefore {@link key_comp} and its sibling member function {@link value_comp} are equivalent.
		 * 
		 * @return The comparison function.
		 */
		value_comp(): (x: T, y: T) => boolean;

		/**
		 * Return iterator to lower bound.
		 * 
		 * Returns an iterator pointing to the first element in the container which is not considered to 
		 * go before <i>val</i> (i.e., either it is equivalent or goes after).
		 * 
		 * The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(element,val) would return false.
		 * 
		 * If the {@link ITreeSet} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element that is not less than <i>val</i>.

		 * A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except 
		 * in the case that the {@link ITreeSet} contains elements equivalent to <i>val</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to the first of such elements, whereas 
		 * {@link upper_bound} returns an iterator pointing to the element following the last.
		 * 
		 * @param val Value to compare.
		 *
		 * @return An iterator to the the first element in the container which is not considered to go before 
		 *		   <i>val</i>, or {@link ITreeSet.end} if all elements are considered to go before <i>val</i>.
		 */
		lower_bound(val: T): SetIterator<T>;

		/**
		 * Return iterator to upper bound.
		 * 
		 * Returns an iterator pointing to the first element in the container which is considered to go after 
		 * <i>val</i>.

		 * The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(val,element) would return true.

		 * If the {@code ITreeSet} class is instantiated with the default comparison type (less), the 
		 * function returns an iterator to the first element that is greater than <i>val</i>.
		 * 
		 * A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except 
		 * in the case that the {@ITreeSet} contains elements equivalent to <i>val</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to the first of such elements, whereas 
		 * {@link upper_bound} returns an iterator pointing to the element following the last.
		 * 
		 * @param val Value to compare.
		 *
		 * @return An iterator to the the first element in the container which is considered to go after 
		 *		   <i>val</i>, or {@link TreeSet.end end} if no elements are considered to go after <i>val</i>.
		 */
		upper_bound(val: T): SetIterator<T>;

		/**
		 * Get range of equal elements.
		 * 
		 * Returns the bounds of a range that includes all the elements in the container that are equivalent 
		 * to <i>val</i>.
		 * 
		 * If no matches are found, the range returned has a length of zero, with both iterators pointing to 
		 * the first element that is considered to go after val according to the container's 
		 * internal comparison object (key_comp).
		 * 
		 * Two elements of a multiset are considered equivalent if the container's comparison object returns 
		 * false reflexively (i.e., no matter the order in which the elements are passed as arguments).
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