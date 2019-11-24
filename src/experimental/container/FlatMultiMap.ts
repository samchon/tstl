//================================================================ 
/** @module std.experimental */
//================================================================
import { MultiTreeMap } from "../../base/container/MultiTreeMap";
import { _Construct } from "../../base/container/_ITreeContainer";

import { MapElementVector } from "../../base/container/MapElementVector";
import { IPair } from "../../utility/IPair";
import { Pair } from "../../utility/Pair";

import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Temporary } from "../../base/Temporary";
import { lower_bound, upper_bound } from "../../algorithm/binary_search";

export class FlatMultiMap<Key, T>
    extends MultiTreeMap<Key, T, 
        FlatMultiMap<Key, T>, 
        FlatMultiMap.Iterator<Key, T>, 
        FlatMultiMap.ReverseIterator<Key, T>>
{
    /**
     * @hidden
     */
    private key_comp_!: (x: Key, y: Key) => boolean;

    /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     * 
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    public constructor(comp?: (x: Key, y: Key) => boolean);

    /**
     * Initializer Constructor.
     * 
     * @param items Items to assign.
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    public constructor(items: IPair<Key, T>[], comp?: (x: Key, y: Key) => boolean);

    /**
     * Copy Constructor.
     * 
     * @param obj Object to copy.
     */
    public constructor(obj: FlatMultiMap<Key, T>);

    /**
     * Range Constructor.
     * 
     * @param first Input iterator of the first position.
     * @param last Input iterator of the last position.
     * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Note that, because *equality* is predicated by `!comp(x, y) && !comp(y, x)`, the function must not cover the *equality* like `<=` or `>=`. It must exclude the *equality* like `<` or `>`. Default is {@link less}.
     */
    public constructor
        (
            first: Readonly<IForwardIterator<IPair<Key, T>>>, 
            last: Readonly<IForwardIterator<IPair<Key, T>>>,
            comp?: (x: Key, y: Key) => boolean
        );
    
    public constructor(...args: any[])
    {
        // INITIALIZATION
        super(thisArg => new MapElementVector(<Temporary>thisArg) as Temporary);
        
        // OVERLOADINGS
        _Construct<Key, Pair<Key, T>, 
                FlatMultiMap<Key, T>,
                FlatMultiMap.Iterator<Key, T>,
                FlatMultiMap.ReverseIterator<Key, T>,
                IPair<Key, T>>
        (
            this, FlatMultiMap, 
            comp => 
            {
                this.key_comp_ = comp;
            },
            ...args
        );
    }

    /**
     * @inheritDoc
     */
    public swap(obj: FlatMultiMap<Key, T>): void
    {
        // SWAP CONTENTS
        [this.data_, obj.data_] = [obj.data_, this.data_];
        MapElementVector._Swap_associative(this.data_ as Temporary, obj.data_ as Temporary);

        // SWAP COMPARATORS
        [this.key_comp_, obj.key_comp_] = [obj.key_comp_, this.key_comp_];
    }

    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public nth(index: number): FlatMultiMap.Iterator<Key, T>
    {
        return (this.data_ as MapElementVector<Key, T, false, FlatMultiMap<Key, T>>).nth(index);
    }

    /**
     * @inheritDoc
     */
    public key_comp(): (x: Key, y: Key) => boolean
    {
        return this.key_comp_;
    }
    
    /**
     * @inheritDoc
     */
    public lower_bound(key: Key): FlatMultiMap.Iterator<Key, T>
    {
        return lower_bound(this.begin(), this.end(), this._Capsule_key(key), this.value_comp());
    }

    /**
     * @inheritDoc
     */
    public upper_bound(key: Key): FlatMultiMap.Iterator<Key, T>
    {
        return upper_bound(this.begin(), this.end(), this._Capsule_key(key), this.value_comp());
    }

    /**
     * @hidden
     */
    private _Capsule_key(key: Key): Pair<Key, T>
    {
        return { first: key } as Pair<Key, T>;
    }

    /* ---------------------------------------------------------
        POST-PROCESS
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    protected _Handle_insert({}, {}): void {}

    /**
     * @hidden
     */
    protected _Handle_erase({}, {}): void {}
}

export namespace FlatMultiMap
{
    //----
    // PASCAL NOTATION
    //----
    // HEAD
    export type Iterator<Key, T> = MapElementVector.Iterator<Key, T, false, FlatMultiMap<Key, T>>;
    export type ReverseIterator<Key, T> = MapElementVector.ReverseIterator<Key, T, false, FlatMultiMap<Key, T>>;

    // BODY
    export const Iterator = MapElementVector.Iterator;
    export const ReverseIterator = MapElementVector.ReverseIterator;

    //----
    // SNAKE NOTATION
    //----
    // HEAD
    export type iterator<Key, T> = Iterator<Key, T>;
    export type reverse_iterator<Key, T> = ReverseIterator<Key, T>;

    // BODY
    export const iterator = Iterator;
    export const reverse_iterator = ReverseIterator;
}
export import flat_multimap = FlatMultiMap;