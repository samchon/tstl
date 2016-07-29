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
	 * <p> <a href="D:/Homepage/samchon.github.io/typescript-stl/images/class_diagram/map_containers.png" target="_blank"> 
	 * <img src="D:/Homepage/samchon.github.io/typescript-stl/images/class_diagram/map_containers.png" style="max-width: 100%" /></a> </p>
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
			this.insert_or_assign(key, val);
		}

		/**
		 * <p> Extract an element. </p>
		 *
		 * <p> Extracts the element pointed to by <i>key</i> and erases it from the {@link UniqueMap}. </p>
		 * 
		 * @param key Key value of the element whose mapped value is accessed.
		 * 
		 * @return A {@link Pair} containing the value pointed to by <i>key</i>.
		 */
		public extract(key: Key): Pair<Key, T>;

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
		public extract(it: MapIterator<Key, T>): MapIterator<Key, T>;

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
		public extract(it: MapReverseIterator<Key, T>): MapReverseIterator<Key, T>;

		public extract(param: Key | MapIterator<Key, T> | MapReverseIterator<Key, T>): any
		{
			if (param instanceof MapIterator)
				return this.extract_by_iterator(param);
			else if (param instanceof MapReverseIterator)
				return this.extract_by_reverse_iterator(param);
			else
				return this.extract_by_key(param);
		}

		/**
		 * @hidden
		 */
		private extract_by_key(key: Key): Pair<Key, T>
		{
			let it = this.find(key);
			if (it.equal_to(this.end()) == true)
				throw new OutOfRange("No such key exists.");

			return it.value;
		}

		/**
		 * @hidden
		 */
		private extract_by_iterator(it: MapIterator<Key, T>): MapIterator<Key, T>
		{
			if (it.equal_to(this.end()) == true || this.has(it.first) == false)
				return this.end();

			this.erase(it);
			return it;
		}

		/**
		 * @hidden
		 */
		private extract_by_reverse_iterator(it: MapReverseIterator<Key, T>): MapReverseIterator<Key, T>
		{
			this.extract_by_iterator(it.base().next());
			return it;
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
		 * <p> Insert or assign an element. </p>
		 *
		 * <p> Inserts an element or assigns to the current element if the <i>key</i> already exists. </p>
		 *
		 * <p> Because element <i>keys</i> in a {@link UniqueMap} are unique, the insertion operation checks whether
		 * each inserted element has a <i>key</i> equivalent to the one of an element already in the container, and
		 * if so, the element is assigned, returning an iterator to this existing element (if the function returns a 
		 * value). </p>
		 *
		 * <p> For a similar container allowing for duplicate elements, see {@link MultiMap}. </p>
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
		 * <p> Insert or assign an element. </p>
		 *
		 * <p> Inserts an element or assigns to the current element if the <i>key</i> already exists. </p>
		 *
		 * <p> Because element <i>keys</i> in a {@link UniqueMap} are unique, the insertion operation checks whether
		 * each inserted element has a <i>key</i> equivalent to the one of an element already in the container, and
		 * if so, the element is assigned, returning an iterator to this existing element (if the function returns a
		 * value). </p>
		 *
		 * <p> For a similar container allowing for duplicate elements, see {@link MultiMap}. </p>
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
		 * <p> Insert or assign an element. </p>
		 *
		 * <p> Inserts an element or assigns to the current element if the <i>key</i> already exists. </p>
		 *
		 * <p> Because element <i>keys</i> in a {@link UniqueMap} are unique, the insertion operation checks whether
		 * each inserted element has a <i>key</i> equivalent to the one of an element already in the container, and
		 * if so, the element is assigned, returning an iterator to this existing element (if the function returns a
		 * value). </p>
		 *
		 * <p> For a similar container allowing for duplicate elements, see {@link MultiMap}. </p>
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
				return this.insert_or_assign_with_key_value(args[0], args[1]);
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
				ret = this.insert_or_assign_with_hint(args[0], args[1], args[2]);

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
		private insert_or_assign_with_key_value(key: Key, value: T): Pair<MapIterator<Key, T>, boolean>
		{
			let it = this.find(key);

			if (it.equal_to(this.end()) == true)
				return this.insert_by_pair(std.make_pair(key, value));
			else
			{
				it.second = value;
				return std.make_pair(it, false);
			}
		}

		/**
		 * @hidden
		 */
		private insert_or_assign_with_hint(hint: MapIterator<Key, T>, key: Key, value: T): MapIterator<Key, T>
		{
			return this.insert_or_assign_with_key_value(key, value).first;
		}

		/* ---------------------------------------------------------
			UTILITIES
		--------------------------------------------------------- */
		/**
		 * <p> Swap content. </p>
		 * 
		 * <p> Exchanges the content of the container by the content of <i>obj</i>, which is another 
		 * {@link UniqueMap map} of the same type. Sizes abd container type may differ. </p>
		 * 
		 * <p> After the call to this member function, the elements in this container are those which were 
		 * in <i>obj</i> before the call, and the elements of <i>obj</i> are those which were in this. All 
		 * iterators, references and pointers remain valid for the swapped objects. </p>
		 *
		 * <p> Notice that a non-member function exists with the same name, {@link std.swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function. </p>
		 * 
		 * @param obj Another {@link UniqueMap map container} of the same type of elements as this (i.e.,
		 *			  with the same template parameters, <b>Key</b> and <b>T</b>) whose content is swapped 
		 *			  with that of this {@link UniqueMap container}.
		 */
		public swap(obj: UniqueMap<Key, T>): void
		{
			let vec = new Vector<Pair<Key, T>>(this.begin(), this.end());

			this.assign(obj.begin(), obj.end());
			obj.assign(vec.begin(), vec.end());
		}
	}
}