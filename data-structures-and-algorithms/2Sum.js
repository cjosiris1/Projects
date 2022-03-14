/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.


Follow-up: Can you come up with an algorithm that is less than O(n2) time complexity?
 */

/**
 * Time complexity = O(n^2)
 * Space complexity = O(1)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    // initialize pair = [];
    let pair = [];

    // loop through list from i = 0 through list.length
    let first;
    let second;

    for (let i = 0; i < nums.length; i++) {
        // set first in pair at i
        first = nums[i];

        // loop through list from j = 0 through list.length
        for (let j = i + 1; j < nums.length; j++) {
            // set second in pair at j
            second = nums[j];

            // check for sum of first + second where first and second do not match
            if (first + second === target) {
                // if it matches our target lets set pair = [first, second]
                pair.push(i);
                pair.push(j);
                return pair;
            }
        }
    }

    return pair;
};

/**
 * Time complexity = O(n)
 * Space complexity = O(1)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSumOptimized = function (nums, target) {

    // keep track of indexes in a map. We'll use the map to find the difference / part of the pair that adds up to our
    // target
    const map = new Map();
    let diff;
    for (let i = 0; i < nums.length; i++) {

        // calculate diff / number we're looking for
        diff = target - nums[i];

        // if our map contains the difference, lets get the index and return [difIndex, i]
        if (map.has(diff))
            return [map.get(diff), i];

        // otherwise keep tracking the other numbers' indexes
        map.set(nums[i], i);
    }

    return [];
};