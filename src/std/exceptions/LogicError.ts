/// <reference path="../API.ts" />

/// <reference path="Exception.ts" />

namespace std
{
	/**
	 * Logic error exception.
	 *
	 * This class defines the type of objects thrown as exceptions to report errors in the internal 
	 * logical of the program, such as violation of logical preconditions or class invariants.
	 *
	 * These errors are presumably detectable before the program executes.
	 *
	 * It is used as a base class for several logical error exceptions.
	 *
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/logic_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class LogicError
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
	 * Domain error exception.
	 *
	 * This class defines the type of objects thrown as exceptions to report domain errors.
	 *
	 * Generally, the domain of a mathematical function is the subset of values that it is defined for. 
	 * For example, the square root function is only defined for non-negative numbers. Thus, a negative number 
	 * for such a function would qualify as a domain error.
	 *
	 * No component of the standard library throws exceptions of this type. It is designed as a standard 
	 * exception to be thrown by programs.
	 *
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank">
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a></p>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/domain_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class DomainError
		extends LogicError
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
	 * Invalid argument exception.
	 *
	 * This class defines the type of objects thrown as exceptions to report an invalid argument.
	 *
	 * It is a standard exception that can be thrown by programs. Some components of the standard library 
	 * also throw exceptions of this type to signal invalid arguments.
	 *
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/invalid_argument
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class InvalidArgument
		extends LogicError
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
	 * Length error exception.
	 *
	 * This class defines the type of objects thrown as exceptions to report a length error.
	 *
	 * It is a standard exception that can be thrown by programs. Some components of the standard library, 
	 * such as vector and string also throw exceptions of this type to signal errors resizing.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/length_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class LengthError
		extends LogicError
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
	 * Out-of-range exception.
	 *
	 * This class defines the type of objects thrown as exceptions to report an out-of-range error.
	 *
	 * It is a standard exception that can be thrown by programs. Some components of the standard library, 
	 * such as vector, deque, string and bitset also throw exceptions of this type to signal arguments 
	 * out of range.
	 * 
	 * <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/out_of_range
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class OutOfRange
		extends LogicError
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