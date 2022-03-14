/*
You are given a floating-point number hour, representing the amount of time you have to reach the office. To commute to the office, you must take n trains in sequential order. You are also given an integer array dist of length n, where dist[i] describes the distance (in kilometers) of the ith train ride.

Each train can only depart at an integer hour, so you may need to wait in between each train ride.

For example, if the 1st train ride takes 1.5 hours, you must wait for an additional 0.5 hours before you can depart on the 2nd train ride at the 2 hour mark.
Return the minimum positive integer speed (in kilometers per hour) that all the trains must travel at for you to reach the office on time, or -1 if it is impossible to be on time.

Tests are generated such that the answer will not exceed 107 and hour will have at most two digits after the decimal point.

Example 1:
Input: dist = [1,3,2], hour = 6
Output: 1
Explanation: At speed 1:
- The first train ride takes 1/1 = 1 hour.
- Since we are already at an integer hour, we depart immediately at the 1 hour mark. The second train takes 3/1 = 3 hours.
- Since we are already at an integer hour, we depart immediately at the 4 hour mark. The third train takes 2/1 = 2 hours.
- You will arrive at exactly the 6 hour mark.

Example 2:
Input: dist = [1,3,2], hour = 2.7
Output: 3
Explanation: At speed 3:
- The first train ride takes 1/3 = 0.33333 hours.
- Since we are not at an integer hour, we wait until the 1 hour mark to depart. The second train ride takes 3/3 = 1 hour.
- Since we are already at an integer hour, we depart immediately at the 2 hour mark. The third train takes 2/3 = 0.66667 hours.
- You will arrive at the 2.66667 hour mark.

Example 3:
Input: dist = [1,3,2], hour = 1.9
Output: -1
Explanation: It is impossible because the earliest the third train can depart is at the 2 hour mark.


Constraints:
n == dist.length
1 <= n <= 105
1 <= dist[i] <= 105
1 <= hour <= 109
There will be at most two digits after the decimal point in hour.
 */
/**
 * @param {number[]} dist
 * @param {number} hour
 * @return {number}
 */
var minSpeedOnTime = function (dist, hour) {

    /**
     * Helper call to check if we can make it through journey given a particular speed
     * @param {Number} speed
     * @param {Array} dist
     * @param {Number} hour
     * @return {boolean}
     */
    const canMakeIt = function (speed, dist, hour) {

        // initialize our completion hours
        let completionHours = 0;

        // loop through our stops and calculate how much time it takes to go through each stop
        for (let i = 0; i < dist.length; i++) {

            // we do do not to ceil in last stop since we'd have completed our journey
            if (i === dist.length - 1) {
                completionHours += dist[i] / speed;
                break;
            }

            // add the time it takes to complete current stop but do not start the next leg till the hour is complete thus the ceil function
            completionHours += Math.ceil(dist[i] / speed);
        }

        // compare the completed hours with the total journey
        return completionHours <= hour;
    };

    // initialize our min, mid, max and answer speeds
    let minSpeed = 1;
    let midSpeed;
    let maxSpeed = Number.MAX_VALUE;
    let answer = maxSpeed;

    // perform a binary search to find the correct speed to complete our journey
    while (minSpeed <= maxSpeed) {

        // find our midSpeed
        midSpeed = minSpeed + (maxSpeed - minSpeed) / 2;

        // if we can make it within the midSpeed let's set our answer to the lesser of mid speed and answer.
        // Then change our bounds by setting the max speed to mid speed - 1. Otherwise set the min speed to mid speed + 1
        if (canMakeIt(midSpeed, dist, hour)) {
            answer = Math.min(answer, midSpeed);
            maxSpeed = midSpeed - 1;
        } else {
            minSpeed = midSpeed + 1;
        }
    }

    // if our answer returns the max value lets return -1 since we could not find a speed that could complete our journey
    // otherwise we found the minimum speed to complete our journey
    return answer === Number.MAX_VALUE ? -1 : answer;

};