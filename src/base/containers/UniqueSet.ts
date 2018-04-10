import { SetContainer } from "./SetContainer";
import { SetIterator } from "../iterators/SetIterator";

import { IForwardIterator } from "../../iterators/IForwardIterator";
import { Pair } from "../../utilities/Pair";
import { OutOfRange } from "../../exceptions/LogicError";

/**
 * Base class for Unique-key Set Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export abstract class UniqueSet<Key, Source extends UniqueSet<Key, Source>>
	extends SetContainer<Key, true, Source>
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
	public insert(key: Key): Pair<SetIterator<Key, true, Source>, boolean>;
	
	/**
	 * Insert an element with hint.
	 * 
	 * @param hint Hint for the position where the element can be inserted.
	 * @param pair A tuple to be referenced for the insert.
	 * @return An iterator to the newly inserted element, if the specified key doesn't exist, otherwise an iterator to the ordinary element.
	 */
	public insert(hint: SetIterator<Key, true, Source>, key: Key): SetIterator<Key, true, Source>;
	
	/**
	 * Insert range elements.
	 * 
	 * @param first Input iterator of the first position.
	 * @param last Input iteartor of the last position.
	 */
	public insert<U extends Key, InputIterator extends Readonly<IForwardIterator<U, InputIterator>>>
		(first: InputIterator, last: InputIterator): void;

	public insert(...args: any[]): any
	{
		return super.insert.apply(this, args);
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
	public extract(it: SetIterator<Key, true, Source>): SetIterator<Key, true, Source>;

	public extract(param: Key | SetIterator<Key, true, Source>): any
	{
		if (param instanceof SetIterator)
			return this._Extract_by_iterator(param);
		else
			return this._Extract_by_val(param);
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
	private _Extract_by_iterator(it: SetIterator<Key, true, Source>): SetIterator<Key, true, Source>
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