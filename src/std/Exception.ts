/// <reference path="API.ts" />

/// <reference path="exceptions/Exception.ts" />
/// <reference path="exceptions/LogicError.ts" />
/// <reference path="exceptions/RuntimeError.ts" />
/// <reference path="exceptions/SystemError.ts" />

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
	 * Function handling termination on exception
	 * 
	 * Calls the current terminate handler.
	 * 
	 * By default, the terminate handler calls abort. But this behavior can be redefined by calling 
	 * {@link set_terminate}.
	 * 
	 * This function is automatically called when no <code>catch</code> handler can be found for a thrown exception, 
	 * or for some other exceptional circumstance that makes impossible to continue the exception handling process.
	 * 
	 * This function is provided so that the terminate handler can be explicitly called by a program that needs to 
	 * abnormally terminate, and works even if {@link set_terminate} has not been used to set a custom terminate handler 
	 * (calling abort in this case).
	 */
	export function terminate(): void
	{
		if (_Terminate_handler != null)
			_Terminate_handler();
		
		if (is_node() == true)
			process.exit();
		else
		{
			window.open("", "_self", "");
			window.close();
		}
	}

	/**
	 * Set <i>terminate handler</i> function.
	 * 
	 * A <i>terminate handler</i> function is a function automatically called when the exception handling process has 
	 * to be abandoned for some reason. This happens when no catch handler can be found for a thrown exception, or for 
	 * some other exceptional circumstance that makes impossible to continue the exception handling process.
	 * 
	 * Before this function is called by the program for the first time, the default behavior is to call abort.
	 * 
	 * A program may explicitly call the current terminate handler function by calling {@link terminate}.
	 * 
	 * @param f Function that takes no parameters and returns no value (<i>void</i>).
	 */
	export function set_terminate(f: () => void): void
	{
		_Terminate_handler = f;

		if (is_node() == true)
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
	 * Get <i>terminate handler</i> function.
	 * 
	 * The <i>terminate handler</i> function is automatically called when no <code>catch</code> handler can be found 
	 * for a thrown exception, or for some other exceptional circumstance that makes impossible to continue the exception 
	 * handling process.
	 * 
	 * If no such function has been set by a previous call to {@link set_terminate}, the function returns a 
	 * <i>null-pointer</i>.
	 * 
	 * @return If {@link set_terminate} has previously been called by the program, the function returns the current 
	 *		   <i>terminate handler</i> function. Otherwise, it returns a <i>null-pointer</i>.
	 */
	export function get_terminate(): () => void
	{
		return _Terminate_handler;
	}

	/**
	 * @hidden
	 */
	var _Terminate_handler: () => void = null;
}