const countWords = (input, query) => {
    const countArray = query.map(
      (q) => input.filter((word) => word === q).length
    );
    return countArray;
  };
  
  const inputArray = ['xc', 'dz', 'bbb', 'dz'];
  const queryArray = ['bbb', 'ac', 'dz'];
  const resultCount = countWords(inputArray, queryArray);
  console.log(resultCount);