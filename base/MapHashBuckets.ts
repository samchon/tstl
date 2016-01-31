/// <reference path="HashBuckets.ts" />

/// <reference path="MapContainer.ts" />

namespace std.base
{
	export class MapHashBuckets<K, T>
		extends HashBuckets<MapIterator<K, T>>
	{
		private map: MapContainer<K, T>;

		public constructor(map: MapContainer<K, T>)
		{
			super();

			this.map = map;
		}

		public find(key: K): MapIterator<K, T>
		{
			var index = Hash.code(key) % this.size();
			var bucket = this.at(index);

			for (var i: number = 0; i < bucket.size(); i++)
                if (std.equals(bucket.at(i).first, key))
                    return bucket.at(i);

			return this.map.end();
		}
	}
}