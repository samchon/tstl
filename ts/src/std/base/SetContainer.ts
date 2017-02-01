/// <reference path="../API.ts" />

/// <reference path="_ListContainer.ts" />

namespace std.base
{
	/**
	 * An abstract set.
	 *
	 * {@link SetContainer SetContainers} are containers that store elements allowing fast retrieval of 
	 * individual elements based on their value.
	 *
	 * In an {@link SetContainer}, the value of an element is at the same time its <i>key</i>, used to
	 * identify it. <i>Keys</i> are immutable, therefore, the elements in an {@link SetContainer} cannot be
	 * modified once in the container - they can be inserted and removed, though.
	 *
	 * {@link SetContainer} stores elements, keeps sequence and enables indexing by inserting elements into a
	 * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index 
	 * table like {@link RBTree tree} or {@link HashBuckets hash-table}.
	 *
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/set_containers.png" style="max-width: 100%" /></a>
	 * 
	 * ### Container properties
	 * <dl>
	 *	<dt> Associative </dt>
	 *	<dd> 
	 *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute
	 *		position in the container.
	 *	</dd>
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
		/**
		 * {@link List} storing elements.
		 *
		 * Storing elements and keeping those sequence of the {@link SetContainer} are implemented by 
		 * {@link data_ this list container}. Implementing index-table is also related with {@link data_ this list} 
		 * by storing {@link ListIterator iterators} ({@link SetIterator} references {@link ListIterator}) who are 
		 * created from {@link data_ here}.
		 */
		private data_: _SetElementList<T>;
		
		/* ---------------------------------------------------------
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		protected constructor()
		{
			super();

			this.data_ = new _SetElementList<T>(this);
		}

		/**
		 * @inheritdoc
		 */
		public assign<U extends T, InputIterator extends Iterator<U>>
			(begin: Iterator<U>, end: Iterator<U>): void
		{
			// INSERT
			this.clear();
			this.insert(begin, end);
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
		 * Get iterator to element.
		 * 
		 * Searches the container for an element with <i>key</i> as value and returns an iterator to it if found, 
		 * otherwise it returns an iterator to {@link end end()} (the element past the end of the container).
		 *
		 * Another member function, {@link count count()}, can be used to just check whether a particular element
		 * exists.
		 *
		 * @param key Key to be searched for.
		 *
		 * @return An iterator to the element, if the specified value is found, or {@link end end()} if it is not 
		 *		   found in the 
		 */
		public abstract find(val: T): SetIterator<T>;

		/**
		 * @inheritdoc
		 */
		public begin(): SetIterator<T>
		{
			return this.data_.begin();
		}

		/**
		 * @inheritdoc
		 */
		public end(): SetIterator<T>
		{
			return this.data_.end();
		}

		/**
		 * @inheritdoc
		 */
		public rbegin(): SetReverseIterator<T>
		{
			return this.data_.rbegin();
		}

		/**
		 * @inheritdoc
		 */
		public rend(): SetReverseIterator<T>
		{
			return this.data_.rend();
		}

		/* ---------------------------------------------------------
			ELEMENTS
		--------------------------------------------------------- */
		/**
		 * Whether have the item or not.
		 * 
		 * Indicates whether a set has an item having the specified identifier.
		 *
		 * @param key Key value of the element whose mapped value is accessed.
		 *
		 * @return Whether the set has an item having the specified identifier.
		 */
		public has(val: T): boolean
		{
			return !this.find(val).equals(this.end());
		}

		/**
		 * Count elements with a specific key.
		 * 
		 * Searches the container for elements with a value of k and returns the number of elements found.
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

		///**
		// * @hidden
		// */
		//protected _Get_data(): List<T>
		//{
		//	return this.data_;
		//}

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
		public push(...items: T[]): number
		{
			if (items.length == 0)
				return this.size();

			// INSERT BY RANGE
			let first: _ArrayIterator<T> = new _ArrayIterator<T>(items, 0);
			let last: _ArrayIterator<T> = new _ArrayIterator<T>(items, items.length);

			this._Insert_by_range(first, last);

			// RETURN SIZE
			return this.size();
		}
		
		/**
		 * Insert an element with hint.
		 *
		 * Extends the container by inserting new elements, effectively increasing the container size by the 
		 * number of elements inserted.
		 *
		 * @param hint Hint for the position where the element can be inserted.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator pointing to either the newly inserted element or to the element that already had its 
		 *		   same value in the {@link SetContainer}.
		 */
		public insert(hint: SetIterator<T>, val: T): SetIterator<T>;

		/**
		 * Insert an element with hint.
		 *
		 * Extends the container by inserting new elements, effectively increasing the container size by the 
		 * number of elements inserted.
		 *
		 * @param hint Hint for the position where the element can be inserted.
		 * @param val Value to be inserted as an element.
		 *
		 * @return An iterator pointing to either the newly inserted element or to the element that already had its 
		 *		   same value in the {@link SetContainer}.
		 */
		public insert(hint: SetReverseIterator<T>, val: T): SetReverseIterator<T>;

		/**
		 * Insert elements with a range of a 
		 *
		 * Extends the container by inserting new elements, effectively increasing the container size by the 
		 * number of elements inserted.
		 *
		 * @param begin An iterator specifying range of the begining element.
		 * @param end An iterator specifying range of the ending element.
		 */
		public insert<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public insert(...args: any[]): any
		{
			if (args.length == 1)
				return this._Insert_by_val(args[0]);
			else if (args.length == 2 && args[0] instanceof Iterator)
			{
				if (args[1] instanceof Iterator && (args[0] as SetIterator<T>).source() != this && (args[1] as SetIterator<T>).source() != this)
				{
					// IT DOESN'T CONTAIN POSITION
					// RANGES TO INSERT ONLY
					return this._Insert_by_range(args[0], args[1]);
				}
				else
				{
					let ret: SetIterator<T>;
					let is_reverse_iterator: boolean = false;

					// REVERSE_ITERATOR TO ITERATOR
					if (args[0] instanceof SetReverseIterator)
					{
						is_reverse_iterator = true;
						args[0] = (args[0] as SetReverseIterator<T>).base().prev();
					}

					// INSERT AN ELEMENT
					ret = this._Insert_by_hint(args[0], args[1]);

					// RETURN BRANCHES
					if (is_reverse_iterator == true)
						return new SetReverseIterator<T>(ret.next());
					else
						return ret;
				}
			}
		}

		/**
		 * @hidden
		 */
		protected abstract _Insert_by_val(val: T): any;
		
		/**
		 * @hidden
		 */
		protected abstract _Insert_by_hint(hint: SetIterator<T>, val: T): SetIterator<T>;
		
		/**
		 * @hidden
		 */
		protected abstract _Insert_by_range<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * Erase an element.
		 * Removes from the set container the elements whose value is <i>key</i>.
		 *
		 * This effectively reduces the container size by the number of elements removed.
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
		 * Erase elements.
		 * Removes from the set container a range of elements..
		 *
		 * This effectively reduces the container size by the number of elements removed.
		 *
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 */
		public erase(begin: SetIterator<T>, end: SetIterator<T>): SetIterator<T>;

		/**
		 * @inheritdoc
		 */
		public erase(it: SetReverseIterator<T>): SetReverseIterator<T>;

		/**
		 * Erase elements.
		 * Removes from the set container a range of elements..
		 *
		 * This effectively reduces the container size by the number of elements removed.
		 *
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 */
		public erase(begin: SetReverseIterator<T>, end: SetReverseIterator<T>): SetReverseIterator<T>;

		public erase(...args: any[]): any
		{
			if (args.length == 1 && (args[0] instanceof Iterator == false || (args[0] as SetIterator<T>).source() != this))
				return this._Erase_by_val(args[0]);
			else
				if (args.length == 1)
					return this._Erase_by_iterator(args[0]);
				else
					return this._Erase_by_iterator(args[0], args[1]);
		}

		/**
		 * @hidden
		 */
		private _Erase_by_iterator(first: any, last: any = first.next()): any
		{
			let ret: SetIterator<T>;
			let is_reverse_iterator: boolean = false;

			// REVERSE ITERATOR TO ITERATOR
			if (first instanceof SetReverseIterator)
			{
				is_reverse_iterator = true;

				let first_it = (last as SetReverseIterator<T>).base();
				let last_it = (first as SetReverseIterator<T>).base();

				first = first_it;
				last = last_it;
			}

			// ERASE ELEMENTS
			ret = this._Erase_by_range(first, last);

			// RETURN BRANCHES
			if (is_reverse_iterator == true)
				return new SetReverseIterator<T>(ret.next());
			else
				return ret;
		}

		/**
		 * @hidden
		 */
		private _Erase_by_val(val: T): number
		{
			// TEST WHETHER EXISTS
			let it = this.find(val);
			if (it.equals(this.end()) == true)
				return 0;

			// ERASE
			this._Erase_by_iterator(it);
			return 1;
		}

		/**
		 * @hidden
		 */
		private _Erase_by_range(first: SetIterator<T>, last: SetIterator<T>): SetIterator<T>
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
		protected _Swap(obj: SetContainer<T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
		}

		/**
		 * Merge two sets.
		 * 
		 * Extracts and transfers elements from *source* to this container.
		 * 
		 * @param source A {@link SetContainer set container} to transfer the elements from.
		 */
		public abstract merge<U extends T>(source: SetContainer<U>): void;

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected abstract _Handle_insert(first: SetIterator<T>, last: SetIterator<T>): void;

		/**
		 * @hidden
		 */
		protected abstract _Handle_erase(first: SetIterator<T>, last: SetIterator<T>): void;
	}

	/**
	 * @hidden
	 */
	export class _SetElementList<T> extends _ListContainer<T, SetIterator<T>>
	{
		private associative_: SetContainer<T>;
		private rend_: SetReverseIterator<T>;

		public constructor(associative: SetContainer<T>)
		{
			super();

			this.associative_ = associative;
		}
		protected _Create_iterator(prev: SetIterator<T>, next: SetIterator<T>, val: T): SetIterator<T>
		{
			return new SetIterator<T>(this, prev, next, val);
		}
		protected _Set_begin(it: SetIterator<T>): void
		{
			super._Set_begin(it);
			this.rend_ = new SetReverseIterator<T>(it);
		}

		public associative(): SetContainer<T>
		{
			return this.associative_;
		}
		public rbegin(): SetReverseIterator<T>
		{
			return new SetReverseIterator<T>(this.end());
		}
		public rend(): SetReverseIterator<T>
		{
			return this.rend_;
		}
	}
}

namespace std
{
	/**
	 * An iterator of a Set.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/set_containers.png" style="max-width: 100%" /></a>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class SetIterator<T>
		extends base._ListIteratorBase<T>
		implements IComparable<SetIterator<T>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from source and index number.
		 *
		 * #### Note
		 * Do not create iterator directly.
		 * 
		 * Use begin(), find() or end() in Map instead. 
		 *
		 * @param map The source Set to reference.
		 * @param index Sequence number of the element in the source Set.
		 */
		public constructor(source: base._SetElementList<T>, prev: SetIterator<T>, next: SetIterator<T>, val: T)
		{
			super(source, prev, next, val);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public source(): base.SetContainer<T>
		{
			return (this.source_ as base._SetElementList<T>).associative();
		}

		/**
		 * @inheritdoc
		 */
		public prev(): SetIterator<T>
		{
			return this.prev_ as SetIterator<T>;
		}

		/**
		 * @inheritdoc
		 */
		public next(): SetIterator<T>
		{
			return this.next_ as SetIterator<T>;
		}

		/**
		 * @inheritdoc
		 */
		public advance(size: number): SetIterator<T>
		{
			return super.advance(size) as SetIterator<T>;
		}
		
		/* ---------------------------------------------------------
			COMPARISONS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public less(obj: SetIterator<T>): boolean
		{
			return less(this.value, obj.value);
		}
		
		/**
		 * @inheritdoc
		 */
		public equals(obj: SetIterator<T>): boolean 
		{
			return this == obj;
		}

		/**
		 * @inheritdoc
		 */
		public hashCode(): number
		{
			return hash(this.value);
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: SetIterator<T>): void
		{
			super.swap(obj);
		}
	}

	/**
	 * A reverse-iterator of Set.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/set_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/set_containers.png" style="max-width: 100%" /></a>
	 *
	 * @param <T> Type of the elements.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class SetReverseIterator<T>
		extends ReverseIterator<T, base.SetContainer<T>, SetIterator<T>, SetReverseIterator<T>>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
		 */
		public constructor(base: SetIterator<T>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: SetIterator<T>): SetReverseIterator<T>
		{
			return new SetReverseIterator<T>(base);
		}
	}
}