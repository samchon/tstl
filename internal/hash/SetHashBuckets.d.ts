/**
 * @packageDocumentation
 * @module std.internal
 */
import { HashBuckets } from "./HashBuckets";
import { IHashSet } from "../../base/container/IHashSet";
import { Comparator } from "../functional/Comparator";
import { Hasher } from "../functional/Hasher";
/**
 * Hash buckets for set containers
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class SetHashBuckets<Key, Unique extends boolean, Source extends IHashSet<Key, Unique, Source>> extends HashBuckets<Key, IHashSet.Iterator<Key, Unique, Source>> {
    private source_;
    private readonly key_eq_;
    /**
     * Initializer Constructor
     *
     * @param source Source set container
     * @param hasher Hash function
     * @param pred Equality function
     */
    constructor(source: IHashSet<Key, Unique, Source>, hasher: Hasher<Key>, pred: Comparator<Key>);
    key_eq(): Comparator<Key>;
    find(val: Key): IHashSet.Iterator<Key, Unique, Source>;
}
//# sourceMappingURL=SetHashBuckets.d.ts.map