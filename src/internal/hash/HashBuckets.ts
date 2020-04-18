//================================================================ 
/**
 * @packageDocumentation
 * @module std.internal  
 */
//================================================================
/**
 * Hash buckets
 * 
 * @author Jeongho Nam - https://github.com/samchon
 */
export abstract class HashBuckets<T>
{
    private buckets_!: T[][];
    private item_size_!: number;
    private max_load_factor_: number;

    /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
    protected constructor()
    {
        this.clear();
        
        this.max_load_factor_ = DEFAULT_MAX_FACTOR;
    }

    public clear(): void
    {
        this.buckets_ = [];
        this.item_size_ = 0;

        for (let i: number = 0; i < MIN_BUCKET_COUNT; ++i)
            this.buckets_.push([]);
    }

    public rehash(size: number): void
    {
        if (size < MIN_BUCKET_COUNT)
            size = MIN_BUCKET_COUNT;

        let prev_matrix: T[][] = this.buckets_;
        this.buckets_ = [];

        for (let i: number = 0; i < size; ++i)
            this.buckets_.push([]);

        for (let row of prev_matrix)
            for (let col of row)
            {
                let index: number = this.hash_index(col);
                let bucket: T[] = this.buckets_[index];
                
                bucket.push(col);
                ++this.item_size_;
            }
    }

    public reserve(size: number): void
    {
        this.item_size_ += size;

        if (this.item_size_ > this.capacity())
            this.rehash(Math.max(this.item_size_, this.capacity() * 2));
    }

    /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
    public abstract hash_index(val: T): number;

    public size(): number
    {
        return this.buckets_.length;
    }

    public capacity(): number
    {
        return this.buckets_.length * this.max_load_factor_;
    }


    public at(index: number): T[]
    {
        return this.buckets_[index];
    }

    public load_factor(): number
    {
        return this.item_size_ / this.size();
    }

    public max_load_factor(): number;
    public max_load_factor(z: number): void;
    public max_load_factor(z: number | null = null): number | void
    {
        if (z === null)
            return this.max_load_factor_;
        else
            this.max_load_factor_ = z;
    }

    /* ---------------------------------------------------------
        ELEMENTS I/O
    --------------------------------------------------------- */
    public insert(val: T): void
    {
        let capacity: number = this.capacity();
        if (++this.item_size_ > capacity)
            this.rehash(capacity * 2);

        let index: number = this.hash_index(val);
        this.buckets_[index].push(val);
    }

    public erase(val: T): void
    {
        let index: number = this.hash_index(val);
        let bucket: T[] = this.buckets_[index];

        for (let i: number = 0; i < bucket.length; ++i)
            if (bucket[i] === val)
            {
                bucket.splice(i, 1);
                --this.item_size_;

                break;
            }
    }
}

const MIN_BUCKET_COUNT = 10;
const DEFAULT_MAX_FACTOR = 1.0;