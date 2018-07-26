import { IComparable } from "./IComparable";
import { get_uid } from "./uid";

/**
 * Hash function.
 * 
 * @param items The items to be hashed.
 * @return The hash code.
 */
export function hash(...items: any[]): number
{
	let ret: number = _HASH_INIT_VALUE;
	
	for (let item of items)
	{
		item = item.valueOf();
		let type: string = typeof item;

		if (type === "boolean") // BOOLEAN -> 1 BYTE
			ret = _Hash_boolean(item, ret);
		else if (type === "number" || type === "bigint") // NUMBER -> 8 BYTES
			ret = _Hash_number(item, ret);
		else if (type === "string") // STRING -> {LENGTH} BYTES
			ret = _Hash_string(item, ret);
		else if (item instanceof Object)
		{
			// CALL THE HASH_CODE FUNCTION ?
			if ((<any>item as IComparable<{}>).hashCode instanceof Function)
			{
				let hashed: number = (<any>item as IComparable<{}>).hashCode();
				if (items.length === 1)
					return hashed;
				else
				{
					ret = ret ^ hashed;
					ret *= _HASH_MULTIPLIER;
				}
			}
			else
				ret = _Hash_number(get_uid(item), ret);
		}
		else // NULL OR UNDEFINED
			ret *= _HASH_MULTIPLIER;
	}
	return ret;
}

/**
 * @hidden
 */
function _Hash_boolean(val: boolean, ret: number): number
{
	ret ^= val ? 1 : 0;
	ret *= _HASH_MULTIPLIER;

	return ret;
}

/**
 * @hidden
 */
function _Hash_number(val: number, ret: number): number
{
	return _Hash_string(val.toString(), ret);
	// // ------------------------------------------
	// //	IN C++
	// //		CONSIDER A NUMBER AS A STRING
	// //		HASH<STRING>((CHAR*)&VAL, 8)
	// // ------------------------------------------
	// // CONSTRUCT BUFFER AND BYTE_ARRAY
	// let buffer: ArrayBuffer = new ArrayBuffer(8);
	// let byteArray: Int8Array = new Int8Array(buffer);
	// let valueArray: Float64Array = new Float64Array(buffer);
	// valueArray[0] = val;

	// for (let i: number = 0; i < byteArray.length; i++)
	// {
	// 	let byte = (byteArray[i] < 0) ? byteArray[i] + 256 : byteArray[i];

	// 	ret ^= byte;
	// 	ret *= _HASH_MULTIPLIER;
	// }
	// return Math.abs(ret);
}

/**
 * @hidden
 */
function _Hash_string(str: string, ret: number): number
{
	for (let i: number = 0; i < str.length; i++)
	{
		ret ^= str.charCodeAt(i);
		ret *= _HASH_MULTIPLIER;
	}
	return Math.abs(ret);
}

/* ---------------------------------------------------------
	RESERVED ITEMS
--------------------------------------------------------- */
/**
 * @hidden
 */
const _HASH_INIT_VALUE: number = 2166136261;

/**
 * @hidden
 */
const _HASH_MULTIPLIER: number = 16777619;