/*
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

Example 1:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Example 2:
Input: nums = [0]
Output: [0]

Constraints:
    * 1 <= nums.length <= 104
    * -231 <= nums[i] <= 231 - 1

Follow up: Could you minimize the total number of operations done?
 */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {

    let index = 0;
    let next;
    while(index < nums.length){

        const remainder = nums.slice(index).reduce((accumulater, value) => accumulater + value, 0);

        if(remainder === 0){
            return;
        }

        if(nums[index] === 0){
            let swapIndex;
            for(let i = index + 1; i < nums.length; i++){
                if(nums[i] !== 0){
                   next = nums[i];
                    swapIndex = i;
                    break;
                }
            }

            nums[index] = next;
            nums[swapIndex] = 0;
        }

        index++;
    }
};

var moveZerosOptimized = function (nums){
    for (let i = 0; i < nums.length;){
        if(nums[i] === 0){
            nums.push(nums.splice(i, 1));
        }else{
            i++;
        }
    }
};