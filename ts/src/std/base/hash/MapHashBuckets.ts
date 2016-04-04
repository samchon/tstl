/// <reference path="HashBuckets.ts" />

namespace std.base.hash
{
	export class MapHashBuckets<K, T>
		extends HashBuckets<MapIterator<K, T>>
	{
		private map: container.MapContainer<K, T>;

		public constructor(map: container.MapContainer<K, T>)
		{
			super();

			this.map = map;
		}

		public find(key: K): MapIterator<K, T>
		{
			let index = hash.code(key) % this.size();
			let bucket = this.at(index);

			for (let i: number = 0; i < bucket.size(); i++)
				if (std.equals(bucket.at(i).first, key))
					return bucket.at(i);

			return this.map.end();
		}
	}
}