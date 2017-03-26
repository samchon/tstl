/// <reference path="../API.ts" />

/// <reference path="../base/iterators/ArrayIterator.ts" />

namespace std
{
	export type VectorIterator<T> = base.ArrayIterator<T, Vector<T>>;
	export type VectorReverseIterator<T> = base.ArrayIterator<T, Vector<T>>;

	export var VectorIterator = base.ArrayIterator;
	export var VectorReverseIterator = base.ArrayReverseIterator;
}

namespace std.Vector
{
	export type iterator<T> = base.ArrayIterator<T, Vector<T>>;
	export type reverse_iterator<T> = base.ArrayReverseIterator<T, Vector<T>>;
}
