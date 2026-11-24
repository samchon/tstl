//================================================================

/**
 * @packageDocumentation
 * @module std.internal
 */
//================================================================
import { Hasher } from "../functional/Hasher";

/**
 * Hash buckets
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
export class HashBuckets<Key, Elem> {
  private readonly fetcher_: Fetcher<Key, Elem>;
  private readonly hasher_: Hasher<Key>;
  private readonly bucket_by_element_ = new Map<Elem, Elem[]>();

  private max_load_factor_: number;
  private data_: Elem[][];

  /* ---------------------------------------------------------
        CONSTRUCTORS
    --------------------------------------------------------- */
  public constructor(fetcher: Fetcher<Key, Elem>, hasher: Hasher<Key>) {
    this.fetcher_ = fetcher;
    this.hasher_ = hasher;

    this.max_load_factor_ = DEFAULT_MAX_FACTOR;
    this.data_ = [];

    this.initialize();
  }

  public clear(): void {
    this.data_ = [];
    this.bucket_by_element_.clear();

    this.initialize();
  }

  public rehash(length: number): void {
    length = Math.max(length, MIN_BUCKET_COUNT);

    const data: Elem[][] = [];
    for (let i: number = 0; i < length; ++i) data.push([]);

    for (const row of this.data_)
      for (const elem of row) {
        const index: number = this.hasher_(this.fetcher_(elem)) % data.length;
        data[index].push(elem);
      }
    this.data_ = data;
    // Update locations only after all hashes for the new table succeeded.
    for (const bucket of data)
      for (const elem of bucket) this.bucket_by_element_.set(elem, bucket);
  }

  public reserve(length: number): void {
    if (length > this.capacity()) {
      length = Math.floor(length / this.max_load_factor_);
      this.rehash(length);
    }
  }

  private initialize(): void {
    for (let i: number = 0; i < MIN_BUCKET_COUNT; ++i) this.data_.push([]);
  }

  /* ---------------------------------------------------------
        ACCESSORS
    --------------------------------------------------------- */
  public length(): number {
    return this.data_.length;
  }

  public capacity(): number {
    return this.data_.length * this.max_load_factor_;
  }

  public at(index: number): Elem[] {
    return this.data_[index];
  }

  public load_factor(): number {
    return this.bucket_by_element_.size / this.length();
  }

  public max_load_factor(): number;
  public max_load_factor(z: number): void;
  public max_load_factor(z: number | null = null): number | void {
    if (z === null) return this.max_load_factor_;
    else this.max_load_factor_ = z;
  }

  public hash_function(): Hasher<Key> {
    return this.hasher_;
  }

  /* ---------------------------------------------------------
        ELEMENTS I/O
    --------------------------------------------------------- */
  public insert(val: Elem): void {
    const hash = this.hasher_(this.fetcher_(val));
    const capacity: number = this.capacity();
    if (this.bucket_by_element_.size + 1 > capacity) this.reserve(capacity * 2);

    const bucket = this.data_[hash % this.length()];
    bucket.push(val);
    this.bucket_by_element_.set(val, bucket);
  }

  public erase(val: Elem): void {
    const bucket = this.bucket_by_element_.get(val);
    if (bucket === undefined) return;
    bucket.splice(bucket.indexOf(val), 1);
    this.bucket_by_element_.delete(val);
  }
}

const MIN_BUCKET_COUNT = 10;
const DEFAULT_MAX_FACTOR = 1.0;

type Fetcher<Key, Elem> = (elem: Elem) => Key;
