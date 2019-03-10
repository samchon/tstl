//================================================================ 
/** @module std.base */
//================================================================
import { SetContainer } from "./SetContainer";

import { IForwardIterator } from "../../iterator/IForwardIterator";
import { ISetIterator, ISetReverseIterator } from "../iterator/ISetIterator";

import { Pair } from "../../utility/Pair";
import { OutOfRange } from "../../exception/LogicError";

/**
 * Base class for Unique-key Set Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export abstract class UniqueSet<Key, 
		Source extends UniqueSet<Key, Source, IteratorT, ReverseT>,
		IteratorT extends ISetIterator<Key, true, Source, IteratorT, ReverseT>,
		ReverseT extends ISetReverseIterator<Key, true, Source, IteratorT, ReverseT>>
	extends SetContainer<Key, true, Source, IteratorT, ReverseT>
{
	/* ---------------------------------------------------------
		ACCESSOR
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public count(key: Key): number
	{
		return this.find(key).equals(this.end()) ? 0 : 1;
	}

	/* ---------------------------------------------------------
		INSERT
	--------------------------------------------------------- */
	/**
	 * Insert an element.
	 * 
	 * @param key Key to insert.
	 * @return {@link Pair} of an iterator to the newly inserted element and `true`, if the specified *key* doesn't exist, otherwise {@link Pair} of iterator to ordinary element and `false`.
	 */
	public insert(key: Key): Pair<IteratorT, boolean>;
	
	/**
	 * Insert an element with hint.
	 * 
	 * @param hint Hint for the position where the element can be inserted.
	 * @param pair A tuple to be referenced for the insert.
	 * @return An iterator to the newly inserted element, if the specified key doesn't exist, otherwise an iterator to the ordinary element.
	 */
	public insert(hint: IteratorT, key: Key): IteratorT;
	
	/**
	 * Insert range elements.
	 * 
	 * @param first Input iterator of the first position.
	 * @param last Input iteartor of the last position.
	 */
	public insert<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>
		(first: InputIterator, last: InputIterator): void;

	public insert(...args: any[]): any
	{
		return (super.insert as Function)(...args);
	}

	/* ---------------------------------------------------------
		ERASE
	--------------------------------------------------------- */
	/**
	 * Extract an element by key.
	 * 
	 * @param key Key to search for.
	 * @return The extracted element.
	 */
	public extract(key: Key): Key;

	/**
	 * Extract an element by iterator.
	 * 
	 * @param pos The iterator to the element for extraction.
	 * @return Iterator following the *pos*, strained by the extraction.
	 */
	public extract(it: IteratorT): IteratorT;

	public extract(param: Key | IteratorT): any
	{
		if (param instanceof this._Get_iterator_type())
			return this._Extract_by_iterator(param as IteratorT);
		else
			return this._Extract_by_val(param as Key);
	}

	/**
	 * @hidden
	 */
	private _Extract_by_val(key: Key): Key
	{
		let it = this.find(key);
		if (it.equals(this.end()) === true)
			throw new OutOfRange("No such key exists.");

		this._Erase_by_range(it);
		return key;
	}

	/**
	 * @hidden
	 */
	private _Extract_by_iterator(it: IteratorT): IteratorT
	{
		if (it.equals(this.end()) === true || this.has(it.value) === false)
			return this.end();

		this._Erase_by_range(it);
		return it;
	}

	/**
	 * @hidden
	 */
	protected _Erase_by_val(key: Key): number
	{
		let it = this.find(key);
		if (it.equals(this.end()) === true)
			return 0;

		this._Erase_by_range(it);
		return 1;
	}

	/* ---------------------------------------------------------
		UTILITY
	--------------------------------------------------------- */
	/**
	 * @inheritDoc
	 */
	public merge(source: Source): void
	{
		for (let it = source.begin(); !it.equals(source.end());)
		{
			if (this.has(it.value) === false)
			{
				this.insert(it.value);
				it = source.erase(it);
			}
			else
				it = it.next();
		}
	}
}