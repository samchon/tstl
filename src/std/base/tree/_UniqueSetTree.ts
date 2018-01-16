/// <reference path="../../API.ts" />

/// <reference path="_SetTree.ts" />

namespace std.base
{
	/**
	 * @hidden
	 */
	export class _UniqueSetTree<T, Source extends IUniqueSet<T>>
		extends _SetTree<T, Source>
	{
		/* ---------------------------------------------------------
			CONSTRUCTOR
		--------------------------------------------------------- */
		public constructor(source: Source, comp: (x: T, y: T) => boolean)
		{
			super(source, comp, 
				function (x: SetIterator<T, Source>, y: SetIterator<T, Source>): boolean
				{
					return comp(x.value, y.value);
				}
			);
		}

		/* ---------------------------------------------------------
			FINDERS
		--------------------------------------------------------- */
		public find_by_val(val: T): _XTreeNode<SetIterator<T, Source>>
		{
			let node: _XTreeNode<SetIterator<T, Source>> = this.root_;
			if (node == null)
				return null;

			while (true)
			{
				let it: SetIterator<T, Source> = node.value;
				let myNode: _XTreeNode<SetIterator<T, Source>> = null;
				
				if (this.key_eq()(val, it.value))
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

		public upper_bound(val: T): SetIterator<T, Source>
		{
			//--------
			// FIND MATCHED NODE
			//--------
			let node: _XTreeNode<SetIterator<T, Source>> = this.find_by_val(val);
			if (node == null)
				return this.source().end() as SetIterator<T, Source>;

			//--------
			// RETURN BRANCH
			//--------
			let it: SetIterator<T, Source> = node.value;
			
			if (this.key_eq()(it.value, val) || this.key_comp()(it.value, val)) // it.first <= key
				return it.next();
			else // it.first > key
				return it;
        }
	}
}