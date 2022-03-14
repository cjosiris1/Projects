/*
Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.

Example 1:
Input: nums = [1,1,1], k = 2
Output: 2

Example 2:
Input: nums = [1,2,3], k = 3
Output: 2

Constraints:
    * 1 <= nums.length <= 2 * 104
    * -1000 <= nums[i] <= 1000
    * -107 <= k <= 107

 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {

    let count = 0
    let sum = 0;

    // we store data in form of (sum, # of occurrences of sum)
    const map = new Map();

    // set the base summation occurrence 0,1
    map.set(0, 1);

    // for each index let's keep track of cumulative sum occurrences
    for(let i = 0; i < nums.length; i++){
        sum += nums[i];

        // Determine the number of times sum - k has occurred already since it'll determine the number of times a
        // subarray with sum k has occurred up to current index. Then increment the count by same amount.
        if(map.has(sum - k)){
            count += map.get(sum - k);
        }

        // Every time we encounter a new sum, we make a new entry in hashmap
        map.set(sum, map.has(sum) ? map.get(sum) + 1 : 1);
    }

    return count;

};