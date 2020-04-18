//================================================================ 
/**
 * @packageDocumentation
 * @module std  
 */
//================================================================
import { is_node } from "../utility/node";
import { _Get_root } from "../internal/Global";

/**
 * Terminate program.
 */
export function terminate(): void
{
    if (is_node() === true)
        global.process.exit();
    else
    {
        if (typeof window !== "undefined" && self.open instanceof Function)
            self.open("", "_self", "");
        self.close();
    }
}

/**
 * Set terminate handler.
 * 
 * @param func The terminate handler.
 */
export function set_terminate(func: () => void): void
{
    //----
    // PREPARE EVENT LISTENER
    //----
    let type: string;
    let register: Dispatcher;
    let eraser: Dispatcher;

    if (is_node() === true)
    {
        type = "exit";
        register = (type: "exit", listener: NodeJS.ExitListener) => global.process.addListener(type, listener);
        eraser = (type: "exit", listener: NodeJS.ExitListener) => global.process.removeListener(type, listener);
    }
    else
    {
        // IF WORKER, THEN CANNOT ASSURE ACTIVATION.
        type = (typeof window !== "undefined") 
            ? "unload" 
            : "close";
        register = (type, listener) => self.addEventListener(type, listener);
        eraser = (type, listener) => self.removeEventListener(type, listener);
    }

    //----
    // ENROLL THE LISTENER
    //----
    // ERASE ORDINARY
    if (_Get_root().__s_pTerminate_handler !== undefined)
        eraser(type, _Get_root().__s_pTerminate_handler!);
    
    // DO REGISTER
    register("exit", func);

    // ARCHIVE THE LISTENER
    _Get_root().__s_pTerminate_handler = func;
}

/**
 * Get terminate handler.
 * 
 * @return The terminate handler.
 */
export function get_terminate(): (() => void) | undefined
{
    return _Get_root().__s_pTerminate_handler!;
}

type Dispatcher = (type: any, listener: any) => void;