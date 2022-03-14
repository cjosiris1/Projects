/*
Given the root of a binary tree, each node has a value from 0 to 25 representing the letters 'a' to 'z': a value of 0 represents 'a', a value of 1 represents 'b', and so on.

Find the lexicographically smallest string that starts at a leaf of this tree and ends at the root.

(As a reminder, any shorter prefix of a string is lexicographically smaller: for example, "ab" is lexicographically smaller than "aba".  A leaf of a node is a node that has no children.)

Example 1:
Input: [0,1,2,3,4,3,4]
Output: "dba"

Example 2:
Input: [25,1,3,1,3,0,2]
Output: "adz"

Example 3:
Input: [2,2,1,null,1,0,null,0]
Output: "abc"

Note:
1. The number of nodes in the given tree will be between 1 and 8500.
2. Each node in the tree will have a value between 0 and 25.
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string}
 */
var smallestFromLeaf = function (root) {

    // initialize strings array
    let leafStrs = [];

    // check for worst case or empty string
    if (!root) {
        // return empty string
        return '';
    }

    // quick way to generate alphabet array
    let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    // let alphabet = Array.from(Array(26)).map((e, i) => i + 97).map((x) => String.fromCharCode(x));


    // create helper function to explore our binary tree that takes the node, currentStr, stringsArr
    const explore = function (node, currentStr = '', stringsArr = []) {
        // if we've reached a leaf node
        if (node.left == null && node.right == null) {
            // lets preppend node value to currentStr
            stringsArr.push(alphabet[node.val] + currentStr);

        }

        // check to see if node has left child
        if (node.left) {
            // prepend node value to currentStr
            // explore left child
            explore(node.left, alphabet[node.val] + currentStr, stringsArr);
        }

        // check to see if node has right child
        if (node.right) {
            // prepend node value to currentStr
            // explore right child
            explore(node.right, alphabet[node.val] + currentStr, stringsArr);
        }
    };

    // explore root
    explore(root, '', leafStrs);

    // set smallestIndex = 0
    let smallestIndex = 0;

    // sort the leaf strings so that we have them in alphabetical order
    leafStrs.sort();

    // set smallestLength = strings[0].length
    smallestLength = leafStrs[smallestIndex].length;

    // loop through through strings array to check for character length
    for (let i = 0; i < leafStrs.length; i++) {
        // if smallestLength > strings[i].length
        if (smallestLength > leafStrs[i].length) {
            // smallestIndex = i;
            smallestIndex = 0;

            // smallestLength = strings[i].length;
            smallestLength = leafStrs[i].length;
        }
    }

    // return strings[smallestIndex]
    return leafStrs[smallestIndex];
};