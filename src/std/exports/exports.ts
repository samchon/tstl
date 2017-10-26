/// <reference path="../container.ts" />
/// <reference path="../iterator.ts" />

/// <reference path="../algorithm.ts" />
/// <reference path="../exception.ts" />
/// <reference path="../functional.ts" />
/// <reference path="../utility.ts" />
/// <reference path="../thread.ts" />

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
	export import vector = Vector;

	export import deque = Deque;
	
	export import list = List;
	
	export import forward_list = ForwardList;

	/* ---------------------------------------------------------
		ASSOCIATIVE CONTAINERS
	--------------------------------------------------------- */
	export type stack<T> = Stack<T>;

	export type queue<T> = Queue<T>;

	export type priority_queue<T> = PriorityQueue<T>;

	export var stack = Stack;
	export var queue = Queue;
	export var priority_queue = PriorityQueue;

	/* ---------------------------------------------------------
		SET CONTAINERS
	--------------------------------------------------------- */
	export import set = TreeSet;
	
	export import multiset = TreeMultiSet;

	export import unordered_set = HashSet;

	export import unordered_multiset = HashMultiSet;

	/* ---------------------------------------------------------
		MAP CONTAINERS
	--------------------------------------------------------- */
	export import map = TreeMap;

	export import multimap = TreeMultiMap;

	export import unordered_map = HashMap;

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

	/* ---------------------------------------------------------
		THREADS
	--------------------------------------------------------- */
	export type mutex = Mutex;
	export type shared_mutex = SharedMutex;
	export type timed_mutex = TimedMutex;
	export type shared_timed_mutex = SharedTimedMutex;
	export type condition_variable = ConditionVariable;

	export var mutex = Mutex;
	export var shared_mutex = SharedMutex;
	export var timed_mutex = TimedMutex;
	export var shared_timed_mutex = SharedTimedMutex;
	export var condition_variable = ConditionVariable;
	
	export namespace experiments
	{
		export type semaphore = Semaphore;
		export var semaphore = Semaphore;
	}
}

try
{
	module.exports = std;
} catch (exception) {}