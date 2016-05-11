/// <reference path="../API.ts" />

/// <reference path="HashBuckets.ts" />

namespace std.base
{
	export class SetHashBuckets<T>
		extends HashBuckets<SetIterator<T>>
	{
		private set: SetContainer<T>;
		
		public constructor(set: SetContainer<T>)
		{
			super();

			this.set = set;
		}

		public find(val: T): SetIterator<T>
		{
			let index = code(val) % this.size();
			let bucket = this.at(index);

			for (let i: number = 0; i < bucket.size(); i++)
				if (std.equal_to(bucket.at(i).value, val))
					return bucket.at(i);

			return this.set.end();
		}
	}
}