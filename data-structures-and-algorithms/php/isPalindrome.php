<?php
/*
Given a string s, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

Example 1:
    Input: s = "A man, a plan, a canal: Panama"
    Output: true
    Explanation: "amanaplanacanalpanama" is a palindrome.

Example 2:
    Input: s = "race a car"
    Output: false
    Explanation: "raceacar" is not a palindrome.

Constraints:
    * 1 <= s.length <= 2 * 105
    * s consists only of printable ASCII characters.
 */
/**
 * Class Solution
 */
class Solution {

    /**
     * @param String $s
     * @return Boolean
     */
    function isPalindrome($s) {

        $palindromeStr = strtolower(preg_replace("/[^a-zA-Z0-9]/", '', $s));

        if(empty($palindromeStr) || strlen($palindromeStr) <= 1)
            return true;


        $n = strlen($palindromeStr);

        for($i = 0; $i < $n / 2; $i++){
            if($palindromeStr[$i] != $palindromeStr[$n - $i - 1])
                return false;
        }

        return true;
    }
}