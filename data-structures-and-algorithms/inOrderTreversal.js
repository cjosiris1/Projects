/*
Given the root of a binary tree, return the inorder traversal of its nodes' values.



Example 1:
         1
          \
           2
         /
       3
Input: root = [1,null,2,3]
Output: [1,3,2]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]

Example 4:
        1
       /
      2
Input: root = [1,2]
Output: [2,1]

Example 5:
        1
         \
          2
Input: root = [1,null,2]
Output: [1,2]


Constraints:
The number of nodes in the tree is in the range [0, 100].
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
 * @return {number[]}
 */
var inorderTraversal = function (root) {

    // check if root node is null return empty list if so
    if (!root) {
        return [];
    }

    /**
     * Helper function that will help us explore our tree
     * @param {TreeNode} node
     * @param {array} list
     * @return {array}
     */
    const explore = (node, list = []) => {
        if (!node) {
            return list;
        }

        // explore the left node
        explore(node.left, list);

        // add the current node's value to our results array
        list.push(node.val);

        // explore the right node
        return explore(node.right, list);
    };

    // explore our root node
    return explore(root);
};