var is_node_: boolean = null;

/**
 * Test whether the code is running on NodeJS.
 * 
 * @return Whether NodeJS or not.
 */
export function is_node(): boolean
{
	if (is_node_ === null)
		is_node_ = typeof process === "object" 
			&& typeof process.versions === "object"
			&& typeof process.versions.node !== "undefined";
	return is_node_;
}