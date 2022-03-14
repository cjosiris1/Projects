/*
Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:

1. Search for a node to remove.
2. If the node is found, delete the node.

Follow up: Can you solve it with time complexity O(height of tree)?


Example 1:
        5                          5
      /  \                       /  \
    3    6        ->           4     6
  / \     \                   /      \
2   4     7                 2        7


Input: root = [5,3,6,2,4,null,7], key = 3
Output: [5,4,6,2,null,null,7]
Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.

            5
          /  \
         2   6
         \    \
         4    7

Example 2:
Input: root = [5,3,6,2,4,null,7], key = 0
Output: [5,3,6,2,4,null,7]
Explanation: The tree does not contain a node with value = 0.

Example 3:
Input: root = [], key = 0
Output: []


Constraints:
The number of nodes in the tree is in the range [0, 104].
-105 <= Node.val <= 105
Each node has a unique value.
root is a valid binary search tree.
-105 <= key <= 105
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
 * Finds in-order predecessor value. This is the maximum value on the left subtree
 * @param root
 * @return {number}
 */
const inorderPredecessor = function (root) {
    root = root.left;

    // keep going right till we hit a leaf node with the max value of the left subtree
    while (root.right) {
        root = root.right;
    }

    return root.val;
};


/**
 * Finds in-order successor value. This is the minimum value on the right subtree
 * @param root
 * @return {number}
 */
const inorderSuccessor = function (root) {
    root = root.right;

    // keep going left till we hit the minimum value of the right subtree
    while (root.left) {
        root = root.left;
    }
    return root.val;
};

/**
 * Time complexity:
 *  Balanced tree = O(log n)
 *  non-balanced tree = O(H)
 *
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {

    // cases to check for deletion
    // 1. value not found
    // 2. node is leaf node. Find the node and make it null
    // 3. non-leaf node

    // check to see if we have a null root node. If so return it
    if (!root) {
        return null;
    }

    // check to see if our key is less than our root node.
    // if it is then we need to delete from the left child
    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    }
    // if the our key is great than the root node's value then we need to delete from the right child
    else if (key > root.val) {
        root.right = deleteNode(root.right, key);
    }
    // Finally we can delete current node since we've found it
    else {
        // If we've hit a leaf node lets just set dereference it / delete it by setting root to null
        if (!root.left && !root.right) {
            root = null;
        }
        // if we have a left child node, we'll want to find the in-order predecessor, then call deleteNode to rebuild
        // the left child node's subtree by deleting the predecessor value.
        else if (root.left) {
            root.val = inorderPredecessor(root);
            root.left = deleteNode(root.left, root.val);
        }
        // Otherwise we have a right child node, so we'll want to find the in-order successor, then call deleteNode to
        // rebuild the right child node's subtree by deleting the successor value
        else {
            root.val = inorderSuccessor(root);
            root.right = deleteNode(root.right, root.val);
        }
    }

    return root;
};