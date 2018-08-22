/**
 * @hidden
 */
export type AccessType = boolean;
export namespace AccessType
{
	export const WRITE = false;
	export const READ = true;
}

/**
 * @hidden
 */
export type LockType = boolean;
export namespace LockType
{
	export const HOLD = false;
	export const KNOCK = true;
}