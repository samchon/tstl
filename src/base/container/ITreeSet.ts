//================================================================ 
/** @module std.base */
//================================================================
import { SetContainer } from "./SetContainer";
import { _ITreeContainer } from "./_ITreeContainer";

import { SetIterator, SetReverseIterator } from "../iterator/SetIterator";

/**
 * @hidden
 */
export interface ITreeSet<T, Unique extends boolean, Source extends ITreeSet<T, Unique, Source>>
	extends SetContainer<T, Unique, Source>, 
		_ITreeContainer<T, T, 
			Source, 
			SetIterator<T, Unique, Source>, 
			SetReverseIterator<T, Unique, Source>, T>
{
}