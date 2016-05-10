[![npm version](https://badge.fury.io/js/typescript-stl.svg)](https://badge.fury.io/js/typescript-stl)
[![Downloads](https://img.shields.io/npm/dm/typescript-stl.svg)](https://www.npmjs.com/package/typescript-stl)

TypeScript-STL
=========
STL (Standard Template Library) and Containers for TypeScript

## References
##### Homepages
- Formal Homepage: http://samchon.github.io/stl
- API Documents: http://samchon.github.io/stl/api

##### Projects using STL for TypeScript
- Samchon Framework: https://github.com/samchon/framework
- Packer: https://github.com/betterwaysystems/packer
- Samchon UML: https://github.com/samchon/uml

## Supports
##### Containers
- [Linear containers](http://samchon.github.io/stl/api/interfaces/std.base.container.ilinearcontainer.html)
    - [Vector](http://samchon.github.io/stl/api/classes/std.vector.html)
    - [List](http://samchon.github.io/stl/api/classes/std.list.html)
    - [Deque](http://samchon.github.io/stl/api/classes/std.deque.html)
- [Tree-structured containers](http://samchon.github.io/stl/api/classes/std.base.tree.rbtree.html)
    - [TreeSet](http://samchon.github.io/stl/api/classes/std.treeset.html), [TreeMultiSet](http://samchon.github.io/stl/api/classes/std.treemultiset.html)
    - [TreeMap](http://samchon.github.io/stl/api/classes/std.treemap.html), [TreeMultiMap](http://samchon.github.io/stl/api/classes/std.treemultimap.html)
- [Hashed containers](http://samchon.github.io/stl/api/classes/std.base.hash.hashbuckets.html)
    - [HashSet](http://samchon.github.io/stl/api/classes/std.hashset.html), [HashMultiSet](http://samchon.github.io/stl/api/classes/std.hashmultiset.html)
    - [HashMap](http://samchon.github.io/stl/api/classes/std.hashmap.html), [HashMultiMap](http://samchon.github.io/stl/api/classes/std.hashmultimap.html)
- Etc.
    - [Queue](http://samchon.github.io/stl/api/classes/std.queue.html)
    - [Stack](http://samchon.github.io/stl/api/classes/std.stack.html)
    - [PriorityQueue](http://samchon.github.io/stl/api/classes/std.priorityqueue.html)

##### Functions
- [&lt;algorithm&gt;](http://www.cplusplus.com/reference/algorithm)
- [&lt;functional&gt;](http://www.cplusplus.com/reference/functional)
	- [std.bind](http://samchon.github.io/stl/api/modules/std.html#bind)

## Usage
#### Installation
``` command 
npm install -g typescript-stl
```
or download directly. (``typescript-stl.js`` and ``typescript-stl.d.ts`` in ``master/lib``)

#### Node.JS or Require.JS
###### In JavaScript
``` javascript
var std = require("typescript-stl");

var list = new std.List();
list.push_back("First element");
```

###### In TypeScript
``` typescript
///////////////////////////////
// A TRICKY METHOD
///////////////////////////////
/// <reference path="typescript-stl.t.ds" />
// declare var global: any;
// declare var require: any;
global["std"] = require("typescript-stl"); // IMPORT

// CODE
let list: std.List<string> = new std.List<string>();
list.push_back("First element");
```

#### Browser
``` javascript
<script src="typescript-stl.js"></script>
<script>
	var list = new std.List();
    list.push_back("First element");
</script>
```

## Example
###### std.HashMap
```typescript
function hash_map(): void
{
	/////////////////////////////////////
	// CONSTRUCT DATA FROM 1 TO 10
	/////////////////////////////////////
	let map: std.HashMap<number, string> = new std.HashMap<number, string>();
	for (let i: number = 0; i < 10; i++)
		map.set(i, "Its key is " + i);

	/////////////////////////////////////
	//  ELEMENT I/O
	/////////////////////////////////////
	// ERASE AN ELEMENT
	let it = map.find(3); // find 3.
	it = map.erase(it); // erase 3. [it] points key 4.
	console.log(it.first); // prints key 4.

	// INSERT AN ELEMENT
	it = map.begin().advance(2) // [it] points key 2 (0 ----> 2)
	it = map.insert(it, new std.Pair<number, string>(-1, "Its key is -1"));
	// [it] points key -1=
	// key list: [0, 1, -1, 2, 4, 5, 6, 7, 8, 9]
	console.log(it.next().first); // prints 2, next of [it] (-1 -> 2)

	// RANGE ERASER
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
```

###### std.TreeSet
``` typescript
function test_tree_set(): void
{
	let intSet: std.TreeMultiSet<number> = new std.TreeMultiSet<number>();

	// INSERTS EVEN NUMBERS
	for (let i = 0; i <= 10; i += 2)
		for (let j = 0; j < 3; j++)
			intSet.insert(i);

	// FIND 4 -> HAS
	console.log("Matched node: 4");
	console.log("	lower bound: " + intSet.lowerBound(4).value);
	console.log("	upper bound: " + intSet.upperBound(4).value);
	console.log(" ");

	// FIND ODD NUMBERS -> NOT EXIST
	for (let i = 1; i <= 10; i += 2)
	{
		console.log("Mis-matched node: " + i);
		console.log("	lower bound: " + intSet.lowerBound(i).value);
		console.log("	upper bound: " + intSet.upperBound(i).value);
		console.log(" ");
	}
}
```

###### std.count_if (in &lt;algorithm&gt;)
``` typescript
function test_count_if(): void
{
	let list: std.List<number> = new std.List();
	for (let i: number = 0; i < 100; i++)
		list.push_back(Math.random() * 100))

	let count: number = std.count_if(list.begin(), list.end(),
    	function (val: number): boolean
        {
        	return 50 <= val && val < 60;
        }
	);
    console.log("Number of elements between 50 and 60 are: #" + count);
}
```

###### std.sort with customized sorting function
``` typescript
function test_sort(): void
{
	let cubeList: std.List<Cube> = new std.List<Cube>();
	for (let i: number = 0; i < 10; i++)
		cubeList.pushBack(new Cube());

	///////////////////////////////
	// SORT BY Cube.less()
	///////////////////////////////
	std.sort(cubeList.begin(), cubeList.end());

	for (let it = cubeList.begin(); !it.equals(cubeList.end()); it = it.next())
		it.value.debug_size();

	console.log("------------------------------");

	///////////////////////////////
	// SORT BY inline function
	///////////////////////////////
	std.sort
    (
    	cubeList.begin(), cubeList.end(),
		function (left: Cube, right: Cube): boolean
		{
			if (left.x != right.x) return left.x < right.x;
			else if (left.y != right.y) return left.y < right.y;
			else return left.z < right.z;
		}
	);

	for (let it = cubeList.begin(); !it.equals(cubeList.end()); it = it.next())
		it.value.debug_position();
}

class Cube
{
	public width: number;
	public height: number;
	public length: number;
	public x: number;
	public y: number;
	public z: number;

	public constructor()
	{
		this.width = Math.random() * 10;
		this.height = Math.random() * 10;
		this.length = Math.random() * 10;
		this.x = Math.random() * 100 - 50;
		this.y = Math.random() * 100 - 50;
		this.z = Math.random() * 100 - 50;
	}
	public get volume(): number
	{
		return this.width * this.height * this.length;
	}

	public less(obj: Cube): boolean
	{
		return this.volume < obj.volume;
	}

	public debug_size(): void
	{
		console.log(this.width, this.height, this.length + " => " + this.volume);
	}
	public debug_position(): void
	{
		console.log(this.x, this.y, this.z);
	}
}
```

## License
##### BSD v3 License