const diagonalMatrix = (matrix) => {
    let diagonal1 = 0;
    let diagonal2 = 0;
    const n = matrix.length;

    for (let i = 0; i < n ; i++) {
        diagonal1 += matrix[i][i];
        diagonal2 += matrix[i][n - i - 1];
    }

    return diagonal1 - diagonal2;
}
    const inputMatrix = [
        [1, 2, 0],
        [4, 5, 6],
        [7, 8, 9]
    ];

    console.log(diagonalMatrix(inputMatrix));