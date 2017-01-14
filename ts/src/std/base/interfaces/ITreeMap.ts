namespace std.base
{
	/**
	 * Common interface for tree-structured map.
	 * 
	 * {@link ITreeMap ITreeMaps} are associative containers that store elements formed by a combination of
	 * a <i>key value</i> and a <i>mapped value</i>, following a specific order.
	 *
	 * In a {@link ITreeMap}, the <i>key values</i> are generally used to sort and uniquely identify
	 * the elements, while the <i>mapped values</i> store the content associated to this <i>key</i>. The types of
	 * <i>key</i> and <i>mapped value</i> may differ, and are grouped together in member type
	 * <code>value_type</code>, which is a {@link Pair} type combining both:
	 *
	 * <code>typedef Pair<const Key, T> value_type;</code>
	 *
	 * Internally, the elements in a {@link ITreeMap}are always sorted by its key following a
	 * strict weak ordering criterion indicated by its internal comparison method (of {@link less}).
	 *
	 * {@link ITreeMap}containers are generally slower than {@link IHashMap} containers
	 * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based
	 * on their order.
	 *
	 * {@link ITreeMap TreeMultiMaps} are typically implemented as binary search trees.
	 *
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/map_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /></a>
	 * 
	 * ### Container properties
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
	 * </dl>
	 * 
	 * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
	 * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
	 *
	 * @reference http://www.cplusplus.com/reference/map
	 * @author Jeongho Nam <http://samchon.org>
	 */
    export interface ITreeMap<Key, T>
        extends MapContainer<Key, T>
	{
		/**
		 * Return key comparison function.
		 * 
		 * Returns a references of the comparison function used by the container to compare <i>keys</i>.
		 * 
		 * The <i>comparison object</i> of a {@link ITreeMap tree-map object} is set on 
		 * {@link TreeMap.constructor construction}. Its type (<i>Key</i>) is the last parameter of the 
		 * {@link ITreeMap.constructor constructors}. By default, this is a {@link less} function, which returns the same 
		 * as <i>operator&lt;</i>.
		 * 
		 * This function determines the order of the elements in the container: it is a function pointer that takes 
		 * two arguments of the same type as the element <i>keys</i>, and returns <code>true</code> if the first argument 
		 * is considered to go before the second in the strict weak ordering it defines, and <code>false</code> otherwise. 
		 *
		 * 
		 * Two keys are considered equivalent if {@link key_comp} returns <code>false</code> reflexively (i.e., no 
		 * matter the order in which the keys are passed as arguments).
		 * 
		 * @return The comparison function.
		 */
		key_comp(): (x: Key, y: Key) => boolean;

		/**
		 * Return value comparison function.
		 * 
		 * Returns a comparison function that can be used to compare two elements to get whether the key of the first 
		 * one goes before the second.
		 * 
		 * The arguments taken by this function object are of member type <code>Pair<Key, T></code> (defined in 
		 * {@link ITreeMap}), but the mapped type (<i>T</i>) part of the value is not taken into consideration in this 
		 * comparison.
		 * 
		 * This comparison class returns <code>true</code> if the {@link Pair.first key} of the <i>first argument</i> 
		 * is considered to go before that of the <i>second</i> (according to the strict weak ordering specified by the 
		 * container's comparison function, {@link key_comp}), and <code>false</code> otherwise.
		 * 
		 * @return The comparison function for element values.
		 */
		value_comp(): (x: Pair<Key, T>, y: Pair<Key, T>) => boolean;

		/**
		 * Return iterator to lower bound.
		 * 
		 * Returns an iterator pointing to the first element in the container whose key is not considered to 
		 * go before <i>k</i> (i.e., either it is equivalent or goes after).
		 * 
		 * The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(<i>k</i>, element_key) would return false.
		 * 
		 * If the {@link ITreeMap} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element whose key is not less than <i>k</i>.
		 * 
		 * A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except 
		 * in the case that the {@link ITreeMap} contains an element with a key equivalent to <i>k</i>: In this 
		 * case, {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} 
		 * returns an iterator pointing to the next element.
		 * 
		 * @param k Key to search for.
		 *
		 * @return An iterator to the the first element in the container whose key is not considered to go before 
		 *		   <i>k</i>, or {@link ITreeMap.end} if all keys are considered to go before <i>k</i>.
		 */
		lower_bound(key: Key): MapIterator<Key, T>;

		/**
		 * Return iterator to upper bound.
		 *
		 * Returns an iterator pointing to the first element in the container whose key is considered to 
		 * go after <i>k</i>.
		 *
		 * The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(<i>k</i>, element_key) would return true.
		 *
		 * If the {@link ITreeMap} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element whose key is greater than <i>k</i>.
		 *
		 * A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except 
		 * in the case that the map contains an element with a key equivalent to <i>k</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} returns an 
		 * iterator pointing to the next element.
		 * 
		 * @param k Key to search for.
		 * 
		 * @return An iterator to the the first element in the container whose key is considered to go after 
		 *		   <i>k</i>, or {@link TreeMap.end end} if no keys are considered to go after <i>k</i>.
		 */
		upper_bound(key: Key): MapIterator<Key, T>;

		/**
		 * Get range of equal elements.
		 * 
		 * Returns the bounds of a range that includes all the elements in the container which have a key 
		 * equivalent to <i>k</i>.
		 * 
		 * If no matches are found, the range returned has a length of zero, with both iterators pointing to 
		 * the first element that has a key considered to go after <i>k</i> according to the container's internal 
		 * comparison object (key_comp).
		 * 
		 * Two keys are considered equivalent if the container's comparison object returns false reflexively 
		 * (i.e., no matter the order in which the keys are passed as arguments).
		 * 
		 * @param k Key to search for.
		 *
		 * @return The function returns a {@link Pair}, whose member {@link Pair.first} is the lower bound of 
		 *		   the range (the same as {@link lower_bound}), and {@link Pair.second} is the upper bound 
		 *		   (the same as {@link upper_bound}).
		 */
		equal_range(key: Key): Pair<MapIterator<Key, T>, MapIterator<Key, T>>;
	}
}