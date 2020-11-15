/**
 * @packageDocumentation
 * @module std
 */
import { IPair } from "./IPair";
import { IComparable } from "../functional/IComparable";
/**
 * Entry for mapping.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare class Entry<Key, T> implements Readonly<IPair<Key, T>>, IComparable<Entry<Key, T>> {
    /**
     * The first, key element.
     */
    readonly first: Key;
    /**
     * The second, mapped element.
     */
    second: T;
    /**
     * Intializer Constructor.
     *
     * @param first The first, key element.
     * @param second The second, mapped element.
     */
    constructor(first: Key, second: T);
    /**
     * @inheritDoc
     */
    equals(obj: Entry<Key, T>): boolean;
    /**
     * @inheritDoc
     */
    less(obj: Entry<Key, T>): boolean;
    /**
     * @inheritDoc
     */
    hashCode(): number;
}
//# sourceMappingURL=Entry.d.ts.map