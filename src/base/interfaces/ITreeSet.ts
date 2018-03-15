import { SetContainer } from "../containers/SetContainer";

import { SetIterator } from "../iterators/SetIterator";
import { Pair } from "../../utilities/Pair";

/** 
 * @hidden
 */
export interface ITreeSet<T, Source extends SetContainer<T, Source>>
	extends SetContainer<T, Source>
{
	key_comp(): (x: T, y: T) => boolean;
	value_comp(): (x: T, y: T) => boolean;

	lower_bound(val: T): SetIterator<T, Source>;
	upper_bound(val: T): SetIterator<T, Source>;
	equal_range(val: T): Pair<SetIterator<T, Source>, SetIterator<T, Source>>;
}