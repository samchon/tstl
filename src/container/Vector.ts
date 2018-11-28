import { ArrayContainer } from "../base/container/ArrayContainer";
import { ArrayIterator, ArrayReverseIterator } from "../base/iterator/ArrayIterator";

import { IForwardIterator } from "../iterator/IForwardIterator";
import { OutOfRange } from "../exception/LogicError";

/**
 * Vector, an array with variable capacity.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class Vector<T>
	extends ArrayContainer<T, Vector<T>>
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
	 */
	public constructor();

	/**
	 * Initializer Constructor.
	 * 
	 * @param items Items to assign.
	 */
	public constructor(items: Array<T>);

	/**
	 * Copy Constructor
	 * 
	 * @param obj Object to copy.
	 */
	public constructor(obj: Vector<T>);

	/**
	 * Fill Constructor.
	 * 
	 * @param size Initial size.
	 * @param val Value to fill.
	 */
	public constructor(n: number, val: T);

	/**
	 * Range Constructor.
	 * 
	 * @param first Input iterator of the first position.
	 * @param last Input iteartor of the last position.
	 */
	public constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>);
	
	public constructor(...args: any[])
	{
		super();

		// THE DATA
		this.data_ = [];

		// CONSTRUCTORS BRANCH
		if (args.length === 0)
		{
			// DEFAULT CONSTRUCTOR
		}
		else if (args.length === 1 && args[0] instanceof Array)
		{
			// INITIALIZER CONSTRUCTOR
			let array: Array<T> = args[0];
			this.data_ = array.slice();
		}
		else if (args.length === 1 && args[0] instanceof Vector)
		{
			// COPY CONSTRUCTOR
			this.data_ = (args[0] as Vector<T>).data_.slice();
		}
		else if (args.length === 2)
		{
			// ASSIGN CONSTRUCTOR
			this.assign(args[0], args[1]);
		}
	}

	/* ---------------------------------------------------------
		ASSIGN & CLEAR
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public assign(n: number, val: T): void;
	/**
	 * @inheritDoc
	 */
	public assign<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
		(begin: InputIterator, end: InputIterator): void;

	public assign(first: any, second: any): void
	{
		this.clear();
		this.insert(this.end(), first, second);
	}

	/**
	 * @inheritDoc
	 */
	public clear(): void
	{
		this.data_.splice(0, this.data_.length);
	}

	/**
	 * @inheritDoc
	 */
	public resize(n: number)
	{
		this.data_.length = n;
	}

	/* =========================================================
		ACCESSORS
	========================================================= */
	/**
	 * @inheritDoc
	 */
	public size(): number
	{
		return this.data_.length;
	}

	/**
	 * @inheritDoc
	 */
	public at(index: number): T
	{
		if (index < this.size())
			return this.data_[index];
		else
			throw new OutOfRange("Target index is greater than Vector's size.");
	}

	/**
	 * @inheritDoc
	 */
	public set(index: number, val: T): void
	{
		if (index >= this.size())
			throw new OutOfRange("Target index is greater than Vector's size.");

		this.data_[index] = val;
	}

	/**
	 * Access data.
	 * 
	 * @return An array capsuled by this {@link Vector}.
	 */
	public data(): Array<T>
	{
		return this.data_;
	}

	/**
	 * @inheritDoc
	 */
	public [Symbol.iterator](): IterableIterator<T>
	{
		return this.data_[Symbol.iterator]();
	}

	/* =========================================================
		ELEMENTS I/O
			- INSERT
			- ERASE
	============================================================
		INSERT
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public push(...items: T[]): number
	{
		return this.data_.push(...items);
	}

	/**
	 * @inheritDoc
	 */
	public push_back(val: T): void
	{
		this.data_.push(val);
	}

	/**
	 * @hidden
	 */
	protected _Insert_by_range<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
		(position: Vector.Iterator<T>, first: InputIterator, last: InputIterator): Vector.Iterator<T>
	{
		if (position.index() >= this.size())
		{ 
			// WHEN INSERT TO THE LAST
			let prev_size: number = this.size();

			for (; !first.equals(last); first = first.next())
				this.data_.push(first.value);
			
			return new Vector.Iterator<T, Vector<T>>(this, prev_size);
		}
		else
		{
			//----
			// INSERT TO THE MIDDLE POSITION
			//----
			// CUT RIGHT SIDE
			let spliced_array: T[] = this.data_.splice(position.index());

			// INSERT ELEMENTS
			for (; !first.equals(last); first = first.next())
				this.data_.push(first.value);
			
			this.data_.push(...spliced_array); // CONCAT THE SPLICEDS
			
			return position;
		}
	}
	
	/* ---------------------------------------------------------
		ERASE
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public pop_back(): void
	{
		this.data_.pop();
	}

	/**
	 * @hidden
	 */
	protected _Erase_by_range(first: Vector.Iterator<T>, last: Vector.Iterator<T>): Vector.Iterator<T>
	{
		if (first.index() >= this.size())
			return first;

		// ERASE ELEMENTS
		if (last.index() >= this.size())
		{
			this.data_.splice(first.index());
			return this.end();
		}
		else
			this.data_.splice(first.index(), last.index() - first.index());

		return first;
	}

	/* ---------------------------------------------------------------
		UTILITIES
	--------------------------------------------------------------- */
	/**
	 * @hidden
	 */
	public equals(obj: Vector<T>): boolean
	{
		return this.data_ === obj.data_;
	}

	/**
	 * @inheritDoc
	 */
	public swap(obj: Vector<T>): void
	{
		[this.data_, obj.data_] = [obj.data_, this.data_];
	}

	/**
	 * @inheritDoc
	 */
	public toJSON(): Array<T>
	{
		return this.data_;
	}
}

export namespace Vector
{
	//----
	// PASCAL NOTATION
	//----
	// HEAD
	export type Iterator<T> = ArrayIterator<T, Vector<T>>;
	export type ReverseIterator<T> = ArrayReverseIterator<T, Vector<T>>;

	// BODY
	export const Iterator = ArrayIterator;
	export const ReverseIterator = ArrayReverseIterator;

	//----
	// SNAKE NOTATION
	//----
	// HEAD
	export type iterator<T> = Iterator<T>;
	export type reverse_iterator<T> = ReverseIterator<T>;

	// BODY
	export const iterator = Iterator;
	export const reverse_iterator = ReverseIterator;
}
export import vector = Vector;