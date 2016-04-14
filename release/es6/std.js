// Standard Template Library: Algorithms
// The header <algorithm> defines a collection of functions especially designed to be used on ranges of elements.
//
// A range is any sequence of objects that can be accessed through iterators or pointers, such as an array or an 
// instance of some of the STL containers. Notice though, that algorithms operate through iterators directly on the 
// values, not affecting in any way the structure of any possible container (it never affects the size or storage 
// allocation of the container).
//
// @reference http://www.cplusplus.com/reference/algorithm/
// @author Jeongho Nam <http://samchon.org>
var std;
(function (std) {
    function sort(begin, end, compare = std.less) {
        qsort(begin.get_source(), begin.index, end.index, compare);
    }
    std.sort = sort;
    /* ---------------------------------------------------------
        QUICK SORT
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    function qsort(container, begin, end, compare) {
        // QUICK SORT
        if (begin > end)
            return;
        let index = qsort_partition(container, begin, end, compare);
        qsort(container, begin, index, compare);
        qsort(container, index, end, compare);
    }
    /**
     * @hidden
     */
    function qsort_partition(container, begin, end, compare) {
        let val = container.at(begin);
        let i = begin;
        let j = end;
        while (true) {
            while (compare(container.at(++i), val))
                if (i == end - 1)
                    break;
            while (compare(val, container.at(--j)))
                if (j == begin)
                    break;
            if (i >= j)
                break;
            // SWAP; AT(I) WITH AT(J)
            let supplement = container.at(i);
            container.set(i, container.at(j));
            container.set(j, supplement);
        }
        // SWAO; AT(BEGIN) WITH AT(J)
        let supplement = container.at(begin);
        container.set(begin, container.at(j));
        container.set(j, supplement);
        return j;
    }
    function swap(left, right) {
        left.swap(right);
    }
    std.swap = swap;
    function random_shuffle(begin, end) {
        for (let it = begin; !it.equals(end); it = it.next()) {
            let rand_index = Math.floor(Math.random() * (end.index - begin.index));
            it.swap(begin.advance(rand_index));
        }
    }
    std.random_shuffle = random_shuffle;
    function shuffle(begin, end) {
        for (let it = begin; !it.equals(end); it = it.next()) {
            let rand_index = Math.floor(Math.random() * (end.index - begin.index));
            it.swap(begin.advance(rand_index));
        }
    }
    std.shuffle = shuffle;
    /* =========================================================
        ITERATIONS
            - FOR_EACH
            - AGGREGATE CONDITIONS
            - FINDERS
            - COUNTERS
            - RANGES
    ============================================================
        FOR_EACH
    --------------------------------------------------------- */
    /**
     * <p> Apply function to range. </p>
     *
     * <p> Applies function <i>fn</i> to each of the elements in the range [<i>begin</i>, <i>end</i>]. </p>
     *
     * @param begin An {@link Iterator} to the initial position in a sequence.
     * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
     *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
     *			  <i>begin</i> but not the element pointed by <i>end</i>.
     * @param fn Unary function that accepts an element in the range as argument. This can either be a function p
     *			 ointer or a move constructible function object. Its return value, if any, is ignored.
     *
     * @return Returns <i>fn</i>.
     */
    function for_each(begin, end, fn) {
        for (let it = begin; !it.equals(end); it = it.next())
            fn(it.value);
        return fn;
    }
    std.for_each = for_each;
    /* ---------------------------------------------------------
        AGGREGATE CONDITIONS
    --------------------------------------------------------- */
    /**
     * <p> Test condition on all elements in range. </p>
     *
     * <p> Returns <code>true</code> if <i>pred</i> returns <code>true</code> for all the elements in the range
     * [<i>begin</i>, <i>end</i>] or if the range is {@link IContainer.empty empty}, and <code>false</code> otherwise.
     * </p>
     *
     * @param begin An {@link Iterator} to the initial position in a sequence.
     * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
     *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
     *			  <i>begin</i> but not the element pointed by <i>end</i>.
     * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
     *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition
     *			   checked by this function. The function shall not modify its argument. This can either be a function
     *			   pointer or a function object.
     *
     * @return <code>true</code> if pred returns true for all the elements in the range or if the range is
     *		   {@link IContainer.empty empty}, and <code>false</code> otherwise.
     */
    function all_of(begin, end, pred) {
        for (let it = begin; !it.equals(end); it = it.next())
            if (pred(it.value) == false)
                return false;
        return true;
    }
    std.all_of = all_of;
    /**
     * <p> Test if any element in range fulfills condition. </p>
     *
     * <p> Returns <code>true</code> if <i>pred</i> returns true for any of the elements in the range
     * [<i>begin</i>, <i>end<i>], and <code>false</code> otherwise. </p>
     *
     * <p> If [<i>begin</i>, <i>end</i>] is an {@link IContainer.empty empty} range, the function returns
     * <code>false</code>. </p>
     *
     * @param begin An {@link Iterator} to the initial position in a sequence.
     * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
     *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
     *			  <i>begin</i> but not the element pointed by <i>end</i>.
     * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
     *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition
     *			   checked by this function. The function shall not modify its argument. This can either be a function
     *			   pointer or a function object.
     *
     * @return <code>true</code> if <i>pred</i> returns <code>true</code> for any of the elements in the range
     *		   [<i>begin</i>, <i>end<i>], and <code>false</code> otherwise. If [<i>begin</i>, <i>end</i>] is an
     *		   {@link IContainer.empty empty} range, the function returns <code>false</code>.
     */
    function any_of(begin, end, pred) {
        for (let it = begin; !it.equals(end); it = it.next())
            if (pred(it.value) == true)
                return true;
        return false;
    }
    std.any_of = any_of;
    /**
     * <p> Test if no elements fulfill condition. </p>
     *
     * <p> Returns <code>true</code> if <i>pred</i> returns false for all the elements in the range
     * [<i>begin</i>, <i>end</i>] or if the range is {@link IContainer.empty empty}, and <code>false</code> otherwise.
     * </p>
     *
     * @param begin An {@link Iterator} to the initial position in a sequence.
     * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
     *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
     *			  <i>begin</i> but not the element pointed by <i>end</i>.
     * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
     *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition
     *			   checked by this function. The function shall not modify its argument. This can either be a function
     *			   pointer or a function object.
     *
     * @return <code>true</code> if <i>pred</i> returns <code>false</code> for all the elements in the range
     *		   [<i>begin</i>, <i>end<i>] or if the range is {@link IContainer.empty empty}, and <code>false</code>
     *		   otherwise.
     */
    function none_of(begin, end, pred) {
        return !any_of(begin, end, pred);
    }
    std.none_of = none_of;
    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    /**
     * <p> Find value in range. </p>
     *
     * <p> Returns an iterator to the first element in the range [<i>begin</i>, <i>end</i>) that compares equal to
     * <i>val</i>. If no such element is found, the function returns <i>end</i>. </p>
     *
     * <p> The function uses {@link std.equals equals} to compare the individual elements to <i>val</i>. </p>
     *
     * @param begin An {@link Iterator} to the initial position in a sequence.
     * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
     *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
     *			  <i>begin</i> but not the element pointed by <i>end</i>.
     * @param val Value to search for in the range.
     */
    function find(begin, end, val) {
        for (let it = begin; !it.equals(end); it = it.next())
            if (std.equals(it.value, val))
                return it;
        return end;
    }
    std.find = find;
    /**
     * <p> Find element in range. </p>
     *
     * <p> Returns an iterator to the first element in the range [<i>begin</i>, <i>end</i>] for which pred returns
     * <code>true</code>. If no such element is found, the function returns <i>end</i>. </p>
     *
     * @param begin An {@link Iterator} to the initial position in a sequence.
     * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
     *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
     *			  <i>begin</i> but not the element pointed by <i>end</i>.
     * @param pred Unary function that accepts an element in the range as argument and returns a value convertible
     *			   to <code>bool</code>. The value returned indicates whether the element is considered a match in
     *			   the context of this function. The function shall not modify its argument. This can either be a
     *			   function pointer or a function object.
     */
    function find_if(begin, end, pred) {
        for (let it = begin; !it.equals(end); it = it.next())
            if (pred(it.value))
                return it;
        return end;
    }
    std.find_if = find_if;
    /**
     * <p> Find element in range. </p>
     *
     * <p> Returns an iterator to the first element in the range [<i>begin</i>, <i>end</i>] for which pred returns
     * <code>true</code>. If no such element is found, the function returns <i>end</i>. </p>
     *
     * @param begin An {@link Iterator} to the initial position in a sequence.
     * @param end An {@link Iterator} to the final position in a sequence. The range used is [<i>begin</i>, <i>end<i>],
     *			  which contains all the elements between <i>begin</i> and <i>end</i>, including the element pointed by
     *			  <i>begin</i> but not the element pointed by <i>end</i>.
     * @param pred Unary function that accepts an element in the range as argument and returns a value convertible
     *			   to <code>bool</code>. The value returned indicates whether the element is considered a match in
     *			   the context of this function. The function shall not modify its argument. This can either be a
     *			   function pointer or a function object.
     */
    function find_if_not(begin, end, pred) {
        for (let it = begin; !it.equals(end); it = it.next())
            if (pred(it.value) == false)
                return it;
        return end;
    }
    std.find_if_not = find_if_not;
    /* ---------------------------------------------------------
        COUNTERS
    --------------------------------------------------------- */
    function count(begin, end, val) {
        let cnt = 0;
        for (let it = begin; !it.equals(end); it = it.next())
            if (std.equals(it.value, val))
                return cnt++;
        return cnt;
    }
    std.count = count;
    function count_if(begin, end, pred) {
        let cnt = 0;
        for (let it = begin; !it.equals(end); it = it.next())
            if (pred(it.value))
                return cnt++;
        return cnt;
    }
    std.count_if = count_if;
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        var container;
        (function (container_1) {
            /**
             * <p> An abstract container. </p>
             *
             * <h3> Container properties </h3>
             * <dl>
             * 	<dt> Sequence </dt>
             * 	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are
             *		 accessed by their position in this sequence. </dd>
             *
             * 	<dt> Doubly-linked list </dt>
             *	<dd> Each element keeps information on how to locate the next and the previous elements, allowing
             *		 constant time insert and erase operations before or after a specific element (even of entire ranges),
             *		 but no direct random access. </dd>
             * </dl>
             *
             * @param <T> Type of elements.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            class Container {
                constructor(...args) {
                    // THIS IS ABSTRACT CLASS
                    // NOTHING TO DO ESPECIALLY
                }
                /**
                 * @inheritdoc
                 */
                clear() {
                    this.erase(this.begin(), this.end());
                }
                /**
                 * @inheritdoc
                 */
                empty() {
                    return this.size() == 0;
                }
                /* ===============================================================
                    UTILITIES
                =============================================================== */
                /**
                 * @inheritdoc
                 */
                swap(obj) {
                    let supplement = new std.Vector(this.begin(), this.end());
                    this.assign(obj.begin(), obj.end());
                    obj.assign(supplement.begin(), supplement.end());
                }
            }
            container_1.Container = Container;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        var container;
        (function (container) {
            /**
             * <p> Bi-directional iterator. </p>
             *
             * <p> {@link Iterator Bidirectional iterators} are iterators that can be used to access the sequence of elements
             * in a range in both directions (towards the end and towards the beginning). </p>
             *
             * <p> All {@link IArrayIterator random-access iterators} are also valid
             * {@link Iterrator bidirectional iterators}. </p>
             *
             * <p> There is not a single type of {@link Iterator bidirectional iterator}: {@link IContainer Each container}
             * may define its own specific iterator type able to iterate through it and access its elements. </p>
             *
             * <ul>
             *	<li> Reference: http://www.cplusplus.com/reference/iterator/BidirectionalIterator/ </li>
             * </ul>
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            class Iterator {
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                /**
                 * Construct from the source {@link IContainer container}.
                 *
                 * @param source The source container.
                 */
                constructor(source) {
                    this.source_ = source;
                }
                /**
                 * Advances the {@link Iterator} by <i>n</i> element positions.
                 *
                 * @param n Number of element positions to advance.
                 * @return An advanced iterator.
                 */
                advance(n) {
                    let it = this;
                    let i;
                    if (n >= 0) {
                        for (i = 0; i < n; i++)
                            if (it.equals(this.source_.end()))
                                return this.source_.end();
                            else
                                it = it.next();
                    }
                    else {
                        n = n * -1;
                        for (i = 0; i < n; i++)
                            if (it.equals(this.source_.end()))
                                return this.source_.end();
                            else
                                it = it.prev();
                    }
                    return it;
                }
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                /**
                 * Get source container.
                 */
                get_source() {
                    return this.source_;
                }
                /**
                 * <p> Whether an iterator is equal with the iterator. </p>
                 * <p> Compare two iterators and returns whether they are equal or not. </p>
                 *
                 * <h4> Note </h4>
                 * <p> Iterator's equals() only compare souce map and index number. </p>
                 *
                 * <p> Although elements in a pair, key and value are equals, if the source map or
                 * index number is different, then the {@link equals equals()} will return false. If you want to
                 * compare the elements of a pair, compare them directly by yourself. </p>
                 *
                 * @param obj An iterator to compare
                 * @return Indicates whether equal or not.
                 */
                equals(obj) {
                    return this.source_ == obj.source_;
                }
                /**
                 * <p> Get value of the iterator is pointing. </p>
                 *
                 * @return A value of the iterator.
                 */
                get value() {
                    throw new std.LogicError("Have to be overriden.");
                }
            }
            container.Iterator = Iterator;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        var container;
        (function (container_2) {
            /**
             * <p> An abstract map. </p>
             *
             * <p> {@link MapContainer MapContainers} are associative containers that store elements formed by a combination
             * of a <i>key value</i> (<i>Key</i>) and a <i>mapped value</i> (<i>T</i>), and which allows for fast retrieval
             * of individual elements based on their keys. </p>
             *
             * <p> In a {@link MapContainer}, the <i>key values</i> are generally used to identify the elements, while the
             * <i>mapped values</i> store the content associated to this key. The types of <i>key</i> and
             * <i>mapped value</i> may differ, and are grouped together in member type <i>value_type</i>, which is a
             * {@link Pair} type combining both: </p>
             *
             * <p> <code>typedef pair<const Key, T> value_type;</code> </p>
             *
             * <p> {@link MapContainer} stores elements, keeps sequence and enables indexing by inserting elements into a
             * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index
             * table like {@link RBTree tree} or {@link HashBuckets hash-table}. </p>
             *
             * <h3> Container properties </h3>
             * <dl>
             *	<dt> Associative </dt>
             *	<dd>
             *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute position
             *		in the container.
             *	</dd>
             *
             *	<dt> Map </dt>
             *	<dd>
             *		Each element associates a <i>key</i> to a <i>mapped value</i>:
             *		<i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>.
             *	</dd>
             * </dl>
             *
             * @param <Key> Type of the keys. Each element in a map is identified by its key value.
             * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            class MapContainer {
                constructor(...args) {
                    this.data_ = new std.List();
                    // THIS IS ABSTRACT CLASS
                    // NOTHING TO DO ESPECIALLY
                }
                static get iterator() { return std.MapIterator; }
                /**
                 * @hidden
                 */
                construct_from_array(items) {
                    for (let i = 0; i < items.length; i++)
                        if (items[i] instanceof std.Pair)
                            this.insert_by_pair(items[i]);
                        else
                            this.insert_by_tuple(items[i]);
                }
                /**
                 * @hidden
                 */
                construct_from_container(container) {
                    this.construct_from_range(container.begin(), container.end());
                }
                /**
                 * @hidden
                 */
                construct_from_range(begin, end) {
                    this.assign(begin, end);
                }
                /* ---------------------------------------------------------
                    ASSIGN & CLEAR
                --------------------------------------------------------- */
                /**
                 * <p> Assign new content to content. </p>
                 *
                 * <p> Assigns new contents to the Container, replacing its current contents, and modifying its {@link size}
                 * accordingly. </p>
                 *
                 * @param begin Input interator of the initial position in a sequence.
                 * @param end Input interator of the final position in a sequence.
                 */
                assign(begin, end) {
                    // INSERT
                    for (let it = begin; it.equals(end) == false; it = it.next())
                        this.insert_by_pair(new std.Pair(it.first, it.second));
                }
                /**
                 * <p> Clear content. </p>
                 *
                 * <p> Removes all elements from the Container, leaving the container with a size of 0. </p>
                 */
                clear() {
                    this.data_.clear();
                }
                /**
                 * <p> Return iterator to beginning. </p>
                 * <p> Returns an iterator referring the first element in the Container. </p>
                 *
                 * <h4> Note </h4>
                 * <p> If the container is empty, the returned iterator is same with {@link end()}. </p>
                 *
                 * @return An iterator to the first element in the container.
                 *		   The iterator containes the first element's value.
                 */
                begin() {
                    return new std.MapIterator(this, this.data_.begin());
                }
                /**
                 * <p> Return iterator to end. </p>
                 * <p> Returns an iterator referring to the past-the-end element in the Container. </p>
                 *
                 * <p> The past-the-end element is the theoretical element that would follow the last element in the
                 * container. It does not point to any element, and thus shall not be dereferenced. </p>
                 *
                 * <p> Because the ranges used by functions of the Container do not include the element reference by their
                 * closing iterator, this function is often used in combination with Container::begin() to specify a range
                 * including all the elements in the container. </p>
                 *
                 * <h4> Note </h4>
                 * <p> Returned iterator from Container.end() does not refer any element. Trying to accessing element by
                 * the iterator will cause throwing exception (out of range). </p>
                 *
                 * <p> If the container is empty, this function returns the same as {@link begin}. </p>
                 *
                 * @return An iterator to the end element in the container.
                 */
                end() {
                    return new std.MapIterator(this, this.data_.end());
                }
                /* ---------------------------------------------------------
                    ELEMENTS
                --------------------------------------------------------- */
                /**
                 * <p> Whether have the item or not. </p>
                 * <p> Indicates whether a map has an item having the specified identifier. </p>
                 *
                 * @param key Key value of the element whose mapped value is accessed.
                 *
                 * @return Whether the map has an item having the specified identifier.
                 */
                has(key) {
                    return this.count(key) != 0;
                }
                /**
                 * Return the number of elements in the map.
                 */
                size() {
                    return this.data_.size();
                }
                /**
                 * Test whether the Container is empty.
                 */
                empty() {
                    return this.size() == 0;
                }
                insert(...args) {
                    if (args.length == 1 && args[0] instanceof std.Pair) {
                        return this.insert_by_pair(args[0]);
                    }
                    else if (args.length == 1 && args[0] instanceof Array) {
                        return this.insert_by_tuple(args[0]);
                    }
                    else if (args.length == 2 && args[0] instanceof std.MapIterator && args[1] instanceof std.Pair) {
                        return this.insert_by_hint(args[0], args[1]);
                    }
                    else if (args.length == 2 && args[0] instanceof std.MapIterator && args[1] instanceof Array) {
                        return this.insert_by_hint_with_tuple(args[0], args[1]);
                    }
                    else if (args.length == 2 && args[0] instanceof std.MapIterator && args[1] instanceof std.MapIterator) {
                        return this.insert_by_range(args[0], args[1]);
                    }
                }
                /**
                 * @hidden
                 */
                insert_by_tuple(tuple) {
                    return this.insert_by_pair(new std.Pair(tuple[0], tuple[1]));
                }
                /**
                 * @hidden
                 */
                insert_by_hint(hint, pair) {
                    // INSERT
                    let list_it = this.data_.insert(hint.get_list_iterator(), pair);
                    // POST-PROCESS
                    let it = new std.MapIterator(this, list_it);
                    this.handle_insert(it);
                    return it;
                }
                /**
                 * @hidden
                 */
                insert_by_hint_with_tuple(hint, tuple) {
                    return this.insert_by_hint(hint, new std.Pair(tuple[0], tuple[1]));
                }
                /**
                 * @hidden
                 */
                insert_by_range(begin, end) {
                    for (let it = begin; it.equals(end) == false; it = it.next())
                        this.insert_by_pair(new std.Pair(it.first, it.second));
                }
                erase(...args) {
                    if (args.length == 1) {
                        if (args[0] instanceof std.MapIterator && args[0].get_source() == this)
                            return this.erase_by_iterator(args[0]);
                        else
                            return this.erase_by_key(args[0]);
                    }
                    else if (args.length == 2 && args[0] instanceof std.MapIterator && args[1] instanceof std.MapIterator)
                        return this.erase_by_range(args[0], args[1]);
                }
                /**
                 * @hidden
                 */
                erase_by_key(key) {
                    let it = this.find(key);
                    if (it.equals(this.end()) == true)
                        return 0;
                    this.erase_by_iterator(it);
                    return 1;
                }
                /**
                 * @hidden
                 */
                erase_by_iterator(it) {
                    // ERASE
                    let listIterator = this.data_.erase(it.get_list_iterator());
                    // POST-PROCESS
                    this.handle_erase(it);
                    return new std.MapIterator(this, listIterator);
                    ;
                }
                /**
                 * @hidden
                 */
                erase_by_range(begin, end) {
                    // ERASE
                    let listIterator = this.data_.erase(begin.get_list_iterator(), end.get_list_iterator());
                    // POST-PROCESS
                    for (let it = begin; !it.equals(end); it = it.next())
                        this.handle_erase(it);
                    return new std.MapIterator(this, listIterator);
                }
                /* ===============================================================
                    UTILITIES
                =============================================================== */
                /**
                 * <p> Swap content. </p>
                 *
                 * <p> Exchanges the content of the container by the content of <i>obj</i>, which is another
                 * {@link MapContainer map} of the same type. Sizes abd container type may differ. </p>
                 *
                 * <p> After the call to this member function, the elements in this container are those which were
                 * in <i>obj</i> before the call, and the elements of <i>obj</i> are those which were in this. All
                 * iterators, references and pointers remain valid for the swapped objects. </p>
                 *
                 * <p> Notice that a non-member function exists with the same name, {@link std.swap swap}, overloading that
                 * algorithm with an optimization that behaves like this member function. </p>
                 *
                 * @param obj Another {@link MapContainer map container} of the same type of elements as this (i.e.,
                 *			  with the same template parameters, <b>Key</b> and <b>T</b>) whose content is swapped
                 *			  with that of this {@link MapContaier container}.
                 */
                swap(obj) {
                    let supplement = new std.HashMultiMap(this.begin(), this.end());
                    this.assign(obj.begin(), obj.end());
                    obj.assign(supplement.begin(), supplement.end());
                }
            }
            container_2.MapContainer = MapContainer;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="MapContainer.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        var container;
        (function (container_3) {
            /**
             * <p> An abstract multi-map. </p>
             *
             * <p> {@link MultiMap MultiMaps} are associative containers that store elements formed by a combination of a
             * <i>key value</i> (<i>Key</i>) and a <i>mapped value</i> (<i>T</i>), and which allows for fast retrieval of
             * individual elements based on their keys. </p>
             *
             * <p> In a {@link MapContainer}, the <i>key values</i> are generally used to identify the elements, while the
             * <i>mapped values</i> store the content associated to this <i>key</i>. The types of <i>key</i> and
             * <i>mapped value</i> may differ, and are grouped together in member type <i>value_type</i>, which is a
             * {@link Pair} type combining both: </p>
             *
             * <p> <code>typedef pair<const Key, T> value_type;</code> </p>
             *
             * <p> {@link UniqueMap} stores elements, keeps sequence and enables indexing by inserting elements into a
             * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index
             * table like {@link RBTree tree} or {@link HashBuckets hash-table}. </p>
             *
             * <h3> Container properties </h3>
             * <dl>
             *	<dt> Associative </dt>
             *	<dd>
             *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute position
             *		in the container.
             *	</dd>
             *
             *	<dt> Map </dt>
             *	<dd>
             *		Each element associates a <i>key</i> to a <i>mapped value</i>:
             *		<i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>.
             *	</dd>
             *
             *	<dt> Multiple equivalent keys </dt>
             *	<dd> Multiple elements in the container can have equivalent <i>keys</i>. </dd>
             * </dl>
             *
             * @param <Key> Type of the keys. Each element in a map is identified by its key value.
             * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            class MultiMap extends container_3.MapContainer {
                /**
                 * Default Constructor.
                 */
                constructor() {
                    super();
                    // THIS IS ABSTRACT CLASS
                    // NOTHING TO DO ESPECIALLY
                }
                /**
                 * @inheritdoc
                 */
                count(key) {
                    let myIt = this.find(key);
                    if (myIt.equals(this.end()))
                        return 0;
                    let size = 0;
                    for (let it = myIt.next(); !it.equals(this.end()) && std.equals(key, it.first); it = it.next())
                        size++;
                    return size;
                }
                insert(...args) {
                    return super.insert.apply(this, args);
                }
            }
            container_3.MultiMap = MultiMap;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="Container.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        var container;
        (function (container_4) {
            /**
             * <p> An abstract set. </p>
             *
             * <p> {@link SetContainer SetContainers} are containers that store elements allowing fast retrieval of
             * individual elements based on their value. </p>
             *
             * <p> In an {@link SetContainer}, the value of an element is at the same time its <i>key</i>, used to
             * identify it. <i>Keys</i> are immutable, therefore, the elements in an {@link SetContainer} cannot be
             * modified once in the container - they can be inserted and removed, though. </p>
             *
             * <p> {@link SetContainer} stores elements, keeps sequence and enables indexing by inserting elements into a
             * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index
             * table like {@link RBTree tree} or {@link HashBuckets hash-table}. </p>
             *
             * <h3> Container properties </h3>
             * <dl>
             *	<dt> Associative </dt>
             *	<dd>
             *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute
             *		position in the container.
             *	</dd>
             *
             *	<dt> Set </dt>
             *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
             * </dl>
             *
             * @param <T> Type of the elements. Each element in a {@link SetContainer} container is also identified
             *			  by this value (each value is itself also the element's <i>key</i>).
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            class SetContainer extends container_4.Container {
                constructor(...args) {
                    super();
                    // INITIALIZATION
                    this.data_ = new std.List();
                    // OVERLOADINGS
                    //if (args.length == 1 && args[0] instanceof Array && args[0] instanceof Vector == false)
                    //{
                    //	this.construct_from_array(args[0]);
                    //}
                    //else if (args.length == 1 && args[0] instanceof Container)
                    //{
                    //	this.construct_from_container(args[0]);
                    //}
                    //else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
                    //{
                    //	this.construct_from_range(args[0], args[1]);
                    //}
                }
                static get iterator() { return std.SetIterator; }
                /**
                 * @hidden
                 */
                construct_from_array(items) {
                    for (let i = 0; i < items.length; i++)
                        this.insert_by_val(items[i]);
                }
                /**
                 * @hidden
                 */
                construct_from_container(container) {
                    this.construct_from_range(container.begin(), container.end());
                }
                /**
                 * @hidden
                 */
                construct_from_range(begin, end) {
                    this.assign(begin, end);
                }
                /* ---------------------------------------------------------
                    ASSIGN & CLEAR
                --------------------------------------------------------- */
                /**
                 * @inheritdoc
                 */
                assign(begin, end) {
                    // INSERT
                    for (let it = begin; it.equals(end) == false; it = it.next())
                        this.insert_by_val(it.value);
                }
                /**
                 * @inheritdoc
                 */
                clear() {
                    this.data_.clear();
                }
                /**
                 * @inheritdoc
                 */
                begin() {
                    return new std.SetIterator(this, this.data_.begin());
                }
                /**
                 * @inheritdoc
                 */
                end() {
                    return new std.SetIterator(this, this.data_.end());
                }
                /* ---------------------------------------------------------
                    ELEMENTS
                --------------------------------------------------------- */
                /**
                 * <p> Whether have the item or not. </p>
                 *
                 * <p> Indicates whether a set has an item having the specified identifier. </p>
                 *
                 * @param key Key value of the element whose mapped value is accessed.
                 *
                 * @return Whether the set has an item having the specified identifier.
                 */
                has(val) {
                    return this.count(val) != 0;
                }
                /**
                 * @inheritdoc
                 */
                size() {
                    return this.data_.size();
                }
                /* =========================================================
                    ELEMENTS I/O
                        - INSERT
                        - ERASE
                        - POST-PROCESS
                ============================================================
                    INSERT
                --------------------------------------------------------- */
                /**
                 * @inheritdoc
                 */
                push(...args) {
                    for (let i = 0; i < args.length; i++)
                        this.insert_by_val(args[i]);
                    return this.size();
                }
                insert(...args) {
                    if (args.length == 1)
                        return this.insert_by_val(args[0]);
                    else if (args.length == 2 && args[0] instanceof container_4.Iterator) {
                        if (args[1] instanceof container_4.Iterator && args[0].get_source() != this && args[1].get_source() != this)
                            return this.insert_by_range(args[0], args[1]);
                        else
                            return this.insert_by_hint(args[0], args[1]);
                    }
                }
                /**
                 * @hidden
                 */
                insert_by_hint(hint, val) {
                    // INSERT
                    let list_iterator = this.data_.insert(hint.get_list_iterator(), val);
                    // POST-PROCESS
                    let it = new std.SetIterator(this, list_iterator);
                    this.handle_insert(it);
                    return it;
                }
                /**
                 * @hidden
                 */
                insert_by_range(begin, end) {
                    for (let it = begin; it.equals(end) == false; it = it.next())
                        this.insert_by_val(it.value);
                }
                erase(...args) {
                    if (args.length == 1) {
                        if (args[0] instanceof container_4.Iterator && args[0].get_source() == this)
                            return this.erase_by_iterator(args[0]);
                        else
                            return this.erase_by_val(args[0]);
                    }
                    else if (args.length == 2 && args[0] instanceof container_4.Iterator && args[1] instanceof container_4.Iterator)
                        return this.erase_by_range(args[0], args[1]);
                }
                /**
                 * @hidden
                 */
                erase_by_val(val) {
                    // TEST WHETHER EXISTS
                    let it = this.find(val);
                    if (it.equals(this.end()) == true)
                        return 0;
                    // ERASE
                    this.erase_by_iterator(it);
                    return 1;
                }
                /**
                 * @hidden
                 */
                erase_by_iterator(it) {
                    // ERASE
                    let list_iterator = this.data_.erase(it.get_list_iterator());
                    // POST-PROCESS
                    this.handle_erase(it);
                    return new std.SetIterator(this, list_iterator);
                }
                /**
                 * @hidden
                 */
                erase_by_range(begin, end) {
                    // ERASE
                    let list_iterator = this.data_.erase(begin.get_list_iterator(), end.get_list_iterator());
                    // POST-PROCESS
                    for (let it = begin; !it.equals(end); it = it.next())
                        this.handle_erase(it);
                    return new std.SetIterator(this, list_iterator); //begin.prev();
                }
            }
            container_4.SetContainer = SetContainer;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="SetContainer.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        var container;
        (function (container) {
            /**
             * <p> An abstract set. </p>
             *
             * <p> {@link SetContainer SetContainers} are containers that store elements allowing fast retrieval of
             * individual elements based on their value. </p>
             *
             * <p> In an {@link SetContainer}, the value of an element is at the same time its <i>key</i>, used to
             * identify it. <i>Keys</i> are immutable, therefore, the elements in an {@link SetContainer} cannot be
             * modified once in the container - they can be inserted and removed, though. </p>
             *
             * <p> {@link SetContainer} stores elements, keeps sequence and enables indexing by inserting elements into a
             * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index
             * table like {@link RBTree tree} or {@link HashBuckets hash-table}. </p>
             *
             * <h3> Container properties </h3>
             * <dl>
             *	<dt> Associative </dt>
             *	<dd>
             *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute
             *		position in the container.
             *	</dd>
             *
             *	<dt> Set </dt>
             *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
             *
             *	<dt> Multiple equivalent keys </dt>
             *	<dd> Multiple elements in the container can have equivalent <i>keys</i>. </dd>
             * </dl>
             *
             * @param <T> Type of the elements. Each element in a {@link SetContainer} container is also identified
             *			  by this value (each value is itself also the element's <i>key</i>).
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            class MultiSet extends container.SetContainer {
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                /**
                 * Default Constructor.
                 */
                constructor() {
                    super();
                }
                /**
                 * @inheritdoc
                 */
                count(val) {
                    let myIt = this.find(val);
                    if (myIt.equals(this.end()))
                        return 0;
                    let size = 0;
                    for (let it = myIt; !it.equals(this.end()) && std.equals(val, it.value); it = it.next())
                        size++;
                    return size;
                }
                insert(...args) {
                    return super.insert.apply(this, args);
                }
            }
            container.MultiSet = MultiSet;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="MapContainer.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        var container;
        (function (container_5) {
            /**
             * <p> An abstract unique-map. </p>
             *
             * <p> {@link UniqueMap UniqueMaps} are associative containers that store elements formed by a combination of a
             * <i>key value</i> (<i>Key</i>) and a <i>mapped value</i> (<i>T</i>), and which allows for fast retrieval of
             * individual elements based on their keys. </p>
             *
             * <p> In a {@link MapContainer}, the <i>key values</i> are generally used to uniquely identify the elements,
             * while the <i>mapped values</i> store the content associated to this key. The types of <i>key</i> and
             * <i>mapped value</i> may differ, and are grouped together in member type <i>value_type</i>, which is a
             * {@link Pair} type combining both: </p>
             *
             * <p> <code>typedef pair<const Key, T> value_type;</code> </p>
             *
             * <p> {@link UniqueMap} stores elements, keeps sequence and enables indexing by inserting elements into a
             * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index
             * table like {@link RBTree tree} or {@link HashBuckets hash-table}. </p>
             *
             * <h3> Container properties </h3>
             * <dl>
             *	<dt> Associative </dt>
             *	<dd>
             *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute position
             *		in the container.
             *	</dd>
             *
             *	<dt> Map </dt>
             *	<dd>
             *		Each element associates a <i>key</i> to a <i>mapped value</i>:
             *		<i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>.
             *	</dd>
             *
             *	<dt> Unique keys </dt>
             *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
             * </dl>
             *
             * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
             * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            class UniqueMap extends container_5.MapContainer {
                /**
                 * Default Constructor.
                 */
                constructor() {
                    super();
                    // THIS IS ABSTRACT CLASS
                    // NOTHING TO DO ESPECIALLY
                }
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                /**
                 * @inheritdoc
                 */
                count(key) {
                    return this.find(key).equals(this.end()) ? 0 : 1;
                }
                /**
                 * <p> Get an element </p>
                 *
                 * <p> Returns a reference to the mapped value of the element identified with <i>key</i>. </p>
                 *
                 * @param key Key value of the element whose mapped value is accessed.
                 * @throw exception out of range
                 * @return A reference object of the mapped value (_Ty)
                 */
                get(key) {
                    let it = this.find(key);
                    if (it.equals(this.end()) == true)
                        throw new std.OutOfRange("unable to find the matched key.");
                    return it.second;
                }
                /**
                 * <p> Set an item as the specified identifier. </p>
                 *
                 * <p>If the identifier is already in map, change value of the identifier. If not, then insert the object
                 * with the identifier. </p>
                 *
                 * @param key Key value of the element whose mapped value is accessed.
                 * @param val Value, the item.
                 */
                set(key, val) {
                    let it = this.find(key);
                    if (it.equals(this.end()) == true)
                        this.insert(new std.Pair(key, val));
                    else
                        it.second = val;
                }
                insert(...args) {
                    return super.insert.apply(this, args);
                }
            }
            container_5.UniqueMap = UniqueMap;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="SetContainer.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        var container;
        (function (container) {
            /**
             * <p> An abstract set. </p>
             *
             * <p> {@link SetContainer SetContainers} are containers that store elements allowing fast retrieval of
             * individual elements based on their value. </p>
             *
             * <p> In an {@link SetContainer}, the value of an element is at the same time its <i>key</i>, used to uniquely
             * identify it. <i>Keys</i> are immutable, therefore, the elements in an {@link SetContainer} cannot be modified
             * once in the container - they can be inserted and removed, though. </p>
             *
             * <p> {@link SetContainer} stores elements, keeps sequence and enables indexing by inserting elements into a
             * {@link List} and registering {@link ListIterator iterators} of the {@link data_ list container} to an index
             * table like {@link RBTree tree} or {@link HashBuckets hash-table}. </p>
             *
             * <h3> Container properties </h3>
             * <dl>
             *	<dt> Associative </dt>
             *	<dd>
             *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute
             *		position in the container.
             *	</dd>
             *
             *	<dt> Set </dt>
             *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
             *
             *	<dt> Unique keys </dt>
             *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
             * </dl>
             *
             * @param <T> Type of the elements. Each element in a {@link SetContainer} container is also identified
             *			  by this value (each value is itself also the element's <i>key</i>).
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            class UniqueSet extends container.SetContainer {
                /* =========================================================
                    CONSTRUCTORS
                ========================================================= */
                /**
                 * Default Constructor.
                 */
                constructor() {
                    super();
                }
                /**
                 * @inheritdoc
                 */
                count(key) {
                    return this.find(key).equals(this.end()) ? 0 : 1;
                }
                insert(...args) {
                    return super.insert.apply(this, args);
                }
            }
            container.UniqueSet = UniqueSet;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
// Type definitions for STL (Standard Template Library) Containers v0.8
// Project: https://github.com/samchon/stl
// Definitions by: Jeongho Nam <http://samchon.org>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped 
var std;
(function (std) {
    var base;
    (function (base) {
        var hash;
        (function (hash) {
            hash.MIN_SIZE = 10;
            hash.RATIO = 0.8;
            hash.MAX_RATIO = 2.0;
            function code(par) {
                let type = typeof par;
                if (type == "number")
                    return code_of_number(par);
                else if (type == "string")
                    return code_of_string(par);
                else
                    return code_of_object(par);
            }
            hash.code = code;
            /**
             * @hidden
             */
            function code_of_number(val) {
                // ------------------------------------------
                //	IN C++
                //		CONSIDER A NUMBER AS A STRING
                //		HASH<STRING>((CHAR*)&VAL, 8)
                // ------------------------------------------
                // CONSTRUCT BUFFER AND BYTE_ARRAY
                let buffer = new ArrayBuffer(8);
                let byteArray = new Int8Array(buffer);
                let valueArray = new Float64Array(buffer);
                valueArray[0] = val;
                let code = 2166136261;
                for (let i = 0; i < byteArray.length; i++) {
                    let byte = (byteArray[i] < 0) ? byteArray[i] + 256 : byteArray[i];
                    code ^= byte;
                    code *= 16777619;
                }
                return Math.abs(code);
            }
            /**
             * @hidden
             */
            function code_of_string(str) {
                // ------------------------
                //	IN C++
                // ------------------------
                let code = 2166136261;
                for (let i = 0; i < str.length; i++) {
                    code ^= str.charCodeAt(i);
                    code *= 16777619;
                }
                return Math.abs(code);
                // ------------------------
                //	IN JAVA
                // ------------------------
                //let val: number = 0;
                //for (let i: number = 0; i < str.length; i++)
                //	val += str.charCodeAt(i) * Math.pow(31, str.length - 1 - i);
                //return val;
            }
            /**
             * @hidden
             */
            function code_of_object(obj) {
                if (obj.hash != undefined)
                    return obj.hash();
                else
                    return obj.__getUID();
            }
        })(hash = base.hash || (base.hash = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        var hash;
        (function (hash) {
            class HashBuckets {
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                /**
                 * Default Constructor.
                 */
                constructor() {
                    this.clear();
                }
                /**
                 * Reserve the bucket size.
                 *
                 * @param size Number of bucket size to reserve.
                 */
                reserve(size) {
                    if (size < hash.MIN_SIZE)
                        size = hash.MIN_SIZE;
                    let prevMatrix = this.buckets_;
                    this.buckets_ = new std.Vector();
                    for (let i = 0; i < size; i++)
                        this.buckets_.push_back(new std.Vector());
                    for (let i = 0; i < prevMatrix.size(); i++)
                        for (let j = 0; j < prevMatrix.at(i).size(); j++) {
                            let val = prevMatrix.at(i).at(j);
                            this.buckets_.at(this.hash_index(val)).push_back(val);
                            this.item_size_++;
                        }
                }
                clear() {
                    this.buckets_ = new std.Vector();
                    this.item_size_ = 0;
                    for (let i = 0; i < hash.MIN_SIZE; i++)
                        this.buckets_.push_back(new std.Vector());
                }
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                size() {
                    return this.buckets_.size();
                }
                item_size() {
                    return this.item_size_;
                }
                at(index) {
                    return this.buckets_.at(index);
                }
                hash_index(val) {
                    return hash.code(val) % this.buckets_.size();
                }
                /* ---------------------------------------------------------
                    ELEMENTS I/O
                --------------------------------------------------------- */
                insert(val) {
                    this.buckets_.at(this.hash_index(val)).push_back(val);
                    if (++this.item_size_ > this.buckets_.size() * hash.MAX_RATIO)
                        this.reserve(this.item_size_ * hash.RATIO);
                }
                erase(val) {
                    let hashes = this.buckets_.at(this.hash_index(val));
                    for (let i = 0; i < hashes.size(); i++)
                        if (hashes.at(i) == val) {
                            hashes.splice(i, 1);
                            this.item_size_--;
                            break;
                        }
                }
            }
            hash.HashBuckets = HashBuckets;
        })(hash = base.hash || (base.hash = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="HashBuckets.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        var hash;
        (function (hash) {
            class MapHashBuckets extends hash.HashBuckets {
                constructor(map) {
                    super();
                    this.map = map;
                }
                find(key) {
                    let index = hash.code(key) % this.size();
                    let bucket = this.at(index);
                    for (let i = 0; i < bucket.size(); i++)
                        if (std.equals(bucket.at(i).first, key))
                            return bucket.at(i);
                    return this.map.end();
                }
            }
            hash.MapHashBuckets = MapHashBuckets;
        })(hash = base.hash || (base.hash = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="HashBuckets.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        var hash;
        (function (hash) {
            class SetHashBuckets extends hash.HashBuckets {
                constructor(set) {
                    super();
                    this.set = set;
                }
                find(val) {
                    let index = hash.code(val) % this.size();
                    let bucket = this.at(index);
                    for (let i = 0; i < bucket.size(); i++)
                        if (std.equals(bucket.at(i).value, val))
                            return bucket.at(i);
                    return this.set.end();
                }
            }
            hash.SetHashBuckets = SetHashBuckets;
        })(hash = base.hash || (base.hash = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        var system;
        (function (system) {
            /**
             * <p> An abstract error instance. </p>
             *
             * <p> {@link ErrorInstance} is an abstract class of {@link ErrorCode} and {@link ErrorCondition}
             * holding an error instance's identifier {@link value}, associated with a {@link category}. </p>
             *
             * <p> The operating system and other low-level applications and libraries generate numerical error codes to
             * represent possible results. These numerical values may carry essential information for a specific platform,
             * but be non-portable from one platform to another. </p>
             *
             * <p> Objects of this class associate such numerical codes to {@link ErrorCategory error categories},
             * so that they can be interpreted when needed as more abstract (and portable)
             * {@link ErrorCondition error conditions}. </p>
             *
             * @author Jeongho Nam <http://samchon.org>
             */
            class ErrorInstance {
                constructor(val = 0, category = null) {
                    this.assign(val, category);
                }
                /**
                 * <p> Assign error instance. </p>
                 *
                 * <p> Assigns the {@link ErrorCode} object a value of val associated with the {@link ErrorCategory}. </p>
                 *
                 * @param val A numerical value identifying an error instance.
                 * @param category A reference to an {@link ErrorCategory} object.
                 */
                assign(val, category) {
                    this.category_ = category;
                    this.value_ = val;
                }
                /**
                 * <p> Clear error instance. </p>
                 *
                 * <p> Clears the value in the {@link ErrorCode} object so that it is set to a value of <i>0</i> of the
                 * {@link ErrorCategory.systemCategory ErrorCategory.systemCategory()} (indicating no error). </p>
                 */
                clear() {
                    this.value_ = 0;
                }
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                /**
                 * <p> Get category. </p>
                 *
                 * <p> Returns a reference to the {@link ErrorCategory} associated with the {@link ErrorCode} object. </p>
                 *
                 * @return A reference to a non-copyable object of a type derived from {@link ErrorCategory}.
                 */
                category() {
                    return this.category_;
                }
                /**
                 * <p> Error value. </p>
                 *
                 * <p> Returns the error value associated with the {@link ErrorCode} object. </p>
                 *
                 * @return The error value.
                 */
                value() {
                    return this.value_;
                }
                /**
                 * <p> Get message. </p>
                 *
                 * <p> Returns the message associated with the error instance. </p>
                 *
                 * <p> Error messages are defined by the {@link category} the error instance belongs to. </p>
                 *
                 * <p> This function returns the same as if the following member was called: </p>
                 *
                 * <p> <code>category().message(value())</code> </p>
                 *
                 * @return A string object with the message associated with the {@link ErrorCode}.
                 */
                message() {
                    if (this.category_ == null || this.value_ == 0)
                        return "";
                    else
                        return this.category_.message(this.value_);
                }
                /**
                 * <p> Default error condition. </p>
                 *
                 * <p> Returns the default {@link ErrorCondition}object associated with the {@link ErrorCode} object. </p>
                 *
                 * <p> This function returns the same as if the following member was called: </p>
                 *
                 * <p> <code>category().default_error_condition(value())</code> </p>
                 *
                 * <p> {@link ErrorCategory.default_error_condition ErrorCategory.default_error_condition()}
                 * is a virtual member function, that can operate differently for each category. </p>
                 *
                 * @return An {@link ErrorCondition}object that corresponds to the {@link ErrorCode} object.
                 */
                default_error_condition() {
                    if (this.category_ == null || this.value_ == 0)
                        return null;
                    else
                        return this.category_.default_error_condition(this.value_);
                }
                /* ---------------------------------------------------------
                    OPERATORS
                --------------------------------------------------------- */
                /**
                 * <p> Convert to bool. </p>
                 *
                 * <p> Returns whether the error instance has a numerical {@link value} other than 0. </p>
                 *
                 * <p> If it is zero (which is generally used to represent no error), the function returns false, otherwise it returns true. </p>
                 *
                 * @return <code>true</code> if the error's numerical value is not zero.
                 *		   <code>false</code> otherwise.
                 */
                to_bool() {
                    return this.value_ != 0;
                }
            }
            system.ErrorInstance = ErrorInstance;
        })(system = base.system || (base.system = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        var tree;
        (function (tree) {
            /**
             * <p> Red-black Tree. </p>
             *
             * <p> A red-black tree is a kind of self-balancing
             * binary search tree. Each node of the binary tree has an extra bit, and that bit is often interpreted as the
             * color (<font color='red'>red</font> or <font color='darkBlue'>black</font>) of the node. These color bits
             * are used to ensure the tree remains approximately balanced during insertions and deletions. </p>
             *
             * <p> Balance is preserved by painting each node of the tree with one of two colors (typically called
             * '<font color='red'>red</font>' and '<font color='darkBlue'>black</font>') in a way that satisfies certain
             * properties, which collectively constrain how unbalanced the tree can become in the worst case. When the tree
             * is modified, the new tree is subsequently rearranged and repainted to restore the coloring properties. The
             * properties are designed in such a way that this rearranging and recoloring can be performed efficiently. </p>
             *
             * <p> The balancing of the tree is not perfect but it is good enough to allow it to guarantee searching in
             * O(log n) time, where n is the total number of elements in the tree. The insertion and deletion operations,
             * along with the tree rearrangement and recoloring, are also performed in O(log n) time. </p>
             *
             * <p> Tracking the color of each node requires only 1 bit of information per node because there are only two
             * colors. The tree does not contain any other data specific to its being a
             * red-black tree so its memory footprint is almost
             * identical to a classic (uncolored) binary search tree. In many cases the additional bit of information can
             * be stored at no additional memory cost. </p>
             *
             * <h4> Properties </h4>
             * <p> In addition to the requirements imposed on a binary search tree the following must be satisfied by a
             * red-black tree: </p>
             *
             * <ol>
             *	<li> A node is either <font color='red'>red</font> or <font color='darkBlue'>black</font>. </li>
             *	<li>
             *		The root is <font color='darkBlue'>black</font>. This rule is sometimes omitted. Since the root can
             *		always be changed from <font color='red'>red</font> to <font color='darkBlue'>black</font>, but not
             *		necessarily vice versa, this rule has little effect on analysis.
             *	</li>
             *	<li> All leaves (NIL; <code>null</code>) are <font color='darkBlue'>black</font>. </li>
             *  <li>
             *		If a node is <font color='red'>red</font>, then both its children are
             *		<font color='darkBlue'>black</font>.
             *	</li>
             *  <li>
             *		Every path from a given node to any of its descendant NIL nodes contains the same number of
             *		<font color='darkBlue'>black</font> nodes. Some definitions: the number of
             *		<font color='darkBlue'>black</font> nodes from the root to a node is the node's
             *		<font color='darkBlue'>black</font> depth; the uniform number of <font color='darkBlue'>black</font>
             *		nodes in all paths from root to the leaves is called the <font color='darkBlue'>black</font>-height of
             *		the red-black tree.
             *	</li>
             * </ol>
             *
             * <p> <img src="../assets/images/tree/Red-black_tree_example.svg" width="100%" /> </p>
             *
             * <p> These constraints enforce a critical property of red-black trees: the path from the root to the farthest
             * leaf is no more than twice as long as the path from the root to the nearest leaf. The result is that the tree
             * is roughly height-balanced. Since operations such as inserting, deleting, and finding values require
             * worst-case time proportional to the height of the tree, this theoretical upper bound on the height allows
             * red-black trees to be efficient in the worst case, unlike ordinary binary search trees. </p>
             *
             * <p> To see why this is guaranteed, it suffices to consider the effect of properties 4 and 5 together. For a
             * red-black tree T, let B be the number of <font color='darkBlue'>black</font> nodes in property 5. Let the
             * shortest possible path from the root of T to any leaf consist of B <font color='darkBlue'>black</font> nodes.
             * Longer possible paths may be constructed by inserting <font color='red'>red</font> nodes. However, property 4
             * makes it impossible to insert more than one consecutive <font color='red'>red</font> node. Therefore,
             * ignoring any <font color='darkBlue'>black</font> NIL leaves, the longest possible path consists of 2*B nodes,
             * alternating <font color='darkBlue'>black</font> and <font color='red'>red</font> (this is the worst case).
             * Counting the <font color='darkBlue'>black</font> NIL leaves, the longest possible path consists of 2*B-1
             * nodes. </p>
             *
             * <p> The shortest possible path has all <font color='darkBlue'>black</font> nodes, and the longest possible
             * path alternates between <font color='red'>red</font> and <font color='darkBlue'>black</font> nodes. Since all
             * maximal paths have the same number of <font color='darkBlue'>black</font> nodes, by property 5, this shows
             * that no path is more than twice as long as any other path. </p>
             *
             * <ul>
             *	<li> Reference: https://en.wikipedia.org/w/index.php?title=Red%E2%80%93black_tree&redirect=no </li>
             * </ul>
             *
             * @param <T> Type of elements.
             *
             * @inventor Rudolf Bayer
             * @author Migrated by Jeongho Nam <http://samchon.org>
             */
            class XTree {
                /* =========================================================
                    CONSTRUCTOR
                ========================================================= */
                /**
                 * Default Constructor.
                 */
                constructor() {
                    this.root_ = null;
                }
                /* =========================================================
                    ACCESSORS
                        - GETTERS
                        - COMPARISON
                ============================================================
                    GETTERS
                --------------------------------------------------------- */
                /**
                 * Find a node from its contained value.
                 *
                 * @param val Value to find.
                 */
                find(val) {
                    if (this.root_ == null)
                        return null;
                    let node = this.root_;
                    while (true) {
                        let newNode = null;
                        if (this.is_equals(val, node.value))
                            break; // EQUALS, MEANS MATCHED, THEN TERMINATE
                        else if (this.is_less(val, node.value))
                            newNode = node.left; // LESS, THEN TO THE LEFT
                        else
                            newNode = node.right; // GREATER, THEN TO THE RIGHT
                        // ULTIL CHILD NODE EXISTS
                        if (newNode == null)
                            break;
                        // SHIFT A NEW NODE TO THE NODE TO BE RETURNED
                        node = newNode;
                    }
                    return node;
                }
                /**
                 * Fetch maximum (the rightes?) node from one.
                 *
                 * @param node A node to fetch its maximum node.
                 * @return The maximum node.
                 */
                fetch_maximum(node) {
                    while (node.right != null)
                        node = node.right;
                    return node;
                }
                /* =========================================================
                    ELEMENTS I/O
                        - INSERT
                        - ERASE
                        - COLOR
                        - ROTATION
                ============================================================
                    INSERT
                --------------------------------------------------------- */
                /**
                 * <p> Insert an element with a new node. </p>
                 *
                 * <p> Insertion begins by adding the node as any binary search tree insertion does and by coloring it
                 * <font color='red'>red</font>. Whereas in the binary search tree, we always add a leaf, in the red-black
                 * tree, leaves contain no information, so instead we add a <font color='red'>red</font> interior node, with
                 * two <font color='darkBlue'>black</font> leaves, in place of an existing
                 * <font color='darkBlue'>black</font> leaf. </p>
                 *
                 * <p> What happens next depends on the color of other nearby nodes. The term uncle node will be used to
                 * refer to the sibling of a node's parent, as in human family trees. Note that: </p>
                 *
                 * <ul>
                 *	<li> property 3 (all leaves are <font color='darkBlue'>black</font>) always holds. </li>
                 *	<li>
                 *		property 4 (both children of every <font color='red'>red</font> node are
                 *		<font color='darkBlue'>black</font>) is threatened only by adding a <font color='red'>red</font>
                 *		node, repainting a <font color='darkBlue'>black</font> node <font color='red'>red</font>, or a
                 *		rotation.
                 *	</li>
                 *	<li>
                 *		property 5 (all paths from any given node to its leaf nodes contain the same number of
                 *		<font color='darkBlue'>black</font> nodes) is threatened only by adding a
                 *		<font color='darkBlue'>black</font> node, repainting a <font color='red'>red</font> node
                 *		<font color='darkBlue'>black</font> (or vice versa), or a rotation.
                 *	</li>
                 * </ul>
                 *
                 * <h4> Notes </h4>
                 * <ol>
                 *	<li>
                 *		The label <i><b>N</b></i> will be used to denote the current node (colored
                 *		<font color='red'>red</font>). In the diagrams <i><b>N</b></i> carries a blue contour. At the
                 *		beginning, this is the new node being inserted, but the entire procedure may also be applied
                 *		recursively to other nodes (see case 3). {@link XTreeNode.parent <b>P</b>} will denote
                 *		<i><b>N</b></i>'s parent node, {@link XTreeNode.grand_parent <b>G</b>} will denote <i><b>N</b></i>'s
                 *		grandparent, and {@link XTreeNode.uncle <b>U</b>} will denote <i><b>N</b></i>'s uncle. In between
                 *		some cases, the roles and labels of the nodes are exchanged, but in each case, every label continues
                 *		to represent the same node it represented at the beginning of the case.
                 *	</li>
                 *	<li>
                 *		If a node in the right (target) half of a diagram carries a blue contour it will become the current
                 *		node in the next iteration and there the other nodes will be newly assigned relative to it. Any
                 *		color shown in the diagram is either assumed in its case or implied by those assumptions.
                 *	</li>
                 *	<li>
                 *		A numbered triangle represents a subtree of unspecified depth. A <font color='darkBlue'>black</font>
                 *		circle atop a triangle means that <font color='darkBlue'>black</font>-height of subtree is greater
                 *		by one compared to subtree without this circle. </li>
                 * </ol>
                 *
                 * <p> There are several cases of red-black tree insertion to handle: </p>
                 *
                 * <ul>
                 *	<li> <i><b>N</b></i> is the root node, i.e., first node of red-black tree. </li>
                 *	<li>
                 *		<i><b>N</b></i>'s parent ({@link XTreeNode.parent <b>P</b>}) is <font color='darkBlue'>black</font>.
                 *	</li>
                 *	<li>
                 *		<i><b>N</b></i>'s parent ({@link XTreeNode.parent <b>P</b>}) and uncle
                 *		({@link XTreeNode.uncle <b>U</b>}) are <font color='red'>red</font>.
                 *	</li>
                 *	<li>
                 *		<i><b>N</b></i> is added to right of left child of grandparent, or <i><b>N</b></i> is added to left
                 *		of right child of grandparent ({@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> and
                 *		{@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>).
                 *	</li>
                 *	<li>
                 *		<i><b>N</b></i> is added to left of left child of grandparent, or <i><b>N</b></i> is added to right
                 *		of right child of grandparent ({@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> and
                 *		{@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>).
                 *	</li>
                 * </ul>
                 *
                 * <h4> Note </h4>
                 * <p> Note that inserting is actually in-place, since all the calls above use tail recursion. </p>
                 *
                 * <p> In the algorithm above, all cases are chained in order, except in insert case 3 where it can recurse
                 * to case 1 back to the grandparent node: this is the only case where an iterative implementation will
                 * effectively loop. Because the problem of repair is escalated to the next higher level but one, it takes
                 * maximally h⁄2 iterations to repair the tree (where h is the height of the tree). Because the probability
                 * for escalation decreases exponentially with each iteration the average insertion cost is constant. </p>
                 *
                 * @param val An element to insert.
                 */
                insert(val) {
                    let parent = this.find(val);
                    let node = new tree.XTreeNode(val, tree.Color.RED);
                    if (parent == null)
                        this.root_ = node;
                    else {
                        node.parent = parent;
                        if (this.is_less(node.value, parent.value))
                            parent.left = node;
                        else
                            parent.right = node;
                    }
                    this.insert_case1(node);
                }
                /**
                 * <p> <i><b>N</b></i> is the root node, i.e., first node of red-black tree. </p>
                 *
                 * <p> The current node <i><b>N</b></i> is at the {@link root_ root} of the tree. </p>
                 *
                 * <p> In this case, it is repainted <font color='darkBlue'>black</font> to satisfy property 2 (the root is
                 * <font color='darkBlue'>black</font>). Since this adds one <font color='darkBlue'>black</font> node to
                 * every path at once, property 5 (all paths from any given node to its leaf nodes contain the same number
                 * of <font color='darkBlue'>black</font> nodes) is not violated. </p>
                 *
                 * @param N A node to be inserted or swapped.
                 */
                insert_case1(N) {
                    if (N.parent == null)
                        N.color = tree.Color.BLACK;
                    else
                        this.insert_case2(N);
                }
                /**
                 * <p> <i><b>N</b></i>'s parent ({@link XTreeNode.parent <b>P</b>}) is <font color='darkBlue'>black</font>. </p>
                 *
                 * <p> The current node's parent {@link XTreeNode.parent <b>P</b>} is <font color='darkBlue'>black</font>,
                 * so property 4 (both children of every <font color='red'>red</font> node are
                 * <font color='darkBlue'>black</font>) is not invalidated. </p>
                 *
                 * <p> In this case, the tree is still valid. Property 5 (all paths from any given node to its leaf nodes
                 * contain the same number of <font color='darkBlue'>black</font> nodes) is not threatened, because the
                 * current node <i><b>N</b></i> has two <font color='darkBlue'>black</font> leaf children, but because
                 * <i><b>N</b></i> is <font color='red'>red</font>, the paths through each of its children have the same
                 * number of <font color='darkBlue'>black</font> nodes as the path through the leaf it replaced, which was
                 * <font color='darkBlue'>black</font>, and so this property remains satisfied. </p>
                 *
                 * @param N A node to be inserted or swapped.
                 */
                insert_case2(N) {
                    if (this.fetch_color(N.parent) == tree.Color.BLACK)
                        return;
                    else
                        this.insert_case3(N);
                }
                /**
                 * <p> <i><b>N</b></i>'s parent ({@link XTreeNode.parent <b>P</b>}) and uncle
                 * (<i>{@link XTreeNode.uncle <b>U</b>}</i>) are <font color='red'>red</font>. </p>
                 *
                 * <p> If both the parent {@link XTreeNode.parent <b>P</b>} and the uncle {@link XTreeNode.uncle <b>U</b>}
                 * are <font color='red'>red</font>, then both of them can be repainted <font color='darkBlue'>black</font>
                 * and the grandparent {@link XTreeNode.grand_parent <b>G</b>} becomes <font color='red'>red</font> (to
                 * maintain property 5 (all paths from any given node to its leaf nodes contain the same number of
                 * <font color='darkBlue'>black</font> nodes)). </p>
                 *
                 * <p> Now, the current <font color='red'>red</font> node <i><b>N</b></i> has a
                 * <font color='darkBlue'>black</font> parent. Since any path through the parent or uncle must pass through
                 * the grandparent, the number of <font color='darkBlue'>black</font> nodes on these paths has not changed.
                 *
                 * <p> However, the grandparent {@link XTreeNode.grand_parent <b>G</b>} may now violate properties 2 (The
                 * root is <font color='darkBlue'>black</font>) or 4 (Both children of every <font color='red'>red</font>
                 * node are <font color='darkBlue'>black</font>) (property 4 possibly being violated since
                 * {@link XTreeNode.grand_parent <b>G</b>} may have a <font color='red'>red</font> parent). </p>
                 *
                 * <p> To fix this, the entire procedure is recursively performed on {@link XTreeNode.grand_parent <b>G</b>}
                 * from case 1. Note that this is a tail-recursive call, so it could be rewritten as a loop; since this is
                 * the only loop, and any rotations occur after this loop, this proves that a constant number of rotations
                 * occur. </p>
                 *
                 * <p> <img src="../assets/images/tree/Red-black_tree_insert_case_3.svg" /> </p>
                 *
                 * @param N A node to be inserted or swapped.
                 */
                insert_case3(N) {
                    if (this.fetch_color(N.uncle) == tree.Color.RED) {
                        N.parent.color = tree.Color.BLACK;
                        N.uncle.color = tree.Color.BLACK;
                        N.grand_parent.color = tree.Color.RED;
                        this.insert_case1(N.grand_parent);
                    }
                    else {
                        this.insert_case4(N);
                    }
                }
                /**
                 * <p> <i><b>N</b></i> is added to right of left child of grandparent, or <i><b>N</b></i> is added to left
                 * of right child of grandparent ({@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> and
                 * {@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>). </p>
                 *
                 * <p> The parent {@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> but the uncle
                 * {@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>; also, the current node
                 * <i><b>N</b></i> is the right child of {@link XTreeNode.parent <b>P</b>}, and
                 * {@link XTreeNode.parent <b>P</b>} in turn is the left child of its parent
                 * {@link XTreeNode.grand_parent <b>G</b>}. </p>
                 *
                 * <p> In this case, a left rotation on {@link XTreeNode.parent <b>P</b>} that switches the roles of the
                 * current node <i><b>N</b></i> and its parent {@link XTreeNode.parent <b>P</b>} can be performed; then,
                 * the former parent node {@link XTreeNode.parent <b>P</b>} is dealt with using case 5
                 * (relabeling <i><b>N</b></i> and {@link XTreeNode.parent <b>P</b>}) because property 4 (both children of
                 * every <font color='red'>red</font> node are <font color='darkBlue'>black</font>) is still violated. </p>
                 *
                 * <p> The rotation causes some paths (those in the sub-tree labelled "1") to pass through the node
                 * <i><b>N</b></i> where they did not before. It also causes some paths (those in the sub-tree labelled "3")
                 * not to pass through the node {@link XTreeNode.parent <b>P</b>} where they did before. However, both of
                 * these nodes are <font color='red'>red</font>, so property 5 (all paths from any given node to its leaf
                 * nodes contain the same number of <font color='darkBlue'>black</font> nodes) is not violated by the
                 * rotation. </p>
                 *
                 * <p> After this case has been completed, property 4 (both children of every <font color='red'>red</font>
                 * node are <font color='darkBlue'>black</font>) is still violated, but now we can resolve this by
                 * continuing to case 5. </p>
                 *
                 * <p> <img src="../assets/images/tree/Red-black_tree_insert_case_4.svg" /> </p>
                 *
                 * @param N A node to be inserted or swapped.
                 */
                insert_case4(node) {
                    if (node == node.parent.right && node.parent == node.grand_parent.left) {
                        this.rotate_left(node.parent);
                        node = node.left;
                    }
                    else if (node == node.parent.left && node.parent == node.grand_parent.right) {
                        this.rotate_right(node.parent);
                        node = node.right;
                    }
                    this.insert_case5(node);
                }
                /**
                 * <p> <i><b>N</b></i> is added to left of left child of grandparent, or <i><b>N</b></i> is added to right
                 * of right child of grandparent ({@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> and
                 * {@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>). </p>
                 *
                 * <p> The parent {@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> but the uncle
                 * {@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>, the current node <i><b>N</b></i>
                 * is the left child of {@link XTreeNode.parent <b>P</b>}, and {@link XTreeNode.parent <b>P</b>} is the left
                 * child of its parent {@link XTreeNode.grand_parent <b>G</b>}. </p>
                 *
                 * <p>In this case, a right rotation on {@link XTreeNode.grand_parent <b>G</b>} is performed; the result is a
                 * tree where the former parent {@link XTreeNode.parent <b>P</b>} is now the parent of both the current node
                 * <i><b>N</b></i> and the former grandparent {@link XTreeNode.grand_parent <b>G</b>}. </p>
                 *
                 * <p> {@link XTreeNode.grand_parent <b>G</b>} is known to be <font color='darkBlue'>black</font>, since its
                 * former child {@link XTreeNode.parent <b>P</b>} could not have been <font color='red'>red</font> otherwise
                 * (without violating property 4). Then, the colors of {@link XTreeNode.parent <b>P</b>} and
                 * {@link XTreeNode.grand_parent <b>G</b>} are switched, and the resulting tree satisfies property 4 (both
                 * children of every <font color='red'>red</font> node are <font color='darkBlue'>black</font>). Property 5
                 * (all paths from any given node to its leaf nodes contain the same number of
                 * <font color='darkBlue'>black</font> nodes) also remains satisfied, since all paths that went through any
                 * of these three nodes went through {@link XTreeNode.grand_parent <b>G</b>} before, and now they all go
                 * through {@link XTreeNode.parent <b>P</b>}. In each case, this is the only
                 * <font color='darkBlue'>black</font> node of the three. </p>
                 *
                 * <p> <img src="../assets/images/tree/Red-black_tree_insert_case_5.svg" /> </p>
                 *
                 * @param N A node to be inserted or swapped.
                 */
                insert_case5(node) {
                    node.parent.color = tree.Color.BLACK;
                    node.grand_parent.color = tree.Color.RED;
                    if (node == node.parent.left && node.parent == node.grand_parent.left)
                        this.rotate_right(node.grand_parent);
                    else
                        this.rotate_left(node.grand_parent);
                }
                /* ---------------------------------------------------------
                    ERASE
                --------------------------------------------------------- */
                /**
                 * <p> Erase an element with its node. </p>
                 *
                 * <p> In a regular binary search tree when deleting a node with two non-leaf children, we find either the
                 * maximum element in its left subtree (which is the in-order predecessor) or the minimum element in its
                 * right subtree (which is the in-order successor) and move its value into the node being deleted (as shown
                 * here). We then delete the node we copied the value from, which must have fewer than two non-leaf children.
                 * (Non-leaf children, rather than all children, are specified here because unlike normal binary search
                 * trees, red-black trees can have leaf nodes anywhere, so that all nodes are either internal nodes with
                 * two children or leaf nodes with, by definition, zero children. In effect, internal nodes having two leaf
                 * children in a red-black tree are like the leaf nodes in a regular binary search tree.) Because merely
                 * copying a value does not violate any red-black properties, this reduces to the problem of deleting a node
                 * with at most one non-leaf child. Once we have solved that problem, the solution applies equally to the
                 * case where the node we originally want to delete has at most one non-leaf child as to the case just
                 * considered where it has two non-leaf children. </p>
                 *
                 * <p> Therefore, for the remainder of this discussion we address the deletion of a node with at most one
                 * non-leaf child. We use the label <b>M</b> to denote the node to be deleted; <b>C</b> will denote a
                 * selected child of <b>M</b>, which we will also call "its child". If <b>M</b> does have a non-leaf child,
                 * call that its child, <b>C</b>; otherwise, choose either leaf as its child, <b>C</b>. </p>
                 *
                 * <p> If <b>M</b> is a <font color='red'>red</font> node, we simply replace it with its child <b>C</b>,
                 *  which must be <font color='darkBlue'>black</font> by property 4. (This can only occur when <b>M</b> has
                 * two leaf children, because if the <font color='red'>red</font> node <b>M</b> had a
                 * <font color='darkBlue'>black</font> non-leaf child on one side but just a leaf child on the other side,
                 * then the count of <font color='darkBlue'>black</font> nodes on both sides would be different, thus the
                 * tree would violate property 5.) All paths through the deleted node will simply pass through one fewer
                 * <font color='red'>red</font> node, and both the deleted node's parent and child must be
                 * <font color='darkBlue'>black</font>, so property 3 (all leaves are <font color='darkBlue'>black</font>)
                 * and property 4 (both children of every <font color='red'>red</font> node are
                 * <font color='darkBlue'>black</font>) still hold. </p>
                 *
                 * <p> Another simple case is when <b>M</b> is <font color='darkBlue'>black</font> and <b>C</b> is
                 * <font color='red'>red</font>. Simply removing a <font color='darkBlue'>black</font> node could break
                 * Properties 4 (“Both children of every <font color='red'>red</font> node are
                 * <font color='darkBlue'>black</font>”) and 5 (“All paths from any given node to its leaf nodes contain the
                 * same number of <font color='darkBlue'>black</font> nodes”), but if we repaint <b>C</b>
                 * <font color='darkBlue'>black</font>, both of these properties are preserved. </p>
                 *
                 * <p> The complex case is when both <b>M</b> and <b>C</b> are <font color='darkBlue'>black</font>. (This
                 * can only occur when deleting a <font color='darkBlue'>black</font> node which has two leaf children,
                 * because if the <font color='darkBlue'>black</font> node <b>M</b> had a <font color='darkBlue'>black</font>
                 * non-leaf child on one side but just a leaf child on the other side, then the count of
                 * <font color='darkBlue'>black</font> nodes on both sides would be different, thus the tree would have been
                 * an invalid red-black tree by violation of property 5.) We begin by replacing <b>M</b> with its child
                 * <b>C</b>. We will relabel this child <b>C</b> (in its new position) <i><b>N</b></i>, and its sibling (its
                 * new parent's other child) {@link XTreeNode.sibling <b>S</b>}. ({@link XTreeNode.sibling <b>S</b>} was
                 * previously the sibling of <b>M</b>.) </p>
                 *
                 * <p> In the diagrams below, we will also use {@link XTreeNode.parent <b>P</b>} for <i><b>N</b></i>'s new
                 * parent (<b>M</b>'s old parent), <b>SL</b> for {@link XTreeNode.sibling <b>S</b>}'s left child, and
                 * <b>SR</b> for {@link XTreeNode.sibling <b>S</b>}'s right child ({@link XTreeNode.sibling <b>S</b>} cannot
                 * be a leaf because if <b>M</b> and <b>C</b> were <font color='darkBlue'>black</font>, then
                 * {@link XTreeNode.parent <b>P</b>}'s one subtree which included <b>M</b> counted two
                 * <font color='darkBlue'>black</font>-height and thus {@link XTreeNode.parent <b>P</b>}'s other subtree
                 * which includes {@link XTreeNode.sibling <b>S</b>} must also count two
                 * <font color='darkBlue'>black</font>-height, which cannot be the case if {@link XTreeNode.sibling <b>S</b>}
                 * is a leaf node). </p>
                 *
                 * <h4> Notes </h4>
                 * <ol>
                 *	<li>
                 *		The label <i><b>N</b></i> will be used to denote the current node (colored
                 *		<font color='darkBlue'>black</font>). In the diagrams <i><b>N</b></i> carries a blue contour. At the
                 *		beginning, this is the replacement node and a leaf, but the entire procedure may also be applied
                 *		recursively to other nodes (see case 3). In between some cases, the roles and labels of the nodes
                 *		are exchanged, but in each case, every label continues to represent the same node it represented at
                 *		the beginning of the case.
                 *	</li>
                 *	<li>
                 *		If a node in the right (target) half of a diagram carries a blue contour it will become the current
                 *		node in the next iteration and there the other nodes will be newly assigned relative to it. Any
                 *		color shown in the diagram is either assumed in its case or implied by those assumptions.
                 *		White represents an arbitrary color (either <font color='red'>red</font> or
                 *		<font color='darkBlue'>black</font>), but the same in both halves of the diagram.
                 *	</li>
                 *	<li>
                 *		A numbered triangle represents a subtree of unspecified depth. A <font color='darkBlue'>black</font>
                 *		circle atop a triangle means that <font color='darkBlue'>black</font>-height of subtree is greater
                 *		by one compared to subtree without this circle.
                 *	</li>
                 * </ol>
                 *
                 * <p> If both <i><b>N</b></i> and its original parent are <font color='darkBlue'>black</font>, then
                 * deleting this original parent causes paths which proceed through <i><b>N</b></i> to have one fewer
                 * <font color='darkBlue'>black</font> node than paths that do not. As this violates property 5 (all paths
                 * from any given node to its leaf nodes contain the same number of <font color='darkBlue'>black</font>
                 * nodes), the tree must be rebalanced. There are several cases to consider: </p>
                 *
                 * <ol>
                 *	<li> <i><b>N</b></i> is the new root. </li>
                 *	<li> {@link XTreeNode.sibling <b>S</b>} is <font color='red'>red</font>. </li>
                 *	<li>
                 *		{@link XTreeNode.parent <b>P</b>}, {@link XTreeNode.sibling <b>S</b>}, and
                 *		{@link XTreeNode.sibling <b>S</b>}'s children are <font color='darkBlue'>black</font>. </li>
                 *	<li>
                 *		{@link XTreeNode.sibling <b>S</b>} and {@link XTreeNode.sibling <b>S</b>}'s children are
                 *		<font color='darkBlue'>black</font>, but {@link XTreeNode.parent <b>P</b>} is
                 *		<font color='red'>red</font>.
                 *	</li>
                 *	<li>
                 *		{@link XTreeNode.sibling <b>S</b>} is <font color='darkBlue'>black</font>,
                 *		{@link XTreeNode.sibling <b>S</b>}'s left child is <font color='red'>red</font>,
                 *		{@link XTreeNode.sibling <b>S</b>}'s right child is <font color='darkBlue'>black</font>, and
                 *		<i><b>N</b></i> is the left child of its parent.
                 *	</li>
                 *	<li>
                 *		{@link XTreeNode.sibling <b>S</b>} is <font color='darkBlue'>black</font>,
                 *		{@link XTreeNode.sibling <b>S</b>}'s right child is <font color='red'>red</font>, and
                 *		<i><b>N</b></i> is the left child of its parent {@link XTreeNode.parent <b>P</b>}.
                 *	</li>
                 * </ol>
                 *
                 * <p> Again, the function calls all use tail recursion, so the algorithm is in-place. </p>
                 *
                 * <p> In the algorithm above, all cases are chained in order, except in delete case 3 where it can recurse
                 * to case 1 back to the parent node: this is the only case where an iterative implementation will
                 * effectively loop. No more than h loops back to case 1 will occur (where h is the height of the tree).
                 * And because the probability for escalation decreases exponentially with each iteration the average
                 * removal cost is constant. </p>
                 *
                 * <p> Additionally, no tail recursion ever occurs on a child node, so the tail recursion loop can only
                 * move from a child back to its successive ancestors. If a rotation occurs in case 2 (which is the only
                 * possibility of rotation within the loop of cases 1–3), then the parent of the node <i><b>N</b></i>
                 * becomes <font color='red'>red</font> after the rotation and we will exit the loop. Therefore, at most one
                 * rotation will occur within this loop. Since no more than two additional rotations will occur after
                 * exiting the loop, at most three rotations occur in total. </p>
                 *
                 * @param val An element to erase.
                 */
                erase(val) {
                    let node = this.find(val);
                    if (node == null || this.is_equals(val, node.value) == false)
                        return;
                    if (node.left != null && node.right != null) {
                        let pred = this.fetch_maximum(node.left);
                        node.value = pred.value;
                        node = pred;
                    }
                    let child = (node.right == null) ? node.left : node.right;
                    if (this.fetch_color(node) == tree.Color.BLACK) {
                        node.color = this.fetch_color(child);
                        this.erase_case1(node);
                    }
                    this.replace_node(node, child);
                }
                /**
                 * <p> <i><b>N</b></i> is the new root. </p>
                 *
                 * <p> In this case, we are done. We removed one <font color='darkBlue'>black</font> node from every path,
                 * and the new root is <font color='darkBlue'>black</font>, so the properties are preserved. </p>
                 *
                 * <h4> Note </h4>
                 * <p> In cases 2, 5, and 6, we assume <i><b>N</b></i> is the left child of its parent
                 * {@link XTreeNode.parent <b>P</b>}. If it is the right child, left and right should be reversed throughout
                 * these three cases. Again, the code examples take both cases into account. </p>
                 *
                 * @param N A node to be erased or swapped.
                 */
                erase_case1(N) {
                    if (N.parent == null)
                        return;
                    else
                        this.erase_case2(N);
                }
                /**
                 * <p> {@link XTreeNode.sibling <b>S</b>} is <font color='red'>red</font>. </p>
                 *
                 * <p> <img src="../assets/images/tree/Red-black_tree_delete_case_2.svg" /> </p>
                 *
                 * <p> In this case we reverse the colors of {@link XTreeNode.parent <b>P</b>} and
                 * {@link XTreeNode.sibling <b>S</b>}, and then rotate left at {@link XTreeNode.parent <b>P</b>}, turning
                 * {@link XTreeNode.sibling <b>S</b>} into <i><b>N</b></i>'s grandparent. </p>
                 *
                 * <p> Note that {@link XTreeNode.parent <b>P</b>} has to be <font color='darkBlue'>black</font> as it had a
                 * <font color='red'>red</font> child. The resulting subtree has a path short one
                 * <font color='darkBlue'>black</font> node so we are not done. Now <i><b>N</b></i> has a
                 * <font color='darkBlue'>black</font> sibling and a <font color='red'>red</font> parent, so we can proceed
                 * to step 4, 5, or 6. (Its new sibling is <font color='darkBlue'>black</font> because it was once the child
                 * of the <font color='red'>red</font> {@link XTreeNode.sibling <b>S</b>}.) In later cases, we will re-label
                 * <i><b>N</b></i>'s new sibling as {@link XTreeNode.sibling <b>S</b>}. </p>
                 *
                 * @param N A node to be erased or swapped.
                 */
                erase_case2(N) {
                    if (this.fetch_color(N.sibling) == tree.Color.RED) {
                        N.parent.color = tree.Color.RED;
                        N.sibling.color = tree.Color.BLACK;
                        if (N == N.parent.left)
                            this.rotate_left(N.parent);
                        else
                            this.rotate_right(N.parent);
                    }
                    this.erase_case3(N);
                }
                /**
                 * <p> {@link XTreeNode.parent <b>P</b>}, {@link XTreeNode.sibling <b>S</b>}, and {@link XTreeNode.sibling
                 * <b>S</b>}'s children are <font color='darkBlue'>black</font>. </p>
                 *
                 * <p> <img src="../assets/images/tree/Red-black_tree_delete_case_3.svg" /> </p>
                 *
                 * <p> In this case, we simply repaint {@link XTreeNode.sibling <b>S</b>} <font color='red'>red</font>. The
                 * result is that all paths passing through {@link XTreeNode.sibling <b>S</b>}, which are precisely those
                 * paths not passing through <i><b>N</b></i>, have one less <font color='darkBlue'>black</font> node.
                 * Because deleting <i><b>N</b></i>'s original parent made all paths passing through <i><b>N</b></i> have
                 * one less <font color='darkBlue'>black</font> node, this evens things up. </p>
                 *
                 * <p> However, all paths through {@link XTreeNode.parent <b>P</b>} now have one fewer
                 * <font color='darkBlue'>black</font> node than paths that do not pass through
                 * {@link XTreeNode.parent <b>P</b>}, so property 5 (all paths from any given node to its leaf nodes contain
                 * the same number of <font color='darkBlue'>black</font> nodes) is still violated. </p>
                 *
                 * <p> To correct this, we perform the rebalancing procedure on {@link XTreeNode.parent <b>P</b>}, starting
                 * at case 1. </p>
                 *
                 * @param N A node to be erased or swapped.
                 */
                erase_case3(N) {
                    if (this.fetch_color(N.parent) == tree.Color.BLACK &&
                        this.fetch_color(N.sibling) == tree.Color.BLACK &&
                        this.fetch_color(N.sibling.left) == tree.Color.BLACK &&
                        this.fetch_color(N.sibling.right) == tree.Color.BLACK) {
                        N.sibling.color = tree.Color.RED;
                        this.erase_case1(N.parent);
                    }
                    else
                        this.erase_case4(N);
                }
                /**
                 * <p> {@link XTreeNode.sibling <b>S</b>} and {@link XTreeNode.sibling <b>S</b>}'s children are
                 * <font color='darkBlue'>black</font>, but {@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font>. </p>
                 *
                 * <p> <img src="../assets/images/tree/Red-black_tree_delete_case_4.svg" /> </p>
                 *
                 * <p> In this case, we simply exchange the colors of {@link XTreeNode.sibling <b>S</b>} and
                 * {@link XTreeNode.parent <b>P</b>}. This does not affect the number of <font color='darkBlue'>black</font>
                 * nodes on paths going through {@link XTreeNode.sibling <b>S</b>}, but it does add one to the number of
                 * <font color='darkBlue'>black</font> nodes on paths going through <i><b>N</b></i>, making up for the
                 * deleted <font color='darkBlue'>black</font> node on those paths. </p>
                 *
                 * @param N A node to be erased or swapped.
                 */
                erase_case4(N) {
                    if (this.fetch_color(N.parent) == tree.Color.RED &&
                        N.sibling != null &&
                        this.fetch_color(N.sibling) == tree.Color.BLACK &&
                        this.fetch_color(N.sibling.left) == tree.Color.BLACK &&
                        this.fetch_color(N.sibling.right) == tree.Color.BLACK) {
                        N.sibling.color = tree.Color.RED;
                        N.parent.color = tree.Color.BLACK;
                    }
                    else
                        this.erase_case5(N);
                }
                /**
                 * <p> {@link XTreeNode.sibling <b>S</b>} is <font color='darkBlue'>black</font>, {@link XTreeNode.sibling <b>S</b>}'s
                 * left child is <font color='red'>red</font>, {@link XTreeNode.sibling <b>S</b>}'s right child is
                 * <font color='darkBlue'>black</font>, and <i><b>N</b></i> is the left child of its parent. </p>
                 *
                 * <p> <img src="../assets/images/tree/Red-black_tree_delete_case_5.svg" /> </p>
                 *
                 * <p> In this case we rotate right at {@link XTreeNode.sibling <b>S</b>}, so that
                 * {@link XTreeNode.sibling <b>S</b>}'s left child becomes {@link XTreeNode.sibling <b>S</b>}'s parent and
                 * <i><b>N</b></i>'s new sibling. We then exchange the colors of {@link XTreeNode.sibling <b>S</b>} and its
                 * new parent. </p>
                 *
                 * <p> All paths still have the same number of <font color='darkBlue'>black</font> nodes, but now
                 * <i><b>N</b></i> has a <font color='darkBlue'>black</font> sibling whose right child is
                 * <font color='red'>red</font>, so we fall into case 6. Neither <i><b>N</b></i> nor its parent are affected
                 * by this transformation. (Again, for case 6, we relabel <i><b>N</b></i>'s new sibling as
                 * {@link XTreeNode.sibling <b>S</b>}.) </p>
                 *
                 * @param N A node to be erased or swapped.
                 */
                erase_case5(N) {
                    if (N == N.parent.left &&
                        N.sibling != null &&
                        this.fetch_color(N.sibling) == tree.Color.BLACK &&
                        this.fetch_color(N.sibling.left) == tree.Color.RED &&
                        this.fetch_color(N.sibling.right) == tree.Color.BLACK) {
                        N.sibling.color = tree.Color.RED;
                        N.sibling.left.color = tree.Color.BLACK;
                        this.rotate_right(N.sibling);
                    }
                    else if (N == N.parent.right &&
                        N.sibling != null &&
                        this.fetch_color(N.sibling) == tree.Color.BLACK &&
                        this.fetch_color(N.sibling.left) == tree.Color.BLACK &&
                        this.fetch_color(N.sibling.right) == tree.Color.RED) {
                        N.sibling.color = tree.Color.RED;
                        N.sibling.right.color = tree.Color.BLACK;
                        this.rotate_left(N.sibling);
                    }
                }
                /**
                 * <p> {@link XTreeNode.sibling <b>S</b>} is <font color='darkBlue'>black</font>,
                 * {@link XTreeNode.sibling <b>S</b>}'s right child is <font color='red'>red</font>, and <i><b>N</b></i> is
                 * the left child of its parent {@link XTreeNode.parent <b>P</b>}. </p>
                 *
                 * <p> In this case we rotate left at {@link XTreeNode.parent <b>P</b>}, so that
                 * {@link XTreeNode.sibling <b>S</b>} becomes the parent of {@link XTreeNode.parent <b>P</b>} and
                 * {@link XTreeNode.sibling <b>S</b>}'s right child. We then exchange the colors of
                 * {@link XTreeNode.parent <b>P</b>} and {@link XTreeNode.sibling <b>S</b>}, and make
                 * {@link XTreeNode.sibling <b>S</b>}'s right child <font color='darkBlue'>black</font>. </p>
                 *
                 * <p> The subtree still has the same color at its root, so Properties 4 (Both children of every
                 * <font color='red'>red</font> node are <font color='darkBlue'>black</font>) and 5 (All paths from any
                 * given node to its leaf nodes contain the same number of <font color='darkBlue'>black</font> nodes) are
                 * not violated. However, <i><b>N</b></i> now has one additional <font color='darkBlue'>black</font>
                 * ancestor: either {@link XTreeNode.parent <b>P</b>} has become <font color='darkBlue'>black</font>, or it
                 * was <font color='darkBlue'>black</font> and {@link XTreeNode.sibling <b>S</b>} was added as a
                 * <font color='darkBlue'>black</font> grandparent. </p>
                 *
                 * <p> Thus, the paths passing through <i><b>N</b></i> pass through one additional
                 * <font color='darkBlue'>black</font> node. </p>
                 *
                 * <p> <img src="../assets/images/tree/Red-black_tree_delete_case_6.svg" /> </p>
                 *
                 * <p> Meanwhile, if a path does not go through <i><b>N</b></i>, then there are two possibilities: </p>
                 * <ol>
                 *	<li>
                 *		It goes through <i><b>N</b></i>'s new sibling <b>SL</b>, a node with arbitrary color and the root of
                 *		the subtree labeled 3 (s. diagram). Then, it must go through {@link XTreeNode.sibling <b>S</b>} and
                 *		{@link XTreeNode.parent <b>P</b>}, both formerly and currently, as they have only exchanged colors
                 *		and places. Thus the path contains the same number of <font color='darkBlue'>black</font> nodes.
                 *	</li>
                 *	<li>
                 *		It goes through <i><b>N</b></i>'s new uncle, {@link XTreeNode.sibling <b>S</b>}'s right child. Then,
                 *		it formerly went through {@link XTreeNode.sibling <b>S</b>}, {@link XTreeNode.sibling <b>S</b>}'s
                 *		parent, and {@link XTreeNode.sibling <b>S</b>}'s right child <b>SR</b> (which was
                 *		<font color='red'>red</font>), but now only goes through {@link XTreeNode.sibling <b>S</b>}, which
                 *		has assumed the color of its former parent, and {@link XTreeNode.sibling <b>S</b>}'s right child,
                 *		which has changed from <font color='red'>red</font> to <font color='darkBlue'>black</font> (assuming
                 *		{@link XTreeNode.sibling <b>S</b>}'s color: <font color='darkBlue'>black</font>). The net effect is
                 *		that this path goes through the same number of <font color='darkBlue'>black</font> nodes.
                 *	</li>
                 * </ol>
                 *
                 * <p> Either way, the number of <font color='darkBlue'>black</font> nodes on these paths does not change.
                 * Thus, we have restored Properties 4 (Both children of every <font color='red'>red</font> node are
                 * <font color='darkBlue'>black</font>) and 5 (All paths from any given node to its leaf nodes contain the
                 * same number of <font color='darkBlue'>black</font> nodes). The white node in the diagram can be either
                 * <font color='red'>red</font> or <font color='darkBlue'>black</font>, but must refer to the same color
                 * both before and after the transformation. </p>
                 *
                 * @param N A node to be erased or swapped.
                 */
                erase_case6(node) {
                    node.sibling.color = this.fetch_color(node.parent);
                    node.parent.color = tree.Color.BLACK;
                    if (node == node.parent.left) {
                        node.sibling.right.color = tree.Color.BLACK;
                        this.rotate_left(node.parent);
                    }
                    else {
                        node.sibling.left.color = tree.Color.BLACK;
                        this.rotate_right(node.parent);
                    }
                }
                /* ---------------------------------------------------------
                    ROTATION
                --------------------------------------------------------- */
                /**
                 * Rotate a node left.
                 *
                 * @param node Node to rotate left.
                 */
                rotate_left(node) {
                    let right = node.right;
                    this.replace_node(node, right);
                    node.right = right.left;
                    if (right.left != null)
                        right.left.parent = node;
                    right.left = node;
                    node.parent = right;
                }
                /**
                 * Rotate a node to right.
                 *
                 * @param node A node to rotate right.
                 */
                rotate_right(node) {
                    let left = node.left;
                    this.replace_node(node, left);
                    node.left = left.right;
                    if (left.right != null)
                        left.right.parent = node;
                    left.right = node;
                    node.parent = left;
                }
                /**
                 * Replace a node.
                 *
                 * @param oldNode Ordinary node to be replaced.
                 * @param newNode Target node to replace.
                 */
                replace_node(oldNode, newNode) {
                    if (oldNode.parent == null)
                        this.root_ = newNode;
                    else {
                        if (oldNode == oldNode.parent.left)
                            oldNode.parent.left = newNode;
                        else
                            oldNode.parent.right = newNode;
                    }
                    if (newNode != null)
                        newNode.parent = oldNode.parent;
                }
                /* ---------------------------------------------------------
                    COLOR
                --------------------------------------------------------- */
                /**
                 * Fetch color from a node.
                 *
                 * @param node A node to fetch color.
                 * @retur color.
                 */
                fetch_color(node) {
                    if (node == null)
                        return tree.Color.BLACK;
                    else
                        return node.color;
                }
            }
            tree.XTree = XTree;
        })(tree = base.tree || (base.tree = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="XTree.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        var tree;
        (function (tree) {
            /**
             * @author Jeongho Nam <http://samchon.org>
             */
            class AtomicTree extends tree.XTree {
                /* ---------------------------------------------------------
                    CONSTRUCTOR
                --------------------------------------------------------- */
                /**
                 * Default Constructor.
                 */
                constructor(compare = std.less) {
                    super();
                    this.compare_ = compare;
                }
                find(val) {
                    if (val instanceof std.SetIterator && val.value instanceof std.SetIterator == false)
                        return super.find(val);
                    else
                        return this.find_by_val(val);
                }
                /**
                 * @hidden
                 */
                find_by_val(val) {
                    if (this.root_ == null)
                        return null;
                    let node = this.root_;
                    while (true) {
                        let newNode = null;
                        if (std.equals(val, node.value.value))
                            break; // EQUALS, MEANS MATCHED, THEN TERMINATE
                        else if (std.less(val, node.value.value))
                            newNode = node.left; // LESS, THEN TO THE LEFT
                        else
                            newNode = node.right; // GREATER, THEN TO THE RIGHT
                        // ULTIL CHILD NODE EXISTS
                        if (newNode == null)
                            break;
                        // SHIFT A NEW NODE TO THE NODE TO BE RETURNED
                        node = newNode;
                    }
                    return node;
                }
                /* ---------------------------------------------------------
                    COMPARISON
                --------------------------------------------------------- */
                get_compare() {
                    return this.compare_;
                }
                /**
                 * @inheritdoc
                 */
                is_equals(left, right) {
                    return std.equals(left, right);
                }
                /**
                 * @inheritdoc
                 */
                is_less(left, right) {
                    return this.compare_(left.value, right.value);
                }
            }
            tree.AtomicTree = AtomicTree;
        })(tree = base.tree || (base.tree = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        var tree;
        (function (tree) {
            /**
             * <p> Static class holding enumeration codes of color of Red-black tree. </p>
             *
             * <p> Color codes imposed to nodes of RB-Tree are following those rules: </p>
             *
             * <ol>
             *	<li> A node is either <font color='red'>red</font> or <font color='darkBlue'>black</font>. </li>
             *	<li> The root is <font color='darkBlue'>black</font>. This rule is sometimes omitted. Since the root can
             *		 always be changed from <font color='red'>red</font> to <font color='darkBlue'>black</font>, but not
             *		 necessarily vice versa, this rule has little effect on analysis. </li>
             *	<li> All leaves (NIL; <code>null</code>) are <font color='darkBlue'>black</font>. </li>
             *  <li> If a node is <font color='red'>red</font>, then both its children are
             *		 <font color='darkBlue'>black</font>. </li>
             *  <li> Every path from a given node to any of its descendant NIL nodes contains the same number of
             *		 <font color='darkBlue'>black</font> nodes. Some definitions: the number of
             *		 <font color='darkBlue'>black</font> nodes from the root to a node is the node's
             *		 <font color='darkBlue'>black</font> depth; the uniform number of <font color='darkBlue'>black</font>
             *		 nodes in all paths from root to the leaves is called the <font color='darkBlue'>black</font>-height of
             *		 the red-black tree. </li>
             * </ol>
             *
             * @author Migrated by Jeongho Nam <http://samchon.org>
             */
            (function (Color) {
                /**
                 * <p> Code of color black. </p>
                 *
                 * <ul>
                 *	<li> Those are clearly black: root, leaf nodes or children nodes of red. </li>
                 *	<li> Every path from a given nodes containes the same number of black nodes exclude NIL(s). </li>
                 * </ul>
                 */
                Color[Color["BLACK"] = 0] = "BLACK";
                /**
                 * <p> Code of color red. </p>
                 */
                Color[Color["RED"] = 1] = "RED";
            })(tree.Color || (tree.Color = {}));
            var Color = tree.Color;
        })(tree = base.tree || (base.tree = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="XTree.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        var tree;
        (function (tree) {
            /**
             * @author Jeongho Nam <http://samchon.org>
             */
            class PairTree extends tree.XTree {
                /* ---------------------------------------------------------
                    CONSTRUCTOR
                --------------------------------------------------------- */
                /**
                 * Default Constructor.
                 */
                constructor(compare = std.less) {
                    super();
                    this.compare_ = compare;
                }
                find(val) {
                    if (val instanceof std.MapIterator && val.first instanceof std.SetIterator == false)
                        return super.find(val);
                    else
                        return this.find_by_key(val);
                }
                /**
                 * @hidden
                 */
                find_by_key(key) {
                    if (this.root_ == null)
                        return null;
                    let node = this.root_;
                    while (true) {
                        let newNode = null;
                        if (std.equals(key, node.value.first))
                            break; // EQUALS, MEANS MATCHED, THEN TERMINATE
                        else if (std.less(key, node.value.first))
                            newNode = node.left; // LESS, THEN TO THE LEFT
                        else
                            newNode = node.right; // GREATER, THEN TO THE RIGHT
                        // ULTIL CHILD NODE EXISTS
                        if (newNode == null)
                            break;
                        // SHIFT A NEW NODE TO THE NODE TO BE RETURNED
                        node = newNode;
                    }
                    return node;
                }
                /* ---------------------------------------------------------
                    COMPARISON
                --------------------------------------------------------- */
                get_compare() {
                    return this.compare_;
                }
                /**
                 * @inheritdoc
                 */
                is_equals(left, right) {
                    return std.equals(left.first, right.first);
                }
                /**
                 * @inheritdoc
                 */
                is_less(left, right) {
                    return this.compare_(left.first, right.first);
                }
            }
            tree.PairTree = PairTree;
        })(tree = base.tree || (base.tree = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        var tree;
        (function (tree) {
            /**
             * <p> A node in an XTree. </p>
             *
             * @param <T> Type of elements.
             *
             * @inventor Rudolf Bayer
             * @author Migrated by Jeongho Nam <http://samchon.org>
             */
            class XTreeNode {
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                /**
                 * Construct from value and color of node.
                 *
                 * @param value Value to be stored in.
                 * @param color Color of the node, red or black.
                 */
                constructor(value, color) {
                    this.value = value;
                    this.color = color;
                    this.parent = null;
                    this.left = null;
                    this.right = null;
                }
                /**
                 * Get grand-parent.
                 */
                get grand_parent() {
                    return this.parent.parent;
                }
                /**
                 * Get sibling, opposite side node in same parent.
                 */
                get sibling() {
                    if (this == this.parent.left)
                        return this.parent.right;
                    else
                        return this.parent.left;
                }
                /**
                 * Get uncle, parent's sibling.
                 */
                get uncle() {
                    return this.parent.sibling;
                }
            }
            tree.XTreeNode = XTreeNode;
        })(tree = base.tree || (base.tree = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    /**
     * Bind function arguments.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Bind {
        /**
         * Construct from function and this argument.
         *
         * @param func
         * @param this_arg
         */
        constructor(func, this_arg) {
            this.func_ = func;
            this.this_arg_ = this_arg;
        }
        /**
         *
         * @param args
         */
        apply(...args) {
            return this.func_.apply(this.this_arg_, args);
        }
        equals(obj) {
            return this.func_ == obj.func_ && this.this_arg_ == obj.this_arg_;
        }
    }
    std.Bind = Bind;
})(std || (std = {}));
/// <reference path="base/container/Container.ts" />
var std;
(function (std) {
    /**
     * <p> Double ended queue. </p>
     *
     * <p> {@link Deque} (usually pronounced like "<i>deck</i>") is an irregular acronym of
     * <b>d</b>ouble-<b>e</b>nded <b>q</b>ueue. Double-ended queues are sequence containers with dynamic
     * sizes that can be expanded or contracted on both ends (either its front or its back). </p>
     *
     * <p> Specific libraries may implement deques in different ways, generally as some form of dynamic
     * array. But in any case, they allow for the individual elements to be accessed directly through
     * random access iterators, with storage handled automatically by expanding and contracting the
     * container as needed. </p>
     *
     * <p> Therefore, they provide a functionality similar to vectors, but with efficient insertion and
     * deletion of elements also at the beginning of the sequence, and not only at its end. But, unlike
     * {@link Vector}s, {@link Deque}s are not guaranteed to store all its elements in contiguous storage
     * locations: accessing elements in a <u>deque</u> by offsetting a pointer to another element causes
     * undefined behavior. </p>
     *
     * <p> Both {@link Vector}s and {@link Deque}s provide a very similar interface and can be used for
     * similar purposes, but internally both work in quite different ways: While {@link Vector}s use a
     * single array that needs to be occasionally reallocated for growth, the elements of a {@link Deque}
     * can be scattered in different chunks of storage, with the container keeping the necessary information
     * internally to provide direct access to any of its elements in constant time and with a uniform
     * sequential interface (through iterators). Therefore, {@link Deque}s are a little more complex
     * internally than {@link Vector}s, but this allows them to grow more efficiently under certain
     * circumstances, especially with very long sequences, where reallocations become more expensive. </p>
     *
     * <p> For operations that involve frequent insertion or removals of elements at positions other than
     * the beginning or the end, {@link Deque}s perform worse and have less consistent iterators and
     * references than {@link List}s. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Sequence </dt>
     *	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements
     *		 are accessed by their position in this sequence. </dd>
     *
     *	<dt> Dynamic array </dt>
     *	<dd> Generally implemented as a dynamic array, it allows direct access to any element in the
     *		 sequence and provides relatively fast addition/removal of elements at the beginning or the end
     *		 of the sequence. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/deque/deque/ </li>
     * </ul>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Deque extends std.base.container.Container {
        constructor(...args) {
            super();
            if (args.length == 0) {
                this.clear();
            }
            if (args.length == 1 && args[0] instanceof Array) {
                let array = args[0];
                this.clear();
                this.push(...array);
            }
            else if (args.length == 1 && args[0] instanceof std.base.container.Container) {
                let container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 &&
                args[0] instanceof std.base.container.Iterator && args[1] instanceof std.base.container.Iterator) {
                let begin = args[0];
                let end = args[1];
                this.assign(begin, end);
            }
        }
        static get iterator() { return std.ListIterator; }
        /**
         * <p> Row size of the {@link matrix_ matrix} which contains elements. </p>
         *
         * <p> Note that the {@link ROW} affects on time complexity of accessing and inserting element.
         * Accessing element is {@link ROW} times slower than ordinary {@link Vector} and inserting element
         * in middle position is {@link ROW} times faster than ordinary {@link Vector}. </p>
         *
         * <p> When the {@link ROW} returns 8, time complexity of accessing element is O(8) and inserting
         * element in middle position is O(N/8). ({@link Vector}'s time complexity of accessement is O(1)
         * and inserting element is O(N)). </p>
         */
        static get ROW() { return 8; }
        /**
         * <p> Minimum {@link capacity}. </p>
         *
         * <p> Although a {@link Deque} has few elements, even no element is belonged to, the {@link Deque}
         * keeps the minimum {@link capacity} at least. </p>
         */
        static get MIN_CAPACITY() { return 100; }
        /**
         * Get column size; {@link capacity_ capacity} / {@link ROW row}.
         */
        get_col_size() {
            return Math.floor(this.capacity_ / Deque.ROW);
        }
        assign(first, second) {
            // CLEAR PREVIOUS CONTENTS
            this.clear();
            if (first instanceof std.base.container.Iterator && second instanceof std.base.container.Iterator) {
                let begin = first;
                let end = second;
                let size = 0;
                for (let it = begin; !it.equals(end); it = it.next())
                    size++;
                // RESERVE
                this.reserve(size);
                this.size_ = size;
                // ASSIGN CONTENTS
                let array = this.matrix_[0];
                for (let it = begin; !it.equals(end); it = it.next()) {
                    if (array.length >= this.get_col_size()) {
                        array = new Array();
                        this.matrix_.push(array);
                    }
                    array.push(it.value);
                }
            }
            else {
                let size = first;
                let val = second;
                // RESERVE
                this.reserve(size);
                this.size_ = size;
                // ASSIGN CONTENTS
                let array = this.matrix_[0];
                for (let i = 0; i < size; i++) {
                    if (array.length >= this.get_col_size()) {
                        array = new Array();
                        this.matrix_.push(array);
                    }
                    array.push(val);
                }
            }
        }
        /**
         * @inheritdoc
         */
        reserve(capacity) {
            let prevMatrix = this.matrix_;
            let prevSize = this.size_;
            this.clear();
            // RESERVE
            this.size_ = prevSize;
            let array = this.matrix_[0];
            for (let i = 0; i < prevMatrix.length; i++)
                for (let j = 0; j < prevMatrix[i].length; j++) {
                    if (array.length >= this.get_col_size()) {
                        array = new Array();
                        this.matrix_.push(array);
                    }
                    array.push(prevMatrix[i][j]);
                }
        }
        /**
         * @inheritdoc
         */
        clear() {
            this.matrix_ = new Array();
            this.matrix_.push(new Array());
            this.size_ = 0;
            this.capacity_ = Deque.MIN_CAPACITY;
        }
        /* =========================================================
            ACCESSORS
                - GETTERS & SETTERS
                - ITERATORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        begin() {
            if (this.empty() == true)
                return this.end();
            else
                return new std.DequeIterator(this, 0);
        }
        /**
         * @inheritdoc
         */
        end() {
            return new std.DequeIterator(this, -1);
        }
        /**
         * @inheritdoc
         */
        size() {
            return this.size_;
        }
        /**
         * @inheritdoc
         */
        capacity() {
            return this.capacity_;
        }
        /**
         * @inheritdoc
         */
        at(index) {
            if (index > this.size())
                throw new std.OutOfRange("Target index is greater than Deque's size.");
            let indexPair = this.fetch_index(index);
            return this.matrix_[indexPair.first][indexPair.second];
        }
        /**
         * @inheritdoc
         */
        set(index, val) {
            if (index > this.size())
                throw new std.OutOfRange("Target index is greater than Deque's size.");
            let indexPair = this.fetch_index(index);
            this.matrix_[indexPair.first][indexPair.second] = val;
        }
        /**
         * @inheritdoc
         */
        front() {
            return this.matrix_[0][0];
        }
        /**
         * @inheritdoc
         */
        back() {
            let lastArray = this.matrix_[this.matrix_.length - 1];
            return lastArray[lastArray.length - 1];
        }
        /**
         * <p> Fetch row and column's index. </p>
         *
         * <p> Fetches index of row and column of {@link matrix_} from sequence number. </p>
         *
         * @param index Sequence number
         */
        fetch_index(index) {
            let row;
            for (row = 0; row < this.matrix_.length; row++) {
                let array = this.matrix_[row];
                if (index < array.length)
                    break;
                index -= array.length;
            }
            if (row == this.matrix_.length)
                row--;
            return new std.Pair(row, index);
        }
        /* =========================================================
            ELEMENTS I/O
                - PUSH & POP
                - INSERT
                - ERASE
        ============================================================
            PUSH & POP
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        push(...items) {
            if (this.size_ + items.length > this.capacity_)
                this.reserve(this.size_ + items.length);
            let array = this.matrix_[this.matrix_.length - 1];
            for (let i = 0; i < items.length; i++) {
                if (array.length >= this.get_col_size()) {
                    array = new Array();
                    this.matrix_.push(array);
                }
                array.push(items[i]);
            }
            this.size_ += items.length;
            return this.size_;
        }
        /**
         * @inheritdoc
         */
        push_front(val) {
            // INSERT TO THE FRONT
            this.matrix_[0].unshift(val);
            this.size_++;
            if (this.size_ > this.capacity_)
                this.reserve(this.size_ * 2);
        }
        /**
         * @inheritdoc
         */
        push_back(val) {
            let lastArray = this.matrix_[this.matrix_.length - 1];
            if (lastArray.length >= this.get_col_size() && this.matrix_.length < Deque.ROW) {
                lastArray = new Array();
                this.matrix_.push(lastArray);
            }
            lastArray.push(val);
            this.size_++;
            if (this.size_ > this.capacity_)
                this.reserve(this.size_ * 2);
        }
        /**
         * @inheritdoc
         */
        pop_front() {
            if (this.empty() == true)
                return; // SOMEWHERE PLACE TO THROW EXCEPTION
            this.matrix_[0].shift();
            this.size_--;
            if (this.matrix_[0].length == 0)
                this.matrix_.shift();
        }
        /**
         * @inheritdoc
         */
        pop_back() {
            if (this.empty() == true)
                return; // SOMEWHERE PLACE TO THROW EXCEPTION
            let lastArray = this.matrix_[this.matrix_.length - 1];
            lastArray.splice(lastArray.length - 1, 1);
            this.size_--;
            if (lastArray.length == 0)
                this.matrix_.splice(this.matrix_.length - 1, 1);
        }
        insert(position, ...args) {
            let items = [];
            if (args.length == 1) {
                let val = args[0];
                items.push(val);
            }
            else if (args.length == 2 && typeof args[0] == "number") {
                let n = args[0];
                let val = args[1];
                for (let i = 0; i < n; i++)
                    items.push(val);
            }
            else if (args.length == 2 && args[0] instanceof std.base.container.Iterator && args[1] instanceof std.base.container.Iterator) {
                let begin = args[0];
                let end = args[1];
                for (let it = begin; !it.equals(end); it = it.next())
                    items.push(it.value);
            }
            // -----------------------------------------------------
            // INSERT ITEMS
            // -----------------------------------------------------
            // INSERTS CAREFULLY
            if (position.equals(this.end()) == true) {
                // WHEN INSERTS TO THE BACK SIDE
                this.push(...items);
                return;
            }
            this.size_ += items.length;
            if (this.size_ <= this.capacity_) {
                // ------------------------------------------------------
                // WHEN FITTING INTO RESERVED CAPACITY IS POSSIBLE
                // ------------------------------------------------------
                // INSERTS CAREFULLY CONSIDERING THE COL_SIZE
                let indexPair = this.fetch_index(position.index);
                let index = indexPair.first;
                let splicedValues = this.matrix_[index].splice(indexPair.second);
                if (splicedValues.length != 0)
                    items = items.concat(...splicedValues);
                if (this.matrix_[index].length < Deque.ROW) {
                    this.matrix_[index] =
                        this.matrix_[index].concat(...items.splice(0, Deque.ROW - this.matrix_[index].length));
                }
                let splicedArray = this.matrix_.splice(index + 1);
                // INSERTS
                while (items.length != 0)
                    this.matrix_.push(items.splice(0, Math.min(Deque.ROW, items.length)));
                // CONCAT WITH BACKS
                this.matrix_ = this.matrix_.concat(...splicedArray);
            }
            else {
                // -----------------------------------------------------
                // WHEN CANNOT BE FIT INTO THE RESERVED CAPACITY
                // -----------------------------------------------------
                // JUST INSERT CARELESSLY
                // AND KEEP BLANACE BY THE RESERVE() METHOD
                if (position.equals(this.end()) == true) {
                    this.matrix_.push(items); // ALL TO THE LAST
                }
                else {
                    let indexPair = this.fetch_index(position.index);
                    let index = indexPair.first;
                    let splicedValues = this.matrix_[index].splice(indexPair.second);
                    if (splicedValues.length != 0)
                        items = items.concat(...splicedValues);
                    // ALL TO THE MIDDLE
                    this.matrix_[index] = this.matrix_[index].concat(...items);
                }
                // AND KEEP BALANCE BY RESERVE()
                this.reserve(this.size_);
            }
            return position;
        }
        erase(begin, end = null) {
            if (end == null)
                end = begin.next();
            let index = begin.index;
            let size = end.index - index;
            this.size_ -= size;
            while (size != 0) {
                let indexPair = this.fetch_index(index);
                let array = this.matrix_[indexPair.first];
                let myDeleteSize = Math.min(size, array.length - indexPair.second);
                array.splice(indexPair.second, myDeleteSize);
                if (array.length == 0)
                    this.matrix_.splice(indexPair.first, 1);
                size -= myDeleteSize;
            }
            return begin;
        }
        /* ===============================================================
            UTILITIES
        =============================================================== */
        /**
         * @inheritdoc
         */
        swap(obj) {
            if (obj instanceof Deque)
                this.swap_deque(obj);
            else
                super.swap(obj);
        }
        /**
         * @hidden
         */
        swap_deque(obj) {
            let supplement = new Object();
            supplement.matrix_ = this.matrix_;
            supplement.size_ = this.size_;
            supplement.capacity_ = this.capacity_;
            this.matrix_ = obj.matrix_;
            this.size_ = obj.size_;
            this.capacity_ = obj.capacity_;
            obj.matrix_ = supplement.matrix_;
            obj.size_ = supplement.size_;
            obj.capacity_ = supplement.capacity_;
        }
    }
    std.Deque = Deque;
})(std || (std = {}));
/// <reference path="base/container/Iterator.ts" />
var std;
(function (std) {
    /**
     * An iterator of {@link Deque}.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class DequeIterator extends std.base.container.Iterator {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * <p> Construct from the source {@link Deque container}. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create the iterator directly, by yourself. </p>
         * <p> Use {@link Deque.begin begin()}, {@link Deque.end end()} in {@link Deque container} instead. </p>
         *
         * @param source The source {@link Deque container} to reference.
         * @param index Sequence number of the element in the source {@link Deque}.
         */
        constructor(source, index) {
            super(source);
            this.index_ = index;
        }
        get deque() { return this.source_; }
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        get value() {
            return this.deque.at(this.index_);
        }
        set value(val) {
            this.deque.set(this.index_, val);
        }
        /**
         * @inheritdoc
         */
        equals(obj) {
            return super.equals(obj) && this.index_ == obj.index_;
        }
        /**
         * @inheritdoc
         */
        get index() {
            return this.index_;
        }
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        prev() {
            if (this.index_ == -1)
                return new DequeIterator(this.deque, this.deque.size() - 1);
            else if (this.index_ - 1 < 0)
                return this.deque.end();
            else
                return new DequeIterator(this.deque, this.index_ - 1);
        }
        /**
         * @inheritdoc
         */
        next() {
            if (this.index_ >= this.source_.size() - 1)
                return this.deque.end();
            else
                return new DequeIterator(this.deque, this.index_ + 1);
        }
        /**
         * @inheritdoc
         */
        advance(n) {
            let new_index = this.index_ + n;
            if (new_index < 0 || new_index >= this.deque.size())
                return this.deque.end();
            else
                return new DequeIterator(this.deque, new_index);
        }
        /**
         * @inheritdoc
         */
        swap(obj) {
            let supplement = this.value;
            this.value = obj.value;
            obj.value = supplement;
        }
    }
    std.DequeIterator = DequeIterator;
})(std || (std = {}));
/*
//////////////////////////////////////////
// List of ambigious names for notation
//////////////////////////////////////////
// CLASSES
// ---------------------------------------
    - vector					Vector
    - deque						Deque
    - list						List
    - set						Set
    - map						Map
    - multiset					MultiSet
    - multimap					MultiMap
    - unordered_set				HashSet
    - unordered_map				HashMap
    - unordered_multiset		HashMultiSet
    - unordered_multimap		HashMultiMap

    - exception...				Exception...
    - error_code				ErrorCode
    - error_condition			ErrorCondition
    - system_error				SystemError
// ---------------------------------------
//	METHOD
// ---------------------------------------
    - push_front				pushFront
    - push_back					pushBack
    - pop_front					popFront
    - pop_back					popBack

    - equal_range				equalRange
    - lower_bound				lowerBound
    - upper_bound				upperBound

    - getSource					getSource
    - get_list_iterator			getListIterator
    - default_error_condition	defaultErrorCondition
*/ 
var std;
(function (std) {
    /**
     * <p> Error category. </p>
     *
     * <p> This type serves as a base class for specific category types. </p>
     *
     * <p> Category types are used to identify the source of an error. They also define the relation between
     * {@link ErrorCode} and {@link ErrorCondition}objects of its category, as well as the message
     * set for {@link ErrorCode} objects.
     *
     * <p> Objects of these types have no distinct values and are not-copyable and not-assignable, and thus can
     * only be passed by reference. As such, only one object of each of these types shall exist, each uniquely
     * identifying its own category: all error codes and conditions of a same category shall return a reference
     * to same object. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_category/ </li>
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class ErrorCategory {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Default Constructor.
         */
        constructor() {
        }
        /* ---------------------------------------------------------
            OPERATORS
        --------------------------------------------------------- */
        /**
         * <p> Default error condition. </p>
         *
         * <p> Returns the default {@link ErrorCondition}object of this category that is associated with
         * the {@link ErrorCode} identified by a value of <i>val</i>. </p>
         *
         * <p> Its definition in the base class {@link ErrorCategory} returns the same as constructing an
         * {@link ErrorCondition}object with:
         *
         * <p> <code>new ErrorCondition(val, *this);</code> </p>
         *
         * <p> As a virtual member function, this behavior can be overriden in derived classes. </p>
         *
         * <p> This function is called by the default definition of member {@link equivalent equivalent()}, which is
         * used to compare {@link ErrorCondition error conditions} with error codes. </p>
         *
         * @param val A numerical value identifying an error condition.
         *
         * @return The default {@link ErrorCondition}object associated with condition value <i>val</i>
         *		   for this category.
         */
        default_error_condition(val) {
            return null;
        }
        equivalent(...args) {
            return false;
        }
    }
    std.ErrorCategory = ErrorCategory;
})(std || (std = {}));
/// <reference path="base/system/ErrorInstance.ts" />
var std;
(function (std) {
    /**
     * <p> Error code. </p>
     *
     * <p> Objects of this type hold an error code {@link value} associated with a {@link category}. </p>
     *
     * <p> The operating system and other low-level applications and libraries generate numerical error codes to
     * represent possible results. These numerical values may carry essential information for a specific platform,
     * but be non-portable from one platform to another. </p>
     *
     * <p> Objects of this class associate such numerical codes to {@link ErrorCategory error categories}, so that they
     * can be interpreted when needed as more abstract (and portable) {@link ErrorCondition error conditions}. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_code/ </li>
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class ErrorCode extends std.base.system.ErrorInstance {
        constructor(val = 0, category = null) {
            super(val, category);
        }
    }
    std.ErrorCode = ErrorCode;
})(std || (std = {}));
/// <reference path="base/system/ErrorInstance.ts" />
var std;
(function (std) {
    /**
     * <p> Error condition. </p>
     *
     * <p> Objects of this type hold a condition {@link value} associated with a {@link category}. </p>
     *
     * <p> Objects of this type describe errors in a generic way so that they may be portable across different
     * systems. This is in contrast with {@link ErrorCode} objects, that may contain system-specific
     * information. </p>
     *
     * <p> Because {@link ErrorCondition}objects can be compared with error_code objects directly by using
     * <code>relational operators</code>, {@link ErrorCondition}objects are generally used to check whether
     * a particular {@link ErrorCode} obtained from the system matches a specific error condition no matter
     * the system. </p>
     *
     * <p> The {@link ErrorCategory categories} associated with the {@link ErrorCondition} and the
     * {@link ErrorCode} define the equivalences between them. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_condition/ </li>
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class ErrorCondition extends std.base.system.ErrorInstance {
        constructor(val = 0, category = null) {
            super(val, category);
        }
    }
    std.ErrorCondition = ErrorCondition;
})(std || (std = {}));
var std;
(function (std) {
    var example;
    (function (example) {
        function test_deque() {
            let deque = new std.Deque();
            for (let i = 0; i < 10; i++)
                deque.push_back(i);
            let it = deque.begin().advance(3);
            it = deque.erase(it); // erase 3
            console.log(it.value); // print 4
            it = deque.begin().advance(2);
            it = deque.insert(it, -1); // insert -1
            console.log(it.next().value); // print 2
            it = deque.begin().advance(6);
            it = deque.erase(it, it.advance(3)); // erase from 6 to 9
            //console.log(it.value); // print 9
            console.log(it.equals(deque.end()));
            console.log("-------------------------------------");
            for (let it = deque.begin(); !it.equals(deque.end()); it = it.next())
                console.log(it.value);
        }
        example.test_deque = test_deque;
    })(example = std.example || (std.example = {}));
})(std || (std = {}));
var std;
(function (std) {
    var example;
    (function (example) {
        function test_for_each() {
            let array = new std.Vector();
            for (let i = 0; i < 20; i++)
                array.push_back(i);
            let fn = std.for_each(array.begin(), array.end(), function (val) { console.log(val); });
        }
        example.test_for_each = test_for_each;
    })(example = std.example || (std.example = {}));
})(std || (std = {}));
var std;
(function (std) {
    var example;
    (function (example) {
        function test_hash_map() {
            /////////////////////////////////////
            // CONSTRUCT DATA FROM 1 TO 10
            /////////////////////////////////////
            let map = new std.HashMap();
            for (let i = 0; i < 10; i++)
                map.insert([i, "Its key is " + i]);
            /////////////////////////////////////
            //  ELEMENT I/O
            /////////////////////////////////////
            // ERASE AN ELEMENT
            let it = map.find(3); // find 3.
            it = map.erase(it); // erase 3. [it] points key 4.
            console.log(it.first); // prints key 4.
            // INSERT AN ELEMENT
            it = map.begin().advance(2); // [it] points key 2 (0 ----> 2)
            it = map.insert(it, [-1, "Its key is -1"]);
            // [it] points key -1=
            // key list: [0, 1, -1, 2, 4, 5, 6, 7, 8, 9]
            console.log(it.next().first); // prints 2, next of [it] (-1 -> 2)
            // RANGE ERASER
            let px = map.begin().advance(6);
            let py = map.begin().advance(9);
            it = map.erase(map.begin().advance(6), map.begin().advance(9));
            // erase elements from 6th until 9th.
            // INSPECT ELEMENTS BY THEIR KEY
            // key list: [0, 1, -1, 2, 4, 5, 9]
            console.log("has 7:", map.has(7));
            console.log("count 5:", map.count(5));
            console.log("it is end():", it.equals(map.end()));
            /////////////////////////////////////
            // PRINT ALL ELEMENTS
            /////////////////////////////////////
            console.log("------------------------------");
            // key list: [0, 1, -1, 2, 4, 5, 9]
            for (let it = map.begin(); !it.equals(map.end()); it = it.next())
                console.log(it.second);
            /* OUTPUT
            =========================================
                4
                2
                has 7: true
                count 5: 1
                it is end(): false
                ------------------------------
                Its key is 0
                Its key is 1
                Its key is -1
                Its key is 2
                Its key is 4
                Its key is 5
                Its key is 9
            =========================================
            */
        }
        example.test_hash_map = test_hash_map;
    })(example = std.example || (std.example = {}));
})(std || (std = {}));
var std;
(function (std) {
    var example;
    (function (example) {
        function test_list() {
            let list = new std.List();
            for (let i = 0; i < 10; i++)
                list.push_back(i);
            let it = list.begin().advance(3);
            it = list.erase(it); // erase 3
            console.log(it.value); // print 4
            it = list.begin().advance(2);
            it = list.insert(it, -1); // insert -1
            console.log(it.next().value); // print 2
            it = list.begin().advance(6);
            it = list.erase(it, it.advance(3)); // erase from 6 to 9
            //console.log(it.value); // print 9
            console.log(it.equals(list.end()));
            console.log("-------------------------------------");
            for (let it = list.begin(); !it.equals(list.end()); it = it.next())
                console.log(it.value);
        }
        example.test_list = test_list;
    })(example = std.example || (std.example = {}));
})(std || (std = {}));
var std;
(function (std) {
    var example;
    (function (example) {
        function sorting() {
            let cubes = new std.Deque();
            for (let i = 0; i < 10; i++)
                cubes.push_back(new Cube());
            ///////////////////////////////
            // SORT BY Cube.less()
            ///////////////////////////////
            std.sort(cubes.begin(), cubes.end());
            for (let it = cubes.begin(); !it.equals(cubes.end()); it = it.next())
                it.value.debug_size();
            console.log("------------------------------");
            ///////////////////////////////
            // SORT BY inline function
            ///////////////////////////////
            std.sort(cubes.begin(), cubes.end(), function (left, right) {
                if (left.x != right.x)
                    return left.x < right.x;
                else if (left.y != right.y)
                    return left.y < right.y;
                else
                    return left.z < right.z;
            });
            for (let it = cubes.begin(); !it.equals(cubes.end()); it = it.next())
                it.value.debug_position();
        }
        example.sorting = sorting;
        class Cube {
            constructor() {
                this.width = Math.random() * 10;
                this.height = Math.random() * 10;
                this.length = Math.random() * 10;
                this.x = Math.random() * 100 - 50;
                this.y = Math.random() * 100 - 50;
                this.z = Math.random() * 100 - 50;
            }
            get volume() {
                return this.width * this.height * this.length;
            }
            less(obj) {
                return this.volume < obj.volume;
            }
            debug_size() {
                console.log(this.width, this.height, this.length + " => " + this.volume);
            }
            debug_position() {
                console.log(this.x, this.y, this.z);
            }
        }
    })(example = std.example || (std.example = {}));
})(std || (std = {}));
var std;
(function (std) {
    var example;
    (function (example) {
        function tree_set() {
            let set = new std.TreeMultiSet();
            // INSERTS EVEN NUMBERS
            for (let i = 0; i <= 10; i += 2)
                for (let j = 0; j < 3; j++)
                    set.insert(i);
            // FIND 4 -> HAS
            console.log("Matched node: 4");
            console.log("	lower bound: " + set.lower_bound(4).value);
            console.log("	upper bound: " + set.upper_bound(4).value);
            console.log(" ");
            // FIND ODD NUMBERS -> NOT EXIST
            for (let i = 1; i <= 10; i += 2) {
                console.log("Mis-matched node: " + i);
                console.log("	lower bound: " + set.lower_bound(i).value);
                console.log("	upper bound: " + set.upper_bound(i).value);
                console.log(" ");
            }
        }
        example.tree_set = tree_set;
    })(example = std.example || (std.example = {}));
})(std || (std = {}));
var std;
(function (std) {
    /* =========================================================
        + EXCEPTION
            + LOGIC_ERROR
                - DOMAIN_ERROR
                - INVALID_ARGUMENT
                - LENGTH_ERROR
                - OUT_OF_RANGE
            + RUNTIME_ERROR
                - OVERFLOW_ERROR
                - RANGE_ERROR
                - SYSTEM_ERROR
                - UNDERFLOW_ERROR
    ========================================================= */
    /**
     * <p> Standard exception class. </p>
     *
     * <p> Base class for standard exceptions. </p>
     *
     * <p> All objects thrown by components of the standard library are derived from this class.
     * Therefore, all standard exceptions can be caught by catching this type by reference. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/exception/exception/
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Exception {
        constructor(what = "") {
            this.message = what;
        }
        /**
         * <p> Get string identifying exception. </p>
         * <p> Returns a string that may be used to identify the exception. </p>
         *
         * <p> The particular representation pointed by the returned value is implementation-defined.
         * As a virtual function, derived classes may redefine this function so that specify value are
         * returned. </p>
         */
        what() {
            return this.message;
        }
    }
    std.Exception = Exception;
    /* =========================================================
        + LOGIC_ERROR
            - DOMAIN_ERROR
            - INVALID_ARGUMENT
            - LENGTH_ERROR
            - OUT_OF_RANGE
    ========================================================= */
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
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/logic_error/
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class LogicError extends Exception {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what) {
            super(what);
        }
    }
    std.LogicError = LogicError;
    /**
     * <p> Domain error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report domain errors. </p>
     *
     * <p> Generally, the domain of a mathematical function is the subset of values that it is defined for.
     * For example, the square root function is only defined for non-negative numbers. Thus, a negative number
     * for such a function would qualify as a domain error. </p>
     *
     * <p> No component of the standard library throws exceptions of this type. It is designed as a standard
     * exception to be thrown by programs. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/domain_error/
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class DomainError extends LogicError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what) {
            super(what);
        }
    }
    std.DomainError = DomainError;
    /**
     * <p> Invalid argument exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report an invalid argument. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library
     * also throw exceptions of this type to signal invalid arguments. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/invalid_argument/
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class InvalidArgument extends LogicError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what) {
            super(what);
        }
    }
    std.InvalidArgument = InvalidArgument;
    /**
     * <p> Length error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report a length error. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library,
     * such as vector and string also throw exceptions of this type to signal errors resizing. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/length_error/
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class LengthError extends LogicError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what) {
            super(what);
        }
    }
    std.LengthError = LengthError;
    /**
     * <p> Out-of-range exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report an out-of-range error. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library,
     * such as vector, deque, string and bitset also throw exceptions of this type to signal arguments
     * out of range. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/out_of_range/
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class OutOfRange extends LogicError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what) {
            super(what);
        }
    }
    std.OutOfRange = OutOfRange;
    /* =========================================================
        + RUNTIME_ERROR
            - OVERFLOW_ERROR
            - RANGE_ERROR
            - SYSTEM_ERROR
            - UNDERFLOW_ERROR
    ========================================================= */
    /**
     * <p> Runtime error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report errors that can only be
     * detected during runtime. </p>
     *
     * <p> It is used as a base class for several runtime error exceptions. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/runtime_error/
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class RuntimeError extends Exception {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what) {
            super(what);
        }
    }
    std.RuntimeError = RuntimeError;
    /**
     * <p> Overflow error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to arithmetic overflow errors. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library
     * also throw exceptions of this type to signal range errors. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/outflow_error/
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class OverflowError extends RuntimeError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what) {
            super(what);
        }
    }
    std.OverflowError = OverflowError;
    /**
     * <p> Underflow error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to arithmetic underflow errors. </p>
     *
     * <p> No component of the standard library throws exceptions of this type. It is designed as a standard
     * exception to be thrown by programs. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/underflow_error/
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class UnderflowError extends RuntimeError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what) {
            super(what);
        }
    }
    std.UnderflowError = UnderflowError;
    /**
     * <p> Range error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report range errors in internal
     * computations. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library
     * also throw exceptions of this type to signal range errors. </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/range_error/
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class RangeError extends RuntimeError {
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        constructor(what) {
            super(what);
        }
    }
    std.RangeError = RangeError;
})(std || (std = {}));
/// <reference path="base/container/UniqueMap.ts" />
var std;
(function (std) {
    /**
     * <p> Hashed, unordered map. </p>
     *
     * <p> {@link HashMap}s are associative containers that store elements formed by the
     * combination of a <i>key value</i> and a <i>mapped value</i>, and which allows for fast
     * retrieval of individual elements based on their <i>keys</i>. </p>
     *
     * <p> In an {@link HashMap}, the <i>key value</i> is generally used to uniquely identify
     * the element, while the <i>mapped value</i> is an object with the content associated to this
     * <i>key</i>. Types of <i>key</i> and <i>mapped value</i> may differ. </p>
     *
     * <p> Internally, the elements in the {@link HashMap} are not sorted in any particular order
     * with respect to either their <i>key</i> or <i>mapped values</i>, but organized into <i>buckets</i>
     * depending on their hash values to allow for fast access to individual elements directly by
     * their <i>key values</i> (with a constant average time complexity on average). </p>
     *
     * <p> {@link HashMap} containers are faster than {@link TreeMap} containers to access
     * individual elements by their <i>key</i>, although they are generally less efficient for range
     * iteration through a subset of their elements. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     * 	<dt> Associative </dt>
     * 	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     * 	<dt> Hashed </dt>
     * 	<dd> Hashed containers organize their elements using hash tables that allow for fast access to elements
     *		 by their <i>key</i>. </dd>
     *
     * 	<dt> Map </dt>
     * 	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>:
     *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
     *
     * 	<dt> Unique keys </dt>
     * 	<dd> No two elements in the container can have equivalent keys. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/unordered_map/unordered_map/ </li>
     * </ul>
     *
     * @param <Key> Type of the key values.
     *				Each element in an {@link HashMap} is uniquely identified by its key value.
     * @param <T> Type of the mapped value.
     *			  Each element in an {@link HashMap} is used to store some data as its mapped value.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class HashMap extends std.base.container.UniqueMap {
        constructor(...args) {
            super();
            // HASH_BUCKET
            this.hash_buckets_ = new std.base.hash.MapHashBuckets(this);
            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array) {
                this.construct_from_array(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof std.base.container.MapContainer) {
                this.construct_from_container(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof std.MapIterator && args[1] instanceof std.MapIterator) {
                this.construct_from_range(args[0], args[1]);
            }
        }
        /**
         * @hidden
         */
        construct_from_array(items) {
            this.hash_buckets_.reserve(items.length * std.base.hash.RATIO);
            super.construct_from_array(items);
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        assign(begin, end) {
            let it;
            let size = 0;
            // RESERVE HASH_BUCKET SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;
            this.hash_buckets_.clear();
            this.hash_buckets_.reserve(size * std.base.hash.RATIO);
            // SUPER; INSERT
            super.assign(begin, end);
        }
        /**
         * @inheritdoc
         */
        clear() {
            super.clear();
            this.hash_buckets_.clear();
        }
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        find(key) {
            return this.hash_buckets_.find(key);
        }
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        insert_by_pair(pair) {
            // TEST WHETHER EXIST
            let it = this.find(pair.first);
            if (it.equals(this.end()) == false)
                return new std.Pair(it, false);
            // INSERT
            this.data_.push_back(pair);
            it = it.prev();
            // POST-PROCESS
            this.handle_insert(it);
            return new std.Pair(it, true);
        }
        /**
         * @hidden
         */
        insert_by_range(begin, end) {
            // CALCULATE INSERTING SIZE
            let size = 0;
            for (let it = begin; it.equals(end) == false; it = it.next())
                size++;
            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hash_buckets_.item_size() * std.base.hash.MAX_RATIO)
                this.hash_buckets_.reserve((this.size() + size) * std.base.hash.RATIO);
            // INSERTS
            super.insert_by_range(begin, end);
        }
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        handle_insert(it) {
            this.hash_buckets_.insert(it);
        }
        /**
         * @inheritdoc
         */
        handle_erase(it) {
            this.hash_buckets_.erase(it);
        }
        /* ===============================================================
            UTILITIES
        =============================================================== */
        /**
         * @inheritdoc
         */
        swap(obj) {
            if (obj instanceof HashMap)
                this.swap_hash_map(obj);
            else
                super.swap(obj);
        }
        /**
         * @hidden
         */
        swap_hash_map(obj) {
            let supplement = new HashMap();
            supplement.data_ = this.data_;
            supplement.hash_buckets_ = this.hash_buckets_;
            this.data_ = obj.data_;
            this.hash_buckets_ = obj.hash_buckets_;
            obj.data_ = supplement.data_;
            obj.hash_buckets_ = supplement.hash_buckets_;
        }
    }
    std.HashMap = HashMap;
})(std || (std = {}));
/// <reference path="base/container/MultiMap.ts" />
var std;
(function (std) {
    /**
     * <p> Hashed, unordered Multimap. </p>
     *
     * <p> {@link HashMap}s are associative containers that store elements formed by the combination of
     * a <i>key value</i> and a <i>mapped value</i>, much like {@link HashMap} containers, but allowing
     * different elements to have equivalent <i>keys</i>. </p>
     *
     * <p> In an {@link HashMap}, the <i>key value</i> is generally used to uniquely identify the
     * element, while the <i>mapped value</i> is an object with the content associated to this <i>key</i>.
     * Types of <i>key</i> and <i>mapped value</i> may differ. </p>
     *
     * <p> Internally, the elements in the {@link HashMap} are not sorted in any particular order with
     * respect to either their <i>key</i> or <i>mapped values</i>, but organized into <i>buckets</i> depending on
     * their hash values to allow for fast access to individual elements directly by their <i>key values</i>
     * (with a constant average time complexity on average). </p>
     *
     * <p> Elements with equivalent <i>keys</i> are grouped together in the same bucket and in such a way that
     * an iterator can iterate through all of them. Iterators in the container are doubly linked iterators. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Hashed </dt>
     *	<dd> Hashed containers organize their elements using hash tables that allow for fast access to elements
     *		 by their <i>key</i>. </dd>
     *
     *	<dt> Map </dt>
     *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>:
     *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
     *
     *	<dt> Multiple equivalent keys </dt>
     *	<dd> The container can hold multiple elements with equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/unordered_map/unordered_multimap/ </li>
     * </ul>
     *
     * @param <Key> Type of the key values.
     *				Each element in an {@link HashMap} is identified by a key value.
     * @param <T> Type of the mapped value.
     *			  Each element in an {@link HashMap} is used to store some data as its mapped value.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class HashMultiMap extends std.base.container.MultiMap {
        constructor(...args) {
            super();
            // HASH_BUCKET
            this.hash_buckets_ = new std.base.hash.MapHashBuckets(this);
            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array) {
                this.construct_from_array(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof std.base.container.MapContainer) {
                this.construct_from_container(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof std.MapIterator && args[1] instanceof std.MapIterator) {
                this.construct_from_range(args[0], args[1]);
            }
        }
        /**
         * @hidden
         */
        construct_from_array(items) {
            this.hash_buckets_.reserve(items.length * std.base.hash.RATIO);
            super.construct_from_array(items);
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        assign(begin, end) {
            let it;
            let size = 0;
            // REVERSE HASH_GROUP SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;
            this.hash_buckets_.clear();
            this.hash_buckets_.reserve(size * std.base.hash.RATIO);
            // SUPER; INSERT
            super.assign(begin, end);
        }
        /**
         * @inheritdoc
         */
        clear() {
            super.clear();
            this.hash_buckets_.clear();
        }
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        find(key) {
            return this.hash_buckets_.find(key);
        }
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        insert_by_pair(pair) {
            let listIterator = this.data_.insert(this.data_.end(), pair);
            let it = new std.MapIterator(this, listIterator);
            this.handle_insert(it);
            return it;
        }
        /**
         * @hidden
         */
        insert_by_range(begin, end) {
            // CALCULATE INSERTING SIZE
            let size = 0;
            for (let it = begin; it.equals(end) == false; it = it.next())
                size++;
            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hash_buckets_.item_size() * std.base.hash.MAX_RATIO)
                this.hash_buckets_.reserve((this.size() + size) * std.base.hash.RATIO);
            // INSERTS
            super.insert_by_range(begin, end);
        }
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        handle_insert(it) {
            this.hash_buckets_.insert(it);
        }
        /**
         * @inheritdoc
         */
        handle_erase(it) {
            this.hash_buckets_.erase(it);
        }
        /* ===============================================================
            UTILITIES
        =============================================================== */
        /**
         * @inheritdoc
         */
        swap(obj) {
            if (obj instanceof HashMultiMap)
                this.swap_hash_multimap(obj);
            else
                super.swap(obj);
        }
        /**
         * @hidden
         */
        swap_hash_multimap(obj) {
            let supplement = new HashMultiMap();
            supplement.data_ = this.data_;
            supplement.hash_buckets_ = this.hash_buckets_;
            this.data_ = obj.data_;
            this.hash_buckets_ = obj.hash_buckets_;
            obj.data_ = supplement.data_;
            obj.hash_buckets_ = supplement.hash_buckets_;
        }
    }
    std.HashMultiMap = HashMultiMap;
})(std || (std = {}));
/// <reference path="base/container/MultiSet.ts" />
var std;
(function (std) {
    /**
     * <p> Hashed, unordered Multiset. </p>
     *
     * <p> {@link HashMultiSet HashMultiSets} are containers that store elements in no particular order, allowing fast
     * retrieval of individual elements based on their value, much like {@link HashSet} containers,
     * but allowing different elements to have equivalent values. </p>
     *
     * <p> In an {@link HashMultiSet}, the value of an element is at the same time its <i>key</i>, used to
     * identify it. <i>Keys</i> are immutable, therefore, the elements in an {@link HashMultiSet} cannot be
     * modified once in the container - they can be inserted and removed, though. </p>
     *
     * <p> Internally, the elements in the {@link HashMultiSet} are not sorted in any particular, but
     * organized into <i>buckets</i> depending on their hash values to allow for fast access to individual
     * elements directly by their <i>values</i> (with a constant average time complexity on average). </p>
     *
     * <p> Elements with equivalent values are grouped together in the same bucket and in such a way that an
     * iterator can iterate through all of them. Iterators in the container are doubly linked iterators. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Hashed </dt>
     *	<dd> Hashed containers organize their elements using hash tables that allow for fast access to elements
     *		 by their <i>key</i>. </dd>
     *
     *	<dt> Set </dt>
     *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
     *
     *	<dt> Multiple equivalent keys </dt>
     *	<dd> The container can hold multiple elements with equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/unordered_set/unordered_multiset/ </li>
     * </ul>
     *
     * @param <T> Type of the elements.
     *		   Each element in an {@link UnorderedMultiSet} is also identified by this value..
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class HashMultiSet extends std.base.container.MultiSet {
        constructor(...args) {
            super();
            // BUCKET
            this.hash_buckets_ = new std.base.hash.SetHashBuckets(this);
            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array && args[0] instanceof std.Vector == false) {
                this.construct_from_array(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof std.base.container.Container) {
                this.construct_from_container(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof std.base.container.Iterator && args[1] instanceof std.base.container.Iterator) {
                this.construct_from_range(args[0], args[1]);
            }
        }
        /**
         * @hidden
         */
        construct_from_array(items) {
            this.hash_buckets_.reserve(items.length * std.base.hash.RATIO);
            super.construct_from_array(items);
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        assign(begin, end) {
            let it;
            let size = 0;
            // RESERVE HASH_BUCKET SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;
            this.hash_buckets_.clear();
            this.hash_buckets_.reserve(size * std.base.hash.RATIO);
            // SUPER; INSERT
            super.assign(begin, end);
        }
        /**
         * @inheritdoc
         */
        clear() {
            super.clear();
            this.hash_buckets_.clear();
        }
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        find(val) {
            return this.hash_buckets_.find(val);
        }
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        insert_by_val(val) {
            // INSERT
            let listIterator = this.data_.insert(this.data_.end(), val);
            let it = new std.SetIterator(this, listIterator);
            // POST-PROCESS
            this.handle_insert(it);
            return it;
        }
        /**
         * @hidden
         */
        insert_by_range(begin, end) {
            // CALCULATE INSERTING SIZE
            let size = 0;
            for (let it = begin; it.equals(end) == false; it = it.next())
                size++;
            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hash_buckets_.item_size() * std.base.hash.MAX_RATIO)
                this.hash_buckets_.reserve((this.size() + size) * std.base.hash.RATIO);
            // INSERTS
            super.insert_by_range(begin, end);
        }
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        handle_insert(it) {
            this.hash_buckets_.insert(it);
        }
        /**
         * @inheritdoc
         */
        handle_erase(it) {
            this.hash_buckets_.erase(it);
        }
        /* ===============================================================
            UTILITIES
        =============================================================== */
        /**
         * @inheritdoc
         */
        swap(obj) {
            if (obj instanceof HashMultiSet)
                this.swap_tree_set(obj);
            else
                super.swap(obj);
        }
        /**
         * @hidden
         */
        swap_tree_set(obj) {
            let supplement = new HashMultiSet();
            supplement.data_ = this.data_;
            supplement.hash_buckets_ = this.hash_buckets_;
            this.data_ = obj.data_;
            this.hash_buckets_ = obj.hash_buckets_;
            obj.data_ = supplement.data_;
            obj.hash_buckets_ = supplement.hash_buckets_;
        }
    }
    std.HashMultiSet = HashMultiSet;
})(std || (std = {}));
/// <reference path="base/container/UniqueSet.ts" />
var std;
(function (std) {
    /**
     * <p> Hashed, unordered set. </p>
     *
     * <p> {@link HashSet}s are containers that store unique elements in no particular order, and which
     * allow for fast retrieval of individual elements based on their value. </p>
     *
     * <p> In an {@link HashSet}, the value of an element is at the same time its <i>key</i>, that
     * identifies it uniquely. Keys are immutable, therefore, the elements in an {@link HashSet} cannot be
     * modified once in the container - they can be inserted and removed, though. </p>
     *
     * <p> Internally, the elements in the {@link HashSet} are not sorted in any particular order, but
     * organized into buckets depending on their hash values to allow for fast access to individual elements
     * directly by their <i>values</i> (with a constant average time complexity on average). </p>
     *
     * <p> {@link HashSet} containers are faster than {@link TreeSet} containers to access individual
     * elements by their <i>key</i>, although they are generally less efficient for range iteration through a
     * subset of their elements. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Hashed </dt>
     *	<dd> Hashed containers organize their elements using hash tables that allow for fast access to elements
     *		 by their <i>key</i>. </dd>
     *
     *	<dt> Set </dt>
     *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
     *
     *	<dt> Unique keys </dt>
     *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/unordered_set/unordered_set/ </li>
     * </ul>
     *
     * @param <T> Type of the elements.
     *			  Each element in an {@link HashSet} is also uniquely identified by this value.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class HashSet extends std.base.container.UniqueSet {
        constructor(...args) {
            super();
            // BUCKET
            this.hash_buckets_ = new std.base.hash.SetHashBuckets(this);
            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array && args[0] instanceof std.Vector == false) {
                this.construct_from_array(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof std.base.container.Container) {
                this.construct_from_container(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof std.base.container.Iterator && args[1] instanceof std.base.container.Iterator) {
                this.construct_from_range(args[0], args[1]);
            }
        }
        /**
         * @hidden
         */
        construct_from_array(items) {
            this.hash_buckets_.reserve(items.length * std.base.hash.RATIO);
            super.construct_from_array(items);
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        assign(begin, end) {
            let it;
            let size = 0;
            // RESERVE HASH_BUCKET SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;
            this.hash_buckets_.clear();
            this.hash_buckets_.reserve(size * std.base.hash.RATIO);
            // SUPER; INSERT
            super.assign(begin, end);
        }
        /**
         * @inheritdoc
         */
        clear() {
            super.clear();
            this.hash_buckets_.clear();
        }
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        find(val) {
            return this.hash_buckets_.find(val);
        }
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        insert_by_val(val) {
            // TEST WHETHER EXIST
            let it = this.find(val);
            if (it.equals(this.end()) == false)
                return new std.Pair(it, false);
            // INSERT
            this.data_.push_back(val);
            it = it.prev();
            // POST-PROCESS
            this.handle_insert(it);
            return new std.Pair(it, true);
        }
        /**
         * @hidden
         */
        insert_by_range(begin, end) {
            // CALCULATE INSERTING SIZE
            let size = 0;
            for (let it = begin; it.equals(end) == false; it = it.next())
                size++;
            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hash_buckets_.size() * std.base.hash.MAX_RATIO)
                this.hash_buckets_.reserve((this.size() + size) * std.base.hash.RATIO);
            // INSERTS
            super.insert_by_range(begin, end);
        }
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        handle_insert(item) {
            this.hash_buckets_.insert(item);
        }
        /**
         * @inheritdoc
         */
        handle_erase(item) {
            this.hash_buckets_.erase(item);
        }
        /* ===============================================================
            UTILITIES
        =============================================================== */
        /**
         * @inheritdoc
         */
        swap(obj) {
            if (obj instanceof HashSet)
                this.swap_tree_set(obj);
            else
                super.swap(obj);
        }
        /**
         * @hidden
         */
        swap_tree_set(obj) {
            let supplement = new HashSet();
            supplement.data_ = this.data_;
            supplement.hash_buckets_ = this.hash_buckets_;
            this.data_ = obj.data_;
            this.hash_buckets_ = obj.hash_buckets_;
            obj.data_ = supplement.data_;
            obj.hash_buckets_ = supplement.hash_buckets_;
        }
    }
    std.HashSet = HashSet;
})(std || (std = {}));
var std;
(function (std) {
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
    function equals(left, right) {
        if (left instanceof Object && left.equals != undefined)
            return left.equals(right);
        else
            return left == right;
    }
    std.equals = equals;
    /**
     * <p> Function for less-than inequality comparison. </p>
     *
     * <p> Binary function returns whether the its first argument compares less than the second. </p>
     *
     * <p> Generically, function objects are instances of a class with member function {@link IComparable.less less}
     * defined. If an object doesn't have the method, then its own uid will be used to compare insteadly.
     * This member function allows the object to be used with the same syntax as a function call. </p>
     *
     * <p> Objects of this class can be used on standard algorithms such as {@link sort sort()}</code>,
     * {@link merge merge()} or {@link TreeMap.lower_bound lower_bound()}. </p>
     *
     * @param <T> Type of arguments to compare by the function call. The type shall supporrt the operation
     *			  <i>operator<()</i> or method {@link IComparable.less less}.
     *
     * @param first First element, the standard of comparison.
     * @param second Second element compare with the first.
     *
     * @return Whether the first parameter is less than the second.
     */
    function less(left, right) {
        if (left instanceof Object)
            if (left.less != undefined)
                return left.less(right);
            else
                return left.__getUID() < right.__getUID();
        else
            return left < right;
    }
    std.less = less;
    /**
     * <p> Function for greater-than inequality comparison. </p>
     *
     * <p> Binary function returns whether the its first argument compares greater than the second. </p>
     *
     * <p> Generically, function objects are instances of a class with member function {@link less} and
     * {@link equals equals()} defined. If an object doesn't have those methods, then its own uid will be used
     * to compare insteadly. This member function allows the object to be used with the same syntax as a function
     * call. </p>
     *
     * <p> Objects of this class can be used on standard algorithms such as {@link sort sort()},
     * {@link merge merge()} or {@link TreeMap.lower_bound lower_bound()}. </p>
     *
     * @param <T> Type of arguments to compare by the function call. The type shall supporrt the operation
     *			  <i>operator>()</i> or method {@link IComparable.greater greater}.
     *
     * @param left
     * @param right
     */
    function greater(left, right) {
        return !std.less(left, right) && !std.equals(left, right);
    }
    std.greater = greater;
    function hash(obj) {
        return std.base.hash.code(obj);
    }
    std.hash = hash;
    /**
     * Incremental sequence of unique id for objects.
     */
    var __s_iUID = 0;
    Object.defineProperties(Object.prototype, {
        "__getUID": {
            value: function () {
                if (this.hasOwnProperty("__m_iUID") == false) {
                    var uid = ++__s_iUID;
                    Object.defineProperty(this, "__m_iUID", {
                        "get": function () {
                            return uid;
                        }
                    });
                }
                return this.__m_iUID;
            }
        }
    });
})(std || (std = {}));
/// <reference path="base/container/Container.ts" />
var std;
(function (std) {
    /**
     * <p> Doubly linked list. </p>
     *
     * <p> {@link List}s are sequence containers that allow constant time insert and erase operations anywhere
     * within the sequence, and iteration in both directions. </p>
     *
     * <p> List containers are implemented as doubly-linked lists; Doubly linked lists can store each of the elements
     * they contain in different and unrelated storage locations. The ordering is kept internally by the association
     * to each element of a link to the element preceding it and a link to the element following it. </p>
     *
     * <p> They are very similar to forward_list: The main difference being that forward_list objects are
     * single-linked lists, and thus they can only be iterated forwards, in exchange for being somewhat smaller and
     * more efficient. </p>
     *
     * <p> Compared to other base standard sequence containers (array, vector and deque), lists perform generally
     * better in inserting, extracting and moving elements in any position within the container for which an iterator
     * has already been obtained, and therefore also in algorithms that make intensive use of these, like sorting
     * algorithms. </p>
     *
     * <p> The main drawback of lists and forward_lists compared to these other sequence containers is that they lack
     * direct access to the elements by their position; For example, to access the sixth element in a list, one has
     * to iterate from a known position (like the beginning or the end) to that position, which takes linear time in
     * the distance between these. They also consume some extra memory to keep the linking information associated to
     * each element (which may be an important factor for large lists of small-sized elements). </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     * 	<dt> Sequence </dt>
     * 	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are
     *		 accessed by their position in this sequence. </dd>
     *
     * 	<dt> Doubly-linked list </dt>
     *	<dd> Each element keeps information on how to locate the next and the previous elements, allowing constant
     *		 time insert and erase operations before or after a specific element (even of entire ranges), but no
     *		 direct random access. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/list/list/
     * </ul>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class List extends std.base.container.Container {
        constructor(...args) {
            super();
            if (args.length == 0) {
                this.clear();
            }
            else if (args.length == 1 && args[0] instanceof Array) {
                let array = args[0];
                this.clear();
                this.push(...array);
            }
            else if (args.length == 1 && (args[0] instanceof std.Vector || args[0] instanceof std.base.container.Container)) {
                let container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.base.container.Iterator && args[1] instanceof std.base.container.Iterator) {
                let begin = args[0];
                let end = args[1];
                this.assign(begin, end);
            }
            else if (args.length == 2 && typeof args[0] == "number") {
                let size = args[0];
                let val = args[1];
                this.assign(size, val);
            }
        }
        static get iterator() { return std.ListIterator; }
        assign(par1, par2) {
            if (par1 instanceof std.base.container.Iterator && par2 instanceof std.base.container.Iterator) {
                // PARAMETERS
                let begin = par1;
                let end = par2;
                // BODY
                let prev = null;
                let item;
                let it = begin;
                while (true) {
                    // CONSTRUCT ELEMENT ITEM
                    item = new std.ListIterator(this, prev, null, (it != end ? it.value : null));
                    // SET PREVIOUS NEXT POINTER
                    if (prev != null)
                        prev.setNext(item);
                    // CONSTRUCT BEGIN AND END
                    if (it == begin)
                        this.begin_ = item;
                    else if (it == end) {
                        this.end_ = item;
                        break;
                    }
                    // ADD COUNTS AND STEP TO THE NEXT
                    this.size_++;
                    it = it.next();
                }
            }
        }
        /**
         * @inheritdoc
         */
        clear() {
            let it = new std.ListIterator(this, null, null, null);
            it.setPrev(it);
            it.setNext(it);
            this.begin_ = it;
            this.end_ = it;
            this.size_ = 0;
        }
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        begin() {
            return this.begin_;
        }
        /**
         * @inheritdoc
         */
        end() {
            return this.end_;
        }
        /**
         * @inheritdoc
         */
        size() {
            return this.size_;
        }
        /**
         * @inheritdoc
         */
        front() {
            return this.begin_.value;
        }
        /**
         * @inheritdoc
         */
        back() {
            return this.end_.prev().value;
        }
        /* =========================================================
            ELEMENTS I/O
                - ITERATOR FACTORY
                - PUSH & POP
                - INSERT
                - ERASE
        ============================================================
            PUSH & POP
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        push(...items) {
            for (let i = 0; i < items.length; i++)
                this.push_back(items[i]);
            return this.size();
        }
        /**
         * @inheritdoc
         */
        push_front(val) {
            let item = new std.ListIterator(this, null, this.begin_, val);
            // CONFIGURE BEGIN AND NEXT
            this.begin_.setPrev(item);
            if (this.size_ == 0) {
                // IT WAS EMPTY
                this.end_ = new std.ListIterator(this, item, item, null);
                item.setNext(this.end_);
            }
            else
                this.end_.setNext(item);
            // SET
            this.begin_ = item;
            this.size_++;
        }
        /**
         * @inheritdoc
         */
        push_back(val) {
            let prev = this.end_.prev();
            let item = new std.ListIterator(this, this.end_.prev(), this.end_, val);
            prev.setNext(item);
            this.end_.setPrev(item);
            if (this.empty() == true) {
                this.begin_ = item;
                item.setPrev(this.end_);
            }
            this.size_++;
        }
        /**
         * @inheritdoc
         */
        pop_front() {
            this.erase(this.begin_);
        }
        /**
         * @inheritdoc
         */
        pop_back() {
            this.erase(this.end_.prev());
        }
        insert(...args) {
            if (args.length == 2)
                return this.insert_by_val(args[0], args[1]);
            else if (args.length == 3 && typeof args[1] == "number") {
                return this.insertByRepeatingVal(args[0], args[1], args[2]);
            }
            else
                return this.insert_by_range(args[0], args[1], args[2]);
        }
        /**
         * @hidden
         */
        insert_by_val(position, val) {
            // SHIFT TO INSERT OF THE REPEATING VAL
            return this.insertByRepeatingVal(position, 1, val);
        }
        /**
         * @hidden
         */
        insertByRepeatingVal(position, size, val) {
            if (this != position.get_source())
                throw new std.InvalidArgument("Parametric iterator is not this container's own.");
            let prev = position.prev();
            let first = null;
            for (let i = 0; i < size; i++) {
                // CONSTRUCT ITEM, THE NEW ELEMENT
                let item = new std.ListIterator(this, prev, null, val);
                if (i == 0)
                    first = item;
                prev.setNext(item);
                // SHIFT ITEM LEFT TO BE PREV
                prev = item;
            }
            // IF WAS EMPTY, VAL IS THE BEGIN
            if (this.empty() == true || first.prev().equals(this.end()) == true)
                this.begin_ = first;
            // CONNECT BETWEEN LAST INSERTED ITEM AND POSITION
            prev.setNext(position);
            position.setPrev(prev);
            this.size_ += size;
            return first;
        }
        /**
         * @hidden
         */
        insert_by_range(position, begin, end) {
            if (this != position.get_source())
                throw new std.InvalidArgument("Parametric iterator is not this container's own.");
            let prev = position.prev();
            let first = null;
            let size = 0;
            for (let it = begin; it.equals(end) == false; it = it.next()) {
                // CONSTRUCT ITEM, THE NEW ELEMENT
                let item = new std.ListIterator(this, prev, null, it.value);
                if (size == 0)
                    first = item;
                if (prev != null)
                    prev.setNext(item);
                // SHIFT CURRENT ITEM TO PREVIOUS
                prev = item;
                size++;
            }
            // IF WAS EMPTY, FIRST ELEMENT IS THE BEGIN
            if (this.empty() == true)
                this.begin_ = first;
            // CONNECT BETWEEN LAST AND POSITION
            prev.setNext(position);
            position.setPrev(prev);
            this.size_ += size;
            return first;
        }
        erase(...args) {
            if (args.length == 1)
                return this.erase_by_iterator(args[0]);
            else if (args.length == 2)
                return this.erase_by_range(args[0], args[1]);
        }
        /**
         * @hidden
         */
        erase_by_iterator(it) {
            return this.erase_by_range(it, it.next());
        }
        /**
         * @hidden
         */
        erase_by_range(begin, end) {
            if (this != begin.get_source() || begin.get_source() != end.get_source())
                throw new std.InvalidArgument("Parametric iterator is not this container's own.");
            // FIND PREV AND NEXT
            let prev = begin.prev();
            // CALCULATE THE SIZE
            let size = 0;
            for (let it = begin; it.equals(end) == false; it = it.next())
                size++;
            // SHRINK
            prev.setNext(end);
            end.setPrev(prev);
            this.size_ -= size;
            if (this.size_ == 0)
                this.begin_ = end;
            return end;
        }
        unique(binary_pred = std.equals) {
            let it = this.begin().next();
            while (!it.equals(this.end())) {
                if (std.equals(it.value, it.prev().value) == true)
                    it = this.erase(it);
                else
                    it = it.next();
            }
        }
        /**
         * <p> Remove elements with specific value. </p>
         *
         * <p> Removes from the container all the elements that compare equal to <i>val</i>. This calls the
         * destructor of these objects and reduces the container {@link size} by the number of elements removed. </p>
         *
         * <p> Unlike member function {@link List.erase}, which erases elements by their position (using an
         * iterator), this function ({@link List.remove}) removes elements by their value. </p>
         *
         * <p> A similar function, {@link List.remove_if}, exists, which allows for a condition other than an
         * equality comparison to determine whether an element is removed. </p>
         *
         * @param val Value of the elements to be removed.
         */
        remove(val) {
            let it = this.begin();
            while (!it.equals(this.end())) {
                if (std.equals(it.value, val) == true)
                    it = this.erase(it);
                else
                    it = it.next();
            }
        }
        /**
         * <p> Remove elements fulfilling condition. </p>
         *
         * <p> Removes from the container all the elements for which <i>pred</i> returns <code>true</code>. This
         * calls the destructor of these objects and reduces the container {@link size} by the number of elements
         * removed. </p>
         *
         * <p> The function calls <code>pred(it.value)</code> for each element (where <code>it</code> is an iterator
         * to that element). Any of the elements in the list for which this returns <code>true</code>, are removed
         * from the container. </p>
         *
         * @param pred Unary predicate that, taking a value of the same type as those contained in the forward_list
         *			   object, returns <code>true</code> for those values to be removed from the container, and
         *			   <code>false</code> for those remaining. This can either be a function pointer or a function
         *			   object.
         */
        remove_if(pred) {
            let it = this.begin();
            while (!it.equals(this.end())) {
                if (pred(it.value) == true)
                    it = this.erase(it);
                else
                    it = it.next();
            }
        }
        merge(obj, compare = std.less) {
            if (this == obj)
                return;
            let it = this.begin();
            while (obj.empty() == false) {
                let begin = obj.begin();
                while (!it.equals(this.end()) && compare(it.value, begin.value) == true)
                    it = it.next();
                this.splice(it, obj, begin);
            }
        }
        splice(position, obj, begin = null, end = null) {
            if (begin == null) {
                begin = obj.begin();
                end = obj.end();
            }
            else if (end == null) {
                end = begin.next();
            }
            this.insert(position, begin, end);
            obj.erase(begin, end);
        }
        sort(compare = std.less) {
            //let whole: Vector<T> = new Vector<T>(this);
            //let part: Vector<T> = new Vector<T>(this);
            //this.msort(whole, part, 0, this.size(), compare);
            //this.assign(whole.begin(), whole.end());
            let vector = new std.Vector(this.begin(), this.end());
            std.sort(vector.begin(), vector.end());
            this.assign(vector.begin(), vector.end());
        }
        ///**
        // * @hidden
        // */
        //private msort
        //	(
        //		whole: Array<T>, part: Array<T>, 
        //		begin: number, end: number, compare: (left: T, right: T) => boolean
        //	): void
        //{
        //	if (begin >= end - 1)
        //		return;
        //	let mid = begin + Math.floor((end - begin) / 2);
        //	this.msort(whole, part, begin, mid, compare);
        //	this.msort(whole, part, mid, end, compare);
        //	this.msort_merge(whole, part, begin, mid, end, compare);
        //}
        ///**
        // * @hidden
        // */
        //private msort_merge
        //	(
        //		whole: Array<T>, part: Array<T>, 
        //		begin: number, mid: number, end: number, 
        //		compare: (left: T, right: T) => boolean
        //	): void
        //{
        //	for (let i: number = begin; i < end; i++)
        //		part[i] = whole[i];
        //	let x: number = begin;
        //	let y: number = mid;
        //	for (let i: number = mid; i < end; i++)
        //	{
        //		if (x >= mid)
        //			whole[i] = part[y++];
        //		else if (y >= end)
        //			whole[i] = part[x++];
        //		else if (part[x] < part[y])
        //			whole[i] = part[y++];
        //		else
        //			whole[i] = part[x++];
        //	}
        //}
        /* ---------------------------------------------------------
            SWAP
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        swap(obj) {
            if (obj instanceof List)
                this.swap_list(obj);
            else
                super.swap(obj);
        }
        /**
         * @hidden
         */
        swap_list(obj) {
            let supplement = new Object();
            supplement.begin_ = this.begin_;
            supplement.end_ = this.end_;
            supplement.size_ = this.size_;
            this.begin_ = obj.begin_;
            this.end_ = obj.end_;
            this.size_ = obj.size_;
            obj.begin_ = supplement.begin_;
            obj.end_ = supplement.end_;
            obj.size_ = supplement.size_;
        }
    }
    std.List = List;
})(std || (std = {}));
/// <reference path="base/container/Iterator.ts" />
var std;
(function (std) {
    class ListIterator extends std.base.container.Iterator {
        /* ---------------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------------- */
        /**
         * <p> Construct from the source {@link List container}. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create the iterator directly, by yourself. </p>
         * <p> Use {@link List.begin begin()}, {@link List.end end()} in {@link List container} instead. </p>
         *
         * @param source The source {@link List container} to reference.
         * @param prev A refenrece of previous node ({@link ListIterator iterator}).
         * @param next A refenrece of next node ({@link ListIterator iterator}).
         * @param value Value to be stored in the node (iterator).
         */
        constructor(source, prev, next, value) {
            super(source);
            this.prev_ = prev;
            this.next_ = next;
            this.value_ = value;
        }
        /**
         * @inheritdoc
         */
        setPrev(prev) {
            this.prev_ = prev;
        }
        /**
         * @inheritdoc
         */
        setNext(next) {
            this.next_ = next;
        }
        /* ---------------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        equals(obj) {
            return this == obj;
        }
        /**
         * @inheritdoc
         */
        prev() {
            return this.prev_;
        }
        /**
         * @inheritdoc
         */
        next() {
            return this.next_;
        }
        /**
         * @inheritdoc
         */
        advance(size) {
            let it = this;
            for (let i = 0; i < size; i++)
                it = it.next();
            return it;
        }
        /**
         * @inheritdoc
         */
        get value() {
            return this.value_;
        }
        /**
         * @inheritdoc
         */
        set value(val) {
            this.value_ = val;
        }
        /**
         * @inheritdoc
         */
        swap(obj) {
            let supp_prev = this.prev_;
            let supp_next = this.next_;
            this.prev_ = obj.prev_;
            this.next_ = obj.next_;
            obj.prev_ = supp_prev;
            obj.next_ = supp_next;
            if (this.source_.end() == this)
                this.source_.end_ = obj;
            else if (this.source_.end() == obj)
                this.source_.end_ = this;
            if (this.source_.begin() == this)
                this.source_.begin_ = obj;
            else if (this.source_.begin() == obj)
                this.source_.begin_ = this;
        }
    }
    std.ListIterator = ListIterator;
})(std || (std = {}));
var std;
(function (std) {
    class MapIterator {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from the source PairContainer.
         *
         * @param source The source PairContainer.
         */
        constructor(source, listIterator) {
            this.source_ = source;
            this.list_iterator_ = listIterator;
        }
        /**
         * Get listIterator.
         */
        get_list_iterator() {
            return this.list_iterator_;
        }
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * Get iterator to previous element.
         */
        prev() {
            return new MapIterator(this.source_, this.list_iterator_.prev());
        }
        /**
         * Get iterator to next element.
         */
        next() {
            return new MapIterator(this.source_, this.list_iterator_.next());
        }
        /**
         * Advances the Iterator by n element positions.
         *
         * @param n Number of element positions to advance.
         * @return An advanced Iterator.
         */
        advance(n) {
            let it = this;
            let i;
            if (n >= 0) {
                for (i = 0; i < n; i++)
                    if (it.equals(this.source_.end()))
                        return this.source_.end();
                    else
                        it = it.next();
            }
            else {
                n = n * -1;
                for (i = 0; i < n; i++)
                    if (it.equals(this.source_.end()))
                        return this.source_.end();
                    else
                        it = it.prev();
            }
            return it;
        }
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * Get source.
         */
        get_source() {
            return this.source_;
        }
        /**
         * Get first, key element.
         */
        get first() {
            return this.list_iterator_.value.first;
        }
        /**
         * Get second, value element.
         */
        get second() {
            return this.list_iterator_.value.second;
        }
        set second(val) {
            this.list_iterator_.value.second = val;
        }
        /* ---------------------------------------------------------
            COMPARISONS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        equals(obj) {
            return this.source_ == obj.source_ && this.list_iterator_ == obj.list_iterator_;
        }
        /**
         * @inheritdoc
         */
        less(obj) {
            return std.less(this.first, obj.first);
        }
        /**
         * @inheritdoc
         */
        hash() {
            return std.hash(this.first);
        }
        /**
         * @inheritdoc
         */
        swap(obj) {
            this.list_iterator_.swap(obj.list_iterator_);
        }
    }
    std.MapIterator = MapIterator;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> Pair of values. </p>
     *
     * <p> This class couples together a pair of values, which may be of different types (<i>T1</i> and
     * <i>T2</i>). The individual values can be accessed through its public members {@link first} and
     * {@link second}. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/utility/pair/ </li>
     * </ul>
     *
     * @param <K> Type of member {@link first}.
     * @param <T> Type of member {@link second}.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Pair {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * <p> Construct from pair values. </p>
         *
         * @param first The first value of the Pair
         * @param second The second value of the Pair
         */
        constructor(first, second) {
            this.first = first;
            this.second = second;
        }
        /* ---------------------------------------------------------
            COMPARISON
        --------------------------------------------------------- */
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
        equals(pair) {
            return std.equals(this.first, pair.first) && std.equals(this.second, pair.second);
        }
        less(pair) {
            if (std.equals(this.first, pair.first) == false)
                return std.less(this.first, pair.first);
            else
                return std.less(this.second, pair.second);
        }
    }
    std.Pair = Pair;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> Priority queue. </p>
     *
     * <p> {@link PriorityQueue Priority queues} are a type of container adaptors, specifically designed such that its
     * first element is always the greatest of the elements it contains, according to some <i>strict weak ordering</i>
     * criterion. </p>
     *
     * <p> This context is similar to a <i>heap</i>, where elements can be inserted at any moment, and only the
     * <i>max heap</i> element can be retrieved (the one at the top in the {@link PriorityQueue priority queue}). </p>
     *
     * <p> {@link PriorityQueue Priority queues} are implemented as <i>container adaptors</i>, which are classes that
     * use an encapsulated object of a specific container class as its {@link container_ underlying container},
     * providing a specific set of member functions to access its elements. Elements are popped from the <i>"back"</i>
     * of the specific container, which is known as the <i>top</i> of the {@link PriorityQueue Priority queue}. </p>
     *
     * <p> The {@link container_ underlying container} may be any of the standard container class templates or some
     * other specifically designed container class. The container shall be accessible through
     * {@link IArrayIterator random access iterators} and support the following operations: </p>
     *
     * <ul>
     *	<li> empty() </li>
     *	<li> size() </li>
     *	<li> front() </li>
     *	<li> push_back() </li>
     *	<li> pop_back() </li>
     * </ul>
     *
     * <p> The standard container classes {@link Vector} and {@link Deque} fulfill these requirements. By default, if
     * no container class is specified for a particular {@link PriorityQueue} class instantiation, the standard
     * container {@link Vector} is used. </p>
     *
     * <p> Support of {@link IArrayIterator random access iterators} is required to keep a heap structure internally
     * at all times. This is done automatically by the container adaptor by automatically calling the algorithm
     * functions <i>make_heap</i>, <i>push_heap</i> and <i>pop_heap</i> when needed. </p>
     *
     * @param <T> Type of the elements.
     *
     * @reference http://www.cplusplus.com/reference/queue/priority_queue/
     * @author Jeongho Nam
     */
    class PriorityQueue {
        constructor(...args) {
            // CONSTRUCT UNDERLYING CONTAINER WITH COMPARE
            let compare;
            if (args.length == 0 || args[args.length - 1] instanceof Function == false)
                compare = std.greater;
            else
                compare = args[args.length - 1];
            this.container_ = new std.TreeMultiSet(compare);
            // OVERLOADINGS
            if (args.length >= 1 && args[0] instanceof Array) {
                this.construct_from_array(args[0]);
            }
            else if (args.length >= 1 && args[0] instanceof std.base.container.SetContainer) {
                this.construct_from_container(args[0]);
            }
            else if (args.length >= 2 && args[0] instanceof std.SetIterator && args[1] instanceof std.SetIterator) {
                this.construct_from_range(args[0], args[1]);
            }
        }
        /**
         * @hidden
         */
        construct_from_array(items) {
            for (let i = 0; i < items.length; i++)
                this.container_.push(...items);
        }
        /**
         * @hidden
         */
        construct_from_container(container) {
            this.construct_from_range(container.begin(), container.end());
        }
        /**
         * @hidden
         */
        construct_from_range(begin, end) {
            this.container_.assign(begin, end);
        }
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * <p> Return size. </p>
         *
         * <p> Returns the number of elements in the {@link PriorityQueue}. </p>
         *
         * <p> This member function effectively calls member {@link IArray.size size} of the
         * {@link container_ underlying container} object. </p>
         *
         * @return The number of elements in the underlying container.
         */
        size() {
            return this.container_.size();
        }
        /**
         * <p> Test whether container is empty. </p>
         *
         * <p> Returns whether the {@link PriorityQueue} is empty: i.e. whether its {@link size} is zero. </p>
         *
         * <p> This member function effectively calls member {@link IARray.empty empty} of the
         * {@link container_ underlying container} object. </p>
         */
        empty() {
            return this.container_.empty();
        }
        /* ---------------------------------------------------------
            ELEMENTS I/O
        --------------------------------------------------------- */
        /**
         * <p> Access top element. </p>
         *
         * <p> Returns a constant reference to the top element in the {@link PriorityQueue}. </p>
         *
         * <p> The top element is the element that compares higher in the {@link PriorityQueue}, and the next that is
         * removed from the container when {@link PriorityQueue.pop} is called. </p>
         *
         * <p> This member function effectively calls member {@link IArray.front front} of the
         * {@link container_ underlying container} object. </p>
         *
         * @return A reference to the top element in the {@link PriorityQueue}.
         */
        top() {
            return this.container_.begin().value;
        }
        /**
         * <p> Insert element. </p>
         *
         * <p> Inserts a new element in the {@link PriorityQueue}. The content of this new element is initialized to
         * <i>val</i>.
         *
         * <p> This member function effectively calls the member function {@link IArray.push_back push_back} of the
         * {@link container_ underlying container} object, and then reorders it to its location in the heap by calling
         * the <i>push_heap</i> algorithm on the range that includes all the elements of the container. </p>
         *
         * @param val Value to which the inserted element is initialized.
         */
        push(val) {
            this.container_.insert(val);
        }
        /**
         * <p> Remove top element. </p>
         *
         * <p> Removes the element on top of the {@link PriorityQueue}, effectively reducing its {@link size} by one.
         * The element removed is the one with the highest (or lowest) value. </p>
         *
         * <p> The value of this element can be retrieved before being popped by calling member
         * {@link PriorityQueue.top}. </p>
         *
         * <p> This member function effectively calls the <i>pop_heap</i> algorithm to keep the heap property of
         * {@link PriorityQueue PriorityQueues} and then calls the member function {@link IArray.pop_back pop_back} of
         * the {@link container_ underlying container} object to remove the element. </p>
         */
        pop() {
            this.container_.erase(this.container_.begin());
        }
        /**
         * <p> Swap contents. </p>
         *
         * <p> Exchanges the contents of the container adaptor by those of <i>obj</i>, swapping both the
         * {@link container_ underlying container} value and their comparison function using the corresponding
         * {@link std.swap swap} non-member functions (unqualified). </p>
         *
         * <p> This member function has a <i>noexcept</i> specifier that matches the combined <i>noexcept</i> of the
         * {@link IArray.swap swap} operations on the {@link container_ underlying container} and the comparison
         * functions. </p>
         *
         * @param obj {@link PriorityQueue} container adaptor of the same type (i.e., instantiated with the same
         *			  template parameters, <b>T</b>). Sizes may differ.
         */
        swap(obj) {
            this.container_.swap(obj.container_);
        }
    }
    std.PriorityQueue = PriorityQueue;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> FIFO queue. </p>
     *
     * <p> {@link Queue}s are a type of container adaptor, specifically designed to operate in a FIFO context
     * (first-in first-out), where elements are inserted into one end of the container and extracted from the other.
     * </p>
     *
     * <p> {@link Queue}s are implemented as containers adaptors, which are classes that use an encapsulated object of
     * a specific container class as its underlying container, providing a specific set of member functions to access
     * its elements. Elements are pushed into the {@link IDeque.back back()} of the specific container and popped from
     * its {@link IDeque.front front()}. </p>
     *
     * <p> {@link container_ The underlying container} may be one of the standard container class template or some
     * other specifically designed container class. This underlying container shall support at least the following
     * operations: </p>
     *
     * <ul>
     *	<li> empty </li>
     *	<li> size </li>
     *	<li> front </li>
     *	<li> back </li>
     *	<li> push_back </li>
     *	<li> pop_front </li>
     * </ul>
     *
     * <p> The standard container classes {@link Deque} and {@link List} fulfill these requirements.
     * By default, if no container class is specified for a particular {@link Queue} class instantiation, the standard
     * container {@link List} is used. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/queue/queue/ </li>
     * </ul>
     *
     * @param <T> Type of elements.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Queue {
        constructor(queue = null) {
            this.container_ = new std.List();
            if (queue != null)
                this.container_.assign(queue.container_.begin(), queue.container_.end());
        }
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * <p> Return size. </p>
         * <p> Returns the number of elements in the {@link Queue}. </p>
         *
         * <p> This member function effectively calls member {@link IDeque.size size()} of the
         * {@link container_ underlying container} object. </p>
         *
         * @return The number of elements in the {@link container_ underlying container}.
         */
        size() {
            return this.container_.size();
        }
        /**
         * <p> Test whether container is empty. </p>
         * <p> returns whether the {@link Queue} is empty: i.e. whether its <i>size</i> is zero. </p>
         *
         * <p> This member function efeectively calls member {@link IDeque.empty empty()} of the
         * {@link container_ underlying container} object. </p>
         *
         * @return <code>true</code> if the {@link container_ underlying container}'s size is 0,
         *		   <code>false</code> otherwise. </p>
         */
        empty() {
            return this.container_.empty();
        }
        /**
         * <p> Access next element. </p>
         * <p> Returns a value of the next element in the {@link Queue}. </p>
         *
         * <p> The next element is the "oldest" element in the {@link Queue} and the same element that is popped out
         * from the queue when {@link pop Queue.pop()} is called. </p>
         *
         * <p> This member function effectively calls member {@link IDeque.front front()} of the
         * {@link container_ underlying container} object. </p>
         *
         * @return A value of the next element in the {@link Queue}.
         */
        front() {
            return this.container_.front();
        }
        /**
         * <p> Access last element. </p>
         *
         * <p> Returns a vaue of the last element in the queue. This is the "newest" element in the queue (i.e. the
         * last element pushed into the queue). </p>
         *
         * <p> This member function effectively calls the member function {@link IDeque.back back()} of the
         * {@link container_ underlying container} object. </p>
         *
         * @return A value of the last element in the {@link Queue}.
         */
        back() {
            return this.container_.back();
        }
        /* ---------------------------------------------------------
            ELEMENTS I/O
        --------------------------------------------------------- */
        /**
         * <p> Insert element. </p>
         *
         * <p> Inserts a new element at the end of the {@link Queue}, after its current last element.
         * The content of this new element is initialized to <i>val</i>. </p>
         *
         * <p> This member function effectively calls the member function {@link IDeque.push_back push_back()} of the
         * {@link container_ underlying container} object. </p>
         *
         * @param val Value to which the inserted element is initialized.
         */
        push(val) {
            this.container_.push_back(val);
        }
        /**
         * <p> Remove next element. </p>
         *
         * <p> Removes the next element in the {@link Queue}, effectively reducing its size by one. </p>
         *
         * <p> The element removed is the "oldest" element in the {@link Queue} whose value can be retrieved by calling
         * member {@link front Queue.front()} </p>.
         *
         * <p> This member function effectively calls the member function {@link IDeque.pop_front pop_front()} of the
         * {@link container_ underlying container} object. </p>
         */
        pop() {
            this.container_.pop_front();
        }
        /**
         * <p> Swap contents. </p>
         *
         * <p> Exchanges the contents of the container adaptor (<i>this</i>) by those of <i>obj</i>. </p>
         *
         * <p> This member function calls the non-member function {@link IContainer.swap swap} (unqualified) to swap
         * the {@link container_ underlying containers}. </p>
         *
         * @param obj Another {@link Queue} container adaptor of the same type (i.e., instantiated with the same
         *			  template parameter, <b>T</b>). Sizes may differ. </p>
         */
        swap(obj) {
            this.container_.swap(obj.container_);
        }
    }
    std.Queue = Queue;
})(std || (std = {}));
/// <refe0rence path="base/container/Iterator.ts" />
var std;
(function (std) {
    /**
     * <p> An iterator of a Set. </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class SetIterator extends std.base.container.Iterator {
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
        constructor(source, it) {
            super(source);
            this.list_iterator_ = it;
        }
        get_list_iterator() {
            return this.list_iterator_;
        }
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        prev() {
            return new SetIterator(this.set, this.list_iterator_.prev());
        }
        /**
         * @inheritdoc
         */
        next() {
            return new SetIterator(this.source_, this.list_iterator_.next());
        }
        /**
         * @inheritdoc
         */
        advance(size) {
            return new SetIterator(this.set, this.list_iterator_.advance(size));
        }
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        get set() {
            return this.source_;
        }
        /**
         * @inheritdoc
         */
        get value() {
            return this.list_iterator_.value;
        }
        /* ---------------------------------------------------------
            COMPARISONS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        equals(obj) {
            return super.equals(obj) && this.list_iterator_ == obj.list_iterator_;
        }
        /**
         * @inheritdoc
         */
        less(obj) {
            return std.less(this.value, obj.value);
        }
        /**
         * @inheritdoc
         */
        hash() {
            return std.base.hash.code(this.value);
        }
        /**
         * @inheritdoc
         */
        swap(obj) {
            this.list_iterator_.swap(obj.list_iterator_);
        }
    }
    std.SetIterator = SetIterator;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> LIFO stack. </p>
     *
     * <p> {@link Stack}s are a type of container adaptor, specifically designed to operate in a LIFO context
     * (last-in first-out), where elements are inserted and extracted only from one end of the container. </p>
     *
     * <p> {@link Stack}s are implemented as containers adaptors, which are classes that use an encapsulated object of
     * a specific container class as its <i>underlying container</i>, providing a specific set of member functions to
     * access its elements. Elements are pushed/popped from the {@link ILinearContainer.back back()} of the
     * {@link ILinearContainer specific container}, which is known as the top of the {@link Stack}. </p>
     *
     * <p> {@link container_ The underlying container} may be any of the standard container class templates or some
     * other specifically designed container class. The container shall support the following operations: </p>
     *
     * <ul>
     *	<li> empty </li>
     *	<li> size </li>
     *	<li> front </li>
     *	<li> back </li>
     *	<li> push_back </li>
     *	<li> pop_back </li>
     * </ul>
     *
     * <p> The standard container classes {@link Vector}, {@link Deque} and {@link List} fulfill these requirements.
     * By default, if no container class is specified for a particular {@link Stack} class instantiation, the standard
     * container {@link List} is used. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/stack/stack/ </li>
     * </ul>
     *
     * @param <T> Type of elements.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Stack {
        constructor(stack = null) {
            this.container_ = new std.List();
            if (stack != null)
                this.container_.assign(stack.container_.begin(), stack.container_.end());
        }
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * <p> Return size. </p>
         *
         * <p> Returns the number of elements in the {@link Stack}. </p>
         *
         * <p> This member function effectively calls member {@link ILinearContainer.size size()} of the
         * {@link container_ underlying container} object. </p>
         *
         * @return The number of elements in the {@link container_ underlying container}.
         */
        size() {
            return this.container_.size();
        }
        /**
         * <p> Test whether container is empty. </p>
         *
         * <p> returns whether the {@link Stack} is empty: i.e. whether its <i>size</i> is zero. </p>
         *
         * <p> This member function effectively calls member {@link ILinearContainer.empty empty()} of the
         * {@link container_ underlying container} object. </p>
         *
         * @return <code>true</code> if the <i>underlying container</i>'s size is 0,
         *		   <code>false</code> otherwise. </p>
         */
        empty() {
            return this.container_.empty();
        }
        /**
         * <p> Access next element. </p>
         *
         * <p> Returns a value of the top element in the {@link Stack} </p>.
         *
         * <p> Since {@link Stack}s are last-in first-out containers, the top element is the last element inserted into
         * the {@link Stack}. </p>
         *
         * <p> This member function effectively calls member {@link ILinearContainer.back back()} of the
         * {@link container_ underlying container} object. </p>
         *
         * @return A value of the top element in the {@link Stack}.
         */
        top() {
            return this.container_.back();
        }
        /* ---------------------------------------------------------
            ELEMENTS I/O
        --------------------------------------------------------- */
        /**
         * <p> Insert element. </p>
         *
         * <p> Inserts a new element at the top of the {@link Stack}, above its current top element. </p>
         *
         * <p> This member function effectively calls the member function
         * {@link ILinearContainer.push_back push_back()} of the {@link container_ underlying container} object. </p>
         *
         * @param val Value to which the inserted element is initialized.
         */
        push(val) {
            this.container_.push_back(val);
        }
        /**
         * <p> Remove top element. </p>
         *
         * <p> Removes the element on top of the {@link Stack}, effectively reducing its size by one. </p>
         *
         * <p> The element removed is the latest element inserted into the {@link Stack}, whose value can be retrieved
         * by calling member {@link top Stack.top()} </p>.
         *
         * <p> This member function effectively calls the member function {@link ILinearContainer.pop_back pop_back()}
         * of the {@link container_ underlying container} object. </p>
         */
        pop() {
            this.container_.pop_back();
        }
        /**
         * <p> Swap contents. </p>
         *
         * <p> Exchanges the contents of the container adaptor (<i>this</i>) by those of <i>obj</i>. </p>
         *
         * <p> This member function calls the non-member function {@link IContainer.swap swap} (unqualified) to swap
         * the {@link container_ underlying containers}. </p>
         *
         * @param obj Another {@link Stack} container adaptor of the same type (i.e., instantiated with the same
         *			  template parameter, <b>T</b>). Sizes may differ. </p>
         */
        swap(obj) {
            this.container_.swap(obj.container_);
        }
    }
    std.Stack = Stack;
})(std || (std = {}));
/// <reference path="Exception.ts" />
var std;
(function (std) {
    /**
     * <p> System error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report conditions originating during
     * runtime from the operating system or other low-level application program interfaces which have an
     * associated {@link ErrorCode}. </p>
     *
     * <p> The class inherits from {@link RuntimeError}, to which it adds an {@link ErrorCode} as
     * member code (and defines a specialized what member). </p>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/system_error/system_error/
     * </ul>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class SystemError extends std.RuntimeError {
        constructor(...args) {
            super("");
        }
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * <p> Get error code. </p>
         *
         * <p> Returns the {@link ErrorCode} object associated with the exception. </p>
         *
         * <p> This value is either the {@link ErrorCode} passed to the construction or its equivalent
         * (if constructed with a value and a {@link category}. </p>
         *
         * @return The {@link ErrorCode} associated with the object.
         */
        code() {
            return this.code_;
        }
    }
    std.SystemError = SystemError;
})(std || (std = {}));
/// <reference path="base/container/UniqueMap.ts" />
var std;
(function (std) {
    /**
     * <p> Tree-structured map, <code>std::map</code> of STL. </p>
     *
     * <p> {@link TreeMap TreeMaps} are associative containers that store elements formed by a combination of a
     * <i>key value</i> (<i>Key</i>) and a <i>mapped value</i> (<i>T</i>), following order. </p>
     *
     * <p> In a {@link TreeMap}, the <i>key values</i> are generally used to sort and uniquely identify
     * the elements, while the <i>mapped values</i> store the content associated to this key. The types of
     * <i>key</i> and <i>mapped value</i> may differ, and are grouped together in member type <i>value_type</i>,
     * which is a {@link Pair} type combining both: </p>
     *
     * <p> <code>typedef Pair<Key, T> value_type;</code> </p>
     *
     * <p> Internally, the elements in a {@link TreeMap} are always sorted by its <i>key</i> following
     * a strict weak ordering criterion indicated by its internal comparison method {@link less}.
     *
     * <p> {@link TreeMap} containers are generally slower than {@link HashMap HashMap} containers to
     * access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on
     * their order. </p>
     *
     * <p> {@link TreeMap}s are typically implemented as binary search trees. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Ordered </dt>
     *	<dd> The elements in the container follow a strict order at all times. All inserted elements are
     *		 given a position in this order. </dd>
     *
     *	<dt> Map </dt>
     *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>:
     *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
     *
     *	<dt> Unique keys </dt>
     *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/map/map/ </li>
     * </ul>
     *
     * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
     * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class TreeMap extends std.base.container.UniqueMap {
        constructor(...args) {
            super();
            // CONSTRUCT TREE WITH COMPARE
            let compare;
            if (args.length == 0 || args[args.length - 1] instanceof Function == false)
                compare = std.less;
            else
                compare = args[args.length - 1];
            this.tree_ = new std.base.tree.PairTree(compare);
            // OVERLOADINGS
            if (args.length >= 1 && args[0] instanceof Array) {
                this.construct_from_array(args[0]);
            }
            else if (args.length >= 1 && args[0] instanceof std.base.container.MapContainer) {
                this.construct_from_container(args[0]);
            }
            else if (args.length >= 2 && args[0] instanceof std.MapIterator && args[1] instanceof std.MapIterator) {
                this.construct_from_range(args[0], args[1]);
            }
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        assign(begin, end) {
            super.assign(begin, end);
        }
        /**
         * @inheritdoc
         */
        clear() {
            super.clear();
            this.tree_ = new std.base.tree.PairTree();
        }
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        find(key) {
            let node = this.tree_.find(key);
            if (node == null || std.equals(node.value.first, key) == false)
                return this.end();
            else
                return node.value;
        }
        /**
         * <p> Return iterator to lower bound. </p>
         *
         * <p> Returns an iterator pointing to the first element in the container whose key is not considered to
         * go before <i>k</i> (i.e., either it is equivalent or goes after). </p>
         *
         * <p> The function uses its internal comparison object (key_comp) to determine this, returning an
         * iterator to the first element for which key_comp(<i>k</i>, element_key) would return false. </p>
         *
         * <p> If the {@link TreeMap} class is instantiated with the default comparison type ({@link less}),
         * the function returns an iterator to the first element whose key is not less than <i>k</i> </p>.
         *
         * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except
         * in the case that the {@link TreeMap} contains an element with a key equivalent to <i>k</i>: In this
         * case, {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound}
         * returns an iterator pointing to the next element. </p>
         *
         * @param k Key to search for.
         *
         * @return An iterator to the the first element in the container whose key is not considered to go before
         *		   <i>k</i>, or {@link TreeMap.end} if all keys are considered to go before <i>k</i>.
         */
        lower_bound(key) {
            let node = this.tree_.find(key);
            if (node == null)
                return this.end();
            else if (std.less(node.value.first, key))
                return node.value.next();
            else
                return node.value;
        }
        /**
         * <p> Return iterator to upper bound. </p>
         *
         * <p> Returns an iterator pointing to the first element in the container whose key is considered to
         * go after <i>k</i> </p>.
         *
         * <p> The function uses its internal comparison object (key_comp) to determine this, returning an
         * iterator to the first element for which key_comp(<i>k</i>, element_key) would return true. </p>
         *
         * <p> If the {@link TreeMap} class is instantiated with the default comparison type ({@link less}),
         * the function returns an iterator to the first element whose key is greater than <i>k</i> </p>.
         *
         * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except
         * in the case that the map contains an element with a key equivalent to <i>k</i>: In this case
         * {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} returns an
         * iterator pointing to the next element. </p>
         *
         * @param k Key to search for.
         *
         * @return An iterator to the the first element in the container whose key is considered to go after
         *		   <i>k</i>, or {@link TreeMap.end} if no keys are considered to go after <i>k</i>.
         */
        upper_bound(key) {
            let node = this.tree_.find(key);
            if (node == null)
                return this.end();
            else if (!std.equals(node.value.first, key) && !std.less(node.value.first, key))
                return node.value;
            else
                return node.value.next();
        }
        /**
         * <p> Get range of equal elements. </p>
         *
         * <p> Returns the bounds of a range that includes all the elements in the container which have a key
         * equivalent to <i>k</i> </p>.
         *
         * <p> Because the elements in a {@link TreeMap} container have unique keys, the range returned will
         * contain a single element at most. </p>
         *
         * <p> If no matches are found, the range returned has a length of zero, with both iterators pointing to
         * the first element that has a key considered to go after <i>k</i> according to the container's internal
         * comparison object (key_comp). </p>
         *
         * <p> Two keys are considered equivalent if the container's comparison object returns false reflexively
         * (i.e., no matter the order in which the keys are passed as arguments). </p>
         *
         * @param k Key to search for.
         *
         * @return The function returns a {@link Pair}, whose member {@link Pair.first} is the lower bound of
         *		   the range (the same as {@link lower_bound}), and {@link Pair.second} is the upper bound
         *		   (the same as {@link upper_bound}).
         */
        equal_range(key) {
            return new std.Pair(this.lower_bound(key), this.upper_bound(key));
        }
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        insert_by_pair(pair) {
            let node = this.tree_.find(pair.first);
            // IF EQUALS, THEN RETURN FALSE
            if (node != null && std.equals(node.value.first, pair.first) == true)
                return new std.Pair(node.value, false);
            // INSERTS
            let it;
            if (node == null)
                it = this.end();
            else if (std.less(node.value.first, pair.first) == true)
                it = node.value.next();
            else
                it = node.value;
            // ITERATOR TO RETURN
            it = this.insert(it, pair);
            return new std.Pair(it, true);
        }
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        handle_insert(item) {
            this.tree_.insert(item);
        }
        /**
         * @inheritdoc
         */
        handle_erase(item) {
            this.tree_.erase(item);
        }
        /* ===============================================================
            UTILITIES
        =============================================================== */
        /**
         * @inheritdoc
         */
        swap(obj) {
            if (obj instanceof TreeMap)
                this.swap_tree_map(obj);
            else
                super.swap(obj);
        }
        /**
         * @hidden
         */
        swap_tree_map(obj) {
            let supplement = new TreeMap();
            supplement.data_ = this.data_;
            supplement.tree_ = this.tree_;
            this.data_ = obj.data_;
            this.tree_ = obj.tree_;
            obj.data_ = supplement.data_;
            obj.tree_ = supplement.tree_;
        }
    }
    std.TreeMap = TreeMap;
})(std || (std = {}));
/// <reference path="base/container/MultiMap.ts" />
var std;
(function (std) {
    /**
     * <p> Tree-structured multiple-key map. </p>
     *
     * <p> {@link TreeMultiMap TreeMultiMaps} are associative containers that store elements formed by a combination of
     * a <i>key value</i> and a <i>mapped value</i>, following a specific order, and where multiple elements can
     * have equivalent keys. </p>
     *
     * <p> In a {@link TreeMultiMap}, the <i>key values</i> are generally used to sort and uniquely identify
     * the elements, while the <i>mapped values</i> store the content associated to this <i>key</i>. The types of
     * <i>key</i> and <i>mapped value</i> may differ, and are grouped together in member type
     * <code>value_type</code>, which is a {@link Pair} type combining both: </p>
     *
     * <p> <code>typedef Pair<const Key, T> value_type;</code> </p>
     *
     * <p> Internally, the elements in a {@link TreeMultiMap}are always sorted by its key following a
     * strict weak ordering criterion indicated by its internal comparison method (of {@link less}). </p>
     *
     * <p> {@link TreeMultiMap}containers are generally slower than {@link HashMap} containers
     * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based
     * on their order. </p>
     *
     * <p> {@link TreeMultiMap TreeMultiMaps} are typically implemented as binary search trees. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd>
     *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		position in the container.
     *	</dd>
     *
     *	<dt> Ordered </dt>
     *	<dd>
     *		The elements in the container follow a strict order at all times. All inserted elements are
     *		given a position in this order.
     *	</dd>
     *
     *	<dt> Map </dt>
     *	<dd>
     *		Each element associates a <i>key</i> to a <i>mapped value</i>:
     *		<i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>.
     *	</dd>
     *
     *	<dt> Multiple equivalent keys </dt>
     *	<dd> Multiple elements in the container can have equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/map/multimap/ </li>
     * </ul>
     *
     * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
     * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class TreeMultiMap extends std.base.container.MultiMap {
        constructor(...args) {
            super();
            // CONSTRUCT TREE WITH COMPARE
            let compare;
            if (args.length == 0 || args[args.length - 1] instanceof Function == false)
                compare = std.less;
            else
                compare = args[args.length - 1];
            this.tree_ = new std.base.tree.PairTree(compare);
            // OVERLOADINGS
            if (args.length >= 1 && args[0] instanceof Array) {
                this.construct_from_array(args[0]);
            }
            else if (args.length >= 1 && args[0] instanceof std.base.container.MapContainer) {
                this.construct_from_container(args[0]);
            }
            else if (args.length >= 2 && args[0] instanceof std.MapIterator && args[1] instanceof std.MapIterator) {
                this.construct_from_range(args[0], args[1]);
            }
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        assign(begin, end) {
            super.assign(begin, end);
        }
        /**
         * @inheritdoc
         */
        clear() {
            super.clear();
        }
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        find(key) {
            let node = this.tree_.find(key);
            if (node == null || std.equals(node.value.first, key) == false)
                return this.end();
            else
                return node.value;
        }
        /**
         * <p> Return iterator to lower bound. </p>
         *
         * <p> Returns an iterator pointing to the first element in the container whose key is not considered to
         * go before <i>k</i> (i.e., either it is equivalent or goes after). </p>
         *
         * <p> The function uses its internal comparison object (key_comp) to determine this, returning an
         * iterator to the first element for which key_comp(<i>k</i>, element_key) would return false. </p>
         *
         * <p> If the {@link TreeMultiMap} class is instantiated with the default comparison type ({@link less}),
         * the function returns an iterator to the first element whose key is not less than <i>k</i> </p>.
         *
         * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except
         * in the case that the {@link TreeMultiMap} contains an element with keys equivalent to <i>k</i>:
         * In this case, {@link lower_bound} returns an iterator pointing to the first of such elements,
         * whereas {@link upper_bound} returns an iterator pointing to the element following the last. </p>
         *
         * @param k Key to search for.
         *
         * @return An iterator to the the first element in the container whose key is not considered to go before
         *		   <i>k</i>, or {@link TreeMultiMap.end} if all keys are considered to go before <i>k</i>.
         */
        lower_bound(key) {
            let node = this.tree_.find(key);
            if (node == null)
                return this.end();
            else if (std.equals(node.value.first, key))
                return node.value;
            else {
                let it = node.value;
                while (!std.equals(it, this.end()) && std.less(it.first, key))
                    it = it.next();
                return it;
            }
        }
        /**
         * <p> Return iterator to upper bound. </p>
         *
         * <p> Returns an iterator pointing to the first element in the container whose key is considered to
         * go after <i>k</i> </p>.
         *
         * <p> The function uses its internal comparison object (key_comp) to determine this, returning an
         * iterator to the first element for which key_comp(<i>k</i>, element_key) would return true. </p>
         *
         * <p> If the {@link TreeMultiMap} class is instantiated with the default comparison type ({@link less}),
         * the function returns an iterator to the first element whose key is greater than <i>k</i> </p>.
         *
         * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except
         * in the case that the {@link TreeMultiMap} contains an element with keys equivalent to <i>k</i>:
         * In this case {@link lower_bound} returns an iterator pointing to first of such element, whereas
         * {@link upper_bound} returns an iterator pointing to the element following the last. </p>
         *
         * @param k Key to search for.
         *
         * @return An iterator to the the first element in the container whose key is considered to go after
         *		   <i>k</i>, or {@link TreeMultiMap.end} if no keys are considered to go after <i>k</i>.
         */
        upper_bound(key) {
            let node = this.tree_.find(key);
            if (node == null)
                return this.end();
            else {
                let it = node.value;
                while (!std.equals(it, this.end()) && (std.equals(it.first, key) || std.less(it.first, key)))
                    it = it.next();
                return it;
            }
        }
        /**
         * <p> Get range of equal elements. </p>
         *
         * <p> Returns the bounds of a range that includes all the elements in the container which have a key
         * equivalent to <i>k</i> </p>.
         *
         * <p> If no matches are found, the range returned has a length of zero, with both iterators pointing to
         * the first element that has a key considered to go after <i>k</i> according to the container's internal
         * comparison object (key_comp). </p>
         *
         * <p> Two keys are considered equivalent if the container's comparison object returns false reflexively
         * (i.e., no matter the order in which the keys are passed as arguments). </p>
         *
         * @param k Key to search for.
         *
         * @return The function returns a {@link Pair}, whose member {@link Pair.first} is the lower bound of
         *		   the range (the same as {@link lower_bound}), and {@link Pair.second} is the upper bound
         *		   (the same as {@link upper_bound}).
         */
        equal_range(key) {
            return new std.Pair(this.lower_bound(key), this.upper_bound(key));
        }
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        insert_by_pair(pair) {
            let node = this.tree_.find(pair.first);
            let it;
            if (node == null) {
                it = this.end();
            }
            else if (std.equals(node.value.first, pair.first) == true) {
                it = node.value.next();
            }
            else if (std.less(node.value.first, pair.first) == true) {
                it = node.value.next();
                while (it.equals(this.end()) == false && std.less(it.first, pair.first))
                    it = it.next();
            }
            else
                it = node.value;
            // ITERATOR TO RETURN
            return this.insert(it, pair);
        }
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        handle_insert(item) {
            this.tree_.insert(item);
        }
        /**
         * @inheritdoc
         */
        handle_erase(item) {
            this.tree_.erase(item);
        }
        /* ===============================================================
            UTILITIES
        =============================================================== */
        /**
         * @inheritdoc
         */
        swap(obj) {
            if (obj instanceof TreeMultiMap)
                this.swap_tree_multimap(obj);
            else
                super.swap(obj);
        }
        /**
         * @hidden
         */
        swap_tree_multimap(obj) {
            let supplement = new TreeMultiMap();
            supplement.data_ = this.data_;
            supplement.tree_ = this.tree_;
            this.data_ = obj.data_;
            this.tree_ = obj.tree_;
            obj.data_ = supplement.data_;
            obj.tree_ = supplement.tree_;
        }
    }
    std.TreeMultiMap = TreeMultiMap;
})(std || (std = {}));
/// <reference path="base/container/MultiSet.ts" />
var std;
(function (std) {
    /**
     * <p> Tree-structured multiple-key set. </p>
     *
     * <p> {@link TreeMultiSet TreeMultiSets} are containers that store elements following a specific order, and
     * where multiple elements can have equivalent values. </p>
     *
     * <p> In a {@link TreeMultiSet}, the value of an element also identifies it (the value is itself
     * the <i>key</i>, of type <i>T</i>). The value of the elements in a {@link TreeMultiSet} cannot
     * be modified once in the container (the elements are always const), but they can be inserted or removed
     * from the container. </p>
     *
     * <p> Internally, the elements in a {@link TreeMultiSet TreeMultiSets} are always sorted following a strict
     * weak ordering criterion indicated by its internal comparison method (of {@link IComparable.less less}). </p>
     *
     * <p> {@link TreeMultiSet} containers are generally slower than {@link HashMultiSet} containers
     * to access individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on
     * their order. </p>
     *
     * <p> {@link TreeMultiSet TreeMultiSets} are typically implemented as binary search trees. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd>
     *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		position in the container.
     *	</dd>
     *
     *	<dt> Ordered </dt>
     *	<dd>
     *		The elements in the container follow a strict order at all times. All inserted elements are
     *		given a position in this order.
     *	</dd>
     *
     *	<dt> Set </dt>
     *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
     *
     *	<dt> Multiple equivalent keys </dt>
     *	<dd> Multiple elements in the container can have equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/set/multiset/ </li>
     * </ul>
     *
     * @param <T> Type of the elements. Each element in a {@link TreeMultiSet} container is also identified
     *			  by this value (each value is itself also the element's <i>key</i>).
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class TreeMultiSet extends std.base.container.MultiSet {
        constructor(...args) {
            super();
            // CONSTRUCT TREE WITH COMPARE
            let compare;
            if (args.length == 0 || args[args.length - 1] instanceof Function == false)
                compare = std.less;
            else
                compare = args[args.length - 1];
            this.tree_ = new std.base.tree.AtomicTree(compare);
            // OVERLOADINGS
            if (args.length >= 1 && args[0] instanceof Array) {
                this.construct_from_array(args[0]);
            }
            else if (args.length >= 1 && args[0] instanceof std.base.container.SetContainer) {
                this.construct_from_container(args[0]);
            }
            else if (args.length >= 2 && args[0] instanceof std.SetIterator && args[1] instanceof std.SetIterator) {
                this.construct_from_range(args[0], args[1]);
            }
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        assign(begin, end) {
            super.assign(begin, end);
        }
        /**
         * @inheritdoc
         */
        clear() {
            super.clear();
            this.tree_ = new std.base.tree.AtomicTree();
        }
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        find(val) {
            var node = this.tree_.find(val);
            if (node == null || std.equals(val, node.value.value) == false)
                return this.end();
            else
                return node.value;
        }
        /**
         * <p> Return iterator to lower bound. </p>
         *
         * <p> Returns an iterator pointing to the first element in the container which is not considered to
         * go before <i>val</i> (i.e., either it is equivalent or goes after). </p>
         *
         * <p> The function uses its internal comparison object (key_comp) to determine this, returning an
         * iterator to the first element for which key_comp(element,val) would return false. </p>
         *
         * <p> If the {@link TreeMultiSet} class is instantiated with the default comparison type ({@link less}),
         * the function returns an iterator to the first element that is not less than <i>val</i>. </p>

         * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except
         * in the case that the {@link TreeMultiSet} contains elements equivalent to <i>val</i>: In this case
         * {@link lower_bound} returns an iterator pointing to the first of such elements, whereas
         * {@link upper_bound} returns an iterator pointing to the element following the last. </p>
         *
         * @param val Value to compare.
         *
         * @return An iterator to the the first element in the container which is not considered to go before
         *		   <i>val</i>, or {@link TreeMultiSet.end} if all elements are considered to go before <i>val</i>.
         */
        lower_bound(val) {
            let node = this.tree_.find(val);
            if (node == null)
                return this.end();
            else if (std.equals(node.value.value, val))
                return node.value;
            else {
                let it = node.value;
                while (!std.equals(it, this.end()) && std.less(it.value, val))
                    it = it.next();
                return it;
            }
        }
        /**
         * <p> Return iterator to upper bound. </p>
         *
         * <p> Returns an iterator pointing to the first element in the container which is considered to go after
         * <i>val</i>. </p>

         * <p> The function uses its internal comparison object (key_comp) to determine this, returning an
         * iterator to the first element for which key_comp(val,element) would return true. </p>

         * <p> If the {@code TreeMultiSet} class is instantiated with the default comparison type (less), the
         * function returns an iterator to the first element that is greater than <i>val</i>. </p>
         *
         * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except
         * in the case that the {@TreeMultiSet} contains elements equivalent to <i>val</i>: In this case
         * {@link lower_bound} returns an iterator pointing to the first of such elements, whereas
         * {@link upper_bound} returns an iterator pointing to the element following the last. </p>
         *
         * @param val Value to compare.
         *
         * @return An iterator to the the first element in the container which is considered to go after
         *		   <i>val</i>, or {@link TreeMultiSet.end} if no elements are considered to go after <i>val</i>.
         */
        upper_bound(val) {
            let node = this.tree_.find(val);
            if (node == null)
                return this.end();
            else {
                let it = node.value;
                while (!std.equals(it, this.end()) && (std.equals(it.value, val) || std.less(it.value, val)))
                    it = it.next();
                return it;
            }
        }
        /**
         * <p> Get range of equal elements. </p>
         *
         * <p> Returns the bounds of a range that includes all the elements in the container that are equivalent
         * to <i>val</i>. </p>
         *
         * <p> If no matches are found, the range returned has a length of zero, with both iterators pointing to
         * the first element that is considered to go after val according to the container's
         * internal comparison object (key_comp). </p>
         *
         * <p> Two elements of a multiset are considered equivalent if the container's comparison object returns
         * false reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
         *
         * @param key Value to search for.
         *
         * @return The function returns a {@link Pair}, whose member {@link Pair.first} is the lower bound of
         *		   the range (the same as {@link lower_bound}), and {@link Pair.second} is the upper bound
         *		   (the same as {@link upper_bound}).
         */
        equal_range(val) {
            return new std.Pair(this.lower_bound(val), this.upper_bound(val));
        }
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        insert_by_val(val) {
            var node = this.tree_.find(val);
            var it;
            if (node == null) {
                it = this.end();
            }
            else if (std.equals(node.value.value, val) == true) {
                it = node.value.next();
            }
            else if (std.less(node.value.value, val) == true) {
                it = node.value.next();
                while (it.equals(this.end()) == false && std.less(it.value, val))
                    it = it.next();
            }
            else {
                it = node.value;
            }
            // ITERATOR TO RETURN
            return this.insert(it, val);
        }
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        handle_insert(item) {
            this.tree_.insert(item);
        }
        /**
         * @inheritdoc
         */
        handle_erase(item) {
            this.tree_.erase(item);
        }
        /* ===============================================================
            UTILITIES
        =============================================================== */
        /**
         * @inheritdoc
         */
        swap(obj) {
            if (obj instanceof TreeMultiSet)
                this.swap_tree_set(obj);
            else
                super.swap(obj);
        }
        /**
         * @hidden
         */
        swap_tree_set(obj) {
            let supplement = new TreeMultiSet();
            supplement.data_ = this.data_;
            supplement.tree_ = this.tree_;
            this.data_ = obj.data_;
            this.tree_ = obj.tree_;
            obj.data_ = supplement.data_;
            obj.tree_ = supplement.tree_;
        }
    }
    std.TreeMultiSet = TreeMultiSet;
})(std || (std = {}));
/// <reference path="base/container/UniqueSet.ts" />
var std;
(function (std) {
    /**
     * <p> Tree-structured set, <code>std::set</code> of STL. </p>
     *
     * <p> {@link TreeSet}s are containers that store unique elements following a specific order. </p>
     *
     * <p> In a {@link TreeSet}, the value of an element also identifies it (the value is itself the
     * <i>key</i>, of type <i>T</i>), and each value must be unique. The value of the elements in a
     * {@link TreeSet} cannot be modified once in the container (the elements are always const), but they
     * can be inserted or removed from the container. </p>
     *
     * <p> Internally, the elements in a {@link TreeSet} are always sorted following a specific strict weak
     * ordering criterion indicated by its internal comparison method (of {@link less}). </p>
     *
     * <p> {@link TreeSet} containers are generally slower than {@link HashSet} containers to access
     * individual elements by their <i>key</i>, but they allow the direct iteration on subsets based on their
     * order. </p>
     *
     * <p> {@link TreeSet}s are typically implemented as binary search trees. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Associative </dt>
     *	<dd>
     *		Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		position in the container.
     *	</dd>
     *
     *	<dt> Ordered </dt>
     *	<dd>
     *		The elements in the container follow a strict order at all times. All inserted elements are
     *		given a position in this order.
     *	</dd>
     *
     *	<dt> Set </dt>
     *	<dd> The value of an element is also the <i>key</i> used to identify it. </dd>
     *
     *	<dt> Unique keys </dt>
     *	<dd> No two elements in the container can have equivalent <i>keys</i>. </dd>
     * </dl>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/set/set/ </li>
     * </ul>
     *
     * @param <T> Type of the elements.
     *			  Each element in an {@link TreeSet} is also uniquely identified by this value.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class TreeSet extends std.base.container.UniqueSet {
        constructor(...args) {
            super();
            // CONSTRUCT TREE WITH COMPARE
            let compare;
            if (args.length == 0 || args[args.length - 1] instanceof Function == false)
                compare = std.less;
            else
                compare = args[args.length - 1];
            this.tree_ = new std.base.tree.AtomicTree(compare);
            // OVERLOADINGS
            if (args.length >= 1 && args[0] instanceof Array) {
                this.construct_from_array(args[0]);
            }
            else if (args.length >= 1 && args[0] instanceof std.base.container.SetContainer) {
                this.construct_from_container(args[0]);
            }
            else if (args.length >= 2 && args[0] instanceof std.SetIterator && args[1] instanceof std.SetIterator) {
                this.construct_from_range(args[0], args[1]);
            }
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        assign(begin, end) {
            super.assign(begin, end);
        }
        /**
         * @inheritdoc
         */
        clear() {
            super.clear();
            this.tree_ = new std.base.tree.AtomicTree();
        }
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        find(val) {
            let node = this.tree_.find(val);
            if (node == null || std.equals(node.value.value, val) == false)
                return this.end();
            else
                return node.value;
        }
        /**
         * <p> Return iterator to lower bound. </p>
         *
         * <p> Returns an iterator pointing to the first element in the container which is not considered to go
         * before <i>val</i> (i.e., either it is equivalent or goes after). </p>
         *
         * <p> The function uses its internal comparison object (key_comp) to determine this, returning an
         * iterator to the first element for which key_comp(element, val) would return false. </p>
         *
         * <p> If the {@link Set} class is instantiated with the default comparison type ({@link less}), the
         * function returns an iterator to the first element that is not less than <i>val</i>. </p>
         *
         * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound},
         * except in the case that the {@link Set} contains an element equivalent to <i>val</i>: In this case
         * {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} returns
         * an iterator pointing to the next element. </p>
         *
         * @param val Value to compare.
         *
         * @return An iterator to the the first element in the container which is not considered to go before
         *		   <i>val</i>, or {@link Set.end} if all elements are considered to go before <i>val</i>.
         */
        lower_bound(val) {
            let node = this.tree_.find(val);
            if (node == null)
                return this.end();
            else if (std.less(node.value.value, val))
                return node.value.next();
            else
                return node.value;
        }
        /**
         * <p> Return iterator to upper bound. </p>
         *
         * <p> Returns an iterator pointing to the first element in the container which is not considered to go
         * after <i>val</i>. </p>
         *
         * <p> The function uses its internal comparison object (key_comp) to determine this, returning an
         * iterator to the first element for which key_comp(element, val) would return true. </p>
         *
         * <p> If the {@link Set} class is instantiated with the default comparison type ({@link less}), the
         * function returns an iterator to the first element that is greater than <i>val</i>. </p>
         *
         * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except
         * in the case that the {@link Set} contains an element equivalent to <i>val</i>: In this case
         * {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound} returns
         * an iterator pointing to the next element. </p>
         *
         * @param val Value to compare.
         *
         * @return An iterator to the the first element in the container which is not considered to go before
         *		   <i>val</i>, or {@link Set.end} if all elements are considered to go after <i>val</i>.
         */
        upper_bound(val) {
            let node = this.tree_.find(val);
            if (node == null)
                return this.end();
            else if (!std.equals(node.value.value, val) && !std.less(node.value.value, val))
                return node.value;
            else
                return node.value.next();
        }
        /**
         * <p> Get range of equal elements. </p>
         *
         * <p> Because all elements in a {@link Set} container are unique, the range returned will contain a
         * single element at most. </p>
         *
         * <p> If no matches are found, the range returned has a length of zero, with both iterators pointing to
         * the first element that is considered to go after <i>val</i> according to the container's
         * internal comparison object (key_comp). </p>
         *
         * <p> Two elements of a {@link Set} are considered equivalent if the container's comparison object
         * returns false reflexively (i.e., no matter the order in which the elements are passed as arguments).
         * </p>
         *
         * @param val Value to search for.
         *
         * @return The function returns a {@link Pair}, whose member {@link Pair.first} is the lower bound of
         *		   the range (the same as {@link lower_bound}), and {@link Pair.second} is the upper bound
         *		   (the same as {@link upper_bound}).
         */
        equal_range(val) {
            return new std.Pair(this.lower_bound(val), this.upper_bound(val));
        }
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        insert_by_val(val) {
            let node = this.tree_.find(val);
            // IF EQUALS, THEN RETURN FALSE
            if (node != null && std.equals(node.value.value, val) == true)
                return new std.Pair(node.value, false);
            // INSERTS
            let it;
            if (node == null)
                it = this.end();
            else if (std.less(node.value.value, val) == true)
                it = node.value.next();
            else
                it = node.value;
            // ITERATOR TO RETURN
            it = this.insert(it, val);
            return new std.Pair(it, true);
        }
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        handle_insert(item) {
            this.tree_.insert(item);
        }
        /**
         * @inheritdoc
         */
        handle_erase(item) {
            this.tree_.erase(item);
        }
        /* ===============================================================
            UTILITIES
        =============================================================== */
        /**
         * @inheritdoc
         */
        swap(obj) {
            if (obj instanceof TreeSet)
                this.swap_tree_set(obj);
            else
                super.swap(obj);
        }
        /**
         * @hidden
         */
        swap_tree_set(obj) {
            let supplement = new TreeSet();
            supplement.data_ = this.data_;
            supplement.tree_ = this.tree_;
            this.data_ = obj.data_;
            this.tree_ = obj.tree_;
            obj.data_ = supplement.data_;
            obj.tree_ = supplement.tree_;
        }
    }
    std.TreeSet = TreeSet;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> Vector, the dynamic array. </p>
     *
     * <p> {@link Vector}s are sequence containers representing arrays that can change in size. </p>
     *
     * <p> Just like arrays, {@link Vector}s use contiguous storage locations for their elements, which means that
     * their elements can also be accessed using offsets on regular pointers to its elements, and just as efficiently
     * as in arrays. But unlike arrays, their size can change dynamically, with their storage being handled
     * automatically by the container. </p>
     *
     * <p> Internally, {@link Vector}s use a dynamically allocated array to store their elements. This array may need
     * to be reallocated in order to grow in size when new elements are inserted, which implies allocating a new
     * array and moving all elements to it. This is a relatively expensive task in terms of processing time, and
     * thus, {@link Vector}s do not reallocate each time an element is added to the container. </p>
     *
     * <p> Instead, {@link Vector} containers may allocate some extra storage to accommodate for possible growth, and
     * thus the container may have an actual {@link capacity} greater than the storage strictly needed to contain its
     * elements (i.e., its {@link size}). Libraries can implement different strategies for growth to balance between
     * memory usage and reallocations, but in any case, reallocations should only happen at logarithmically growing
     * intervals of {@link size} so that the insertion of individual elements at the end of the {@link Vector} can be
     * provided with amortized constant time complexity (see {@link push_back push_back()}). </p>
     *
     * <p> Therefore, compared to arrays, {@link Vector}s consume more memory in exchange for the ability to manage
     * storage and grow dynamically in an efficient way. </p>
     *
     * <p> Compared to the other dynamic sequence containers ({@link Deque}s, {@link List}s), {@link Vector Vectors}
     * are very efficient accessing its elements (just like arrays) and relatively efficient adding or removing
     * elements from its end. For operations that involve inserting or removing elements at positions other than the
     * end, they perform worse than the others, and have less consistent iterators and references than {@link List}s.
     * </p>
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
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/vector/vector/
     * </ul>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class Vector extends Array {
        constructor(...args) {
            super();
            if (args.length == 0) {
            }
            if (args.length == 1 && args[0] instanceof Array) {
                // CONSTRUCT FROM AN ARRAY OF ITEMS
                let array = args[0];
                this.push(...array);
            }
            else if (args.length == 1 && typeof args[0] == "number") {
                // CONSTRUCT FROM SIZE
                let size = args[0];
                this.length = size;
            }
            else if (args.length == 2 && typeof args[0] == "number") {
                // CONSTRUCT FROM SIZE AND REPEATING VALUE
                let size = args[0];
                let val = args[1];
                this.assign(size, val);
            }
            else if (args.length == 1 && (args[0] instanceof Vector || args[0] instanceof std.base.container.Container)) {
                // COPY CONSTRUCTOR
                let container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.base.container.Iterator && args[1] instanceof std.base.container.Iterator) {
                // CONSTRUCT FROM INPUT ITERATORS
                let begin = args[0];
                let end = args[1];
                this.assign(begin, end);
            }
        }
        static get iterator() { return std.VectorIterator; }
        assign(first, second) {
            this.clear();
            if (first instanceof std.base.container.Iterator && second instanceof std.base.container.Iterator) {
                let begin = first;
                let end = second;
                for (let it = begin; it.equals(end) == false; it = it.next())
                    this.push(it.value);
            }
            else if (typeof first == "number") {
                let size = first;
                let val = second;
                this.length = size;
                for (let i = 0; i < size; i++)
                    this[i] = val;
            }
        }
        /**
         * @inheritdoc
         */
        reserve(size) {
        }
        /**
         * @inheritdoc
         */
        clear() {
            this.erase(this.begin(), this.end());
        }
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        begin() {
            if (this.empty() == true)
                return this.end();
            else
                return new std.VectorIterator(this, 0);
        }
        /**
         * @inheritdoc
         */
        end() {
            return new std.VectorIterator(this, -1);
        }
        /**
         * @inheritdoc
         */
        size() {
            return this.length;
        }
        /**
         * @inheritdoc
         */
        capacity() {
            return this.length;
        }
        /**
         * @inheritdoc
         */
        empty() {
            return this.length == 0;
        }
        /**
         * @inheritdoc
         */
        at(index) {
            if (index < this.size())
                return this[index];
            else
                throw new std.OutOfRange("Target index is greater than Vector's size.");
        }
        /**
         * @inheritdoc
         */
        set(index, val) {
            if (index > this.length)
                throw new std.OutOfRange("Target index is greater than Vector's size.");
            let prev = this[index];
            this[index] = val;
            return prev;
        }
        /**
         * @inheritdoc
         */
        front() {
            return this.at(0);
        }
        /**
         * @inheritdoc
         */
        back() {
            return this.at(this.length - 1);
        }
        /* ---------------------------------------------------------
            ELEMENTS I/O
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        push_back(val) {
            this.push(val);
        }
        /**
         * @inheritdoc
         */
        pop_back() {
            this.erase(this.end().prev());
        }
        insert(...args) {
            let position = args[0];
            if (args.length == 2 && args[1] instanceof std.base.container.Iterator == false) {
                let val = args[1];
                return this.insert(position, 1, val);
            }
            else if (args.length == 3 && typeof args[1] == "number") {
                let size = args[1];
                let val = args[2];
                let spliced = this.splice(position.index);
                let inserts = [];
                for (let i = 0; i < size; i++)
                    inserts.push(val);
                this.push(...inserts);
                this.push(...spliced);
                return new std.VectorIterator(this, position.index + inserts.length - 1);
            }
            else if (args.length == 3 && args[1] instanceof std.base.container.Iterator && args[2] instanceof std.base.container.Iterator) {
                let myEnd = args[0];
                let begin = args[1];
                let end = args[2];
                let spliced = this.splice(position.index);
                let inserts = [];
                for (let it = begin; it.equals(end) == false; it = it.next())
                    inserts.push(it.value);
                this.push(...spliced);
                this.push(...inserts);
                return new std.VectorIterator(this, myEnd.index + inserts.length - 1);
            }
            else
                throw new std.InvalidArgument("invalid parameters.");
        }
        erase(begin, end = null) {
            let startIndex = begin.index;
            if (end == null)
                this.splice(startIndex, 1);
            else if (end.index == -1) {
                this.splice(startIndex);
                return this.end();
            }
            else
                this.splice(startIndex, end.index - startIndex);
            return new std.VectorIterator(this, startIndex);
        }
        /* ===============================================================
            UTILITIES
        =============================================================== */
        /**
         * @inheritdoc
         */
        swap(obj) {
            let supplement = new Vector(this.begin(), this.end());
            this.assign(obj.begin(), obj.end());
            obj.assign(supplement.begin(), supplement.end());
        }
    }
    std.Vector = Vector;
})(std || (std = {}));
/// <reference path="base/container/Iterator.ts" />
var std;
(function (std) {
    /**
     * <p> A bi-directional iterator of a Set. </p>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    class VectorIterator extends std.base.container.Iterator {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * <p> Construct from the source {@link Vector container}. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create the iterator directly, by yourself. </p>
         * <p> Use {@link Vector.begin begin()}, {@link Vector.end end()} in {@link Vector container} instead. </p>
         *
         * @param source The source {@link Vector container} to reference.
         * @param index Sequence number of the element in the source {@link Vector}.
         */
        constructor(source, index) {
            super(source);
            this.index_ = index;
        }
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        get vector() {
            return this.source_;
        }
        /**
         * @inheritdoc
         */
        get value() {
            return this.vector.at(this.index_);
        }
        /**
         * @inheritdoc
         */
        set value(val) {
            this.vector.set(this.index_, val);
        }
        /**
         * @inheritdoc
         */
        equals(obj) {
            return super.equals(obj) && this.index_ == obj.index_;
        }
        /**
         * @inheritdoc
         */
        get index() {
            return this.index_;
        }
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        prev() {
            if (this.index_ == -1)
                return new VectorIterator(this.vector, this.vector.size() - 1);
            else if (this.index_ - 1 < 0)
                return this.vector.end();
            else
                return new VectorIterator(this.vector, this.index_ - 1);
        }
        /**
         * @inheritdoc
         */
        next() {
            if (this.index_ >= this.source_.size() - 1)
                return this.vector.end();
            else
                return new VectorIterator(this.vector, this.index_ + 1);
        }
        /**
         * @inheritdoc
         */
        advance(n) {
            let newIndex = this.index_ + n;
            if (newIndex < 0 || newIndex >= this.vector.size())
                return this.vector.end();
            else
                return new VectorIterator(this.vector, newIndex);
        }
        /**
         * @inheritdoc
         */
        swap(obj) {
            let supplement = this.value;
            this.value = obj.value;
            obj.value = supplement;
        }
    }
    std.VectorIterator = VectorIterator;
})(std || (std = {}));
