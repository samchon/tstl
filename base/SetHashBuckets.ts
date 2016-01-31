/// <reference path="HashBuckets.ts" />

/// <reference path="SetContainer.ts" />

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
			var index = Hash.code(val) % this.size();
			var bucket = this.at(index);

			for (var i: number = 0; i < bucket.size(); i++)
                if (std.equals(bucket.at(i).value, val))
                    return bucket.at(i);

			return <SetIterator<T>>this.set.end();
		}
	}
}