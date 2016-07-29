/// <reference path="../API.ts" />

namespace std.base
{
	/**
	 * <p> Array  </p>
	 *
	 * <p> {@link IArray} is an interface for sequence containers representing <i>arrays</i> that can change in 
	 * {@link size}. However, compared to <i>arrays</i>, {@link IArray} objectss consume more memory in exchange for 
	 * the ability to manage storage and grow dynamically in an efficient way. </p> </p>
	 * 
	 * <p> Both {@link Vector Vectors} and {@link Deque Deques} who implemented {@link IArray} provide a very 
	 * similar interface and can be used for similar purposes, but internally both work in quite different ways: 
	 * While {@link Vector Vectors} use a single array that needs to be occasionally reallocated for growth, the 
	 * elements of a {@link Deque} can be scattered in different chunks of storage, with the container keeping the 
	 * necessary information internally to provide direct access to any of its elements in constant time and with a 
	 * uniform sequential interface (through iterators). Therefore, {@link Deque Deques} are a little more complex 
	 * internally than {@link Vector Vectors}, but this allows them to grow more efficiently under certain 
	 * circumstances, especially with very long sequences, where reallocations become more expensive. </p>
	 * 
	 * <p> Both {@link Vector Vectors} and {@link Deque Deques} provide a very similar interface and can be used for 
	 * similar purposes, but internally both work in quite different ways: While {@link Vector Vectors} use a single 
	 * array that needs to be occasionally reallocated for growth, the elements of a {@link Deque} can be scattered 
	 * in different chunks of storage, with the container keeping the necessary information internally to provide 
	 * direct access to any of its elements in constant time and with a uniform sequential interface (through 
	 * iterators). Therefore, {@link Deque Deques} are a little more complex internally than {@link Vector Vectors}, 
	 * but this allows them to grow more efficiently under certain circumstances, especially with very long 
	 * sequences, where reallocations become more expensive. </p>
	 *
	 * <p> For operations that involve frequent insertion or removals of elements at positions other than the 
	 * beginning or the end, {@link IArray} objects perform worse and have less consistent iterators and references 
	 * than {@link List Lists} </p>.
	 * 
	 * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> 
	 * </a> </p>
	 * 
	 * <h3> Container properties </h3>
	 * <dl>
	 *	<dt> Sequence </dt>
	 *	<dd>
	 *		Elements in sequence containers are ordered in a strict linear sequence. Individual elements are
	 *		accessed by their position in this sequence.
	 *	</dd>
	 *
	 *	<dt> Dynamic array </dt>
	 *	<dd>
	 *		Allows direct access to any element in the sequence, even through pointer arithmetics, and provides
	 *		relatively fast addition/removal of elements at the end of the sequence.
	 *	</dd>
	 * </dl>
	 *
	 * @param <T> Type of the elements.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface IArrayContainer<T>
		extends ILinearContainer<T>
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * <p> Request a change in capacity. </p>
		 * 
		 * <p> Requests that the {@link IArray container} {@link capacity} be at least enough to contain 
		 * <i>n</i> elements. </p>
		 * 
		 * <p> If <i>n</i> is greater than the current {@link IArray container} {@link capacity}, the 
		 * function causes the {@link IArray container} to reallocate its storage increasing its 
		 * {@link capacity} to <i>n</i> (or greater). </p>
		 * 
		 * <p> In all other cases, the function call does not cause a reallocation and the 
		 * {@link IArray container} {@link capacity} is not affected. </p>
		 * 
		 * <p> This function has no effect on the {@link IArray container} {@link size} and cannot alter 
		 * its elements. </p>
		 *
		 * @param n Minimum {@link capacity} for the {@link IArray container}.
		 *			Note that the resulting {@link capacity} may be equal or greater than <i>n</i>.
		 */
		reserve(n: number): void;

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Return size of allocated storage capacity. </p>
		 * 
		 * <p> Returns the size of the storage space currently allocated for the {@link IArray container}, 
		 * expressed in terms of elements. </p>
		 * 
		 * <p> This {@link capacity} is not necessarily equal to the {@link IArray container} {@link size}. 
		 * It can be equal or greater, with the extra space allowing to accommodate for growth without the 
		 * need to reallocate on each insertion. </p>
		 * 
		 * <p> Notice that this {@link capacity} does not suppose a limit on the {@link size} of the 
		 * {@link IArray container}. When this {@link capacity} is exhausted and more is needed, it is 
		 * automatically expanded by the {@link IArray container} (reallocating it storage space). 
		 * The theoretical limit on the {@link size} of a {@link IArray container} is given by member 
		 * {@link max_size}. </p>
		 * 
		 * <p> The {@link capacity} of a {@link IArray container} can be explicitly altered by calling member 
		 * {@link IArray.reserve}. </p>
		 *
		 * @return The size of the currently allocated storage capacity in the {@link IArray container}, 
		 *		   measured in terms of the number elements it can hold.
		 */
		capacity(): number;

		/**
		 * <p> Access element. </p>
		 * <p> Returns a value to the element at position <i>index</i> in the {@link IArray container}.</p>
		 *
		 * <p> The function automatically checks whether <i>index</i> is within the bounds of valid elements 
		 * in the {@link IArray container}, throwing an {@link OutOfRange} exception if it is not (i.e., 
		 * if <i>index</i> is greater or equal than its {@link size}). </p>
		 *
		 * @param index Position of an element in the 
		 *				If this is greater than or equal to the {@link IArray container} {@link size}, an 
		 *				exception of type {@link OutOfRange} is thrown. Notice that the first 
		 *				element has a position of 0 (not 1).
		 *
		 * @return The element at the specified position in the 
		 */
		at(index: number): T;

		/**
		 * <p> Modify element. </p>
		 * <p> Replaces an element at the specified position (<i>index</i>) in this {@link IArray container} 
		 * with the specified element (<i>val</i>). </p>
		 *
		 * <p> The function automatically checks whether <i>index</i> is within the bounds of valid elements 
		 * in the {@link IArray container}, throwing an {@link OutOfRange} exception if it is not (i.e., if 
		 * <i>index</i> is greater or equal than its {@link size}). </p>
		 * 
		 * @.param index A specified position of the value to replace.
		 * @param val A value to be stored at the specified position.
		 *
		 * @return The previous element had stored at the specified position.
		 */
		set(index: number, val: T): void;
	}
}