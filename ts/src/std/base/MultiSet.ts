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
	 * <p> In an {@link SetContainer}, the value of an element is at the same time its <i>key</i>, used to
	 * identify it. <i>Keys</i> are immutable, therefore, the elements in an {@link SetContainer} cannot be
	 * modified once in the container - they can be inserted and removed, though. </p>
	 *
	 * <p> {@link SetContainer} stores elements, keeps sequence and enables indexing by inserting elements into a
	 * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index 
	 * table like {@link RBTree tree} or {@link HashBuckets hash-table}. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/stl/api/assets/images/design/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/stl/api/assets/images/design/set_containers.png" style="max-width: 100%" /> </p>
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
	 *	<dt> Multiple equivalent keys </dt>
	 *	<dd> Multiple elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 *
	 * @param <T> Type of the elements. Each element in a {@link SetContainer} container is also identified
	 *			  by this value (each value is itself also the element's <i>key</i>).
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class MultiSet<T>
		extends SetContainer<T>
	{
		/* ---------------------------------------------------------
			INSERTS
		--------------------------------------------------------- */
		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> Extends the container by inserting new elements, effectively increasing the container {@link size} by 
		 * the number of elements inserted. </p>
		 * 
		 * @param key Value to be inserted as an element.
		 *
		 * @return An iterator to the newly inserted element.
		 */
		public insert(val: T): SetIterator<T>;

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
		public swap(obj: MultiSet<T>): void
		{
			let vec = new Vector<T>(this.begin(), this.end());

			this.assign(obj.begin(), obj.end());
			obj.assign(vec.begin(), vec.end());
		}
	}
}