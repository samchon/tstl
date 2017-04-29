/// <reference path="../API.ts" />

/// <reference path="../base/containers/ArrayContainer.ts" />

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
		extends base.ArrayContainer<T, Vector<T>>
	{
		/**
		 * @hidden
		 */
		private data_: T[];

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
		public constructor(begin: base.Iterator<T>, end: base.Iterator<T>);
		
		public constructor(...args: any[])
		{
			super();

			// THE DATA
			this.data_ = [];

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
			else if (args.length == 1 && args[0] instanceof std.Vector)
			{
				// COPY CONSTRUCTOR
				this.data_ = (args[0] as Vector<T>).data_.slice();
			}
			else if (args.length == 2 && args[0] instanceof base.Iterator && args[1] instanceof base.Iterator)
			{
				// CONSTRUCT FROM INPUT ITERATORS
				let begin: base.Iterator<T> = args[0];
				let end: base.Iterator<T> = args[1];

				this.assign(begin, end);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<U extends T, InputIterator extends base.Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		/**
		 * @inheritdoc
		 */
		public assign(n: number, val: T): void;

		public assign<U extends T, InputIterator extends base.Iterator<U>>
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

		/**
		 * @inheritdoc
		 */
		public [Symbol.iterator](): IterableIterator<T>
		{
			return this.data_[Symbol.iterator]();
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
		 * @hidden
		 */
		protected _Insert_by_range<InputIterator extends base.Iterator<T>>
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
			this.data_.pop();
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