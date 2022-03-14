/*
Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.

Furthermore, you may assume that the original data does not contain any digits and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].

Example 1:
Input: s = "3[a]2[bc]"
Output: "aaabcbc"

Example 2:
Input: s = "3[a2[c]]"
Output: "accaccacc"

Example 3:
Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"

Example 4:
Input: s = "abc3[cd]xyz"
Output: "abccdcdcdxyz"

Constraints:
1 <= s.length <= 30
s consists of lowercase English letters, digits, and square brackets '[]'.
s is guaranteed to be a valid input.
All the integers in s are in the range [1, 300].
 */
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {

    // check if string is empty
    if (!s || s.length === 0) {
        // return empty string
        return s;
    }

    /**
     * helper to get index of first number in string
     * @param str
     * @return {number}
     */
    const getFirstNumberIndex = (str) => {

        // traverse through all characters in the string to find first number
        for (let i = 0; i < str.length; i++) {

            // if we find a number return the index
            if (!isNaN(str[i])) {
                return i;
            }
        }

        // otherwise if we never find one let's return -1
        return -1;
    };

    /**
     * Helper to find valid repeatable strings that start with "[" and end with "]"
     * @param str
     * @return {boolean}
     */
    const isValidRepeatable = (str) => {

        let closeMap = {
            ']': '['
        };
        let bracketsStack = [];

        // validate input
        if (str == null || str.length === 0) {
            return false;
        }

        let topElement;
        let curChar;
        for (let i = 0; i < str.length; i++) {

            // get current char
            curChar = str.charAt(i);

            // skip all non-opening / closing bracket characters
            if (!(curChar === '[' || curChar === ']')) {
                continue;
            }

            // check if current char  to see if we've hit a closing bracket otherwise
            // keep adding adding all opening brackets to our brackets stack
            if (closeMap[curChar] !== undefined) {
                topElement = (bracketsStack.length === 0) ? '#' : bracketsStack.pop();
                if (topElement !== closeMap[curChar]) {
                    return false;
                }
            } else {
                bracketsStack.push(curChar);
            }
        }

        // our string is valid if we have no brackets in our stack
        return bracketsStack.length === 0;
    };

    /**
     * Recursive call that parses and decodes our string
     * @param str
     * @return {string}
     */
    const parseAndDecodeString = function (str) {

        // check if string contains numbers
        if (getFirstNumberIndex(str) === -1) {
            return str;
        }

        let repeatIndex = getFirstNumberIndex(str);
        let repeatCount = '';
        let result = str.substr(0, repeatIndex);
        let windowStart;
        let windowEnd;

        // find exact repeat count to account for double digit counts. Basically traverse through and keep track of each
        // number char from our string starting from first number index all the way to where we no longer can find a number.
        for (let i = repeatIndex; i < str.length; i++) {

            // keep track of the count as well as where our repeatable string window starts
            if (!isNaN(str[i])) {
                repeatCount += str[i];
                windowStart = i + 1;
            } else {
                break;
            }
        }

        // parse the integer value to get repeat count number
        repeatCount = parseInt(repeatCount);

        // if the first character at the window start index is an opening bracket, we've hit our repeatable characters
        if (str[windowStart] === '[') {

            // initialize empty repeatable string
            let repeatableStr = '';

            // set the window end to same as start
            windowEnd = windowStart;

            // keep processing till we find a valid repeatable string. Always make sure that the windowEnd is less than
            // our string length
            while (!isValidRepeatable(str.slice(windowStart, windowEnd)) && windowEnd < str.length) {

                // update repeatableStr and keep moving the windowEnd forward till we can get a valid repeatable string
                repeatableStr += str[windowEnd];
                windowEnd++;
            }

            // we only want the substring enclosed in the brackets
            repeatableStr = repeatableStr.slice(1, repeatableStr.length - 1);

            // build our result by appending the repeatable string for the repeatCount times
            for (let i = 0; i < repeatCount; i++) {
                result += repeatableStr;
            }

            // finally get the remaining characters after our repeatable string window end
            result += str.slice(windowEnd);
        }

        // recursively parse till we no longer can find any repeatable characters
        return parseAndDecodeString(result);

    }

    // call our parsing helper on input string and return it
    return parseAndDecodeString(s);
};