/*
There are several cards arranged in a row, and each card has an associated number of points. The points are given in the integer array cardPoints.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array cardPoints and the integer k, return the maximum score you can obtain.

Example 1:
Input: cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12
Explanation: After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.

Example 2:
Input: cardPoints = [2,2,2], k = 2
Output: 4
Explanation: Regardless of which two cards you take, your score will always be 4.

Example 3:
Input: cardPoints = [9,7,7,9,7,7,9], k = 7
Output: 55
Explanation: You have to take all the cards. Your score is the sum of points of all cards.

Example 4:
Input: cardPoints = [1,1000,1], k = 1
Output: 1
Explanation: You cannot take the card in the middle. Your best score is 1.

Example 5:
Input: cardPoints = [1,79,80,1,1,1,200,1], k = 3
Output: 202

Constraints:
1 <= cardPoints.length <= 105
1 <= cardPoints[i] <= 104
1 <= k <= cardPoints.length
 */
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function (cardPoints, k) {
    let answer = 0;
    let totalScore = 0;
    let n = cardPoints.length;

    // sum up all the cards and get total score
    cardPoints.forEach(value => {
        totalScore += value;
    })

    // if we're only selecting the same number of cards as the supplied deck
    // lets return the total score
    if (n == k) {
        return totalScore;
    }

    // initialize window score to 0
    let windowScore = 0;

    // initialize start index for our window
    let windowStart = 0;

    // perform sliding window operation to find maximum score
    for (let windowEnd = 0; windowEnd < n; windowEnd++) {

        // add up all the non-picked card points in the deck using the windows end index
        windowScore += cardPoints[windowEnd];

        // we want to make sure that our window only contains the non-picked cards
        // window end is anything above n - k - 1
        if (windowEnd >= n - k - 1) {

            // our score will be the maximum value of:
            // totalScore - non picked cards window score
            answer = Math.max(answer, totalScore - windowScore);

            // decrease our window score by moving up the window start index and decreasing the
            // window score by the value at that index
            windowScore -= cardPoints[windowStart++];
        }
    }

    return answer;
};