//================================================================ 
/**
 * @packageDocumentation
 * @module std  
 */
//================================================================
var is_node_: boolean | null = null;

/**
 * Test whether the code is running on NodeJS.
 * 
 * @return Whether NodeJS or not.
 */
export function is_node(): boolean
{
    if (is_node_ === null)
        is_node_ = typeof global === "object"
            && typeof global.process === "object" 
            && typeof global.process.versions === "object"
            && typeof global.process.versions.node !== "undefined";
    return is_node_;
}