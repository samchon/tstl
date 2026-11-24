//================================================================
/**
 * @packageDocumentation
 * @module std
 */
//================================================================
/**
 * A reference-like object that exposes its value through the `value` property.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export interface IPointer<T> {
  /**
   * The value exposed through this reference.
   */
  value: T;
}

export namespace IPointer {
  /**
   * Extract the value type from an `IPointer` type.
   */
  export type ValueType<Pointer extends IPointer<any>> =
    Pointer extends IPointer<infer T> ? T : unknown;
}
