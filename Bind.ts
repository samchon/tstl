namespace std
{
    export class Bind<Listener extends Function, This extends Object>
    {
        protected func: Listener;
        protected thisArg: This;

        public constructor(func: Listener, thisArg: This)
        {
            this.func = func;
            this.thisArg = thisArg;
        }

        public apply(...args: any[]): any
        {
            return this.func.apply(this.thisArg, args);
        }

        public equals<U extends Listener, T extends This>(obj: Bind<U, T>): boolean
        {
            return this.func == obj.func && this.thisArg == obj.thisArg;
        }
    }
}