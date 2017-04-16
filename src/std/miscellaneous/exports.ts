/// <reference path="../container.ts" />
/// <reference path="../iterator.ts" />

/// <reference path="../algorithm.ts" />
/// <reference path="../exception.ts" />
/// <reference path="../functional.ts" />
/// <reference path="../utility.ts" />

namespace std
{
	/* =========================================================
		CONTAINER SHORTCUTS
			- LINEAR CONTAINERS
			- ASSOCIATIVE CONTAINERS
			- SET CONTAINERS
			- MAP CONTAINERS
			- EXCEPTIONS
	============================================================
		LINEAR CONTAINERS
	--------------------------------------------------------- */
	/**
	 * Type definition of {@link Vector} and it's the original name used in C++.
	 */
	export import vector = Vector;
	
	/**
	 * Type definition of {@link List} and it's the original name used in C++.
	 */
	export import list = List;
	
	/**
	 * Type definition of {@link Deque} and it's the original name used in C++.
	 */
	export import deque = Deque;

	/* ---------------------------------------------------------
		ASSOCIATIVE CONTAINERS
	--------------------------------------------------------- */
	/**
	 * Type definition of {@link Stack} and it's the original name used in C++.
	 */
	export type stack<T> = Stack<T>;

	/**
	 * Type definition of {@link Queue} and it's the original name used in C++.
	 */
	export type queue<T> = Queue<T>;

	/**
	 * Type definition of {@link PriorityQueue} and it's the original name used in C++.
	 */
	export type priority_queue<T> = PriorityQueue<T>;

	export var stack = Stack;
	export var queue = Queue;
	export var priority_queue = PriorityQueue;

	/* ---------------------------------------------------------
		SET CONTAINERS
	--------------------------------------------------------- */
	/**
	 * Type definition of {@link TreeSet} and it's the original name used in C++.
	 */
	export import set = TreeSet;
	
	/**
	 * Type definition of {@link TreeMultiSet} and it's the original name used in C++.
	 */
	export import multiset = TreeMultiSet;

	/**
	 * Type definition of {@link HashSet} and it's the original name used in C++.
	 */
	export import unordered_set = HashSet;

	/**
	 * Type definition of {@link HashMultiSet} and it's the original name used in C++.
	 */
	export import unordered_multiset = HashMultiSet;

	/* ---------------------------------------------------------
		MAP CONTAINERS
	--------------------------------------------------------- */
	/**
	 * Type definition of {@link TreeMap} and it's the original name used in C++.
	 */
	export import map = TreeMap;

	/**
	 * Type definition of {@link TreeMultiMap} and it's the original name used in C++.
	 */
	export import multimap = TreeMultiMap;

	/**
	 * Type definition of {@link HashMap} and it's the original name used in C++.
	 */
	export import unordered_map = HashMap;

	/**
	 * Type definition of {@link HashMultiMap} and it's the original name used in C++.
	 */
	export import unordered_multimap = HashMultiMap;

	/* ---------------------------------------------------------
		EXCEPTIONS
	--------------------------------------------------------- */
	export type exception = Exception;
		export type logic_error = LogicError;
			export type domain_error = DomainError;
			export type invalid_argument = InvalidArgument;
			export type length_error = LengthError;
			export type out_of_range = OutOfRange;
		export type runtime_error = RuntimeError;
			export type overflow_error = OverflowError;
			export type underflow_error = UnderflowError;
			export type range_error = RangeError;
			export type system_error = SystemError;
				export type error_category = ErrorCategory;
				export type error_condition = ErrorCondition;
				export type error_code = ErrorCode;
		
	export var exception = Exception;
		export var logic_error = LogicError;
			export var domain_error = DomainError;
			export var invalid_argument = InvalidArgument;
			export var length_error = LengthError;
			export var out_of_range = OutOfRange;
		export var runtime_error = RuntimeError;
			export var overflow_error = OverflowError;
			export var underflow_error = UnderflowError;
			export var range_error = RangeError;
			export var system_error = SystemError;
				export var error_category = ErrorCategory;
				export var error_condition = ErrorCondition;
				export var error_code = ErrorCode;
}

try
{
	module.exports = std;
} catch (exception) {}