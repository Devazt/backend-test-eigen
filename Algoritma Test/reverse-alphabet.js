const reverseAlphabet = (str) => {
    let alphabetic = "";
    let numeric = "";

    for (let char of str) {
        if (isNaN(char)) {
            alphabetic += char;
        } else {
            numeric += char;
        }
    }

    return alphabetic.split('').reverse().join('') + numeric;
};

console.log(reverseAlphabet('NEGIE1'));
console.log(reverseAlphabet('OL1L2E3H'));