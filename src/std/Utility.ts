/// <reference path="API.ts" />

/// <reference path="miscellaneous/Pair.ts" />

namespace std
{
	/**
	 * Running on Node.
	 * 
	 * Test whether the JavaScript is running on Node.
	 * 
	 * @references http://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser
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
	 * Construct {@link Pair} object.
	 * 
	 * Constructs a {@link Pair} object with its {@link Pair.first first} element set to <i>x</i> and its 
	 * {@link Pair.second second} element set to <i>y</i>.
	 * 
	 * The template types can be implicitly deduced from the arguments passed to {@link make_pair}.
	 * 
	 * {@link Pair} objects can be constructed from other {@link Pair} objects containing different types, if the 
	 * respective types are implicitly convertible.
	 * 
	 * @param x Value for member {@link Pair.first first}.
	 * @param y Value for member {@link Pair.second second}.
	 * 
	 * @return A {@link Pair} object whose elements {@link Pair.first first} and {@link Pair.second second} are set to 
	 *		   <i>x</i> and <i>y</i> respectivelly.
	 */
	export function make_pair<T1, T2>(x: T1, y: T2): Pair<T1, T2>
	{
		return new Pair<T1, T2>(x, y);
	}
}