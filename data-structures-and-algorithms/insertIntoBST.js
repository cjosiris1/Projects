/*
You are given the root node of a binary search tree (BST) and a value to insert into the tree. Return the root node of the BST after the insertion. It is guaranteed that the new value does not exist in the original BST.

Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST after insertion. You can return any of them.

Example 1:
            4                       4
          /  \                    /   \
        2    7       ->         2      7
      /  \                    /  \    /
    1    3                  1     3  5


Input: root = [4,2,7,1,3], val = 5
Output: [4,2,7,1,3,5]
Explanation: Another accepted tree is:
           4
          /  \
        2    7
      /  \
    1    3
          \
          4

Example 2:
Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]

Example 3:
Input: root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
Output: [4,2,7,1,3,5]


Constraints:
    * The number of nodes in the tree will be in the range [0, 104].
    * -108 <= Node.val <= 108
    * All the values Node.val are unique.
    * -108 <= val <= 108
    * It's guaranteed that val does not exist in the original BST.
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
 * Time complexity:
 *  general case = O(h)
 *  worst case = O(n)
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function (root, val) {

    // check of root node is null, return new node with value if so
    if (!root) {
        return new TreeNode(val);
    }

    // set current node to point to root. We'll be temporarily updating the current node as we try to find the right place
    // to add the new value
    let curNode = root;

    while (true) {

        // if our new value is great than current node we can search for the spot to place it in the right subtree
        if (curNode.val <= val) {

            // we want to make sure that the current node has a right subtree. If it does we want to set curNode to
            // the right subtree
            if (curNode.right) {
                curNode = curNode.right;
            }
            // otherwise we've found our spot to add the new value and we can break our while loop
            else {
                curNode.right = new TreeNode(val);
                break;
            }

        }
        // if the new value is lesser than the current node we'll be adding it to the left subtree
        else {
            // if we have a left subtree we want to set the curNode to the left subtree till we no longer have a left
            // subtree value
            if (curNode.left) {
                curNode = curNode.left;
            }
            // otherwise we've found our spot. We can now set the left node of curNode to the new value
            else {
                curNode.left = new TreeNode(val);
                break;
            }
        }
    }

    return root;
};

/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBSTRecursive = function (root, val) {

    // check of root node is null, return new node with value if so
    if (!root) {
        return new TreeNode(val);
    }

    // if our new value is greater thank the current root node then we'll be adding the new value to the right
    // subtree
    if (root.val < val) {

        root.right = insertIntoBSTRecursive(root.right, val);
    }
    // otherwise our new value is lesser than the current root node so we'll be adding it to the left subtree
    else {
        root.left = insertIntoBSTRecursive(root.left, val);
    }

    return root;
}