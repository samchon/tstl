/// <reference path="API.ts" />

// Standard exceptions
//
// This header defines the base class for all exceptions thrown by the elements of the standard library: 
// {@link Exception}, along with several types and utilities to assist handling exceptions:
//
// @reference http://www.cplusplus.com/reference/exception/
// @author Jeongho Nam <http://samchon.org>

namespace std
{
	/**
	 * <p> Function handling termination on exception </p>
	 * 
	 * <p> Calls the current terminate handler. </p>
	 * 
	 * <p> By default, the terminate handler calls abort. But this behavior can be redefined by calling 
	 * {@link set_terminate}. </p>
	 * 
	 * <p> This function is automatically called when no <code>catch</code> handler can be found for a thrown exception, 
	 * or for some other exceptional circumstance that makes impossible to continue the exception handling process. </p>
	 * 
	 * <p> This function is provided so that the terminate handler can be explicitly called by a program that needs to 
	 * abnormally terminate, and works even if {@link set_terminate} has not been used to set a custom terminate handler 
	 * (calling abort in this case). </p>
	 */
	export function terminate(): void
	{
		if (_Terminate_handler != null)
			_Terminate_handler();
		
		if (std.is_node() == true)
			process.exit();
		else
		{
			window.open("", "_self", "");
			window.close();
		}
	}

	/**
	 * <p> Set <i>terminate handler</i> function. </p>
	 * 
	 * <p> A <i>terminate handler</i> function is a function automatically called when the exception handling process has 
	 * to be abandoned for some reason. This happens when no catch handler can be found for a thrown exception, or for 
	 * some other exceptional circumstance that makes impossible to continue the exception handling process. </p>
	 * 
	 * <p> Before this function is called by the program for the first time, the default behavior is to call abort. </p>
	 * 
	 * <p> A program may explicitly call the current terminate handler function by calling {@link terminate}. </p>
	 * 
	 * @param f Function that takes no parameters and returns no value (<i>void</i>).
	 */
	export function set_terminate(f: () => void): void
	{
		_Terminate_handler = f;

		if (std.is_node() == true)
			process.on("uncaughtException", 
				function (error: Error): void
				{
					_Terminate_handler();
				}
			);
		else
			window.onerror = 
				function (message: string, filename?: string, lineno?: number, colno?: number, error?: Error): void
				{
					_Terminate_handler();
				};
	}

	/**
	 * <p> Get <i>terminate handler</i> function. </p>
	 * 
	 * <p> The <i>terminate handler</i> function is automatically called when no <code>catch</code> handler can be found 
	 * for a thrown exception, or for some other exceptional circumstance that makes impossible to continue the exception 
	 * handling process. </p>
	 * 
	 * <p> If no such function has been set by a previous call to {@link set_terminate}, the function returns a 
	 * <i>null-pointer</i>. </p>
	 * 
	 * @return If {@link set_terminate} has previously been called by the program, the function returns the current 
	 *		   <i>terminate handler</i> function. Otherwise, it returns a <i>null-pointer</i>.
	 */
	export function get_terminate(): () => void
	{
		return _Terminate_handler;
	}

	/* =========================================================
		+ EXCEPTION
			+ LOGIC_ERROR
				- DOMAIN_ERROR
				- INVALID_ARGUMENT
				- LENGTH_ERROR
				- OUT_OF_RANGE
			+ RUNTIME_ERROR
				- OVERFLOW_ERROR
				- RANGE_ERROR
				- SYSTEM_ERROR
				- UNDERFLOW_ERROR
	========================================================= */
	/**
	 * <p> Standard exception class. </p>
	 *  
	 * <p> Base class for standard exceptions. </p>
	 *
	 * <p> All objects thrown by components of the standard library are derived from this class. 
	 * Therefore, all standard exceptions can be caught by catching this type by reference. </p>
	 *
	 * <p> <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/exception/exception
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class Exception
	{
		/**
		 * @hidden
		 */
		private message_: string;

		/**
		 * Default Constructor.
		 */
		public constructor();

		/**
		 * <p> Construct from a message. </p>
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string);

		public constructor(message: string = "")
		{
			this.message_ = message;
		}

		/**
		 * <p> Get string identifying exception. </p>
		 * 
		 * <p> Returns a string that may be used to identify the exception. </p>
		 *
		 * <p> The particular representation pointed by the returned value is implementation-defined. 
		 * As a virtual function, derived classes may redefine this function so that specify value are 
		 * returned. </p>
		 */
		public what(): string
		{
			return this.message_;
		}
	}

	/* =========================================================
		+ LOGIC_ERROR
			- DOMAIN_ERROR
			- INVALID_ARGUMENT
			- LENGTH_ERROR
			- OUT_OF_RANGE
	========================================================= */
	/**
	 * <p> Logic error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report errors in the internal 
	 * logical of the program, such as violation of logical preconditions or class invariants. </p>
	 *
	 * <p> These errors are presumably detectable before the program executes. </p>
	 *
	 * <p> It is used as a base class for several logical error exceptions. </p>
	 *
	 * <p> <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/logic_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class LogicError
		extends Exception
	{
		/**
		 * <p> Construct from a message. </p>
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * <p> Domain error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report domain errors. </p>
	 *
	 * <p> Generally, the domain of a mathematical function is the subset of values that it is defined for. 
	 * For example, the square root function is only defined for non-negative numbers. Thus, a negative number 
	 * for such a function would qualify as a domain error. </p>
	 *
	 * <p> No component of the standard library throws exceptions of this type. It is designed as a standard 
	 * exception to be thrown by programs. </p>
	 *
	 * <p> <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank">
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a></p>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/domain_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class DomainError
		extends LogicError
	{
		/**
		 * <p> Construct from a message. </p>
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * <p> Invalid argument exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report an invalid argument. </p>
	 *
	 * <p> It is a standard exception that can be thrown by programs. Some components of the standard library 
	 * also throw exceptions of this type to signal invalid arguments. </p>
	 *
	 * <p> <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/invalid_argument
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class InvalidArgument
		extends LogicError
	{
		/**
		 * <p> Construct from a message. </p>
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * <p> Length error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report a length error. </p>
	 *
	 * <p> It is a standard exception that can be thrown by programs. Some components of the standard library, 
	 * such as vector and string also throw exceptions of this type to signal errors resizing. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/length_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class LengthError
		extends LogicError
	{
		/**
		 * <p> Construct from a message. </p>
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * <p> Out-of-range exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report an out-of-range error. </p>
	 *
	 * <p> It is a standard exception that can be thrown by programs. Some components of the standard library, 
	 * such as vector, deque, string and bitset also throw exceptions of this type to signal arguments 
	 * out of range. </p>
	 * 
	 * <p> <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/out_of_range
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class OutOfRange
		extends LogicError
	{
		/**
		 * <p> Construct from a message. </p>
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/* =========================================================
		+ RUNTIME_ERROR
			- OVERFLOW_ERROR
			- RANGE_ERROR
			- SYSTEM_ERROR
			- UNDERFLOW_ERROR
	========================================================= */
	/**
	 * <p> Runtime error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report errors that can only be 
	 * detected during runtime. </p>
	 *
	 * <p> It is used as a base class for several runtime error exceptions. </p>
	 *
	 * <p> <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/runtime_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class RuntimeError
		extends Exception
	{
		/**
		 * <p> Construct from a message. </p>
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * <p> Overflow error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to arithmetic overflow errors. </p>
	 *
	 * <p> It is a standard exception that can be thrown by programs. Some components of the standard library 
	 * also throw exceptions of this type to signal range errors. </p>
	 *
	 * <p> <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/overflow_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class OverflowError
		extends RuntimeError
	{
		/**
		 * <p> Construct from a message. </p>
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * <p> Underflow error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to arithmetic underflow errors. </p>
	 *
	 * <p> No component of the standard library throws exceptions of this type. It is designed as a standard 
	 * exception to be thrown by programs. </p>
	 *
	 * <p> <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/underflow_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class UnderflowError
		extends RuntimeError
	{
		/**
		 * <p> Construct from a message. </p>
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * <p> Range error exception. </p>
	 *
	 * <p> This class defines the type of objects thrown as exceptions to report range errors in internal 
	 * computations. </p>
	 *
	 * <p> It is a standard exception that can be thrown by programs. Some components of the standard library 
	 * also throw exceptions of this type to signal range errors. </p>
	 *
	 * <p> <a href="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" target="_blank"> 
	 * <img src="http://samchon.github.io/tstl/images/class_diagram/exceptions.png" style="max-width: 100%" /> </a> </p>
	 * 
	 * @reference http://www.cplusplus.com/reference/stdexcept/range_error
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export class RangeError
		extends RuntimeError
	{
		/**
		 * <p> Construct from a message. </p>
		 *
		 * @param message A message representing specification about the Exception.
		 */
		public constructor(message: string)
		{
			super(message);
		}
	}

	/**
	 * @hidden
	 */
	var _Terminate_handler: () => void = null;
}