//================================================================ 
/** @module std */
//================================================================
import { VectorContainer } from "../base/container/VectorContainer";
import { ArrayIterator, ArrayReverseIterator } from "../base/iterator/ArrayIterator";

import { IForwardIterator } from "../iterator/IForwardIterator";

/**
 * Vector, an array with variable capacity.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export class Vector<T>
    extends VectorContainer<T, Vector<T>, Vector<T>, Vector.Iterator<T>, Vector.ReverseIterator<T>, T>
{
    /* ---------------------------------------------------------
        CONSTURCTORS
    --------------------------------------------------------- */
    /**
     * Default Constructor.
     */
    public constructor();

    /**
     * Initializer Constructor.
     * 
     * @param items Items to assign.
     */
    public constructor(items: Array<T>);

    /**
     * Copy Constructor
     * 
     * @param obj Object to copy.
     */
    public constructor(obj: Vector<T>);

    /**
     * Fill Constructor.
     * 
     * @param size Initial size.
     * @param val Value to fill.
     */
    public constructor(n: number, val: T);

    /**
     * Range Constructor.
     * 
     * @param first Input iterator of the first position.
     * @param last Input iteartor of the last position.
     */
    public constructor(first: Readonly<IForwardIterator<T>>, last: Readonly<IForwardIterator<T>>);
    
    public constructor(...args: any[])
    {
        super();

        // CONSTRUCTORS BRANCH
        if (args.length === 0)
        {
            // DEFAULT CONSTRUCTOR
        }
        else if (args.length === 1 && args[0] instanceof Array)
        {
            // INITIALIZER CONSTRUCTOR
            let array: Array<T> = args[0];
            this.data_ = array.slice();
        }
        else if (args.length === 1 && args[0] instanceof Vector)
        {
            // COPY CONSTRUCTOR
            this.data_ = (args[0] as Vector<T>).data_.slice();
        }
        else if (args.length === 2)
        {
            // ASSIGN CONSTRUCTOR
            this.assign(args[0], args[1]);
        }
    }

    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @internal
     */
    public static _Capsule<T>(data: Array<T>): Vector<T>
    {
        let ret: Vector<T> = new Vector<T>();
        ret.data_ = data;

        return ret;
    }

    /**
     * @internal
     */
    public nth(index: number): Vector.Iterator<T>
    {
        return new Vector.Iterator(this as Vector<T>, index);
    }
}

export namespace Vector
{
    //----
    // PASCAL NOTATION
    //----
    // HEAD
    export type Iterator<T> = ArrayIterator<T, Vector<T>>;
    export type ReverseIterator<T> = ArrayReverseIterator<T, Vector<T>>;

    // BODY
    export const Iterator = ArrayIterator;
    export const ReverseIterator = ArrayReverseIterator;

    //----
    // SNAKE NOTATION
    //----
    // HEAD
    export type iterator<T> = Iterator<T>;
    export type reverse_iterator<T> = ReverseIterator<T>;

    // BODY
    export const iterator = Iterator;
    export const reverse_iterator = ReverseIterator;
}
export import vector = Vector;