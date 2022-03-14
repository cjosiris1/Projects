<?php
/*
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "()[]{}"
Output: true

Example 3:
Input: s = "(]"
Output: false

Example 4:
Input: s = "([)]"
Output: false

Example 5:
Input: s = "{[]}"
Output: true

Constraints:
1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
 */

/**
 * Class Solution
 */
class Solution
{

    /**
     * @param String $s
     * @return Boolean
     */
    function isValid($s)
    {
        // check to make sure we have a valid string. Valid strings have a length greater than 1
        if (empty($s) || strlen($s) == 1) {
            return false;
        }

        // initialize our close map and brackets stack
        $closeMap = [
            ']' => '[',
            '}' => '{',
            ')' => '('
        ];
        $bracketsStack = [];

        // traverse through our string and perform checks for chars in our closeMap and use the brackets stack to keep
        // track of invalid brackets. The goal is to have an empty brackets stack for a valid string
        for ($i = 0; $i < strlen($s); $i++) {
            $curChar = $s[$i];

            // check if current character is a closing bracket
            if (!empty($closeMap[$curChar])) {

                // if it is check if the opening bracket exists in our closeMap and pop it off the stack
                $openingBracket = empty($bracketsStack) ? "" : array_pop($bracketsStack);

                // if it doesn't exist then we have an invalid string
                if ($openingBracket != $closeMap[$curChar]) {
                    return false;
                }
            } else {
                // keep track of all other opening brackets
                $bracketsStack[] = $curChar;
            }
        }

        return empty($bracketsStack);
    }
}