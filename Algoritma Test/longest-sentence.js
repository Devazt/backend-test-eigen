const longestSentence = (sentence) => {
    const words = sentence.split(' ');

    let longestWord = '';

    for ( let word of words ) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    return longestWord;
};

console.log(longestSentence('Saya sangat senang mengerjakan soal algoritma'));
console.log(longestSentence('Belajar Javascript itu menyenangkan'));