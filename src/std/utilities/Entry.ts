/// <reference path="../API.ts" />

namespace std
{
	/**
	 * Entry for mapping.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class Entry<Key, T> 
		implements IPair<Key, T>, IComparable<Entry<Key, T>>
	{
		/**
		 * The first, key element.
		 */
		public readonly first: Key;
		
		/**
		 * The second, mapped element.
		 */
		public second: T;
		
		/**
		 * Intializer Constructor.
		 * 
		 * @param first The first, key element.
		 * @param second The second, mapped element.
		 */
		public constructor(first: Key, second: T)
		{
			this.first = first;
			this.second = second;
		}

		/**
		 * @inheritDoc
		 */
		public equals(obj: Entry<Key, T>): boolean
		{
			return equal_to(this.first, obj.first);
		}

		/**
		 * @inheritDoc
		 */
		public less(obj: Entry<Key, T>): boolean
		{
			return less(this.first, obj.first);
		}

		/**
		 * @inheritDoc
		 */
		public hashCode(): number
		{
			return hash(this.first);
		}
	}
}

