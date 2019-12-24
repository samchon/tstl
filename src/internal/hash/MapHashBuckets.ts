//================================================================ 
/** @module std.base */
//================================================================
import { HashBuckets } from "./HashBuckets";

import { IHashMap } from "../../base/container/IHashMap";
import { MapElementList } from "../../base/container/MapElementList";

/**
 * @hidden
 */
export class MapHashBuckets<Key, T, 
        Unique extends boolean, 
        Source extends IHashMap<Key, T, Unique, Source>>
    extends HashBuckets<MapElementList.Iterator<Key, T, Unique, Source>>
{
    private source_: IHashMap<Key, T, Unique, Source>;

    private hash_function_: (key: Key) => number;
    private key_eq_: (x: Key, y: Key) => boolean;

    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    public constructor(source: IHashMap<Key, T, Unique, Source>, hash: (key: Key) => number, pred: (x: Key, y: Key) => boolean)
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
    public hash_function(): (key: Key) => number
    {
        return this.hash_function_;
    }

    public key_eq(): (x: Key, y: Key) => boolean
    {
        return this.key_eq_;
    }
    
    /* ---------------------------------------------------------
        FINDERS
    --------------------------------------------------------- */
    public find(key: Key): MapElementList.Iterator<Key, T, Unique, Source>
    {
        let index = this.hash_function_(key) % this.size();
        let bucket = this.at(index);

        for (let it of bucket)
            if (this.key_eq_(it.first, key))
                return it;

        return this.source_.end();
    }

    public hash_index(it: MapElementList.Iterator<Key, T, Unique, Source>): number
    {
        return this.hash_function_(it.first) % this.size();
    }
}