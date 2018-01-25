/// <reference path="../API.ts" />

/// <reference path="../base/containers/ArrayContainer.ts" />
/// <reference path="../base/iterators/ArrayIterator.ts" />

namespace std
{
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
		public constructor();
		public constructor(items: Array<T>);
		public constructor(container: Deque<T>);
		public constructor(size: number, val: T);
		public constructor(first: IForwardIterator<T>, last: IForwardIterator<T>);

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
				// INITIALIZER CONSTRUCTOR
				let array: Array<T> = args[0];
				let first = new base._NativeArrayIterator(array, 0);
				let last = new base._NativeArrayIterator(array, array.length);

				this.assign(first, last);
			}
			else if (args.length == 1 && args[0] instanceof Deque)
			{
				// COPY CONSTRUCTOR
				let container: Deque<T> = args[0];
				this.assign(container.begin(), container.end());
			}
			else if (args.length == 2)
			{
				// ASSIGN CONSTRUCTOR
				this.assign(args[0], args[1]);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN, RESERVE & CLEAR
		--------------------------------------------------------- */
		public assign(n: number, val: T): void;
		public assign<U extends T, InputIterator extends IForwardIterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public assign(first: any, second: any): void
		{
			// CLEAR PREVIOUS CONTENTS
			this.clear();

			// INSERT ITEMS
			this.insert(this.end(), first, second);
		}

		public clear(): void
		{
			// CLEAR CONTENTS
			this.matrix_ = [[]];

			// RE-INDEX
			this.size_ = 0;
			this.capacity_ = Deque.MIN_CAPACITY;
		}

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

		public resize(n: number): void
		{
			let expansion: number = n - this.size();
			if (expansion > 0)
				this.insert(this.end(), expansion, undefined);
			else if (expansion < 0)
				this.erase(this.end().advance(-expansion), this.end());
		}

		public shrink_to_fit(): void
		{
			this.reserve(this.size());
		}

		/* =========================================================
			ACCESSORS
				- BASIC ELEMENTS
				- INDEX ACCESSORS
		============================================================
			BASIC ELEMENTS
		--------------------------------------------------------- */
		public size(): number
		{
			return this.size_;
		}

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

		public push_front(val: T): void
		{
			// ADD CAPACITY & ROW
			this._Try_expand_capacity(this.size_ + 1);
			this._Try_add_row_at_front();

			// INSERT VALUE
			this.matrix_[0].unshift(val);
			this.size_++;
		}

		public push_back(val: T): void
		{
			// ADD CAPACITY & ROW
			this._Try_expand_capacity(this.size_ + 1);
			this._Try_add_row_at_back();

			// INSERT VALUE
			this.matrix_[this.matrix_.length - 1].push(val);
			this.size_++;
		}

		public pop_front(): void
		{
			if (this.empty() == true)
				return; // TODO: THROW EXCEPTION

			// EREASE FIRST ELEMENT
			this.matrix_[0].shift();
			if (this.matrix_[0].length == 0 && this.matrix_.length > 1)
				this.matrix_.shift();

			// SHRINK SIZE
			this.size_--;
		}

		public pop_back(): void
		{
			if (this.empty() == true)
				return; // TODO: THROW EXCEPTION

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
		protected _Insert_by_range<U extends T, InputIterator extends IForwardIterator<U>>
			(pos: Deque.Iterator<T>, first: InputIterator, last: InputIterator): Deque.Iterator<T>
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
		private _Insert_to_middle<U extends T, InputIterator extends IForwardIterator<U>>
			(pos: Deque.Iterator<T>, first: InputIterator, last: InputIterator): void
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
		private _Insert_to_end<U extends T, InputIterator extends IForwardIterator<U>>
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
		protected _Erase_by_range(first: Deque.Iterator<T>, last: Deque.Iterator<T>): Deque.Iterator<T>
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
		public swap(obj: Deque<T>): void
		{
			// SWAP CONTENTS
			[this.matrix_, obj.matrix_] = [obj.matrix_, this.matrix_];
			[this.size_, obj.size_] = [obj.size_, this.size_];
			[this.capacity_, obj.capacity_] = [obj.capacity_, this.capacity_];
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

/**
 * @hidden
 */
namespace std.Deque
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator<T> = base.ArrayIterator<T, Deque<T>>;
	export type ReverseIterator<T> = base.ArrayReverseIterator<T, Deque<T>>;

	// BODY
	export var Iterator = base.ArrayIterator;
	export var ReverseIterator = base.ArrayReverseIterator;

	//----
	// SNAKE NOTATION
	//----
	// HEAD
	export type iterator<T> = Iterator<T>;
	export type reverse_iterator<T> = ReverseIterator<T>;

	// BODY
	export var iterator = Iterator;
	export var reverse_iterator = ReverseIterator;
}