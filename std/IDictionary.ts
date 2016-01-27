/// <reference path="IMap.ts" />

namespace std
{
    /**
     * <p> An interface of a dictionary. </p>
     * <ul>
     *  <li> _Ty: Type of the mapped value. Each element in a map stores some data as its mapped value. </li>
     * </ul>
     * 
     * @author Jeongho Nam
     */
    export type IDictionary<_Ty> = IMap<string, _Ty>;
}