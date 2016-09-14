/// <reference path="API.ts" />

/// <reference path="base/Container.ts" />
/// <reference path="Iterator.ts" />

namespace std.Deque
{
	export type iterator<T> = std.DequeIterator<T>;
	export type reverse_iterator<T> = std.DequeReverseIterator<T>;
}

namespace std
{
	/**
	 * <p> Double ended queue. </p>
	 * 
	 * <p> {@link Deque} (usually pronounced like "<i>deck</i>") is an irregular acronym of 
	 * <b>d</b>ouble-<b>e</b>nded <b>q</b>ueue. Double-ended queues are sequence containers with dynamic sizes that can be 
	 * expanded or contracted on both ends (either its front or its back). </p>
	 * 
	 * <p> Specific libraries may implement deques in different ways, generally as some form of dynamic array. But in any 
	 * case, they allow for the individual elements to be accessed directly through random access iterators, with storage 
	 * handled automatically by expanding and contracting the container as needed. </p>
	 * 
	 * <p> Therefore, they provide a functionality similar to vectors, but with efficient insertion and deletion of 
	 * elements also at the beginning of the sequence, and not only at its end. But, unlike {@link Vector Vectors}, 
	 * {@link Deque Deques} are not guaranteed to store all its elements in contiguous storage locations: accessing 
	 * elements in a <u>deque</u> by offsetting a pointer to another element causes undefined behavior. </p>
	 * 
	 * <p> Both {@link Vector}s and {@link Deque}s provide a very similar interface and can be used for similar purposes, 
	 * but internally both work in quite different ways: While {@link Vector}s use a single array that needs to be 
	 * occasionally reallocated for growth, the elements of a {@link Deque} can be scattered in different chunks of 
	 * storage, with the container keeping the necessary information internally to provide direct access to any of its 
	 * elements in constant time and with a uniform sequential interface (through iterators). Therefore, 
	 * {@link Deque Deques} are a little more complex internally than {@link Vector}s, but this allows them to grow more 
	 * efficiently under certain circumstances, especially with very long sequences, where reallocations become more 
	 * expensive. </p>
	 * 
	 * <p> For operations that involve frequent insertion or removals of elements at positions other than the beginning or 
	 * the end, {@link Deque Deques} perform worse and have less consistent iterators and references than 
	 * {@link List Lists}. </p>
	 *
	 * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> </a>
	 * </p>
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
	 * @param <T> Type of the elements.
	 *
	 * @reference http://www.cplusplus.com/reference/deque/deque/
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class Deque<T>
		extends base.Container<T>
		implements base.IArrayContainer<T>, base.IDequeContainer<T>
	{
		///
		// Row size of the {@link matrix_ matrix} which contains elements.
		// 
		// Note that the {@link ROW} affects on time complexity of accessing and inserting element. 
		// Accessing element is {@link ROW} times slower than ordinary {@link Vector} and inserting element 
		// in middle position is {@link ROW} times faster than ordinary {@link Vector}.
		// 
		// When the {@link ROW} returns 8, time complexity of accessing element is O(8) and inserting 
		// element in middle position is O(N/8). ({@link Vector}'s time complexity of accessement is O(1)
		// and inserting element is O(N)).
		/**
		 * @hidden
		 */
		private static get ROW(): number { return 8; }

		///
		// Minimum {@link capacity}.
		// 
		// Although a {@link Deque} has few elements, even no element is belonged to, the {@link Deque} 
		// keeps the minimum {@link capacity} at least.
		/**
		 * @hidden
		 */
		private static get MIN_CAPACITY(): number { return 100; }

		///
		// A matrix containing elements.
		// 
		// This {@link matrix_} is the biggest difference one between {@link Vector} and {@link Deque}.
		// Its number of rows follows {@link ROW} and number of columns follows {@link get_col_size} which 
		// returns divide of {@link capacity} and {@link ROW}.
		//  
		// By separating segment of elements (segment: row, elements in a segment: col), {@link Deque} takes
		// advantage of time complexity on inserting element in middle position. {@link Deque} is {@link ROW}
		// times faster than {@link Vector} when inserting elements in middle position.
		// 
		// However, separating segment of elements from matrix, {@link Deque} also takes disadvantage of
		// time complexity on accessing element. {@link Deque} is {@link ROW} times slower than {@link Vector}
		// when accessing element.
		/**
		 * @hidden
		 */
		private matrix_: Array<Array<T>>;

		// Number of elements in the Deque.
		/**
		 * @hidden
		 */
		private size_: number;

		/**
		 * @hidden
		 */
		private capacity_: number;

		// Get column size; {@link capacity_ capacity} / {@link ROW row}.
		/**
		 * @hidden
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
		public constructor(container: Deque<T>);

		/**
		 * <p> Range Constructor. </p>
		 *
		 * <p> Constructs a container with as many elements as the range (<i>begin</i>, <i>end<i>), with each 
		 * element emplace-constructed from its corresponding element in that range, in the same order. </p>
		 *
		 * @param begin Input interator of the initial position in a sequence.
		 * @param end Input interator of the final position in a sequence.
		 */
		public constructor(begin: Iterator<T>, end: Iterator<T>);

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
			else if (args.length == 1 && args[0] instanceof Deque)
			{
				let container: Deque<T> = args[0];

				this.assign(container.begin(), container.end());
			}
			else if (args.length == 2 &&
				args[0] instanceof Iterator && args[1] instanceof Iterator)
			{
				let begin: Iterator<T> = args[0];
				let end: Iterator<T> = args[1];

				this.assign(begin, end);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN, RESERVE & CLEAR
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

		public assign(first: any, second: any): void
		{
			// CLEAR PREVIOUS CONTENTS
			this.clear();

			if (first instanceof Iterator && second instanceof Iterator)
			{
				let begin: Iterator<T> = first;
				let end: Iterator<T> = second;

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
			// MEMORIZE
			let prevMatrix = this.matrix_;
			let prevSize = this.size_;

			// REFRESH
			this.matrix_ = new Array<Array<T>>();
			this.matrix_.push(new Array<T>());

			/////
			// RE-FILL
			/////
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
			// CLEAR CONTENTS
			this.matrix_ = new Array<Array<T>>();
			this.matrix_.push(new Array<T>());

			// RE-INDEX
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
			return new DequeReverseIterator<T>(this.end());
		}

		/**
		 * @inheritdoc
		 */
		public rend(): DequeReverseIterator<T>
		{
			return new DequeReverseIterator<T>(this.begin());
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
		public empty(): boolean
		{
			return this.size_ == 0;
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
		// Fetch row and column's index.
		/**
		 * @hidden
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

			return make_pair(row, index);
		}

		/* =========================================================
			ELEMENTS I/O
				- PUSH & POP
				- INSERT
				- ERASE
				- PRE & POST-PROCESS
				- SWAP
		============================================================
			PUSH & POP
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public push(...items: T[]): number
		{
			// RE-SIZE
			if (this.size_ + items.length > this.capacity_)
				this.reserve(this.size_ + items.length);

			// INSERTS
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

			// INDEXING
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

			// EREASE FIRST ELEMENT
			this.matrix_[0].shift();
			this.size_--;

			if (this.matrix_[0].length == 0 && this.matrix_.length > 1)
				this.matrix_.shift();
		}

		/**
		 * @inheritdoc
		 */
		public pop_back(): void
		{
			if (this.empty() == true)
				return; // SOMEWHERE PLACE TO THROW EXCEPTION

			// ERASE LAST ELEMENT
			let lastArray: Array<T> = this.matrix_[this.matrix_.length - 1];
			lastArray.splice(lastArray.length - 1, 1);
			this.size_--;

			if (lastArray.length == 0 && this.matrix_.length > 1)
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
		public insert<U extends T, InputIterator extends Iterator<U>>
			(position: DequeIterator<T>, begin: InputIterator, end: InputIterator): DequeIterator<T>;

		/**
		 * @inheritdoc
		 */
		public insert(position: DequeReverseIterator<T>, val: T): DequeReverseIterator<T>;

		/**
		 * @inheritdoc
		 */
		public insert(position: DequeReverseIterator<T>, n: number, val: T): DequeReverseIterator<T>;

		/**
		 * @inheritdoc
		 */
		public insert<U extends T, InputIterator extends Iterator<U>>
			(position: DequeReverseIterator<T>, begin: InputIterator, end: InputIterator): DequeReverseIterator<T>;

		public insert<U extends T, InputIterator extends Iterator<U>>
			(...args: any[]): DequeIterator<T> | DequeReverseIterator<T>
		{
			// REVERSE_ITERATOR TO ITERATOR
			let ret: DequeIterator<T>;
			let is_reverse_iterator: boolean = false;

			if (args[0] instanceof DequeReverseIterator)
			{
				is_reverse_iterator = true;
				args[0] = (args[0] as DequeReverseIterator<T>).base().prev();
			}

			// BRANCHES
			if (args.length == 2)
				ret = this.insert_by_val(args[0], args[1]);
			else if (args.length == 3 && typeof args[1] == "number")
				ret = this._Insert_by_repeating_val(args[0], args[1], args[2]);
			else
				ret = this._Insert_by_range(args[0], args[1], args[2]);

			// RETURNS
			if (is_reverse_iterator == true)
				return new DequeReverseIterator<T>(ret.next());
			else
				return ret;
		}

		/**
		 * @hidden
		 */
		private insert_by_val(position: DequeIterator<T>, val: T): DequeIterator<T>
		{
			return this._Insert_by_repeating_val(position, 1, val);
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_repeating_val(position: DequeIterator<T>, n: number, val: T): DequeIterator<T>
		{
			// CONSTRUCT ITEMS
			let items: T[] = [];
			items.length = n;

			for (let i = 0; i < n; i++)
				items[i] = val;

			// INSERT ELEMENTS
			if (position.equal_to(this.end()))
			{
				this.push(...items);
				return this.begin();
			}
			else
				return this.insert_by_items(position, items);
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<U extends T, InputIterator extends Iterator<U>>
			(position: DequeIterator<T>, begin: InputIterator, end: InputIterator): DequeIterator<T>
		{
			// CONSTRUCT ITEMS
			let items: T[] = [];

			for (let it = begin; !it.equal_to(end); it = it.next() as InputIterator)
				items.push(it.value);

			// INSERT ELEMENTS
			if (position.equal_to(this.end()))
			{
				this.push(...items);
				return this.begin();
			}
			else
				return this.insert_by_items(position, items);
		}

		/**
		 * @hidden
		 */
		private insert_by_items(position: DequeIterator<T>, items: Array<T>): DequeIterator<T>
		{
			let item_size: number = items.length;
			this.size_ += item_size;

			if (this.size_ <= this.capacity_)
			{
				// ------------------------------------------------------
				// WHEN FITTING INTO RESERVED CAPACITY IS POSSIBLE
				// ------------------------------------------------------
				// INSERTS CAREFULLY CONSIDERING THE COL_SIZE
				let index_pair = this.fetch_index(position.index);
				let index = index_pair.first;

				let spliced_values = this.matrix_[index].splice(index_pair.second);
				if (spliced_values.length != 0)
					items = items.concat(...spliced_values);

				if (this.matrix_[index].length < Deque.ROW)
				{
					this.matrix_[index] = this.matrix_[index].concat
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
		public erase(position: DequeIterator<T>): DequeIterator<T>;
		
		/**
		 * @inheritdoc
		 */
		public erase(first: DequeIterator<T>, last: DequeIterator<T>): DequeIterator<T>;

		/**
		 * @inheritdoc
		 */
		public erase(position: DequeReverseIterator<T>): DequeReverseIterator<T>;

		/**
		 * @inheritdoc
		 */
		public erase(first: DequeReverseIterator<T>, last: DequeReverseIterator<T>): DequeReverseIterator<T>;

		public erase(first: any, last: any = first.next()): any
		{
			let ret: DequeIterator<T>;
			let is_reverse_iterator: boolean = false;

			// REVERSE_ITERATOR TO ITERATOR
			if (first instanceof DequeReverseIterator)
			{
				is_reverse_iterator = true;

				let first_it = (last as DequeReverseIterator<T>).base();
				let last_it = (first as DequeReverseIterator<T>).base();

				first = first_it;
				last = last_it;
			}

			// ERASE ELEMENTS
			ret = this._Erase_by_range(first, last);

			// RETURN BRANCHES
			if (is_reverse_iterator == true)
				return new DequeReverseIterator<T>(ret.next());
			else
				return ret;	
		}

		/**
		 * @hidden
		 */
		protected _Erase_by_range(first: DequeIterator<T>, last: DequeIterator<T>): DequeIterator<T>
		{
			if (first.index == -1)
				return first;

			// INDEXING
			let size: number;
			if (last.index == -1) // LAST IS END()
				size = this.size() - first.index;
			else // LAST IS NOT END()
				size = last.index - first.index;
			
			this.size_ -= size;
			 
			// ERASING
			while (size != 0)
			{
				let indexPair: Pair<number, number> = this.fetch_index(first.index);
				let array: Array<T> = this.matrix_[indexPair.first];

				let myDeleteSize: number = Math.min(size, array.length - indexPair.second);
				array.splice(indexPair.second, myDeleteSize);

				if (array.length == 0 && this.matrix_.length > 1)
					this.matrix_.splice(indexPair.first, 1);

				size -= myDeleteSize;
			}
			
			if (last.index == -1)
				return this.end();
			else
				return first;
		}

		/* ---------------------------------------------------------
			SWAP
		--------------------------------------------------------- */
		/**
		 * <p> Swap content. </p>
		 * 
		 * <p> Exchanges the content of the container by the content of <i>obj</i>, which is another 
		 * {@link Deque container} object with same type of elements. Sizes and container type may differ. </p>
		 * 
		 * <p> After the call to this member function, the elements in this container are those which were in <i>obj</i> 
		 * before the call, and the elements of <i>obj</i> are those which were in this. All iterators, references and 
		 * pointers remain valid for the swapped objects. </p>
		 *
		 * <p> Notice that a non-member function exists with the same name, {@link std.swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function. </p>
		 * 
		 * @param obj Another {@link Deque container} of the same type of elements (i.e., instantiated
		 *			  with the same template parameter, <b>T</b>) whose content is swapped with that of this 
		 *			  {@link container Deque}.
		 */
		public swap(obj: Deque<T>): void

		/**
		 * @inheritdoc
		 */
		public swap(obj: base.IContainer<T>): void;

		public swap(obj: Deque<T> | base.IContainer<T>): void
		{
			if (obj instanceof Deque)
			{
				[this.matrix_, obj.matrix_] = [obj.matrix_, this.matrix_];
				[this.size_, obj.size_] = [obj.size_, this.size_];
				[this.capacity_, obj.capacity_] = [obj.capacity_, this.capacity_];
			}
			else
				super.swap(obj);
		}
	}
}

namespace std
{
	/**
	 * <p> An iterator of {@link Deque}. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> </a>
	 * </p>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class DequeIterator<T>
		extends Iterator<T>
		implements base.IArrayIterator<T>
	{
		/**
		 * Sequence number of iterator in the source {@link Deque}.
		 */
		private index_: number;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * <p> Construct from the source {@link Deque container}. </p>
		 *
		 * <h4> Note </h4>
		 * <p> Do not create the iterator directly, by yourself. </p>
		 * <p> Use {@link Deque.begin begin()}, {@link Deque.end end()} in {@link Deque container} instead. </p> 
		 *
		 * @param source The source {@link Deque container} to reference.
		 * @param index Sequence number of the element in the source {@link Deque}.
		 */
		public constructor(source: Deque<T>, index: number)
		{
			super(source);

			this.index_ = index;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		private get deque(): Deque<T> 
		{ 
			return this.source_ as Deque<T>; 
		}

		/**
		 * @inheritdoc
		 */
		public get value(): T
		{
			return this.deque.at(this.index_);
		}

		/**
		 * Set value of the iterator is pointing to.
		 * 
		 * @param val Value to set.
		 */
		public set value(val: T)
		{
			this.deque.set(this.index_, val);
		}

		/**
		 * @inheritdoc
		 */
		public get index(): number
		{
			return this.index_;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public prev(): DequeIterator<T>
		{
			if (this.index_ == -1)
				return new DequeIterator(this.deque, this.deque.size() - 1);
			else if (this.index_ - 1 < 0)
				return this.deque.end();
			else
				return new DequeIterator<T>(this.deque, this.index_ - 1);
		}

		/**
		 * @inheritdoc
		 */
		public next(): DequeIterator<T>
		{
			if (this.index_ >= this.source_.size() - 1)
				return this.deque.end();
			else
				return new DequeIterator<T>(this.deque, this.index_ + 1);
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): DequeIterator<T>
		{
			let new_index: number;
			if (n < 0 && this.index_ == -1)
				new_index = this.deque.size() + n;
			else
				new_index = this.index_ + n;

			if (new_index < 0 || new_index >= this.deque.size())
				return this.deque.end();
			else
				return new DequeIterator<T>(this.deque, new_index);
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		/**
		 * <p> Whether an iterator is equal with the iterator. </p>
		 * 
		 * <p> Compare two iterators and returns whether they are equal or not. </p>
		 * 
		 * <h4> Note </h4> 
		 * <p> Iterator's equal_to() only compare souce container and index number. </p>
		 *
		 * <p> Although elements in a pair, key and value are equal_to, if the source map or
		 * index number is different, then the {@link equal_to equal_to()} will return false. If you want to
		 * compare the elements of a pair, compare them directly by yourself. </p>
		 *
		 * @param obj An iterator to compare
		 * @return Indicates whether equal or not.
		 */
		public equal_to<U extends T>(obj: DequeIterator<U>): boolean
		{
			return super.equal_to(obj) && this.index_ == obj.index_;
		}

		/**
		 * @inheritdoc
		 */
		public swap(obj: DequeIterator<T>): void
		{
			[this.value, obj.value] = [obj.value, this.value];
		}
	}
}

namespace std
{
	/**
	 * <p> A reverse-iterator of Deque. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> </a>
	 * </p>
	 *
	 * @param <T> Type of the elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class DequeReverseIterator<T>
		extends ReverseIterator<T, DequeIterator<T>, DequeReverseIterator<T>>
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
		public constructor(base: DequeIterator<T>)
		{
			super(base);
		}

		/**
		 * @hidden
		 */
		protected create_neighbor(base: DequeIterator<T>): DequeReverseIterator<T>
		{
			return new DequeReverseIterator<T>(base);
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
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

		/**
		 * Get index.
		 */
		public get index(): number
		{
			return this.base_.index;
		}
	}
}