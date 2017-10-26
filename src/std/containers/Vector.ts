/// <reference path="../API.ts" />

/// <reference path="../base/containers/ArrayContainer.ts" />
/// <reference path="../base/iterators/ArrayIterator.ts" />

namespace std
{	
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
		public constructor();

		public constructor(array: Array<T>);

		public constructor(n: number);

		public constructor(n: number, val: T);

		public constructor(container: Vector<T>);

		public constructor(begin: IForwardIterator<T>, end: IForwardIterator<T>);
		
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
			else if (args.length == 2 && args[0].next instanceof Function && args[1].next instanceof Function)
			{
				// CONSTRUCT FROM INPUT ITERATORS
				let begin: IForwardIterator<T> = args[0];
				let end: IForwardIterator<T> = args[1];

				this.assign(begin, end);
			}
		}

		/* ---------------------------------------------------------
			ASSIGN & CLEAR
		--------------------------------------------------------- */
		public assign<U extends T, InputIterator extends IForwardIterator<U>>
			(begin: InputIterator, end: InputIterator): void;

		public assign(n: number, val: T): void;

		public assign<U extends T, InputIterator extends IForwardIterator<U>>
			(first: any, second: any): void
		{
			this.clear();
			this.insert(this.end(), first, second);
		}

		public clear(): void
		{
			this.erase(this.begin(), this.end());
		}

		/* =========================================================
			ACCESSORS
		========================================================= */
		public size(): number
		{
			return this.data_.length;
		}

		public empty(): boolean
		{
			return this.size() == 0;
		}

		public at(index: number): T
		{
			if (index < this.size())
				return this.data_[index];
			else
				throw new OutOfRange("Target index is greater than Vector's size.");
		}

		public set(index: number, val: T): T
		{
			if (index >= this.size())
				throw new OutOfRange("Target index is greater than Vector's size.");

			let prev: T = this.data_[index];
			this.data_[index] = val;

			return prev;
		}

		public data(): Array<T>
		{
			return this.data_;
		}

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
		public push(...items: T[]): number
		{
			return this.data_.push(...items);
		}

		public push_back(val: T): void
		{
			this.data_.push(val);
		}

		/**
		 * @hidden
		 */
		protected _Insert_by_range<InputIterator extends IForwardIterator<T>>
			(position: Vector.Iterator<T>, first: InputIterator, last: InputIterator): Vector.Iterator<T>
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
		public pop_back(): void
		{
			this.data_.pop();
		}

		/**
		 * @hidden
		 */
		protected _Erase_by_range(first: Vector.Iterator<T>, last: Vector.Iterator<T>): Vector.Iterator<T>
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
		public swap(obj: Vector<T>): void
		{
			[this.data_, obj.data_] = [obj.data_, this.data_];
		}
	}
}

/**
 * @hidden
 */
namespace std.Vector
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator<T> = base.ArrayIterator<T, Vector<T>>;
	export type ReverseIterator<T> = base.ArrayReverseIterator<T, Vector<T>>;

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
