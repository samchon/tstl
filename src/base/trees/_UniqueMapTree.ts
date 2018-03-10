import { _MapTree } from "./_MapTree";
import { _XTreeNode } from "./_XTreeNode";

import { UniqueMap } from "../containers/UniqueMap";
import { MapIterator } from "../iterators/MapIterator";

/**
 * @hidden
 */
export class _UniqueMapTree<Key, T, Source extends UniqueMap<Key, T, Source>>
	extends _MapTree<Key, T, Source>
{
	/* ---------------------------------------------------------
		CONSTRUCTOR
	--------------------------------------------------------- */
	public constructor(source: Source, comp: (x: Key, y: Key) => boolean)
	{
		super(source, comp,
			function (x: MapIterator<Key, T, Source>, y: MapIterator<Key, T, Source>): boolean
			{
				return comp(x.first, y.first);
			}
		);
	}

	/* ---------------------------------------------------------
		FINDERS
	--------------------------------------------------------- */
	public nearest_by_key(key: Key): _XTreeNode<MapIterator<Key, T, Source>>
	{
		// NEED NOT TO ITERATE
		if (this.root_ == null)
			return null;

		//----
		// ITERATE
		//----
		let ret: _XTreeNode<MapIterator<Key, T, Source>> = this.root_;
		
		while (true) // UNTIL MEET THE MATCHED VALUE OR FINAL BRANCH
		{
			let it: MapIterator<Key, T, Source> = ret.value;
			let my_node: _XTreeNode<MapIterator<Key, T, Source>> = null;
			
			// COMPARE
			if (this.key_comp()(key, it.first))
				my_node = ret.left;
			else if (this.key_comp()(it.first, key))
				my_node = ret.right;
			else
				return ret; // MATCHED VALUE

			// FINAL BRANCH? OR KEEP GOING
			if (my_node == null)
				break;
			else
				ret = my_node;
		}
		return ret; // DIFFERENT NODE
	}

	public upper_bound(key: Key): MapIterator<Key, T, Source>
	{
		// FIND MATCHED NODE
		let node: _XTreeNode<MapIterator<Key, T, Source>> = this.nearest_by_key(key);
		if (node == null)
			return this.source().end() as MapIterator<Key, T, Source>;

		// MUST BE it.first > key
		let it: MapIterator<Key, T, Source> = node.value;
		if (this.key_comp()(key, it.first))
			return it;
		else
			return it.next();
	}
}