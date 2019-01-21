//================================================================ 
/** @module std */
//================================================================
/**
 * Pointer referencing value.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface IPointer<T>
{
	/**
	 * Reference of the value.
	 */
	value: T;
}

export module IPointer
{
	export type ValueType<Pointer extends IPointer<any>> = 
		Pointer extends IPointer<infer T>
			? T
			: any;
}