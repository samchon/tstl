namespace std
{
	/**
	 * <p> Error category. </p>
	 *
	 * <p> This type serves as a base class for specific category types. </p>
	 *
	 * <p> Category types are used to identify the source of an error. They also define the relation between 
	 * {@link ErrorCode} and {@link ErrorCondition}objects of its category, as well as the message
	 * set for {@link ErrorCode} objects.
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
	 * @author Jeongho Nam <http://samchon.org> 
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
		 * <p> In derived classes, the function returns a string naming the category. </p>
		 *
		 * <p> In {@link ErrorCategory}, it is a pure virtual member function. </p>
		 *
		 * <ul>
		 *	<li> In the {@link GenericCategory} object, it returns <i>"generic"</i>. </li>
		 *	<li> In the {@link SystemCategory} object, it returns <i>"system"</i>. </li>
		 *	<li> In the {@link IOStreamCategory} object, it returns <i>"iostream"</i>. </li>
		 * </ul>
		 *
		 * @return The category name.
		 */
		public abstract name(): string;

		/**
		 * <p> Error message. </p>
		 *
		 * <p> In derived classes, the function returns a string object with a message describing 
		 * the error condition denoted by <i>val</i>. </p>
		 *
		 * <p> In {@link ErrorCategory}, it is a pure virtual member function. </p>
		 *
		 * <p> This function is called both by {@link ErrorCode.message ErrorCode.message()} and 
		 * {@link ErrorCondition.message ErrorCondition.message()}
		 * to obtain the corresponding message in the {@link category}. Therefore, numerical values used by 
		 * custom <i>error codes</i> and {@link ErrorCondition error conditions} should only match for a category 
		 * if they describe the same error. </p>
		 * 
		 * @param val A numerical value identifying an error condition.
		 *			  If the {@link ErrorCategory} object is the {@link GenericCategory}, this argument 
		 *			  is equivalent to an {@link errno} value.
		 *
		 * @return A string object with the message.
		 */
		public abstract message(val: number): string;

		/* ---------------------------------------------------------
			OPERATORS
		--------------------------------------------------------- */
		/**
		 * <p> Default error condition. </p>
		 *
		 * <p> Returns the default {@link ErrorCondition}object of this category that is associated with 
		 * the {@link ErrorCode} identified by a value of <i>val</i>. </p>
		 *
		 * <p> Its definition in the base class {@link ErrorCategory} returns the same as constructing an 
		 * {@link ErrorCondition}object with:
		 *
		 * <p> <code>new ErrorCondition(val, *this);</code> </p>
		 *
		 * <p> As a virtual member function, this behavior can be overriden in derived classes. </p>
		 *
		 * <p> This function is called by the default definition of member {@link equivalent equivalent()}, which is 
		 * used to compare {@link ErrorCondition error conditions} with error codes. </p>
		 *
		 * @param val A numerical value identifying an error condition.
		 *
		 * @return The default {@link ErrorCondition}object associated with condition value <i>val</i> 
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