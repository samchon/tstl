/**
 * @packageDocumentation
 * @module std.internal
 */
import { IForwardIterator } from "../../../iterator/IForwardIterator";
export declare class NativeArrayIterator<T> implements Readonly<IForwardIterator<T, NativeArrayIterator<T>>> {
    private data_;
    private index_;
    constructor(data: Array<T>, index: number);
    index(): number;
    get value(): T;
    prev(): NativeArrayIterator<T>;
    next(): NativeArrayIterator<T>;
    advance(n: number): NativeArrayIterator<T>;
    equals(obj: NativeArrayIterator<T>): boolean;
    swap(obj: NativeArrayIterator<T>): void;
}
//# sourceMappingURL=NativeArrayIterator.d.ts.map