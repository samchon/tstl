//================================================================ 
/**
 * @packageDocumentation
 * @module std.internal  
 */
//================================================================
import { UniqueMap } from "../../../base/container/UniqueMap";
import { ITreeContainer } from "./ITreeContainer";

import { IPair } from "../../../utility/IPair";
import { Entry } from "../../../utility/Entry";
import { Pair } from "../../../utility/Pair";

import { Comparator } from "../../functional/Comparator";
import { Temporary } from "../../functional/Temporary";

/**
 * Basic tree map blocking duplicated key.
 * 
 * @typeParam Key Key type
 * @typeParam T Mapped type
 * @typeParam Source Derived type extending this {@link UniqueTreeMap}
 * @typeParam IteratorT Iterator type
 * @typeParam ReverseT Reverse iterator type
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export abstract class UniqueTreeMap<Key, T,
        Source extends UniqueTreeMap<Key, T, Source, IteratorT, ReverseT>,
        IteratorT extends UniqueMap.Iterator<Key, T, Source, IteratorT, ReverseT>,
        ReverseT extends UniqueMap.ReverseIterator<Key, T, Source, IteratorT, ReverseT>>
    extends UniqueMap<Key, T, Source, IteratorT, ReverseT>
    implements ITreeContainer<Key, Entry<Key, T>, Source, IteratorT, ReverseT, IPair<Key, T>>
{
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public find(key: Key): IteratorT
    {
        let it: IteratorT = this.lower_bound(key);
        if (!it.equals(this.end()) && this._Key_eq(key, it.first))
            return it;
        else
            return this.end();
    }
    
    /**
     * @inheritDoc
     */
    public abstract lower_bound(key: Key): IteratorT;

    /**
     * @inheritDoc
     */
    public abstract upper_bound(key: Key): IteratorT;

    /**
     * @inheritDoc
     */
    public equal_range(key: Key): Pair<IteratorT, IteratorT>
    {
        let it: IteratorT = this.lower_bound(key);
        return new Pair(it, !it.equals(this.end()) && this._Key_eq(key, it.first) 
            ? it.next() 
            : it);
    }

    /**
     * @inheritDoc
     */
    public abstract key_comp(): Comparator<Key>;

    /**
     * @inheritDoc
     */
    public value_comp(): Comparator<IPair<Key, T>>
    {
        return (x, y) => this.key_comp()(x.first, y.first);
    }
    
    protected _Key_eq(x: Key, y: Key): boolean
    {
        return !this.key_comp()(x, y) && !this.key_comp()(y, x);
    }

    /* ---------------------------------------------------------
        INSERT
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public emplace(key: Key, val: T): Pair<IteratorT, boolean>
    {
        // FIND POSITION TO INSERT
        let it: IteratorT = this.lower_bound(key);
        if (!it.equals(this.end()) && this._Key_eq(it.first, key))
            return new Pair(it, false);

        // ITERATOR TO RETURN
        it = this.data_.insert(it, new Entry(key, val));
        this._Handle_insert(it, it.next());

        return new Pair(it, true);
    }

    /**
     * @inheritDoc
     */
    public emplace_hint(hint: IteratorT, key: Key, val: T): IteratorT
    {
        let elem: Entry<Key, T> = new Entry(key, val);
        let validate: boolean = ITreeContainer.emplacable<Key, 
                Entry<Key, T>, 
                Source, 
                IteratorT,
                ReverseT,
                IPair<Key, T>>
            (this as Temporary, hint, elem);

        if (validate)
        {
            let it: IteratorT = this.data_.insert(hint, elem);
            this._Handle_insert(it, it.next());

            return it;
        }
        else
            return this.emplace(key, val).first;
    }
}