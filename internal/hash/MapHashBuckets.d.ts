/**
 * @packageDocumentation
 * @module std.internal
 */
import { HashBuckets } from "./HashBuckets";
import { IHashMap } from "../../base/container/IHashMap";
import { Comparator } from "../functional/Comparator";
import { Hasher } from "../functional/Hasher";
/**
 * Hash buckets for map containers.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class MapHashBuckets<Key, T, Unique extends boolean, Source extends IHashMap<Key, T, Unique, Source>> extends HashBuckets<Key, IHashMap.Iterator<Key, T, Unique, Source>> {
    private source_;
    private readonly key_eq_;
    /**
     * Initializer Constructor
     *
     * @param source Source map container
     * @param hasher Hash function
     * @param pred Equality function
     */
    constructor(source: Source, hasher: Hasher<Key>, pred: Comparator<Key>);
    key_eq(): Comparator<Key>;
    find(key: Key): IHashMap.Iterator<Key, T, Unique, Source>;
}
//# sourceMappingURL=MapHashBuckets.d.ts.map