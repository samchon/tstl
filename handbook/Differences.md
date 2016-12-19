# Differences between C++
Let's talk about which differences exist between *C++/STL* and *TypeScript-STL*.


## Naming convention
### Classes
Unlike ordinary STL (C++ STL), TypeScript-STL supports not only **snake notation** but also **camel notation** on class naming. 

  - Snake Notation: https://en.wikipedia.org/wiki/Snake_case
  - Camel Notation: https://en.wikipedia.org/wiki/Camel_case

C++/STL | TypeScript-STL | TypeScript-STL
--------|----------------|----------------
[std::vector](http://www.cplusplus.com/reference/vector/vector) | [std.vector](http://samchon.github.io/stl/api/classes/std.vector.html) | [std.Vector](http://samchon.github.io/stl/api/classes/std.vector.html)
[std::list](http://www.cplusplus.com/reference/list/list) | [std.list](http://samchon.github.io/stl/api/classes/std.list.html) | [std.List](http://samchon.github.io/stl/api/classes/std.list.html)
[std::deque](http://www.cplusplus.com/reference/deque/deque) | [std.deque](http://samchon.github.io/stl/api/classes/std.deque.html) | [std.Deque](http://samchon.github.io/stl/api/classes/std.deque.html)
[std::queue](http://www.cplusplus.com/reference/queue/queue) | [std.queue](http://samchon.github.io/stl/api/classes/std.queue.html) | [std.Queue](http://samchon.github.io/stl/api/classes/std.queue.html)
[std::priority_queue](http://www.cplusplus.com/reference/queue/priority_queue) | [std.priority_queue](http://samchon.github.io/stl/api/classes/std.priorityqueue.html) | [std.PriorityQueue](http://samchon.github.io/stl/api/classes/std.priorityqueue.html)
[std::stack](http://www.cplusplus.com/reference/stack/stack) | [std.stack](http://samchon.github.io/stl/api/classes/std.stack.html) | [std.Stack](http://samchon.github.io/stl/api/classes/std.stack.html)

###### Exception case: Associative Containers
However, associative containers, their camel names are something different.

In pure *JavaScript*, class name of *Map* and *Set* are reserved for *ES6 features*. To avoid the name confliction, TypeScript-STL's associative containers, their camel notated class names are representing their own mapping algorithm. For example, [std.map](http://samchon.github.io/stl/api/classes/std.treemap.html)'s camel name is [TreeMap](http://samchon.github.io/stl/api/classes/std.treemap.html) because it is mapping key elements via the *B+ Tree*.

C++/STL | TypeScript-STL | TypeScript-STL
--------|----------------|----------------
[std::set](http://www.cplusplus.com/reference/set/set) | [std.set](http://samchon.github.io/stl/api/classes/std.treeset.html) | [std.TreeSet](http://samchon.github.io/stl/api/classes/std.treeset.html)
[std::multiset](http://www.cplusplus.com/reference/set/multiset) | [std.multiset](http://samchon.github.io/stl/api/classes/std.treemultiset.html) | [std.TreeMultiSet](http://samchon.github.io/stl/api/classes/std.treemultiset.html)
[std::unordered_set](http://www.cplusplus.com/reference/unordered_set/unordered_set) | [std.unordered_set](http://samchon.github.io/stl/api/classes/std.hashset.html) | [std.HashSet](http://samchon.github.io/stl/api/classes/std.hashset.html)
[std::unordered_multiset](http://www.cplusplus.com/reference/unordered_set/unordered_multiset) | [std.unordered_multiset](http://samchon.github.io/stl/api/classes/std.hashmultiset.html) | [std.HashMultiSet](http://samchon.github.io/stl/api/classes/std.hashmultiset.html)
[std::map](http://www.cplusplus.com/reference/map/map) | [std.map](http://samchon.github.io/stl/api/classes/std.treemap.html) | [std.TreeMap](http://samchon.github.io/stl/api/classes/std.treemap.html)
[std::multimap](http://www.cplusplus.com/reference/map/multimap) | [std.multimap](http://samchon.github.io/stl/api/classes/std.treemultimap.html) | [std.TreeMultiMap](http://samchon.github.io/stl/api/classes/std.treemultimap.html)
[std::unordered_map](http://www.cplusplus.com/reference/unordered_map/unordered_map) | [std.unordered_map](http://samchon.github.io/stl/api/classes/std.hashmap.html) | [std.HashMap](http://samchon.github.io/stl/api/classes/std.hashmap.html)
[std::unordered_multimap](http://www.cplusplus.com/reference/unordered_map/unordered_multimap) | [std.unordered_multimap](http://samchon.github.io/stl/api/classes/std.hashmultimap.html) | [std.HashMultiMap](http://samchon.github.io/stl/api/classes/std.hashmultimap.html)

### Methods, Functions
Unllike the classses' naming, methods and functions, they're following only **snake notation**.



## Operator
### Operator overriding.

C++      | TypeScript-STL
---------|----------------
Object::operator< | [IComparable.less](http://samchon.github.io/typescript-stl/api/interfaces/std.icomparable.html#less)
Object::operator== | [IComparable.equals](http://samchon.github.io/typescript-stl/api/interfaces/std.icomparable.html#equals)

In *C++*, operator overriding in a class level is possible. Unlike *C++*, *JavScript* doesn't support the operator overriding, so we cannot do such thing like *C++* in *JavaScript*. However, we need similar function for standard comparison to use *STL containers*. For an example, [TreeMap](http://samchon.github.io/typescript-stl/api/classes/std.treemap.html) requires comparison method for sorting and constructing a [B+ Tree](http://samchon.github.io/typescript-stl/api/classes/std.base.xtree.html). Of course, many algorithms in *STL* also requires it, **operator overriding**.

To substitute the operator overriding, we promise a protocol method. Use [less](http://samchon.github.io/typescript-stl/api/interfaces/std.icomparable.html#less) instead of ```operator<``` and use [equals](http://samchon.github.io/typescript-stl/api/interfaces/std.icomparable.html#equals) insteand of ```operator==```.

###### std.Pair follows the operator overriding protocol.
``` typescript
namespace std
{
	export class Pair<First, Second> implements IComparable<Pair<First, Second>>
	{
		public less(pair: Pair<First, Second>): boolean
		{
			if (std.equal_to(this.first, pair.first) == false)
				return std.less(this.first, pair.first);
			else
				return std.less(this.second, pair.second);
		}
	
		public equals(pair: Pair<First, Second>): boolean
		{
			return std.equal_to(this.first, pair.first) && std.equal_to(this.second, pair.second);
		}
	}
}
```

#### Instead of using comparison operator.

C++ | Global Method | Member Method
----|---------------|--------------------
A < B | [std.less](http://samchon.github.io/typescript-stl/api/modules/std.html#less)(A, B) | A.[less](http://samchon.github.io/typescript-stl/api/interfaces/std.icomparable.html#less)(B)
A == B | [std.equal_to](http://samchon.github.io/typescript-stl/api/modules/std.html#equal_to)(A, B) | A.[equals](http://samchon.github.io/typescript-stl/api/interfaces/std.icomparable.html#equals)(B)
A <= B | [std.less_equal](http://samchon.github.io/typescript-stl/api/modules/std.html#less_equal)(A, B) | A.less(B) *OR* A.equals(B)
A > B | [std.greater](http://samchon.github.io/typescript-stl/api/modules/std.html#greater)(A, B) | !A.less(B) *AND* !A.equals(B)
A >= B | [std.greater_equal](http://samchon.github.io/typescript-stl/api/modules/std.html#greater_equal)(A, B) | !A.less(B)
A != B | [std.not_equal_to](http://samchon.github.io/typescript-stl/api/modules/std.html#not_equal_to)(A, B) | !A.equals(B)

We promised a method protocol for operator overriding. To keep it, we don't have to use local operator symbol like ```==``` to objects. Instead of the ```A == B```, use ```std.equal_to(A, B)``` or ```A.equals(B)```.

###### Use promised methods
``` typescript
// TWO PAIRS HAVE SAME VALUE
let pair1 = std.make_pair("samchon", "Jeongho Nam");
let pair2 = std.make_pair("samchon", "Jeongho Nam");

// VALIDATE
console.log(pair1 == pair2); // false, DON'T USE IT.
console.log(pair.equals(pair2)); // true, RECOMMENDED
console.log(std.equal_to(pair1, pair2)); // true, IT'S OK
```


## Iterator
##### Operators

C++/STL              | TypeScript-STL
---------------------|---------------------------
Iterator::operator== | [Iterator.equals](http://samchon.github.io/typescript-stl/api/classes/std.iterator.html#equals)
Iterator::operator*  | [Iterator.value](http://samchon.github.io/typescript-stl/api/classes/std.iterator.html#value)
Iterator::operator-- | [Iterator.prev](http://samchon.github.io/typescript-stl/api/classes/std.iterator.html#prev)
Iterator::operator++ | [Iterator.next](http://samchon.github.io/typescript-stl/api/classes/std.iterator.html#next)

###### C++ Style Iteration
``` cpp
std::vector<int> int_array(5, 1);

for (auto it = int_array.begin(); it != int_array.end(); it++)
	std::cout << *it << std::endl;
```

###### TypeScript Style Iteration
``` typescript
let intArray = new std.Vector<number>(5, 1);

// for (auto it = intArray.begin(); it != intArray.end(); it++)
for (let it = intArray.begin(); !it.equals(intArray.end()); it = it.next())
	console.log(it.value); // std::cout << *it << std::endl;
```

##### Advance Returns

C++/STL | TypeScript-STL
----|---------------------------
```it++;``` | ```it = it.next();```
```next(it);``` | ```it = it.next();```
```advance(it, 5);``` | ```it = it.advance(5);```



## Tree Container, Sequence Template Parameter
###### C++, custom comparison function in template parameter
``` cpp
std::map<int, std::string, std::greater<std::string>> default_map;
std::map<int, std::string, std::greater<std::string>> assigned_map(default_map.begin(), default_map.end());
```

###### TypeScript, custom comparison function in tail parameter
``` typescript
let defaultMap = new std.TreeMap<string, number>(std.greater);
let assignedMap = new std.TreeMap<string, number>(defaultMap.begin(), defaultMap.end(), std.greater);
```

## Hash Container, Custom Hash Function
###### C++, custom hash function in template parameter
``` cpp
template <typename Key, typename T>
class Entry
{
private:
	Key key;
	T value;
	
public:
	// MUST BE SPECIFIED IN TEMPLATE PARAMETER
	static size_t hashCode()
	{
		return std::hash(key);
	};
	
	bool operator==(const Entry<Key, T> &obj) const
	{
		return key == obj.key;
	};
};

std::unordered_set<Entry, Entry::hashCode> entrySet;
```

###### TypeScript, custom hash function in member function
``` typescript
class Entry<Key, T> implements std.IComparable<Entry<Key, T>>
{
	private key: Key;
	private value: T;
	
	// WHEN MEMBER FUNCTION {hash()Code} is defined, then be used automatically.
	public hashCode(): number
	{
		return std.hash(key);
	}
	
	// LESS AND EQUALS
	public less(obj: Entry<Key, T>)): boolean
	{
		return std.less(this.key, obj.key);
	}
	public equals(obj: Entry<Key, T>): boolean
	{
		return std.equal_to(this.key, obj.key);
	}
}

let entrySet = new std.HashSet<Entiry>();
```