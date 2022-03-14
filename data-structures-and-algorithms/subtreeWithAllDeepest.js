/*
Given the root of a binary tree, the depth of each node is the shortest distance to the root.

Return the smallest subtree such that it contains all the deepest nodes in the original tree.

A node is called the deepest if it has the largest depth possible among any node in the entire tree.

The subtree of a node is tree consisting of that node, plus the set of all descendants of that node.

Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4]
Output: [2,7,4]

Explanation: We return the node with value 2, colored in yellow in the diagram.
The nodes coloured in blue are the deepest nodes of the tree.
Notice that nodes 5, 3 and 2 contain the deepest nodes in the tree but node 2 is the smallest subtree among them, so we return it.

Example 2:
Input: root = [1]
Output: [1]

Explanation: The root is the deepest node in the tree.

Example 3:
Input: root = [0,1,3,null,2]
Output: [2]
Explanation: The deepest node in the tree is 2, the valid subtrees are the subtrees of nodes 2, 1 and 0 but the subtree of node 2 is the smallest.


Constraints:
The number of nodes in the tree will be in the range [1, 500].
0 <= Node.val <= 500
The values of the nodes in the tree are unique.
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
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function (root) {

    // initialize our max depth
    let maxDepth = 0;

    // initialize our deepest node
    let deepestNode = root;

    /**
     * Helper function to explore our tree to find the deepest node
     * @param node
     * @param depth
     * @return {number}
     */
    const exploreTreeDFS = function (node, depth) {

        // base case for if a node is null we will return the current depth -1
        // usually node is null because we've hit the leaf node's children
        if (!node) {
            return depth - 1;
        }

        // set our maxDepth between current and maxDepth
        maxDepth = Math.max(maxDepth, depth);

        // recursively find the depth of the left & right nodes
        let leftNodeDepth = exploreTreeDFS(node.left, depth + 1);
        let rightNodeDepth = exploreTreeDFS(node.right, depth + 1);

        // if we've hit the max depth lets set our deepest node to current node
        if (leftNodeDepth == maxDepth && rightNodeDepth == maxDepth) {
            deepestNode = node;
        }

        // return the highest depth value between the left and right nodes
        return Math.max(leftNodeDepth, rightNodeDepth);
    };

    // explore our root node
    exploreTreeDFS(root, 0);

    // return deepest node
    return deepestNode;
};