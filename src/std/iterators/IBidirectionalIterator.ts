namespace std
{
	export interface IBidirectionalIterator<T> 
		extends IForwardIterator<T>
	{
		prev(): IBidirectionalIterator<T>;
		next(): IBidirectionalIterator<T>;
		advance?(n: number): IBidirectionalIterator<T>;

		equals(obj: IBidirectionalIterator<T>): boolean;
	}
}