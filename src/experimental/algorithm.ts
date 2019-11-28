//================================================================ 
/** @module std.experimental */
//================================================================
import { IForwardContainer } from "../base/disposable/IForwardContainer";
import { IForwardIterator } from "../iterator/IForwardIterator";
import { IPointer } from "../functional/IPointer";
import { _IListAlgorithm } from "../base/disposable/IListAlgorithm";

import { ArrayContainer } from "../base/container/ArrayContainer";
import { equal_to } from "../functional/comparators";
import { remove_if } from "../algorithm/modifiers";

/**
 * Erase matched elements.
 * 
 * @param container Container to erase matched elements.
 * @param val Value to erase.
 */
export function erase<Container extends IErasable<any>>
    (container: Container, val: IForwardContainer.ValueType<Container>): void
{
    return erase_if(container, elem => equal_to(elem, val));
}

/**
 * Erase special elements.
 * 
 * @param container Container to erase special elements.
 * @param pred A predicator to detect the speicality.
 */
export function erase_if<Container extends IErasable<any>>
    (container: Container, pred: (val: IForwardContainer.ValueType<Container>)=>boolean): void;

export function erase_if<T>(container: any, predicator: (val: T)=>boolean): void
{
    if (container.remove_if instanceof Function)
        container.remove_if(predicator);
    else if (container.at instanceof ArrayContainer)
    {
        let it = remove_if(container.begin(), container.end(), <any>predicator);
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
interface IErasable<Iterator extends IForwardIterator<IPointer.ValueType<Iterator>, Iterator>>
    extends IForwardContainer<Iterator>
{
    erase(first: Iterator, last: Iterator): Iterator;
}