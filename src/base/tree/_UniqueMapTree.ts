//================================================================ 
/** @module std.base */
//================================================================
import { _MapTree } from "./_MapTree";
import { _XTreeNode } from "./_XTreeNode";

import { UniqueMap } from "../container/UniqueMap";
import { MapIterator } from "../iterator/MapIterator";

/**
 * @hidden
 */
export class _UniqueMapTree<Key, T, Source extends UniqueMap<Key, T, Source>>
	extends _MapTree<Key, T, true, Source>
{
	/* ---------------------------------------------------------
		CONSTRUCTOR
	--------------------------------------------------------- */
	public constructor(source: Source, comp: (x: Key, y: Key) => boolean)
	{
		super(source, comp,
			function (x: MapIterator<Key, T, true, Source>, y: MapIterator<Key, T, true, Source>): boolean
			{
				return comp(x.first, y.first);
			}
		);
	}

	/* ---------------------------------------------------------
		FINDERS
	--------------------------------------------------------- */
	public nearest_by_key(key: Key): _XTreeNode<MapIterator<Key, T, true, Source>>
	{
		// NEED NOT TO ITERATE
		if (this.root_ === null)
			return null;

		//----
		// ITERATE
		//----
		let ret: _XTreeNode<MapIterator<Key, T, true, Source>> = this.root_;
		
		while (true) // UNTIL MEET THE MATCHED VALUE OR FINAL BRANCH
		{
			let it: MapIterator<Key, T, true, Source> = ret.value;
			let my_node: _XTreeNode<MapIterator<Key, T, true, Source>> = null;
			
			// COMPARE
			if (this.key_comp()(key, it.first))
				my_node = ret.left;
			else if (this.key_comp()(it.first, key))
				my_node = ret.right;
			else
				return ret; // MATCHED VALUE

			// FINAL BRANCH? OR KEEP GOING
			if (my_node === null)
				break;
			else
				ret = my_node;
		}
		return ret; // DIFFERENT NODE
	}

	public upper_bound(key: Key): MapIterator<Key, T, true, Source>
	{
		// FIND MATCHED NODE
		let node: _XTreeNode<MapIterator<Key, T, true, Source>> = this.nearest_by_key(key);
		if (node === null)
			return this.source().end() as MapIterator<Key, T, true, Source>;

		// MUST BE it.first > key
		let it: MapIterator<Key, T, true, Source> = node.value;
		if (this.key_comp()(key, it.first))
			return it;
		else
			return it.next();
	}
}