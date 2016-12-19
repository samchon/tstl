/// <reference path="../API.ts" />

/// <reference path="ListContainer.ts" />

namespace std.base
{
	/**
	 * <p> An abstract map. </p>
	 *
	 * <p> {@link MapContainer MapContainers} are associative containers that store elements formed by a combination 
	 * of a <i>key value</i> (<i>Key</i>) and a <i>mapped value</i> (<i>T</i>), and which allows for fast retrieval 
	 * of individual elements based on their keys. </p>
	 *
	 * <p> In a {@link MapContainer}, the <i>key values</i> are generally used to identify the elements, while the 
	 * <i>mapped values</i> store the content associated to this key. The types of <i>key</i> and 
	 * <i>mapped value</i> may differ, and are grouped together in member type <i>value_type</i>, which is a 
	 * {@link Pair} type combining both: </p>
	 *
	 * <p> <code>typedef pair<const Key, T> value_type;</code> </p>
	 *
	 * <p> {@link MapContainer} stores elements, keeps sequence and enables indexing by inserting elements into a
	 * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index
	 * table like {@link RBTree tree} or {@link HashBuckets hash-table}. </p>
	 *
	 * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram" style="max-width: 100%" /></a> </p>
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
	 * </dl>
	 *
	 * @param <Key> Type of the keys. Each element in a map is identified by its key value.
	 * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class MapContainer<Key, T>
		extends Container<Pair<Key, T>>
	{
		/**
		 * @hidden
		 */
		private data_: MapElementList<Key, T>;

		/* ---------------------------------------------------------
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		protected constructor()
		{
			super();

			this.data_ = new MapElementList<Key, T>(this);
		}
		
		/**
		 * @inheritdoc
		 */
		public assign<L extends Key, U extends T, InputIterator extends Iterator<Pair<L, U>>>
			(first: InputIterator, last: InputIterator): void
		{
			// INSERT
			this.clear();
			this.insert(first, last);
		}

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			// TO BE ABSTRACT
			this.data_.clear();
		}

		/* =========================================================
			ACCESSORS
				- ITERATORS
				- ELEMENTS
		============================================================
			ITERATOR
		--------------------------------------------------------- */
		/**
		 * <p> Get iterator to element. </p>
		 * 
		 * <p> Searches the container for an element with a identifier equivalent to <i>key</i> and returns an 
		 * iterator to it if found, otherwise it returns an iterator to {@link end end()}. </p>
		 *
		 * <p> Two keys are considered equivalent if the container's comparison object returns false reflexively 
		 * (i.e., no matter the order in which the elements are passed as arguments). </p>
		 *
		 * <p> Another member functions, {@link has has()} and {@link count count()}, can be used to just check 
		 * whether a particular <i>key</i> exists. </p>
		 *
		 * @param key Key to be searched for
		 * @return An iterator to the element, if an element with specified <i>key</i> is found, or 
		 *		   {@link end end()} otherwise.
		 */
		public abstract find(key: Key): MapIterator<Key, T>;

		/**
		 * <p> Return iterator to beginning. </p>
		 * 
		 * <p> Returns an iterator referring the first element in the  </p>
		 *
		 * <h4> Note </h4>
		 * <p> If the container is {@link empty}, the returned iterator is same with {@link end end()}. </p>
		 *
		 * @return An iterator to the first element in the  The iterator containes the first element's value.
		 */
		public begin(): MapIterator<Key, T>
		{
			return this.data_.begin();
		}

		/**
		 * <p> Return iterator to end. </p>
		 * <p> Returns an iterator referring to the past-the-end element in the  </p>
		 *
		 * <p> The past-the-end element is the theoretical element that would follow the last element in the 
		 *  It does not point to any element, and thus shall not be dereferenced. </p>
		 *
		 * <p> Because the ranges used by functions of the container do not include the element reference by their 
		 * closing iterator, this function is often used in combination with {@link MapContainer}.{@link begin} to 
		 * specify a range including all the elements in the  </p>
		 *
		 * <h4> Note </h4>
		 * <p> Returned iterator from {@link MapContainer}.{@link end} does not refer any element. Trying to accessing 
		 * element by the iterator will cause throwing exception ({@link OutOfRange}). </p>
		 * 
		 * <p> If the container is {@link empty}, this function returns the same as {@link begin}. </p>
		 * 
		 * @return An iterator to the end element in the 
		 */
		public end(): MapIterator<Key, T>
		{
			return this.data_.end();
		}

		/**
		 * <p> Return {@link MapReverseIterator reverse iterator} to <i>reverse beginning</i>. </p>
		 * 
		 * <p> Returns a {@link MapReverseIterator reverse iterator} pointing to the last element in the container 
		 * (i.e., its <i>reverse beginning</i>). </p>
		 * 
		 * {@link MapReverseIterator Reverse iterators} iterate backwards: increasing them moves them towards the 
		 * beginning of the container. </p>
		 * 
		 * <p> {@link rbegin} points to the element preceding the one that would be pointed to by member {@link end}. 
		 * </p>7
		 *
		 * @return A {@link MapReverseIterator reverse iterator} to the <i>reverse beginning</i> of the sequence 
		 *		   
		 */
		public rbegin(): MapReverseIterator<Key, T>
		{
			return this.data_.rbegin();
		}

		/**
		 * <p> Return {@link MapReverseIterator reverse iterator} to <i>reverse end</i>. </p>
		 * 
		 * <p> Returns a {@link MapReverseIterator reverse iterator} pointing to the theoretical element right before 
		 * the first element in the {@link MapContainer map container} (which is considered its <i>reverse end</i>). 
		 * </p>
		 * 
		 * <p> The range between {@link MapContainer}.{@link rbegin} and {@link MapContainer}.{@link rend} contains 
		 * all the elements of the container (in reverse order). </p>
		 * 
		 * @return A {@link MapReverseIterator reverse iterator} to the <i>reverse end</i> of the sequence 
		 */
		public rend(): MapReverseIterator<Key, T>
		{
			return this.data_.rend();
		}

		/* ---------------------------------------------------------
			ELEMENTS
		--------------------------------------------------------- */
		/**
		 * <p> Whether have the item or not. </p>
		 * 
		 * <p> Indicates whether a map has an item having the specified identifier. </p>
		 *
		 * @param key Key value of the element whose mapped value is accessed.
		 *
		 * @return Whether the map has an item having the specified identifier.
		 */
		public has(key: Key): boolean
		{
			return !this.find(key).equals(this.end());
		}

		/**
		 * <p> Count elements with a specific key. </p>
		 * 
		 * <p> Searches the container for elements whose key is <i>key</i> and returns the number of elements found. </p>
		 *
		 * @param key Key value to be searched for.
		 *
		 * @return The number of elements in the container with a <i>key</i>.
		 */
		public abstract count(key: Key): number;

		/**
		 * Return the number of elements in the map.
		 */
		public size(): number
		{
			return this.data_.size();
		}
		
		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- UTILITY
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public push(...args: Pair<Key, T>[]): number;

		/**
		 * @inheritdoc
		 */
		public push(...args: [Key, T][]): number;

		public push(...args: any[]): number
		{
			// TO BE ABSTRACT
			for (let i: number = 0; i < args.length; i++)
				if (args[i] instanceof Pair)
					this._Insert_by_pair(args[i]);
				else if (args[i] instanceof Array)
					this._Insert_by_tuple(args[i]);

			return this.size();
		}

		/**
		 * Construct and insert element with hint
		 * 
		 * Inserts a new element in the {@link MapContainer map container}. This new element is constructed in 
		 * place using *args* as the arguments for the element's constructor. *hint* points to a location in the
		 * container suggested as a hint on where to start the search for its insertion point (the container may or 
		 * may not use this suggestion to optimize the insertion operation).
		 * 
		 * A similar member function exists, {@link insert}, which either copies or moves an existing object into 
		 * the container, and may also take a position *hint*.
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param key The key used both to look up and to insert if not found.
		 * @param value Value, the item.
		 * 
		 * @return An iterator pointing to either the newly inserted element or to the element that already had an
		 *		   equivalent key in the {@link MapContainer}.
		 */
		public emplace_hint(hint: MapIterator<Key, T>, key: Key, val: T): MapIterator<Key, T>;

		/**
		 * Construct and insert element with hint
		 *
		 * Inserts a new element in the {@link MapContainer map container}. This new element is constructed in
		 * place using *args* as the arguments for the element's constructor. *hint* points to a location in the
		 * container suggested as a hint on where to start the search for its insertion point (the container may or
		 * may not use this suggestion to optimize the insertion operation).
		 *
		 * A similar member function exists, {@link insert}, which either copies or moves an existing object into
		 * the container, and may also take a position *hint*.
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param key The key used both to look up and to insert if not found.
		 * @param value Value, the item.
		 * 
		 * @return An {@link MapIterator iterator} pointing to either the newly inserted element or to the element
		 *		   that already had an equivalent key in the {@link MapContainer}.
		 */
		public emplace_hint(hint: MapReverseIterator<Key, T>, key: Key, val: T): MapReverseIterator<Key, T>;

		/**
		 * Construct and insert element with hint
		 *
		 * Inserts a new element in the {@link MapContainer map container}. This new element is constructed in
		 * place using *args* as the arguments for the element's constructor. *hint* points to a location in the
		 * container suggested as a hint on where to start the search for its insertion point (the container may or
		 * may not use this suggestion to optimize the insertion operation).
		 *
		 * A similar member function exists, {@link insert}, which either copies or moves an existing object into
		 * the container, and may also take a position *hint*.
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param pair A single argument of a {@link Pair} type with a value for the *key* as
		 *			   {@link Pair.first first} member, and a *value* for the mapped value as
		 *			   {@link Pair.second second}.
		 *
		 * @return An iterator pointing to either the newly inserted element or to the element that already had an
		 *		   equivalent key in the {@link MapContainer}.
		 */
		public emplace_hint(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>;

		/**
		 * Construct and insert element with hint
		 *
		 * Inserts a new element in the {@link MapContainer map container}. This new element is constructed in
		 * place using *args* as the arguments for the element's constructor. *hint* points to a location in the
		 * container suggested as a hint on where to start the search for its insertion point (the container may or
		 * may not use this suggestion to optimize the insertion operation).
		 *
		 * A similar member function exists, {@link insert}, which either copies or moves an existing object into
		 * the container, and may also take a position *hint*.
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param pair A single argument of a {@link Pair} type with a value for the *key* as
		 *			   {@link Pair.first first} member, and a *value* for the mapped value as
		 *			   {@link Pair.second second}.
		 *
		 * @return An {@link MapIterator iterator} pointing to either the newly inserted element or to the element 
		 *		   that already had an equivalent key in the {@link MapContainer}.
		 */
		public emplace_hint(hint: MapReverseIterator<Key, T>, pair: Pair<Key, T>): MapReverseIterator<Key, T>;

		public emplace_hint(hint: any, ...args: any[]): any
		{
			if (args.length == 1)
				return this.insert(hint, args[0] as Pair<Key, T>);
			else
				return this.insert(hint, make_pair<Key, T>(args[0], args[1]));
		}

		/**
		 * <p> Insert an element. </p>
		 * 
		 * <p> Extends the container by inserting a new element, effectively increasing the container {@link size} 
		 * by the number of element inserted (zero or one). </p>
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param pair A single argument of a {@link Pair} type with a value for the *key* as
		 *			   {@link Pair.first first} member, and a *value* for the mapped value as
		 *			   {@link Pair.second second}.
		 *
		 * @return An iterator pointing to either the newly inserted element or to the element that already had an 
		 *		   equivalent key in the {@link MapContainer}.
		 */
		public insert(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>;

		/**
		 * <p> Insert an element. </p>
		 * 
		 * <p> Extends the container by inserting a new element, effectively increasing the container {@link size} 
		 * by the number of element inserted (zero or one). </p>
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param pair A single argument of a {@link Pair} type with a value for the *key* as
		 *			   {@link Pair.first first} member, and a *value* for the mapped value as
		 *			   {@link Pair.second second}.
		 *
		 * @return An iterator pointing to either the newly inserted element or to the element that already had an 
		 *		   equivalent key in the {@link MapContainer}.
		 */
		public insert(hint: MapReverseIterator<Key, T>, pair: Pair<Key, T>): MapReverseIterator<Key, T>;
		
		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> Extends the container by inserting new elements, effectively increasing the container {@link size} 
		 * by the number of elements inserted. </p>
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param tuple Tuple represensts the {@link Pair} to be inserted as an element.
		 * 
		 * @return An iterator pointing to either the newly inserted element or to the element that already had an
		 *		   equivalent key in the {@link MapContainer}.
		 */
		public insert<L extends Key, U extends T>
			(hint: MapIterator<Key, T>, tuple: [L, U]): MapIterator<Key, T>;

		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> Extends the container by inserting new elements, effectively increasing the container {@link size} 
		 * by the number of elements inserted. </p>
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param tuple Tuple represensts the {@link Pair} to be inserted as an element.
		 * 
		 * @return An iterator pointing to either the newly inserted element or to the element that already had an
		 *		   equivalent key in the {@link MapContainer}.
		 */
		public insert<L extends Key, U extends T>
			(hint: MapReverseIterator<Key, T>, tuple: [L, U]): MapReverseIterator<Key, T>;
		
		/**
		 * <p> Insert elements from range iterators. </p>
		 *
		 * <p> Extends the container by inserting new elements, effectively increasing the container {@link size} by 
		 * the number of elements inserted. </p> 
		 *
		 * @param begin Input iterator specifying initial position of a range of elements.
		 * @param end Input iterator specifying final position of a range of elements.
		 *			  Notice that the range includes all the elements between <i>begin</i> and <i>end</i>, 
		 *			  including the element pointed by <i>begin</i> but not the one pointed by <i>end</i>.
		 */
		public insert<L extends Key, U extends T, InputIterator extends Iterator<Pair<L, U>>>
			(first: InputIterator, last: InputIterator): void;

		public insert(...args: any[]): any
		{
			if (args.length == 1 && args[0] instanceof Pair)
			{
				return this._Insert_by_pair(args[0]);
			}
			else if (args.length == 1 && args[0] instanceof Array)
			{
				return this._Insert_by_tuple(args[0]);
			}
			else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
			{
				return this._Insert_by_range(args[0], args[1]);
			}
			else
			{
				let ret: MapIterator<Key, T>;
				let is_reverse_iterator: boolean = false;

				// REVERSE_ITERATOR TO ITERATOR
				if (args[0] instanceof MapReverseIterator)
				{
					is_reverse_iterator = true;
					args[0] = (args[0] as MapReverseIterator<Key, T>).base().prev();
				}

				// INSERT AN ELEMENT
				if (args[1] instanceof Pair)
					ret = this._Insert_by_hint(args[0], args[1]);
				else
					ret = this._Insert_by_hint_with_tuple(args[0], args[1]);

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
		protected abstract _Insert_by_pair<L extends Key, U extends T>(pair: Pair<L, U>): any;
		
		/**
		 * @hidden
		 */
		private _Insert_by_tuple<L extends Key, U extends T>(tuple: [L, U]): any
		{
			return this._Insert_by_pair(new Pair<L, U>(tuple[0], tuple[1]));
		}

		/**
		 * @hidden
		 */
		protected abstract _Insert_by_hint(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>;

		/**
		 * @hidden
		 */
		private _Insert_by_hint_with_tuple(hint: MapIterator<Key, T>, tuple: [Key, T]): MapIterator<Key, T>
		{
			return this._Insert_by_hint(hint, make_pair(tuple[0], tuple[1]));
		}

		/**
		 * @hidden
		 */
		protected abstract _Insert_by_range<L extends Key, U extends T, InputIterator extends Iterator<Pair<L, U>>>
			(first: InputIterator, last: InputIterator): void;

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * <p> Erase an elemet by key. </p>
		 *
		 * <p> Removes from the {@link MapContainer map container} a single element. </p>
		 *
		 * <p> This effectively reduces the container {@link size} by the number of element removed (zero or one), 
		 * which are destroyed. </p>
		 * 
		 * @param key Key of the element to be removed from the {@link MapContainer}.
		 */
		public erase(key: Key): number;
		
		/**
		 * <p> Erase an elemet by iterator. </p>
		 *
		 * <p> Removes from the {@link MapContainer map container} a single element. </p>
		 *
		 * <p> This effectively reduces the container {@link size} by the number of element removed (zero or one), 
		 * which are destroyed. </p>
		 * 
		 * @param it Iterator specifying position winthin the {@link MapContainer map contaier} to be removed.
		 */
		public erase(it: MapIterator<Key, T>): MapIterator<Key, T>;
		
		/**
		 * <p> Erase elements by range iterators. </p>
		 *
		 * <p> Removes from the {@link MapContainer map container} a range of elements. </p>
		 *
		 * <p> This effectively reduces the container {@link size} by the number of elements removed, which are 
		 * destroyed. </p>
		 * 
		 * @param begin An iterator specifying initial position of a range within {@link MApContainer map container}
		 *				to be removed.
		 * @param end An iterator specifying initial position of a range within {@link MApContainer map container}
		 *			  to be removed.
		 *			  Notice that the range includes all the elements between <i>begin</i> and <i>end</i>,
		 *			  including the element pointed by <i>begin</i> but not the one pointed by <i>end</i>.
		 */
		public erase(begin: MapIterator<Key, T>, end: MapIterator<Key, T>): MapIterator<Key, T>;

		/**
		 * <p> Erase an elemet by iterator. </p>
		 *
		 * <p> Removes from the {@link MapContainer map container} a single element. </p>
		 *
		 * <p> This effectively reduces the container {@link size} by the number of element removed (zero or one), 
		 * which are destroyed. </p>
		 * 
		 * @param it Iterator specifying position winthin the {@link MapContainer map contaier} to be removed.
		 */
		public erase(it: MapReverseIterator<Key, T>): MapReverseIterator<Key, T>;

		/**
		 * <p> Erase elements by range iterators. </p>
		 *
		 * <p> Removes from the {@link MapContainer map container} a range of elements. </p>
		 *
		 * <p> This effectively reduces the container {@link size} by the number of elements removed, which are 
		 * destroyed. </p>
		 * 
		 * @param begin An iterator specifying initial position of a range within {@link MApContainer map container}
		 *				to be removed.
		 * @param end An iterator specifying initial position of a range within {@link MApContainer map container}
		 *			  to be removed.
		 *			  Notice that the range includes all the elements between <i>begin</i> and <i>end</i>,
		 *			  including the element pointed by <i>begin</i> but not the one pointed by <i>end</i>.
		 */
		public erase(begin: MapReverseIterator<Key, T>, end: MapReverseIterator<Key, T>): MapReverseIterator<Key, T>;

		public erase(...args: any[]): any 
		{
			if (args.length == 1 && (args[0] instanceof Iterator == false || args[0].get_source() != this))
				return this._Erase_by_key(args[0]);
			else
				if (args.length == 1)
					return this._Erase_by_iterator(args[0]);
				else
					return this._Erase_by_iterator(args[0], args[1]);
		}

		/**
		 * @hidden
		 */
		private _Erase_by_key(key: Key): number
		{
			let it = this.find(key);
			if (it.equals(this.end()) == true)
				return 0;

			this._Erase_by_iterator(it);
			return 1;
		}

		/**
		 * @hidden
		 */
		private _Erase_by_iterator(first: any, last: any = first.next()): any
		{
			let ret: MapIterator<Key, T>;
			let is_reverse_iterator: boolean = false;

			// REVERSE ITERATOR TO ITERATOR
			if (first instanceof MapReverseIterator)
			{
				is_reverse_iterator = true;

				let first_it = (last as MapReverseIterator<Key, T>).base();
				let last_it = (first as MapReverseIterator<Key, T>).base();

				first = first_it;
				last = last_it;
			}

			// ERASE ELEMENTS
			ret = this._Erase_by_range(first, last);

			// RETURN BRANCHES
			if (is_reverse_iterator == true)
				return new MapReverseIterator<Key, T>(ret.next());
			else
				return ret;
		}

		/**
		 * @hidden
		 */
		private _Erase_by_range(first: MapIterator<Key, T>, last: MapIterator<Key, T>): MapIterator<Key, T>
		{
			// ERASE
			let it = this.data_.erase(first, last);
			
			// POST-PROCESS
			this._Handle_erase(first, last);

			return it; 
		}

		/* ---------------------------------------------------------
			UTILITY
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected _Swap(obj: MapContainer<Key, T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
		}

		/**
		 * Merge two maps.
		 * 
		 * Extracts and transfers elements from *source* to this container.
		 * 
		 * @param source A {@link MapContainer map container} to transfer the elements from.
		 */
		public abstract merge<L extends Key, U extends T>(source: MapContainer<L, U>): void;

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * <p> Abstract method handling insertions for indexing. </p>
		 *
		 * <p> This method, {@link _Handle_insert} is designed to register the <i>first to last</i> to somewhere storing 
		 * those {@link MapIterator iterators} for indexing, fast accessment and retrievalance. </p>
		 *
		 * <p> When {@link insert} is called, new elements will be inserted into the {@link data_ list container} and new 
		 * {@link MapIterator iterators} <i>first to last</i>, pointing the inserted elements, will be created and the
		 * newly created iterators <i>first to last</i> will be shifted into this method {@link _Handle_insert} after the 
		 * insertions. </p>
		 *
		 * <p> If the derived one is {@link RBTree tree-based} like {@link TreeSet}, the {@link MapIterator iterators}
		 * will be registered into the {@link TreeSet.tree_ tree} as a {@link XTreeNode tree node item}. Else if the 
		 * derived one is {@link HashBuckets hash-based} like {@link HashSet}, the <i>first</i> to <i>last</i> will be 
		 * registered into the {@link HashSet.hash_buckets_ hash bucket}. </p>
		 *  
		 * @param first An {@link MapIterator} to the initial position in a sequence.
		 * @param last An {@link MapIterator} to the final position in a sequence. The range used is
		 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>, 
		 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
		 */
		protected abstract _Handle_insert(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void;

		/**
		 * <p> Abstract method handling deletions for indexing. </p>
		 * 
		 * <p> This method, {@link _Handle_erase} is designed to unregister the <i>first to last</i> to somewhere storing
		 * those {@link MapIterator iterators} for indexing, fast accessment and retrievalance. </p>
		 *
		 * <p> When {@link erase} is called with <i>first to last</i>, {@link MapIterator iterators} positioning somewhere
		 * place to be deleted, is memorized and shifted to this method {@link _Handle_erase} after the deletion process is 
		 * terminated. </p>
		 *
		 * <p> If the derived one is {@link RBTree tree-based} like {@link TreeSet}, the {@link MapIterator iterators}
		 * will be unregistered from the {@link TreeSet.tree_ tree} as a {@link XTreeNode tree node item}. Else if the 
		 * derived one is {@link HashBuckets hash-based} like {@link HashSet}, the <i>first to last</i> will be 
		 * unregistered from the {@link HashSet.hash_buckets_ hash bucket}. </p>
		 * 
		 * @param first An {@link MapIterator} to the initial position in a sequence.
		 * @param last An {@link MapIterator} to the final position in a sequence. The range used is
		 *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
		 *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
		 */
		protected abstract _Handle_erase(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void;
	}

	/**
	 * @hidden
	 */
	export class MapElementList<Key, T> extends ListContainer<Pair<Key, T>, MapIterator<Key, T>>
	{
		private associative_: MapContainer<Key, T>;
		private rend_: MapReverseIterator<Key, T>;

		public constructor(associative: MapContainer<Key, T>)
		{
			super();

			this.associative_ = associative;
		}

		protected _Create_iterator(prev: MapIterator<Key, T>, next: MapIterator<Key, T>, val: Pair<Key, T>): MapIterator<Key, T>
		{
			return new MapIterator<Key, T>(this, prev, next, val);
		}
		protected _Set_begin(it: MapIterator<Key, T>): void
		{
			super._Set_begin(it);
			this.rend_ = new MapReverseIterator<Key, T>(it);
		}

		public get_associative(): MapContainer<Key, T>
		{
			return this.associative_;
		}
		public rbegin(): MapReverseIterator<Key, T>
		{
			return new MapReverseIterator<Key, T>(this.end());
		}
		public rend(): MapReverseIterator<Key, T>
		{
			return this.rend_;
		}
	}
}

namespace std
{
	/**
	 * <p> An iterator of {@link MapContainer map container}. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram" style="max-width: 100%" /></a> </p>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class MapIterator<Key, T>
		extends base.ListIteratorBase<Pair<Key, T>>
		implements IComparable<MapIterator<Key, T>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the {@link MapContainer source map} and {@link ListIterator list iterator}. 
		 *
		 * @param source The source {@link MapContainer}.
		 * @param list_iterator A {@link ListIterator} pointing {@link Pair} of <i>key</i> and <i>value</i>.
		 */
		public constructor(source: base.MapElementList<Key, T>, prev: MapIterator<Key, T>, next: MapIterator<Key, T>, val: Pair<Key, T>)
		{
			super(source, prev, next, val);
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * Get iterator to previous element.
		 */
		public prev(): MapIterator<Key, T>
		{
			return this["prev_"] as MapIterator<Key, T>;
		}

		/**
		 * Get iterator to next element.
		 */
		public next(): MapIterator<Key, T>
		{
			return this["next_"] as MapIterator<Key, T>;
		}

		/**
		 * Advances the Iterator by n element positions.
		 *
		 * @param step Number of element positions to advance.
		 * @return An advanced Iterator.
		 */
		public advance(step: number): MapIterator<Key, T>
		{
			return super.advance(step) as MapIterator<Key, T>;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		public get_source(): base.MapContainer<Key, T>
		{
			return (super.get_source() as base.MapElementList<Key, T>).get_associative();
		}

		/**
		 * Get first, key element.
		 */
		public get first(): Key
		{
			return this.value.first;
		}

		/**
		 * Get second, value element.
		 */
		public get second(): T
		{
			return this.value.second;
		}

		/**
		 * Set second value.
		 */
		public set second(val: T)
		{
			this.value.second = val;
		}

		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public less(obj: MapIterator<Key, T>): boolean
		{
			return std.less(this.first, obj.first);
		}
		
		/**
		 * @inheritdoc
		 */
		public equals(obj: MapIterator<Key, T>): boolean 
		{
			return this == obj;
		}

		/**
		 * @inheritdoc
		 */
		public hashCode(): number
		{
			return std.hash(this.first);
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: MapIterator<Key, T>): void
		{
			super.swap(obj);
		}
	}

	/**
	 * <p> A reverse-iterator of {@link MapContainer map container}. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram" style="max-width: 100%" /></a> </p>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class MapReverseIterator<Key, T>
		extends ReverseIterator<Pair<Key, T>, MapIterator<Key, T>, MapReverseIterator<Key, T>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
		 */
		public constructor(base: MapIterator<Key, T>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: MapIterator<Key, T>): MapReverseIterator<Key, T>
		{
			return new MapReverseIterator<Key, T>(base);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Get first, key element.
		 */
		public get first(): Key
		{
			return this.base_.first;
		}

		/**
		 * Get second, value element.
		 */
		public get second(): T
		{
			return this.base_.second;
		}

		/**
		 * Set second value.
		 */
		public set second(val: T)
		{
			this.base_.second = val;
		}
	}
}