export const matrix = {
    multiply: (line, dote, n) => {
        console.log(line);
        console.log(dote);
        const {dx, dy} = matrix.formula({x_0: dote.x, y_0: dote.y, k: line.k, b: line.x});
        console.log(dx);
        console.log(dy);
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
    }
}