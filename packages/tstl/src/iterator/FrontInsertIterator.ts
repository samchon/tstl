//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { equal_to } from "../functional/comparators";
import { IPushFront } from "../internal/container/partial/IPushFront";
import { InsertIteratorBase } from "../internal/iterator/InsertIteratorBase";

/**
 * Output iterator that prepends each assigned value to its destination.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class FrontInsertIterator<
  Source extends IPushFront<FrontInsertIterator.ValueType<Source>>,
> extends InsertIteratorBase<
  FrontInsertIterator.ValueType<Source>,
  FrontInsertIterator<Source>
> {
  private source_: Source;

  /* ---------------------------------------------------------
        METHODS
    --------------------------------------------------------- */
  /**
   * Create an iterator that prepends assigned values.
   *
   * @param source The source container.
   */
  public constructor(source: Source) {
    super();
    this.source_ = source;
  }

  /**
   * @inheritDoc
   */
  public set value(val: FrontInsertIterator.ValueType<Source>) {
    this.source_.push_front(val);
  }

  /**
   * @inheritDoc
   */
  public equals(obj: FrontInsertIterator<Source>): boolean {
    return equal_to(this.source_, obj.source_);
  }
}
export namespace FrontInsertIterator {
  /**
   * Extract the element type from the supplied type.
   */
  export type ValueType<Source extends IPushFront<any>> =
    Source extends IPushFront<infer T> ? T : unknown;
}
