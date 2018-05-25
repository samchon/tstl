import { is_node } from "../utilities/node";

/**
 * @hidden
 */
var root_: IGlobal = null;

/**
 * @hidden
 */
function _Get_root(): IGlobal
{
	if (root_ === null)
	{
		root_ = (is_node() ? global : window) as IGlobal;
		if (root_.__s_iUID === undefined)
			root_.__s_iUID = 0;
	}
	return root_;
}

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
		return (obj as any).__get_m_iUID();
	
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
	return (obj as any).__m_iUID;
}

/**
 * @hidden
 */
export interface IGlobal
{
	__s_iUID?: number;
}