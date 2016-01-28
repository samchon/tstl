/// <reference path="Object.ts" />

/// <reference path="Hash.ts" />

namespace std
{
    /**
     * <p> A pair of values. </p>
     * <ul>
     *  <li> _Ty1: Type of member fisrt. </li>
     *  <li> _Ty2 Type of member second. </li>
     * </ul>
     *
     * <p> This class couples together a pair of values, which may be of different types 
     * (_Ty1 and _Ty2). The individual values can be accessed through its public members 
     * first and second. </p>
     *
     * <p> Same with std::pair (http://www.cplusplus.com/reference/utility/pair/) </p>
     *
     * @author Jeongho Nam
     */
    export class Pair<T1, T2>
    {
	    /**
	     * <p> A first value in the Pair. </p>
	     */
	    public first: T1;

	    /**
	     * <p> A second value in the Pair. </p>
	     */
	    public second: T2;

        /* ---------------------------------------------------------
		    CONSTRUCTORS
	    --------------------------------------------------------- */
	    /**
	     * <p> Construct from pair values. </p>
	     *
	     * @param first The first value of the Pair
	     * @param second The second value of the Pair
	     */
	    public constructor(first: T1, second: T2)
	    {
		    this.first = first;
		    this.second = second;
	    }
	
        /* ---------------------------------------------------------
		    COMPARISON
	    --------------------------------------------------------- */
	    /**
	     * <p> Whether a Pair is equal with the Pair. <p>
	     * <p> Compare each first and second value of two Pair(s) and returns whether they are equal or not. </p>
	     * 
	     * <p> If stored key and value in a Pair are not number or string but an object like a class or struct, 
	     * the comparison will be executed by a member method (SomeObject)::equals(). If the object does not have 
	     * the member method equals(), only address of pointer will be compared. </p>
	     *
	     * @param obj A Map to compare
	     * @return Indicates whether equal or not.
	     */
	    public equals<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean
	    {
		    return std.equals(this.first, pair.first) && std.equals(this.second, pair.second);
	    }

        public less<U1 extends T1, U2 extends T2>(pair: Pair<U1, U2>): boolean
        {
            if (std.equals(this.first, pair.first) == false)
                return std.less(this.first, pair.first);
            else
                return std.less(this.second, pair.second);
        }

        public hashCode(): number
        {
            return Hash.code(this.first) + Hash.code(this.second);
        }
    }  
}