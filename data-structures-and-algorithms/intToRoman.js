/*
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

    - I can be placed before V (5) and X (10) to make 4 and 9.
    - X can be placed before L (50) and C (100) to make 40 and 90.
    - C can be placed before D (500) and M (1000) to make 400 and 900.
    - Given an integer, convert it to a roman numeral.



Example 1:
Input: num = 3
Output: "III"

Example 2:
Input: num = 4
Output: "IV"

Example 3:
Input: num = 9
Output: "IX"

Example 4:
Input: num = 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.

Example 5:
Input: num = 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.


Constraints:
    - 1 <= num <= 3999

 */
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {

    // value mappings
    const valueMappings = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };

    let result = '';
    let remainder = num;

    while (remainder > 0) {

        // C can be placed before D (500) and M (1000) to make 400 and 900.
        // X can be placed before L (50) and C (100) to make 40 and 90.
        // I can be placed before V (5) and X (10) to make 4 and 9.

        // check for number of 1000s
        let numberOf1000s = Math.floor(remainder / valueMappings.M);

        // build our result string with appropriate character
        for (let i = 0; i < numberOf1000s; i++) {
            result += 'M';
        }

        // subtract from the remainder value
        remainder -= (numberOf1000s * valueMappings.M);

        // check for 900
        if (remainder >= 900 && remainder < valueMappings.M) {
            result += 'CM';
            remainder -= 900;
        }

        // check for 500
        let numberOf500s = Math.floor(remainder / valueMappings.D);
        for (let i = 0; i < numberOf500s; i++) {
            result += 'D';
        }
        remainder -= (numberOf500s * valueMappings.D);

        // check for 400
        if (remainder >= 400 && remainder < valueMappings.D) {
            result += 'CD';
            remainder -= 400;
        }

        // check for 100
        let numberOf100s = Math.floor(remainder / valueMappings.C);
        for (let i = 0; i < numberOf100s; i++) {
            result += 'C';
        }
        remainder -= (numberOf100s * valueMappings.C);

        // check for 90
        if (remainder >= 90 && remainder < valueMappings.C) {
            result += 'XC';
            remainder -= 90;
        }

        // check for 50
        let numberOf50s = Math.floor(remainder / valueMappings.L);
        for (let i = 0; i < numberOf50s; i++) {
            result += 'L';
        }
        remainder -= (numberOf50s * valueMappings.L);

        // check for 40
        if (remainder >= 40 && remainder < valueMappings.L) {
            result += 'XL';
            remainder -= 40;
        }

        // check 10
        let numberOf10s = Math.floor(remainder / valueMappings.X);
        for (let i = 0; i < numberOf10s; i++) {
            result += 'X';
        }
        remainder -= (numberOf10s * valueMappings.X);

        // check 9
        if (remainder === 9) {
            result += 'IX';
            remainder -= 9;
        }

        // check 5
        let numberOf5s = Math.floor(remainder / valueMappings.V);
        for (let i = 0; i < numberOf5s; i++) {
            result += 'V';
        }
        remainder -= (numberOf5s * valueMappings.V);

        // check for 4
        if (remainder === 4) {
            result += 'IV';
            remainder -= 4;
        }

        // check for 1s
        let numberOf1s = Math.floor(remainder / valueMappings.I);
        for (let i = 0; i < numberOf1s; i++) {
            result += 'I';
        }
        remainder -= (numberOf1s * valueMappings.I);
    }

    return result;
};

/**
 * @param {number} num
 * @return {string}
 */
var intToRomanSimple = function(num) {
    let romanNumber = '';

    const valueMapping = {
        "1": "I",
        "4": "IV",
        "5": "V",
        "9": "IX",
        "10": "X",
        "40": "XL",
        "50": "L",
        "90": "XC",
        "100": "C",
        "400": "CD",
        "500": "D",
        "900": "CM",
        "1000": "M"
    };

    let values = Object.keys(valueMapping);

    // loop through each symbol in reverse order from largest,
    // stopping if num becomes 0
    for(let i = values.length - 1; i >= 0 && num > 0; i--){

        // repeat while the current symbol still fits into num
        while(parseInt(values[i]) <= num){
            num -= parseInt(values[i]);
            romanNumber += valueMapping[values[i]];
        }
    }

    return romanNumber;
};