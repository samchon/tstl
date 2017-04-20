/// <reference path="../API.ts" />

namespace std
{
	/**
	 * Default hash function for number.
	 * 
	 * Unary function that defines the default hash function used by the standard library.
	 * 
	 * The functional call returns a hash value of its argument: A hash value is a value that depends solely on 
	 * its argument, returning always the same value for the same argument (for a given execution of a program). The 
	 * value returned shall have a small likelihood of being the same as the one returned for a different argument.
	 *
	 * 
	 * @param val Value to be hashed.
	 * 
	 * @return Returns a hash value for its argument, as a value of type number. The number is an unsigned integer.
	 */
	export function hash(val: number): number;

	/**
	 * Default hash function for string.
	 * 
	 * Unary function that defines the default hash function used by the standard library.
	 * 
	 * The functional call returns a hash value of its argument: A hash value is a value that depends solely on 
	 * its argument, returning always the same value for the same argument (for a given execution of a program). The 
	 * value returned shall have a small likelihood of being the same as the one returned for a different argument.
	 * 
	 * @param str A string to be hashed.
	 * 
	 * @return Returns a hash value for its argument, as a value of type number. The number is an unsigned integer.
	 */
	export function hash(str: string): number;

	/**
	 * Default hash function for Object.
	 * 
	 * Unary function that defines the default hash function used by the standard library.
	 * 
	 * The functional call returns a hash value of its argument: A hash value is a value that depends solely on 
	 * its argument, returning always the same value for the same argument (for a given execution of a program). The 
	 * value returned shall have a small likelihood of being the same as the one returned for a different argument.
	 *
	 * 
	 * The default {@link hash} function of Object returns a value returned from {@link hash hash(number)} with 
	 * an <b>unique id</b> of each Object. If you want to specify {@link hash} function of a specific class, then
	 * define a member function <code>public hashCode(): number</code> in the class.
	 * 
	 * @param obj Object to be hashed.
	 * 
	 * @return Returns a hash value for its argument, as a value of type number. The number is an unsigned integer.
	 */
	export function hash(obj: Object): number;

	export function hash(...args: any[]): number;
	
	export function hash(...args: any[]): number
	{
		let ret: number = _HASH_INIT_VALUE;
		for (let val of args)
		{
			let type: string = typeof val;

			if (type == "number")
				ret = _Hash_number(val, ret);
			else if (type == "string")
				ret = _Hash_string(val, ret);
			else
				ret = _Hash_object(val, ret);
		}
		return ret;
	}

	/**
	 * @hidden
	 */
	function _Hash_number(val: number, ret: number): number
	{
		// ------------------------------------------
		//	IN C++
		//		CONSIDER A NUMBER AS A STRING
		//		HASH<STRING>((CHAR*)&VAL, 8)
		// ------------------------------------------
		// CONSTRUCT BUFFER AND BYTE_ARRAY
		let buffer: ArrayBuffer = new ArrayBuffer(8);
		let byteArray: Int8Array = new Int8Array(buffer);
		let valueArray: Float64Array = new Float64Array(buffer);
		valueArray[0] = val;

		for (let i: number = 0; i < byteArray.length; i++)
		{
			let byte = (byteArray[i] < 0) ? byteArray[i] + 256 : byteArray[i];

			ret ^= byte;
			ret *= 16777619;
		}
		return Math.abs(ret);
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

	/**
	 * @hidden
	 */
	function _Hash_object(obj: Object, ret: number): number
	{
		if ((<any>obj).hashCode != undefined)
			return ret * (obj as IComparable<Object>).hashCode();
		else
			return _Hash_number((<any>obj).__get_m_iUID(), ret);
	}

	/* ---------------------------------------------------------
		UNIQUE ID FOR OBJECTS
	--------------------------------------------------------- */
	const _HASH_INIT_VALUE: number = 2166136261;
	const _HASH_MULTIPLIER: number = 16777619;


	// Incremental sequence of unique id for objects.
	/**
	 * @hidden
	 */
	var __s_iUID: number

	if (__s_iUID == undefined)
		__s_iUID = 0;

	if (Object.prototype.hasOwnProperty("__get_m_iUID") == false)
	{
		Object.defineProperties(Object.prototype,
		{
			"__get_m_iUID":
			{
				value: function (): number
				{
					if (this.hasOwnProperty("__m_iUID") == false)
					{
						var uid: number = ++__s_iUID;
							Object.defineProperty(this, "__m_iUID",
							{
								"get": function (): number
								{
									return uid;
								}
							});
					}
					return this.__m_iUID;
				}
			}
		});
	}
}