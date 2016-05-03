namespace std.base.hash
{
	export const MIN_SIZE: number = 10;

	export const RATIO: number = 0.8;

	export const MAX_RATIO: number = 2.0;

	export function code(par: any): number
	{
		let type: string = typeof par;

		if (type == "number")
			return code_of_number(par);
		else if (type == "string")
			return code_of_string(par);
		else
			return code_of_object(par);
	}

	/**
	 * @hidden
	 */
	function code_of_number(val: number): number
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

		let code: number = 2166136261;
		
		for (let i: number = 0; i < byteArray.length; i++)
		{
			let byte = (byteArray[i] < 0) ? byteArray[i] + 256 : byteArray[i];

			code ^= byte;
			code *= 16777619;
		}
		return Math.abs(code);
	}

	/**
	 * @hidden
	 */
	function code_of_string(str: string): number
	{
		// ------------------------
		//	IN C++
		// ------------------------
		let code: number = 2166136261;

		for (let i: number = 0; i < str.length; i++)
		{
			code ^= str.charCodeAt(i);
			code *= 16777619;
		}
		return Math.abs(code);

		// ------------------------
		//	IN JAVA
		// ------------------------
		//let val: number = 0;

		//for (let i: number = 0; i < str.length; i++)
		//	val += str.charCodeAt(i) * Math.pow(31, str.length - 1 - i);

		//return val;
	}

	/**
	 * @hidden
	 */
	function code_of_object(obj: Object): number
	{
		if ((<any>obj).hash_code != undefined)
			return (<any>obj).hash();
		else
			return (<any>obj).__getUID();
	}
}
