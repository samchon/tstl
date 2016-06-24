/// <reference path="../API.ts" />

/// <reference path="XTree.ts" />

namespace std.base
{
	/**
	 * <p> Common interface for tree-structured map. </p>
	 * 
	 * <p> {@link ITreeMap ITreeMaps} are associative containers that store elements formed by a combination of
	 * a <i>key value</i> and a <i>mapped value</i>, following a specific order. </p>
	 *
	 * <p> In a {@link ITreeMap}, the <i>key values</i> are generally used to sort and uniquely identify
	 * the elements, while the <i>mapped values</i> store the content associated to this <i>key</i>. The types of
	 * <i>key</i> and <i>mapped value</i> may differ, and are grouped together in member type
	 * <code>value_type</code>, which is a {@link Pair} type combining both: </p>
	 *
	 * <p> <code>typedef Pair<const Key, T> value_type;</code> </p>
	 *
	 * <p> Internally, the elements in a {@link ITreeMap}are always sorted by its key following a
	 * strict weak ordering criterion indicated by its internal comparison method (of {@link less}). </p>
	 *
	 * <p> {@link ITreeMap}containers are generally slower than {@link IHashMap} containers
	 * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based
	 * on their order. </p>
	 *
	 * <p> {@link ITreeMap TreeMultiMaps} are typically implemented as binary search trees. </p>
	 *
	 * <p> <a href="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" style="max-width: 100%" /></a> </p>
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
	 * </dl>
	 * 
	 * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
	 * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
	 *
	 * @reference http://www.cplusplus.com/reference/map
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface ITreeMap<Key, T>
	{
		/**
		 * <p> Return key comparison function. </p>
		 * 
		 * <p> Returns a references of the comparison function used by the container to compare <i>keys</i>. </p>
		 * 
		 * <p> The <i>comparison object</i> of a {@link ITreeMap tree-map object} is set on 
		 * {@link TreeMap.constructor construction}. Its type (<i>Key</i>) is the last parameter of the 
		 * {@link ITreeMap.constructor constructors}. By default, this is a {@link less} function, which returns the same 
		 * as <i>operator&lt;</i>. </p>
		 * 
		 * <p> This function determines the order of the elements in the container: it is a function pointer that takes 
		 * two arguments of the same type as the element <i>keys</i>, and returns <code>true</code> if the first argument 
		 * is considered to go before the second in the strict weak ordering it defines, and <code>false</code> otherwise. 
		 * </p>
		 * 
		 * <p> Two keys are considered equivalent if {@link key_comp} returns <code>false</code> reflexively (i.e., no 
		 * matter the order in which the keys are passed as arguments). </p>
		 * 
		 * @return The comparison function.
		 */
		key_comp(): (x: Key, y: Key) => boolean;

		/**
		 * <p> Return value comparison function. </p>
		 * 
		 * <p> Returns a comparison function that can be used to compare two elements to get whether the key of the first 
		 * one goes before the second. </p>
		 * 
		 * <p> The arguments taken by this function object are of member type <code>std.Pair<Key, T></code> (defined in 
		 * {@link ITreeMap}), but the mapped type (<i>T</i>) part of the value is not taken into consideration in this 
		 * comparison. </p>
		 * 
		 * <p> This comparison class returns <code>true</code> if the {@link Pair.first key} of the <i>first argument</i> 
		 * is considered to go before that of the <i>second</i> (according to the strict weak ordering specified by the 
		 * container's comparison function, {@link key_comp}), and <code>false</code> otherwise. </p>
		 * 
		 * @return The comparison function for element values.
		 */
		value_comp(): (x: Pair<Key, T>, y: Pair<Key, T>) => boolean;

		/**
		 * <p> Return iterator to lower bound. </p>
		 * 
		 * <p> Returns an iterator pointing to the first element in the container whose key is not considered to 
		 * go before <i>k</i> (i.e., either it is equivalent or goes after). </p>
		 * 
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(<i>k</i>, element_key) would return false. </p>
		 * 
		 * <p> If the {@link ITreeMap} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element whose key is not less than <i>k</i> </p>.
		 * 
		 * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except 
		 * in the case that the {@link ITreeMap} contains an element with a key equivalent to <i>k</i>: In this 
		 * case, {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} 
		 * returns an iterator pointing to the next element. </p>
		 * 
		 * @param k Key to search for.
		 *
		 * @return An iterator to the the first element in the container whose key is not considered to go before 
		 *		   <i>k</i>, or {@link ITreeMap.end} if all keys are considered to go before <i>k</i>.
		 */
		lower_bound(key: Key): MapIterator<Key, T>;

		/**
		 * <p> Return iterator to upper bound. </p>
		 *
		 * <p> Returns an iterator pointing to the first element in the container whose key is considered to 
		 * go after <i>k</i> </p>.
		 *
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(<i>k</i>, element_key) would return true. </p>
		 *
		 * <p> If the {@link ITreeMap} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element whose key is greater than <i>k</i> </p>.
		 *
		 * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except 
		 * in the case that the map contains an element with a key equivalent to <i>k</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} returns an 
		 * iterator pointing to the next element. </p>
		 * 
		 * @param k Key to search for.
		 * 
		 * @return An iterator to the the first element in the container whose key is considered to go after 
		 *		   <i>k</i>, or {@link TreeMap.end end} if no keys are considered to go after <i>k</i>.
		 */
		upper_bound(key: Key): MapIterator<Key, T>;

		/**
		 * <p> Get range of equal elements. </p>
		 * 
		 * <p> Returns the bounds of a range that includes all the elements in the container which have a key 
		 * equivalent to <i>k</i> </p>.
		 * 
		 * <p> If no matches are found, the range returned has a length of zero, with both iterators pointing to 
		 * the first element that has a key considered to go after <i>k</i> according to the container's internal 
		 * comparison object (key_comp). </p>
		 * 
		 * <p> Two keys are considered equivalent if the container's comparison object returns false reflexively 
		 * (i.e., no matter the order in which the keys are passed as arguments). </p>
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

namespace std.base
{
	/**
	 * <p> A red-black tree storing {@link MapIterator MapIterators}. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" style="max-width: 100%" /></a> </p>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class PairTree<Key, T>
		extends XTree<MapIterator<Key, T>>
	{
		private map_: TreeMap<Key, T> | TreeMultiMap<Key, T>;

		private compare_: (x: Key, y: Key) => boolean;

		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor(map: TreeMap<Key, T> | TreeMultiMap<Key, T>, compare: (x: Key, y: Key) => boolean = std.less)
		{
			super();
			
			this.map_ = map;
			this.compare_ = compare;
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public find(key: Key): XTreeNode<MapIterator<Key, T>>;

		public find(it: MapIterator<Key, T>): XTreeNode<MapIterator<Key, T>>;

		public find(val: any): XTreeNode<MapIterator<Key, T>>
		{
			if (val instanceof MapIterator && (<MapIterator<Key, T>>val).first instanceof SetIterator == false)
				return super.find(val);
			else
				return this.find_by_key(val);
		}

		/**
		 * @hidden
		 */
		private find_by_key(key: Key): XTreeNode<MapIterator<Key, T>>
		{
			if (this.root_ == null)
				return null;

			let node: XTreeNode<MapIterator<Key, T>> = this.root_;

			while (true)
			{
				let newNode: XTreeNode<MapIterator<Key, T>> = null;

				if (std.equal_to(key, node.value.first))
					break; // EQUALS, MEANS MATCHED, THEN TERMINATE
				else if (this.compare_(key, node.value.first))
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
		 * <p> Returns an iterator pointing to the first element in the container whose key is not considered to 
		 * go before <i>k</i> (i.e., either it is equivalent or goes after). </p>
		 * 
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(<i>k</i>, element_key) would return false. </p>
		 * 
		 * <p> If the {@link ITreeMap} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element whose key is not less than <i>k</i> </p>.
		 * 
		 * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except 
		 * in the case that the {@link ITreeMap} contains an element with a key equivalent to <i>k</i>: In this 
		 * case, {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} 
		 * returns an iterator pointing to the next element. </p>
		 * 
		 * @param k Key to search for.
		 *
		 * @return An iterator to the the first element in the container whose key is not considered to go before 
		 *		   <i>k</i>, or {@link ITreeMap.end} if all keys are considered to go before <i>k</i>.
		 */
		public lower_bound(key: Key): MapIterator<Key, T>
		{
			let node: base.XTreeNode<MapIterator<Key, T>> = this.find(key);

			if (node == null)
				return this.map_.end();
			else if (this.compare_(node.value.first, key))
				return node.value.next();
			else
			{
				let it = node.value;
				while (!std.equal_to(it, this.map_.end()) && std.less(it.first, key))
					it = it.next();

				return it;
			}
		}

		/**
		 * <p> Return iterator to upper bound. </p>
		 *
		 * <p> Returns an iterator pointing to the first element in the container whose key is considered to 
		 * go after <i>k</i> </p>.
		 *
		 * <p> The function uses its internal comparison object (key_comp) to determine this, returning an 
		 * iterator to the first element for which key_comp(<i>k</i>, element_key) would return true. </p>
		 *
		 * <p> If the {@link ITreeMap} class is instantiated with the default comparison type ({@link less}), 
		 * the function returns an iterator to the first element whose key is greater than <i>k</i> </p>.
		 *
		 * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except 
		 * in the case that the map contains an element with a key equivalent to <i>k</i>: In this case 
		 * {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} returns an 
		 * iterator pointing to the next element. </p>
		 * 
		 * @param k Key to search for.
		 * 
		 * @return An iterator to the the first element in the container whose key is considered to go after 
		 *		   <i>k</i>, or {@link TreeMap.end end} if no keys are considered to go after <i>k</i>.
		 */
		public upper_bound(key: Key): MapIterator<Key, T>
		{
			let node: base.XTreeNode<MapIterator<Key, T>> = this.find(key);
			
			if (node == null)
				return this.map_.end();
			else
			{
				let it = node.value;
				while (!std.equal_to(it, this.map_.end()) && (std.equal_to(it.first, key) || std.less(it.first, key)))
					it = it.next();

				return it;
			}
		}

		/**
		 * <p> Get range of equal elements. </p>
		 * 
		 * <p> Returns the bounds of a range that includes all the elements in the container which have a key 
		 * equivalent to <i>k</i> </p>.
		 * 
		 * <p> If no matches are found, the range returned has a length of zero, with both iterators pointing to 
		 * the first element that has a key considered to go after <i>k</i> according to the container's internal 
		 * comparison object (key_comp). </p>
		 * 
		 * <p> Two keys are considered equivalent if the container's comparison object returns false reflexively 
		 * (i.e., no matter the order in which the keys are passed as arguments). </p>
		 * 
		 * @param k Key to search for.
		 *
		 * @return The function returns a {@link Pair}, whose member {@link Pair.first} is the lower bound of 
		 *		   the range (the same as {@link lower_bound}), and {@link Pair.second} is the upper bound 
		 *		   (the same as {@link upper_bound}).
		 */
		public equal_range(key: Key): Pair<MapIterator<Key, T>, MapIterator<Key, T>>
		{
			return std.make_pair(this.lower_bound(key), this.upper_bound(key));
		}

		/* ---------------------------------------------------------
			COMPARISON
		--------------------------------------------------------- */
		/**
		 * <p> Return key comparison function. </p>
		 * 
		 * <p> Returns a references of the comparison function used by the container to compare <i>keys</i>. </p>
		 * 
		 * <p> The <i>comparison object</i> of a {@link ITreeMap tree-map object} is set on 
		 * {@link TreeMap.constructor construction}. Its type (<i>Key</i>) is the last parameter of the 
		 * {@link ITreeMap.constructor constructors}. By default, this is a {@link less} function, which returns the same 
		 * as <i>operator&lt;</i>. </p>
		 * 
		 * <p> This function determines the order of the elements in the container: it is a function pointer that takes 
		 * two arguments of the same type as the element <i>keys</i>, and returns <code>true</code> if the first argument 
		 * is considered to go before the second in the strict weak ordering it defines, and <code>false</code> otherwise. 
		 * </p>
		 * 
		 * <p> Two keys are considered equivalent if {@link key_comp} returns <code>false</code> reflexively (i.e., no 
		 * matter the order in which the keys are passed as arguments). </p>
		 * 
		 * @return The comparison function.
		 */
		public key_comp(): (x: Key, y: Key) => boolean
		{
			return this.compare_;
		}

		/**
		 * <p> Return value comparison function. </p>
		 * 
		 * <p> Returns a comparison function that can be used to compare two elements to get whether the key of the first 
		 * one goes before the second. </p>
		 * 
		 * <p> The arguments taken by this function object are of member type <code>std.Pair<Key, T></code> (defined in 
		 * {@link ITreeMap}), but the mapped type (<i>T</i>) part of the value is not taken into consideration in this 
		 * comparison. </p>
		 * 
		 * <p> This comparison class returns <code>true</code> if the {@link Pair.first key} of the <i>first argument</i> 
		 * is considered to go before that of the <i>second</i> (according to the strict weak ordering specified by the 
		 * container's comparison function, {@link key_comp}), and <code>false</code> otherwise. </p>
		 * 
		 * @return The comparison function for element values.
		 */
		public value_comp(): (x: Pair<Key, T>, y: Pair<Key, T>) => boolean
		{
			let compare = this.compare_;

			let fn = function (x: Pair<Key, T>, y: Pair<Key, T>): boolean
			{
				return compare(x.first, y.first);
			}
			return fn;
		}

		/**
		 * @inheritdoc
		 */
		public is_equal_to(left: MapIterator<Key, T>, right: MapIterator<Key, T>): boolean
		{
			return std.equal_to(left.first, right.first);
		}

		/**
		 * @inheritdoc
		 */
		public is_less(left: MapIterator<Key, T>, right: MapIterator<Key, T>): boolean
		{
			return this.compare_(left.first, right.first);
		}
	}
}