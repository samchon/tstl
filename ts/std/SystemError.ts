/// <reference path="Exception.ts" />

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
}