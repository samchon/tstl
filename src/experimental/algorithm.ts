import { _IListAlgorithm } from "../base/disposable/IListAlgorithm";
import { IForwardIterator } from "../iterator";

import { SetContainer } from "../base/container/SetContainer";
import { MapContainer } from "../base/container/MapContainer";

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
		Iterator extends IForwardIterator<T, Iterator>>
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
		Iterator extends IForwardIterator<T, Iterator>>
	(container: Container, predicator: (val: T)=>boolean): void;

export function erase_if<T, 
		Container extends Pick<_IListAlgorithm<T, Container>, "remove_if">>
	(contaier: Container, predicator: (val: T)=>boolean): void;

export function erase_if<T>(container: any, predicator: (val: T)=>boolean): void
{
	if (container.remove_if instanceof Function)
		container.remove_if(predicator);
	else if (container instanceof SetContainer || container instanceof MapContainer)
	{
		for (let it = container.begin(); !(it as any).equals(container.end()); )
			if (predicator(it.value))
				it = container.erase(it) as any;
			else
				it = it.next();
	}
	else
	{
		let it = remove_if(container.begin(), container.end(), predicator);
		container.erase(it, container.end());
	}
}

/**
 * @hidden
 */
interface IContainer<T, Iterator extends IForwardIterator<T, Iterator>>
{
	begin(): Iterator;
	end(): Iterator;

	erase(first: Iterator, last: Iterator): Iterator;
}