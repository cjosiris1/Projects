/*
Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:

a binary tree in which the left and right subtrees of every node differ in height by no more than 1.



Example 1:
        3
      /  \
     9   20
        / \
      15  7

Input: root = [3,9,20,null,null,15,7]
Output: true

Example 2:
                    1
                   / \
                 2    2
               / \
             3    3
           / \
         4    4
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false

Example 3:
Input: root = []
Output: true

Constraints:
    * The number of nodes in the tree is in the range [0, 5000].
    * -104 <= Node.val <= 104
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
 * time complexity = O(n^2logn)
 * space complexity = O(1)
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {

    if (!root) {
        return true;
    }

    /**
     * Helper to get tree depth given a node
     * Time complexity = O(nlogn)
     * Space complexity = O(1)
     * @param node
     * @return {number}
     */
    function getTreeHeightDFS(node) {

        // base case for if a node is null we will return 0
        // usually node is null because we've hit the leaf node's children
        if (!node) {
            return 0;
        }

        // recursively find the depth of the left & right nodes
        // Depth will be the max value of the left and right depths + 1
        return Math.max(
            getTreeHeightDFS(node.left),
            getTreeHeightDFS(node.right)
        ) + 1;
    }

    // console.log(getTreeHeightDFS(root))

    let queue = [root];
    let curNode;
    let heightDiff;

    // time complexity = O(n) * (O(nlogn) + O(nlogn)) = O(n^2logn)
    // space complexity = O(1)
    while (queue.length > 0) {
        curNode = queue.pop();
        heightDiff = Math.abs(getTreeHeightDFS(curNode.left) - getTreeHeightDFS(curNode.right));

        // A binary tree in which the left and right subtrees of every node differ in height by no more than 1.
        // Return false if difference is greater than 1
        if (heightDiff > 1) {
            return false;
        }

        // if we have a left node, lets push it to our queue to be processed
        if (curNode.left) {
            queue.push(curNode.left);
        }

        // if we have a right node, lets push it to our queue to be processed
        if (curNode.right) {
            queue.push(curNode.right);
        }
    }

    return true;
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * Time complexity: O(nlogn)
 * Space complexity: O(n)
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalancedOptimized = function (root) {

    if (!root) {
        return true;
    }

    /**
     * Helper to get tree depth given a node
     * @param node
     * @return {number}  returns -1 if not balanced
     */
    const getBalancedTreeHeightDFS = function(node) {


        // base case for if a node is null we will return 0
        // usually node is null because we've hit the leaf node's children
        if (!node) {
            return 0;
        }

        // recursively find the depth of the left & right nodes
        // first check the left subtree's height
        const leftHeight = getTreeHeightDFS(node.left);
        if(leftHeight === -1)
            return -1;

        // then check the right subtree
        const rightHeight = getTreeHeightDFS(node.right);
        if(rightHeight === -1){
            return -1;
        }

        // check if there's a height difference of more than 1 level in the right and left subtrees
        // a balanced sub tree will always have a height difference no more than 1
        if(Math.abs(leftHeight - rightHeight) > 1){
            return -1;
        }

        // Depth will be the max value of the left and right depths + 1
        return Math.max(
            leftHeight,
            rightHeight
        ) + 1;
    };

    return getBalancedTreeHeightDFS(root) !== -1;
};