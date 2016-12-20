# <u>T</u>ypeScript-<u>STL</u>

[![NPM](https://nodei.co/npm/tstl.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/tstl)

GitHub Repository: https://github.com/samchon/tstl

## Introduction
**STL** (Standard Template Library) Containers and Algorithms for **TypeScript**.

**T**ypeScript-**STL** is an open-source JavaScript library providing containers and algorithms migrated from C++ STL. You can enjoy STL containers and algorithms in JavaScript. If TypeScript, you will be much happier feeling like using originla STL with type restriction and template programming.

![Abstract Containers](http://samchon.github.io/tstl/images/design/class_diagram/abstract_containers.png)

##### Containers
  - [**Linear containers**](http://samchon.github.io/tstl/api/interfaces/std.base.container.ilinearcontainer.html)
    - [Vector](http://samchon.github.io/tstl/api/classes/std.vector.html)
    - [List](http://samchon.github.io/tstl/api/classes/std.list.html)
    - [Deque](http://samchon.github.io/tstl/api/classes/std.deque.html)
  - **Associative Containers**
    - [**Tree-structured Containers**](http://samchon.github.io/tstl/api/classes/std.base.tree.rbtree.html)
      - [TreeSet](http://samchon.github.io/tstl/api/classes/std.treeset.html)
      - [TreeMap](http://samchon.github.io/tstl/api/classes/std.treemap.html)
      - [TreeMultiSet](http://samchon.github.io/tstl/api/classes/std.treemultiset.html)
      - [TreeMultiMap](http://samchon.github.io/tstl/api/classes/std.treemultimap.html)
    - [**Hashed Containers**](http://samchon.github.io/tstl/api/classes/std.base.hash.hashbuckets.html)
      - [HashSet](http://samchon.github.io/tstl/api/classes/std.hashset.html)
      - [HashMap](http://samchon.github.io/tstl/api/classes/std.hashmap.html)
      - [HashMultiSet](http://samchon.github.io/tstl/api/classes/std.hashmultiset.html)
      - [HashMultiMap](http://samchon.github.io/tstl/api/classes/std.hashmultimap.html)
  - **Adaptor Containers**
    - [Queue](http://samchon.github.io/tstl/api/classes/std.queue.html)
    - [Stack](http://samchon.github.io/tstl/api/classes/std.stack.html)
    - [PriorityQueue](http://samchon.github.io/tstl/api/classes/std.priorityqueue.html)

##### Global Functions
  - [&lt;algorithm&gt;](http://www.cplusplus.com/reference/algorithm)
  - [&lt;exception&gt;](http://www.cplusplus.com/reference/exception)
  - [&lt;functional&gt;](http://www.cplusplus.com/reference/functional)
    - [std.bind](http://samchon.github.io/tstl/api/modules/std.html#bind)
  - [&lt;utility&gt;](http://www.cplusplus.com/reference/utility)
    - [std.Pair](http://samchon.github.io/tstl/api/classes/std.pair.html)



## References
You can learn and explore about TSTL more deeply with such below:

  - [Guidebook (wiki)](https://github.com/samchon/tstl/wiki)
  - [API Documents](http://samchon.github.io/tstl/api)
  - [Class Diagram](http://samchon.github.io/tstl/design/class_diagram.pdf)



## Installation
Installing *TSTL* in **node** is very easy. Just install with **npm** and **tsd**.

#### Node
``` bash
# Install TSTL from NPM modules
npm install --save tstl 

# If you need only header, then fetch from the @types
npm install --save @types/tstl
```

#### TypeScript
``` typescript
/// <reference types="tstl" />

import std = require("tstl");
let map: std.TreeMap<string, number> = new std.TreeMap<string, number>();

map.insert(std.make_pair("First", 1));
map.insert(["Second", 2]);
map.insert_or_assign("Third", 3); // C++17 Feature.
map.set("Fourth", 4); // Non-standard Feature.

for (let it = map.begin(); !it.equals(map.end()); it = it.next())
	console.log(it.first, it.second); // key => string, value => number
```

#### Browser
*TSTL* follows *CommonJS* module. 

Use [browserify](https://www.npmjs.com/package/browserify) or just include *TSTL*'s *js file* with ```<script>``` tag.

###### In HTML Document
``` javascript
<script src="tstl.js"></script>
```



## Index of Guidance, Wiki.

  - [**Outline**](https://github.com/samchon/tstl/wiki/Home)
    - [Introduction](https://github.com/samchon/tstl/wiki/Home#introduction)
    - [References](https://github.com/samchon/tstl/wiki/Home#references)
    - [Installation](https://github.com/samchon/tstl/wiki/Home#installation)
  - [**Differences between C++**](https://github.com/samchon/tstl/wiki/Differences)
    - [Naming Convention](https://github.com/samchon/tstl/wiki/Differences#naming-convention)
    - [Operator Overriding](https://github.com/samchon/tstl/wiki/Differences#operator-overriding)
    - [Iterator](https://github.com/samchon/tstl/wiki/Differences#iterator)
    - [Tree Container](https://github.com/samchon/tstl/wiki/Differences#tree-container)
    - [Hash Container](https://github.com/samchon/tstl/wiki/Differences#hash-container)
  - [**Tutorial**](https://github.com/samchon/tstl/wiki/Tutorial)
    - [Linear Container](https://github.com/samchon/tstl/wiki/Tutorial#linear-container)
    - [Tree Container](https://github.com/samchon/tstl/wiki/Tutorial#tree-container)
    - [Hash Container](https://github.com/samchon/tstl/wiki/Tutorial#hash-container)
    - [Miscellaneous](https://github.com/samchon/tstl/wiki/Tutorial-Miscellaneous)
      - [Algorithm](https://github.com/samchon/tstl/wiki/Tutorial-Miscellaneous#algorithm)
      - [Functional](https://github.com/samchon/tstl/wiki/Tutorial-Miscellaneous#functional)
