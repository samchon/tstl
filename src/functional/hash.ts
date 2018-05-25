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
		let type: string = typeof item;

		if (type === "boolean")
			ret = _Hash_boolean(item, ret);
		else if (type === "number") // NUMBER -> 8 BYTES
			ret = _Hash_number(item, ret);
		else if (type === "string") // STRING -> {LENGTH} BYTES
			ret = _Hash_string(item, ret);
		else // CALL THE HASH_CODE FUNCTION ?
		{
			if ((item as any).hashCode !== undefined)
			{
				let hashed: number = (item as any).hashCode();
				if (items.length === 1)
					return hashed;
				else
				{
					ret = ret ^ hashed;
					ret *= _HASH_MULTIPLIER;
				}
			}
			else
				ret = _Hash_number((<any>item).__get_m_iUID(), ret);
		}
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


// Incremental sequence of unique id for objects.
/**
 * @hidden
 */
var __s_iUID: number = 0;

if (Object.prototype.hasOwnProperty("__get_m_iUID") === false)
	Object.defineProperty(Object.prototype, "__get_m_iUID",
	{
		value: function (): number
		{
			if (this.hasOwnProperty("__m_iUID") === false)
			{
				var uid: number = ++__s_iUID;
				Object.defineProperty(this, "__m_iUID",
				{
					get: function (): number
					{
						return uid;
					}
				});
			}
			return this.__m_iUID;
		}
	});