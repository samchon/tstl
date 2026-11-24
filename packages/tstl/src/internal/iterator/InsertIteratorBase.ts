//================================================================

/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
import { IForwardIterator } from "../../iterator/IForwardIterator";
import { Writeonly } from "../functional/Writeonly";

export abstract class InsertIteratorBase<
  T,
  This extends InsertIteratorBase<T, This>,
> implements Writeonly<IForwardIterator<T, This>>
{
  /**
   * Insert the assigned value at this output position.
   *
   * @param val Value to insert.
   */
  public abstract set value(val: T);

  /**
   * @inheritDoc
   */
  public next(): This {
    return this as any;
  }

  /**
   * @inheritDoc
   */
  public abstract equals(obj: This): boolean;
}
