/// <reference path="../container.ts" />
/// <reference path="../iterator.ts" />
/// <reference path="../algorithm.ts" />

//----
// FUNCTORS
//----
/// <reference path="../exception.ts" />
/// <reference path="../functional.ts" />
/// <reference path="../special_math.ts" />
/// <reference path="../thread.ts" />
/// <reference path="../utility.ts" />

namespace std
{
	/* =========================================================
		CONTAINER SHORTCUTS
			- LINEAR CONTAINERS
			- ASSOCIATIVE CONTAINERS
			- SET CONTAINERS
			- MAP CONTAINERS
	============================================================
		LINEAR CONTAINERS
	--------------------------------------------------------- */
	export import vector = Vector;
	export import deque = Deque;
	export import list = List;

	export import vector_bool = VectorBoolean;
	export import forward_list = ForwardList;

	/* ---------------------------------------------------------
		ASSOCIATIVE CONTAINERS
	--------------------------------------------------------- */
	export type stack<T> = Stack<T>;
	export type queue<T> = Queue<T>;
	export type priority_queue<T> = PriorityQueue<T>;

	export const stack = Stack;
	export const queue = Queue;
	export const priority_queue = PriorityQueue;

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

	/* =========================================================
		ITERATORS
	========================================================= */
	export type insert_iterator<T, 
		Container extends base._IInsert<T, Iterator>, 
		Iterator extends Readonly<IForwardIterator<T, Iterator>>> = InsertIterator<T, Container, Iterator>;
	export type front_insert_iterator<T, Source extends base._IPushFront<T>> = FrontInsertIterator<T, Source>;
	export type back_insert_iterator<T, Source extends base._IPushBack<T>> = BackInsertIterator<T, Source>;

	export const insert_iterator = InsertIterator;
	export const front_insert_iterator = FrontInsertIterator;
	export const back_insert_iterator = BackInsertIterator;

	/* =========================================================
		CONTAINER SHORTCUTS
			- EXCEPTIONS
			- THREADS
			- UTILITIES
	============================================================
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
		
	export const exception = Exception;
		export const logic_error = LogicError;
			export const domain_error = DomainError;
			export const invalid_argument = InvalidArgument;
			export const length_error = LengthError;
			export const out_of_range = OutOfRange;
		export const runtime_error = RuntimeError;
			export const overflow_error = OverflowError;
			export const underflow_error = UnderflowError;
			export const range_error = RangeError;
			export const system_error = SystemError;
				export const error_category = ErrorCategory;
				export const error_condition = ErrorCondition;
				export const error_code = ErrorCode;

	/* ---------------------------------------------------------
		THREADS
	--------------------------------------------------------- */
	export type mutex = Mutex;
	export type shared_mutex = SharedMutex;
	export type timed_mutex = TimedMutex;
	export type shared_timed_mutex = SharedTimedMutex;
	export type condition_variable = ConditionVariable;

	export const mutex = Mutex;
	export const shared_mutex = SharedMutex;
	export const timed_mutex = TimedMutex;
	export const shared_timed_mutex = SharedTimedMutex;
	export const condition_variable = ConditionVariable;

	/* ---------------------------------------------------------
		UTILITIES
	--------------------------------------------------------- */
	export type pair<T1, T2> = Pair<T1, T2>;
	export type entry<Key, T> = Entry<Key, T>;

	export const pair = Pair;
	export const entry = Entry;
}

namespace std.experimental
{
	export type semaphore = Semaphore;
	export type timed_semaphore = TimedSemaphore;

	export const semaphore = Semaphore;
	export const timed_semaphore = TimedSemaphore;
}

try
{
	module.exports = std;
} 
catch {}
