var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
             * @author Jeongho Nam
             */
            var Container = (function () {
                function Container() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    if (args.length == 1 && (args[0] instanceof std.Vector || args[0] instanceof Container)) {
                        var container_2 = args[0];
                        this.assign(container_2.begin(), container_2.end());
                    }
                    else if (args.length == 2 && args[0] instanceof container_1.Iterator && args[1] instanceof container_1.Iterator) {
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
            }());
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
                    this.source = source;
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
                 * index number is different, then the {@link equals equals()} will return false. If you want to
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
                    enumerable: true,
                    configurable: true
                });
                return Iterator;
            }());
            container.Iterator = Iterator;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        var container;
        (function (container_3) {
            /**
             * <p> An abstract map. </p>
             *
             * <h3> Container properties </h3>
             * <dl>
             *	<dt> Ordered </dt>
             *	<dd> The elements in the container follow a strict order at all times. All inserted elements are
             *		 given a position in this order. </dd>
             *
             *	<dt> Map </dt>
             *	<dd> Each element associates a <i>key</i> to a <i>mapped value</i>:
             *		 <i>Keys</i> are meant to identify the elements whose main content is the <i>mapped value</i>. </dd>
             * </dl>
             *
             * @author Jeongho Nam
             */
            var MapContainer = (function () {
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
                function MapContainer() {
                    this.data = new std.List();
                }
                /**
                 * @private
                 */
                MapContainer.prototype.constructByArray = function (items) {
                    for (var i = 0; i < items.length; i++)
                        this.insertByPair(items[i]);
                };
                /**
                 * @private
                 */
                MapContainer.prototype.constructByContainer = function (container) {
                    this.constructByRange(container.begin(), container.end());
                };
                /**
                 * @private
                 */
                MapContainer.prototype.constructByRange = function (begin, end) {
                    this.assign(begin, end);
                };
                /* ---------------------------------------------------------
                    ASSIGN & CLEAR
                --------------------------------------------------------- */
                /**
                 * <p> Assign new content to content. </p>
                 *
                 * <p> Assigns new contents to the Container, replacing its current contents,
                 * and modifying its size accordingly. </p>
                 *
                 * @param begin Input interator of the initial position in a sequence.
                 * @param end Input interator of the final position in a sequence.
                 */
                MapContainer.prototype.assign = function (begin, end) {
                    // INSERT
                    for (var it = begin; it.equals(end) == false; it = it.next())
                        this.insertByPair(new std.Pair(it.first, it.second));
                };
                /**
                 * <p> Clear content. </p>
                 *
                 * <p> Removes all elements from the Container, leaving the container with a size of 0. </p>
                 */
                MapContainer.prototype.clear = function () {
                    this.data.clear();
                };
                /**
                 * <p> Return iterator to beginning. </p>
                 * <p> Returns an iterator referring the first element in the Container. </p>
                 *
                 * <h4> Note </h4>
                 * <p> If the container is empty, the returned iterator is same with {@link end()}. </p>
                 *
                 * @return An iterator to the first element in the container.
                 * The iterator containes the first element's value.
                 */
                MapContainer.prototype.begin = function () {
                    return new std.MapIterator(this, this.data.begin());
                };
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
                 * <p> If the container is empty, this function returns the same as {@link begin}. </p>
                 *
                 * @return An iterator to the end element in the container.
                 */
                MapContainer.prototype.end = function () {
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
                 *
                 * @return Whether the map has an item having the specified identifier.
                 */
                MapContainer.prototype.has = function (key) {
                    return this.count(key) != 0;
                };
                /**
                 * Return the number of elements in the map.
                 */
                MapContainer.prototype.size = function () {
                    return this.data.size();
                };
                /**
                 * Test whether the Container is empty.
                 */
                MapContainer.prototype.empty = function () {
                    return this.size() == 0;
                };
                MapContainer.prototype.insert = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    if (args.length == 1 && args[0] instanceof std.Pair) {
                        return this.insertByPair(args[0]);
                    }
                    else if (args.length == 2 && args[0] instanceof std.MapIterator && args[1] instanceof std.Pair) {
                        return this.insertByHint(args[0], args[1]);
                    }
                    else if (args.length == 2 && args[0] instanceof std.MapIterator && args[1] instanceof std.MapIterator) {
                        return this.insertByRange(args[0], args[1]);
                    }
                };
                MapContainer.prototype.insertByHint = function (hint, pair) {
                    // INSERT
                    var list_it = this.data.insert(hint.getListIterator(), pair);
                    // POST-PROCESS
                    var it = new std.MapIterator(this, list_it);
                    this.handleInsert(it);
                    return it;
                };
                MapContainer.prototype.insertByRange = function (begin, end) {
                    for (var it = begin; it.equals(end) == false; it = it.next())
                        this.insertByPair(new std.Pair(it.first, it.second));
                };
                MapContainer.prototype.erase = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    if (args.length == 1) {
                        if (args[0] instanceof std.MapIterator && args[0].getSource() == this)
                            return this.eraseByIterator(args[0]);
                        else
                            return this.eraseByKey(args[0]);
                    }
                    else if (args.length == 2 && args[0] instanceof std.MapIterator && args[1] instanceof std.MapIterator)
                        return this.eraseByRange(args[0], args[1]);
                };
                /**
                 * @private
                 */
                MapContainer.prototype.eraseByKey = function (key) {
                    var it = this.find(key);
                    if (it.equals(this.end()) == true)
                        return 0;
                    this.eraseByIterator(it);
                    return 1;
                };
                /**
                 * @private
                 */
                MapContainer.prototype.eraseByIterator = function (it) {
                    // ERASE
                    var listIterator = this.data.erase(it.getListIterator());
                    // POST-PROCESS
                    this.handleErase(it);
                    return new std.MapIterator(this, listIterator);
                    ;
                };
                /**
                 * @private
                 */
                MapContainer.prototype.eraseByRange = function (begin, end) {
                    // ERASE
                    var listIterator = this.data.erase(begin.getListIterator(), end.getListIterator());
                    // POST-PROCESS
                    for (var it = begin; it.equals(this.end()) == false; it = it.next())
                        this.handleErase(it);
                    return new std.MapIterator(this, listIterator);
                };
                return MapContainer;
            }());
            container_3.MapContainer = MapContainer;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="MapContainer.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        var container;
        (function (container) {
            var MultiMap = (function (_super) {
                __extends(MultiMap, _super);
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                /**
                 * Default Constructor.
                 */
                function MultiMap() {
                    _super.call(this);
                }
                /**
                 * @inheritdoc
                 */
                MultiMap.prototype.count = function (key) {
                    var myIt = this.find(key);
                    if (myIt.equals(this.end()))
                        return 0;
                    var size = 0;
                    for (var it = myIt.next(); !it.equals(this.end()) && std.equals(key, it.first); it = it.next())
                        size++;
                    return size;
                };
                MultiMap.prototype.insert = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    return _super.prototype.insert.apply(this, args);
                };
                return MultiMap;
            }(container.MapContainer));
            container.MultiMap = MultiMap;
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
             * Abstract Set.
             *
             * @author Jeongho Nam
             */
            var SetContainer = (function (_super) {
                __extends(SetContainer, _super);
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
                function SetContainer() {
                    _super.call(this);
                    // INITIALIZATION
                    this.data = new std.List();
                    //// OVERLOADINGS
                    //if (args.length == 1 && args[0] instanceof Array && args[0] instanceof Vector == false)
                    //{
                    //	this.constructByArray(args[0]);
                    //}
                    //else if (args.length == 1 && args[0] instanceof Container)
                    //{
                    //	this.constructByContainer(args[0]);
                    //}
                    //else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
                    //{
                    //	this.constructByRange(args[0], args[1]);
                    //}
                }
                /**
                 * @private
                 */
                SetContainer.prototype.constructByArray = function (items) {
                    for (var i = 0; i < items.length; i++)
                        this.insertByVal(items[i]);
                };
                /**
                 * @private
                 */
                SetContainer.prototype.constructByContainer = function (container) {
                    this.constructByRange(container.begin(), container.end());
                };
                /**
                 * @private
                 */
                SetContainer.prototype.constructByRange = function (begin, end) {
                    this.assign(begin, end);
                };
                /* ---------------------------------------------------------
                    ASSIGN & CLEAR
                --------------------------------------------------------- */
                /**
                 * @inheritdoc
                 */
                SetContainer.prototype.assign = function (begin, end) {
                    // INSERT
                    for (var it = begin; it.equals(end) == false; it = it.next())
                        this.insertByVal(it.value);
                };
                /**
                 * @inheritdoc
                 */
                SetContainer.prototype.clear = function () {
                    this.data.clear();
                };
                /**
                 * @inheritdoc
                 */
                SetContainer.prototype.begin = function () {
                    return new std.SetIterator(this, this.data.begin());
                };
                /**
                 * @inheritdoc
                 */
                SetContainer.prototype.end = function () {
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
                SetContainer.prototype.has = function (val) {
                    return this.count(val) != 0;
                };
                /**
                 * @inheritdoc
                 */
                SetContainer.prototype.size = function () {
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
                /**
                 * @inheritdoc
                 */
                SetContainer.prototype.push = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    for (var i = 0; i < args.length; i++)
                        this.insertByVal(args[i]);
                    return this.size();
                };
                SetContainer.prototype.insert = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    if (args.length == 1)
                        return this.insertByVal(args[0]);
                    else if (args.length == 2 && args[0] instanceof container_4.Iterator) {
                        if (args[1] instanceof container_4.Iterator && args[0].getSource() != this && args[1].getSource() != this)
                            return this.insertByRange(args[0], args[1]);
                        else
                            return this.insertByHint(args[0], args[1]);
                    }
                };
                /**
                 * @private
                 */
                SetContainer.prototype.insertByHint = function (hint, val) {
                    // INSERT
                    var listIterator = this.data.insert(hint.getListIterator(), val);
                    // POST-PROCESS
                    var it = new std.SetIterator(this, listIterator);
                    this.handleInsert(it);
                    return it;
                };
                /**
                 * @private
                 */
                SetContainer.prototype.insertByRange = function (begin, end) {
                    for (var it = begin; it.equals(end) == false; it = it.next())
                        this.insertByVal(it.value);
                };
                SetContainer.prototype.erase = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    if (args.length == 1) {
                        if (args[0] instanceof container_4.Iterator && args[0].getSource() == this)
                            return this.eraseByIterator(args[0]);
                        else
                            return this.eraseByKey(args[0]);
                    }
                    else if (args.length == 2 && args[0] instanceof container_4.Iterator && args[1] instanceof container_4.Iterator)
                        return this.eraseByRange(args[0], args[1]);
                };
                /**
                 * @private
                 */
                SetContainer.prototype.eraseByKey = function (val) {
                    // TEST WHETHER EXISTS
                    var it = this.find(val);
                    if (it.equals(this.end()) == true)
                        return 0;
                    // ERASE
                    this.eraseByIterator(it);
                    return 1;
                };
                /**
                 * @private
                 */
                SetContainer.prototype.eraseByIterator = function (it) {
                    // ERASE
                    var listIterator = this.data.erase(it.getListIterator());
                    // POST-PROCESS
                    this.handleErase(it);
                    return new std.SetIterator(this, listIterator);
                };
                /**
                 * @private
                 */
                SetContainer.prototype.eraseByRange = function (begin, end) {
                    // ERASE
                    var listIterator = this.data.erase(begin.getListIterator(), end.getListIterator());
                    // POST-PROCESS
                    for (var it = begin; !it.equals(this.end()); it = it.next())
                        this.handleErase(it);
                    return new std.SetIterator(this, listIterator); //begin.prev();
                };
                return SetContainer;
            }(container_4.Container));
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
            var MultiSet = (function (_super) {
                __extends(MultiSet, _super);
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                /**
                 * Default Constructor.
                 */
                function MultiSet() {
                    _super.call(this);
                }
                MultiSet.prototype.count = function (val) {
                    var myIt = this.find(val);
                    if (myIt.equals(this.end()))
                        return 0;
                    var size = 0;
                    for (var it = myIt; !it.equals(this.end()) && std.equals(val, it.value); it = it.next())
                        size++;
                    return size;
                };
                MultiSet.prototype.insert = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    return _super.prototype.insert.apply(this, args);
                };
                return MultiSet;
            }(container.SetContainer));
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
        (function (container) {
            var UniqueMap = (function (_super) {
                __extends(UniqueMap, _super);
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                /**
                 * Default Constructor.
                 */
                function UniqueMap() {
                    _super.call(this);
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
                UniqueMap.prototype.get = function (key) {
                    var it = this.find(key);
                    if (it.equals(this.end()) == true)
                        throw new std.OutOfRange("unable to find the matched key.");
                    return it.second;
                };
                UniqueMap.prototype.set = function (key, val) {
                    var it = this.find(key);
                    if (it.equals(this.end()) == true)
                        this.insert(new std.Pair(key, val));
                    else
                        it.second = val;
                };
                UniqueMap.prototype.insert = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    return _super.prototype.insert.apply(this, args);
                };
                return UniqueMap;
            }(container.MapContainer));
            container.UniqueMap = UniqueMap;
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
            var UniqueSet = (function (_super) {
                __extends(UniqueSet, _super);
                /* =========================================================
                    CONSTRUCTORS
                ========================================================= */
                /**
                 * Default Constructor.
                 */
                function UniqueSet() {
                    _super.call(this);
                }
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
                return UniqueSet;
            }(container.SetContainer));
            container.UniqueSet = UniqueSet;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
// Type definitions for STL (Standard Template Library) v0.8.0
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
                var type = typeof par;
                if (type == "number")
                    return codeByNumber(par);
                else if (type == "string")
                    return codeByString(par);
                else
                    return codeByObject(par);
            }
            hash.code = code;
            /**
             * @private
             */
            function codeByNumber(val) {
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
             * @private
             */
            function codeByString(str) {
                // ------------------------
                //	IN C++
                // ------------------------
                var code = 2166136261;
                for (var i = 0; i < str.length; i++) {
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
             * @private
             */
            function codeByObject(obj) {
                if (obj.hashCode != undefined)
                    return obj.hashCode();
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
                 * Reserve the bucket size.
                 *
                 * @param size Number of bucket size to reserve.
                 */
                HashBuckets.prototype.reserve = function (size) {
                    if (size < hash.MIN_SIZE)
                        size = hash.MIN_SIZE;
                    var prevMatrix = this.buckets;
                    this.buckets = new std.Vector();
                    for (var i = 0; i < size; i++)
                        this.buckets.pushBack(new std.Vector());
                    for (var i = 0; i < prevMatrix.size(); i++)
                        for (var j = 0; j < prevMatrix.at(i).size(); j++) {
                            var val = prevMatrix.at(i).at(j);
                            this.buckets.at(this.hashIndex(val)).pushBack(val);
                            this.itemSize_++;
                        }
                };
                HashBuckets.prototype.clear = function () {
                    this.buckets = new std.Vector();
                    this.itemSize_ = 0;
                    for (var i = 0; i < hash.MIN_SIZE; i++)
                        this.buckets.pushBack(new std.Vector());
                };
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                HashBuckets.prototype.size = function () {
                    return this.buckets.size();
                };
                HashBuckets.prototype.itemSize = function () {
                    return this.itemSize_;
                };
                HashBuckets.prototype.at = function (index) {
                    return this.buckets.at(index);
                };
                HashBuckets.prototype.hashIndex = function (val) {
                    return hash.code(val) % this.buckets.size();
                };
                /* ---------------------------------------------------------
                    ELEMENTS I/O
                --------------------------------------------------------- */
                HashBuckets.prototype.insert = function (val) {
                    this.buckets.at(this.hashIndex(val)).pushBack(val);
                    if (++this.itemSize_ > this.buckets.size() * hash.MAX_RATIO)
                        this.reserve(this.itemSize_ * hash.RATIO);
                };
                HashBuckets.prototype.erase = function (val) {
                    var hashes = this.buckets.at(this.hashIndex(val));
                    for (var i = 0; i < hashes.size(); i++)
                        if (hashes.at(i) == val) {
                            hashes.splice(i, 1);
                            this.itemSize_--;
                            break;
                        }
                };
                return HashBuckets;
            }());
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
            var MapHashBuckets = (function (_super) {
                __extends(MapHashBuckets, _super);
                function MapHashBuckets(map) {
                    _super.call(this);
                    this.map = map;
                }
                MapHashBuckets.prototype.find = function (key) {
                    var index = hash.code(key) % this.size();
                    var bucket = this.at(index);
                    for (var i = 0; i < bucket.size(); i++)
                        if (std.equals(bucket.at(i).first, key))
                            return bucket.at(i);
                    return this.map.end();
                };
                return MapHashBuckets;
            }(hash.HashBuckets));
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
            var SetHashBuckets = (function (_super) {
                __extends(SetHashBuckets, _super);
                function SetHashBuckets(set) {
                    _super.call(this);
                    this.set = set;
                }
                SetHashBuckets.prototype.find = function (val) {
                    var index = hash.code(val) % this.size();
                    var bucket = this.at(index);
                    for (var i = 0; i < bucket.size(); i++)
                        if (std.equals(bucket.at(i).value, val))
                            return bucket.at(i);
                    return this.set.end();
                };
                return SetHashBuckets;
            }(hash.HashBuckets));
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
             * @author Jeongho Nam
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
                 * <p> {@link ErrorCategory.defaultErrorCondition ErrorCategory.defaultErrorCondition()}
                 * is a virtual member function, that can operate differently for each category. </p>
                 *
                 * @return An {@link ErrorCondition}object that corresponds to the {@link ErrorCode} object.
                 */
                ErrorInstance.prototype.defaultErrorCondition = function () {
                    if (this.category_ == null || this.value_ == 0)
                        return null;
                    else
                        return this.category_.defaultErrorCondition(this.value_);
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
                ErrorInstance.prototype.toBoolean = function () {
                    return this.value_ != 0;
                };
                return ErrorInstance;
            }());
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
             * Abstract Tree.
             *
             * @param <T> Type of elements.
             *
             * @author Jeongho Nam
             */
            var XTree = (function () {
                /* =========================================================
                    CONSTRUCTOR
                ========================================================= */
                /**
                 * Default Constructor.
                 */
                function XTree() {
                    this.root = null;
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
                XTree.prototype.find = function (val) {
                    if (this.root == null)
                        return null;
                    var node = this.root;
                    while (true) {
                        var newNode = null;
                        if (this.isEquals(val, node.value))
                            break; // EQUALS, MEANS MATCHED, THEN TERMINATE
                        else if (this.isLess(val, node.value))
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
                XTree.prototype.fetchMaximum = function (node) {
                    while (node.right != null)
                        node = node.right;
                    return node;
                };
                /* ---------------------------------------------------------
                    ROTATION
                --------------------------------------------------------- */
                /**
                 * Rotate a node left.
                 *
                 * @param node Node to rotate left.
                 */
                XTree.prototype.rotateLeft = function (node) {
                    var right = node.right;
                    this.replaceNode(node, right);
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
                XTree.prototype.rotateRight = function (node) {
                    var left = node.left;
                    this.replaceNode(node, left);
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
                XTree.prototype.replaceNode = function (oldNode, newNode) {
                    if (oldNode.parent == null)
                        this.root = newNode;
                    else {
                        if (oldNode == oldNode.parent.left)
                            oldNode.parent.left = newNode;
                        else
                            oldNode.parent.right = newNode;
                    }
                    if (newNode != null)
                        newNode.parent = oldNode.parent;
                };
                return XTree;
            }());
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
             * @author Migrated by Jeongho Nam
             */
            var RBTree = (function (_super) {
                __extends(RBTree, _super);
                /* =========================================================
                    CONSTRUCTOR
                ========================================================= */
                /**
                 * Default Constructor.
                 */
                function RBTree() {
                    _super.call(this);
                }
                /* =========================================================
                    ELEMENTS I/O
                        - INSERT
                        - ERASE
                        - COLOR
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
                 *		<i><b>N</b></i>'s parent node, {@link XTreeNode.grandParent <b>G</b>} will denote <i><b>N</b></i>'s
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
                RBTree.prototype.insert = function (val) {
                    var parent = this.find(val);
                    var node = new tree.XTreeNode(val, tree.Color.RED);
                    if (parent == null)
                        this.root = node;
                    else {
                        node.parent = parent;
                        if (this.isLess(node.value, parent.value))
                            parent.left = node;
                        else
                            parent.right = node;
                    }
                    this.insertCase1(node);
                };
                /**
                 * <p> <i><b>N</b></i> is the root node, i.e., first node of red-black tree. </p>
                 *
                 * <p> The current node <i><b>N</b></i> is at the {@link root} of the tree. </p>
                 *
                 * <p> In this case, it is repainted <font color='darkBlue'>black</font> to satisfy property 2 (the root is
                 * <font color='darkBlue'>black</font>). Since this adds one <font color='darkBlue'>black</font> node to
                 * every path at once, property 5 (all paths from any given node to its leaf nodes contain the same number
                 * of <font color='darkBlue'>black</font> nodes) is not violated. </p>
                 *
                 * @param N A node to be inserted or swapped.
                 */
                RBTree.prototype.insertCase1 = function (N) {
                    if (N.parent == null)
                        N.color = tree.Color.BLACK;
                    else
                        this.insertCase2(N);
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
                RBTree.prototype.insertCase2 = function (N) {
                    if (this.fetchColor(N.parent) == tree.Color.BLACK)
                        return;
                    else
                        this.insertCase3(N);
                };
                /**
                 * <p> <i><b>N</b></i>'s parent ({@link XTreeNode.parent <b>P</b>}) and uncle
                 * (<i>{@link XTreeNode.uncle <b>U</b>}</i>) are <font color='red'>red</font>. </p>
                 *
                 * <p> If both the parent {@link XTreeNode.parent <b>P</b>} and the uncle {@link XTreeNode.uncle <b>U</b>}
                 * are <font color='red'>red</font>, then both of them can be repainted <font color='darkBlue'>black</font>
                 * and the grandparent {@link XTreeNode.grandParent <b>G</b>} becomes <font color='red'>red</font> (to
                 * maintain property 5 (all paths from any given node to its leaf nodes contain the same number of
                 * <font color='darkBlue'>black</font> nodes)). </p>
                 *
                 * <p> Now, the current <font color='red'>red</font> node <i><b>N</b></i> has a
                 * <font color='darkBlue'>black</font> parent. Since any path through the parent or uncle must pass through
                 * the grandparent, the number of <font color='darkBlue'>black</font> nodes on these paths has not changed.
                 *
                 * <p> However, the grandparent {@link XTreeNode.grandParent <b>G</b>} may now violate properties 2 (The
                 * root is <font color='darkBlue'>black</font>) or 4 (Both children of every <font color='red'>red</font>
                 * node are <font color='darkBlue'>black</font>) (property 4 possibly being violated since
                 * {@link XTreeNode.grandParent <b>G</b>} may have a <font color='red'>red</font> parent). </p>
                 *
                 * <p> To fix this, the entire procedure is recursively performed on {@link XTreeNode.grandParent <b>G</b>}
                 * from case 1. Note that this is a tail-recursive call, so it could be rewritten as a loop; since this is
                 * the only loop, and any rotations occur after this loop, this proves that a constant number of rotations
                 * occur. </p>
                 *
                 * <p> <img src="../assets/images/tree/Red-black_tree_insert_case_3.svg" /> </p>
                 *
                 * @param N A node to be inserted or swapped.
                 */
                RBTree.prototype.insertCase3 = function (N) {
                    if (this.fetchColor(N.uncle) == tree.Color.RED) {
                        N.parent.color = tree.Color.BLACK;
                        N.uncle.color = tree.Color.BLACK;
                        N.grandParent.color = tree.Color.RED;
                        this.insertCase1(N.grandParent);
                    }
                    else {
                        this.insertCase4(N);
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
                 * {@link XTreeNode.grandParent <b>G</b>}. </p>
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
                RBTree.prototype.insertCase4 = function (node) {
                    if (node == node.parent.right && node.parent == node.grandParent.left) {
                        this.rotateLeft(node.parent);
                        node = node.left;
                    }
                    else if (node == node.parent.left && node.parent == node.grandParent.right) {
                        this.rotateRight(node.parent);
                        node = node.right;
                    }
                    this.insertCase5(node);
                };
                /**
                 * <p> <i><b>N</b></i> is added to left of left child of grandparent, or <i><b>N</b></i> is added to right
                 * of right child of grandparent ({@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> and
                 * {@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>). </p>
                 *
                 * <p> The parent {@link XTreeNode.parent <b>P</b>} is <font color='red'>red</font> but the uncle
                 * {@link XTreeNode.uncle <b>U</b>} is <font color='darkBlue'>black</font>, the current node <i><b>N</b></i>
                 * is the left child of {@link XTreeNode.parent <b>P</b>}, and {@link XTreeNode.parent <b>P</b>} is the left
                 * child of its parent {@link XTreeNode.grandParent <b>G</b>}. </p>
                 *
                 * <p>In this case, a right rotation on {@link XTreeNode.grandParent <b>G</b>} is performed; the result is a
                 * tree where the former parent {@link XTreeNode.parent <b>P</b>} is now the parent of both the current node
                 * <i><b>N</b></i> and the former grandparent {@link XTreeNode.grandParent <b>G</b>}. </p>
                 *
                 * <p> {@link XTreeNode.grandParent <b>G</b>} is known to be <font color='darkBlue'>black</font>, since its
                 * former child {@link XTreeNode.parent <b>P</b>} could not have been <font color='red'>red</font> otherwise
                 * (without violating property 4). Then, the colors of {@link XTreeNode.parent <b>P</b>} and
                 * {@link XTreeNode.grandParent <b>G</b>} are switched, and the resulting tree satisfies property 4 (both
                 * children of every <font color='red'>red</font> node are <font color='darkBlue'>black</font>). Property 5
                 * (all paths from any given node to its leaf nodes contain the same number of
                 * <font color='darkBlue'>black</font> nodes) also remains satisfied, since all paths that went through any
                 * of these three nodes went through {@link XTreeNode.grandParent <b>G</b>} before, and now they all go
                 * through {@link XTreeNode.parent <b>P</b>}. In each case, this is the only
                 * <font color='darkBlue'>black</font> node of the three. </p>
                 *
                 * <p> <img src="../assets/images/tree/Red-black_tree_insert_case_5.svg" /> </p>
                 *
                 * @param N A node to be inserted or swapped.
                 */
                RBTree.prototype.insertCase5 = function (node) {
                    node.parent.color = tree.Color.BLACK;
                    node.grandParent.color = tree.Color.RED;
                    if (node == node.parent.left && node.parent == node.grandParent.left)
                        this.rotateRight(node.grandParent);
                    else
                        this.rotateLeft(node.grandParent);
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
                RBTree.prototype.erase = function (val) {
                    var node = this.find(val);
                    if (node == null || this.isEquals(val, node.value) == false)
                        return;
                    if (node.left != null && node.right != null) {
                        var pred = this.fetchMaximum(node.left);
                        node.value = pred.value;
                        node = pred;
                    }
                    var child = (node.right == null) ? node.left : node.right;
                    if (this.fetchColor(node) == tree.Color.BLACK) {
                        node.color = this.fetchColor(child);
                        this.eraseCase1(node);
                    }
                    this.replaceNode(node, child);
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
                RBTree.prototype.eraseCase1 = function (N) {
                    if (N.parent == null)
                        return;
                    else
                        this.eraseCase2(N);
                };
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
                RBTree.prototype.eraseCase2 = function (N) {
                    if (this.fetchColor(N.sibling) == tree.Color.RED) {
                        N.parent.color = tree.Color.RED;
                        N.sibling.color = tree.Color.BLACK;
                        if (N == N.parent.left)
                            this.rotateLeft(N.parent);
                        else
                            this.rotateRight(N.parent);
                    }
                    this.eraseCase3(N);
                };
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
                RBTree.prototype.eraseCase3 = function (N) {
                    if (this.fetchColor(N.parent) == tree.Color.BLACK &&
                        this.fetchColor(N.sibling) == tree.Color.BLACK &&
                        this.fetchColor(N.sibling.left) == tree.Color.BLACK &&
                        this.fetchColor(N.sibling.right) == tree.Color.BLACK) {
                        N.sibling.color = tree.Color.RED;
                        this.eraseCase1(N.parent);
                    }
                    else
                        this.eraseCase4(N);
                };
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
                RBTree.prototype.eraseCase4 = function (N) {
                    if (this.fetchColor(N.parent) == tree.Color.RED &&
                        N.sibling != null &&
                        this.fetchColor(N.sibling) == tree.Color.BLACK &&
                        this.fetchColor(N.sibling.left) == tree.Color.BLACK &&
                        this.fetchColor(N.sibling.right) == tree.Color.BLACK) {
                        N.sibling.color = tree.Color.RED;
                        N.parent.color = tree.Color.BLACK;
                    }
                    else
                        this.eraseCase5(N);
                };
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
                RBTree.prototype.eraseCase5 = function (N) {
                    if (N == N.parent.left &&
                        N.sibling != null &&
                        this.fetchColor(N.sibling) == tree.Color.BLACK &&
                        this.fetchColor(N.sibling.left) == tree.Color.RED &&
                        this.fetchColor(N.sibling.right) == tree.Color.BLACK) {
                        N.sibling.color = tree.Color.RED;
                        N.sibling.left.color = tree.Color.BLACK;
                        this.rotateRight(N.sibling);
                    }
                    else if (N == N.parent.right &&
                        N.sibling != null &&
                        this.fetchColor(N.sibling) == tree.Color.BLACK &&
                        this.fetchColor(N.sibling.left) == tree.Color.BLACK &&
                        this.fetchColor(N.sibling.right) == tree.Color.RED) {
                        N.sibling.color = tree.Color.RED;
                        N.sibling.right.color = tree.Color.BLACK;
                        this.rotateLeft(N.sibling);
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
                RBTree.prototype.eraseCase6 = function (node) {
                    node.sibling.color = this.fetchColor(node.parent);
                    node.parent.color = tree.Color.BLACK;
                    if (node == node.parent.left) {
                        node.sibling.right.color = tree.Color.BLACK;
                        this.rotateLeft(node.parent);
                    }
                    else {
                        node.sibling.left.color = tree.Color.BLACK;
                        this.rotateRight(node.parent);
                    }
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
                RBTree.prototype.fetchColor = function (node) {
                    if (node == null)
                        return tree.Color.BLACK;
                    else
                        return node.color;
                };
                return RBTree;
            }(tree.XTree));
            tree.RBTree = RBTree;
        })(tree = base.tree || (base.tree = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="RBTree.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        var tree;
        (function (tree) {
            var AtomicTree = (function (_super) {
                __extends(AtomicTree, _super);
                /* ---------------------------------------------------------
                    CONSTRUCTOR
                --------------------------------------------------------- */
                /**
                 * Default Constructor.
                 */
                function AtomicTree() {
                    _super.call(this);
                }
                AtomicTree.prototype.find = function (val) {
                    if (val instanceof std.SetIterator && val.value instanceof std.SetIterator == false)
                        return _super.prototype.find.call(this, val);
                    else
                        return this.findByVal(val);
                };
                AtomicTree.prototype.findByVal = function (val) {
                    if (this.root == null)
                        return null;
                    var node = this.root;
                    while (true) {
                        var newNode = null;
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
                };
                /* ---------------------------------------------------------
                    CONSTRUCTOR
                --------------------------------------------------------- */
                AtomicTree.prototype.isEquals = function (left, right) {
                    return std.equals(left, right);
                };
                AtomicTree.prototype.isLess = function (left, right) {
                    return std.less(left.value, right.value);
                };
                return AtomicTree;
            }(tree.RBTree));
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
             * @author Migrated by Jeongho Nam
             */
            var Color = (function () {
                function Color() {
                }
                Object.defineProperty(Color, "BLACK", {
                    /**
                     * <p> Code of color black. </p>
                     *
                     * <ul>
                     *	<li> Those are clearly black: root, leaf nodes or children nodes of red. </li>
                     *	<li> Every path from a given nodes containes the same number of black nodes exclude NIL(s). </li>
                     * </ul>
                     */
                    get: function () { return false; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Color, "RED", {
                    /**
                     * <p> Code of color red. </p>
                     */
                    get: function () { return true; },
                    enumerable: true,
                    configurable: true
                });
                return Color;
            }());
            tree.Color = Color;
        })(tree = base.tree || (base.tree = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="RBTree.ts" />
var std;
(function (std) {
    var base;
    (function (base) {
        var tree;
        (function (tree) {
            var PairTree = (function (_super) {
                __extends(PairTree, _super);
                /* ---------------------------------------------------------
                    CONSTRUCTOR
                --------------------------------------------------------- */
                /**
                 * Default Constructor.
                 */
                function PairTree() {
                    _super.call(this);
                }
                PairTree.prototype.find = function (val) {
                    if (val instanceof std.MapIterator && val.first instanceof std.SetIterator == false)
                        return _super.prototype.find.call(this, val);
                    else
                        return this.findByKey(val);
                };
                PairTree.prototype.findByKey = function (key) {
                    if (this.root == null)
                        return null;
                    var node = this.root;
                    while (true) {
                        var newNode = null;
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
                };
                /* ---------------------------------------------------------
                    COMPARISON
                --------------------------------------------------------- */
                PairTree.prototype.isEquals = function (left, right) {
                    return std.equals(left.first, right.first);
                };
                PairTree.prototype.isLess = function (left, right) {
                    return std.less(left.first, right.first);
                };
                return PairTree;
            }(tree.RBTree));
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
             * @see XTree
             *
             * @author Migrated by Jeongho Nam
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
                Object.defineProperty(XTreeNode.prototype, "grandParent", {
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
            tree.XTreeNode = XTreeNode;
        })(tree = base.tree || (base.tree = {}));
    })(base = std.base || (std.base = {}));
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
    }());
    std.Bind = Bind;
})(std || (std = {}));
///// <reference path="base/container/Container.ts" />
//namespace std
//{
//	/**
//	 * <p> Double ended queue. </p>
//	 * 
//	 * <p> {@link Deque} (usually pronounced like "<i>deck</i>") is an irregular acronym of 
//	 * <b>d</b>ouble-<b>e</b>nded <b>q</b>ueue. Double-ended queues are sequence containers with dynamic 
//	 * sizes that can be expanded or contracted on both ends (either its front or its back). </p>
//	 * 
//	 * <p> Specific libraries may implement deques in different ways, generally as some form of dynamic 
//	 * array. But in any case, they allow for the individual elements to be accessed directly through 
//	 * random access iterators, with storage handled automatically by expanding and contracting the 
//	 * container as needed. </p>
//	 * 
//	 * <p> Therefore, they provide a functionality similar to vectors, but with efficient insertion and 
//	 * deletion of elements also at the beginning of the sequence, and not only at its end. But, unlike 
//	 * {@link Vector}s, {@link Deque}s are not guaranteed to store all its elements in contiguous storage 
//	 * locations: accessing elements in a <u>deque</u> by offsetting a pointer to another element causes 
//	 * undefined behavior. </p>
//	 * 
//	 * <p> Both {@link Vector}s and {@link Deque}s provide a very similar interface and can be used for 
//	 * similar purposes, but internally both work in quite different ways: While {@link Vector}s use a 
//	 * single array that needs to be occasionally reallocated for growth, the elements of a {@link Deque} 
//	 * can be scattered in different chunks of storage, with the container keeping the necessary information 
//	 * internally to provide direct access to any of its elements in constant time and with a uniform 
//	 * sequential interface (through iterators). Therefore, {@link Deque}s are a little more complex 
//	 * internally than {@link Vector}s, but this allows them to grow more efficiently under certain 
//	 * circumstances, especially with very long sequences, where reallocations become more expensive. </p>
//	 * 
//	 * <p> For operations that involve frequent insertion or removals of elements at positions other than 
//	 * the beginning or the end, {@link Deque}s perform worse and have less consistent iterators and 
//	 * references than {@link List}s. </p>
//	 *
//	 * <h3> Container properties </h3>
//	 * <dl>
//	 *	<dt> Sequence </dt>
//	 *	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements 
//	 *		 are accessed by their position in this sequence. </dd>
//	 *
//	 *	<dt> Dynamic array </dt>
//	 *	<dd> Generally implemented as a dynamic array, it allows direct access to any element in the 
//	 *		 sequence and provides relatively fast addition/removal of elements at the beginning or the end 
//	 *		 of the sequence. </dd>
//	 * </dl>
//	 * 
//	 * <ul>
//	 *  <li> Reference: http://www.cplusplus.com/reference/deque/deque/ </li>
//	 * </ul>
//	 *
//	 * @param <T> Type of the elements.
//	 *
//	 * @author Jeongho Nam
//	 */
//	export class Deque<T>
//		extends base.container.Container<T>
//		implements base.container.IArray<T>, 
//				   base.container.IDeque<T>
//	{
//		private static get ROW(): number { return 8; }
//		private static get MIN_CAPACITY(): number { return 100; }
//		public static get iterator() { return DequeIterator; }
//		private matrix: Vector<Vector<T>>;
//		private size_: number;
//		private capacity_: number;
//		/* =========================================================
//			CONSTRUCTORS & SEMI-CONSTRUCTORS
//				- CONSTRUCTORS
//				- ASSIGN, RESERVE & CLEAR
//				- RESERVE
//		============================================================
//			CONSTURCTORS
//		--------------------------------------------------------- */
//		/**
//		 * <p> Default Constructor. </p>
//		 *
//		 * <p> Constructs an empty container, with no elements. </p>
//		 */
//		public constructor();
//		/**
//		 * <p> Initializer list Constructor. </p>
//		 *
//		 * <p> Constructs a container with a copy of each of the elements in <i>array</i>, in the same order. </p>
//		 *
//		 * @param array An array containing elements to be copied and contained.
//		 */
//		public constructor(items: Array<T>);
//		/**
//		 * <p> Fill Constructor. </p>
//		 *
//		 * <p> Constructs a container with <i>n</i> elements. Each element is a copy of <i>val</i> (if provided). </p>
//		 *
//		 * @param n Initial container size (i.e., the number of elements in the container at construction).
//		 * @param val Value to fill the container with. Each of the <i>n</i> elements in the container is 
//		 *			  initialized to a copy of this value.
//		 */
//		public constructor(size: number, val: T);
//		/**
//		 * <p> Copy Constructor. </p>
//		 *
//		 * <p> Constructs a container with a copy of each of the elements in <i>container</i>, in the same order. </p>
//		 *
//		 * @param container Another container object of the same type (with the same class template 
//		 *					arguments <i>T</i>), whose contents are either copied or acquired.
//		 */
//		public constructor(container: base.container.IContainer<T>);
//		/**
//		 * <p> Range Constructor. </p>
//		 *
//		 * <p> Constructs a container with as many elements as the range (<i>begin</i>, <i>end<i>), with each 
//		 * element emplace-constructed from its corresponding element in that range, in the same order. </p>
//		 *
//		 * @param begin Input interator of the initial position in a sequence.
//		 * @param end Input interator of the final position in a sequence.
//		 */
//		public constructor(begin: base.container.Iterator<T>, end: base.container.Iterator<T>);
//		public constructor(...args: any[])
//		{
//			super();
//			if (args.length == 0)
//			{
//				this.clear();
//			}
//			if (args.length == 1 && args[0] instanceof Array)
//			{
//				let array: Array<T> = args[0];
//				this.clear();
//				this.push(...array);
//			}
//			else if (args.length == 1 && args[0] instanceof base.container.Container)
//			{
//				let container: base.container.Container<T> = args[0];
//				this.assign(container.begin(), container.end());
//			}
//			else if (args.length == 2 && 
//				args[0] instanceof base.container.Iterator && args[1] instanceof base.container.Iterator)
//			{
//				let begin: base.container.Iterator<T> = args[0];
//				let end: base.container.Iterator<T> = args[1];
//				this.assign(begin, end);
//			}
//		}
//		/* ---------------------------------------------------------
//			ASSIGN, RESERVE & CLEAR
//		--------------------------------------------------------- */
//		/**
//		 * @inheritdoc
//		 */
//		public assign<U extends T>(begin: base.container.Iterator<U>, end: base.container.Iterator<U>): void;
//		/**
//		 * @inheritdoc
//		 */
//		public assign(n: number, val: T): void;
//		public assign(first: any, second: any): void
//		{
//			if (first instanceof base.container.Iterator && second instanceof base.container.Iterator)
//			{
//				let begin: base.container.Iterator<T> = first;
//				let end: base.container.Iterator<T> = second;
//				let size: number = 0;
//				for (let it = begin; !it.equals(end); it = it.next())
//					size++;
//				this.capacity_ = Math.min(size, 100);
//				for (let it = begin; !it.equals(end); it = it.next())
//					this.pushBack(it.value);
//			}
//			else
//			{
//				let size: number = first;
//				let val: T = second;
//				this.capacity_ = Math.min(size, 100);
//				for (let i = 0; i < size; i++)
//					this.pushBack(val);
//			}
//		}
//		public reserve(capacity: number): void
//		{
//			let prevMatrix = this.matrix;
//			let prevSize = this.size_;
//			this.clear();
//			this.size_ = prevSize;
//			this.capacity_ = capacity;
//			if (prevMatrix == null)
//				return;
//			for (let i = 0; i < prevMatrix.length; i++)
//				for (let j = 0; j < prevMatrix[i].length; j++)
//				{
//					if (prevMatrix[i].length + 1 > this.colSize)
//						this.matrix.push(new Vector<T>());
//					this.lastArray.push(prevMatrix[i][j]);
//				}
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public clear(): void
//		{
//			this.matrix = new Vector<Vector<T>>();
//			this.matrix.push(new Vector<T>());
//			this.size_ = 0;
//			this.capacity_ = Deque.MIN_CAPACITY;
//		}
//		/* =========================================================
//			ACCESSORS
//				- GETTERS & SETTERS
//				- ITERATORS
//		========================================================= */
//		/**
//		 * @inheritdoc
//		 */
//		public begin(): DequeIterator<T>
//		{
//			if (this.empty() == true)
//				return this.end();
//			else
//				return new DequeIterator<T>(this, 0);
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public end(): DequeIterator<T>
//		{
//			return new DequeIterator<T>(this, -1);
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public size(): number
//		{
//			return this.size_;
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public capacity(): number
//		{
//			return this.capacity_;
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public at(index: number): T
//		{
//			if (index > this.size())
//				throw new std.OutOfRange("Target index is greater than Deque's size.");
//			let indexPair = this.fetchIndex(index);
//			return this.matrix[indexPair.first][indexPair.second];
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public set(index: number, val: T): void
//		{
//			if (index > this.size())
//				throw new std.OutOfRange("Target index is greater than Deque's size.");
//			let indexPair = this.fetchIndex(index);
//			this.matrix[indexPair.first][indexPair.second] = val;
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public front(): T
//		{
//			return this.matrix.front().front();
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public back(): T
//		{
//			return this.matrix.back().back();
//		}
//		private fetchIndex(index: number): Pair<number, number>
//		{
//			let row: number;
//			for (row = 0; row < this.matrix.size(); row++)
//			{
//				if (index < this.matrix[row].size())
//					break;
//				index -= this.matrix[row].size();
//			}
//			return new Pair<number, number>(row, index);
//		}
//		/* =========================================================
//			ELEMENTS I/O
//				- PUSH & POP
//				- INSERT
//				- ERASE
//		============================================================
//			PUSH & POP
//		--------------------------------------------------------- */
//		/**
//		 * @inheritdoc
//		 */
//		public push(...items: T[]): number
//		{
//			return this.size();
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public pushFront(val: T): void
//		{
//			this.matrix.front().insert(this.matrix[0].begin(), val);
//			this.size_++;
//			if (this.size_ > this.capacity_)
//				this.reserve(this.capacity_ * 2);
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public pushBack(val: T): void
//		{
//			this.lastArray.push(val);
//			this.size_++;
//			if (this.size_ > this.capacity_)
//				this.reserve(this.capacity_ * 2);
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public popFront(): void
//		{
//			if (this.empty() == true)
//				return; // SOMEWHERE PLACE TO THROW EXCEPTION
//			this.matrix[0].splice(0, 1);
//			this.size_--;
//			if (this.matrix[0].length == 0)
//				this.matrix.splice(0, 1);
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public popBack(): void
//		{
//			if (this.empty() == true)
//				return; // SOMEWHERE PLACE TO THROW EXCEPTION
//			this.lastArray.splice(this.lastArray.length - 1, 1);
//			this.size_--;
//			if (this.lastArray.length)
//				this.matrix.splice(this.matrix.length - 1, 1);
//		}
//		/* ---------------------------------------------------------
//			INSERT
//		--------------------------------------------------------- */
//		public insert(position: DequeIterator<T>, val: T): DequeIterator<T>;
//		public insert(position: DequeIterator<T>, n: number, val: T): DequeIterator<T>;
//		public insert<U extends T>(position: DequeIterator<T>, begin: base.container.Iterator<U>, end: base.container.Iterator<U>): DequeIterator<T>;
//		public insert<U extends T>
//			(position: DequeIterator<T>, ...args: any[]): DequeIterator<T>
//		{
//			let items: Array<T> = [];
//			if (args.length == 1)
//			{
//				let val: T = args[0];
//				items.push(val);
//			}
//			else if (args.length == 2 && typeof args[0] == "number")
//			{
//				let n: number = args[0];
//				let val: T = args[1];
//				for (let i = 0; i < n; i++)
//					items.push(val);
//			}
//			else if (args.length == 2 && args[0] instanceof base.container.Iterator && args[1] instanceof base.container.Iterator)
//			{
//				let begin: base.container.Iterator<U> = args[0];
//				let end: base.container.Iterator<U> = args[1];
//				for (let it = begin; !it.equals(end); it = it.next())
//					items.push(it.value);
//			}
//			return this.insertByItems(position, items);
//		}
//		private insertByItems(position: DequeIterator<T>, items: Array<T>): DequeIterator<T>
//		{
//			// ALLOCATE THE NEW SIZE
//			this.size_ += items.length;
//			if (this.size_ <= this.capacity_)
//			{
//				// -----------------------------------------------------
//				// WHEN FITTING INTO RESERVED CAPACITY IS POSSIBLE
//				// -----------------------------------------------------
//				// INSERTS CAREFULLY
//				if (position.equals(this.end()) == true)
//				{
//					// WHEN INSERTS TO THE BACK SIDE
//					while (items.length != 0)
//						this.matrix.push(items.splice(0, Math.min(Deque.ROW, items.length)));
//				}
//				else
//				{
//					// WHEN INSERTING TO A MIDDLE POSITION.
//					let indexPair = this.fetchIndex(position.getIndex());
//					let index = indexPair.first;
//					let splicedValues = this.matrix[index].splice(indexPair.second);
//					if (splicedValues.length != 0)
//						items = items.concat(...splicedValues);
//					if (this.matrix[index].length < Deque.ROW)
//					{
//						this.matrix[index] =
//							this.matrix[index].concat
//								(
//								...items.splice(0, Deque.ROW - this.matrix[index].length)
//								);
//					}
//					let splicedArray = this.matrix.splice(index + 1);
//					// INSERTS
//					while (items.length != 0)
//						this.matrix.push(items.splice(0, Math.min(Deque.ROW, items.length)));
//					// CONCAT WITH BACKS
//					this.matrix = this.matrix.concat(...splicedArray);
//				}
//			}
//			else
//			{
//				// -----------------------------------------------------
//				// WHEN CANNOT BE FIT INTO THE RESERVED CAPACITY
//				// -----------------------------------------------------
//				// JUST INSERT CARELESSLY
//				// AND KEEP BLANACE BY THE RESERVE() METHOD
//				if (position.equals(this.end()) == true)
//				{
//					this.matrix.push(items); // ALL TO THE LAST
//				}
//				else
//				{
//					let indexPair = this.fetchIndex(position.getIndex());
//					let index = indexPair.first;
//					let splicedValues = this.matrix[index].splice(indexPair.second);
//					if (splicedValues.length != 0)
//						items = items.concat(...splicedValues);
//					// ALL TO THE MIDDLE
//					this.matrix[index] = this.matrix[index].concat(...items);
//				}
//				// AND KEEP BALANCE BY RESERVE()
//				let newCapacity = this.capacity_;
//				while (this.size_ + items.length > newCapacity)
//					newCapacity *= 2;
//				this.reserve(newCapacity);
//			}
//			return position;
//		}
//		/* ---------------------------------------------------------
//			ERASE
//		--------------------------------------------------------- */
//		public erase(position: DequeIterator<T>): DequeIterator<T>
//		public erase(begin: DequeIterator<T>, end: DequeIterator<T>): DequeIterator<T>;
//		public erase(begin: DequeIterator<T>, end: DequeIterator<T> = null): DequeIterator<T>
//		{
//			if (end == null)
//				end = begin.next();
//			let index = begin.getIndex();
//			let deleteIndex = index;
//			let deleteSize = (index == -1) ? this.size_ - index : end.getIndex() - index;
//			while (deleteSize != 0)
//			{
//				let indexPair: Pair<number, number> = this.fetchIndex(index);
//				let array: Array<T> = this.matrix[indexPair.first];
//				let myDeleteSize: number = Math.min(deleteSize, array.length - indexPair.second);
//				array.splice(indexPair.second, myDeleteSize);
//				if (array.length == 0)
//					this.matrix.splice(indexPair.first, 1);
//				deleteSize -= myDeleteSize;
//			}
//			this.size_ -= deleteSize;
//			return begin;
//		}
//	}
//} 
///// <reference path="base/container/Iterator.ts" />
//namespace std
//{
//	export class DequeIterator<T>
//		extends base.container.Iterator<T>
//	{
//		private get deque(): Deque<T> { return <Deque<T>>this.source; }
//		/**
//		 * <p> Sequence number of iterator in the source Deque. </p>
//		 */
//		private index: number;
//		/* ---------------------------------------------------------
//			CONSTRUCTORS
//		--------------------------------------------------------- */
//		/**
//		 * <p> Construct from the source {@link Deque container}. </p>
//		 *
//		 * <h4> Note </h4>
//		 * <p> Do not create the iterator directly, by yourself. </p>
//		 * <p> Use {@link Deque.begin begin()}, {@link Deque.end end()} in {@link Deque container} instead. </p> 
//		 *
//		 * @param vector The source {@link Deque container} to reference.
//		 * @param index Sequence number of the element in the source {@link Deque}.
//		 */
//		public constructor(source: Deque<T>, index: number)
//		{
//			super(source);
//			this.index = index;
//		}
//		/* ---------------------------------------------------------
//			ACCESSORS
//		--------------------------------------------------------- */
//		/**
//		 * @inheritdoc
//		 */
//		public get value(): T
//		{
//			return this.deque.at(this.index);
//		}
//		public set value(val: T)
//		{
//			this.deque.set(this.index, val);
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public equals<U extends T>(obj: DequeIterator<U>): boolean
//		{
//			return super.equals(obj) && this.index == obj.index;
//		}
//		/**
//		 * Get index.
//		 */
//		public getIndex(): number
//		{
//			return this.index;
//		}
//		/* ---------------------------------------------------------
//			MOVERS
//		--------------------------------------------------------- */
//		/**
//		 * @inheritdoc
//		 */
//		public prev(): DequeIterator<T>
//		{
//			if (this.index == -1)
//				return new DequeIterator(this.deque, this.deque.size() - 1);
//			else if (this.index - 1 < 0)
//				return this.deque.end();
//			else
//				return new DequeIterator<T>(this.deque, this.index - 1);
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public next(): DequeIterator<T>
//		{
//			if (this.index >= this.source.size() - 1)
//				return this.deque.end();
//			else
//				return new DequeIterator<T>(this.deque, this.index + 1);
//		}
//		/**
//		 * @inheritdoc
//		 */
//		public advance(n: number): DequeIterator<T>
//		{
//			let newIndex: number = this.index + n;
//			if (newIndex < 0 || newIndex >= this.deque.size())
//				return this.deque.end();
//			else
//				return new DequeIterator<T>(this.deque, newIndex);
//		}
//	}
//} 
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
     * @author Jeongho Nam
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
        ErrorCategory.prototype.defaultErrorCondition = function (val) {
            return null;
        };
        ErrorCategory.prototype.equivalent = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return false;
        };
        return ErrorCategory;
    }());
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
     * @author Jeongho Nam
     */
    var ErrorCode = (function (_super) {
        __extends(ErrorCode, _super);
        function ErrorCode(val, category) {
            if (val === void 0) { val = 0; }
            if (category === void 0) { category = null; }
            _super.call(this, val, category);
        }
        return ErrorCode;
    }(std.base.system.ErrorInstance));
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
     * @author Jeongho Nam
     */
    var ErrorCondition = (function (_super) {
        __extends(ErrorCondition, _super);
        function ErrorCondition(val, category) {
            if (val === void 0) { val = 0; }
            if (category === void 0) { category = null; }
            _super.call(this, val, category);
        }
        return ErrorCondition;
    }(std.base.system.ErrorInstance));
    std.ErrorCondition = ErrorCondition;
})(std || (std = {}));
var std;
(function (std) {
    var example;
    (function (example) {
        var ContainerTest = (function () {
            function ContainerTest() {
                this.testList();
                this.testUnorderedSet();
                this.testUnorderedMap();
                this.testEqualRange();
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
                document.write("<h4> HashSet </h4>\n");
                // CONSTRUCT LIST WITH ELEMENTS 0 TO 9
                var container = new std.HashSet();
                for (var i = 0; i < 10; i++)
                    container.insert(i);
                // ELEMENTS I/O
                document.write("Erase 7<br>\n" +
                    "Insert -5 (x3)<br>\n" +
                    "Erase 3<br><br>\n\n");
                container.erase(7);
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
                document.write("<li>count(-5): #" + container.count(-5) + "</li>\n");
                document.write("</ul>\n\n");
            };
            ContainerTest.prototype.testUnorderedMap = function () {
                document.write("<h4> TreeMultiMap </h4>\n");
                // CONSTRUCT LIST WITH ELEMENTS 0 TO 9
                var container = new std.TreeMultiMap();
                for (var i = 0; i < 10; i++)
                    container.insert(new std.Pair(i, i));
                // ELEMENTS I/O
                document.write("Erase 7<br>\n" +
                    "Insert -5 (x3)<br>\n" +
                    "Erase 3<br><br>\n\n");
                container.erase(7);
                container.insert(new std.Pair(-5, -5));
                container.insert(new std.Pair(-5, -5));
                container.insert(new std.Pair(-5, -5));
                container.erase(3);
                container.erase(3);
                container.erase(100);
                // PRINTS
                document.write("Elements in the UnorderedMap: #" + container.size() + "<br>\n");
                document.write("<ul>\n");
                for (var it = container.begin(); it.equals(container.end()) == false; it = it.next())
                    document.write("<li>" + it.first + ": " + it.second + "</li>\n");
                document.write("<li>count(-5): #" + container.count(-5) + "</li>\n");
                document.write("</ul>\n\n");
            };
            ContainerTest.prototype.testEqualRange = function () {
                var intSet = new std.TreeMultiMap();
                for (var i = 0; i <= 70; i += 2)
                    //for (let j = 0; j < 4; j++)
                    intSet.insert(new std.Pair(i, i));
                document.write("Matched node: 4<br>\n");
                document.write("&nbsp;&nbsp;&nbsp;&nbsp;lower bound: " + intSet.lowerBound(4).first + "<br>\n");
                document.write("&nbsp;&nbsp;&nbsp;&nbsp;upper bound: " + intSet.upperBound(4).first + "<br>\n");
                document.write("<br>\n");
                for (var i = 1; i <= 50; i += 2) {
                    document.write("Mis-matched node: " + i + "<br>\n");
                    document.write("&nbsp;&nbsp;&nbsp;&nbsp;lower bound: " + intSet.lowerBound(i).first + "<br>\n");
                    document.write("&nbsp;&nbsp;&nbsp;&nbsp;upper bound: " + intSet.upperBound(i).first + "<br>\n");
                    document.write("<br>\n");
                }
            };
            ContainerTest.main = function () {
                new ContainerTest();
            };
            return ContainerTest;
        }());
        example.ContainerTest = ContainerTest;
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
     * @author Jeongho Nam
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
    }());
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
     * @author Jeongho Nam
     */
    var LogicError = (function (_super) {
        __extends(LogicError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function LogicError(what) {
            _super.call(this, what);
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
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/domain_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    var DomainError = (function (_super) {
        __extends(DomainError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function DomainError(what) {
            _super.call(this, what);
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
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/invalid_argument/
     * </ul>
     *
     * @author Jeongho Nam
     */
    var InvalidArgument = (function (_super) {
        __extends(InvalidArgument, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function InvalidArgument(what) {
            _super.call(this, what);
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
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/length_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    var LengthError = (function (_super) {
        __extends(LengthError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function LengthError(what) {
            _super.call(this, what);
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
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/out_of_range/
     * </ul>
     *
     * @author Jeongho Nam
     */
    var OutOfRange = (function (_super) {
        __extends(OutOfRange, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function OutOfRange(what) {
            _super.call(this, what);
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
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/runtime_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    var RuntimeError = (function (_super) {
        __extends(RuntimeError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function RuntimeError(what) {
            _super.call(this, what);
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
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/outflow_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    var OverflowError = (function (_super) {
        __extends(OverflowError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function OverflowError(what) {
            _super.call(this, what);
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
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/underflow_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    var UnderflowError = (function (_super) {
        __extends(UnderflowError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function UnderflowError(what) {
            _super.call(this, what);
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
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/stdexcept/range_error/
     * </ul>
     *
     * @author Jeongho Nam
     */
    var RangeError = (function (_super) {
        __extends(RangeError, _super);
        /**
         * <p> Construct from a message. </p>
         *
         * @param message A message representing specification about the Exception.
         */
        function RangeError(what) {
            _super.call(this, what);
        }
        return RangeError;
    }(RuntimeError));
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
     * @param <K> Type of the key values.
     *			  Each element in an {@link HashMap} is uniquely identified by its key value.
     * @param <T> Type of the mapped value.
     *			  Each element in an {@link HashMap} is used to store some data as its mapped value.
     *
     * @author Jeongho Nam
     */
    var HashMap = (function (_super) {
        __extends(HashMap, _super);
        function HashMap() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            // HASH_BUCKET
            this.hashBuckets = new std.base.hash.MapHashBuckets(this);
            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array) {
                this.constructByArray(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof std.base.container.MapContainer) {
                this.constructByContainer(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof std.MapIterator && args[1] instanceof std.MapIterator) {
                this.constructByRange(args[0], args[1]);
            }
        }
        /**
         * @private
         */
        HashMap.prototype.constructByArray = function (items) {
            this.hashBuckets.reserve(items.length * std.base.hash.RATIO);
            _super.prototype.constructByArray.call(this, items);
        };
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMap.prototype.assign = function (begin, end) {
            var it;
            var size = 0;
            // RESERVE HASH_BUCKET SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;
            this.hashBuckets.clear();
            this.hashBuckets.reserve(size * std.base.hash.RATIO);
            // SUPER; INSERT
            _super.prototype.assign.call(this, begin, end);
        };
        /**
         * @inheritdoc
         */
        HashMap.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.hashBuckets.clear();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        HashMap.prototype.find = function (key) {
            return this.hashBuckets.find(key);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @private
         */
        HashMap.prototype.insertByPair = function (pair) {
            // TEST WHETHER EXIST
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
        /**
         * @private
         */
        HashMap.prototype.insertByRange = function (begin, end) {
            // CALCULATE INSERTING SIZE
            var size = 0;
            for (var it = begin; it.equals(end) == false; it = it.next())
                size++;
            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hashBuckets.itemSize() * std.base.hash.MAX_RATIO)
                this.hashBuckets.reserve((this.size() + size) * std.base.hash.RATIO);
            // INSERTS
            _super.prototype.insertByRange.call(this, begin, end);
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMap.prototype.handleInsert = function (it) {
            this.hashBuckets.insert(it);
        };
        /**
         * @inheritdoc
         */
        HashMap.prototype.handleErase = function (it) {
            this.hashBuckets.erase(it);
        };
        return HashMap;
    }(std.base.container.UniqueMap));
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
     * @param <K> Type of the key values.
     *			  Each element in an {@link HashMap} is identified by a key value.
     * @param <T> Type of the mapped value.
     *			  Each element in an {@link HashMap} is used to store some data as its mapped value.
     *
     * @author Jeongho Nam
     */
    var HashMultiMap = (function (_super) {
        __extends(HashMultiMap, _super);
        function HashMultiMap() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            // HASH_BUCKET
            this.hashBuckets = new std.base.hash.MapHashBuckets(this);
            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array) {
                this.constructByArray(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof std.base.container.MapContainer) {
                this.constructByContainer(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof std.MapIterator && args[1] instanceof std.MapIterator) {
                this.constructByRange(args[0], args[1]);
            }
        }
        /**
         * @private
         */
        HashMultiMap.prototype.constructByArray = function (items) {
            this.hashBuckets.reserve(items.length * std.base.hash.RATIO);
            _super.prototype.constructByArray.call(this, items);
        };
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.assign = function (begin, end) {
            var it;
            var size = 0;
            // REVERSE HASH_GROUP SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;
            this.hashBuckets.clear();
            this.hashBuckets.reserve(size * std.base.hash.RATIO);
            // SUPER; INSERT
            _super.prototype.assign.call(this, begin, end);
        };
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.hashBuckets.clear();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.find = function (key) {
            return this.hashBuckets.find(key);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @private
         */
        HashMultiMap.prototype.insertByPair = function (pair) {
            var listIterator = this.data.insert(this.data.end(), pair);
            var it = new std.MapIterator(this, listIterator);
            this.handleInsert(it);
            return it;
        };
        /**
         * @private
         */
        HashMultiMap.prototype.insertByRange = function (begin, end) {
            // CALCULATE INSERTING SIZE
            var size = 0;
            for (var it = begin; it.equals(end) == false; it = it.next())
                size++;
            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hashBuckets.itemSize() * std.base.hash.MAX_RATIO)
                this.hashBuckets.reserve((this.size() + size) * std.base.hash.RATIO);
            // INSERTS
            _super.prototype.insertByRange.call(this, begin, end);
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.handleInsert = function (it) {
            this.hashBuckets.insert(it);
        };
        /**
         * @inheritdoc
         */
        HashMultiMap.prototype.handleErase = function (it) {
            this.hashBuckets.erase(it);
        };
        return HashMultiMap;
    }(std.base.container.MultiMap));
    std.HashMultiMap = HashMultiMap;
})(std || (std = {}));
/// <reference path="base/container/MultiSet.ts" />
var std;
(function (std) {
    /**
     * <p> Hashed, unordered Multiset. </p>
     *
     * <p> {@link HashMultiSet HashMultiSets} are containers that store elements in no particular order, allowing fast
     * retrieval of individual elements based on their value, much like {@link UnorderedSet} containers,
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
     * @author Jeongho Nam
     */
    var HashMultiSet = (function (_super) {
        __extends(HashMultiSet, _super);
        function HashMultiSet() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            // BUCKET
            this.hashBuckets = new std.base.hash.SetHashBuckets(this);
            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array && args[0] instanceof std.Vector == false) {
                this.constructByArray(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof std.base.container.Container) {
                this.constructByContainer(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof std.base.container.Iterator && args[1] instanceof std.base.container.Iterator) {
                this.constructByRange(args[0], args[1]);
            }
        }
        /**
         * @private
         */
        HashMultiSet.prototype.constructByArray = function (items) {
            this.hashBuckets.reserve(items.length * std.base.hash.RATIO);
            _super.prototype.constructByArray.call(this, items);
        };
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.assign = function (begin, end) {
            var it;
            var size = 0;
            // RESERVE HASH_BUCKET SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;
            this.hashBuckets.clear();
            this.hashBuckets.reserve(size * std.base.hash.RATIO);
            // SUPER; INSERT
            _super.prototype.assign.call(this, begin, end);
        };
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.hashBuckets.clear();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.find = function (val) {
            return this.hashBuckets.find(val);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @private
         */
        HashMultiSet.prototype.insertByVal = function (val) {
            // INSERT
            var listIterator = this.data.insert(this.data.end(), val);
            var it = new std.SetIterator(this, listIterator);
            // POST-PROCESS
            this.handleInsert(it);
            return it;
        };
        /**
         * @private
         */
        HashMultiSet.prototype.insertByRange = function (begin, end) {
            // CALCULATE INSERTING SIZE
            var size = 0;
            for (var it = begin; it.equals(end) == false; it = it.next())
                size++;
            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hashBuckets.itemSize() * std.base.hash.MAX_RATIO)
                this.hashBuckets.reserve((this.size() + size) * std.base.hash.RATIO);
            // INSERTS
            _super.prototype.insertByRange.call(this, begin, end);
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.handleInsert = function (it) {
            this.hashBuckets.insert(it);
        };
        /**
         * @inheritdoc
         */
        HashMultiSet.prototype.handleErase = function (it) {
            this.hashBuckets.erase(it);
        };
        return HashMultiSet;
    }(std.base.container.MultiSet));
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
     * @author Jeongho Nam
     */
    var HashSet = (function (_super) {
        __extends(HashSet, _super);
        function HashSet() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            // BUCKET
            this.hashBuckets = new std.base.hash.SetHashBuckets(this);
            // OVERLOADINGS
            if (args.length == 1 && args[0] instanceof Array && args[0] instanceof std.Vector == false) {
                this.constructByArray(args[0]);
            }
            else if (args.length == 1 && args[0] instanceof std.base.container.Container) {
                this.constructByContainer(args[0]);
            }
            else if (args.length == 2 && args[0] instanceof std.base.container.Iterator && args[1] instanceof std.base.container.Iterator) {
                this.constructByRange(args[0], args[1]);
            }
        }
        HashSet.prototype.constructByArray = function (items) {
            this.hashBuckets.reserve(items.length * std.base.hash.RATIO);
            _super.prototype.constructByArray.call(this, items);
        };
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashSet.prototype.assign = function (begin, end) {
            var it;
            var size = 0;
            // RESERVE HASH_BUCKET SIZE
            for (it = begin; it.equals(end) == false; it = it.next())
                size++;
            this.hashBuckets.clear();
            this.hashBuckets.reserve(size * std.base.hash.RATIO);
            // SUPER; INSERT
            _super.prototype.assign.call(this, begin, end);
        };
        /**
         * @inheritdoc
         */
        HashSet.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.hashBuckets.clear();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        HashSet.prototype.find = function (val) {
            return this.hashBuckets.find(val);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        HashSet.prototype.insertByVal = function (val) {
            // TEST WHETHER EXIST
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
        HashSet.prototype.insertByRange = function (begin, end) {
            // CALCULATE INSERTING SIZE
            var size = 0;
            for (var it = begin; it.equals(end) == false; it = it.next())
                size++;
            // IF NEEDED, HASH_BUCKET TO HAVE SUITABLE SIZE
            if (this.size() + size > this.hashBuckets.size() * std.base.hash.MAX_RATIO)
                this.hashBuckets.reserve((this.size() + size) * std.base.hash.RATIO);
            // INSERTS
            _super.prototype.insertByRange.call(this, begin, end);
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        HashSet.prototype.handleInsert = function (item) {
            this.hashBuckets.insert(item);
        };
        /**
         * @inheritdoc
         */
        HashSet.prototype.handleErase = function (item) {
            this.hashBuckets.erase(item);
        };
        return HashSet;
    }(std.base.container.UniqueSet));
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
     * {@link merge merge()} or {@link TreeMap.lowerBound lowerBound()}. </p>
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
     * {@link merge merge()} or {@link TreeMap.lowerBound lowerBound()}. </p>
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
    function hashCode(obj) {
        return std.base.hash.code(obj);
    }
    std.hashCode = hashCode;
    /**
     * Incremental sequence of unique id allocated to Object.
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
     * <p> {@link List}s are sequence containers that allow constant time insert and erase operations
     * anywhere within the sequence, and iteration in both directions. </p>
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
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/list/list/
     * </ul>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam
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
            else if (args.length == 1 && (args[0] instanceof std.Vector || args[0] instanceof std.base.container.Container)) {
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.base.container.Iterator && args[1] instanceof std.base.container.Iterator) {
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
        Object.defineProperty(List, "iterator", {
            get: function () { return std.ListIterator; },
            enumerable: true,
            configurable: true
        });
        List.prototype.assign = function (par1, par2) {
            if (par1 instanceof std.base.container.Iterator && par2 instanceof std.base.container.Iterator) {
                // PARAMETERS
                var begin = par1;
                var end = par2;
                // BODY
                var prev = null;
                var item = void 0;
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
        /* =========================================================
            ACCESSORS
        ========================================================= */
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
         * @inheritdoc
         */
        List.prototype.front = function () {
            return this.begin_.value;
        };
        /**
         * @inheritdoc
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
         * @inheritdoc
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
         * @inheritdoc
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
         * @inheritdoc
         */
        List.prototype.popFront = function () {
            this.erase(this.begin_);
        };
        /**
         * @inheritdoc
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
        /**
         * @private
         */
        List.prototype.insertByVal = function (position, val) {
            // SHIFT TO INSERT OF THE REPEATING VAL
            return this.insertByRepeatingVal(position, 1, val);
        };
        /**
         * @private
         */
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
            if (this.empty() == true || first.prev().equals(this.end()) == true)
                this.begin_ = first;
            // CONNECT BETWEEN LAST AND POSITION
            prev.setNext(position);
            position.setPrev(prev);
            this.size_ += size;
            return first;
        };
        /**
         * @private
         */
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
        /**
         * @private
         */
        List.prototype.eraseByIterator = function (it) {
            return this.eraseByRange(it, it.next());
        };
        /**
         * @private
         */
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
            if (next.prev().equals(this.end()) == true)
                this.begin_ = next;
            this.size_ -= size;
            return prev;
        };
        return List;
    }(std.base.container.Container));
    std.List = List;
})(std || (std = {}));
/// <reference path="base/container/Iterator.ts" />
var std;
(function (std) {
    var ListIterator = (function (_super) {
        __extends(ListIterator, _super);
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
            return this == obj;
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
        /**
         * @inheritdoc
         */
        ListIterator.prototype.advance = function (size) {
            var it = this;
            for (var i = 0; i < size; i++)
                it = it.next();
            return it;
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
    }(std.base.container.Iterator));
    std.ListIterator = ListIterator;
})(std || (std = {}));
var std;
(function (std) {
    var MapIterator = (function () {
        /* ---------------------------------------------------------
            CONSTRUCTORS
        --------------------------------------------------------- */
        /**
         * Construct from the source PairContainer.
         *
         * @param source The source PairContainer.
         */
        function MapIterator(source, listIterator) {
            this.source = source;
            this.listIterator = listIterator;
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
         * Get iterator to previous element.
         */
        MapIterator.prototype.prev = function () {
            return new MapIterator(this.source, this.listIterator.prev());
        };
        /**
         * Get iterator to next element.
         */
        MapIterator.prototype.next = function () {
            return new MapIterator(this.source, this.listIterator.next());
        };
        /**
         * Advances the Iterator by n element positions.
         *
         * @param n Number of element positions to advance.
         * @return An advanced Iterator.
         */
        MapIterator.prototype.advance = function (n) {
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
        MapIterator.prototype.getSource = function () {
            return this.source;
        };
        Object.defineProperty(MapIterator.prototype, "first", {
            /**
             * Get first, key element.
             */
            get: function () {
                return this.listIterator.value.first;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MapIterator.prototype, "second", {
            /**
             * Get second, value element.
             */
            get: function () {
                return this.listIterator.value.second;
            },
            set: function (val) {
                this.listIterator.value.second = val;
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
        MapIterator.prototype.equals = function (obj) {
            return this.source == obj.source && this.listIterator == obj.listIterator;
        };
        /**
         * @inheritdoc
         */
        MapIterator.prototype.less = function (obj) {
            return std.less(this.first, obj.first);
        };
        /**
         * @inheritdoc
         */
        MapIterator.prototype.hashCode = function () {
            return std.hashCode(this.first);
        };
        return MapIterator;
    }());
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
        return Pair;
    }());
    std.Pair = Pair;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> FIFO queue. </p>
     *
     * <p> {@link Queue}s are a type of container adaptor, specifically designed to operate in a FIFO
     * context (first-in first-out), where elements are inserted into one end of the container and extracted
     * from the other. </p>
     *
     * <p> {@link Queue}s are implemented as containers adaptors, which are classes that use an encapsulated
     * object of a specific container class as its underlying container, providing a specific set of member
     * functions to access its elements. Elements are pushed into the {@link IDeque.back back()} of the specific
     * container and popped from its {@link IDeque.front front()}. </p>
     *
     * <p> {@link data The underlying container} may be one of the standard container class template or some other
     * specifically designed container class. This underlying container shall support at least the following
     * operations: </p>
     *
     * <ul>
     *	<li> empty </li>
     *	<li> size </li>
     *	<li> front </li>
     *	<li> back </li>
     *	<li> pushBack </li>
     *	<li> popFront </li>
     * </ul>
     *
     * <p> The standard container classes {@link Deque} and {@link List} fulfill these requirements.
     * By default, if no container class is specified for a particular {@link Queue} class instantiation,
     * the standard container {@link List} is used. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/queue/queue/ </li>
     * </ul>
     *
     * @param <T> Type of elements.
     *
     * @author Jeongho Nam
     */
    var Queue = (function () {
        function Queue(queue) {
            if (queue === void 0) { queue = null; }
            this.data = new std.List();
            if (queue != null)
                this.data.assign(queue.data.begin(), queue.data.end());
        }
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * <p> Return size. </p>
         * <p> Returns the number of elements in the {@link Queue}. </p>
         *
         * <p> This member function effectively calls member {@link IDeque.size size()} of the
         * {@link data underlying container} object. </p>
         *
         * @return The number of elements in the {@link data underlying container}.
         */
        Queue.prototype.size = function () {
            return this.data.size();
        };
        /**
         * <p> Test whether container is empty. </p>
         * <p> returns whether the {@link Queue} is empty: i.e. whether its <i>size</i> is zero. </p>
         *
         * <p> This member function efeectively calls member {@link IDeque.empty empty()} of the
         * {@link data underlying container} object. </p>
         *
         * @return <code>true</code> if the {@link data underlying container}'s size is 0,
         *		   <code>false</code> otherwise. </p>
         */
        Queue.prototype.empty = function () {
            return this.data.empty();
        };
        /**
         * <p> Access next element. </p>
         * <p> Returns a value of the next element in the {@link Queue}. </p>
         *
         * <p> The next element is the "oldest" element in the {@link Queue} and the same element that is
         * popped out from the queue when {@link pop Queue.pop()} is called. </p>
         *
         * <p> This member function effectively calls member {@link IDeque.front front()} of the
         * {@link data underlying container} object. </p>
         *
         * @return A value of the next element in the {@link Queue}.
         */
        Queue.prototype.front = function () {
            return this.data.front();
        };
        /**
         * <p> Access last element. </p>
         *
         * <p> Returns a vaue of the last element in the queue. This is the "newest" element in the queue
         * (i.e. the last element pushed into the queue). </p>
         *
         * <p> This member function effectively calls the member function {@link IDeque.back back()} of the
         * {@link data underlying container} object. </p>
         *
         * @return A value of the last element in the {@link Queue}.
         */
        Queue.prototype.back = function () {
            return this.data.back();
        };
        /* ---------------------------------------------------------
            ELEMENTS I/O
        --------------------------------------------------------- */
        /**
         * <p> Insert element. </p>
         *
         * <p> Inserts a new element at the end of the {@link Queue}, after its current last element.
         * The content of this new element is initialized to val. </p>
         *
         * <p> This member function effectively calls the member function {@link IDeque.pushBack pushBack()} of
         * the {@link data underlying container} object. </p>
         *
         * @param val Value to which the inserted element is initialized.
         */
        Queue.prototype.push = function (val) {
            this.data.pushBack(val);
        };
        /**
         * <p> Remove next element. </p>
         *
         * <p> Removes the next element in the {@link Queue}, effectively reducing its size by one. </p>
         *
         * <p> The element removed is the "oldest" element in the {@link Queue} whose value can be retrieved
         * by calling member {@link front Queue.front()} </p>.
         *
         * <p> This member function effectively calls the member function {@link IDeque.popFront popFront()} of
         * the {@link data underlying container} object. </p>
         */
        Queue.prototype.pop = function () {
            this.data.popFront();
        };
        return Queue;
    }());
    std.Queue = Queue;
})(std || (std = {}));
/// <refe0rence path="base/container/Iterator.ts" />
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
            this.listIterator = it;
        }
        SetIterator.prototype.getListIterator = function () {
            return this.listIterator;
        };
        /* ---------------------------------------------------------
            MOVERS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        SetIterator.prototype.prev = function () {
            return new SetIterator(this.set, this.listIterator.prev());
        };
        /**
         * @inheritdoc
         */
        SetIterator.prototype.next = function () {
            return new SetIterator(this.source, this.listIterator.next());
        };
        /**
         * @inheritdoc
         */
        SetIterator.prototype.advance = function (size) {
            return new SetIterator(this.set, this.listIterator.advance(size));
        };
        Object.defineProperty(SetIterator.prototype, "set", {
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            get: function () {
                return this.source;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SetIterator.prototype, "value", {
            /**
             * @inheritdoc
             */
            get: function () {
                return this.listIterator.value;
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
        SetIterator.prototype.equals = function (obj) {
            return _super.prototype.equals.call(this, obj) && this.listIterator == obj.listIterator;
        };
        /**
         * @inheritdoc
         */
        SetIterator.prototype.less = function (obj) {
            return std.less(this.value, obj.value);
        };
        /**
         * @inheritdoc
         */
        SetIterator.prototype.hashCode = function () {
            return std.base.hash.code(this.value);
        };
        return SetIterator;
    }(std.base.container.Iterator));
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
     * <p> {@link Stack}s are implemented as containers adaptors, which are classes that use an encapsulated
     * object of a specific container class as its <i>underlying container</i>, providing a specific set of member
     * functions to access its elements. Elements are pushed/popped from the {@link ILinearContainer.back back()}
     * of the {@link ILinearContainer specific container}, which is known as the top of the {@link Stack}. </p>
     *
     * <p> {@link data The underlying container} may be any of the standard container class templates or some other
     * specifically designed container class. The container shall support the following operations: </p>
     *
     * <ul>
     *	<li> empty </li>
     *	<li> size </li>
     *	<li> front </li>
     *	<li> back </li>
     *	<li> pushBack </li>
     *	<li> popBack </li>
     * </ul>
     *
     * <p> The standard container classes {@link Vector}, {@link Deque} and {@link List} fulfill these requirements.
     * By default, if no container class is specified for a particular {@link Stack} class instantiation,
     * the standard container {@link List} is used. </p>
     *
     * <ul>
     *	<li> Reference: http://www.cplusplus.com/reference/stack/stack/ </li>
     * </ul>
     *
     * @param <T> Type of elements.
     *
     * @author Jeongho Nam
     */
    var Stack = (function () {
        function Stack(stack) {
            if (stack === void 0) { stack = null; }
            this.data = new std.List();
            if (stack != null)
                this.data.assign(stack.data.begin(), stack.data.end());
        }
        /* ---------------------------------------------------------
            ACCESSORS
        --------------------------------------------------------- */
        /**
         * <p> Return size. </p>
         * <p> Returns the number of elements in the {@link Stack}. </p>
         *
         * <p> This member function effectively calls member {@link ILinearContainer.size size()} of the
         * {@link data underlying container} object. </p>
         *
         * @return The number of elements in the {@link data underlying container}.
         */
        Stack.prototype.size = function () {
            return this.data.size();
        };
        /**
         * <p> Test whether container is empty. </p>
         * <p> returns whether the {@link Stack} is empty: i.e. whether its <i>size</i> is zero. </p>
         *
         * <p> This member function effectively calls member {@link ILinearContainer.empty empty()} of the
         * {@link data underlying container} object. </p>
         *
         * @return <code>true</code> if the <i>underlying container</i>'s size is 0,
         *		   <code>false</code> otherwise. </p>
         */
        Stack.prototype.empty = function () {
            return this.data.empty();
        };
        /**
         * <p> Access next element. </p>
         *
         * <p> Returns a value of the top element in the {@link Stack} </p>.
         *
         * <p> Since {@link Stack}s are last-in first-out containers, the top element is the last element
         * inserted into the {@link Stack}. </p>
         *
         * <p> This member function effectively calls member {@link ILinearContainer.back back()} of the
         * {@link data underlying container} object. </p>
         *
         * @return A value of the top element in the {@link Stack}.
         */
        Stack.prototype.top = function () {
            return this.data.back();
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
         * {@link ILinearContainer.pushBack pushBack()} of the {@link data underlying container} object. </p>
         *
         * @param val Value to which the inserted element is initialized.
         */
        Stack.prototype.push = function (val) {
            this.data.pushBack(val);
        };
        /**
         * <p> Remove top element. </p>
         *
         * <p> Removes the element on top of the {@link Stack}, effectively reducing its size by one. </p>
         *
         * <p> The element removed is the latest element inserted into the {@link Stack}, whose value can be
         * retrieved by calling member {@link top Stack.top()} </p>.
         *
         * <p> This member function effectively calls the member function
         * {@link ILinearContainer.popBack popBack()} of the {@link data underlying container} object. </p>
         */
        Stack.prototype.pop = function () {
            this.data.popBack();
        };
        return Stack;
    }());
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
     * @author Jeongho Nam
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
/// <reference path="base/container/UniqueMap.ts" />
var std;
(function (std) {
    /**
     * <p> Tree-structured map, <code>std::map</code> of STL. </p>
     *
     * <p> {@link TreeMap}s are associative containers that store elements formed by a combination of a
     * <i>key value</i> (<i>Key</i>) and a <i>mapped value</i> (<i>T</i>), following order. </p>
     *
     * <p> In a {@link TreeMap}, the <i>key values</i> are generally used to sort and uniquely identify
     * the elements, while the <i>mapped values</i> store the content associated to this key. The types of
     * <i>key</i> and <i>mapped value</i> may differ, and are grouped together in member type <i>value_type</i>,
     * which is a {@link Pair} type combining both:
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
     * @author Jeongho Nam
     */
    var TreeMap = (function (_super) {
        __extends(TreeMap, _super);
        function TreeMap() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this.tree = new std.base.tree.PairTree();
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeMap.prototype.assign = function (begin, end) {
            _super.prototype.assign.call(this, begin, end);
        };
        /**
         * @inheritdoc
         */
        TreeMap.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.tree = new std.base.tree.PairTree();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        TreeMap.prototype.find = function (key) {
            var node = this.tree.find(key);
            if (node == null || std.equals(node.value.first, key) == false)
                return this.end();
            else
                return node.value;
        };
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
         * <p> A similar member function, {@link upperBound}, has the same behavior as {@link lowerBound}, except
         * in the case that the {@link TreeMap} contains an element with a key equivalent to <i>k</i>: In this
         * case, {@link lowerBound} returns an iterator pointing to that element, whereas {@link upperBound}
         * returns an iterator pointing to the next element. </p>
         *
         * @param k Key to search for.
         *
         * @return An iterator to the the first element in the container whose key is not considered to go before
         *		   <i>k</i>, or {@link TreeMap.end} if all keys are considered to go before <i>k</i>.
         */
        TreeMap.prototype.lowerBound = function (key) {
            var node = this.tree.find(key);
            if (node == null)
                return this.end();
            else if (std.less(node.value.first, key))
                return node.value.next();
            else
                return node.value;
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
         * <p> If the {@link TreeMap} class is instantiated with the default comparison type ({@link less}),
         * the function returns an iterator to the first element whose key is greater than <i>k</i> </p>.
         *
         * <p> A similar member function, {@link lowerBound}, has the same behavior as {@link upperBound}, except
         * in the case that the map contains an element with a key equivalent to <i>k</i>: In this case
         * {@link lowerBound} returns an iterator pointing to that element, whereas {@link upperBound} returns an
         * iterator pointing to the next element. </p>
         *
         * @param k Key to search for.
         *
         * @return An iterator to the the first element in the container whose key is considered to go after
         *		   <i>k</i>, or {@link TreeMap.end} if no keys are considered to go after <i>k</i>.
         */
        TreeMap.prototype.upperBound = function (key) {
            var node = this.tree.find(key);
            if (node == null)
                return this.end();
            else if (!std.equals(node.value.first, key) && !std.less(node.value.first, key))
                return node.value;
            else
                return node.value.next();
        };
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
         *		   the range (the same as {@link lowerBound}), and {@link Pair.second} is the upper bound
         *		   (the same as {@link upperBound}).
         */
        TreeMap.prototype.equalRange = function (key) {
            return new std.Pair(this.lowerBound(key), this.upperBound(key));
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @private
         */
        TreeMap.prototype.insertByPair = function (pair) {
            var node = this.tree.find(pair.first);
            // IF EQUALS, THEN RETURN FALSE
            if (node != null && std.equals(node.value.first, pair.first) == true)
                return new std.Pair(node.value, false);
            // INSERTS
            var it;
            if (node == null)
                it = this.end();
            else if (std.less(node.value.first, pair.first) == true)
                it = node.value.next();
            else
                it = node.value;
            // ITERATOR TO RETURN
            it = this.insert(it, pair);
            return new std.Pair(it, true);
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeMap.prototype.handleInsert = function (item) {
            this.tree.insert(item);
        };
        /**
         * @inheritdoc
         */
        TreeMap.prototype.handleErase = function (item) {
            this.tree.erase(item);
        };
        return TreeMap;
    }(std.base.container.UniqueMap));
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
     * <code>value_type</code>, which is a {@link Pair} type combining both:
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
     * @author Jeongho Nam
     */
    var TreeMultiMap = (function (_super) {
        __extends(TreeMultiMap, _super);
        function TreeMultiMap() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this.tree = new std.base.tree.PairTree();
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.assign = function (begin, end) {
            _super.prototype.assign.call(this, begin, end);
        };
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.clear = function () {
            _super.prototype.clear.call(this);
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.find = function (key) {
            var node = this.tree.find(key);
            if (node == null || std.equals(node.value.first, key) == false)
                return this.end();
            else
                return node.value;
        };
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
         * <p> A similar member function, {@link upperBound}, has the same behavior as {@link lowerBound}, except
         * in the case that the {@link TreeMultiMap} contains an element with keys equivalent to <i>k</i>:
         * In this case, {@link lowerBound} returns an iterator pointing to the first of such elements,
         * whereas {@link upperBound} returns an iterator pointing to the element following the last. </p>
         *
         * @param k Key to search for.
         *
         * @return An iterator to the the first element in the container whose key is not considered to go before
         *		   <i>k</i>, or {@link TreeMultiMap.end} if all keys are considered to go before <i>k</i>.
         */
        TreeMultiMap.prototype.lowerBound = function (key) {
            var node = this.tree.find(key);
            if (node == null)
                return this.end();
            else if (std.equals(node.value.first, key))
                return node.value;
            else {
                var it = node.value;
                while (!std.equals(it, this.end()) && std.less(it.first, key))
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
         * <p> If the {@link TreeMultiMap} class is instantiated with the default comparison type ({@link less}),
         * the function returns an iterator to the first element whose key is greater than <i>k</i> </p>.
         *
         * <p> A similar member function, {@link lowerBound}, has the same behavior as {@link upperBound}, except
         * in the case that the {@link TreeMultiMap} contains an element with keys equivalent to <i>k</i>:
         * In this case {@link lowerBound} returns an iterator pointing to first of such element, whereas
         * {@link upperBound} returns an iterator pointing to the element following the last. </p>
         *
         * @param k Key to search for.
         *
         * @return An iterator to the the first element in the container whose key is considered to go after
         *		   <i>k</i>, or {@link TreeMultiMap.end} if no keys are considered to go after <i>k</i>.
         */
        TreeMultiMap.prototype.upperBound = function (key) {
            var node = this.tree.find(key);
            if (node == null)
                return this.end();
            else {
                var it = node.value;
                while (!std.equals(it, this.end()) && (std.equals(it.first, key) || std.less(it.first, key)))
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
         *		   the range (the same as {@link lowerBound}), and {@link Pair.second} is the upper bound
         *		   (the same as {@link upperBound}).
         */
        TreeMultiMap.prototype.equalRange = function (key) {
            return new std.Pair(this.lowerBound(key), this.upperBound(key));
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @private
         */
        TreeMultiMap.prototype.insertByPair = function (pair) {
            var node = this.tree.find(pair.first);
            var it;
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
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.handleInsert = function (item) {
            this.tree.insert(item);
        };
        /**
         * @inheritdoc
         */
        TreeMultiMap.prototype.handleErase = function (item) {
            this.tree.erase(item);
        };
        return TreeMultiMap;
    }(std.base.container.MultiMap));
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
     * weak ordering criterion indicated by its internal comparison method (of {@link IComparable.less less}).
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
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Ordered </dt>
     *	<dd> The elements in the container follow a strict order at all times. All inserted elements are
     *		 given a position in this order. </dd>
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
     * @author Jeongho Nam
     */
    var TreeMultiSet = (function (_super) {
        __extends(TreeMultiSet, _super);
        function TreeMultiSet() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this.tree = new std.base.tree.AtomicTree();
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.assign = function (begin, end) {
            _super.prototype.assign.call(this, begin, end);
        };
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.tree = new std.base.tree.AtomicTree();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.find = function (val) {
            var node = this.tree.find(val);
            if (node == null || std.equals(val, node.value.value) == false)
                return this.end();
            else
                return node.value;
        };
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

         * <p> A similar member function, {@link upperBound}, has the same behavior as {@link lowerBound}, except
         * in the case that the {@link TreeMultiSet} contains elements equivalent to <i>val</i>: In this case
         * {@link lowerBound} returns an iterator pointing to the first of such elements, whereas
         * {@link upperBound} returns an iterator pointing to the element following the last. </p>
         *
         * @param val Value to compare.
         *
         * @return An iterator to the the first element in the container which is not considered to go before
         *		   <i>val</i>, or {@link TreeMultiSet.end} if all elements are considered to go before <i>val</i>.
         */
        TreeMultiSet.prototype.lowerBound = function (val) {
            var node = this.tree.find(val);
            if (node == null)
                return this.end();
            else if (std.equals(node.value.value, val))
                return node.value;
            else {
                var it = node.value;
                while (!std.equals(it, this.end()) && std.less(it.value, val))
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

         * <p> If the {@code TreeMultiSet} class is instantiated with the default comparison type (less), the
         * function returns an iterator to the first element that is greater than <i>val</i>. </p>
         *
         * <p> A similar member function, {@link lowerBound}, has the same behavior as {@link upperBound}, except
         * in the case that the {@TreeMultiSet} contains elements equivalent to <i>val</i>: In this case
         * {@link lowerBound} returns an iterator pointing to the first of such elements, whereas
         * {@link upperBound} returns an iterator pointing to the element following the last. </p>
         *
         * @param val Value to compare.
         *
         * @return An iterator to the the first element in the container which is considered to go after
         *		   <i>val</i>, or {@link TreeMultiSet.end} if no elements are considered to go after <i>val</i>.
         */
        TreeMultiSet.prototype.upperBound = function (val) {
            var node = this.tree.find(val);
            if (node == null)
                return this.end();
            else {
                var it = node.value;
                while (!std.equals(it, this.end()) && (std.equals(it.value, val) || std.less(it.value, val)))
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
         *		   the range (the same as {@link lowerBound}), and {@link Pair.second} is the upper bound
         *		   (the same as {@link upperBound}).
         */
        TreeMultiSet.prototype.equalRange = function (val) {
            return new std.Pair(this.lowerBound(val), this.upperBound(val));
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @private
         */
        TreeMultiSet.prototype.insertByVal = function (val) {
            var node = this.tree.find(val);
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
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.handleInsert = function (item) {
            this.tree.insert(item);
        };
        /**
         * @inheritdoc
         */
        TreeMultiSet.prototype.handleErase = function (item) {
            this.tree.erase(item);
        };
        return TreeMultiSet;
    }(std.base.container.MultiSet));
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
     *	<dd> Elements in associative containers are referenced by their <i>key</i> and not by their absolute
     *		 position in the container. </dd>
     *
     *	<dt> Ordered </dt>
     *	<dd> The elements in the container follow a strict order at all times. All inserted elements are
     *		 given a position in this order. </dd>
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
     * @author Jeongho Nam
     */
    var TreeSet = (function (_super) {
        __extends(TreeSet, _super);
        function TreeSet() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            _super.call(this);
            this.tree = new std.base.tree.AtomicTree();
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeSet.prototype.assign = function (begin, end) {
            _super.prototype.assign.call(this, begin, end);
        };
        /**
         * @inheritdoc
         */
        TreeSet.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.tree = new std.base.tree.AtomicTree();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        TreeSet.prototype.find = function (val) {
            var node = this.tree.find(val);
            if (node == null || std.equals(node.value.value, val) == false)
                return this.end();
            else
                return node.value;
        };
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
         * <p> A similar member function, {@link upperBound}, has the same behavior as {@link lowerBound},
         * except in the case that the {@link Set} contains an element equivalent to <i>val</i>: In this case
         * {@link lowerBound} returns an iterator pointing to that element, whereas {@link upperBound} returns
         * an iterator pointing to the next element. </p>
         *
         * @param val Value to compare.
         *
         * @return An iterator to the the first element in the container which is not considered to go before
         *		   <i>val</i>, or {@link Set.end} if all elements are considered to go before <i>val</i>.
         */
        TreeSet.prototype.lowerBound = function (val) {
            var node = this.tree.find(val);
            if (node == null)
                return this.end();
            else if (std.less(node.value.value, val))
                return node.value.next();
            else
                return node.value;
        };
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
         * <p> A similar member function, {@link lowerBound}, has the same behavior as {@link upperBound}, except
         * in the case that the {@link Set} contains an element equivalent to <i>val</i>: In this case
         * {@link lowerBound} returns an iterator pointing to that element, whereas {@link upperBound} returns
         * an iterator pointing to the next element. </p>
         *
         * @param val Value to compare.
         *
         * @return An iterator to the the first element in the container which is not considered to go before
         *		   <i>val</i>, or {@link Set.end} if all elements are considered to go after <i>val</i>.
         */
        TreeSet.prototype.upperBound = function (val) {
            var node = this.tree.find(val);
            if (node == null)
                return this.end();
            else if (!std.equals(node.value.value, val) && !std.less(node.value.value, val))
                return node.value;
            else
                return node.value.next();
        };
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
         *		   the range (the same as {@link lowerBound}), and {@link Pair.second} is the upper bound
         *		   (the same as {@link upperBound}).
         */
        TreeSet.prototype.equalRange = function (val) {
            return new std.Pair(this.lowerBound(val), this.upperBound(val));
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        /**
         * @private
         */
        TreeSet.prototype.insertByVal = function (val) {
            var node = this.tree.find(val);
            // IF EQUALS, THEN RETURN FALSE
            if (node != null && std.equals(node.value.value, val) == true)
                return new std.Pair(node.value, false);
            // INSERTS
            var it;
            if (node == null)
                it = this.end();
            else if (std.less(node.value.value, val) == true)
                it = node.value.next();
            else
                it = node.value;
            // ITERATOR TO RETURN
            it = this.insert(it, val);
            return new std.Pair(it, true);
        };
        /* ---------------------------------------------------------
            POST-PROCESS
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        TreeSet.prototype.handleInsert = function (item) {
            this.tree.insert(item);
        };
        /**
         * @inheritdoc
         */
        TreeSet.prototype.handleErase = function (item) {
            this.tree.erase(item);
        };
        return TreeSet;
    }(std.base.container.UniqueSet));
    std.TreeSet = TreeSet;
})(std || (std = {}));
var std;
(function (std) {
    /**
     * <p> Vector, the dynamic array. </p>
     *
     * <p> {@link Vector}s are sequence containers representing arrays that can change in size. </p>
     *
     * <p> Just like arrays, {@link Vector}s use contiguous storage locations for their elements, which
     * means that their elements can also be accessed using offsets on regular pointers to its elements, and
     * just as efficiently as in arrays. But unlike arrays, their size can change dynamically, with their
     * storage being handled automatically by the container. </p>
     *
     * <p> Internally, {@link Vector}s use a dynamically allocated array to store their elements. This
     * array may need to be reallocated in order to grow in size when new elements are inserted, which implies
     * allocating a new array and moving all elements to it. This is a relatively expensive task in terms of
     * processing time, and thus, {@link Vector}s do not reallocate each time an element is added to the
     * container. </p>
     *
     * <p> Instead, {@link Vector} containers may allocate some extra storage to accommodate for possible
     * growth, and thus the container may have an actual {@link capacity} greater than the storage strictly
     * needed to contain its elements (i.e., its {@link size}). Libraries can implement different strategies
     * for growth to balance between memory usage and reallocations, but in any case, reallocations should only
     * happen at logarithmically growing intervals of {@link size} so that the insertion of individual
     * elements at the end of the {@link Vector} can be provided with amortized constant time complexity
     * (see {@link pushBack pushBack()}). </p>
     *
     * <p> Therefore, compared to arrays, {@link Vector}s consume more memory in exchange for the ability
     * to manage storage and grow dynamically in an efficient way. </p>
     *
     * <p> Compared to the other dynamic sequence containers ({@link Deque}s, {@link List}s),
     * {@link Vector}s are very efficient accessing its elements (just like arrays) and relatively
     * efficient adding or removing elements from its end. For operations that involve inserting or removing
     * elements at positions other than the end, they perform worse than the others, and have less consistent
     * iterators and references than {@link List}s. </p>
     *
     * <h3> Container properties </h3>
     * <dl>
     *	<dt> Sequence </dt>
     *	<dd> Elements in sequence containers are ordered in a strict linear sequence. Individual elements are
     *		 accessed by their position in this sequence. </dd>
     *
     *	<dt> Dynamic array </dt>
     *	<dd> Allows direct access to any element in the sequence, even through pointer arithmetics, and provides
     *		 relatively fast addition/removal of elements at the end of the sequence. </dd>
     * </dl>
     *
     * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/vector/vector/
     * </ul>
     *
     * @param <T> Type of the elements.
     *
     * @author Jeongho Nam
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
            else if (args.length == 1 && (args[0] instanceof Vector || args[0] instanceof std.base.container.Container)) {
                // COPY CONSTRUCTOR
                var container = args[0];
                this.assign(container.begin(), container.end());
            }
            else if (args.length == 2 && args[0] instanceof std.base.container.Iterator && args[1] instanceof std.base.container.Iterator) {
                // CONSTRUCT FROM INPUT ITERATORS
                var begin = args[0];
                var end = args[1];
                this.assign(begin, end);
            }
        }
        Object.defineProperty(Vector, "iterator", {
            get: function () { return std.VectorIterator; },
            enumerable: true,
            configurable: true
        });
        Vector.prototype.assign = function (first, second) {
            this.clear();
            if (first instanceof std.base.container.Iterator && second instanceof std.base.container.Iterator) {
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
        Vector.prototype.reserve = function (size) {
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
            if (index > this.length)
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
        /* ---------------------------------------------------------
            ELEMENTS I/O
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        Vector.prototype.pushBack = function (val) {
            this.push(val);
        };
        /**
         * @inheritdoc
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
            if (args.length == 2 && args[1] instanceof std.base.container.Iterator == false) {
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
            else if (args.length == 3 && args[1] instanceof std.base.container.Iterator && args[2] instanceof std.base.container.Iterator) {
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
    }(Array));
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
     * @author Jeongho Nam
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
            if (this.index == -1)
                return new VectorIterator(this.vector, this.vector.size() - 1);
            else if (this.index - 1 < 0)
                return this.vector.end();
            else
                return new VectorIterator(this.vector, this.index - 1);
        };
        /**
         * @inheritdoc
         */
        VectorIterator.prototype.next = function () {
            if (this.index + 1 > this.source.size())
                return this.vector.end();
            else
                return new VectorIterator(this.vector, this.index + 1);
        };
        /**
         * @inheritdoc
         */
        VectorIterator.prototype.advance = function (n) {
            var newIndex = this.index + n;
            if (newIndex < 0 || newIndex >= this.vector.size())
                return this.vector.end();
            else
                return new VectorIterator(this.vector, newIndex);
        };
        return VectorIterator;
    }(std.base.container.Iterator));
    std.VectorIterator = VectorIterator;
})(std || (std = {}));
//# sourceMappingURL=std.js.map