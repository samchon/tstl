//================================================================

/**
 * @packageDocumentation
 * @module std
 */
//================================================================
import { Vector } from "../container/Vector";
import { equal_to } from "../functional/comparators";
import { IPushBack } from "../internal/container/partial/IPushBack";
import { InsertIteratorBase } from "../internal/iterator/InsertIteratorBase";

/**
 * Output iterator that appends each assigned value to its destination.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class BackInsertIterator<
  Source extends IPushBack<BackInsertIterator.ValueType<Source>>,
> extends InsertIteratorBase<
  BackInsertIterator.ValueType<Source>,
  BackInsertIterator<Source>
> {
  private source_: Source;

  /* ---------------------------------------------------------
        METHODS
    --------------------------------------------------------- */
  /**
   * Create an iterator that appends assigned values.
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
  public set value(val: BackInsertIterator.ValueType<Source>) {
    this.source_.push_back(val);
  }

  /**
   * @inheritDoc
   */
  public equals(obj: BackInsertIterator<Source>): boolean {
    return equal_to(this.source_, obj.source_);
  }
}

/**
 *
 */
export namespace BackInsertIterator {
  /**
   * Extract the element type from the supplied type.
   */
  export type ValueType<Source extends IPushBack<any>> =
    Source extends IPushBack<infer T> ? T : unknown;

  /**
   * Extract the container type from the supplied iterator type.
   */
  export type SourceType<Source extends Array<any> | IPushBack<any>> =
    Source extends Array<infer T> ? Vector<T> : Source;
}
