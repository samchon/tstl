import { is_node } from "../utilities/node";
import { _Get_root } from "../base/Global";

/**
 * Terminate program.
 */
export function terminate(): void
{
	if (_Get_root().__s_pTerminate_handler !== null)
		_Get_root().__s_pTerminate_handler();
	
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
	_Get_root().__s_pTerminate_handler = func;
	
	if (is_node() === true)
		process.on("uncaughtException", function (): void
		{
			_Get_root().__s_pTerminate_handler();
		});
	else
		window.onerror = function (): void
		{
			_Get_root().__s_pTerminate_handler();
		};
}

/**
 * Get terminate handler.
 * 
 * @return The terminate handler.
 */
export function get_terminate(): () => void
{
	return _Get_root().__s_pTerminate_handler;
}