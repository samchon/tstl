//================================================================ 
/** @module std.base */
//================================================================
import { IContainer } from "./IContainer";
import { Iterator } from "../iterator/Iterator";
import { IReverseIterator } from "../iterator/ReverseIterator";

/**
 * @hidden
 */
export interface _IAssociativeContainer<Key, T extends Elem, 
        SourceT extends _IAssociativeContainer<Key, T, SourceT, IteratorT, ReverseIteratorT, Elem>, 
        IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
        ReverseIteratorT extends IReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
        Elem>
    extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, Elem>
{
    /**
     * Get iterator to element.
     * 
     * @param key Key to search for.
     * @return An iterator to the element, if the specified key is found, otherwise `this.end()`.
     */
    find(key: Key): IteratorT;

    /**
     * Test whether a key exists.
     * 
     * @param key Key to search for.
     * @return Whether the specified key exists.
     */
    has(key: Key): boolean;

    /**
     * Count elements with a specified key.
     * 
     * @param key Key to search for.
     * @return Number of elements with the specified key.
     */
    count(key: Key): number;

    /**
     * Erase elements with a specified key.
     * 
     * @param key Key to search for.
     * @return Number of erased elements.
     */
    erase(key: Key): number;

    /**
     * @inheritDoc
     */
    erase(pos: IteratorT): IteratorT;

    /**
     * @inheritDoc
     */
    erase(first: IteratorT, last: IteratorT): IteratorT;
}

/**
 * @hidden
 */
export function _Fetch_arguments<Key, T extends Elem, 
        SourceT extends _IAssociativeContainer<Key, T, SourceT, IteratorT, ReverseIteratorT, Elem>, 
        IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
        ReverseIteratorT extends IReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
        Elem>
    (source: SourceT, ...args: any[])
{
    let ramda: (()=>void) | null;
    let tail: any[];

    if (args.length >= 1 && args[0] instanceof Array)
    {
        // INITIALIZER LIST CONSTRUCTOR
        ramda = () =>
        {
            let items: Elem[] = args[0];
            source.push(...items);
        };
        tail = args.slice(1);
    }
    else if (args.length >= 2 && args[0].next instanceof Function && args[1].next instanceof Function)
    {
        // RANGE CONSTRUCTOR
        ramda = () =>
        {
            let first: IteratorT = args[0];
            let last: IteratorT = args[1];

            source.assign(first, last);
        };
        tail = args.slice(2);
    }
    else
    {
        // DEFAULT CONSTRUCTOR
        ramda = null;
        tail = args;
    }

    return {ramda: ramda, tail: tail};
}