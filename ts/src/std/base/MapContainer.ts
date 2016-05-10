namespace std
{
export namespace base
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
	 * <h3> Container properties </h3>
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd> 
	 *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute position 
	 *		in the  
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
	{
		/**
		 * Type definition of {@link MapContainer}'s {@link MapIterator iterator}.
		 */
		public static get iterator() { return MapIterator; }

		/**
		 * <p> {@link List} storing elements. </p>
		 *
		 * <p> Storing elements and keeping those sequence of the {@link MapContainer} are implemented by
		 * {@link data_ this list container}. Implementing index-table is also related with {@link data_ this list} 
		 * by storing {@link ListIterator iterators} ({@link MapIterator} references {@link ListIterator}) who are 
		 * created from {@link data_ here}. </p>
		 */
		protected data_: List<Pair<Key, T>>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
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

		public constructor(...args: any[])
		{
			this.data_ = new List<Pair<Key, T>>();

			// THIS IS ABSTRACT CLASS
			// NOTHING TO DO ESPECIALLY
		}

		/**
		 * @hidden
		 */
		protected construct_from_array(items: Array<Pair<Key, T> | [Key, T]>): void
		{
			for (let i: number = 0; i < items.length; i++)
				if (items[i] instanceof Pair)
					this.insert_by_pair(items[i] as Pair<Key, T>);
				else
					this.insert_by_tuple(items[i] as [Key, T]);
		}

		/**
		 * @hidden
		 */
		protected construct_from_container(container: MapContainer<Key, T>): void
		{
			this.construct_from_range(container.begin(), container.end());
		}

		/**
		 * @hidden
		 */
		protected construct_from_range(begin: MapIterator<Key, T>, end: MapIterator<Key, T>): void
		{
			this.assign(begin, end);
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * <p> Assign new content to content. </p>
		 *
		 * <p> Assigns new contents to the container, replacing its current contents, and modifying its {@link size} 
		 * accordingly. </p>
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public assign<L extends Key, U extends T>
			(begin: MapIterator<L, U>, end: MapIterator<L, U>): void
		{
			// INSERT
			for (let it = begin; it.equal_to(end) == false; it = it.next())
				this.insert_by_pair(new Pair<Key, T>(it.first, it.second));
		}

		/**
		 * <p> Clear content. </p>
		 *
		 * <p> Removes all elements from the container, leaving the container with a size of 0. </p>
		 */
		public clear(): void
		{
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
			return new MapIterator<Key, T>(this, this.data_.begin());
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
			return new MapIterator<Key, T>(this, this.data_.end());
		}

		/**
		 * <p> Return {@link MapReverseIterator reverse iterator} to <i>reverse beginning</i>. </p>
		 * 
		 * <p> Returns a {@link MapReverseIterator reverse iterator} pointing to the last element in the container 
		 * (i.e., its <i>reverse beginning</i>). </p>
		 * 
		 * {@link MapReverseIterator Reverse iterators} iterate backwards: increasing them moves them towards the 
		 * beginning of the  </p>
		 * 
		 * <p> {@link rbegin} points to the element preceding the one that would be pointed to by member {@link end}. 
		 * </p>
		 *
		 * @return A {@link MapReverseIterator reverse iterator} to the <i>reverse beginning</i> of the sequence 
		 *		   
		 */
		public rbegin(): MapReverseIterator<Key, T>
		{
			if (this.empty() == true)
				return this.rend();
			else
				return new MapReverseIterator<Key, T>(this, this.data_.end().prev());
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
			return new MapReverseIterator<Key, T>(this, this.data_.end());
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
			return this.count(key) != 0;
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

		/**
		 * Test whether the container is empty.
		 */
		public empty(): boolean
		{
			return this.size() == 0;
		}
		
		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- POST-PROCESS
				- HASH CODE
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * <p> Insert an element. </p>
		 * 
		 * <p> Extends the container by inserting a new element, effectively increasing the container {@link size} 
		 * by the number of element inserted (zero or one). </p>
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param pair {@link Pair} to be inserted as an element.
		 *
		 * @return An iterator pointing to either the newly inserted element or to the element that already had an 
		 *		   equivalent key in the {@link MapContainer}.
		 */
		public insert(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>;

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
		public insert<L extends Key, U extends T>
			(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;

		public insert(...args: any[]): any
		{
			if (args.length == 1 && args[0] instanceof Pair)
			{
				return this.insert_by_pair(args[0]);
			}
			else if (args.length == 1 && args[0] instanceof Array)
			{
				return this.insert_by_tuple(args[0]);
			}
			else if (args.length == 2 && args[0] instanceof MapIterator && args[1] instanceof Pair)
			{
				return this.insert_by_hint(args[0], args[1]);
			}
			else if (args.length == 2 && args[0] instanceof MapIterator && args[1] instanceof Array)
			{
				return this.insert_by_hint_with_tuple(args[0], args[1]);
			}
			else if (args.length == 2 && args[0] instanceof MapIterator && args[1] instanceof MapIterator)
			{
				return this.insert_by_range(args[0], args[1]);
			}
		}

		/**
		 * @hidden
		 */
		protected abstract insert_by_pair<L extends Key, U extends T>(pair: Pair<L, U>): any;
		
		/**
		 * @hidden
		 */
		private insert_by_tuple<L extends Key, U extends T>(tuple: [L, U]): any
		{
			return this.insert_by_pair(new Pair<L, U>(tuple[0], tuple[1]));
		}

		/**
		 * @hidden
		 */
		protected insert_by_hint(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>
		{
			// INSERT
			let list_it = this.data_.insert(hint.get_list_iterator(), pair);

			// POST-PROCESS
			let it = new MapIterator<Key, T>(this, list_it);
			this.handle_insert(it);

			return it;
		}

		/**
		 * @hidden
		 */
		private insert_by_hint_with_tuple<L extends Key, U extends T>
			(hint: MapIterator<Key, T>, tuple: [L, U]): MapIterator<Key, T>
		{
			return this.insert_by_hint(hint, new Pair<L, U>(tuple[0], tuple[1]));
		}

		/**
		 * @hidden
		 */
		protected insert_by_range<L extends Key, U extends T>
			(begin: MapIterator<L, U>, end: MapIterator<L, U>): void
		{
			for (let it = begin; it.equal_to(end) == false; it = it.next())
				this.insert_by_pair(new Pair<Key, T>(it.first, it.second));
		}
		

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

		public erase(...args: any[]): any 
		{
			if (args.length == 1)
			{
				if (args[0] instanceof MapIterator && args[0].get_source() == this)
					return this.erase_by_iterator(args[0]);
				else
					return this.erase_by_key(args[0]);
			}
			else if (args.length == 2 && args[0] instanceof MapIterator && args[1] instanceof MapIterator)
				return this.erase_by_range(args[0], args[1]);
		}

		/**
		 * @hidden
		 */
		private erase_by_key(key: Key): number
		{
			let it = this.find(key);
			if (it.equal_to(this.end()) == true)
				return 0;

			this.erase_by_iterator(it);
			return 1;
		}

		/**
		 * @hidden
		 */
		private erase_by_iterator(it: MapIterator<Key, T>): MapIterator<Key, T>
		{
			// ERASE
			let listIterator = this.data_.erase(it.get_list_iterator());
			
			// POST-PROCESS
			this.handle_erase(<MapIterator<Key, T>>it);

			return new MapIterator<Key, T>(this, listIterator);;
		}

		/**
		 * @hidden
		 */
		private erase_by_range(begin: MapIterator<Key, T>, end: MapIterator<Key, T>): MapIterator<Key, T>
		{
			// ERASE
			let listIterator = this.data_.erase(begin.get_list_iterator(), end.get_list_iterator());
			
			// POST-PROCESS
			for (let it = begin; !it.equal_to(end); it = it.next())
				this.handle_erase(it);

			return new MapIterator<Key, T>(this, listIterator);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * <p> Abstract method handling insertion for indexing. </p>
		 *
		 * <p> This method, {@link handle_insert} is designed to register the <i>item</i> to somewhere storing those
		 * {@link MapIterator iterators} for indexing, fast accessment and retrievalance. </p>
		 *
		 * <p> When {@link insert} is called, a new element will be inserted into the {@link data_ list container} 
		 * and a new {@link MapIterator iterator} <i>item</i>, pointing the element, will be created and the newly 
		 * created iterator <i>item</i> will be shifted into this method {@link handle_insert} after the insertion. </p>
		 *
		 * <p> If the derived one is {@link RBTree tree-based} like {@link TreeMap}, the <i>item</i> will be 
		 * registered into the {@link TreeMap.tree_ tree} as a {@link XTreeNode tree node item}. Else if the derived 
		 * one is {@link HashBuckets hash-based} like {@link HashSet}, the <i>item</i> will be registered into the 
		 * {@link HashMap.hash_buckets_ hash bucket}. </p>
		 *  
		 * @param item Iterator of inserted item.
		 */
		protected abstract handle_insert(item: MapIterator<Key, T>): void;

		/**
		 * <p> Abstract method handling deletion for indexing. </p>
		 * 
		 * <p> This method, {@link handle_insert} is designed to unregister the <i>item</i> to somewhere storing 
		 * those {@link MapIterator iterators} for indexing, fast accessment and retrievalance. </p>
		 *
		 * <p> When {@link erase} is called with <i>item</i>, an {@link MapIterator iterator} positioning somewhere
		 * place to be deleted, is memorized and shifted to this method {@link handle_erase} after the deletion
		 * process is terminated. </p>
		 *
		 * <p> If the derived one is {@link RBTree tree-based} like {@link TreeMap}, the <i>item</i> will be
		 * unregistered from the {@link TreeMap.tree_ tree} as a {@link XTreeNode tree node item}. Else if the 
		 * derived one is {@link HashBuckets hash-based} like {@link HashSet}, the <i>item</i> will be unregistered 
		 * from the {@link HashMap.hash_buckets_ hash bucket}. </p>
		 * 
		 * @param item Iterator of erased item.
		 */
		protected abstract handle_erase(item: MapIterator<Key, T>): void;

		/* ===============================================================
			UTILITIES
		=============================================================== */
		/**
		 * <p> Swap content. </p>
		 * 
		 * <p> Exchanges the content of the container by the content of <i>obj</i>, which is another 
		 * {@link MapContainer map} of the same type. Sizes abd container type may differ. </p>
		 * 
		 * <p> After the call to this member function, the elements in this container are those which were 
		 * in <i>obj</i> before the call, and the elements of <i>obj</i> are those which were in this. All 
		 * iterators, references and pointers remain valid for the swapped objects. </p>
		 *
		 * <p> Notice that a non-member function exists with the same name, {@link std.swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function. </p>
		 * 
		 * @param obj Another {@link MapContainer map container} of the same type of elements as this (i.e., 
		 *			  with the same template parameters, <b>Key</b> and <b>T</b>) whose content is swapped 
		 *			  with that of this {@link MapContaier container}.
		 */
		public swap(obj: MapContainer<Key, T>): void
		{
			let supplement: HashMultiMap<Key, T> = new HashMultiMap<Key, T>(this.begin(), this.end());
			
			this.assign(obj.begin(), obj.end());
			obj.assign(supplement.begin(), supplement.end());
		}
	}
}
}

namespace std
{
	/**
	 * An iterator of {@link MapColntainer map container}.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class MapIterator<Key, T>
		implements IComparable<MapIterator<Key, T>>
	{
		/**
		 * The source {@link MapContainer} of the iterator is directing for.
		 */
		protected source_: base.MapContainer<Key, T>;

		/**
		 * A {@link ListIterator} pointing {@link Pair} of <i>key</i> and <i>value</i>.
		 */
		protected list_iterator_: ListIterator<Pair<Key, T>>;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the {@link MapContainer source map} and {@link ListIterator list iterator}. 
		 *
		 * @param source The source {@link MapContainer}.
		 * @param list_iterator A {@link ListIterator} pointing {@link Pair} of <i>key</i> and <i>value</i>.
		 */
		public constructor(source: base.MapContainer<Key, T>, list_iterator: ListIterator<Pair<Key, T>>)
		{
			this.source_ = source;

			this.list_iterator_ = list_iterator;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * Get iterator to previous element.
		 */
		public prev(): MapIterator<Key, T>
		{
			return new MapIterator<Key, T>
				(
					<base.MapContainer<Key, T>>this.source_,
					this.list_iterator_.prev()
				);
		}

		/**
		 * Get iterator to next element.
		 */
		public next(): MapIterator<Key, T>
		{
			return new MapIterator<Key, T>
				(
					<base.MapContainer<Key, T>>this.source_,
					this.list_iterator_.next()
				);
		}

		/**
		 * Advances the Iterator by n element positions.
		 *
		 * @param step Number of element positions to advance.
		 * @return An advanced Iterator.
		 */
		public advance(step: number): MapIterator<Key, T>
		{
			return new MapIterator<Key, T>
				(
					<base.MapContainer<Key, T>>this.source_,
					this.list_iterator_.advance(step)
				);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Get source.
		 */
		public get_source(): base.MapContainer<Key, T>
		{
			return this.source_;
		}

		/**
		 * Get ListIterator.
		 */
		public get_list_iterator(): ListIterator<Pair<Key, T>>
		{
			return this.list_iterator_;
		}
		
		/**
		 * Get first, key element.
		 */
		public get first(): Key
		{
			return this.list_iterator_.value.first;
		}

		/**
		 * Get second, value element.
		 */
		public get second(): T
		{
			return this.list_iterator_.value.second;
		}

		/**
		 * Set second value.
		 */
		public set second(val: T)
		{
			this.list_iterator_.value.second = val;
		}

		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		/**
		 * <p> Whether an iterator is equal with the iterator. </p>
		 * 
		 * <p> Compare two iterators and returns whether they are equal or not. </p>
		 *
		 * @param obj An iterator to compare
		 * @return Indicates whether equal or not.
		 */
		public equal_to<L extends Key, U extends T>(obj: MapIterator<L, U>): boolean 
		{
			return this.source_ == obj.source_ && this.list_iterator_.equal_to(obj.list_iterator_);
		}
		
		public less<L extends Key, U extends T>(obj: MapIterator<L, U>): boolean
		{
			return std.less(this.first, obj.first);
		}
		
		public hash(): number
		{
			return std.hash(this.first);
		}
		
		public swap(obj: MapIterator<Key, T>): void
		{
			this.list_iterator_.swap(obj.list_iterator_);
		}
	}

	/**
	 * A reverse-iterator of {@link MapColntainer map container}.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class MapReverseIterator<Key, T>
		extends MapIterator<Key, T>
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
		public constructor(source: base.MapContainer<Key, T>, list_iterator: ListIterator<Pair<Key, T>>)
		{
			super(source, list_iterator);
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): MapReverseIterator<Key, T>
		{
			return new MapReverseIterator<Key, T>(this.source_, this.list_iterator_.next());
		}

		/**
		 * @inheritdoc
		 */
		public next(): MapReverseIterator<Key, T>
		{
			return new MapReverseIterator<Key, T>(this.source_, this.list_iterator_.next());
		}

		/**
		 * @inheritdoc
		 */
		public advance(step: number): MapReverseIterator<Key, T>
		{
			return new MapReverseIterator<Key, T>(this.source_, this.list_iterator_.advance(-1 * step));
		}
	}
}