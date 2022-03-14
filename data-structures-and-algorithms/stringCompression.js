/*

Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. For each group of consecutive repeating characters in chars:

If the group's length is 1, append the character to s.
Otherwise, append the character followed by the group's length.
The compressed string s should not be returned separately, but instead be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

After you are done modifying the input array, return the new length of the array.

You must write an algorithm that uses only constant extra space.


Example 1:
Input: chars = ["a","a","b","b","c","c","c"]
Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".

Example 2:
Input: chars = ["a"]
Output: Return 1, and the first character of the input array should be: ["a"]
Explanation: The only group is "a", which remains uncompressed since it's a single character.

Example 3:
Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".

Example 4:
Input: chars = ["a","a","a","b","b","a","a"]
Output: Return 6, and the first 6 characters of the input array should be: ["a","3","b","2","a","2"].
Explanation: The groups are "aaa", "bb", and "aa". This compresses to "a3b2a2". Note that each group is independent even if two groups have the same character.


Constraints:
    - 1 <= chars.length <= 2000
    - chars[i] is a lower-case English letter, upper-case English letter, digit, or symbol.
 */
/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {

    // check for chars that contain 1 character or none
    // return the length if that condition is met
    if (chars.length < 2) {
        return chars.length;
    }

    // initialize our result string. This will contain the compressed string
    let compressedStr = '';

    // initialize our chars length
    let n = chars.length;

    // initialize our counter
    let counter = 0;

    // traverse through chars to build our compressed string
    for (let i = 0; i < n; i++) {

        // check previous char. If it matches with current char increment the counter otherwise reset counte = 1
        if (i > 0 && chars[i - 1] === chars[i]) {
            counter++;
        } else {
            counter = 1;
        }

        // build our string if we hit the end of our traversal or if the next char is different from current char
        if (i === n - 1 || chars[i] !== chars[i + 1]) {
            compressedStr += counter > 1 ? `${chars[i]}${counter}` : chars[i];
        }
    }

    // traverse through our compressed string and do an in-place character replacement
    for (let j = 0; j < compressedStr.length; j++) {
        chars[j] = compressedStr.charAt(j);

        // check to see if we've hit the end our our compressed string, if so delete all remaining characters in chars
        if (j === compressedStr.length - 1) {
            chars.splice(j + 1);
        }
    }

    return chars.length;
};