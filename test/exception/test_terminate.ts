import * as std from "../../index";

export function test_terminate(): void
{
    std.set_terminate(_Terminate_handler);
}

function _Terminate_handler(): void
{
    if (std.get_terminate() !== _Terminate_handler)
        throw new std.DomainError("Bug on set_terminate().");
}