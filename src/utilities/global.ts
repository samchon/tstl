import { Pair } from "./Pair";

export function is_node(): boolean
{
	if (typeof process === "object")
		if (typeof process.versions === "object")
			if (typeof process.versions.node !== "undefined")
				return true;
	
	return false;
}

export function make_pair<T1, T2>(x: T1, y: T2): Pair<T1, T2>
{
	return new Pair<T1, T2>(x, y);
}