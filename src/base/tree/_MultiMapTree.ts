//================================================================ 
/** @module std.base */
//================================================================
import { _MapTree } from "./_MapTree";
import { _XTreeNode } from "./_XTreeNode";

import { MultiMap } from "../container/MultiMap";
import { MapIterator } from "../iterator/MapIterator";

import { get_uid } from "../../functional/uid";

/** 
 * @hidden
 */
export class _MultiMapTree<Key, T, Source extends MultiMap<Key, T, Source>>
	extends _MapTree<Key, T, false, Source>
{
	/* ---------------------------------------------------------
		CONSTRUCTOR
	--------------------------------------------------------- */
	public constructor(source: Source, comp: (x: Key, y: Key) => boolean)
	{
		super(source, comp,
			function (x: MapIterator<Key, T, false, Source>, y: MapIterator<Key, T, false, Source>): boolean
			{
				let ret: boolean = comp(x.first, y.first);
				
				if (!ret && !comp(y.first, x.first))
					return get_uid(x) < get_uid(y);
				else
					return ret;
			}
		);
	}

	public insert(val: MapIterator<Key, T, false, Source>): void
	{
		// ISSUE UID BEFORE INSERTION
		get_uid(val);
		super.insert(val);
	}

	/* ---------------------------------------------------------
		FINDERS
	--------------------------------------------------------- */
	private _Nearest_by_key
		(
			key: Key, 
			equal_mover: (node: _XTreeNode<MapIterator<Key, T, false, Source>>) => _XTreeNode<MapIterator<Key, T, false, Source>> | null
		): _XTreeNode<MapIterator<Key, T, false, Source>> | null
	{
		// NEED NOT TO ITERATE
		if (this.root_ === null)
			return null;

		//----
		// ITERATE
		//----
		let ret: _XTreeNode<MapIterator<Key, T, false, Source>> = this.root_;
		let matched: _XTreeNode<MapIterator<Key, T, false, Source>> | null = null;

		while (true)
		{
			let it: MapIterator<Key, T, false, Source> = ret.value;
			let my_node: _XTreeNode<MapIterator<Key, T, false, Source>> | null = null;

			// COMPARE
			if (this.key_comp()(key, it.first))
				my_node = ret.left;
			else if (this.key_comp()(it.first, key))
				my_node = ret.right;
			else
			{
				// EQUAL, RESERVE THAT POINT
				matched = ret;
				my_node = equal_mover(ret);
			}

			// ULTIL CHILD NODE EXISTS
			if (my_node === null)
				break;
			else
				ret = my_node;
		}

		// RETURNS -> MATCHED OR NOT
		return (matched !== null) ? matched : ret;
	}

	public nearest_by_key(key: Key): _XTreeNode<MapIterator<Key, T, false, Source>> | null
	{
		return this._Nearest_by_key(key, function (node)
		{
			return node.left;
		});
	}

	public upper_bound(key: Key): MapIterator<Key, T, false, Source>
	{
		// FIND MATCHED NODE
		let node: _XTreeNode<MapIterator<Key, T, false, Source>> | null = this._Nearest_by_key(key, 
			function (node)
			{
				return node.right;
			});
		if (node === null) // NOTHING
			return this.source().end() as MapIterator<Key, T, false, Source>;

		// MUST BE it.first > key
		let it: MapIterator<Key, T, false, Source> = node.value;
		if (this.key_comp()(key, it.first))
			return it;
		else
			return it.next();
	}
}