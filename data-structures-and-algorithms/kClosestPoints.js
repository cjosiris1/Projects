/*
Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

Example 1:

                           4|
                           3|  x
                      x    2|
                           1|
         -------------------+-------------------
              -4 -3 -2 -1  0|  1  2  3  4
                          -1|
                          -2|
                          -3|
                          -4|

Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].

Example 2:
Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.

Constraints:
    * 1 <= k <= points.length <= 104
    * -104 < xi, yi < 104

 */
/**
 * Time complexity = O(nlogn)
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
var kClosest = function(points, K) {

    /**
     * Merging helper
     * @param left
     * @param right
     * @return {Array}
     */
    const merge = (left = [], right = []) => {

        let results = [];
        let leftIndex = 0;
        let rightIndex = 0;
        let leftDistance;
        let rightDistance;
        let leftPoint;
        let rightPoint;

        while(leftIndex < left.length && rightIndex < right.length){
            leftPoint = left[leftIndex];
            rightPoint = right[rightIndex];

            // distance = sqrt(abs(b2 - a2)^2 + abs(b - a)^2)
            // Calculate distance from left point to origin
            leftDistance = Math.sqrt(
                Math.pow(Math.abs(leftPoint[1]), 2) + Math.pow(Math.abs(leftPoint[0]), 2)
            );

            // calculate distance from right point to origin
            rightDistance = Math.sqrt(
                Math.pow(Math.abs(rightPoint[1]), 2) + Math.pow(Math.abs(rightPoint[0]), 2)
            );


            // compare the left and right distances. Prioritize shorter distance first and keep incrementing
            // our right and left indexes
            if(leftDistance < rightDistance){
                results.push(left[leftIndex]);
                leftIndex++;
            }else{
                results.push(right[rightIndex]);
                rightIndex++;
            }
        }

        // return our results but never forget to concatenate the remaining array points/elements
        return results.concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));

    };

    /**
     * Performs the merge sort algorithm
     * @param {Array} points
     * @return {Array}
     */
    const mergeSort = (points = []) => {

        // Return our points if we do not have more than 1 point / element in points array
        if(points.length <= 1){
            return points;
        }

        // find our mid point = floor(points.length / 2)
        const mid = Math.floor(points.length / 2);

        // use our mid point to slice our points array in two: left & right
        let left = points.slice(0, mid);
        let right = points.slice(mid);

        // merge while recursively calling mergeSort on both left and right arrays
        return merge(
            mergeSort(left),
            mergeSort(right)
        );

    };

    // get our sorted points
    let sortedPoints = mergeSort(points);

    // return closest points by slicing array from 0 -> K
    return sortedPoints.slice(0, K);

};