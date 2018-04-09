/// <reference path="../API.ts" />

namespace std
{
	/**
	 * Pair of two elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class Pair<First, Second> 
		implements IPair<First, Second>, IComparable<Pair<First, Second>>
	{
		/**
		 * @inheritDoc
		 */
		public first: First;

		/**
		 * @inheritDoc
		 */
		public second: Second;

		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Initializer Constructor.
		 * 
		 * @param first The first element.
		 * @param second The second element.
		 */
		public constructor(first: First, second: Second)
		{
			this.first = first;
			this.second = second;
		}

		/* ---------------------------------------------------------
			COMPARISON
		--------------------------------------------------------- */
		/**
		 * @inheritDoc
		 */
		public equals<U1 extends First, U2 extends Second>(pair: Pair<U1, U2>): boolean
		{
			return equal_to(this.first, pair.first) && equal_to(this.second, pair.second);
		}

		/**
		 * @inheritDoc
		 */
		public less<U1 extends First, U2 extends Second>(pair: Pair<U1, U2>): boolean
		{
			if (equal_to(this.first, pair.first) === false)
				return less(this.first, pair.first);
			else
				return less(this.second, pair.second);
		}

		/**
		 * @inheritDoc
		 */
		public hashCode(): number
		{
			return std.hash(this.first, this.second);
		}
	}
}
