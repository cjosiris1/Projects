/*
Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.


Example 1:
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Example 2:
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

Constraints:
1 <= k <= nums.length <= 104
-104 <= nums[i] <= 104
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    let sorted = [];

    /**
     * Our helper to merge two arrays into sorted position
     * @param {array} leftArr
     * @param {array} rightArr
     * @return {array}
     */
    const merge = (leftArr = [], rightArr = []) => {

        // initialize our final merged array
        let merged = [];

        // initialize our left and right pointers to 0
        let leftIndex = 0;
        let rightIndex = 0;

        // process / keep adding elements to our sorted array when our pointers are within the proper bounds
        while (leftIndex < leftArr.length && rightIndex < rightArr.length) {

            // compare the left and right numbers at both rightIndex and leftIndex while adding and moving the pointers
            // forward
            if (leftArr[leftIndex] < rightArr[rightIndex]) {
                merged.push(leftArr[leftIndex]);
                leftIndex++;
            } else {
                merged.push(rightArr[rightIndex]);
                rightIndex++;
            }
        }

        // return the merged array but also don't forget any remainders
        return merged.concat(leftArr.slice(leftIndex))
            .concat(rightArr.slice(rightIndex));

    };

    /**
     * Helper to perform merge sort algorithm
     * @param arr
     * @return {*[]|Array}
     */
    const mergeSort = (arr = []) => {

        // When an array only has 1 element or nothing at all we'll assume that it is already sorted
        if (arr.length < 2) {
            return arr;
        }

        // find the midpoint of our array and split it in two.
        const mid = Math.floor(arr.length / 2);
        let left = arr.slice(0, mid);
        let right = arr.slice(mid);

        // recursive call to break down arr and merge the results
        return merge(
            mergeSort(left),
            mergeSort(right)
        );
    };

    // get sorted array
    sorted = mergeSort(nums);

    // kth largest = arr[n - k]
    return sorted[nums.length - k];

};