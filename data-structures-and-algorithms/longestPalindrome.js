/*
Given a string s, return the longest palindromic substring in s.

Example 1:
Input: s = "babad"
Output: "bab"
Note: "aba" is also a valid answer.

Example 2:
Input: s = "cbbd"
Output: "bb"

Example 3:
Input: s = "a"
Output: "a"
Example 4:

Input: s = "ac"
Output: "a"

Constraints:
    1 <= s.length <= 1000
    s consist of only digits and English letters.
 */
/**
 * @param {string} str
 * @return {boolean}
 */
const isPalindrome = function (str) {
    for (let i = 0; i < str.length / 2; i++) {
        if (str[i] !== str[str.length - i - 1]) return false;
    }

    return true;
};

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {

    let history = new Map();

    // set longest to first character
    let longest = s[0];

    // check if s is a palindrome
    if (isPalindrome(s))
        return s;

    // perform sliding window operation
    // loop through x = 0 to s.length
    for (let x = 0; x < s.length; x++) {
        // set current substr = s[x]
        let substr = s[x];

        // loop through z = x + 1 to s.length
        for (let z = x + 1; z < s.length; z++) {
            // current substr += s[z]
            substr += s[z];


            // check if substr is palindrome and longer than longest
            if (!history.has(substr) && substr.length > longest.length && isPalindrome(substr)) {

                // set longest = substr
                longest = substr;
                history.set(longest, true);
            }
        }
    }

    return longest;

};