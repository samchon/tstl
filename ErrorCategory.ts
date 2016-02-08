namespace std
{
	/**
	 * <p> Error category. </p>
	 *
	 * <p> This type serves as a base class for specific category types. </p>
	 *
	 * <p> Category types are used to identify the source of an error. They also define the relation between 
	 * <code>ErrorCode</code> and <code>ErrorCondition</code> objects of its category, as well as the message
	 * set for <code>ErrorCode</code> objects.
	 *
	 * <p> Objects of these types have no distinct values and are not-copyable and not-assignable, and thus can 
	 * only be passed by reference. As such, only one object of each of these types shall exist, each uniquely 
	 * identifying its own category: all error codes and conditions of a same category shall return a reference 
	 * to same object. </p>
	 *
	 * <ul>
	 *	<li> Reference: http://www.cplusplus.com/reference/system_error/error_category/ </li>
	 * </ul>
	 *
	 * @author Jeongho Nam 
	 */
	export abstract class ErrorCategory
	{
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Default Constructor.
		 */
		public constructor()
		{
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Return category name. </p>
		 *
		 * <p> In derived classes, the function returns a <code>string</code> naming the category. </p>
		 *
		 * <p> In <code>ErrorCategory</code>, it is a pure virtual member function. </p>
		 *
		 * <ul>
		 *	<li> In the <code>GenericCategory</code> object, it returns <i>"generic"</i>. </li>
		 *	<li> In the <code>SystemCategory</code> object, it returns <i>"system"</i>. </li>
		 *	<li> In the <code>IOStreamCategory</code> object, it returns <i>"iostream"</i>. </li>
		 * </ul>
		 *
		 * @return The category name.
		 */
		public abstract name(): string;

		/**
		 * <p> Error message. </p>
		 *
		 * <p> In derived classes, the function returns a <code>string</code> object with a message describing 
		 * the error condition denoted by <code>val</code>. </p>
		 *
		 * <p> In <code>ErrorCategory</code>, it is a pure virtual member function. </p>
		 *
		 * <p> This function is called both by <code>ErrorCode.message()</code> and <code>ErrorCondition.message()</code>
		 * to obtain the corresponding message in the <code>category</code>. Therefore, numerical values used by 
		 * custom <code>error codes</code> and <code>error conditions</code> should only match for a category 
		 * if they describe the same error. </p>
		 * 
		 * @param val A numerical value identifying an error condition.
		 *			  If the <code>ErrorCategory</code> object is the <code>GenericCategory</code>, this argument 
		 *			  is equivalent to an <code>errno</code> value.
		 *
		 * @return A <code>string</code> object with the message.
		 */
		public abstract message(val: number): string;

		/* ---------------------------------------------------------
			OPERATORS
		--------------------------------------------------------- */
		/**
		 * <p> Default error condition. </p>
		 *
		 * <p> Returns the default <code>ErrorCondition</code> object of this category that is associated with 
		 * the <code>ErrorCode</code> identified by a value of <i>val</i>. </p>
		 *
		 * <p> Its definition in the base class <code>ErrorCategory</code> returns the same as constructing an 
		 * <code>ErrorCondition</code> object with:
		 *
		 * <p> <code>ErrorCondition (val, *this);</code> </p>
		 *
		 * <p> As a virtual member function, this behavior can be overriden in derived classes. </p>
		 *
		 * <p> This function is called by the default definition of member <code>equivalent()</code>, which is 
		 * used to compare <code>error conditions</code> with error codes. </p>
		 *
		 * @param val A numerical value identifying an error condition.
		 *
		 * @return The default <code>ErrorCondition</code> object associated with condition value <i>val</i> 
		 *		   for this category.
		 */
		public defaultErrorCondition(val: number): ErrorCondition
		{
			return null;
		}

		public equivalent(valCode: number, cond: ErrorCondition): boolean;

		public equivalent(code: ErrorCode, valCond: number): boolean;

		public equivalent(...args: any[]): boolean
		{
			return false;
		}
	}
}