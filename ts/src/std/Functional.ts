/// <reference path="API.ts" />

// Standard Template Library: Function objects
// Function objects are objects specifically designed to be used with a syntax similar to that of functions.
//
// They are typically used as arguments to functions, such as predicates or comparison functions passed to standard algorithms.
//
// @reference http://www.cplusplus.com/reference/functional/
// @author Jeongho Nam <http://samchon.org>

namespace std
{
	/**
	 * <p> Function object class for equality comparison. </p>
	 *
	 * <p> Binary function object class whose call returns whether its two arguments compare <i>equal</i> (as returned by 
	 * operator ==). </p>
	 *
	 * <p> Generically, function objects are instances of a class with member function {@link IComparable.equal_to equal_to}
	 * defined. This member function allows the object to be used with the same syntax as a function call. </p>
	 *
	 * @param x First element to compare.
	 * @param y Second element to compare.
	 *
	 * @return Whether the arguments are equal.
	 */
	export function equal_to<T>(x: T, y: T): boolean
	{
		if (x instanceof Object && (<any>x).equal_to != undefined)
			return (<any>x).equal_to(y);
		else
			return x == y;
	}

	/**
	 * <p> Function object class for non-equality comparison. </p>
	 * 
	 * <p> Binary function object class whose call returns whether its two arguments compare <i>not equal</i> (as returned 
	 * by operator operator!=). </p>
	 * 
	 * <p> Generically, function objects are instances of a class with member function {@link IComparable.equal_to equal_to} 
	 * defined. This member function allows the object to be used with the same syntax as a function call. </p>
	 *
	 * @param x First element to compare.
	 * @param y Second element to compare.
	 *
	 * @return Whether the arguments are not equal.
	 */
	export function not_equal_to<T>(x: T, y: T): boolean
	{
		return !std.equal_to(x, y);
	}

	/**
	 * <p> Function for less-than inequality comparison. </p>
	 *
	 * <p> Binary function returns whether the its first argument compares less than the second. </p>
	 *
	 * <p> Generically, function objects are instances of a class with member function {@link IComparable.less less} 
	 * defined. If an object doesn't have the method, then its own uid will be used to compare insteadly. 
	 * This member function allows the object to be used with the same syntax as a function call. </p>
	 * 
	 * <p> Objects of this class can be used on standard algorithms such as {@link sort sort()}</code>, 
	 * {@link merge merge()} or {@link TreeMap.lower_bound lower_bound()}. </p>
	 *
	 * @param <T> Type of arguments to compare by the function call. The type shall supporrt the operation 
	 *			  <i>operator<()</i> or method {@link IComparable.less less}.
	 *
	 * @param x First element, the standard of comparison.
	 * @param y Second element compare with the first.
	 *
	 * @return Whether the first parameter is less than the second.
	 */
	export function less<T>(x: T, y: T): boolean
	{
		if (x instanceof Object)
			if ((<any>x).less != undefined) // has less()
				return (<any>x).less(y);
			else
				return (<any>x).__get_m_iUID() < (<any>y).__get_m_iUID();
		else
			return x < y;
	}

	/**
	 * <p> Function object class for less-than-or-equal-to comparison. </p>
	 * 
	 * <p> Binary function object class whose call returns whether the its first argument compares {@link less less than} or 
	 * {@link equal_to equal to} the second (as returned by operator <=). </p>
	 * 
	 * <p> Generically, <i>function objects</i> are instances of a class with member function {@link IComparable.less less} 
	 * and {@link IComparable.equal_to equal_to} defined. This member function allows the object to be used with the same 
	 * syntax as a function call. </p>
	 * 
	 * @param x First element, the standard of comparison.
	 * @param y Second element compare with the first.
	 * 
	 * @return Whether the <i>x</i> is {@link less less than} or {@link equal_to equal to} the <i>y</i>.
	 */
	export function less_equal<T>(x: T, y: T): boolean
	{
		return std.less(x, y) || std.equal_to(x, y);
	}

	/**
	 * <p> Function for greater-than inequality comparison. </p>
	 *
	 * <p> Binary function returns whether the its first argument compares greater than the second. </p>
	 *
	 * <p> Generically, function objects are instances of a class with member function {@link less} and
	 * {@link equal_to equal_to()} defined. If an object doesn't have those methods, then its own uid will be used
	 * to compare insteadly. This member function allows the object to be used with the same syntax as a function 
	 * call. </p>
	 * 
	 * <p> Objects of this class can be used on standard algorithms such as {@link sort sort()}, 
	 * {@link merge merge()} or {@link TreeMap.lower_bound lower_bound()}. </p>
	 *
	 * @param <T> Type of arguments to compare by the function call. The type shall supporrt the operation 
	 *			  <i>operator>()</i> or method {@link IComparable.greater greater}.
	 * 
	 * @return Whether the <i>x</i> is greater than the <i>y</i>.
	 */
	export function greater<T>(x: T, y: T): boolean
	{
		return !std.less_equal(x, y);
	}

	/**
	 * <p> Function object class for greater-than-or-equal-to comparison. </p>
	 * 
	 * <p> Binary function object class whose call returns whether the its first argument compares 
	 * {@link greater greater than} or {@link equal_to equal to} the second (as returned by operator >=). </p>
	 * 
	 * <p> Generically, function objects are instances of a class with member function {@link IComparable.less less}
	 * defined. If an object doesn't have the method, then its own uid will be used to compare insteadly.
	 * This member function allows the object to be used with the same syntax as a function call. </p>
	 * 
	 * @param x First element, the standard of comparison.
	 * @param y Second element compare with the first.
	 * 
	 * @return Whether the <i>x</i> is {@link greater greater than} or {@link equal_to equal to} the <i>y</i>.
	 */
	export function greater_equal<T>(x: T, y: T): boolean
	{
		return !std.less(x, y);
	}

	/**
	 * <p> Logical AND function object class. </p>
	 * 
	 * <p> Binary function object class whose call returns the result of the <i>logical "and"</i> operation between its two 
	 * arguments (as returned by operator &&). </p>
	 * 
	 * <p> Generically, function objects are instances of a class with member function operator() defined. This member 
	 * function allows the object to be used with the same syntax as a function call. </p>
	 * 
	 * @param x First element.
	 * @param y Second element.
	 * 
	 * @return Result of logical AND operation.
	 */
	export function logical_and<T>(x: T, y: T): boolean
	{
		return <any>x && <any>y;
	}

	/**
	 * <p> Logical OR function object class. </p>
	 * 
	 * <p> Binary function object class whose call returns the result of the <i>logical "or"</i> operation between its two 
	 * arguments (as returned by operator ||). </p>
	 * 
	 * <p> Generically, function objects are instances of a class with member function operator() defined. This member 
	 * function allows the object to be used with the same syntax as a function call. </p>
	 * 
	 * @param x First element.
	 * @param y Second element.
	 * 
	 * @return Result of logical OR operation.
	 */
	export function logical_or<T>(x: T, y: T): boolean
	{
		return <any>x || <any>y;
	}

	/**
	 * <p> Logical NOT function object class. </p>
	 * 
	 * <p> Unary function object class whose call returns the result of the <i>logical "not"</i> operation on its argument 
	 * (as returned by operator !). </p>
	 * 
	 * <p> Generically, function objects are instances of a class with member function operator() defined. This member 
	 * function allows the object to be used with the same syntax as a function call. </p>
	 * 
	 * @param x Target element.
	 *
	 * @return Result of logical NOT operation.
	 */
	export function logical_not<T>(x: T): boolean
	{
		return !<any>x;
	}

	/**
	 * <p> Bitwise AND function object class. </p>
	 * 
	 * <p> Binary function object class whose call returns the result of applying the <i>bitwise "and"</i> operation between 
	 * its two arguments (as returned by operator &). </p>
	 * 
	 * @param x First element.
	 * @param y Second element.
	 * 
	 * @return Result of bitwise AND operation.
	 */
	export function bit_and(x: number, y: number): number
	{
		return x & y;
	}

	/**
	 * <p> Bitwise OR function object class. </p>
	 * 
	 * <p> Binary function object class whose call returns the result of applying the <i>bitwise "and"</i> operation between 
	 * its two arguments (as returned by operator &). </p>
	 * 
	 * @param x First element.
	 * @param y Second element.
	 * 
	 * @return Result of bitwise OR operation.
	 */
	export function bit_or(x: number, y: number): number
	{
		return x | y;
	}

	/**
	 * <p> Bitwise XOR function object class. </p>
	 * 
	 * <p> Binary function object class whose call returns the result of applying the <i>bitwise "exclusive or"</i> 
	 * operation between its two arguments (as returned by operator ^). </p>
	 * 
	 * @param x First element.
	 * @param y Second element.
	 * 
	 * @return Result of bitwise XOR operation.
	 */
	export function bit_xor(x: number, y: number): number
	{
		return x ^ y;
	}

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
	 * <p> Default hash function for number. </p>
	 * 
	 * <p> Unary function that defines the default hash function used by the standard library. </p>
	 * 
	 * <p> The functional call returns a hash value of its argument: A hash value is a value that depends solely on 
	 * its argument, returning always the same value for the same argument (for a given execution of a program). The 
	 * value returned shall have a small likelihood of being the same as the one returned for a different argument.
	 * </p>
	 * 
	 * @param val Value to be hashed.
	 * 
	 * @return Returns a hash value for its argument, as a value of type number. The number is an unsigned integer.
	 */
	export function hash(val: number): number;

	/**
	 * <p> Default hash function for string. </p>
	 * 
	 * <p> Unary function that defines the default hash function used by the standard library. </p>
	 * 
	 * <p> The functional call returns a hash value of its argument: A hash value is a value that depends solely on 
	 * its argument, returning always the same value for the same argument (for a given execution of a program). The 
	 * value returned shall have a small likelihood of being the same as the one returned for a different argument.
	 * </p>
	 * 
	 * @param str A string to be hashed.
	 * 
	 * @return Returns a hash value for its argument, as a value of type number. The number is an unsigned integer.
	 */
	export function hash(str: string): number;

	/**
	 * <p> Default hash function for Object. </p>
	 * 
	 * <p> Unary function that defines the default hash function used by the standard library. </p>
	 * 
	 * <p> The functional call returns a hash value of its argument: A hash value is a value that depends solely on 
	 * its argument, returning always the same value for the same argument (for a given execution of a program). The 
	 * value returned shall have a small likelihood of being the same as the one returned for a different argument.
	 * </p>
	 * 
	 * <p> The default {@link hash} function of Object returns a value returned from {@link hash hash(number)} with 
	 * an <b>unique id</b> of each Object. If you want to specify {@link hash} function of a specific class, then
	 * define a member function <code>public hash(): number</code> in the class. </p>
	 * 
	 * @param obj Object to be hashed.
	 * 
	 * @return Returns a hash value for its argument, as a value of type number. The number is an unsigned integer.
	 */
	export function hash(obj: Object): number;
	
	export function hash(par: any): number
	{
		let type: string = typeof par;

		if (type == "number")
			return hash_of_number(par);
		else if (type == "string")
			return hash_of_string(par);
		else
			return hash_of_object(par);
	}

	/**
	 * @hidden
	 */
	function hash_of_number(val: number): number
	{
		// ------------------------------------------
		//	IN C++
		//		CONSIDER A NUMBER AS A STRING
		//		HASH<STRING>((CHAR*)&VAL, 8)
		// ------------------------------------------
		// CONSTRUCT BUFFER AND BYTE_ARRAY
		let buffer: ArrayBuffer = new ArrayBuffer(8);
		let byteArray: Int8Array = new Int8Array(buffer);
		let valueArray: Float64Array = new Float64Array(buffer);

		valueArray[0] = val;

		let code: number = 2166136261;
		
		for (let i: number = 0; i < byteArray.length; i++)
		{
			let byte = (byteArray[i] < 0) ? byteArray[i] + 256 : byteArray[i];

			code ^= byte;
			code *= 16777619;
		}
		return Math.abs(code);
	}

	/**
	 * @hidden
	 */
	function hash_of_string(str: string): number
	{
		let code: number = 2166136261;

		for (let i: number = 0; i < str.length; i++)
		{
			code ^= str.charCodeAt(i);
			code *= 16777619;
		}
		return Math.abs(code);
	}

	/**
	 * @hidden
	 */
	function hash_of_object(obj: Object): number
	{
		if ((<any>obj).hash != undefined)
			return (<any>obj).hash();
		else
			return hash_of_number((<any>obj).__get_m_iUID());
	}

	/* ---------------------------------------------------------
		UNIQUE ID FOR OBJECTS
	--------------------------------------------------------- */
	// Incremental sequence of unique id for objects.
	/**
	 * @hidden
	 */
	var __s_iUID: number

	if (__s_iUID == undefined)
		__s_iUID = 0;

	if (Object.prototype.hasOwnProperty("__get_m_iUID") == false)
	{
		Object.defineProperties(Object.prototype,
			{
				"__get_m_iUID":
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

	/* ---------------------------------------------------------
		SWAP
	--------------------------------------------------------- */
	/**
	 * <p> Exchange contents of {@link IContainers containers}. </p>
	 * 
	 * <p> The contents of container <i>left</i> are exchanged with those of <i>right</i>. Both container objects must have 
	 * same type of elements (same template parameters), although sizes may differ. </p>
	 * 
	 * <p> After the call to this member function, the elements in <i>left</i> are those which were in <i>right</i> before 
	 * the call, and the elements of <i>right</i> are those which were in <i>left</i>. All iterators, references and 
	 * pointers remain valid for the swapped objects. </p>
	 *
	 * <p> This is an overload of the generic algorithm swap that improves its performance by mutually transferring 
	 * ownership over their assets to the other container (i.e., the containers exchange references to their data, without 
	 * actually performing any element copy or movement): It behaves as if <i>left</i>. 
	 * {@link IContainer.swap swap}(<i>right</i>) was called. </p>
	 * 
	 * @param left A {@link IContainer container} to swap its contents.
	 * @param right A {@link IContainer container} to swap its contents.
	 */
	export function swap<T>
		(left: base.IContainer<T>, right: base.IContainer<T>): void;

	/**
	 * <p> Exchange contents of queues. </p>
	 * 
	 * <p> Exchanges the contents of <i>left</i> and <i>right</i>. </p>
	 * 
	 * @param left A {@link Queue} container of the same type. Size may differ.
	 * @param right A {@link Queue} container of the same type. Size may differ.
	 */
	export function swap<T>
		(left: Queue<T>, right: Queue<T>): void;

	/**
	 * <p> Exchange contents of {@link PriorityQueue PriorityQueues}. </p>
	 * 
	 * <p> Exchanges the contents of <i>left</i> and <i>right</i>. </p>
	 * 
	 * @param left A {@link PriorityQueue} container of the same type. Size may differ.
	 * @param right A {@link PriorityQueue} container of the same type. Size may differ.
	 */
	export function swap<T>
		(left: PriorityQueue<T>, right: PriorityQueue<T>): void;

	/**
	 * <p> Exchange contents of {@link Stack Stacks}. </p>
	 * 
	 * <p> Exchanges the contents of <i>left</i> and <i>right</i>. </p>
	 * 
	 * @param left A {@link Stack} container of the same type. Size may differ.
	 * @param right A {@link Stack} container of the same type. Size may differ.
	 */
	export function swap<T>
		(left: Stack<T>, right: Stack<T>): void;

	/**
	 * <p> Exchanges the contents of two {@link UniqueMap unique maps}. </p>
	 * 
	 * <p> The contents of container <i>left</i> are exchanged with those of <i>right</i>. Both container objects must 
	 * be of the same type (same template parameters), although sizes may differ. </p>
	 * 
	 * <p> After the call to this member function, the elements in <i>left</i> are those which were in <i>right</i> 
	 * before the call, and the elements of <i>right</i> are those which were in <i>left</i>. All iterators, references 
	 * and pointers remain valid for the swapped objects. </p>
	 * 
	 * <p> This is an overload of the generic algorithm swap that improves its performance by mutually transferring 
	 * ownership over their assets to the other container (i.e., the containers exchange references to their data, 
	 * without actually performing any element copy or movement): It behaves as if 
	 * <i>left</i>.{@link UniqueMap.swap swap}(<i>right</i>) was called. </p>
	 * 
	 * @param left An {@link UniqueMap unique map} to swap its conents.
	 * @param right An {@link UniqueMap unique map} to swap its conents.
	 */
	export function swap<Key, T>
		(left: base.UniqueMap<Key, T>, right: base.UniqueMap<Key, T>): void;

	/**
	 * <p> Exchanges the contents of two {@link MultiMap multi maps}. </p>
	 * 
	 * <p> The contents of container <i>left</i> are exchanged with those of <i>right</i>. Both container objects must 
	 * be of the same type (same template parameters), although sizes may differ. </p>
	 * 
	 * <p> After the call to this member function, the elements in <i>left</i> are those which were in <i>right</i> 
	 * before the call, and the elements of <i>right</i> are those which were in <i>left</i>. All iterators, references 
	 * and pointers remain valid for the swapped objects. </p>
	 * 
	 * <p> This is an overload of the generic algorithm swap that improves its performance by mutually transferring 
	 * ownership over their assets to the other container (i.e., the containers exchange references to their data, 
	 * without actually performing any element copy or movement): It behaves as if 
	 * <i>left</i>.{@link MultiMap.swap swap}(<i>right</i>) was called. </p>
	 * 
	 * @param left A {@link MultiMap multi map} to swap its conents.
	 * @param right A {@link MultiMap multi map} to swap its conents.
	 */
	export function swap<Key, T>
		(left: base.MultiMap<Key, T>, right: base.MultiMap<Key, T>): void;

	export function swap(left: any, right: any)
	{
		left.swap(right);
	}
}

namespace std
{
	/* ---------------------------------------------------------
		BINDING
	--------------------------------------------------------- */
	/**
	 * <p> Bind function arguments. </p>
	 * 
	 * <p> Returns a function object based on <i>fn</i>, but with its arguments bound to <i>args</i>. </p>
	 * 
	 * <p> Each argument may either be bound to a value or be a {@link placeholders placeholder}: </p>
	 * <ul>
	 *	<li> If bound to a value, calling the returned function object will always use that value as argument. </li>
	 *	<li> 
	 *		If a {@link placeholders placeholder}, calling the returned function object forwards an argument passed to the 
	 *		call (the one whose order number is specified by the placeholder). 
	 *	</li>
	 * </ul>
	 * 
	 * <p> Calling the returned object returns the same type as fn. </p>
	 * 
	 * @param fn A function object, pointer to function or pointer to member.
	 * @param args List of arguments to bind: either values, or {@link placeholders}.
	 * 
	 * @return A function object that, when called, calls <i>fn</i> with its arguments bound to <i>args</i>. If <i>fn</i> is 
	 *		   a pointer to member, the first argument expected by the returned function is an object of the class <i>fn</i> 
	 *		   is a member.
	 */
	export function bind<Ret>
		(fn: (...args: any[]) => Ret, ...args: any[]): (...args: any[]) => Ret;

	/**
	 * <p> Bind function arguments. </p>
	 * 
	 * <p> Returns a function object based on <i>fn</i>, but with its arguments bound to <i>args</i>. </p>
	 * 
	 * <p> Each argument may either be bound to a value or be a {@link placeholders placeholder}: </p>
	 * <ul>
	 *	<li> If bound to a value, calling the returned function object will always use that value as argument. </li>
	 *	<li> 
	 *		If a {@link placeholders placeholder}, calling the returned function object forwards an argument passed to the 
	 *		call (the one whose order number is specified by the placeholder). 
	 *	</li>
	 * </ul>
	 * 
	 * <p> Calling the returned object returns the same type as fn. </p>
	 * 
	 * @param fn A function object, pointer to function or pointer to member.
	 * @param thisArg This argument, owner object of the member method <i>fn</i>.
	 * @param args List of arguments to bind: either values, or {@link placeholders}.
	 * 
	 * @return A function object that, when called, calls <i>fn</i> with its arguments bound to <i>args</i>. If <i>fn</i> is 
	 *		   a pointer to member, the first argument expected by the returned function is an object of the class <i>fn</i> 
	 *		   is a member.
	 */
	export function bind<Ret, T>
		(fn: (...args: any[]) => Ret, thisArg: T, ...args: any[]): (...args: any[]) => Ret;

	export function bind<Ret>
		(fn: (...args: any[]) => Ret, ...args: any[]): (...args: any[]) => Ret
	{
		var this_arg: Object = null;
		var parameters: any[] = [];
		var placeholder_count: number = 0;

		for (let i: number = 0; i < args.length; i++)
		{
			if (i == 0 && args[0] instanceof Object && args[0] instanceof placeholders.PlaceHolder == false)
			{
				// retrieve the object; items[0]
				for (let key in args[0])
					if (args[0][key] == fn)
					{
						// found the this_arg
						this_arg = args[0];
						break;
					}
				if (this_arg != null)
					continue;
			}

			// the placeholder also fills parameters
			if (args[i] instanceof placeholders.PlaceHolder)
				placeholder_count++;
			parameters.push(args[i]);
		}
		
		////////////////////
		// FUNCTION TO BE RETURNED
		////////////////////
		let ret = function (...args: any[]): Ret
		{
			if (args.length == 0)
				return fn.apply(this_arg, parameters);
			
			let thisArg: Object = this_arg;
			let argArray: any[] = parameters.slice();

			// 1st argument is thisArg?
			if (thisArg == null && (parameters.length == 0 || parameters[0] instanceof placeholders.PlaceHolder) && args[0] instanceof Object)
				for (let key in args[0])
					if (args[0][key] == fn)
					{
						thisArg = args[0];

						argArray.splice(0, 1);
						//lastIndex++;

						break;
					}

			// fill argArray from placeholders
			for (let i: number = 0; i < argArray.length; i++)
				if (argArray[i] instanceof placeholders.PlaceHolder)
					argArray[i] = args[argArray[i].index - 1];
			
			// arguments are over the placeholder_count 
			if (args.length > placeholder_count)
				for (let i: number = placeholder_count; i < args.length; i++)
					if (i == 0 && (this_arg == null && thisArg != null))
						continue; // thisArg
					else
						argArray.push(args[i]);

			return fn.apply(thisArg, argArray);
		};
		return ret;
	}
}

/**
 * <p> Bind argument placeholders. </p>
 * 
 * <p> This namespace declares an unspecified number of objects: <i>_1</i>, <i>_2</i>, <i>_3</i>, ...</i>, which are 
 * used to specify placeholders in calls to function {@link std.bind}. </p>
 * 
 * <p> When the function object returned by bind is called, an argument with placeholder {@link _1} is replaced by the 
 * first argument in the call, {@link _2} is replaced by the second argument in the call, and so on... For example: </p>
 *
 * <code>
 * let vec: Vector<number> = new Vector<number>();
 * 
 * let bind = std.bind(Vector.insert, _1, vec.end(), _2, _3);
 * bind.apply(vec, 5, 1); // vec.insert(vec.end(), 5, 1);
 * // [1, 1, 1, 1, 1]
 * </code>
 * 
 * <p> When a call to {@link bind} is used as a subexpression in another call to <i>bind</i>, the {@link placeholders} 
 * are relative to the outermost {@link bind} expression. </p>
 *
 * @reference http://www.cplusplus.com/reference/functional/placeholders/
 * @author Jeongho Nam <http://samchon.org> 
 */
namespace std.placeholders
{
	/**
	 * @hidden
	 */
	export class PlaceHolder
	{
		private index_: number;

		public constructor(index: number)
		{
			this.index_ = index;
		}

		public get index(): number
		{
			return this.index_;
		}
	}

	/**
	 * Replaced by the first argument in the function call.
	 */
	export const _1: PlaceHolder = new PlaceHolder(1);

	/**
	 * Replaced by the second argument in the function call.
	 */
	export const _2: PlaceHolder = new PlaceHolder(2);

	/**
	 * Replaced by the third argument in the function call.
	 */
	export const _3: PlaceHolder = new PlaceHolder(3);

	export const _4: PlaceHolder = new PlaceHolder(4);
	export const _5: PlaceHolder = new PlaceHolder(5);
	export const _6: PlaceHolder = new PlaceHolder(6);
	export const _7: PlaceHolder = new PlaceHolder(7);
	export const _8: PlaceHolder = new PlaceHolder(8);
	export const _9: PlaceHolder = new PlaceHolder(9);
	export const _10: PlaceHolder = new PlaceHolder(10);
	export const _11: PlaceHolder = new PlaceHolder(11);
	export const _12: PlaceHolder = new PlaceHolder(12);
	export const _13: PlaceHolder = new PlaceHolder(13);
	export const _14: PlaceHolder = new PlaceHolder(14);
	export const _15: PlaceHolder = new PlaceHolder(15);
	export const _16: PlaceHolder = new PlaceHolder(16);
	export const _17: PlaceHolder = new PlaceHolder(17);
	export const _18: PlaceHolder = new PlaceHolder(18);
	export const _19: PlaceHolder = new PlaceHolder(19);
	export const _20: PlaceHolder = new PlaceHolder(20);
}