﻿/// <reference path="API.ts" />

/// <reference path="exceptions/Exception.ts" />
/// <reference path="exceptions/LogicError.ts" />
/// <reference path="exceptions/RuntimeError.ts" />
/// <reference path="exceptions/SystemError.ts" />

// <exception>
//
// @reference http://www.cplusplus.com/reference/exception/
// @author Jeongho Nam <http://samchon.org>

namespace std
{
	/**
	 * Terminate program.
	 */
	export function terminate(): void
	{
		if (_Terminate_handler !==null)
			_Terminate_handler();
		
		if (is_node() === true)
			process.exit();
		else
		{
			window.open("", "_self", "");
			window.close();
		}
	}

	/**
	 * Set terminate handler.
	 * 
	 * @param func The terminate handler.
	 */
	export function set_terminate(func: () => void): void
	{
		_Terminate_handler = func;

		if (is_node() === true)
			process.on("uncaughtException", function (): void
			{
				_Terminate_handler();
			});
		else
			window.onerror = function (): void
			{
				_Terminate_handler();
			};
	}

	/**
	 * Get terminate handler.
	 * 
	 * @return The terminate handler.
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