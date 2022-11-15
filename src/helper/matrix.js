export const matrix = {
    multiply: ({matrix1, matrix2}) => {
       let matrix3 = [0, 0, 0];

        for (let i = 0; i < 3; i++) {
            let sum = 0;
            for (let j = 0; j < 3; j++) {
                sum += matrix1[i][j] * matrix2[j]
            }
            matrix3[i] = sum
        }

        return matrix3;
    }
}