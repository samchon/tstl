//================================================================ 
/** @module std.experimental */
//================================================================
import { UniqueTreeMap } from "../../base/container/UniqueTreeMap";
import { _Construct } from "../../base/container/_ITreeContainer";

import { MapElementVector } from "../../base/container/MapElementVector";
import { IPair } from "../../utility/IPair";
import { Entry } from "../../utility/Entry";

import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Temporary } from "../../internal/types/Temporary";
import { lower_bound, upper_bound } from "../../algorithm/binary_search";

export class FlatMap<Key, T>
    extends UniqueTreeMap<Key, T, 
        FlatMap<Key, T>, 
        FlatMap.Iterator<Key, T>, 
        FlatMap.ReverseIterator<Key, T>>
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
    public constructor(obj: FlatMap<Key, T>);

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
        super(thisArg => new MapElementVector(thisArg));
        
        // OVERLOADINGS
        _Construct<Key, Entry<Key, T>, 
                FlatMap<Key, T>,
                FlatMap.Iterator<Key, T>,
                FlatMap.ReverseIterator<Key, T>,
                IPair<Key, T>>
        (
            this, FlatMap, 
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
    public swap(obj: FlatMap<Key, T>): void
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
    public nth(index: number): FlatMap.Iterator<Key, T>
    {
        return (this.data_ as MapElementVector<Key, T, true, FlatMap<Key, T>>).nth(index);
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
    public lower_bound(key: Key): FlatMap.Iterator<Key, T>
    {
        return lower_bound(this.begin(), this.end(), this._Capsule_key(key), this.value_comp());
    }

    /**
     * @inheritDoc
     */
    public upper_bound(key: Key): FlatMap.Iterator<Key, T>
    {
        return upper_bound(this.begin(), this.end(), this._Capsule_key(key), this.value_comp());
    }

    /**
     * @hidden
     */
    private _Capsule_key(key: Key): Entry<Key, T>
    {
        return { first: key } as Entry<Key, T>;
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

export namespace FlatMap
{
    //----
    // PASCAL NOTATION
    //----
    // HEAD
    export type Iterator<Key, T> = MapElementVector.Iterator<Key, T, true, FlatMap<Key, T>>;
    export type ReverseIterator<Key, T> = MapElementVector.ReverseIterator<Key, T, true, FlatMap<Key, T>>;

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
export import flat_map = FlatMap;