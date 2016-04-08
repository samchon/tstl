/// <reference path="Container.ts" />

namespace std.base.container
{
	/**
	 * <p> An abstract set. </p>
	 *
	 * <p> {@link SetContainer SetContainers} are containers that store elements allowing fast retrieval of 
	 * individual elements based on their value. </p>
	 *
	 * <p> In an {@link SetContainer}, the value of an element is at the same time its <i>key</i>, used to
	 * identify it. <i>Keys</i> are immutable, therefore, the elements in an {@link SetContainer} cannot be
	 * modified once in the container - they can be inserted and removed, though. </p>
	 *
	 * <p> {@link SetContainer} stores elements, keeps sequence and enables indexing by inserting elements into a
	 * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index 
	 * table like {@link RBTree tree} or {@link HashBuckets hash-table}. </p>
	 *
	 * <h3> Container properties </h3>
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
	 *		 position in the container. </dd>
	 * 
	 *	<dt> Set </dt>
	 *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
	 * </dl>
	 *
	 * @param <T> Type of the elements. Each element in a {@link SetContainer} container is also identified
	 *			  by this value (each value is itself also the element's <i>key</i>).
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class SetContainer<T>
		extends Container<T>
	{
		public static get iterator() { return SetIterator; }

		/**
		 * <p> {@link List} storing elements. </p>
		 *
		 * <p> Storing elements and keeping those sequence of the {@link SetContainer} are implemented by 
		 * {@link data_ this list container}. Implementing index-table is also related with {@link data_ this list} 
		 * by storing {@link ListIterator iterators} ({@link SetIterator} references {@link ListIterator}) who are 
		 * created from {@link data_ here}. </p>
		 */
		protected data_: List<T>;
		
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
		public constructor()//;

		/**
		 * Construct from elements.
		 */
		public constructor(items: Array<T>);

		/**
		 * Copy Constructor.
		 */
		public constructor(container: IContainer<T>);

		/**
		 * Construct from range iterators.
		 */
		public constructor(begin: Iterator<T>, end: Iterator<T>);

		public constructor(...args: any[])
		{
			super();

			// INITIALIZATION
			this.data_ = new List<T>();
			
			// OVERLOADINGS
			//if (args.length == 1 && args[0] instanceof Array && args[0] instanceof Vector == false)
			//{
			//	this.construct_from_array(args[0]);
			//}
			//else if (args.length == 1 && args[0] instanceof Container)
			//{
			//	this.construct_from_container(args[0]);
			//}
			//else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
			//{
			//	this.construct_from_range(args[0], args[1]);
			//}
		}
		
		/**
		 * @hidden
		 */
		protected construct_from_array(items: Array<T>): void
		{
			for (let i: number = 0; i < items.length; i++)
				this.insert_by_val(items[i]);
		}

		/**
		 * @hidden
		 */
		protected construct_from_container(container: Container<T>): void
		{
			this.construct_from_range(container.begin(), container.end());
		}

		/**
		 * @hidden
		 */
		protected construct_from_range(begin: Iterator<T>, end: Iterator<T>): void
		{
			this.assign(begin, end);
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<U extends T, InputIterator extends Iterator<U>>
			(begin: Iterator<U>, end: Iterator<U>): void
		{
			// INSERT
			for (let it = begin; it.equals(end) == false; it = it.next())
				this.insert_by_val(it.value);
		}

		/**
		 * @inheritdoc
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
		 * <p> Searches the container for an element with <i>key</i> as value and returns an iterator to it if found, 
		 * otherwise it returns an iterator to {@link end end()} (the element past the end of the container). </p>
		 *
		 * <p> Another member function, {@link count count()}, can be used to just check whether a particular element
		 * exists. </p>
		 *
		 * @param key Key to be searched for.
		 *
		 * @return An iterator to the element, if the specified value is found, or {@link end end()} if it is not 
		 *		   found in the container.
		 */
		public abstract find(val: T): SetIterator<T>;

		/**
		 * @inheritdoc
		 */
		public begin(): SetIterator<T>
		{
			return new SetIterator<T>(this, this.data_.begin());
		}

		/**
		 * @inheritdoc
		 */
		public end(): SetIterator<T>
		{
			return new SetIterator<T>(this, this.data_.end());
		}

		/* ---------------------------------------------------------
			ELEMENTS
		--------------------------------------------------------- */
		/**
		 * <p> Whether have the item or not. </p>
		 * 
		 * <p> Indicates whether a set has an item having the specified identifier. </p>
		 *
		 * @param key Key value of the element whose mapped value is accessed.
		 *
		 * @return Whether the set has an item having the specified identifier.
		 */
		public has(val: T): boolean
		{
			return this.count(val) != 0;
		}

		/**
		 * <p> Count elements with a specific key. </p>
		 * <p> Searches the container for elements with a value of k and returns the number of elements found. </p>
		 *
		 * @param key Value of the elements to be counted.
		 *
		 * @return The number of elements in the container with a <i>key</i>.
		 */
		public abstract count(val: T): number;

		/**
		 * @inheritdoc
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
		public push<U extends T>(...args: U[]): number
		{
			for (let i: number = 0; i < args.length; i++)
				this.insert_by_val(args[i]);

			return this.size();
		}
		
		/**
		 * <p> Insert an element with hint. </p>
		 *
		 * <p> Extends the container by inserting new elements, effectively increasing the container size by the 
		 * number of elements inserted. </p>
		 *
		 * @param hint Hint for the position where the element can be inserted.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator pointing to either the newly inserted element or to the element that already had its 
		 *		   same value in the {@link SetContainer}.
		 */
		public insert(hint: SetIterator<T>, val: T): SetIterator<T>;

		/**
		 * <p> Insert elements with a range of a container. </p>
		 *
		 * <p> Extends the container by inserting new elements, effectively increasing the container size by the 
		 * number of elements inserted. </p>
		 *
		 * @param begin An iterator specifying range of the begining element.
		 * @param end An iterator specifying range of the ending element.
		 */
		public insert<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public insert(...args: any[]): any
		{
			if (args.length == 1)
				return this.insert_by_val(args[0]);
			else if (args.length == 2 && args[0] instanceof Iterator)
			{
				if (args[1] instanceof Iterator && args[0].get_source() != this && args[1].get_source() != this)
					return this.insert_by_range(args[0], args[1]);
				else
					return this.insert_by_hint(args[0], args[1]);
			}
		}

		/**
		 * Abstract method inserting an element by its val.
		 */
		protected abstract insert_by_val(val: T): any;
		
		/**
		 * Abstract method inserting an element with hint of position to be inserted.
		 */
		protected insert_by_hint(hint: SetIterator<T>, val: T): SetIterator<T>
		{
			// INSERT
			let list_iterator = this.data_.insert(hint.get_list_iterator(), val);
			
			// POST-PROCESS
			let it = new SetIterator(this, list_iterator);
			this.handle_insert(it);

			return it;
		}

		/**
		 * Abstract method inserting elements from range iterator of other container.
		 */
		protected insert_by_range<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void
		{
			for (let it = begin; it.equals(end) == false; it = it.next() as InputIterator)
				this.insert_by_val(it.value);
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * <p> Erase an element. </p>
		 * <p> Removes from the set container the elements whose value is <i>key</i>. </p>
		 *
		 * <p> This effectively reduces the container size by the number of elements removed. </p>
		 *
		 * @param key Value of the elements to be erased.
		 *
		 * @return Number of elements erased.
		 */
		public erase(val: T): number;

		/**
		 * @inheritdoc
		 */
		public erase(it: SetIterator<T>): SetIterator<T>;

		/**
		 * <p> Erase elements. </p>
		 * <p> Removes from the set container a range of elements.. </p>
		 *
		 * <p> This effectively reduces the container size by the number of elements removed. </p>
		 *
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 */
		public erase(begin: SetIterator<T>, end: SetIterator<T>): SetIterator<T>;

		public erase(...args: any[]): any
		{
			if (args.length == 1)
			{
				if (args[0] instanceof Iterator && args[0].get_source() == this)
					return this.erase_by_iterator(args[0]);
				else
					return this.erase_by_val(args[0]);
			}
			else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
				return this.erase_by_range(args[0], args[1]);
		}

		/**
		 * Abstract method erasing an element with its val.
		 */
		private erase_by_val(val: T): number
		{
			// TEST WHETHER EXISTS
			let it = this.find(val);
			if (it.equals(this.end()) == true)
				return 0;

			// ERASE
			this.erase_by_iterator(it);
			return 1;
		}

		/**
		 * Abstract method erasing an element with iterator.
		 */
		private erase_by_iterator(it: SetIterator<T>): SetIterator<T>
		{
			// ERASE
			let list_iterator = this.data_.erase(it.get_list_iterator());
			
			// POST-PROCESS
			this.handle_erase(it);

			return new SetIterator<T>(this, list_iterator);
		}

		/**
		 * Abstract method erasing elements by those range iterators.
		 */
		private erase_by_range(begin: SetIterator<T>, end: SetIterator<T>): SetIterator<T>
		{
			// ERASE
			let list_iterator = this.data_.erase(begin.get_list_iterator(), end.get_list_iterator());
			
			// POST-PROCESS
			for (let it = begin; !it.equals(end); it = it.next())
				this.handle_erase(it);

			return new SetIterator<T>(this, list_iterator);//begin.prev();
		}

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * <p> Abstract method handling insertion for indexing. </p>
		 *
		 * <p> This method, {@link handle_insert} is designed to register the <i>item</i> to somewhere storing those
		 * {@link SetIterator iterators} for indexing, fast accessment and retrievalance. </p>
		 *
		 * <p> When {@link insert} is called, a new element will be inserted into the {@link data_ list container} 
		 * and a new {@link SetIterator iterator} <i>item</i>, pointing the element, will be created and the newly 
		 * created iterator <i>item</i> will be shifted into this method {@link handle_insert} after the insertion. </p>
		 *
		 * <p> If the derived one is {@link RBTree tree-based} like {@link TreeSet}, the <i>item</i> will be 
		 * registered into the {@link TreeSet.tree_ tree} as a {@link XTreeNode tree node item}. Else if the derived 
		 * one is {@link HashBuckets hash-based} like {@link HashSet}, the <i>item</i> will be registered into the 
		 * {@link HashSet.hash_buckets_ hash bucket}. </p>
		 *  
		 * @param item Iterator of inserted item.
		 */
		protected abstract handle_insert(item: SetIterator<T>): void;

		/**
		 * <p> Abstract method handling deletion for indexing. </p>
		 * 
		 * <p> This method, {@link handle_insert} is designed to unregister the <i>item</i> to somewhere storing 
		 * those {@link SetIterator iterators} for indexing, fast accessment and retrievalance. </p>
		 *
		 * <p> When {@link erase} is called with <i>item</i>, an {@link SetIterator iterator} positioning somewhere
		 * place to be deleted, is memorized and shifted to this method {@link handle_erase} after the deletion
		 * process is terminated. </p>
		 *
		 * <p> If the derived one is {@link RBTree tree-based} like {@link TreeSet}, the <i>item</i> will be
		 * unregistered from the {@link TreeSet.tree_ tree} as a {@link XTreeNode tree node item}. Else if the 
		 * derived one is {@link HashBuckets hash-based} like {@link HashSet}, the <i>item</i> will be unregistered 
		 * from the {@link HashSet.hash_buckets_ hash bucket}. </p>
		 * 
		 * @param item Iterator of erased item.
		 */
		protected abstract handle_erase(item: SetIterator<T>): void;

		/* ===============================================================
			UTILITIES
		=============================================================== */
		/**
		 * @inheritdoc
		 */
		public swap(obj: SetContainer<T>): void
		{
			let supplement: List<T> = this.data_;

			this.data_ = obj.data_;
			obj.data_ = supplement;
		}
	}
}