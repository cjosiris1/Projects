/*
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

 Example 1:
 Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
 Output: [[1,6],[8,10],[15,18]]
 Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

 Example 2:
 Input: intervals = [[1,4],[4,5]]
 Output: [[1,5]]
 Explanation: Intervals [1,4] and [4,5] are considered overlapping.

 Constraints:
    * 1 <= intervals.length <= 104
    * intervals[i].length == 2
    * 0 <= starti <= endi <= 104
 */
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {

    // check for empty intervals or case where we only have one interval
    if (intervals.length <= 1) {
        return intervals;
    }

    // sort our intervals based on start times
    let sortedIntervals = intervals.sort((a, b) => a[0] - b[0]);
    let merged = [];

    // loop through all our intervals
    sortedIntervals.forEach(interval => {

        // if list of merged intervals is empty or if current interval doesn't overlap, lets add it to our merged list
        if (merged.length === 0 || merged[merged.length - 1][1] < interval[0]) {
            merged.push(interval);
        } else {
            // otherwise lets update the overlap by merging the last interval with current
            merged[merged.length - 1][1] = Math.max(interval[1], merged[merged.length - 1][1]);
        }
    })

    return merged;
};