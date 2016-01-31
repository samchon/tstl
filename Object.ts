/// <reference path="base/Hash.ts" />

namespace std
{
	/**
	 * <p> For equality comparison. </p>
	 *
	 * <p> Binary fucntion returns whether the arguments are equal. </p> 
	 *
	 * @param <T> Type of arguments to compare.
	 *
	 * @param first First element to compare.
	 * @param second Second element to compare.
	 *
	 * @return Whether the arguments are equal.
	 */
    export function equals<T>(first: T, second: T): boolean
    {
        if (first instanceof Object)
            return (<any>first).equals(second);
        else
            return first == second;
    }

    /**
     * <p> For less-than inequality comparison. </p>
     *
     * <p> Binary function returns whether the its first argument compares less than 
     * the second. </p>
     *
     * <p> Objects of this class can be used on standard algorithms such as <code>sort</code>, <code>merge</code>. </p>
     *
	 * @param <T> Type of arguments to compare.
	 *
     * @param first First element, the standard of comparison.
     * @param second Second element compare with the first.
     *
     * @return Whether the first parameter is less than the second.
     */
    export function less<T>(first: T, second: T): boolean
    {
        if (first instanceof Object)
            return (<any>first).less(second);
        else
            return first < second;
    }

	export function hashCode(val: number): number;
	export function hashCode(str: string): number;
	export function hashCode(obj: Object): number;
	export function hashCode(par: any): number;
	
	export function hashCode(par: any): number
	{
		return base.Hash.code(par);
	}

	/**
	 * Incremental sequence of unique id allocated to Object.
	 */
	export var __s_iUID: number = 0;
}

(<any>Object).prototype.equals =
    function (obj): boolean 
    {
        return this == obj;
    };

(<any>Object).prototype.less =
    function (obj): boolean
    {
        return this.__get_m_iUID() < obj.__get_m_iUID();
    };

(<any>Object).prototype.hashCode =
    function (): number
    {
        return this.__get_m_iUID();
        //var str: string = JSON.stringify(this);
        //var val: number = 0;

        //for (var i: number = 0; i < str.length; i++)
        //    val += str.charCodeAt(i) * Math.pow(31, str.length - 1 - i);

        //return val;
    };

(<any>Object).prototype.__get_m_iUID =
	function (): number
	{
		if (this.__m_iUID == undefined)
            this.__m_iUID = ++std.__s_iUID;

        return this.__m_iUID;
	};