/**
 * @packageDocumentation
 * @module std.internal
 */
import { IForwardIterator } from "../../../iterator/IForwardIterator";
export declare class Repeater<T> implements Readonly<IForwardIterator<T, Repeater<T>>> {
    private index_;
    private value_;
    constructor(index: number, value?: T);
    index(): number;
    get value(): T;
    next(): Repeater<T>;
    equals(obj: Repeater<T>): boolean;
}
//# sourceMappingURL=Repeater.d.ts.map