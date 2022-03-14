/*
N cars are going to the same destination along a one lane road.  The destination is target miles away.

Each car i has a constant speed speed[i] (in miles per hour), and initial position position[i] miles towards the target along the road.

A car can never pass another car ahead of it, but it can catch up to it, and drive bumper to bumper at the same speed.

The distance between these two cars is ignored - they are assumed to have the same position.

A car fleet is some non-empty set of cars driving at the same position and same speed.  Note that a single car is also a car fleet.

If a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet.

How many car fleets will arrive at the destination?



Example 1:
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
Explanation:
The cars starting at 10 and 8 become a fleet, meeting each other at 12.
The car starting at 0 doesn't catch up to any other car, so it is a fleet by itself.
The cars starting at 5 and 3 become a fleet, meeting each other at 6.
Note that no other cars meet these fleets before the destination, so the answer is 3.

Note:

    - 0 <= N <= 10 ^ 4
    - 0 < target <= 10 ^ 6
    - 0 < speed[i] <= 10 ^ 6
    - 0 <= position[i] < target
    - All initial positions are different.
 */
/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function (target, position, speed) {

    const n = position.length, cars = [];
    if (n < 2) {
        return n;
    }

    // calculate and keep track of arrival times for all the cars
    for (let i = 0; i < n; i++) {
        // calculate arriving time =  (target - position) / speed
        const arriveTime = (target - position[i]) / speed[i];
        cars.push({
            position: position[i],
            time: arriveTime
        });
    }

    // sort the cars from slowest to fastest
    cars.sort((car1, car2) => car1.position - car2.position);

    let fleet = 0;

    // traverse from the fastest and compare each pair or car behind to see if there's a car that will go faster
    // to catch up and make a fleet
    for (let j = n - 1; j > 0; j--) {

        // If the car behind will take  longer to arrive then we'll count it as part of another fleet
        if (cars[j - 1].time > cars[j].time) {
            fleet++;
        }
        // otherwise if the car behind looks like it'll arrive quicker then we can assume that it's caught up,
        // so we'll set it to have it go at the same speed as the current car
        else {
            cars[j - 1].time = cars[j].time;
        }
    }

    return fleet + 1;

};