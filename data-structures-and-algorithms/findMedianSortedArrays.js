/*
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Example 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.

Example 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.

Example 3:
Input: nums1 = [0,0], nums2 = [0,0]
Output: 0.00000

Example 4:
Input: nums1 = [], nums2 = [1]
Output: 1.00000

Example 5:
Input: nums1 = [2], nums2 = []
Output: 2.00000

Constraints:
nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {

    // Input: nums1[], nums2[]
    // Output: a number representing the median of the two sorted arrays
    // Edge Cases:
    // [1], [2] -> 1.5
    // [2], [5] -> 3.5
    // [2,5,6], [8] -> 5.5
    // [1,4,7], [2,3,9,10] ->

    // []
    // [2,5,6,8]
    // mid = floor(4 / 2) -> 2
    // median = (5+6) / 2 -> 5.5


    // initialize and empty array that we'll use to find the full merged sorted array
    let mergedArr = [];

    // we'll create a helper function to merge nums1 and nums2
    const mergeArr = (leftArr, rightArr) => {
        // within this function we'll initialize a merged array
        let mergedArr = [];

        // initialize leftIndex = 0
        let leftIndex = 0;

        // initialize rightIndex = 0
        let rightIndex = 0;

        // while leftArrIndex < leftArr.length and rightArrayIndex < rightArr.length
        while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
            // check if leftArr[leftIndex] < rightArr[rightIndex]
            if (leftArr[leftIndex] < rightArr[rightIndex]) {
                // push leftArr[leftIndex] to our merged array
                mergedArr.push(leftArr[leftIndex]);

                // we'll increment leftIndex++
                leftIndex++;
            } else {
                // else if: rightArr[rightIndex] > leftArr[leftIndex]
                // push rightArr[rightIndex] to merged array
                mergedArr.push(rightArr[rightIndex]);

                // rightIndex++
                rightIndex++;
            }
        }

        // return merged by concatenating remaining arrays
        return mergedArr.concat(leftArr.slice(leftIndex))
            .concat(rightArr.slice(rightIndex));
    }

    // use our helper function to merge nums1 and nums2
    mergedArr = mergeArr(nums1, nums2);

    // determine the length of the new merged array to help find the midpoint or split
    // the new array in half. mid = floor(merged.length / 2)
    const mid = Math.floor(mergedArr.length / 2);
    let median = null;

    if (mergedArr.length % 2 === 0) {
        // median = (merged[mid - 1] + merged[mid]) / 2
        median = (mergedArr[mid - 1] + mergedArr[mid]) / 2;
    } else {
        // if the mid value is an odd number
        // median = merged[mid] since we got the floor value
        median = mergedArr[mid];
    }

    // return the median
    return median;
};