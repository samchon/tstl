/// <reference path="API.ts" />

/// <reference path="functional/bind.ts" />
/// <reference path="functional/bit_operations.ts" />
/// <reference path="functional/comparisons.ts" />
/// <reference path="functional/hash.ts" />

// Standard Template Library: Function objects
// Function objects are objects specifically designed to be used with a syntax similar to that of functions.
//
// They are typically used as arguments to functions, such as predicates or comparison functions passed to standard algorithms.
//
// @reference http://www.cplusplus.com/reference/functional/
// @author Jeongho Nam <http://samchon.org>

namespace std
{
	/* ---------------------------------------------------------
		SWAP
	--------------------------------------------------------- */
	/**
	 * Exchange contents of {@link IContainers containers}.
	 * 
	 * The contents of container <i>left</i> are exchanged with those of <i>right</i>. Both container objects must have 
	 * same type of elements (same template parameters), although sizes may differ.
	 * 
	 * After the call to this member function, the elements in <i>left</i> are those which were in <i>right</i> before 
	 * the call, and the elements of <i>right</i> are those which were in <i>left</i>. All iterators, references and 
	 * pointers remain valid for the swapped objects.
	 *
	 * This is an overload of the generic algorithm swap that improves its performance by mutually transferring 
	 * ownership over their assets to the other container (i.e., the containers exchange references to their data, without 
	 * actually performing any element copy or movement): It behaves as if <i>left</i>. 
	 * {@link Container.swap swap}(<i>right</i>) was called.
	 * 
	 * @param left A {@link Container container} to swap its contents.
	 * @param right A {@link Container container} to swap its contents.
	 */
	export function swap<T>
		(left: base.Container<T>, right: base.Container<T>): void;

	export function swap(left: any, right: any)
	{
		left.swap(right);
	}
}
