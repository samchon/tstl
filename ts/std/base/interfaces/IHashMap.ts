namespace std.base
{
	/**
	 * Common interface for hash map.
	 * 
	 * {@link IHashMap}s are associative containers that store elements formed by the combination of 
	 * a <i>key value</i> and a <i>mapped value</i>.
	 *
	 * In an {@link IHashMap}, the <i>key value</i> is generally used to uniquely identify the 
	 * element, while the <i>mapped value</i> is an object with the content associated to this <i>key</i>. 
	 * Types of <i>key</i> and <i>mapped value</i> may differ.
	 *
	 * Internally, the elements in the {@link IHashMap} are not sorted in any particular order with 
	 * respect to either their <i>key</i> or <i>mapped values</i>, but organized into <i>buckets</i> depending on 
	 * their hash values to allow for fast access to individual elements directly by their <i>key values</i> 
	 * (with a constant average time complexity on average).
	 *
	 * Elements with equivalent <i>keys</i> are grouped together in the same bucket and in such a way that 
	 * an iterator can iterate through all of them. Iterators in the container are doubly linked iterators.
	 *
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/map_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /> </a> 
	 *
	 * 
	 * ### Container properties
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute 
	 *		 position in the container. </dd>
	 * 
	 *	<dt> Hashed </dt>
	 *	<dd> Hashed containers organize their elements using hash tables that allow for fast access to elements 
	 *		 by their <i>key</i>. </dd>
	 * 
	 *	<dt> Map </dt>
	 *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>: 
	 *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
	 * </dl>
	 *
	 * @param <Key> Type of the key values. 
	 *				Each element in an {@link IHashMap} is identified by a key value.
	 * @param <T> Type of the mapped value. 
	 *			  Each element in an {@link IHashMap} is used to store some data as its mapped value.
	 *
	 * @reference http://www.cplusplus.com/reference/unordered_map
	 * @author Jeongho Nam <http://samchon.org>
	 */
    export interface IHashMap<Key, T>
        extends MapContainer<Key, T>
	{
		/**
		 * Return number of buckets.
		 * 
		 * Returns the number of buckets in the {@link IHashMap} container.
		 * 
		 * A bucket is a slot in the container's internal hash table to which elements are assigned based on the 
		 * hash value of their key.
		 * 
		 * The number of buckets influences directly the {@link load_factor load factor} of the container's hash 
		 * table (and thus the probability of collision). The container automatically increases the number of buckets to 
		 * keep the load factor below a specific threshold (its {@link max_load_factor}), causing a {@link rehash} each 
		 * time the number of buckets needs to be increased.
		 * 
		 * @return The current amount of buckets.
		 */
		bucket_count(): number;

		/**
		 * Return bucket size.
		 * 
		 * Returns the number of elements in bucket <i>n</i>.
		 * 
		 * A bucket is a slot in the container's internal hash table to which elements are assigned based on the hash 
		 * value of their key.
		 * 
		 * The number of elements in a bucket influences the time it takes to access a particular element in the 
		 * bucket. The container automatically increases the number of buckets to keep the {@link load_cator load factor} 
		 * (which is the average bucket size) below its {@link max_load_factor}.
		 * 
		 * @param n Bucket number. This shall be lower than {@link bucket_count}.
		 * 
		 * @return The number of elements in bucket <i>n</i>.
		 */
		bucket_size(n: number): number;

		/**
		 * Get maximum load factor.
		 * 
		 * Returns the current maximum load factor for the {@link HashMultiMap} container.
		 * 
		 * The load factor is the ratio between the number of elements in the container (its {@link size}) and the 
		 * number of buckets ({@link bucket_count}).
		 * 
		 * By default, {@link HashMultiMap} containers have a {@link max_load_factor} of 1.0.
		 * 
		 * The load factor influences the probability of collision in the hash table (i.e., the probability of two 
		 * elements being located in the same bucket). The container uses the value of max_load_factor as the threshold 
		 * that forces an increase in the number of buckets (and thus causing a {@link rehash}).
		 * 
		 * Note though, that implementations may impose an upper limit on the number of buckets (see 
		 * {@link max_bucket_count}), which may force the container to ignore the {@link max_load_factor}.
		 * 
		 * @return The current load factor.
		 */
		max_load_factor(): number;

		/**
		 * Set maximum load factor.
		 * 
		 * Sets <i>z</i> as the cnew maximum load factor for the {@link HashMultiMap} container.
		 * 
		 * The load factor is the ratio between the number of elements in the container (its {@link size}) and the 
		 * number of buckets ({@link bucket_count}).
		 * 
		 * By default, {@link HashMultiMap} containers have a {@link max_load_factor} of 1.0.
		 * 
		 * The load factor influences the probability of collision in the hash table (i.e., the probability of two 
		 * elements being located in the same bucket). The container uses the value of max_load_factor as the threshold 
		 * that forces an increase in the number of buckets (and thus causing a {@link rehash}).
		 * 
		 * Note though, that implementations may impose an upper limit on the number of buckets (see 
		 * {@link max_bucket_count}), which may force the container to ignore the {@link max_load_factor}.
		 * 
		 * @param z The new maximum load factor.
		 */
		max_load_factor(z: number): void;

		/**
		 * Locate element's bucket.
		 * 
		 * Returns the bucket number where the element with <i>key</i> is located.
		 * 
		 * A bucket is a slot in the container's internal hash table to which elements are assigned based on the 
		 * hash value of their <i>key</i>. Buckets are numbered from 0 to ({@link bucket_count} - 1).
		 * 
		 * Individual elements in a bucket can be accessed by means of the range iterators returned by 
		 * {@link begin} and {@link end}.
		 * 
		 * @param key Key whose bucket is to be located.
		 */
		bucket(key: Key): number;

		/**
		 * Request a capacity change.
		 * 
		 * Sets the number of buckets in the container ({@link bucket_count}) to the most appropriate to contain at 
		 * least <i>n</i> elements.
		 * 
		 * If <i>n</i> is greater than the current {@link bucket_count} multiplied by the {@link max_load_factor}, 
		 * the container's {@link bucket_count} is increased and a {@link rehash} is forced.
		 * 
		 * If <i>n</i> is lower than that, the function may have no effect.
		 * 
		 * @param n The number of elements requested as minimum capacity.
		 */
		reserve(n: number): void;

		/**
		 * Set number of buckets.
		 * 
		 * Sets the number of buckets in the container to <i>n</i> or more.
		 * 
		 * If <i>n</i> is greater than the current number of buckets in the container ({@link bucket_count}), a 
		 * {@link HashBuckets.rehash rehash} is forced. The new {@link bucket_count bucket count} can either be equal or 
		 * greater than <i>n</i>.
		 * 
		 * If <i>n</i> is lower than the current number of buckets in the container ({@link bucket_count}), the 
		 * function may have no effect on the {@link bucket_count bucket count} and may not force a 
		 * {@link HashBuckets.rehash rehash}.
		 * 
		 * A {@link HashBuckets.rehash rehash} is the reconstruction of the hash table: All the elements in the 
		 * container are rearranged according to their hash value into the new set of buckets. This may alter the order 
		 * of iteration of elements within the container.
		 * 
		 * {@link HashBuckets.rehash Rehashes} are automatically performed by the container whenever its 
		 * {@link load_factor load factor} is going to surpass its {@link max_load_factor} in an operation.
		 * 
		 * Notice that this function expects the number of buckets as argument. A similar function exists, 
		 * {@link reserve}, that expects the number of elements in the container as argument.
		 * 
		 * @param n The minimum number of buckets for the container hash table.
		 */
		rehash(n: number): void;
	}
}