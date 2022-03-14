/*
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

Example 2:
Input: root = [1]
Output: [[1]]

Example 3:
Input: root = []
Output: []

Constraints:
The number of nodes in the tree is in the range [0, 2000].
-1000 <= Node.val <= 1000
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
 * @return {number[][]}
 */
var levelOrder = function (root) {

    // check for empty case
    if (!root) {
        return [];
    }

    // initialize our queue
    let queue = [root]

    // initialize our result list
    let result = [];

    // initialize current node in queue
    let node;

    // initialize the level values
    let levelValues;

    // initialize our queue length
    let queueLength;

    // continue processing while our queue is not empty
    while (queue.length > 0) {

        // reset our level values to an empty list
        levelValues = [];

        // set our queue length so that we don't lose it since we'll be popping our array
        queueLength = queue.length;

        // loop through our queue size
        for (let i = 0; i < queueLength; i++) {

            // get the first value in queue
            node = queue.shift();

            // add the value to our levels values list
            levelValues.push(node.val);

            // check if current node has a left child, if so add it to queue
            if (node.left) {
                queue.push(node.left);
            }

            // check if current node has a right child, if so add it to the queue
            if (node.right) {
                queue.push(node.right);
            }
        }

        // if our levelValues queue is not empty let's add it to our results
        if (levelValues.length > 0) {
            result.push(levelValues);
        }

    }

    return result;

};