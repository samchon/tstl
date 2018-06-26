import { IForwardContainer } from "../base/disposable/IForwardContainer";
import { IForwardIterator } from "../iterators/IForwardIterator";
import { IPointer } from "../functional/IPointer";

import { _IClear, _IEmpty, _ISize } from "../base/disposable/IPartialContainers";
import { _IDeque } from "../base/containers/IDequeContainer";
import { _IFront } from "../base/containers/ILinearContainer";
import { _IListAlgorithm } from "../base/disposable/IListAlgorithm";

import { ForOfAdaptor } from "../base/iterators/ForOfAdaptor";
import { _Repeater } from "../base/iterators/_Repeater";
import { Vector } from "./Vector";

import { advance, distance } from "../iterators/global";
import { equal_to, less } from "../functional/comparators";
import { sort as sort_func } from "../algorithms/sortings";

/**
 * Singly Linked List.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class ForwardList<T> 
	implements IForwardContainer<T, ForwardList.Iterator<T>>, 
		_IClear, _IEmpty, _ISize,
		_IDeque<T>, _IFront<T>, Iterable<T>,
		_IListAlgorithm<T, ForwardList<T>>
{
	/**
	 * @hidden
	 */
	private ptr_: IPointer<ForwardList<T>>;

	/**
	 * @hidden
	 */
	private size_: number;

	/**
	 * @hidden
	 */
	private before_begin_: ForwardList.Iterator<T>;

	/**
	 * @hidden
	 */
	private end_: ForwardList.Iterator<T>;

	/* ===============================================================
		CONSTRUCTORS & SEMI-CONSTRUCTORS
			- CONSTRUCTORS
			- ASSIGN & CLEAR
	==================================================================
		CONSTURCTORS
	--------------------------------------------------------------- */
	/**
	 * Default Constructor.
	 */
	public constructor();

	/**
	 * Initializer Constructor.
	 * 
	 * @param items Items to assign.
	 */
	public constructor(items: T[]);

	/**
	 * Copy Constructor
	 * 
	 * @param obj Object to copy.
	 */
	public constructor(obj: ForwardList<T>);

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
	 * @param last Input iterator of the last position.
	 */
	public constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>);

	public constructor(...args: any[])
	{
		this.ptr_ = {value: this};

		this.clear();

		if (args.length === 1 && args[0] instanceof Array)
		{
			let array: Array<T> = args[0];
			let it = this.before_begin();

			for (let val of array)
				it = this.insert_after(it, val);
		}
		else if (args.length === 1 && args[0] instanceof ForwardList)
		{
			this.assign(args[0].begin(), args[0].end());
		}
		else if (args.length === 2)
			this.assign(args[0], args[1]);
	}

	/* ---------------------------------------------------------------
		ASSIGN & CLEAR
	--------------------------------------------------------------- */
	/**
	 * Fill Assigner.
	 * 
	 * @param n Initial size.
	 * @param val Value to fill.
	 */
	public assign(n: number, val: T): void;

	/**
	 * Range Assigner.
	 * 
	 * @param first Input iteartor of the first position.
	 * @param last Input iterator of the last position.
	 */
	public assign<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
		(first: InputIterator, last: InputIterator): void;

	public assign(first: any, last: any): void
	{
		this.clear();

		this.insert_after(this.before_begin_, first, last);
	}

	/**
	 * @inheritDoc
	 */
	public clear(): void
	{
		this.end_ = new ForwardList.Iterator<T>(this.ptr_, null, null);
		this.before_begin_ = new ForwardList.Iterator<T>(this.ptr_, this.end_, null);
		
		this.size_ = 0;
	}

	/* ===============================================================
		ACCESSORS
	=============================================================== */
	/**
	 * @inheritDoc
	 */
	public size(): number
	{
		return this.size_;
	}

	/**
	 * @inheritDoc
	 */
	public empty(): boolean
	{
		return this.size_ === 0;
	}
	
	/**
	 * @inheritDoc
	 */
	public front(): T;

	/**
	 * @inheritDoc
	 */
	public front(val: T): void;

	public front(val: T = undefined)
	{
		let it: ForwardList.Iterator<T> = this.begin();

		if (val === undefined)
			return it.value;
		else
			it.value = val;
	}

	/**
	 * Iterator to before beginning.
	 * 
	 * @return Iterator to the before beginning.
	 */
	public before_begin(): ForwardList.Iterator<T>
	{
		return this.before_begin_;
	}

	/**
	 * @inheritDoc
	 */
	public begin(): ForwardList.Iterator<T>
	{
		return this.before_begin_.next();
	}

	/**
	 * @inheritDoc
	 */
	public end(): ForwardList.Iterator<T>
	{
		return this.end_;;
	}

	/**
	 * @inheritDoc
	 */
	public [Symbol.iterator](): IterableIterator<T>
	{
		return new ForOfAdaptor(this.begin(), this.end());
	}

	/* ===============================================================
		ELEMENTS I/O
			- INSERT
			- ERASE
	==================================================================
		INSERT
	--------------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public push_front(val: T): void
	{
		this.insert_after(this.before_begin_, val);
	}

	/**
	 * Insert an element.
	 * 
	 * @param pos Position to insert after.
	 * @param val Value to insert.
	 * @return An iterator to the newly inserted element.
	 */
	public insert_after(pos: ForwardList.Iterator<T>, val: T): ForwardList.Iterator<T>;

	/**
	 * Inserted repeated elements.
	 * 
	 * @param pos Position to insert after.
	 * @param n Number of elements to insert.
	 * @param val Value to insert repeatedly.
	 * @return An iterator to the last of the newly inserted elements.
	 */
	public insert_after(pos: ForwardList.Iterator<T>, n: number, val: T): ForwardList.Iterator<T>;

	/**
	 * Insert range elements.
	 * 
	 * @param pos Position to insert after.
	 * @param first Input iterator of the first position.
	 * @param last Input iteartor of the last position.
	 * @return An iterator to the last of the newly inserted elements.
	 */
	public insert_after<T, InputIterator extends Readonly<IForwardIterator<T, InputIterator>>>
		(pos: ForwardList.Iterator<T>, first: InputIterator, last: InputIterator): ForwardList.Iterator<T>;

	public insert_after(pos: ForwardList.Iterator<T>, ...args: any[]): ForwardList.Iterator<T>
	{
		let ret: ForwardList.Iterator<T>;

		// BRANCHES
		if (args.length === 1)
			ret = this._Insert_by_repeating_val(pos, 1, args[0]);
		else if (typeof args[0] === "number")
			ret = this._Insert_by_repeating_val(pos, args[0], args[1]);
		else
			ret = this._Insert_by_range(pos, args[0], args[1]);
		
		// RETURNS
		return ret;
	}

	/**
	 * @hidden
	 */
	private _Insert_by_repeating_val(pos: ForwardList.Iterator<T>, n: number, val: T): ForwardList.Iterator<T>
	{
		let first: _Repeater<T> = new _Repeater(0, val);
		let last: _Repeater<T> = new _Repeater(n);

		return this._Insert_by_range(pos, first, last);
	}

	/**
	 * @hidden
	 */
	private _Insert_by_range<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
		(pos: ForwardList.Iterator<T>, first: InputIterator, last: InputIterator): ForwardList.Iterator<T>
	{
		let nodes: ForwardList.Iterator<T>[] = [];
		let count: number = 0;

		for (; !first.equals(last); first = first.next())
		{
			let node = new ForwardList.Iterator<T>(this.ptr_, null, first.value);
			nodes.push(node);

			++count;
		}
		if (count === 0)
			return pos;

		for (let i: number = 0; i < count - 1; ++i)
			nodes[i]["next_"] = nodes[i + 1];
		nodes[nodes.length - 1]["next_"] = pos.next();
		pos["next_"] = nodes[0];

		this.size_ += count;
		return nodes[nodes.length - 1];
	}

	/* ---------------------------------------------------------------
		ERASE
	--------------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public pop_front(): void
	{
		this.erase_after(this.before_begin());
	}

	/**
	 * Erase an element.
	 * 
	 * @param it Position to erase after.
	 * @return Iterator to the erased element.
	 */
	public erase_after(it: ForwardList.Iterator<T>): ForwardList.Iterator<T>;

	/**
	 * Erase elements.
	 * 
	 * @param first Range of the first position to erase after.
	 * @param last Rangee of the last position to erase.
	 * @return Iterator to the last removed element.
	 */
	public erase_after(first: ForwardList.Iterator<T>, last: ForwardList.Iterator<T>): ForwardList.Iterator<T>;

	public erase_after(first: ForwardList.Iterator<T>, last: ForwardList.Iterator<T> = advance(first, 2)): ForwardList.Iterator<T>
	{
		// SHRINK SIZE
		this.size_ -= Math.max(0, distance(first, last) - 1);

		// RE-CONNECT
		first["next_"] = last;
		return last;
	}

	/* ===============================================================
		ALGORITHMS
			- UNIQUE & REMOVE(_IF)
			- MERGE & SPLICE
			- SORT
	==================================================================
		UNIQUE & REMOVE(_IF)
	--------------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public unique(binary_pred: (x: T, y: T) => boolean = equal_to): void
	{
		for (let it = this.begin().next(); !it.equals(this.end()); it = it.next())
		{
			let next_it = it.next();
			if (next_it.equals(this.end()))
				break;

			if (binary_pred(it.value, next_it.value))
				this.erase_after(it);
		}
	}

	/**
	 * @inheritDoc
	 */
	public remove(val: T): void
	{
		this.remove_if(function (elem: T): boolean
			{
				return equal_to(val, elem);
			});
	}

	/**
	 * @inheritDoc
	 */
	public remove_if(pred: (val: T) => boolean): void
	{
		let count: number = 0;
		
		for (let it = this.before_begin(); !it.next().equals(this.end()); it = it.next())
			if (pred(it.next().value) === true)
			{
				it["next_"] = it.next().next();
				++count;
			}
		this.size_ -= count;
	}

	/* ---------------------------------------------------------------
		MERGE & SPLICE
	--------------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public merge<U extends T>(from: ForwardList<U>, comp: (x: T, y: T) => boolean = less): void
	{
		if (this === <ForwardList<T>>from)
			return;

		let it = this.before_begin();
		while (from.empty() === false)
		{
			let value = from.begin().value;
			while (!it.next().equals(this.end()) && comp(it.next().value, value))
				it = it.next();
			
			this.splice_after(it, from, from.before_begin());
		}
	}

	/**
	 * Transfer elements.
	 * 
	 * @param pos Position to insert after.
	 * @param from Target container to transfer.
	 */
	public splice_after<U extends T>
		(pos: ForwardList.Iterator<T>, from: ForwardList<U>): void;

	/**
	 * Transfer a single element.
	 * 
	 * @param pos Position to insert after.
	 * @param from Target container to transfer.
	 * @param before Previous position of the single element to transfer.
	 */
	public splice_after<U extends T>
		(
			pos: ForwardList.Iterator<T>, 
			from: ForwardList<U>, 
			before: ForwardList.Iterator<U>
		): void;

	/**
	 * Transfer range elements.
	 * 
	 * @param pos Position to insert after.
	 * @param from Target container to transfer.
	 * @param first Range of previous of the first position to transfer.
	 * @param last Rangee of the last position to transfer.
	 */
	public splice_after<U extends T>
		(
			pos: ForwardList.Iterator<T>, 
			from: ForwardList<U>, 
			first_before: ForwardList.Iterator<U>, last: ForwardList.Iterator<U>
		): void;

	public splice_after<U extends T>
		(
			pos: ForwardList.Iterator<T>, 
			from: ForwardList<U>, 
			first_before: ForwardList.Iterator<U> = null, last: ForwardList.Iterator<U> = null
		): void
	{
		// DEFAULT PARAMETERS
		if (first_before === null)
			first_before = from.before_begin();
		else if (last === null)
			last = first_before.next().next();

		if (last === null)
			last = from.end();

		// INSERT & ERASE
		this.insert_after(pos, first_before.next(), last);
		from.erase_after(first_before, last);
	}

	/* ---------------------------------------------------------------
		SORT
	--------------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public sort(comp: (x: T, y: T) => boolean = less): void
	{
		let vec = new Vector<T>(this.begin(), this.end());
		sort_func(vec.begin(), vec.end(), comp);

		this.assign(vec.begin(), vec.end());
	}
	
	/**
	 * @inheritDoc
	 */
	public reverse(): void
	{
		let vec = new Vector<T>(this.begin(), this.end());
		this.assign(vec.rbegin(), vec.rend());
	}

	/* ---------------------------------------------------------------
		UTILITIES
	--------------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public swap(obj: ForwardList<T>): void
	{
		// SIZE AND NODES
		[this.size_, obj.size_] = [obj.size_, this.size_];
		[this.before_begin_, obj.before_begin_] = [obj.before_begin_, this.before_begin_];
		[this.end_, obj.end_] = [obj.end_, this.end_];

		// POINTER OF THE SOURCE
		[this.ptr_, obj.ptr_] = [obj.ptr_, this.ptr_];
		[this.ptr_.value, obj.ptr_.value] = [obj.ptr_.value, this.ptr_.value];
	}

	/**
	 * Native function for `JSON.stringify()`.
	 * 
	 * @return An array containing children elements.
	 */
	public toJSON(): Array<T>
	{
		let ret: T[] = [];
		for (let elem of this)
			ret.push(elem);

		return ret;
	}
}

export namespace ForwardList
{
	/**
	 * Iterator of the ForwardList.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class Iterator<T> implements IForwardIterator<T, Iterator<T>>
	{
		/**
		 * @hidden
		 */
		private source_ptr_: IPointer<ForwardList<T>>;

		/**
		 * @hidden
		 */
		private next_: Iterator<T>;

		/**
		 * @hidden
		 */
		private value_: T;

		public constructor(source: IPointer<ForwardList<T>>, next: Iterator<T>, value: T)
		{
			this.source_ptr_ = source;
			this.next_ = next;

			this.value_ = value;
		}

		/* ---------------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------------- */
		/**
		 * Get source container.
		 * 
		 * @return The source container.
		 */
		public source(): ForwardList<T>
		{
			return this.source_ptr_.value;
		}

		/**
		 * @inheritDoc
		 */
		public get value(): T
		{
			return this.value_;
		}

		/**
		 * @inheritDoc
		 */
		public set value(val: T)
		{
			this.value_ = val;
		}

		/* ---------------------------------------------------------
			MOVERS
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public next(): Iterator<T>
		{
			return this.next_;
		}

		/**
		 * @inheritDoc
		 */
		public equals(obj: Iterator<T>): boolean
		{
			return this === obj;
		}
	}
}
export import forward_list = ForwardList;