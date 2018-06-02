import { _Get_root } from "../base/Global";

/**
 * Get unique identifier.
 * 
 * @param obj Target object.
 * @return The identifier number.
 */
export function get_uid(obj: Object): number
{
	// FOR THE OLDER VERSION (UNDER V1.8)
	if (Object.prototype.hasOwnProperty("__get_m_iUID"))
		return (obj as IObject).__get_m_iUID();
	
	// NO UID EXISTS, THEN ISSUE ONE.
	if (obj.hasOwnProperty("__m_iUID") === false)
	{
		var uid: number = ++_Get_root().__s_iUID;
		Object.defineProperty(obj, "__m_iUID", 
		{
			get: function (): number
			{
				return uid;
			}
		});
	}

	// RETURNS
	return (obj as IObject).__m_iUID;
}

interface IObject
{
	readonly __m_iUID: number;
	readonly __get_m_iUID: () => number;
}