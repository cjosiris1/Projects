/**
 *
 * @param obj
 * @param key
 * @returns {*|null}
 */
const findValueDFS = (obj, key) => {

    if(obj && obj.hasOwnProperty(key)){
        return obj[key];
    }

    const availableKeys = Object.keys(obj);
    for(let i = 0; i < availableKeys.length; i++){

        const k = availableKeys[i];
        const checkObj = obj[k];

        if(checkObj.constructor === Object){
            return findValueDFS(checkObj, key);
        }
    }

    return null;
};

/**
 *
 * @param obj
 * @param key
 * @returns {null|*}
 */
const findValueBFS = (obj, key) => {

    const stack = [obj];
    while(stack.length > 0){
        const objToCheck = stack.pop();
        if(objToCheck && objToCheck.hasOwnProperty(key)){
            return objToCheck[key];
        }

        const availableKeys = Object.keys(objToCheck);
        availableKeys.forEach(k => {
            if(objToCheck[k].constructor === Object){
                stack.push(objToCheck[k]);
            }
        });

    }

    return null;
};



console.log('findValueDFS=', findValueDFS({
    "glossary": {
        "title": "example glossary",
        "GlossDiv": {
            "title": "S",
            "GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
                    "SortAs": "SGML",
                    "GlossTerm": "Standard Generalized Markup Language",
                    "Acronym": "SGML",
                    "Abbrev": "ISO 8879:1986",
                    "GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
                        "GlossSeeAlso": ["GML", "XML"]
                    },
                    "GlossSee": "markup"
                }
            }
        }
    }
}, 'ID'))
console.log('findValueBFS=', findValueBFS({
    "glossary": {
        "title": "example glossary",
        "GlossDiv": {
            "title": "S",
            "GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
                    "SortAs": "SGML",
                    "GlossTerm": "Standard Generalized Markup Language",
                    "Acronym": "SGML",
                    "Abbrev": "ISO 8879:1986",
                    "GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
                        "GlossSeeAlso": ["GML", "XML"]
                    },
                    "GlossSee": "markup"
                }
            }
        }
    }
}, 'GlossList'))