//================================================================ 
/** @module std.base */
//================================================================
import { _XTree } from "./_XTree";
import { _XTreeNode } from "./_XTreeNode";

import { SetContainer } from "../container/SetContainer";
import { SetIterator } from "../iterator/SetIterator";
import { Pair } from "../../utility/Pair";

/**
 * @hidden
 */
export abstract class _SetTree<T, Unique extends boolean, Source extends SetContainer<T, Unique, Source>>
	extends _XTree<SetIterator<T, Unique, Source>>
{
	private source_: Source;
	private key_comp_: (x: T, y: T) => boolean;
	private key_eq_: (x: T, y: T) => boolean;

	/* ---------------------------------------------------------
		CONSTRUCTOR
	--------------------------------------------------------- */
	public constructor
		(
			set: Source, 
			comp: (x: T, y: T) => boolean,
			it_comp: (x: SetIterator<T, Unique, Source>, y: SetIterator<T, Unique, Source>) => boolean
		)
	{
		super(it_comp);
		this.source_ = set;

		this.key_comp_ = comp;
		this.key_eq_ = function (x: T, y: T): boolean
		{
			return !comp(x, y) && !comp(y, x);
		};
	}

	/* ---------------------------------------------------------
		FINDERS
	--------------------------------------------------------- */
	public get_by_key(val: T): _XTreeNode<SetIterator<T, Unique, Source>> | null
	{
		let ret = this.nearest_by_key(val);
		if (ret === null || !this.key_eq_(val, ret.value.value))
			return null;
		else
			return ret;
	}
	public abstract nearest_by_key(val: T): _XTreeNode<SetIterator<T, Unique, Source>> | null;

	public lower_bound(val: T): SetIterator<T, Unique, Source>
	{
		let node: _XTreeNode<SetIterator<T, Unique, Source>> | null = this.nearest_by_key(val);

		if (node === null)
			return this.source_.end() as SetIterator<T, Unique, Source>;
		else if (this.key_comp_(node.value.value, val)) // it < key
			return node.value.next();
		else
			return node.value;
	}
	public abstract upper_bound(val: T): SetIterator<T, Unique, Source>;

	public equal_range(val: T): Pair<SetIterator<T, Unique, Source>, SetIterator<T, Unique, Source>>
	{
		return new Pair(this.lower_bound(val), this.upper_bound(val));
	}

	/* ---------------------------------------------------------
		ACCESSORS
	--------------------------------------------------------- */
	public source(): Source
	{
		return this.source_;
	}

	public key_comp(): (x: T, y: T) => boolean
	{
		return this.key_comp_;
	}
	public key_eq(): (x: T, y: T) => boolean
	{
		return this.key_eq_;
	}

	public value_comp(): (x: T, y: T) => boolean
	{
		return this.key_comp_;
	}
}