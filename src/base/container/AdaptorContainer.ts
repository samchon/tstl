//================================================================ 
/** @module std.base */
//================================================================
import { _IEmpty, _ISize, _IPush } from "../../internal/container/IPartialContainers";

/**
 * Base class for Adaptor Containers.
 * 
 * @author Jeongho Nam <http://samchon.org>
 */
export abstract class AdaptorContainer<T, 
        Source extends _IEmpty & _ISize & _IPush<T>,
        This extends AdaptorContainer<T, Source, This>>
    implements _IEmpty, _ISize, _IPush<T>
{
    /**
     * @hidden
     */
    protected source_!: Source;
    
    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public size(): number
    {
        return this.source_.size();
    }

    /**
     * @inheritDoc
     */
    public empty(): boolean
    {
        return this.source_.empty();
    }

    /* ---------------------------------------------------------
        ELEMENTS I/O
    --------------------------------------------------------- */
    /**
     * @inheritDoc
     */
    public push(...elems: T[]): number
    {
        return this.source_.push(...elems);
    }

    /**
     * Remove element.
     */
    public abstract pop(): void;

    /**
     * Swap elements.
     * 
     * @param obj Target container to swap.
     */
    public swap(obj: This): void
    {
        [this.source_, obj.source_] = [obj.source_, this.source_];
    }
}