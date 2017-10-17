/// <reference path="../../API.ts" />

/// <reference path="_HashBuckets.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _MapHashBuckets<Key, T, Source extends IMapContainer<Key, T>>
		extends _HashBuckets<MapIterator<Key, T, Source>>
	{
        private source_: IHashMap<Key, T, Source>;

        public constructor(map: IHashMap<Key, T, Source>)
		{
			super();

			this.source_ = map;
		}
		
		public find(key: Key): MapIterator<Key, T, Source>
		{
			let index = hash(key) % this.size();
			let bucket = this.at(index);

			for (let i: number = 0; i < bucket.size(); i++)
				if (equal_to(bucket.at(i).first, key))
					return bucket.at(i);

			return this.source_.end();
		}
	}
}