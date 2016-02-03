var std;
(function (std) {
    var base;
    (function (base) {
        var container;
        (function (container_1) {
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
                        var container_2 = args[0];
                        this.assign(container_2.begin(), container_2.end());
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
            container_1.Container = Container;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        var container;
        (function (container_3) {
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
                MapContainer.prototype.constructByArray = function (items) {
                    for (var i = 0; i < items.length; i++)
                        this.insertByPair(items[i]);
                };
                MapContainer.prototype.constructByContainer = function (container) {
                    this.constructByRange(container.begin(), container.end());
                };
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
                 * <p> If the container is empty, the returned iterator is same with end(). </p>
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
                 * <p> If the container is empty, this function returns the same as Container::begin(). </p>
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
                    var list_it = hint.getListIterator();
                    list_it = this.data.insert(hint.getListIterator(), pair);
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
                MapContainer.prototype.eraseByKey = function (key) {
                    var it = this.find(key);
                    if (it.equals(this.end()) == true)
                        return 0;
                    this.eraseByIterator(it);
                    return 1;
                };
                MapContainer.prototype.eraseByIterator = function (it) {
                    // ERASE
                    var listIterator = this.data.erase(it.getListIterator());
                    // POST-PROCESS
                    this.handleErase(it);
                    return new std.MapIterator(this, listIterator);
                    ;
                };
                MapContainer.prototype.eraseByRange = function (begin, end) {
                    // ERASE
                    var listIterator = this.data.erase(begin.getListIterator(), end.getListIterator());
                    // POST-PROCESS
                    for (var it = begin; it.equals(this.end()) == false; it = it.next())
                        this.handleErase(it);
                    return new std.MapIterator(this, listIterator);
                };
                return MapContainer;
            })();
            container_3.MapContainer = MapContainer;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
/// <reference path="MapContainer.ts" />
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
            })(container.MapContainer);
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
                    //    this.constructByArray(args[0]);
                    //}
                    //else if (args.length == 1 && args[0] instanceof Container)
                    //{
                    //    this.constructByContainer(args[0]);
                    //}
                    //else if (args.length == 2 && args[0] instanceof Iterator && args[1] instanceof Iterator)
                    //{
                    //    this.constructByRange(args[0], args[1]);
                    //}
                }
                SetContainer.prototype.constructByArray = function (items) {
                    for (var i = 0; i < items.length; i++) {
                        if (this.has(items[i]) == true)
                            continue;
                        this.insertByVal(items[i]);
                    }
                };
                SetContainer.prototype.constructByContainer = function (container) {
                    this.constructByRange(container.begin(), container.end());
                };
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
                    else if (args.length == 2 && args[0] instanceof std.Iterator) {
                        if (args[1] instanceof std.Iterator && args[0].getSource() != this && args[1].getSource() != this)
                            return this.insertByRange(args[0], args[1]);
                        else
                            return this.insertByHint(args[0], args[1]);
                    }
                };
                //{
                //    // test whether exists
                //    let it = this.find(val);
                //    if (it.equals(this.end()) == false)
                //        return new pair<iterator<t>, boolean>(it, false);
                //    // insert
                //    this.data.pushback(val);
                //    it = it.prev();
                //    // post-process
                //    this.handleinsert(<setiterator<t>>it);
                //    return new pair<iterator<t>, boolean>(it, true);
                //}
                SetContainer.prototype.insertByHint = function (hint, val) {
                    // INSERT
                    var listIterator = this.data.insert(hint.getListIterator(), val);
                    // POST-PROCESS
                    var it = new std.SetIterator(this, listIterator);
                    this.handleInsert(it);
                    return it;
                };
                SetContainer.prototype.insertByRange = function (begin, end) {
                    for (var it = begin; it.equals(end) == false; it = it.next())
                        this.insertByVal(it.value);
                };
                SetContainer.prototype.erase = function () {
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
                SetContainer.prototype.eraseByKey = function (val) {
                    // TEST WHETHER EXISTS
                    var it = this.find(val);
                    if (it.equals(this.end()) == true)
                        return 0;
                    // ERASE
                    this.eraseByIterator(it);
                    return 1;
                };
                SetContainer.prototype.eraseByIterator = function (it) {
                    // ERASE
                    var listIterator = this.data.erase(it.getListIterator());
                    // POST-PROCESS
                    this.handleErase(it);
                    return new std.SetIterator(this, listIterator);
                };
                SetContainer.prototype.eraseByRange = function (begin, end) {
                    // ERASE
                    var listIterator = this.data.erase(begin.getListIterator(), end.getListIterator());
                    // POST-PROCESS
                    for (var it = begin; it.equals(this.end()) == false; it = it.next())
                        this.handleErase(it);
                    return begin.prev();
                };
                return SetContainer;
            })(container_4.Container);
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
            })(container.SetContainer);
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
                /**
                 * @inheritdoc
                 */
                UniqueMap.prototype.count = function (key) {
                    return this.find(key).equals(this.end()) ? 0 : 1;
                };
                UniqueMap.prototype.insert = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    return _super.prototype.insert.apply(this, args);
                };
                return UniqueMap;
            })(container.MapContainer);
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
            })(container.SetContainer);
            container.UniqueSet = UniqueSet;
        })(container = base.container || (base.container = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
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
            function codeByNumber(val) {
                return Math.abs(Math.round(val));
            }
            function codeByString(str) {
                var val = 0;
                for (var i = 0; i < str.length; i++)
                    val += str.charCodeAt(i) * Math.pow(31, str.length - 1 - i);
                return val;
            }
            function codeByObject(obj) {
                if (obj.hasOwnProperty("hashCode") == true)
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
                    var prevMatrix = this.matrix;
                    this.matrix = new std.Vector();
                    for (var i = 0; i < size; i++)
                        this.matrix.pushBack(new std.Vector());
                    for (var i = 0; i < prevMatrix.size(); i++)
                        for (var j = 0; j < prevMatrix.at(i).size(); j++) {
                            var val = prevMatrix.at(i).at(j);
                            this.matrix.at(this.hashIndex(val)).pushBack(val);
                            this.itemSize_++;
                        }
                };
                HashBuckets.prototype.clear = function () {
                    this.matrix = new std.Vector();
                    this.itemSize_ = 0;
                    for (var i = 0; i < hash.MIN_SIZE; i++)
                        this.matrix.pushBack(new std.Vector());
                };
                /* ---------------------------------------------------------
                    ACCESSORS
                --------------------------------------------------------- */
                HashBuckets.prototype.size = function () {
                    return this.matrix.size();
                };
                HashBuckets.prototype.itemSize = function () {
                    return this.itemSize_;
                };
                HashBuckets.prototype.at = function (index) {
                    return this.matrix.at(index);
                };
                HashBuckets.prototype.hashIndex = function (val) {
                    return hash.code(val) % this.matrix.size();
                };
                /* ---------------------------------------------------------
                    ELEMENTS I/O
                --------------------------------------------------------- */
                HashBuckets.prototype.insert = function (val) {
                    this.matrix.at(this.hashIndex(val)).pushBack(val);
                    if (++this.itemSize_ > this.matrix.size() * hash.MAX_RATIO)
                        this.reserve(this.itemSize_ * hash.RATIO);
                };
                HashBuckets.prototype.erase = function (val) {
                    var hashes = this.matrix.at(this.hashIndex(val));
                    for (var i = 0; i < hashes.size(); i++)
                        if (hashes.at(i) == val) {
                            hashes.splice(i, 1);
                            this.itemSize_--;
                            break;
                        }
                };
                return HashBuckets;
            })();
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
            })(hash.HashBuckets);
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
            })(hash.HashBuckets);
            hash.SetHashBuckets = SetHashBuckets;
        })(hash = base.hash || (base.hash = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        var tree;
        (function (tree) {
            var Color = (function () {
                function Color() {
                }
                Object.defineProperty(Color, "BLACK", {
                    get: function () { return false; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Color, "RED", {
                    get: function () { return true; },
                    enumerable: true,
                    configurable: true
                });
                return Color;
            })();
            tree.Color = Color;
        })(tree = base.tree || (base.tree = {}));
    })(base = std.base || (std.base = {}));
})(std || (std = {}));
var std;
(function (std) {
    var base;
    (function (base) {
        var tree;
        (function (tree) {
            var XTree = (function () {
                /* =========================================================
                    CONSTRUCTOR
                ========================================================= */
                /**
                 * Default Constructor
                 */
                function XTree() {
                    this.root = null;
                    this.size_ = 0;
                }
                /* =========================================================
                    ACCESSORS
                        - GETTERS
                        - COMPARISON
                ============================================================
                    GETTERS
                --------------------------------------------------------- */
                XTree.prototype.size = function () {
                    return this.size_;
                };
                XTree.prototype.find = function (val) {
                    var node = this.root;
                    if (node != null)
                        while (true) {
                            var newNode = null;
                            if (this.isEquals(val, node.value))
                                break;
                            else if (this.isLess(val, node.value))
                                newNode = node.left;
                            else
                                newNode = node.right;
                            if (newNode == null)
                                break;
                            else
                                node = newNode;
                        }
                    return node;
                };
                XTree.prototype.fetchMaximum = function (node) {
                    while (node.right != null)
                        node = node.right;
                    return node;
                };
                XTree.prototype.debug = function () {
                    if (this.root != null)
                        this.root.debug();
                };
                /* =========================================================
                    ELEMENTS I/O
                        - INSERT
                        - ERASE
                        - ROTATION
                ============================================================
                    INSERT
                --------------------------------------------------------- */
                XTree.prototype.insert = function (val) {
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
                    this.size_++;
                };
                XTree.prototype.insertCase1 = function (node) {
                    if (node.parent == null)
                        node.color = tree.Color.BLACK;
                    else
                        this.insertCase2(node);
                };
                XTree.prototype.insertCase2 = function (node) {
                    if (this.fetchColor(node.parent) == tree.Color.BLACK)
                        return;
                    else
                        this.insertCase3(node);
                };
                XTree.prototype.insertCase3 = function (node) {
                    if (this.fetchColor(node.uncle) == tree.Color.RED) {
                        node.parent.color = tree.Color.BLACK;
                        node.uncle.color = tree.Color.BLACK;
                        node.grandParent.color = tree.Color.RED;
                        this.insertCase1(node.grandParent);
                    }
                    else {
                        this.insertCase4(node);
                    }
                };
                XTree.prototype.insertCase4 = function (node) {
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
                XTree.prototype.insertCase5 = function (node) {
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
                XTree.prototype.erase = function (val) {
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
                    this.size_--;
                };
                XTree.prototype.eraseCase1 = function (node) {
                    if (node.parent == null)
                        return;
                    else
                        this.eraseCase2(node);
                };
                XTree.prototype.eraseCase2 = function (node) {
                    if (this.fetchColor(node.sibling) == tree.Color.RED) {
                        node.parent.color = tree.Color.RED;
                        node.sibling.color = tree.Color.BLACK;
                        if (node == node.parent.left)
                            this.rotateLeft(node.parent);
                        else
                            this.rotateRight(node.parent);
                    }
                    this.eraseCase3(node);
                };
                XTree.prototype.eraseCase3 = function (node) {
                    if (this.fetchColor(node.parent) == tree.Color.BLACK &&
                        this.fetchColor(node.sibling) == tree.Color.BLACK &&
                        this.fetchColor(node.sibling.left) == tree.Color.BLACK &&
                        this.fetchColor(node.sibling.right) == tree.Color.BLACK) {
                        node.sibling.color = tree.Color.RED;
                        this.eraseCase1(node.parent);
                    }
                    else
                        this.eraseCase4(node);
                };
                XTree.prototype.eraseCase4 = function (node) {
                    if (this.fetchColor(node.parent) == tree.Color.RED &&
                        node.sibling != null &&
                        this.fetchColor(node.sibling) == tree.Color.BLACK &&
                        this.fetchColor(node.sibling.left) == tree.Color.BLACK &&
                        this.fetchColor(node.sibling.right) == tree.Color.BLACK) {
                        node.sibling.color = tree.Color.RED;
                        node.parent.color = tree.Color.BLACK;
                    }
                    else
                        this.eraseCase5(node);
                };
                XTree.prototype.eraseCase5 = function (node) {
                    if (node == node.parent.left &&
                        node.sibling != null &&
                        this.fetchColor(node.sibling) == tree.Color.BLACK &&
                        this.fetchColor(node.sibling.left) == tree.Color.RED &&
                        this.fetchColor(node.sibling.right) == tree.Color.BLACK) {
                        node.sibling.color = tree.Color.RED;
                        node.sibling.left.color = tree.Color.BLACK;
                        this.rotateRight(node.sibling);
                    }
                    else if (node == node.parent.right &&
                        node.sibling != null &&
                        this.fetchColor(node.sibling) == tree.Color.BLACK &&
                        this.fetchColor(node.sibling.left) == tree.Color.BLACK &&
                        this.fetchColor(node.sibling.right) == tree.Color.RED) {
                        node.sibling.color = tree.Color.RED;
                        node.sibling.right.color = tree.Color.BLACK;
                        this.rotateLeft(node.sibling);
                    }
                };
                XTree.prototype.eraseCase6 = function (node) {
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
                    ROTATION
                --------------------------------------------------------- */
                XTree.prototype.rotateLeft = function (node) {
                    var right = node.right;
                    this.replaceNode(node, right);
                    node.right = right.left;
                    if (right.left != null)
                        right.left.parent = node;
                    right.left = node;
                    node.parent = right;
                };
                XTree.prototype.rotateRight = function (node) {
                    var left = node.left;
                    this.replaceNode(node, left);
                    node.left = left.right;
                    if (left.right != null)
                        left.right.parent = node;
                    left.right = node;
                    node.parent = left;
                };
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
                XTree.prototype.fetchColor = function (node) {
                    if (node == null)
                        return tree.Color.BLACK;
                    else
                        return node.color;
                };
                return XTree;
            })();
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
                    var node = this.root;
                    if (node != null)
                        while (true) {
                            var newNode = null;
                            if (std.equals(key, node.value.first))
                                break;
                            else if (std.less(key, node.value.first))
                                newNode = node.left;
                            else
                                newNode = node.right;
                            if (newNode == null)
                                break;
                            else
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
            })(tree.XTree);
            tree.PairTree = PairTree;
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
                    var node = this.root;
                    if (node != null)
                        while (true) {
                            var newNode = null;
                            if (std.equals(val, node.value.value))
                                break;
                            else if (std.less(val, node.value.value))
                                newNode = node.left;
                            else
                                newNode = node.right;
                            if (newNode == null)
                                break;
                            else
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
                    return std.less(left, right);
                };
                return AtomicTree;
            })(tree.XTree);
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
             * Reference: http://jiniya.net/tt/444
             */
            var XTreeNode = (function () {
                /* ---------------------------------------------------------
                    CONSTRUCTORS
                --------------------------------------------------------- */
                function XTreeNode(value, color) {
                    this.value = value;
                    this.color = color;
                    this.parent = null;
                    this.left = null;
                    this.right = null;
                }
                Object.defineProperty(XTreeNode.prototype, "grandParent", {
                    get: function () {
                        return this.parent.parent;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(XTreeNode.prototype, "sibling", {
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
                    get: function () {
                        return this.parent.sibling;
                    },
                    enumerable: true,
                    configurable: true
                });
                XTreeNode.prototype.debug = function (header, level) {
                    if (header === void 0) { header = "ROOT"; }
                    if (level === void 0) { level = 0; }
                    // TABS
                    var tab = "";
                    for (var i = 0; i < level; i++)
                        tab += "\t";
                    console.log(tab + header + ": " + this.value);
                    // LEFT AND  RIGHT
                    if (this.left != null)
                        this.left.debug("Left", level + 1);
                    if (this.right != null)
                        this.right.debug("Right", level + 1);
                };
                return XTreeNode;
            })();
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
    })();
    std.Bind = Bind;
})(std || (std = {}));
var std;
(function (std) {
    var example;
    (function (example) {
        var ContainerTest = (function () {
            function ContainerTest() {
                document.write("<h3> Container Test </h3>\n\n");
                //this.testList();
                this.testUnorderedSet();
                this.testUnorderedMap();
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
                var container = new std.MultiSet();
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
                document.write("<li>count(-5): #" + container.count(-5) + "</li>\n");
                document.write("</ul>\n\n");
            };
            ContainerTest.prototype.testUnorderedMap = function () {
                document.write("<h4> UnorderedMap </h4>\n");
                // CONSTRUCT LIST WITH ELEMENTS 0 TO 9
                var container = new std.MultiMap();
                for (var i = 0; i < 10; i++)
                    container.insert(new std.Pair(i, i));
                // ELEMENTS I/O
                document.write("Erase 7<br>\n" +
                    "Insert -5<br>\n" +
                    "Erase 3<br><br>\n\n");
                container.erase(7);
                container.insert(new std.Pair(-5, -5));
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
            ContainerTest.main = function () {
                new ContainerTest();
                var obj = new Object();
                obj["id"] = "samchon";
                obj["name"] = "Jeongho Nam";
                std.less(obj, {});
                document.writeln(JSON.stringify(obj));
            };
            return ContainerTest;
        })();
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
/// <reference path="base/container/Container.ts" />
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
            else if (args.length == 1 && (args[0] instanceof std.Vector || args[0] instanceof std.base.container.Container)) {
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
            if (this.empty() == true || first.prev().equals(this.end()) == true)
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
            if (next.prev().equals(this.end()) == true)
                this.begin_ = next;
            this.size_ -= size;
            return prev;
        };
        return List;
    })(std.base.container.Container);
    std.List = List;
})(std || (std = {}));
/// <reference path="Iterator.ts" />
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
/// <reference path="base/container/UniqueMap.ts" />
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
            this.tree = new std.base.tree.PairTree();
        }
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        //public assign<L extends K, U extends T>
        //    (begin: MapIterator<L, U>, end: MapIterator<L, U>): void
        //{
        //    super.assign(begin, end);
        //}
        /**
         * @inheritdoc
         */
        Map.prototype.clear = function () {
            _super.prototype.clear.call(this);
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        Map.prototype.find = function (key) {
            var node = this.tree.find(key);
            if (node == null || std.equals(node.value.first, key) == false)
                return this.end();
            else
                return node.value;
        };
        Map.prototype.findNear = function (key) {
            var node = this.tree.find(key);
            if (node == null)
                return this.end();
            else
                return node.value;
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        Map.prototype.insertByPair = function (pair) {
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
        Map.prototype.handleInsert = function (item) {
            this.tree.insert(item);
        };
        /**
         * @inheritdoc
         */
        Map.prototype.handleErase = function (item) {
            this.tree.erase(item);
        };
        return Map;
    })(std.base.container.UniqueMap);
    std.Map = Map;
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
            set: function (key) {
                this.listIterator.value.first = key;
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
        MapIterator.prototype.equals = function (obj) {
            return this.source == obj.source && this.listIterator == obj.listIterator;
        };
        MapIterator.prototype.less = function (obj) {
            return std.less(this.first, obj.first);
        };
        MapIterator.prototype.hashCode = function () {
            return std.hashCode(this.first);
        };
        return MapIterator;
    })();
    std.MapIterator = MapIterator;
})(std || (std = {}));
/// <reference path="base/container/MultiMap.ts" />
var std;
(function (std) {
    var MultiMap = (function (_super) {
        __extends(MultiMap, _super);
        function MultiMap() {
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
        //public assign<L extends K, U extends T>
        //    (begin: MapIterator<L, U>, end: MapIterator<L, U>): void
        //{
        //    super.assign(begin, end);
        //}
        /**
         * @inheritdoc
         */
        MultiMap.prototype.clear = function () {
            _super.prototype.clear.call(this);
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        MultiMap.prototype.find = function (key) {
            var node = this.tree.find(key);
            if (node == null || std.equals(node.value.first, key) == false)
                return this.end();
            else
                return node.value;
        };
        MultiMap.prototype.findNear = function (key) {
            var node = this.tree.find(key);
            if (node == null)
                return this.end();
            else
                return node.value;
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        MultiMap.prototype.insertByPair = function (pair) {
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
        MultiMap.prototype.handleInsert = function (item) {
            this.tree.insert(item);
        };
        /**
         * @inheritdoc
         */
        MultiMap.prototype.handleErase = function (item) {
            this.tree.erase(item);
        };
        return MultiMap;
    })(std.base.container.MultiMap);
    std.MultiMap = MultiMap;
})(std || (std = {}));
/// <reference path="base/container/MultiSet.ts" />
var std;
(function (std) {
    var MultiSet = (function (_super) {
        __extends(MultiSet, _super);
        function MultiSet() {
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
        ///**
        // * @inheritdoc
        // */
        //public assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void
        //{
        //    super.assign(begin, end);
        //}
        /**
         * @inheritdoc
         */
        MultiSet.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.tree = new std.base.tree.AtomicTree();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        MultiSet.prototype.find = function (val) {
            var node = this.tree.find(val);
            if (node == null || std.equals(val, node.value.value) == false)
                return this.end();
            else
                return node.value;
        };
        MultiSet.prototype.findNear = function (val) {
            var node = this.tree.find(val);
            if (node == null)
                return this.end();
            else
                return node.value;
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        MultiSet.prototype.insertByVal = function (val) {
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
        MultiSet.prototype.handleInsert = function (item) {
            this.tree.insert(item);
        };
        /**
         * @inheritdoc
         */
        MultiSet.prototype.handleErase = function (item) {
            this.tree.erase(item);
        };
        return MultiSet;
    })(std.base.container.MultiSet);
    std.MultiSet = MultiSet;
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
        if (left instanceof Object && left.hasOwnProperty("equals"))
            return left.equals(right);
        else
            return left == right;
    }
    std.equals = equals;
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
    function less(left, right) {
        if (left instanceof Object)
            if (left.hasOwnProperty("less") == true)
                return left.less(right);
            else
                return left.__getUID() < right.__getUID();
        else
            return left < right;
    }
    std.less = less;
    function greater(left, right) {
        return !std.equals(left, right) && !std.less(left, right);
    }
    std.greater = greater;
    function hashCode(par) {
        return std.base.hash.code(par);
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
        return Pair;
    })();
    std.Pair = Pair;
})(std || (std = {}));
/// <reference path="base/container/UniqueSet.ts" />
var std;
(function (std) {
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
    var Set = (function (_super) {
        __extends(Set, _super);
        function Set() {
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
        ///**
        // * @inheritdoc
        // */
        //public assign<U extends T>(begin: Iterator<U>, end: Iterator<U>): void
        //{
        //    super.assign(begin, end);
        //}
        /**
         * @inheritdoc
         */
        Set.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.tree = new std.base.tree.AtomicTree();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        Set.prototype.find = function (val) {
            var node = this.tree.find(val);
            if (node == null || std.equals(node.value.value, val) == false)
                return this.end();
            else
                return node.value;
        };
        Set.prototype.findNear = function (val) {
            var node = this.tree.find(val);
            if (node == null)
                return this.end();
            else
                return node.value;
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        Set.prototype.insertByVal = function (val) {
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
        Set.prototype.handleInsert = function (item) {
            this.tree.insert(item);
        };
        /**
         * @inheritdoc
         */
        Set.prototype.handleErase = function (item) {
            this.tree.erase(item);
        };
        return Set;
    })(std.base.container.UniqueSet);
    std.Set = Set;
})(std || (std = {}));
/// <refe0rence path="Iterator.ts" />
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
            return new SetIterator(this.source, this.listIterator.prev());
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
            return new SetIterator(this.source, this.listIterator.advance(size));
        };
        Object.defineProperty(SetIterator.prototype, "value", {
            /* ---------------------------------------------------------
                ACCESSORS
            --------------------------------------------------------- */
            /**
             * @inheritdoc
             */
            get: function () {
                return this.listIterator.value;
            },
            /**
             * @inheritdoc
             */
            set: function (val) {
                this.listIterator.value = val;
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
        SetIterator.prototype.less = function (obj) {
            return std.less(this.value, obj.value);
        };
        SetIterator.prototype.hashCode = function () {
            return std.base.hash.code(this.value);
        };
        return SetIterator;
    })(std.Iterator);
    std.SetIterator = SetIterator;
})(std || (std = {}));
/// <reference path="base/container/UniqueMap.ts" />
var std;
(function (std) {
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
    var UnorderedMap = (function (_super) {
        __extends(UnorderedMap, _super);
        function UnorderedMap() {
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
        UnorderedMap.prototype.constructByArray = function (items) {
            this.hashBuckets.reserve(items.length * std.base.hash.RATIO);
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
        UnorderedMap.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.hashBuckets.clear();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        UnorderedMap.prototype.find = function (key) {
            return this.hashBuckets.find(key);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        UnorderedMap.prototype.insertByPair = function (pair) {
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
        UnorderedMap.prototype.insertByRange = function (begin, end) {
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
        UnorderedMap.prototype.handleInsert = function (it) {
            this.hashBuckets.insert(it);
        };
        /**
         * @inheritdoc
         */
        UnorderedMap.prototype.handleErase = function (it) {
            this.hashBuckets.erase(it);
        };
        return UnorderedMap;
    })(std.base.container.UniqueMap);
    std.UnorderedMap = UnorderedMap;
})(std || (std = {}));
/// <reference path="base/container/MultiMap.ts" />
var std;
(function (std) {
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
    var UnorderedMultiMap = (function (_super) {
        __extends(UnorderedMultiMap, _super);
        function UnorderedMultiMap() {
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
        UnorderedMultiMap.prototype.constructByArray = function (items) {
            this.hashBuckets.reserve(items.length * std.base.hash.RATIO);
            _super.prototype.constructByArray.call(this, items);
        };
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        UnorderedMultiMap.prototype.assign = function (begin, end) {
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
        UnorderedMultiMap.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.hashBuckets.clear();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        UnorderedMultiMap.prototype.find = function (key) {
            return this.hashBuckets.find(key);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        UnorderedMultiMap.prototype.insertByPair = function (pair) {
            var listIterator = this.data.insert(this.data.end(), pair);
            var it = new std.MapIterator(this, listIterator);
            this.handleInsert(it);
            return it;
        };
        UnorderedMultiMap.prototype.insertByRange = function (begin, end) {
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
        UnorderedMultiMap.prototype.handleInsert = function (it) {
            this.hashBuckets.insert(it);
        };
        /**
         * @inheritdoc
         */
        UnorderedMultiMap.prototype.handleErase = function (it) {
            this.hashBuckets.erase(it);
        };
        return UnorderedMultiMap;
    })(std.base.container.MultiMap);
    std.UnorderedMultiMap = UnorderedMultiMap;
})(std || (std = {}));
/// <reference path="base/container/MultiSet.ts" />
var std;
(function (std) {
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
    var UnorderedMultiSet = (function (_super) {
        __extends(UnorderedMultiSet, _super);
        function UnorderedMultiSet() {
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
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                this.constructByRange(args[0], args[1]);
            }
        }
        UnorderedMultiSet.prototype.constructByArray = function (items) {
            this.hashBuckets.reserve(items.length * std.base.hash.RATIO);
            _super.prototype.constructByArray.call(this, items);
        };
        /* ---------------------------------------------------------
            ASSIGN & CLEAR
        --------------------------------------------------------- */
        /**
         * @inheritdoc
         */
        UnorderedMultiSet.prototype.assign = function (begin, end) {
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
        UnorderedMultiSet.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.hashBuckets.clear();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        UnorderedMultiSet.prototype.find = function (val) {
            return this.hashBuckets.find(val);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        UnorderedMultiSet.prototype.insertByVal = function (val) {
            // INSERT
            var listIterator = this.data.insert(this.data.end(), val);
            var it = new std.SetIterator(this, listIterator);
            // POST-PROCESS
            this.handleInsert(it);
            return it;
        };
        UnorderedMultiSet.prototype.insertByRange = function (begin, end) {
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
        UnorderedMultiSet.prototype.handleInsert = function (it) {
            this.hashBuckets.insert(it);
        };
        /**
         * @inheritdoc
         */
        UnorderedMultiSet.prototype.handleErase = function (it) {
            this.hashBuckets.erase(it);
        };
        return UnorderedMultiSet;
    })(std.base.container.MultiSet);
    std.UnorderedMultiSet = UnorderedMultiSet;
})(std || (std = {}));
/// <reference path="base/container/UniqueSet.ts" />
var std;
(function (std) {
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
    var UnorderedSet = (function (_super) {
        __extends(UnorderedSet, _super);
        function UnorderedSet() {
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
            else if (args.length == 2 && args[0] instanceof std.Iterator && args[1] instanceof std.Iterator) {
                this.constructByRange(args[0], args[1]);
            }
        }
        UnorderedSet.prototype.constructByArray = function (items) {
            this.hashBuckets.reserve(items.length * std.base.hash.RATIO);
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
        UnorderedSet.prototype.clear = function () {
            _super.prototype.clear.call(this);
            this.hashBuckets.clear();
        };
        /* =========================================================
            ACCESSORS
        ========================================================= */
        /**
         * @inheritdoc
         */
        UnorderedSet.prototype.find = function (val) {
            return this.hashBuckets.find(val);
        };
        /* =========================================================
            ELEMENTS I/O
                - INSERT
                - POST-PROCESS
        ============================================================
            INSERT
        --------------------------------------------------------- */
        UnorderedSet.prototype.insertByVal = function (val) {
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
        UnorderedSet.prototype.insertByRange = function (begin, end) {
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
        UnorderedSet.prototype.handleInsert = function (item) {
            this.hashBuckets.insert(item);
        };
        /**
         * @inheritdoc
         */
        UnorderedSet.prototype.handleErase = function (item) {
            this.hashBuckets.erase(item);
        };
        return UnorderedSet;
    })(std.base.container.UniqueSet);
    std.UnorderedSet = UnorderedSet;
})(std || (std = {}));
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
            else if (args.length == 1 && (args[0] instanceof Vector || args[0] instanceof std.base.container.Container)) {
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
//# sourceMappingURL=std.js.map