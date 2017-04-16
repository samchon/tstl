/// <reference path="../API.ts" />

/// <reference path="../base/iterators/ArrayIterator.ts" />

namespace std
{
	export type VectorIterator<T> = base.ArrayIterator<T, Vector<T>>;
	export type VectorReverseIterator<T> = base.ArrayReverseIterator<T, Vector<T>>;
}
