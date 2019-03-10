//================================================================ 
/** @module std.base */
//================================================================
import { SetContainer } from "./SetContainer";

import { IForwardIterator } from "../../iterator/IForwardIterator";
import { ISetIterator, ISetReverseIterator } from "../iterator/ISetIterator";

/**
 * Base class for Multiple-key Set Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export abstract class MultiSet<Key, 
		Source extends MultiSet<Key, Source, IteratorT, ReverseT>,
		IteratorT extends ISetIterator<Key, false, Source, IteratorT, ReverseT>,
		ReverseT extends ISetReverseIterator<Key, false, Source, IteratorT, ReverseT>>
	extends SetContainer<Key, false, Source, IteratorT, ReverseT>
{
	/* ---------------------------------------------------------
		INSERT
	--------------------------------------------------------- */
	/**
	 * Insert an element.
	 * 
	 * @param pair A tuple to be referenced for the insert.
	 * @return An iterator to the newly inserted element.
	 */
	public insert(key: Key): IteratorT;

	/**
	 * Insert an element with hint.
	 * 
	 * @param hint Hint for the position where the element can be inserted.
	 * @param pair A tuple to be referenced for the insert.
	 * @return An iterator to the newly inserted element.
	 */
	public insert(hint: IteratorT, key: Key): IteratorT;

	/**
	 * Insert range elements.
	 * 
	 * @param first Input iterator of the first position.
	 * @param last Input iteartor of the last position.
	 */
	public insert<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>
		(begin: InputIterator, end: InputIterator): void;

	public insert(...args: any[]): any
	{
		return (super.insert as Function)(...args);
	}

	/* ---------------------------------------------------------
		ERASE
	--------------------------------------------------------- */
	/**
	 * @hidden
	 */
	protected abstract _Key_eq(x: Key, y: Key): boolean;

	/**
	 * @hidden
	 */
	protected _Erase_by_val(key: Key): number
	{
		let first = this.find(key);
		if (first.equals(this.end()) === true)
			return 0;

		let last = first.next();
		let ret: number = 1;

		while (!last.equals(this.end()) && this._Key_eq(key, last.value))
		{
			last = last.next();
			++ret;
		}
		this._Erase_by_range(first, last);
		return ret;
	}

	/* ---------------------------------------------------------
		UTILITY
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public merge(source: Source): void
	{
		this.insert(source.begin(), source.end());
		source.clear();
	}
}