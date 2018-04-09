/// <reference path="../API.ts" />

namespace std.base
{
	/**
	 * Base class for error instances.
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
		 * Initializer Constructor.
		 * 
		 * @param val Identifier of an error instance.
		 * @param category An error category instance.
		 */
		public constructor(val: number, category: ErrorCategory);

		public constructor(val: number = 0, category: ErrorCategory = null)
		{
			this.assign(val, category);
		}

		/**
		 * Assign content.
		 * 
		 * @param val Identifier of an error condition.
		 * @param category An error category instance.
		 */
		public assign(val: number, category: ErrorCategory): void
		{
			this.category_ = category;
			this.value_ = val;
		}

		/**
		 * Clear content.
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
		 * @return The category object.
		 */
		public category(): ErrorCategory
		{
			return this.category_;
		}

		/**
		 * Get value, the identifier.
		 * 
		 * @return The value, identifier of this object.
		 */
		public value(): number
		{
			return this.value_;
		}

		/**
		 * Get message.
		 * 
		 * @return The message.
		 */
		public message(): string
		{
			if (this.category_ === null || this.value_ === 0)
				return "";
			else
				return this.category_.message(this.value_);
		}

		/* ---------------------------------------------------------
			OPERATORS
		--------------------------------------------------------- */
		/**
		 * Covert bo bool.
		 * 
		 * @return Whether the {@link value} is not zero.
		 */
		public to_bool(): boolean
		{
			return this.value_ !==0;
		}
	}
}