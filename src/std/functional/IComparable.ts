namespace std
{
	export interface IComparable<T>
	{
		equals(obj: T): boolean;

		less?(obj: T): boolean;

		hashCode?(): number;
	}
}