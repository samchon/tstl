//================================================================ 
/** @module std.base */
//================================================================
import { IContainer } from "./IContainer";
import { IDequeContainer } from "./IDequeContainer";
import { Container } from "./Container";

import { IForwardIterator } from "../../iterator/IForwardIterator";
import { ReverseIterator } from "../iterator/ReverseIterator";
import { ListIterator } from "../iterator/ListIterator";

import { _Repeater } from "../iterator/_Repeater";
import { _NativeArrayIterator } from "../iterator/_NativeArrayIterator";
import { InvalidArgument } from "../../exception/LogicError";
import { distance, advance } from "../../iterator/global";

/**
 * @hidden
 */
export abstract class ListContainer<T, 
		SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT>,
		IteratorT extends ListIterator<T, SourceT, IteratorT, ReverseIteratorT>,
		ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
	extends Container<T, SourceT, IteratorT, ReverseIteratorT>
	implements IDequeContainer<T, SourceT, IteratorT, ReverseIteratorT>
{
	/**
	 * @hidden
	 */
	private begin_: IteratorT;
	
	/**
	 * @hidden
	 */
	private end_: IteratorT;
	
	/**
	 * @hidden
	 */
	private size_: number;

	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	/**
	 * Default Constructor.
	 */
	protected constructor()
	{
		super();

		// INIT MEMBERS
		this.end_ = this._Create_iterator(null!, null!);
		this.end_["prev_"] = this.end_;
		this.end_["next_"] = this.end_;

		this.begin_ = (this.end_);
		this.size_ = 0;
	}

	/**
	 * @hidden
	 */
	protected abstract _Create_iterator(prev: IteratorT, next: IteratorT, val?: T): IteratorT;

	/**
	 * @inheritDoc
	 */
	public assign(n: number, val: T): void;
	/**
	 * @inheritDoc
	 */
	public assign<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
		(first: InputIterator, last: InputIterator): void;

	public assign(par1: any, par2: any): void
	{
		this.clear();
		this.insert(this.end(), par1, par2);
	}

	/**
	 * @inheritDoc
	 */
	public clear(): void
	{
		// DISCONNECT NODES
		this.begin_ = (this.end_);
		this.end_["prev_"] = (this.end_);
		this.end_["next_"] = (this.end_);

		// RE-SIZE -> 0
		this.size_ = 0;
	}

	/**
	 * @inheritDoc
	 */
	public resize(n: number): void
	{
		let expansion: number = n - this.size();
		if (expansion > 0)
			this.insert(this.end(), expansion, undefined!);
		else if (expansion < 0)
			this.erase(advance(this.end(), -expansion), this.end());
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public begin(): IteratorT
	{
		return this.begin_;
	}

	/**
	 * @inheritDoc
	 */
	public end(): IteratorT
	{
		return this.end_;
	}

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
	public front(): T;
	/**
	 * @inheritDoc
	 */
	public front(val: T): void;
	public front(val?: T): T | void
	{
		if (val === undefined)
			return this.begin_.value;
		else
			this.begin_["value_"] = val;
	}

	/**
	 * @inheritDoc
	 */
	public back(): T;
	/**
	 * @inheritDoc
	 */
	public back(val: T): void;
	public back(val?: T): T | void
	{
		let it = this.end().prev();
		if (val === undefined)
			return it.value;
		else
			it["value_"] = val;
	}

	/* =========================================================
		ELEMENTS I/O
			- PUSH & POP
			- INSERT
			- ERASE
			- POST-PROCESS
	============================================================
				PUSH & POP
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public push_front(val: T): void
	{
		this.insert(this.begin_, val);
	}

	/**
	 * @inheritDoc
	 */
	public push_back(val: T): void
	{
		this.insert(this.end_, val);
	}

	/**
	 * @inheritDoc
	 */
	public pop_front(): void
	{
		this.erase(this.begin_);
	}

	/**
	 * @inheritDoc
	 */
	public pop_back(): void
	{
		this.erase(this.end_.prev());
	}

	/* ---------------------------------------------------------
		INSERT
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public push(...items: T[]): number 
	{
		if (items.length === 0)
			return this.size();

		// INSERT BY RANGE
		let first: _NativeArrayIterator<T> = new _NativeArrayIterator(items, 0);
		let last: _NativeArrayIterator<T> = new _NativeArrayIterator(items, items.length);

		this._Insert_by_range(this.end(), first, last);

		// RETURN SIZE
		return this.size();
	}

	/**
	 * @inheritDoc
	 */
	public insert(position: IteratorT, val: T): IteratorT;
	/**
	 * @inheritDoc
	 */
	public insert(position: IteratorT, size: number, val: T): IteratorT;
	/**
	 * @inheritDoc
	 */
	public insert<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
		(position: IteratorT, begin: InputIterator, end: InputIterator): IteratorT;

	public insert(pos: IteratorT, ...args: any[]): IteratorT
	{
		// VALIDATION
		if (pos.source() !== this.end_.source())
			throw new InvalidArgument("Parametric iterator is not this container's own.");

		// BRANCHES
		if (args.length === 1)
			return this._Insert_by_repeating_val(pos, 1, args[0]);
		else if (args.length === 2 && typeof args[0] === "number")
			return this._Insert_by_repeating_val(pos, args[0], args[1]);
		else
			return this._Insert_by_range(pos, args[0], args[1]);
	}

	/**
	 * @hidden
	 */
	private _Insert_by_repeating_val(position: IteratorT, n: number, val: T): IteratorT
	{
		let first: _Repeater<T> = new _Repeater(0, val);
		let last: _Repeater<T> = new _Repeater(n);

		return this._Insert_by_range(position, first, last);
	}

	/**
	 * @hidden
	 */
	protected _Insert_by_range<U extends T, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
		(position: IteratorT, begin: InputIterator, end: InputIterator): IteratorT
	{
		let prev: IteratorT = <IteratorT>position.prev();
		let first: IteratorT = null!;

		let size: number = 0;

		for (let it = begin; it.equals(end) === false; it = it.next()) 
		{
			// CONSTRUCT ITEM, THE NEW ELEMENT
			let item: IteratorT = this._Create_iterator(prev, null!, it.value);
			if (size === 0)
				first = item;

			// PLACE ITEM ON THE NEXT OF "PREV"
			prev["next_"] = item;

			// SHIFT CURRENT ITEM TO PREVIOUS
			prev = item;
			++size;
		}

		// WILL FIRST BE THE BEGIN?
		if (position.equals(this.begin()) === true)
			this.begin_ = (first);

		// CONNECT BETWEEN LAST AND POSITION
		prev["next_"] = position;
		position["prev_"] = prev;

		this.size_ += size;

		return first;
	}

	/* ---------------------------------------------------------
		ERASE
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public erase(position: IteratorT): IteratorT;
	/**
	 * @inheritDoc
	 */
	public erase(first: IteratorT, last: IteratorT): IteratorT;
	public erase(first: IteratorT, last: IteratorT = first.next()): IteratorT
	{
		return this._Erase_by_range(first, last);
	}

	/**
	 * @hidden
	 */
	protected _Erase_by_range(first: IteratorT, last: IteratorT): IteratorT
	{
		// VALIDATION
		if (first.source() !== this.end_.source() || last.source() !== this.end_.source())
			throw new InvalidArgument("Parametric iterator is not this container's own.");

		// FIND PREV AND NEXT
		let prev: IteratorT = first.prev();
		let size: number = distance(first, last);

		// SHRINK
		prev["next_"] = (last);
		last["prev_"] = (prev);

		this.size_ -= size;
		if (first.equals(this.begin_))
			this.begin_ = (last);

		return last;
	}

	/* ---------------------------------------------------------
		SWAP
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public swap(obj: SourceT): void
	{
		[this.begin_, (obj as any).begin_] = [(obj as any).begin_, this.begin_];
		[this.end_, (obj as any).end_] = [(obj as any).end_, this.end_];
		[this.size_, (obj as any).size_] = [(obj as any).size_, this.size_];
	}
}