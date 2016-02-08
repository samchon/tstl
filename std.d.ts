declare namespace std.base.container {
    /**
     * An abstract class containing elements.
     *
     * @author Jeongho Nam
     */
    abstract class Container<T> implements IContainer<T> {
        /**
         * Default Constructor
         */
        constructor();
        /**
         * <p> Copy Constructor. </p>
         *
         * <p> Constructs a container with a copy of each of the elements in <code>container</code>,
         * in the same order. </p>
         *
         * @param container Another Container object of the same type (with the same class template
         *                  arguments T), whose contents are either copied or acquired.
         */
        constructor(container: IContainer<T>);
        /**
         * <p> Construct from iterators of begin and end. </p>
         *
         * <p> Constructs a Container with as many elements as the range (begin, end), with each element
         * emplace-constructed from its corresponding element in that range, in the same order. </p>
         *
         * @param begin Input interator of the initial position in a sequence.
         * @param end Input interator of the final position in a sequence.
         */
        constructor(begin: Iterator<T>, end: Iterator<T>);
        /**
         * @inheritdoc
         */
        abstract assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        abstract push<U extends T>(...items: U[]): number;
        /**
         * @inheritdoc
         */
        abstract erase(position: Iterator<T>): Iterator<T>;
        /**
         * @inheritdoc
         */
        abstract erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
        /**
         * @inheritdoc
         */
        abstract begin(): Iterator<T>;
        /**
         * @inheritdoc
         */
        abstract end(): Iterator<T>;
        /**
         * @inheritdoc
         */
        abstract size(): number;
        /**
         * @inheritdoc
         */
        empty(): boolean;
    }
}
declare namespace std.base.hash {
    const MIN_SIZE: number;
    const RATIO: number;
    const MAX_RATIO: number;
    function code(par: any): number;
}
declare namespace std.base.hash {
    class HashBuckets<T> {
        private matrix;
        private itemSize_;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Reserve the bucket size.
         *
         * @param size Number of bucket size to reserve.
         */
        reserve(size: any): void;
        clear(): void;
        size(): number;
        itemSize(): number;
        at(index: number): Vector<T>;
        private hashIndex(val);
        insert(val: T): void;
        erase(val: T): void;
    }
}
declare namespace std.base.container {
    interface IContainer<T> {
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
        /**
         * <p> Return iterator to beginning. </p>
         * <p> Returns an iterator referring the first element in the Container. </p>
         *
         * <h4> Note </h4>
         * <p> If the container is empty, the returned iterator is same with end(). </p>
         *
         * @return An iterator to the first element in the container.
         * The iterator containes the first element's value.
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
         * call. This is the container end if the operation erased the last element in the sequence.
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
         * call. This is the container end if the operation erased the last element in the sequence.
         */
        erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
    }
}
declare namespace std.base.container {
    abstract class MapContainer<K, T> {
        protected data: List<Pair<K, T>>;
        /**
         * Default Constructor.
         */
        constructor();
        protected constructByArray(items: Array<Pair<K, T>>): void;
        protected constructByContainer(container: MapContainer<K, T>): void;
        protected constructByRange(begin: MapIterator<K, T>, end: MapIterator<K, T>): void;
        /**
         * <p> Assign new content to content. </p>
         *
         * <p> Assigns new contents to the Container, replacing its current contents,
         * and modifying its size accordingly. </p>
         *
         * @param begin Input interator of the initial position in a sequence.
         * @param end Input interator of the final position in a sequence.
         */
        assign<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        /**
         * <p> Clear content. </p>
         *
         * <p> Removes all elements from the Container, leaving the container with a size of 0. </p>
         */
        clear(): void;
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
        abstract find(key: K): MapIterator<K, T>;
        /**
         * <p> Return iterator to beginning. </p>
         * <p> Returns an iterator referring the first element in the Container. </p>
         *
         * <h4> Note </h4>
         * <p> If the container is empty, the returned iterator is same with end(). </p>
         *
         * @return An iterator to the first element in the container.
         * The iterator containes the first element's value.
         */
        begin(): MapIterator<K, T>;
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
        end(): MapIterator<K, T>;
        /**
         * <p> Whether have the item or not. </p>
         * <p> Indicates whether a map has an item having the specified identifier. </p>
         *
         * @param key Key value of the element whose mapped value is accessed.
         *
         * @return Whether the map has an item having the specified identifier.
         */
        has(key: K): boolean;
        /**
         * <p> Count elements with a specific key. </p>
         * <p> Searches the container for elements whose key is k and returns the number of elements found. </p>
         *
         * @param key Key value to be searched for.
         *
         * @return The number of elements in the container with a <code>key</code>.
         */
        abstract count(key: K): number;
        /**
         * Return the number of elements in the map.
         */
        size(): number;
        /**
         * Test whether the Container is empty.
         */
        empty(): boolean;
        insert(hint: MapIterator<K, T>, pair: Pair<K, T>): MapIterator<K, T>;
        insert<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        protected abstract insertByPair<L extends K, U extends T>(pair: Pair<L, U>): any;
        private insertByHint(hint, pair);
        protected insertByRange<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        erase(key: K): number;
        erase(it: MapIterator<K, T>): MapIterator<K, T>;
        erase(begin: MapIterator<K, T>, end: MapIterator<K, T>): MapIterator<K, T>;
        private eraseByKey(key);
        private eraseByIterator(it);
        private eraseByRange(begin, end);
        protected abstract handleInsert(item: MapIterator<K, T>): void;
        protected abstract handleErase(item: MapIterator<K, T>): void;
    }
}
declare namespace std.base.hash {
    class MapHashBuckets<K, T> extends HashBuckets<MapIterator<K, T>> {
        private map;
        constructor(map: container.MapContainer<K, T>);
        find(key: K): MapIterator<K, T>;
    }
}
declare namespace std.base.container {
    abstract class MultiMap<K, T> extends MapContainer<K, T> {
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * @inheritdoc
         */
        count(key: K): number;
        insert<L extends K, U extends T>(pair: Pair<L, U>): MapIterator<K, T>;
        /**
         * @inheritdoc
         */
        insert(hint: MapIterator<K, T>, pair: Pair<K, T>): MapIterator<K, T>;
        /**
         * @inheritdoc
         */
        insert<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
    }
}
declare namespace std.base.container {
    /**
     * Abstract Set.
     *
     * @author Jeongho Nam
     */
    abstract class SetContainer<T> extends Container<T> {
        protected data: List<T>;
        /**
         * Default Constructor.
         */
        constructor();
        protected constructByArray(items: Array<T>): void;
        protected constructByContainer(container: Container<T>): void;
        protected constructByRange(begin: Iterator<T>, end: Iterator<T>): void;
        /**
         * @inheritdoc
         */
        assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * <p> Get iterator to element. </p>
         *
         * <p> Searches the container for an element with <code>key</code> as value and returns an iterator to it
         * if found, otherwise it returns an iterator to <code>end()</code> (the element past the end of the
         * container). </p>
         *
         * <p> Another member function, <code>count()</code>, can be used to just check whether a particular
         * element exists. </p>
         *
         * @param key Key to be searched for.
         *
         * @return An iterator to the element, if the specified value is found,
         *         or <code>end()</code> if it is not found in the container.
         */
        abstract find(val: T): Iterator<T>;
        /**
         * @inheritdoc
         */
        begin(): Iterator<T>;
        /**
         * @inheritdoc
         */
        end(): Iterator<T>;
        /**
         * <p> Whether have the item or not. </p>
         * <p> Indicates whether a set has an item having the specified identifier. </p>
         *
         * @param key Key value of the element whose mapped value is accessed.
         *
         * @return Whether the set has an item having the specified identifier.
         */
        has(val: T): boolean;
        /**
         * <p> Count elements with a specific key. </p>
         * <p> Searches the container for elements with a value of k and returns the number of elements found. </p>
         *
         * @param key Value of the elements to be counted.
         *
         * @return The number of elements in the container with a <code>key</code>.
         */
        abstract count(val: T): number;
        /**
         * @inheritdoc
         */
        size(): number;
        push<U extends T>(...args: U[]): number;
        /**
         * <p> Insert element with hint. </p>
         *
         * <p> Extends the container by inserting new elements, effectively increasing the container size by the
         * number of elements inserted. </p>
         *
         * @param hint Hint for the position where the element can be inserted.
         * @param key Value to be inserted as an elements.
         *
         * @return An iterator pointing to either the newly inserted element or
         *         to the element that already had its same value in the set.
         */
        insert(hint: Iterator<T>, val: T): Iterator<T>;
        /**
         * <p> Insert elements with a range of a container. </p>
         *
         * <p> Extends the container by inserting new elements, effectively increasing the container size by the
         * number of elements inserted. </p>
         *
         * @param begin An iterator specifying range of the begining element.
         * @param end An iterator specifying range of the ending element.
         */
        insert<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;
        protected abstract insertByVal(val: T): any;
        private insertByHint(hint, val);
        protected insertByRange(begin: Iterator<T>, end: Iterator<T>): void;
        /**
         * <p> Erase an element. </p>
         * <p> Removes from the set container the elements whose value is <code>key</code>. </p>
         *
         * <p> This effectively reduces the container size by the number of elements removed. </p>
         *
         * @param key Value of the elements to be erased.
         *
         * @return Number of elements erased.
         */
        erase(val: T): number;
        /**
         * @inheritdoc
         */
        erase(it: Iterator<T>): Iterator<T>;
        /**
         * <p> Erase elements. </p>
         * <p> Removes from the set container a range of elements.. </p>
         *
         * <p> This effectively reduces the container size by the number of elements removed. </p>
         *
         * @param begin An iterator specifying a range of beginning to erase.
         * @param end An iterator specifying a range of end to erase.
         */
        erase(begin: Iterator<T>, end: Iterator<T>): Iterator<T>;
        private eraseByKey(val);
        private eraseByIterator(it);
        private eraseByRange(begin, end);
        protected abstract handleInsert(item: SetIterator<T>): void;
        protected abstract handleErase(item: SetIterator<T>): void;
    }
}
declare namespace std.base.container {
    abstract class MultiSet<T> extends SetContainer<T> {
        /**
         * Default Constructor.
         */
        constructor();
        count(val: T): number;
        insert(val: T): Iterator<T>;
        insert(hint: Iterator<T>, val: T): Iterator<T>;
        insert<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
    }
}
declare namespace std.base.hash {
    class SetHashBuckets<T> extends HashBuckets<SetIterator<T>> {
        private set;
        constructor(set: container.SetContainer<T>);
        find(val: T): SetIterator<T>;
    }
}
declare namespace std.base.tree {
    class Color {
        static BLACK: boolean;
        static RED: boolean;
    }
}
declare namespace std.base.tree {
    abstract class XTree<T> {
        protected root: XTreeNode<T>;
        protected size_: number;
        /**
         * Default Constructor
         */
        constructor();
        size(): number;
        find(val: T): XTreeNode<T>;
        private fetchMaximum(node);
        debug(): void;
        abstract isEquals(left: T, right: T): boolean;
        abstract isLess(left: T, right: T): boolean;
        insert(val: T): void;
        private insertCase1(node);
        private insertCase2(node);
        private insertCase3(node);
        private insertCase4(node);
        private insertCase5(node);
        erase(val: T): void;
        private eraseCase1(node);
        private eraseCase2(node);
        private eraseCase3(node);
        private eraseCase4(node);
        private eraseCase5(node);
        private eraseCase6(node);
        private rotateLeft(node);
        private rotateRight(node);
        private replaceNode(oldNode, newNode);
        private fetchColor(node);
    }
}
declare namespace std.base.tree {
    class PairTree<K, T> extends XTree<MapIterator<K, T>> {
        /**
         * Default Constructor.
         */
        constructor();
        find(key: K): XTreeNode<MapIterator<K, T>>;
        find(it: MapIterator<K, T>): XTreeNode<MapIterator<K, T>>;
        private findByKey(key);
        isEquals(left: MapIterator<K, T>, right: MapIterator<K, T>): boolean;
        isLess(left: MapIterator<K, T>, right: MapIterator<K, T>): boolean;
    }
}
declare namespace std.base.tree {
    class AtomicTree<T> extends XTree<SetIterator<T>> {
        /**
         * Default Constructor.
         */
        constructor();
        find(val: T): XTreeNode<SetIterator<T>>;
        find(it: SetIterator<T>): XTreeNode<SetIterator<T>>;
        private findByVal(val);
        isEquals(left: SetIterator<T>, right: SetIterator<T>): boolean;
        isLess(left: SetIterator<T>, right: SetIterator<T>): boolean;
    }
}
declare namespace std.base.tree {
    /**
     * Reference: http://jiniya.net/tt/444
     */
    class XTreeNode<T> {
        parent: XTreeNode<T>;
        left: XTreeNode<T>;
        right: XTreeNode<T>;
        value: T;
        color: boolean;
        constructor(value: T, color: boolean);
        grandParent: XTreeNode<T>;
        sibling: XTreeNode<T>;
        uncle: XTreeNode<T>;
        debug(header?: string, level?: number): void;
    }
}
declare namespace std.base.container {
    abstract class UniqueMap<K, T> extends MapContainer<K, T> {
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * @inheritdoc
         */
        count(key: K): number;
        insert<L extends K, U extends T>(pair: Pair<L, U>): Pair<MapIterator<K, T>, boolean>;
        /**
         * @inheritdoc
         */
        insert(hint: MapIterator<K, T>, pair: Pair<K, T>): MapIterator<K, T>;
        /**
         * @inheritdoc
         */
        insert<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
    }
}
declare namespace std.base.container {
    abstract class UniqueSet<T> extends SetContainer<T> {
        /**
         * Default Constructor.
         */
        constructor();
        count(key: T): number;
        insert(val: T): Pair<Iterator<T>, boolean>;
        insert(hint: Iterator<T>, val: T): Iterator<T>;
        insert<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
    }
}
declare namespace std {
    class Bind<Listener extends Function, This extends Object> {
        protected func: Listener;
        protected thisArg: This;
        constructor(func: Listener, thisArg: This);
        apply(...args: any[]): any;
        equals<U extends Listener, T extends This>(obj: Bind<U, T>): boolean;
    }
}
declare namespace std.example {
    class ContainerTest {
        constructor();
        private testList();
        private testUnorderedSet();
        private testUnorderedMap();
        static main(): void;
    }
}
declare namespace std {
    /**
     * <p> Standard exception class. </p>
     * <p> Base class for standard exceptions. </p>
     *
     * <p> All objects thrown by components of the standard library are derived from this class.
     * Therefore, all standard exceptions can be caught by catching this type by reference. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/exception/exception/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    class Exception {
        /**
         * A message representing specification about the Exception.
         */
        protected message: string;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what: string);
        /**
         * <p> Get string identifying exception. </p>
         * <p> Returns a string that may be used to identify the exception. </p>
         *
         * <p> The particular representation pointed by the returned value is implementation-defined.
         * As a virtual function, derived classes may redefine this function so that specify value are
         * returned. </p>
         */
        what(): string;
    }
    /**
     * <p> Logic error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report errors in the internal
     * logical of the program, such as violation of logical preconditions or class invariants. </p>
     *
     * <p> These errors are presumably detectable before the program executes. </p>
     *
     * <p> It is used as a base class for several logical error exceptions. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/stdexcept/logic_error/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    class LogicError extends Exception {
        constructor(what: string);
    }
    class DomainError extends LogicError {
        constructor(what: string);
    }
    class InvalidArgument extends LogicError {
        constructor(what: string);
    }
    class LengthError extends LogicError {
        constructor(what: string);
    }
    class OutOfRange extends LogicError {
        constructor(what: string);
    }
    /**
     * <p> Runtime error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report errors that can only be
     * detected during runtime. </p>
     *
     * <p> It is used as a base class for several runtime error exceptions. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/stdexcept/runtime_error/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    class RuntimeError extends Exception {
        constructor(what: string);
    }
    class OverflowError extends RuntimeError {
        constructor(what: string);
    }
    class UnderflowError extends RuntimeError {
        constructor(what: string);
    }
    class RangeError extends RuntimeError {
        constructor(what: string);
    }
    class SystemError extends RuntimeError {
        constructor(what: string);
    }
}
declare namespace std {
    abstract class Iterator<T> {
        protected source: base.container.Container<T>;
        /**
         * Construct from the source Container.
         *
         * @param source The source Container.
         */
        constructor(source: base.container.Container<T>);
        /**
         * <p> Get iterator to previous element. </p>
         * <p> If current iterator is the first item(equal with <code>begin()</code>), returns <code>end()</code>. </p>
         *
         * @return An iterator of the previous item.
         */
        abstract prev(): Iterator<T>;
        /**
         * <p> Get iterator to next element. </p>
         * <p> If current iterator is the last item, returns <code>end()</code>. </p>
         *
         * @return An iterator of the next item.
         */
        abstract next(): Iterator<T>;
        /**
         * Advances the Iterator by n element positions.
         *
         * @param n Number of element positions to advance.
         * @return An advanced Iterator.
         */
        advance(n: number): Iterator<T>;
        /**
         * Get source.
         */
        getSource(): base.container.Container<T>;
        /**
         * <p> Whether an iterator is equal with the iterator. </p>
         *
         * <p> Compare two iterators and returns whether they are equal or not. </p>
         *
         *
         * <h4> Note </h4>
         *
         * <p> Iterator's equals() only compare souce map and index number. </p>
         *
         * <p> Although elements in a pair, key and value are equals, if the source map or
         * index number is different, then the equals() will return false. If you want to
         * compare the elements of a pair, compare them directly by yourself. </p>
         *
         * @param obj An iterator to compare
         * @return Indicates whether equal or not.
         */
        equals<U extends T>(obj: Iterator<U>): boolean;
        /**
         * <p> Get value of the iterator is pointing. </p>
         *
         * @return A value of the iterator.
         */
        /**
         * <p> Set value of the iterator is pointing. </p>
         *
         * @param val A new value of the iterator.
         */
        value: T;
    }
}
declare namespace std {
    /**
     * <p> Lists are sequence containers that allow constant time insert and erase operations anywhere
     * within the sequence, and iteration in both directions. </p>
     *
     * <p> List containers are implemented as doubly-linked lists; Doubly linked lists can store each of
     * the elements they contain in different and unrelated storage locations. The ordering is kept
     * internally by the association to each element of a link to the element preceding it and a link to
     * the element following it. </p>
     *
     * <p> They are very similar to forward_list: The main difference being that forward_list objects are
     * single-linked lists, and thus they can only be iterated forwards, in exchange for being somewhat
     * smaller and more efficient. </p>
     *
     * <p> Compared to other base standard sequence containers (array, vector and deque), lists perform
     * generally better in inserting, extracting and moving elements in any position within the container
     * for which an iterator has already been obtained, and therefore also in algorithms that make
     * intensive use of these, like sorting algorithms. </p>
     *
     * <p> The main drawback of lists and forward_lists compared to these other sequence containers is that
     * they lack direct access to the elements by their position; For example, to access the sixth element
     * in a list, one has to iterate from a known position (like the beginning or the end) to that position,
     * which takes linear time in the distance between these. They also consume some extra memory to keep
     * the linking information associated to each element (which may be an important factor for large lists
     * of small-sized elements). </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference: http://www.cplusplus.com/reference/list/list/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    class List<T> extends base.container.Container<T> {
        /**
         * An iterator of beginning.
         */
        protected begin_: ListIterator<T>;
        /**
         * An iterator of end.
         */
        protected end_: ListIterator<T>;
        /**
         * Number of elements in the List.
         */
        protected size_: number;
        /**
         * Default Constructor
         */
        constructor();
        /**
         * Construct from arguments.
         *
         * @param args
         */
        constructor(items: Array<T>);
        constructor(size: number, val: T);
        /**
         * Copy Constructor.
         *
         * @param container
         */
        constructor(container: base.container.IContainer<T>);
        /**
         * Construct from begin and end iterators.
         *
         * @param begin
         * @param end
         */
        constructor(begin: Iterator<T>, end: Iterator<T>);
        assign(size: number, val: T): void;
        /**
         * @inheritdoc
         */
        assign(begin: Iterator<T>, end: Iterator<T>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        begin(): Iterator<T>;
        /**
         * @inheritdoc
         */
        end(): Iterator<T>;
        /**
         * @inheritdoc
         */
        size(): number;
        /**
         * <p> Access first element. </p>
         * <p> Returns a value in the first element of the List. </p>
         *
         * <p> Unlike member <code>List.end()</code>, which returns an iterator just past this element,
         * this function returns a direct value. </p>
         *
         * <p> Calling this function on an empty container causes undefined behavior. </p>
         *
         * @return A value in the first element of the List.
         */
        front(): T;
        /**
         * <p> Access last element. </p>
         * <p> Returns a value in the last element of the List. </p>
         *
         * <p> Unlike member <code>List.end()</code>, which returns an iterator just past this element,
         * this function returns a direct value. </p>
         *
         * <p> Calling this function on an empty container causes undefined behavior. </p>
         *
         * @return A value in the last element of the List.
         */
        back(): T;
        /**
         * @inheritdoc
         */
        push(...items: T[]): number;
        /**
         * <p> Insert element at beginning. </p>
         *
         * <p> Inserts a new element at the beginning of the list, right before its current first element.
         * This effectively increases the container size by one. </p>
         *
         * @param val Value to be inserted as an element.
         */
        pushFront(val: T): void;
        /**
         * <p> Add element at the end. </p>
         *
         * <p> Adds a new element at the lend of the <code>List</code> container, after its current last
         * element.This effectively increases the container size by one. </p>
         *
         * @param val Value to be inserted as an element.
         */
        pushBack(val: T): void;
        /**
         * <p> Delete first element. </p>
         *
         * <p> Removes first last element in the List container, effectively reducing the container
         * <code>size</code> by one. </p>
         */
        popFront(): void;
        /**
         * <p> Delete last element. </p>
         *
         * <p> Removes the last element in the List container, effectively reducing the container
         * <code>size</code> by one. </p>
         */
        popBack(): void;
        /**
         * <p> Insert an element. </p>
         *
         * <p> The container is extended by inserting a new element before the element at the specified
         * <code>position</code>. This effectively increases the List size by the amount of elements inserted. </p>
         *
         * <p> Unlike other standard sequence containers, <code>List</code> is specifically designed to be
         * efficient inserting and removing elements in any position, even in the middle of the sequence. </p>
         *
         * <p> The arguments determine how many elements are inserted and to which values they are initialized. </p>
         *
         * @param position Position in the container where the new element is inserted.
         *                 <code>iterator</code> is a member type, defined as a <code>bidirectional iterator</code>
         *                 type that points to elements.
         * @param val Value to be inserted as an element.
         *
         * @return An iterator that points to the newly inserted element <code>val</code>.
         */
        insert(position: Iterator<T>, val: T): Iterator<T>;
        /**
         * <p> Insert elements by repeated filling. </p>
         *
         * @param position Position in the container where the new elements are inserted.
         *                 <code>iterator</code> is a member type, defined as a <code>bidirectional iterator</code>
         *                 type that points to elements.
         * @param size Number of elements to insert.
         * @param val Value to be inserted as an element.
         *
         * @return An iterator that points to the first of the newly inserted elements.
         */
        insert(position: Iterator<T>, size: number, val: T): Iterator<T>;
        /**
         *
         * @param position Position in the container where the new elements are inserted.
         *                 <code>iterator</code> is a member type, defined as a <code>bidirectional iterator</code>
         *                 type that points to elements.
         * @param begin An iterator specifying range of the begining element.
         * @param end An iterator specifying range of the ending element.
         *
         * @return An iterator that points to the first of the newly inserted elements.
         */
        insert(position: Iterator<T>, begin: Iterator<T>, end: Iterator<T>): Iterator<T>;
        private insertByVal(position, val);
        private insertByRepeatingVal(position, size, val);
        private insertByRange(position, begin, end);
        /**
         * @inheritdoc
         */
        erase(it: Iterator<T>): Iterator<T>;
        /**
         * @inheritdoc
         */
        erase(begin: Iterator<T>, end: Iterator<T>): Iterator<T>;
        private eraseByIterator(it);
        private eraseByRange(begin, end);
    }
}
declare namespace std {
    class ListIterator<T> extends Iterator<T> {
        protected value_: T;
        protected prev_: ListIterator<T>;
        protected next_: ListIterator<T>;
        /**
         * <p> Construct from source List. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in List instead. </p>
         *
         * @param list The source vector to reference.
         */
        constructor(source: List<T>, prev: ListIterator<T>, next: ListIterator<T>, value: T);
        /**
         * @inheritdoc
         */
        setPrev(prev: ListIterator<T>): void;
        /**
         * @inheritdoc
         */
        setNext(next: ListIterator<T>): void;
        /**
         * @inheritdoc
         */
        equals(obj: Iterator<T>): boolean;
        /**
         * @inheritdoc
         */
        prev(): Iterator<T>;
        /**
         * @inheritdoc
         */
        next(): Iterator<T>;
        /**
         * @inheritdoc
         */
        /**
         * @inheritdoc
         */
        value: T;
    }
}
declare namespace std {
    class Map<K, T> extends base.container.UniqueMap<K, T> {
        private tree;
        /**
         * Default Constructor
         */
        constructor();
        constructor(array: Array<Pair<K, T>>);
        constructor(container: base.container.MapContainer<K, T>);
        constructor(begin: MapIterator<K, T>, end: MapIterator<K, T>);
        /**
         * @inheritdoc
         */
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(key: K): MapIterator<K, T>;
        protected insertByPair<L extends K, U extends T>(pair: Pair<L, U>): any;
        /**
         * @inheritdoc
         */
        protected handleInsert(item: MapIterator<K, T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(item: MapIterator<K, T>): void;
    }
}
declare namespace std {
    class MapIterator<K, T> {
        protected source: base.container.MapContainer<K, T>;
        protected listIterator: ListIterator<Pair<K, T>>;
        /**
         * Construct from the source PairContainer.
         *
         * @param source The source PairContainer.
         */
        constructor(source: base.container.MapContainer<K, T>, listIterator: ListIterator<Pair<K, T>>);
        /**
         * Get listIterator.
         */
        getListIterator(): ListIterator<Pair<K, T>>;
        /**
         * Get iterator to previous element.
         */
        prev(): MapIterator<K, T>;
        /**
         * Get iterator to next element.
         */
        next(): MapIterator<K, T>;
        /**
         * Advances the Iterator by n element positions.
         *
         * @param n Number of element positions to advance.
         * @return An advanced Iterator.
         */
        advance(n: number): MapIterator<K, T>;
        /**
         * Get source.
         */
        getSource(): base.container.MapContainer<K, T>;
        /**
         * Get first, key element.
         */
        first: K;
        /**
         * Get second, value element.
         */
        second: T;
        equals<L extends K, U extends T>(obj: MapIterator<L, U>): boolean;
        less<L extends K, U extends T>(obj: MapIterator<L, U>): boolean;
        hashCode(): number;
    }
}
declare namespace std {
    class MultiMap<K, T> extends base.container.MultiMap<K, T> {
        private tree;
        /**
         * Default Constructor
         */
        constructor();
        constructor(array: Array<Pair<K, T>>);
        constructor(container: base.container.MapContainer<K, T>);
        constructor(begin: MapIterator<K, T>, end: MapIterator<K, T>);
        /**
         * @inheritdoc
         */
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(key: K): MapIterator<K, T>;
        protected insertByPair<L extends K, U extends T>(pair: Pair<L, U>): any;
        /**
         * @inheritdoc
         */
        protected handleInsert(item: MapIterator<K, T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(item: MapIterator<K, T>): void;
    }
}
declare namespace std {
    class MultiSet<T> extends base.container.MultiSet<T> {
        private tree;
        constructor();
        constructor(array: Array<T>);
        constructor(container: base.container.Container<T>);
        constructor(begin: Iterator<T>, end: Iterator<T>);
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(val: T): Iterator<T>;
        protected insertByVal(val: T): any;
        /**
         * @inheritdoc
         */
        protected handleInsert(item: SetIterator<T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(item: SetIterator<T>): void;
    }
}
declare namespace std {
    /**
     * <p> For equality comparison. </p>
     *
     * <p> Binary fucntion returns whether the arguments are equal. </p>
     *
     * @param <T> Type of arguments to compare.
     *
     * @param first First element to compare.
     * @param second Second element to compare.
     *
     * @return Whether the arguments are equal.
     */
    function equals<T>(left: T, right: T): boolean;
    /**
     * <p> For less-than inequality comparison. </p>
     *
     * <p> Binary function returns whether the its first argument compares less than
     * the second. </p>
     *
     * <p> Objects of this class can be used on standard algorithms such as <code>sort</code>, <code>merge</code>. </p>
     *
     * @param <T> Type of arguments to compare.
     *
     * @param first First element, the standard of comparison.
     * @param second Second element compare with the first.
     *
     * @return Whether the first parameter is less than the second.
     */
    function less<T>(left: T, right: T): boolean;
    function greater<T>(left: T, right: T): boolean;
    function hashCode(par: any): number;
}
declare namespace std {
    /**
     * <p> A pair of values. </p>
     * <ul>
     *  <li> _Ty1: Type of member fisrt. </li>
     *  <li> _Ty2 Type of member second. </li>
     * </ul>
     *
     * <p> This class couples together a pair of values, which may be of different types
     * (_Ty1 and _Ty2). The individual values can be accessed through its public members
     * first and second. </p>
     *
     * <p> Same with std::pair (http://www.cplusplus.com/reference/utility/pair/) </p>
     *
     * @author Jeongho Nam
     */
    class Pair<T1, T2> {
        /**
         * <p> A first value in the Pair. </p>
         */
        first: T1;
        /**
         * <p> A second value in the Pair. </p>
         */
        second: T2;
        /**
         * <p> Construct from pair values. </p>
         *
         * @param first The first value of the Pair
         * @param second The second value of the Pair
         */
        constructor(first: T1, second: T2);
        /**
         * <p> Whether a Pair is equal with the Pair. <p>
         * <p> Compare each first and second value of two Pair(s) and returns whether they are equal or not. </p>
         *
         * <p> If stored key and value in a Pair are not number or string but an object like a class or struct,
         * the comparison will be executed by a member method (SomeObject)::equals(). If the object does not have
         * the member method equals(), only address of pointer will be compared. </p>
         *
         * @param obj A Map to compare
         * @return Indicates whether equal or not.
         */
        equals<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean;
        less<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean;
    }
}
declare namespace std {
    /**
     * <p> Set, in other word, Tree Set. </p>
     *
     * <p> Sets are containers that store unique elements following a specific order. </p>
     *
     * <p> In a set, the value of an element also identifies it (the value is itself the key, of type T), and each
     * value must be unique. The value of the elements in a set cannot be modified once in the container
     * (the elements are always const), but they can be inserted or removed from the container. </p>
     *
     * <p> Internally, the elements in a set are always sorted following a specific strict weak ordering criterion
     * indicated by its internal comparison object (of type Compare). </p>
     *
     * <p> Set containers are generally slower than unordered_set containers to access individual elements by
     * their key, but they allow the direct iteration on subsets based on their order. </p>
     *
     * <p> Sets are typically implemented as binary search trees. </p>
     *
      * <ul>
     *  <li> Designed by C++ Reference: http://www.cplusplus.com/reference/set/set/ </li>
     * </ul>
     *
     * @param <T> Type of the elements.
     *			  Each element in an <code>Set</code> is also uniquely identified by this value.
     *
     * @author Migrated by Jeongho Nam
     */
    class Set<T> extends base.container.UniqueSet<T> {
        private tree;
        /**
         * Default Constructor
         */
        constructor();
        constructor(array: Array<T>);
        constructor(container: base.container.Container<T>);
        constructor(begin: Iterator<T>, end: Iterator<T>);
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(val: T): Iterator<T>;
        protected insertByVal(val: T): any;
        /**
         * @inheritdoc
         */
        protected handleInsert(item: SetIterator<T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(item: SetIterator<T>): void;
    }
}
declare namespace std {
    /**
     * <p> An iterator of a Set. </p>
     *
     * @author Jeongho Nam
     */
    class SetIterator<T> extends Iterator<T> {
        private listIterator;
        /**
         * <p> Construct from source and index number. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in Map instead. </p>
         *
         * @param map The source Set to reference.
         * @param index Sequence number of the element in the source Set.
         */
        constructor(source: base.container.SetContainer<T>, it: ListIterator<T>);
        getListIterator(): ListIterator<T>;
        /**
         * @inheritdoc
         */
        prev(): Iterator<T>;
        /**
         * @inheritdoc
         */
        next(): Iterator<T>;
        /**
         * @inheritdoc
         */
        advance(size: number): Iterator<T>;
        /**
         * @inheritdoc
         */
        /**
         * @inheritdoc
         */
        value: T;
        /**
         * @inheritdoc
         */
        equals<U extends T>(obj: Iterator<U>): boolean;
        less<U extends T>(obj: Iterator<U>): boolean;
        hashCode(): number;
    }
}
declare namespace std {
    /**
     * <p> Unordered Map, another word, Hash Map. </p>
     *
     * <p> Unordered maps are associative containers that store elements formed by the combination of a key value
     * and a mapped value, and which allows for fast retrieval of individual elements based on their keys. </p>
     *
     * <p> In an <code>UnorderedMap</code>, the key value is generally used to uniquely identify the element,
     * while the mapped value is an object with the content associated to this key. Types of key and mapped
     * value may differ. </p>
     *
     * <p> Internally, the elements in the <code>UnorderedMap</code> are not sorted in any particular order with
     * respect to either their key or mapped values, but organized into buckets depending on their hash values to
     * allow for fast access to individual elements directly by their key values (with a constant average time
     * complexity on average). </p>
     *
     * <p> <code>UnorderedMap</code> containers are faster than map containers to access individual elements by
     * their key, although they are generally less efficient for range iteration through a subset of their
     * elements. </p>
     *
     * <p> Unordered maps implement the direct access operator (<code>get()</code>) which allows for direct access
     * of the mapped value using its key value as argument. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference: http://www.cplusplus.com/reference/unordered_map/unordered_map/ </li>
     * </ul>
     *
     * @param <K> Type of the key values.
     *			  Each element in an <code>UnorderedMap</code> is uniquely identified by its key value.
     * @param <T> Type of the mapped value.
     *			  Each element in an <code>UnorderedMap</code> is used to store some data as its mapped value.
     *
     * @author Migrated by Jeongho Nam
     */
    class UnorderedMap<K, T> extends base.container.UniqueMap<K, T> {
        private hashBuckets;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from elements.
         */
        constructor(array: Array<Pair<K, T>>);
        /**
         * Copy Constructor.
         */
        constructor(container: base.container.MapContainer<K, T>);
        /**
         * Construct from range iterators.
         */
        constructor(begin: MapIterator<K, T>, end: MapIterator<K, T>);
        protected constructByArray(items: Array<Pair<K, T>>): void;
        /**
         * @inheritdoc
         */
        assign<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(key: K): MapIterator<K, T>;
        protected insertByPair<L extends K, U extends T>(pair: Pair<L, U>): any;
        protected insertByRange<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        /**
         * @inheritdoc
         */
        protected handleInsert(it: MapIterator<K, T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(it: MapIterator<K, T>): void;
    }
}
declare namespace std {
    /**
     * <p> Unordered Multimap, in another word, Hashed MultiMap. </p>
     *
     * <p> Unordered multimaps are associative containers that store elements formed by the combination of
     * a key value and a mapped value, much like UnorderedMap containers, but allowing different elements to
     * have equivalent keys. </p>
     *
     * <p> In an UnorderedMultiMap, the key value is generally used to uniquely identify the element, while
     * the mapped value is an object with the content associated to this key. Types of key and mapped value
     * may differ. </p>
     *
     * <p> Internally, the elements in the unordered_multimap are not sorted in any particular order with
     * respect to either their key or mapped values, but organized into buckets depending on their hash values
     * to allow for fast access to individual elements directly by their key values (with a constant average
     * time complexity on average). </p>
     *
     * <p> Elements with equivalent keys are grouped together in the same bucket and in such a way that
     * an iterator (see equal_range) can iterate through all of them. Iterators in the container are doubly
     * linked iterators. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference: http://www.cplusplus.com/reference/unordered_map/unordered_multimap/ </li>
     * </ul>
     *
     * @param <K> Type of the key values.
     *			  Each element in an UnorderedMultiMap is identified by a key value.
     * @param <T> Type of the mapped value.
     *			  Each element in an UnorderedUnorderedMap is used to store some data as its mapped value.
     *
     * @author Migrated by Jeongho Nam
     */
    class UnorderedMultiMap<K, T> extends base.container.MultiMap<K, T> {
        private hashBuckets;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from elements.
         */
        constructor(array: Array<Pair<K, T>>);
        /**
         * Copy Constructor.
         */
        constructor(container: base.container.MapContainer<K, T>);
        /**
         * Construct from range iterators.
         */
        constructor(begin: MapIterator<K, T>, end: MapIterator<K, T>);
        protected constructByArray(items: Array<Pair<K, T>>): void;
        /**
         * @inheritdoc
         */
        assign<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(key: K): MapIterator<K, T>;
        protected insertByPair<L extends K, U extends T>(pair: Pair<L, U>): any;
        protected insertByRange<L extends K, U extends T>(begin: MapIterator<L, U>, end: MapIterator<L, U>): void;
        /**
         * @inheritdoc
         */
        protected handleInsert(it: MapIterator<K, T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(it: MapIterator<K, T>): void;
    }
}
declare namespace std {
    /**
     * <p> Unordered Multiset, in another word, Hashed MultiSet. </p>
     *
     * <p> Unordered multisets are containers that store elements in no particular order, allowing fast retrieval
     * of individual elements based on their value, much like UnorderedSet containers, but allowing different
     * elements to have equivalent values. </p>
     *
     * <p> In an UnorderedMultiSet, the value of an element is at the same time its key, used to identify it.
     * Keys are immutable, therefore, the elements in an unordered_multiset cannot be modified once in the
     * container - they can be inserted and removed, though. </p>
     *
     * <p> Internally, the elements in the unordered_multiset are not sorted in any particular, but organized
     * into buckets depending on their hash values to allow for fast access to individual elements directly by
     * their values (with a constant average time complexity on average). </p>
     *
     * <p> Elements with equivalent values are grouped together in the same bucket and in such a way that an
     * iterator can iterate through all of them. Iterators in the container are doubly linked iterators. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference: http://www.cplusplus.com/reference/unordered_set/unordered_multiset/ </li>
     * </ul>
     *
     * @param <T> Type of the elements.
     *           Each element in an <code>UnorderedMultiSet</code> is also identified by this value..
     *
     * @author Migrated by Jeongho Nam
     */
    class UnorderedMultiSet<T> extends base.container.MultiSet<T> {
        private hashBuckets;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from elements.
         */
        constructor(items: Array<T>);
        /**
         * Copy Constructor.
         */
        constructor(container: base.container.IContainer<T>);
        /**
         * Construct from range iterators.
         */
        constructor(begin: Iterator<T>, end: Iterator<T>);
        protected constructByArray(items: Array<T>): void;
        /**
         * @inheritdoc
         */
        assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(val: T): Iterator<T>;
        protected insertByVal(val: T): any;
        protected insertByRange(begin: Iterator<T>, end: Iterator<T>): void;
        /**
         * @inheritdoc
         */
        protected handleInsert(it: SetIterator<T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(it: SetIterator<T>): void;
    }
}
declare namespace std {
    /**
     * <p> Unordered Set, in other other, Hash Set. </p>
     *
     * <p> Unordered sets are containers that store unique elements in no particular order, and which allow for
     * fast retrieval of individual elements based on their value. </p>
     *
     * <p> In an <code>UnorderedSet</code>, the value of an element is at the same time its key, that identifies
     * it uniquely. Keys are immutable, therefore, the elements in an <code>UnorderedSet</code> cannot be modified
     * once in the container - they can be inserted and removed, though. </p>
     *
     * <p> Internally, the elements in the <code>UnorderedSet</code> are not sorted in any particular order, but
     * organized into buckets depending on their hash values to allow for fast access to individual elements directly
     * by their values (with a constant average time complexity on average). </p>
     *
     * <p> <code>UnorderedSet</code> containers are faster than <codeSet<code> containers to access individual
     * elements by their key, although they are generally less efficient for range iteration through a subset of
     * their elements. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference: http://www.cplusplus.com/reference/unordered_set/unordered_set/ </li>
     * </ul>
     *
     * @param <T> Type of the elements.
     *			  Each element in an <code>UnorderedSet</code> is also uniquely identified by this value.
     *
     * @author Migrated by Jeongho Nam
     */
    class UnorderedSet<T> extends base.container.UniqueSet<T> {
        private hashBuckets;
        /**
         * Default Constructor.
         */
        constructor();
        /**
         * Construct from elements.
         */
        constructor(items: Array<T>);
        /**
         * Copy Constructor.
         */
        constructor(container: base.container.IContainer<T>);
        /**
         * Construct from range iterators.
         */
        constructor(begin: Iterator<T>, end: Iterator<T>);
        protected constructByArray(items: Array<T>): void;
        /**
         * @inheritdoc
         */
        assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        find(val: T): Iterator<T>;
        protected insertByVal(val: T): any;
        protected insertByRange(begin: Iterator<T>, end: Iterator<T>): void;
        /**
         * @inheritdoc
         */
        protected handleInsert(item: SetIterator<T>): void;
        /**
         * @inheritdoc
         */
        protected handleErase(item: SetIterator<T>): void;
    }
}
declare namespace std {
    /**
     * <p> Vectors are sequence containers representing arrays that can change in size. </p>
     *
     * <p> Just like arrays, vectors use contiguous storage locations for their elements, which means that
     * their elements can also be accessed using offsets on regular pointers to its elements, and just as
     * efficiently as in arrays. But unlike arrays, their size can change dynamically, with their storage
     * being handled automatically by the container. </p>
     *
     * <p> Internally, Vectors use a dynamically allocated array to store their elements. This array may
     * need to be reallocated in order to grow in size when new elements are inserted, which implies
     * allocating a new array and moving all elements to it. This is a relatively expensive task in terms
     * of processing time, and thus, vectors do not reallocate each time an element is added to the
     * container. </p>
     *
     * <p> Instead, vector containers may allocate some extra storage to accommodate for possible growth,
     * and thus the container may have an actual capacity greater than the storage strictly needed to
     * contain its elements (i.e., its size). Libraries can implement different strategies for growth to
     * balance between memory usage and reallocations, but in any case, reallocations should only happen at
     * logarithmically growing intervals of size so that the insertion of individual elements at the end of
     * the vector can be provided with amortized constant time complexity. </p>
     *
     * <p> Therefore, compared to arrays, vectors consume more memory in exchange for the ability to manage
     * storage and grow dynamically in an efficient way. </p>
     *
     * <p> Compared to the other dynamic sequence containers (deques, lists and forward_lists), vectors are
     * very efficient accessing its elements (just like arrays) and relatively efficient adding or removing
     * elements from its end. For operations that involve inserting or removing elements at positions other
     * than the end, they perform worse than the others, and have less consistent iterators and references
     * than Lists. </p>
     *
     * <ul>
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/vector/vector/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    class Vector<T> extends Array<T> implements base.container.IContainer<T> {
        /**
         * Default Constructor
         */
        constructor();
        /**
         * Construct from arguments.
         *
         * @param args An array to be contained.
         */
        constructor(items: Array<T>);
        /**
         * Consturct from capacity size.
         *
         * @param n Capacity number of the Vector to reserve.
         */
        constructor(n: number);
        constructor(size: number, val: T);
        /**
         * <p> Copy Constructor. </p>
         *
         * <p> Constructs a container with a copy of each of the elements in <code>container</code>,
         * in the same order. </p>
         *
         * @param container Another Container object of the same type (with the same class template
         *                  arguments T), whose contents are either copied or acquired.
         */
        constructor(container: base.container.IContainer<T>);
        /**
         * Construct from begin and end iterators.
         *
         * @param begin
         * @param end
         */
        constructor(begin: Iterator<T>, end: Iterator<T>);
        /**
         * @inheritdoc
         */
        assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void;
        /**
         * <p> Assign Container content. </p>
         *
         * <p> Assigns new contents to the Container, replacing its current contents,
         * and modifying its size accordingly. </p>
         *
         * @param size New size of the container.
         * @param val Value to fill the container with. Each of the <u>size</u> elements in
         *            the container will be initialized to a copy of this value.
         */
        assign(size: number, val: T): void;
        /**
         * @inheritdoc
         */
        clear(): void;
        /**
         * @inheritdoc
         */
        begin(): Iterator<T>;
        /**
         * @inheritdoc
         */
        end(): Iterator<T>;
        /**
         * @inheritdoc
         */
        size(): number;
        /**
         * @inheritdoc
         */
        empty(): boolean;
        /**
         * <p> Access element. </p>
         * <p> Returns a value to the element at position <code>index</code> in the Vector.</p>
         *
         * <p> The function automatically checks whether n is within the bounds of valid elements in the
         * Vector, throwing an OutOfRange exception if it is not (i.e., if <code>index</code> is greater or
         * equal than its size). This is in contrast with member operator[], that does not check against
         * bounds. </p>
         *
         * @param index Position of an element in the container.
         *              If this is greater than or equal to the vector size, an exception of type OutOfRange
         *              is thrown. Notice that the first element has a position of 0 (not 1).
         *
         * @return The element at the specified position in the container.
         */
        at(index: number): T;
        /**
         * <p> Access first element. </p>
         * <p> Returns a value in the first element of the Vector. </p>
         *
         * <p> Unlike member <code>Vector.begin()</code>, which returns an iterator just past this element,
         * this function returns a direct value. </p>
         *
         * <p> Calling this function on an empty container causes undefined behavior. </p>
         *
         * @return A value in the first element of the Vector.
         */
        front(): T;
        /**
         * <p> Access last element. </p>
         * <p> Returns a value in the last element of the Vector. </p>
         *
         * <p> Unlike member <code>Vector.end()</code>, which returns an iterator just past this element,
         * this function returns a direct value. </p>
         *
         * <p> Calling this function on an empty container causes undefined behavior. </p>
         *
         * @return A value in the last element of the Vector.
         */
        back(): T;
        pushBack(element: T): void;
        /**
         * Replaces the element at the specified position in this list with the specified element.
         *
         * @param index A specified position of the value to replace.
         * @param val A value to be stored at the specified position.
         *
         * @return The previous element had stored at the specified position.
         */
        set(index: number, val: T): T;
        /**
         * <p> Delete last element. </p>
         *
         * <p> Removes the last element in the Vector container, effectively reducing the container
         * <code>size</code> by one. </p>
         */
        popBack(): void;
        insert(position: Iterator<T>, val: T): Iterator<T>;
        insert(position: Iterator<T>, size: number, val: T): Iterator<T>;
        insert<U extends T>(position: Iterator<T>, begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
        erase(it: Iterator<T>): Iterator<T>;
        erase<U extends T>(begin: Iterator<U>, end: Iterator<U>): Iterator<T>;
    }
}
declare namespace std {
    /**
     * <p> A bi-directional iterator of a Set. </p>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam
     */
    class VectorIterator<T> extends Iterator<T> {
        /**
         * <p> Sequence number of iterator in the source Vector. </p>
         */
        private index;
        /**
         * <p> Construct from source and index number. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in Vector instead. </p>
         *
         * @param vector The source vector to reference.
         * @param index Sequence number of the element in the surce vector.
         */
        constructor(source: Vector<T>, index: number);
        vector: Vector<T>;
        /**
         * @inheritdoc
         */
        /**
         * @inheritdoc
         */
        value: T;
        /**
         * @inheritdoc
         */
        equals<U extends T>(obj: Iterator<U>): boolean;
        /**
         * Get index.
         */
        getIndex(): number;
        /**
         * @inheritdoc
         */
        prev(): Iterator<T>;
        /**
         * @inheritdoc
         */
        next(): Iterator<T>;
        /**
         * @inheritdoc
         */
        advance(n: number): Iterator<T>;
    }
}
