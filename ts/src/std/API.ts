/**
 * <h1> TypeScript-STL </h1>
 * <p> <a href="https://nodei.co/npm/typescript-stl">
 *	<img src="https://nodei.co/npm/typescript-stl.png?downloads=true&downloadRank=true&stars=true"> </a> </p>
 * 
 * <p> GitHub Repository: https://github.com/samchon/typescript-stl </p>
 * 
 * <p> STL (Standard Template Library) Containers and Algorithms for TypeScript. </p>
 * 
 * <p> TypeScript-STL is a TypeScript's <b>Standard Template Library</b> who is migrated from C++ STL. Most of classes
 * and functions of STL have implemented. Just enjoy it. </p>
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
namespace std
{
	// LINEAR CONTAINERS
	export type vector<T> = Vector<T>;								export var vector = Vector;
	export type list<T> = List<T>;									export var list = List;
	export type deque<T> = Deque<T>;								export var deque = Deque;

	// ASSOCIATIVE CONTAINERS
	export type stack<T> = Stack<T>;								export var stack = Stack;
	export type queue<T> = Queue<T>;								export var queue = Queue;
	export type priority_queue<T> = PriorityQueue<T>;				export var priority_queue = PriorityQueue;

	// SET CONTAINERS
	export type set<T> = TreeSet<T>;								export var set = TreeSet;
	export type multiset<T> = TreeMultiSet<T>;						export var multiset = TreeMultiSet;
	export type unordered_set<T> = HashSet<T>;						export var unordered_set = HashSet;
	export type unordered_multiset<T> = HashMultiSet<T>;			export var unordered_multiset = HashMultiSet;

	// MAP CONTAINERS
	export type map<Key, T> = TreeMap<Key, T>;						export var map = TreeMap;
	export type multimap<Key, T> = TreeMultiMap<Key, T>;			export var multimap = TreeMultiMap;
	export type unordered_map<Key, T> = HashMap<Key, T>;			export var unordered_map = HashMap;
	export type unordered_multimap<Key, T> = HashMultiMap<Key, T>;	export var unordered_multimap = HashMultiMap;
}


/**
 * Base classes composing STL in background.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
namespace std.base
{
}

/**
 * Examples for supporting developers who use STL library.
 *
 * @author Jeongho Nam <http://samchon.org>
 */
namespace std.example
{
}