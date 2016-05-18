/// <reference path="../API.ts" />

/// <reference path="MapContainer.ts" />

namespace std.base
{
	/**
	 * <p> An abstract unique-map. </p>
	 *
	 * <p> {@link UniqueMap UniqueMaps} are associative containers that store elements formed by a combination of a 
	 * <i>key value</i> (<i>Key</i>) and a <i>mapped value</i> (<i>T</i>), and which allows for fast retrieval of 
	 * individual elements based on their keys. </p>
	 *
	 * <p> In a {@link MapContainer}, the <i>key values</i> are generally used to uniquely identify the elements, 
	 * while the <i>mapped values</i> store the content associated to this key. The types of <i>key</i> and
	 * <i>mapped value</i> may differ, and are grouped together in member type <i>value_type</i>, which is a
	 * {@link Pair} type combining both: </p>
	 *
	 * <p> <code>typedef pair<const Key, T> value_type;</code> </p>
	 *
	 * <p> {@link UniqueMap} stores elements, keeps sequence and enables indexing by inserting elements into a
	 * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index
	 * table like {@link RBTree tree} or {@link HashBuckets hash-table}. </p>
	 *
	 * <h3> Container properties </h3>
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
	 *	<dt> Unique keys </dt>
	 *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
	 * </dl>
	 *
	 * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
	 * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class UniqueMap<Key, T>
		extends MapContainer<Key, T>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from elements.
		 */
		public constructor(items: Array<Pair<Key, T>>);

		/**
		 * Contruct from tuples.
		 *
		 * @param array Tuples to be contained.
		 */
		public constructor(array: Array<[Key, T]>);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: MapContainer<Key, T>);

		/**
		 * Construct from range iterators.
		 */
		public constructor(begin: MapIterator<Key, T>, end: MapIterator<Key, T>);

		/**
		 * Default Constructor.
		 */
		public constructor()
		{
			super();

			// THIS IS ABSTRACT CLASS
			// NOTHING TO DO ESPECIALLY
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public count(key: Key): number
		{
			return this.find(key).equal_to(this.end()) ? 0 : 1;
		}

		/**
		 * <p> Get an element </p>
		 *
		 * <p> Returns a reference to the mapped value of the element identified with <i>key</i>. </p>
		 *
		 * @param key Key value of the element whose mapped value is accessed.
		 * 
		 * @throw exception out of range
		 * 
		 * @return A reference object of the mapped value (_Ty)
		 */
		public get(key: Key): T
		{
			let it = this.find(key);
			if (it.equal_to(this.end()) == true)
				throw new OutOfRange("unable to find the matched key.");

			return it.second;
		}

		/**
		 * <p> Set an item as the specified identifier. </p>
		 * 
		 * <p>If the identifier is already in map, change value of the identifier. If not, then insert the object 
		 * with the identifier. </p>
		 * 
		 * @param key Key value of the element whose mapped value is accessed.
		 * @param val Value, the item.
		 */
		public set(key: Key, val: T): void
		{
			let it = this.find(key);
			
			if (it.equal_to(this.end()) == true)
				this.insert(new Pair<Key, T>(key, val));
			else
				it.second = val;
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> Extends the container by inserting new elements, effectively increasing the container {@link size} by 
		 * one. </p>
		 *
		 * <p> Because element <i>keys</i> in a {@link UniqueMap} are unique, the insertion operation checks whether
		 * each inserted element has a <i>key</i> equivalent to the one of an element already in the container, and
		 * if so, the element is not inserted, returning an iterator to this existing element (if the function
		 * returns a value). </p>
		 *
		 * <p> For a similar container allowing for duplicate elements, see {@link MultiMap}. </p>
		 * 
		 * @param pair {@link Pair} to be inserted as an element.
		 *
		 * @return A {@link Pair}, with its member {@link Pair.first} set to an iterator pointing to either the newly 
		 *		   inserted element or to the element with an equivalent key in the {@link UniqueMap}. The 
		 *		   {@link Pair.second} element in the {@link Pair} is set to true if a new element was inserted or 
		 *		   false if an equivalent key already existed.
		 */
		public insert(pair: Pair<Key, T>): Pair<MapIterator<Key, T>, boolean>;
		
		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> Extends the container by inserting a new element, effectively increasing the container size by the
		 * number of elements inserted. </p>
		 *
		 * <p> Because element <i>keys</i> in a {@link UniqueMap} are unique, the insertion operation checks whether
		 * each inserted element has a <i>key</i> equivalent to the one of an element already in the container, and
		 * if so, the element is not inserted, returning an iterator to this existing element (if the function
		 * returns a value). </p>
		 *
		 * <p> For a similar container allowing for duplicate elements, see {@link MultiMap}. </p>
		 * 
		 * @param tuple Tuple represensts the {@link Pair} to be inserted as an element.
		 *
		 * @return A {@link Pair}, with its member {@link Pair.first} set to an iterator pointing to either the newly
		 *		   inserted element or to the element with an equivalent key in the {@link UniqueMap}. The
		 *		   {@link Pair.second} element in the {@link Pair} is set to true if a new element was inserted or
		 *		   false if an equivalent key already existed.
		 */
		public insert<L extends Key, U extends T>(tuple: [L, U]): Pair<MapIterator<Key, T>, boolean>;

		/**
		 * @inheritdoc
		 */
		public insert(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public insert<L extends Key, U extends T>
			(hint: MapIterator<Key, T>, tuple: [L, U]): MapIterator<Key, T>;

		/**
		 * @inheritdoc
		 */
		public insert<L extends Key, U extends T>
			(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;

		public insert(...args: any[]): any
		{
			return super.insert.apply(this, args);
		}
	}
}