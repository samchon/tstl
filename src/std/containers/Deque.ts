/// <reference path="../API.ts" />

/// <reference path="../base/containers/ArrayContainer.ts" />

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
		extends base.ArrayContainer<T, Deque<T>>
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
		public constructor(begin: base.Iterator<T>, end: base.Iterator<T>);

		public constructor(...args: any[])
		{
			super();

			// CONSTRUCTORS BRANCH
			if (args.length == 0)
			{
				this.clear();
			}
			if (args.length == 1 && args[0] instanceof Array)
			{
				let array: Array<T> = args[0];
				let first = new base._NativeArrayIterator(array, 0);
				let last = new base._NativeArrayIterator(array, array.length);

				this.assign(first, last);
			}
			else if (args.length == 1 && args[0] instanceof Deque)
			{
				let container: Deque<T> = args[0];

				this.assign(container.begin(), container.end());
			}
			else if (args.length == 2 && args[0] instanceof base.Iterator && args[1] instanceof base.Iterator)
			{
				let first: base.Iterator<T> = args[0];
				let last: base.Iterator<T> = args[1];

				this.assign(first, last);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN, RESERVE & CLEAR
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

		public [Symbol.iterator](): IterableIterator<T>
		{
			return new base._DequeForOfAdaptor<T>(this.matrix_);
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
			let first: base._NativeArrayIterator<T> = new base._NativeArrayIterator<T>(items, 0);
			let last: base._NativeArrayIterator<T> = new base._NativeArrayIterator<T>(items, items.length);

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
			lastArray.pop();

			if (lastArray.length == 0 && this.matrix_.length > 1)
				this.matrix_.pop();

			// SHRINK SIZE
			this.size_--;
		}

		/* ---------------------------------------------------------
			INSERT
		--------------------------------------------------------- */
		/**
		 * @hidden
		 */
		protected _Insert_by_range<U extends T, InputIterator extends base.Iterator<U>>
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
				pos = new base.ArrayIterator<T, Deque<T>>(this, this.size_);
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
		private _Insert_to_middle<U extends T, InputIterator extends base.Iterator<U>>
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
			let $first: base._NativeArrayIterator<T> = new base._NativeArrayIterator<T>(back_items, 0);
			let $last: base._NativeArrayIterator<T> = new base._NativeArrayIterator<T>(back_items, back_items.length);

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
		private _Insert_to_end<U extends T, InputIterator extends base.Iterator<U>>
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