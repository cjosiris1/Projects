/*
A valid number can be split up into these components (in order):
    1. A decimal number or an integer.
    2. (Optional) An 'e' or 'E', followed by an integer.

A decimal number can be split up into these components (in order):
    1. (Optional) A sign character (either '+' or '-').
    2. One of the following formats:
        1. One or more digits, followed by a dot '.'.
        2. One or more digits, followed by a dot '.', followed by one or more digits.
        3. A dot '.', followed by one or more digits.

An integer can be split up into these components (in order):
    1. (Optional) A sign character (either '+' or '-').
    2. One or more digits.

For example, all the following are valid numbers:
    ["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"],

while the following are not valid numbers:
    ["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"].

Given a string s, return true if s is a valid number.


Example 1:
Input: s = "0"
Output: true

Example 2:
Input: s = "e"
Output: false

Example 3:
Input: s = "."
Output: false

Example 4:
Input: s = ".1"
Output: true

Constraints:
    - 1 <= s.length <= 20
    - s consists of only English letters (both uppercase and lowercase), digits (0-9), plus '+', minus '-', or dot '.'.

 */
/**
 * @param {string} s
 * @return {boolean}
 */
const isNumber = function (s) {

    // check if our string is empty
    if (!s || s.length === 0) {
        return false;
    }

    // initialize flags for checking seen digits, exponents and dots
    let seenDigit = false;
    let seenExponent = false;
    let seenDot = false;

    // traverse through each character of our string
    for (let i = 0; i < s.length; i++) {

        // get current character
        const char = s[i];

        // check if current character is a number, if it is let's flag that we've seen a digit
        if (!isNaN(char)) {
            seenDigit = true;
        }
        // check if we've seen +/-
        else if (char === '+' || char === '-') {
            // check to see if previous char was an exponent
            // if it was then this is not a number
            if (i > 0 && s[i - 1] !== 'e' && s[i] !== 'E') {
                return false;
            }

        }
        // check if we've seen the exponent
        else if (char === 'e' || char === 'E') {

            // If we've already seen an exponent or not seen a digit
            // we do not have a number
            if (seenExponent || !seenDigit) {
                return false;
            }

            seenExponent = true;
            seenDigit = false;
        }
        // check if we've seen a dot
        else if (char === '.') {

            // if we've already seen dot or exponent then this is not a number
            if (seenDot || seenExponent) {
                return false;
            }

            seenDot = true;

        }
        // otherwise this is not a number
        else {
            return false;
        }

    }

    return seenDigit;
};