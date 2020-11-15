/**
 * @packageDocumentation
 * @module std.internal
 */
import { VectorContainer } from "../linear/VectorContainer";
import { ArrayIteratorBase } from "../../iterator/ArrayIteratorBase";
import { ArrayReverseIteratorBase } from "../../iterator/ArrayReverseIteratorBase";
import { ITreeSet } from "../../../base/container/ITreeSet";
/**
 * Vector storing set elements.
 *
 * @template Key Key type
 * @template Unique Whether duplicated key is blocked or not
 * @template Source Source type
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class SetElementVector<Key, Unique extends boolean, Source extends ITreeSet<Key, Unique, Source, SetElementVector.Iterator<Key, Unique, Source>, SetElementVector.ReverseIterator<Key, Unique, Source>>> extends VectorContainer<Key, Source, SetElementVector<Key, Unique, Source>, SetElementVector.Iterator<Key, Unique, Source>, SetElementVector.ReverseIterator<Key, Unique, Source>> {
    private associative_;
    constructor(associative: Source);
    nth(index: number): SetElementVector.Iterator<Key, Unique, Source>;
    source(): Source;
}
/**
 *
 */
export declare namespace SetElementVector {
    /**
     * Iterator of set container storing elements in a vector.
     *
     * @template Key Key type
     * @template Unique Whether duplicated key is blocked or not
     * @template Source Source container type
     *
     * @author Jeongho Nam - https://github.com/samchon
     */
    class Iterator<Key, Unique extends boolean, Source extends ITreeSet<Key, Unique, Source, SetElementVector.Iterator<Key, Unique, Source>, SetElementVector.ReverseIterator<Key, Unique, Source>>> extends ArrayIteratorBase<Key, Source, SetElementVector<Key, Unique, Source>, SetElementVector.Iterator<Key, Unique, Source>, SetElementVector.ReverseIterator<Key, Unique, Source>, Key> implements ITreeSet.Iterator<Key, Unique, Source, SetElementVector.Iterator<Key, Unique, Source>, SetElementVector.ReverseIterator<Key, Unique, Source>> {
        /**
         * @inheritDoc
         */
        source(): Source;
        /**
         * @inheritDoc
         */
        reverse(): ReverseIterator<Key, Unique, Source>;
    }
    /**
     * Reverse iterator of set container storing elements in a vector.
     *
     * @template Key Key type
     * @template Unique Whether duplicated key is blocked or not
     * @template Source Source container type
     *
     * @author Jeongho Nam - https://github.com/samchon
     */
    class ReverseIterator<Key, Unique extends boolean, Source extends ITreeSet<Key, Unique, Source, SetElementVector.Iterator<Key, Unique, Source>, SetElementVector.ReverseIterator<Key, Unique, Source>>> extends ArrayReverseIteratorBase<Key, Source, SetElementVector<Key, Unique, Source>, SetElementVector.Iterator<Key, Unique, Source>, SetElementVector.ReverseIterator<Key, Unique, Source>, Key> implements ITreeSet.ReverseIterator<Key, Unique, Source, SetElementVector.Iterator<Key, Unique, Source>, SetElementVector.ReverseIterator<Key, Unique, Source>> {
        protected _Create_neighbor(base: Iterator<Key, Unique, Source>): ReverseIterator<Key, Unique, Source>;
    }
}
//# sourceMappingURL=SetElementVector.d.ts.map