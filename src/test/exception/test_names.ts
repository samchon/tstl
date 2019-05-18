import std = require("../../exception");

const NAMES = [
    "Exception",
    "LogicError",
        "DomainError",
        "LengthError",
        "OutOfRange",
    "RuntimeError",
        "OverflowError",
        "UnderflowError"
] as const;

export function test_exception_names(): void
{
    for (let name of NAMES)
    {
        let exp: std.Exception = new std[name]("Error Message");
        if (exp.name !== name)
            throw new std.DomainError("Exception.name() is not matched: " + name);
    }
}