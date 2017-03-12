namespace std.base
{
	/**
	 * An interface for deque 
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/linear_containers.png" style="max-width: 100%" /> 
	 * </a>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface IDequeContainer<T> 
		extends ILinearContainer<T>
	{
		/**
		 * Insert element at beginning.
		 *
		 * Inserts a new element at the beginning of the {@link IDeque container}, right before its 
		 * current first element. This effectively increases the {@link IDeque container} {@link size} by 
		 * one.
		 *
		 * @param val Value to be inserted as an element.
		 */
		push_front(val: T): void;

		/**
		 * Delete first element.
		 * 
		 * Removes the first element in the {@link IDeque container}, effectively reducing its 
		 * {@link size} by one.
		 */
		pop_front(): void;
	}
}