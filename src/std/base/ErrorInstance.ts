/// <reference path="../API.ts" />

namespace std.base
{
	/**
	 * An abstract error instance. 
	 *
	 * {@link ErrorInstance} is an abstract class of {@link ErrorCode} and {@link ErrorCondition}
	 * holding an error instance's identifier {@link value}, associated with a {@link category}.
	 *
	 * The operating system and other low-level applications and libraries generate numerical error codes to 
	 * represent possible results. These numerical values may carry essential information for a specific platform, 
	 * but be non-portable from one platform to another.
	 *
	 * Objects of this class associate such numerical codes to {@link ErrorCategory error categories}, 
	 * so that they can be interpreted when needed as more abstract (and portable) 
	 * {@link ErrorCondition error conditions}.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/design/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/design/class_diagram/exceptions.png" style="max-width: 100%" /> </a>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export abstract class ErrorInstance
	{
		/**
		 * @hidden
		 */
		protected category_: ErrorCategory;

		/**
		 * @hidden
		 */
		protected value_: number;

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
		 * @param val A numerical value identifying an error instance.
		 * @param category A reference to an {@link ErrorCategory} object.
		 */
		public constructor(val: number, category: ErrorCategory);

		public constructor(val: number = 0, category: ErrorCategory = null)
		{
			this.assign(val, category);
		}

		/**
		 * Assign error instance.
		 *
		 * Assigns the {@link ErrorCode} object a value of val associated with the {@link ErrorCategory}. 
		 *
		 * @param val A numerical value identifying an error instance.
		 * @param category A reference to an {@link ErrorCategory} object.
		 */
		public assign(val: number, category: ErrorCategory): void
		{
			this.category_ = category;
			this.value_ = val;
		}

		/**
		 * Clear error instance.
		 *
		 * Clears the value in the {@link ErrorCode} object so that it is set to a value of <i>0</i> of the 
		 * {@link ErrorCategory.systemCategory ErrorCategory.systemCategory()} (indicating no error).
		 */
		public clear(): void
		{
			this.value_ = 0;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * Get category.
		 *
		 * Returns a reference to the {@link ErrorCategory} associated with the {@link ErrorCode} object.
		 *
		 * @return A reference to a non-copyable object of a type derived from {@link ErrorCategory}.
		 */
		public category(): ErrorCategory
		{
			return this.category_;
		}

		/**
		 * Error value.
		 *
		 * Returns the error value associated with the {@link ErrorCode} object.
		 * 
		 * @return The error value.
		 */
		public value(): number
		{
			return this.value_;
		}

		/**
		 * Get message.
		 *
		 * Returns the message associated with the error instance.
		 *
		 * Error messages are defined by the {@link category} the error instance belongs to.
		 *
		 * This function returns the same as if the following member was called:
		 *
		 * <code>category().message(value())</code>
		 *
		 * @return A string object with the message associated with the {@link ErrorCode}.
		 */
		public message(): string
		{
			if (this.category_ == null || this.value_ == 0)
				return "";
			else
				return this.category_.message(this.value_);
		}

		/**
		 * Default error condition.
		 *
		 * Returns the default {@link ErrorCondition}object associated with the {@link ErrorCode} object.
		 *
		 * This function returns the same as if the following member was called:
		 *
		 * <code>category().default_error_condition(value())</code>
		 *
		 * {@link ErrorCategory.default_error_condition ErrorCategory.default_error_condition()} 
		 * is a virtual member function, that can operate differently for each category.
		 * 
		 * @return An {@link ErrorCondition}object that corresponds to the {@link ErrorCode} object.
		 */
		public default_error_condition(): ErrorCondition
		{
			if (this.category_ == null || this.value_ == 0)
				return null;
			else
				return this.category_.default_error_condition(this.value_);
		}

		/* ---------------------------------------------------------
			OPERATORS
		--------------------------------------------------------- */
		/**
		 * Convert to bool.
		 *
		 * Returns whether the error instance has a numerical {@link value} other than 0.
		 *
		 * If it is zero (which is generally used to represent no error), the function returns false, otherwise it returns true.
		 *
		 * @return <code>true</code> if the error's numerical value is not zero. 
		 *		   <code>false</code> otherwise.
		 */
		public to_bool(): boolean
		{
			return this.value_ != 0;
		}
	}
}