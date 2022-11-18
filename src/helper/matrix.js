export const matrix = {
    multiply: (line, dote, n) => {
        const {dx, dy} = matrix.formula({x_0: dote.x, y_0: dote.y, k: line.k, b: line.b});

        let matrix1 = [
            [1, 0, (dx - dote.x)*2 + n],
            [0, 1, (dy - dote.y)*2 + n],
            [0, 0, 1]
        ];
        let matrix2 = [dote.x , dote.y, 1];
        let matrix3 = [0, 0, 0];

        for (let i = 0; i < 3; i++) {
            let sum = 0;
            for (let j = 0; j < 3; j++) {
                sum += matrix1[i][j] * matrix2[j]
            }
            matrix3[i] = sum
        }

        return {x:matrix3[0], y:matrix3[1]};
    },

    formula: ({x_0, y_0, k, b}) => {
        const obj = {dx: 0, dy: 0};
        obj.dx = (x_0 + k * (y_0 - b)) / (k ** 2 + 1);
        obj.dy = k * obj.dx + b;

        return obj;
    },

    multiplyMatrix: (first, second) => {
        let result = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        let i, j, k;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                result[i][j] = 0;
                for (k = 0; k < 3; k++)
                    result[i][j] += first[i][k] * second[k][j];
            }
        }

        return result;
    },

    multiplyMatrixBig: (first, second) => {
        let result = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        let i, j, k;
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 3; j++) {
                result[i][j] = 0;
                for (k = 0; k < 3; k++)
                    result[i][j] += first[i][k] * second[k][j];
            }
        }

        return result;
    },

    resultTransformationMatrix: (line) => {

        let matrixMove = [
            [1, 0, 0],
            [0, 1, 0],
            [0, -line.b, 1]
        ]

        let matrixMoveReverse = [
            [1, 0, 0],
            [0, 1, 0],
            [0, line.b, 1]
        ]

        let matrixMirrorOX = [
            [1,  0, 0],
            [0, -1, 0],
            [0,  0, 1]
        ]

        let alpha = -Math.atan(line.k);

        let matrixRotate = [
            [ Math.cos(alpha), Math.sin(alpha), 0],
            [-Math.sin(alpha), Math.cos(alpha), 0],
            [               0,               0, 1]
        ]

        let matrixRotateReverse = [
            [ Math.cos(alpha), -Math.sin(alpha), 0],
            [ Math.sin(alpha),  Math.cos(alpha), 0],
            [               0,                0, 1]
        ]

        const tmp1 = matrix.multiplyMatrix(matrixMove, matrixRotate);
        const tmp2 = matrix.multiplyMatrix(tmp1, matrixMirrorOX);
        const tmp3 = matrix.multiplyMatrix(tmp2, matrixRotateReverse);
        const tmp4 = matrix.multiplyMatrix(tmp3, matrixMoveReverse);

        return tmp4;
    },

    getMirrorValues: (p1, p2, p3, p4, line) => {
        let transformation = matrix.resultTransformationMatrix(line);

        let matrixPoints = [
          [p1.x, p1.y, 1],
          [p2.x, p2.y, 1],
          [p3.x, p3.y, 1],
          [p4.x, p4.y, 1],
        ];
        return matrix.multiplyMatrixBig(matrixPoints, transformation);
    }
}