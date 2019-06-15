//================================================================ 
/** @module std.base */
//================================================================
import { MultiSet } from "./MultiSet";
import { _ITreeContainer, _Emplacable } from "./_ITreeContainer";

import { ISetIterator, ISetReverseIterator } from "../iterator/ISetIterator";
import { Pair } from "../../utility/Pair";
import { Temporary } from "../Temporary";
import { IForwardIterator } from "../../iterator";

export abstract class MultiTreeSet<Key,
        Source extends MultiTreeSet<Key, Source, IteratorT, ReverseT>,
        IteratorT extends ISetIterator<Key, false, Source, IteratorT, ReverseT>,
        ReverseT extends ISetReverseIterator<Key, false, Source, IteratorT, ReverseT>>
    extends MultiSet<Key, Source, IteratorT, ReverseT>
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
    public count(key: Key): number
    {
        let it: IteratorT = this.find(key);
        let ret: number = 0;

        for (; !it.equals(this.end()) && this._Key_eq(it.value, key); it = it.next())
            ++ret;

        return ret;
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
        return new Pair(this.lower_bound(key), this.upper_bound(key));
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
    protected _Insert_by_key(key: Key): IteratorT
    {
        // FIND POSITION TO INSERT
        let it: IteratorT = this.upper_bound(key);

        // ITERATOR TO RETURN
        it = this.data_.insert(it, key);
        this._Handle_insert(it, it.next());

        return it;
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
            this.data_.insert(hint, key);
            this._Handle_insert(hint, hint.next());

            return hint;
        }
        else
            return this._Insert_by_key(key);
    }

    /**
     * @hidden
     */
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<Key, InputIterator>>>
        (first: InputIterator, last: InputIterator): void
    {
        for (let it = first; !it.equals(last); it = it.next())
            this._Insert_by_key(it.value);
    }
}