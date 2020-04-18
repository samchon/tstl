//================================================================ 
/**
 * @packageDocumentation
 * @module std.internal  
 */
//================================================================
import { SetTree } from "./SetTree";
import { XTreeNode } from "./XTreeNode";

import { MultiTreeSet } from "../container/associative/MultiTreeSet";
import { SetElementList } from "../container/associative/SetElementList";
import { Comparator } from "../functional/Comparator";

import { get_uid } from "../../functional/uid";

export class MultiSetTree<Key, 
        Source extends MultiTreeSet<Key, 
            Source,
            SetElementList.Iterator<Key, false, Source>,
            SetElementList.ReverseIterator<Key, false, Source>>>
    extends SetTree<Key, false, Source>
{
    /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
    public constructor(source: Source, comp: Comparator<Key>)
    {
        super(source, comp, 
            function (x: SetElementList.Iterator<Key, false, Source>, y: SetElementList.Iterator<Key, false, Source>): boolean
            {
                let ret: boolean = comp(x.value, y.value);
                if (!ret && !comp(y.value, x.value))
                    return get_uid(x) < get_uid(y);
                else
                    return ret;
            }
        );
    }

    public insert(val: SetElementList.Iterator<Key, false, Source>): void
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
            val: Key, 
            equal_mover: (node: XTreeNode<SetElementList.Iterator<Key, false, Source>>) => XTreeNode<SetElementList.Iterator<Key, false, Source>> | null
        ): XTreeNode<SetElementList.Iterator<Key, false, Source>> | null
    {
        // NEED NOT TO ITERATE
        if (this.root_ === null)
            return null;

        //----
        // ITERATE
        //----
        let ret: XTreeNode<SetElementList.Iterator<Key, false, Source>> = this.root_;
        let matched: XTreeNode<SetElementList.Iterator<Key, false, Source>> | null = null;

        while (true)
        {
            let it: SetElementList.Iterator<Key, false, Source> = ret.value;
            let my_node: XTreeNode<SetElementList.Iterator<Key, false, Source>> | null = null;

            // COMPARE
            if (this.key_comp()(val, it.value))
                my_node = ret.left;
            else if (this.key_comp()(it.value, val))
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

    public nearest_by_key(val: Key): XTreeNode<SetElementList.Iterator<Key, false, Source>> | null
    {
        return this._Nearest_by_key(val, function (node)
        {
            return node.left;
        });
    }

    public upper_bound(val: Key): SetElementList.Iterator<Key, false, Source>
    {
        // FIND MATCHED NODE
        let node: XTreeNode<SetElementList.Iterator<Key, false, Source>> | null = this._Nearest_by_key(val, 
            function (node)
            {
                return node.right;
            });
        if (node === null) // NOTHING
            return this.source().end();

        // MUST BE it.first > key
        let it: SetElementList.Iterator<Key, false, Source> = node.value;
        
        if (this.key_comp()(val, it.value))
            return it;
        else
            return it.next();
    }
}