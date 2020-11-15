import * as std from "../../index";
export declare class Atomic<T> implements std.IPointer<T>, std.IComparable<Atomic<T>> {
    value: T;
    constructor(value: T);
    equals(obj: Atomic<T>): boolean;
    less(obj: Atomic<T>): boolean;
    hashCode(): number;
}
//# sourceMappingURL=Atomic.d.ts.map