/**
 * @hidden
 */
export declare class StringUtil {
    /**
     * Generate a substring.
     *
     * Extracts a substring consisting of the characters from specified start to end.
     * It's same with str.substring( ? = (str.find(start) + start.size()), str.find(end, ?) )
     *
     * ```typescript
     * const str: string = StringUtil.between("ABCD(EFGH)IJK", "(", ")");
     * console.log(str); // PRINTS "EFGH"
     * ```
     *
     * - If start is not specified, extracts from begin of the string to end. </li>
     * - If end is not specified, extracts from start to end of the string. </li>
     * - If start and end are all omitted, returns str, itself. </li>
     *
     * @param str Target string to be applied between.
     * @param start A string for separating substring at the front.
     * @param end A string for separating substring at the end.
     *
     * @return substring by specified terms.
     */
    static between(str: string, start?: string, end?: string): string;
    /**
     * Fetch substrings.
     *
     * Splits a string into an array of substrings dividing by specified delimeters of start and end.
     * It's the array of substrings adjusted the between.
     *
     * <ul>
     *    <li> If startStr is omitted, it's same with the split by endStr not having last item. </li>
     *    <li> If endStr is omitted, it's same with the split by startStr not having first item. </li>
     *    <li> If startStr and endStar are all omitted, returns *str*. </li>
     * </ul>
     *
     * @param str Target string to split by between.
     * @param start A string for separating substring at the front.
     *              If omitted, it's same with split(end) not having last item.
     * @param end A string for separating substring at the end.
     *            If omitted, it's same with split(start) not having first item.
     * @return An array of substrings.
     */
    static betweens(str: string, start?: string, end?: string): Array<string>;
    /**
     * An array containing whitespaces.
     */
    private static SPACE_ARRAY;
    /**
     * Remove all designated characters from the beginning and end of the specified string.
     *
     * @param str The string whose designated characters should be trimmed.
     * @param args Designated character(s).
     *
     * @return Updated string where designated characters was removed from the beginning and end.
     */
    static trim(str: string, ...args: string[]): string;
    /**
     * Remove all designated characters from the beginning of the specified string.
     *
     * @param str The string should be trimmed.
     * @param delims Designated character(s).
     *
     * @return Updated string where designated characters was removed from the beginning
     */
    static ltrim(str: string, ...args: string[]): string;
    /**
     * Remove all designated characters from the end of the specified string.
     *
     * @param str The string should be trimmed.
     * @param delims Designated character(s).
     *
     * @return Updated string where designated characters was removed from the end.
     */
    static rtrim(str: string, ...args: string[]): string;
    /**
     * Substitute `{n}` tokens within the specified string.
     *
     * @param format The string to make substitutions in. This string can contain special tokens of the form
     *                 `{n}`, where *n* is a zero based index, that will be replaced with the additional parameters
        *                 found at that index if specified.
        * @param args Additional parameters that can be substituted in the *format* parameter at each
        *               `{n}` location, where *n* is an integer (zero based) index value into the array of values
        *               specified.
        *
        * @return New string with all of the `{n}` tokens replaced with the respective arguments specified.
        */
    static substitute(format: string, ...args: any[]): string;
    /**
     * Substitute `{n}` tokens within the specified SQL-string.
     *
     * @param format The string to make substitutions in. This string can contain special tokens of the form
     *                 `{n}`, where *n* is a zero based index, that will be replaced with the additional parameters
        *                 found at that index if specified.
        * @param args Additional parameters that can be substituted in the *format* parameter at each
        *               `{n}` location, where *n* is an integer (zero based) index value into the array of values
        *               specified.
        *
        * @return New SQL-string with all of the `{n}` tokens replaced with the respective arguments specified.
        */
    static substituteSQL(format: string, ...args: any[]): string;
    private static _Substitute_sql_string;
    private static _Fetch_substitute_index;
    /**
     * Returns a string specified word is replaced.
     *
     * @param str Target string to replace
     * @param before Specific word you want to be replaced
     * @param after Specific word you want to replace
     *
     * @return A string specified word is replaced
     */
    static replaceAll(str: string, before: string, after: string): string;
    /**
     * Returns a string specified words are replaced.
     *
     * @param str Target string to replace
     * @param pairs A specific word's pairs you want to replace and to be replaced
     *
     * @return A string specified words are replaced
     */
    static replaceAll(str: string, ...pairs: [string, string][]): string;
    /**
     * Replace all HTML spaces to a literal space.
     *
     * @param str Target string to replace.
     */
    static removeHTMLSpaces(str: string): string;
    /**
     * Repeat a string.
     *
     * Returns a string consisting of a specified string concatenated with itself a specified number of times.
     *
     * @param str The string to be repeated.
     * @param n The repeat count.
     *
     * @return The repeated string.
     */
    static repeat(str: string, n: number): string;
    static similarity(x: string, y: string): number;
    private static _Similar;
    /**
     * Number to formatted string with &quot;,&quot; sign.
     *
     * Returns a string converted from the number rounded off from specified precision with &quot;,&quot; symbols.
     *
     * @param val A number wants to convert to string.
     * @param precision Target precision of round off.
     *
     * @return A string who represents the number with roundoff and &quot;,&quot; symbols.
     */
    static numberFormat(val: number, precision?: number): string;
}
//# sourceMappingURL=StringUtil.d.ts.map