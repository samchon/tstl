/// <reference path="../../API.ts" />

/// <reference path="SetContainer.ts" />

namespace std.base
{
	/**
	 * An abstract set.
	 *
	 * {@link SetContainer SetContainers} are containers that store elements allowing fast retrieval of 
	 * individual elements based on their value.
	 *
	 * In an {@link SetContainer}, the value of an element is at the same time its <i>key</i>, used to
	 * identify it. <i>Keys</i> are immutable, therefore, the elements in an {@link SetContainer} cannot be
	 * modified once in the container - they can be inserted and removed, though.
	 *
	 * {@link MultiSet} stores elements, keeps sequence and enables indexing by inserting elements into a
	 * {@link List} and registering {@link ListIterator iterators} of the *list container* to an index table
	 * like *tree* or *hash-table*.
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
			INSERT
		--------------------------------------------------------- */
		/**
		 * Insert an element.
		 *
		 * Extends the container by inserting new elements, effectively increasing the container {@link size} by 
		 * the number of elements inserted.
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
			UTILITY
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public merge<U extends T>(source: SetContainer<U>): void
		{
			this.insert(source.begin(), source.end());
			source.clear();
		}
	}
}