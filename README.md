STL for TypeScript
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

## Programming
##### Containers
- [Linear containers](http://samchon.github.io/stl/api/interfaces/std.base.container.ilinearcontainer.html)
    - [Vector](http://samchon.github.io/stl/api/classes/std.vector.html)
    - [List](http://samchon.github.io/stl/api/classes/std.list.html)
    - [Deque](http://samchon.github.io/stl/api/classes/std.deque.html)
- [Tree-structured containers](http://samchon.github.io/stl/api/classes/std.base.tree.rbtree.html)
    - [TreeSet](http://samchon.github.io/stl/api/classes/std.treeset.html)
    - [TreeMap](http://samchon.github.io/stl/api/classes/std.treemap.html)
    - [TreeMultiSet](http://samchon.github.io/stl/api/classes/std.treemultiset.html)
    - [TreeMultiMap](http://samchon.github.io/stl/api/classes/std.treemultimap.html)
- [Hashed containers](http://samchon.github.io/stl/api/classes/std.base.hash.hashbuckets.html)
    - [HashSet](http://samchon.github.io/stl/api/classes/std.hashset.html)
    - [HashMap](http://samchon.github.io/stl/api/classes/std.hashmap.html)
    - [HashMultiSet](http://samchon.github.io/stl/api/classes/std.hashmultiset.html)
    - [HashMultiMap](http://samchon.github.io/stl/api/classes/std.hashmultimap.html)
- Etc.
    - [Queue](http://samchon.github.io/stl/api/classes/std.queue.html)
    - [Stack](http://samchon.github.io/stl/api/classes/std.stack.html)

##### Usage
```typescript
namespace std.test
{
	export function hash_map(): void
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
}
```

``` typescript
namespace std.test
{
	export function sorting(): void
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
		std.sort(cubeList.begin(), cubeList.end(),
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
}
```

``` typescript
namespace std.test
{
	export function tree_set(): void
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
}
```

## License
##### BSD v3 License
Copyright (c) 2016, Jeongho Nam
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of stl nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
