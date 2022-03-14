/*
Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

Example 1:
    Input: strs = ["eat","tea","tan","ate","nat","bat"]
    Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Example 2:
    Input: strs = [""]
    Output: [[""]]

Example 3:
    Input: strs = ["a"]
    Output: [["a"]]


Constraints:
    * 1 <= strs.length <= 104
    * 0 <= strs[i].length <= 100
    * strs[i] consists of lowercase English letters.
 */
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const anagrams = {};
    const groups = [];

    // loop through the strings
    strs.forEach(str => {

        // sort characters in string to use as our key to capture anagrams
        const sortedStr = str.split('').sort().join('')

        // check to see if we have an anagram group created, if none set up an empty group
        if (!anagrams.hasOwnProperty(sortedStr)) {
            anagrams[sortedStr] = [];
        }

        // add string to matching anagram group
        anagrams[sortedStr].push(str);

    });

    // loop though all anagrams and add the groups
    Object.keys(anagrams).forEach(key => {
        groups.push(anagrams[key]);
    });

    return groups;
};

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagramsOptimized = function (strs) {

    const map = new Map();

    strs.forEach(str => {
        const sortedStr = [...str].sort().join('');
        if (!map.has(sortedStr)) {
            map.set(sortedStr, [str]);
        } else {
            map.get(sortedStr).push(str);
        }
    })

    return [...map.values()];
};