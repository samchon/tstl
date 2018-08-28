import { IPair } from "./IPair";
import { IComparable } from "../functional/IComparable";

import { hash } from "../functional/hash";
import { less as less_fn, equal_to } from "../functional/comparators";

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
			return less_fn(this.first, pair.first);
		else
			return less_fn(this.second, pair.second);
	}

	/**
	 * @inheritDoc
	 */
	public hashCode(): number
	{
		return hash(this.first, this.second);
	}
}

export type pair<First, Second> = Pair<First, Second>;
export const pair = Pair;

/**
 * Create a {@link Pair}.
 * 
 * @param first The 1st element.
 * @param second The 2nd element.
 * 
 * @return A {@link Pair} object.
 */
export function make_pair<First, Second>
	(first: First, second: Second): Pair<First, Second>
{
	return new Pair<First, Second>(first, second);
}