# TypeScript Standard Template Library
![Make STL Great Again](https://user-images.githubusercontent.com/13158709/59512339-799c6300-8ef3-11e9-961c-64f32432646f.png)

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/samchon/tstl/blob/master/LICENSE)
[![npm version](https://badge.fury.io/js/tstl.svg)](https://www.npmjs.com/package/tstl)
[![Downloads](https://img.shields.io/npm/dm/tstl.svg)](https://www.npmjs.com/package/tstl)
[![Build Status](https://github.com/samchon/tstl/workflows/build/badge.svg)](https://github.com/samchon/tstl/actions?query=workflow%3Abuild)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fsamchon%2Ftstl.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fsamchon%2Ftstl?ref=badge_shield)
[![Chat on Gitter](https://badges.gitter.im/samchon/tstl.svg)](https://gitter.im/samchon/tstl?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Implementation of STL (Standard Template Library) in TypeScript.
  - Containers
  - Iterators
  - Algorithms
  - Functors

**TSTL** is an open-source project providing features of STL, migrated from *C++* to *TypeScript*. You can enjoy the STL's own specific *containers*, *algorithms* and *functors* in the JavaScript. If TypeScript, you also can take advantage of type restrictions and generic programming with the TypeScript.

Below components are list of provided objects in the **TSTL**. If you want to know more about the **TSTL**, then please read the [**Guide Documents**](https://github.com/samchon/tstl/wiki).




## Features
### Containers
  - **Linear Containers**
    - [Vector](http://tstl.dev/api/classes/std.vector.html)
    - [Deque](http://tstl.dev/api/classes/std.deque.html)
    - [List](http://tstl.dev/api/classes/std.list.html)
    - [ForwardList](http://tstl.dev/api/classes/std.forwardlist.html)
    - [VectorBoolean](http://tstl.dev/api/classes/std.vectorboolean.html)
  - **Associative Containers**
    - *Tree-structured Containers*
      - [TreeSet](http://tstl.dev/api/classes/std.treeset.html)
      - [TreeMultiSet](http://tstl.dev/api/classes/std.treemultiset.html)
      - [TreeMap](http://tstl.dev/api/classes/std.treemap.html)
      - [TreeMultiMap](http://tstl.dev/api/classes/std.treemultimap.html)
    - *Hash-buckets based Container*
      - [HashSet](http://tstl.dev/api/classes/std.hashset.html)
      - [HashMultiSet](http://tstl.dev/api/classes/std.hashmultiset.html)
      - [HashMap](http://tstl.dev/api/classes/std.hashmap.html)
      - [HashMultiMap](http://tstl.dev/api/classes/std.hashmultimap.html)
  - **Adaptor Containers**
    - *Linear Adaptors*
      - [Queue](http://tstl.dev/api/classes/std.queue.html)
      - [Stack](http://tstl.dev/api/classes/std.stack.html)
      - [PriorityQueue](http://tstl.dev/api/classes/std.priorityqueue.html)
    - Associative Adaptors
      - (experimental) [FlatSet](http://tstl.dev/api/classes/std_experimental.flatset.html)
      - (experimental) [FlatMultiSet](http://tstl.dev/api/classes/std_experimental.flatmultiset.html)
      - (experimental) [FlatMap](http://tstl.dev/api/classes/std_experimental.flatmap.html)
      - (experimental) [FlatMultiMap](http://tstl.dev/api/classes/std_experimental.flatmultimap.html)

### Algorithms
- [`<algorithm>`](http://www.cplusplus.com/reference/algorithm/)
    - [iterations](https://github.com/samchon/tstl/blob/master/src/algorithm/iterations.ts)
    - [modifiers](https://github.com/samchon/tstl/blob/master/src/algorithm/modifiers.ts)
    - [partitions](https://github.com/samchon/tstl/blob/master/src/algorithm/partitions.ts)
    - [sortings](https://github.com/samchon/tstl/blob/master/src/algorithm/sortings.ts)
    - [binary searches](https://github.com/samchon/tstl/blob/master/src/algorithm/binary_searches.ts)
    - [union sets](https://github.com/samchon/tstl/blob/master/src/algorithm/union_sets.ts)
    - [heaps](https://github.com/samchon/tstl/blob/master/src/algorithm/heaps.ts)
    - [mathematics](https://github.com/samchon/tstl/blob/master/src/algorithm/mathematics.ts)

### Functors
  - [`<exception>`](http://www.cplusplus.com/reference/exception/)
    - [Exception](http://tstl.dev/api/classes/std.exception.html)
      - [LogicError](http://tstl.dev/api/classes/std.logicerror.html)
      - [RuntimeError](http://tstl.dev/api/classes/std.runtimeerror.html)
  - [`<functional>`](http://www.cplusplus.com/reference/functional/)
    - [IComparable](http://tstl.dev/api/interfaces/std.icomparable.html)
    - [IPointer](https://tstl.dev/api/modules/std.ipointer.html)
  - [`<utility>`](http://www.cplusplus.com/reference/utility/)
    - [Pair](http://tstl.dev/api/classes/std.pair.html)
  - [`<numeric>`](http://en.cppreference.com/w/cpp/numeric)
    - [IComputable](https://github.com/samchon/tstl/blob/master/src/numeric/IComputable.ts)
    - [operations](https://github.com/samchon/tstl/blob/master/src/numeric/operations.ts)
    - [special math](http://en.cppreference.com/w/cpp/numeric/special_math)
  - [`<thread>`](https://github.com/samchon/tstl/blob/master/src/thread.ts)
    - [ConditionVariable](http://tstl.dev/api/classes/std.conditionvariable.html)
    - [Mutex](http://tstl.dev/api/classes/std.mutex.html) & [TimedMutex](http://tstl.dev/api/classes/std.timedmutex.html)
    - [SharedMutex](http://tstl.dev/api/classes/std.sharedmutex.html) & [SharedTimeMutex](http://tstl.dev/api/classes/std.sharedtimedmutex.html)
    - [Semaphore](http://tstl.dev/api/classes/std.semaphore.html)
    - [Latch](http://tstl.dev/api/classes/std.latch.html)
    - [Barrier](http://tstl.dev/api/classes/std.barrier.html)




## Installation
### NPM Module
Installing **TSTL** in *NodeJS* is very easy. Just install with the `npm`

```bash
# Install TSTL from the NPM module
npm install --save tstl
```

### Usage
``` typescript
import std from "tstl";

function main(): void
{
    const map: std.TreeMap<number, string> = new std.TreeMap();

    map.emplace(1, "First");
    map.emplace(4, "Fourth");
    map.emplace(5, "Fifth");
    map.set(9, "Nineth");

    for (let it = map.begin(); !it.equals(map.end()); it = it.next())
        console.log(it.first, it.second);

    const it: std.TreeMap.Iterator<number, string> = map.lower_bound(3);
    console.log(`lower bound of 3 is: ${x.first}, ${x.second}`);
}
main();
```




## Appendix
  - **Repositories**
    - [GitHub Repository](https://github.com/samchon/tstl)
    - [NPM Repository](https://www.npmjs.com/package/tstl)
  - **Documents**
    - [**Guide Documents**](https://github.com/samchon/tstl/wiki)
    - [API Documents](http://tstl.dev/api)
    - [Release Notes](https://github.com/samchon/tstl/releases)
  - **Extensions**
    - [ASTL](https://github.com/samchon/astl) - C++ STL for AssemblyScript
    - [ECol](https://github.com/samchon/ecol) - Collections dispatching events
    - [**TGrid**](https://github.com/samchon/tgrid) - Network & Thread extension
    - [Mutex-Server](https://github.com/samchon/mutex-server) - Critical sections in the network level