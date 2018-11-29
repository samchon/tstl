//================================================================ 
/** @module std.base */
//================================================================
import { SetContainer } from "./SetContainer";
import { _ITreeContainer } from "./_ITreeContainer";

import { SetIterator } from "../iterator/SetIterator";

/**
 * @hidden
 */
export interface ITreeSet<T, Unique extends boolean, Source extends SetContainer<T, Unique, Source>>
	extends SetContainer<T, Unique, Source>, 
		_ITreeContainer<T, SetIterator<T, Unique, Source>>
{
	/**
	 * Get value comparison function.
	 * 
	 * @return The value comparison function.
	 */
	value_comp(): (x: T, y: T) => boolean;
}