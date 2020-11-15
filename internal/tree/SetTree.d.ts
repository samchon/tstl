/**
 * @packageDocumentation
 * @module std.internal
 */
import { XTree } from "./XTree";
import { ITreeSet } from "../../base/container/ITreeSet";
import { SetElementList } from "../container/associative/SetElementList";
import { XTreeNode } from "./XTreeNode";
import { Pair } from "../../utility/Pair";
import { Comparator } from "../functional/Comparator";
export declare abstract class SetTree<Key, Unique extends boolean, Source extends ITreeSet<Key, Unique, Source, SetElementList.Iterator<Key, Unique, Source>, SetElementList.ReverseIterator<Key, Unique, Source>>> extends XTree<SetElementList.Iterator<Key, Unique, Source>> {
    private source_;
    private key_comp_;
    private key_eq_;
    constructor(set: Source, comp: Comparator<Key>, it_comp: Comparator<SetElementList.Iterator<Key, Unique, Source>>);
    get_by_key(val: Key): XTreeNode<SetElementList.Iterator<Key, Unique, Source>> | null;
    abstract nearest_by_key(val: Key): XTreeNode<SetElementList.Iterator<Key, Unique, Source>> | null;
    lower_bound(val: Key): SetElementList.Iterator<Key, Unique, Source>;
    abstract upper_bound(val: Key): SetElementList.Iterator<Key, Unique, Source>;
    equal_range(val: Key): Pair<SetElementList.Iterator<Key, Unique, Source>, SetElementList.Iterator<Key, Unique, Source>>;
    source(): Source;
    key_comp(): Comparator<Key>;
    key_eq(): Comparator<Key>;
    value_comp(): Comparator<Key>;
}
//# sourceMappingURL=SetTree.d.ts.map