# TypeScript-STL

[![NPM](https://nodei.co/npm/typescript-stl.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/typescript-stl)

GitHub Repository: https://github.com/samchon/stl

## Introduction
STL (Standard Template Library) Containers and Algorithms for TypeScript

TypeScript-STL is a TypeScript's **Standard Template Library** who is migrated from C++ STL. Most of classes and functions of STL have implemented. Just enjoy it.

![Abstract Containers](http://samchon.github.io/stl/api/assets/images/design/abstract_containers.png)

##### Containers
  - [Linear containers](http://samchon.github.io/stl/api/interfaces/std.base.container.ilinearcontainer.html)
    - [Vector](http://samchon.github.io/stl/api/classes/std.vector.html)
    - [List](http://samchon.github.io/stl/api/classes/std.list.html)
    - [Deque](http://samchon.github.io/stl/api/classes/std.deque.html)
    - Miscellaneous
      - [Queue](http://samchon.github.io/stl/api/classes/std.queue.html)
      - [Stack](http://samchon.github.io/stl/api/classes/std.stack.html)
      - [PriorityQueue](http://samchon.github.io/stl/api/classes/std.priorityqueue.html)
  - [Tree-structured Containers](http://samchon.github.io/stl/api/classes/std.base.tree.rbtree.html)
    - [TreeSet](http://samchon.github.io/stl/api/classes/std.treeset.html), [TreeMultiSet](http://samchon.github.io/stl/api/classes/std.treemultiset.html)
    - [TreeMap](http://samchon.github.io/stl/api/classes/std.treemap.html), [TreeMultiMap](http://samchon.github.io/stl/api/classes/std.treemultimap.html)
  - [Hashed Containers](http://samchon.github.io/stl/api/classes/std.base.hash.hashbuckets.html)
    - [HashSet](http://samchon.github.io/stl/api/classes/std.hashset.html), [HashMultiSet](http://samchon.github.io/stl/api/classes/std.hashmultiset.html)
    - [HashMap](http://samchon.github.io/stl/api/classes/std.hashmap.html), [HashMultiMap](http://samchon.github.io/stl/api/classes/std.hashmultimap.html)

##### Global Functions
  - [&lt;algorithm&gt;](http://www.cplusplus.com/reference/algorithm)
  - [&lt;exception&gt;](http://www.cplusplus.com/reference/exception)
  - [&lt;functional&gt;](http://www.cplusplus.com/reference/functional)
    - [std.bind](http://samchon.github.io/stl/api/modules/std.html#bind)
  - [&lt;utility&gt;](http://www.cplusplus.com/reference/utility)
    - [std.Pair](http://samchon.github.io/stl/api/classes/std.pair.html) 



## References
You can learn and explore about TypeScript-STL more deeply with such below:

  - [Guidebook (wiki)](https://github.com/samchon/stl/wiki)
  - [API Documents](http://samchon.github.io/stl/api)
  - [Class Diagram](https://samchon.github.io/stl/design/class_diagram.pdf)



## Installation
#### Node
``` npm install -g typescript-stl ```

###### TypeScript
``` typescript
// SOMEWHERE PLACE NODE AND STL HEADERS EXIST
/// <reference path="node.d.ts" />
/// <reference path="typescript-stl.d.ts" />

global["std"] = require("typescript-stl");
let list: std.List<string> = new std.List<string>();
```

###### Pure JavaScript
``` javascript
var std = require("typescript-stl");
var list = new std.List();
```

#### Browser
###### In HTML Document
``` html
<script src="typescript-stl.js"></script>
```

###### TypeScript, reference definitions (header)
``` typescript
/// <reference path="typescript-stl.d.ts" />
```



## Index of Guidance, Wiki.

  - [**Outline**](https://github.com/samchon/stl/wiki/Home)
    - [Introduction](https://github.com/samchon/stl/wiki/Home#introduction)
    - [References](https://github.com/samchon/stl/wiki/Home#references)
    - [Installation](https://github.com/samchon/stl/wiki/Home#installation)
  - [**Differences between C++**](https://github.com/samchon/stl/wiki/Differences)
    - [Naming Convention](https://github.com/samchon/stl/wiki/Differences#naming-convention)
    - [Operator Overriding](https://github.com/samchon/stl/wiki/Differences#operator-overriding)
    - [Iterator](https://github.com/samchon/stl/wiki/Differences#iterator)
    - [Tree Container](https://github.com/samchon/stl/wiki/Differences#tree-container)
    - [Hash Container](https://github.com/samchon/stl/wiki/Differences#hash-container)
  - [**Tutorial**](https://github.com/samchon/stl/wiki/Tutorial)
    - [Linear Container](https://github.com/samchon/stl/wiki/Tutorial#linear-container)
    - [Tree Container](https://github.com/samchon/stl/wiki/Tutorial#tree-container)
    - [Hash Container](https://github.com/samchon/stl/wiki/Tutorial#hash-container)
    - [Miscellaneous](https://github.com/samchon/stl/wiki/Tutorial-Miscellaneous)
      - [Algorithm](https://github.com/samchon/stl/wiki/Tutorial-Miscellaneous#algorithm)
      - [Functional](https://github.com/samchon/stl/wiki/Tutorial-Miscellaneous#functional)