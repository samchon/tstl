import { UniqueMap } from "./UniqueMap";
import { _ITreeContainer, _Emplacable } from "./_ITreeContainer";

import { IForwardIterator } from "../../iterator/IForwardIterator";
import { IMapIterator, IMapReverseIterator } from "../iterator/IMapIterator";

import { IPair } from "../../utility/IPair";
import { Pair } from "../../utility/Pair";
import { Entry } from "../../utility/Entry";
import { Temporary } from "../Temporary";

export abstract class UniqueTreeMap<Key, T,
        Source extends UniqueTreeMap<Key, T, Source, IteratorT, ReverseT>,
        IteratorT extends IMapIterator<Key, T, true, Source, IteratorT, ReverseT>,
        ReverseT extends IMapReverseIterator<Key, T, true, Source, IteratorT, ReverseT>>
    extends UniqueMap<Key, T, Source, IteratorT, ReverseT>
    implements _ITreeContainer<Key, Entry<Key, T>, Source, IteratorT, ReverseT, IPair<Key, T>>
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
    public abstract key_comp(): (x: Key, y: Key) => boolean;

    /**
     * @inheritDoc
     */
    public value_comp(): (x: IPair<Key, T>, y: IPair<Key, T>) => boolean
    {
        return (x, y) => this.key_comp()(x.first, y.first);
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
        let validate: boolean = _Emplacable<Key, 
                Entry<Key, T>, 
                Source, 
                IteratorT,
                ReverseT,
                IPair<Key, T>>
            (this as Temporary, hint, elem);

        if (validate)
        {
            this.data_.insert(hint, elem);
            this._Handle_insert(hint, hint.next());

            return hint;
        }
        else
            return this.emplace(key, val).first;
    }

    /**
     * @hidden
     */
    protected _Insert_by_range<InputIterator extends Readonly<IForwardIterator<IPair<Key, T>, InputIterator>>>
        (first: InputIterator, last: InputIterator): void
    {
        for (let it = first; !it.equals(last); it = it.next())
            this.emplace(it.value.first, it.value.second);
    }
}