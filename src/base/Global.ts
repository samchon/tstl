import { is_node } from "../utilities/node";

/**
 * @hidden
 */
export interface IGlobal
{
	__s_iUID?: number;
	__s_pTerminate_handler?: ()=>void;
}

/**
 * @hidden
 */
export function _Get_root(): IGlobal
{
	if (__s_pRoot === null)
	{
		__s_pRoot = (is_node() ? global : window) as IGlobal;
		if (__s_pRoot.__s_iUID === undefined)
			__s_pRoot.__s_iUID = 0;
	}
	return __s_pRoot;
}

/**
 * @hidden
 */
var __s_pRoot: IGlobal = null;