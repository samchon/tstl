# TypeScript-STL

[![NPM](https://nodei.co/npm/typescript-stl.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/typescript-stl)

GitHub Repository: https://github.com/samchon/typescript-stl

## Introduction
STL (Standard Template Library) Containers and Algorithms for TypeScript

TypeScript-STL is an open-source JavaScript library providing containers and algorithms migrated from C++ STL. You can enjoy STL containers and algorithms in JavaScript. If TypeScript, you will be much happier feeling like using originla STL with type restriction and template programming.

![Abstract Containers](http://samchon.github.io/typescript-stl/images/design/class_diagram/abstract_containers.png)

##### Containers
  - [**Linear containers**](http://samchon.github.io/typescript-stl/api/interfaces/std.base.container.ilinearcontainer.html)
    - [Vector](http://samchon.github.io/typescript-stl/api/classes/std.vector.html)
    - [List](http://samchon.github.io/typescript-stl/api/classes/std.list.html)
    - [Deque](http://samchon.github.io/typescript-stl/api/classes/std.deque.html)
  - **Associative Containers**
    - [**Tree-structured Containers**](http://samchon.github.io/typescript-stl/api/classes/std.base.tree.rbtree.html)
      - [TreeSet](http://samchon.github.io/typescript-stl/api/classes/std.treeset.html)
      - [TreeMap](http://samchon.github.io/typescript-stl/api/classes/std.treemap.html)
      - [TreeMultiSet](http://samchon.github.io/typescript-stl/api/classes/std.treemultiset.html)
      - [TreeMultiMap](http://samchon.github.io/typescript-stl/api/classes/std.treemultimap.html)
    - [**Hashed Containers**](http://samchon.github.io/typescript-stl/api/classes/std.base.hash.hashbuckets.html)
      - [HashSet](http://samchon.github.io/typescript-stl/api/classes/std.hashset.html)
      - [HashMap](http://samchon.github.io/typescript-stl/api/classes/std.hashmap.html)
      - [HashMultiSet](http://samchon.github.io/typescript-stl/api/classes/std.hashmultiset.html)
      - [HashMultiMap](http://samchon.github.io/typescript-stl/api/classes/std.hashmultimap.html)
  - **Adaptor Containers**
    - [Queue](http://samchon.github.io/typescript-stl/api/classes/std.queue.html)
    - [Stack](http://samchon.github.io/typescript-stl/api/classes/std.stack.html)
    - [PriorityQueue](http://samchon.github.io/typescript-stl/api/classes/std.priorityqueue.html)

##### Global Functions
  - [&lt;algorithm&gt;](http://www.cplusplus.com/reference/algorithm)
  - [&lt;exception&gt;](http://www.cplusplus.com/reference/exception)
  - [&lt;functional&gt;](http://www.cplusplus.com/reference/functional)
    - [std.bind](http://samchon.github.io/typescript-stl/api/modules/std.html#bind)
  - [&lt;utility&gt;](http://www.cplusplus.com/reference/utility)
    - [std.Pair](http://samchon.github.io/typescript-stl/api/classes/std.pair.html)



## References
You can learn and explore about TypeScript-STL more deeply with such below:

  - [Guidebook (wiki)](https://github.com/samchon/typescript-stl/wiki)
  - [API Documents](http://samchon.github.io/typescript-stl/api)
  - [Class Diagram](https://samchon.github.io/typescript-stl/design/class_diagram.pdf)



## Installation
Installing *TypeScript-STL* in **node** is very easy. Just install with **npm** and **tsd**.

#### Node
``` bash
# Install TypeScript-STL from NPM modules
npm install -g typescript-stl 

# Fetch definition (header) file from TSD
# If TSD is not installed, then type "npm install -g tsd"
tsd install typescript-stl
```

#### TypeScript
Don't forget to referencing header files, ```typescript-stl.d.ts```.

``` typescript
/// <reference path="typings/typescript-stl/typescript-stl.d.ts" />

import std = require("typescript-stl");
let map: std.TreeMap<string, number> = new std.TreeMap<string, number>();

map.insert(std.make_pair("First", 1));
map.insert(["Second", 2]);
map.insert_or_assign("Third", 3); // C++17 Feature.
map.set("Fourth", 4); // Non-standard Feature.

for (let it = map.begin(); !it.equal_to(map.end()); it = it.next())
	console.log(it.first, it.second); // key => string, value => number
```

#### Browser
*TypeScript-STL* follows *CommonJS* module. You can't use ```require``` statement of *RequireJS*, which is following *AMD* module. Just include *TypeScript-STL*'s *js file* with ```<script>``` tag.

###### In HTML Document
``` javascript
<script src="typescript-stl.js"></script>
```



## Index of Guidance, Wiki.

  - [**Outline**](https://github.com/samchon/typescript-stl/wiki/Home)
    - [Introduction](https://github.com/samchon/typescript-stl/wiki/Home#introduction)
    - [References](https://github.com/samchon/typescript-stl/wiki/Home#references)
    - [Installation](https://github.com/samchon/typescript-stl/wiki/Home#installation)
  - [**Differences between C++**](https://github.com/samchon/typescript-stl/wiki/Differences)
    - [Naming Convention](https://github.com/samchon/typescript-stl/wiki/Differences#naming-convention)
    - [Operator Overriding](https://github.com/samchon/typescript-stl/wiki/Differences#operator-overriding)
    - [Iterator](https://github.com/samchon/typescript-stl/wiki/Differences#iterator)
    - [Tree Container](https://github.com/samchon/typescript-stl/wiki/Differences#tree-container)
    - [Hash Container](https://github.com/samchon/typescript-stl/wiki/Differences#hash-container)
  - [**Tutorial**](https://github.com/samchon/typescript-stl/wiki/Tutorial)
    - [Linear Container](https://github.com/samchon/typescript-stl/wiki/Tutorial#linear-container)
    - [Tree Container](https://github.com/samchon/typescript-stl/wiki/Tutorial#tree-container)
    - [Hash Container](https://github.com/samchon/typescript-stl/wiki/Tutorial#hash-container)
    - [Miscellaneous](https://github.com/samchon/typescript-stl/wiki/Tutorial-Miscellaneous)
      - [Algorithm](https://github.com/samchon/typescript-stl/wiki/Tutorial-Miscellaneous#algorithm)
      - [Functional](https://github.com/samchon/typescript-stl/wiki/Tutorial-Miscellaneous#functional)