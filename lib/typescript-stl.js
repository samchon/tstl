var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="API.ts" />
// Standard Template Library: Algorithms
// The header <algorithm> defines a collection of functions especially designed to be used on ranges of elements.
//
// A range is any sequence of objects that can be accessed through iterators or pointers, such as an array or an 
// instance of some of the STL containers. Notice though, that algorithms operate through iterators directly on the 
// values, not affecting in any way the structure of any possible container (it never affects the size or storage 
// allocation of the container).
//
// @reference http://www.cplusplus.com/reference/algorithm
// @author Jeongho Nam <http://samchon.org>
var std;
(function (std) {
    /* =========================================================
        ITERATIONS (NON-MODIFYING SEQUENCE)
            - FOR_EACH
            - AGGREGATE CONDITIONS
            - FINDERS
            - COUNTERS
    ============================================================
        FOR_EACH
    --------------------------------------------------------- */
    /**
     * <p> Apply function to range. </p>
     *
     * <p> Applies function <i>fn</i> to each of the elements in the range [<i>first</i>, <i>last</i>). </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param fn Unary function that accepts an element in the range as argument. This can either be a function p
     *			 ointer or a move constructible function object. Its return value, if any, is ignored.
     */
    function for_each(first, last, fn) {
        for (var it = first; !it.equals(last); it = it.next())
            fn(it.value);
        return fn;
    }
    std.for_each = for_each;
    /**
     * Apply function to range.
     *
     * Applies function *fn* to each of the elements in the range [*first*, *first + n*).
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param n the number of elements to apply the function to
     * @param fn Unary function that accepts an element in the range as argument. This can either be a function p
     *			 ointer or a move constructible function object. Its return value, if any, is ignored.
     *
     * @return first + n
     */
    function for_each_n(first, n, fn) {
        for (var i = 0; i < n; i++) {
            fn(first.value);
            first = first.next();
        }
        return first;
    }
    std.for_each_n = for_each_n;
    /* ---------------------------------------------------------
        AGGREGATE CONDITIONS
    --------------------------------------------------------- */
    /**
     * <p> Test condition on all elements in range. </p>
     *
     * <p> Returns <code>true</code> if <i>pred</i> returns <code>true</code> for all the elements in the range
     * [<i>first</i>, <i>last</i>) or if the range is {@link IContainer.empty empty}, and <code>false</code> otherwise.
     * </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
     *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition
     *			   checked by this function. The function shall not modify its argument.
     *
     * @return <code>true</code> if pred returns true for all the elements in the range or if the range is
     *		   {@link IContainer.empty empty}, and <code>false</code> otherwise.
     */
    function all_of(first, last, pred) {
        for (var it = first; !it.equals(last); it = it.next())
            if (pred(it.value) == false)
                return false;
        return true;
    }
    std.all_of = all_of;
    /**
     * <p> Test if any element in range fulfills condition. </p>
     *
     * <p> Returns <code>true</code> if <i>pred</i> returns true for any of the elements in the range
     * [<i>first</i>, <i>last</i>), and <code>false</code> otherwise. </p>
     *
     * <p> If [<i>first</i>, <i>last</i>) is an {@link IContainer.empty empty} range, the function returns
     * <code>false</code>. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
     *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition
     *			   checked by this function. The function shall not modify its argument.
     *
     * @return <code>true</code> if <i>pred</i> returns <code>true</code> for any of the elements in the range
     *		   [<i>first</i>, <i>last</i>), and <code>false</code> otherwise. If [<i>first</i>, <i>last</i>) is an
     *		   {@link IContainer.empty empty} range, the function returns <code>false</code>.
     */
    function any_of(first, last, pred) {
        for (var it = first; !it.equals(last); it = it.next())
            if (pred(it.value) == true)
                return true;
        return false;
    }
    std.any_of = any_of;
    /**
     * <p> Test if no elements fulfill condition. </p>
     *
     * <p> Returns <code>true</code> if <i>pred</i> returns false for all the elements in the range
     * [<i>first</i>, <i>last</i>) or if the range is {@link IContainer.empty empty}, and <code>false</code> otherwise.
     * </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param pred Unary function that accepts an element in the range as argument and returns a value convertible to
     *			   <code>boolean</code>. The value returned indicates whether the element fulfills the condition
     *			   checked by this function. The function shall not modify its argument.
     *
     * @return <code>true</code> if <i>pred</i> returns <code>false</code> for all the elements in the range
     *		   [<i>first</i>, <i>last</i>) or if the range is {@link IContainer.empty empty}, and <code>false</code>
     *		   otherwise.
     */
    function none_of(first, last, pred) {
        return !any_of(first, last, pred);
    }
    std.none_of = none_of;
    function equal(first1, last1, first2, pred) {
        if (pred === void 0) { pred = std.equal_to; }
        while (!first1.equals(last1))
            if (first2.equals(first2.get_source().end()) || !pred(first1.value, first2.value))
                return false;
            else {
                first1 = first1.next();
                first2 = first2.next();
            }
        return true;
    }
    std.equal = equal;
    function lexicographical_compare(first1, last1, first2, last2, compare) {
        if (compare === void 0) { compare = std.less; }
        while (!first1.equals(last1))
            if (first2.equals(last2) || !compare(first1.value, first2.value))
                return false;
            else if (compare(first1.value, first2.value))
                return true;
            else {
                first1 = first1.next();
                first2 = first2.next();
            }
        return !std.equal_to(last2, last2.get_source().end()) && !std.equal_to(first2.value, last2.value);
    }
    std.lexicographical_compare = lexicographical_compare;
    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    /**
     * <p> Find value in range. </p>
     *
     * <p> Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>) that compares equal to
     * <i>val</i>. If no such element is found, the function returns <i>last</i>. </p>
     *
     * <p> The function uses {@link equal_to equal_to} to compare the individual elements to <i>val</i>. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param val Value to search for in the range.
     *
     * @return An {@link Iterator} to the first element in the range that compares equal to <i>val</i>. If no elements
     *		   match, the function returns <i>last</i>.
     */
    function find(first, last, val) {
        for (var it = first; !it.equals(last); it = it.next())
            if (std.equal_to(it.value, val))
                return it;
        return last;
    }
    std.find = find;
    /**
     * <p> Find element in range. </p>
     *
     * <p> Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>) for which pred returns
     * <code>true</code>. If no such element is found, the function returns <i>last</i>. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param pred Unary function that accepts an element in the range as argument and returns a value convertible
     *			   to <code>bool</code>. The value returned indicates whether the element is considered a match in
     *			   the context of this function. The function shall not modify its argument.
     *
     * @return An {@link Iterator} to the first element in the range for which <i>pred</i> does not return
     *		   <code>false</code>. If <i>pred</i> is <code>false</code> for all elements, the function returns
     *		   <i>last</i>.
     */
    function find_if(first, last, pred) {
        for (var it = first; !it.equals(last); it = it.next())
            if (pred(it.value))
                return it;
        return last;
    }
    std.find_if = find_if;
    /**
     * <p> Find element in range. </p>
     *
     * <p> Returns an iterator to the first element in the range [<i>first</i>, <i>last</i>) for which pred returns
     * <code>true</code>. If no such element is found, the function returns <i>last</i>. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param pred Unary function that accepts an element in the range as argument and returns a value convertible
     *			   to <code>bool</code>. The value returned indicates whether the element is considered a match in
     *			   the context of this function. The function shall not modify its argument.
     *
     * @return An {@link Iterator} to the first element in the range for which <i>pred</i> returns <code>false</code>.
     *		   If <i>pred</i> is <code>true</code> for all elements, the function returns <i>last</i>.
     */
    function find_if_not(first, last, pred) {
        for (var it = first; !it.equals(last); it = it.next())
            if (pred(it.value) == false)
                return it;
        return last;
    }
    std.find_if_not = find_if_not;
    function find_end(first1, last1, first2, last2, compare) {
        if (compare === void 0) { compare = std.equal_to; }
        if (first2.equals(last2))
            return last1;
        var ret = last1;
        for (; !first1.equals(last1); first1 = first1.next()) {
            var it1 = first1;
            var it2 = first2;
            while (std.equal_to(it1.value, it2.value)) {
                it1 = it1.next();
                it2 = it2.next();
                if (it2.equals(last2)) {
                    ret = first1;
                    break;
                }
                else if (it1.equals(last1))
                    return ret;
            }
        }
        return ret;
    }
    std.find_end = find_end;
    function find_first_of(first1, last1, first2, last2, pred) {
        if (pred === void 0) { pred = std.equal_to; }
        for (; !first1.equals(last1); first1 = first1.next())
            for (var it = first2; !it.equals(last2); it = it.next())
                if (pred(it.value, first1.value))
                    return first1;
        return last1;
    }
    std.find_first_of = find_first_of;
    function adjacent_find(first, last, pred) {
        if (pred === void 0) { pred = std.equal_to; }
        if (!first.equals(last)) {
            var next_1 = first.next();
            while (!next_1.equals(last)) {
                if (std.equal_to(first.value, last.value))
                    return first;
                first = first.next();
                next_1 = next_1.next();
            }
        }
        return last;
    }
    std.adjacent_find = adjacent_find;
    function search(first1, last1, first2, last2, pred) {
        if (pred === void 0) { pred = std.equal_to; }
        if (first2.equals(last2))
            return first1;
        for (; !first1.equals(last1); first1 = first1.next()) {
            var it1 = first1;
            var it2 = first2;
            while (std.equal_to(it1.value, it2.value)) {
                it1 = it1.next();
                it2 = it2.next();
                if (it2.equals(last2))
                    return first1;
                else if (it1.equals(last1))
                    return last1;
            }
        }
        return last1;
    }
    std.search = search;
    function search_n(first, last, count, val, pred) {
        if (pred === void 0) { pred = std.equal_to; }
        var limit = first.advance(std.distance(first, last) - count);
        for (; !first.equals(limit); first = first.next()) {
            var it = first;
            var i = 0;
            while (std.equal_to(it.value, val)) {
                it = it.next();
                if (++i == count)
                    return first;
            }
        }
        return last;
    }
    std.search_n = search_n;
    function mismatch(first1, last1, first2, compare) {
        if (compare === void 0) { compare = std.equal_to; }
        while (!first1.equals(last1) && !first2.equals(first2.get_source().end())
            && std.equal_to(first1.value, first2.value)) {
            first1 = first1.next();
            first2 = first2.next();
        }
        return std.make_pair(first1, first2);
    }
    std.mismatch = mismatch;
    /* ---------------------------------------------------------
        COUNTERS
    --------------------------------------------------------- */
    /**
     * <p> Count appearances of value in range. </p>
     *
     * <p> Returns the number of elements in the range [<i>first</i>, <i>last</i>) that compare equal to <i>val</i>. </p>
     *
     * <p> The function uses {@link equal_to} to compare the individual elements to <i>val</i>. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param val Value to match.
     *
     * @return The number of elements in the range [<i>first</i>, <i>last</i>) that compare equal to <i>val</i>.
     */
    function count(first, last, val) {
        var cnt = 0;
        for (var it = first; !it.equals(last); it = it.next())
            if (std.equal_to(it.value, val))
                cnt++;
        return cnt;
    }
    std.count = count;
    /**
     * <p> Return number of elements in range satisfying condition. </p>
     *
     * <p> Returns the number of elements in the range [<i>first</i>, <i>last</i>) for which pred is <code>true</code>.
     * </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible
     *			   to <code>bool</code>. The value returned indicates whether the element is counted by this function.
     *			   The function shall not modify its argument. This can either be a function pointer or a function
     *			   object.
     */
    function count_if(first, last, pred) {
        var cnt = 0;
        for (var it = first; !it.equals(last); it = it.next())
            if (pred(it.value))
                cnt++;
        return cnt;
    }
    std.count_if = count_if;
})(std || (std = {}));
var std;
(function (std) {
    /* =========================================================
        MODIFIERS (MODIFYING SEQUENCE)
            - FILL
            - REMOVE
            - REPLACE & SWAP
            - RE-ARRANGEMENT
    ============================================================
        FILL
    --------------------------------------------------------- */
    /**
     * <p> Copy range of elements. </p>
     *
     * <p> Copies the elements in the range [<i>first</i>, <i>last</i>) into the range beginning at <i>result</i>. </p>
     *
     * <p> The function returns an iterator to the end of the destination range (which points to the element following the
     * last element copied). </p>
     *
     * <p> The ranges shall not overlap in such a way that result points to an element in the range
     * [<i>first</i>, <i>last</i>). For such cases, see {@link copy_backward}. </p>
     *
     * @param first {@link Iterator Input iterator} to the initial position in a sequence to be copied.
     * @param last {@link Iterator Input iterator} to the initial position in a sequence to be copied. The range used is
     *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
     *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param result {@link Iterator Output iterator} to the initial position in the destination sequence. This shall not
     *				 point to any element in the range [<i>first</i>, <i>last</i>).
     *
     * @return An iterator to the end of the destination range where elements have been copied.
     */
    function copy(first, last, result) {
        for (; !first.equals(last); first = first.next()) {
            result.value = first.value;
            result = result.next();
        }
        return result;
    }
    std.copy = copy;
    /**
     * <p> Copy elements. </p>
     *
     * <p> Copies the first <i>n</i> elements from the range beginning at <i>first</i> into the range beginning at
     * <i>result</i>. </p>
     *
     * <p> The function returns an iterator to the end of the destination range (which points to one past the last element
     * copied). </p>
     *
     * <p> If <i>n</i> is negative, the function does nothing. </p>
     *
     * <p> If the ranges overlap, some of the elements in the range pointed by result may have undefined but valid values.
     * </p>
     *
     * @param first {@link Iterator Input iterator} to the initial position in a sequence of at least <i>n</i> elements to
     *				be copied. <i>InputIterator</i> shall point to a type assignable to the elements pointed by
     *				<i>OutputIterator</i>.
     * @param n Number of elements to copy. If this value is negative, the function does nothing.
     * @param result {@link Iterator Output iterator} to the initial position in the destination sequence of at least
     *				 <i>n</i> elements. This shall not point to any element in the range [<i>first</i>, last].
     *
     * @return An iterator to the end of the destination range where elements have been copied.
     */
    function copy_n(first, n, result) {
        for (var i = 0; i < n; i++) {
            result.value = first.value;
            first = first.next();
            result = result.next();
        }
        return result;
    }
    std.copy_n = copy_n;
    /**
     * <p> Copy certain elements of range. </p>
     *
     * <p> Copies the elements in the range [<i>first</i>, <i>last</i>) for which pred returns <code>true</code> to the
     * range beginning at <i>result</i>. </p>
     *
     * @param first {@link Iterator Input iterator} to the initial position in a sequence to be copied.
     * @param last {@link Iterator Input iterator} to the initial position in a sequence to be copied. The range used is
     *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
     *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param result {@link Iterator Output iterator} to the initial position in the destination sequence. This shall not
     *				 point to any element in the range [<i>first</i>, <i>last</i>).
     * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
     *			   <code>bool</code>. The value returned indicates whether the element is to be copied (if
     *			   <code>true</code>, it is copied). The function shall not modify any of its arguments.
     *
     * @return An iterator to the end of the destination range where elements have been copied.
     */
    function copy_if(first, last, result, pred) {
        for (; !first.equals(last); first = first.next()) {
            if (!pred(first.value))
                continue;
            result.value = first.value;
            result = result.next();
        }
        return result;
    }
    std.copy_if = copy_if;
    /**
     * <p> Copy range of elements backward. </p>
     *
     * <p> Copies the elements in the range [<i>first</i>, <i>last</i>) starting from the end into the range terminating
     * at <i>result</i>. </p>
     *
     * <p> The function returns an iterator to the first element in the destination range. </p>
     *
     * <p> The resulting range has the elements in the exact same order as [<i>first</i>, <i>last</i>). To reverse their
     * order, see {@link reverse_copy}. </p>
     *
     * <p> The function begins by copying <code>*(last-1)</code> into <code>*(result-1)</code>, and then follows backward
     * by the elements preceding these, until <i>first</i> is reached (and including it). </p>
     *
     * <p> The ranges shall not overlap in such a way that <i>result</i> (which is the <i>past-the-end element</i> in the
     * destination range) points to an element in the range (first,last]. For such cases, see {@link copy}. </p>
     *
     * @param first {@link Iterator Bidirectional iterator} to the initial position in a sequence to be copied.
     * @param last {@link Iterator Bidirectional iterator} to the initial position in a sequence to be copied. The range
     *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and
     *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param result {@link Iterator Bidirectional iterator} to the initial position in the destination sequence. This
     *				 shall not point to any element in the range [<i>first</i>, <i>last</i>).
     *
     * @return An iterator to the first element of the destination sequence where elements have been copied.
     */
    function copy_backward(first, last, result) {
        last = last.prev();
        for (; !last.equals(first); last = last.prev()) {
            result.value = last.value;
            result = result.prev();
        }
        return result;
    }
    std.copy_backward = copy_backward;
    /**
     * <p> Fill range with value. </p>
     *
     * <p> Assigns val to all the elements in the range [<i>first</i>, <i>last</i>). </p>
     *
     * @param first {@link Iterator Forward iterator} to the initial position in a sequence of elements that support being
     *				assigned a value of type <i>T</i>.
     * @param last {@link Iterator Forward iterator} to the final position in a sequence of elements that support being
     *				assigned a value of type <i>T</i>.. The range filled is [<i>first</i>, <i>last</i>), which contains
     *				all the elements between <i>first</i> and <i>last</i>, including the element pointed by <i>first</i>
     *				but not the element pointed by <i>last</i>.
     * @param val Value to assign to the elements in the filled range.
     */
    function fill(first, last, val) {
        for (; !first.equals(last); first = first.next())
            first.value = val;
    }
    std.fill = fill;
    /**
     * <p> Fill sequence with value. </p>
     *
     * <p> Assigns <i>val</i> to the first <i>n</i> elements of the sequence pointed by <i>first</i>. </p>
     *
     * @param first {@link Iterator Output iterator} to the initial position in a sequence of elements that support being
     *				assigned a value of type <i>T</i>.
     * @param n Number of elements to fill. If negative, the function does nothing.
     * @param val Value to be used to fill the range.
     *
     * @return An iterator pointing to the element that follows the last element filled.
     */
    function fill_n(first, n, val) {
        for (var i = 0; i < n; i++) {
            first.value = val;
            first = first.next();
        }
        return first;
    }
    std.fill_n = fill_n;
    function transform() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (args.length == 4)
            return unary_transform.apply(null, args);
        else
            return binary_transform.apply(null, args);
    }
    std.transform = transform;
    /**
     * @hidden
     */
    function unary_transform(first, last, result, op) {
        for (; !first.equals(last); first = first.next()) {
            result.value = op(first.value);
            result = result.next();
        }
        return result;
    }
    /**
     * @hidden
     */
    function binary_transform(first1, last1, first2, result, binary_op) {
        while (!first1.equals(last1)) {
            result.value = binary_op(first1.value, first2.value);
            first1 = first1.next();
            first2 = first2.next();
            result = result.next();
        }
        return result;
    }
    /**
     * <p> Generate values for range with function. </p>
     *
     * <p> Assigns the value returned by successive calls to gen to the elements in the range [<i>first</i>, <i>last</i>).
     * </p>
     *
     * @param first {@link Iterator Forward iterator} to the initial position in a sequence.
     * @param last {@link Iterator Forward iterator} to the final position in a sequence. The range affected is
     *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
     *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param gen Generator function that is called with no arguments and returns some value of a type convertible to
     *			  those pointed by the iterators.
     */
    function generate(first, last, gen) {
        for (; !first.equals(last); first = first.next())
            first.value = gen();
    }
    std.generate = generate;
    /**
     * <p> Generate values for sequence with function. </p>
     *
     * <p> Assigns the value returned by successive calls to <i>gen</i> to the first <i>n</i> elements of the sequence
     * pointed by <i>first</i>. </p>
     *
     * @param first {@link Iterator Output iterator} to the initial position in a sequence of at least <i>n</i> elements
     *				that support being assigned a value of the type returned by <i>gen</i>.
     * @param n Number of values to generate. If negative, the function does nothing.
     * @param gen Generator function that is called with no arguments and returns some value of a type convertible to
     *			  those pointed by the iterators.
     *
     * @return An iterator pointing to the element that follows the last element whose value has been generated.
     */
    function generate_n(first, n, gen) {
        for (var i = 0; i < n; i++) {
            first.value = gen();
            first = first.next();
        }
        return first;
    }
    std.generate_n = generate_n;
    function unique(first, last, pred) {
        if (pred === void 0) { pred = std.equal_to; }
        var ret = first;
        for (var it = first.next(); !it.equals(last);) {
            if (std.equal_to(it.value, it.prev().value) == true)
                it = it.get_source().erase(it);
            else {
                ret = it;
                it = it.next();
            }
        }
        return ret;
    }
    std.unique = unique;
    function unique_copy(first, last, result, pred) {
        if (pred === void 0) { pred = std.equal_to; }
        if (first.equals(last))
            return result;
        result.value = first.value;
        first = first.next();
        for (; !first.equals(last); first = first.next())
            if (!pred(first.value, result.value)) {
                result = result.next();
                result.value = first.value;
            }
        return result;
    }
    std.unique_copy = unique_copy;
    /**
     * <p> Remove value from range. </p>
     *
     * <p> Transforms the range [<i>first</i>, <i>last</i>) into a range with all the elements that compare equal to
     * <i>val</i> removed, and returns an iterator to the new last of that range. </p>
     *
     * <p> The function cannot alter the properties of the object containing the range of elements (i.e., it cannot alter
     * the size of an array or a container): The removal is done by replacing the elements that compare equal to
     * <i>val</i> by the next element that does not, and signaling the new size of the shortened range by returning an
     * iterator to the element that should be considered its new past-the-last element. </p>
     *
     * <p> The relative order of the elements not removed is preserved, while the elements between the returned iterator
     * and last are left in a valid but unspecified state. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param val Value to be removed.
     */
    function remove(first, last, val) {
        var ret = last;
        for (var it = first; !it.equals(last);) {
            if (std.equal_to(it.value, val) == true)
                it = it.get_source().erase(it);
            else {
                ret = it;
                it = it.next();
            }
        }
        return ret;
    }
    std.remove = remove;
    /**
     * <p> Remove elements from range. </p>
     *
     * <p> Transforms the range [<i>first</i>, <i>last</i>) into a range with all the elements for which pred returns
     * <code>true</code> removed, and returns an iterator to the new last of that range. </p>
     *
     * <p> The function cannot alter the properties of the object containing the range of elements (i.e., it cannot
     * alter the size of an array or a container): The removal is done by replacing the elements for which pred returns
     * <code>true</code> by the next element for which it does not, and signaling the new size of the shortened range
     * by returning an iterator to the element that should be considered its new past-the-last element. </p>
     *
     * <p> The relative order of the elements not removed is preserved, while the elements between the returned
     * iterator and last are left in a valid but unspecified state. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
     *			   <code>bool</code>. The value returned indicates whether the element is to be removed (if
     *			   <code>true</code>, it is removed). The function shall not modify its argument.
     */
    function remove_if(first, last, pred) {
        var ret = last;
        for (var it = first; !it.equals(last);) {
            if (pred(it.value) == true)
                it = it.get_source().erase(it);
            else {
                ret = it;
                it = it.next();
            }
        }
        return ret;
    }
    std.remove_if = remove_if;
    /**
     * <p> Copy range removing value. </p>
     *
     * <p> Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, except
     * those elements that compare equal to <i>val</i>. </p>
     *
     * <p> The resulting range is shorter than [<i>first</i>, <i>last</i>) by as many elements as matches in the sequence,
     * which are "removed". </p>
     *
     * <p> The function uses {@link equal_to} to compare the individual elements to <i>val</i>. </p>
     *
     * @param first {@link Iterator InputIterator} to the initial position in a sequence.
     * @param last {@link Iterator InputIterator} to the final position in a sequence. The range used is
     *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
     *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
     *				 stored. The pointed type shall support being assigned the value of an element in the range
     *				 [<i>first</i>, <i>last</i>).
     * @param val Value to be removed.
     *
     * @return An iterator pointing to the end of the copied range, which includes all the elements in
     *		   [<i>first</i>, <i>last</i>) except those that compare equal to <i>val</i>.
     */
    function remove_copy(first, last, result, val) {
        for (; !first.equals(last); first = first.next()) {
            if (std.equal_to(first.value, val))
                continue;
            result.value = first.value;
            result = result.next();
        }
        return result;
    }
    std.remove_copy = remove_copy;
    /**
     * <p> Copy range removing values. </p>
     *
     * <p> Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, except
     * those elements for which <i>pred</i> returns <code>true</code>. </p>
     *
     * <p> The resulting range is shorter than [<i>first</i>, <i>last</i>) by as many elements as matches, which are
     * "removed". </p>
     *
     * @param first {@link Iterator InputIterator} to the initial position in a sequence.
     * @param last {@link Iterator InputIterator} to the final position in a sequence. The range used is
     *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
     *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
     *				 stored. The pointed type shall support being assigned the value of an element in the range
     *				 [<i>first</i>, <i>last</i>).
     * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
     *			   <code>bool</code>. The value returned indicates whether the element is to be removed from the copy (if
     *			   <code>true</code>, it is not copied). The function shall not modify its argument.
     *
     * @return An iterator pointing to the end of the copied range, which includes all the elements in
     *		   [<i>first</i>, <i>last</i>) except those for which <i>pred</i> returns <code>true</code>.
     */
    function remove_copy_if(first, last, result, pred) {
        for (; !first.equals(last); first = first.next()) {
            if (pred(first.value))
                continue;
            result.value = first.value;
            result = result.next();
        }
        return result;
    }
    std.remove_copy_if = remove_copy_if;
    /* ---------------------------------------------------------
        REPLACE & SWAP
    --------------------------------------------------------- */
    /**
     * <p> Replace value in range. </p>
     *
     * <p> Assigns <i>new_val</i> to all the elements in the range [<i>first</i>, <i>last</i>) that compare equal to
     * <i>old_val</i>. </p>
     *
     * <p> The function uses {@link equal_to} to compare the individual elements to old_val. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param old_val Value to be replaced.
     * @param new_val Replacement value.
     */
    function replace(first, last, old_val, new_val) {
        for (var it = first; !it.equals(last); it = it.next())
            if (std.equal_to(it.value, old_val))
                it.value = new_val;
    }
    std.replace = replace;
    /**
     * <p> Replace value in range. </p>
     *
     * <p> Assigns <i>new_val</i> to all the elements in the range [<i>first</i>, <i>last</i>) for which pred returns
     * <code>true</code>. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
     *			   <code>bool</code>. The value returned indicates whether the element is to be replaced (if
     *			   <code>true</code>, it is replaced). The function shall not modify its argument.
     * @param new_val Value to assign to replaced elements.
     */
    function replace_if(first, last, pred, new_val) {
        for (var it = first; !it.equals(last); it = it.next())
            if (pred(it.value) == true)
                it.value = new_val;
    }
    std.replace_if = replace_if;
    /**
     * <p> Copy range replacing value. </p>
     *
     * <p> Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, replacing
     * the appearances of <i>old_value</i> by <i>new_value</i>. </p>
     *
     * <p> The function uses {@link std.equal_to} to compare the individual elements to <i>old_value</i>. </p>
     *
     * <p> The ranges shall not overlap in such a way that result points to an element in the range
     * [<i>first</i>, <i>last</i>). </p>
     *
     * @param first {@link Iterator InputIterator} to the initial position in a sequence.
     * @param last {@link Iterator InputIterator} to the final position in a sequence. The range used is
     *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
     *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
     *				 stored. The pointed type shall support being assigned the value of an element in the range
     *				 [<i>first</i>, <i>last</i>).
     * @param old_val Value to be replaced.
     * @param new_val Replacement value.
     *
     * @return An iterator pointing to the element that follows the last element written in the result sequence.
     */
    function replace_copy(first, last, result, old_val, new_val) {
        for (; !first.equals(last); first = first.next()) {
            if (std.equal_to(first.value, old_val))
                result.value = new_val;
            else
                result.value = first.value;
            result = result.next();
        }
        return result;
    }
    std.replace_copy = replace_copy;
    /**
     * <p> Copy range replacing value. </p>
     *
     * <p> Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, replacing
     * those for which <i>pred</i> returns <code>true</code> by <i>new_value</i>. </p>
     *
     * @param first {@link Iterator InputIterator} to the initial position in a sequence.
     * @param last {@link Iterator InputIterator} to the final position in a sequence. The range used is
     *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
     *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param result {@link Iterator Output iterator} to the initial position of the range where the resulting sequence is
     *				 stored. The pointed type shall support being assigned the value of an element in the range
     *				 [<i>first</i>, <i>last</i>).
     * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
     *			   <code>bool</code>. The value returned indicates whether the element is to be removed from the copy (if
     *			   <code>true</code>, it is not copied). The function shall not modify its argument.
     * @param new_val Value to assign to replaced values.
     *
     * @return An iterator pointing to the element that follows the last element written in the result sequence.
     */
    function replace_copy_if(first, last, result, pred, new_val) {
        for (; !first.equals(last); first = first.next()) {
            if (pred(first.value))
                result.value = new_val;
            else
                result.value = first.value;
            result = result.next();
        }
        return result;
    }
    std.replace_copy_if = replace_copy_if;
    /**
     * <p> Exchange values of objects pointed to by two iterators. </p>
     *
     * <p> Swaps the elements pointed to by <i>x</i> and <i>y</i>. </p>
     *
     * <p> The function calls {@link Iterator.swap} to exchange the elements. </p>
     *
     * @param x {@link Iterator Forward iterator} to the objects to swap.
     * @param y {@link Iterator Forward iterator} to the objects to swap.
     */
    function iter_swap(x, y) {
        x.swap(y);
    }
    std.iter_swap = iter_swap;
    /**
     * <p> Exchange values of two ranges. </p>
     *
     * <p> Exchanges the values of each of the elements in the range [<i>first1</i>, <i>last1</i>) with those of their
     * respective elements in the range beginning at <i>first2</i>. </p>
     *
     * <p> The function calls {@link Iterator.swap} to exchange the elements. </p>
     *
     * @param first1 {@link Iterator Forward iterator} to the initial position of the first sequence.
     * @param last1 {@link Iterator Forward iterator} to the final position of the first sequence. The range used is
     *				[<i>first1</i>, <i>last1</i>), including the element pointed by <i>first1</i>, but not the element
     *				pointed by <i>last1</i>.
     * @param first2 {@link Iterator Forward iterator} to the initial position of the second range. The range includes as
     *				 many elements as [<i>first1</i>, <i>last1</i>). The two ranges shall not overlap.
     *
     * @return An iterator to the last element swapped in the second sequence.
     */
    function swap_ranges(first1, last1, first2) {
        for (; !first1.equals(last1); first1 = first1.next()) {
            first1.swap(first2);
            first2 = first2.next();
        }
        return first2;
    }
    std.swap_ranges = swap_ranges;
    /* ---------------------------------------------------------
        RE-ARRANGEMENT
    --------------------------------------------------------- */
    /**
     * <p> Reverse range. </p>
     *
     * <p> Reverses the order of the elements in the range [<i>first</i>, <i>last</i>). </p>
     *
     * <p> The function calls {@link iter_swap} to swap the elements to their new locations. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     */
    function reverse(first, last) {
        // first != last && first != --last
        while (first.equals(last) == false && first.equals((last = last.prev())) == false) {
            first.swap(last);
            first = first.next();
        }
    }
    std.reverse = reverse;
    /**
     * <p> Copy range reversed. </p>
     *
     * <p> Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, but in
     * reverse order. </p>
     *
     * @param first {@link Iterator Bidirectional iterator} to the initial position in a sequence to be copied.
     * @param last {@link Iterator Bidirectional iterator} to the initial position in a sequence to be copied. The range
     *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and
     *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param result {@link Iterator Output iterator} to the initial position of the range where the reserved range is
     *				 stored. The pointed type shall support being assigned the value of an element in the range
     *				 [<i>first</i>, <i>last</i>).
     *
     * @return An output iterator pointing to the end of the copied range, which contains the same elements in reverse
     *		   order.
     */
    function reverse_copy(first, last, result) {
        while (!last.equals(first)) {
            last = last.prev();
            result.value = last.value;
            result = result.next();
        }
        return result;
    }
    std.reverse_copy = reverse_copy;
    /**
     * <p> Rotate left the elements in range. </p>
     *
     * <p> Rotates the order of the elements in the range [<i>first</i>, <i>last</i>), in such a way that the element
     * pointed by middle becomes the new first element. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param middle An {@link Iterator} pointing to the element within the range [<i>first</i>, <i>last</i>) that is
     *				 moved to the first position in the range.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     *
     * @return An iterator pointing to the element that now contains the value previously pointed by <i>first</i>.
     */
    function rotate(first, middle, last) {
        var next = middle;
        while (next.equals(last) == false) {
            first.swap(next);
            first = first.next();
            next = next.next();
            if (first.equals(middle))
                break;
        }
        return first;
    }
    std.rotate = rotate;
    /**
     * <p> Copy range rotated left. </p>
     *
     * <p> Copies the elements in the range [<i>first</i>, <i>last</i>) to the range beginning at <i>result</i>, but
     * rotating the order of the elements in such a way that the element pointed by <i>middle</i> becomes the first
     * element in the resulting range. </p>
     *
     * @param first {@link Iterator Forward iterator} to the initial position of the range to be copy-rotated.
     * @param middle Forward iterator pointing to the element within the range [<i>first</i>, <i>last</i>) that is copied as the first element in the resulting range.
     * @param last {@link Iterator Forward iterator} to the final positions of the range to be copy-rotated. The range
     *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and
     *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     *			   Notice that in this function, these are not consecutive parameters, but the first and <b>third</b> ones.
     * @param result {@link Iterator Output iterator} to the initial position of the range where the reserved range is
     *				 stored. The pointed type shall support being assigned the value of an element in the range
     *				 [<i>first</i>, <i>last</i>).
     *
     * @return An output iterator pointing to the end of the copied range.
     */
    function rotate_copy(first, middle, last, result) {
        result = copy(middle, last, result);
        return copy(first, middle, result);
    }
    std.rotate_copy = rotate_copy;
    /**
     * <p> Randomly rearrange elements in range. </p>
     *
     * <p> Rearranges the elements in the range [<i>first</i>, <i>last</i>) randomly. </p>
     *
     * <p> The function swaps the value of each element with that of some other randomly picked element. When provided,
     * the function gen determines which element is picked in every case. Otherwise, the function uses some unspecified
     * source of randomness. </p>
     *
     * <p> To specify a uniform random generator, see {@link shuffle}. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     */
    function random_shuffle(first, last) {
        return std.shuffle(first, last);
    }
    std.random_shuffle = random_shuffle;
    /**
     * <p> Randomly rearrange elements in range using generator. </p>
     *
     * <p> Rearranges the elements in the range [<i>first</i>, <i>last</i>) randomly, using <i>g</i> as uniform random
     * number generator. </p>
     *
     * <p> The function swaps the value of each element with that of some other randomly picked element. The function
     * determines the element picked by calling <i>g()</i>. </p>
     *
     * <p> To shuffle the elements of the range without such a generator, see {@link random_shuffle} instead. </p>
     *
     * <h5> Note </h5>
     * <p> Using random generator engine is not implemented yet. </p>
     *
     * @param first An {@link Iterator} to the initial position in a sequence.
     * @param last An {@link Iterator} to the final position in a sequence. The range used is [<i>first</i>, <i>last</i>),
     *			  which contains all the elements between <i>first</i> and <i>last</i>, including the element pointed by
     *			  <i>first</i> but not the element pointed by <i>last</i>.
     */
    function shuffle(first, last) {
        for (var it = first; !it.equals(last); it = it.next()) {
            var rand_index = Math.floor(Math.random() * (last.index - first.index));
            it.swap(first.advance(rand_index));
        }
    }
    std.shuffle = shuffle;
})(std || (std = {}));
var std;
(function (std) {
    function sort(first, last, compare) {
        if (compare === void 0) { compare = std.less; }
        qsort(first.get_source(), first.index, last.index - 1, compare);
    }
    std.sort = sort;
    function partial_sort(first, middle, last, compare) {
        if (compare === void 0) { compare = std.less; }
        selection_sort(first.get_source(), first.index, middle.index, last.index, compare);
    }
    std.partial_sort = partial_sort;
    function partial_sort_copy(first, last, result_first, result_last, compare) {
        if (compare === void 0) { compare = std.less; }
        var input_size = std.distance(first, last);
        var result_size = std.distance(result_first, result_last);
        var vector = new std.Vector(first, last);
        sort(vector.begin(), vector.end());
        if (input_size > result_size)
            result_first = std.copy(vector.begin(), vector.begin().advance(result_size), result_first);
        else
            result_first = std.copy(vector.begin(), vector.end(), result_first);
        return result_first;
    }
    std.partial_sort_copy = partial_sort_copy;
    function is_sorted(first, last, compare) {
        if (compare === void 0) { compare = std.equal_to; }
        if (first.equals(last))
            return true;
        for (var next_2 = first.next(); !next_2.equals(last); next_2 = next_2.next()) {
            if (std.less(next_2.value, first.value))
                return false;
            first = first.next();
        }
        return true;
    }
    std.is_sorted = is_sorted;
    function is_sorted_until(first, last, compare) {
        if (compare === void 0) { compare = std.equal_to; }
        if (first.equals(last))
            return first;
        for (var next_3 = first.next(); !next_3.equals(last); next_3 = next_3.next()) {
            if (std.less(next_3.value, first.value))
                return next_3;
            first = first.next();
        }
        return last;
    }
    std.is_sorted_until = is_sorted_until;
    /* ---------------------------------------------------------
        BACKGROUND
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    function qsort(container, first, last, compare) {
        if (last == -2)
            last = container.size() - 1;
        if (first >= last)
            return;
        var index = qsort_partition(container, first, last, compare);
        qsort(container, first, index - 1, compare);
        qsort(container, index + 1, last, compare);
    }
    /**
     * @hidden
     */
    function qsort_partition(container, first, last, compare) {
        var standard = container.at(first);
        var i = first;
        var j = last + 1;
        while (true) {
            while (compare(container.at(++i), standard))
                if (i == last)
                    break;
            while (compare(standard, container.at(--j)))
                if (j == first)
                    break;
            if (i >= j)
                break;
            // SWAP; AT(I) WITH AT(J)
            var supplement_1 = container.at(i);
            container.set(i, container.at(j));
            container.set(j, supplement_1);
        }
        // SWAP; AT(BEGIN) WITH AT(J)
        var supplement = container.at(first);
        container.set(first, container.at(j));
        container.set(j, supplement);
        return j;
    }
    /**
     * @hidden
     */
    function stable_qsort(container, first, last, compare) {
        // QUICK SORT
        if (last == -2)
            last = container.size() - 1;
        else if (first >= last)
            return;
        var index = stable_qsort_partition(container, first, last, compare);
        stable_qsort(container, first, index - 1, compare);
        stable_qsort(container, index + 1, last, compare);
    }
    /**
     * @hidden
     */
    function stable_qsort_partition(container, first, last, compare) {
        var val = container.at(first);
        var i = first;
        var j = last + 1;
        while (true) {
            while (!std.equal_to(container.at(++i), val) && compare(container.at(i), val))
                if (i == last - 1)
                    break;
            while (!std.equal_to(val, container.at(--j)) && compare(val, container.at(j)))
                if (j == first)
                    break;
            if (i >= j)
                break;
            // SWAP; AT(I) WITH AT(J)
            var supplement_2 = container.at(i);
            container.set(i, container.at(j));
            container.set(j, supplement_2);
        }
        // SWAP; AT(BEGIN) WITH AT(J)
        var supplement = container.at(first);
        container.set(first, container.at(j));
        container.set(j, supplement);
        return j;
    }
    /**
     * @hidden
     */
    function selection_sort(container, first, middle, last, compare) {
        if (last == -1)
            last = container.size();
        for (var i = first; i < middle; i++) {
            var min_index = i;
            for (var j = i + 1; j < last; j++)
                if (compare(container.at(j), container.at(min_index)))
                    min_index = j;
            if (i != min_index) {
                var supplement = container.at(i);
                container.set(i, container.at(min_index));
                container.set(min_index, supplement);
            }
        }
    }
})(std || (std = {}));
var std;
(function (std) {
    function make_heap(first, last, compare) {
        if (compare === void 0) { compare = std.less; }
        var heap_compare = function (x, y) {
            return !compare(x, y);
        };
        std.sort(first, last, heap_compare);
    }
    std.make_heap = make_heap;
    function push_heap(first, last, compare) {
        if (compare === void 0) { compare = std.less; }
        var last_item_it = last.prev();
        var less_it = null;
        for (var it = first; !it.equals(last_item_it); it = it.next()) {
            if (compare(it.value, last_item_it.value)) {
                less_it = it;
                break;
            }
        }
        if (less_it != null) {
            var container = last_item_it.get_source();
            container.insert(less_it, last_item_it.value);
            container.erase(last_item_it);
        }
    }
    std.push_heap = push_heap;
    function pop_heap(first, last, compare) {
        if (compare === void 0) { compare = std.less; }
        var container = first.get_source();
        container.insert(last, first.value);
        container.erase(first);
    }
    std.pop_heap = pop_heap;
    function is_heap(first, last, compare) {
        if (compare === void 0) { compare = std.less; }
        var it = std.is_heap_until(first, last, compare);
        return it.equals(last);
    }
    std.is_heap = is_heap;
    function is_heap_until(first, last, compare) {
        if (compare === void 0) { compare = std.less; }
        var prev = first;
        for (var it = first.next(); !it.equals(last); it = it.next()) {
            if (compare(prev.value, it.value) == true)
                return it;
            prev = it;
        }
        return last;
    }
    std.is_heap_until = is_heap_until;
    function sort_heap(first, last, compare) {
        if (compare === void 0) { compare = std.less; }
        std.sort(first, last, compare);
    }
    std.sort_heap = sort_heap;
})(std || (std = {}));
var std;
(function (std) {
    function lower_bound(first, last, val, compare) {
        if (compare === void 0) { compare = std.less; }
        var count = std.distance(first, last);
        while (count > 0) {
            var step = Math.floor(count / 2);
            var it = first.advance(step);
            if (!compare(it.value, val)) {
                first = it.next();
                count -= step + 1;
            }
            else
                count = step;
        }
        return first;
    }
    std.lower_bound = lower_bound;
    function upper_bound(first, last, val, compare) {
        if (compare === void 0) { compare = std.less; }
        var count = std.distance(first, last);
        while (count > 0) {
            var step = Math.floor(count / 2);
            var it = first.advance(step);
            if (!compare(val, it.value)) {
                first = it.next();
                count -= step + 1;
            }
            else
                count = step;
        }
        return first;
    }
    std.upper_bound = upper_bound;
    function equal_range(first, last, val, compare) {
        if (compare === void 0) { compare = std.less; }
        var it = lower_bound(first, last, val, compare);
        return std.make_pair(it, upper_bound(it, last, val, compare));
    }
    std.equal_range = equal_range;
    function binary_search(first, last, val, compare) {
        if (compare === void 0) { compare = std.less; }
        first = lower_bound(first, last, val, compare);
        return !first.equals(last) && !compare(val, first.value);
    }
    std.binary_search = binary_search;
})(std || (std = {}));
var std;
(function (std) {
    /* =========================================================
        PARTITION
    ========================================================= */
    /**
     * <p> Test whether range is partitioned. </p>
     *
     * <p> Returns <code>true</code> if all the elements in the range [<i>first</i>, <i>last</i>) for which <i>pred</i>
     * returns <code>true</code> precede those for which it returns <code>false</code>. </p>
     *
     * <p> If the range is {@link IContainer.empty empty}, the function returns <code>true</code>. </p>
     *
     * @param first {@link Iterator Input iterator} to the initial position of the sequence.
     * @param last {@link Iterator Input iterator} to the final position of the sequence. The range used is
     *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
     *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
     *			   <code>bool</code>. The value returned indicates whether the element belongs to the first group (if
     *			   <code>true</code>, the element is expected before all the elements for which it returns
     *			   <code>false</code>). The function shall not modify its argument.
     *
     * @return <code>true</code> if all the elements in the range [<i>first</i>, <i>last</i>) for which <i>pred</i> returns
     *		   <code>true</code> precede those for which it returns <code>false</code>. Otherwise it returns
     *		   <code>false</code>. If the range is {@link IContainer.empty empty}, the function returns <code>true</code>.
     */
    function is_partitioned(first, last, pred) {
        while (!first.equals(last) && pred(first.value))
            first = first.next();
        for (; !first.equals(last); first = first.next())
            if (pred(first.value))
                return false;
        return true;
    }
    std.is_partitioned = is_partitioned;
    /**
     * <p> Partition range in two. </p>
     *
     * <p> Rearranges the elements from the range [<i>first</i>, <i>last</i>), in such a way that all the elements for
     * which <i>pred</i> returns <code>true</code> precede all those for which it returns <code>false</code>. The iterator
     * returned points to the first element of the second group. </p>
     *
     * <p> The relative ordering within each group is not necessarily the same as before the call. See
     * {@link stable_partition} for a function with a similar behavior but with stable ordering within each group. </p>
     *
     * @param first {@link Iterator Forward iterator} to the initial position of the sequence to partition.
     * @param last {@link Iterator Forward iterator} to the final position of the sequence to partition. The range used is
     *			   [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and <i>last</i>,
     *			   including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
     *			   <code>bool</code>. The value returned indicates whether the element belongs to the first group (if
     *			   <code>true</code>, the element is expected before all the elements for which it returns
     *			   <code>false</code>). The function shall not modify its argument.
     *
     * @return An iterator that points to the first element of the second group of elements (those for which <i>pred</i>
     *		   returns <code>false</code>), or <i>last</i> if this group is {@link IContainer.empty empty}.
     */
    function partition(first, last, pred) {
        while (!first.equals(last)) {
            while (pred(first.value)) {
                first = first.next();
                if (first.equals(last))
                    return first;
            }
            do {
                last = last.prev();
                if (first.equals(last))
                    return first;
            } while (!pred(last.value));
            first.swap(last);
            first = first.next();
        }
        return last;
    }
    std.partition = partition;
    /**
     * <p> Partition range in two - stable ordering. </p>
     *
     * <p> Rearranges the elements in the range [<i>first</i>, <i>last</i>), in such a way that all the elements for which
     * <i>pred</i> returns <code>true</code> precede all those for which it returns <code>false</code>, and, unlike
     * function {@link partition}, the relative order of elements within each group is preserved. </p>
     *
     * <p> This is generally implemented using an internal temporary buffer. </p>
     *
     * @param first {@link Iterator Bidirectional iterator} to the initial position of the sequence to partition.
     * @param last {@link Iterator Bidirectional iterator} to the final position of the sequence to partition. The range
     *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and
     *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
     *			   <code>bool</code>. The value returned indicates whether the element belongs to the first group (if
     *			   <code>true</code>, the element is expected before all the elements for which it returns
     *			   <code>false</code>). The function shall not modify its argument.
     *
     * @return An iterator that points to the first element of the second group of elements (those for which <i>pred</i>
     *		   returns <code>false</code>), or <i>last</i> if this group is {@link IContainer.empty empty}.
     */
    function stable_partition(first, last, pred) {
        return partition(first, last, pred);
    }
    std.stable_partition = stable_partition;
    /**
     * <p> Partition range into two. </p>
     *
     * <p> Copies the elements in the range [<i>first</i>, <i>last</i>) for which <i>pred</i> returns <code>true</code>
     * into the range pointed by <i>result_true</i>, and those for which it does not into the range pointed by
     * <i>result_false</i>. </p>
     *
     * @param first {@link Iterator Input iterator} to the initial position of the range to be copy-partitioned.
     * @param last {@link Iterator Input iterator} to the final position of the range to be copy-partitioned. The range
     *			   used is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> and
     *			   <i>last</i>, including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param result_true {@link Iterator Output iterator} to the initial position of the range where the elements for
     *					  which <i>pred</i> returns <code>true</code> are stored.
     * @param result_false {@link Iterator Output iterator} to the initial position of the range where the elements for
     *					   which <i>pred</i> returns <code>false</code> are stored.
     * @param pred Unary function that accepts an element pointed by <i>InputIterator</i> as argument, and returns a value
     *			   convertible to <code>bool</code>. The value returned indicates on which result range the element is
     *			   copied. The function shall not modify its argument.
     *
     * @return A {@link Pair} of iterators with the end of the generated sequences pointed by <i>result_true</i> and
     *		   <i>result_false</i>, respectivelly. Its member {@link Pair.first first} points to the element that follows
     *		   the last element copied to the sequence of elements for which <i>pred</i> returned <code>true</code>. Its
     *		   member {@link Pair.second second} points to the element that follows the last element copied to the sequence
     *		   of elements for which <i>pred</i> returned <code>false</code>.
     */
    function partition_copy(first, last, result_true, result_false, pred) {
        for (; !first.equals(last); first = first.next())
            if (pred(first.value)) {
                result_true.value = first.value;
                result_true = result_true.next();
            }
            else {
                result_false.value = first.value;
                result_false = result_false.next();
            }
        return std.make_pair(result_true, result_false);
    }
    std.partition_copy = partition_copy;
    /**
     * <p> Get partition point. </p>
     *
     * <p> Returns an iterator to the first element in the partitioned range [<i>first</i>, <i>last</i>) for which
     * <i>pred</i> is not <code>true</code>, indicating its partition point. </p>
     *
     * <p> The elements in the range shall already {@link is_partitioned be partitioned}, as if {@link partition} had been
     * called with the same arguments. </p>
     *
     * <p> The function optimizes the number of comparisons performed by comparing non-consecutive elements of the sorted
     * range, which is specially efficient for {@link Iteartor random-access iterators}. </p>
     *
     * @param first {@link Iterator Forward iterator} to the initial position of the partitioned sequence.
     * @param last {@link Iterator Forward iterator} to the final position of the partitioned sequence. The range checked
     *		  is [<i>first</i>, <i>last</i>), which contains all the elements between <i>first</i> an <i>last</i>,
     *		  including the element pointed by <i>first</i> but not the element pointed by <i>last</i>.
     * @param pred Unary function that accepts an element in the range as argument, and returns a value convertible to
     *			   <code>bool</code>. The value returned indicates whether the element goes before the partition point (if
     *			   <code>true</code>, it goes before; if <code>false</code> goes at or after it). The function shall not
     *			   modify its argument.
     *
     * @return An iterator to the first element in the partitioned range [<i>first</i>, <i>last</i>) for which <i>pred</i>
     *		   is not <code>true</code>, or <i>last</i> if it is not <code>true</code> for any element.
     */
    function partition_point(first, last, pred) {
        var n = std.distance(first, last);
        while (n > 0) {
            var step = Math.floor(n / 2);
            var it = first.advance(step);
            if (pred(it.value)) {
                first = it.next();
                n -= step + 1;
            }
            else
                n = step;
        }
        return first;
    }
    std.partition_point = partition_point;
})(std || (std = {}));
var std;
(function (std) {
    function merge(first1, last1, first2, last2, result, compare) {
        if (compare === void 0) { compare = std.less; }
        while (true) {
            if (first1.equals(last1))
                return std.copy(first2, last2, result);
            else if (first2.equals(last2))
                return std.copy(first1, last1, result);
            if (compare(first1.value, first2.value)) {
                result.value = first1.value;
                first1 = first1.next();
            }
            else {
                result.value = first2.value;
                first2 = first2.next();
            }
            result = result.next();
        }
    }
    std.merge = merge;
    function inplace_merge(first, middle, last, compare) {
        if (compare === void 0) { compare = std.less; }
        var vector = new std.Vector(std.distance(first, last), null);
        merge(first, middle, middle, last, vector.begin());
        std.copy(vector.begin(), vector.end(), first);
    }
    std.inplace_merge = inplace_merge;
    function includes(first1, last1, first2, last2, compare) {
        if (compare === void 0) { compare = std.less; }
        while (!first2.equals(last2)) {
            if (first1.equals(last2) || compare(first2.value, first1.value))
                return false;
            else if (!compare(first1.value, first2.value))
                first2 = first2.next();
            first1 = first1.next();
        }
        return true;
    }
    std.includes = includes;
    function set_union(first1, last1, first2, last2, result, compare) {
        if (compare === void 0) { compare = std.less; }
        while (true) {
            if (first1.equals(last1))
                return std.copy(first2, last2, result);
            else if (first2.equals(last2))
                return std.copy(first1, last1, result);
            if (compare(first1.value, first2.value)) {
                result.value = first1.value;
                first1 = first1.next();
            }
            else if (compare(first2.value, first1.value)) {
                result.value = first2.value;
                first2 = first2.next();
            }
            else {
                result.value = first1.value;
                first1 = first1.next();
                first2 = first2.next();
            }
            result = result.next();
        }
    }
    std.set_union = set_union;
    function set_intersection(first1, last1, first2, last2, result, compare) {
        if (compare === void 0) { compare = std.less; }
        while (true) {
            if (first1.equals(last1))
                return std.copy(first2, last2, result);
            else if (first2.equals(last2))
                return std.copy(first1, last1, result);
            if (compare(first1.value, first2.value))
                first1 = first1.next();
            else if (compare(first2.value, first1.value))
                first2 = first2.next();
            else {
                result.value = first1.value;
                result = result.next();
                first1 = first1.next();
                first2 = first2.next();
            }
        }
    }
    std.set_intersection = set_intersection;
    function set_difference(first1, last1, first2, last2, result, compare) {
        if (compare === void 0) { compare = std.less; }
        while (!first1.equals(last1) && !first2.equals(last2))
            if (std.less(first1.value, first2.value)) {
                result.value = first1.value;
                result = result.next();
                first1 = first1.next();
            }
            else if (std.less(first2.value, first1.value))
                first2 = first2.next();
            else {
                first1 = first1.next();
                first2 = first2.next();
            }
        return std.copy(first1, last1, result);
    }
    std.set_difference = set_difference;
    function set_symmetric_difference(first1, last1, first2, last2, result, compare) {
        if (compare === void 0) { compare = std.less; }
        while (true) {
            if (first1.equals(last1))
                return std.copy(first2, last2, result);
            else if (first2.equals(last2))
                return std.copy(first1, last1, result);
            if (compare(first1.value, first2.value)) {
                result.value = first1.value;
                result = result.next();
                first1 = first1.next();
            }
            else if (compare(first2.value, first1.value)) {
                result.value = first2.value;
                result = result.next();
                first2 = first2.next();
            }
            else {
                first1 = first1.next();
                first2 = first2.next();
            }
        }
    }
    std.set_symmetric_difference = set_symmetric_difference;
})(std || (std = {}));
var std;
(function (std) {
    /* =========================================================
        MATHMATICS
            - MIN & MAX
            - PERMUTATION
    ============================================================
        MIN & MAX
    --------------------------------------------------------- */
    /**
     * <p> Return the smallest. </p>
     *
     * <p> Returns the smallest of all the elements in the <i>args</i>. </p>
     *
     * @param args Values to compare.
     *
     * @return The lesser of the values passed as arguments.
     */
    function min() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var minimum = args[0];
        for (var i = 1; i < args.length; i++)
            if (std.less(args[i], minimum))
                minimum = args[i];
        return minimum;
    }
    std.min = min;
    /**
     * <p> Return the largest. </p>
     *
     * <p> Returns the largest of all the elements in the <i>args</i>. </p>
     *
     * @param args Values to compare.
     *
     * @return The largest of the values passed as arguments.
     */
    function max() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var maximum = args[0];
        for (var i = 1; i < args.length; i++)
            if (std.greater(args[i], maximum))
                maximum = args[i];
        return maximum;
    }
    std.max = max;
    /**
     * <p> Return smallest and largest elements. </p>
     *
     * <p> Returns a {@link Pair} with the smallest of all the elements in the <i>args</i> as first element (the first of
     * them, if there are more than one), and the largest as second (the last of them, if there are more than one). </p>
     *
     * @param args Values to compare.
     *
     * @return The lesser and greatest of the values passed as arguments.
     */
    function minmax() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        var minimum = args[0];
        var maximum = args[0];
        for (var i = 1; i < args.length; i++) {
            if (std.less(args[i], minimum))
                minimum = args[i];
            if (std.greater(args[i], maximum))
                maximum = args[i];
        }
        return std.make_pair(minimum, maximum);
    }
    std.minmax = minmax;
    function min_element(first, last, compare) {
        if (compare === void 0) { compare = std.less; }
        var smallest = first;
        first = first.next();
        for (; !first.equals(last); first = first.next())
            if (compare(first.value, smallest.value))
                smallest = first;
        return smallest;
    }
    std.min_element = min_element;
    function max_element(first, last, compare) {
        if (compare === void 0) { compare = std.greater; }
        var largest = first;
        first = first.next();
        for (; !first.equals(last); first = first.next())
            if (compare(first.value, largest.value))
                largest = first;
        return largest;
    }
    std.max_element = max_element;
    function minmax_element(first, last, compare) {
        if (compare === void 0) { compare = std.greater; }
        var smallest = first;
        var largest = first;
        first = first.next();
        for (; !first.equals(last); first = first.next()) {
            if (compare(first.value, smallest.value))
                smallest = first;
            if (!compare(first.value, largest.value))
                largest = first;
        }
        return std.make_pair(smallest, largest);
    }
    std.minmax_element = minmax_element;
    function is_permutation(first1, last1, first2, pred) {
        if (pred === void 0) { pred = std.equal_to; }
        // find the mismatched
        var pair = std.mismatch(first1, last1, first2);
        first1 = pair.first;
        first2 = pair.second;
        if (first1.equals(last1))
            return true;
        var last2 = first2.advance(std.distance(first1, last1));
        for (var it = first1; !it.equals(last1); it = it.next())
            if (std.find(first1, it, it.value).equals(it)) {
                var n = std.count(first2, last2, it.value);
                if (n == 0 || std.count(it, last1, it.value) != n)
                    return false;
            }
        return true;
    }
    std.is_permutation = is_permutation;
    function prev_permutation(first, last, compare) {
        if (compare === void 0) { compare = std.less; }
        if (first.equals(last) == true)
            return false;
        var i = last.prev();
        if (first.equals(i) == true)
            return false;
        while (true) {
            var x = i;
            var y = void 0;
            i = i.prev();
            if (compare(x.value, i.value) == true) {
                y = last.prev();
                while (compare(y.value, i.value) == false)
                    y = y.prev();
                std.iter_swap(i, y);
                std.reverse(x, last);
                return true;
            }
            if (i.equals(first) == true) {
                std.reverse(first, last);
                return false;
            }
        }
    }
    std.prev_permutation = prev_permutation;
    function next_permutation(first, last, compare) {
        if (compare === void 0) { compare = std.less; }
        if (first.equals(last) == true)
            return false;
        var i = last.prev();
        if (first.equals(i) == true)
            return false;
        while (true) {
            var x = i;
            var y = void 0;
            i = i.prev();
            if (compare(i.value, x.value) == true) {
                y = last.prev();
                while (compare(i.value, y.value) == false)
                    y = y.prev();
                std.iter_swap(i, y);
                std.reverse(x, last);
                return true;
            }
            if (i.equals(first) == true) {
                std.reverse(first, last);
                return false;
            }
        }
    }
    std.next_permutation = next_permutation;
})(std || (std = {}));
/// <reference path="../API.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
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
            Color[Color.BLACK = 0] = "BLACK";
            /**
             * <p> Code of color red. </p>
             */
            Color[Color.RED = 1] = "RED";
        })(base.Color || (base.Color = {}));
        var Color = base.Color;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        /**
         * <p> An abstract container. </p>
         *
         * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/abstract_containers.png" target="_blank">
         * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/abstract_containers.png" style="max-width: 100%" />
         * </a> </p>
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
        var Container = (function () {
            /* =========================================================
                CONSTRUCTORS & SEMI-CONSTRUCTORS
                    - CONSTRUCTORS
                    - ASSIGN & CLEAR
            ============================================================
                CONSTURCTORS
            --------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function Container() {
                // THIS IS ABSTRACT CLASS
                // NOTHING TO DO ESPECIALLY
            }
            /**
             * @inheritdoc
             */
            Container.prototype.clear = function () {
                this.erase(this.begin(), this.end());
            };
            /**
             * @inheritdoc
             */
            Container.prototype.empty = function () {
                return this.size() == 0;
            };
            /* ---------------------------------------------------------------
                UTILITIES
            --------------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            Container.prototype.swap = function (obj) {
                var supplement = new std.Vector(this.begin(), this.end());
                this.assign(obj.begin(), obj.end());
                obj.assign(supplement.begin(), supplement.end());
            };
            return Container;
        }());
        base.Container = Container;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
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
         * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/exceptions.png" target="_blank">
         * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var ErrorInstance = (function () {
            function ErrorInstance(val, category) {
                if (val === void 0) { val = 0; }
                if (category === void 0) { category = null; }
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
            ErrorInstance.prototype.assign = function (val, category) {
                this.category_ = category;
                this.value_ = val;
            };
            /**
             * <p> Clear error instance. </p>
             *
             * <p> Clears the value in the {@link ErrorCode} object so that it is set to a value of <i>0</i> of the
             * {@link ErrorCategory.systemCategory ErrorCategory.systemCategory()} (indicating no error). </p>
             */
            ErrorInstance.prototype.clear = function () {
                this.value_ = 0;
            };
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
            ErrorInstance.prototype.category = function () {
                return this.category_;
            };
            /**
             * <p> Error value. </p>
             *
             * <p> Returns the error value associated with the {@link ErrorCode} object. </p>
             *
             * @return The error value.
             */
            ErrorInstance.prototype.value = function () {
                return this.value_;
            };
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
            ErrorInstance.prototype.message = function () {
                if (this.category_ == null || this.value_ == 0)
                    return "";
                else
                    return this.category_.message(this.value_);
            };
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
            ErrorInstance.prototype.default_error_condition = function () {
                if (this.category_ == null || this.value_ == 0)
                    return null;
                else
                    return this.category_.default_error_condition(this.value_);
            };
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
            ErrorInstance.prototype.to_bool = function () {
                return this.value_ != 0;
            };
            return ErrorInstance;
        }());
        base.ErrorInstance = ErrorInstance;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        (function (Hash) {
            Hash[Hash.MIN_SIZE = 10] = "MIN_SIZE";
            Hash[Hash.RATIO = 1] = "RATIO";
            Hash[Hash.MAX_RATIO = 2] = "MAX_RATIO";
        })(base.Hash || (base.Hash = {}));
        var Hash = base.Hash;
        /**
         * <p> Hask buckets. </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var HashBuckets = (function () {
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function HashBuckets() {
                this.clear();
            }
            /**
             * <p> Reconstruction of hash table. </p>
             *
             * <p> All the elements in the hash buckets are rearranged according to their hash value into the new set of
             * buckets. This may alter the order of iteration of elements within the container. </p>
             *
             * <p> Notice that {@link rehash rehashes} are automatically performed whenever its number of elements is going
             * to greater than its own {@link capacity}. </p>
             *
             * @param size Number of bucket size to rehash.
             */
            HashBuckets.prototype.rehash = function (size) {
                if (size < Hash.MIN_SIZE)
                    size = Hash.MIN_SIZE;
                var prev_matrix = this.buckets_;
                this.buckets_ = new std.Vector();
                for (var i = 0; i < size; i++)
                    this.buckets_.push_back(new std.Vector());
                for (var i = 0; i < prev_matrix.size(); i++)
                    for (var j = 0; j < prev_matrix.at(i).size(); j++) {
                        var val = prev_matrix.at(i).at(j);
                        var bucket = this.buckets_.at(this.hash_index(val));
                        bucket.push_back(val);
                        this.item_size_++;
                    }
            };
            HashBuckets.prototype.clear = function () {
                this.buckets_ = new std.Vector();
                this.item_size_ = 0;
                for (var i = 0; i < Hash.MIN_SIZE; i++)
                    this.buckets_.push_back(new std.Vector());
            };
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            HashBuckets.prototype.size = function () {
                return this.buckets_.size();
            };
            HashBuckets.prototype.item_size = function () {
                return this.item_size_;
            };
            HashBuckets.prototype.capacity = function () {
                return this.buckets_.size() * Hash.MAX_RATIO;
            };
            HashBuckets.prototype.at = function (index) {
                return this.buckets_.at(index);
            };
            HashBuckets.prototype.hash_index = function (val) {
                return std.hash(val) % this.buckets_.size();
            };
            /* ---------------------------------------------------------
                ELEMENTS I/O
            --------------------------------------------------------- */
            HashBuckets.prototype.insert = function (val) {
                this.buckets_.at(this.hash_index(val)).push_back(val);
                if (++this.item_size_ > this.capacity())
                    this.rehash(this.item_size_ * Hash.RATIO);
            };
            HashBuckets.prototype.erase = function (val) {
                var bucket = this.buckets_.at(this.hash_index(val));
                for (var i = 0; i < bucket.size(); i++)
                    if (bucket.at(i) == val) {
                        bucket.splice(i, 1);
                        this.item_size_--;
                        break;
                    }
            };
            return HashBuckets;
        }());
        base.HashBuckets = HashBuckets;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="HashBuckets.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        /**
         * <p> Hash buckets storing {@link MapIterator MapIterators}. </p>
         *
         * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" target="_blank">
         * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /> </a>
         * </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var MapHashBuckets = (function (_super) {
            __extends(MapHashBuckets, _super);
            function MapHashBuckets(map) {
                _super.call(this);
                this.map = map;
            }
            MapHashBuckets.prototype.find = function (key) {
                var index = std.hash(key) % this.size();
                var bucket = this.at(index);
                for (var i = 0; i < bucket.size(); i++)
                    if (std.equal_to(bucket.at(i).first, key))
                        return bucket.at(i);
                return this.map.end();
            };
            return MapHashBuckets;
        }(base.HashBuckets));
        base.MapHashBuckets = MapHashBuckets;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="HashBuckets.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        /**
         * <p> Hash buckets storing {@link SetIterator SetIterators}. </p>
         *
         * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/set_containers.png" target="_blank">
         * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/set_containers.png" style="max-width: 100%" /> </a>
         * </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var SetHashBuckets = (function (_super) {
            __extends(SetHashBuckets, _super);
            function SetHashBuckets(set) {
                _super.call(this);
                this.set = set;
            }
            SetHashBuckets.prototype.find = function (val) {
                var index = std.hash(val) % this.size();
                var bucket = this.at(index);
                for (var i = 0; i < bucket.size(); i++)
                    if (std.equal_to(bucket.at(i).value, val))
                        return bucket.at(i);
                return this.set.end();
            };
            return SetHashBuckets;
        }(base.HashBuckets));
        base.SetHashBuckets = SetHashBuckets;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="../API.ts" />
/// <reference path="../API.ts" />
/// <reference path="../API.ts" />
/// <reference path="API.ts" />
// Iterator definitions.
//
// @reference http://www.cplusplus.com/reference/iterator
// @author Jeongho Nam <http://samchon.org>
var std;
(function (std) {
    /**
     * <p> Bi-directional iterator. </p>
     *
     * <p> {@link Iterator Bidirectional iterators} are iterators that can be used to access the sequence of elements
     * in a range in both directions (towards the end and towards the beginning). </p>
     *
     * <p> All {@link IArrayIterator random-access iterators} are also valid {@link Iterrator bidirectional iterators}.
     * </p>
     *
     * <p> There is not a single type of {@link Iterator bidirectional iterator}: {@link IContainer Each container}
     * may define its own specific iterator type able to iterate through it and access its elements. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/abstract_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/abstract_containers.png" style="max-width: 100%" /></a>
     * </p>
     *
     * @reference http://www.cplusplus.com/reference/iterator/BidirectionalIterator
     * @author Jeongho Nam <http://samchon.org>
     */
    var Iterator = (function () {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from the source {@link IContainer container}.
         *
         * @param source The source container.
         */
        function Iterator(source) {
            this.source_ = source;
        }
        /**
         * Advances the {@link Iterator} by <i>n</i> element positions.
         *
         * @param n Number of element positions to advance.
         * @return An advanced iterator.
         */
        Iterator.prototype.advance = function (n) {
            var it = this;
            var i;
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
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * Get source
         */
        Iterator.prototype.get_source = function () {
            return this.source_;
        };
        /**
         * <p> Whether an iterator is equal with the iterator. </p>
         *
         * <p> Compare two iterators and returns whether they are equal or not. </p>
         *
         * <h4> Note </h4>
         * <p> Iterator's {@link equals equals()} only compare souce container and index number. </p>
         *
         * <p> Although elements in a pair, key and value are {@link std.equal_to equal_to}, if the source map or
         * index number is different, then the {@link equals equals()} will return false. If you want to
         * compare the elements of a pair, compare them directly by yourself. </p>
         *
         * @param obj An iterator to compare
         * @return Indicates whether equal or not.
         */
        Iterator.prototype.equals = function (obj) {
            return this.source_ == obj.source_;
        };
        Object.defineProperty(Iterator.prototype, "value", {
            /**
             * <p> Get value of the iterator is pointing. </p>
             *
             * @return A value of the iterator.
             */
            get: function () { } // TS2.0 New Feature
            ,
            enumerable: true,
            configurable: true
        });
        return Iterator;
    }());
    std.Iterator = Iterator;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> This class reverses the direction in which a bidirectional or random-access iterator iterates through a range.
     * </p>
     *
     * <p> A copy of the original iterator (the {@link Iterator base iterator}) is kept internally and used to reflect
     * the operations performed on the {@link ReverseIterator}: whenever the {@link ReverseIterator} is incremented, its
     * {@link Iterator base iterator} is decreased, and vice versa. A copy of the {@link Iterator base iterator} with the
     * current state can be obtained at any time by calling member {@link base}. </p>
     *
     * <p> Notice however that when an iterator is reversed, the reversed version does not point to the same element in
     * the range, but to <b>the one preceding it</b>. This is so, in order to arrange for the past-the-end element of a
     * range: An iterator pointing to a past-the-end element in a range, when reversed, is pointing to the last element
     * (not past it) of the range (this would be the first element of the reversed range). And if an iterator to the
     * first element in a range is reversed, the reversed iterator points to the element before the first element (this
     * would be the past-the-end element of the reversed range). </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/abstract_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/abstract_containers.png" style="max-width: 100%" /></a>
     * </p>
     *
     * @reference http://www.cplusplus.com/reference/iterator/reverse_iterator
     * @author Jeongho Nam <http://samchon.org>
     */
    var ReverseIterator = (function (_super) {
        __extends(ReverseIterator, _super);
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from base iterator.
         *
         * @param base A reference of the base iterator, which iterates in the opposite direction.
         */
        function ReverseIterator(base) {
            if (base == null)
                _super.call(this, null);
            else {
                _super.call(this, base.get_source());
                this.base_ = base.prev();
            }
        }
        /**
         * <p> Return base iterator. </p>
         *
         * <p> Return a reference of the base iteraotr. </p>
         *
         * <p> The base iterator is an iterator of the same type as the one used to construct the {@link ReverseIterator},
         * but pointing to the element next to the one the {@link ReverseIterator} is currently pointing to
         * (a {@link ReverseIterator} has always an offset of -1 with respect to its base iterator).
         *
         * @return A reference of the base iterator, which iterates in the opposite direction.
         */
        ReverseIterator.prototype.base = function () {
            return this.base_.next();
        };
        Object.defineProperty(ReverseIterator.prototype, "value", {
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * <p> Get value of the iterator is pointing. </p>
             *
             * @return A value of the reverse iterator.
             */
            get: function () {
                return this.base_.value;
            },
            enumerable: true,
            configurable: true
        });
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        ReverseIterator.prototype.prev = function () {
            return this._Create_neighbor(this.base().next());
        };
        /**
         * @inheritdoc
         */
        ReverseIterator.prototype.next = function () {
            return this._Create_neighbor(this.base().prev());
        };
        /**
         * @inheritdoc
         */
        ReverseIterator.prototype.advance = function (n) {
            return this._Create_neighbor(this.base().advance(-n));
        };
        /* ---------------------------------------------------------
            COMPARES
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        ReverseIterator.prototype.equals = function (obj) {
            return this.base_.equals(obj.base_);
        };
        /**
         * @inheritdoc
         */
        ReverseIterator.prototype.swap = function (obj) {
            this.base_.swap(obj.base_);
        };
        return ReverseIterator;
    }(std.Iterator));
    std.ReverseIterator = ReverseIterator;
    /* =========================================================
        GLOBAL FUNCTIONS
            - MOVERS
            - BEGIN
            - END
    ============================================================
        MOVERS
    --------------------------------------------------------- */
    /**
     * <p> Return distance between {@link Iterator iterators}. </p>
     *
     * <p> Calculates the number of elements between <i>first</i> and <i>last</i>. </p>
     *
     * <p> If it is a {@link IArrayIterator random-access iterator}, the function uses operator- to calculate this.
     * Otherwise, the function uses the increase operator {@link Iterator.next next()} repeatedly. </p>
     *
     * @param first Iterator pointing to the initial element.
     * @param last Iterator pointing to the final element. This must be reachable from first.
     *
     * @return The number of elements between first and last.
     */
    function distance(first, last) {
        if (first.index != undefined) {
            // WHEN IARRAY_ITERATOR
            // ABS FOR REVERSE_ITERATOR
            return Math.abs(last.index - first.index);
        }
        var length = 0;
        for (; !first.equals(last); first = first.next())
            length++;
        return length;
    }
    std.distance = distance;
    /**
     * <p> Advance iterator. </p>
     *
     * <p> Advances the iterator <i>it</i> by <i>n</i> elements positions. </p>
     *
     * @param it Iterator to be advanced.
     * @param n Number of element positions to advance.
     *
     * @return An iterator to the element <i>n</i> positions before <i>it</i>.
     */
    function advance(it, n) {
        return it.advance(n);
    }
    std.advance = advance;
    /**
     * <p> Get iterator to previous element. </p>
     *
     * <p> Returns an iterator pointing to the element that <i>it</i> would be pointing to if advanced <i>-n</i> positions. </p>
     *
     * @param it Iterator to base position.
     * @param n Number of element positions offset (1 by default).
     *
     * @return An iterator to the element <i>n</i> positions before <i>it</i>.
     */
    function prev(it, n) {
        if (n === void 0) { n = 1; }
        return it.advance(n);
    }
    std.prev = prev;
    /**
     * <p> Get iterator to next element. </p>
     *
     * <p> Returns an iterator pointing to the element that <i>it</i> would be pointing to if advanced <i>n</i> positions. </p>
     *
     * @param it Iterator to base position.
     * @param n Number of element positions offset (1 by default).
     *
     * @return An iterator to the element <i>n</i> positions away from <i>it</i>.
     */
    function next(it, n) {
        if (n === void 0) { n = 1; }
        return it.advance(n);
    }
    std.next = next;
    // typedef is not specified in TypeScript yet.
    // Instead, I listed all the containers and its iterators as overloaded functions
    function begin(container) {
        return container.begin();
    }
    std.begin = begin;
    // typedef is not specified in TypeScript yet.
    // Instead, I listed all the containers and its iterators as overloaded functions
    function end(container) {
        return container.end();
    }
    std.end = end;
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="Container.ts" />
/// <reference path="../Iterator.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        /**
         * An abstract list.
         *
         * <p> {@link ListContainer}s are sequence containers that allow constant time insert and erase operations anywhere
         * within the sequence, and iteration in both directions. </p>
         *
         * <p> List containers are implemented as doubly-linked lists; Doubly linked lists can store each of the elements they
         * contain in different and unrelated storage locations. The ordering is kept internally by the association to each
         * element of a link to the element preceding it and a link to the element following it. </p>
         *
         * <p> Compared to other base standard sequence containers (array, vector and deque), lists perform generally better
         * in inserting, extracting and moving elements in any position within the container for which an iterator has already
         * been obtained, and therefore also in algorithms that make intensive use of these, like sorting algorithms. </p>
         *
         * <p> The main drawback of lists and forward_lists compared to these other sequence containers is that they lack
         * direct access to the elements by their position; For example, to access the sixth element in a list, one has to
         * iterate from a known position (like the beginning or the end) to that position, which takes linear time in the
         * distance between these. They also consume some extra memory to keep the linking information associated to each
         * element (which may be an important factor for large lists of small-sized elements). </p>
         *
         * <h3> Container properties </h3>
         * <dl>
         * 	<dt> Sequence </dt>
         * 	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are accessed by
         *		 their position in this sequence. </dd>
         *
         * 	<dt> Doubly-linked list </dt>
         *	<dd> Each element keeps information on how to locate the next and the previous elements, allowing constant time
         *		 insert and erase operations before or after a specific element (even of entire ranges), but no direct random
         *		 access. </dd>
         * </dl>
         *
         * @param <T> Type of the elements.
         *
         * @reference http://www.cplusplus.com/reference/list/list/
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var ListContainer = (function (_super) {
            __extends(ListContainer, _super);
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function ListContainer() {
                _super.call(this);
                // INIT MEMBERS
                this.end_ = this._Create_iterator(null, null, null);
                this.end_.prev_ = this.end_;
                this.end_.next_ = this.end_;
                this._Set_begin(this.end_);
                this.size_ = 0;
            }
            /**
             * @hidden
             */
            ListContainer.prototype._Set_begin = function (it) {
                this.begin_ = it;
            };
            /**
             * @inheritdoc
             */
            ListContainer.prototype.assign = function (first, last) {
                this.clear();
                this.insert(this.end(), first, last);
            };
            /**
             * @inheritdoc
             */
            ListContainer.prototype.clear = function () {
                // DISCONNECT NODES
                this._Set_begin(this.end_);
                this.end_.prev_ = (this.end_);
                this.end_.next_ = (this.end_);
                // RE-SIZE -> 0
                this.size_ = 0;
            };
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            ListContainer.prototype.begin = function () {
                return this.begin_;
            };
            /**
             * @inheritdoc
             */
            ListContainer.prototype.end = function () {
                return this.end_;
            };
            /**
             * @inheritdoc
             */
            ListContainer.prototype.size = function () {
                return this.size_;
            };
            /**
             * @inheritdoc
             */
            ListContainer.prototype.front = function () {
                return this.begin_.value;
            };
            /**
             * @inheritdoc
             */
            ListContainer.prototype.back = function () {
                return this.end_.prev().value;
            };
            /* =========================================================
                ELEMENTS I/O
                    - PUSH & POP
                    - INSERT
                    - ERASE
                    - POST-PROCESS
            ============================================================
                PUSH & POP
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            ListContainer.prototype.push_front = function (val) {
                this.insert(this.begin_, val);
            };
            /**
             * @inheritdoc
             */
            ListContainer.prototype.push_back = function (val) {
                this.insert(this.end_, val);
            };
            /**
             * @inheritdoc
             */
            ListContainer.prototype.pop_front = function () {
                this.erase(this.begin_);
            };
            /**
             * @inheritdoc
             */
            ListContainer.prototype.pop_back = function () {
                this.erase(this.end_.prev());
            };
            /* ---------------------------------------------------------
                INSERT
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            ListContainer.prototype.push = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i - 0] = arguments[_i];
                }
                var prev = this.end().prev();
                var first = null;
                for (var i = 0; i < items.length; i++) {
                    // CONSTRUCT ITEM, THE NEW ELEMENT
                    var item = this._Create_iterator(prev, null, items[i]);
                    if (i == 0)
                        first = item;
                    prev.next_ = (item);
                    prev = item;
                }
                // IF WAS EMPTY, VAL IS THE BEGIN
                if (this.empty() == true || first.prev().equals(this.end()) == true)
                    this._Set_begin(first);
                // CONNECT BETWEEN LAST INSERTED ITEM AND POSITION
                prev.next_ = (this.end_);
                this.end_.prev_ = (prev);
                this.size_ += items.length;
                return this.size();
            };
            ListContainer.prototype.insert = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var ret;
                // BRANCHES
                if (args.length == 2)
                    ret = this.insert_by_val(args[0], args[1]);
                else if (args.length == 3 && typeof args[1] == "number")
                    ret = this._Insert_by_repeating_val(args[0], args[1], args[2]);
                else
                    ret = this._Insert_by_range(args[0], args[1], args[2]);
                // RETURNS
                return ret;
            };
            /**
             * @hidden
             */
            ListContainer.prototype.insert_by_val = function (position, val) {
                // SHIFT TO INSERT OF THE REPEATING VAL
                return this._Insert_by_repeating_val(position, 1, val);
            };
            /**
             * @hidden
             */
            ListContainer.prototype._Insert_by_repeating_val = function (position, size, val) {
                // INVALID ITERATOR
                if (this != position.source_)
                    throw new std.InvalidArgument("Parametric iterator is not this container's own.");
                var prev = position.prev();
                var first = null;
                for (var i = 0; i < size; i++) {
                    // CONSTRUCT ITEM, THE NEW ELEMENT
                    var item = this._Create_iterator(prev, null, val);
                    if (i == 0)
                        first = item;
                    prev.next_ = (item);
                    // SHIFT ITEM LEFT TO BE PREV
                    prev = item;
                }
                // IF WAS EMPTY, VAL IS THE BEGIN
                if (this.empty() == true || first.prev().equals(this.end()) == true)
                    this._Set_begin(first);
                // CONNECT BETWEEN LAST INSERTED ITEM AND POSITION
                prev.next_ = (position);
                position.prev_ = (prev);
                this.size_ += size;
                return first;
            };
            /**
             * @hidden
             */
            ListContainer.prototype._Insert_by_range = function (position, begin, end) {
                // INVALID ITERATOR
                if (this != position.source_)
                    throw new std.InvalidArgument("Parametric iterator is not this container's own.");
                var prev = position.prev();
                var first = null;
                var size = 0;
                for (var it = begin; it.equals(end) == false; it = it.next()) {
                    // CONSTRUCT ITEM, THE NEW ELEMENT
                    var item = this._Create_iterator(prev, null, it.value);
                    if (size == 0)
                        first = item;
                    if (prev != null)
                        prev.next_ = (item);
                    // SHIFT CURRENT ITEM TO PREVIOUS
                    prev = item;
                    size++;
                }
                // IF WAS EMPTY, FIRST ELEMENT IS THE BEGIN
                if (this.empty() == true)
                    this._Set_begin(first);
                // CONNECT BETWEEN LAST AND POSITION
                prev.next_ = (position);
                position.prev_ = (prev);
                this.size_ += size;
                return first;
            };
            ListContainer.prototype.erase = function (first, last) {
                if (last === void 0) { last = first.next(); }
                return this._Erase_by_range(first, last);
            };
            /**
             * @hidden
             */
            ListContainer.prototype._Erase_by_range = function (first, last) {
                // FIND PREV AND NEXT
                var prev = first.prev();
                // CALCULATE THE SIZE
                var size = std.distance(first, last);
                // SHRINK
                prev.next_ = (last);
                last.prev_ = (prev);
                this.size_ -= size;
                if (first == this.begin_)
                    this._Set_begin(last);
                return last;
            };
            ListContainer.prototype.swap = function (obj) {
                if (obj instanceof ListContainer) {
                    _a = [obj.begin_, this.begin_], this.begin_ = _a[0], obj.begin_ = _a[1];
                    _b = [obj.end_, this.end_], this.end_ = _b[0], obj.end_ = _b[1];
                    _c = [obj.size_, this.size_], this.size_ = _c[0], obj.size_ = _c[1];
                }
                else
                    _super.prototype.swap.call(this, obj);
                var _a, _b, _c;
            };
            return ListContainer;
        }(base.Container));
        base.ListContainer = ListContainer;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        /**
         * An iterator, node of a List-based container.
         *
         * <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank">
         *	<img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" />
         * </a>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var ListIteratorBase = (function (_super) {
            __extends(ListIteratorBase, _super);
            /**
             * Initializer Constructor.
             *
             * @param source The source {@link Container} to reference.
             * @param prev A refenrece of previous node ({@link ListIterator iterator}).
             * @param next A refenrece of next node ({@link ListIterator iterator}).
             * @param value Value to be stored in the node (iterator).
             */
            function ListIteratorBase(source, prev, next, value) {
                _super.call(this, source);
                this.prev_ = prev;
                this.next_ = next;
                this.value_ = value;
            }
            /* ---------------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            ListIteratorBase.prototype.prev = function () {
                return this.prev_;
            };
            /**
             * @inheritdoc
             */
            ListIteratorBase.prototype.next = function () {
                return this.next_;
            };
            /**
             * @inheritdoc
             */
            ListIteratorBase.prototype.advance = function (step) {
                var it = this;
                if (step >= 0) {
                    for (var i = 0; i < step; i++) {
                        it = it.next();
                        if (it.equals(this.source_.end()))
                            return it;
                    }
                }
                else {
                    for (var i = 0; i < step; i++) {
                        it = it.prev();
                        if (it.equals(this.source_.end()))
                            return it;
                    }
                }
                return it;
            };
            Object.defineProperty(ListIteratorBase.prototype, "value", {
                /**
                 * @inheritdoc
                 */
                get: function () {
                    return this.value_;
                },
                enumerable: true,
                configurable: true
            });
            /* ---------------------------------------------------------------
                COMPARISON
            --------------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            ListIteratorBase.prototype.equals = function (obj) {
                return this == obj;
            };
            /**
             * @inheritdoc
             */
            ListIteratorBase.prototype.swap = function (obj) {
                var source = this.source_;
                var supp_prev = this.prev_;
                var supp_next = this.next_;
                this.prev_ = obj.prev_;
                this.next_ = obj.next_;
                obj.prev_ = supp_prev;
                obj.next_ = supp_next;
                if (source.end() == this)
                    source.end_ = obj;
                else if (source.end() == obj)
                    source.end_ = this;
                if (source.begin() == this)
                    source.begin_ = obj;
                else if (source.begin() == obj)
                    source.begin_ = this;
            };
            return ListIteratorBase;
        }(std.Iterator));
        base.ListIteratorBase = ListIteratorBase;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="ListContainer.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
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
         * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram" target="_blank">
         * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram" style="max-width: 100%" /></a> </p>
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
        var MapContainer = (function (_super) {
            __extends(MapContainer, _super);
            /* ---------------------------------------------------------
                CONSTURCTORS
            --------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function MapContainer() {
                _super.call(this);
                this.data_ = new MapElementList(this);
            }
            /**
             * @inheritdoc
             */
            MapContainer.prototype.assign = function (first, last) {
                // INSERT
                this.clear();
                this.insert(first, last);
            };
            /**
             * @inheritdoc
             */
            MapContainer.prototype.clear = function () {
                // TO BE ABSTRACT
                this.data_.clear();
            };
            /**
             * <p> Return iterator to beginning. </p>
             *
             * <p> Returns an iterator referring the first element in the  </p>
             *
             * <h4> Note </h4>
             * <p> If the container is {@link empty}, the returned iterator is same with {@link end end()}. </p>
             *
             * @return An iterator to the first element in the  The iterator containes the first element's value.
             */
            MapContainer.prototype.begin = function () {
                return this.data_.begin();
            };
            /**
             * <p> Return iterator to end. </p>
             * <p> Returns an iterator referring to the past-the-end element in the  </p>
             *
             * <p> The past-the-end element is the theoretical element that would follow the last element in the
             *  It does not point to any element, and thus shall not be dereferenced. </p>
             *
             * <p> Because the ranges used by functions of the container do not include the element reference by their
             * closing iterator, this function is often used in combination with {@link MapContainer}.{@link begin} to
             * specify a range including all the elements in the  </p>
             *
             * <h4> Note </h4>
             * <p> Returned iterator from {@link MapContainer}.{@link end} does not refer any element. Trying to accessing
             * element by the iterator will cause throwing exception ({@link OutOfRange}). </p>
             *
             * <p> If the container is {@link empty}, this function returns the same as {@link begin}. </p>
             *
             * @return An iterator to the end element in the
             */
            MapContainer.prototype.end = function () {
                return this.data_.end();
            };
            /**
             * <p> Return {@link MapReverseIterator reverse iterator} to <i>reverse beginning</i>. </p>
             *
             * <p> Returns a {@link MapReverseIterator reverse iterator} pointing to the last element in the container
             * (i.e., its <i>reverse beginning</i>). </p>
             *
             * {@link MapReverseIterator Reverse iterators} iterate backwards: increasing them moves them towards the
             * beginning of the container. </p>
             *
             * <p> {@link rbegin} points to the element preceding the one that would be pointed to by member {@link end}.
             * </p>7
             *
             * @return A {@link MapReverseIterator reverse iterator} to the <i>reverse beginning</i> of the sequence
             *
             */
            MapContainer.prototype.rbegin = function () {
                return this.data_.rbegin();
            };
            /**
             * <p> Return {@link MapReverseIterator reverse iterator} to <i>reverse end</i>. </p>
             *
             * <p> Returns a {@link MapReverseIterator reverse iterator} pointing to the theoretical element right before
             * the first element in the {@link MapContainer map container} (which is considered its <i>reverse end</i>).
             * </p>
             *
             * <p> The range between {@link MapContainer}.{@link rbegin} and {@link MapContainer}.{@link rend} contains
             * all the elements of the container (in reverse order). </p>
             *
             * @return A {@link MapReverseIterator reverse iterator} to the <i>reverse end</i> of the sequence
             */
            MapContainer.prototype.rend = function () {
                return this.data_.rend();
            };
            /* ---------------------------------------------------------
                ELEMENTS
            --------------------------------------------------------- */
            /**
             * <p> Whether have the item or not. </p>
             *
             * <p> Indicates whether a map has an item having the specified identifier. </p>
             *
             * @param key Key value of the element whose mapped value is accessed.
             *
             * @return Whether the map has an item having the specified identifier.
             */
            MapContainer.prototype.has = function (key) {
                return !this.find(key).equals(this.end());
            };
            /**
             * Return the number of elements in the map.
             */
            MapContainer.prototype.size = function () {
                return this.data_.size();
            };
            MapContainer.prototype.push = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                // TO BE ABSTRACT
                for (var i = 0; i < args.length; i++)
                    if (args[i] instanceof std.Pair)
                        this._Insert_by_pair(args[i]);
                    else if (args[i] instanceof Array)
                        this.insert_by_tuple(args[i]);
                return this.size();
            };
            MapContainer.prototype.emplace_hint = function (hint) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (args.length == 1)
                    return this.insert(hint, args[0]);
                else
                    return this.insert(hint, std.make_pair(args[0], args[1]));
            };
            MapContainer.prototype.insert = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (args.length == 1 && args[0] instanceof std.Pair) {
                    return this._Insert_by_pair(args[0]);
                }
                else if (args.length == 1 && args[0] instanceof Array) {
                    return this.insert_by_tuple(args[0]);
                }
                else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                    return this._Insert_by_range(args[0], args[1]);
                }
                else {
                    var ret = void 0;
                    var is_reverse_iterator = false;
                    // REVERSE_ITERATOR TO ITERATOR
                    if (args[0] instanceof std.MapReverseIterator) {
                        is_reverse_iterator = true;
                        args[0] = args[0].base().prev();
                    }
                    // INSERT AN ELEMENT
                    if (args[1] instanceof std.Pair)
                        ret = this._Insert_by_hint(args[0], args[1]);
                    else
                        ret = this.insert_by_hint_with_tuple(args[0], args[1]);
                    // RETURN BRANCHES
                    if (is_reverse_iterator == true)
                        return new std.MapReverseIterator(ret.next());
                    else
                        return ret;
                }
            };
            /**
             * @hidden
             */
            MapContainer.prototype.insert_by_tuple = function (tuple) {
                return this._Insert_by_pair(new std.Pair(tuple[0], tuple[1]));
            };
            /**
             * @hidden
             */
            MapContainer.prototype.insert_by_hint_with_tuple = function (hint, tuple) {
                return this._Insert_by_hint(hint, std.make_pair(tuple[0], tuple[1]));
            };
            MapContainer.prototype.erase = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (args.length == 1 && (args[0] instanceof std.Iterator == false || args[0].get_source() != this))
                    return this.erase_by_key(args[0]);
                else if (args.length == 1)
                    return this.erase_by_iterator(args[0]);
                else
                    return this.erase_by_iterator(args[0], args[1]);
            };
            /**
             * @hidden
             */
            MapContainer.prototype.erase_by_key = function (key) {
                var it = this.find(key);
                if (it.equals(this.end()) == true)
                    return 0;
                this.erase_by_iterator(it);
                return 1;
            };
            /**
             * @hidden
             */
            MapContainer.prototype.erase_by_iterator = function (first, last) {
                if (last === void 0) { last = first.next(); }
                var ret;
                var is_reverse_iterator = false;
                // REVERSE ITERATOR TO ITERATOR
                if (first instanceof std.MapReverseIterator) {
                    is_reverse_iterator = true;
                    var first_it = last.base();
                    var last_it = first.base();
                    first = first_it;
                    last = last_it;
                }
                // ERASE ELEMENTS
                ret = this.erase_by_range(first, last);
                // RETURN BRANCHES
                if (is_reverse_iterator == true)
                    return new std.MapReverseIterator(ret.next());
                else
                    return ret;
            };
            /**
             * @hidden
             */
            MapContainer.prototype.erase_by_range = function (first, last) {
                // ERASE
                var it = this.data_.erase(first, last);
                // POST-PROCESS
                this._Handle_erase(first, last);
                return it;
            };
            /* ---------------------------------------------------------
                UTILITY
            --------------------------------------------------------- */
            /**
             * @hidden
             */
            MapContainer.prototype._Swap = function (obj) {
                _a = [obj.data_, this.data_], this.data_ = _a[0], obj.data_ = _a[1];
                var _a;
            };
            return MapContainer;
        }(base.Container));
        base.MapContainer = MapContainer;
        /**
         * @hidden
         */
        var MapElementList = (function (_super) {
            __extends(MapElementList, _super);
            function MapElementList(associative) {
                _super.call(this);
                this.associative_ = associative;
            }
            MapElementList.prototype._Create_iterator = function (prev, next, val) {
                return new std.MapIterator(this, prev, next, val);
            };
            MapElementList.prototype._Set_begin = function (it) {
                _super.prototype._Set_begin.call(this, it);
                this.rend_ = new std.MapReverseIterator(it);
            };
            MapElementList.prototype.get_associative = function () {
                return this.associative_;
            };
            MapElementList.prototype.rbegin = function () {
                return new std.MapReverseIterator(this.end());
            };
            MapElementList.prototype.rend = function () {
                return this.rend_;
            };
            return MapElementList;
        }(base.ListContainer));
        base.MapElementList = MapElementList;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> An iterator of {@link MapContainer map container}. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram" style="max-width: 100%" /></a> </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var MapIterator = (function (_super) {
        __extends(MapIterator, _super);
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from the {@link MapContainer source map} and {@link ListIterator list iterator}.
         *
         * @param source The source {@link MapContainer}.
         * @param list_iterator A {@link ListIterator} pointing {@link Pair} of <i>key</i> and <i>value</i>.
         */
        function MapIterator(source, prev, next, val) {
            _super.call(this, source, prev, next, val);
        }
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * Get iterator to previous element.
         */
        MapIterator.prototype.prev = function () {
            return this.prev_;
        };
        /**
         * Get iterator to next element.
         */
        MapIterator.prototype.next = function () {
            return this.next_;
        };
        /**
         * Advances the Iterator by n element positions.
         *
         * @param step Number of element positions to advance.
         * @return An advanced Iterator.
         */
        MapIterator.prototype.advance = function (step) {
            return _super.prototype.advance.call(this, step);
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        MapIterator.prototype.get_source = function () {
            return _super.prototype.get_source.call(this).get_associative();
        };
        Object.defineProperty(MapIterator.prototype, "first", {
            /**
             * Get first, key element.
             */
            get: function () {
                return this.value.first;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapIterator.prototype, "second", {
            /**
             * Get second, value element.
             */
            get: function () {
                return this.value.second;
            },
            /**
             * Set second value.
             */
            set: function (val) {
                this.value.second = val;
            },
            enumerable: true,
            configurable: true
        });
        /* ---------------------------------------------------------
            COMPARISONS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        MapIterator.prototype.less = function (obj) {
            return std.less(this.first, obj.first);
        };
        /**
         * @inheritdoc
         */
        MapIterator.prototype.equals = function (obj) {
            return this == obj;
        };
        /**
         * @inheritdoc
         */
        MapIterator.prototype.hashCode = function () {
            return std.hash(this.first);
        };
        /**
         * @inheritdoc
         */
        MapIterator.prototype.swap = function (obj) {
            _super.prototype.swap.call(this, obj);
        };
        return MapIterator;
    }(std.base.ListIteratorBase));
    std.MapIterator = MapIterator;
    /**
     * <p> A reverse-iterator of {@link MapContainer map container}. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram" style="max-width: 100%" /></a> </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var MapReverseIterator = (function (_super) {
        __extends(MapReverseIterator, _super);
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from base iterator.
         *
         * @param base A reference of the base iterator, which iterates in the opposite direction.
         */
        function MapReverseIterator(base) {
            _super.call(this, base);
        }
        /**
         * @hidden
         */
        MapReverseIterator.prototype._Create_neighbor = function (base) {
            return new MapReverseIterator(base);
        };
        Object.defineProperty(MapReverseIterator.prototype, "first", {
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * Get first, key element.
             */
            get: function () {
                return this.base_.first;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapReverseIterator.prototype, "second", {
            /**
             * Get second, value element.
             */
            get: function () {
                return this.base_.second;
            },
            /**
             * Set second value.
             */
            set: function (val) {
                this.base_.second = val;
            },
            enumerable: true,
            configurable: true
        });
        return MapReverseIterator;
    }(std.ReverseIterator));
    std.MapReverseIterator = MapReverseIterator;
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="MapContainer.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
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
         * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" target="_blank">
         * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /></a> </p>
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
        var MultiMap = (function (_super) {
            __extends(MultiMap, _super);
            function MultiMap() {
                _super.apply(this, arguments);
            }
            MultiMap.prototype.emplace = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (args.length == 1)
                    return this._Insert_by_pair(args[0]);
                else
                    return this._Insert_by_pair(std.make_pair(args[0], args[1]));
            };
            MultiMap.prototype.insert = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return _super.prototype.insert.apply(this, args);
            };
            /* ---------------------------------------------------------
                UTILITY
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            MultiMap.prototype.merge = function (source) {
                this.insert(source.begin(), source.end());
                source.clear();
            };
            return MultiMap;
        }(base.MapContainer));
        base.MultiMap = MultiMap;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="ListContainer.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
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
         * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/set_containers.png" target="_blank">
         * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/set_containers.png" style="max-width: 100%" /></a> </p>
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
        var SetContainer = (function (_super) {
            __extends(SetContainer, _super);
            /* ---------------------------------------------------------
                CONSTURCTORS
            --------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function SetContainer() {
                _super.call(this);
                this.data_ = new SetElementList(this);
            }
            /**
             * @inheritdoc
             */
            SetContainer.prototype.assign = function (begin, end) {
                // INSERT
                this.clear();
                this.insert(begin, end);
            };
            /**
             * @inheritdoc
             */
            SetContainer.prototype.clear = function () {
                // TO BE ABSTRACT
                this.data_.clear();
            };
            /**
             * @inheritdoc
             */
            SetContainer.prototype.begin = function () {
                return this.data_.begin();
            };
            /**
             * @inheritdoc
             */
            SetContainer.prototype.end = function () {
                return this.data_.end();
            };
            /**
             * @inheritdoc
             */
            SetContainer.prototype.rbegin = function () {
                return this.data_.rbegin();
            };
            /**
             * @inheritdoc
             */
            SetContainer.prototype.rend = function () {
                return this.data_.rend();
            };
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
            SetContainer.prototype.has = function (val) {
                return !this.find(val).equals(this.end());
            };
            /**
             * @inheritdoc
             */
            SetContainer.prototype.size = function () {
                return this.data_.size();
            };
            ///**
            // * @hidden
            // */
            //protected _Get_data(): List<T>
            //{
            //	return this.data_;
            //}
            /* =========================================================
                ELEMENTS I/O
                    - INSERT
                    - ERASE
                    - UTILITY
                    - POST-PROCESS
            ============================================================
                INSERT
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            SetContainer.prototype.push = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                // TO BE ABSTRACT
                for (var i = 0; i < args.length; i++)
                    this._Insert_by_val(args[i]);
                return this.size();
            };
            SetContainer.prototype.insert = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (args.length == 1)
                    return this._Insert_by_val(args[0]);
                else if (args.length == 2 && args[0] instanceof std.Iterator) {
                    if (args[1] instanceof std.Iterator && args[0].get_source() != this && args[1].get_source() != this) {
                        // IT DOESN'T CONTAIN POSITION
                        // RANGES TO INSERT ONLY
                        return this._Insert_by_range(args[0], args[1]);
                    }
                    else {
                        var ret = void 0;
                        var is_reverse_iterator = false;
                        // REVERSE_ITERATOR TO ITERATOR
                        if (args[0] instanceof std.SetReverseIterator) {
                            is_reverse_iterator = true;
                            args[0] = args[0].base().prev();
                        }
                        // INSERT AN ELEMENT
                        ret = this._Insert_by_hint(args[0], args[1]);
                        // RETURN BRANCHES
                        if (is_reverse_iterator == true)
                            return new std.SetReverseIterator(ret.next());
                        else
                            return ret;
                    }
                }
            };
            SetContainer.prototype.erase = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (args.length == 1 && (args[0] instanceof std.Iterator == false || args[0].get_source() != this))
                    return this.erase_by_val(args[0]);
                else if (args.length == 1)
                    return this.erase_by_iterator(args[0]);
                else
                    return this.erase_by_iterator(args[0], args[1]);
            };
            /**
             * @hidden
             */
            SetContainer.prototype.erase_by_iterator = function (first, last) {
                if (last === void 0) { last = first.next(); }
                var ret;
                var is_reverse_iterator = false;
                // REVERSE ITERATOR TO ITERATOR
                if (first instanceof std.SetReverseIterator) {
                    is_reverse_iterator = true;
                    var first_it = last.base();
                    var last_it = first.base();
                    first = first_it;
                    last = last_it;
                }
                // ERASE ELEMENTS
                ret = this.erase_by_range(first, last);
                // RETURN BRANCHES
                if (is_reverse_iterator == true)
                    return new std.SetReverseIterator(ret.next());
                else
                    return ret;
            };
            /**
             * @hidden
             */
            SetContainer.prototype.erase_by_val = function (val) {
                // TEST WHETHER EXISTS
                var it = this.find(val);
                if (it.equals(this.end()) == true)
                    return 0;
                // ERASE
                this.erase_by_iterator(it);
                return 1;
            };
            /**
             * @hidden
             */
            SetContainer.prototype.erase_by_range = function (first, last) {
                // ERASE
                var it = this.data_.erase(first, last);
                // POST-PROCESS
                this._Handle_erase(first, last);
                return it;
            };
            /* ---------------------------------------------------------
                UTILITY
            --------------------------------------------------------- */
            /**
             * @hidden
             */
            SetContainer.prototype._Swap = function (obj) {
                _a = [obj.data_, this.data_], this.data_ = _a[0], obj.data_ = _a[1];
                var _a;
            };
            return SetContainer;
        }(base.Container));
        base.SetContainer = SetContainer;
        /**
         * @hidden
         */
        var SetElementList = (function (_super) {
            __extends(SetElementList, _super);
            function SetElementList(associative) {
                _super.call(this);
                this.associative_ = associative;
            }
            SetElementList.prototype._Create_iterator = function (prev, next, val) {
                return new std.SetIterator(this, prev, next, val);
            };
            SetElementList.prototype._Set_begin = function (it) {
                _super.prototype._Set_begin.call(this, it);
                this.rend_ = new std.SetReverseIterator(it);
            };
            SetElementList.prototype.get_associative = function () {
                return this.associative_;
            };
            SetElementList.prototype.rbegin = function () {
                return new std.SetReverseIterator(this.end());
            };
            SetElementList.prototype.rend = function () {
                return this.rend_;
            };
            return SetElementList;
        }(base.ListContainer));
        base.SetElementList = SetElementList;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> An iterator of a Set. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/set_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/set_containers.png" style="max-width: 100%" /></a> </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var SetIterator = (function (_super) {
        __extends(SetIterator, _super);
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
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
        function SetIterator(source, prev, next, val) {
            _super.call(this, source, prev, next, val);
        }
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        SetIterator.prototype.get_source = function () {
            return _super.prototype.get_source.call(this).get_associative();
        };
        /**
         * @inheritdoc
         */
        SetIterator.prototype.prev = function () {
            return this.prev_;
        };
        /**
         * @inheritdoc
         */
        SetIterator.prototype.next = function () {
            return this.next_;
        };
        /**
         * @inheritdoc
         */
        SetIterator.prototype.advance = function (size) {
            return _super.prototype.advance.call(this, size);
        };
        /* ---------------------------------------------------------
            COMPARISONS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        SetIterator.prototype.less = function (obj) {
            return std.less(this.value, obj.value);
        };
        /**
         * @inheritdoc
         */
        SetIterator.prototype.equals = function (obj) {
            return this == obj;
        };
        /**
         * @inheritdoc
         */
        SetIterator.prototype.hashCode = function () {
            return std.hash(this.value);
        };
        /**
         * @inheritdoc
         */
        SetIterator.prototype.swap = function (obj) {
            _super.prototype.swap.call(this, obj);
        };
        return SetIterator;
    }(std.base.ListIteratorBase));
    std.SetIterator = SetIterator;
    /**
     * <p> A reverse-iterator of Set. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/set_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/set_containers.png" style="max-width: 100%" /></a> </p>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var SetReverseIterator = (function (_super) {
        __extends(SetReverseIterator, _super);
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from base iterator.
         *
         * @param base A reference of the base iterator, which iterates in the opposite direction.
         */
        function SetReverseIterator(base) {
            _super.call(this, base);
        }
        /**
         * @hidden
         */
        SetReverseIterator.prototype._Create_neighbor = function (base) {
            return new SetReverseIterator(base);
        };
        return SetReverseIterator;
    }(std.ReverseIterator));
    std.SetReverseIterator = SetReverseIterator;
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="SetContainer.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
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
         * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/set_containers.png" target="_blank">
         * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/set_containers.png" style="max-width: 100%" /></a> </p>
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
        var MultiSet = (function (_super) {
            __extends(MultiSet, _super);
            function MultiSet() {
                _super.apply(this, arguments);
            }
            MultiSet.prototype.insert = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return _super.prototype.insert.apply(this, args);
            };
            /* ---------------------------------------------------------
                UTILITY
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            MultiSet.prototype.merge = function (source) {
                this.insert(source.begin(), source.end());
                source.clear();
            };
            return MultiSet;
        }(base.SetContainer));
        base.MultiSet = MultiSet;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
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
         * <p> <img src="http://samchon.github.io/typescript-stl/images/design/conceptual_diagram/Red-black_tree_example.svg"
         *			style="max-width: 100%" /> </p>
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
         * @param <T> Type of elements.
         *
         * @reference https://en.wikipedia.org/w/index.php?title=Red%E2%80%93black_tree
         * @inventor Rudolf Bayer
         * @author Migrated by Jeongho Nam <http://samchon.org>
         */
        var XTree = (function () {
            /* =========================================================
                CONSTRUCTOR
            ========================================================= */
            /**
             * Default Constructor.
             */
            function XTree() {
                this.root_ = null;
            }
            /**
             * Clear, removes all tree nodes.
             */
            XTree.prototype.clear = function () {
                this.root_ = null;
            };
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
            XTree.prototype.find = function (val) {
                if (this.root_ == null)
                    return null;
                var node = this.root_;
                while (true) {
                    var newNode = null;
                    if (this.is_equal_to(val, node.value))
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
            };
            /**
             * Fetch maximum (the rightes?) node from one.
             *
             * @param node A node to fetch its maximum node.
             * @return The maximum node.
             */
            XTree.prototype.fetch_maximum = function (node) {
                while (node.right != null)
                    node = node.right;
                return node;
            };
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
            XTree.prototype.insert = function (val) {
                var parent = this.find(val);
                var node = new base.XTreeNode(val, base.Color.RED);
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
            };
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
            XTree.prototype.insert_case1 = function (N) {
                if (N.parent == null)
                    N.color = base.Color.BLACK;
                else
                    this.insert_case2(N);
            };
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
            XTree.prototype.insert_case2 = function (N) {
                if (this.fetch_color(N.parent) == base.Color.BLACK)
                    return;
                else
                    this.insert_case3(N);
            };
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
             * <p> <img src="http://samchon.github.io/typescript-stl/images/design/conceptual_diagram/Red-black_tree_insert_case_3.svg"
                        style="max-width: 100%" /> </p>
             *
             * @param N A node to be inserted or swapped.
             */
            XTree.prototype.insert_case3 = function (N) {
                if (this.fetch_color(N.uncle) == base.Color.RED) {
                    N.parent.color = base.Color.BLACK;
                    N.uncle.color = base.Color.BLACK;
                    N.grand_parent.color = base.Color.RED;
                    this.insert_case1(N.grand_parent);
                }
                else {
                    this.insert_case4(N);
                }
            };
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
             * <p> <img src="http://samchon.github.io/typescript-stl/images/design/conceptual_diagram/Red-black_tree_insert_case_4.svg"
                        style="max-width: 100%" /> </p>
             *
             * @param N A node to be inserted or swapped.
             */
            XTree.prototype.insert_case4 = function (node) {
                if (node == node.parent.right && node.parent == node.grand_parent.left) {
                    this.rotate_left(node.parent);
                    node = node.left;
                }
                else if (node == node.parent.left && node.parent == node.grand_parent.right) {
                    this.rotate_right(node.parent);
                    node = node.right;
                }
                this.insert_case5(node);
            };
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
             * <p> <img src="http://samchon.github.io/typescript-stl/images/design/conceptual_diagram/Red-black_tree_insert_case_5.svg"
                        style="max-width: 100%" /> </p>
             *
             * @param N A node to be inserted or swapped.
             */
            XTree.prototype.insert_case5 = function (node) {
                node.parent.color = base.Color.BLACK;
                node.grand_parent.color = base.Color.RED;
                if (node == node.parent.left && node.parent == node.grand_parent.left)
                    this.rotate_right(node.grand_parent);
                else
                    this.rotate_left(node.grand_parent);
            };
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
            XTree.prototype.erase = function (val) {
                var node = this.find(val);
                if (node == null || this.is_equal_to(val, node.value) == false)
                    return;
                if (node.left != null && node.right != null) {
                    var pred = this.fetch_maximum(node.left);
                    node.value = pred.value;
                    node = pred;
                }
                var child = (node.right == null) ? node.left : node.right;
                if (this.fetch_color(node) == base.Color.BLACK) {
                    node.color = this.fetch_color(child);
                    this.erase_case1(node);
                }
                this.replace_node(node, child);
            };
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
            XTree.prototype.erase_case1 = function (N) {
                if (N.parent == null)
                    return;
                else
                    this.erase_case2(N);
            };
            /**
             * <p> {@link XTreeNode.sibling <b>S</b>} is <font color='red'>red</font>. </p>
             *
             * <p> <img src="http://samchon.github.io/typescript-stl/images/design/conceptual_diagram/Red-black_tree_delete_case_2.svg"
                        style="max-width: 100%" /> </p>
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
            XTree.prototype.erase_case2 = function (N) {
                if (this.fetch_color(N.sibling) == base.Color.RED) {
                    N.parent.color = base.Color.RED;
                    N.sibling.color = base.Color.BLACK;
                    if (N == N.parent.left)
                        this.rotate_left(N.parent);
                    else
                        this.rotate_right(N.parent);
                }
                this.erase_case3(N);
            };
            /**
             * <p> {@link XTreeNode.parent <b>P</b>}, {@link XTreeNode.sibling <b>S</b>}, and {@link XTreeNode.sibling
             * <b>S</b>}'s children are <font color='darkBlue'>black</font>. </p>
             *
             * <p> <img src="http://samchon.github.io/typescript-stl/images/design/conceptual_diagram/Red-black_tree_delete_case_3.svg"
                        style="max-width: 100%" /> </p>
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
            XTree.prototype.erase_case3 = function (N) {
                if (this.fetch_color(N.parent) == base.Color.BLACK &&
                    this.fetch_color(N.sibling) == base.Color.BLACK &&
                    this.fetch_color(N.sibling.left) == base.Color.BLACK &&
                    this.fetch_color(N.sibling.right) == base.Color.BLACK) {
                    N.sibling.color = base.Color.RED;
                    this.erase_case1(N.parent);
                }
                else
                    this.erase_case4(N);
            };
            /**
             * <p> {@link XTreeNode.sibling <b>S</b>} and {@link XTreeNode.sibling <b>S</b>}'s children are
             * <font color='darkBlue'>black</font>, but {@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font>. </p>
             *
             * <p> <img src="http://samchon.github.io/typescript-stl/images/design/conceptual_diagram/Red-black_tree_delete_case_4.svg"
                        style="max-width: 100%" /> </p>
             *
             * <p> In this case, we simply exchange the colors of {@link XTreeNode.sibling <b>S</b>} and
             * {@link XTreeNode.parent <b>P</b>}. This does not affect the number of <font color='darkBlue'>black</font>
             * nodes on paths going through {@link XTreeNode.sibling <b>S</b>}, but it does add one to the number of
             * <font color='darkBlue'>black</font> nodes on paths going through <i><b>N</b></i>, making up for the
             * deleted <font color='darkBlue'>black</font> node on those paths. </p>
             *
             * @param N A node to be erased or swapped.
             */
            XTree.prototype.erase_case4 = function (N) {
                if (this.fetch_color(N.parent) == base.Color.RED &&
                    N.sibling != null &&
                    this.fetch_color(N.sibling) == base.Color.BLACK &&
                    this.fetch_color(N.sibling.left) == base.Color.BLACK &&
                    this.fetch_color(N.sibling.right) == base.Color.BLACK) {
                    N.sibling.color = base.Color.RED;
                    N.parent.color = base.Color.BLACK;
                }
                else
                    this.erase_case5(N);
            };
            /**
             * <p> {@link XTreeNode.sibling <b>S</b>} is <font color='darkBlue'>black</font>, {@link XTreeNode.sibling <b>S</b>}'s
             * left child is <font color='red'>red</font>, {@link XTreeNode.sibling <b>S</b>}'s right child is
             * <font color='darkBlue'>black</font>, and <i><b>N</b></i> is the left child of its parent. </p>
             *
             * <p> <img src="http://samchon.github.io/typescript-stl/images/design/conceptual_diagram/Red-black_tree_delete_case_5.svg"
                        style="max-width: 100%" /> </p>
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
            XTree.prototype.erase_case5 = function (N) {
                if (N == N.parent.left &&
                    N.sibling != null &&
                    this.fetch_color(N.sibling) == base.Color.BLACK &&
                    this.fetch_color(N.sibling.left) == base.Color.RED &&
                    this.fetch_color(N.sibling.right) == base.Color.BLACK) {
                    N.sibling.color = base.Color.RED;
                    N.sibling.left.color = base.Color.BLACK;
                    this.rotate_right(N.sibling);
                }
                else if (N == N.parent.right &&
                    N.sibling != null &&
                    this.fetch_color(N.sibling) == base.Color.BLACK &&
                    this.fetch_color(N.sibling.left) == base.Color.BLACK &&
                    this.fetch_color(N.sibling.right) == base.Color.RED) {
                    N.sibling.color = base.Color.RED;
                    N.sibling.right.color = base.Color.BLACK;
                    this.rotate_left(N.sibling);
                }
            };
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
             * <p> <img src="http://samchon.github.io/typescript-stl/images/design/conceptual_diagram/Red-black_tree_delete_case_6.svg"
                        style="max-width: 100%" /> </p>
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
            XTree.prototype.erase_case6 = function (node) {
                node.sibling.color = this.fetch_color(node.parent);
                node.parent.color = base.Color.BLACK;
                if (node == node.parent.left) {
                    node.sibling.right.color = base.Color.BLACK;
                    this.rotate_left(node.parent);
                }
                else {
                    node.sibling.left.color = base.Color.BLACK;
                    this.rotate_right(node.parent);
                }
            };
            /* ---------------------------------------------------------
                ROTATION
            --------------------------------------------------------- */
            /**
             * Rotate a node left.
             *
             * @param node Node to rotate left.
             */
            XTree.prototype.rotate_left = function (node) {
                var right = node.right;
                this.replace_node(node, right);
                node.right = right.left;
                if (right.left != null)
                    right.left.parent = node;
                right.left = node;
                node.parent = right;
            };
            /**
             * Rotate a node to right.
             *
             * @param node A node to rotate right.
             */
            XTree.prototype.rotate_right = function (node) {
                var left = node.left;
                this.replace_node(node, left);
                node.left = left.right;
                if (left.right != null)
                    left.right.parent = node;
                left.right = node;
                node.parent = left;
            };
            /**
             * Replace a node.
             *
             * @param oldNode Ordinary node to be replaced.
             * @param newNode Target node to replace.
             */
            XTree.prototype.replace_node = function (oldNode, newNode) {
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
            };
            /* ---------------------------------------------------------
                COLOR
            --------------------------------------------------------- */
            /**
             * Fetch color from a node.
             *
             * @param node A node to fetch color.
             * @retur color.
             */
            XTree.prototype.fetch_color = function (node) {
                if (node == null)
                    return base.Color.BLACK;
                else
                    return node.color;
            };
            return XTree;
        }());
        base.XTree = XTree;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="XTree.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        /**
         * <p> A red-black tree storing {@link MapIterator MapIterators}. </p>
         *
         * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" target="_blank">
         * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /></a> </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var PairTree = (function (_super) {
            __extends(PairTree, _super);
            /* ---------------------------------------------------------
                CONSTRUCTOR
            --------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function PairTree(map, compare) {
                if (compare === void 0) { compare = std.less; }
                _super.call(this);
                this.map_ = map;
                this.compare_ = compare;
            }
            PairTree.prototype.find = function (val) {
                if (val instanceof std.MapIterator && val.first instanceof std.SetIterator == false)
                    return _super.prototype.find.call(this, val);
                else
                    return this.find_by_key(val);
            };
            /**
             * @hidden
             */
            PairTree.prototype.find_by_key = function (key) {
                if (this.root_ == null)
                    return null;
                var node = this.root_;
                while (true) {
                    var newNode = null;
                    if (std.equal_to(key, node.value.first))
                        break; // EQUALS, MEANS MATCHED, THEN TERMINATE
                    else if (this.compare_(key, node.value.first))
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
            };
            /* ---------------------------------------------------------
                BOUNDS
            --------------------------------------------------------- */
            /**
             * <p> Return iterator to lower bound. </p>
             *
             * <p> Returns an iterator pointing to the first element in the container whose key is not considered to
             * go before <i>k</i> (i.e., either it is equivalent or goes after). </p>
             *
             * <p> The function uses its internal comparison object (key_comp) to determine this, returning an
             * iterator to the first element for which key_comp(<i>k</i>, element_key) would return false. </p>
             *
             * <p> If the {@link ITreeMap} class is instantiated with the default comparison type ({@link less}),
             * the function returns an iterator to the first element whose key is not less than <i>k</i> </p>.
             *
             * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except
             * in the case that the {@link ITreeMap} contains an element with a key equivalent to <i>k</i>: In this
             * case, {@link lower_bound} returns an iterator pointing to that element, whereas {@link upper_bound}
             * returns an iterator pointing to the next element. </p>
             *
             * @param k Key to search for.
             *
             * @return An iterator to the the first element in the container whose key is not considered to go before
             *		   <i>k</i>, or {@link ITreeMap.end} if all keys are considered to go before <i>k</i>.
             */
            PairTree.prototype.lower_bound = function (key) {
                var node = this.find(key);
                if (node == null)
                    return this.map_.end();
                else if (this.compare_(node.value.first, key))
                    return node.value.next();
                else {
                    var it = node.value;
                    while (!std.equal_to(it, this.map_.end()) && this.compare_(it.first, key))
                        it = it.next();
                    return it;
                }
            };
            /**
             * <p> Return iterator to upper bound. </p>
             *
             * <p> Returns an iterator pointing to the first element in the container whose key is considered to
             * go after <i>k</i> </p>.
             *
             * <p> The function uses its internal comparison object (key_comp) to determine this, returning an
             * iterator to the first element for which key_comp(<i>k</i>, element_key) would return true. </p>
             *
             * <p> If the {@link ITreeMap} class is instantiated with the default comparison type ({@link less}),
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
             *		   <i>k</i>, or {@link TreeMap.end end} if no keys are considered to go after <i>k</i>.
             */
            PairTree.prototype.upper_bound = function (key) {
                var node = this.find(key);
                if (node == null)
                    return this.map_.end();
                else {
                    var it = node.value;
                    while (!std.equal_to(it, this.map_.end()) && (std.equal_to(it.first, key) || this.compare_(it.first, key)))
                        it = it.next();
                    return it;
                }
            };
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
            PairTree.prototype.equal_range = function (key) {
                return std.make_pair(this.lower_bound(key), this.upper_bound(key));
            };
            /* ---------------------------------------------------------
                COMPARISON
            --------------------------------------------------------- */
            /**
             * <p> Return key comparison function. </p>
             *
             * <p> Returns a references of the comparison function used by the container to compare <i>keys</i>. </p>
             *
             * <p> The <i>comparison object</i> of a {@link ITreeMap tree-map object} is set on
             * {@link TreeMap.constructor construction}. Its type (<i>Key</i>) is the last parameter of the
             * {@link ITreeMap.constructor constructors}. By default, this is a {@link less} function, which returns the same
             * as <i>operator&lt;</i>. </p>
             *
             * <p> This function determines the order of the elements in the container: it is a function pointer that takes
             * two arguments of the same type as the element <i>keys</i>, and returns <code>true</code> if the first argument
             * is considered to go before the second in the strict weak ordering it defines, and <code>false</code> otherwise.
             * </p>
             *
             * <p> Two keys are considered equivalent if {@link key_comp} returns <code>false</code> reflexively (i.e., no
             * matter the order in which the keys are passed as arguments). </p>
             *
             * @return The comparison function.
             */
            PairTree.prototype.key_comp = function () {
                return this.compare_;
            };
            /**
             * <p> Return value comparison function. </p>
             *
             * <p> Returns a comparison function that can be used to compare two elements to get whether the key of the first
             * one goes before the second. </p>
             *
             * <p> The arguments taken by this function object are of member type <code>std.Pair<Key, T></code> (defined in
             * {@link ITreeMap}), but the mapped type (<i>T</i>) part of the value is not taken into consideration in this
             * comparison. </p>
             *
             * <p> This comparison class returns <code>true</code> if the {@link Pair.first key} of the <i>first argument</i>
             * is considered to go before that of the <i>second</i> (according to the strict weak ordering specified by the
             * container's comparison function, {@link key_comp}), and <code>false</code> otherwise. </p>
             *
             * @return The comparison function for element values.
             */
            PairTree.prototype.value_comp = function () {
                var compare = this.compare_;
                var fn = function (x, y) {
                    return compare(x.first, y.first);
                };
                return fn;
            };
            /**
             * @inheritdoc
             */
            PairTree.prototype.is_equal_to = function (left, right) {
                return std.equal_to(left.first, right.first);
            };
            /**
             * @inheritdoc
             */
            PairTree.prototype.is_less = function (left, right) {
                return this.compare_(left.first, right.first);
            };
            return PairTree;
        }(base.XTree));
        base.PairTree = PairTree;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="XTree.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        /**
         * <p> A red-black Tree storing {@link SetIterator SetIterators}. </p>
         *
         * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/set_containers.png" target="_blank">
         * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/set_containers.png" style="max-width: 100%" /></a> </p>
         *
         * @author Jeongho Nam <http://samchon.org>
         */
        var AtomicTree = (function (_super) {
            __extends(AtomicTree, _super);
            /* ---------------------------------------------------------
                CONSTRUCTOR
            --------------------------------------------------------- */
            /**
             * Default Constructor.
             */
            function AtomicTree(set, compare) {
                if (compare === void 0) { compare = std.less; }
                _super.call(this);
                this.set_ = set;
                this.compare_ = compare;
            }
            AtomicTree.prototype.find = function (val) {
                if (val instanceof std.SetIterator && val.value instanceof std.SetIterator == false)
                    return _super.prototype.find.call(this, val);
                else
                    return this.find_by_val(val);
            };
            /**
             * @hidden
             */
            AtomicTree.prototype.find_by_val = function (val) {
                if (this.root_ == null)
                    return null;
                var node = this.root_;
                while (true) {
                    var newNode = null;
                    if (std.equal_to(val, node.value.value))
                        break; // EQUALS, MEANS MATCHED, THEN TERMINATE
                    else if (this.compare_(val, node.value.value))
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
            };
            /* ---------------------------------------------------------
                BOUNDS
            --------------------------------------------------------- */
            /**
             * <p> Return iterator to lower bound. </p>
             *
             * <p> Returns an iterator pointing to the first element in the container which is not considered to
             * go before <i>val</i> (i.e., either it is equivalent or goes after). </p>
             *
             * <p> The function uses its internal comparison object (key_comp) to determine this, returning an
             * iterator to the first element for which key_comp(element,val) would return false. </p>
             *
             * <p> If the {@link ITreeSet} class is instantiated with the default comparison type ({@link less}),
             * the function returns an iterator to the first element that is not less than <i>val</i>. </p>
    
             * <p> A similar member function, {@link upper_bound}, has the same behavior as {@link lower_bound}, except
             * in the case that the {@link ITreeSet} contains elements equivalent to <i>val</i>: In this case
             * {@link lower_bound} returns an iterator pointing to the first of such elements, whereas
             * {@link upper_bound} returns an iterator pointing to the element following the last. </p>
             *
             * @param val Value to compare.
             *
             * @return An iterator to the the first element in the container which is not considered to go before
             *		   <i>val</i>, or {@link ITreeSet.end} if all elements are considered to go before <i>val</i>.
             */
            AtomicTree.prototype.lower_bound = function (val) {
                var node = this.find(val);
                if (node == null)
                    return this.set_.end();
                else if (std.equal_to(node.value.value, val))
                    return node.value;
                else {
                    var it = node.value;
                    while (!std.equal_to(it, this.set_.end()) && this.compare_(it.value, val))
                        it = it.next();
                    return it;
                }
            };
            /**
             * <p> Return iterator to upper bound. </p>
             *
             * <p> Returns an iterator pointing to the first element in the container which is considered to go after
             * <i>val</i>. </p>
    
             * <p> The function uses its internal comparison object (key_comp) to determine this, returning an
             * iterator to the first element for which key_comp(val,element) would return true. </p>
    
             * <p> If the {@code ITreeSet} class is instantiated with the default comparison type (less), the
             * function returns an iterator to the first element that is greater than <i>val</i>. </p>
             *
             * <p> A similar member function, {@link lower_bound}, has the same behavior as {@link upper_bound}, except
             * in the case that the {@ITreeSet} contains elements equivalent to <i>val</i>: In this case
             * {@link lower_bound} returns an iterator pointing to the first of such elements, whereas
             * {@link upper_bound} returns an iterator pointing to the element following the last. </p>
             *
             * @param val Value to compare.
             *
             * @return An iterator to the the first element in the container which is considered to go after
             *		   <i>val</i>, or {@link TreeSet.end end} if no elements are considered to go after <i>val</i>.
             */
            AtomicTree.prototype.upper_bound = function (val) {
                var node = this.find(val);
                if (node == null)
                    return this.set_.end();
                else {
                    var it = node.value;
                    while (!std.equal_to(it, this.set_.end()) && (std.equal_to(it.value, val) || this.compare_(it.value, val)))
                        it = it.next();
                    return it;
                }
            };
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
            AtomicTree.prototype.equal_range = function (val) {
                return std.make_pair(this.lower_bound(val), this.upper_bound(val));
            };
            /* ---------------------------------------------------------
                COMPARISON
            --------------------------------------------------------- */
            /**
             * <p> Return comparison function. </p>
             *
             * <p> Returns a copy of the comparison function used by the container. </p>
             *
             * <p> By default, this is a {@link less} object, which returns the same as <i>operator<</i>. </p>
             *
             * <p> This object determines the order of the elements in the container: it is a function pointer or a function
             * object that takes two arguments of the same type as the container elements, and returns <code>true</code> if
             * the <i>first argument</i> is considered to go before the <i>second</i> in the <i>strict weak ordering</i> it
             * defines, and <code>false</code> otherwise. </p>
             *
             * <p> Two elements of a {@link ITreeSet} are considered equivalent if {@link key_comp} returns <code>false</code>
             * reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
             *
             * <p> In {@link ITreeSet} containers, the <i>keys</i> to sort the elements are the values (<i>T</i>) themselves,
             * therefore {@link key_comp} and its sibling member function {@link value_comp} are equivalent. </p>
             *
             * @return The comparison function.
             */
            AtomicTree.prototype.key_comp = function () {
                return this.compare_;
            };
            /**
             * <p> Return comparison function. </p>
             *
             * <p> Returns a copy of the comparison function used by the container. </p>
             *
             * <p> By default, this is a {@link less} object, which returns the same as <i>operator<</i>. </p>
             *
             * <p> This object determines the order of the elements in the container: it is a function pointer or a function
             * object that takes two arguments of the same type as the container elements, and returns <code>true</code> if
             * the <i>first argument</i> is considered to go before the <i>second</i> in the <i>strict weak ordering</i> it
             * defines, and <code>false</code> otherwise. </p>
             *
             * <p> Two elements of a {@link ITreeSet} are considered equivalent if {@link key_comp} returns <code>false</code>
             * reflexively (i.e., no matter the order in which the elements are passed as arguments). </p>
             *
             * <p> In {@link ITreeSet} containers, the <i>keys</i> to sort the elements are the values (<i>T</i>) themselves,
             * therefore {@link key_comp} and its sibling member function {@link value_comp} are equivalent. </p>
             *
             * @return The comparison function.
             */
            AtomicTree.prototype.value_comp = function () {
                return this.compare_;
            };
            /**
             * @inheritdoc
             */
            AtomicTree.prototype.is_equal_to = function (left, right) {
                return std.equal_to(left, right);
            };
            /**
             * @inheritdoc
             */
            AtomicTree.prototype.is_less = function (left, right) {
                return this.compare_(left.value, right.value);
            };
            return AtomicTree;
        }(base.XTree));
        base.AtomicTree = AtomicTree;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="MapContainer.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
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
         * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram" target="_blank">
         * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram" style="max-width: 100%" /></a> </p>
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
        var UniqueMap = (function (_super) {
            __extends(UniqueMap, _super);
            function UniqueMap() {
                _super.apply(this, arguments);
            }
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            UniqueMap.prototype.count = function (key) {
                return this.find(key).equals(this.end()) ? 0 : 1;
            };
            /**
             * <p> Get an element </p>
             *
             * <p> Returns a reference to the mapped value of the element identified with <i>key</i>. </p>
             *
             * @param key Key value of the element whose mapped value is accessed.
             *
             * @throw exception out of range
             *
             * @return A reference object of the mapped value (_Ty)
             */
            UniqueMap.prototype.get = function (key) {
                var it = this.find(key);
                if (it.equals(this.end()) == true)
                    throw new std.OutOfRange("unable to find the matched key.");
                return it.second;
            };
            /**
             * <p> Set an item as the specified identifier. </p>
             *
             * <p>If the identifier is already in map, change value of the identifier. If not, then insert the object
             * with the identifier. </p>
             *
             * @param key Key value of the element whose mapped value is accessed.
             * @param val Value, the item.
             */
            UniqueMap.prototype.set = function (key, val) {
                this.insert_or_assign(key, val);
            };
            UniqueMap.prototype.emplace = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (args.length == 1)
                    return this._Insert_by_pair(args[0]);
                else
                    return this._Insert_by_pair(std.make_pair(args[0], args[1]));
            };
            UniqueMap.prototype.insert = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return _super.prototype.insert.apply(this, args);
            };
            UniqueMap.prototype.insert_or_assign = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                if (args.length == 2) {
                    return this.insert_or_assign_with_key_value(args[0], args[1]);
                }
                else if (args.length == 3) {
                    var ret = void 0;
                    var is_reverse_iterator = false;
                    // REVERSE_ITERATOR TO ITERATOR
                    if (args[0] instanceof std.MapReverseIterator) {
                        is_reverse_iterator = true;
                        args[0] = args[0].base().prev();
                    }
                    // INSERT OR ASSIGN AN ELEMENT
                    ret = this.insert_or_assign_with_hint(args[0], args[1], args[2]);
                    // RETURN BRANCHES
                    if (is_reverse_iterator == true)
                        return new std.MapReverseIterator(ret.next());
                    else
                        return ret;
                }
            };
            /**
             * @hidden
             */
            UniqueMap.prototype.insert_or_assign_with_key_value = function (key, value) {
                var it = this.find(key);
                if (it.equals(this.end()) == true)
                    return this._Insert_by_pair(std.make_pair(key, value));
                else {
                    it.second = value;
                    return std.make_pair(it, false);
                }
            };
            /**
             * @hidden
             */
            UniqueMap.prototype.insert_or_assign_with_hint = function (hint, key, value) {
                return this.insert_or_assign_with_key_value(key, value).first;
            };
            UniqueMap.prototype.extract = function (param) {
                if (param instanceof std.MapIterator)
                    return this.extract_by_iterator(param);
                else if (param instanceof std.MapReverseIterator)
                    return this.extract_by_reverse_iterator(param);
                else
                    return this.extract_by_key(param);
            };
            /**
             * @hidden
             */
            UniqueMap.prototype.extract_by_key = function (key) {
                var it = this.find(key);
                if (it.equals(this.end()) == true)
                    throw new std.OutOfRange("No such key exists.");
                var ret = it.value;
                this.erase(it);
                return ret;
            };
            /**
             * @hidden
             */
            UniqueMap.prototype.extract_by_iterator = function (it) {
                if (it.equals(this.end()) == true)
                    return this.end();
                this.erase(it);
                return it;
            };
            /**
             * @hidden
             */
            UniqueMap.prototype.extract_by_reverse_iterator = function (it) {
                this.extract_by_iterator(it.base().next());
                return it;
            };
            /* ---------------------------------------------------------
                UTILITY
            --------------------------------------------------------- */
            /**
             * Merge two maps.
             *
             * Attempts to extract each element in *source* and insert it into this container. If there's an element in this
             * container with key equivalent to the key of an element from *source*, tnen that element is not extracted from
             * the *source*. Otherwise, no element with same key exists in this container, then that element will be
             * transfered from the *source* to this container.
             *
             * @param source A {@link MapContainer map container} to transfer the elements from.
             */
            UniqueMap.prototype.merge = function (source) {
                for (var it = source.begin(); !it.equals(source.end());) {
                    if (this.has(it.first) == false) {
                        this.insert(it.value);
                        it = source.erase(it);
                    }
                    else
                        it = it.next();
                }
            };
            return UniqueMap;
        }(base.MapContainer));
        base.UniqueMap = UniqueMap;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
/// <reference path="SetContainer.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
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
         * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/set_containers.png" target="_blank">
         * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/set_containers.png" style="max-width: 100%" /></a> </p>
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
        var UniqueSet = (function (_super) {
            __extends(UniqueSet, _super);
            function UniqueSet() {
                _super.apply(this, arguments);
            }
            /* ---------------------------------------------------------
                ACCESSOR
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            UniqueSet.prototype.count = function (key) {
                return this.find(key).equals(this.end()) ? 0 : 1;
            };
            UniqueSet.prototype.insert = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                return _super.prototype.insert.apply(this, args);
            };
            UniqueSet.prototype.extract = function (param) {
                if (param instanceof std.SetIterator)
                    return this.extract_by_iterator(param);
                else if (param instanceof std.SetReverseIterator)
                    return this.extract_by_reverse_iterator(param);
                else
                    return this.extract_by_key(param);
            };
            /**
             * @hidden
             */
            UniqueSet.prototype.extract_by_key = function (val) {
                var it = this.find(val);
                if (it.equals(this.end()) == true)
                    throw new std.OutOfRange("No such key exists.");
                this.erase(val);
                return val;
            };
            /**
             * @hidden
             */
            UniqueSet.prototype.extract_by_iterator = function (it) {
                if (it.equals(this.end()) == true || this.has(it.value) == false)
                    return this.end();
                this.erase(it);
                return it;
            };
            /**
             * @hidden
             */
            UniqueSet.prototype.extract_by_reverse_iterator = function (it) {
                this.extract_by_iterator(it.base().next());
                return it;
            };
            /* ---------------------------------------------------------
                UTILITY
            --------------------------------------------------------- */
            /**
             * Merge two sets.
             *
             * Attempts to extract each element in *source* and insert it into this container. If there's an element in this
             * container with key equivalent to the key of an element from *source*, tnen that element is not extracted from
             * the *source*. Otherwise, no element with same key exists in this container, then that element will be
             * transfered from the *source* to this container.
             *
             * @param source A {@link SetContainer set container} to transfer the elements from.
             */
            UniqueSet.prototype.merge = function (source) {
                for (var it = source.begin(); !it.equals(source.end());) {
                    if (this.has(it.value) == false) {
                        this.insert(it.value);
                        it = source.erase(it);
                    }
                    else
                        it = it.next();
                }
            };
            return UniqueSet;
        }(base.SetContainer));
        base.UniqueSet = UniqueSet;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="../API.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        /**
         * <p> A node in an XTree. </p>
         *
         * @param <T> Type of elements.
         *
         * @inventor Rudolf Bayer
         * @author Migrated by Jeongho Nam <http://samchon.org>
         */
        var XTreeNode = (function () {
            /* ---------------------------------------------------------
                CONSTRUCTORS
            --------------------------------------------------------- */
            /**
             * Construct from value and color of node.
             *
             * @param value Value to be stored in.
             * @param color Color of the node, red or black.
             */
            function XTreeNode(value, color) {
                this.value = value;
                this.color = color;
                this.parent = null;
                this.left = null;
                this.right = null;
            }
            Object.defineProperty(XTreeNode.prototype, "grand_parent", {
                /**
                 * Get grand-parent.
                 */
                get: function () {
                    return this.parent.parent;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(XTreeNode.prototype, "sibling", {
                /**
                 * Get sibling, opposite side node in same parent.
                 */
                get: function () {
                    if (this == this.parent.left)
                        return this.parent.right;
                    else
                        return this.parent.left;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(XTreeNode.prototype, "uncle", {
                /**
                 * Get uncle, parent's sibling.
                 */
                get: function () {
                    return this.parent.sibling;
                },
                enumerable: true,
                configurable: true
            });
            return XTreeNode;
        }());
        base.XTreeNode = XTreeNode;
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="API.ts" />
/// <reference path="base/Container.ts" />
/// <reference path="Iterator.ts" />
var std;
(function (std) {
    /**
     * <p> Double ended queue. </p>
     *
     * <p> {@link Deque} (usually pronounced like "<i>deck</i>") is an irregular acronym of
     * <b>d</b>ouble-<b>e</b>nded <b>q</b>ueue. Double-ended queues are sequence containers with dynamic sizes that can be
     * expanded or contracted on both ends (either its front or its back). </p>
     *
     * <p> Specific libraries may implement deques in different ways, generally as some form of dynamic array. But in any
     * case, they allow for the individual elements to be accessed directly through random access iterators, with storage
     * handled automatically by expanding and contracting the container as needed. </p>
     *
     * <p> Therefore, they provide a functionality similar to vectors, but with efficient insertion and deletion of
     * elements also at the beginning of the sequence, and not only at its end. But, unlike {@link Vector Vectors},
     * {@link Deque Deques} are not guaranteed to store all its elements in contiguous storage locations: accessing
     * elements in a <u>deque</u> by offsetting a pointer to another element causes undefined behavior. </p>
     *
     * <p> Both {@link Vector}s and {@link Deque}s provide a very similar interface and can be used for similar purposes,
     * but internally both work in quite different ways: While {@link Vector}s use a single array that needs to be
     * occasionally reallocated for growth, the elements of a {@link Deque} can be scattered in different chunks of
     * storage, with the container keeping the necessary information internally to provide direct access to any of its
     * elements in constant time and with a uniform sequential interface (through iterators). Therefore,
     * {@link Deque Deques} are a little more complex internally than {@link Vector}s, but this allows them to grow more
     * efficiently under certain circumstances, especially with very long sequences, where reallocations become more
     * expensive. </p>
     *
     * <p> For operations that involve frequent insertion or removals of elements at positions other than the beginning or
     * the end, {@link Deque Deques} perform worse and have less consistent iterators and references than
     * {@link List Lists}. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> </a>
     * </p>
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
     * @param <T> Type of the elements.
     *
     * @reference http://www.cplusplus.com/reference/deque/deque/
     * @author Jeongho Nam <http://samchon.org>
     */
    var Deque = (function (_super) {
        __extends(Deque, _super);
        function Deque() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            // RESERVED ITERATORS
            this.end_ = new std.DequeIterator(this, -1);
            this.rend_ = new std.DequeReverseIterator(new std.DequeIterator(this, 0));
            // CONSTRUCTORS BRANCH
            if (args.length == 0) {
                this.clear();
            }
            if (args.length == 1 && args[0] instanceof Array) {
                var array = args[0];
                this.clear();
                this.push.apply(this, array);
            }
            else if (args.length == 1 && args[0] instanceof Deque) {
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 &&
                args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin_1 = args[0];
                var end_1 = args[1];
                this.assign(begin_1, end_1);
            }
        }
        Object.defineProperty(Deque, "ROW", {
            ///
            // Row size of the {@link matrix_ matrix} which contains elements.
            // 
            // Note that the {@link ROW} affects on time complexity of accessing and inserting element. 
            // Accessing element is {@link ROW} times slower than ordinary {@link Vector} and inserting element 
            // in middle position is {@link ROW} times faster than ordinary {@link Vector}.
            // 
            // When the {@link ROW} returns 8, time complexity of accessing element is O(8) and inserting 
            // element in middle position is O(N/8). ({@link Vector}'s time complexity of accessement is O(1)
            // and inserting element is O(N)).
            /**
             * @hidden
             */
            get: function () { return 8; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Deque, "MIN_CAPACITY", {
            ///
            // Minimum {@link capacity}.
            // 
            // Although a {@link Deque} has few elements, even no element is belonged to, the {@link Deque} 
            // keeps the minimum {@link capacity} at least.
            /**
             * @hidden
             */
            get: function () { return 100; },
            enumerable: true,
            configurable: true
        });
        /**
         * @hidden
         */
        Deque.prototype.get_col_size = function () {
            // Get column size; {@link capacity_ capacity} / {@link ROW row}.
            return Math.floor(this.capacity_ / Deque.ROW);
        };
        Deque.prototype.assign = function (first, second) {
            // CLEAR PREVIOUS CONTENTS
            this.clear();
            if (first instanceof std.Iterator && second instanceof std.Iterator) {
                var begin_2 = first;
                var end_2 = second;
                var size = 0;
                for (var it = begin_2; !it.equals(end_2); it = it.next())
                    size++;
                // RESERVE
                this.reserve(size);
                this.size_ = size;
                // ASSIGN CONTENTS
                var array = this.matrix_[0];
                for (var it = begin_2; !it.equals(end_2); it = it.next()) {
                    if (array.length >= this.get_col_size()) {
                        array = new Array();
                        this.matrix_.push(array);
                    }
                    array.push(it.value);
                }
            }
            else {
                var size = first;
                var val = second;
                // RESERVE
                this.reserve(size);
                this.size_ = size;
                // ASSIGN CONTENTS
                var array = this.matrix_[0];
                for (var i = 0; i < size; i++) {
                    if (array.length >= this.get_col_size()) {
                        array = new Array();
                        this.matrix_.push(array);
                    }
                    array.push(val);
                }
            }
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.reserve = function (capacity) {
            // MEMORIZE
            var prevMatrix = this.matrix_;
            var prevSize = this.size_;
            // REFRESH
            this.matrix_ = new Array();
            this.matrix_.push(new Array());
            /////
            // RE-FILL
            /////
            var array = this.matrix_[0];
            for (var i = 0; i < prevMatrix.length; i++)
                for (var j = 0; j < prevMatrix[i].length; j++) {
                    if (array.length >= this.get_col_size()) {
                        array = new Array();
                        this.matrix_.push(array);
                    }
                    array.push(prevMatrix[i][j]);
                }
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.clear = function () {
            // CLEAR CONTENTS
            this.matrix_ = new Array();
            this.matrix_.push(new Array());
            // RE-INDEX
            this.size_ = 0;
            this.capacity_ = Deque.MIN_CAPACITY;
        };
        /* =========================================================
            ACCESSORS
                - GETTERS & SETTERS
                - ITERATORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        Deque.prototype.begin = function () {
            if (this.empty() == true)
                return this.end_;
            else
                return new std.DequeIterator(this, 0);
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.end = function () {
            return this.end_;
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.rbegin = function () {
            return new std.DequeReverseIterator(this.end_);
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.rend = function () {
            if (this.empty() == true)
                return new std.DequeReverseIterator(this.end_);
            else
                return this.rend_;
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.size = function () {
            return this.size_;
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.empty = function () {
            return this.size_ == 0;
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.capacity = function () {
            return this.capacity_;
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.at = function (index) {
            if (index > this.size())
                throw new std.OutOfRange("Target index is greater than Deque's size.");
            var indexPair = this.fetch_index(index);
            return this.matrix_[indexPair.first][indexPair.second];
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.set = function (index, val) {
            if (index >= this.size())
                throw new std.OutOfRange("Target index is greater than Deque's size.");
            var indexPair = this.fetch_index(index);
            this.matrix_[indexPair.first][indexPair.second] = val;
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.front = function () {
            return this.matrix_[0][0];
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.back = function () {
            var lastArray = this.matrix_[this.matrix_.length - 1];
            return lastArray[lastArray.length - 1];
        };
        /**
        // Fetch row and column's index.
        /**
         * @hidden
         */
        Deque.prototype.fetch_index = function (index) {
            var row;
            for (row = 0; row < this.matrix_.length; row++) {
                var array = this.matrix_[row];
                if (index < array.length)
                    break;
                index -= array.length;
            }
            if (row == this.matrix_.length)
                row--;
            return std.make_pair(row, index);
        };
        /* =========================================================
            ELEMENTS I/O
                - PUSH & POP
                - INSERT
                - ERASE
                - PRE & POST-PROCESS
                - SWAP
        ============================================================
            PUSH & POP
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        Deque.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            // RE-SIZE
            if (this.size_ + items.length > this.capacity_)
                this.reserve(this.size_ + items.length);
            // INSERTS
            var array = this.matrix_[this.matrix_.length - 1];
            for (var i = 0; i < items.length; i++) {
                if (array.length >= this.get_col_size()) {
                    array = new Array();
                    this.matrix_.push(array);
                }
                array.push(items[i]);
            }
            // INDEXING
            this.size_ += items.length;
            return this.size_;
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.push_front = function (val) {
            // INSERT TO THE FRONT
            this.matrix_[0].unshift(val);
            this.size_++;
            if (this.size_ > this.capacity_)
                this.reserve(this.size_ * 2);
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.push_back = function (val) {
            var lastArray = this.matrix_[this.matrix_.length - 1];
            if (lastArray.length >= this.get_col_size() && this.matrix_.length < Deque.ROW) {
                lastArray = new Array();
                this.matrix_.push(lastArray);
            }
            lastArray.push(val);
            this.size_++;
            if (this.size_ > this.capacity_)
                this.reserve(this.size_ * 2);
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.pop_front = function () {
            if (this.empty() == true)
                return; // SOMEWHERE PLACE TO THROW EXCEPTION
            // EREASE FIRST ELEMENT
            this.matrix_[0].shift();
            this.size_--;
            if (this.matrix_[0].length == 0 && this.matrix_.length > 1)
                this.matrix_.shift();
        };
        /**
         * @inheritdoc
         */
        Deque.prototype.pop_back = function () {
            if (this.empty() == true)
                return; // SOMEWHERE PLACE TO THROW EXCEPTION
            // ERASE LAST ELEMENT
            var lastArray = this.matrix_[this.matrix_.length - 1];
            lastArray.splice(lastArray.length - 1, 1);
            this.size_--;
            if (lastArray.length == 0 && this.matrix_.length > 1)
                this.matrix_.splice(this.matrix_.length - 1, 1);
        };
        Deque.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // REVERSE_ITERATOR TO ITERATOR
            var ret;
            var is_reverse_iterator = false;
            if (args[0] instanceof std.DequeReverseIterator) {
                is_reverse_iterator = true;
                args[0] = args[0].base().prev();
            }
            // BRANCHES
            if (args.length == 2)
                ret = this.insert_by_val(args[0], args[1]);
            else if (args.length == 3 && typeof args[1] == "number")
                ret = this._Insert_by_repeating_val(args[0], args[1], args[2]);
            else
                ret = this._Insert_by_range(args[0], args[1], args[2]);
            // RETURNS
            if (is_reverse_iterator == true)
                return new std.DequeReverseIterator(ret.next());
            else
                return ret;
        };
        /**
         * @hidden
         */
        Deque.prototype.insert_by_val = function (position, val) {
            return this._Insert_by_repeating_val(position, 1, val);
        };
        /**
         * @hidden
         */
        Deque.prototype._Insert_by_repeating_val = function (position, n, val) {
            // CONSTRUCT ITEMS
            var items = [];
            items.length = n;
            for (var i = 0; i < n; i++)
                items[i] = val;
            // INSERT ELEMENTS
            if (position.equals(this.end())) {
                this.push.apply(this, items);
                return this.begin();
            }
            else
                return this.insert_by_items(position, items);
        };
        /**
         * @hidden
         */
        Deque.prototype._Insert_by_range = function (position, begin, end) {
            // CONSTRUCT ITEMS
            var items = [];
            for (var it = begin; !it.equals(end); it = it.next())
                items.push(it.value);
            // INSERT ELEMENTS
            if (position.equals(this.end())) {
                this.push.apply(this, items);
                return this.begin();
            }
            else
                return this.insert_by_items(position, items);
        };
        /**
         * @hidden
         */
        Deque.prototype.insert_by_items = function (position, items) {
            var item_size = items.length;
            this.size_ += item_size;
            if (this.size_ <= this.capacity_) {
                // ------------------------------------------------------
                // WHEN FITTING INTO RESERVED CAPACITY IS POSSIBLE
                // ------------------------------------------------------
                // INSERTS CAREFULLY CONSIDERING THE COL_SIZE
                var index_pair = this.fetch_index(position.index);
                var index = index_pair.first;
                var spliced_values = this.matrix_[index].splice(index_pair.second);
                if (spliced_values.length != 0)
                    items = items.concat.apply(items, spliced_values);
                if (this.matrix_[index].length < Deque.ROW) {
                    this.matrix_[index] = (_a = this.matrix_[index]).concat.apply(_a, items.splice(0, Deque.ROW - this.matrix_[index].length));
                }
                var splicedArray = this.matrix_.splice(index + 1);
                // INSERTS
                while (items.length != 0)
                    this.matrix_.push(items.splice(0, Math.min(Deque.ROW, items.length)));
                // CONCAT WITH BACKS
                this.matrix_ = (_b = this.matrix_).concat.apply(_b, splicedArray);
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
                    var indexPair = this.fetch_index(position.index);
                    var index = indexPair.first;
                    var splicedValues = this.matrix_[index].splice(indexPair.second);
                    if (splicedValues.length != 0)
                        items = items.concat.apply(items, splicedValues);
                    // ALL TO THE MIDDLE
                    this.matrix_[index] = (_c = this.matrix_[index]).concat.apply(_c, items);
                }
                // AND KEEP BALANCE BY RESERVE()
                this.reserve(this.size_);
            }
            return position;
            var _a, _b, _c;
        };
        Deque.prototype.erase = function (first, last) {
            if (last === void 0) { last = first.next(); }
            var ret;
            var is_reverse_iterator = false;
            // REVERSE_ITERATOR TO ITERATOR
            if (first instanceof std.DequeReverseIterator) {
                is_reverse_iterator = true;
                var first_it = last.base();
                var last_it = first.base();
                first = first_it;
                last = last_it;
            }
            // ERASE ELEMENTS
            ret = this._Erase_by_range(first, last);
            // RETURN BRANCHES
            if (is_reverse_iterator == true)
                return new std.DequeReverseIterator(ret.next());
            else
                return ret;
        };
        /**
         * @hidden
         */
        Deque.prototype._Erase_by_range = function (first, last) {
            if (first.index == -1)
                return first;
            // INDEXING
            var size;
            if (last.index == -1)
                size = this.size() - first.index;
            else
                size = last.index - first.index;
            this.size_ -= size;
            // ERASING
            while (size != 0) {
                var indexPair = this.fetch_index(first.index);
                var array = this.matrix_[indexPair.first];
                var myDeleteSize = Math.min(size, array.length - indexPair.second);
                array.splice(indexPair.second, myDeleteSize);
                if (array.length == 0 && this.matrix_.length > 1)
                    this.matrix_.splice(indexPair.first, 1);
                size -= myDeleteSize;
            }
            if (last.index == -1)
                return this.end();
            else
                return first;
        };
        Deque.prototype.swap = function (obj) {
            if (obj instanceof Deque) {
                _a = [obj.matrix_, this.matrix_], this.matrix_ = _a[0], obj.matrix_ = _a[1];
                _b = [obj.size_, this.size_], this.size_ = _b[0], obj.size_ = _b[1];
                _c = [obj.capacity_, this.capacity_], this.capacity_ = _c[0], obj.capacity_ = _c[1];
            }
            else
                _super.prototype.swap.call(this, obj);
            var _a, _b, _c;
        };
        return Deque;
    }(std.base.Container));
    std.Deque = Deque;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> An iterator of {@link Deque}. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> </a>
     * </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var DequeIterator = (function (_super) {
        __extends(DequeIterator, _super);
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
        function DequeIterator(source, index) {
            _super.call(this, source);
            this.index_ = index;
        }
        Object.defineProperty(DequeIterator.prototype, "deque", {
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * @hidden
             */
            get: function () {
                return this.source_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DequeIterator.prototype, "value", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.deque.at(this.index_);
            },
            /**
             * Set value of the iterator is pointing to.
             *
             * @param val Value to set.
             */
            set: function (val) {
                this.deque.set(this.index_, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DequeIterator.prototype, "index", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.index_;
            },
            enumerable: true,
            configurable: true
        });
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        DequeIterator.prototype.prev = function () {
            if (this.index_ == -1)
                return new DequeIterator(this.deque, this.deque.size() - 1);
            else if (this.index_ - 1 < 0)
                return this.deque.end();
            else
                return new DequeIterator(this.deque, this.index_ - 1);
        };
        /**
         * @inheritdoc
         */
        DequeIterator.prototype.next = function () {
            if (this.index_ >= this.source_.size() - 1)
                return this.deque.end();
            else
                return new DequeIterator(this.deque, this.index_ + 1);
        };
        /**
         * @inheritdoc
         */
        DequeIterator.prototype.advance = function (n) {
            var new_index;
            if (n < 0 && this.index_ == -1)
                new_index = this.deque.size() + n;
            else
                new_index = this.index_ + n;
            if (new_index < 0 || new_index >= this.deque.size())
                return this.deque.end();
            else
                return new DequeIterator(this.deque, new_index);
        };
        /* ---------------------------------------------------------
            COMPARES
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        DequeIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.index_ == obj.index_;
        };
        /**
         * @inheritdoc
         */
        DequeIterator.prototype.swap = function (obj) {
            _a = [obj.value, this.value], this.value = _a[0], obj.value = _a[1];
            var _a;
        };
        return DequeIterator;
    }(std.Iterator));
    std.DequeIterator = DequeIterator;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> A reverse-iterator of Deque. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /> </a>
     * </p>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var DequeReverseIterator = (function (_super) {
        __extends(DequeReverseIterator, _super);
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from base iterator.
         *
         * @param base A reference of the base iterator, which iterates in the opposite direction.
         */
        function DequeReverseIterator(base) {
            _super.call(this, base);
        }
        /**
         * @hidden
         */
        DequeReverseIterator.prototype._Create_neighbor = function (base) {
            return new DequeReverseIterator(base);
        };
        Object.defineProperty(DequeReverseIterator.prototype, "value", {
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            get: function () {
                return this.base_.value;
            },
            /**
             * Set value of the iterator is pointing to.
             *
             * @param val Value to set.
             */
            set: function (val) {
                this.base_.value = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DequeReverseIterator.prototype, "index", {
            /**
             * Get index.
             */
            get: function () {
                return this.base_.index;
            },
            enumerable: true,
            configurable: true
        });
        return DequeReverseIterator;
    }(std.ReverseIterator));
    std.DequeReverseIterator = DequeReverseIterator;
})(std || (std = {}));
/// <reference path="API.ts" />
// Standard exceptions
//
// This header defines the base class for all exceptions thrown by the elements of the standard library: 
// {@link Exception}, along with several types and utilities to assist handling exceptions:
//
// @reference http://www.cplusplus.com/reference/exception/
// @author Jeongho Nam <http://samchon.org>
var std;
(function (std) {
    /**
     * <p> Function handling termination on exception </p>
     *
     * <p> Calls the current terminate handler. </p>
     *
     * <p> By default, the terminate handler calls abort. But this behavior can be redefined by calling
     * {@link set_terminate}. </p>
     *
     * <p> This function is automatically called when no <code>catch</code> handler can be found for a thrown exception,
     * or for some other exceptional circumstance that makes impossible to continue the exception handling process. </p>
     *
     * <p> This function is provided so that the terminate handler can be explicitly called by a program that needs to
     * abnormally terminate, and works even if {@link set_terminate} has not been used to set a custom terminate handler
     * (calling abort in this case). </p>
     */
    function terminate() {
        if (terminate_handler != null)
            terminate_handler();
        if (std.is_node() == true)
            process.exit();
        else {
            window.open("", "_self", "");
            window.close();
        }
    }
    std.terminate = terminate;
    /**
     * <p> Set <i>terminate handler</i> function. </p>
     *
     * <p> A <i>terminate handler</i> function is a function automatically called when the exception handling process has
     * to be abandoned for some reason. This happens when no catch handler can be found for a thrown exception, or for
     * some other exceptional circumstance that makes impossible to continue the exception handling process. </p>
     *
     * <p> Before this function is called by the program for the first time, the default behavior is to call abort. </p>
     *
     * <p> A program may explicitly call the current terminate handler function by calling {@link terminate}. </p>
     *
     * @param f Function that takes no parameters and returns no value (<i>void</i>).
     */
    function set_terminate(f) {
        terminate_handler = f;
        if (std.is_node() == true)
            process.on("uncaughtException", function (error) {
                terminate_handler();
            });
        else
            window.onerror =
                function (message, filename, lineno, colno, error) {
                    terminate_handler();
                };
    }
    std.set_terminate = set_terminate;
    /**
     * <p> Get <i>terminate handler</i> function. </p>
     *
     * <p> The <i>terminate handler</i> function is automatically called when no <code>catch</code> handler can be found
     * for a thrown exception, or for some other exceptional circumstance that makes impossible to continue the exception
     * handling process. </p>
     *
     * <p> If no such function has been set by a previous call to {@link set_terminate}, the function returns a
     * <i>null-pointer</i>. </p>
     *
     * @return If {@link set_terminate} has previously been called by the program, the function returns the current
     *		   <i>terminate handler</i> function. Otherwise, it returns a <i>null-pointer</i>.
     */
    function get_terminate() {
        return terminate_handler;
    }
    std.get_terminate = get_terminate;
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/exception/exception
     * @author Jeongho Nam <http://samchon.org>
     */
    var Exception = (function (_super) {
        __extends(Exception, _super);
        function Exception(message) {
            if (message === void 0) { message = ""; }
            _super.call(this);
            this.description = message;
        }
        /**
         * <p> Get string identifying exception. </p>
         * <p> Returns a string that may be used to identify the exception. </p>
         *
         * <p> The particular representation pointed by the returned value is implementation-defined.
         * As a virtual function, derived classes may redefine this function so that specify value are
         * returned. </p>
         */
        Exception.prototype.what = function () {
            return this.description;
        };
        Object.defineProperty(Exception.prototype, "message", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.description;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Exception.prototype, "name", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.constructor.name;
            },
            enumerable: true,
            configurable: true
        });
        return Exception;
    }(Error));
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/stdexcept/logic_error
     * @author Jeongho Nam <http://samchon.org>
     */
    var LogicError = (function (_super) {
        __extends(LogicError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function LogicError(message) {
            _super.call(this, message);
        }
        return LogicError;
    }(Exception));
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a></p>
     *
     * @reference http://www.cplusplus.com/reference/stdexcept/domain_error
     * @author Jeongho Nam <http://samchon.org>
     */
    var DomainError = (function (_super) {
        __extends(DomainError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function DomainError(message) {
            _super.call(this, message);
        }
        return DomainError;
    }(LogicError));
    std.DomainError = DomainError;
    /**
     * <p> Invalid argument exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report an invalid argument. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library
     * also throw exceptions of this type to signal invalid arguments. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/stdexcept/invalid_argument
     * @author Jeongho Nam <http://samchon.org>
     */
    var InvalidArgument = (function (_super) {
        __extends(InvalidArgument, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function InvalidArgument(message) {
            _super.call(this, message);
        }
        return InvalidArgument;
    }(LogicError));
    std.InvalidArgument = InvalidArgument;
    /**
     * <p> Length error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to report a length error. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library,
     * such as vector and string also throw exceptions of this type to signal errors resizing. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/stdexcept/length_error
     * @author Jeongho Nam <http://samchon.org>
     */
    var LengthError = (function (_super) {
        __extends(LengthError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function LengthError(message) {
            _super.call(this, message);
        }
        return LengthError;
    }(LogicError));
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/stdexcept/out_of_range
     * @author Jeongho Nam <http://samchon.org>
     */
    var OutOfRange = (function (_super) {
        __extends(OutOfRange, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function OutOfRange(message) {
            _super.call(this, message);
        }
        return OutOfRange;
    }(LogicError));
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/stdexcept/runtime_error
     * @author Jeongho Nam <http://samchon.org>
     */
    var RuntimeError = (function (_super) {
        __extends(RuntimeError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function RuntimeError(message) {
            _super.call(this, message);
        }
        return RuntimeError;
    }(Exception));
    std.RuntimeError = RuntimeError;
    /**
     * <p> Overflow error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to arithmetic overflow errors. </p>
     *
     * <p> It is a standard exception that can be thrown by programs. Some components of the standard library
     * also throw exceptions of this type to signal range errors. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/stdexcept/overflow_error
     * @author Jeongho Nam <http://samchon.org>
     */
    var OverflowError = (function (_super) {
        __extends(OverflowError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function OverflowError(message) {
            _super.call(this, message);
        }
        return OverflowError;
    }(RuntimeError));
    std.OverflowError = OverflowError;
    /**
     * <p> Underflow error exception. </p>
     *
     * <p> This class defines the type of objects thrown as exceptions to arithmetic underflow errors. </p>
     *
     * <p> No component of the standard library throws exceptions of this type. It is designed as a standard
     * exception to be thrown by programs. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/stdexcept/underflow_error
     * @author Jeongho Nam <http://samchon.org>
     */
    var UnderflowError = (function (_super) {
        __extends(UnderflowError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function UnderflowError(message) {
            _super.call(this, message);
        }
        return UnderflowError;
    }(RuntimeError));
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/stdexcept/range_error
     * @author Jeongho Nam <http://samchon.org>
     */
    var RangeError = (function (_super) {
        __extends(RangeError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function RangeError(message) {
            _super.call(this, message);
        }
        return RangeError;
    }(RuntimeError));
    std.RangeError = RangeError;
    /**
     * @hidden
     */
    var terminate_handler = null;
})(std || (std = {}));
/// <reference path="API.ts" />
// Standard Template Library: Function objects
// Function objects are objects specifically designed to be used with a syntax similar to that of functions.
//
// They are typically used as arguments to functions, such as predicates or comparison functions passed to standard algorithms.
//
// @reference http://www.cplusplus.com/reference/functional/
// @author Jeongho Nam <http://samchon.org>
var std;
(function (std) {
    /**
     * <p> Function object class for equality comparison. </p>
     *
     * <p> Binary function object class whose call returns whether its two arguments compare <i>equal</i> (as returned by
     * operator ==). </p>
     *
     * <p> Generically, function objects are instances of a class with member function {@link IComparable.equal_to equal_to}
     * defined. This member function allows the object to be used with the same syntax as a function call. </p>
     *
     * @param x First element to compare.
     * @param y Second element to compare.
     *
     * @return Whether the arguments are equal.
     */
    function equal_to(x, y) {
        if (x instanceof Object) {
            if (x.equals)
                return x.equals(y);
            else
                return x == y;
        }
        else
            return x == y;
    }
    std.equal_to = equal_to;
    /**
     * <p> Function object class for non-equality comparison. </p>
     *
     * <p> Binary function object class whose call returns whether its two arguments compare <i>not equal</i> (as returned
     * by operator operator!=). </p>
     *
     * <p> Generically, function objects are instances of a class with member function {@link IComparable.equal_to equal_to}
     * defined. This member function allows the object to be used with the same syntax as a function call. </p>
     *
     * @param x First element to compare.
     * @param y Second element to compare.
     *
     * @return Whether the arguments are not equal.
     */
    function not_equal_to(x, y) {
        return !std.equal_to(x, y);
    }
    std.not_equal_to = not_equal_to;
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
     * @param x First element, the standard of comparison.
     * @param y Second element compare with the first.
     *
     * @return Whether the first parameter is less than the second.
     */
    function less(x, y) {
        if (x instanceof Object)
            if (x.less != undefined)
                return x.less(y);
            else
                return x.__get_m_iUID() < y.__get_m_iUID();
        else
            return x < y;
    }
    std.less = less;
    /**
     * <p> Function object class for less-than-or-equal-to comparison. </p>
     *
     * <p> Binary function object class whose call returns whether the its first argument compares {@link less less than} or
     * {@link equal_to equal to} the second (as returned by operator <=). </p>
     *
     * <p> Generically, <i>function objects</i> are instances of a class with member function {@link IComparable.less less}
     * and {@link IComparable.equal_to equal_to} defined. This member function allows the object to be used with the same
     * syntax as a function call. </p>
     *
     * @param x First element, the standard of comparison.
     * @param y Second element compare with the first.
     *
     * @return Whether the <i>x</i> is {@link less less than} or {@link equal_to equal to} the <i>y</i>.
     */
    function less_equal(x, y) {
        return std.less(x, y) || std.equal_to(x, y);
    }
    std.less_equal = less_equal;
    /**
     * <p> Function for greater-than inequality comparison. </p>
     *
     * <p> Binary function returns whether the its first argument compares greater than the second. </p>
     *
     * <p> Generically, function objects are instances of a class with member function {@link less} and
     * {@link equal_to equal_to()} defined. If an object doesn't have those methods, then its own uid will be used
     * to compare insteadly. This member function allows the object to be used with the same syntax as a function
     * call. </p>
     *
     * <p> Objects of this class can be used on standard algorithms such as {@link sort sort()},
     * {@link merge merge()} or {@link TreeMap.lower_bound lower_bound()}. </p>
     *
     * @param <T> Type of arguments to compare by the function call. The type shall supporrt the operation
     *			  <i>operator>()</i> or method {@link IComparable.greater greater}.
     *
     * @return Whether the <i>x</i> is greater than the <i>y</i>.
     */
    function greater(x, y) {
        return !std.less_equal(x, y);
    }
    std.greater = greater;
    /**
     * <p> Function object class for greater-than-or-equal-to comparison. </p>
     *
     * <p> Binary function object class whose call returns whether the its first argument compares
     * {@link greater greater than} or {@link equal_to equal to} the second (as returned by operator >=). </p>
     *
     * <p> Generically, function objects are instances of a class with member function {@link IComparable.less less}
     * defined. If an object doesn't have the method, then its own uid will be used to compare insteadly.
     * This member function allows the object to be used with the same syntax as a function call. </p>
     *
     * @param x First element, the standard of comparison.
     * @param y Second element compare with the first.
     *
     * @return Whether the <i>x</i> is {@link greater greater than} or {@link equal_to equal to} the <i>y</i>.
     */
    function greater_equal(x, y) {
        return !std.less(x, y);
    }
    std.greater_equal = greater_equal;
    /**
     * <p> Logical AND function object class. </p>
     *
     * <p> Binary function object class whose call returns the result of the <i>logical "and"</i> operation between its two
     * arguments (as returned by operator &&). </p>
     *
     * <p> Generically, function objects are instances of a class with member function operator() defined. This member
     * function allows the object to be used with the same syntax as a function call. </p>
     *
     * @param x First element.
     * @param y Second element.
     *
     * @return Result of logical AND operation.
     */
    function logical_and(x, y) {
        return x && y;
    }
    std.logical_and = logical_and;
    /**
     * <p> Logical OR function object class. </p>
     *
     * <p> Binary function object class whose call returns the result of the <i>logical "or"</i> operation between its two
     * arguments (as returned by operator ||). </p>
     *
     * <p> Generically, function objects are instances of a class with member function operator() defined. This member
     * function allows the object to be used with the same syntax as a function call. </p>
     *
     * @param x First element.
     * @param y Second element.
     *
     * @return Result of logical OR operation.
     */
    function logical_or(x, y) {
        return x || y;
    }
    std.logical_or = logical_or;
    /**
     * <p> Logical NOT function object class. </p>
     *
     * <p> Unary function object class whose call returns the result of the <i>logical "not"</i> operation on its argument
     * (as returned by operator !). </p>
     *
     * <p> Generically, function objects are instances of a class with member function operator() defined. This member
     * function allows the object to be used with the same syntax as a function call. </p>
     *
     * @param x Target element.
     *
     * @return Result of logical NOT operation.
     */
    function logical_not(x) {
        return !x;
    }
    std.logical_not = logical_not;
    /**
     * <p> Bitwise AND function object class. </p>
     *
     * <p> Binary function object class whose call returns the result of applying the <i>bitwise "and"</i> operation between
     * its two arguments (as returned by operator &). </p>
     *
     * @param x First element.
     * @param y Second element.
     *
     * @return Result of bitwise AND operation.
     */
    function bit_and(x, y) {
        return x & y;
    }
    std.bit_and = bit_and;
    /**
     * <p> Bitwise OR function object class. </p>
     *
     * <p> Binary function object class whose call returns the result of applying the <i>bitwise "and"</i> operation between
     * its two arguments (as returned by operator &). </p>
     *
     * @param x First element.
     * @param y Second element.
     *
     * @return Result of bitwise OR operation.
     */
    function bit_or(x, y) {
        return x | y;
    }
    std.bit_or = bit_or;
    /**
     * <p> Bitwise XOR function object class. </p>
     *
     * <p> Binary function object class whose call returns the result of applying the <i>bitwise "exclusive or"</i>
     * operation between its two arguments (as returned by operator ^). </p>
     *
     * @param x First element.
     * @param y Second element.
     *
     * @return Result of bitwise XOR operation.
     */
    function bit_xor(x, y) {
        return x ^ y;
    }
    std.bit_xor = bit_xor;
    function hash(par) {
        var type = typeof par;
        if (type == "number")
            return hash_of_number(par);
        else if (type == "string")
            return hash_of_string(par);
        else
            return hash_of_object(par);
    }
    std.hash = hash;
    /**
     * @hidden
     */
    function hash_of_number(val) {
        // ------------------------------------------
        //	IN C++
        //		CONSIDER A NUMBER AS A STRING
        //		HASH<STRING>((CHAR*)&VAL, 8)
        // ------------------------------------------
        // CONSTRUCT BUFFER AND BYTE_ARRAY
        var buffer = new ArrayBuffer(8);
        var byteArray = new Int8Array(buffer);
        var valueArray = new Float64Array(buffer);
        valueArray[0] = val;
        var code = 2166136261;
        for (var i = 0; i < byteArray.length; i++) {
            var byte = (byteArray[i] < 0) ? byteArray[i] + 256 : byteArray[i];
            code ^= byte;
            code *= 16777619;
        }
        return Math.abs(code);
    }
    /**
     * @hidden
     */
    function hash_of_string(str) {
        var code = 2166136261;
        for (var i = 0; i < str.length; i++) {
            code ^= str.charCodeAt(i);
            code *= 16777619;
        }
        return Math.abs(code);
    }
    /**
     * @hidden
     */
    function hash_of_object(obj) {
        if (obj.hashCode != undefined)
            return obj.hashCode();
        else
            return hash_of_number(obj.__get_m_iUID());
    }
    /* ---------------------------------------------------------
        UNIQUE ID FOR OBJECTS
    --------------------------------------------------------- */
    // Incremental sequence of unique id for objects.
    /**
     * @hidden
     */
    var __s_iUID;
    if (__s_iUID == undefined)
        __s_iUID = 0;
    if (Object.prototype.hasOwnProperty("__get_m_iUID") == false) {
        Object.defineProperties(Object.prototype, {
            "__get_m_iUID": {
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
    }
    function swap(left, right) {
        left.swap(right);
    }
    std.swap = swap;
})(std || (std = {}));
var std;
(function (std) {
    function bind(fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var this_arg = null;
        var parameters = [];
        var placeholder_count = 0;
        for (var i = 0; i < args.length; i++) {
            if (i == 0 && args[0] instanceof Object && args[0] instanceof std.placeholders.PlaceHolder == false) {
                // retrieve the object; items[0]
                for (var key in args[0])
                    if (args[0][key] == fn) {
                        // found the this_arg
                        this_arg = args[0];
                        break;
                    }
                if (this_arg != null)
                    continue;
            }
            // the placeholder also fills parameters
            if (args[i] instanceof std.placeholders.PlaceHolder)
                placeholder_count++;
            parameters.push(args[i]);
        }
        ////////////////////
        // FUNCTION TO BE RETURNED
        ////////////////////
        var ret = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 0)
                return fn.apply(this_arg, parameters);
            var thisArg = this_arg;
            var argArray = parameters.slice();
            // 1st argument is thisArg?
            if (thisArg == null && (parameters.length == 0 || parameters[0] instanceof std.placeholders.PlaceHolder) && args[0] instanceof Object)
                for (var key in args[0])
                    if (args[0][key] == fn) {
                        thisArg = args[0];
                        argArray.splice(0, 1);
                        //lastIndex++;
                        break;
                    }
            // fill argArray from placeholders
            for (var i = 0; i < argArray.length; i++)
                if (argArray[i] instanceof std.placeholders.PlaceHolder)
                    argArray[i] = args[argArray[i].index - 1];
            // arguments are over the placeholder_count 
            if (args.length > placeholder_count)
                for (var i = placeholder_count; i < args.length; i++)
                    if (i == 0 && (this_arg == null && thisArg != null))
                        continue; // thisArg
                    else
                        argArray.push(args[i]);
            return fn.apply(thisArg, argArray);
        };
        return ret;
    }
    std.bind = bind;
})(std || (std = {}));
/**
 * <p> Bind argument placeholders. </p>
 *
 * <p> This namespace declares an unspecified number of objects: <i>_1</i>, <i>_2</i>, <i>_3</i>, ...</i>, which are
 * used to specify placeholders in calls to function {@link std.bind}. </p>
 *
 * <p> When the function object returned by bind is called, an argument with placeholder {@link _1} is replaced by the
 * first argument in the call, {@link _2} is replaced by the second argument in the call, and so on... For example: </p>
 *
 * <code>
 * let vec: Vector<number> = new Vector<number>();
 *
 * let bind = std.bind(Vector.insert, _1, vec.end(), _2, _3);
 * bind.apply(vec, 5, 1); // vec.insert(vec.end(), 5, 1);
 * // [1, 1, 1, 1, 1]
 * </code>
 *
 * <p> When a call to {@link bind} is used as a subexpression in another call to <i>bind</i>, the {@link placeholders}
 * are relative to the outermost {@link bind} expression. </p>
 *
 * @reference http://www.cplusplus.com/reference/functional/placeholders/
 * @author Jeongho Nam <http://samchon.org>
 */
var std;
(function (std) {
    var placeholders;
    (function (placeholders) {
        /**
         * @hidden
         */
        var PlaceHolder = (function () {
            function PlaceHolder(index) {
                this.index_ = index;
            }
            Object.defineProperty(PlaceHolder.prototype, "index", {
                get: function () {
                    return this.index_;
                },
                enumerable: true,
                configurable: true
            });
            return PlaceHolder;
        }());
        placeholders.PlaceHolder = PlaceHolder;
        /**
         * Replaced by the first argument in the function call.
         */
        placeholders._1 = new PlaceHolder(1);
        /**
         * Replaced by the second argument in the function call.
         */
        placeholders._2 = new PlaceHolder(2);
        /**
         * Replaced by the third argument in the function call.
         */
        placeholders._3 = new PlaceHolder(3);
        placeholders._4 = new PlaceHolder(4);
        placeholders._5 = new PlaceHolder(5);
        placeholders._6 = new PlaceHolder(6);
        placeholders._7 = new PlaceHolder(7);
        placeholders._8 = new PlaceHolder(8);
        placeholders._9 = new PlaceHolder(9);
        placeholders._10 = new PlaceHolder(10);
        placeholders._11 = new PlaceHolder(11);
        placeholders._12 = new PlaceHolder(12);
        placeholders._13 = new PlaceHolder(13);
        placeholders._14 = new PlaceHolder(14);
        placeholders._15 = new PlaceHolder(15);
        placeholders._16 = new PlaceHolder(16);
        placeholders._17 = new PlaceHolder(17);
        placeholders._18 = new PlaceHolder(18);
        placeholders._19 = new PlaceHolder(19);
        placeholders._20 = new PlaceHolder(20);
    })(placeholders = std.placeholders || (std.placeholders = {}));
})(std || (std = {}));
/// <reference path="API.ts" />
/// <reference path="base/UniqueMap.ts" />
/// <reference path="base/MultiMap.ts" />
var std;
(function (std) {
    /**
     * <p> Hashed, unordered map. </p>
     *
     * <p> {@link HashMap}s are associative containers that store elements formed by the combination of a <i>key value</i>
     * and a <i>mapped value</i>, and which allows for fast retrieval of individual elements based on their <i>keys</i>.
     * </p>
     *
     * <p> In an {@link HashMap}, the <i>key value</i> is generally used to uniquely identify the element, while the
     * <i>mapped value</i> is an object with the content associated to this <i>key</i>. Types of <i>key</i> and
     * <i>mapped value</i> may differ. </p>
     *
     * <p> Internally, the elements in the {@link HashMap} are not sorted in any particular order with respect to either
     * their <i>key</i> or <i>mapped values</i>, but organized into <i>buckets</i> depending on their hash values to allow
     * for fast access to individual elements directly by their <i>key values</i> (with a constant average time complexity
     * on average). </p>
     *
     * <p> {@link HashMap} containers are faster than {@link TreeMap} containers to access individual elements by their
     * <i>key</i>, although they are generally less efficient for range iteration through a subset of their elements. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /> </a>
     * </p>
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
     * @param <Key> Type of the key values.
     *				Each element in an {@link HashMap} is uniquely identified by its key value.
     * @param <T> Type of the mapped value.
     *			  Each element in an {@link HashMap} is used to store some data as its mapped value.
     *
     * @reference http://www.cplusplus.com/reference/unordered_map/unordered_map
     * @author Jeongho Nam <http://samchon.org>
     */
    var HashMap = (function (_super) {
        __extends(HashMap, _super);
        function HashMap() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // INIT MEMBERS
            _super.call(this);
            this.hash_buckets_ = new std.base.MapHashBuckets(this);
            // BRANCH - METHOD OVERLOADINGS
            if (args.length == 0) {
            }
            else if (args.length == 1 && args[0] instanceof HashMap) {
                // COPY CONSTRUCTOR
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 1 && args[0] instanceof Array) {
                // INITIALIZER LIST CONSTRUCTOR
                var items = args[0];
                this.rehash(items.length * std.base.Hash.RATIO);
                this.push.apply(this, items);
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // RANGE CONSTRUCTOR
                var first = args[0];
                var last = args[1];
                this.assign(first, last);
            }
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMap.prototype.clear = function () {
            this.hash_buckets_.clear();
            _super.prototype.clear.call(this);
        };
        /* =========================================================
            ACCESSORS
                - MEMBER
                - HASH
        ============================================================
            MEMBER
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMap.prototype.find = function (key) {
            return this.hash_buckets_.find(key);
        };
        HashMap.prototype.begin = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.begin.call(this);
            else
                return this.hash_buckets_.at(index).front();
        };
        HashMap.prototype.end = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.end.call(this);
            else
                return this.hash_buckets_.at(index).back().next();
        };
        HashMap.prototype.rbegin = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.rbegin.call(this);
            else
                return new std.MapReverseIterator(this.end(index));
        };
        HashMap.prototype.rend = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.rend.call(this);
            else
                return new std.MapReverseIterator(this.begin(index));
        };
        /* ---------------------------------------------------------
            HASH
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMap.prototype.bucket_count = function () {
            return this.hash_buckets_.size();
        };
        /**
         * @inheritdoc
         */
        HashMap.prototype.bucket_size = function (index) {
            return this.hash_buckets_.at(index).size();
        };
        HashMap.prototype.max_load_factor = function (z) {
            if (z === void 0) { z = -1; }
            if (z == -1)
                return this.size() / this.bucket_count();
            else
                this.rehash(Math.ceil(this.bucket_count() / z));
        };
        /**
         * @inheritdoc
         */
        HashMap.prototype.bucket = function (key) {
            return std.hash(key) % this.hash_buckets_.size();
        };
        /**
         * @inheritdoc
         */
        HashMap.prototype.reserve = function (n) {
            this.hash_buckets_.rehash(Math.ceil(n * this.max_load_factor()));
        };
        /**
         * @inheritdoc
         */
        HashMap.prototype.rehash = function (n) {
            if (n <= this.bucket_count())
                return;
            this.hash_buckets_.rehash(n);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
                - SWAP
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        HashMap.prototype._Insert_by_pair = function (pair) {
            // TEST WHETHER EXIST
            var it = this.find(pair.first);
            if (it.equals(this.end()) == false)
                return std.make_pair(it, false);
            // INSERT
            this.data_.push_back(pair);
            it = it.prev();
            // POST-PROCESS
            this._Handle_insert(it, it.next());
            return std.make_pair(it, true);
        };
        /**
         * @hidden
         */
        HashMap.prototype._Insert_by_hint = function (hint, pair) {
            // FIND KEY
            if (this.has(pair.first) == true)
                return this.end();
            // INSERT
            var it = this.data_.insert(hint, pair);
            // POST-PROCESS
            this._Handle_insert(it, it.next());
            return it;
        };
        /**
         * @hidden
         */
        HashMap.prototype._Insert_by_range = function (first, last) {
            var my_first = this.end().prev();
            var size = 0;
            // INSERT ELEMENTS
            for (; !first.equals(last); first = first.next()) {
                // TEST WHETER EXIST
                if (this.has(first.value.first))
                    continue;
                // INSERTS
                this.data_.push_back(std.make_pair(first.value.first, first.value.second));
                size++;
            }
            my_first = my_first.next();
            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hash_buckets_.size() * std.base.Hash.MAX_RATIO)
                this.hash_buckets_.rehash((this.size() + size) * std.base.Hash.RATIO);
            // POST-PROCESS
            this._Handle_insert(my_first, this.end());
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMap.prototype._Handle_insert = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this.hash_buckets_.insert(first);
        };
        /**
         * @inheritdoc
         */
        HashMap.prototype._Handle_erase = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this.hash_buckets_.erase(first);
        };
        /**
         * @inheritdoc
         */
        HashMap.prototype.swap = function (obj) {
            if (obj instanceof HashMap) {
                this._Swap(obj);
                _a = [obj.hash_buckets_, this.hash_buckets_], this.hash_buckets_ = _a[0], obj.hash_buckets_ = _a[1];
            }
            else
                _super.prototype.swap.call(this, obj);
            var _a;
        };
        return HashMap;
    }(std.base.UniqueMap));
    std.HashMap = HashMap;
})(std || (std = {}));
/// <reference path="API.ts" />
/// <reference path="base/MultiMap.ts" />
var std;
(function (std) {
    /**
     * <p> Hashed, unordered Multimap. </p>
     *
     * <p> {@link HashMultiMap}s are associative containers that store elements formed by the combination of
     * a <i>key value</i> and a <i>mapped value</i>, much like {@link HashMultiMap} containers, but allowing
     * different elements to have equivalent <i>keys</i>. </p>
     *
     * <p> In an {@link HashMultiMap}, the <i>key value</i> is generally used to uniquely identify the
     * element, while the <i>mapped value</i> is an object with the content associated to this <i>key</i>.
     * Types of <i>key</i> and <i>mapped value</i> may differ. </p>
     *
     * <p> Internally, the elements in the {@link HashMultiMap} are not sorted in any particular order with
     * respect to either their <i>key</i> or <i>mapped values</i>, but organized into <i>buckets</i> depending on
     * their hash values to allow for fast access to individual elements directly by their <i>key values</i>
     * (with a constant average time complexity on average). </p>
     *
     * <p> Elements with equivalent <i>keys</i> are grouped together in the same bucket and in such a way that
     * an iterator can iterate through all of them. Iterators in the container are doubly linked iterators. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /> </a>
     * </p>
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
     * @param <Key> Type of the key values.
     *				Each element in an {@link HashMultiMap} is identified by a key value.
     * @param <T> Type of the mapped value.
     *			  Each element in an {@link HashMultiMap} is used to store some data as its mapped value.
     *
     * @reference http://www.cplusplus.com/reference/unordered_map/unordered_multimap
     * @author Jeongho Nam <http://samchon.org>
     */
    var HashMultiMap = (function (_super) {
        __extends(HashMultiMap, _super);
        function HashMultiMap() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // INIT MEMBERS
            _super.call(this);
            this.hash_buckets_ = new std.base.MapHashBuckets(this);
            // BRANCH - METHOD OVERLOADINGS
            if (args.length == 0) {
            }
            else if (args.length == 1 && args[0] instanceof HashMultiMap) {
                // COPY CONSTRUCTOR
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 1 && args[0] instanceof Array) {
                // INITIALIZER LIST CONSTRUCTOR
                var items = args[0];
                this.rehash(items.length * std.base.Hash.RATIO);
                this.push.apply(this, items);
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // RANGE CONSTRUCTOR
                var first = args[0];
                var last = args[1];
                this.assign(first, last);
            }
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.clear = function () {
            this.hash_buckets_.clear();
            _super.prototype.clear.call(this);
        };
        /* =========================================================
            ACCESSORS
                - MEMBER
                - HASH
        ============================================================
            MEMBER
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.find = function (key) {
            return this.hash_buckets_.find(key);
        };
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.count = function (key) {
            // FIND MATCHED BUCKET
            var index = std.hash(key) % this.hash_buckets_.item_size();
            var bucket = this.hash_buckets_.at(index);
            // ITERATE THE BUCKET
            var cnt = 0;
            for (var i = 0; i < bucket.length; i++)
                if (std.equal_to(bucket[i].first, key))
                    cnt++;
            return cnt;
        };
        HashMultiMap.prototype.begin = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.begin.call(this);
            else
                return this.hash_buckets_.at(index).front();
        };
        HashMultiMap.prototype.end = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.end.call(this);
            else
                return this.hash_buckets_.at(index).back().next();
        };
        HashMultiMap.prototype.rbegin = function (index) {
            if (index === void 0) { index = -1; }
            return new std.MapReverseIterator(this.end(index));
        };
        HashMultiMap.prototype.rend = function (index) {
            if (index === void 0) { index = -1; }
            return new std.MapReverseIterator(this.begin(index));
        };
        /* ---------------------------------------------------------
            HASH
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.bucket_count = function () {
            return this.hash_buckets_.size();
        };
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.bucket_size = function (n) {
            return this.hash_buckets_.at(n).size();
        };
        HashMultiMap.prototype.max_load_factor = function (z) {
            if (z === void 0) { z = -1; }
            if (z == -1)
                return this.size() / this.bucket_count();
            else
                this.rehash(Math.ceil(this.bucket_count() / z));
        };
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.bucket = function (key) {
            return std.hash(key) % this.hash_buckets_.size();
        };
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.reserve = function (n) {
            this.hash_buckets_.rehash(Math.ceil(n * this.max_load_factor()));
        };
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.rehash = function (n) {
            if (n <= this.bucket_count())
                return;
            this.hash_buckets_.rehash(n);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
                - SWAP
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        HashMultiMap.prototype._Insert_by_pair = function (pair) {
            // INSERT
            var it = this.data_.insert(this.data_.end(), pair);
            this._Handle_insert(it, it.next()); // POST-PROCESS
            return it;
        };
        /**
         * @hidden
         */
        HashMultiMap.prototype._Insert_by_hint = function (hint, pair) {
            // INSERT
            var it = this.data_.insert(hint, pair);
            // POST-PROCESS
            this._Handle_insert(it, it.next());
            return it;
        };
        /**
         * @hidden
         */
        HashMultiMap.prototype._Insert_by_range = function (first, last) {
            // INSERT ELEMENTS
            var my_first = this.data_.insert(this.data_.end(), first, last);
            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() > this.hash_buckets_.item_size() * std.base.Hash.MAX_RATIO)
                this.hash_buckets_.rehash(this.size() * std.base.Hash.RATIO);
            // POST-PROCESS
            this._Handle_insert(my_first, this.end());
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype._Handle_insert = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this.hash_buckets_.insert(first);
        };
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype._Handle_erase = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this.hash_buckets_.erase(first);
        };
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.swap = function (obj) {
            if (obj instanceof HashMultiMap) {
                this._Swap(obj);
                _a = [obj.hash_buckets_, this.hash_buckets_], this.hash_buckets_ = _a[0], obj.hash_buckets_ = _a[1];
            }
            else
                _super.prototype.swap.call(this, obj);
            var _a;
        };
        return HashMultiMap;
    }(std.base.MultiMap));
    std.HashMultiMap = HashMultiMap;
})(std || (std = {}));
/// <reference path="API.ts" />
/// <reference path="base/MultiSet.ts" />
var std;
(function (std) {
    /**
     * <p> Hashed, unordered Multiset. </p>
     *
     * <p> {@link HashMultiSet HashMultiSets} are containers that store elements in no particular order, allowing fast
     * retrieval of individual elements based on their value, much like {@link HashMultiSet} containers,
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/set_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/set_containers.png" style="max-width: 100%" /></a> </p>
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
     * @param <T> Type of the elements.
     *		   Each element in an {@link UnorderedMultiSet} is also identified by this value..
     *
     * @reference http://www.cplusplus.com/reference/unordered_set/unordered_multiset
     * @author Jeongho Nam <http://samchon.org>
     */
    var HashMultiSet = (function (_super) {
        __extends(HashMultiSet, _super);
        function HashMultiSet() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // INIT MEMBERS
            _super.call(this);
            /**
             * @hidden
             */
            this.hash_buckets_ = new std.base.SetHashBuckets(this);
            this.hash_buckets_ = new std.base.SetHashBuckets(this);
            // BRANCH - METHOD OVERLOADINGS
            if (args.length == 0) {
            }
            else if (args.length == 1 && args[0] instanceof HashMultiSet) {
                // COPY CONSTRUCTOR
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 1 && args[0] instanceof Array) {
                // INITIALIZER LIST CONSTRUCTOR
                var items = args[0];
                this.rehash(items.length * std.base.Hash.RATIO);
                this.push.apply(this, items);
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // RANGE CONSTRUCTOR
                var first = args[0];
                var last = args[1];
                this.assign(first, last);
            }
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.clear = function () {
            this.hash_buckets_.clear();
            _super.prototype.clear.call(this);
        };
        /* =========================================================
            ACCESSORS
                - MEMBER
                - HASH
        ============================================================
            MEMBER
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.find = function (key) {
            return this.hash_buckets_.find(key);
        };
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.count = function (key) {
            // FIND MATCHED BUCKET
            var index = std.hash(key) % this.hash_buckets_.item_size();
            var bucket = this.hash_buckets_.at(index);
            // ITERATE THE BUCKET
            var cnt = 0;
            for (var i = 0; i < bucket.length; i++)
                if (std.equal_to(bucket[i].value, key))
                    cnt++;
            return cnt;
        };
        HashMultiSet.prototype.begin = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.begin.call(this);
            else
                return this.hash_buckets_.at(index).front();
        };
        HashMultiSet.prototype.end = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.end.call(this);
            else
                return this.hash_buckets_.at(index).back().next();
        };
        HashMultiSet.prototype.rbegin = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.rbegin.call(this);
            else
                return new std.SetReverseIterator(this.end(index));
        };
        HashMultiSet.prototype.rend = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.rend.call(this);
            else
                return new std.SetReverseIterator(this.begin(index));
        };
        /* ---------------------------------------------------------
            HASH
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.bucket_count = function () {
            return this.hash_buckets_.size();
        };
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.bucket_size = function (n) {
            return this.hash_buckets_.at(n).size();
        };
        HashMultiSet.prototype.max_load_factor = function (z) {
            if (z === void 0) { z = -1; }
            if (z == -1)
                return this.size() / this.bucket_count();
            else
                this.rehash(Math.ceil(this.bucket_count() / z));
        };
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.bucket = function (key) {
            return std.hash(key) % this.hash_buckets_.size();
        };
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.reserve = function (n) {
            this.hash_buckets_.rehash(Math.ceil(n * this.max_load_factor()));
        };
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.rehash = function (n) {
            if (n <= this.bucket_count())
                return;
            this.hash_buckets_.rehash(n);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
                - SWAP
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        HashMultiSet.prototype._Insert_by_val = function (val) {
            // INSERT
            var it = this.data_.insert(this.data_.end(), val);
            this._Handle_insert(it, it.next()); // POST-PROCESS
            return it;
        };
        /**
         * @hidden
         */
        HashMultiSet.prototype._Insert_by_hint = function (hint, val) {
            // INSERT
            var it = this.data_.insert(hint, val);
            // POST-PROCESS
            this._Handle_insert(it, it.next());
            return it;
        };
        /**
         * @hidden
         */
        HashMultiSet.prototype._Insert_by_range = function (first, last) {
            // INSERT ELEMENTS
            var my_first = this.data_.insert(this.data_.end(), first, last);
            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() > this.hash_buckets_.item_size() * std.base.Hash.MAX_RATIO)
                this.hash_buckets_.rehash(this.size() * std.base.Hash.RATIO);
            // POST-PROCESS
            this._Handle_insert(my_first, this.end());
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype._Handle_insert = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this.hash_buckets_.insert(first);
        };
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype._Handle_erase = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this.hash_buckets_.erase(first);
        };
        HashMultiSet.prototype.swap = function (obj) {
            if (obj instanceof HashMultiSet) {
                this._Swap(obj);
                _a = [obj.hash_buckets_, this.hash_buckets_], this.hash_buckets_ = _a[0], obj.hash_buckets_ = _a[1];
            }
            else
                _super.prototype.swap.call(this, obj);
            var _a;
        };
        return HashMultiSet;
    }(std.base.MultiSet));
    std.HashMultiSet = HashMultiSet;
})(std || (std = {}));
/// <reference path="API.ts" />
/// <reference path="base/UniqueSet.ts" />
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/set_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/set_containers.png" style="max-width: 100%" /></a> </p>
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
     * @param <T> Type of the elements.
     *			  Each element in an {@link HashSet} is also uniquely identified by this value.
     *
     * @reference http://www.cplusplus.com/reference/unordered_set/unordered_set
     * @author Jeongho Nam <http://samchon.org>
     */
    var HashSet = (function (_super) {
        __extends(HashSet, _super);
        function HashSet() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // INIT MEMBERS
            _super.call(this);
            /**
             * @hidden
             */
            this.hash_buckets_ = new std.base.SetHashBuckets(this);
            this.hash_buckets_ = new std.base.SetHashBuckets(this);
            // BRANCH - METHOD OVERLOADINGS
            if (args.length == 0) {
            }
            else if (args.length == 1 && args[0] instanceof HashSet) {
                // COPY CONSTRUCTOR
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 1 && args[0] instanceof Array) {
                // INITIALIZER LIST CONSTRUCTOR
                var items = args[0];
                this.rehash(items.length * std.base.Hash.RATIO);
                this.push.apply(this, items);
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // RANGE CONSTRUCTOR
                var first = args[0];
                var last = args[1];
                this.assign(first, last);
            }
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashSet.prototype.clear = function () {
            this.hash_buckets_.clear();
            _super.prototype.clear.call(this);
        };
        /* =========================================================
            ACCESSORS
                - MEMBER
                - HASH
        ============================================================
            MEMBER
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashSet.prototype.find = function (key) {
            return this.hash_buckets_.find(key);
        };
        HashSet.prototype.begin = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.begin.call(this);
            else
                return this.hash_buckets_.at(index).front();
        };
        HashSet.prototype.end = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.end.call(this);
            else
                return this.hash_buckets_.at(index).back().next();
        };
        HashSet.prototype.rbegin = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.rbegin.call(this);
            else
                return new std.SetReverseIterator(this.end(index));
        };
        HashSet.prototype.rend = function (index) {
            if (index === void 0) { index = -1; }
            if (index == -1)
                return _super.prototype.rend.call(this);
            else
                return new std.SetReverseIterator(this.begin(index));
        };
        /* ---------------------------------------------------------
            HASH
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashSet.prototype.bucket_count = function () {
            return this.hash_buckets_.size();
        };
        /**
         * @inheritdoc
         */
        HashSet.prototype.bucket_size = function (n) {
            return this.hash_buckets_.at(n).size();
        };
        HashSet.prototype.max_load_factor = function (z) {
            if (z === void 0) { z = -1; }
            if (z == -1)
                return this.size() / this.bucket_count();
            else
                this.rehash(Math.ceil(this.bucket_count() / z));
        };
        /**
         * @inheritdoc
         */
        HashSet.prototype.bucket = function (key) {
            return std.hash(key) % this.hash_buckets_.size();
        };
        /**
         * @inheritdoc
         */
        HashSet.prototype.reserve = function (n) {
            this.hash_buckets_.rehash(Math.ceil(n * this.max_load_factor()));
        };
        /**
         * @inheritdoc
         */
        HashSet.prototype.rehash = function (n) {
            if (n <= this.bucket_count())
                return;
            this.hash_buckets_.rehash(n);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
                - SWAP
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        HashSet.prototype._Insert_by_val = function (val) {
            // TEST WHETHER EXIST
            var it = this.find(val);
            if (it.equals(this.end()) == false)
                return std.make_pair(it, false);
            // INSERT
            this.data_.push_back(val);
            it = it.prev();
            // POST-PROCESS
            this._Handle_insert(it, it.next());
            return std.make_pair(it, true);
        };
        /**
         * @hidden
         */
        HashSet.prototype._Insert_by_hint = function (hint, val) {
            // FIND KEY
            if (this.has(val) == true)
                return this.end();
            // INSERT
            var it = this.data_.insert(hint, val);
            // POST-PROCESS
            this._Handle_insert(it, it.next());
            return it;
        };
        /**
         * @hidden
         */
        HashSet.prototype._Insert_by_range = function (first, last) {
            var my_first = this.end().prev();
            var size = 0;
            for (; !first.equals(last); first = first.next()) {
                // TEST WHETER EXIST
                if (this.has(first.value))
                    continue;
                // INSERTS
                this.data_.push_back(first.value);
                size++;
            }
            my_first = my_first.next();
            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hash_buckets_.size() * std.base.Hash.MAX_RATIO)
                this.hash_buckets_.rehash((this.size() + size) * std.base.Hash.RATIO);
            // INSERTS
            this._Handle_insert(my_first, this.end());
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashSet.prototype._Handle_insert = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this.hash_buckets_.insert(first);
        };
        /**
         * @inheritdoc
         */
        HashSet.prototype._Handle_erase = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this.hash_buckets_.erase(first);
        };
        HashSet.prototype.swap = function (obj) {
            if (obj instanceof HashSet) {
                this._Swap(obj);
                _a = [obj.hash_buckets_, this.hash_buckets_], this.hash_buckets_ = _a[0], obj.hash_buckets_ = _a[1];
            }
            else
                _super.prototype.swap.call(this, obj);
            var _a;
        };
        return HashSet;
    }(std.base.UniqueSet));
    std.HashSet = HashSet;
})(std || (std = {}));
/// <reference path="API.ts" />
/// <reference path="base/ListContainer.ts" />
var std;
(function (std) {
    /**
     * <p> Doubly linked list. </p>
     *
     * <p> {@link List}s are sequence containers that allow constant time insert and erase operations anywhere within the
     * sequence, and iteration in both directions. </p>
     *
     * <p> List containers are implemented as doubly-linked lists; Doubly linked lists can store each of the elements they
     * contain in different and unrelated storage locations. The ordering is kept internally by the association to each
     * element of a link to the element preceding it and a link to the element following it. </p>
     *
     * <p> Compared to other base standard sequence containers (array, vector and deque), lists perform generally better
     * in inserting, extracting and moving elements in any position within the container for which an iterator has already
     * been obtained, and therefore also in algorithms that make intensive use of these, like sorting algorithms. </p>
     *
     * <p> The main drawback of lists and forward_lists compared to these other sequence containers is that they lack
     * direct access to the elements by their position; For example, to access the sixth element in a list, one has to
     * iterate from a known position (like the beginning or the end) to that position, which takes linear time in the
     * distance between these. They also consume some extra memory to keep the linking information associated to each
     * element (which may be an important factor for large lists of small-sized elements). </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /></a>
     * </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     * 	<dt> Sequence </dt>
     * 	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are accessed by
     *		 their position in this sequence. </dd>
     *
     * 	<dt> Doubly-linked list </dt>
     *	<dd> Each element keeps information on how to locate the next and the previous elements, allowing constant time
     *		 insert and erase operations before or after a specific element (even of entire ranges), but no direct random
     *		 access. </dd>
     * </dl>
     *
     * @param <T> Type of the elements.
     *
     * @reference http://www.cplusplus.com/reference/list/list/
     * @author Jeongho Nam <http://samchon.org>
     */
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            // BRANCHES
            if (args.length == 0) {
            }
            else if (args.length == 1 && args[0] instanceof Array) {
                var array = args[0];
                this.push.apply(this, array);
            }
            else if (args.length == 1 && (args[0] instanceof List)) {
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin_3 = args[0];
                var end_3 = args[1];
                this.assign(begin_3, end_3);
            }
            else if (args.length == 2 && typeof args[0] == "number") {
                var size = args[0];
                var val = args[1];
                this.assign(size, val);
            }
        }
        /**
         * @hidden
         */
        List.prototype._Create_iterator = function (prev, next, val) {
            return new std.ListIterator(this, prev, next, val);
        };
        /**
         * @hidden
         */
        List.prototype._Set_begin = function (it) {
            _super.prototype._Set_begin.call(this, it);
            this.rend_ = new std.ListReverseIterator(it);
        };
        List.prototype.assign = function (par1, par2) {
            this.clear();
            this.insert(this.end(), par1, par2);
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        List.prototype.rbegin = function () {
            return new std.ListReverseIterator(this.end());
        };
        /**
         * @inheritdoc
         */
        List.prototype.rend = function () {
            return this.rend_;
        };
        /**
         * @inheritdoc
         */
        List.prototype.front = function () {
            return this.begin().value;
        };
        /**
         * @inheritdoc
         */
        List.prototype.back = function () {
            return this.end().prev().value;
        };
        List.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // REVERSE_ITERATOR TO ITERATOR
            var ret;
            var is_reverse_iterator = false;
            if (args[0] instanceof std.ListReverseIterator) {
                is_reverse_iterator = true;
                args[0] = args[0].base().prev();
            }
            // BRANCHES
            if (args.length == 2)
                ret = this._Insert_by_repeating_val(args[0], 1, args[1]);
            else if (args.length == 3 && typeof args[1] == "number")
                ret = this._Insert_by_repeating_val(args[0], args[1], args[2]);
            else
                ret = this._Insert_by_range(args[0], args[1], args[2]);
            // RETURNS
            if (is_reverse_iterator == true)
                return new std.ListReverseIterator(ret.next());
            else
                return ret;
        };
        List.prototype.erase = function (first, last) {
            if (last === void 0) { last = first.next(); }
            var ret;
            var is_reverse_iterator = false;
            // REVERSE ITERATOR TO ITERATOR
            if (first instanceof std.ListReverseIterator) {
                is_reverse_iterator = true;
                var first_it = last.base();
                var last_it = first.base();
                first = first_it;
                last = last_it;
            }
            // ERASE ELEMENTS
            ret = this._Erase_by_range(first, last);
            // RETURN BRANCHES
            if (is_reverse_iterator == true)
                return new std.ListReverseIterator(ret.next());
            else
                return ret;
        };
        List.prototype.unique = function (binary_pred) {
            if (binary_pred === void 0) { binary_pred = std.equal_to; }
            var it = this.begin().next();
            while (!it.equals(this.end())) {
                if (std.equal_to(it.value, it.prev().value) == true)
                    it = this.erase(it);
                else
                    it = it.next();
            }
        };
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
        List.prototype.remove = function (val) {
            var it = this.begin();
            while (!it.equals(this.end())) {
                if (std.equal_to(it.value, val) == true)
                    it = this.erase(it);
                else
                    it = it.next();
            }
        };
        /**
         * <p> Remove elements fulfilling condition. </p>
         *
         * <p> Removes from the container all the elements for which <i>pred</i> returns <code>true</code>. This
         * calls the destructor of these objects and reduces the container {@link size} by the number of elements
         * removed. </p>
         *
         * <p> The function calls <code>pred(it.value)</code> for each element (where <code>it</code> is an iterator
         * to that element). Any of the elements in the list for which this returns <code>true</code>, are removed
         * from the  </p>
         *
         * @param pred Unary predicate that, taking a value of the same type as those contained in the forward_list
         *			   object, returns <code>true</code> for those values to be removed from the container, and
         *			   <code>false</code> for those remaining. This can either be a function pointer or a function
         *			   object.
         */
        List.prototype.remove_if = function (pred) {
            var it = this.begin();
            while (!it.equals(this.end())) {
                if (pred(it.value) == true)
                    it = this.erase(it);
                else
                    it = it.next();
            }
        };
        List.prototype.merge = function (obj, compare) {
            if (compare === void 0) { compare = std.less; }
            if (this == obj)
                return;
            var it = this.begin();
            while (obj.empty() == false) {
                var begin_4 = obj.begin();
                while (!it.equals(this.end()) && compare(it.value, begin_4.value) == true)
                    it = it.next();
                this.splice(it, obj, begin_4);
            }
        };
        List.prototype.splice = function (position, obj, begin, end) {
            if (begin === void 0) { begin = null; }
            if (end === void 0) { end = null; }
            if (begin == null) {
                begin = obj.begin();
                end = obj.end();
            }
            else if (end == null) {
                end = begin.next();
            }
            this.insert(position, begin, end);
            obj.erase(begin, end);
        };
        List.prototype.sort = function (compare) {
            if (compare === void 0) { compare = std.less; }
            this.qsort(this.begin(), this.end().prev(), compare);
        };
        /**
         * @hidden
         */
        List.prototype.qsort = function (first, last, compare) {
            if (first != last && last != this.end() && first != last.next()) {
                var temp = this.partition(first, last, compare);
                this.qsort(first, temp.prev(), compare);
                this.qsort(temp.next(), last, compare);
            }
        };
        /**
         * @hidden
         */
        List.prototype.partition = function (first, last, compare) {
            var standard = last.value; // TO BE COMPARED
            var prev = first.prev(); // TO BE SMALLEST
            var it = first;
            for (; it != last; it = it.next())
                if (compare(it.value, standard)) {
                    prev = (prev == this.end()) ? first : prev.next();
                    _a = [it.value, prev.value], prev.value = _a[0], it.value = _a[1];
                }
            prev = (prev == this.end()) ? first : prev.next();
            _b = [it.value, prev.value], prev.value = _b[0], it.value = _b[1];
            return prev;
            var _a, _b;
        };
        List.prototype.swap = function (obj) {
            _super.prototype.swap.call(this, obj);
        };
        return List;
    }(std.base.ListContainer));
    std.List = List;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> An iterator, node of a List. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /></a>
     * </p>
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var ListIterator = (function (_super) {
        __extends(ListIterator, _super);
        /* ---------------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------------- */
        /**
         * Initializer Constructor.
         *
         * #### Note
         * Do not create the iterator directly, by yourself.
         *
         * Use {@link List.begin begin()}, {@link List.end end()} in {@link List container} instead.
         *
         * @param source The source {@link List container} to reference.
         * @param prev A refenrece of previous node ({@link ListIterator iterator}).
         * @param next A refenrece of next node ({@link ListIterator iterator}).
         * @param value Value to be stored in the node (iterator).
         */
        function ListIterator(source, prev, next, value) {
            _super.call(this, source, prev, next, value);
        }
        /* ---------------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        ListIterator.prototype.prev = function () {
            return this.prev_;
        };
        /**
         * @inheritdoc
         */
        ListIterator.prototype.next = function () {
            return this.next_;
        };
        /**
         * @inheritdoc
         */
        ListIterator.prototype.advance = function (step) {
            return _super.prototype.advance.call(this, step);
        };
        Object.defineProperty(ListIterator.prototype, "value", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.value_;
            },
            /**
             * Set value of the iterator is pointing to.
             *
             * @param val Value to set.
             */
            set: function (val) {
                this.value_ = val;
            },
            enumerable: true,
            configurable: true
        });
        /* ---------------------------------------------------------------
            COMPARISON
        --------------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        ListIterator.prototype.equals = function (obj) {
            return this == obj;
        };
        /**
         * @inheritdoc
         */
        ListIterator.prototype.swap = function (obj) {
            _super.prototype.swap.call(this, obj);
        };
        return ListIterator;
    }(std.base.ListIteratorBase));
    std.ListIterator = ListIterator;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> A reverse-iterator of List. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" /></a>
     * </p>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var ListReverseIterator = (function (_super) {
        __extends(ListReverseIterator, _super);
        /* ---------------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------------- */
        /**
         * Construct from base iterator.
         *
         * @param base A reference of the base iterator, which iterates in the opposite direction.
         */
        function ListReverseIterator(base) {
            _super.call(this, base);
        }
        /**
         * @hidden
         */
        ListReverseIterator.prototype._Create_neighbor = function (base) {
            return new ListReverseIterator(base);
        };
        Object.defineProperty(ListReverseIterator.prototype, "value", {
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            get: function () {
                return this.base_.value;
            },
            /**
             * Set value of the iterator is pointing to.
             *
             * @param val Value to set.
             */
            set: function (val) {
                this.base_.value = val;
            },
            enumerable: true,
            configurable: true
        });
        return ListReverseIterator;
    }(std.ReverseIterator));
    std.ListReverseIterator = ListReverseIterator;
})(std || (std = {}));
/// <reference path="API.ts" />
/// <reference path="Iterator.ts" />
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
     * @reference http://www.cplusplus.com/reference/vector/vector
     * @author Jeongho Nam <http://samchon.org>
     */
    var Vector = (function (_super) {
        __extends(Vector, _super);
        function Vector() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            // RESERVED ITERATORS
            this.end_ = new std.VectorIterator(this, -1);
            this.rend_ = new std.VectorReverseIterator(new std.VectorIterator(this, 0));
            // CONSTRUCTORS BRANCH
            if (args.length == 0) {
            }
            else if (args.length == 1 && args[0] instanceof Array) {
                // CONSTRUCT FROM AN ARRAY OF ITEMS
                var array = args[0];
                _super.prototype.push.apply(this, array);
            }
            else if (args.length == 1 && typeof args[0] == "number") {
                // CONSTRUCT FROM SIZE
                var size = args[0];
                this.length = size;
            }
            else if (args.length == 2 && typeof args[0] == "number") {
                // CONSTRUCT FROM SIZE AND REPEATING VALUE
                var size = args[0];
                var val = args[1];
                this.assign(size, val);
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // CONSTRUCT FROM INPUT ITERATORS
                var begin_5 = args[0];
                var end_4 = args[1];
                this.assign(begin_5, end_4);
            }
        }
        Vector.prototype.assign = function (first, second) {
            this.clear();
            this.insert(this.end(), first, second);
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.reserve = function (size) {
            // NOTHING TO DO ESPECIALLY
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.clear = function () {
            this.erase(this.begin(), this.end());
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        Vector.prototype.begin = function () {
            if (this.empty() == true)
                return this.end_;
            else
                return new std.VectorIterator(this, 0);
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.end = function () {
            return this.end_;
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.rbegin = function () {
            return new std.VectorReverseIterator(this.end_);
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.rend = function () {
            if (this.empty() == true)
                return new std.VectorReverseIterator(this.end_);
            else
                return this.rend_;
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.size = function () {
            return this.length;
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.capacity = function () {
            return this.length;
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.empty = function () {
            return this.length == 0;
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.at = function (index) {
            if (index < this.size())
                return this[index];
            else
                throw new std.OutOfRange("Target index is greater than Vector's size.");
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.set = function (index, val) {
            if (index >= this.length)
                throw new std.OutOfRange("Target index is greater than Vector's size.");
            var prev = this[index];
            this[index] = val;
            return prev;
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.front = function () {
            return this.at(0);
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.back = function () {
            return this.at(this.length - 1);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - ERASE
                - SWAP
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        Vector.prototype.push_back = function (val) {
            _super.prototype.push.call(this, val);
        };
        Vector.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // REVERSE_ITERATOR TO ITERATOR
            var ret;
            var is_reverse_iterator = false;
            if (args[0] instanceof std.VectorReverseIterator) {
                is_reverse_iterator = true;
                args[0] = args[0].base().prev();
            }
            // BRANCHES
            if (args.length == 2)
                ret = this.insert_by_val(args[0], args[1]);
            else if (args.length == 3 && typeof args[1] == "number")
                ret = this._Insert_by_repeating_val(args[0], args[1], args[2]);
            else
                ret = this._Insert_by_range(args[0], args[1], args[2]);
            // RETURNS
            if (is_reverse_iterator == true)
                return new std.VectorReverseIterator(ret.next());
            else
                return ret;
        };
        /**
         * @hidden
         */
        Vector.prototype.insert_by_val = function (position, val) {
            return this._Insert_by_repeating_val(position, 1, val);
        };
        /**
         * @hidden
         */
        Vector.prototype._Insert_by_repeating_val = function (position, n, val) {
            if (position.index == -1) {
                // WHEN INSERT TO THE LAST
                for (var i = 0; i < n; i++)
                    _super.prototype.push.call(this, val);
                return this.begin();
            }
            else {
                ///////
                // INSERT TO THE MIDDLE POSITION
                ///////
                // CUT RIGHT SIDE
                var spliced_array = _super.prototype.splice.call(this, position.index);
                var insert_size = 0;
                // INSERT ELEMENTS
                for (var i = 0; i < n; i++) {
                    _super.prototype.push.call(this, val);
                    insert_size++;
                }
                _super.prototype.push.apply(this, spliced_array); // CONCAT THE SPLICEDS
                return position;
            }
        };
        /**
         * @hidden
         */
        Vector.prototype._Insert_by_range = function (position, first, last) {
            if (position.index == -1) {
                // WHEN INSERT TO THE LAST
                for (; !first.equals(last); first = first.next())
                    _super.prototype.push.call(this, first.value);
                return this.begin();
            }
            else {
                ///////
                // INSERT TO THE MIDDLE POSITION
                ///////
                // CUT RIGHT SIDE
                var spliced_array = _super.prototype.splice.call(this, position.index);
                var insert_size = 0;
                // INSERT ELEMENTS
                for (; !first.equals(last); first = first.next()) {
                    _super.prototype.push.call(this, first.value);
                    insert_size++;
                }
                _super.prototype.push.apply(this, spliced_array); // CONCAT THE SPLICEDS
                return position;
            }
        };
        /* ---------------------------------------------------------
            ERASE
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        Vector.prototype.pop_back = function () {
            this.erase(this.end().prev());
        };
        Vector.prototype.erase = function (first, last) {
            if (last === void 0) { last = first.next(); }
            var ret;
            var is_reverse_iterator = false;
            // REVERSE_ITERATOR TO ITERATOR
            if (first instanceof std.VectorReverseIterator) {
                is_reverse_iterator = true;
                var first_it = last.base();
                var last_it = first.base();
                first = first_it;
                last = last_it;
            }
            // ERASE ELEMENTS
            ret = this._Erase_by_range(first, last);
            // RETURN BRANCHES
            if (is_reverse_iterator == true)
                return new std.VectorReverseIterator(ret.next());
            else
                return ret;
        };
        /**
         * @hidden
         */
        Vector.prototype._Erase_by_range = function (first, last) {
            if (first.index == -1)
                return first;
            // ERASE ELEMENTS
            if (last.index == -1) {
                _super.prototype.splice.call(this, first.index);
                return this.end();
            }
            else
                _super.prototype.splice.call(this, first.index, last.index - first.index);
            return first;
        };
        Vector.prototype.swap = function (obj) {
            var supplement = new Vector(this.begin(), this.end());
            this.assign(obj.begin(), obj.end());
            obj.assign(supplement.begin(), supplement.end());
        };
        return Vector;
    }(Array));
    std.Vector = Vector;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> An iterator of Vector. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" />
     * </p>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var VectorIterator = (function (_super) {
        __extends(VectorIterator, _super);
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
        function VectorIterator(source, index) {
            _super.call(this, source);
            this.index_ = index;
        }
        Object.defineProperty(VectorIterator.prototype, "vector", {
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * @hidden
             */
            get: function () {
                return this.source_;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VectorIterator.prototype, "value", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.vector.at(this.index_);
            },
            /**
             * Set value of the iterator is pointing to.
             *
             * @param val Value to set.
             */
            set: function (val) {
                this.vector.set(this.index_, val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VectorIterator.prototype, "index", {
            /**
             * Get index.
             */
            get: function () {
                return this.index_;
            },
            enumerable: true,
            configurable: true
        });
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        VectorIterator.prototype.prev = function () {
            if (this.index_ == -1)
                return new VectorIterator(this.vector, this.vector.size() - 1);
            else if (this.index_ - 1 < 0)
                return this.vector.end();
            else
                return new VectorIterator(this.vector, this.index_ - 1);
        };
        /**
         * @inheritdoc
         */
        VectorIterator.prototype.next = function () {
            if (this.index_ >= this.source_.size() - 1)
                return this.vector.end();
            else
                return new VectorIterator(this.vector, this.index_ + 1);
        };
        /**
         * @inheritdoc
         */
        VectorIterator.prototype.advance = function (n) {
            var new_index;
            if (n < 0 && this.index_ == -1)
                new_index = this.vector.size() + n;
            else
                new_index = this.index_ + n;
            if (new_index < 0 || new_index >= this.vector.size())
                return this.vector.end();
            else
                return new VectorIterator(this.vector, new_index);
        };
        /* ---------------------------------------------------------
            COMPARES
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        VectorIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.index_ == obj.index_;
        };
        /**
         * @inheritdoc
         */
        VectorIterator.prototype.swap = function (obj) {
            _a = [obj.value, this.value], this.value = _a[0], obj.value = _a[1];
            var _a;
        };
        VectorIterator.prototype.toString = function () {
            return this.index_;
        };
        return VectorIterator;
    }(std.Iterator));
    std.VectorIterator = VectorIterator;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> A reverse-iterator of Vector. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/linear_containers.png" style="max-width: 100%" />
     * </p>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam <http://samchon.org>
     */
    var VectorReverseIterator = (function (_super) {
        __extends(VectorReverseIterator, _super);
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from base iterator.
         *
         * @param base A reference of the base iterator, which iterates in the opposite direction.
         */
        function VectorReverseIterator(base) {
            _super.call(this, base);
        }
        /**
         * @hidden
         */
        VectorReverseIterator.prototype._Create_neighbor = function (base) {
            return new VectorReverseIterator(base);
        };
        Object.defineProperty(VectorReverseIterator.prototype, "value", {
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            get: function () {
                return this.base_.value;
            },
            /**
             * Set value of the iterator is pointing to.
             *
             * @param val Value to set.
             */
            set: function (val) {
                this.base_.value = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VectorReverseIterator.prototype, "index", {
            /**
             * Get index.
             */
            get: function () {
                return this.base_.index;
            },
            enumerable: true,
            configurable: true
        });
        return VectorReverseIterator;
    }(std.ReverseIterator));
    std.VectorReverseIterator = VectorReverseIterator;
})(std || (std = {}));
/// <reference path="API.ts" />
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/linear_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/linear_containers.png" style="max-width: 100%" /></a>
     * </p>
     *
     * @param <T> Type of elements.
     *
     * @reference http://www.cplusplus.com/reference/queue/queue
     * @author Jeongho Nam <http://samchon.org>
     */
    var Queue = (function () {
        function Queue(queue) {
            if (queue === void 0) { queue = null; }
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
        Queue.prototype.size = function () {
            return this.container_.size();
        };
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
        Queue.prototype.empty = function () {
            return this.container_.empty();
        };
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
        Queue.prototype.front = function () {
            return this.container_.front();
        };
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
        Queue.prototype.back = function () {
            return this.container_.back();
        };
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
        Queue.prototype.push = function (val) {
            this.container_.push_back(val);
        };
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
        Queue.prototype.pop = function () {
            this.container_.pop_front();
        };
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
        Queue.prototype.swap = function (obj) {
            this.container_.swap(obj.container_);
        };
        return Queue;
    }());
    std.Queue = Queue;
})(std || (std = {}));
/// <reference path="API.ts" />
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
    var PriorityQueue = (function () {
        function PriorityQueue() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // INIT MEMBER
            this.container_ = new std.TreeMultiSet();
            if (args.length >= 1 && args[0] instanceof std.base.Container) {
                // COPY CONSTRUCTOR
                var container = args[0]; // PARAMETER
                if (args.length == 2)
                    this.container_.tree_.compare_ = (args[1]);
                this.container_.assign(container.begin(), container.end());
            }
            else if (args.length >= 1 && args[0] instanceof Array) {
                // INITIALIZER LIST CONSTRUCTOR
                var items = args[0]; // PARAMETER
                if (args.length == 2)
                    this.container_.tree_.compare_ = (args[1]);
                (_a = this.container_).push.apply(_a, items);
            }
            else if (args.length >= 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // RANGE CONSTRUCTOR
                var first = args[0]; // PARAMETER 1
                var last = args[1]; // PARAMETER 2
                if (args.length == 2)
                    this.container_.tree_.compare_ = (args[2]);
                this.container_.assign(first, last);
            }
            else if (args.length == 1) {
                // DEFAULT CONSTRUCTOR WITH SPECIFIED COMPARISON FUNCTION
                this.container_.tree_.compare_ = (args[0]);
            }
            var _a;
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
         * @return The number of elements in the underlying
         */
        PriorityQueue.prototype.size = function () {
            return this.container_.size();
        };
        /**
         * <p> Test whether container is empty. </p>
         *
         * <p> Returns whether the {@link PriorityQueue} is empty: i.e. whether its {@link size} is zero. </p>
         *
         * <p> This member function effectively calls member {@link IARray.empty empty} of the
         * {@link container_ underlying container} object. </p>
         */
        PriorityQueue.prototype.empty = function () {
            return this.container_.empty();
        };
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
        PriorityQueue.prototype.top = function () {
            return this.container_.begin().value;
        };
        /**
         * <p> Insert element. </p>
         *
         * <p> Inserts a new element in the {@link PriorityQueue}. The content of this new element is initialized to
         * <i>val</i>.
         *
         * <p> This member function effectively calls the member function {@link IArray.push_back push_back} of the
         * {@link container_ underlying container} object, and then reorders it to its location in the heap by calling
         * the <i>push_heap</i> algorithm on the range that includes all the elements of the  </p>
         *
         * @param val Value to which the inserted element is initialized.
         */
        PriorityQueue.prototype.push = function (val) {
            this.container_.insert(val);
        };
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
        PriorityQueue.prototype.pop = function () {
            this.container_.erase(this.container_.begin());
        };
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
        PriorityQueue.prototype.swap = function (obj) {
            this.container_.swap(obj.container_);
        };
        return PriorityQueue;
    }());
    std.PriorityQueue = PriorityQueue;
})(std || (std = {}));
/// <reference path="API.ts" />
var std;
(function (std) {
    /**
     * <p> LIFO stack. </p>
     *
     * <p> {@link Stack}s are a type of container adaptor, specifically designed to operate in a LIFO context
     * (last-in first-out), where elements are inserted and extracted only from one end of the  </p>
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/class_diagram/linear_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/class_diagram/linear_containers.png" style="max-width: 100%" /></a>
     * </p>
     *
     * @param <T> Type of elements.
     *
     * @reference http://www.cplusplus.com/reference/stack/stack
     * @author Jeongho Nam <http://samchon.org>
     */
    var Stack = (function () {
        function Stack(stack) {
            if (stack === void 0) { stack = null; }
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
        Stack.prototype.size = function () {
            return this.container_.size();
        };
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
        Stack.prototype.empty = function () {
            return this.container_.empty();
        };
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
        Stack.prototype.top = function () {
            return this.container_.back();
        };
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
        Stack.prototype.push = function (val) {
            this.container_.push_back(val);
        };
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
        Stack.prototype.pop = function () {
            this.container_.pop_back();
        };
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
        Stack.prototype.swap = function (obj) {
            this.container_.swap(obj.container_);
        };
        return Stack;
    }());
    std.Stack = Stack;
})(std || (std = {}));
/// <reference path="API.ts" />
/// <reference path="base/UniqueSet.ts" />
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/set_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/set_containers.png" style="max-width: 100%" /> </a></p>
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
     * @param <T> Type of the elements.
     *			  Each element in an {@link TreeSet} is also uniquely identified by this value.
     *
     * @reference http://www.cplusplus.com/reference/set/set
     * @author Jeongho Nam <http://samchon.org>
     */
    var TreeSet = (function (_super) {
        __extends(TreeSet, _super);
        function TreeSet() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // INIT MEMBERS
            _super.call(this);
            this.tree_ = new std.base.AtomicTree(this);
            if (args.length >= 1 && args[0] instanceof TreeSet) {
                // COPY CONSTRUCTOR
                var container = args[0]; // PARAMETER
                if (args.length == 2)
                    this.tree_.compare_ = (args[1]);
                this.assign(container.begin(), container.end());
            }
            else if (args.length >= 1 && args[0] instanceof Array) {
                // INITIALIZER LIST CONSTRUCTOR
                var items = args[0]; // PARAMETER
                if (args.length == 2)
                    this.tree_.compare_ = (args[1]);
                this.push.apply(this, items);
            }
            else if (args.length >= 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // RANGE CONSTRUCTOR
                var first = args[0]; // PARAMETER 1
                var last = args[1]; // PARAMETER 2
                if (args.length == 2)
                    this.tree_.compare_ = (args[2]);
                this.assign(first, last);
            }
            else if (args.length == 1) {
                // DEFAULT CONSTRUCTOR WITH SPECIFIED COMPARISON FUNCTION
                this.tree_.compare_ = (args[0]);
            }
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeSet.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.tree_.clear();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        TreeSet.prototype.find = function (val) {
            var node = this.tree_.find(val);
            if (node == null || std.equal_to(node.value.value, val) == false)
                return this.end();
            else
                return node.value;
        };
        /**
         * @inheritdoc
         */
        TreeSet.prototype.key_comp = function () {
            return this.tree_.key_comp();
        };
        /**
         * @inheritdoc
         */
        TreeSet.prototype.value_comp = function () {
            return this.tree_.key_comp();
        };
        /**
         * @inheritdoc
         */
        TreeSet.prototype.lower_bound = function (val) {
            return this.tree_.lower_bound(val);
        };
        /**
         * @inheritdoc
         */
        TreeSet.prototype.upper_bound = function (val) {
            return this.tree_.upper_bound(val);
        };
        /**
         * @inheritdoc
         */
        TreeSet.prototype.equal_range = function (val) {
            return this.tree_.equal_range(val);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
                - SWAP
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        TreeSet.prototype._Insert_by_val = function (val) {
            var node = this.tree_.find(val);
            // IF EQUALS, THEN RETURN FALSE
            if (node != null && std.equal_to(node.value.value, val) == true)
                return std.make_pair(node.value, false);
            // FIND NODE
            var it;
            if (node == null)
                it = this.end();
            else if (this.key_comp()(node.value.value, val) == true)
                it = node.value.next();
            else
                it = node.value;
            /////
            // INSERTS
            /////
            it = this.data_.insert(it, val);
            this._Handle_insert(it, it.next()); // POST-PROCESS
            return std.make_pair(it, true);
        };
        TreeSet.prototype._Insert_by_hint = function (hint, val) {
            // FIND KEY
            if (this.has(val) == true)
                return this.end();
            // VALIDATE HINT
            var ret;
            var compare = this.tree_.key_comp();
            // hint < current && current < next
            if (compare(hint.value, val) == true
                && (hint.next().equals(this.end()) || compare(val, hint.next().value) == true)) {
                ///////
                // RIGHT HINT
                ///////
                // INSERT
                ret = this.data_.insert(hint, val);
                // POST-PROCESS
                this._Handle_insert(ret, ret.next());
            }
            else {
                ///////
                // WRONG HINT
                ///////
                // INSERT BY AUTOMATIC NODE FINDING
                ret = this._Insert_by_val(val).first;
            }
            return ret;
        };
        /**
         * @hidden
         */
        TreeSet.prototype._Insert_by_range = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this._Insert_by_val(first.value);
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeSet.prototype._Handle_insert = function (first, last) {
            this.tree_.insert(first);
        };
        /**
         * @inheritdoc
         */
        TreeSet.prototype._Handle_erase = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this.tree_.erase(last);
        };
        TreeSet.prototype.swap = function (obj) {
            if (obj instanceof TreeSet && this.key_comp() == obj.key_comp()) {
                this._Swap(obj);
                _a = [obj.tree_, this.tree_], this.tree_ = _a[0], obj.tree_ = _a[1];
            }
            else
                _super.prototype.swap.call(this, obj);
            var _a;
        };
        return TreeSet;
    }(std.base.UniqueSet));
    std.TreeSet = TreeSet;
})(std || (std = {}));
/// <reference path="API.ts" />
/// <reference path="base/UniqueMap.ts" />
var std;
(function (std) {
    /**
     * <p> Tree-structured map, <code>std::map</code> of STL. </p>
     *
     * <p> {@link TreeMap TreeMaps} are associative containers that store elements formed by a combination of a
     * <i>key value</i> (<i>Key</i>) and a <i>mapped value</i> (<i>T</i>), following order. </p>
     *
     * <p> In a {@link TreeMap}, the <i>key values</i> are generally used to sort and uniquely identify the elements,
     * while the <i>mapped values</i> store the content associated to this key. The types of <i>key</i> and
     * <i>mapped value</i> may differ, and are grouped together in member type <i>value_type</i>, which is a {@link Pair}
     * type combining both: </p>
     *
     * <p> <code>typedef Pair<Key, T> value_type;</code> </p>
     *
     * <p> Internally, the elements in a {@link TreeMap} are always sorted by its <i>key</i> following a
     * <i>strict weak ordering</i> criterion indicated by its internal comparison method {@link less}.
     *
     * <p> {@link TreeMap} containers are generally slower than {@link HashMap HashMap} containers to access individual
     * elements by their <i>key</i>, but they allow the direct iteration on subsets based on their order. </p>
     *
     * <p> {@link TreeMap}s are typically implemented as binary search trees. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /> </a></p>
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
     * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
     * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
     *
     * @reference http://www.cplusplus.com/reference/map/map
     * @author Jeongho Nam <http://samchon.org>
     */
    var TreeMap = (function (_super) {
        __extends(TreeMap, _super);
        function TreeMap() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // INIT MEMBERS
            _super.call(this);
            this.tree_ = new std.base.PairTree(this);
            if (args.length >= 1 && args[0] instanceof TreeMap) {
                // COPY CONSTRUCTOR
                var container = args[0]; // PARAMETER
                if (args.length == 2)
                    this.tree_.compare_ = (args[1]);
                this.assign(container.begin(), container.end());
            }
            else if (args.length >= 1 && args[0] instanceof Array) {
                // INITIALIZER LIST CONSTRUCTOR
                var items = args[0]; // PARAMETER
                if (args.length == 2)
                    this.tree_.compare_ = (args[1]);
                this.push.apply(this, items);
            }
            else if (args.length >= 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // RANGE CONSTRUCTOR
                var first = args[0]; // PARAMETER 1
                var last = args[1]; // PARAMETER 2
                if (args.length == 2)
                    this.tree_.compare_ = (args[2]);
                this.assign(first, last);
            }
            else if (args.length == 1) {
                // DEFAULT CONSTRUCTOR WITH SPECIFIED COMPARISON FUNCTION
                this.tree_.compare_ = (args[0]);
            }
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeMap.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.tree_.clear();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        TreeMap.prototype.find = function (key) {
            var node = this.tree_.find(key);
            if (node == null || std.equal_to(node.value.first, key) == false)
                return this.end();
            else
                return node.value;
        };
        /**
         * @inheritdoc
         */
        TreeMap.prototype.key_comp = function () {
            return this.tree_.key_comp();
        };
        /**
         * @inheritdoc
         */
        TreeMap.prototype.value_comp = function () {
            return this.tree_.value_comp();
        };
        /**
         * @inheritdoc
         */
        TreeMap.prototype.lower_bound = function (key) {
            return this.tree_.lower_bound(key);
        };
        /**
         * @inheritdoc
         */
        TreeMap.prototype.upper_bound = function (key) {
            return this.tree_.upper_bound(key);
        };
        /**
         * @inheritdoc
         */
        TreeMap.prototype.equal_range = function (key) {
            return this.tree_.equal_range(key);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
                - SWAP
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        TreeMap.prototype._Insert_by_pair = function (pair) {
            var node = this.tree_.find(pair.first);
            // IF EQUALS, THEN RETURN FALSE
            if (node != null && std.equal_to(node.value.first, pair.first) == true)
                return std.make_pair(node.value, false);
            // INSERTS
            var it;
            if (node == null)
                it = this.end();
            else if (this.key_comp()(node.value.first, pair.first) == true)
                it = node.value.next();
            else
                it = node.value;
            // ITERATOR TO RETURN
            it = this.data_.insert(it, pair);
            this._Handle_insert(it, it.next()); // POST-PROCESS
            return std.make_pair(it, true);
        };
        /**
         * @hidden
         */
        TreeMap.prototype._Insert_by_hint = function (hint, pair) {
            // FIND KEY
            if (this.has(pair.first) == true)
                return this.end();
            // VALIDATE HINT
            var ret;
            var compare = this.key_comp();
            // hint < current && current < next
            if (compare(hint.first, pair.first) == true
                && (hint.next().equals(this.end()) || compare(pair.first, hint.next().first) == true)) {
                ///////
                // RIGHT HINT
                ///////
                // INSERT
                ret = this.data_.insert(hint, pair);
                // POST-PROCESS
                this._Handle_insert(ret, ret.next());
            }
            else {
                ///////
                // WRONG HINT
                ///////
                // INSERT BY AUTOMATIC NODE FINDING
                ret = this._Insert_by_pair(pair).first;
            }
            return ret;
        };
        /**
         * @hidden
         */
        TreeMap.prototype._Insert_by_range = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this._Insert_by_pair(std.make_pair(first.value.first, first.value.second));
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeMap.prototype._Handle_insert = function (first, last) {
            this.tree_.insert(first);
        };
        /**
         * @inheritdoc
         */
        TreeMap.prototype._Handle_erase = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this.tree_.erase(last);
        };
        /**
         * @inheritdoc
         */
        TreeMap.prototype.swap = function (obj) {
            if (obj instanceof TreeMap && this.key_comp() == obj.key_comp()) {
                this._Swap(obj);
                _a = [obj.tree_, this.tree_], this.tree_ = _a[0], obj.tree_ = _a[1];
            }
            else
                _super.prototype.swap.call(this, obj);
            var _a;
        };
        return TreeMap;
    }(std.base.UniqueMap));
    std.TreeMap = TreeMap;
})(std || (std = {}));
/// <reference path="API.ts" />
/// <reference path="base/MultiSet.ts" />
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/set_containers.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/set_containers.png" style="max-width: 100%" /> </a></p>
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
     * @param <T> Type of the elements. Each element in a {@link TreeMultiSet} container is also identified
     *			  by this value (each value is itself also the element's <i>key</i>).
     *
     * @reference http://www.cplusplus.com/reference/set/multiset
     * @author Jeongho Nam <http://samchon.org>
     */
    var TreeMultiSet = (function (_super) {
        __extends(TreeMultiSet, _super);
        function TreeMultiSet() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // INIT MEMBERS
            _super.call(this);
            this.tree_ = new std.base.AtomicTree(this);
            if (args.length >= 1 && args[0] instanceof TreeMultiSet) {
                // COPY CONSTRUCTOR
                var container = args[0]; // PARAMETER
                if (args.length == 2)
                    this.tree_.compare_ = (args[1]);
                this.assign(container.begin(), container.end());
            }
            else if (args.length >= 1 && args[0] instanceof Array) {
                // INITIALIZER LIST CONSTRUCTOR
                var items = args[0]; // PARAMETER
                if (args.length == 2)
                    this.tree_.compare_ = (args[1]);
                this.push.apply(this, items);
            }
            else if (args.length >= 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // RANGE CONSTRUCTOR
                var first = args[0]; // PARAMETER 1
                var last = args[1]; // PARAMETER 2
                if (args.length == 2)
                    this.tree_.compare_ = (args[2]);
                this.assign(first, last);
            }
            else if (args.length == 1) {
                // DEFAULT CONSTRUCTOR WITH SPECIFIED COMPARISON FUNCTION
                this.tree_.compare_ = (args[0]);
            }
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.tree_.clear();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.find = function (val) {
            var node = this.tree_.find(val);
            if (node == null || std.equal_to(val, node.value.value) == false)
                return this.end();
            else
                return node.value;
        };
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.count = function (val) {
            var it = this.find(val);
            var cnt = 0;
            for (; !it.equals(this.end()) && std.equal_to(it.value, val); it = it.next())
                cnt++;
            return cnt;
        };
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.key_comp = function () {
            return this.tree_.key_comp();
        };
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.value_comp = function () {
            return this.tree_.key_comp();
        };
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.lower_bound = function (val) {
            return this.tree_.lower_bound(val);
        };
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.upper_bound = function (val) {
            return this.tree_.upper_bound(val);
        };
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.equal_range = function (val) {
            return this.tree_.equal_range(val);
        };
        ///**
        // * @hidden
        // */
        //public _Get_tree(): base.AtomicTree<T>
        //{
        //	return this.tree_;
        //}
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
                - SWAP
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        TreeMultiSet.prototype._Insert_by_val = function (val) {
            var node = this.tree_.find(val);
            var it;
            // FIND NODE
            if (node == null) {
                it = this.end();
            }
            else if (std.equal_to(node.value.value, val) == true) {
                it = node.value.next();
            }
            else if (this.key_comp()(node.value.value, val) == true) {
                it = node.value.next();
                while (it.equals(this.end()) == false && this.key_comp()(it.value, val))
                    it = it.next();
            }
            else {
                it = node.value;
            }
            /////
            // INSERTS
            /////
            it = this.data_.insert(it, val);
            this._Handle_insert(it, it.next()); // POST-PROCESS
            return it;
        };
        /**
         * @hidden
         */
        TreeMultiSet.prototype._Insert_by_hint = function (hint, val) {
            // VALIDATE HINT
            var ret;
            var compare = this.tree_.key_comp();
            // hint <= current && current <= next
            if ((compare(hint.value, val) || std.equal_to(hint.value, val))
                && (hint.next().equals(this.end()) || (compare(val, hint.next().value) || std.equal_to(val, hint.next().value)))) {
                ///////
                // RIGHT HINT
                ///////
                // INSERT
                ret = this.data_.insert(hint, val);
                // POST-PROCESS
                this._Handle_insert(ret, ret.next());
            }
            else {
                ///////
                // WRONG HINT
                ///////
                // INSERT BY AUTOMATIC NODE FINDING
                ret = this._Insert_by_val(val);
            }
            return ret;
        };
        /**
         * @hidden
         */
        TreeMultiSet.prototype._Insert_by_range = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this._Insert_by_val(first.value);
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype._Handle_insert = function (first, last) {
            this.tree_.insert(first);
        };
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype._Handle_erase = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this.tree_.erase(last);
        };
        TreeMultiSet.prototype.swap = function (obj) {
            if (obj instanceof TreeMultiSet && this.key_comp() == obj.key_comp()) {
                this._Swap(obj);
                _a = [obj.tree_, this.tree_], this.tree_ = _a[0], obj.tree_ = _a[1];
            }
            else
                _super.prototype.swap.call(this, obj);
            var _a;
        };
        return TreeMultiSet;
    }(std.base.MultiSet));
    std.TreeMultiSet = TreeMultiSet;
})(std || (std = {}));
/// <reference path="API.ts" />
/// <reference path="base/MultiMap.ts" />
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" target="_blank"> <
     * img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/map_containers.png" style="max-width: 100%" /> </a></p>
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
     * @param <Key> Type of the keys. Each element in a map is uniquely identified by its key value.
     * @param <T> Type of the mapped value. Each element in a map stores some data as its mapped value.
     *
     * @reference http://www.cplusplus.com/reference/map/multimap
     * @author Jeongho Nam <http://samchon.org>
     */
    var TreeMultiMap = (function (_super) {
        __extends(TreeMultiMap, _super);
        function TreeMultiMap() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            // INIT MEMBERS
            _super.call(this);
            this.tree_ = new std.base.PairTree(this);
            if (args.length >= 1 && args[0] instanceof TreeMultiMap) {
                // COPY CONSTRUCTOR
                var container = args[0]; // PARAMETER
                if (args.length == 2)
                    this.tree_.compare_ = (args[1]);
                this.assign(container.begin(), container.end());
            }
            else if (args.length >= 1 && args[0] instanceof Array) {
                // INITIALIZER LIST CONSTRUCTOR
                var items = args[0]; // PARAMETER
                if (args.length == 2)
                    this.tree_.compare_ = (args[1]);
                this.push.apply(this, items);
            }
            else if (args.length >= 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // RANGE CONSTRUCTOR
                var first = args[0]; // PARAMETER 1
                var last = args[1]; // PARAMETER 2
                if (args.length == 2)
                    this.tree_.compare_ = (args[2]);
                this.assign(first, last);
            }
            else if (args.length == 1) {
                // DEFAULT CONSTRUCTOR WITH SPECIFIED COMPARISON FUNCTION
                this.tree_.compare_ = (args[0]);
            }
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.tree_.clear();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.find = function (key) {
            var node = this.tree_.find(key);
            if (node == null || std.equal_to(node.value.first, key) == false)
                return this.end();
            else
                return node.value;
        };
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.count = function (key) {
            var it = this.find(key);
            var cnt = 0;
            for (; !it.equals(this.end()) && std.equal_to(it.first, key); it = it.next())
                cnt++;
            return cnt;
        };
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.key_comp = function () {
            return this.tree_.key_comp();
        };
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.value_comp = function () {
            return this.tree_.value_comp();
        };
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.lower_bound = function (key) {
            return this.tree_.lower_bound(key);
        };
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.upper_bound = function (key) {
            return this.tree_.upper_bound(key);
        };
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.equal_range = function (key) {
            return this.tree_.equal_range(key);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
                - SWAP
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @hidden
         */
        TreeMultiMap.prototype._Insert_by_pair = function (pair) {
            var node = this.tree_.find(pair.first);
            var it;
            if (node == null) {
                it = this.end();
            }
            else if (std.equal_to(node.value.first, pair.first) == true) {
                it = node.value.next();
            }
            else if (this.key_comp()(node.value.first, pair.first) == true) {
                it = node.value.next();
                while (it.equals(this.end()) == false && this.key_comp()(it.first, pair.first))
                    it = it.next();
            }
            else
                it = node.value;
            // ITERATOR TO RETURN
            it = this.data_.insert(it, pair);
            this._Handle_insert(it, it.next()); // POST-PROCESS
            return it;
        };
        /**
         * @hidden
         */
        TreeMultiMap.prototype._Insert_by_hint = function (hint, pair) {
            // FIND KEY
            if (this.has(pair.first) == true)
                return this.end();
            // VALIDATE HINT
            var ret;
            var compare = this.key_comp();
            // hint <= current && current <= next
            if ((compare(hint.first, pair.first) || std.equal_to(hint.first, pair.first))
                && (hint.next().equals(this.end()) || (compare(pair.first, hint.next().first) || std.equal_to(pair.first, hint.next().first)))) {
                ///////
                // RIGHT HINT
                ///////
                // INSERT
                ret = this.data_.insert(hint, pair);
                // POST-PROCESS
                this._Handle_insert(ret, ret.next());
            }
            else {
                ///////
                // WRONG HINT
                ///////
                // INSERT BY AUTOMATIC NODE FINDING
                ret = this._Insert_by_pair(pair);
            }
            return ret;
        };
        /**
         * @hidden
         */
        TreeMultiMap.prototype._Insert_by_range = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this._Insert_by_pair(std.make_pair(first.value.first, first.value.second));
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype._Handle_insert = function (first, last) {
            this.tree_.insert(first);
        };
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype._Handle_erase = function (first, last) {
            for (; !first.equals(last); first = first.next())
                this.tree_.erase(last);
        };
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.swap = function (obj) {
            if (obj instanceof TreeMultiMap && this.key_comp() == obj.key_comp()) {
                this._Swap(obj);
                _a = [obj.tree_, this.tree_], this.tree_ = _a[0], obj.tree_ = _a[1];
            }
            else
                _super.prototype.swap.call(this, obj);
            var _a;
        };
        return TreeMultiMap;
    }(std.base.MultiMap));
    std.TreeMultiMap = TreeMultiMap;
})(std || (std = {}));
/// <reference path="API.ts" />
/// <reference path="Exception.ts" />
/// <reference path="base/ErrorInstance.ts" />
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/system_error/system_error
     * @author Jeongho Nam <http://samchon.org>
     */
    var SystemError = (function (_super) {
        __extends(SystemError, _super);
        function SystemError() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this, "");
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
        SystemError.prototype.code = function () {
            return this.code_;
        };
        return SystemError;
    }(std.RuntimeError));
    std.SystemError = SystemError;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> Error category. </p>
     *
     * <p> This type serves as a base class for specific category types. </p>
     *
     * <p> Category types are used to identify the source of an error. They also define the relation between
     * {@link ErrorCode} and {@link ErrorCondition}objects of its category, as well as the message set for {@link ErrorCode}
     * objects.
     *
     * <p> Objects of these types have no distinct values and are not-copyable and not-assignable, and thus can only be
     * passed by reference. As such, only one object of each of these types shall exist, each uniquely identifying its own
     * category: all error codes and conditions of a same category shall return a reference to same object. </p>
     *
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/system_error/error_category
     * @author Jeongho Nam <http://samchon.org>
     */
    var ErrorCategory = (function () {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Default Constructor.
         */
        function ErrorCategory() {
        }
        /* ---------------------------------------------------------
            OPERATORS
        --------------------------------------------------------- */
        /**
         * <p> Default error condition. </p>
         *
         * <p> Returns the default {@link ErrorCondition}object of this category that is associated with the
         * {@link ErrorCode} identified by a value of <i>val</i>. </p>
         *
         * <p> Its definition in the base class {@link ErrorCategory} returns the same as constructing an
         * {@link ErrorCondition} object with:
         *
         * <p> <code>new ErrorCondition(val, *this);</code> </p>
         *
         * <p> As a virtual member function, this behavior can be overriden in derived classes. </p>
         *
         * <p> This function is called by the default definition of member {@link equivalent equivalent()}, which is used to
         * compare {@link ErrorCondition error conditions} with error codes. </p>
         *
         * @param val A numerical value identifying an error condition.
         *
         * @return The default {@link ErrorCondition}object associated with condition value <i>val</i> for this category.
         */
        ErrorCategory.prototype.default_error_condition = function (val) {
            return new std.ErrorCondition(val, this);
        };
        ErrorCategory.prototype.equivalent = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args[1] instanceof std.ErrorCondition) {
                var val_code = args[0];
                var cond = args[1];
                return std.equal_to(this.default_error_condition(val_code), cond);
            }
            else {
                var code = args[0];
                var valcond = args[1];
                return std.equal_to(this, code.category()) && code.value() == valcond;
            }
        };
        return ErrorCategory;
    }());
    std.ErrorCategory = ErrorCategory;
})(std || (std = {}));
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/system_error/error_condition
     * @author Jeongho Nam <http://samchon.org>
     */
    var ErrorCondition = (function (_super) {
        __extends(ErrorCondition, _super);
        function ErrorCondition(val, category) {
            if (val === void 0) { val = 0; }
            if (category === void 0) { category = null; }
            _super.call(this, val, category);
        }
        return ErrorCondition;
    }(std.base.ErrorInstance));
    std.ErrorCondition = ErrorCondition;
})(std || (std = {}));
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
     * <p> <a href="http://samchon.github.io/typescript-stl/images/design/class_diagram/exceptions.png" target="_blank">
     * <img src="http://samchon.github.io/typescript-stl/images/design/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
     *
     * @reference http://www.cplusplus.com/reference/system_error/error_code
     * @author Jeongho Nam <http://samchon.org>
     */
    var ErrorCode = (function (_super) {
        __extends(ErrorCode, _super);
        function ErrorCode(val, category) {
            if (val === void 0) { val = 0; }
            if (category === void 0) { category = null; }
            _super.call(this, val, category);
        }
        return ErrorCode;
    }(std.base.ErrorInstance));
    std.ErrorCode = ErrorCode;
})(std || (std = {}));
/// <reference path="API.ts" />
var std;
(function (std) {
    /**
     * <p> Running on Node. </p>
     *
     * <p> Test whether the JavaScript is running on Node. </p>
     *
     * @references http://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser
     */
    function is_node() {
        if (typeof process === "object")
            if (typeof process.versions === "object")
                if (typeof process.versions.node !== "undefined")
                    return true;
        return false;
    }
    std.is_node = is_node;
    /**
     * <p> Pair of values. </p>
     *
     * <p> This class couples together a pair of values, which may be of different types (<i>T1</i> and
     * <i>T2</i>). The individual values can be accessed through its public members {@link first} and
     * {@link second}. </p>
     *
     * @param <T1> Type of member {@link first}.
     * @param <T2> Type of member {@link second}.
     *
     * @reference http://www.cplusplus.com/reference/utility/pair
     * @author Jeongho Nam <http://samchon.org>
     */
    var Pair = (function () {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * <p> Construct from pair values. </p>
         *
         * @param first The first value of the Pair
         * @param second The second value of the Pair
         */
        function Pair(first, second) {
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
         * the comparison will be executed by a member method (SomeObject)::equal_to(). If the object does not have
         * the member method equal_to(), only address of pointer will be compared. </p>
         *
         * @param obj A Map to compare
         * @return Indicates whether equal or not.
         */
        Pair.prototype.equals = function (pair) {
            return std.equal_to(this.first, pair.first) && std.equal_to(this.second, pair.second);
        };
        /**
         * @inheritdoc
         */
        Pair.prototype.less = function (pair) {
            if (std.equal_to(this.first, pair.first) == false)
                return std.less(this.first, pair.first);
            else
                return std.less(this.second, pair.second);
        };
        return Pair;
    }());
    std.Pair = Pair;
    /**
     * <p> Construct {@link Pair} object. </p>
     *
     * <p> Constructs a {@link Pair} object with its {@link Pair.first first} element set to <i>x</i> and its
     * {@link Pair.second second} element set to <i>y</i>. </p>
     *
     * <p> The template types can be implicitly deduced from the arguments passed to {@link make_pair}. </p>
     *
     * <p> {@link Pair} objects can be constructed from other {@link Pair} objects containing different types, if the
     * respective types are implicitly convertible. </p>
     *
     * @param x Value for member {@link Pair.first first}.
     * @param y Value for member {@link Pair.second second}.
     *
     * @return A {@link Pair} object whose elements {@link Pair.first first} and {@link Pair.second second} are set to
     *		   <i>x</i> and <i>y</i> respectivelly.
     */
    function make_pair(x, y) {
        return new Pair(x, y);
    }
    std.make_pair = make_pair;
})(std || (std = {}));
/// <reference path="../../std/Vector.ts" />
/// <reference path="../../std/Deque.ts" />
/// <reference path="../../std/List.ts" />
/// <reference path="../../std/Queue.ts" />
/// <reference path="../../std/PriorityQueue.ts" />
/// <reference path="../../std/Stack.ts" />
/// <reference path="../../std/HashSet.ts" />
/// <reference path="../../std/HashMap.ts" />
/// <reference path="../../std/HashMultiSet.ts" />
/// <reference path="../../std/HashMultiMap.ts" />
/// <reference path="../../std/TreeSet.ts" />
/// <reference path="../../std/TreeMap.ts" />
/// <reference path="../../std/TreeMultiSet.ts" />
/// <reference path="../../std/TreeMultiMap.ts" />
/// <reference path="../../std/Algorithm.ts" />
/// <reference path="../../std/Exception.ts" />
/// <reference path="../../std/Functional.ts" />
/// <reference path="../../std/Iterator.ts" />
/// <reference path="../../std/SystemError.ts" />
/// <reference path="../../std/Utility.ts" />
var std;
(function (std) {
    /* =========================================================
        CONTAINER SHORTCUTS
            - LINEAR CONTAINERS
            - ASSOCIATIVE CONTAINERS
            - SET CONTAINERS
            - MAP CONTAINERS
            - EXCEPTIONS
    ============================================================
        LINEAR CONTAINERS
    --------------------------------------------------------- */
    /**
     * Type definition of {@link Vector} and it's the original name used in C++.
     */
    std.vector = std.Vector;
    /**
     * Type definition of {@link List} and it's the original name used in C++.
     */
    std.list = std.List;
    /**
     * Type definition of {@link Deque} and it's the original name used in C++.
     */
    std.deque = std.Deque;
    std.stack = std.Stack;
    std.queue = std.Queue;
    std.priority_queue = std.PriorityQueue;
    /* ---------------------------------------------------------
        SET CONTAINERS
    --------------------------------------------------------- */
    /**
     * Type definition of {@link TreeSet} and it's the original name used in C++.
     */
    std.set = std.TreeSet;
    /**
     * Type definition of {@link TreeMultiSet} and it's the original name used in C++.
     */
    std.multiset = std.TreeMultiSet;
    /**
     * Type definition of {@link HashSet} and it's the original name used in C++.
     */
    std.unordered_set = std.HashSet;
    /**
     * Type definition of {@link HashMultiSet} and it's the original name used in C++.
     */
    std.unordered_multiset = std.HashMultiSet;
    /* ---------------------------------------------------------
        MAP CONTAINERS
    --------------------------------------------------------- */
    /**
     * Type definition of {@link TreeMap} and it's the original name used in C++.
     */
    std.map = std.TreeMap;
    /**
     * Type definition of {@link TreeMultiMap} and it's the original name used in C++.
     */
    std.multimap = std.TreeMultiMap;
    /**
     * Type definition of {@link HashMap} and it's the original name used in C++.
     */
    std.unordered_map = std.HashMap;
    /**
     * Type definition of {@link HashMultiMap} and it's the original name used in C++.
     */
    std.unordered_multimap = std.HashMultiMap;
    std.exception = std.Exception;
    std.logic_error = std.LogicError;
    std.domain_error = std.DomainError;
    std.invalid_argument = std.InvalidArgument;
    std.length_error = std.LengthError;
    std.out_of_range = std.OutOfRange;
    std.runtime_error = std.RuntimeError;
    std.overflow_error = std.OverflowError;
    std.underflow_error = std.UnderflowError;
    std.range_error = std.RangeError;
    std.system_error = std.SystemError;
    std.error_category = std.ErrorCategory;
    std.error_condition = std.ErrorCondition;
    std.error_code = std.ErrorCode;
})(std || (std = {}));
try {
    module.exports = std;
}
catch (exception) { }
