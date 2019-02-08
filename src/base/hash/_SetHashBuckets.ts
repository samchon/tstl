//================================================================ 
/** @module std.base */
//================================================================
import { _HashBuckets } from "./_HashBuckets";

import { IHashSet } from "../container/IHashSet";
import { SetIterator } from "../iterator/SetIterator";

/**
 * @hidden
 */
export class _SetHashBuckets<T, Unique extends boolean, Source extends IHashSet<T, Unique, Source>>
	extends _HashBuckets<SetIterator<T, Unique, Source>>
{
	private source_: IHashSet<T, Unique, Source>;

	private hash_function_: (val: T) => number;
	private key_eq_: (x: T, y: T) => boolean;
	
	/* ---------------------------------------------------------
		CONSTRUCTORS
	--------------------------------------------------------- */
	public constructor(source: IHashSet<T, Unique, Source>, hash: (val: T) => number, pred: (x: T, y: T) => boolean)
	{
		super();

		this.source_ = source;
		this.hash_function_ = hash;
		this.key_eq_ = pred;
	}

	/**
	 * @internal
	 */
	public static _Swap_source<Key, Unique extends boolean, Source extends IHashSet<Key, Unique, Source>>
		(x: _SetHashBuckets<Key, Unique, Source>, y: _SetHashBuckets<Key, Unique, Source>): void
	{
		[x.source_, y.source_] = [y.source_, x.source_];
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public hash_function(): (val: T) => number
	{
		return this.hash_function_;
	}
	
	public key_eq(): (x: T, y: T) => boolean
	{
		return this.key_eq_;
	}

	/* ---------------------------------------------------------
		FINDERS
	--------------------------------------------------------- */
	public find(val: T): SetIterator<T, Unique, Source>
	{
		let index = this.hash_function_(val) % this.size();
		let bucket = this.at(index);

		for (let it of bucket)
			if (this.key_eq_(it.value, val))
				return it;

		return this.source_.end();
	}

	public hash_index(it: SetIterator<T, Unique, Source>): number
	{
		return this.hash_function_(it.value) % this.size();
	}
}