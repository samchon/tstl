//================================================================ 
/** @module std.base */
//================================================================
import { UniqueSet } from "./UniqueSet";
import { _ITreeContainer, _Emplacable } from "./_ITreeContainer";

import { ISetIterator, ISetReverseIterator } from "../iterator/ISetIterator";

import { Pair } from "../../utility/Pair";
import { Temporary } from "../Temporary";

export abstract class UniqueTreeSet<Key,
        Source extends UniqueTreeSet<Key, Source, IteratorT, ReverseT>,
        IteratorT extends ISetIterator<Key, true, Source, IteratorT, ReverseT>,
        ReverseT extends ISetReverseIterator<Key, true, Source, IteratorT, ReverseT>>
    extends UniqueSet<Key, Source, IteratorT, ReverseT>
    implements _ITreeContainer<Key, Key, Source, IteratorT, ReverseT, Key>
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
        if (!it.equals(this.end()) && this._Key_eq(key, it.value))
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
        return new Pair(it, !it.equals(this.end()) && this._Key_eq(key, it.value) 
            ? it.next() 
            : it);
    }

    /**
     * @inheritDoc
     */
    public abstract key_comp(): (x: Key, y: Key) => boolean;

    /**
     * @inheritDoc
     */
    public value_comp(): (x: Key, y: Key) => boolean
    {
        return this.key_comp();
    }

    /**
     * @hidden
     */
    protected _Key_eq(x: Key, y: Key): boolean
    {
        return !this.key_comp()(x, y) && !this.key_comp()(y, x);
    }

    /* ---------------------------------------------------------
        INSERT
    --------------------------------------------------------- */
    /**
     * @hidden
     */
    protected _Insert_by_key(key: Key): Pair<IteratorT, boolean>
    {
        // FIND POSITION TO INSERT
        let it: IteratorT = this.lower_bound(key);
        if (!it.equals(this.end()) && this._Key_eq(it.value, key))
            return new Pair(it, false);

        // ITERATOR TO RETURN
        it = this.data_.insert(it, key);
        this._Handle_insert(it, it.next());

        return new Pair(it, true);
    }

    /**
     * @hidden
     */
    protected _Insert_by_hint(hint: IteratorT, key: Key): IteratorT
    {
        let validate: boolean = _Emplacable<Key, Key, 
                Source, 
                IteratorT, 
                ReverseT, 
                Key>
            (this as Temporary, hint, key);

        if (validate)
        {
            let it: IteratorT = this.data_.insert(hint, key);
            this._Handle_insert(it, it.next());

            return it;
        }
        else
            return this._Insert_by_key(key).first;
    }
}