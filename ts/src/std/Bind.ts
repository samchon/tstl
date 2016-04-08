namespace std
{
    export class Bind<Listener extends Function, This extends Object>
    {
        protected func_: Listener;
        protected this_arg_: This;
		
        public constructor(func: Listener, thisArg: This)
        {
            this.func_ = func;
            this.this_arg_ = thisArg;
        }

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