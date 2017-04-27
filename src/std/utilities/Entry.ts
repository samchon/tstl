/// <reference path="../API.ts" />

namespace std
{
	export class Entry<Key, T>
	{
		public readonly first: Key;
		public second: T;

		public constructor(first: Key, second: T)
		{
			this.first = first;
			this.second = second;
		}
	}
}