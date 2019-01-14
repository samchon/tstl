//================================================================ 
/** @module std.experimental */
//================================================================
import { _IListAlgorithm } from "../base/disposable/IListAlgorithm";
import { IForwardIterator } from "../iterator";

import { ArrayContainer } from "../base";
import { remove_if } from "../algorithm";
import { equal_to } from "../functional/comparators";

/**
 * Erase matched elements.
 * 
 * @param container Container to erase matched elements.
 * @param val Value to erase.
 */
export function erase<T, 
        Container extends IContainer<T, Iterator>, 
        Iterator extends Readonly<IForwardIterator<T, Iterator>>>
    (container: Container, val: T): void;

export function erase<T, 
        Container extends Pick<_IListAlgorithm<T, Container>, "remove_if">>
    (contaier: Container, val: T): void;

export function erase<T>(container: any, val: T): void
{
    return erase_if(container, elem => equal_to(elem, val));
}

/**
 * Erase special elements.
 * 
 * @param container Container to erase special elements.
 * @param predicator A predicator to detect the speicality.
 */
export function erase_if<T, 
        Container extends IContainer<T, Iterator>, 
        Iterator extends Readonly<IForwardIterator<T, Iterator>>>
    (container: Container, predicator: (val: T)=>boolean): void;

export function erase_if<T, 
        Container extends Pick<_IListAlgorithm<T, Container>, "remove_if">>
    (contaier: Container, predicator: (val: T)=>boolean): void;

export function erase_if<T>(container: any, predicator: (val: T)=>boolean): void
{
    if (container.remove_if instanceof Function)
        container.remove_if(predicator);
    else if (container.at instanceof ArrayContainer)
    {
        let it = remove_if(container.begin(), container.end(), predicator);
        container.erase(it, container.end());
    }
    else
    {
        for (let it = container.begin(); !(it as any).equals(container.end()); )
            if (predicator(it.value))
                it = container.erase(it) as any;
            else
                it = it.next();
    }
}

/**
 * @hidden
 */
interface IContainer<T, Iterator extends Readonly<IForwardIterator<T, Iterator>>>
{
    begin(): Iterator;
    end(): Iterator;

    erase(first: Iterator, last: Iterator): Iterator;
}