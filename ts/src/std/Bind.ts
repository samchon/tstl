namespace std
{
	/**
	 * Bind function arguments.
	 * 
	 * @author Jeongho Nam <http://samchon.org>
	 */
    export class Bind<Listener extends Function, This extends Object>
    {
		/**
		 *
		 */
		protected func_: Listener;
		
		/**
		 *
		 */
		protected this_arg_: This;
		
		/**
		 * Construct from function and this argument.
		 * 
		 * @param func
		 * @param this_arg
		 */
		public constructor(func: Listener, this_arg: This)
		{
			this.func_ = func;
			this.this_arg_ = this_arg;
		}

		/**
		 * 
		 * @param args
		 */
		public apply(...args: any[]): any
		{
			return this.func_.apply(this.this_arg_, args);
		}

		public equals<U extends Listener, T extends This>(obj: Bind<U, T>): boolean
		{
			return this.func_ == obj.func_ && this.this_arg_ == obj.this_arg_;
		}
	}
}