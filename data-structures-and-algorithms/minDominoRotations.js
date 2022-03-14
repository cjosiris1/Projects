/*
In a row of dominoes, tops[i] and bottoms[i] represent the top and bottom halves of the ith domino. (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)

We may rotate the ith domino, so that tops[i] and bottoms[i] swap values.

Return the minimum number of rotations so that all the values in tops are the same, or all the values in bottoms are the same.

If it cannot be done, return -1.

Example 1:
Input: tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]
Output: 2
Explanation:
The first figure represents the dominoes as given by tops and bottoms: before we do any rotations.
If we rotate the second and fourth dominoes, we can make every value in the top row equal to 2, as indicated by the second figure.

Example 2:
Input: tops = [3,5,1,2,3], bottoms = [3,6,3,3,4]
Output: -1
Explanation:
In this case, it is not possible to rotate the dominoes to make one row of values equal.

Constraints:
2 <= tops.length == bottoms.length <= 2 * 104
1 <= tops[i], bottoms[i] <= 6
 */
/**
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */
var minDominoRotations = function (tops, bottoms) {

    // // initialize an occurrence dictionary for both top and bottom to track common configurations between the two
    // let topsOccurrences = {};
    // let bottomsOccurrences = {};
    //
    // // loop through the tops and add occurrence count
    // for (let i = 0; i < tops.length; i++) {
    //     if (!topsOccurrences.hasOwnProperty(tops[i])) {
    //         topsOccurrences[tops[i]] = 1;
    //     } else {
    //         topsOccurrences[tops[i]] += 1;
    //     }
    // }
    //
    // // loop through the bottoms and add the occurrence counts
    // for (let i = 0; i < bottoms.length; i++) {
    //     if (!bottomsOccurrences.hasOwnProperty(bottoms[i])) {
    //         bottomsOccurrences[bottoms[i]] = 1;
    //     } else {
    //         bottomsOccurrences[bottoms[i]] += 1;
    //     }
    // }
    //
    // // check the most common configuration on tops
    // let commonTopKey;
    // let commonTopVal;
    // Object.keys(topsOccurrences).forEach(key => {
    //     if (!commonTopKey && !commonTopVal || commonTopVal < topsOccurrences[key]) {
    //         commonTopKey = key;
    //         commonTopVal = topsOccurrences[key];
    //     }
    // });
    //
    // // check most common configuration on bottoms
    // let commonBottomKey;
    // let commonBottomVal;
    //
    // Object.keys(bottomsOccurrences).forEach(key => {
    //     if (!commonBottomKey && !commonBottomVal || commonBottomVal < bottomsOccurrences[key]) {
    //         commonBottomKey = key;
    //         commonBottomVal = bottomsOccurrences[key];
    //     }
    // });
    //
    // // set our tempA = array with common configuration
    // // set our tempB = array with least common configuration
    // let tempA;
    // let tempB;
    // let commonConfiguration;
    //
    // if (commonTopVal > commonBottomVal) {
    //     commonConfiguration = parseInt(commonTopKey);
    //     tempA = tops;
    //     tempB = bottoms;
    // } else {
    //     commonConfiguration = parseInt(commonBottomKey);
    //     tempA = bottoms;
    //     tempB = tops;
    // }
    //
    //
    // // define swap(i, arrayA, arrayB)
    // const swap = (i, arrayA, arrayB) => {
    //     // check if i is out of bounds
    //     if (i < 0 || i >= arrayA.length || i >= arrayB.length) {
    //         // return / break the swap
    //         return;
    //     }
    //
    //     // initialize temp = arrayA[i]
    //     let temp = arrayA[i];
    //
    //     // arrayA[i] = arrayB[i]
    //     arrayA[i] = arrayB[i];
    //
    //     // arrayB[i] = temp
    //     arrayB[i] = temp;
    // }
    //
    // // set our swap count = 0;
    // let swapCount = 0;
    //
    // // loop through tempA configuration from i = 0 -> tempA.length
    // for (let i = 0; i < tempA.length; i++) {
    //     // check if tempA[i] equals the most common occurrence
    //     if (tempA[i] == commonConfiguration) {
    //         // continue
    //         continue;
    //     } else if (tempB[i] == commonConfiguration) {
    //         // otherwise check if tempB[i] equals most common occurence
    //         // increment swap count  and swap if so
    //         swapCount++;
    //         swap(i, tempA, tempB);
    //
    //     } else {
    //         // else if we can't get the most common occurence break our logic
    //         return -1;
    //     }
    // }
    //
    // // return num of swaps
    // return swapCount;


    /**
     * Calculates number of swaps it takes to get all  values in A match the target
     * @param target
     * @param A
     * @param B
     * @return {number}
     */
    const numSwaps = (target, A, B) => {
        let swapCount = 0;
        for(let i = 0; i < A.length; i++){
            if(A[i] != target && B[i] != target){
                return Number.MAX_VALUE;
            }else if(A[i] != target){
                swapCount++;
            }
        }
        return swapCount;
    }

    // there are 4 scenarios where we can make the first configuration the target value for all
    // other configurations for either top / bottoms.
    let minSwaps = Math.min(
        numSwaps(tops[0], tops, bottoms),
        numSwaps(bottoms[0], tops, bottoms),
    );

    minSwaps = Math.min(minSwaps, numSwaps(tops[0], bottoms, tops));
    minSwaps = Math.min(minSwaps, numSwaps(bottoms[0], bottoms, tops));

    return minSwaps == Number.MAX_VALUE ? -1 : minSwaps;
};