namespace std.base.system
{
	/**
	 * <p> An abstract error instance. </p> 
	 *
	 * <p> {@link ErrorInstance} is an abstract class of {@link ErrorCode} and {@link ErrorCondition}
	 * holding an error instance's identifier {@link value}, associated with a {@link category}. </p>
	 *
	 * <p> The operating system and other low-level applications and libraries generate numerical error codes to 
	 * represent possible results. These numerical values may carry essential information for a specific platform, 
	 * but be non-portable from one platform to another. </p>
	 *
	 * <p> Objects of this class associate such numerical codes to {@link ErrorCategory error categories}, 
	 * so that they can be interpreted when needed as more abstract (and portable) 
	 * {@link ErrorCondition error conditions}. </p>
	 *
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class ErrorInstance
	{
		/**
		 * A reference to an {@link ErrorCategory} object.
		 */
		protected category_: ErrorCategory;

		/**
		 * A numerical value identifying an error instance.
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
		 * <p> Assign error instance. </p>
		 *
		 * <p> Assigns the {@link ErrorCode} object a value of val associated with the {@link ErrorCategory}. </p> 
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
		 * <p> Clear error instance. </p>
		 *
		 * <p> Clears the value in the {@link ErrorCode} object so that it is set to a value of <i>0</i> of the 
		 * {@link ErrorCategory.systemCategory ErrorCategory.systemCategory()} (indicating no error). </p>
		 */
		public clear(): void
		{
			this.value_ = 0;
		}

		/* ---------------------------------------------------------
			ACCESSORS
		--------------------------------------------------------- */
		/**
		 * <p> Get category. </p>
		 *
		 * <p> Returns a reference to the {@link ErrorCategory} associated with the {@link ErrorCode} object. </p>
		 *
		 * @return A reference to a non-copyable object of a type derived from {@link ErrorCategory}.
		 */
		public category(): ErrorCategory
		{
			return this.category_;
		}

		/**
		 * <p> Error value. </p>
		 *
		 * <p> Returns the error value associated with the {@link ErrorCode} object. </p>
		 * 
		 * @return The error value.
		 */
		public value(): number
		{
			return this.value_;
		}

		/**
		 * <p> Get message. </p>
		 *
		 * <p> Returns the message associated with the error instance. </p>
		 *
		 * <p> Error messages are defined by the {@link category} the error instance belongs to. </p>
		 *
		 * <p> This function returns the same as if the following member was called: </p>
		 *
		 * <p> <code>category().message(value())</code> </p>
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
		 * <p> Default error condition. </p>
		 *
		 * <p> Returns the default {@link ErrorCondition}object associated with the {@link ErrorCode} object. </p>
		 *
		 * <p> This function returns the same as if the following member was called: </p>
		 *
		 * <p> <code>category().default_error_condition(value())</code> </p>
		 *
		 * <p> {@link ErrorCategory.default_error_condition ErrorCategory.default_error_condition()} 
		 * is a virtual member function, that can operate differently for each category. </p>
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
		 * <p> Convert to bool. </p>
		 *
		 * <p> Returns whether the error instance has a numerical {@link value} other than 0. </p>
		 *
		 * <p> If it is zero (which is generally used to represent no error), the function returns false, otherwise it returns true. </p>
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