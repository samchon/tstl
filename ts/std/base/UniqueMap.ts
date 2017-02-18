/// <reference path="../API.ts" />

/// <reference path="MapContainer.ts" />

namespace std.base
{
	/**
	 * An abstract unique-map.
	 *
	 * {@link UniqueMap UniqueMaps} are associative containers that store elements formed by a combination of a 
	 * <i>key value</i> (<i>Key</i>) and a <i>mapped value</i> (<i>T</i>), and which allows for fast retrieval of 
	 * individual elements based on their keys.
	 *
	 * In a {@link MapContainer}, the <i>key values</i> are generally used to uniquely identify the elements, 
	 * while the <i>mapped values</i> store the content associated to this key. The types of <i>key</i> and
	 * <i>mapped value</i> may differ, and are grouped together in member type <i>value_type</i>, which is a
	 * {@link Pair} type combining both:
	 *
	 * <code>typedef pair<const Key, T> value_type;</code>
	 *
	 * {@link UniqueMap} stores elements, keeps sequence and enables indexing by inserting elements into a
	 * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index
	 * table like {@link RBTree tree} or {@link HashBuckets hash-table}.
	 *
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram" style="max-width: 100%" /></a>
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
		 * Get an element
		 *
		 * Returns a reference to the mapped value of the element identified with <i>key</i>.
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
			if (it.equals(this.end()) == true)
				throw new OutOfRange("unable to find the matched key.");

			return it.second;
		}

		/**
		 * Set an item as the specified identifier.
		 * 
		 * If the identifier is already in map, change value of the identifier. If not, then insert the object 
		 * with the identifier.
		 * 
		 * @param key Key value of the element whose mapped value is accessed.
		 * @param val Value, the item.
		 */
		public set(key: Key, val: T): void
		{
			this.insert_or_assign(key, val);
		}

		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		/**
		 * Construct and insert element.
		 * 
		 * Inserts a new element in the {@link UniqueMap} if its *key* is unique. This new element is constructed in 
		 * place using args as the arguments for the construction of a *value_type* (which is an  object of a 
		 * {@link Pair} type).
		 * 
		 * The insertion only takes place if no other element in the container has a *key equivalent* to the one 
		 * being emplaced (*keys* in a {@link UniqueMap} container are unique).
		 * 
		 * If inserted, this effectively increases the container {@link size} by one.
		 * 
		 * A similar member function exists, {@link insert}, which either copies or moves existing objects into the 
		 * container.
		 * 
		 * @param key The key used both to look up and to insert if not found.
		 * @param value Value, the item.
		 * 
		 * @return If the function successfully inserts the element (because no equivalent element existed already in 
		 *		   the {@link UniqueMap}), the function returns a {@link Pair} of an {@link MapIterator iterator} to 
		 *		   the newly inserted element and a value of true. Otherwise, it returns an 
		 *		   {@link MapIterator iterator} to the equivalent element within the container and a value of false.
		 */
		public emplace(key: Key, value: T): Pair<MapIterator<Key, T>, boolean>;

		/**
		 * Construct and insert element.
		 * 
		 * Inserts a new element in the {@link UniqueMap} if its *key* is unique. This new element is constructed in 
		 * place using args as the arguments for the construction of a *value_type* (which is an  object of a 
		 * {@link Pair} type).
		 * 
		 * The insertion only takes place if no other element in the container has a *key equivalent* to the one 
		 * being emplaced (*keys* in a {@link UniqueMap} container are unique).
		 * 
		 * If inserted, this effectively increases the container {@link size} by one.
		 * 
		 * A similar member function exists, {@link insert}, which either copies or moves existing objects into the 
		 * container.
		 * 
		 * @param pair A single argument of a {@link Pair} type with a value for the *key* as 
		 *			   {@link Pair.first first} member, and a *value* for the mapped value as 
		 *			   {@link Pair.second second}.
		 * 
		 * @return If the function successfully inserts the element (because no equivalent element existed already in 
		 *		   the {@link UniqueMap}), the function returns a {@link Pair} of an {@link MapIterator iterator} to 
		 *		   the newly inserted element and a value of true. Otherwise, it returns an 
		 *		   {@link MapIterator iterator} to the equivalent element within the container and a value of false.
		 */
		public emplace(pair: Pair<Key, T>): Pair<MapIterator<Key, T>, boolean>;

		public emplace(...args: any[]): Pair<MapIterator<Key, T>, boolean>
		{
			if (args.length == 1)
				return this._Insert_by_pair(args[0]);
			else
				return this._Insert_by_pair(make_pair<Key, T>(args[0], args[1]));
		}

		/**
		 * Insert an element.
		 *
		 * Extends the container by inserting new elements, effectively increasing the container {@link size} by 
		 * one.
		 *
		 * Because element <i>keys</i> in a {@link UniqueMap} are unique, the insertion operation checks whether
		 * each inserted element has a <i>key</i> equivalent to the one of an element already in the container, and
		 * if so, the element is not inserted, returning an iterator to this existing element (if the function
		 * returns a value).
		 *
		 * For a similar container allowing for duplicate elements, see {@link MultiMap}.
		 * 
		 * @param pair A single argument of a {@link Pair} type with a value for the *key* as
		 *			   {@link Pair.first first} member, and a *value* for the mapped value as
		 *			   {@link Pair.second second}.
		 *
		 * @return A {@link Pair}, with its member {@link Pair.first} set to an iterator pointing to either the newly 
		 *		   inserted element or to the element with an equivalent key in the {@link UniqueMap}. The 
		 *		   {@link Pair.second} element in the {@link Pair} is set to true if a new element was inserted or 
		 *		   false if an equivalent key already existed.
		 */
		public insert(pair: Pair<Key, T>): Pair<MapIterator<Key, T>, boolean>;
		
		/**
		 * Insert an element.
		 *
		 * Extends the container by inserting a new element, effectively increasing the container size by the
		 * number of elements inserted.
		 *
		 * Because element <i>keys</i> in a {@link UniqueMap} are unique, the insertion operation checks whether
		 * each inserted element has a <i>key</i> equivalent to the one of an element already in the container, and
		 * if so, the element is not inserted, returning an iterator to this existing element (if the function
		 * returns a value).
		 *
		 * For a similar container allowing for duplicate elements, see {@link MultiMap}.
		 * 
		 * @param tuple Tuple represensts the {@link Pair} to be inserted as an element.
		 *
		 * @return A {@link Pair}, with its member {@link Pair.first} set to an iterator pointing to either the newly
		 *		   inserted element or to the element with an equivalent key in the {@link UniqueMap}. The
		 *		   {@link Pair.second} element in the {@link Pair} is set to true if a new element was inserted or
		 *		   false if an equivalent key already existed.
		 */
		public insert<L extends Key, U extends T>
			(tuple: [L, U]): Pair<MapIterator<Key, T>, boolean>;

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

		/**
		 * Insert or assign an element.
		 *
		 * Inserts an element or assigns to the current element if the <i>key</i> already exists.
		 *
		 * Because element <i>keys</i> in a {@link UniqueMap} are unique, the insertion operation checks whether
		 * each inserted element has a <i>key</i> equivalent to the one of an element already in the container, and
		 * if so, the element is assigned, returning an iterator to this existing element (if the function returns a 
		 * value).
		 *
		 * For a similar container allowing for duplicate elements, see {@link MultiMap}.
		 * 
		 * @param key The key used both to look up and to insert if not found.
		 * @param value Value, the item.
		 * 
		 * @return A {@link Pair}, with its member {@link Pair.first} set to an iterator pointing to either the newly
		 *		   inserted element or to the element with an equivalent key in the {@link UniqueMap}. The
		 *		   {@link Pair.second} element in the {@link Pair} is set to true if a new element was inserted or
		 *		   false if an equivalent key already existed so the <i>value</i> is assigned.
		 */
		public insert_or_assign(key: Key, value: T): Pair<MapIterator<Key, T>, boolean>;

		/**
		 * Insert or assign an element.
		 *
		 * Inserts an element or assigns to the current element if the <i>key</i> already exists.
		 *
		 * Because element <i>keys</i> in a {@link UniqueMap} are unique, the insertion operation checks whether
		 * each inserted element has a <i>key</i> equivalent to the one of an element already in the container, and
		 * if so, the element is assigned, returning an iterator to this existing element (if the function returns a
		 * value).
		 *
		 * For a similar container allowing for duplicate elements, see {@link MultiMap}.
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param key The key used both to look up and to insert if not found.
		 * @param value Value, the item.
		 * 
		 * @return An iterator pointing to either the newly inserted element or to the element that already had an
		 *		   equivalent key in the {@link UniqueMap}.
		 */
		public insert_or_assign(hint: MapIterator<Key, T>, key: Key, value: T): MapIterator<Key, T>;

		/**
		 * Insert or assign an element.
		 *
		 * Inserts an element or assigns to the current element if the <i>key</i> already exists.
		 *
		 * Because element <i>keys</i> in a {@link UniqueMap} are unique, the insertion operation checks whether
		 * each inserted element has a <i>key</i> equivalent to the one of an element already in the container, and
		 * if so, the element is assigned, returning an iterator to this existing element (if the function returns a
		 * value).
		 *
		 * For a similar container allowing for duplicate elements, see {@link MultiMap}.
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param key The key used both to look up and to insert if not found.
		 * @param value Value, the item.
		 * 
		 * @return An iterator pointing to either the newly inserted element or to the element that already had an
		 *		   equivalent key in the {@link UniqueMap}.
		 */
		public insert_or_assign(hint: MapReverseIterator<Key, T>, key: Key, value: T): MapReverseIterator<Key, T>;

		public insert_or_assign(...args: any[]): any
		{
			if (args.length == 2)
			{
				return this._Insert_or_assign_with_key_value(args[0], args[1]);
			}
			else if (args.length == 3)
			{
				let ret: MapIterator<Key, T>;
				let is_reverse_iterator: boolean = false;

				// REVERSE_ITERATOR TO ITERATOR
				if (args[0] instanceof MapReverseIterator)
				{
					is_reverse_iterator = true;
					args[0] = (args[0] as MapReverseIterator<Key, T>).base().prev();
				}

				// INSERT OR ASSIGN AN ELEMENT
				ret = this._Insert_or_assign_with_hint(args[0], args[1], args[2]);

				// RETURN BRANCHES
				if (is_reverse_iterator == true)
					return new MapReverseIterator<Key, T>(ret.next());
				else
					return ret;
			}
		}

		/**
		 * @hidden
		 */
		private _Insert_or_assign_with_key_value(key: Key, value: T): Pair<MapIterator<Key, T>, boolean>
		{
			let it = this.find(key);

			if (it.equals(this.end()) == true)
				return this._Insert_by_pair(make_pair(key, value));
			else
			{
				it.second = value;
				return make_pair(it, false);
			}
		}

		/**
		 * @hidden
		 */
		private _Insert_or_assign_with_hint(hint: MapIterator<Key, T>, key: Key, value: T): MapIterator<Key, T>
		{
			return this._Insert_or_assign_with_key_value(key, value).first;
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * Extract an element.
		 *
		 * Extracts the element pointed to by <i>key</i> and erases it from the {@link UniqueMap}.
		 * 
		 * @param key Key value of the element whose mapped value is accessed.
		 * 
		 * @return A {@link Pair} containing the value pointed to by <i>key</i>.
		 */
		public extract(key: Key): Pair<Key, T>;

		/**
		 * Extract an element.
		 *
		 * Extracts the element pointed to by <i>key</i> and erases it from the {@link UniqueMap}.
		 *
		 * @param it An iterator pointing an element to extract.
		 * 
		 * @return An iterator pointing to the element immediately following <i>it</i> prior to the element being 
		 *		   erased. If no such element exists,returns {@link end end()}.
		 */
		public extract(it: MapIterator<Key, T>): MapIterator<Key, T>;

		/**
		 * Extract an element.
		 *
		 * Extracts the element pointed to by <i>key</i> and erases it from the {@link UniqueMap}.
		 *
		 * @param it An iterator pointing an element to extract.
		 * 
		 * @return An iterator pointing to the element immediately following <i>it</i> prior to the element being 
		 *		   erased. If no such element exists,returns {@link end end()}.
		 */
		public extract(it: MapReverseIterator<Key, T>): MapReverseIterator<Key, T>;

		public extract(param: Key | MapIterator<Key, T> | MapReverseIterator<Key, T>): any
		{
			if (param instanceof MapIterator)
				return this._Extract_by_iterator(param);
			else if (param instanceof MapReverseIterator)
				return this._Extract_by_reverse_iterator(param);
			else
				return this._Extract_by_key(param);
		}

		/**
		 * @hidden
		 */
		private _Extract_by_key(key: Key): Pair<Key, T>
		{
			let it = this.find(key);
			if (it.equals(this.end()) == true)
				throw new OutOfRange("No such key exists.");

			let ret: Pair<Key, T> = it.value;
			this.erase(it);

			return ret;
		}

		/**
		 * @hidden
		 */
		private _Extract_by_iterator(it: MapIterator<Key, T>): MapIterator<Key, T>
		{
			if (it.equals(this.end()) == true)
				return this.end();

			this.erase(it);
			return it;
		}

		/**
		 * @hidden
		 */
		private _Extract_by_reverse_iterator(it: MapReverseIterator<Key, T>): MapReverseIterator<Key, T>
		{
			this._Extract_by_iterator(it.base().next());
			return it;
		}

		/* ---------------------------------------------------------
			UTILITY
		--------------------------------------------------------- */
		/**
		 * Merge two maps.
		 * 
		 * Attempts to extract each element in *source* and insert it into this container. If there's an element in this
		 * container with key equivalent to the key of an element from *source*, tnen that element is not extracted from
		 * the *source*. Otherwise, no element with same key exists in this container, then that element will be 
		 * transfered from the *source* to this container.
		 * 
		 * @param source A {@link MapContainer map container} to transfer the elements from.
		 */
		public merge<L extends Key, U extends T>(source: MapContainer<L, U>): void
		{
			for (let it = source.begin(); !it.equals(source.end());)
			{
				if (this.has(it.first) == false)
				{
					this.insert(it.value);
					it = source.erase(it);
				}
				else
					it = it.next();
			}
		}
	}
}