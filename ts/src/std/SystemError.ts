/// <reference path="API.ts" />

/// <reference path="Exception.ts" />
/// <reference path="base/ErrorInstance.ts" />

namespace std
{
	/**
	 * <p> System error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report conditions originating during 
	 * runtime from the operating system or other low-level application program interfaces which have an 
	 * associated {@link ErrorCode}. </p>
	 *
	 * <p> The class inherits from {@link RuntimeError}, to which it adds an {@link ErrorCode} as 
	 * member code (and defines a specialized what member). </p>
	 *
	 * <p> <a href="http://samchon.github.io/tstl/images/design/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/system_error/system_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class SystemError
		extends RuntimeError
	{
		/**
		 * @hidden
		 */
		protected code_: ErrorCode;
		
		/* ---------------------------------------------------------
			CONSTRUCTORS
		--------------------------------------------------------- */
		/**
		 * Construct from an error code. 
		 *
		 * @param code An {@link ErrorCode} object.
		 */
		public constructor(code: ErrorCode);

		/**
		 * Construct from an error code and message. 
		 *
		 * @param code An {@link ErrorCode} object.
		 * @param message A message incorporated in the string returned by member {@link what what()}.
		 */
		public constructor(code: ErrorCode, message: string);

		/**
		 * Construct from a numeric value and error category. 
		 *
		 * @param val A numerical value identifying an error code.
		 * @param category A reference to an {@link ErrorCode} object.
		 */
		public constructor(val: number, category: ErrorCategory);

		/**
		 * Construct from a numeric value, error category and message.
		 * 
		 * @param val A numerical value identifying an error code.
		 * @param category A reference to an {@link ErrorCode} object.
		 * @param message A message incorporated in the string returned by member {@link what what()}.
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
		 * <p> Returns the {@link ErrorCode} object associated with the exception. </p>
		 *
		 * <p> This value is either the {@link ErrorCode} passed to the construction or its equivalent 
		 * (if constructed with a value and a {@link category}. </p>
		 *
		 * @return The {@link ErrorCode} associated with the object.
		 */
		public code(): ErrorCode
		{
			return this.code_;
		}
	}
}

namespace std
{
	/**
	 * <p> Error category. </p>
	 *
	 * <p> This type serves as a base class for specific category types. </p>
	 *
	 * <p> Category types are used to identify the source of an error. They also define the relation between 
	 * {@link ErrorCode} and {@link ErrorCondition}objects of its category, as well as the message set for {@link ErrorCode} 
	 * objects.
	 *
	 * <p> Objects of these types have no distinct values and are not-copyable and not-assignable, and thus can only be
	 * passed by reference. As such, only one object of each of these types shall exist, each uniquely identifying its own 
	 * category: all error codes and conditions of a same category shall return a reference to same object. </p>
	 *
	 * <p> <a href="http://samchon.github.io/tstl/images/design/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/system_error/error_category
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
		 * <p> In derived classes, the function returns a string object with a message describing the error condition 
		 * denoted by <i>val</i>. </p>
		 *
		 * <p> In {@link ErrorCategory}, it is a pure virtual member function. </p>
		 *
		 * <p> This function is called both by {@link ErrorCode.message ErrorCode.message()} and 
		 * {@link ErrorCondition.message ErrorCondition.message()} to obtain the corresponding message in the 
		 * {@link category}. Therefore, numerical values used by custom <i>error codes</i> and 
		 * {@link ErrorCondition error conditions} should only match for a category if they describe the same error. </p>
		 * 
		 * @param val A numerical value identifying an error condition.
		 *			  If the {@link ErrorCategory} object is the {@link GenericCategory}, this argument is equivalent to an 
		 *			  {@link errno} value.
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
		 * <p> Returns the default {@link ErrorCondition}object of this category that is associated with the 
		 * {@link ErrorCode} identified by a value of <i>val</i>. </p>
		 *
		 * <p> Its definition in the base class {@link ErrorCategory} returns the same as constructing an 
		 * {@link ErrorCondition} object with:
		 *
		 * <p> <code>new ErrorCondition(val, *this);</code> </p>
		 *
		 * <p> As a virtual member function, this behavior can be overriden in derived classes. </p>
		 *
		 * <p> This function is called by the default definition of member {@link equivalent equivalent()}, which is used to 
		 * compare {@link ErrorCondition error conditions} with error codes. </p>
		 *
		 * @param val A numerical value identifying an error condition.
		 *
		 * @return The default {@link ErrorCondition}object associated with condition value <i>val</i> for this category.
		 */
		public default_error_condition(val: number): ErrorCondition
		{
			return new ErrorCondition(val, this);
		}

		/**
		 * <p> Check error code equivalence. </p>
		 * 
		 * <p> Checks whether, for the category, an {@link ErrorCode error code} is equivalent to an 
		 * {@link ErrorCondition error condition. </p>
		 * 
		 * <p> This function is called by the overloads of comparison operators when an {@link ErrorCondition} object is 
		 * compared to an {@link ErrorCode} object to check for equality or inequality. If either one of those objects' 
		 * {@link ErrorCategory categories} considers the other equivalent using this function, they are considered 
		 * equivalent by the operator. </p>
		 * 
		 * <p> As a virtual member function, this behavior can be overridden in derived classes to define a different 
		 * correspondence mechanism for each {@link ErrorCategory} type. </p>
		 * 
		 * @param val_code A numerical value identifying an error code.
		 * @param cond An object of an {@link ErrorCondition} type.
		 * 
		 * @return <code>true</code> if the arguments are considered equivalent. <code>false</code> otherwise.
		 */
		public equivalent(val_code: number, cond: ErrorCondition): boolean;

		/**
		 * <p> Check error code equivalence. </p>
		 *
		 * <p> Checks whether, for the category, an {@link ErrorCode error code} is equivalent to an
		 * {@link ErrorCondition error condition. </p>
		 *
		 * <p> This function is called by the overloads of comparison operators when an {@link ErrorCondition} object is
		 * compared to an {@link ErrorCode} object to check for equality or inequality. If either one of those objects'
		 * {@link ErrorCategory categories} considers the other equivalent using this function, they are considered
		 * equivalent by the operator. </p>
		 *
		 * <p> As a virtual member function, this behavior can be overridden in derived classes to define a different
		 * correspondence mechanism for each {@link ErrorCategory} type. </p>
		 * 
		 * @param code An object of an {@link ErrorCode} type.
		 * @param val_cond A numerical value identifying an error code.
		 * 
		 * @return <code>true</code> if the arguments are considered equivalent. <code>false</code> otherwise.
		 */
		public equivalent(code: ErrorCode, val_cond: number): boolean;

		public equivalent(...args: any[]): boolean
		{
			if (args[1] instanceof ErrorCondition)
			{
				let val_code: number = args[0];
				let cond: ErrorCondition = args[1];

				return std.equal_to(this.default_error_condition(val_code), cond);
			}
			else
			{
				let code: ErrorCode = args[0];
				let valcond: number = args[1];

				return std.equal_to(this, code.category()) && code.value() == valcond;
			}
		}
	}
}

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
	 * <p> <a href="http://samchon.github.io/tstl/images/design/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/system_error/error_condition
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
	 * <p> <a href="http://samchon.github.io/tstl/images/design/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/system_error/error_code
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class ErrorCode
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