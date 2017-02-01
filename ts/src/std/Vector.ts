/// <reference path="API.ts" />

/// <reference path="base/Container.ts" />
/// <reference path="Iterator.ts" />

namespace std.Vector
{
	export type iterator<T> = VectorIterator<T>;
	export type reverse_iterator<T> = VectorReverseIterator<T>;
}

namespace std
{
	/**
	 * Vector, the dynamic array.
	 *
	 * {@link Vector}s are sequence containers representing arrays that can change in size.
	 *
	 * Just like arrays, {@link Vector}s use contiguous storage locations for their elements, which means that 
	 * their elements can also be accessed using offsets on regular pointers to its elements, and just as efficiently 
	 * as in arrays. But unlike arrays, their size can change dynamically, with their storage being handled 
	 * automatically by the container.
	 *
	 * Internally, {@link Vector}s use a dynamically allocated array to store their elements. This array may need 
	 * to be reallocated in order to grow in size when new elements are inserted, which implies allocating a new 
	 * array and moving all elements to it. This is a relatively expensive task in terms of processing time, and 
	 * thus, {@link Vector}s do not reallocate each time an element is added to the container.
	 *
	 * Compared to the other dynamic sequence containers ({@link Deque}s, {@link List}s), {@link Vector Vectors} 
	 * are very efficient accessing its elements (just like arrays) and relatively efficient adding or removing 
	 * elements from its end. For operations that involve inserting or removing elements at positions other than the 
	 * end, they perform worse than the others, and have less consistent iterators and references than {@link List}s. 
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> 
	 * </a>
	 * 
	 * ### Container properties
	 * <dl>
	 *	<dt> Sequence </dt>
	 *	<dd> 
	 *		Elements in sequence containers are ordered in a strict linear sequence. Individual elements are 
	 *		accessed by their position in this sequence. 
	 *	</dd>
	 *
	 *	<dt> Dynamic array </dt>
	 *	<dd> 
	 *		Allows direct access to any element in the sequence, even through pointer arithmetics, and provides 
	 *		relatively fast addition/removal of elements at the end of the sequence. 
	 *	</dd>
	 * </dl>
	 *
	 * @param <T> Type of the elements.
	 *
	 * @reference http://www.cplusplus.com/reference/vector/vector
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class Vector<T>
		extends base.Container<T>
		implements base.IArrayContainer<T>
	{
		/**
		 * @hidden
		 */
		private data_: T[];

		/**
		 * @hidden
		 */
		private begin_: VectorIterator<T>;

		/**
		 * @hidden
		 */
		private end_: VectorIterator<T>;
		
		/**
		 * @hidden
		 */
		private rend_: VectorReverseIterator<T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 *
		 * Constructs an empty container, with no elements.
		 */
		public constructor();

		/**
		 * @inheritdoc
		 */
		public constructor(array: Array<T>);

		/**
		 * Initializer list Constructor.
		 *
		 * Constructs a container with a copy of each of the elements in <i>array</i>, in the same order.
		 *
		 * @param array An array containing elements to be copied and contained.
		 */
		public constructor(n: number);

		/**
		 * Fill Constructor.
		 *
		 * Constructs a container with <i>n</i> elements. Each element is a copy of <i>val</i> (if provided).
		 *
		 * @param n Initial container size (i.e., the number of elements in the container at construction).
		 * @param val Value to fill the container with. Each of the <i>n</i> elements in the container is 
		 *			  initialized to a copy of this value.
		 */
		public constructor(n: number, val: T);

		/**
		 * Copy Constructor.
		 *
		 * Constructs a container with a copy of each of the elements in <i>container</i>, in the same order.
		 *
		 * @param container Another container object of the same type (with the same class template 
		 *					arguments <i>T</i>), whose contents are either copied or acquired.
		 */
		public constructor(container: Vector<T>);

		/**
		 * Range Constructor.
		 *
		 * Constructs a container with as many elements as the range (<i>begin</i>, <i>end<i>), with each 
		 * element emplace-constructed from its corresponding element in that range, in the same order.
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: Iterator<T>, end: Iterator<T>);
		
		public constructor(...args: any[])
		{
			super();

			// THE DATA
			this.data_ = [];

			// RESERVED ITERATORS
			this.begin_ = new VectorIterator<T>(this, 0);
			this.end_ = new VectorIterator<T>(this, -1);
			this.rend_ = new VectorReverseIterator<T>(this.begin_);

			// CONSTRUCTORS BRANCH
			if (args.length == 0)
			{
				// DEFAULT CONSTRUCTOR
			}
			else if (args.length == 1 && args[0] instanceof Array)
			{
				// CONSTRUCT FROM AN ARRAY OF ITEMS
				let array: Array<T> = args[0];
				
				this.data_ = array.slice();
			}
			else if (args.length == 1 && typeof args[0] == "number")
			{
				// CONSTRUCT FROM SIZE
				let size: number = args[0];
				
				this.data_.length = size;
			}
			else if (args.length == 2 && typeof args[0] == "number")
			{
				// CONSTRUCT FROM SIZE AND REPEATING VALUE
				let size: number = args[0];
				let val: T = args[1];
				
				this.assign(size, val);
			}
			else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
			{
				// CONSTRUCT FROM INPUT ITERATORS
				let begin: Iterator<T> = args[0];
				let end: Iterator<T> = args[1];

				this.assign(begin, end);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<U extends T, InputIterator extends Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		/**
		 * @inheritdoc
		 */
		public assign(n: number, val: T): void;

		public assign<U extends T, InputIterator extends Iterator<U>>
			(first: any, second: any): void
		{
			this.clear();
			this.insert(this.end(), first, second);
		}

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			this.erase(this.begin(), this.end());
		}

		/* =========================================================
			ACCESSORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public begin(): VectorIterator<T>
		{
			if (this.empty() == true)
				return this.end_;
			else
				return this.begin_;
		}

		/**
		 * @inheritdoc
		 */
		public end(): VectorIterator<T>
		{
			return this.end_;
		}

		/**
		 * @inheritdoc
		 */
		public rbegin(): VectorReverseIterator<T>
		{
			return new VectorReverseIterator(this.end_);
		}

		/**
		 * @inheritdoc
		 */
		public rend(): VectorReverseIterator<T>
		{
			if (this.empty() == true)
				return new VectorReverseIterator<T>(this.end_);
			else
				return this.rend_;
		}

		/**
		 * @inheritdoc
		 */
		public size(): number
		{
			return this.data_.length;
		}

		/**
		 * @inheritdoc
		 */
		public empty(): boolean
		{
			return this.size() == 0;
		}

		/**
		 * @inheritdoc
		 */
		public at(index: number): T
		{
			if (index < this.size())
				return this.data_[index];
			else
				throw new OutOfRange("Target index is greater than Vector's size.");
		}

		/**
		 * @inheritdoc
		 */
		public set(index: number, val: T): T
		{
			if (index >= this.size())
				throw new OutOfRange("Target index is greater than Vector's size.");

			let prev: T = this.data_[index];
			this.data_[index] = val;

			return prev;
		}

		/**
		 * @inheritdoc
		 */
		public front(): T
		{
			return this.at(0);
		}

		/**
		 * @inheritdoc
		 */
		public back(): T
		{
			return this.at(this.size() - 1);
		}

		/**
		 * Access data.
		 * 
		 * Returns a direct array which is used internally by the {@link vector} to store its owned elements.
		 * 
		 * @returns An array.
		 */
		public data(): Array<T>
		{
			return this.data_;
		}

		/* =========================================================
			ELEMENTS I/O
				- INSERT
				- ERASE
				- SWAP
		============================================================
			INSERT
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public push(...items: T[]): number
		{
			return this.data_.push(...items);
		}

		/**
		 * @inheritdoc
		 */
		public push_back(val: T): void
		{
			this.data_.push(val);
		}

		/**
		 * Insert an element.
		 *
		 * The {@link Vector} is extended by inserting new element before the element at the specified 
		 * <i>position</i>, effectively increasing the container size by one.
		 *
		 * Because {@link Vector}s use an <code>Array</code> as their underlying storage, inserting element in 
		 * positions other than the {@link end end()} causes the container to relocate all the elements that were 
		 * after <i>position</i> to its new position. This is generally an inefficient operation compared to the one 
		 * performed for the same operation by other kinds of sequence containers (such as {@link List}).
		 *
		 * @param position Position in the {@link Vector} where the new element is inserted.
		 *				   {@link iterator} is a member type, defined as a 
		 *				   {@link VectorIterator random access iterator} type that points to elements.
		 * @param val Value to be copied to the inserted element.
		 *
		 * @return An iterator that points to the newly inserted element.
		 */
		public insert(position: VectorIterator<T>, val: T): VectorIterator<T>;

		/**
		 * Insert elements by repeated filling.
		 *
		 * The {@link Vector} is extended by inserting new elements before the element at the specified 
		 * <i>position</i>, effectively increasing the container size by the number of elements inserted.
		 * 
		 * Because {@link Vector}s use an <code>Array</code> as their underlying storage, inserting elements in 
		 * positions other than the {@link end end()} causes the container to relocate all the elements that were 
		 * after <i>position</i> to their new positions. This is generally an inefficient operation compared to the 
		 * one performed for the same operation by other kinds of sequence containers (such as {@link List}).
		 * 
		 * @param position Position in the {@link Vector} where the new elements are inserted.
		 *				   {@link iterator} is a member type, defined as a 
		 *				   {@link VectorIterator random access iterator} type that points to elements.
		 * @param n Number of elements to insert. Each element is initialized to a copy of <i>val</i>.
		 * @param val Value to be copied (or moved) to the inserted elements.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert(position: VectorIterator<T>, n: number, val: T): VectorIterator<T>;

		/**
		 * Insert elements by range iterators.
		 *
		 * The {@link Vector} is extended by inserting new elements before the element at the specified 
		 * <i>position</i>, effectively increasing the container size by the number of elements inserted by range 
		 * iterators.
		 * 
		 * Because {@link Vector}s use an <code>Array</code> as their underlying storage, inserting elements in 
		 * positions other than the {@link end end()} causes the container to relocate all the elements that were 
		 * after <i>position</i> to their new positions. This is generally an inefficient operation compared to the 
		 * one performed for the same operation by other kinds of sequence containers (such as {@link List}).
		 *
		 * @param position Position in the {@link Vector} where the new elements are inserted.
		 *				   {@link iterator} is a member type, defined as a 
		 *				   {@link VectorIterator random access iterator} type that points to elements.
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert<U extends T, InputIterator extends Iterator<U>>
			(position: VectorIterator<T>, begin: InputIterator, end: InputIterator): VectorIterator<T>;

		/**
		 * Insert an element.
		 *
		 * The {@link Vector} is extended by inserting new element before the element at the specified 
		 * <i>position</i>, effectively increasing the container size by one.
		 *
		 * Because {@link Vector}s use an <code>Array</code> as their underlying storage, inserting element in 
		 * positions other than the {@link end end()} causes the container to relocate all the elements that were 
		 * after <i>position</i> to its new position. This is generally an inefficient operation compared to the one 
		 * performed for the same operation by other kinds of sequence containers (such as {@link List}).
		 *
		 * @param position Position in the {@link Vector} where the new element is inserted.
		 *				   {@link iterator} is a member type, defined as a 
		 *				   {@link VectorIterator random access iterator} type that points to elements.
		 * @param val Value to be copied to the inserted element.
		 *
		 * @return An iterator that points to the newly inserted element.
		 */
		public insert(position: VectorReverseIterator<T>, val: T): VectorReverseIterator<T>;

		/**
		 * Insert elements by repeated filling.
		 *
		 * The {@link Vector} is extended by inserting new elements before the element at the specified 
		 * <i>position</i>, effectively increasing the container size by the number of elements inserted.
		 * 
		 * Because {@link Vector}s use an <code>Array</code> as their underlying storage, inserting elements in 
		 * positions other than the {@link end end()} causes the container to relocate all the elements that were 
		 * after <i>position</i> to their new positions. This is generally an inefficient operation compared to the 
		 * one performed for the same operation by other kinds of sequence containers (such as {@link List}).
		 * 
		 * @param position Position in the {@link Vector} where the new elements are inserted.
		 *				   {@link iterator} is a member type, defined as a 
		 *				   {@link VectorIterator random access iterator} type that points to elements.
		 * @param n Number of elements to insert. Each element is initialized to a copy of <i>val</i>.
		 * @param val Value to be copied (or moved) to the inserted elements.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert(position: VectorReverseIterator<T>, n: number, val: T): VectorReverseIterator<T>;

		/**
		 * Insert elements by range iterators.
		 *
		 * The {@link Vector} is extended by inserting new elements before the element at the specified 
		 * <i>position</i>, effectively increasing the container size by the number of elements inserted by range 
		 * iterators.
		 * 
		 * Because {@link Vector}s use an <code>Array</code> as their underlying storage, inserting elements in 
		 * positions other than the {@link end end()} causes the container to relocate all the elements that were 
		 * after <i>position</i> to their new positions. This is generally an inefficient operation compared to the 
		 * one performed for the same operation by other kinds of sequence containers (such as {@link List}).
		 *
		 * @param position Position in the {@link Vector} where the new elements are inserted.
		 *				   {@link iterator} is a member type, defined as a 
		 *				   {@link VectorIterator random access iterator} type that points to elements.
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert<U extends T, InputIterator extends Iterator<U>>
			(position: VectorReverseIterator<T>, begin: InputIterator, end: InputIterator): VectorReverseIterator<T>;

		public insert<U extends T>(...args: any[]): VectorIterator<T> | VectorReverseIterator<T>
		{
			// REVERSE_ITERATOR TO ITERATOR
			let ret: VectorIterator<T>;
			let is_reverse_iterator: boolean = false;

			if (args[0] instanceof VectorReverseIterator)
			{
				is_reverse_iterator = true;
				args[0] = (args[0] as VectorReverseIterator<T>).base().prev();
			}

			// BRANCHES
			if (args.length == 2)
				ret = this._Insert_by_val(args[0], args[1]);
			else if (args.length == 3 && typeof args[1] == "number")
				ret = this._Insert_by_repeating_val(args[0], args[1], args[2]);
			else
				ret = this._Insert_by_range(args[0], args[1], args[2]);

			// RETURNS
			if (is_reverse_iterator == true)
				return new VectorReverseIterator<T>(ret.next());
			else
				return ret;
		}

		/**
		 * @hidden
		 */
		private _Insert_by_val(position: VectorIterator<T>, val: T): VectorIterator<T>
		{
			return this._Insert_by_repeating_val(position, 1, val);
		}

		/**
		 * @hidden
		 */
		private _Insert_by_repeating_val(position: VectorIterator<T>, n: number, val: T): VectorIterator<T>
		{
			let first: base._Repeater<T> = new base._Repeater<T>(0, val);
			let last: base._Repeater<T> = new base._Repeater<T>(n);

			return this._Insert_by_range(position, first, last);
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<InputIterator extends Iterator<T>>
			(position: VectorIterator<T>, first: InputIterator, last: InputIterator): VectorIterator<T>
		{
			if (position.index() == -1)
			{ 
				// WHEN INSERT TO THE LAST
				for (; !first.equals(last); first = first.next() as InputIterator)
					this.data_.push(first.value);
				
				return this.begin();
			}
			else
			{
				///////
				// INSERT TO THE MIDDLE POSITION
				///////
				// CUT RIGHT SIDE
				let spliced_array: T[] = this.data_.splice(position.index());
				let insert_size: number = 0;

				// INSERT ELEMENTS
				for (; !first.equals(last); first = first.next() as InputIterator)
				{
					this.data_.push(first.value);
					insert_size++;
				}
				this.data_.push(...spliced_array); // CONCAT THE SPLICEDS
				
				return position;
			}
		}
		
		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public pop_back(): void
		{
			this.erase(this.end().prev());
		}

		/**
		 * Erase element.
		 *
		 * Removes from the {@link Vector} either a single element; <i>position</i>.
		 *
		 * This effectively reduces the container size by the number of element removed.
		 *
		 * Because {@link Vector}s use an <code>Array</code> as their underlying storage, erasing an element in 
		 * position other than the {@link end end()} causes the container to relocate all the elements after the 
		 * segment erased to their new positions. This is generally an inefficient operation compared to the one 
		 * performed for the same operation by other kinds of sequence containers (such as {@link List}).
		 * 
		 * @param position Iterator pointing to a single element to be removed from the {@link Vector}.
		 *
		 * @return An iterator pointing to the new location of the element that followed the last element erased by 
		 *		   the function call. This is the {@link end end()} if the operation erased the last element in the 
		 *		   sequence.
		 */
		public erase(position: VectorIterator<T>): VectorIterator<T>;
		
		/**
		 * Erase element.
		 *
		 * Removes from the <ode>Vector</code> either a single element; <i>position</i>.
		 *
		 * This effectively reduces the container size by the number of elements removed.
		 *
		 * Because {@link Vector}s use an <code>Array</code> as their underlying storage, erasing elements in 
		 * position other than the {@link end end()} causes the container to relocate all the elements after the 
		 * segment erased to their new positions. This is generally an inefficient operation compared to the one 
		 * performed for the same operation by other kinds of sequence containers (such as {@link List}).
		 * 
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 *
		 * @return An iterator pointing to the new location of the element that followed the last element erased by 
		 *		   the function call. This is the {@link rend rend()} if the operation erased the last element in the 
		 *		   sequence.
		 */
		public erase(first: VectorIterator<T>, last: VectorIterator<T>): VectorIterator<T>;

		/**
		 * Erase element.
		 *
		 * Removes from the {@link Vector} either a single element; <i>position</i>.
		 *
		 * This effectively reduces the container size by the number of element removed.
		 *
		 * Because {@link Vector}s use an <code>Array</code> as their underlying storage, erasing an element in 
		 * position other than the {@link end end()} causes the container to relocate all the elements after the 
		 * segment erased to their new positions. This is generally an inefficient operation compared to the one 
		 * performed for the same operation by other kinds of sequence containers (such as {@link List}).
		 * 
		 * @param position Iterator pointing to a single element to be removed from the {@link Vector}.
		 *
		 * @return An iterator pointing to the new location of the element that followed the last element erased by 
		 *		   the function call. This is the {@link rend rend()} if the operation erased the last element in the 
		 *		   sequence.
		 */
		public erase(position: VectorReverseIterator<T>): VectorReverseIterator<T>;

		/**
		 * Erase element.
		 *
		 * Removes from the <ode>Vector</code> either a single element; <i>position</i>.
		 *
		 * This effectively reduces the container size by the number of elements removed.
		 *
		 * Because {@link Vector}s use an <code>Array</code> as their underlying storage, erasing elements in 
		 * position other than the {@link end end()} causes the container to relocate all the elements after the 
		 * segment erased to their new positions. This is generally an inefficient operation compared to the one 
		 * performed for the same operation by other kinds of sequence containers (such as {@link List}).
		 * 
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 *
		 * @return An iterator pointing to the new location of the element that followed the last element erased by 
		 *		   the function call. This is the {@link end end()} if the operation erased the last element in the 
		 *		   sequence.
		 */
		public erase(first: VectorReverseIterator<T>, last: VectorReverseIterator<T>): VectorReverseIterator<T>;

		public erase(first: any, last: any = first.next()): any
		{
			let ret: VectorIterator<T>;
			let is_reverse_iterator: boolean = false;

			// REVERSE_ITERATOR TO ITERATOR
			if (first instanceof VectorReverseIterator)
			{
				is_reverse_iterator = true;

				let first_it = (last as VectorReverseIterator<T>).base();
				let last_it = (first as VectorReverseIterator<T>).base();

				first = first_it;
				last = last_it;
			}

			// ERASE ELEMENTS
			ret = this._Erase_by_range(first, last);

			// RETURN BRANCHES
			if (is_reverse_iterator == true)
				return new VectorReverseIterator<T>(ret.next());
			else
				return ret;	
		}

		/**
		 * @hidden
		 */
		protected _Erase_by_range(first: VectorIterator<T>, last: VectorIterator<T>): VectorIterator<T>
		{
			if (first.index() == -1)
				return first;

			// ERASE ELEMENTS
			if (last.index() == -1)
			{
				this.data_.splice(first.index());
				return this.end();
			}
			else
				this.data_.splice(first.index(), last.index() - first.index());

			return first;
		}

		/* ---------------------------------------------------------------
			SWAP
		--------------------------------------------------------------- */
		/**
		 * Swap content.
		 * 
		 * Exchanges the content of the container by the content of <i>obj</i>, which is another 
		 * {@link Vector container} object with same type of elements. Sizes and container type may differ.
		 * 
		 * After the call to this member function, the elements in this container are those which were in <i>obj</i> 
		 * before the call, and the elements of <i>obj</i> are those which were in this. All iterators, references and 
		 * pointers remain valid for the swapped objects.
		 *
		 * Notice that a non-member function exists with the same name, {@link swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function.
		 * 
		 * @param obj Another {@link Vector container} of the same type of elements (i.e., instantiated
		 *			  with the same template parameter, <b>T</b>) whose content is swapped with that of this 
		 *			  {@link Vector container}.
		 */
		public swap(obj: Vector<T>): void;

		/**
		 * @inheritdoc
		 */
		public swap(obj: base.Container<T>): void;

		public swap(obj: Vector<T> | base.Container<T>): void
		{
			if (obj instanceof Vector) // SWAP DATA
				[this.data_, obj.data_] = [obj.data_, this.data_];
			else
				super.swap(obj);
		}
	}
}

namespace std
{
	/**
	 * An iterator of Vector.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> 
	 *
	 * @param <T> Type of the elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class VectorIterator<T>
		extends Iterator<T>
		implements base.IArrayIterator<T>
	{
		/**
		 * @hidden
		 */
		private index_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from the source {@link Vector container}.
		 *
		 * #### Note
		 * Do not create the iterator directly, by yourself.
		 * 
		 * Use {@link Vector.begin begin()}, {@link Vector.end end()} in {@link Vector container} instead. 
		 *
		 * @param source The source {@link Vector container} to reference.
		 * @param index Sequence number of the element in the source {@link Vector}.
		 */
		public constructor(source: Vector<T>, index: number)
		{
			super(source);

			this.index_ = index;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public source(): Vector<T>
		{
			return this.source_ as Vector<T>;
		}

		/**
		 * @inheritdoc
		 */
		public index(): number
		{
			return this.index_;
		}
		
		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.source().at(this.index_);
		}

		/**
		 * Set value of the iterator is pointing to.
		 * 
		 * @param val Value to set.
		 */
		public set value(val: T)
		{
			this.source().set(this.index_, val);
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): VectorIterator<T>
		{
			if (this.index_ == -1)
				return new VectorIterator(this.source(), this.source_.size() - 1);
			else if (this.index_ - 1 < 0)
				return this.source().end();
			else
				return new VectorIterator<T>(this.source(), this.index_ - 1);
		}

		/**
		 * @inheritdoc
		 */
		public next(): VectorIterator<T>
		{
			if (this.index_ >= this.source_.size() - 1)
				return this.source().end();
			else
				return new VectorIterator<T>(this.source(), this.index_ + 1);
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): VectorIterator<T>
		{
			let new_index: number;
			if (n < 0 && this.index_ == -1)
				new_index = this.source_.size() + n;
			else
				new_index = this.index_ + n;

			if (new_index < 0 || new_index >= this.source_.size())
				return this.source().end();
			else
				return new VectorIterator<T>(this.source(), new_index);
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals(obj: VectorIterator<T>): boolean
		{
			return super.equals(obj) && this.index_ == obj.index_;
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: VectorIterator<T>): void
		{
			[this.value, obj.value] = [obj.value, this.value];
		}
	}
}

namespace std
{
	/**
	 * A reverse-iterator of Vector.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> 
	 *
	 * @param <T> Type of the elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class VectorReverseIterator<T>
		extends ReverseIterator<T, Vector<T>, VectorIterator<T>, VectorReverseIterator<T>>
		implements base.IArrayIterator<T>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from base iterator.
		 * 
		 * @param base A reference of the base iterator, which iterates in the opposite direction.
		 */
		public constructor(base: VectorIterator<T>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected _Create_neighbor(base: VectorIterator<T>): VectorReverseIterator<T>
		{
			return new VectorReverseIterator<T>(base);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public index(): number
		{
			return this.base_.index();
		}
		
		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.base_.value;
		}

		/**
		 * Set value of the iterator is pointing to.
		 * 
		 * @param val Value to set.
		 */
		public set value(val: T)
		{
			this.base_.value = val;
		}
	}
}