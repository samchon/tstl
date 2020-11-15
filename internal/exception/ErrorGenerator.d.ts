/**
 * @packageDocumentation
 * @module std.internal
 */
import { InvalidArgument } from "../../exception/InvalidArgument";
import { OutOfRange } from "../../exception/OutOfRange";
export declare namespace ErrorGenerator {
    function get_class_name(instance: string | Instance): string;
    function empty(instance: Instance, method: string): OutOfRange;
    function negative_index(instance: Instance, method: string, index: number): OutOfRange;
    function excessive_index(instance: Instance, method: string, index: number, size: number): OutOfRange;
    function not_my_iterator(instance: Instance, method: string): InvalidArgument;
    function erased_iterator(instance: Instance, method: string): InvalidArgument;
    function negative_iterator(instance: Instance, method: string, index: number): OutOfRange;
    function iterator_end_value(instance: Instance, method?: string): OutOfRange;
    function key_nout_found<Key>(instance: Instance, method: string, key: Key): OutOfRange;
}
interface Instance {
    constructor: {
        name: string;
        __MODULE?: string;
    };
}
export {};
//# sourceMappingURL=ErrorGenerator.d.ts.map