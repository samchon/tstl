# TypeScript-STL

[![NPM](https://nodei.co/npm/typescript-stl.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/typescript-stl)

GitHub Repository: https://github.com/samchon/typescript-stl

## Introduction
STL (Standard Template Library) Containers and Algorithms for TypeScript

TypeScript-STL is an open-source JavaScript library providing containers and algorithms migrated from C++ STL. You can enjoy STL containers and algorithms in JavaScript. If TypeScript, you will be much happier feeling like using originla STL with type restriction and template programming.

![Abstract Containers](http://samchon.github.io/typescript-stl/api/assets/images/design/abstract_containers.png)

##### Containers
  - [**Linear containers**](http://samchon.github.io/typescript-stl/api/interfaces/std.base.container.ilinearcontainer.html)
    - [Vector](http://samchon.github.io/typescript-stl/api/classes/std.vector.html)
    - [List](http://samchon.github.io/typescript-stl/api/classes/std.list.html)
    - [Deque](http://samchon.github.io/typescript-stl/api/classes/std.deque.html)
    - Miscellaneous
      
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
  - [Class Diagram](https://samchon.github.io/stl/design/class_diagram.pdf)



## Installation
Installing *TypeScript-STL* in **node** is very easy. Just install with **npm**.

#### Node
``` npm install -g typescript-stl ```

###### TypeScript
Don't forget to referencing header files, ```typescript-stl.d.ts``` and ```node.d.ts```

``` typescript
/// <reference path="node.d.ts" />
/// <reference path="typescript-stl.d.ts" />

import std = require("typescript-stl");
let list: std.List<string> = new std.List<string>();
```

###### Pure JavaScript
If you want to use *TypeScript-STL* in pure JavaScript, importing is much easier.

However, it is not recommended because without TypeScript, you can't take advantage of enforcement of using type and template inspection. Note that, full name of **STL** is *Standard **Template** Library*.

``` javascript
var std = require("typescript-stl");
var list = new std.List();
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