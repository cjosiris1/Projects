/*
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.



Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Example 2:

Input: nums = []
Output: []
Example 3:

Input: nums = [0]
Output: []


Constraints:

0 <= nums.length <= 3000
-105 <= nums[i] <= 105
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {

    let answer = [];

    // lets clone and sort the array
    let numsClone = [...nums];

    // lets sort our  array
    numsClone.sort(function (a, b) {
        return a - b;
    });

    // loop through each index to anchor the the first number in the triple
    for (let i = 0; i < numsClone.length - 2; i++) {

        // we never want any of our triples to equal each other
        if (i > 0 && numsClone[i] === numsClone[i - 1]) {
            continue;
        }

        // set our left bound as the next index = i + 1
        let j = i + 1;

        // set our right bound as the end index  = nums.length
        let k = numsClone.length - 1;

        // our target will be used for our 2sum problem
        let target = -numsClone[i];

        // while the left < right
        while (j < k) {

            // check to make sure  that value at left + right = target
            if ((numsClone[j] + numsClone[k]) === target) {

                // add the values to answer
                answer.push([
                    numsClone[i],
                    numsClone[j],
                    numsClone[k]
                ]);

                // let's slide our window to get next triplet
                j++;
                k--;

                // we only prefer unique triplets
                while (j < k && numsClone[j] === numsClone[j - 1]) {
                    j++;
                }

                while (j < k && numsClone[j] === numsClone[k + 1]) {
                    k--;
                }
            } else if (numsClone[j] + numsClone[k] > target) {
                k--;
            } else {
                j++;
            }
        }
    }

    return answer;
};