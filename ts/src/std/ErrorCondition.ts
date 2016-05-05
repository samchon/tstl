/// <reference path="base/ErrorInstance.ts" />

namespace std
{
	/**
	 * <p> Error condition. </p>
	 *
	 * <p> Objects of this type hold a condition {@link value} associated with a {@link category}. </p>
	 *
	 * <p> Objects of this type describe errors in a generic way so that they may be portable across different 
	 * systems. This is in contrast with {@link ErrorCode} objects, that may contain system-specific 
	 * information. </p>
	 *
	 * <p> Because {@link ErrorCondition}objects can be compared with error_code objects directly by using 
	 * <code>relational operators</code>, {@link ErrorCondition}objects are generally used to check whether 
	 * a particular {@link ErrorCode} obtained from the system matches a specific error condition no matter 
	 * the system. </p>
	 *
	 * <p> The {@link ErrorCategory categories} associated with the {@link ErrorCondition} and the 
	 * {@link ErrorCode} define the equivalences between them. </p>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_condition/ </li>
	 * </ul>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class ErrorCondition
		extends base.ErrorInstance
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * Construct from a numeric value and error category. 
		 *
		 * @param val A numerical value identifying an error condition.
		 * @param category A reference to an {@link ErrorCategory} object.
		 */
		public constructor(val: number, category: ErrorCategory);

		public constructor(val: number = 0, category: ErrorCategory = null)
		{
			super(val, category);
		}
	}
}