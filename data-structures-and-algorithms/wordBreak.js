/*
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Example 1:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".

Example 2:
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.

Example 3:
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false


Constraints:
    * 1 <= s.length <= 300
    * 1 <= wordDict.length <= 1000
    * 1 <= wordDict[i].length <= 20
    * s and wordDict[i] consist of only lowercase English letters.
    * All the strings of wordDict are unique.
 */

/**
 * Brute-force approach using recursion
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    const wordBreakRecursive = (s, wordDict, start = 0) => {
        if (start === s.length) {
            return true;
        }

        for (let end = start + 1; end <= s.length; end++) {
            if (wordDict.includes(s.substring(start, end)) && wordBreakRecursive(s, wordDict, end)) {
                return true;
            }
        }

        return false;
    }

    return wordBreakRecursive(s, wordDict);
};

/**
 *
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreakRecursiveOptimized = function (s, wordDict) {

    /**
     *
     * @param {string} s
     * @param {string[]} wordDict
     * @param {object} memo
     * @return {boolean}
     */
    const wordBreakMemo = (s, wordDict, start, memo = {}) => {

        if (start === s.length) {
            return true;
        }

        if (memo.hasOwnProperty(start)) {
            return memo[start];
        }

        for (let end = start + 1; end <= s.length; end++) {
            if (wordDict.includes(s.substring(start, end)) && wordBreakMemo(s, wordDict, end, memo)) {
                return memo[start] = true;
            }
        }

        return memo[start] = false;
    }

    return wordBreakMemo(s, wordDict, 0, {});
};

/**
 *
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreakDP = function (s, wordDict) {

    // create empty dp array based on string length and fill all character positions with false
    let dp = (new Array(s.length + 1)).fill(false);

    // We'll mark the first index as true
    dp[0] = true;

    // track end end position of string by loop through from 1 to length string
    for (let end = 1; end <= s.length; end++) {

        // track start position of our substring by looping from 0 to end position
        for (let start = 0; start < end; start++) {

            // check if start position exists for our matched substring.
            // If it does mark the end position of the string in the dp array
            if (dp[start] && wordDict.includes(s.substring(start, end))) {
                dp[end] = true;
                break;
            }
        }
    }

    // word is breakable if end position of dp array has a true value
    return dp[s.length];
};