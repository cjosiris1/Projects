<?php

/**
 * Class Node
 */
class Node
{
    var $value;
    var $left;
    var $right;

    function __construct($val)
    {
        $this->value = $val;
        $this->left = null;
        $this->right = null;
    }
}

/**
 * Class BST
 */
class BST
{
    var Node $root;

    /**
     * BST constructor.
     * @param $val - root value
     */
    function __construct($val = null)
    {
        if(!empty($val)) {
            $this->root = new Node($val);
        }
    }

    /**
     * Finds node in BST given a value
     * @param $val
     * @return Node|null
     */
    function find($val)
    {
        /**
         * Recursive helper function to find node.
         * @param $node
         * @param $val
         * @return Node|null
         */
        $__findNodeDFS = function ($node, $val) use (&$__findNodeDFS) {

            // return node if empty of if we've found our match
            if (empty($node) || $node->value == $val) {
                return $node;
            }

            // check to see if our value falls in the left subtree
            if ($val < $node->value) {
                return $__findNodeDFS($node->left, $val);
            } // otherwise check the right subtree
            else {
                return $__findNodeDFS($node->right, $val);
            }
        };

        return $__findNodeDFS($this->root, $val);
    }

    /**
     * Adds a value to our BST
     * @param $val
     */
    function add($val)
    {
        /**
         * helper to add value to our BST
         * @param $node
         * @param $val
         * @return mixed|Node
         */
        $__addNode = function (&$node, $val) use (&$__addNode) {
            // if we've hit an empty node, add new value
            if (empty($node)) {
                return new Node($val);
            }

            // check if value is less than current node, add value to left subtree if so
            if ($val < $node->value) {
                $node->left = $__addNode($node->left, $val);
            } // otherwise add value to right subtree
            else {
                $node->right = $__addNode($node->right, $val);
            }

            return $node;
        };

        // add value using our helper function to root
        $__addNode($this->root, $val);
    }

    /**
     * @param $val
     */
    function delete($val)
    {
        /**
         * Get the maximum value on the left subtree
         * @param $node
         * @return mixed
         */
        $__inorderPredecessor = function ($node) {
            $node = $node->left;
            while ($node->right) {
                $node = $node->right;
            }
            return $node->value;
        };

        /**
         * Get the minimum value on the right subtree
         * @param $node
         * @return mixed
         */
        $__inorderSuccessor = function ($node) {
            $node = $node->right;
            while ($node->left) {
                $node = $node->left;
            }
            return $node->value;
        };

        /**
         * Helper to delete a node from a BST
         * @param $node
         * @param $val
         * @return Node|null
         */
        $__deleteNode = function (&$node, $val) use (&$__deleteNode, $__inorderSuccessor, $__inorderPredecessor) {

            // check if we've hit a null node
            if (empty($node)) {
                return null;
            } // check if value is lesser than current node, if it is delete from the left subtree
            else if ($val < $node->value) {
                $node->left = $__deleteNode($node->left, $val);
            } // check if value is greater than current node, if it is delete from right subtree
            else if ($val > $node->value) {
                $node->right = $__deleteNode($node->right, $val);
            } // we've actually hit the node we'd like to delete
            else {

                // since our node is a leaf node we can delete it by setting node to null
                if (empty($node->left) && empty($node->right)) {
                    $node = null;
                }
                // if our node has a left subtree lets find the inorder predecessor and set it as current value
                // then traverse through the left subtree to delete it
                else if (!empty($node->left)) {
                    $node->value = $__inorderPredecessor($node);
                    $node->left = $__deleteNode($node->left, $node->value);
                }
                // otherwise we have a right subtree, let's find the inorder successor and set it as the current value
                // then traverse through the right subtree to delete it
                else {
                    $node->value = $__inorderSuccessor($node);
                    $node->right = $__deleteNode($node->right, $node->value);
                }
            }

            return $node;
        };

        $__deleteNode($this->root, $val);
    }
}