/*
Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary).

You may assume that the intervals were initially sorted according to their start times.

Example 1:
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

Example 2:
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

Example 3:
Input: intervals = [], newInterval = [5,7]
Output: [[5,7]]

Example 4:
Input: intervals = [[1,5]], newInterval = [2,3]
Output: [[1,5]]

Example 5:
Input: intervals = [[1,5]], newInterval = [2,7]
Output: [[1,7]]


Constraints:
0 <= intervals.length <= 104
intervals[i].length == 2
0 <= intervals[i][0] <= intervals[i][1] <= 105
intervals is sorted by intervals[i][0] in ascending order.
newInterval.length == 2
0 <= newInterval[0] <= newInterval[1] <= 105
 */
/**
 * Time complexity:
 *  O(n)
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {

    let result = [];

    // traverse interval list
    intervals.forEach(interval => {

        // check if current interval is less than new interval. Add it to our result if so
        if (interval[1] < newInterval[0]) {
            result.push(interval);
        }
        // if the new interval is lesser than the current, lets add it to our result and set current interval as the new one
        else if (newInterval[1] < interval[0]) {
            result.push(newInterval);
            newInterval = interval;
        }
        // otherwise we've hit  our overlap
        else {
            // we always want to capture the minimum and maximum values of the overlap so that we can build our new interval
            newInterval[0] = Math.min(newInterval[0], interval[0]);
            newInterval[1] = Math.max(newInterval[1], interval[1]);
        }
    })

    // push the overlap we found into result
    result.push(newInterval);

    return result;

};