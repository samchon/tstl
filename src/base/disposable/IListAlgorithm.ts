//================================================================ 
/** @module std.base */
//================================================================
/**
 * @hidden
 */
export interface _IListAlgorithm<T, Source>
{
	/* ---------------------------------------------------------
		UNIQUE & REMOVE
	--------------------------------------------------------- */
	/**
	 * Remove duplicated elements.
	 * 
	 * @param binary_pred A binary function predicates two arguments are equal. Default is {@link equal_to}.
	 */
	unique(binary_pred?: (x: T, y: T) => boolean): void;

	/**
	 * Remove elements with specific value.
	 * 
	 * @param val The value to remove.
	 */
	remove(val: T): void;

	/**
	 * Remove elements with specific function.
	 * 
	 * @param pred A unary function determines whether remove or not.
	 */
	remove_if(pred: (val: T) => boolean): void;

	/* ---------------------------------------------------------
		SEQUENCE
	--------------------------------------------------------- */
	/**
	 * Merge two *sorted* containers.
	 * 
	 * @param source Source container to transfer.
	 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
	 */
	merge(from: Source, comp?: (x: T, y: T) => boolean): void;

	/**
	 * Sort elements.
	 * 
	 * @param comp A binary function predicates *x* element would be placed before *y*. When returns `true`, then *x* precedes *y*. Default is {@link less}.
	 */
	sort(comp?: (x: T, y: T) => boolean): void;

	/**
	 * Reverse elements.
	 */
	reverse(): void;

	/**
	 * Swap elements.
	 * 
	 * @param obj Target container to swap.
	 */
	swap(obj: Source): void;
}