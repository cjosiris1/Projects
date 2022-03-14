<?php

/*
Given an m x n matrix, return all elements of the matrix in spiral order.



Example 1:
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]

Example 2:
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]


Constraints:
m == matrix.length
n == matrix[i].length
1 <= m, n <= 10
-100 <= matrix[i][j] <= 100

 */
class Solution
{

    /**
     * @param Integer[][] $matrix
     * @return Integer[]
     */
    function spiralOrder($matrix)
    {

        // initialize result array
        $nums = [];

        // check for worst case scenario matrix is null or empty
        if (empty($matrix)) {

            // return our empty result
            return $nums;
        }

        // track all our bounds
        $left = 0;
        $right = sizeof($matrix[0]) - 1;
        $top = 0;
        $bottom = sizeof($matrix) - 1;

        // get size of matrix
        $size = sizeof($matrix) * sizeof($matrix[0]);

        // while size of result < matrixSize
        while (sizeof($nums) < $size) {
            // traverse through the top row while result size is less that matrix size
            for ($i = $left; $i <= $right && sizeof($nums) < $size; $i++) {
                // add current element to results
                $nums[] = $matrix[$top][$i];
            }

            // move down
            $top++;

            // traverse through the right most column while result size is less than matrix size
            for ($i = $top; $i <= $bottom && sizeof($nums) < $size; $i++) {
                // add current element to results
                $nums[] = $matrix[$i][$right];
            }

            // move to the left
            $right--;

            // traverse through the bottom row while result size is less than the matrix size
            for ($i = $right; $i >= $left && sizeof($nums) < $size; $i--) {
                // add current element to results
                $nums[] = $matrix[$bottom][$i];
            }

            // move up
            $bottom--;

            // traverse through left column while result size is less than matrix size
            for ($i = $bottom; $i >= $top && sizeof($nums) < $size; $i--) {
                // add current element in loop to results
                $nums[] = $matrix[$i][$left];
            }

            // move to the right
            $left++;

        }

        return $nums;
    }
}