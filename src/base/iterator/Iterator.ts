//================================================================ 
/** @module std.base */
//================================================================
import { IContainer } from "../container/IContainer";

import { ReverseIterator } from "./ReverseIterator";
import { IReversableIterator } from "../../iterator/IReverseIterator";

/**
 * Base iterator for {@link IContainer}.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface Iterator<T extends Elem, 
		SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT, Elem>, 
		IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
		ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT, Elem>,
		Elem = T>
	extends Readonly<IReversableIterator<T, IteratorT, ReverseIteratorT>>
{
	/**
	 * Get source container.
	 * 
	 * @return The source container.
	 */
	source(): SourceT;

	/**
	 * @inheritDoc
	 */
	reverse(): ReverseIteratorT;
}