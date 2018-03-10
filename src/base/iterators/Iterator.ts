import { Container } from "../containers/Container";
import { ReverseIterator } from "./ReverseIterator";
import { IReversableIterator } from "../../iterators/IReverseIterator";

export interface Iterator<T, 
		SourceT extends Container<T, SourceT, IteratorT, ReverseIteratorT>, 
		IteratorT extends Iterator<T, SourceT, IteratorT, ReverseIteratorT>,
		ReverseIteratorT extends ReverseIterator<T, SourceT, IteratorT, ReverseIteratorT>>
	extends Readonly<IReversableIterator<T, IteratorT, ReverseIteratorT>>
{
	source(): SourceT;

	reverse(): ReverseIteratorT;
}