/// <reference path="../API.ts" />

/// <reference path="HashBuckets.ts" />

namespace std.base
{
	/**
	 * <p> Hash buckets storing {@link MapIterator MapIterators}. </p>
	 * 
	 * <p> <img src="../assets/images/design/map_containers.png" width="100%" /> </p>
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
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
			let index = std.hash(key) % this.size();
			let bucket = this.at(index);

			for (let i: number = 0; i < bucket.size(); i++)
				if (std.equal_to(bucket.at(i).first, key))
					return bucket.at(i);

			return this.map.end();
		}
	}
}