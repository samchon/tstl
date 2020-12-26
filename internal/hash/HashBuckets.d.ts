/**
 * @packageDocumentation
 * @module std.internal
 */
import { BinaryPredicator } from "../functional/BinaryPredicator";
import { Hasher } from "../functional/Hasher";
/**
 * Hash buckets
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class HashBuckets<Key, Elem> {
    private readonly hasher_;
    private readonly predicator_;
    private readonly fetcher_;
    private max_load_factor_;
    private data_;
    private size_;
    constructor(fetcher: Fetcher<Key, Elem>, hasher: Hasher<Key>, pred: BinaryPredicator<Key>);
    clear(): void;
    rehash(length: number): void;
    reserve(length: number): void;
    private initialize;
    size(): number;
    row_size(): number;
    capacity(): number;
    at(index: number): Elem[];
    load_factor(): number;
    max_load_factor(): number;
    max_load_factor(z: number): void;
    hash_function(): Hasher<Key>;
    key_eq(): BinaryPredicator<Key>;
    private index_by_key;
    private index_by_value;
    find(key: Key): Elem | null;
    insert(val: Elem): void;
    erase(val: Elem): void;
}
declare type Fetcher<Key, Elem> = (elem: Elem) => Key;
export {};
//# sourceMappingURL=HashBuckets.d.ts.map