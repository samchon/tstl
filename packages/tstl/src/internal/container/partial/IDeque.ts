//================================================================

/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
import { IPushFront } from "./IPushFront";

export interface IDeque<T> extends IPushFront<T> {
  /**
   * Remove the element at the front of the sequence.
   */
  pop_front(): void;
}
