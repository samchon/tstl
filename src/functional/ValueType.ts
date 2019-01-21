import { IPointer } from "./IPointer";

export type ValueType<Pointer extends IPointer<any>> = 
	Pointer extends IPointer<infer T>
		? T
		: any;