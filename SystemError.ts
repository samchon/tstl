/// <reference path="Exception.ts" />
/// <reference path="base/system/ErrorInstance.ts" />

namespace std
{
	/**
	 * <p> System error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report conditions originating during 
	 * runtime from the operating system or other low-level application program interfaces which have an 
	 * associated <code>ErrorCode</code>. </p>
	 *
	 * <p> The class inherits from <code>RuntimeError</code>, to which it adds an <code>ErrorCode</code> as 
	 * member code (and defines a specialized what member). </p>
	 *
	 * <ul>
     *  <li> Reference: http://www.cplusplus.com/reference/system_error/system_error/
     * </ul>
     *
     * @author Jeongho Nam
	 */
    export class SystemError
        extends RuntimeError
    {
		/**
		 * Error code.
		 */
		protected code_: ErrorCode;
		
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from an error code. 
		 *
		 * @param code An <code>ErrorCode</code> object.
		 */
		public constructor(code: ErrorCode);

		/**
		 * Construct from an error code and message. 
		 *
		 * @param code An <code>ErrorCode</code> object.
		 * @param message A message incorporated in the string returned by member <code>what()</code>.
		 */
		public constructor(code: ErrorCode, message: string);

		/**
		 * Construct from a numeric value and error category. 
		 *
		 * @param val A numerical value identifying an error code.
		 * @param category A reference to an <code>ErrorCode</code> object.
		 */
		public constructor(val: number, category: ErrorCategory);

		/**
		 * Construct from a numeric value, error category and message.
		 * 
		 * @param val A numerical value identifying an error code.
		 * @param category A reference to an <code>ErrorCode</code> object.
		 * @param message A message incorporated in the string returned by member <code>what()</code>.
		 */
		public constructor(val: number, category: ErrorCategory, message: string);

		public constructor(...args: any[])
		{
			super("");
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Get error code. </p>
		 *
		 * <p> Returns the <code>ErrorCode</code> object associated with the exception. </p>
		 *
		 * <p> This value is either the <code>ErrorCode</code> passed to the construction or its equivalent 
		 * (if constructed with a value and a <code>category</code>). </p>
		 *
		 * @return The <code>ErrorCode</code> associated with the object.
		 */
		public code(): ErrorCode
		{
			return this.code_;
		}
    }

	/**
	 * <p> Error code. </p> 
	 *
	 * <p> Objects of this type hold an error code <code>value</code> associated with a <code>category</code>. </p>
	 *
	 * <p> The operating system and other low-level applications and libraries generate numerical error codes to 
	 * represent possible results. These numerical values may carry essential information for a specific platform, 
	 * but be non-portable from one platform to another. </p>
	 *
	 * <p> Objects of this class associate such numerical codes to <code>error categories</code>, so that they 
	 * can be interpreted when needed as more abstract (and portable) <code>error conditions</code>. </p>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_code/ </li>
	 * </ul>
	 *
	 * @author Jeongho Nam
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
		 * @param category A reference to an <code>ErrorCategory</code> object.
		 */
		public constructor(val: number, category: ErrorCategory);

		public constructor(val: number = 0, category: ErrorCategory = null)
		{
			super(val, category);
		}
	}

	/**
	 * <p> Error condition. </p>
	 *
	 * <p> Objects of this type hold a condition <code>value</code> associated with a <code>category</code>. </p>
	 *
	 * <p> Objects of this type describe errors in a generic way so that they may be portable across different 
	 * systems. This is in contrast with <code>ErrorCode</code> objects, that may contain system-specific 
	 * information. </p>
	 *
	 * <p> Because <code>ErrorCondition</code> objects can be compared with error_code objects directly by using 
	 * <code>relational operators</code>, <code>ErrorCondition</code> objects are generally used to check whether 
	 * a particular <code>ErrorCode</code> obtained from the system matches a specific error condition no matter 
	 * the system. </p>
	 *
	 * <p> The <code>categories</code> associated with the <code>ErrorCondition</code> and the <code>ErrorCode</code> 
	 * define the equivalences between them. </p>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_condition/ </li>
	 * </ul>
	 *
	 * @author Jeongho Nam
	 */
	export class ErrorCondition
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
		 * @param val A numerical value identifying an error condition.
		 * @param category A reference to an <code>ErrorCategory</code> object.
		 */
		public constructor(val: number, category: ErrorCategory);

		public constructor(val: number = 0, category: ErrorCategory = null)
		{
			super(val, category);
		}
	}
}