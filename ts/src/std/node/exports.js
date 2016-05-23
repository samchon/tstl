/// <reference path="../Vector.ts" />
/// <reference path="../Deque.ts" />
/// <reference path="../List.ts" />
/// <reference path="../Queue.ts" />
/// <reference path="../Stack.ts" />
/// <reference path="../HashSet.ts" />
/// <reference path="../HashMap.ts" />
/// <reference path="../TreeSet.ts" />
/// <reference path="../TreeMap.ts" />

/// <reference path="../Algorithm.ts" />
/// <reference path="../Functional.ts" />
/// <reference path="../Iterator.ts" />
/// <reference path="../Exception.ts" />
/// <reference path="../SystemError.ts" />
/// <reference path="../Utility.ts" />

/// <reference path="../example/test_all.ts" />

if (typeof (exports) != "undefined")
	for (let key in std)
		exports[key] = std[key];