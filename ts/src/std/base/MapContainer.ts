/// <reference path="../API.ts" />

/// <reference path="Container.ts" />
/// <reference path="../Iterator.ts" />

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
	 * <p> <a href="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" style="max-width: 100%" /></a> </p>
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
		extends base.Container<Pair<Key, T>>
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
		public constructor(container: IContainer<Pair<Key, T>>);

		/**
		 * Construct from range iterators.
		 */
		public constructor(begin: Iterator<Pair<Key, T>>, end: Iterator<Pair<Key, T>>);

		public constructor(...args: any[])
		{
			super();
			
			// INITIALIZATION
			this.init();

			// BRANCH - OVERLOADINGS
			if (args.length == 0) { } // DO NOTHING
			else if (args.length == 1 && (args[0] instanceof Container || args[0] instanceof Vector))
			{
				this.construct_from_container(args[0]);
			}
			else if (args.length == 1 && args[0] instanceof Array)
			{
				this.construct_from_array(args[0]);
			}
			else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
			{
				this.construct_from_range(args[0], args[1]);
			}
		}

		/**
		 * @hidden
		 */
		protected init(): void
		{
			this.data_ = new List<Pair<Key, T>>();
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
		protected construct_from_container(container: IContainer<Pair<Key, T>>): void
		{
			this.construct_from_range(container.begin(), container.end());
		}

		/**
		 * @hidden
		 */
		protected construct_from_range<InputIterator extends Iterator<Pair<Key, T>>>
			(begin: InputIterator, end: InputIterator): void
		{
			this.assign(begin, end);
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
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
		 * beginning of the container. </p>
		 * 
		 * <p> {@link rbegin} points to the element preceding the one that would be pointed to by member {@link end}. 
		 * </p>
		 *
		 * @return A {@link MapReverseIterator reverse iterator} to the <i>reverse beginning</i> of the sequence 
		 *		   
		 */
		public rbegin(): MapReverseIterator<Key, T>
		{
			return new MapReverseIterator<Key, T>(this.end());
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
			return new MapReverseIterator<Key, T>(this.begin());
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
			return !this.find(key).equal_to(this.end());
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
				- POST-PROCESS
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public push<L extends Key, U extends T>(...args: Pair<L, U>[]): number;

		/**
		 * @inheritdoc
		 */
		public push<L extends Key, U extends T>(...args: [Key, T][]): number;

		public push<L extends Key, U extends T>(...args: any[]): number
		{
			// TO BE ABSTRACT
			for (let i: number = 0; i < args.length; i++)
				if (args[i] instanceof Pair)
					this.insert_by_pair(args[i]);
				else if (args[i] instanceof Array)
					this.insert_by_tuple(args[i]);

			return this.size();
		}

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
		 * <p> Extends the container by inserting a new element, effectively increasing the container {@link size} 
		 * by the number of element inserted (zero or one). </p>
		 * 
		 * @param hint Hint for the position where the element can be inserted.
		 * @param pair {@link Pair} to be inserted as an element.
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
			(first: InputIterator, last: InputIterator): void

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
			else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
			{
				return this.insert_by_range(args[0], args[1]);
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
					ret = this.insert_by_hint(args[0], args[1]);
				else
					ret = this.insert_by_hint_with_tuple(args[0], args[1]);

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
		protected abstract insert_by_hint(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>;

		/**
		 * @hidden
		 */
		private insert_by_hint_with_tuple(hint: MapIterator<Key, T>, tuple: [Key, T]): MapIterator<Key, T>
		{
			return this.insert_by_hint(hint, make_pair(tuple[0], tuple[1]));
		}

		/**
		 * @hidden
		 */
		protected abstract insert_by_range<L extends Key, U extends T, InputIterator extends Iterator<Pair<L, U>>>
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
				return this.erase_by_key(args[0]);
			else
				if (args.length == 1)
					return this.erase_by_iterator(args[0]);
				else
					return this.erase_by_iterator(args[0], args[1]);
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
		private erase_by_iterator(first: any, last: any = first.next()): any
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
			ret = this.erase_by_range(first, last);

			// RETURN BRANCHES
			if (is_reverse_iterator == true)
				return new MapReverseIterator<Key, T>(ret.next());
			else
				return ret;
		}

		/**
		 * @hidden
		 */
		private erase_by_range(begin: MapIterator<Key, T>, end: MapIterator<Key, T>): MapIterator<Key, T>
		{
			// ERASE
			let listIterator = this.data_.erase(begin.get_list_iterator(), end.get_list_iterator());
			
			// POST-PROCESS
			this.handle_erase(begin, end);

			return new MapIterator<Key, T>(this, listIterator);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * <p> Abstract method handling insertions for indexing. </p>
		 *
		 * <p> This method, {@link handle_insert} is designed to register the <i>first to last</i> to somewhere storing 
		 * those {@link MapIterator iterators} for indexing, fast accessment and retrievalance. </p>
		 *
		 * <p> When {@link insert} is called, new elements will be inserted into the {@link data_ list container} and new 
		 * {@link MapIterator iterators} <i>first to last</i>, pointing the inserted elements, will be created and the
		 * newly created iterators <i>first to last</i> will be shifted into this method {@link handle_insert} after the 
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
		protected abstract handle_insert(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void;

		/**
		 * <p> Abstract method handling deletions for indexing. </p>
		 * 
		 * <p> This method, {@link handle_insert} is designed to unregister the <i>first to last</i> to somewhere storing 
		 * those {@link MapIterator iterators} for indexing, fast accessment and retrievalance. </p>
		 *
		 * <p> When {@link erase} is called with <i>first to last</i>, {@link MapIterator iterators} positioning somewhere
		 * place to be deleted, is memorized and shifted to this method {@link handle_erase} after the deletion process is 
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
		protected abstract handle_erase(first: MapIterator<Key, T>, last: MapIterator<Key, T>): void;
	}
}

namespace std
{
	/**
	 * <p> An iterator of {@link MapContainer map container}. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" style="max-width: 100%" /></a> </p>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class MapIterator<Key, T>
		extends Iterator<Pair<Key, T>>
		implements IComparable<MapIterator<Key, T>>
	{
		/**
		 * A {@link ListIterator} pointing {@link Pair} of <i>key</i> and <i>value</i>.
		 */
		private list_iterator_: ListIterator<Pair<Key, T>>;

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
			super(source);

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
			return new MapIterator<Key, T>(this.map, this.list_iterator_.prev());
		}

		/**
		 * Get iterator to next element.
		 */
		public next(): MapIterator<Key, T>
		{
			return new MapIterator<Key, T>(this.map, this.list_iterator_.next());
		}

		/**
		 * Advances the Iterator by n element positions.
		 *
		 * @param step Number of element positions to advance.
		 * @return An advanced Iterator.
		 */
		public advance(step: number): MapIterator<Key, T>
		{
			return new MapIterator<Key, T>(this.map, this.list_iterator_.advance(step));
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		private get map(): base.MapContainer<Key, T>
		{
			return this.source_ as base.MapContainer<Key, T>;
		}

		/**
		 * Get ListIterator.
		 */
		public get_list_iterator(): ListIterator<Pair<Key, T>>
		{
			return this.list_iterator_;
		}

		/**
		 * @inheritdoc
		 */
		public get value(): Pair<Key, T>
		{
			return this.list_iterator_.value;
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
	 * <p> A reverse-iterator of {@link MapContainer map container}. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/api/assets/images/design/map_containers.png" style="max-width: 100%" /></a> </p>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class MapReverseIterator<Key, T>
		extends ReverseIterator<Pair<Key, T>, MapIterator<Key, T>, MapReverseIterator<Key, T>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(base: MapIterator<Key, T>)
		{
			super(base);
		}

		protected create_neighbor(): MapReverseIterator<Key, T>
		{
			return new MapReverseIterator<Key, T>(null);
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