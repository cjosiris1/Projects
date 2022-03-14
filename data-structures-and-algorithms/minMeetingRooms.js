/*
Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.

Example 1:
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2

Example 2:
Input: intervals = [[7,10],[2,4]]
Output: 1

Constraints:
    * 1 <= intervals.length <= 104
    * 0 <= starti < endi <= 106
 */
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {

    // check number of intervals, if they're less than 2 return the length
    if (intervals.length < 2) {
        return intervals.length;
    }

    // sort our intervals based on start time
    const sortedIntervals = intervals.sort((a, b) => a[0] - b[0])

    // keep track of room end times
    let roomTimes = [sortedIntervals[0][1]];

    // loop through all our sorted intervals after first interval
    for (let i = 1; i < sortedIntervals.length; i++) {

        // capture current start and end times
        const start = sortedIntervals[i][0];
        const end = sortedIntervals[i][1];

        // capture earliest time by getting the min of all room end times
        const earliest = Math.min(...roomTimes);

        // if start time is earlier than earliest, or if we have an overlap we'll need another room so let's add our end time to room times
        if (start < earliest) {
            roomTimes.push(end);
        } else {
            // otherwise let's use our earliest room and update with new end time
            roomTimes[roomTimes.indexOf(earliest)] = end;
        }
    }

    return roomTimes.length;

};