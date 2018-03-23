import { IContainer } from "../containers/IContainer";

import { ReverseIterator } from "./ReverseIterator";
import { IReversableIterator } from "../../iterators/IReverseIterator";

/**
 * Base iterator for {@link IContainer}.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export interface Iterator<T, 
		SourceT extends IContainer<T, SourceT, IteratorT, ReverseIteratorT>, 
		IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>,
		ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
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