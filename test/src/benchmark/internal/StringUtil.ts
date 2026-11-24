/**
 * @hidden
 */
export class StringUtil
{
    /* ==================================================================
        SUBSTRING
            - BETWEEN(s)
            - TRIM
    =====================================================================
        BETWEEN(s)
    ------------------------------------------------------------------ */
    /**
     * Return the text between delimiters.
     *
     * @param str Target string to be applied between.
     * @param start A string for separating substring at the front.
     * @param end A string for separating substring at the end.
     *
     * @return The text between the selected delimiters.
     */
    public static between(str: string, start: string = "", end: string = ""): string
    {
        if (start === "" && end === "")
            return str;
        else if (start === "")
            return str.substr(0, str.indexOf(end));
        else if (end === "")
            return str.substr(str.indexOf(start) + start.length);
        else
        {
            const startIndex: number = str.indexOf(start);
            if (startIndex === -1)
                return "";

            return str.substring
                (
                    startIndex + start.length,
                    str.indexOf(end, startIndex + start.length)
                );
        }
    }

    /**
     * Collect the substrings between repeated delimiter pairs.
     *
     * @param str Target string to split by between.
     * @param start A string for separating substring at the front.
     *              If omitted, it's same with split(end) not having last item.
     * @param end A string for separating substring at the end.
     *            If omitted, it's same with split(start) not having first item.
     * @return The collected substrings in input order.
     */
    public static betweens(str: string, start: string = "", end: string = ""): Array<string>
    {
        let substrings: Array<string> = [];

        if (start === "" && end === "")
        {
            // PARAMETER IS NOT SPECIFIED
            // DO NOTHING
            return [str];
        }
        else if (start === end)
        {
            // SPLITTERS START AND END ARE EQUAL
            const prevIndex: number = -1;
            let endIndex: number;
            let n: number = 0;

            while ((endIndex = str.indexOf(start, prevIndex + 1)) !== -1)
                if (++n % 2 === 0)
                    substrings.push(str.substring(prevIndex, endIndex));
        }
        else
        {
            substrings = str.split(start).splice(1);

            if (end !== "")
                for (let i: number = substrings.length - 1; i >= 0; i--)
                    if (substrings[i].indexOf(end) === -1)
                        substrings.splice(i, 1);
                    else
                        substrings[i] = StringUtil.between(substrings[i], "", end);
        }

        return substrings;
    }

    /* ------------------------------------------------------------------
        TRIM
    ------------------------------------------------------------------ */
    /**
     * Whitespace strings recognized by the trimming helpers.
     */
    private static SPACE_ARRAY: Array<string> = [' ', '\t', '\r', '\n'];

    /**
     * Remove the supplied strings from either end. Without explicit
     * delimiters, trim whitespace.
     *
     * @param str String to trim.
     * @param args Strings to trim from either edge.
     *
     * @return A copy of the string with matching edge text removed.
     */
    public static trim(str: string, ...args: string[]): string
    {
        if (args.length === 0)
            args = StringUtil.SPACE_ARRAY;

        return StringUtil.ltrim(StringUtil.rtrim(str, ...args), ...args);
    }

    /**
     * Trim matching text from the beginning of the string. Without explicit
     * delimiters, trim whitespace.
     *
     * @param str String to trim.
     * @param args Additional strings to remove from the edge.
     *
     * @return A copy of the string with matching leading text removed.
     */
    public static ltrim(str: string, ...args: string[]): string
    {
        if (args.length === 0)
            args = StringUtil.SPACE_ARRAY;

        let index: number = 0;
        while (index < str.length)
        {
            let maxIndex: number = index;
            for (let i: number = 0; i < args.length; i++)
            {
                let myIndex: number = 
                    str.indexOf(args[i], maxIndex) // START FROM PREVIOUS MAX_INDEX
                        + args[i].length; // ADD ITS LENGTH
                
                maxIndex = Math.max(maxIndex, myIndex);
            }

            if (maxIndex <= index)
                break; // CAN BE -1
            else
                index = maxIndex;
        }
        
        if (index === str.length)
            return "";
        else
            return str.substr(index);
    }

    /**
     * Trim matching text from the end of the string. Without explicit
     * delimiters, trim whitespace.
     *
     * @param str String to trim.
     * @param args Additional strings to remove from the edge.
     *
     * @return A copy of the string with matching trailing text removed.
     */
    public static rtrim(str: string, ...args: string[]): string
    {
        if (args.length === 0)
            args = StringUtil.SPACE_ARRAY;

        let index: number = str.length;
        while (index !== 0)
        {
            let minIndex: number = index;
            for (let i: number = 0; i < args.length; i++)
            {
                let myIndex: number = str.lastIndexOf(args[i], minIndex - 1);
                if (myIndex === -1)
                    continue;

                minIndex = Math.min(minIndex, myIndex);
            }

            if (minIndex === -1 || minIndex >= index)
                break;
            else
                index = minIndex;
        }
        return str.substr(0, index);
    }

    /* ==================================================================
        REPLACERS
            - SUBSTITUTE
            - REPLACE_ALL
            - MISCELLANEOUS
    =====================================================================
        SUBSTITUTE
    ------------------------------------------------------------------ */
    /**
     * Replace indexed placeholders such as `{0}` with their corresponding
     * argument values.
     *
     * @param format The string to make substitutions in. This string can contain special tokens of the form
     *                 `{n}`, where *n* is a zero based index, that will be replaced with the additional parameters
     *                 found at that index if specified.
     * @param args Additional parameters that can be substituted in the *format* parameter at each
     *               `{n}` location, where *n* is an integer (zero based) index value into the array of values
     *               specified.
     *
     * @return The formatted string.
     */
    public static substitute(format: string, ...args: any[]): string
    {
        while (true)
        {
            if (args.length === 0)
                break;

            const min_index: number = StringUtil._Fetch_substitute_index(format);
            if (min_index === Number.MAX_VALUE)
                break;

            format = StringUtil.replaceAll(format, "{" + min_index + "}", String(args[0]));
            args.shift();
        }
        return format;
    }

    /**
     * Replace indexed placeholders in a SQL-format string with their
     * corresponding formatted argument values.
     *
     * @param format The string to make substitutions in. This string can contain special tokens of the form
     *                 `{n}`, where *n* is a zero based index, that will be replaced with the additional parameters
     *                 found at that index if specified.
     * @param args Additional parameters that can be substituted in the *format* parameter at each
     *               `{n}` location, where *n* is an integer (zero based) index value into the array of values
     *               specified.
     *
     * @return The formatted string.
     */
    public static substituteSQL(format: string, ...args: any[]): string
    {
        while (true)
        {
            if (args.length === 0)
                break;

            const element: any = args[0];
            const min_index: number = StringUtil._Fetch_substitute_index(format);
            if (min_index === Number.MAX_VALUE)
                break;

            const symbol: string = "{" + min_index + "}";
            if (element === null)
                format = StringUtil.replaceAll(format, symbol, "NULL");
            else if (typeof element === "boolean" || typeof element === "number")
                format = StringUtil.replaceAll(format, symbol, String(element));
            else if (typeof element === "string")
            {
                const str: string = StringUtil._Substitute_sql_string(element);
                format = StringUtil.replaceAll(format, symbol, str);
            }
            args.shift();
        }
        return format;
    }

    private static _Substitute_sql_string(str: string): string
    {
        str = StringUtil.replaceAll(str, "\\", "\\\\");
        str = StringUtil.replaceAll(str, "'", "\\'");

        return "'" + str + "'";
    }

    private static _Fetch_substitute_index(format: string): number
    {
        const parenthesis_array: Array<string> = StringUtil.betweens(format, "{", "}");
        let min_index: number = Number.MAX_VALUE;

        for (let i: number = 0; i < parenthesis_array.length; i++)
        {
            const index: number = Number(parenthesis_array[i]);
            if (isNaN(index) === true)
                continue;

            min_index = Math.min(min_index, index);
        }
        return min_index;
    }

    /* ------------------------------------------------------------------
        TRIM
    ------------------------------------------------------------------ */
    /**
     * Replace all occurrences of the supplied text in the string.
     *
     * @param str Target string to replace
     * @param before Specific word you want to be replaced
     * @param after Specific word you want to replace
     *
     * @return A copy of the string with the replacements applied.
     */
    public static replaceAll(str: string, before: string, after: string): string;

    /**
     * Replace all occurrences of the supplied text in the string.
     *
     * @param str Target string to replace
     * @param pairs A specific word's pairs you want to replace and to be replaced
     *
     * @return A copy of the string with the replacements applied.
     */
    public static replaceAll(str: string, ...pairs: [string, string][]): string;
    
    public static replaceAll(str: string, ...args: any[]): string
    {
        if (args.length === 2 && typeof args[0] === "string")
        {
            const before: string = args[0];
            const after: string = args[1];

            return str.split(before).join(after);
        }
        else
        {
            if (args.length === 0)
                return str;

            for (let i: number = 0; i < args.length; i++)
            {
                const pair: [string, string] = args[i];
                str = str.split(pair[0]).join(pair[1]);
            }
            return str;
        }
    }

    /* ------------------------------------------------------------------
        MISCELLANEOUS
    ------------------------------------------------------------------ */
    /**
     * Replace recognized HTML whitespace sequences with ordinary spaces.
     *
     * @param str Target string to replace.
     */
    public static removeHTMLSpaces(str: string): string
    {
        return StringUtil.replaceAll(str,
            ["&nbsp;", " "],
            ["\t", " "],
            ["  ", " "]
        );
    }

    /**
     * Repeat the given string `n` times.
     *
     * @param str The string to be repeated.
     * @param n The repeat count.
     *
     * @return The concatenated copies.
     */
    public static repeat(str: string, n: number): string
    {
        let ret: string = "";
        for (let i: number = 0; i < n; i++)
            ret += str;

        return ret;
    }

    public static similarity(x: string, y: string): number
    {
        return this._Similar(x, y);
    }

    private static _Similar(first: string, second: string, percent?: number)
    {
        let pos1: number = 0;
        let pos2: number = 0;
        let max: number = 0;
        let sum: number;

        for (let p: number = 0; p < first.length; ++p)
            for (let q: number = 0; q < second.length; ++q) 
            {
                let l: number;
                for (l = 0; (p + l < first.length) && (q + l < second.length) && (first.charAt(p + l) === second.charAt(q + l)); l++) { // eslint-disable-line max-len
                    // @todo: ^-- break up this crazy for loop and put the logic in its body
                }
                if (l > max) 
                {
                    max = l;
                    pos1 = p;
                    pos2 = q;
                }
            }

        sum = max;
        if (sum) 
        {
            if (pos1 && pos2)
                sum += StringUtil._Similar(first.substr(0, pos1), second.substr(0, pos2));

            if ((pos1 + max < first.length) && (pos2 + max < second.length)) 
            {
                sum += StringUtil._Similar(
                    first.substr(pos1 + max, first.length - pos1 - max),
                    second.substr(pos2 + max,
                    second.length - pos2 - max));
            }
        }

        if (percent === undefined)
            return sum;
        else
            return (sum * 200) / (first.length + second.length);
    }

    /* ==================================================================
        NUMBER FORMAT
            - NUMBER
            - UTILITIES
    =====================================================================
        NUMBER
    ------------------------------------------------------------------ */
    /**
     * Format a number with comma-separated groups and the specified precision.
     *
     * @param val A number wants to convert to string.
     * @param precision Target precision of round off.
     *
     * @return The formatted number.
     */
    public static numberFormat(val: number, precision: number = 2): string
    {
        if (val >= 10000000)
        {
            const multiplier: number = Math.floor(Math.log10(val));

            return `${StringUtil.numberFormat(val / Math.pow(10, multiplier), precision)} X 10^${multiplier}`;
        }

        let str: string = "";

        // FIRST, DO ROUND-OFF
        val = Math.round(val * Math.pow(10, precision));
        val = val / Math.pow(10, precision);

        // SEPERATE NUMBERS
        const is_negative: boolean = (val < 0);
        const natural: number = Math.floor(Math.abs(val));
        let fraction: number = Math.abs(val) - Math.floor(Math.abs(val));

        // NATURAL NUMBER
        if (natural === 0)
            str = "0";
        else
        {
            // NOT ZERO
            const cipher_count = Math.floor(Math.log(natural) / Math.log(10)) + 1;

            for (let i: number = 0; i <= cipher_count; i++)
            {
                let cipher: number = Math.floor(natural % Math.pow(10, i + 1));
                cipher = Math.floor(cipher / Math.pow(10, i));

                if (i === cipher_count && cipher === 0)
                    continue;

                // IS MULTIPLIER OF 3
                if (i > 0 && i % 3 === 0)
                    str = "," + str;

                // PUSH FRONT TO THE STRING
                str = cipher + str;
            }
        }

        // NEGATIVE SIGN
        if (is_negative === true)
            str = "-" + str;

        // ADD FRACTION
        if (precision > 0 && fraction !== 0)
        {
            fraction = Math.round(fraction * Math.pow(10, precision));
            const zeros: number = precision - Math.floor(Math.log(fraction) / Math.log(10)) - 1;

            str += "." + StringUtil.repeat("0", zeros) + fraction;
        }
        return str;
    }
}