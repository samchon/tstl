/// <reference path="../../API.ts" />

/// <reference path="_HashBuckets.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _SetHashBuckets<T, Source extends ISetContainer<T>>
		extends _HashBuckets<SetIterator<T, Source>>
	{
		private source_: IHashSet<T, Source>;

		private hash_function_: (val: T) => number;
		private key_eq_: (x: T, y: T) => boolean;
		
		/* ---------------------------------------------------------
			CONSTRUCTORS & ACCESSORS
		--------------------------------------------------------- */
        public constructor(source: IHashSet<T, Source>, hash: (val: T) => number, pred: (x: T, y: T) => boolean)
		{
			super();

			this.source_ = source;
			this.hash_function_ = hash;
			this.key_eq_ = pred;
		}

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
		public find(val: T): SetIterator<T, Source>
		{
			let index = this.hash_function_(val) % this.size();
			let bucket = this.at(index);

			for (let it of bucket)
				if (this.key_eq_(it.value, val))
					return it;

			return this.source_.end();
		}

		public hash_index(it: SetIterator<T, Source>): number
		{
			return this.hash_function_(it.value) % this.size();
		}
	}
}