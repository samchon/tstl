namespace std.base.hash
{
	export const MIN_SIZE: number = 10;

	export const RATIO: number = 0.8;

	export const MAX_RATIO: number = 2.0;

	export function code(par: any): number
	{
		let type: string = typeof par;

		if (type == "number")
			return codeByNumber(par);
		else if (type == "string")
			return codeByString(par);
		else
			return codeByObject(par);
	}

	function codeByNumber(val: number): number
	{
		return Math.abs(Math.round(val));
	}
	function codeByString(str: string): number
	{
		let val: number = 0;

		for (let i: number = 0; i < str.length; i++)
			val += str.charCodeAt(i) * Math.pow(31, str.length - 1 - i);

		return val;
	}
	function codeByObject(obj: Object): number
	{
		return (<any>obj).hashCode();
	}
}
