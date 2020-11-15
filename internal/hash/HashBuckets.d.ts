/**
 * @packageDocumentation
 * @module std.internal
 */
import { Hasher } from "../functional/Hasher";
/**
 * Hash buckets
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class HashBuckets<Key, Elem> {
    private readonly fetcher_;
    private readonly hasher_;
    private max_load_factor_;
    private data_;
    private size_;
    constructor(fetcher: Fetcher<Key, Elem>, hasher: Hasher<Key>);
    clear(): void;
    rehash(length: number): void;
    reserve(length: number): void;
    private initialize;
    length(): number;
    capacity(): number;
    at(index: number): Elem[];
    load_factor(): number;
    max_load_factor(): number;
    max_load_factor(z: number): void;
    hash_function(): Hasher<Key>;
    private index;
    insert(val: Elem): void;
    erase(val: Elem): void;
}
declare type Fetcher<Key, Elem> = (elem: Elem) => Key;
export {};
//# sourceMappingURL=HashBuckets.d.ts.map