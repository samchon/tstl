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

	export function get_terminate(): () => void
	{
		return _Terminate_handler;
	}

	/**
	 * @hidden
	 */
	var _Terminate_handler: () => void = null;
}