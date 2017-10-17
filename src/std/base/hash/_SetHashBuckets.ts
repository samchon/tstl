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
		
        public constructor(set: IHashSet<T, Source>)
		{
			super();

			this.source_ = set;
		}

		public find(val: T): SetIterator<T, Source>
		{
			let index = hash(val) % this.size();
			let bucket = this.at(index);

			for (let i: number = 0; i < bucket.size(); i++)
				if (equal_to(bucket.at(i).value, val))
					return bucket.at(i);

			return this.source_.end();
		}
	}
}