/// <reference path="../API.ts" />

namespace std
{
	export class Entry<Key, T> implements IComparable<Entry<Key, T>>
	{
		public readonly first: Key;
		public second: T;
		
		public constructor(first: Key, second: T)
		{
			this.first = first;
			this.second = second;
		}

		public equals(obj: Entry<Key, T>): boolean
		{
			return equal_to(this.first, obj.first);
		}

		public less(obj: Entry<Key, T>): boolean
		{
			return less(this.first, obj.first);
		}
		public hashCode(): number
		{
			return hash(this.first);
		}
	}
}

