import { is_node } from "../utilities/global";

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

export function get_terminate(): () => void
{
	return _Terminate_handler;
}

/**
 * @hidden
 */
var _Terminate_handler: () => void = null;