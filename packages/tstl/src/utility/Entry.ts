//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { IComparable } from "../functional/IComparable";
import { equal_to, less as less_fn } from "../functional/comparators";
import { hash } from "../functional/hash";
import { IPair } from "./IPair";

/**
 * Map entry with a read-only key and a mutable mapped value.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class Entry<Key, T>
  implements Readonly<IPair<Key, T>>, IComparable<Entry<Key, T>>
{
  /**
   * The immutable key.
   */
  public readonly first: Key;

  /**
   * The mapped value, which can be reassigned.
   */
  public second: T;

  /**
   * Create a map entry with a key and a mapped value.
   *
   * @param first Key of the entry.
   * @param second Value associated with the key.
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
