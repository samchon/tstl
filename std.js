var std;
(function (std) {
    function equals(val1, val2) {
        if (val1 instanceof Object)
            return val1.equals(val2);
        else
            return val1 == val2;
    }
    std.equals = equals;
    /**
     * <p> for less-than inequality comparison. </p>
     *
     * <p> Binary function object class whose call returns whether the its first argument compares less than
     * the second. </p>
     *
     * <p> Objects of this class can be used on standard algorithms such as <code>sort</code>, <code>merge</code>. </p>
     *
     * @param val1 First element, the standard of comparison.
     * @param val2 Second element compare with the first.
     *
     * @return Whether the first parameter is less than the second.
     */
    function less(val1, val2) {
        if (val1 instanceof Object)
            return val1.less(val2);
        else
            return val1 < val2;
    }
    std.less = less;
})(std || (std = {}));
var __s_uid = 0;
//Object.prototype["__uid"] = ++__s_uid;
Object.prototype["equals"] =
    function (obj) {
        return this == obj;
    };
Object.prototype["less"] =
    function (obj) {
        return this.__getUID() < obj.__getUID();
    };
Object.prototype["hasCode"] =
    function () {
        return this.__getUID();
        //var str: string = JSON.stringify(this);
        //var val: number = 0;
        //for (var i: number = 0; i < str.length; i++)
        //    val += str.charCodeAt(i) * Math.pow(31, str.length - 1 - i);
        //return val;
    };
Object.prototype["__getUID"] =
    function () {
        if (this.hasOwnProperty("__uid") == false)
            this.__uid = ++__s_uid;
        return this.__uid;
    };
/// <reference path="IObject.ts" />
var std;
(function (std) {
    /**
     * A static class for issuing hash code.
     *
     * @author Jeongho Nam
     */
    var Hash = (function () {
        function Hash() {
        }
        Object.defineProperty(Hash, "MIN_SIZE", {
            get: function () { return 10; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Hash, "RATIO", {
            get: function () { return 0.8; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Hash, "MAX_RATIO", {
            get: function () { return 2.0; },
            enumerable: true,
            configurable: true
        });
        Hash.code = function (val) {
            var type = typeof val;
            if (type == "number")
                return Hash.codeByNumber(val);
            else if (type == "string")
                return Hash.codeByString(val);
            else
                return Hash.codeByObject(val);
        };
        Hash.codeByNumber = function (val) {
            return Math.abs(Math.round(val));
        };
        Hash.codeByString = function (str) {
            var val = 0;
            for (var i = 0; i < str.length; i++)
                val += str.charCodeAt(i) * Math.pow(31, str.length - 1 - i);
            return val;
        };
        Hash.codeByObject = function (obj) {
            return obj.hashCode();
        };
        return Hash;
    })();
    std.Hash = Hash;
})(std || (std = {}));
/// <reference path="IObject.ts" />
/// <reference path="Hash.ts" />
var std;
(function (std) {
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
         * the comparison will be executed by a member method (SomeObject)::equals(). If the object does not have
         * the member method equals(), only address of pointer will be compared. </p>
         *
         * @param obj A Map to compare
         * @return Indicates whether equal or not.
         */
        Pair.prototype.equals = function (pair) {
            return std.equals(this.first, pair.first) && std.equals(this.second, pair.second);
        };
        Pair.prototype.less = function (pair) {
            if (std.equals(this.first, pair.first) == false)
                return std.less(this.first, pair.first);
            else
                return std.less(this.second, pair.second);
        };
        Pair.prototype.hashCode = function () {
            return std.Hash.code(this.first) + std.Hash.code(this.second);
        };
        return Pair;
    })();
    std.Pair = Pair;
})(std || (std = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    var Exception = (function () {
        function Exception(what) {
            if (what === void 0) { what = ""; }
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
        Exception.prototype.what = function () {
            return this.message;
        };
        return Exception;
    })();
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
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/stdexcept/logic_error/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    var LogicError = (function (_super) {
        __extends(LogicError, _super);
        function LogicError(what) {
            _super.call(this, what);
        }
        return LogicError;
    })(Exception);
    std.LogicError = LogicError;
    var DomainError = (function (_super) {
        __extends(DomainError, _super);
        function DomainError(what) {
            _super.call(this, what);
        }
        return DomainError;
    })(LogicError);
    std.DomainError = DomainError;
    var InvalidArgument = (function (_super) {
        __extends(InvalidArgument, _super);
        function InvalidArgument(what) {
            _super.call(this, what);
        }
        return InvalidArgument;
    })(LogicError);
    std.InvalidArgument = InvalidArgument;
    var LengthError = (function (_super) {
        __extends(LengthError, _super);
        function LengthError(what) {
            _super.call(this, what);
        }
        return LengthError;
    })(LogicError);
    std.LengthError = LengthError;
    var OutOfRange = (function (_super) {
        __extends(OutOfRange, _super);
        function OutOfRange(what) {
            _super.call(this, what);
        }
        return OutOfRange;
    })(LogicError);
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
     *  <li> Designed by C++ Reference - http://www.cplusplus.com/reference/stdexcept/runtime_error/
     * </ul>
     *
     * @author Migrated by Jeongho Nam
     */
    var RuntimeError = (function (_super) {
        __extends(RuntimeError, _super);
        function RuntimeError(what) {
            _super.call(this, what);
        }
        return RuntimeError;
    })(Exception);
    std.RuntimeError = RuntimeError;
    var OverflowError = (function (_super) {
        __extends(OverflowError, _super);
        function OverflowError(what) {
            _super.call(this, what);
        }
        return OverflowError;
    })(RuntimeError);
    std.OverflowError = OverflowError;
    var UnderflowError = (function (_super) {
        __extends(UnderflowError, _super);
        function UnderflowError(what) {
            _super.call(this, what);
        }
        return UnderflowError;
    })(RuntimeError);
    std.UnderflowError = UnderflowError;
    var RangeError = (function (_super) {
        __extends(RangeError, _super);
        function RangeError(what) {
            _super.call(this, what);
        }
        return RangeError;
    })(RuntimeError);
    std.RangeError = RangeError;
    var SystemError = (function (_super) {
        __extends(SystemError, _super);
        function SystemError(what) {
            _super.call(this, what);
        }
        return SystemError;
    })(RuntimeError);
    std.SystemError = SystemError;
})(std || (std = {}));
/// <reference path="PairIterator.ts" />
/// <reference path="Pair.ts" />
/// <reference path="Exception.ts" />
var std;
(function (std) {
    var PairContainer = (function () {
        function PairContainer() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1 && args[0] instanceof PairContainer)
                this.assign(args[0].begin(), args[0].end());
            else if (args.length == 2 && args[0] instanceof PairContainer && args[1] instanceof PairContainer)
                this.assign(args[0], args[1]);
        }
        /**
         * Test whether the Container is empty.
         */
        PairContainer.prototype.empty = function () {
            return this.size() == 0;
        };
        return PairContainer;
    })();
    std.PairContainer = PairContainer;
})(std || (std = {}));
/// <reference path="PairContainer.ts" />
var std;
(function (std) {
    var PairIterator = (function () {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from the source PairContainer.
         *
         * @param source The source PairContainer.
         */
        function PairIterator(source) {
            this.source = source;
        }
        /**
         * Advances the Iterator by n element positions.
         *
         * @param n Number of element positions to advance.
         * @return An advanced Iterator.
         */
        PairIterator.prototype.advance = function (n) {
            var it = this;
            var i;
            if (n >= 0) {
                for (i = 0; i < n; i++)
                    if (it.equals(this.source.end()))
                        return this.source.end();
                    else
                        it = it.next();
            }
            else {
                n = n * -1;
                for (i = 0; i < n; i++)
                    if (it.equals(this.source.end()))
                        return this.source.end();
                    else
                        it = it.prev();
            }
            return it;
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * Get source.
         */
        PairIterator.prototype.getSource = function () {
            return this.source;
        };
        PairIterator.prototype.equals = function (obj) {
            return this.source == obj.source;
        };
        Object.defineProperty(PairIterator.prototype, "first", {
            /**
             * Get first, key element.
             */
            get: function () {
                throw new std.LogicError("Have to be overriden.");
            },
            set: function (val) {
                throw new std.LogicError("Have to be overriden.");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PairIterator.prototype, "second", {
            /**
             * Get second, value element.
             */
            get: function () {
                throw new std.LogicError("Have to be overriden.");
            },
            set: function (val) {
                throw new std.LogicError("Have to be overriden.");
            },
            enumerable: true,
            configurable: true
        });
        return PairIterator;
    })();
    std.PairIterator = PairIterator;
})(std || (std = {}));
/// <reference path="IContainer.ts" />
/// <reference path="Iterator.ts" />
/// <reference path="Exception.ts" />
/// <referecen path="Vector.ts" />
var std;
(function (std) {
    /**
     * An abstract class containing elements.
     *
     * @author Jeongho Nam
     */
    var Container = (function () {
        function Container() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1 && (args[0] instanceof std.Vector || args[0] instanceof Container)) {
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
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
        return Container;
    })();
    std.Container = Container;
})(std || (std = {}));
/// <reference path="Container.ts" />
/// <reference path="Exception.ts" />
var std;
(function (std) {
    var Iterator = (function () {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from the source Container.
         *
         * @param source The source Container.
         */
        function Iterator(source) {
            this.source = source;
        }
        /**
         * Advances the Iterator by n element positions.
         *
         * @param n Number of element positions to advance.
         * @return An advanced Iterator.
         */
        Iterator.prototype.advance = function (n) {
            var it = this;
            var i;
            if (n >= 0) {
                for (i = 0; i < n; i++)
                    if (it.equals(this.source.end()))
                        return this.source.end();
                    else
                        it = it.next();
            }
            else {
                n = n * -1;
                for (i = 0; i < n; i++)
                    if (it.equals(this.source.end()))
                        return this.source.end();
                    else
                        it = it.prev();
            }
            return it;
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * Get source.
         */
        Iterator.prototype.getSource = function () {
            return this.source;
        };
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
        Iterator.prototype.equals = function (obj) {
            return this.source == obj.source;
        };
        Object.defineProperty(Iterator.prototype, "value", {
            /**
             * <p> Get value of the iterator is pointing. </p>
             *
             * @return A value of the iterator.
             */
            get: function () {
                throw new std.LogicError("Have to be overriden.");
            },
            /**
             * <p> Set value of the iterator is pointing. </p>
             *
             * @param val A new value of the iterator.
             */
            set: function (val) {
                throw new std.LogicError("Have to be overriden.");
            },
            enumerable: true,
            configurable: true
        });
        return Iterator;
    })();
    std.Iterator = Iterator;
})(std || (std = {}));
/// <reference path="Iterator.ts" />
/// <reference path="IContainer.ts" />
/// <reference path="VectorIterator.ts" />
var std;
(function (std) {
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
    var Vector = (function (_super) {
        __extends(Vector, _super);
        function Vector() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            if (args.length == 0) {
            }
            if (args.length == 1 && args[0] instanceof Array) {
                // CONSTRUCT FROM AN ARRAY OF ITEMS
                var array = args[0];
                this.push.apply(this, array);
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
            else if (args.length == 1 && (args[0] instanceof Vector || args[0] instanceof std.Container)) {
                // COPY CONSTRUCTOR
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                // CONSTRUCT FROM INPUT ITERATORS
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
        }
        Vector.prototype.assign = function (first, second) {
            this.clear();
            if (first instanceof std.Iterator && second instanceof std.Iterator) {
                var begin = first;
                var end = second;
                for (var it = begin; it.equals(end) == false; it = it.next())
                    this.push(it.value);
            }
            else if (typeof first == "number") {
                var size = first;
                var val = second;
                this.length = size;
                for (var i = 0; i < size; i++)
                    this[i] = val;
            }
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.clear = function () {
            this.erase(this.begin(), this.end());
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        Vector.prototype.begin = function () {
            if (this.size() == 0)
                return this.end();
            else
                return new std.VectorIterator(this, 0);
        };
        /**
         * @inheritdoc
         */
        Vector.prototype.end = function () {
            return new std.VectorIterator(this, -1);
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
        Vector.prototype.empty = function () {
            return this.length == 0;
        };
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
        Vector.prototype.at = function (index) {
            if (index < this.size())
                return this[index];
            else
                throw new std.OutOfRange("Target index is greater than Vector's size.");
        };
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
        Vector.prototype.front = function () {
            return this.at(0);
        };
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
        Vector.prototype.back = function () {
            return this.at(this.length - 1);
        };
        /* ---------------------------------------------------------
            ELEMENTS I/O
        --------------------------------------------------------- */
        Vector.prototype.pushBack = function (element) {
            this.push(element);
        };
        /**
         * Replaces the element at the specified position in this list with the specified element.
         *
         * @param index A specified position of the value to replace.
         * @param val A value to be stored at the specified position.
         *
         * @return The previous element had stored at the specified position.
         */
        Vector.prototype.set = function (index, val) {
            if (index > this.length)
                throw new std.OutOfRange("Target index is greater than Vector's size.");
            var prev = this[index];
            this[index] = val;
            return prev;
        };
        /**
         * <p> Delete last element. </p>
         *
         * <p> Removes the last element in the Vector container, effectively reducing the container
         * <code>size</code> by one. </p>
         */
        Vector.prototype.popBack = function () {
            this.erase(this.end().prev());
        };
        Vector.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var position = args[0];
            if (args.length == 2 && args[1] instanceof std.Iterator == false) {
                var val = args[1];
                return this.insert(position, 1, val);
            }
            else if (args.length == 3 && typeof args[1] == "number") {
                var size = args[1];
                var val = args[2];
                var spliced = this.splice(position.getIndex());
                var inserts = [];
                for (var i = 0; i < size; i++)
                    inserts.push(val);
                this.push.apply(this, spliced);
                this.push.apply(this, inserts);
                return new std.VectorIterator(this, position.getIndex() + inserts.length);
            }
            else if (args.length == 3 && args[1] instanceof std.Iterator && args[2] instanceof std.Iterator) {
                var myEnd = args[0];
                var begin = args[1];
                var end = args[2];
                var spliced = this.splice(position.getIndex());
                var inserts = [];
                for (var it = begin; it.equals(end) == false; it = it.next())
                    inserts.push(it.value);
                this.push.apply(this, spliced);
                this.push.apply(this, inserts);
                return new std.VectorIterator(this, myEnd.getIndex() + inserts.length);
            }
            else
                throw new std.InvalidArgument("invalid parameters.");
        };
        Vector.prototype.erase = function (begin, end) {
            if (end === void 0) { end = null; }
            var startIndex = begin.getIndex();
            if (end == null)
                this.splice(startIndex, 1);
            else
                this.splice(startIndex, end.getIndex() - startIndex);
            return new std.VectorIterator(this, startIndex);
        };
        return Vector;
    })(Array);
    std.Vector = Vector;
})(std || (std = {}));
/// <reference path="Iterator.ts" />
/// <reference path="Vector.ts" />
var std;
(function (std) {
    /**
     * <p> A bi-directional iterator of a Set. </p>
     *
     * @tparam T Type of the elements.
     *
     * @author Jeongho Nam
     */
    var VectorIterator = (function (_super) {
        __extends(VectorIterator, _super);
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
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
        function VectorIterator(source, index) {
            _super.call(this, source);
            this.index = index;
        }
        Object.defineProperty(VectorIterator.prototype, "vector", {
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            get: function () {
                return this.source;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(VectorIterator.prototype, "value", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.vector.at(this.index);
            },
            /**
             * @inheritdoc
             */
            set: function (val) {
                this.vector.set(this.index, val);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @inheritdoc
         */
        VectorIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.index == obj.index;
        };
        /**
         * Get index.
         */
        VectorIterator.prototype.getIndex = function () {
            return this.index;
        };
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        VectorIterator.prototype.prev = function () {
            if (this.index <= 0)
                return this.source.end();
            else
                return new VectorIterator(this.vector, this.index - 1);
        };
        /**
         * @inheritdoc
         */
        VectorIterator.prototype.next = function () {
            if (this.index >= this.source.size() - 1)
                return this.source.end();
            else
                return new VectorIterator(this.vector, this.index + 1);
        };
        /**
         * @inheritdoc
         */
        VectorIterator.prototype.advance = function (n) {
            var newIndex = this.index + n;
            if (newIndex < 0 || newIndex >= this.source.size())
                return this.source.end();
            else
                return new VectorIterator(this.vector, newIndex);
        };
        return VectorIterator;
    })(std.Iterator);
    std.VectorIterator = VectorIterator;
})(std || (std = {}));
/// <reference path="Iterator.ts" />
/// <reference path="List.ts" />
var std;
(function (std) {
    var ListIterator = (function (_super) {
        __extends(ListIterator, _super);
        /* ---------------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------------- */
        /**
         * <p> Construct from source List. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in List instead. </p>
         *
         * @param list The source vector to reference.
         */
        function ListIterator(source, prev, next, value) {
            _super.call(this, source);
            this.prev_ = prev;
            this.next_ = next;
            this.value_ = value;
        }
        /**
         * @inheritdoc
         */
        ListIterator.prototype.setPrev = function (prev) {
            this.prev_ = prev;
        };
        /**
         * @inheritdoc
         */
        ListIterator.prototype.setNext = function (next) {
            this.next_ = next;
        };
        /* ---------------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        ListIterator.prototype.equals = function (obj) {
            if (obj instanceof ListIterator == false)
                return false;
            var it = obj;
            return _super.prototype.equals.call(this, obj) == true && this.prev_ == it.prev_ && this.next_ == it.next_;
        };
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
        Object.defineProperty(ListIterator.prototype, "value", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.value_;
            },
            /**
             * @inheritdoc
             */
            set: function (val) {
                this.value_ = val;
            },
            enumerable: true,
            configurable: true
        });
        return ListIterator;
    })(std.Iterator);
    std.ListIterator = ListIterator;
})(std || (std = {}));
/// <reference path="Container.ts" />
/// <reference path="ListIterator.ts" />
/// <reference path="Vector.ts" />
var std;
(function (std) {
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
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            if (args.length == 0) {
                this.clear();
            }
            else if (args.length == 1 && args[0] instanceof Array) {
                var array = args[0];
                this.clear();
                this.push.apply(this, array);
            }
            else if (args.length == 1 && (args[0] instanceof std.Vector || args[0] instanceof std.Container)) {
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
            else if (args.length == 2 && typeof args[0] == "number") {
                var size = args[0];
                var val = args[1];
                this.assign(size, val);
            }
        }
        List.prototype.assign = function (par1, par2) {
            if (par1 instanceof std.Iterator && par2 instanceof std.Iterator) {
                // PARAMETERS
                var begin = par1;
                var end = par2;
                // BODY
                var prev = null;
                var item;
                var it = begin;
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
        };
        /**
         * @inheritdoc
         */
        List.prototype.clear = function () {
            var it = new std.ListIterator(this, null, null, null);
            it.setPrev(it);
            it.setNext(it);
            this.begin_ = it;
            this.end_ = it;
            this.size_ = 0;
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        List.prototype.begin = function () {
            return this.begin_;
        };
        /**
         * @inheritdoc
         */
        List.prototype.end = function () {
            return this.end_;
        };
        /**
         * @inheritdoc
         */
        List.prototype.size = function () {
            return this.size_;
        };
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
        List.prototype.front = function () {
            return this.begin_.value;
        };
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
        List.prototype.back = function () {
            return this.end_.prev().value;
        };
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
        List.prototype.push = function () {
            var items = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                items[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < items.length; i++)
                this.pushBack(items[i]);
            return this.size();
        };
        /**
         * <p> Insert element at beginning. </p>
         *
         * <p> Inserts a new element at the beginning of the list, right before its current first element.
         * This effectively increases the container size by one. </p>
         *
         * @param val Value to be inserted as an element.
         */
        List.prototype.pushFront = function (val) {
            var item = new std.ListIterator(this, null, this.begin_, val);
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
        };
        /**
         * <p> Add element at the end. </p>
         *
         * <p> Adds a new element at the lend of the <code>List</code> container, after its current last
         * element.This effectively increases the container size by one. </p>
         *
         * @param val Value to be inserted as an element.
         */
        List.prototype.pushBack = function (val) {
            var prev = this.end_.prev();
            var item = new std.ListIterator(this, this.end_.prev(), this.end_, val);
            prev.setNext(item);
            this.end_.setPrev(item);
            if (this.empty() == true) {
                this.begin_ = item;
                item.setPrev(this.end_);
            }
            this.size_++;
        };
        /**
         * <p> Delete first element. </p>
         *
         * <p> Removes first last element in the List container, effectively reducing the container
         * <code>size</code> by one. </p>
         */
        List.prototype.popFront = function () {
            this.erase(this.begin_);
        };
        /**
         * <p> Delete last element. </p>
         *
         * <p> Removes the last element in the List container, effectively reducing the container
         * <code>size</code> by one. </p>
         */
        List.prototype.popBack = function () {
            this.erase(this.end_.prev());
        };
        List.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length = 2)
                return this.insertByVal(args[0], args[1]);
            else if (args.length == 3 && typeof args[1] == "number")
                return this.insertByRepeatingVal(args[0], args[1], args[2]);
            else
                return this.insertByRange(args[0], args[1], args[2]);
        };
        List.prototype.insertByVal = function (position, val) {
            // SHIFT TO INSERT OF THE REPEATING VAL
            return this.insertByRepeatingVal(position, 1, val);
        };
        List.prototype.insertByRepeatingVal = function (position, size, val) {
            if (this != position.getSource())
                throw new std.InvalidArgument("Parametric iterator is not this container's own.");
            var prev = position.prev();
            var first = null;
            for (var i = 0; i < size; i++) {
                // CONSTRUCT ITEM, THE NEW ELEMENT
                var item = new std.ListIterator(this, prev, null, val);
                if (i == 0)
                    first = item;
                if (prev != null)
                    prev.setNext(item);
                // SHIFT CURRENT ITEM TO PREVIOUS
                prev = item;
            }
            // IF WAS EMPTY, VAL IS THE BEGIN
            if (this.empty() == true)
                this.begin_ = first;
            // CONNECT BETWEEN LAST AND POSITION
            prev.setNext(position);
            position.setPrev(prev);
            this.size_ += size;
            return first;
        };
        List.prototype.insertByRange = function (position, begin, end) {
            if (this != position.getSource())
                throw new std.InvalidArgument("Parametric iterator is not this container's own.");
            var prev = position.prev();
            var first = null;
            var size = 0;
            for (var it = begin; it.equals(end) == false; it = it.next()) {
                // CONSTRUCT ITEM, THE NEW ELEMENT
                var item = new std.ListIterator(this, prev, null, it.value);
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
        };
        List.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1)
                return this.eraseByIterator(args[0]);
            else if (args.length == 2)
                return this.eraseByRange(args[0], args[1]);
        };
        List.prototype.eraseByIterator = function (it) {
            return this.eraseByRange(it, it.next());
        };
        List.prototype.eraseByRange = function (begin, end) {
            if (this != begin.getSource() || begin.getSource() != end.getSource())
                throw new std.InvalidArgument("Parametric iterator is not this container's own.");
            // FIND PREV AND NEXT
            var prev = begin.prev();
            var next = end;
            // CALCULATE THE SIZE
            var size = 0;
            for (var it = begin; it.equals(end) == false; it = it.next())
                size++;
            // SHRINK
            prev.setNext(next);
            next.setPrev(prev);
            this.size_ -= size;
            return prev;
        };
        return List;
    })(std.Container);
    std.List = List;
})(std || (std = {}));
/// <reference path="PairContainer.ts" />
/// <reference path="MapIterator.ts" />
/// <reference path="List.ts" />
var std;
(function (std) {
    /**
     * Abstract Map.
     *
     * @tparam K Type of the key values.
     *           Each element in an <code>UnorderedMap</code> is uniquely identified by its key value.
     * @tparam T Type of the mapped value.
     *           Each element in an <code>UnorderedMap</code> is used to store some data as its mapped value.
     *
     * @author Jeongho Nam
     */
    var AbstractMap = (function (_super) {
        __extends(AbstractMap, _super);
        function AbstractMap() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            // INITIALIZATION
            this.data = new std.List();
            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array && args[0] instanceof std.Vector == false) {
                this.constructByArray(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof std.PairContainer) {
                this.constructByContainer(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof std.PairIterator && args[1] instanceof std.PairIterator) {
                this.constructByRange(args[0], args[1]);
            }
        }
        AbstractMap.prototype.constructByArray = function (items) {
            for (var i = 0; i < items.length; i++) {
                if (this.has(items[i].first) == true)
                    continue;
                this.insert(items[i]);
            }
        };
        AbstractMap.prototype.constructByContainer = function (container) {
            this.constructByRange(container.begin(), container.end());
        };
        AbstractMap.prototype.constructByRange = function (begin, end) {
            this.assign(begin, end);
        };
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.assign = function (begin, end) {
            // INSERT
            for (var it = begin; it.equals(end) == false; it = it.next())
                this.insert(new std.Pair(it.first, it.second));
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.clear = function () {
            this.data.clear();
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.begin = function () {
            return new std.MapIterator(this, this.data.begin());
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.end = function () {
            return new std.MapIterator(this, this.data.end());
        };
        /* ---------------------------------------------------------
            ELEMENTS
        --------------------------------------------------------- */
        /**
         * <p> Whether have the item or not. </p>
         * <p> Indicates whether a map has an item having the specified identifier. </p>
         *
         * @param key Key value of the element whose mapped value is accessed.
         * @return Whether the map has an item having the specified identifier.
         */
        AbstractMap.prototype.has = function (key) {
            return this.count(key) != 0;
        };
        /**
         * <p> Get element by key. </p>
         * <p> Returns a reference to the mapped value of the element identified with key. </p>
         *
         * @param key Key value of the element whose mapped value is accessed.
         * @throw exception out of range.
         *
         * @return A reference object of the mapped value (_Ty)
         */
        AbstractMap.prototype.get = function (key) {
            var it = this.find(key);
            if (it.equals(this.end()) == true)
                throw new std.OutOfRange("cannot find the specified key");
            return it.second;
        };
        /**
         * <p> Set element. </p>
         * <p> Set an item as the specified identifier. </p>
         *
         * <p> If the identifier is already in map, change value of the identifier.
         * If not, then insert the object with the identifier. </p>
         *
         * @param key Key value of the element whose mapped value is accessed.
         * @param val Value, the item.
         */
        AbstractMap.prototype.set = function (key, value) {
            var it = this.find(key);
            if (it.equals(this.end()) == true)
                this.insert(new std.Pair(key, value));
            else
                it.second = value;
        };
        /**
         * <p> Count elements with a specific key. </p>
         * <p> Searches the container for elements with a value of k and returns the number of elements found. </p>
         *
         * @param key Key value of the elements to be counted.
         *
         * @return The number of elements in the container with a <code>key</code>.
         */
        AbstractMap.prototype.count = function (key) {
            return (this.find(key).equals(this.end()) == false) ? 1 : 0;
        };
        /**
         * @inheritdoc
         */
        AbstractMap.prototype.size = function () {
            return this.data.size();
        };
        AbstractMap.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1 && args[0] instanceof std.Pair)
                return this.insertByPair(args[0]);
            else if (args.length == 2 && args[0] instanceof std.PairIterator && args[1] instanceof std.Pair)
                return this.insertByHint(args[0], args[1]);
            else if (args.length == 2 && args[0] instanceof std.PairIterator && args[1] instanceof std.PairIterator)
                return this.insertByRange(args[0], args[1]);
        };
        AbstractMap.prototype.insertByPair = function (pair) {
            // TEST WHETHER EXISTS
            var it = this.find(pair.first);
            if (it.equals(this.end()) == false)
                return new std.Pair(it, false);
            // INSERT
            this.data.pushBack(pair);
            it = it.prev();
            // POST-PROCESS
            this.handleInsert(it);
            return new std.Pair(it, true);
        };
        AbstractMap.prototype.insertByHint = function (hint, pair) {
            // INSERT
            var list_it = hint.getListIterator();
            list_it = this.data.insert(hint.getListIterator(), pair);
            // POST-PROCESS
            var it = new std.MapIterator(this, list_it);
            this.handleInsert(it);
            return it;
        };
        AbstractMap.prototype.insertByRange = function (begin, end) {
            for (var it = begin; it.equals(end) == false; it = it.next())
                this.insertByPair(new std.Pair(it.first, it.second));
        };
        AbstractMap.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1)
                if (args[0] instanceof std.PairIterator && args[0].getSource() == this)
                    return this.eraseByIterator(args[0]);
                else
                    return this.eraseByKey(args[0]);
            else if (args.length == 2 && args[0] instanceof std.PairIterator && args[1] instanceof std.PairIterator)
                return this.eraseByRange(args[0], args[1]);
        };
        AbstractMap.prototype.eraseByKey = function (key) {
            var it = this.find(key);
            if (it.equals(this.end()) == true)
                return 0;
            this.eraseByIterator(it);
            return 1;
        };
        AbstractMap.prototype.eraseByIterator = function (it) {
            // ERASE
            var listIterator = this.data.erase(it.getListIterator());
            // POST-PROCESS
            this.handleErase(it);
            return new std.MapIterator(this, listIterator);
            ;
        };
        AbstractMap.prototype.eraseByRange = function (begin, end) {
            // ERASE
            var listIterator = this.data.erase(begin.getListIterator(), end.getListIterator());
            // POST-PROCESS
            for (var it = begin; it.equals(this.end()) == false; it = it.next())
                this.handleErase(it);
            return new std.MapIterator(this, listIterator);
        };
        return AbstractMap;
    })(std.PairContainer);
    std.AbstractMap = AbstractMap;
})(std || (std = {}));
/// <refe0rence path="PairIterator.ts" />
/// <reference path="AbstractMap.ts" />
/// <reference path="ListIterator.ts" />
var std;
(function (std) {
    /**
     * <p> A bi-directional iterator. </p>
     *
     * @tparam K Type of the keys. Each element in a map is uniquely identified by its key value.
     * @tparam T Type of the mapped value. Each element in a map stores some data as its mapped value.
     *
     * @author Jeongho Nam
     */
    var MapIterator = (function (_super) {
        __extends(MapIterator, _super);
        /**
         * <p> Construct from source and index number. </p>
         *
         * <h4> Note </h4>
         * <p> Do not create iterator directly. </p>
         * <p> Use begin(), find() or end() in Map instead. </p>
         *
         * @param map The source map to reference
         * @param index Sequence number of the element in the source map
         */
        function MapIterator(source, it) {
            _super.call(this, source);
            this.listIterator = it;
        }
        /**
         * Get listIterator.
         */
        MapIterator.prototype.getListIterator = function () {
            return this.listIterator;
        };
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        MapIterator.prototype.prev = function () {
            return new MapIterator(this.source, this.listIterator.prev());
        };
        /**
         * @inheritdoc
         */
        MapIterator.prototype.next = function () {
            return new MapIterator(this.source, this.listIterator.next());
        };
        /**
         * @inheritdoc
         */
        MapIterator.prototype.advance = function (size) {
            return new MapIterator(this.source, this.listIterator.advance(size));
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        MapIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.listIterator == obj.listIterator;
        };
        Object.defineProperty(MapIterator.prototype, "first", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.listIterator.value.first;
            },
            /**
             * @inheritdoc
             */
            set: function (key) {
                this.listIterator.value.first = key;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapIterator.prototype, "second", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.listIterator.value.second;
            },
            /**
             * @inheritdoc
             */
            set: function (val) {
                this.listIterator.value.second = val;
            },
            enumerable: true,
            configurable: true
        });
        return MapIterator;
    })(std.PairIterator);
    std.MapIterator = MapIterator;
})(std || (std = {}));
/// <reference path="Container.ts" />
/// <reference path="SetIterator.ts" />
/// <reference path="List.ts" />
/// <reference path="Pair.ts" />
var std;
(function (std) {
    /**
     * Abstract Set.
     *
     * @author Jeongho Nam
     */
    var AbstractSet = (function (_super) {
        __extends(AbstractSet, _super);
        function AbstractSet() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            // INITIALIZATION
            this.data = new std.List();
            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array && args[0] instanceof std.Vector == false) {
                this.constructByArray(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof std.Container) {
                this.constructByContainer(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                this.constructByRange(args[0], args[1]);
            }
        }
        AbstractSet.prototype.constructByArray = function (items) {
            for (var i = 0; i < items.length; i++) {
                if (this.has(items[i]) == true)
                    continue;
                this.insert(items[i]);
            }
        };
        AbstractSet.prototype.constructByContainer = function (container) {
            this.constructByRange(container.begin(), container.end());
        };
        AbstractSet.prototype.constructByRange = function (begin, end) {
            this.assign(begin, end);
        };
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.assign = function (begin, end) {
            // INSERT
            for (var it = begin; it.equals(end) == false; it = it.next())
                this.insert(it.value);
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.clear = function () {
            this.data.clear();
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.begin = function () {
            return new std.SetIterator(this, this.data.begin());
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.end = function () {
            return new std.SetIterator(this, this.data.end());
        };
        /* ---------------------------------------------------------
            ELEMENTS
        --------------------------------------------------------- */
        /**
         * <p> Whether have the item or not. </p>
         * <p> Indicates whether a set has an item having the specified identifier. </p>
         *
         * @param key Key value of the element whose mapped value is accessed.
         *
         * @return Whether the set has an item having the specified identifier.
         */
        AbstractSet.prototype.has = function (val) {
            return this.count(val) != 0;
        };
        /**
         * <p> Count elements with a specific key. </p>
         * <p> Searches the container for elements with a value of k and returns the number of elements found. </p>
         *
         * @param key Value of the elements to be counted.
         *
         * @return The number of elements in the container with a <code>key</code>.
         */
        AbstractSet.prototype.count = function (val) {
            return (this.find(val).equals(this.end()) == false) ? 1 : 0;
        };
        /**
         * @inheritdoc
         */
        AbstractSet.prototype.size = function () {
            return this.data.size();
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - ERASE
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        AbstractSet.prototype.push = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < args.length; i++)
                this.insertByVal(args[i]);
            return this.size();
        };
        AbstractSet.prototype.insert = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1)
                return this.insertByVal(args[0]);
            else if (args.length == 2 && args[0] instanceof std.Iterator) {
                if (args[1] instanceof std.Iterator && args[0].getSource() != this && args[1].getSource() != this)
                    return this.insertByRange(args[0], args[1]);
                else
                    return this.insertByHint(args[0], args[1]);
            }
        };
        AbstractSet.prototype.insertByVal = function (val) {
            // TEST WHETHER EXISTS
            var it = this.find(val);
            if (it.equals(this.end()) == false)
                return new std.Pair(it, false);
            // INSERT
            this.data.pushBack(val);
            it = it.prev();
            // POST-PROCESS
            this.handleInsert(it);
            return new std.Pair(it, true);
        };
        AbstractSet.prototype.insertByHint = function (hint, val) {
            // INSERT
            var listIterator = this.data.insert(hint.getListIterator(), val);
            // POST-PROCESS
            var it = new std.SetIterator(this, listIterator);
            this.handleInsert(it);
            return it;
        };
        AbstractSet.prototype.insertByRange = function (begin, end) {
            for (var it = begin; it.equals(end) == false; it = it.next()) {
                this.insertByVal(it.value);
            }
        };
        AbstractSet.prototype.erase = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (args.length == 1)
                if (args[0] instanceof std.Iterator && args[0].getSource() == this)
                    return this.eraseByIterator(args[0]);
                else
                    return this.eraseByKey(args[0]);
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator)
                return this.eraseByRange(args[0], args[1]);
        };
        AbstractSet.prototype.eraseByKey = function (val) {
            // TEST WHETHER EXISTS
            var it = this.find(val);
            if (it.equals(this.end()) == true)
                return 0;
            // ERASE
            this.eraseByIterator(it);
            return 1;
        };
        AbstractSet.prototype.eraseByIterator = function (it) {
            // ERASE
            var listIterator = this.data.erase(it.getListIterator());
            // POST-PROCESS
            this.handleErase(it);
            return new std.SetIterator(this, listIterator);
        };
        AbstractSet.prototype.eraseByRange = function (begin, end) {
            // ERASE
            var listIterator = this.data.erase(begin.getListIterator(), end.getListIterator());
            // POST-PROCESS
            for (var it = begin; it.equals(this.end()) == false; it = it.next())
                this.handleErase(it);
            return begin.prev();
        };
        return AbstractSet;
    })(std.Container);
    std.AbstractSet = AbstractSet;
})(std || (std = {}));
/// <refe0rence path="Iterator.ts" />
/// <reference path="AbstractSet.ts" />
/// <reference path="ListIterator.ts" />
var std;
(function (std) {
    /**
     * <p> An iterator of a Set. </p>
     *
     * @author Jeongho Nam
     */
    var SetIterator = (function (_super) {
        __extends(SetIterator, _super);
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
        function SetIterator(source, it) {
            _super.call(this, source);
            this.it = it;
        }
        SetIterator.prototype.getListIterator = function () {
            return this.it;
        };
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        SetIterator.prototype.prev = function () {
            return new SetIterator(this.source, this.it.prev());
        };
        /**
         * @inheritdoc
         */
        SetIterator.prototype.next = function () {
            return new SetIterator(this.source, this.it.next());
        };
        /**
         * @inheritdoc
         */
        SetIterator.prototype.advance = function (size) {
            return new SetIterator(this.source, this.it.advance(size));
        };
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        SetIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.it == obj.it;
        };
        Object.defineProperty(SetIterator.prototype, "value", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.it.value;
            },
            /**
             * @inheritdoc
             */
            set: function (val) {
                this.it.value = val;
            },
            enumerable: true,
            configurable: true
        });
        return SetIterator;
    })(std.Iterator);
    std.SetIterator = SetIterator;
})(std || (std = {}));
var std;
(function (std) {
    var Bind = (function () {
        function Bind(func, thisArg) {
            this.func = func;
            this.thisArg = thisArg;
        }
        Bind.prototype.apply = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return this.func.apply(this.thisArg, args);
        };
        Bind.prototype.equals = function (obj) {
            return this.func == obj.func && this.thisArg == obj.thisArg;
        };
        return Bind;
    })();
    std.Bind = Bind;
})(std || (std = {}));
/// <reference path="AbstractSet.ts" />
/// <reference path="Hash.ts" />
var std;
(function (std) {
    /**
     * <p> Unordered Set. </p>
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
     * @tparam T Type of the elements.
     *           Each element in an <code>UnorderedSet</code> is also uniquely identified by this value.
     *
     * @author Migrated by Jeongho Nam
     */
    var UnorderedSet = (function (_super) {
        __extends(UnorderedSet, _super);
        function UnorderedSet() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.constructHashGroup();
            if (args.length == 0) {
                _super.call(this);
            }
            else if (args.length == 1) {
                _super.call(this, args[0]);
            }
            else if (args.length == 2) {
                _super.call(this, args[0], args[1]);
            }
        }
        UnorderedSet.prototype.constructByArray = function (items) {
            this.constructHashGroup(items.length * std.Hash.RATIO);
            _super.prototype.constructByArray.call(this, items);
        };
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        UnorderedSet.prototype.assign = function (begin, end) {
            var it;
            var size = 0;
            // REVERSE HASH_GROUP SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;
            this.constructHashGroup(size * std.Hash.RATIO);
            // SUPER; INSERT
            _super.prototype.assign.call(this, begin, end);
        };
        /**
         * @inheritdoc
         */
        UnorderedSet.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.constructHashGroup();
        };
        /* ---------------------------------------------------------
            HASH GROUP
        --------------------------------------------------------- */
        UnorderedSet.prototype.constructHashGroup = function (size) {
            if (size === void 0) { size = -1; }
            if (size < std.Hash.MIN_SIZE)
                size = std.Hash.MIN_SIZE;
            // CLEAR
            this.hashGroup = new std.Vector();
            // AND INSERTS WITHI CAPACITY SIZE
            for (var i = 0; i < size; i++)
                this.hashGroup.pushBack(new std.Vector());
        };
        UnorderedSet.prototype.reconstructHashGroup = function (size) {
            if (size === void 0) { size = -1; }
            if (size == -1)
                size = this.size() * std.Hash.RATIO;
            // CONSTURCT HASH_GROUP
            this.constructHashGroup(size);
            //RE-INSERT ELEMENTS TO HASH GROUP
            for (var it = this.begin(); it.equals(this.end()) == false; it = it.next())
                this.handleInsert(it);
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        UnorderedSet.prototype.find = function (val) {
            var hashIndex = this.hashIndex(val);
            var hashArray = this.hashGroup.at(hashIndex);
            for (var i = 0; i < hashArray.size(); i++)
                if (std.equals(hashArray.at(i).value, val))
                    return hashArray.at(i);
            return this.end();
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        UnorderedSet.prototype.insertByRange = function (begin, end) {
            // CALCULATE INSERTING SIZE
            var size = 0;
            for (var it = begin; it.equals(end) == false; it = it.next())
                size++;
            // IF NEEDED, HASH_GROUP TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hashGroup.size() * 2)
                this.reconstructHashGroup((this.size() + size) * std.Hash.RATIO);
            // INSERTS
            _super.prototype.insertByRange.call(this, begin, end);
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        UnorderedSet.prototype.handleInsert = function (item) {
            if (this.size() > this.hashGroup.size() * std.Hash.MAX_RATIO)
                this.reconstructHashGroup();
            var index = this.hashIndex(item.value);
            this.hashGroup.at(index).push(item);
        };
        /**
         * @inheritdoc
         */
        UnorderedSet.prototype.handleErase = function (item) {
            var index = this.hashIndex(item.value);
            var hashArray = this.hashGroup.at(index);
            for (var it = hashArray.begin(); it.equals(hashArray.end()) == false; it = it.next())
                if (it.value == item) {
                    hashArray.erase(it);
                    break;
                }
        };
        UnorderedSet.prototype.hashIndex = function (val) {
            return std.Hash.code(val) % this.hashGroup.size();
        };
        return UnorderedSet;
    })(std.AbstractSet);
    std.UnorderedSet = UnorderedSet;
})(std || (std = {}));
/// <reference path="../List.ts" />
/// <reference path="../UnorderedSet.ts" />
var std;
(function (std) {
    var example;
    (function (example) {
        var ContainerTest = (function () {
            function ContainerTest() {
                document.write("<h3> Container Test </h3>\n\n");
                this.testList();
                this.testUnorderedSet();
            }
            ContainerTest.prototype.testList = function () {
                document.write("<h4> List </h4>\n");
                // CONSTRUCT LIST WITH ELEMENTS 0 TO 9
                var container = new std.List();
                for (var i = 0; i < 10; i++)
                    container.pushBack(i);
                // ELEMENTS I/O
                document.write("Erase of 7th element<br>\n" +
                    "Insert (-5) as 5th element<br>\n" +
                    "Erase of 3rd element<br><br>\n\n");
                container.erase(container.begin().advance(7));
                container.insert(container.begin().advance(5), -5);
                container.erase(container.begin().advance(3));
                // PRINTS
                document.write("Elements in the List: #" + container.size() + "<br>\n");
                document.write("<ul>\n");
                for (var it = container.begin(); it.equals(container.end()) == false; it = it.next())
                    document.write("\t<li>" + it.value + "</li>\n");
                document.write("</ul>\n\n");
            };
            ContainerTest.prototype.testUnorderedSet = function () {
                document.write("<h4> UnorderedSet </h4>\n");
                // CONSTRUCT LIST WITH ELEMENTS 0 TO 9
                var container = new std.UnorderedSet();
                for (var i = 0; i < 10; i++)
                    container.insert(i);
                // ELEMENTS I/O
                document.write("Erase 7<br>\n" +
                    "Insert -5<br>\n" +
                    "Erase 3<br><br>\n\n");
                container.erase(7);
                container.insert(-5);
                container.insert(-5);
                container.insert(-5);
                container.insert(-5);
                container.erase(3);
                container.erase(3);
                container.erase(100);
                // PRINTS
                document.write("Elements in the UnorderedSet: #" + container.size() + "<br>\n");
                document.write("<ul>\n");
                for (var it = container.begin(); it.equals(container.end()) == false; it = it.next())
                    document.write("<li>" + it.value + "</li>\n");
                document.write("</ul>\n\n");
            };
            ContainerTest.main = function () {
                new ContainerTest();
            };
            return ContainerTest;
        })();
        example.ContainerTest = ContainerTest;
    })(example = std.example || (std.example = {}));
})(std || (std = {}));
/// <reference path="AbstractMap.ts" />
/// <reference path="Hash.ts" />
var std;
(function (std) {
    /**
     * <p> Unordered Map. </p>
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
     * @tparam K Type of the key values.
     *           Each element in an <code>UnorderedMap</code> is uniquely identified by its key value.
     * @tparam T Type of the mapped value.
     *           Each element in an <code>UnorderedMap</code> is used to store some data as its mapped value.
     *
     * @author Migrated by Jeongho Nam
     */
    var UnorderedMap = (function (_super) {
        __extends(UnorderedMap, _super);
        function UnorderedMap() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            this.constructHashGroup();
            if (args.length == 0) {
                _super.call(this);
            }
            else if (args.length == 1) {
                _super.call(this, args[0]);
            }
            else if (args.length == 2) {
                _super.call(this, args[0], args[1]);
            }
        }
        UnorderedMap.prototype.constructByArray = function (items) {
            this.constructHashGroup(items.length * std.Hash.RATIO);
            _super.prototype.constructByArray.call(this, items);
        };
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        UnorderedMap.prototype.assign = function (begin, end) {
            var it;
            var size = 0;
            // REVERSE HASH_GROUP SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;
            this.constructHashGroup(size * std.Hash.RATIO);
            // SUPER; INSERT
            _super.prototype.assign.call(this, begin, end);
        };
        /**
         * @inheritdoc
         */
        UnorderedMap.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.constructHashGroup();
        };
        /* ---------------------------------------------------------
            HASH GROUP
        --------------------------------------------------------- */
        UnorderedMap.prototype.constructHashGroup = function (size) {
            if (size === void 0) { size = -1; }
            if (size < std.Hash.MIN_SIZE)
                size = std.Hash.MIN_SIZE;
            // CLEAR
            this.hashGroup = new std.Vector();
            // AND INSERTS WITHI CAPACITY SIZE
            for (var i = 0; i < size; i++)
                this.hashGroup.pushBack(new std.Vector());
        };
        UnorderedMap.prototype.reconstructHashGroup = function (size) {
            if (size === void 0) { size = -1; }
            if (size == -1)
                size = this.size() * std.Hash.RATIO;
            // CONSTURCT HASH_GROUP
            this.constructHashGroup(size);
            // INSERT ELEMENTS TO HASH GROUP
            for (var it = this.begin(); it.equals(this.end()) == false; it = it.next())
                this.handleInsert(it);
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        UnorderedMap.prototype.find = function (key) {
            var hashIndex = this.hashIndex(key);
            var hashArray = this.hashGroup.at(hashIndex);
            for (var i = 0; i < hashArray.size(); i++)
                if (std.equals(hashArray.at(i).first, key))
                    return hashArray.at(i);
            return this.end();
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        UnorderedMap.prototype.insertByRange = function (begin, end) {
            // CALCULATE INSERTING SIZE
            var size = 0;
            for (var it = begin; it.equals(end) == false; it = it.next())
                size++;
            // IF NEEDED, HASH_GROUP TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hashGroup.size() * 2)
                this.reconstructHashGroup((this.size() + size) * std.Hash.RATIO);
            // INSERTS
            _super.prototype.insertByRange.call(this, begin, end);
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        UnorderedMap.prototype.handleInsert = function (it) {
            if (this.hashGroup.size() > this.size() * 2)
                this.reconstructHashGroup();
            var key = it.first;
            var hashIndex = this.hashIndex(key);
            this.hashGroup.at(hashIndex).pushBack(it);
        };
        /**
         * @inheritdoc
         */
        UnorderedMap.prototype.handleErase = function (it) {
            // FIND MATCHED HASHES
            var key = it.first;
            var hashIndex = this.hashIndex(key);
            var hashVector = this.hashGroup.at(hashIndex);
            // ERASE FROM THE HASHES
            for (var i = 0; i < hashVector.size(); i++) {
                if (std.equals(it.first, hashVector.at(i).first) == true) {
                    hashVector.erase(hashVector.begin().advance(i));
                    break;
                }
            }
        };
        UnorderedMap.prototype.hashIndex = function (val) {
            return std.Hash.code(val) % this.hashGroup.size();
        };
        return UnorderedMap;
    })(std.AbstractMap);
    std.UnorderedMap = UnorderedMap;
})(std || (std = {}));
/// <reference path="UnorderedMap.ts" />
/// <reference path="UnorderedSet.ts" />
/// <reference path="IMap.ts" />
/// <reference path="AbstractMap.ts" />
var std;
(function (std) {
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        Map.prototype.assign = function (begin, end) {
            _super.prototype.assign.call(this, begin, end);
        };
        /**
         * @inheritdoc
         */
        Map.prototype.clear = function () {
            _super.prototype.clear.call(this);
        };
        /* ---------------------------------------------------------
            TREE
        --------------------------------------------------------- */
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        Map.prototype.find = function (key) {
            return this.end();
        };
        /* =========================================================
            ELEMENTS I/O
                - POST-PROCESS
        ============================================================
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        Map.prototype.handleInsert = function (item) {
        };
        /**
         * @inheritdoc
         */
        Map.prototype.handleErase = function (item) {
        };
        return Map;
    })(std.AbstractMap);
    std.Map = Map;
})(std || (std = {}));
/// <reference path="AbstractSet.ts" />
var std;
(function (std) {
    var Set = (function (_super) {
        __extends(Set, _super);
        function Set() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        Set.prototype.assign = function (begin, end) {
            _super.prototype.assign.call(this, begin, end);
        };
        /**
         * @inheritdoc
         */
        Set.prototype.clear = function () {
            _super.prototype.clear.call(this);
        };
        /* ---------------------------------------------------------
            TREE
        --------------------------------------------------------- */
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        Set.prototype.find = function (val) {
            return this.end();
        };
        /* =========================================================
            ELEMENTS I/O
                - POST-PROCESS
        ============================================================
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        Set.prototype.handleInsert = function (item) {
        };
        /**
         * @inheritdoc
         */
        Set.prototype.handleErase = function (item) {
        };
        return Set;
    })(std.AbstractSet);
    std.Set = Set;
})(std || (std = {}));
var std;
(function (std) {
    var Tree = (function () {
        function Tree() {
        }
        Object.defineProperty(Tree, "BLACK", {
            get: function () { return 0; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tree, "RED", {
            get: function () { return 1; },
            enumerable: true,
            configurable: true
        });
        return Tree;
    })();
    std.Tree = Tree;
})(std || (std = {}));
//# sourceMappingURL=std.js.map