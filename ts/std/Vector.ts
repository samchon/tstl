namespace std
{
	/**
	 * <p> Vector, the dynamic array. </p>
	 *
	 * <p> {@link Vector}s are sequence containers representing arrays that can change in size. </p>
	 *
	 * <p> Just like arrays, {@link Vector}s use contiguous storage locations for their elements, which 
	 * means that their elements can also be accessed using offsets on regular pointers to its elements, and 
	 * just as efficiently as in arrays. But unlike arrays, their size can change dynamically, with their 
	 * storage being handled automatically by the container. </p>
	 *
	 * <p> Internally, {@link Vector}s use a dynamically allocated array to store their elements. This 
	 * array may need to be reallocated in order to grow in size when new elements are inserted, which implies 
	 * allocating a new array and moving all elements to it. This is a relatively expensive task in terms of 
	 * processing time, and thus, {@link Vector}s do not reallocate each time an element is added to the 
	 * container. </p>
	 *
	 * <p> Instead, {@link Vector} containers may allocate some extra storage to accommodate for possible 
	 * growth, and thus the container may have an actual {@link capacity} greater than the storage strictly 
	 * needed to contain its elements (i.e., its {@link size}). Libraries can implement different strategies 
	 * for growth to balance between memory usage and reallocations, but in any case, reallocations should only 
	 * happen at logarithmically growing intervals of {@link size} so that the insertion of individual 
	 * elements at the end of the {@link Vector} can be provided with amortized constant time complexity 
	 * (see {@link pushBack pushBack()}). </p>
	 *
	 * <p> Therefore, compared to arrays, {@link Vector}s consume more memory in exchange for the ability 
	 * to manage storage and grow dynamically in an efficient way. </p>
	 *
	 * <p> Compared to the other dynamic sequence containers ({@link Deque}s, {@link List}s), 
	 * {@link Vector}s are very efficient accessing its elements (just like arrays) and relatively 
	 * efficient adding or removing elements from its end. For operations that involve inserting or removing 
	 * elements at positions other than the end, they perform worse than the others, and have less consistent 
	 * iterators and references than {@link List}s. </p>
	 *
	 * <h3> Container properties </h3>
	 * <dl>
	 *	<dt> Sequence </dt>
	 *	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are 
	 *		 accessed by their position in this sequence. </dd>
	 *
	 *	<dt> Dynamic array </dt>
	 *	<dd> Allows direct access to any element in the sequence, even through pointer arithmetics, and provides 
	 *		 relatively fast addition/removal of elements at the end of the sequence. </dd>
	 * </dl>
	 *
	 * <ul>
	 *  <li> Reference: http://www.cplusplus.com/reference/vector/vector/
	 * </ul>
	 *
	 * @param <T> Type of the elements.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class Vector<T>
		extends Array<T>
		implements base.container.IArray<T>
	{
		public static get iterator() { return VectorIterator; }

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * <p> Default Constructor. </p>
		 *
		 * <p> Constructs an empty container, with no elements. </p>
		 */
		public constructor();

		/**
		 * @inheritdoc
		 */
		public constructor(array: Array<T>);

		/**
		 * <p> Initializer list Constructor. </p>
		 *
		 * <p> Constructs a container with a copy of each of the elements in <i>array</i>, in the same order. </p>
		 *
		 * @param array An array containing elements to be copied and contained.
		 */
		public constructor(n: number);

		/**
		 * <p> Fill Constructor. </p>
		 *
		 * <p> Constructs a container with <i>n</i> elements. Each element is a copy of <i>val</i> (if provided). </p>
		 *
		 * @param n Initial container size (i.e., the number of elements in the container at construction).
		 * @param val Value to fill the container with. Each of the <i>n</i> elements in the container is 
		 *			  initialized to a copy of this value.
		 */
		public constructor(n: number, val: T);

		/**
		 * <p> Copy Constructor. </p>
		 *
		 * <p> Constructs a container with a copy of each of the elements in <i>container</i>, in the same order. </p>
		 *
		 * @param container Another container object of the same type (with the same class template 
		 *					arguments <i>T</i>), whose contents are either copied or acquired.
		 */
		public constructor(container: base.container.IContainer<T>);

		/**
		 * <p> Range Constructor. </p>
		 *
		 * <p> Constructs a container with as many elements as the range (<i>begin</i>, <i>end<i>), with each 
		 * element emplace-constructed from its corresponding element in that range, in the same order. </p>
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);
		
		public constructor(...args: any[])
		{
			super();

			if (args.length == 0)
			{
				// DEFAULT CONSTRUCTOR
			}
			if (args.length == 1 && args[0] instanceof Array)
			{
				// CONSTRUCT FROM AN ARRAY OF ITEMS
				let array: Array<T> = args[0];
				
				this.push(...array);
			}
			else if (args.length == 1 && typeof args[0] == "number")
			{
				// CONSTRUCT FROM SIZE
				let size: number = args[0];
				
				this.length = size;
			}
			else if (args.length == 2 && typeof args[0] == "number")
			{
				// CONSTRUCT FROM SIZE AND REPEATING VALUE
				let size: number = args[0];
				let val: T = args[1];
				
				this.assign(size, val);
			}
			else if (args.length == 1 && (args[0] instanceof Vector || args[0] instanceof base.container.Container))
			{
				// COPY CONSTRUCTOR
				let container: base.container.Container<T> = <base.container.Container<T>>args[0];
				
				this.assign(container.begin(), container.end());
			}
			else if (args.length == 2 && args[0] instanceof base.container.Iterator && args[1] instanceof base.container.Iterator)
			{
				// CONSTRUCT FROM INPUT ITERATORS
				let begin: base.container.Iterator<T> = args[0];
				let end: base.container.Iterator<T> = args[1];

				this.assign(begin, end);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<U extends T>(begin: base.container.Iterator<U>, end: base.container.Iterator<U>): void;

		/**
		 * @inheritdoc
		 */
		public assign(n: number, val: T): void;

		public assign<U extends T>(first: any, second: any): void
		{
			this.clear();

			if (first instanceof base.container.Iterator && second instanceof base.container.Iterator)
			{
				let begin: base.container.Iterator<U> = first;
				let end: base.container.Iterator<U> = second;

				for (let it = begin; it.equals(end) == false; it = it.next())
					this.push(it.value);
			}
			else if (typeof first == "number")
			{
				let size: number = <number>first;
				let val: T = <T>second;

				this.length = size;

				for (let i: number = 0; i < size; i++)
					this[i] = val;
			}
		}

		/**
		 * @inheritdoc
		 */
		public reserve(size: number): void
		{
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
				return this.end();
			else
				return new VectorIterator<T>(this, 0);
		}

		/**
		 * @inheritdoc
		 */
		public end(): VectorIterator<T>
		{
			return new VectorIterator<T>(this, -1);
		}

		/**
		 * @inheritdoc
		 */
		public size(): number
		{
			return this.length;
		}

		/**
		 * @inheritdoc
		 */
		public capacity(): number
		{
			return this.length;
		}

		/**
		 * @inheritdoc
		 */
		public empty(): boolean
		{
			return this.length == 0;
		}

		/**
		 * @inheritdoc
		 */
		public at(index: number): T
		{
			if (index < this.size())
				return this[index];
			else
				throw new std.OutOfRange("Target index is greater than Vector's size.");
		}

		/**
		 * @inheritdoc
		 */
		public set(index: number, val: T): T
		{
			if (index > this.length)
				throw new std.OutOfRange("Target index is greater than Vector's size.");

			let prev: T = this[index];
			this[index] = val;

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
			return this.at(this.length - 1);
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public pushBack(val: T): void
		{
			this.push(val);
		}

		/**
		 * @inheritdoc
		 */
		public popBack(): void
		{
			this.erase(this.end().prev());
		}

		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> The {@link Vector} is extended by inserting new element before the element at the specified 
		 * <i>position</i>, effectively increasing the container size by one. </p>
		 *
		 * <p> This causes an automatic reallocation of the allocated storage space if -and only if- the new 
		 * {@link size} surpasses the current {@link capacity}. </p>
		 *
		 * <p> Because {@link Vector}s use an <code>Array</code> as their underlying storage, inserting 
		 * element in positions other than the {@link end end()} causes the container to relocate all the 
		 * elements that were after <i>position</i> to its new position. This is generally an inefficient 
		 * operation compared to the one performed for the same operation by other kinds of sequence containers 
		 * (such as {@link List}). </p>
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
		 * <p> Insert elements by repeated filling. </p>
		 *
		 * <p> The {@link Vector} is extended by inserting new elements before the element at the specified 
		 * <i>position</i>, effectively increasing the container size by the number of elements inserted. </p>
		 * 
		 * <p> This causes an automatic reallocation of the allocated storage space if -and only if- the new 
		 * {@link size} surpasses the current {@link capacity}. </p>
		 * 
		 * <p> Because {@link Vector}s use an <code>Array</code> as their underlying storage, inserting 
		 * elements in positions other than the {@link end end()} causes the container to relocate all the 
		 * elements that were after <i>position</i> to their new positions. This is generally an inefficient 
		 * operation compared to the one performed for the same operation by other kinds of sequence containers 
		 * (such as {@link List}).
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
		 * <p> Insert elements by range iterators. </p>
		 *
		 * <p> The {@link Vector} is extended by inserting new elements before the element at the specified 
		 * <i>position</i>, effectively increasing the container size by the number of elements inserted by 
		 * range iterators. </p>
		 * 
		 * <p> This causes an automatic reallocation of the allocated storage space if -and only if- the new 
		 * {@link size} surpasses the current {@link capacity}. </p>

		 * <p> Because {@link Vector}s use an <code>Array</code> as their underlying storage, inserting 
		 * elements in positions other than the {@link end end()} causes the container to relocate all the 
		 * elements that were after <i>position</i> to their new positions. This is generally an inefficient 
		 * operation compared to the one performed for the same operation by other kinds of sequence containers 
		 * (such as {@link List}).
		 *
		 * @param position Position in the {@link Vector} where the new elements are inserted.
		 *				   {@link iterator} is a member type, defined as a 
		 *				   {@link VectorIterator random access iterator} type that points to elements.
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert<U extends T>(position: VectorIterator<T>, begin: base.container.Iterator<U>, end: base.container.Iterator<U>): VectorIterator<T>;

		public insert<U extends T>(...args: any[]): VectorIterator<T>
		{
			let position: VectorIterator<T> = args[0];

			if (args.length == 2 && args[1] instanceof base.container.Iterator == false)
			{
				let val: T = args[1];

				return this.insert(position, 1, val);
			}
			else if (args.length == 3 && typeof args[1] == "number")
			{
				let size: number = <number>args[1];
				let val: T = args[2];

				let spliced: Array<T> = this.splice(position.getIndex());
				let inserts: Array<T> = [];

				for (let i: number = 0; i < size; i++)
					inserts.push(val);

				this.push(...inserts);
				this.push(...spliced);

				return new VectorIterator(this, position.getIndex() + inserts.length - 1);
			}
			else if (args.length == 3 && args[1] instanceof base.container.Iterator && args[2] instanceof base.container.Iterator)
			{
				let myEnd: VectorIterator<T> = args[0];
				let begin: base.container.Iterator<U> = args[1];
				let end: base.container.Iterator<U> = args[2];

				let spliced: Array<T> = this.splice(position.getIndex());
				let inserts: Array<T> = [];

				for (let it = begin; it.equals(end) == false; it = it.next())
					inserts.push(it.value);

				this.push(...spliced);
				this.push(...inserts);

				return new VectorIterator(this, myEnd.getIndex() + inserts.length - 1);
			}
			else
				throw new std.InvalidArgument("invalid parameters.");
		}
		
		/**
		 * <p> Erase element. </p>
		 *
		 * <p> Removes from the {@link Vector} either a single element; <i>position</i>. </p>
		 *
		 * <p> This effectively reduces the container size by the number of element removed. </p>
		 *
		 * <p> Because {@link Vector}s use an <code>Array</code> as their underlying storage, erasing an 
		 * element in position other than the {@link end end()} causes the container to relocate all the 
		 * elements after the segment erased to their new positions. This is generally an inefficient operation 
		 * compared to the one performed for the same operation by other kinds of sequence containers 
		 * (such as {@link List}). </p>
		 * 
		 * @param position Iterator pointing to a single element to be removed from the {@link Vector}.
		 *
		 * @return An iterator pointing to the new location of the element that followed the last element erased 
		 *		   by the function call. This is the {@link end end()} if the operation erased the last 
		 *		   element in the sequence.
		 */
		public erase(position: VectorIterator<T>): VectorIterator<T>;
		
		/**
		 * <p> Erase element. </p>
		 *
		 * <p> Removes from the <ode>Vector</code> either a single element; <i>position</i>. </p>
		 *
		 * <p> This effectively reduces the container size by the number of elements removed. </p>
		 *
		 * <p> Because {@link Vector}s use an <code>Array</code> as their underlying storage, erasing  
		 * elements in position other than the {@link end end()} causes the container to relocate all the 
		 * elements after the segment erased to their new positions. This is generally an inefficient operation 
		 * compared to the one performed for the same operation by other kinds of sequence containers 
		 * (such as {@link List}). </p>
		 * 
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 *
		 * @return An iterator pointing to the new location of the element that followed the last element erased 
		 *		   by the function call. This is the {@link end end()} if the operation erased the last 
		 *		   element in the sequence.
		 */
		public erase(begin: VectorIterator<T>, end: VectorIterator<T>): VectorIterator<T>;

		public erase(begin: VectorIterator<T>, end: VectorIterator<T> = null): VectorIterator<T>
		{
			let startIndex: number = begin.getIndex();

			if (end == null)
				this.splice(startIndex, 1);
			else if (end.getIndex() == -1)
			{
				this.splice(startIndex);

				return this.end();
			}
			else
				this.splice(startIndex, (<VectorIterator<T>>end).getIndex() - startIndex);

			return new VectorIterator<T>(this, startIndex);
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		public swap(obj: Vector<T>): void
		{
			let supplement: Vector<T> = new Vector<T>(this.begin(), this.end());

			this.assign(obj.begin(), obj.end());
			obj.assign(supplement.begin(), supplement.end());
		}
	}
}