/// <reference path="../API.ts" />

namespace std
{
	/**
	 * Bind function arguments.
	 * 
	 * Returns a function object based on <i>fn</i>, but with its arguments bound to <i>args</i>.
	 * 
	 * Each argument may either be bound to a value or be a {@link placeholders placeholder}:
	 * <ul>
	 *	<li> If bound to a value, calling the returned function object will always use that value as argument. </li>
	 *	<li> 
	 *		If a {@link placeholders placeholder}, calling the returned function object forwards an argument passed to the 
	 *		call (the one whose order number is specified by the placeholder). 
	 *	</li>
	 * </ul>
	 * 
	 * Calling the returned object returns the same type as fn.
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
	 * Bind function arguments.
	 * 
	 * Returns a function object based on <i>fn</i>, but with its arguments bound to <i>args</i>.
	 * 
	 * Each argument may either be bound to a value or be a {@link placeholders placeholder}:
	 * <ul>
	 *	<li> If bound to a value, calling the returned function object will always use that value as argument. </li>
	 *	<li> 
	 *		If a {@link placeholders placeholder}, calling the returned function object forwards an argument passed to the 
	 *		call (the one whose order number is specified by the placeholder). 
	 *	</li>
	 * </ul>
	 * 
	 * Calling the returned object returns the same type as fn.
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
					argArray[i] = args[(argArray[i] as placeholders.PlaceHolder).index() - 1];
			
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
 * Bind argument placeholders.
 * 
 * This namespace declares an unspecified number of objects: <i>_1</i>, <i>_2</i>, <i>_3</i>, ...</i>, which are 
 * used to specify placeholders in calls to function {@link bind}.
 * 
 * When the function object returned by bind is called, an argument with placeholder {@link _1} is replaced by the 
 * first argument in the call, {@link _2} is replaced by the second argument in the call, and so on... For example:
 *
 * <code>
 * let vec: Vector<number> = new Vector<number>();
 * 
 * let bind = bind(Vector.insert, _1, vec.end(), _2, _3);
 * bind.apply(vec, 5, 1); // vec.insert(vec.end(), 5, 1);
 * // [1, 1, 1, 1, 1]
 * </code>
 * 
 * When a call to {@link bind} is used as a subexpression in another call to <i>bind</i>, the {@link placeholders} 
 * are relative to the outermost {@link bind} expression.
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

		public index(): number
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