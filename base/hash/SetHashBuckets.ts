/// <reference path="HashBuckets.ts" />

namespace std.base.hash
{
	export class SetHashBuckets<T>
		extends HashBuckets<SetIterator<T>>
	{
		private set: container.SetContainer<T>;
		
		public constructor(set: container.SetContainer<T>)
		{
			super();

			this.set = set;
		}

		public find(val: T): SetIterator<T>
		{
			let index = hash.code(val) % this.size();
			let bucket = this.at(index);

			for (let i: number = 0; i < bucket.size(); i++)
                if (std.equals(bucket.at(i).value, val))
                    return bucket.at(i);

			return <SetIterator<T>>this.set.end();
		}
	}
}