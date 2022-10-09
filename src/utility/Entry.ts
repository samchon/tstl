//================================================================
/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IPair } from "./IPair";
import { IComparable } from "../functional/IComparable";

import { hash } from "../functional/hash";
import { less as less_fn, equal_to } from "../functional/comparators";

/**
 * Entry for mapping.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Entry<Key, T>
    implements Readonly<IPair<Key, T>>, IComparable<Entry<Key, T>>
{
    /**
     * The first, key element.
     */
    public readonly first: Key;

    /**
     * The second, mapped element.
     */
    public second: T;

    /**
     * Intializer Constructor.
     *
     * @param first The first, key element.
     * @param second The second, mapped element.
     */
    public constructor(first: Key, second: T) {
        this.first = first;
        this.second = second;
    }

    /**
     * @inheritDoc
     */
    public equals(obj: Entry<Key, T>): boolean {
        return equal_to(this.first, obj.first);
    }

    /**
     * @inheritDoc
     */
    public less(obj: Entry<Key, T>): boolean {
        return less_fn(this.first, obj.first);
    }

    /**
     * @inheritDoc
     */
    public hashCode(): number {
        return hash(this.first);
    }
}
