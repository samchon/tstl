/// <reference path="Iterator.ts" />
/// <reference path="Object.ts" />

namespace std
{
    export interface IContainer<T>
    {
        /* ---------------------------------------------------------------
            SEMI-CONSTRUCTORS
        --------------------------------------------------------------- */
        /**
         * <p> Assign new content to content. </p>
         *
         * <p> Assigns new contents to the Container, replacing its current contents, 
         * and modifying its size accordingly. </p>
         *
         * @param begin Input interator of the initial position in a sequence.
         * @param end Input interator of the final position in a sequence.
         */
        assign(begin: Iterator<T>, end: Iterator<T>): void;
        
        /**
	     * <p> Clear content. </p>
         *
	     * <p> Removes all elements from the Container, leaving the container with a size of 0. </p>
	     */
        clear(): void;

        /* ---------------------------------------------------------------
            ELEMENTS I/O
        --------------------------------------------------------------- */
        /**
         * Appends new elements to the container, and returns the new size of the Container.
         * 
         * @param items New elements to insert.
         * @return New size of the Container.
         */
        push<U extends T>(...items: U[]): number;

        /**
         * <p> Erase an element. </p>
         * <p> Removes from the Container a single element. </p>
         *
         * <p> This effectively reduces the container size by the number of elements removed. </p>
         *
         * @param position Iterator pointing to a single element to be removed from the Container.
         *
         * @return An iterator pointing to the element that followed the last element erased by the function 
         *         call. This is the container end if the operation erased the last element in the sequence.
         */
        erase(position: Iterator<T>): Iterator<T>;

        /**
         * <p> Erase elements. </p>
         * <p> Removes from the Container a range of elements. </p>
         *
         * <p> This effectively reduces the container size by the number of elements removed. </p>
         *
         * @param begin An iterator specifying a range of beginning to erase.
         * @param end An iterator specifying a range of end to erase.
         *
         * @return An iterator pointing to the element that followed the last element erased by the function 
         *         call. This is the container end if the operation erased the last element in the sequence.
         */
        erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;

        /* ---------------------------------------------------------------
            GETTERS
        --------------------------------------------------------------- */
        /**
	     * <p> Return iterator to beginning. </p>
	     * <p> Returns an iterator referring the first element in the Container. </p>
         *
         * <h4> Note </h4>
	     * <p> If the container is empty, the returned iterator is same with end(). </p>
	     *
	     * @return An iterator to the first element in the container.
	     *         The iterator containes the first element's value.
	     */
        begin(): Iterator<T>;

        /**
	     * <p> Return iterator to end. </p>
	     * <p> Returns an iterator referring to the past-the-end element in the Container. </p>
	     *
	     * <p> The past-the-end element is the theoretical element that would follow the last element in 
	     * the Container. It does not point to any element, and thus shall not be dereferenced. </p>
	     *
	     * <p> Because the ranges used by functions of the Container do not include the element reference 
	     * by their closing iterator, this function is often used in combination with Container::begin() to specify 
	     * a range including all the elements in the container. </p>
	     *
	     * <h4> Note </h4>
	     * <p> Returned iterator from Container.end() does not refer any element. Trying to accessing 
	     * element by the iterator will cause throwing exception (out of range). </p>
	     * <p> If the container is empty, this function returns the same as Container::begin(). </p>
         * 
         * @return An iterator to the end element in the container.
	     */
        end(): Iterator<T>;

        /**
         * Return the number of elements in the Container.
         */
        size(): number;

        /**
         * Test whether the Container is empty.
         */
        empty(): boolean;
    }
}