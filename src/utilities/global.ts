import { Pair } from "./Pair";

/**
 * Test whether the code is running on NodeJS.
 * 
 * @return Whether NodeJS or not.
 */
export function is_node(): boolean
{
	if (typeof process === "object")
		if (typeof process.versions === "object")
			if (typeof process.versions.node !== "undefined")
				return true;
	
	return false;
}

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