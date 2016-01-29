namespace std
{
    export interface IObject
        extends Object
    {
        equals(obj: IObject): boolean;

        less(obj: IObject): boolean;

        hashCode(): number;
    }

    export function equals<T>(val1: T, val2: T): boolean
    {
        if (val1 instanceof Object)
            return (<any>val1).equals(val2);
        else
            return val1 == val2;
    }

    /**
     * <p> for less-than inequality comparison. </p>
     *
     * <p> Binary function object class whose call returns whether the its first argument compares less than 
     * the second. </p>
     *
     * <p> Objects of this class can be used on standard algorithms such as <code>sort</code>, <code>merge</code>. </p>
     *
     * @param val1 First element, the standard of comparison.
     * @param val2 Second element compare with the first.
     *
     * @return Whether the first parameter is less than the second.
     */
    export function less<T>(val1: T, val2: T): boolean
    {
        if (val1 instanceof Object)
            return (<any>val1).less(val2);
        else
            return val1 < val2;
    }

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