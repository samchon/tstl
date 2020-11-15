/**
 * @packageDocumentation
 * @module std.internal
 */
import { VectorContainer } from "../linear/VectorContainer";
import { ArrayIteratorBase } from "../../iterator/ArrayIteratorBase";
import { ArrayReverseIteratorBase } from "../../iterator/ArrayReverseIteratorBase";
import { ITreeMap } from "../../../base/container/ITreeMap";
import { IPair } from "../../../utility/IPair";
import { Entry } from "../../../utility/Entry";
/**
 * Vector storing map elements.
 *
 * @template Key Key type
 * @template T Mapped type
 * @template Unique Whether duplicated key is blocked or not
 * @template Source Source type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class MapElementVector<Key, T, Unique extends boolean, Source extends ITreeMap<Key, T, Unique, Source, MapElementVector.Iterator<Key, T, Unique, Source>, MapElementVector.ReverseIterator<Key, T, Unique, Source>>> extends VectorContainer<Entry<Key, T>, Source, MapElementVector<Key, T, Unique, Source>, MapElementVector.Iterator<Key, T, Unique, Source>, MapElementVector.ReverseIterator<Key, T, Unique, Source>> {
    private associative_;
    constructor(associative: Source);
    nth(index: number): MapElementVector.Iterator<Key, T, Unique, Source>;
    source(): Source;
}
/**
 *
 */
export declare namespace MapElementVector {
    /**
     * Iterator of map container storing elements in a vector.
     *
     * @template Key Key type
     * @template T Mapped type
     * @template Unique Whether duplicated key is blocked or not
     * @template Source Source container type
     *
     * @author Jeongho Nam - https://github.com/samchon
     */
    class Iterator<Key, T, Unique extends boolean, Source extends ITreeMap<Key, T, Unique, Source, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>>> extends ArrayIteratorBase<Entry<Key, T>, Source, MapElementVector<Key, T, Unique, Source>, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>, IPair<Key, T>> implements ITreeMap.Iterator<Key, T, Unique, Source, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>> {
        /**
         * @inheritDoc
         */
        source(): Source;
        /**
         * @inheritDoc
         */
        reverse(): ReverseIterator<Key, T, Unique, Source>;
        /**
         * @inheritDoc
         */
        get first(): Key;
        /**
         * @inheritDoc
         */
        get second(): T;
        /**
         * @inheritDoc
         */
        set second(val: T);
    }
    /**
     * Reverse iterator of map container storing elements in a vector.
     *
     * @template Key Key type
     * @template T Mapped type
     * @template Unique Whether duplicated key is blocked or not
     * @template Source Source container type
     *
     * @author Jeongho Nam - https://github.com/samchon
     */
    class ReverseIterator<Key, T, Unique extends boolean, Source extends ITreeMap<Key, T, Unique, Source, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>>> extends ArrayReverseIteratorBase<Entry<Key, T>, Source, MapElementVector<Key, T, Unique, Source>, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>, IPair<Key, T>> implements ITreeMap.ReverseIterator<Key, T, Unique, Source, Iterator<Key, T, Unique, Source>, ReverseIterator<Key, T, Unique, Source>> {
        protected _Create_neighbor(base: Iterator<Key, T, Unique, Source>): ReverseIterator<Key, T, Unique, Source>;
        /**
         * @inheritDoc
         */
        get first(): Key;
        /**
         * @inheritDoc
         */
        get second(): T;
        /**
         * @inheritDoc
         */
        set second(val: T);
    }
}
//# sourceMappingURL=MapElementVector.d.ts.map