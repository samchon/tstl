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
    export function equals<T>(left: T, right: T): boolean
    {
        if (left instanceof Object)
            return (<any>left).equals(right);
        else
            return left == right;
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
    export function less<T>(left: T, right: T): boolean
    {
        if (left instanceof Object)
            return (<any>left).less(right);
        else
            return left < right;
    }

	export function hashCode(val: number): number;
	export function hashCode(str: string): number;
	export function hashCode(obj: Object): number;
	export function hashCode(par: any): number;
	
	export function hashCode(par: any): number
	{
		return base.hash.code(par);
	}

	/**
	 * Incremental sequence of unique id allocated to Object.
	 */
	export var __s_iUID: number = 0;
}

Object.defineProperties(Object.prototype,
{
	"__getUID":
	{
		value: function (): number
		{
			if (this.hasOwnProperty("__m_iUID") == false)
			{
				var uid: number = std.__s_iUID++;

				Object.defineProperty
				(
					this, "__m_iUID",
					{
						"get": function (): number
						{
							return uid;
						}
					}
				);
			}

			return this.__m_iUID;
		}
	}/*,

	"equals": 
	{
		value: function (obj): boolean 
		{
			return this == obj;
		}
	},

	"less":
	{
		value: function (obj): boolean
		{
			return this.__m_iUID < obj.__m_iUID;
		}
	},
	
	"hashCode":
	{
		value: function (obj): number
		{
			return this.__m_iUID;
		}
	}*/
});

(<any>Object).prototype.equals =
    function (obj): boolean 
    {
        return this == obj;
    };

(<any>Object).prototype.less =
    function (obj): boolean
    {
        return this.__getUID() < obj.__getUID();
    };

(<any>Object).prototype.hashCode =
    function (): number
    {
        return this.__getUID();
    };