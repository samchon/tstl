/// <reference path="../API.ts" />

/// <reference path="SetContainer.ts" />

namespace std.base
{
	/**
	 * <p> An abstract set. </p>
	 *
	 * <p> {@link SetContainer SetContainers} are containers that store elements allowing fast retrieval of 
	 * individual elements based on their value. </p>
	 *
	 * <p> In an {@link SetContainer}, the value of an element is at the same time its <i>key</i>, used to uniquely
	 * identify it. <i>Keys</i> are immutable, therefore, the elements in an {@link SetContainer} cannot be modified 
	 * once in the container - they can be inserted and removed, though. </p>
	 *
	 * <p> {@link SetContainer} stores elements, keeps sequence and enables indexing by inserting elements into a
	 * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index 
	 * table like {@link RBTree tree} or {@link HashBuckets hash-table}. </p>
	 *
	 * <h3> Container properties </h3>
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd> 
	 *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute
	 *		position in the container.
	 *	</dd>
	 * 
	 *	<dt> Set </dt>
	 *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
	 *
	 *	<dt> Unique keys </dt>
	 *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 *
	 * @param <T> Type of the elements. Each element in a {@link SetContainer} container is also identified
	 *			  by this value (each value is itself also the element's <i>key</i>).
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class UniqueSet<T>
		extends SetContainer<T>
	{
		/* ---------------------------------------------------------
			ACCESSOR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public count(key: T): number
		{
			return this.find(key).equal_to(this.end()) ? 0 : 1;
		}

		/* ---------------------------------------------------------
			INSERTS
		--------------------------------------------------------- */
		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> Extends the container by inserting new elements, effectively increasing the container {@link size} by 
		 * the number of element inserted (zero or one). </p>
		 *
		 * <p> Because elements in a {@link UniqueSet UniqueSets} are unique, the insertion operation checks whether 
		 * each inserted element is equivalent to an element already in the container, and if so, the element is not 
		 * inserted, returning an iterator to this existing element (if the function returns a value). </p>
		 *
		 * <p> For a similar container allowing for duplicate elements, see {@link MultiSet}. </p>
		 * 
		 * @param key Value to be inserted as an element.
		 *
		 * @return A {@link Pair}, with its member {@link Pair.first} set to an iterator pointing to either the newly 
		 *		   inserted element or to the equivalent element already in the {@link UniqueSet}. The 
		 *		   {@link Pair.second} element in the {@link Pair} is set to true if a new element was inserted or 
		 *		   false if an equivalent element already existed.
		 */
		public insert(val: T): Pair<SetIterator<T>, boolean>;

		/**
		 * @inheritdoc
		 */
		public insert(hint: SetIterator<T>, val: T): SetIterator<T>;

		/**
		 * @inheritdoc
		 */
		public insert(hint: SetReverseIterator<T>, val: T): SetReverseIterator<T>;

		/**
		 * @inheritdoc
		 */
		public insert<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}

		/* ---------------------------------------------------------
			UTILITIES
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public swap(obj: UniqueSet<T>): void
		{
			let vec = new Vector<T>(this.begin(), this.end());

			this.assign(obj.begin(), obj.end());
			obj.assign(vec.begin(), vec.end());
		}
	}
}