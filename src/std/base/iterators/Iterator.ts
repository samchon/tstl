/// <reference path="../../API.ts" />

namespace std.base
{
	export interface Iterator<T, 
			SourceT extends Container<T, SourceT, IteratorT, ReverseIteratorT>, 
			IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>,
			ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
		extends Readonly<IBidirectionalIterator<T, IteratorT>>
	{
		source(): SourceT;

		reverse(): ReverseIteratorT;
	}
}
