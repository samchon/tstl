/// <reference path="../../API.ts" />

/// <reference path="MapContainer.ts" />

namespace std.base
{
	/**
	 * An abstract multi-map.
	 *
	 * {@link MultiMap MultiMaps} are associative containers that store elements formed by a combination of a
	 * <i>key value</i> (<i>Key</i>) and a <i>mapped value</i> (<i>T</i>), and which allows for fast retrieval of
	 * individual elements based on their keys.
	 *
	 * In a {@link MapContainer}, the <i>key values</i> are generally used to identify the elements, while the 
	 * <i>mapped values</i> store the content associated to this <i>key</i>. The types of <i>key</i> and 
	 * <i>mapped value</i> may differ, and are grouped together in member type <i>value_type</i>, which is a 
	 * {@link Pair} type combining both:
	 *
	 * <code>typedef pair<const Key, T> value_type;</code>
	 *
	 * {@link MultiMap} stores elements, keeps sequence and enables indexing by inserting elements into a
	 * {@link List} and registering {@link ListIterator iterators} of the *list container* to an index table like 
	 * *tree* or *hash-table*.
	 *
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/map_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /></a>
	 * 
	 * ### Container properties
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd>
	 *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute position 
	 *		in the container.
	 *	</dd>
	 *
	 *	<dt> Map </dt>
	 *	<dd>
	 *		Each element associates a <i>key</i> to a <i>mapped value</i>:
	 *		<i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>.
	 *	</dd>
	 *
	 *	<dt> Multiple equivalent keys </dt>
	 *	<dd> Multiple elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 *
	 * @param <Key> Type of the keys. Each element in a map is identified by its key value.
	 * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class MultiMap<Key, T>
		extends MapContainer<Key, T>
	{
		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		/**
		 * Construct and insert element.
		 * 
		 * Inserts a new element in the {@link MultiMap}. This new element is constructed in place using <i>args</i> 
		 * as the arguments for the element's constructor.
		 * 
		 * This effectively increases the container {@link size} by one.
		 * 
		 * A similar member function exists, {@link insert}, which either copies or moves existing objects into the 
		 * container.
		 * 
		 * @param key The key used both to look up and to insert if not found.
		 * @param value Value, the item.
		 * 
		 * @return An {@link MapIterator iterator} to the newly inserted element.
		 */
		public emplace(key: Key, value: T): MapIterator<Key, T>;

		/**
		 * Construct and insert element.
		 *
		 * Inserts a new element in the {@link MultiMap}. This new element is constructed in place using <i>args</i>
		 * as the arguments for the element's constructor.
		 *
		 * This effectively increases the container {@link size} by one.
		 *
		 * A similar member function exists, {@link insert}, which either copies or moves existing objects into the
		 * container.
		 *
		 * @param pair A single argument of a {@link Pair} type with a value for the *key* as
		 *			   {@link Pair.first first} member, and a *value* for the mapped value as
		 *			   {@link Pair.second second}.
		 * @return An {@link MapIterator iterator} to the newly inserted element.
		 */
		public emplace(pair: Pair<Key, T>): MapIterator<Key, T>;

		public emplace(...args: any[]): MapIterator<Key, T>
		{
			if (args.length == 1)
				return this._Insert_by_pair(args[0]);
			else
				return this._Insert_by_pair(make_pair<Key, T>(args[0], args[1]));
		}

		/**
		 * Insert elements.
		 *
		 * Extends the container by inserting new elements, effectively increasing the container {@link size} by 
		 * the number of elements inserted.
		 * 
		 * @param pair A single argument of a {@link Pair} type with a value for the *key* as
		 *			   {@link Pair.first first} member, and a *value* for the mapped value as
		 *			   {@link Pair.second second}.
		 *
		 * @return An iterator pointing to the newly inserted element.
		 */
		public insert(pair: Pair<Key, T>): MapIterator<Key, T>;

		/**
		 * Insert elements.
		 *
		 * Extends the container by inserting new elements, effectively increasing the container {@link size} by 
		 * the number of elements inserted.
		 * 
		 * @param tuple Tuple represensts the {@link Pair} to be inserted as an element.
		 *
		 * @return An iterator pointing to the newly inserted element.
		 */
		public insert<L extends Key, U extends T>(tuple: [L, U]): MapIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public insert(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public insert(hint: MapReverseIterator<Key, T>, pair: Pair<Key, T>): MapReverseIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public insert<L extends Key, U extends T>
			(hint: MapIterator<Key, T>, tuple: [L, U]): MapIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public insert<L extends Key, U extends T>
			(hint: MapReverseIterator<Key, T>, tuple: [L, U]): MapReverseIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public insert<L extends Key, U extends T, InputIterator extends Iterator<Pair<L, U>>>
			(first: InputIterator, last: InputIterator): void

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
		public merge<L extends Key, U extends T>(source: MapContainer<L, U>): void
		{
			this.insert(source.begin(), source.end());
			source.clear();
		}
	}
}