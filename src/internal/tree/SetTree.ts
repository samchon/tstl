//================================================================ 
/** @module std.base */
//================================================================
import { XTree } from "./XTree";
import { XTreeNode } from "./XTreeNode";

import { SetContainer } from "../../base/container/SetContainer";
import { SetElementList } from "../../base/container/SetElementList";
import { Pair } from "../../utility/Pair";

/**
 * @hidden
 */
export abstract class SetTree<Key, 
        Unique extends boolean, 
        Source extends SetContainer<Key, 
            Unique, 
            Source,
            SetElementList.Iterator<Key, Unique, Source>,
            SetElementList.ReverseIterator<Key, Unique, Source>>>
    extends XTree<SetElementList.Iterator<Key, Unique, Source>>
{
    private source_: Source;

    private key_comp_: (x: Key, y: Key) => boolean;
    private key_eq_: (x: Key, y: Key) => boolean;

    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    public constructor
        (
            set: Source, 
            comp: (x: Key, y: Key) => boolean,
            it_comp: (x: SetElementList.Iterator<Key, Unique, Source>, y: SetElementList.Iterator<Key, Unique, Source>) => boolean
        )
    {
        super(it_comp);
        this.source_ = set;

        this.key_comp_ = comp;
        this.key_eq_ = function (x: Key, y: Key): boolean
        {
            return !comp(x, y) && !comp(y, x);
        };
    }

    /**
     * @internal
     */
    public static _Swap_source<Key, 
            Unique extends boolean, 
            Source extends SetContainer<Key, 
                Unique, 
                Source,
                SetElementList.Iterator<Key, Unique, Source>,
                SetElementList.ReverseIterator<Key, Unique, Source>>>
        (x: SetTree<Key, Unique, Source>, y: SetTree<Key, Unique, Source>): void
    {
        [x.source_, y.source_] = [y.source_, x.source_];
    }

    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    public get_by_key(val: Key): XTreeNode<SetElementList.Iterator<Key, Unique, Source>> | null
    {
        let ret = this.nearest_by_key(val);
        if (ret === null || !this.key_eq_(val, ret.value.value))
            return null;
        else
            return ret;
    }
    public abstract nearest_by_key(val: Key): XTreeNode<SetElementList.Iterator<Key, Unique, Source>> | null;

    public lower_bound(val: Key): SetElementList.Iterator<Key, Unique, Source>
    {
        let node: XTreeNode<SetElementList.Iterator<Key, Unique, Source>> | null = this.nearest_by_key(val);

        if (node === null)
            return this.source_.end();
        else if (this.key_comp_(node.value.value, val)) // it < key
            return node.value.next();
        else
            return node.value;
    }
    public abstract upper_bound(val: Key): SetElementList.Iterator<Key, Unique, Source>;

    public equal_range(val: Key): Pair<SetElementList.Iterator<Key, Unique, Source>, SetElementList.Iterator<Key, Unique, Source>>
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

    public key_comp(): (x: Key, y: Key) => boolean
    {
        return this.key_comp_;
    }
    public key_eq(): (x: Key, y: Key) => boolean
    {
        return this.key_eq_;
    }

    public value_comp(): (x: Key, y: Key) => boolean
    {
        return this.key_comp_;
    }
}