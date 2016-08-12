# Differences between C++/STL
Let's talk about which differences exist between *C++/STL* and *TypeScript-STL*.

## Naming convention
#### TypeScript-STL follows Camel notation in class name.
C++/STL | TypeScript-STL
--------|----------------
[std::vector](http://www.cplusplus.com/reference/vector/vector) | [std.Vector](http://samchon.github.io/stl/api/classes/std.vector.html)
[std::list](http://www.cplusplus.com/reference/list/list) | [std.List](http://samchon.github.io/stl/api/classes/std.list.html)
[std::deque](http://www.cplusplus.com/reference/deque/deque) | [std.Deque](http://samchon.github.io/stl/api/classes/std.deque.html)
[std::queue](http://www.cplusplus.com/reference/queue/queue) | [std.Queue](http://samchon.github.io/stl/api/classes/std.queue.html)
[std::priority_queue](http://www.cplusplus.com/reference/queue/priority_queue) | [std.PriorityQueue](http://samchon.github.io/stl/api/classes/std.priorityqueue.html)
[std::stack](http://www.cplusplus.com/reference/stack/stack) | [std.Stack](http://samchon.github.io/stl/api/classes/std.stack.html)

Unlike ordinary *STL*; *C++/STL*, *TypeScript-STL* is following *Camel notation* on class name. The first letter begins from capital letter and spaced word also begins from capital letter with concatenation. 
  - https://en.wikipedia.org/wiki/CamelCase

Those naming notation (Camel) is also adjusted in [Exception](http://samchon.github.io/stl/api/classes/std.exception.html) classes.

#### Map and Set containers have their own specific name following algorithm.
C++/STL | TypeScript-STL
--------|----------------
[std::set](http://www.cplusplus.com/reference/set/set) | [std.TreeSet](http://samchon.github.io/stl/api/classes/std.treeset.html)
[std::multiset](http://www.cplusplus.com/reference/set/multiset) | [std.TreeMultiSet](http://samchon.github.io/stl/api/classes/std.treemultiset.html)
[std::unordered_set](http://www.cplusplus.com/reference/unordered_set/unordered_set) | [std.HashSet](http://samchon.github.io/stl/api/classes/std.hashset.html)
[std::unordered_multiset](http://www.cplusplus.com/reference/unordered_set/unordered_multiset) | [std.HashMultiSet](http://samchon.github.io/stl/api/classes/std.hashmultiset.html)
[std::map](http://www.cplusplus.com/reference/map/map) | [std.TreeMap](http://samchon.github.io/stl/api/classes/std.treemap.html)
[std::multimap](http://www.cplusplus.com/reference/map/multimap) | [std.TreeMultiMap](http://samchon.github.io/stl/api/classes/std.treemultimap.html)
[std::unordered_map](http://www.cplusplus.com/reference/unordered_map/unordered_map) | [std.HashMap](http://samchon.github.io/stl/api/classes/std.hashmap.html)
[std::unordered_multimap](http://www.cplusplus.com/reference/unordered_map/unordered_multimap) | [std.HashMultiMap](http://samchon.github.io/stl/api/classes/std.hashmultimap.html)

In pure *JavaScript*, Name of *Map* and *Set* are reserved for *ES6* hash-map and hash-set containers. Thus unlike linear containers like *Vector* and *List* who are following same words of *C++/STL*, *Set* and *Map* containers' names are extremely different with *C++/STL*.

Their name is following their own mapping algorithm. *TreeMap* is a map container mapping key elements by tree algorithm. Of course, *HashMap* is a map container mapping key elements by hashing algorithm.

#### However, function names are following snake notation like C++/STL.
C++/STL | TypeScript-STL
--------|----------------
[std::bind](http://www.cplusplus.com/reference/functional/bind) | [std.bind](http://samchon.github.io/stl/api/modules/std.html#bind)
[std::find_if](http://www.cplusplus.com/reference/algorithm/find_if) | [std.find_if](http://samchon.github.io/stl/api/modules/std.html#find_if)
[std::vector::push_back](http://www.cplusplus.com/reference/vector/vector/push_back) | [std.Vector.push_back](http://samchon.github.io/stl/api/classes/std.vector.html#push_back)
[std::map::equal_range](http://www.cplusplus.com/reference/map/map/equal_range) | [std.TreeMap.equal_range](http://samchon.github.io/stl/api/classes/std.treemap.html#equal_range)

Class name is following *Camel notation*, however, function name is following *Snake notation* which is being followed by *C++/STL* too.

## Operator Overriding
#### Substitute operator overriding.

C++/STL | TypeScript-STL
--------|----------------
operator< | [less](http://samchon.github.io/stl/api/interfaces/std.icomparable.html#less)
operator== | [equal_to](http://samchon.github.io/stl/api/interfaces/std.icomparable.html#equal_to)

In *C++*, operator overriding in a class level is possible. Unlike *C++*, *JavScript* doesn't support the operator overriding, so we cannot do such thing like *C++* in *JavaScript*. However, we need similar function for standard comparison to use *STL containers*. For an example, [TreeMap](http://samchon.github.io/stl/api/classes/std.treemap.html) requires comparison method for sorting and constructing a [B+ Tree](http://samchon.github.io/stl/api/classes/std.base.xtree.html). Of course, many algorithms in *STL* also requires it, **operator overriding**.

To substitute the operator overriding, we promise a protocol method. Use [less](http://samchon.github.io/stl/api/interfaces/std.icomparable.html#less) instead of ```operator<``` and use [equal_to](http://samchon.github.io/stl/api/interfaces/std.icomparable.html#equal_to) insteand of ```operator==```.

###### std.Pair follows the operator overriding protocol.
``` typescript
namespace std
{
	export class Pair<First, Second>
	{
		public less<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean
		{
			if (std.equal_to(this.first, pair.first) == false)
				return std.less(this.first, pair.first);
			else
				return std.less(this.second, pair.second);
		}
	
		public equal_to<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean
		{
			return std.equal_to(this.first, pair.first) && std.equal_to(this.second, pair.second);
		}
	}
}
```

#### Using promised operator.

C++/STL | TypeScript-STL Global Method | TypeScript-STL Member Method
--------|------------------------------|------------------------------
A < B | [std.less](http://samchon.github.io/stl/api/modules/std.html#less)(A, B) | A.[less](http://samchon.github.io/stl/api/interfaces/std.icomparable.html#less)(B)
A == B | [std.equal_to](http://samchon.github.io/stl/api/modules/std.html#equal_to)(A, B) | A.[equal_to](http://samchon.github.io/stl/api/interfaces/std.icomparable.html#equal_to)(B)
A <= B | [std.less_equal](http://samchon.github.io/stl/api/modules/std.html#less_equal)(A, B) | A.less(B) *OR* A.less(B)
A > B | [std.greater](http://samchon.github.io/stl/api/modules/std.html#greater)(A, B) | !A.less(B) *AND* !A.equal_to(B)
A >= B | [std.greater_equal](http://samchon.github.io/stl/api/modules/std.html#greater_equal)(A, B) | !A.less(B)
A != B | [std.not_equal_to](http://samchon.github.io/stl/api/modules/std.html#not_equal_to)(A, B) | !A.equal_to(B)

We promised a method protocol for operator overriding. To keep it, we don't have to use local operator symbol like ```==``` to objects. Instead of the ```A == B```, use ```std.equal_to(A, B)``` or ```A.equal_to(B)```.

###### Use promised methods
``` typescript
// TWO PAIRS HAVE SAME VALUE
let pair1 = std.make_pair("samchon", "Jeongho Nam");
let pair2 = std.make_pair("samchon", "Jeongho Nam");

// VALIDATE
console.log(pair1 == pair2); // false, DON'T USE IT.
console.log(pair.equal_to(pair2)); // true, RECOMMENDED
console.log(std.equal_to(pair2)); // true, IT'S OK
```


## Iterator
##### Operators

C++/STL | TypeScript-STL
--------|----------------
operator== | [equal_to](http://samchon.github.io/stl/api/classes/std.iterator.html#equal_to)
operator* | [value](http://samchon.github.io/stl/api/classes/std.iterator.html#value)
operator-- | [prev](http://samchon.github.io/stl/api/classes/std.iterator.html#prev)
operator++ | [next](http://samchon.github.io/stl/api/classes/std.iterator.html#next)

``` cpp
std::vector<int> int_array(5, 1);

for (auto it = int_array.begin(); it != int_array.end(); it++)
	std::cout << *it << std::endl;
```

``` typescript
let intArray = new std.Vector<number>(5, 1);

// for (auto it = intArray.begin(); it != intArray.end(); it++)
for (let it = intArray.begin(); !it.equal_to(intArray.end()); it = it.next())
	console.log(it.value); // std::cout << *it << std::endl;
```

##### Advance Returns

C++/STL | TypeScript-STL
--------|----------------
```it++;``` | ```it = it.next();```
```next(it);``` | ```it = it.next();```
```advance(it, 5);``` | ```it = it.advance(5);```



## Tree Container
``` cpp
std::map<int, std::string, std::greater<std::string>> default_map;
std::map<int, std::string, std::greater<std::string>> assigned_map(default_map.begin(), default_map.end());
```

``` typescript
let defaultMap = new std.Map<string, number>(std.greater);
let assignedMap = new std.Map<string, number>(defaultMap.begin(), defaultMap.end(), std.greater);
```

## Hash Container