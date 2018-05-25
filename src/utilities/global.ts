import { Pair } from "./Pair";

export * from "./node";

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