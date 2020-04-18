//================================================================ 
/**
 * @packageDocumentation
 * @module std.internal  
 */
//================================================================
import { HashBuckets } from "./HashBuckets";

import { IHashSet } from "../../base/container/IHashSet";
import { Comparator } from "../functional/Comparator";
import { Hasher } from "../functional/Hasher";

/**
 * Hash buckets for set containers
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export class SetHashBuckets<Key, Unique extends boolean, Source extends IHashSet<Key, Unique, Source>>
    extends HashBuckets<IHashSet.Iterator<Key, Unique, Source>>
{
    private source_: IHashSet<Key, Unique, Source>;

    private hash_function_: Hasher<Key>;
    private key_eq_: Comparator<Key>;
    
    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    public constructor(source: IHashSet<Key, Unique, Source>, hash: Hasher<Key>, pred: Comparator<Key>)
    {
        super();

        this.source_ = source;
        this.hash_function_ = hash;
        this.key_eq_ = pred;
    }

    /**
     * @internal
     */
    public static _Swap_source<Key, Unique extends boolean, Source extends IHashSet<Key, Unique, Source>>
        (x: SetHashBuckets<Key, Unique, Source>, y: SetHashBuckets<Key, Unique, Source>): void
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
    public find(val: Key): IHashSet.Iterator<Key, Unique, Source>
    {
        let index = this.hash_function_(val) % this.size();
        let bucket = this.at(index);

        for (let it of bucket)
            if (this.key_eq_(it.value, val))
                return it;

        return this.source_.end();
    }

    public hash_index(it: IHashSet.Iterator<Key, Unique, Source>): number
    {
        return this.hash_function_(it.value) % this.size();
    }
}