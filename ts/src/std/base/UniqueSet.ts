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
	 * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/set_containers.png" style="max-width: 100%" /></a> </p>
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

		/**
		 * <p> Extract an element. </p>
		 *
		 * <p> Extracts the element pointed to by <i>val</i> and erases it from the {@link UniqueSet}. </p>
		 * 
		 * @param val Value to be extracted.
		 * 
		 * @return A value.
		 */
		public extract(val: T): T;

		/**
		 * <p> Extract an element. </p>
		 *
		 * <p> Extracts the element pointed to by <i>key</i> and erases it from the {@link UniqueMap}. </p>
		 *
		 * @param it An iterator pointing an element to extract.
		 * 
		 * @return An iterator pointing to the element immediately following <i>it</i> prior to the element being 
		 *		   erased. If no such element exists,returns {@link end end()}.
		 */
		public extract(it: SetIterator<T>): SetIterator<T>;

		/**
		 * <p> Extract an element. </p>
		 *
		 * <p> Extracts the element pointed to by <i>key</i> and erases it from the {@link UniqueMap}. </p>
		 *
		 * @param it An iterator pointing an element to extract.
		 * 
		 * @return An iterator pointing to the element immediately following <i>it</i> prior to the element being 
		 *		   erased. If no such element exists,returns {@link end end()}.
		 */
		public extract(it: SetReverseIterator<T>): SetReverseIterator<T>;

		public extract(param: T | SetIterator<T> | SetReverseIterator<T>): any
		{
			if (param instanceof SetIterator)
				return this.extract_by_iterator(param);
			else if (param instanceof SetReverseIterator)
				return this.extract_by_reverse_iterator(param);
			else
				return this.extract_by_key(param);
		}

		/**
		 * @hidden
		 */
		private extract_by_key(val: T): T
		{
			let it = this.find(val);
			if (it.equal_to(this.end()) == true)
				throw new OutOfRange("No such key exists.");

			this.erase(val);
			return val;
		}

		/**
		 * @hidden
		 */
		private extract_by_iterator(it: SetIterator<T>): SetIterator<T>
		{
			if (it.equal_to(this.end()) == true || this.has(it.value) == false)
				return this.end();

			this.erase(it);
			return it;
		}

		/**
		 * @hidden
		 */
		private extract_by_reverse_iterator(it: SetReverseIterator<T>): SetReverseIterator<T>
		{
			this.extract_by_iterator(it.base().next());
			return it;
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
	}
}