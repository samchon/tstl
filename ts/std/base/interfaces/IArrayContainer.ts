namespace std.base
{
	/**
	 * Array Container.
	 *
	 * {@link IArrayContainer} is an interface for sequence containers representing <i>arrays</i> that can change in 
	 * {@link size}. However, compared to <i>arrays</i>, {@link IArrayContainer} objectss consume more memory in exchange for 
	 * the ability to manage storage and grow dynamically in an efficient way.
	 * 
	 * Both {@link Vector Vectors} and {@link Deque Deques} who implemented {@link IArrayContainer} provide a very 
	 * similar interface and can be used for similar purposes, but internally both work in quite different ways: 
	 * While {@link Vector Vectors} use a single array that needs to be occasionally reallocated for growth, the 
	 * elements of a {@link Deque} can be scattered in different chunks of storage, with the container keeping the 
	 * necessary information internally to provide direct access to any of its elements in constant time and with a 
	 * uniform sequential interface (through iterators). Therefore, {@link Deque Deques} are a little more complex 
	 * internally than {@link Vector Vectors}, but this allows them to grow more efficiently under certain 
	 * circumstances, especially with very long sequences, where reallocations become more expensive.
	 * 
	 * Both {@link Vector Vectors} and {@link Deque Deques} provide a very similar interface and can be used for 
	 * similar purposes, but internally both work in quite different ways: While {@link Vector Vectors} use a single 
	 * array that needs to be occasionally reallocated for growth, the elements of a {@link Deque} can be scattered 
	 * in different chunks of storage, with the container keeping the necessary information internally to provide 
	 * direct access to any of its elements in constant time and with a uniform sequential interface (through 
	 * iterators). Therefore, {@link Deque Deques} are a little more complex internally than {@link Vector Vectors}, 
	 * but this allows them to grow more efficiently under certain circumstances, especially with very long 
	 * sequences, where reallocations become more expensive.
	 *
	 * For operations that involve frequent insertion or removals of elements at positions other than the 
	 * beginning or the end, {@link IArrayContainer} objects perform worse and have less consistent iterators and references 
	 * than {@link List Lists}.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> 
	 * </a>
	 * 
	 * ### Container properties
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
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Access element.
		 * Returns a value to the element at position <i>index</i> in the {@link IArrayContainer container}.</p>
		 *
		 * The function automatically checks whether <i>index</i> is within the bounds of valid elements 
		 * in the {@link IArrayContainer container}, throwing an {@link OutOfRange} exception if it is not (i.e., 
		 * if <i>index</i> is greater or equal than its {@link size}).
		 *
		 * @param index Position of an element in the 
		 *				If this is greater than or equal to the {@link IArrayContainer container} {@link size}, an 
		 *				exception of type {@link OutOfRange} is thrown. Notice that the first 
		 *				element has a position of 0 (not 1).
		 *
		 * @return The element at the specified position in the 
		 */
		at(index: number): T;

		/**
		 * Modify element.
		 * Replaces an element at the specified position (<i>index</i>) in this {@link IArrayContainer container} 
		 * with the specified element (<i>val</i>).
		 *
		 * The function automatically checks whether <i>index</i> is within the bounds of valid elements 
		 * in the {@link IArrayContainer container}, throwing an {@link OutOfRange} exception if it is not (i.e., if 
		 * <i>index</i> is greater or equal than its {@link size}).
		 * 
		 * @.param index A specified position of the value to replace.
		 * @param val A value to be stored at the specified position.
		 *
		 * @return The previous element had stored at the specified position.
		 */
		set(index: number, val: T): void;
	}

	/**
	 * Random-access iterator.
	 *
	 * {@link IArrayIterator Random-access iterators} are iterators that can be used to access elements at an 
	 * arbitrary offset position relative to the element they point to, offering the same functionality as pointers.
	 *
	 * {@link IArrayIterator Random-access iterators} are the most complete iterators in terms of functionality. 
	 * All pointer types are also valid {@link IArrayIterator random-access iterators}.
	 *
	 * There is not a single type of {@link IArrayIterator random-access iterator}: Each container may define its 
	 * own specific iterator type able to iterate through it and access its elements.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/linear_containers.png" style="max-width: 100%" /> 
	 * </a>
	 *
	 * @reference http://www.cplusplus.com/reference/iterator/RandomAccessIterator
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface IArrayIterator<T>
		extends ILinearIterator<T>
	{
		/**
		 * @inheritdoc
		 */
		source(): IArrayContainer<T>;

		/**
		 * Get index, sequence number of the iterator in the source {@link IArrayContainer array}.
		 *
		 * @return Sequence number of the iterator in the source {@link IArrayContainer array}.
		 */
		index(): number;

		/**
		 * @inheritdoc
		 */
		prev(): IArrayIterator<T>;

		/**
		 * @inheritdoc
		 */
		next(): IArrayIterator<T>;
	}
}