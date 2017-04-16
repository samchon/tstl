/// <reference path="../API.ts" />

/// <reference path="Exception.ts" />

namespace std
{
	/**
	 * Runtime error exception.
	 *
	 * This class defines the type of objects thrown as exceptions to report errors that can only be 
	 * detected during runtime.
	 *
	 * It is used as a base class for several runtime error exceptions.
	 *
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/runtime_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class RuntimeError
		extends Exception
	{
		/**
		 * Construct from a message.
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * Overflow error exception.
	 *
	 * This class defines the type of objects thrown as exceptions to arithmetic overflow errors.
	 *
	 * It is a standard exception that can be thrown by programs. Some components of the standard library 
	 * also throw exceptions of this type to signal range errors.
	 *
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/overflow_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class OverflowError
		extends RuntimeError
	{
		/**
		 * Construct from a message.
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * Underflow error exception.
	 *
	 * This class defines the type of objects thrown as exceptions to arithmetic underflow errors.
	 *
	 * No component of the standard library throws exceptions of this type. It is designed as a standard 
	 * exception to be thrown by programs.
	 *
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/underflow_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class UnderflowError
		extends RuntimeError
	{
		/**
		 * Construct from a message.
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * Range error exception.
	 *
	 * This class defines the type of objects thrown as exceptions to report range errors in internal 
	 * computations.
	 *
	 * It is a standard exception that can be thrown by programs. Some components of the standard library 
	 * also throw exceptions of this type to signal range errors.
	 *
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/range_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class RangeError
		extends RuntimeError
	{
		/**
		 * Construct from a message.
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}
}