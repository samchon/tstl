namespace std.base.container
{
	/**
	 * <p> An abstract map. </p>
	 *
	 * <h3> Container properties </h3>
	 * <dl>
	 *	<dt> Ordered </dt>
	 *	<dd> The elements in the container follow a strict order at all times. All inserted elements are 
	 *		 given a position in this order. </dd>
	 *
	 *	<dt> Map </dt>
	 *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>: 
	 *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
	 * </dl>
	 * 
	 * @author Jeongho Nam
	 */
	export abstract class MapContainer<Key, T>
	{
		protected data: List<Pair<Key, T>>;

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
		public constructor()
		{
			this.data = new List<Pair<Key, T>>();
		}

		/**
		 * @private
		 */
		protected constructByArray(items: Array<Pair<Key, T>>): void
		{
			for (let i: number = 0; i < items.length; i++)
				this.insertByPair(items[i]);
		}

		/**
		 * @private
		 */
		protected constructByContainer(container: MapContainer<Key, T>): void
		{
			this.constructByRange(container.begin(), container.end());
		}

		/**
		 * @private
		 */
		protected constructByRange(begin: MapIterator<Key, T>, end: MapIterator<Key, T>): void
		{
			this.assign(begin, end);
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * <p> Assign new content to content. </p>
		 *
		 * <p> Assigns new contents to the Container, replacing its current contents, 
		 * and modifying its size accordingly. </p>
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public assign<L extends Key, U extends T>
			(begin: MapIterator<L, U>, end: MapIterator<L, U>): void
		{
			// INSERT
			for (let it = begin; it.equals(end) == false; it = it.next())
				this.insertByPair(new Pair<Key, T>(it.first, it.second));
		}

		/**
		 * <p> Clear content. </p>
		 *
		 * <p> Removes all elements from the Container, leaving the container with a size of 0. </p>
		 */
		public clear(): void
		{
			this.data.clear();
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
		 * <p> Searches the container for an element with a identifier equivalent to <i>key</i> and 
		 * returns an iterator to it if found, otherwise it returns an iterator to {@link end end()}. </p>
		 *
		 * <p> Two keys are considered equivalent if the container's comparison object returns false 
		 * reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
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
		 * <p> Returns an iterator referring the first element in the Container. </p>
		 *
		 * <h4> Note </h4>
		 * <p> If the container is empty, the returned iterator is same with {@link end()}. </p>
		 *
		 * @return An iterator to the first element in the container.
		 * The iterator containes the first element's value.
		 */
		public begin(): MapIterator<Key, T>
		{
			return new MapIterator<Key, T>(this, <ListIterator<Pair<Key, T>>>this.data.begin());
		}

		/**
		 * <p> Return iterator to end. </p>
		 * <p> Returns an iterator referring to the past-the-end element in the Container. </p>
		 *
		 * <p> The past-the-end element is the theoretical element that would follow the last element in 
		 * the Container. It does not point to any element, and thus shall not be dereferenced. </p>
		 *
		 * <p> Because the ranges used by functions of the Container do not include the element reference 
		 * by their closing iterator, this function is often used in combination with Container::begin() to specify 
		 * a range including all the elements in the container. </p>
		 *
		 * <h4> Note </h4>
		 * <p> Returned iterator from Container.end() does not refer any element. Trying to accessing 
		 * element by the iterator will cause throwing exception (out of range). </p>
		 * <p> If the container is empty, this function returns the same as {@link begin}. </p>
		 * 
		 * @return An iterator to the end element in the container.
		 */
		public end(): MapIterator<Key, T>
		{
			return new MapIterator<Key, T>(this, <ListIterator<Pair<Key, T>>>this.data.end());
		}

		/* ---------------------------------------------------------
			ELEMENTS
		--------------------------------------------------------- */
		/**
		 * <p> Whether have the item or not. </p>
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
		 * <p> Searches the container for elements whose key is k and returns the number of elements found. </p>
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
			return this.data.size();
		}

		/**
		 * Test whether the Container is empty.
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
		public insert(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>;
		public insert<L extends Key, U extends T>
			(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;

		public insert(...args: any[]): any
		{
			if (args.length == 1 && args[0] instanceof Pair)
			{
				return this.insertByPair(args[0]);
			}
			else if (args.length == 2 && args[0] instanceof MapIterator && args[1] instanceof Pair)
			{
				return this.insertByHint(args[0], args[1]);
			}
			else if (args.length == 2 && args[0] instanceof MapIterator && args[1] instanceof MapIterator)
			{
				return this.insertByRange(args[0], args[1]);
			}
		}

		protected abstract insertByPair<L extends Key, U extends T>(pair: Pair<L, U>): any;
		
		private insertByHint(hint: MapIterator<Key, T>, pair: Pair<Key, T>): MapIterator<Key, T>
		{
			// INSERT
			let list_it: ListIterator<Pair<Key, T>> = (<MapIterator<Key, T>>hint).getListIterator();

			list_it = <ListIterator<Pair<Key, T>>>
				this.data.insert((<MapIterator<Key, T>>hint).getListIterator(), pair);

			// POST-PROCESS
			let it = new MapIterator<Key, T>(this, list_it);

			this.handleInsert(it);

			return it;
		}
		protected insertByRange<L extends Key, U extends T>
			(begin: MapIterator<L, U>, end: MapIterator<L, U>): void
		{
			for (let it = begin; it.equals(end) == false; it = it.next())
				this.insertByPair(new Pair<Key, T>(it.first, it.second));
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		public erase(key: Key): number;
		public erase(it: MapIterator<Key, T>): MapIterator<Key, T>;
		public erase(begin: MapIterator<Key, T>, end: MapIterator<Key, T>): MapIterator<Key, T>;

		public erase(...args: any[]): any 
		{
			if (args.length == 1)
			{
				if (args[0] instanceof MapIterator && args[0].getSource() == this)
					return this.eraseByIterator(args[0]);
				else
					return this.eraseByKey(args[0]);
			}
			else if (args.length == 2 && args[0] instanceof MapIterator && args[1] instanceof MapIterator)
				return this.eraseByRange(args[0], args[1]);
		}

		/**
		 * @private
		 */
		private eraseByKey(key: Key): number
		{
			let it = this.find(key);
			if (it.equals(this.end()) == true)
				return 0;

			this.eraseByIterator(it);
			return 1;
		}

		/**
		 * @private
		 */
		private eraseByIterator(it: MapIterator<Key, T>): MapIterator<Key, T>
		{
			// ERASE
			let listIterator = <ListIterator<Pair<Key, T>>>
				this.data.erase((<MapIterator<Key, T>>it).getListIterator());
			
			// POST-PROCESS
			this.handleErase(<MapIterator<Key, T>>it);

			return new MapIterator<Key, T>(this, listIterator);;
		}

		/**
		 * @private
		 */
		private eraseByRange(begin: MapIterator<Key, T>, end: MapIterator<Key, T>): MapIterator<Key, T>
		{
			// ERASE
			let listIterator = <ListIterator<Pair<Key, T>>>
				this.data.erase
				(
					(<MapIterator<Key, T>>begin).getListIterator(),
					(<MapIterator<Key, T>>end).getListIterator()
				);
			
			// POST-PROCESS
			for (let it = begin; it.equals(this.end()) == false; it = it.next())
				this.handleErase(<MapIterator<Key, T>>it);

			return new MapIterator<Key, T>(this, listIterator);
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		protected abstract handleInsert(item: MapIterator<Key, T>): void;

		protected abstract handleErase(item: MapIterator<Key, T>): void;
	}
}