/// <reference path="../API.ts" />

/// <reference path="Exception.ts" />

namespace std
{
	/**
	 * Runtime Error.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class RuntimeError extends Exception
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
	 * Overflow Error.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class OverflowError extends RuntimeError
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
	 * Underflow Error.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class UnderflowError extends RuntimeError
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
	 * Range Error.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class RangeError extends RuntimeError
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