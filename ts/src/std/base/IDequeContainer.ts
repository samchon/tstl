/// <reference path="../API.ts" />

namespace std.base
{
	/**
	 * <p> An interface for deque  </p>
	 * 
	 * <p> <a href="D:/Homepage/samchon.github.io/typescript-stl/images/class_diagram/linear_containers.png" target="_blank"> 
	 * <img src="D:/Homepage/samchon.github.io/typescript-stl/images/class_diagram/linear_containers.png" style="max-width: 100%" /> 
	 * </a> </p>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface IDequeContainer<T> 
		extends ILinearContainer<T>
	{
		/**
		 * <p> Insert element at beginning. </p>
		 *
		 * <p> Inserts a new element at the beginning of the {@link IDeque container}, right before its 
		 * current first element. This effectively increases the {@link IDeque container} {@link size} by 
		 * one. </p>
		 *
		 * @param val Value to be inserted as an element.
		 */
		push_front(val: T): void;

		/**
		 * <p> Delete first element. </p>
		 * 
		 * <p> Removes the first element in the {@link IDeque container}, effectively reducing its 
		 * {@link size} by one. </p>
		 */
		pop_front(): void;
	}
}