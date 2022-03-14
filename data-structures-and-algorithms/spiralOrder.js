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
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {

    // initialize our returned list
    let nums = [];

    // check for case where matrix is null or empty
    if (!matrix || matrix.length == 0)
        return nums;

    // keep track of bounds
    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    // get the size of our matrix
    let size = matrix.length * matrix[0].length;

    // loop through matrix till we get all the numbers added
    while (nums.length < size) {

        // traverse along the top rows
        for (let i = left; i <= right && nums.length < size; i++) {
            // add element at (top,i) to nums array
            nums.push(matrix[top][i]);
        }

        // lets move down our top pointer
        top++;

        // traverse along our columns on the right side
        for (let i = top; i <= bottom && nums.length < size; i++) {
            // add element at (i, right) to nums array
            nums.push(matrix[i][right]);
        }

        // let's move to the left
        right--;

        // traverse along our bottom rows to the left
        for (let i = right; i >= left && nums.length < size; i--) {

            // add element at (bottom, i) to nums array
            nums.push(matrix[bottom][i]);
        }

        // let's move up
        bottom--;

        // traverse along our columns on the left side
        for (let i = bottom; i >= top && nums.length < size; i--) {

            // add element at (i, left) to array
            nums.push(matrix[i][left])
        }

        // let's move to the right
        left++;

    }

    return nums;
};