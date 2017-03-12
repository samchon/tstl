/// <reference path="API.ts" />

/// <reference path="base/Container.ts" />
/// <reference path="Iterator.ts" />

namespace std.Deque
{
	export type iterator<T> = DequeIterator<T>;
	export type reverse_iterator<T> = DequeReverseIterator<T>;
}

namespace std
{
	/**
	 * Double ended queue.
	 * 
	 * {@link Deque} (usually pronounced like "<i>deck</i>") is an irregular acronym of 
	 * <b>d</b>ouble-<b>e</b>nded <b>q</b>ueue. Double-ended queues are sequence containers with dynamic sizes that can be 
	 * expanded or contracted on both ends (either its front or its back).
	 * 
	 * Specific libraries may implement deques in different ways, generally as some form of dynamic array. But in any 
	 * case, they allow for the individual elements to be accessed directly through random access iterators, with storage 
	 * handled automatically by expanding and contracting the container as needed.
	 * 
	 * Therefore, they provide a functionality similar to vectors, but with efficient insertion and deletion of 
	 * elements also at the beginning of the sequence, and not only at its end. But, unlike {@link Vector Vectors}, 
	 * {@link Deque Deques} are not guaranteed to store all its elements in contiguous storage locations: accessing 
	 * elements in a <u>deque</u> by offsetting a pointer to another element causes undefined behavior.
	 * 
	 * Both {@link Vector}s and {@link Deque}s provide a very similar interface and can be used for similar purposes, 
	 * but internally both work in quite different ways: While {@link Vector}s use a single array that needs to be 
	 * occasionally reallocated for growth, the elements of a {@link Deque} can be scattered in different chunks of 
	 * storage, with the container keeping the necessary information internally to provide direct access to any of its 
	 * elements in constant time and with a uniform sequential interface (through iterators). Therefore, 
	 * {@link Deque Deques} are a little more complex internally than {@link Vector}s, but this allows them to grow more 
	 * efficiently under certain circumstances, especially with very long sequences, where reallocations become more 
	 * expensive.
	 * 
	 * For operations that involve frequent insertion or removals of elements at positions other than the beginning or 
	 * the end, {@link Deque Deques} perform worse and have less consistent iterators and references than 
	 * {@link List Lists}.
	 *
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> </a>
	 *
	 * 
	 * ### Container properties
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
		// A matrix containing elements.
		// 
		// This {@link matrix_} is the biggest difference one between {@link Vector} and {@link Deque}.
		// Its number of rows follows {@link ROW_SIZE} and number of columns follows {@link get_col_size} which 
		// returns divide of {@link capacity} and {@link ROW_SIZE}.
		//  
		// By separating segment of elements (segment: row, elements in a segment: col), {@link Deque} takes
		// advantage of time complexity on inserting element in middle position. {@link Deque} is {@link ROW_SIZE}
		// times faster than {@link Vector} when inserting elements in middle position.
		// 
		// However, separating segment of elements from matrix, {@link Deque} also takes disadvantage of
		// time complexity on accessing element. {@link Deque} is {@link ROW_SIZE} times slower than {@link Vector}
		// when accessing element.
		/**
		 * @hidden
		 */
		private matrix_: Array<Array<T>>;
		
		/**
		 * @hidden
		 */
		private size_: number; // Number of elements in the Deque.

		/**
		 * @hidden
		 */
		private capacity_: number;

		/**
		 * @hidden
		 */
		private begin_: DequeIterator<T>;

		/**
		 * @hidden
		 */
		private end_: DequeIterator<T>;

		/**
		 * @hidden
		 */
		private rend_: DequeReverseIterator<T>;

		/* =========================================================
			CONSTRUCTORS & SEMI-CONSTRUCTORS
				- CONSTRUCTORS
				- ASSIGN, RESERVE & CLEAR
				- RESERVE
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
		 * Initializer list Constructor.
		 *
		 * Constructs a container with a copy of each of the elements in <i>array</i>, in the same order.
		 *
		 * @param array An array containing elements to be copied and contained.
		 */
		public constructor(items: Array<T>);

		/**
		 * Fill Constructor.
		 *
		 * Constructs a container with <i>n</i> elements. Each element is a copy of <i>val</i> (if provided).
		 *
		 * @param n Initial container size (i.e., the number of elements in the container at construction).
		 * @param val Value to fill the container with. Each of the <i>n</i> elements in the container is 
		 *			  initialized to a copy of this value.
		 */
		public constructor(size: number, val: T);

		/**
		 * Copy Constructor.
		 *
		 * Constructs a container with a copy of each of the elements in <i>container</i>, in the same order.
		 *
		 * @param container Another container object of the same type (with the same class template 
		 *					arguments <i>T</i>), whose contents are either copied or acquired.
		 */
		public constructor(container: Deque<T>);

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

			// RESERVED ITERATORS
			this.begin_ = new DequeIterator<T>(this, 0);
			this.end_ = new DequeIterator<T>(this, -1);
			this.rend_ = new DequeReverseIterator<T>(this.begin_);

			// CONSTRUCTORS BRANCH
			if (args.length == 0)
			{
				this.clear();
			}
			if (args.length == 1 && args[0] instanceof Array)
			{
				let array: Array<T> = args[0];
				let first = new base._ArrayIterator(array, 0);
				let last = new base._ArrayIterator(array, array.length);

				this.assign(first, last);
			}
			else if (args.length == 1 && args[0] instanceof Deque)
			{
				let container: Deque<T> = args[0];

				this.assign(container.begin(), container.end());
			}
			else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
			{
				let first: Iterator<T> = args[0];
				let last: Iterator<T> = args[1];

				this.assign(first, last);
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

			// INSERT ITEMS
			this.insert(this.end(), first, second);
		}

		/**
		 * Request a change in capacity.
		 * 
		 * Requests that the {@link Deque container} {@link capacity} be at least enough to contain 
		 * <i>n</i> elements.
		 * 
		 * If <i>n</i> is greater than the current {@link Deque container} {@link capacity}, the
		 * function causes the {@link Deque container} to reallocate its storage increasing its
		 * {@link capacity} to <i>n</i> (or greater).
		 * 
		 * In all other cases, the function call does not cause a reallocation and the 
		 * {@link Deque container} {@link capacity} is not affected.
		 * 
		 * This function has no effect on the {@link Deque container} {@link size} and cannot alter
		 * its elements.
		 *
		 * @param n Minimum {@link capacity} for the {@link Deque container}.
		 *			Note that the resulting {@link capacity} may be equal or greater than <i>n</i>.
		 */
		public reserve(capacity: number): void
		{
			if (capacity < this.capacity_)
				return;

			// NEW MEMBERS TO BE ASSSIGNED
			let matrix: T[][] = [[]];
			let col_size: number = this._Compute_col_size(capacity);

			//--------
			// RE-FILL
			//--------
			for (let r: number = 0; r < this.matrix_.length; r++)
			{
				let row: T[] = this.matrix_[r];

				for (let c: number = 0; c < row.length; c++)
				{
					let new_row: T[] = matrix[matrix.length - 1];
					if (matrix.length < Deque.ROW_SIZE && new_row.length == col_size)
					{
						new_row = [];
						matrix.push(new_row);
					}
					new_row.push(row[c]);
				}
			}

			// ASSIGN MEMBERS
			this.matrix_ = matrix;
			this.capacity_ = capacity;
		}

		/**
		 * @inheritdoc
		 */
		public clear(): void
		{
			// CLEAR CONTENTS
			this.matrix_ = [[]];

			// RE-INDEX
			this.size_ = 0;
			this.capacity_ = Deque.MIN_CAPACITY;
		}

		/* =========================================================
			ACCESSORS
				- BASIC ELEMENTS
				- ITERATORS
				- INDEX ACCESSORS
		============================================================
			BASIC ELEMENTS
		--------------------------------------------------------- */
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
		 * Return size of allocated storage capacity.
		 * 
		 * Returns the size of the storage space currently allocated for the {@link Deque container}, 
		 * expressed in terms of elements.
		 * 
		 * This {@link capacity} is not necessarily equal to the {@link Deque container} {@link size}.
		 * It can be equal or greater, with the extra space allowing to accommodate for growth without the 
		 * need to reallocate on each insertion.
		 * 
		 * Notice that this {@link capacity} does not suppose a limit on the {@link size} of the 
		 * {@link Deque container}. When this {@link capacity} is exhausted and more is needed, it is
		 * automatically expanded by the {@link Deque container} (reallocating it storage space).
		 * The theoretical limit on the {@link size} of a {@link Deque container} is given by member
		 * {@link max_size}.
		 * 
		 * The {@link capacity} of a {@link Deque container} can be explicitly altered by calling member
		 * {@link Deque.reserve}.
		 *
		 * @return The size of the currently allocated storage capacity in the {@link Deque container},
		 *		   measured in terms of the number elements it can hold.
		 */
		public capacity(): number
		{
			return this.capacity_;
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
			let last_array: Array<T> = this.matrix_[this.matrix_.length - 1];

			return last_array[last_array.length - 1];
		}

		/* ---------------------------------------------------------
			ITERATORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public begin(): DequeIterator<T>
		{
			if (this.empty() == true)
				return this.end_;
			else
				return this.begin_;
		}

		/**
		 * @inheritdoc
		 */
		public end(): DequeIterator<T>
		{
			return this.end_;
		}

		/**
		 * @inheritdoc
		 */
		public rbegin(): DequeReverseIterator<T>
		{
			return new DequeReverseIterator<T>(this.end_);
		}

		/**
		 * @inheritdoc
		 */
		public rend(): DequeReverseIterator<T>
		{
			if (this.empty() == true)
				return new DequeReverseIterator<T>(this.end_);
			else
				return this.rend_;
		}

		/* ---------------------------------------------------------
			INDEX ACCESSORS
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public at(index: number): T
		{
			if (index < this.size() && index >= 0)
			{
				let indexPair: Pair<number, number> = this._Fetch_index(index);
				return this.matrix_[indexPair.first][indexPair.second];
			}
			else
				throw new OutOfRange("Target index is greater than Deque's size.");
		}

		/**
		 * @inheritdoc
		 */
		public set(index: number, val: T): void
		{
			if (index >= this.size() || index < 0)
				throw new OutOfRange("Target index is greater than Deque's size.");

			let indexPair: Pair<number, number> = this._Fetch_index(index);
			this.matrix_[indexPair.first][indexPair.second] = val;
		}

		/**
		 * @hidden
		 */
		private _Fetch_index(index: number): Pair<number, number>
		{
			// Fetch row and column's index.
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

		/**
		 * @hidden
		 */
		private _Compute_col_size(capacity = this.capacity_): number
		{
			// Get column size; {@link capacity_ capacity} / {@link ROW_SIZE row}.
			return Math.floor(capacity / Deque.ROW_SIZE);
		}

		/* =========================================================
			ELEMENTS I/O
				- PUSH & POP
				- INSERT
				- ERASE
				- SWAP
		============================================================
			PUSH & POP
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public push(...items: T[]): number
		{
			if (items.length == 0)
				return this.size();

			// INSERT BY RANGE
			let first: base._ArrayIterator<T> = new base._ArrayIterator<T>(items, 0);
			let last: base._ArrayIterator<T> = new base._ArrayIterator<T>(items, items.length);

			this._Insert_by_range(this.end(), first, last);

			// RETURN SIZE
			return this.size();
		}

		/**
		 * @inheritdoc
		 */
		public push_front(val: T): void
		{
			// ADD CAPACITY & ROW
			this._Try_expand_capacity(this.size_ + 1);
			this._Try_add_row_at_front();

			// INSERT VALUE
			this.matrix_[0].unshift(val);
			this.size_++;
		}

		/**
		 * @inheritdoc
		 */
		public push_back(val: T): void
		{
			// ADD CAPACITY & ROW
			this._Try_expand_capacity(this.size_ + 1);
			this._Try_add_row_at_back();

			// INSERT VALUE
			this.matrix_[this.matrix_.length - 1].push(val);
			this.size_++;
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
			if (this.matrix_[0].length == 0 && this.matrix_.length > 1)
				this.matrix_.shift();

			// SHRINK SIZE
			this.size_--;
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

			if (lastArray.length == 0 && this.matrix_.length > 1)
				this.matrix_.splice(this.matrix_.length - 1, 1);

			// SHRINK SIZE
			this.size_--;
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
				ret = this._Insert_by_val(args[0], args[1]);
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
		private _Insert_by_val(position: DequeIterator<T>, val: T): DequeIterator<T>
		{
			return this._Insert_by_repeating_val(position, 1, val);
		}

		/**
		 * @hidden
		 */
		private _Insert_by_repeating_val(position: DequeIterator<T>, n: number, val: T): DequeIterator<T>
		{
			let first: base._Repeater<T> = new base._Repeater<T>(0, val);
			let last: base._Repeater<T> = new base._Repeater<T>(n);

			return this._Insert_by_range(position, first, last);
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<U extends T, InputIterator extends Iterator<U>>
			(pos: DequeIterator<T>, first: InputIterator, last: InputIterator): DequeIterator<T>
		{
			let size: number = this.size_ + distance(first, last);
			if (size == this.size_) // FIRST == LAST
				return pos;

			if (pos.equals(this.end()) == true)
			{
				// EXPAND CAPACITY IF REQUIRED
				this._Try_expand_capacity(size);

				// INSERT TO END
				this._Insert_to_end(first, last);

				// CHANGE POS TO RETURN
				pos = new DequeIterator<T>(this, this.size_);
			}
			else
			{
				// INSERT ITEMS IN THE MIDDLE
				if (size > this.capacity_)
				{
					// A TEMPORARY DEQUE
					let deque: Deque<T> = new Deque<T>();
					deque.reserve(Math.max(size, Math.floor(this.capacity_ * Deque.MAGNIFIER)));

					// INSERT ITEM SEQUENTIALLY
					deque._Insert_to_end(this.begin(), pos);
					deque._Insert_to_end(first, last);
					deque._Insert_to_end(pos, this.end());

					// AND SWAP THIS WITH THE TEMP
					this.swap(deque);
				}
				else
					this._Insert_to_middle(pos, first, last);
			}

			this.size_ = size;
			return pos;
		}

		/**
		 * @hidden
		 */
		private _Insert_to_middle<U extends T, InputIterator extends Iterator<U>>
			(pos: DequeIterator<T>, first: InputIterator, last: InputIterator): void
		{
			let col_size: number = this._Compute_col_size();

			// POSITION OF MATRIX
			let indexes: Pair<number, number> = this._Fetch_index(pos.index());
			let row: Array<T> = this.matrix_[indexes.first];
			let col: number = indexes.second;

			// MOVE BACK SIDE TO TEMPORARY ARRAY
			let back_items: Array<T> = row.splice(col);

			// INSERT ITEMS
			for (; !first.equals(last); first = first.next() as InputIterator)
			{
				if (row.length == col_size && this.matrix_.length < Deque.ROW_SIZE)
				{
					row = new Array<T>();

					let spliced_array: T[][] = this.matrix_.splice(++indexes.first);
					this.matrix_.push(row);
					this.matrix_.push(...spliced_array);
				}
				row.push(first.value);
			}

			// INSERT ITEMS IN THE BACK SIDE
			let $first: base._ArrayIterator<T> = new base._ArrayIterator<T>(back_items, 0);
			let $last: base._ArrayIterator<T> = new base._ArrayIterator<T>(back_items, back_items.length);

			for (let i: number = 0; i < back_items.length; i++)
			{
				if (row.length == col_size && this.matrix_.length < Deque.ROW_SIZE)
				{
					row = new Array<T>();

					let spliced_array: T[][] = this.matrix_.splice(++indexes.first);
					this.matrix_.push(row);
					this.matrix_.push(...spliced_array);
				}
				row.push(back_items[i]);
			}
		}

		/**
		 * @hidden
		 */
		private _Insert_to_end<U extends T, InputIterator extends Iterator<U>>
			(first: InputIterator, last: InputIterator): void
		{
			// INSERT ITEMS IN THE BACK
			for (; !first.equals(last); first = first.next() as InputIterator)
			{
				// ADD ROW IF REQUIRED
				this._Try_add_row_at_back();

				// INSERT VALUE
				this.matrix_[this.matrix_.length - 1].push(first.value);
			}
		}

		/**
		 * @hidden
		 */
		private _Try_expand_capacity(size: number): boolean
		{
			if (size <= this.capacity_)
				return false;

			// MAX (CAPACITY * 1.5, TARGET SIZE)
			size = Math.max(size, Math.floor(this.capacity_ * Deque.MAGNIFIER));
			this.reserve(size);

			return true;
		}

		/**
		 * @hidden
		 */
		private _Try_add_row_at_front(): boolean
		{
			let col_size: number = this._Compute_col_size();

			if (this.matrix_[0].length >= col_size && this.matrix_.length < Deque.ROW_SIZE)
			{
				this.matrix_ = [[]].concat(...this.matrix_);
				return true;
			}
			else
				return false;
		}

		/**
		 * @hidden
		 */
		private _Try_add_row_at_back(): boolean
		{
			let col_size: number = this._Compute_col_size();

			if (this.matrix_[this.matrix_.length - 1].length >= col_size && this.matrix_.length < Deque.ROW_SIZE)
			{
				this.matrix_.push([]);
				return true;
			}
			else
				return false;
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
			if (first.index() == -1)
				return first;

			// INDEXING
			let size: number;
			if (last.index() == -1) // LAST IS END()
				size = this.size() - first.index();
			else // LAST IS NOT END()
				size = last.index() - first.index();
			
			this.size_ -= size;
			 
			// ERASING
			let first_row: T[] = null;
			let second_row: T[] = null;
			let i: number = 0;

			while (size != 0)
			{
				// FIND MATCHED ROW AND COLUMN
				let indexes: Pair<number, number> = this._Fetch_index(first.index());
				let row: Array<T> = this.matrix_[indexes.first];
				let col: number = indexes.second;

				// EARSE FROM THE ROW
				let my_delete_size: number = Math.min(size, row.length - col);
				row.splice(col, my_delete_size);

				// TO MERGE
				if (row.length != 0)
					if (i == 0)
						first_row = row;
					else
						second_row = row;

				// ERASE THE ENTIRE ROW IF REQUIRED
				if (row.length == 0 && this.matrix_.length > 1)
					this.matrix_.splice(indexes.first, 1);

				// TO THE NEXT STEP
				size -= my_delete_size;
				i++;
			}

			// MERGE FIRST AND SECOND ROW
			if (first_row != null && second_row != null
				&& first_row.length + second_row.length <= this._Compute_col_size())
			{
				first_row.push(...second_row);
				this.matrix_.splice(this.matrix_.indexOf(second_row), 1);
			}
			
			if (last.index() == -1)
				return this.end();
			else
				return first;
		}

		/* ---------------------------------------------------------
			SWAP
		--------------------------------------------------------- */
		/**
		 * Swap content.
		 * 
		 * Exchanges the content of the container by the content of <i>obj</i>, which is another 
		 * {@link Deque container} object with same type of elements. Sizes and container type may differ.
		 * 
		 * After the call to this member function, the elements in this container are those which were in <i>obj</i> 
		 * before the call, and the elements of <i>obj</i> are those which were in this. All iterators, references and 
		 * pointers remain valid for the swapped objects.
		 *
		 * Notice that a non-member function exists with the same name, {@link swap swap}, overloading that 
		 * algorithm with an optimization that behaves like this member function.
		 * 
		 * @param obj Another {@link Deque container} of the same type of elements (i.e., instantiated
		 *			  with the same template parameter, <b>T</b>) whose content is swapped with that of this 
		 *			  {@link Deque container}.
		 */
		public swap(obj: Deque<T>): void

		/**
		 * @inheritdoc
		 */
		public swap(obj: base.Container<T>): void;

		public swap(obj: Deque<T> | base.Container<T>): void
		{
			if (obj instanceof Deque)
			{
				// SWAP CONTENTS
				[this.matrix_, obj.matrix_] = [obj.matrix_, this.matrix_];
				[this.size_, obj.size_] = [obj.size_, this.size_];
				[this.capacity_, obj.capacity_] = [obj.capacity_, this.capacity_];
			}
			else
				super.swap(obj);
		}

		/* ---------------------------------------------------------
			STATIC MEMBERS
		--------------------------------------------------------- */
		///
		// Row size of the {@link matrix_ matrix} which contains elements.
		// 
		// Note that the {@link ROW_SIZE} affects on time complexity of accessing and inserting element. 
		// Accessing element is {@link ROW_SIZE} times slower than ordinary {@link Vector} and inserting element 
		// in middle position is {@link ROW_SIZE} times faster than ordinary {@link Vector}.
		// 
		// When the {@link ROW_SIZE} returns 8, time complexity of accessing element is O(8) and inserting 
		// element in middle position is O(N/8). ({@link Vector}'s time complexity of accessement is O(1)
		// and inserting element is O(N)).
		/**
		 * @hidden
		 */
		private static get ROW_SIZE(): number { return 8; }

		///
		// Minimum {@link capacity}.
		// 
		// Although a {@link Deque} has few elements, even no element is belonged to, the {@link Deque} 
		// keeps the minimum {@link capacity} at least.
		/**
		 * @hidden
		 */
		private static get MIN_CAPACITY(): number { return 36; }

		/**
		 * @hidden
		 */
		private static get MAGNIFIER(): number { return 1.5; }
	}
}

namespace std
{
	/**
	 * An iterator of {@link Deque}.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> </a>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class DequeIterator<T>
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
		 * Construct from the source {@link Deque container}.
		 *
		 * #### Note
		 * Do not create the iterator directly, by yourself.
		 * 
		 * Use {@link Deque.begin begin()}, {@link Deque.end end()} in {@link Deque container} instead. 
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
		 * @inheritdoc
		 */
		public source(): Deque<T>
		{
			return this.source_ as Deque<T>;
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
		public prev(): DequeIterator<T>
		{
			if (this.index_ == -1)
				return new DequeIterator(this.source(), this.source_.size() - 1);
			else if (this.index_ - 1 < 0)
				return this.source().end();
			else
				return new DequeIterator<T>(this.source(), this.index_ - 1);
		}

		/**
		 * @inheritdoc
		 */
		public next(): DequeIterator<T>
		{
			if (this.index_ >= this.source_.size() - 1)
				return this.source().end();
			else
				return new DequeIterator<T>(this.source(), this.index_ + 1);
		}

		/**
		 * @inheritdoc
		 */
		public advance(n: number): DequeIterator<T>
		{
			let new_index: number;
			if (n < 0 && this.index_ == -1)
				new_index = this.source_.size() + n;
			else
				new_index = this.index_ + n;

			if (new_index < 0 || new_index >= this.source_.size())
				return this.source().end();
			else
				return new DequeIterator<T>(this.source(), new_index);
		}

		/* ---------------------------------------------------------
			COMPARES
		--------------------------------------------------------- */
		/**
		 * @inheritdoc
		 */
		public equals(obj: DequeIterator<T>): boolean
		{
			return super.equals(obj) && this.index_ == obj.index_;
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
	 * A reverse-iterator of Deque.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> </a>
	 *
	 * @param <T> Type of the elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class DequeReverseIterator<T>
		extends ReverseIterator<T, Deque<T>, DequeIterator<T>, DequeReverseIterator<T>>
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
		protected _Create_neighbor(base: DequeIterator<T>): DequeReverseIterator<T>
		{
			return new DequeReverseIterator<T>(base);
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