/// <reference path="base/container/Container.ts" />

namespace std
{
	/**
	 * <p> Double ended queue. </p>
	 * 
	 * <p> {@link Deque} (usually pronounced like "<i>deck</i>") is an irregular acronym of 
	 * <b>d</b>ouble-<b>e</b>nded <b>q</b>ueue. Double-ended queues are sequence containers with dynamic 
	 * sizes that can be expanded or contracted on both ends (either its front or its back). </p>
	 * 
	 * <p> Specific libraries may implement deques in different ways, generally as some form of dynamic 
	 * array. But in any case, they allow for the individual elements to be accessed directly through 
	 * random access iterators, with storage handled automatically by expanding and contracting the 
	 * container as needed. </p>
	 * 
	 * <p> Therefore, they provide a functionality similar to vectors, but with efficient insertion and 
	 * deletion of elements also at the beginning of the sequence, and not only at its end. But, unlike 
	 * {@link Vector}s, {@link Deque}s are not guaranteed to store all its elements in contiguous storage 
	 * locations: accessing elements in a <u>deque</u> by offsetting a pointer to another element causes 
	 * undefined behavior. </p>
	 * 
	 * <p> Both {@link Vector}s and {@link Deque}s provide a very similar interface and can be used for 
	 * similar purposes, but internally both work in quite different ways: While {@link Vector}s use a 
	 * single array that needs to be occasionally reallocated for growth, the elements of a {@link Deque} 
	 * can be scattered in different chunks of storage, with the container keeping the necessary information 
	 * internally to provide direct access to any of its elements in constant time and with a uniform 
	 * sequential interface (through iterators). Therefore, {@link Deque}s are a little more complex 
	 * internally than {@link Vector}s, but this allows them to grow more efficiently under certain 
	 * circumstances, especially with very long sequences, where reallocations become more expensive. </p>
	 * 
	 * <p> For operations that involve frequent insertion or removals of elements at positions other than 
	 * the beginning or the end, {@link Deque}s perform worse and have less consistent iterators and 
	 * references than {@link List}s. </p>
	 *
	 * <h3> Container properties </h3>
	 * <dl>
	 *	<dt> Sequence </dt>
	 *	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements 
	 *		 are accessed by their position in this sequence. </dd>
	 *
	 *	<dt> Dynamic array </dt>
	 *	<dd> Generally implemented as a dynamic array, it allows direct access to any element in the 
	 *		 sequence and provides relatively fast addition/removal of elements at the beginning or the end 
	 *		 of the sequence. </dd>
	 * </dl>
	 * 
	 * <ul>
	 *  <li> Reference: http://www.cplusplus.com/reference/deque/deque/ </li>
	 * </ul>
	 *
	 * @param <T> Type of the elements.
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class Deque<T>
		extends base.container.Container<T>
		implements base.container.IArray<T>, 
				   base.container.IDeque<T>
	{
		/**
		 * Type definition of {@link Deque}'s {@link DequeIterator iterator}.
		 */
		public static get iterator() { return DequeIterator; }

		/**
		 * <p> Row size of the {@link matrix_ matrix} which contains elements. </p>
		 *
		 * <p> Note that the {@link ROW} affects on time complexity of accessing and inserting element. 
		 * Accessing element is {@link ROW} times slower than ordinary {@link Vector} and inserting element 
		 * in middle position is {@link ROW} times faster than ordinary {@link Vector}. </p>
		 *
		 * <p> When the {@link ROW} returns 8, time complexity of accessing element is O(8) and inserting 
		 * element in middle position is O(N/8). ({@link Vector}'s time complexity of accessement is O(1)
		 * and inserting element is O(N)). </p>
		 */
		private static get ROW(): number { return 8; }
		
		/**
		 * <p> Minimum {@link capacity}. </p>
		 *
		 * <p> Although a {@link Deque} has few elements, even no element is belonged to, the {@link Deque} 
		 * keeps the minimum {@link capacity} at least. </p>
		 */
		private static get MIN_CAPACITY(): number { return 100; }
		
		/**
		 * <p> A matrix containing elements. </p>
		 *
		 * <p> This {@link matrix_} is the biggest difference one between {@link Vector} and {@link Deque}.
		 * Its number of rows follows {@link ROW} and number of columns follows {@link get_col_size} which 
		 * returns divide of {@link capacity} and {@link ROW}. </p>
		 * 
		 * By separating segment of elements (segment: row, elements in a segment: col), {@link Deque} takes
		 * advantage of time complexity on inserting element in middle position. {@link Deque} is {@link ROW}
		 * times faster than {@link Vector} when inserting elements in middle position. </p>
		 *
		 * <p> However, separating segment of elements from matrix, {@link Deque} also takes disadvantage of
		 * time complexity on accessing element. {@link Deque} is {@link ROW} times slower than {@link Vector}
		 * when accessing element. </p>
		 */
		private matrix_: Array<Array<T>>;

		/**
		 * Number of elements in the {@link Deque}.
		 */
		private size_: number;
		
		/**
		 * <p> Size of allocated storage capacity. </p>
		 * 
		 * <p> The {@link capacity_ capacity} is size of the storage space currently allocated for the 
		 * {@link Deque container}, expressed in terms of elements. </p>
		 *
		 * <p> This {@link capacity_ capacity} is not necessarily equal to the {@link Deque container} 
		 * {@link size}. It can be equal or greater, with the extra space allowing to accommodate for growth 
		 * without the need to reallocate on each insertion. </p>
		 *
		 * <p> Notice that this {@link capacity_ capacity} does not suppose a limit on the {@link size} of 
		 * the {@link Deque container}. When this {@link capacity} is exhausted and more is needed, it is
		 * automatically expanded by the {@link Deque container} (reallocating it storage space). 
		 * The theoretical limit on the {@link size} of a {@link Deque container} is given by member
		 * {@link max_size}. </p>
		 *
		 * <p> The {@link capacity_ capacity} of a {@link Deque container} can be explicitly altered by 
		 * calling member {@link Deque.reserve}. </p>
		 */
		private capacity_: number;

		/**
		 * Get column size; {@link capacity_ capacity} / {@link ROW row}.
		 */
		private get_col_size(): number
		{
			return Math.floor(this.capacity_ / Deque.ROW);
		}

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN, RESERVE & CLEAR
				- RESERVE
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
		 * <p> Initializer list Constructor. </p>
		 *
		 * <p> Constructs a container with a copy of each of the elements in <i>array</i>, in the same order. </p>
		 *
		 * @param array An array containing elements to be copied and contained.
		 */
		public constructor(items: Array<T>);

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
				this.clear();
			}
			if (args.length == 1 && args[0] instanceof Array)
			{
				let array: Array<T> = args[0];

				this.clear();
				this.push(...array);
			}
			else if (args.length == 1 && args[0] instanceof base.container.Container)
			{
				let container: base.container.Container<T> = args[0];

				this.assign(container.begin(), container.end());
			}
			else if (args.length == 2 && 
				args[0] instanceof base.container.Iterator && args[1] instanceof base.container.Iterator)
			{
				let begin: base.container.Iterator<T> = args[0];
				let end: base.container.Iterator<T> = args[1];

				this.assign(begin, end);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN, RESERVE & CLEAR
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public assign<U extends T, InputIterator extends base.container.Iterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		/**
		 * @inheritdoc
		 */
		public assign(n: number, val: T): void;

		public assign(first: any, second: any): void
		{
			// CLEAR PREVIOUS CONTENTS
			this.clear();

			if (first instanceof base.container.Iterator && second instanceof base.container.Iterator)
			{
				let begin: base.container.Iterator<T> = first;
				let end: base.container.Iterator<T> = second;

				let size: number = 0;
				for (let it = begin; !it.equal_to(end); it = it.next())
					size++;

				// RESERVE
				this.reserve(size);
				this.size_ = size;

				// ASSIGN CONTENTS
				let array: Array<T> = this.matrix_[0];

				for (let it = begin; !it.equal_to(end); it = it.next())
				{
					if (array.length >= this.get_col_size())
					{
						array = new Array<T>();
						this.matrix_.push(array);
					}
					array.push(it.value);
				}
			}
			else
			{
				let size: number = first;
				let val: T = second;

				// RESERVE
				this.reserve(size);
				this.size_ = size;

				// ASSIGN CONTENTS
				let array: Array<T> = this.matrix_[0];

				for (let i = 0; i < size; i++)
				{
					if (array.length >= this.get_col_size())
					{
						array = new Array<T>();
						this.matrix_.push(array);
					}
					array.push(val);
				}
			}
		}

		/**
		 * @inheritdoc
		 */
		public reserve(capacity: number): void
		{
			let prevMatrix = this.matrix_;
			let prevSize = this.size_;
			
			this.clear();

			// RESERVE
			this.size_ = prevSize;
			
			let array: Array<T> = this.matrix_[0];

			for (let i = 0; i < prevMatrix.length; i++)
				for (let j = 0; j < prevMatrix[i].length; j++)
				{
					if (array.length >= this.get_col_size())
					{
						array = new Array<T>();
						this.matrix_.push(array);
					}
					array.push(prevMatrix[i][j]);
				}
		}

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			this.matrix_ = new Array<Array<T>>();
			this.matrix_.push(new Array<T>());

			this.size_ = 0;
			this.capacity_ = Deque.MIN_CAPACITY;
		}
		
		/* =========================================================
			ACCESSORS
				- GETTERS & SETTERS
				- ITERATORS
		========================================================= */
		/**
		 * @inheritdoc
		 */
		public begin(): DequeIterator<T>
		{
			if (this.empty() == true)
				return this.end();
			else
				return new DequeIterator<T>(this, 0);
		}

		/**
		 * @inheritdoc
		 */
		public end(): DequeIterator<T>
		{
			return new DequeIterator<T>(this, -1);
		}

		/**
		 * @inheritdoc
		 */
		public rbegin(): DequeReverseIterator<T>
		{
			if (this.empty() == true)
				return this.rend();
			else
				return new DequeReverseIterator<T>(this.end().prev());
		}

		/**
		 * @inheritdoc
		 */
		public rend(): DequeReverseIterator<T>
		{
			return new DequeReverseIterator<T>(this.end());
		}
		
		/**
		 * @inheritdoc
		 */
		public size(): number
		{
			return this.size_;
		}

		/**
		 * @inheritdoc
		 */
		public capacity(): number
		{
			return this.capacity_;
		}

		/**
		 * @inheritdoc
		 */
		public at(index: number): T
		{
			if (index > this.size())
				throw new OutOfRange("Target index is greater than Deque's size.");

			let indexPair: Pair<number, number> = this.fetch_index(index);
			return this.matrix_[indexPair.first][indexPair.second];
		}

		/**
		 * @inheritdoc
		 */
		public set(index: number, val: T): void
		{
			if (index > this.size())
				throw new OutOfRange("Target index is greater than Deque's size.");

			let indexPair: Pair<number, number> = this.fetch_index(index);
			this.matrix_[indexPair.first][indexPair.second] = val;
		}

		/**
		 * @inheritdoc
		 */
		public front(): T
		{
			return this.matrix_[0][0];
		}

		/**
		 * @inheritdoc
		 */
		public back(): T
		{
			let lastArray: Array<T> = this.matrix_[this.matrix_.length - 1];

			return lastArray[lastArray.length - 1];
		}

		/**
		 * <p> Fetch row and column's index. </p>
		 * 
		 * <p> Fetches index of row and column of {@link matrix_} from sequence number. </p>
		 * 
		 * @param index Sequence number
		 */
		private fetch_index(index: number): Pair<number, number>
		{
			let row: number;

			for (row = 0; row < this.matrix_.length; row++)
			{
				let array: Array<T> = this.matrix_[row];
				if (index < array.length)
					break;

				index -= array.length;
			}

			if (row == this.matrix_.length)
				row--;
			
			return new Pair<number, number>(row, index);
		}

		/* =========================================================
			ELEMENTS I/O
				- PUSH & POP
				- INSERT
				- ERASE
		============================================================
			PUSH & POP
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public push(...items: T[]): number
		{
			if (this.size_ + items.length > this.capacity_)
				this.reserve(this.size_ + items.length);

			let array: Array<T> = this.matrix_[this.matrix_.length - 1];

			for (let i: number = 0; i < items.length; i++)
			{
				if (array.length >= this.get_col_size())
				{
					array = new Array<T>();
					this.matrix_.push(array);
				}
				array.push(items[i]);
			}

			this.size_ += items.length;
			return this.size_;
		}

		/**
		 * @inheritdoc
		 */
		public push_front(val: T): void
		{
			// INSERT TO THE FRONT
			this.matrix_[0].unshift(val);
			this.size_++;

			if (this.size_ > this.capacity_)
				this.reserve(this.size_ * 2);
		}

		/**
		 * @inheritdoc
		 */
		public push_back(val: T): void
		{
			let lastArray: Array<T> = this.matrix_[this.matrix_.length - 1];
			if (lastArray.length >= this.get_col_size() && this.matrix_.length < Deque.ROW)
			{
				lastArray = new Array<T>();
				this.matrix_.push(lastArray);
			}

			lastArray.push(val);
			this.size_++;

			if (this.size_ > this.capacity_)
				this.reserve(this.size_ * 2);
		}

		/**
		 * @inheritdoc
		 */
		public pop_front(): void
		{
			if (this.empty() == true)
				return; // SOMEWHERE PLACE TO THROW EXCEPTION
			
			this.matrix_[0].shift();
			this.size_--;

			if (this.matrix_[0].length == 0)
				this.matrix_.shift();
		}

		/**
		 * @inheritdoc
		 */
		public pop_back(): void
		{
			if (this.empty() == true)
				return; // SOMEWHERE PLACE TO THROW EXCEPTION

			let lastArray: Array<T> = this.matrix_[this.matrix_.length - 1];
			lastArray.splice(lastArray.length - 1, 1);
			this.size_--;
			
			if (lastArray.length == 0)
				this.matrix_.splice(this.matrix_.length - 1, 1);
		}

		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public insert(position: DequeIterator<T>, val: T): DequeIterator<T>;

		/**
		 * @inheritdoc
		 */
		public insert(position: DequeIterator<T>, n: number, val: T): DequeIterator<T>;

		/**
		 * @inheritdoc
		 */
		public insert<U extends T, InputIterator extends base.container.Iterator<U>>
			(position: DequeIterator<T>, begin: InputIterator, end: InputIterator): DequeIterator<T>;
		
		public insert<U extends T, InputIterator extends base.container.Iterator<U>>
			(position: DequeIterator<T>, ...args: any[]): DequeIterator<T>
		{
			let items: Array<T> = [];

			if (args.length == 1)
			{
				let val: T = args[0];

				items.push(val);
			}
			else if (args.length == 2 && typeof args[0] == "number")
			{
				let n: number = args[0];
				let val: T = args[1];

				for (let i = 0; i < n; i++)
					items.push(val);
			}
			else if (args.length == 2 && args[0] instanceof base.container.Iterator && args[1] instanceof base.container.Iterator)
			{
				let begin: InputIterator = args[0];
				let end: InputIterator = args[1];

				for (let it = begin; !it.equal_to(end); it = it.next() as InputIterator)
					items.push(it.value);
			}

			// -----------------------------------------------------
			// INSERT ITEMS
			// -----------------------------------------------------
			// INSERTS CAREFULLY
			if (position.equal_to(this.end()) == true)
			{
				// WHEN INSERTS TO THE BACK SIDE
				this.push(...items);
				return;
			}

			this.size_ += items.length;

			if (this.size_ <= this.capacity_)
			{
				// ------------------------------------------------------
				// WHEN FITTING INTO RESERVED CAPACITY IS POSSIBLE
				// ------------------------------------------------------
				// INSERTS CAREFULLY CONSIDERING THE COL_SIZE
				let indexPair = this.fetch_index(position.index);
				let index = indexPair.first;

				let splicedValues = this.matrix_[index].splice(indexPair.second);
				if (splicedValues.length != 0)
					items = items.concat(...splicedValues);

				if (this.matrix_[index].length < Deque.ROW)
				{
					this.matrix_[index] =
						this.matrix_[index].concat
							(
							...items.splice(0, Deque.ROW - this.matrix_[index].length)
							);
				}

				let splicedArray = this.matrix_.splice(index + 1);

				// INSERTS
				while (items.length != 0)
					this.matrix_.push(items.splice(0, Math.min(Deque.ROW, items.length)));

				// CONCAT WITH BACKS
				this.matrix_ = this.matrix_.concat(...splicedArray);
			}
			else
			{
				// -----------------------------------------------------
				// WHEN CANNOT BE FIT INTO THE RESERVED CAPACITY
				// -----------------------------------------------------
				// JUST INSERT CARELESSLY
				// AND KEEP BLANACE BY THE RESERVE() METHOD
				if (position.equal_to(this.end()) == true)
				{
					this.matrix_.push(items); // ALL TO THE LAST
				}
				else
				{
					let indexPair = this.fetch_index(position.index);
					let index = indexPair.first;

					let splicedValues = this.matrix_[index].splice(indexPair.second);
					if (splicedValues.length != 0)
						items = items.concat(...splicedValues);

					// ALL TO THE MIDDLE
					this.matrix_[index] = this.matrix_[index].concat(...items);
				}

				// AND KEEP BALANCE BY RESERVE()
				this.reserve(this.size_);
			}

			return position;
		}

		/* ---------------------------------------------------------
			ERASE
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public erase(position: DequeIterator<T>): DequeIterator<T>
		
		/**
		 * @inheritdoc
		 */
		public erase(begin: DequeIterator<T>, end: DequeIterator<T>): DequeIterator<T>;

		public erase(begin: DequeIterator<T>, end: DequeIterator<T> = null): DequeIterator<T>
		{
			if (end == null)
				end = begin.next();

			let index = begin.index;
			let size = end.index - index;

			this.size_ -= size;

			while (size != 0)
			{
				let indexPair: Pair<number, number> = this.fetch_index(index);
				let array: Array<T> = this.matrix_[indexPair.first];

				let myDeleteSize: number = Math.min(size, array.length - indexPair.second);
				array.splice(indexPair.second, myDeleteSize);

				if (array.length == 0)
					this.matrix_.splice(indexPair.first, 1);

				size -= myDeleteSize;
			}
			
			return begin;
		}

		/* ===============================================================
			UTILITIES
		=============================================================== */
		/**
		 * @inheritdoc
		 */
		public swap(obj: base.container.IContainer<T>): void
		{
			if (obj instanceof Deque)
				this.swap_deque(obj);
			else
				super.swap(obj);
		}

		/**
		 * @hidden
		 */
		private swap_deque(obj: Deque<T>): void
		{
			[this.matrix_,  obj.matrix_   ] = [obj.matrix_,   this.matrix_  ];
			[this.size_,    obj.size_     ] = [obj.size_,     this.size_    ];
			[this.capacity_, obj.capacity_] = [obj.capacity_, this.capacity_];
		}
	}
}