/**
 * @packageDocumentation
 * @module std.internal
 */
import { IEmpty } from "../partial/IEmpty";
import { IPush } from "../partial/IPush";
import { ISize } from "../partial/ISize";
/**
 * Base class for Adaptor Containers.
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export declare abstract class AdaptorContainer<T, Source extends IEmpty & ISize & IPush<T>, This extends AdaptorContainer<T, Source, This>> implements IEmpty, ISize, IPush<T> {
    protected source_: Source;
    protected constructor(source: Source);
    /**
     * @inheritDoc
     */
    size(): number;
    /**
     * @inheritDoc
     */
    empty(): boolean;
    /**
     * @inheritDoc
     */
    push(...elems: T[]): number;
    /**
     * Remove element.
     */
    abstract pop(): void;
    /**
     * Swap elements.
     *
     * @param obj Target container to swap.
     */
    swap(obj: This): void;
}
//# sourceMappingURL=AdaptorContainer.d.ts.map