/// <reference path="MapContainer.ts" />

namespace std.base.container
{
	/**
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
		public constructor()
		{
			super();
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public count(key: Key): number
		{
			return this.find(key).equals(this.end()) ? 0 : 1;
		}

		/**
		 * <p> Get an element </p>
		 *
		 * <p> Returns a reference to the mapped value of the element identified with <i>key</i>. </p>
		 *
		 * @param key Key value of the element whose mapped value is accessed.
		 * @throw exception out of range
		 * @return A reference object of the mapped value (_Ty)
		 */
		public get(key: Key): T
		{
			let it = this.find(key);
			if (it.equals(this.end()) == true)
				throw new OutOfRange("unable to find the matched key.");

			return it.second;
		}

		/**
		 * <p> Set an item as the specified identifier. </p>
		 * 
		 * <p>If the identifier is already in map, change value of the identifier. If not, then insert the object with 
		 * the identifier. </p>
		 * 
		 * @param key Key value of the element whose mapped value is accessed.
		 * @param val Value, the item.
		 */
		public set(key: Key, val: T): void
		{
			let it = this.find(key);
			
			if (it.equals(this.end()) == true)
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
		 * <p> Extends the container by inserting new elements, effectively increasing the container size by the
		 * number of elements inserted. </p>
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
		public insert<L extends Key, U extends T>(pair: Pair<L, U>): Pair<MapIterator<Key, T>, boolean>;
		
		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> Extends the container by inserting new elements, effectively increasing the container size by the
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
		public insert<L extends Key, U extends T>
			(hint: MapIterator<Key, T>, pair: Pair<L, U>): MapIterator<Key, T>;

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