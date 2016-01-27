/// <reference path="IObject.ts" />

namespace std
{
    /**
     * A static class for issuing hash code.
     *
     * @author Jeongho Nam
     */
    export class Hash
    {
        public static get MIN_SIZE(): number { return 10; }

        public static get RATIO(): number { return 0.8; }

        public static get MAX_RATIO(): number { return 2.0; }

        public static code(val: any): number
        {
            var type: string = typeof val;

            if (type == "number")
                return Hash.codeByNumber(val);
            else if (type == "string")
                return Hash.codeByString(val);
            else
                return Hash.codeByObject(val);
        }

        private static codeByNumber(val: number): number
        {
            return Math.abs(Math.round(val));
        }
        private static codeByString(str: string): number
        {
            var val: number = 0;

            for (var i: number = 0; i < str.length; i++)
                val += str.charCodeAt(i) * Math.pow(31, str.length - 1 - i);

            return val;
        }
        private static codeByObject(obj: Object): number
        {
            return (<IObject>obj).hashCode();
        }
    }
}