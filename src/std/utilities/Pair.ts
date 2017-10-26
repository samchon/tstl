/// <reference path="../API.ts" />

namespace std
{
	export class Pair<T1, T2> 
		implements IPair<T1, T2>, IComparable<Pair<T1, T2>>
	{
		public first: T1;

		public second: T2;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		public constructor(first: T1, second: T2)
		{
			this.first = first;
			this.second = second;
		}

		/* ---------------------------------------------------------
			COMPARISON
		--------------------------------------------------------- */
		public equals<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean
		{
			return equal_to(this.first, pair.first) && equal_to(this.second, pair.second);
		}

		public less<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean
		{
			if (equal_to(this.first, pair.first) == false)
				return less(this.first, pair.first);
			else
				return less(this.second, pair.second);
		}

		public hashCode(): number
		{
			return std.hash(this.first, this.second);
		}
	}
}
