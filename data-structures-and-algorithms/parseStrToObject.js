/**
 * @param {string} str
 * @return {boolean}
 */
const isNumber = function (str) {

    // check if our string is empty
    if (!str || str.length === 0) {
        return false;
    }

    // initialize flags for checking seen digits, exponents and dots
    let seenDigit = false;
    let seenExponent = false;
    let seenDot = false;

    // traverse through each character of our string
    for (let i = 0; i < str.length; i++) {

        // get current character
        const char = str[i];

        // check if current character is a number, if it is let's flag that we've seen a digit
        if (!isNaN(char)) {
            seenDigit = true;
        }
        // check if we've seen +/-
        else if (char === '+' || char === '-') {
            // check to see if previous char was an exponent
            // if it was then this is not a number
            if (i > 0 && str[i - 1] !== 'e' && str[i] !== 'E') {
                return false;
            }

        }
        // check if we've seen the exponent
        else if (char === 'e' || char === 'E') {

            // If we've already seen an exponent or not seen a digit
            // we do not have a number
            if (seenExponent || !seenDigit) {
                return false;
            }

            seenExponent = true;
            seenDigit = false;
        }
        // check if we've seen a dot
        else if (char === '.') {

            // if we've already seen dot or exponent then this is not a number
            if (seenDot || seenExponent) {
                return false;
            }

            seenDot = true;

        }
        // otherwise this is not a number
        else {
            return false;
        }

    }

    return seenDigit;
};

/**
 *
 * @param {string} str
 * @returns {boolean}
 */
const isBoolean = function (str) {
    return str.trim().toLowerCase() === 'true' || str.trim().toLowerCase() === 'false';
};

/**
 * TODO: validate array content
 *
 * @param str
 * @returns {boolean}
 */
const isArray = function (str){

    // check if our string is empty
    if (!str || str.length === 0) {
        return false;
    }


    if (str[0] === '[' && str[str.length - 1] === ']') {
        let bracketCounter = 0;
        for(let i = 0; i < str.length; i++){
            if(str[i] === '['){
                bracketCounter++;
            }else if(str[i] === ']'){
                bracketCounter--;
            }
        }

        return bracketCounter === 0;
    }

    return false;
};

const parseStr = function (str) {

    // check for numbers
    if (isNumber(str)) {
        return Number(str);
    }

    // check for boolean values
    if (isBoolean(str)) {
        return str.trim().toLowerCase() === 'true';
    }

    // check for arrays
    if (isArray(str)) {
        let result = [];
        let content = str.substring(1, str.length - 1);
        if (content.includes('[')) {
            let bracketCounter = 0;
            let currentPart = '';
            for (let i = 0; i < content.length; i++){
                const  char = content[i];
                if(char === '['){
                    bracketCounter++;
                    currentPart = char;
                }else if(char === ']'){
                    bracketCounter--;
                    currentPart += char;
                    result.push(parseStr(currentPart));

                    currentPart = bracketCounter === 0 ? '' : currentPart;
                }else if(bracketCounter > 0){
                    currentPart += char;
                }else{
                    if(char === ','){
                        if(currentPart) {
                            result.push(parseStr(currentPart));
                        }
                        currentPart = '';
                    }else{
                        currentPart += char;
                    }
                }
            }
        } else {
            const subParts = content.split(',');
            subParts.forEach(part => {
                result.push(parseStr(part));
            })
        }

        return result;
    }

    // check for objects


    return str;
}

console.log(parseStr("53.5e93"))
console.log(parseStr("true "))
console.log(parseStr(" false "))
console.log('isArray("[test]") =', isArray('[test]'))
console.log('isArray("[test]]") =', isArray('[test]]'))
console.log('parseStr(\'["test"]\') =', parseStr('["test"]'))
console.log('parseStr(\'[1,2,3,4]\') =', parseStr('[1,2,3,4]'))
console.log('parseStr(\'[true,2,false,4]\') =', parseStr('[true,2,false,4]'))
console.log('parseStr(\'[1, 2, [2, 3,1]]\') =', parseStr('[1, 2, [2, 3, 1]]'))
console.log('parseStr(\'[[1, 2], [2, 3,1]]\') =', parseStr('[[1, 2], [2, 3, 1]]'))
console.log('parseStr(\'[[1, 2], [3, 2, 1], [2, 3,1]]\') =', parseStr('[[1, 2], [3, 2, 1], [2, 3, 1]]'))