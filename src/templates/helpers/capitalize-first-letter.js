// Lets walk through this
export default str => {
    // set the whole string to lower case
    const lower = str.toLowerCase();
    // run reduce on both of our possible word separators
    return [' ', '-'].reduce((res, sep) => {
        // split string on separator and iterator over each word
        return res.split(sep).map(word => {
            // if the word is a roman numeral suffix, set to upper case
            if (/(^iii?$|^iv$)/.test(word)) {
                return word.toUpperCase();
            } else {
                // otherwise, set just the first letter uppercase
                return word[0].toUpperCase() + word.substr(1);
            }
        // join the string back together on the separator
        }).join(sep);
    // res = the lowercase original string
    }, lower);
}