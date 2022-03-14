/*
Given the root of a binary search tree and a node p in it, return the in-order successor of that node in the BST. If the given node has no in-order successor in the tree, return null.

The successor of a node p is the node with the smallest key greater than p.val.



Example 1:
        2
      /  \
     1   3

Input: root = [2,1,3], p = 1
Output: 2
Explanation: 1's in-order successor node is 2. Note that both p and the return value is of TreeNode type.

Example 2:
            5
          /  \
         3   6
       /  \
      2   4
    /
   1
Input: root = [5,3,6,2,4,null,null,1], p = 6
Output: null
Explanation: There is no in-order successor of the current node, so the answer is null.


Constraints:
The number of nodes in the tree is in the range [1, 104].
-105 <= Node.val <= 105
All Nodes will have unique values.
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {

    // if our root node is null lets return null
    if (!root) {
        return null;
    }

    // initialize our result/answer var
    let result = null;

    /**
     * Helper that will help us explore our BST to find our successor
     * @param node
     * @param {number} list - contains all the node values we'll use to compare
     * @return {null}
     */
    const explore = (node, list = []) => {
        if (!node) {
            return;
        }

        // recursively explore the left node
        explore(node.left, list);

        // Keep checking the last element in array to see if it matches our  p node's value
        // break the recursive call if we've found one
        if (list.length > 0 && list[list.length - 1] === p.val) {
            result = node;
            return;
        }

        // add the current value to our list
        list.push(node.val);

        // explore the right node
        explore(node.right, list);
    }

    // explore the root node
    explore(root);

    return result;
};


/**
 * Optimized inorder successor
 * @param root
 * @param p
 * @param successor
 * @return {TreeNode|null}
 */
var optimizedInorderSuccessor = function (root, p, successor = null) {

    // if our root node is null lets return the successor which by default is null
    if (!root) {
        return successor;
    }

    //  If the p node's value is less than the root node's value, recursively explore the left node while setting the
    // current root node as the successor
    if (p.val < root.val) {
        return inorderSuccessor(root.left, p, root);
    }

    // recursively explore the right right node while keeping the same successor
    return inorderSuccessor(root.right, p, successor);
};