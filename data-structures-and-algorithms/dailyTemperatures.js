/*
Given a list of daily temperatures temperatures, return a list such that, for each day in the input, tells you how many days you would have to wait until a warmer temperature. If there is no future day for which this is possible, put 0 instead.

For example, given the list of temperatures temperatures = [73, 74, 75, 71, 69, 72, 76, 73], your output should be [1, 1, 4, 2, 1, 1, 0, 0].

Note: The length of temperatures will be in the range [1, 30000]. Each temperature will be an integer in the range [30, 100].
 */
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {

    // initialize our index stack
    let stack = [];
    let result = [];

    // loop through all temperatures
    for (let i = 0; i < temperatures.length; i++) {

        // prefill result with zeros
        result[i] = 0;

        // go through our stack and find where current temp is higher than previously recorded temp
        while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            // pop the stack to get our index and calculate number of days that have passed.
            let index = stack.pop();
            result[index] = i - index;
        }

        // add current index to stack
        stack.push(i);
    }

    return result;
};