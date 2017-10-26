/// <reference path="../API.ts" />

namespace std
{
	export function bind<Ret>
		(fn: (...args: any[]) => Ret, ...args: any[]): (...args: any[]) => Ret;

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

	export const _1: PlaceHolder = new PlaceHolder(1);

	export const _2: PlaceHolder = new PlaceHolder(2);

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