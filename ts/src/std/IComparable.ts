namespace std
{
	/**
	 * <p> Comparable instance. </p>
	 * 
	 * <p> {@link IComparable} is a common interface for objects who can compare each other. </p>
	 * 
	 * @reference https://docs.oracle.com/javase/7/docs/api/java/lang/Object.html
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface IComparable<T> 
		extends Object
	{
		/**
		 * <p> Indicates whether some other object is &quot;equal to&quot; this one. </p>
		 *
		 * <p> The {@link equal_to} method implements an equivalence relation on non-null object references: </p>
		 * 
		 * <ul>
		 *	<li> 
		 *		It is <b>reflexive</b>: for any non-null reference value <code>x</code>, <code>x.equal_to(x)</code> 
		 *		should return <code>true</code>. 
		 *	</li>
		 *	<li> 
		 *		It is <b>symmetric</b>: for any non-null reference values <code>x</code> and <code>y</code>, 
		 *		<code>x.equal_to(y)</code> should return <code>true</code> if and only if <code>y.equal_to(x)</code> 
		 *		returns <code>true</code>. </li>
		 *	<li> 
		 *		It is <b>transitive</b>: for any non-null reference values <code>x</code>, <code>y</code>, and 
		 *		<code>z</code>, if <code>x.equal_to(y)</code> returns <code>true</code> and <code>y.equal_to(z)</code> 
		 *		returns <code>true</code>, then <code>x.equal_to(z)</code> should return <code>true</code>. 
		 *	</li>
		 *	<li> 
		 *		It is <b>consistent</b>: for any non-null reference values <code>x</code> and <code>y</code>, multiple 
		 *		invocations of <code>x.equal_to(y)</code> consistently return <code>true</code> or consistently return 
		 *		<code>false</code>, provided no information used in equal_to comparisons on the objects is modified. 
		 *	</li>
		 *	<li> 
		 *		For any non-null reference value <code>x</code>, <code>x.equal_to(null)</code> should return 
		 *		<code>false</code>.
		 *	</li>
		 * </ul>
		 * 
		 * <p> The {@link equal_to} method for interface {@link IComparable} implements the most discriminating possible 
		 * equivalence relation on objects; that is, for any non-null reference values <code>x</code> and 
		 * <code>y</code>, this method returns <code>true</code> if and only if <code>x</code> and <code>y</code> 
		 * refer to the same object (<code>x == y</code> has the value <code>true</code>). </p>
		 * 
		 * <p> Note that it is generally necessary to override the {@link hash_code} method whenever this method is 
		 * overridden, so as to maintain the general contract for the {@link hash_code} method, which states that 
		 * equal objects must have equal hash codes. </p>
		 *
		 * <ul>
		 *	<li> {@link IComparable.equal_to} is called by {@link std.equal_to}. </li>
		 * </ul>
		 * 
		 * @param obj the reference object with which to compare.
		 * 
		 * @return <code>true</code> if this object is the same as the obj argument; <code>false</code> otherwise.
		 */
		equal_to(obj: T): boolean;

		/**
		 * <p> Less-than inequality comparison. </p>
		 *
		 * <p> Binary method returns whether the the instance compares less than the <i>obj</i>. </p>
		 *
		 * <ul>
		 *	<li> 
		 *		{@link IComparable.less} is called by {@link std.less}. Also, this method can be used on standard 
		 *		algorithms such as {@link sort sort()}</code>, {@link merge merge()} or 
		 *		{@link TreeMap.lower_bound lower_bound()}. 
		 *	</li>
		 * </ul>
		 *
		 * @param obj the reference object with which to compare.
		 *
		 * @return Whether the first parameter is less than the second.
		 */
		less(obj: T): boolean;

		/**
		 * <p> Issue a hash code. </p> 
		 * 
		 * <p> Returns a hash code value for the object. This method is supported for the benefit of hash tables such 
		 * as those provided by hash containers; {@link HashSet}, {@link HashMap}, {@link MultiHashSet} and 
		 * {@link MultiHashMap}. </p>
		 *
		 * <p> As much as is reasonably practical, the {@link hash_code} method defined by interface 
		 * {@link IComparable} does return distinct integers for distinct objects. (This is typically implemented by 
		 * converting the internal address of the object into an integer, but this implementation technique is not 
		 * required by the JavaScript programming language.) </p>
		 * 
		 * <ul>
		 *	<li> 
		 *		{@link IComparable.hash_code} is called by {@link std.hash_code}. If you want to keep basically 
		 *		provided hash function, then returns {@link std.Hash.code}; <code>return std.Hash.code(this);</code> 
		 *	</li>
		 * </ul>
		 * 
		 * @return An hash code who represents the object.
		 */
		hash(): number;
	}

	/**
	 * Default hash function.
	 * 
	 * @param obj
	 */
	export function hash(obj: any): number
	{
		return base.code(obj);
	}

	/**
	 * Incremental sequence of unique id for objects.
	 */
	var __s_iUID: number = 0;

	Object.defineProperties(Object.prototype,
	{
		"__getUID":
		{
			value: function (): number
			{
				if (this.hasOwnProperty("__m_iUID") == false)
				{
					var uid: number = ++__s_iUID;

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
		}
	});
}