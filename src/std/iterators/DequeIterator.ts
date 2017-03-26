/// <reference path="../API.ts" />

/// <reference path="../base/iterators/ArrayIterator.ts" />

namespace std
{
	export type DequeIterator<T> = base.ArrayIterator<T, Deque<T>>;
	export type DequeReverseIterator<T> = base.ArrayIterator<T, Deque<T>>;

	export var DequeIterator = base.ArrayIterator;
	export var DequeReverseIterator = base.ArrayReverseIterator;
}

namespace std.Deque
{
	export type iterator<T> = base.ArrayIterator<T, Deque<T>>;
	export type reverse_iterator<T> = base.ArrayIterator<T, Deque<T>>;
}
