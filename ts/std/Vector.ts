namespace std
{
	/**
	 * <p> Vector, the dynamic array. </p>
	 *
	 * <p> <code>Vector</code>s are sequence containers representing arrays that can change in size. </p>
	 *
	 * <p> Just like arrays, <code>Vector</code>s use contiguous storage locations for their elements, which 
	 * means that their elements can also be accessed using offsets on regular pointers to its elements, and 
	 * just as efficiently as in arrays. But unlike arrays, their size can change dynamically, with their 
	 * storage being handled automatically by the container. </p>
	 *
	 * <p> Internally, <code>Vector</code>s use a dynamically allocated array to store their elements. This 
	 * array may need to be reallocated in order to grow in size when new elements are inserted, which implies 
	 * allocating a new array and moving all elements to it. This is a relatively expensive task in terms of 
	 * processing time, and thus, <code>Vector</code>s do not reallocate each time an element is added to the 
	 * container. </p>
	 *
	 * <p> Instead, <code>Vector</code> containers may allocate some extra storage to accommodate for possible 
	 * growth, and thus the container may have an actual <code>capacity</code> greater than the storage strictly 
	 * needed to contain its elements (i.e., its <code>size</code>). Libraries can implement different strategies 
	 * for growth to balance between memory usage and reallocations, but in any case, reallocations should only 
	 * happen at logarithmically growing intervals of <code>size</code> so that the insertion of individual 
	 * elements at the end of the <code>Vector</code> can be provided with amortized constant time complexity 
	 * (see <code>pushBack()</code>). </p>
	 *
	 * <p> Therefore, compared to arrays, <code>Vector</code>s consume more memory in exchange for the ability 
	 * to manage storage and grow dynamically in an efficient way. </p>
	 *
	 * <p> Compared to the other dynamic sequence containers (<code>Deque</code>s, <code>List</code>s), 
	 * <code>Vector</code>s are very efficient accessing its elements (just like arrays) and relatively 
	 * efficient adding or removing elements from its end. For operations that involve inserting or removing 
	 * elements at positions other than the end, they perform worse than the others, and have less consistent 
	 * iterators and references than <code>List</code>s. </p>
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
	 * @author Jeongho Nam
	 */
	export class Vector<T>
		extends Array<T>
		implements base.container.IContainer<T>
	{
		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN & CLEAR
		============================================================
			CONSTURCTORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public constructor();

		/**
		 * @inheritdoc
		 */
		public constructor(array: Array<T>);

		/**
		 * Consturct from capacity size.
		 *
		 * @param n Capacity number to reserve.
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
		public constructor(size: number, val: T);

		/**
		 * @inheritdoc
		 */
		public constructor(container: base.container.IContainer<T>);

		/**
		 * @inheritdoc
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
		 * <p> Assign container content. </p>
		 *
		 * <p> Assigns new contents to the Container, replacing its current contents, 
		 * and modifying its size accordingly. </p>
		 *
		 * @param size New size of the container.
		 * @param val Value to fill the container with. Each of the <u>n</u> elements in the container will be 
		 *			  initialized to a copy of this value.
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
			if (this.size() == 0)
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
		public empty(): boolean
		{
			return this.length == 0;
		}

		/**
		 * <p> Access element. </p>
		 * <p> Returns a value to the element at position <code>index</code> in the Vector.</p>
		 *
		 * <p> The function automatically checks whether n is within the bounds of valid elements in the 
		 * Vector, throwing an OutOfRange exception if it is not (i.e., if <code>index</code> is greater or 
		 * equal than its size). This is in contrast with member operator[], that does not check against 
		 * bounds. </p>
		 *
		 * @param index Position of an element in the container.
		 *			  If this is greater than or equal to the vector size, an exception of type OutOfRange 
		 *			  is thrown. Notice that the first element has a position of 0 (not 1).
		 *
		 * @return The element at the specified position in the container.
		 */
		public at(index: number): T
		{
			if (index < this.size())
				return this[index];
			else
				throw new std.OutOfRange("Target index is greater than Vector's size.");
		}

		/**
		 * <p> Access first element. </p>
		 * <p> Returns a value in the first element of the Vector. </p>
		 *
		 * <p> Unlike member <code>Vector.begin()</code>, which returns an iterator just past this element, 
		 * this function returns a direct value. </p>
		 *
		 * <p> Calling this function on an empty container causes undefined behavior. </p>
		 *
		 * @return A value in the first element of the Vector.
		 */
		public front(): T
		{
			return this.at(0);
		}

		/**
		 * <p> Access last element. </p>
		 * <p> Returns a value in the last element of the Vector. </p>
		 *
		 * <p> Unlike member <code>Vector.end()</code>, which returns an iterator just past this element, 
		 * this function returns a direct value. </p>
		 *
		 * <p> Calling this function on an empty container causes undefined behavior. </p>
		 *
		 * @return A value in the last element of the Vector.
		 */
		public back(): T
		{
			return this.at(this.length - 1);
		}

		/* ---------------------------------------------------------
			ELEMENTS I/O
		--------------------------------------------------------- */
		/**
		 * <p> Add element at the end. </p> 
		 *
		 * <p> Adds a new element at the end of the <code>Vector</code>, after its current last element. The 
		 * content of <i>val</i> is copied to the new element. </p>
		 *
		 * <p> This effectively increases the container <code>size</code> by one, which causes an automatic 
		 * reallocation of the allocated storage space if -and only if- the new <code>Vector.size</code> 
		 * surpasses the current <code>Vector.capacity</code>.
		 *
		 * @param val Value to be copied to the new element.
		 */
		public pushBack(val: T): void
		{
			this.push(val);
		}

		/**
		 * Replaces the element at the specified position in this list with the specified element. 
		 * 
		 * @param index A specified position of the value to replace.
		 * @param val A value to be stored at the specified position.
		 *
		 * @return The previous element had stored at the specified position.
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
		 * <p> Delete last element. </p>
		 * 
		 * <p> Removes the last element in the Vector container, effectively reducing the container 
		 * <code>size</code> by one. </p>
		 */
		public popBack(): void
		{
			this.erase(this.end().prev());
		}

		/**
		 * <p> Insert an element. </p>
		 *
		 * <p> The <code>Vector</code> is extended by inserting new element before the element at the specified 
		 * <i>position</i>, effectively increasing the container size to be more one. </p>
		 *
		 * <p> This causes an automatic reallocation of the allocated storage space if -and only if- the new 
		 * <code>Vector.size</code> surpasses the current <code>Vector.capacity</code>.
		 *
		 * <p> Because <code>Vector</code>s use an <code>Array</code> as their underlying storage, inserting 
		 * element in positions other than the <code>Vector.end</code> causes the container to relocate all the 
		 * elements that were after <i>position</i> to its new position. This is generally an inefficient 
		 * operation compared to the one performed for the same operation by other kinds of sequence containers 
		 * (such as <code>List</code>). </p>
		 *
		 * @param position Position in the <code>Vector</code> where the new element is inserted.
		 *				   <code>iterator</code> is a member type, defined as a random access iterator type that 
		 *				   points to elements.
		 * @param val Value to be copied to the inserted element.
		 *
		 * @return An iterator that points to the newly inserted element.
		 */
		public insert(position: VectorIterator<T>, val: T): VectorIterator<T>;

		/**
		 * <p> Insert elements by repeated filling. </p>
		 *
		 * <p> The <code>Vector</code> is extended by inserting new elements before the element at the specified 
		 * <i>position</i>, effectively increasing the container size by the number of elements inserted. </p>
		 * 
		 * <p> This causes an automatic reallocation of the allocated storage space if -and only if- the new 
		 * <code>Vector.size</code> surpasses the current <code>Vector.capacity</code> </p>.

		 * <p> Because <code>Vector</code>s use an <code>Array</code> as their underlying storage, inserting 
		 * elements in positions other than the <code>Vector.end</code> causes the container to relocate all the 
		 * elements that were after <i>position</i> to their new positions. This is generally an inefficient 
		 * operation compared to the one performed for the same operation by other kinds of sequence containers 
		 * (such as <code>List</code>).
		 * 
		 * @param position Position in the <code>Vector</code> where the new elements are inserted.
		 *				   <code>iterator</code> is a member type, defined as a random access iterator type that 
		 *				   points to elements.
		 * @param n Number of elements to insert. Each element is initialized to a copy of <i>val</i>.
		 * @param val Value to be copied (or moved) to the inserted elements.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert(position: VectorIterator<T>, n: number, val: T): VectorIterator<T>;

		/**
		 * <p> Insert elements by range iterators. </p>
		 *
		 * <p> The <code>Vector</code> is extended by inserting new elements before the element at the specified 
		 * <i>position</i>, effectively increasing the container size by the number of elements inserted by 
		 * range iterators. </p>
		 * 
		 * <p> This causes an automatic reallocation of the allocated storage space if -and only if- the new 
		 * <code>Vector.size</code> surpasses the current <code>Vector.capacity</code> </p>.

		 * <p> Because <code>Vector</code>s use an <code>Array</code> as their underlying storage, inserting 
		 * elements in positions other than the <code>Vector.end</code> causes the container to relocate all the 
		 * elements that were after <i>position</i> to their new positions. This is generally an inefficient 
		 * operation compared to the one performed for the same operation by other kinds of sequence containers 
		 * (such as <code>List</code>).
		 *
		 * @param position Position in the <code>Vector</code> where the new elements are inserted.
		 *				   <code>iterator</code> is a member type, defined as a random access iterator type that 
		 *				   points to elements.
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 *
		 * @return An iterator that points to the first of the newly inserted elements.
		 */
		public insert<U extends T>(position: VectorIterator<T>, begin: base.container.Iterator<U>, end: base.container.Iterator<U>): VectorIterator<T>;

		public insert<U extends T>(...args: any[]): any
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

				this.push(...spliced);
				this.push(...inserts);

				return new VectorIterator(this, position.getIndex() + inserts.length);
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

				return new VectorIterator(this, myEnd.getIndex() + inserts.length);
			}
			else
				throw new std.InvalidArgument("invalid parameters.");
		}
		
		/**
		 * <p> Erase element. </p>
		 *
		 * <p> Removes from the <code>Vector</code> either a single element; <i>position</i>. </p>
		 *
		 * <p> This effectively reduces the container size by the number of element removed. </p>
		 *
		 * <p> Because <code>Vector</code>s use an <code>Array</code> as their underlying storage, erasing an 
		 * element in position other than the <code>Vector.end</code> causes the container to relocate all the 
		 * elements after the segment erased to their new positions. This is generally an inefficient operation 
		 * compared to the one performed for the same operation by other kinds of sequence containers 
		 * (such as <code>List</code>). </p>
		 * 
		 * @param position Iterator pointing to a single element to be removed from the <code>Vector</code>.
		 *
		 * @return An iterator pointing to the new location of the element that followed the last element erased 
		 *		   by the function call. This is the <code>Vector.end</code> if the operation erased the last 
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
		 * <p> Because <code>Vector</code>s use an <code>Array</code> as their underlying storage, erasing  
		 * elements in position other than the <code>Vector.end</code> causes the container to relocate all the 
		 * elements after the segment erased to their new positions. This is generally an inefficient operation 
		 * compared to the one performed for the same operation by other kinds of sequence containers 
		 * (such as <code>List</code>). </p>
		 * 
		 * @param begin An iterator specifying a range of beginning to erase.
		 * @param end An iterator specifying a range of end to erase.
		 *
		 * @return An iterator pointing to the new location of the element that followed the last element erased 
		 *		   by the function call. This is the <code>Vector.end</code> if the operation erased the last 
		 *		   element in the sequence.
		 */
		public erase(begin: VectorIterator<T>, end: VectorIterator<T>): VectorIterator<T>;

		public erase(begin: VectorIterator<T>, end: VectorIterator<T> = null): VectorIterator<T>
		{
			let startIndex: number = (<VectorIterator<T>>begin).getIndex();

			if (end == null)
				this.splice(startIndex, 1);
			else
				this.splice(startIndex, (<VectorIterator<T>>end).getIndex() - startIndex);

			return new VectorIterator<T>(this, startIndex);
		}
	}
}