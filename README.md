# **T**ypeScript **S**tandard **T**emplate **L**ibrary
[![Build Status](https://travis-ci.org/samchon/tstl.svg?branch=master)](https://travis-ci.org/samchon/tstl)
[![npm version](https://badge.fury.io/js/tstl.svg)](https://www.npmjs.com/package/tstl)
[![Downloads](https://img.shields.io/npm/dm/tstl.svg)](https://www.npmjs.com/package/tstl)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fsamchon%2Ftstl.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fsamchon%2Ftstl?ref=badge_shield)
[![DeepScan grade](https://deepscan.io/api/teams/1932/projects/1798/branches/7792/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=1932&pid=1798&bid=7792)
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
    - [Vector `vector`](http://samchon.github.io/tstl/api/classes/std.vector.html)
    - [Deque `deque`](http://samchon.github.io/tstl/api/classes/std.deque.html)
    - [List `list`](http://samchon.github.io/tstl/api/classes/std.list.html)
    - [ForwardList `forward_list`](http://samchon.github.io/tstl/api/classes/std.forwardlist.html)
    - [VectorBoolean `vector_bool`](http://samchon.github.io/tstl/api/classes/std.vectorboolean.html)
  - **Associative Containers**
    - *Tree-structured Containers*
      - [TreeSet `set`](http://samchon.github.io/tstl/api/classes/std.treeset.html)
      - [TreeMultiSet `multiset`](http://samchon.github.io/tstl/api/classes/std.treemultiset.html)
      - [TreeMap `map`](http://samchon.github.io/tstl/api/classes/std.treemap.html)
      - [TreeMultiMap `multimap`](http://samchon.github.io/tstl/api/classes/std.treemultimap.html)
    - *Hash-buckets based Container*
      - [HashSet `unordered_set`](http://samchon.github.io/tstl/api/classes/std.hashset.html)
      - [HashMultiSet `unordered_multiset`](http://samchon.github.io/tstl/api/classes/std.hashmultiset.html)
      - [HashMap `unordered_map`](http://samchon.github.io/tstl/api/classes/std.hashmap.html)
      - [HashMultiMap `unordered_multimap`](http://samchon.github.io/tstl/api/classes/std.hashmultimap.html)
  - **Adaptor Containers**
    - [Queue `queue`](http://samchon.github.io/tstl/api/classes/std.queue.html)
    - [Stack `stack`](http://samchon.github.io/tstl/api/classes/std.stack.html)
    - [PriorityQueue `priority_queue`](http://samchon.github.io/tstl/api/classes/std.priorityqueue.html)

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
    - [Exception `exception`](http://samchon.github.io/tstl/api/classes/std.exception.html)
      - [LogicError `logic_error`](http://samchon.github.io/tstl/api/classes/std.logicerror.html)
      - [RuntimeError `runtime_error`](http://samchon.github.io/tstl/api/classes/std.runtimeerror.html)
  - [`<functional>`](http://www.cplusplus.com/reference/functional/)
    - [IComparable](http://samchon.github.io/tstl/api/interfaces/std.icomparable.html)
  - [`<utility>`](http://www.cplusplus.com/reference/utility/)
    - [Pair `pair`](http://samchon.github.io/tstl/api/classes/std.pair.html)
    - [Entry `entry`](http://samchon.github.io/tstl/api/classes/std.entry.html)
  - [`<numeric>`](http://en.cppreference.com/w/cpp/numeric)
    - [IComputable](https://github.com/samchon/tstl/blob/master/src/numeric/IComputable.ts)
    - [operations](https://github.com/samchon/tstl/blob/master/src/numeric/operations.ts)
    - [special math](http://en.cppreference.com/w/cpp/numeric/special_math)
  - [`<thread>`](https://github.com/samchon/tstl/blob/master/src/thread.ts)
    - [ConditionVariable `condition_variable`](http://samchon.github.io/tstl/api/classes/std.conditionvariable.html)
    - [Mutex `mutex`](http://samchon.github.io/tstl/api/classes/std.mutex.html) & [TimedMutex `timed_mutex`](http://samchon.github.io/tstl/api/classes/std.timedmutex.html)
    - [SharedMutex `shared_mutex`](http://samchon.github.io/tstl/api/classes/std.sharedmutex.html) & [SharedTimeMutex `shared_timed_mutex`](http://samchon.github.io/tstl/api/classes/std.sharedtimedmutex.html)
    - (experimental) [Semaphore `semaphore`](http://samchon.github.io/tstl/api/classes/std_experimental.semaphore.html) & [TimedSemaphore `timed_semaphore`](http://samchon.github.io/tstl/api/classes/std_experimental.timedsemaphore.html)
    - (experimental) [Latch `latch`](http://samchon.github.io/tstl/api/classes/std_experimental.latch.html) & [Barrier `barrier`](http://samchon.github.io/tstl/api/classes/std_experimental.barrier.html)




## Installation
### NPM Module
Installing **TSTL** in *NodeJS* is very easy. Just install with the `npm`

```bash
# Install TSTL from the NPM module
npm install --save tstl
```

### Usage
``` typescript
import std = require("tstl");

function main(): void
{
    let map: std.TreeMap<number, string> = new std.TreeMap();

    // INSERT ITEMS
    map.insert(std.make_pair(1, "First")); // Via tuple
    map.emplace(4, "Fourth"); // C++11 Feature
    map.insert_or_assign(5, "Fifth"); // C++17 Feature
    map.set(9, "Nineth"); // Instead of the operetor[](Key)

    // ITERATION
    for (let it = map.begin(); !it.equals(map.end()); it = it.next())
        console.log(it.first, it.second); // (key => number, value => string)

    // LOWER_BOUND
    let x = map.lower_bound(3);
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
    - [API Documents](http://samchon.github.io/tstl/api)
    - [Release Notes](https://github.com/samchon/tstl/releases)
  - **Extensions**
    - [ECol](https://github.com/samchon/ecol) - Collections dispatching events
    - [**TGrid**](https://github.com/samchon/tgrid) - Network & Thread extension
