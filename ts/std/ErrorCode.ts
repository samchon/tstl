/// <reference path="base/system/ErrorInstance.ts" />

namespace std
{
	/**
	 * <p> Error code. </p> 
	 *
	 * <p> Objects of this type hold an error code {@link value} associated with a {@link category}. </p>
	 *
	 * <p> The operating system and other low-level applications and libraries generate numerical error codes to 
	 * represent possible results. These numerical values may carry essential information for a specific platform, 
	 * but be non-portable from one platform to another. </p>
	 *
	 * <p> Objects of this class associate such numerical codes to {@link ErrorCategory error categories}, so that they 
	 * can be interpreted when needed as more abstract (and portable) {@link ErrorCondition error conditions}. </p>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_code/ </li>
	 * </ul>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class ErrorCode
		extends base.system.ErrorInstance
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
		 * @param val A numerical value identifying an error code.
		 * @param category A reference to an {@link ErrorCategory} object.
		 */
		public constructor(val: number, category: ErrorCategory);

		public constructor(val: number = 0, category: ErrorCategory = null)
		{
			super(val, category);
		}
	}
}