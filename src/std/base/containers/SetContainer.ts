/// <reference path="../../API.ts" />

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
	 * {@link List} and registering {@link ListIterator iterators} of the *list container* to an index table
	 * like *tree* or *hash-table*.
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
	export abstract class SetContainer<T, Source extends ISetContainer<T>>
		extends Container<T>
	{
		/**
		 * @hidden
		 */
		private source_ptr_: IPointer<SetContainer<T, Source>>;

		/**
		 * @hidden
		 */
		private data_: _SetElementList<T, Source>;
		
		/* ---------------------------------------------------------
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		protected constructor()
		{
			super();

			this.source_ptr_ = {value: this};
			this.data_ = new _SetElementList<T, Source>(this as any);
		}

		/**
		 * @inheritdoc
		 */
		public assign<U extends T, InputIterator extends IForwardIterator<U>>
			(begin: InputIterator, end: InputIterator): void
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
		public abstract find(val: T): SetIterator<T, Source>;

		/**
		 * @inheritdoc
		 */
		public begin(): SetIterator<T, Source>
		{
			return this.data_.begin();
		}

		/**
		 * @inheritdoc
		 */
		public end(): SetIterator<T, Source>
		{
			return this.data_.end();
		}

		/**
		 * @inheritdoc
		 */
		public rbegin(): SetReverseIterator<T, Source>
		{
			return this.data_.rbegin();
		}

		/**
		 * @inheritdoc
		 */
		public rend(): SetReverseIterator<T, Source>
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
			let first: _NativeArrayIterator<T> = new _NativeArrayIterator<T>(items, 0);
			let last: _NativeArrayIterator<T> = new _NativeArrayIterator<T>(items, items.length);

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
		public insert(hint: SetIterator<T, Source>, val: T): SetIterator<T, Source>;

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
		public insert(hint: SetReverseIterator<T, Source>, val: T): SetReverseIterator<T, Source>;

		/**
		 * Insert elements with a range of a 
		 *
		 * Extends the container by inserting new elements, effectively increasing the container size by the 
		 * number of elements inserted.
		 *
		 * @param begin An iterator specifying range of the begining element.
		 * @param end An iterator specifying range of the ending element.
		 */
		public insert<U extends T, InputIterator extends IForwardIterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public insert(...args: any[]): any
		{
			if (args.length == 1)
				return this._Insert_by_val(args[0]);
			else if (args.length == 2)
			{
				if (args[0].next instanceof Function && args[1].next instanceof Function)
				{
					// IT DOESN'T CONTAIN POSITION
					// RANGES TO INSERT ONLY
					return this._Insert_by_range(args[0], args[1]);
				}
				else
				{
					let ret: SetIterator<T, Source>;
					let is_reverse_iterator: boolean = false;

					// REVERSE_ITERATOR TO ITERATOR
					if (args[0] instanceof SetReverseIterator)
					{
						is_reverse_iterator = true;
						args[0] = (args[0] as SetReverseIterator<T, Source>).base().prev();
					}

					// INSERT AN ELEMENT
					ret = this._Insert_by_hint(args[0], args[1]);

					// RETURN BRANCHES
					if (is_reverse_iterator == true)
						return new SetReverseIterator<T, Source>(ret.next());
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
		protected abstract _Insert_by_hint(hint: SetIterator<T, Source>, val: T): SetIterator<T, Source>;
		
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
		public erase(it: SetIterator<T, Source>): SetIterator<T, Source>;

		/**
		 * Erase elements.
		 * 
		 * Removes from the set container a range of elements..
		 *
		 * This effectively reduces the container size by the number of elements removed.
		 *
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 */
		public erase(begin: SetIterator<T, Source>, end: SetIterator<T, Source>): SetIterator<T, Source>;

		/**
		 * @inheritdoc
		 */
		public erase(it: SetReverseIterator<T, Source>): SetReverseIterator<T, Source>;

		/**
		 * Erase elements.
		 * Removes from the set container a range of elements..
		 *
		 * This effectively reduces the container size by the number of elements removed.
		 *
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 */
		public erase(begin: SetReverseIterator<T, Source>, end: SetReverseIterator<T, Source>): SetReverseIterator<T, Source>;

		public erase(...args: any[]): any
		{
			if (args.length == 1 && !(args[0] instanceof SetIterator && (args[0] as SetIterator<T, Source>).source() as any == this))
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
			let ret: SetIterator<T, Source>;
			let is_reverse_iterator: boolean = false;

			// REVERSE ITERATOR TO ITERATOR
			if (first instanceof SetReverseIterator)
			{
				is_reverse_iterator = true;

				let first_it = (last as SetReverseIterator<T, Source>).base();
				let last_it = (first as SetReverseIterator<T, Source>).base();

				first = first_it;
				last = last_it;
			}

			// ERASE ELEMENTS
			ret = this._Erase_by_range(first, last);

			// RETURN BRANCHES
			if (is_reverse_iterator == true)
				return new SetReverseIterator<T, Source>(ret.next());
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
		private _Erase_by_range(first: SetIterator<T, Source>, last: SetIterator<T, Source>): SetIterator<T, Source>
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
		public swap(obj: SetContainer<T, Source>): void
		{
			// CHANGE ITERATORS' SOURCES
			[this.data_["associative_"], obj.data_["associative_"]] = [obj.data_["associative_"], this.data_["associative_"]];

			// CHANGE CONTENTS
			[this.data_, obj.data_] = [obj.data_, this.data_];
		}

		/**
		 * Merge two sets.
		 * 
		 * Extracts and transfers elements from *source* to this container.
		 * 
		 * @param source A {@link SetContainer set container} to transfer the elements from.
		 */
		public abstract merge(source: SetContainer<T, Source>): void;

		/* ---------------------------------------------------------
			POST-PROCESS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected abstract _Handle_insert(first: SetIterator<T, Source>, last: SetIterator<T, Source>): void;

		/**
		 * @hidden
		 */
		protected abstract _Handle_erase(first: SetIterator<T, Source>, last: SetIterator<T, Source>): void;
	}
}
