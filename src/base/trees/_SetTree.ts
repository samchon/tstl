import { _XTree } from "./_XTree";
import { _XTreeNode } from "./_XTreeNode";

import { SetContainer } from "../containers/SetContainer";
import { SetIterator } from "../iterators/SetIterator";

import { Pair } from "../../utilities/Pair";

/**
 * @hidden
 */
export abstract class _SetTree<T, Source extends SetContainer<T, Source>>
	extends _XTree<SetIterator<T, Source>>
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
			it_comp: (x: SetIterator<T, Source>, y: SetIterator<T, Source>) => boolean
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
	public get_by_key(val: T): _XTreeNode<SetIterator<T, Source>>
	{
		let ret = this.nearest_by_key(val);
		if (ret == null || !this.key_eq_(val, ret.value.value))
			return null;
		else
			return ret;
	}
	public abstract nearest_by_key(val: T): _XTreeNode<SetIterator<T, Source>>;

	public lower_bound(val: T): SetIterator<T, Source>
	{
		let node: _XTreeNode<SetIterator<T, Source>> = this.nearest_by_key(val);

		if (node == null)
			return this.source_.end() as SetIterator<T, Source>;
		else if (this.key_comp_(node.value.value, val)) // it < key
			return node.value.next();
		else
			return node.value;
	}
	public abstract upper_bound(val: T): SetIterator<T, Source>;

	public equal_range(val: T): Pair<SetIterator<T, Source>, SetIterator<T, Source>>
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