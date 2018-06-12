import { _Get_root } from "../base/Global";

/**
 * Get unique identifier.
 * 
 * @param obj Target object.
 * @return The identifier number.
 */
export function get_uid(obj: Object): number
{
	// NO UID EXISTS, THEN ISSUE ONE.
	if (obj.hasOwnProperty("__get_m_iUID") === false)
	{
		var uid: number = ++_Get_root().__s_iUID;
		Object.defineProperty(obj, "__get_m_iUID", 
		{
			value: function (): number
			{
				return uid;
			}
		});
	}

	// RETURNS
	return (obj as IObject).__get_m_iUID();
}

interface IObject
{
	readonly __get_m_iUID: () => number;
}