/// <reference path="../../std/Vector.ts" />
/// <reference path="../../std/Deque.ts" />
/// <reference path="../../std/List.ts" />
/// <reference path="../../std/Queue.ts" />
/// <reference path="../../std/Stack.ts" />
/// <reference path="../../std/HashSet.ts" />
/// <reference path="../../std/HashMap.ts" />
/// <reference path="../../std/TreeSet.ts" />
/// <reference path="../../std/TreeMap.ts" />

/// <reference path="../../std/Algorithm.ts" />
/// <reference path="../../std/Functional.ts" />
/// <reference path="../../std/Iterator.ts" />
/// <reference path="../../std/Exception.ts" />
/// <reference path="../../std/SystemError.ts" />
/// <reference path="../../std/Utility.ts" />

/// <reference path="../../std/example/test_all.ts" />

/**
 * @hidden
 */
declare var exports: any;

/**
 * @hidden
 */
declare var process: any;

if (typeof (exports) != "undefined")
	for (let key in std)
		exports[key] = std[key];