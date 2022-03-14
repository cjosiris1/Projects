/*
Given the root of a binary tree, return all root-to-leaf paths in any order.

A leaf is a node with no children.

Example 1:
Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]

Example 2:
Input: root = [1]
Output: ["1"]

Constraints:
The number of nodes in the tree is in the range [1, 100].
-100 <= Node.val <= 100
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
 * @return {string[]}
 */
var binaryTreePaths = function (root) {

    // initialize our results = []
    let results = [];

    // check for empty or null case
    if (!root) {
        return results;
    }

    /**
     * Helper call to explore our tree
     * @param {TreeNode} node       - current node
     * @param {string} current      - current path
     * @param {array} results       - results array
     */
    const explore = function (node, current = '', results = []) {

        // check to see if we've reached a leaf node
        if (node.left == null && node.right == null) {
            results.push(current + node.val);
        }

        // check if current node has a left child and explore the left side
        if (node.left) {
            explore(node.left, current + node.val + '->', results);
        }

        // check if current node has a right child and explore the right side
        if (node.right) {
            explore(node.right, current + node.val + '->', results);
        }
    };

    // explore our root node
    explore(root, '', results);

    // return our results
    return results;

};