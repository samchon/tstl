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
}

var __s_uid: number = 0;

//Object.prototype["__uid"] = ++__s_uid;

Object.prototype["equals"] =
    function (obj): boolean 
    {
        return this == obj;
    }

Object.prototype["less"] =
    function (obj): boolean
    {
        return this.__getUID() < obj.__getUID();
    }

Object.prototype["hasCode"] =
    function (): number
    {
        return this.__getUID();
        //var str: string = JSON.stringify(this);
        //var val: number = 0;

        //for (var i: number = 0; i < str.length; i++)
        //    val += str.charCodeAt(i) * Math.pow(31, str.length - 1 - i);

        //return val;
    }

Object.prototype["__getUID"] =
    function (): number
    {
        if (this.hasOwnProperty("__uid") == false)
            this.__uid = ++__s_uid;

        return this.__uid;
    }