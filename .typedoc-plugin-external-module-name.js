const path = require("path");

module.exports = function (explicit, implicit, path, reflection, context)
{
    let elements = implicit.split(path.sep);
    if (elements[0] === "base" || elements[0] === "internal")
        elements = ["std", elements[0]];
    else
        elements = ["std"];

    return elements.join(".");
}