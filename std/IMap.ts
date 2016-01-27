namespace std 
{
    /**
     * An interface of a map.
     * 
     * @taram K Type of the keys. Each element in a map is uniquely identified by its key value.
     * @tparam T Type of the mapped value. Each element in a map stores some data as its mapped value.
     *
     * @author Jeongho Nam
     */
    export interface IMap<K, T> 
    {
	    /**
	     * <p> Whether have the item or not. </p>
	     * <p> Indicates whether a map has an item having the specified identifier. </p>
	     *
	     * @param key Key value of the element whose mapped value is accessed.
	     * @return Whether the map has an item having the specified identifier.
	     */
        has(key: K): boolean;

	    /**
	     * <p> Get element by key. </p>
	     * <p> Returns a reference to the mapped value of the element identified with key. </p>
	     *
	     * @param key Key value of the element whose mapped value is accessed.
	     * @throw exception out of range.
	     *
	     * @return A reference object of the mapped value (_Ty)
	     */
        get(key: K): T;

	    /**
	     * <p> Set element. </p>
	     *
	     * @param key Key value of the element whose mapped value is accessed.
	     * @param val Value, the item.
	     */
        //set(key: _Kty, value: _Ty): void;

        /**
	     * <p> Erase an element. </p>
	     * <p> Removes an element by its key(identifier) from the Map container. </p>
	     *
	     * @param key Key of the element to be removed from the Map.
	     * @throw exception out of range.
	     */
        //erase(key: _Kty): void;
    }
}
