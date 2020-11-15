import * as std from "../../index";
import { ITimedLockable } from "../../base/thread/ITimedLockable";
export declare function test_mutexes(): Promise<void>;
export declare function _Test_lock(mtx: std.base.ILockable, name?: string): Promise<void>;
export declare function _Test_try_lock(mtx: ITimedLockable, name?: string): Promise<void>;
//# sourceMappingURL=test_mutexes.d.ts.map