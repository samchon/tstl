//================================================================ 
/**
 * @packageDocumentation
 * @module std.internal  
 */
//================================================================
import { HashBuckets } from "./HashBuckets";

import { IHashMap } from "../../base/container/IHashMap";
import { Comparator } from "../functional/Comparator";
import { Hasher } from "../functional/Hasher";

/**
 * Hash buckets for map containers.
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class MapHashBuckets<Key, T, 
        Unique extends boolean, 
        Source extends IHashMap<Key, T, Unique, Source>>
    extends HashBuckets<IHashMap.Iterator<Key, T, Unique, Source>>
{
    private source_: IHashMap<Key, T, Unique, Source>;
    
    private hash_function_: Hasher<Key>;
    private key_eq_: Comparator<Key>;

    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    /**
     * Initializer Constructor
     * 
     * @param source Source map container
     * @param hash Hash function
     * @param pred Equality function
     */
    public constructor(source: IHashMap<Key, T, Unique, Source>, hash: Hasher<Key>, pred: Comparator<Key>)
    {
        super();

        this.source_ = source;
        this.hash_function_ = hash;
        this.key_eq_ = pred;
    }

    /**
     * @internal
     */
    public static _Swap_source<Key, T, Unique extends boolean, Source extends IHashMap<Key, T, Unique, Source>>
        (x: MapHashBuckets<Key, T, Unique, Source>, y: MapHashBuckets<Key, T, Unique, Source>): void
    {
        [x.source_, y.source_] = [y.source_, x.source_];
    }

    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    public hash_function(): Hasher<Key>
    {
        return this.hash_function_;
    }

    public key_eq(): Comparator<Key>
    {
        return this.key_eq_;
    }
    
    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    public find(key: Key): IHashMap.Iterator<Key, T, Unique, Source>
    {
        let index = this.hash_function_(key) % this.size();
        let bucket = this.at(index);

        for (let it of bucket)
            if (this.key_eq_(it.first, key))
                return it;

        return this.source_.end();
    }

    public hash_index(it: IHashMap.Iterator<Key, T, Unique, Source>): number
    {
        return this.hash_function_(it.first) % this.size();
    }
}