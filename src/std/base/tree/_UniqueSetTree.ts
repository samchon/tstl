/// <reference path="../../API.ts" />

/// <reference path="_SetTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _UniqueSetTree<T>
		extends _SetTree<T>
	{
		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		public constructor(set: TreeSet<T>, compare: (x: T, y: T) => boolean)
		{
			super
			(
				set, 
				compare, 
				function (x: SetIterator<T>, y: SetIterator<T>): boolean
				{
					return compare(x.value, y.value);
				}
			);
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public find_by_val(val: T): _XTreeNode<SetIterator<T>>
		{
			let node: _XTreeNode<SetIterator<T>> = this.root_;
			if (node == null)
				return null;

			while (true)
			{
				let it: SetIterator<T> = node.value;
				let myNode: _XTreeNode<SetIterator<T>> = null;
				
				if (equal_to(val, it.value))
					break;
				else if (this.key_comp()(val, it.value))
					myNode = node.left;
				else
					myNode = node.right;

				// ULTIL CHILD NODE EXISTS
				if (myNode == null)
					break;
				
				// SHIFT A NEW NODE TO THE NODE TO BE RETURNED
				node = myNode;
			}
			return node;
		}

		public upper_bound(val: T): SetIterator<T>
		{
			//--------
			// FIND MATCHED NODE
			//--------
			let node: _XTreeNode<SetIterator<T>> = this.find_by_val(val);
			if (node == null)
				return this.set().end();

			//--------
			// RETURN BRANCH
			//--------
			let it: SetIterator<T> = node.value;
			
			if (equal_to(it.value, val) || this.key_comp()(it.value, val)) // it.first <= key
				return it.next();
			else // it.first > key
				return it;
        }
	}
}