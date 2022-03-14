/*
From any string, we can form a subsequence of that string by deleting some number of characters (possibly no deletions).

Given two strings source and target, return the minimum number of subsequences of source such that their concatenation equals target. If the task is impossible, return -1.

Example 1:
Input: source = "abc", target = "abcbc"
Output: 2
Explanation: The target "abcbc" can be formed by "abc" and "bc", which are subsequences of source "abc".

Example 2:
Input: source = "abc", target = "acdbc"
Output: -1
Explanation: The target string cannot be constructed from the subsequences of source string due to the character "d" in target string.

Example 3:
Input: source = "xyz", target = "xzyxz"
Output: 3
Explanation: The target string can be constructed as follows "xz" + "y" + "xz".

Constraints:
Both the source and target strings consist of only lowercase English letters from "a"-"z".
The lengths of source and target string are between 1 and 1000.
 */
/**
 * @param {string} source
 * @param {string} target
 * @return {number}
 */
var shortestWay = function (source, target) {

    // initialize number of subsequences = 0
    let numSubsequences = 0;

    // initialize our remaining string to target
    // we'll use this to obtain subsequences from our source then removing the found sequences so that we don't go into an infinite loop of scanning
    let remaining = target;

    // check for subsquences while the remaining string is not emepty or still has characters
    while (remaining.length > 0) {

        // initialize empty string for our subsequence
        let subsequence = '';

        // set our i & j pointers to 0.
        // We'll use this  to scan both the source and remaining target for subsequences. We dont want to repeat characters
        let i = 0;
        let j = 0;

        // make sure to check our bounds. So while within the string bounds we want to get the subsequences
        while (i < source.length && j < remaining.length) {

            // check each char at i while moving forward and match against the the remaining char at j
            if (source.charAt(i++) == remaining.charAt(j)) {

                // build our subsequence whenever we find a matching character
                // make sure we move our j pointer forward too
                subsequence += remaining.charAt(j++);
            }
        }

        // if we have no subscequence return -1 since we could not form a subsequence from the supplied source
        if (subsequence.length == 0) {
            return -1;
        }

        // we found our subsequence, lets increment our counter & update the remaining string
        numSubsequences++;
        remaining = remaining.substring(subsequence.length);
    }

    return numSubsequences;
};