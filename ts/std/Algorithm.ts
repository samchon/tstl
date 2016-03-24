namespace std
{
	export function sort<T>
		(
			begin: base.container.ILinearIterator<T>, end: base.container.ILinearIterator<T>,
			compare: (left: T, right: T) => boolean = std.less
		): void
	{
		for (let i_it = begin; !i_it.equals(end); i_it = i_it.next())
			for (let j_it = i_it.next(); !j_it.equals(end); j_it = j_it.next())
				if (compare(i_it.value, j_it.value) == false)
					i_it.swap(j_it);
	}
}