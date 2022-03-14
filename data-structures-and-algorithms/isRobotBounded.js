/*
On an infinite plane, a robot initially stands at (0, 0) and faces north. The robot can receive one of three instructions:

"G": go straight 1 unit;
"L": turn 90 degrees to the left;
"R": turn 90 degrees to the right.
The robot performs the instructions given in order, and repeats them forever.

Return true if and only if there exists a circle in the plane such that the robot never leaves the circle.

Example 1:
Input: instructions = "GGLLGG"
Output: true
Explanation: The robot moves from (0,0) to (0,2), turns 180 degrees, and then returns to (0,0).
When repeating these instructions, the robot remains in the circle of radius 2 centered at the origin.

Example 2:
Input: instructions = "GG"
Output: false
Explanation: The robot moves north indefinitely.

Example 3:
Input: instructions = "GL"
Output: true
Explanation: The robot moves from (0, 0) -> (0, 1) -> (-1, 1) -> (-1, 0) -> (0, 0) -> ...

Constraints:
1 <= instructions.length <= 100
instructions[i] is 'G', 'L' or, 'R'.
 */
/**
 * @param {string} instructions
 * @return {boolean}
 */
var isRobotBounded = function (instructions) {

    // initialize starting coords = [0, 0]
    let starting = [0, 0];

    // initialize direction vectors = [0, 1]
    let direction = [0, 1];

    // loop through though our instructions 4 times
    for (let i = 0; i < 4; i++) {

        // initialize remaining instructions
        let remainingInstructions = instructions.split('');

        let currentInstruction;
        while (remainingInstructions.length > 0) {
            currentInstruction = remainingInstructions.pop();
            switch (currentInstruction) {
                // go straight 1 unit;
                case 'G':
                    starting[0] += direction[0];
                    starting[1] += direction[1];
                    break;
                // turn 90 degrees to the left
                case 'L':
                    direction = [-direction[1], direction[0]];
                    break;
                // turn 90 degrees to the right.
                case 'R':
                    direction = [direction[1], -direction[0]];
                    break;
            }
        }
    }

    // return if we're back at the starting point
    return starting[0] === 0 && starting[1] === 0;
};