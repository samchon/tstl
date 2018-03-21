/// <reference path="../API.ts" />

/// <reference path="Exception.ts" />

namespace std
{
	/**
	 * Logic Error.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class LogicError extends Exception
	{
		/**
		 * Initializer Constructor.
		 * 
		 * @param message The error messgae.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * Domain Error.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class DomainError extends LogicError
	{
		/**
		 * Initializer Constructor.
		 * 
		 * @param message The error messgae.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * Invalid Argument Exception.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class InvalidArgument extends LogicError
	{
		/**
		 * Initializer Constructor.
		 * 
		 * @param message The error messgae.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * Length Error.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class LengthError
		extends LogicError
	{
		/**
		 * Initializer Constructor.
		 * 
		 * @param message The error messgae.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * Out-of-range Exception.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class OutOfRange extends LogicError
	{
		/**
		 * Initializer Constructor.
		 * 
		 * @param message The error messgae.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}
}