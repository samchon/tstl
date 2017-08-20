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
		 * The {@link IComparable.equals} method implements an equivalence relation on non-null object references:
		 * 
		 * <ul>
		 *	<li> 
		 *		It is <b>reflexive</b>: for any non-null reference value <code>x</code>, <code>x.equals(x)</code> 
		 *		should return <code>true</code>. 
		 *	</li>
		 *	<li> 
		 *		It is <b>symmetric</b>: for any non-null reference values <code>x</code> and <code>y</code>, 
		 *		<code>x.equals(y)</code> should return <code>true</code> if and only if <code>y.equals(x)</code> 
		 *		returns <code>true</code>. </li>
		 *	<li> 
		 *		It is <b>transitive</b>: for any non-null reference values <code>x</code>, <code>y</code>, and 
		 *		<code>z</code>, if <code>x.equals(y)</code> returns <code>true</code> and <code>y.equals(z)</code> 
		 *		returns <code>true</code>, then <code>x.equals(z)</code> should return <code>true</code>. 
		 *	</li>
		 *	<li> 
		 *		It is <b>consistent</b>: for any non-null reference values <code>x</code> and <code>y</code>, multiple 
		 *		invocations of <code>x.equals(y)</code> consistently return <code>true</code> or consistently return 
		 *		<code>false</code>, provided no information used in equals comparisons on the objects is modified. 
		 *	</li>
		 *	<li> 
		 *		For any non-null reference value <code>x</code>, <code>x.equals(null)</code> should return 
		 *		<code>false</code>.
		 *	</li>
		 * </ul>
		 * 
		 * The {@link IComparable.equals} method for interface {@link IComparable} implements the most discriminating possible 
		 * equivalence relation on objects; that is, for any non-null reference values <code>x</code> and 
		 * <code>y</code>, this method returns <code>true</code> if and only if <code>x</code> and <code>y</code> 
		 * refer to the same object (<code>x == y</code> has the value <code>true</code>).
		 * 
		 * Note that it is generally necessary to override the {@link IComparable.hashCode} method whenever this method is 
		 * overridden, so as to maintain the general contract for the {@link IComparable.hashCode} method, which states that 
		 * equal objects must have equal hash codes.
		 *
		 * - {@link IComparable.equals} is called by {@link equal_to}.
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
		 * as those provided by hash containers; {@link HashSet}, {@link HashMap}, {@link HashMultiSet} and 
		 * {@link HashMultiMap}.
		 *
		 * As much as is reasonably practical, the {@link IComparable.hashCode} method defined by interface 
		 * {@link IComparable} does return distinct integers for distinct objects. (This is typically implemented by 
		 * converting the internal address of the object into an integer, but this implementation technique is not 
		 * required by the JavaScript programming language.)
		 * 
		 * - {@link IComparable.hashCode} is called by {@link hash}.
		 * 
		 * @return An hash code who represents the object.
		 */
		hashCode?(): number;
	}
}