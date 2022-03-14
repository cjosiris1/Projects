/*
Given a string s and a list of strings dict, you need to add a closed pair of bold tag <b> and </b> to wrap the substrings in s that exist in dict. If two such substrings overlap, you need to wrap them together by only one pair of closed bold tag. Also, if two substrings wrapped by bold tags are consecutive, you need to combine them.

Example 1:
Input: 
	s = "abcxyz123"
	dict = ["abc","123"]
Output:
	"<b>abc</b>xyz<b>123</b>"

Example 2:
Input: 
	s = "aaabbcc"
	dict = ["aaa","aab","bc"]
Output:
	"<b>aaabbc</b>c"
*/

/**
 * @param {string} s
 * @param {array} dict
 */
let addBoldTag = function (s, dict) {
    let boldIndexes = {};

    // loop through each  word in dict
    dict.forEach(word => {

        // now loop through each character but make sure we never exceed the current word length
        for (let i = 0; i <= s.length - word.length; i++) {
            // make sure we find matching word
            if (s.substring(i, i + word.length) === word) {

                // loop through all characters starting with current index at i all the way up to the length of the word
                for (let j = i; j < i + word.length; j++) {

                    // mark each index as bold
                    boldIndexes[j] = true;
                }
            }
        }
    })


    let result = [];

    // loop through all characters in s so that we can build our final string
    for (let i = 0; i < s.length;) {

        // check if current index is bold
        if (boldIndexes.hasOwnProperty(i) && boldIndexes[i]) {

            // add starting bold tag
            result.push('<b>');

            // check for all bold characters and append them to result array
            while (i < s.length && boldIndexes.hasOwnProperty(i) && boldIndexes[i]) {
                result.push(s[i++]);
            }

            // finally add the closing tag
            result.push('</b>');
        } else {

            // otherwise just push non-bold character
            result.push(s[i++]);
        }

    }

    return result.join('');
};

// tests
console.log(addBoldTag('aaabbcc', ["aaa", "aab", "bc"]));
