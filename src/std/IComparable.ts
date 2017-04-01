namespace std
{
	/**
	 * Comparable instance.
	 * 
	 * {@link IComparable} is a common interface for objects who can compare each other.
	 * 
	 * @reference https://docs.oracle.com/javase/7/docs/api/java/lang/Object.html
	 * @author Jeongho Nam <http://samchon.org>
	 */
	export interface IComparable<T>
		extends Object
	{
		/**
		 * Indicates whether some other object is &quot;equal to&quot; this one.
		 *
		 * The {@link equal_to} method implements an equivalence relation on non-null object references:
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
		 * The {@link equal_to} method for interface {@link IComparable} implements the most discriminating possible 
		 * equivalence relation on objects; that is, for any non-null reference values <code>x</code> and 
		 * <code>y</code>, this method returns <code>true</code> if and only if <code>x</code> and <code>y</code> 
		 * refer to the same object (<code>x == y</code> has the value <code>true</code>).
		 * 
		 * Note that it is generally necessary to override the {@link hash_code} method whenever this method is 
		 * overridden, so as to maintain the general contract for the {@link hash_code} method, which states that 
		 * equal objects must have equal hash codes.
		 *
		 * - {@link IComparable.equal_to} is called by {@link equal_to}.
		 * 
		 * @param obj the reference object with which to compare.
		 * 
		 * @return <code>true</code> if this object is the same as the obj argument; <code>false</code> otherwise.
		 */
		equals(obj: T): boolean;

		/**
		 * Less-than inequality comparison.
		 *
		 * Binary method returns whether the the instance compares less than the <i>obj</i>.
		 *
		 * <ul>
		 *	<li> 
		 *		{@link IComparable.less} is called by {@link less}. Also, this method can be used on standard 
		 *		algorithms such as {@link sort sort()}</code>, {@link merge merge()} or 
		 *		{@link TreeMap.lower_bound lower_bound()}. 
		 *	</li>
		 * </ul>
		 *
		 * @param obj the reference object with which to compare.
		 *
		 * @return Whether the first parameter is less than the second.
		 */
		less?(obj: T): boolean;

		/**
		 * Issue a hash code. 
		 * 
		 * Returns a hash code value for the object. This method is supported for the benefit of hash tables such 
		 * as those provided by hash containers; {@link HashSet}, {@link HashMap}, {@link MultiHashSet} and 
		 * {@link MultiHashMap}.
		 *
		 * As much as is reasonably practical, the {@link hash_code} method defined by interface 
		 * {@link IComparable} does return distinct integers for distinct objects. (This is typically implemented by 
		 * converting the internal address of the object into an integer, but this implementation technique is not 
		 * required by the JavaScript programming language.)
		 * 
		 * <ul>
		 *	<li> 
		 *		{@link IComparable.hash_code} is called by {@link hash_code}. If you want to keep basically 
		 *		provided hash function, then returns {@link Hash.code}; <code>return Hash.code(this);</code> 
		 *	</li>
		 * </ul>
		 * 
		 * @return An hash code who represents the object.
		 */
		hashCode?(): number;
	}
}