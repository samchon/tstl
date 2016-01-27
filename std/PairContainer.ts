/// <reference path="PairIterator.ts" />

/// <reference path="Pair.ts" />
/// <reference path="Exception.ts" />

namespace std
{
    export abstract class PairContainer<K, T>
    {
        /* ---------------------------------------------------------
		    CONSTRUCTORS
	    --------------------------------------------------------- */
        /**
         * Default Constructor.
         */
        public constructor();

        public constructor(container: PairContainer<K, T>);

        public constructor(begin: PairContainer<K, T>, end: PairContainer<K, T>);

        public constructor(...args: any[])
        {
            if (args.length == 1 &&args[0] instanceof PairContainer)
                this.assign(args[0].begin(), args[0].end());
            else if (args.length == 2 && args[0] instanceof PairContainer && args[1] instanceof PairContainer)
                this.assign(args[0], args[1]);
        }

        /**
         * <p> Assign new content to content. </p>
         *
         * <p> Assigns new contents to the Container, replacing its current contents, 
         * and modifying its size accordingly. </p>
         *
         * @param begin Input interator of the initial position in a sequence.
         * @param end Input interator of the final position in a sequence.
         */
        public abstract assign<L extends K, U extends T>
            (begin: PairIterator<L, U>, end: PairIterator<L, U>): void;

        /**
	     * <p> Clear content. </p>
         *
	     * <p> Removes all elements from the Container, leaving the container with a size of 0. </p>
	     */
        public abstract clear(): void;

        /* ---------------------------------------------------------
		    ACCESSORS
	    --------------------------------------------------------- */
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
        public abstract begin(): PairIterator<K, T>;

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
        public abstract end(): PairIterator<K, T>;

        /**
         * <p> Get iterator to element. </p>
         * 
         * <p> Searches the container for an element with a identifier equivalent to <code>key</code> and 
         * returns an iterator to it if found, otherwise it returns an iterator to <code>end()</code>. </p>
         *
         * <p> Two keys are considered equivalent if the container's comparison object returns false 
         * reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
         *
         * <p> Another member function, <code>has()</code>, can be used to just check whether 
         * a particular key exists. </p>
         *
         * @param key Key to be searched for
         * @return An iterator to the element, if an element with specified key is found, or Map::end() otherwise.
         */
        public abstract find(key: K): PairIterator<K, T>;

        /**
         * <p> Count elements with a specific key. </p>
         * <p> Searches the container for elements whose key is k and returns the number of elements found. </p>
         *
         * @param key Key value to be searched for.
         * @return The number of elements in the container with a <code>key</code>.
         */
        public abstract count(key: K): number;

        /**
         * @inheritdoc
         */
        public abstract size(): number;

        /**
         * Test whether the Container is empty.
         */
        public empty(): boolean
        {
            return this.size() == 0;
        }

        /* ---------------------------------------------------------
		    ELEMENTS I/O
	    --------------------------------------------------------- */
        public abstract erase(it: PairIterator<K, T>): PairIterator<K, T>;
        public abstract erase<L extends K, U extends T>
            (begin: PairIterator<L, U>, end: PairIterator<L, U>): PairIterator<K, T>;
    }
}