import {Title} from '../../components';
import {icons} from '../../constants';

import css from './MovePractisePage.module.css'
import {useEffect, useState} from 'react';
import {matrix} from '../../helper';

const MovePracticePage = () => {
    const range = 16;

    const [line, setLine] = useState({k: 1, x: 1});
    const [point1, setPoint1] = useState({x: -4, y: -7});
    const [point2, setPoint2] = useState({x: -3, y: -3});
    const [point3, setPoint3] = useState({x: 4,  y: -3});
    const [point4, setPoint4] = useState({x: 3,  y: -7});

    const [gridSize, setGridSize] = useState(25);

    const [isReset, setIsReset] = useState(false);
    
    const [isKSet, setIsKSet] = useState(true);
    const [isXSet, setIsXSet] = useState(true);
    const [isDrawParallelogram, setIsDrawParallelogram] = useState(true)

    useEffect(() => {
        if(isReset) {
            document.getElementById('k').value = line.k;
            document.getElementById('x').value = line.x;

            document.getElementById(`x1`).value = point1.x;
            document.getElementById(`y1`).value = point1.y;

            document.getElementById(`x2`).value = point2.x;
            document.getElementById(`y2`).value = point2.y;

            document.getElementById(`x3`).value = point3.x;
            document.getElementById(`y3`).value = point3.y;

            document.getElementById(`x4`).value = point4.x;
            document.getElementById(`y4`).value = point4.y;
        }
        setIsReset(false);
    }, [isReset]);

    const multiply = () => {
        let matrix1 = [
            [11, 12, 13],
            [21, 22, 23],
            [31, 32, 33]
        ];
        let matrix2 = [1 ,2 ,3];
        console.log(matrix.multiply({matrix1, matrix2}));
    }

    multiply();

    const repetitiveActions = () => {
        const canvas = document.getElementById('movement_canvas');
        const context = canvas.getContext('2d');

        // number of vertical grid lines
        const num_lines_x = Math.floor(canvas.height / gridSize);
        const num_lines_y = Math.floor(canvas.width / gridSize);

        // distance between grid lines
        const xAxisDistanceGridLines = Math.floor(num_lines_x / 2);
        const yAxisDistanceGridLines = Math.floor(num_lines_y / 2);

        return [context, xAxisDistanceGridLines, yAxisDistanceGridLines];
    }

    useEffect(() => {
        const [ctx, x_axis_distance_grid_lines, y_axis_distance_grid_lines] = repetitiveActions();
        draw_xy_graph()
        if(isKSet || isXSet)          { draw_line_kx(); }
        if(isDrawParallelogram && checkParallelogramExistence()) { draw_parallelogram(); }
        ctx.translate(-1 * (y_axis_distance_grid_lines * gridSize), -1 * ( x_axis_distance_grid_lines * gridSize) );
    }, [gridSize, point1, point2, point3, point4, isKSet, isXSet, isDrawParallelogram, line]);

    useEffect(() => {
        // знаходимо точку 4 при введених значеннях точок 1 2 3
        // середина діагоналі паралелограма
        let pointO  = {x: (point1.x + point3.x) / 2, y: (point1.y + point3.y) / 2}
        // координати точки 4
        setPoint4({x: 2 * pointO.x - point2.x, y: 2 * pointO.y - point2.y})

        document.getElementById(`x4`).value = point4.x;
        document.getElementById(`y4`).value = point4.y;

    }, [point1, point2, point3]);

    const reset = () => {
        setPoint1({x: -4, y: -7})
        setPoint2({x: -3, y: -3})
        setPoint3({x: 4, y: -3})
        setPoint4({x: 3, y: -7})
        setLine({k: 1, x: 1})

        setIsReset(true);
    }

    const onMovementChange = (e) => {
        console.log('on movement change')
        let value = e.target.value;
        console.log(value);
        // todo: зробити вот тут рух

    }

    const draw_parallelogram = () => {
        const canvas = document.getElementById('movement_canvas');
        const ctx = canvas.getContext('2d');
        const scale = -gridSize;

        ctx.beginPath();
        ctx.lineWidth = 2
        ctx.strokeStyle = `rgb(0, 20, 255)`;

        for (let x = 0; x < Math.max(canvas.width, canvas.height); x++) {
            ctx.moveTo(point1.x * gridSize, point1.y * scale);
            ctx.lineTo(point2.x * gridSize, point2.y * scale);
            ctx.lineTo(point3.x * gridSize, point3.y * scale);
            ctx.lineTo(point4.x * gridSize, point4.y * scale);
            ctx.lineTo(point1.x * gridSize, point1.y * scale);
        }

        ctx.stroke();
    }
    
    const onDrawButtonClick = () => {
        const canvas = document.getElementById('movement_canvas');
        const [ctx, x_axis_distance_grid_lines, y_axis_distance_grid_lines] = repetitiveActions();

        ctx.clearRect(0, 0,  canvas.width, canvas.height);

        draw_xy_graph();
        draw_line_kx();
        draw_parallelogram();

        ctx.translate(-1 * (y_axis_distance_grid_lines * gridSize), -1 * ( x_axis_distance_grid_lines * gridSize) );
    }
    
    const draw_line_kx = () => {
        const canvas = document.getElementById('movement_canvas');
        const ctx = canvas.getContext('2d');
        const scale = -gridSize;

        ctx.beginPath();
        ctx.lineWidth = 2
        ctx.strokeStyle = `rgb(255, 20, 20)`;

        for (let x = 0; x < Math.max(canvas.width, canvas.height); x++) {
            let X = -x * scale;
            let Y = (x * line.k + line.x) * scale;

            let X1 = (x + 1) * scale;
            let Y1 = (-(x + 1) * line.k + line.x) * scale;

            ctx.moveTo(X, Y);
            ctx.lineTo(X1, Y1);
        }

        ctx.stroke();
    }

    const download_img_movement = () => {
        const canvas = document.getElementById('movement_canvas');
        const a = document.getElementById('movement_canvas_link');
        a.href = canvas.toDataURL('image/png');
        a.click();
    }

    const draw_xy_graph = () => {
        console.log('draw_xy_graph')
        const x_axis_starting_point = {number: 1, suffix: ''};
        const y_axis_starting_point = {number: 1, suffix: ''};

        const canvas = document.getElementById('movement_canvas');
        const ctx = canvas.getContext('2d');

        const canvas_height = canvas.height;
        const canvas_width = canvas.width;

        // no of vertical grid lines (x) and horizontal grid lines (y)
        const num_lines_x = Math.floor(canvas.height / gridSize);
        const num_lines_y = Math.floor(canvas.width / gridSize);

        const x_axis_distance_grid_lines = Math.floor(num_lines_x / 2);
        const y_axis_distance_grid_lines = Math.floor(num_lines_y / 2);

        ctx.clearRect(0, 0,  canvas_width, canvas_height);

        // Draw grid lines along X-axis
        for (let i = 0; i <= num_lines_x; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;

            // If line represents X-axis draw in different color
            if (i === x_axis_distance_grid_lines)
                ctx.strokeStyle = "#000000";
            else
                ctx.strokeStyle = "#e9e9e9";

            if (i === num_lines_x) {
                ctx.moveTo(0, gridSize * i);
                ctx.lineTo(canvas_width, gridSize * i);
            } else {
                ctx.moveTo(0, gridSize * i + 0.5);
                ctx.lineTo(canvas_width, gridSize * i + 0.5);
            }
            ctx.stroke();
        }

        // Draw grid lines along Y-axis
        for (let i = 0; i <= num_lines_y; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;

            // If line represents Y-axis draw in different color
            if (i == y_axis_distance_grid_lines)
                ctx.strokeStyle = "#000000";
            else
                ctx.strokeStyle = "#e9e9e9";

            if (i == num_lines_y) {
                ctx.moveTo(gridSize * i, 0);
                ctx.lineTo(gridSize * i, canvas_height);
            } else {
                ctx.moveTo(gridSize * i + 0.5, 0);
                ctx.lineTo(gridSize * i + 0.5, canvas_height);
            }
            ctx.stroke();
        }

        ctx.translate(y_axis_distance_grid_lines * gridSize, x_axis_distance_grid_lines * gridSize);

        // Ticks marks along the positive X-axis
        for (let i = 1; i < (num_lines_y - y_axis_distance_grid_lines); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(gridSize * i + 0.5, -3);
            ctx.lineTo(gridSize * i + 0.5, 3);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(x_axis_starting_point.number * i + x_axis_starting_point.suffix, gridSize * i - 2, 15);
        }

        // Ticks marks along the negative X-axis
        for (let i = 1; i < y_axis_distance_grid_lines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-gridSize * i + 0.5, -3);
            ctx.lineTo(-gridSize * i + 0.5, 3);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'end';
            ctx.fillText(-x_axis_starting_point.number * i + x_axis_starting_point.suffix, -gridSize * i + 3, 15);
        }

        // Ticks marks along the positive Y-axis
        // Positive Y-axis of graph is negative Y-axis of the canvas
        for (let i = 1; i < (num_lines_x - x_axis_distance_grid_lines); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-3, gridSize * i + 0.5);
            ctx.lineTo(3, gridSize * i + 0.5);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(-y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, gridSize * i + 3);
        }

        // Ticks marks along the negative Y-axis
        // Negative Y-axis of graph is positive Y-axis of the canvas
        for (let i = 1; i < x_axis_distance_grid_lines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-3, -gridSize * i + 0.5);
            ctx.lineTo(3, -gridSize * i + 0.5);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, -gridSize * i + 3);
        }
    }

    const onWheelFunction = (e) => {
        if(e.deltaY > 0 &&  gridSize > 15 ) {
            setGridSize(gridSize/2);
        } else if(e.deltaY < 0 && gridSize < 100) {
            setGridSize(gridSize * 2);
        }
    }

    const onLineKChange = (local_line, set_line_func, e) => {
        if (e.target.value.length !== 0 && Math.abs(Number(e.target.value)) <= range) {
            set_line_func({k: Number(e.target.value), x: local_line.x});
            setIsKSet(true);
        } else if(Math.abs(Number(e.target.value)) > range) {
            console.log('значення виходить за допустимі межі!!');
            setIsReset(true);
            setIsKSet(true);
        } else {
            console.log('заповніть значення в комірку');
            setIsKSet(false);
            setLine({k: 0, x: local_line.x})
        }
    }

    const onLineXChange = (local_line, set_line_func, e) => {
        if (e.target.value.length !== 0 && Math.abs(Number(e.target.value)) <= range) {
            set_line_func({k: local_line.k, x: Number(e.target.value)});
            setIsXSet(true);
        }else if(Math.abs(Number(e.target.value)) > range) {
            console.log('значення виходить за допустимі межі!!');
            setIsReset(true);
            setIsXSet(true);
        } else {
            console.log('заповніть значення в комірку');
            setIsXSet(false);
            setLine({k: local_line.k, x: 0})
        }
    }

    const checkParallelogramExistence = () => {

        return true;
    }

    const onPointXChange = (local_point, set_point_func, e) => {
        let local_point_rollback = {x: local_point.x, y: local_point.y};

        if (e.target.value.length !== 0 && Math.abs(Number(e.target.value)) <= range) {
            set_point_func({x: Number(e.target.value), y: local_point.y});

            let isParallelogramValid = checkParallelogramExistence();

            if(!isParallelogramValid) {
                set_point_func({x: local_point_rollback.x, y: local_point_rollback.y});
                setIsDrawParallelogram(false);
                console.log('such a parallelogram doesn\'t exist')
            }
            setIsDrawParallelogram(true);
        } else if(Math.abs(Number(e.target.value)) > range) {
            console.log('введене значення виходить за допустимі межі!!')
            setIsReset(true);
        } else {
            console.log('заповніть значення в комірку')
            setIsDrawParallelogram(false);
        }
    }

    const onPointYChange = (local_point, set_point_func, e) => {
        let local_point_rollback = {x: local_point.x, y: local_point.y};

        if (e.target.value.length !== 0 && Math.abs(Number(e.target.value)) <= range) {
            set_point_func({x: local_point.x, y: Number(e.target.value)});

            let isParallelogramValid = checkParallelogramExistence();

            if(!isParallelogramValid) {
                set_point_func({x: local_point_rollback.x, y: local_point_rollback.y});
                e.target.value = '';
                setIsDrawParallelogram(false);
                console.log('such a parallelogram doesn\'t exist')
            }

            setIsDrawParallelogram(true);
        } else if(Math.abs(Number(e.target.value)) > range) {
            console.log('введене значення виходить за допустимі межі!!')
            setIsReset(true);
        } else {
            console.log('заповніть значення в комірку')
            setIsDrawParallelogram(false);
        }


    }

    return (
        <div className={`${css.content}`} >
            <Title caption={'Рух паралелограма вздовж прямої'} icon_name={icons.ruler}></Title>

            <div className={`${css.flex}`}>
                <div className={`${css.left}`}>
                    <div className={`${css.flex}`}>
                        <div className={`${css.text}`}>
                            <p>Введіть параметри а і b для графіку функції:</p>
                        </div>

                        <div className={`${css.mt} ${css.flex}`}>
                            <div className={`${css.test} ${css.flex}`}>
                                <div className={`${css.flex} ${css.center}`}>
                                    <p className={`${css.margin}`}><b>y = </b></p>
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'k'}
                                           defaultValue={1} onChange={(e) => {onLineKChange(line, setLine, e)}}
                                    />
                                    <p className={`${css.margin}`}><b>* X + </b></p>
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'x'}
                                           defaultValue={1} onChange={(e) => {onLineXChange(line, setLine, e)}}
                                    />
                                </div>

                            </div>

                            <button onClick={onDrawButtonClick} className={`${css.button} ${css.margin_left}`}>Пряма</button>
                        </div>
                    </div>

                    <div className={`${css.text}`}>
                        <p>Введіть координати 3 точок для паралелограма:</p>
                    </div>

                    <div className={`${css.coordinate} ${css.flex2}`}>
                        <div className={`${css.top150}`}>
                            <div className={`${css.coordinateLeft} ${css.flex2} ${css.flex3}`}>
                                <div className={`${css.test} ${css.flex} ${css.positionLeftCoordinate}`}>
                                    <div className={`${css.flex} ${css.center}`}>
                                        <p className={`${css.margin}`}><b>X</b></p>
                                        <input defaultValue={-3}
                                            className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'x2'}
                                            onChange={(e) => {onPointXChange(point2, setPoint2, e)}}
                                        />
                                        <p className={`${css.margin}`}><b>Y</b></p>
                                        <input defaultValue={-3}
                                            className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'y2'}
                                            onChange={(e) => {onPointYChange(point2, setPoint2, e)}}
                                        />
                                    </div>
                                </div>

                                <div className={`${css.test} ${css.flex}`}>
                                    <div className={`${css.flex} ${css.center}`}>
                                        <p className={`${css.margin}`}><b>X</b></p>
                                        <input defaultValue={-4}
                                            className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'x1'}
                                            onChange={(e) => {onPointXChange(point1, setPoint1, e)}}
                                        />
                                        <p className={`${css.margin}`}><b>Y</b></p>
                                        <input defaultValue={-7}
                                            className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'y1'}
                                            onChange={(e) => {onPointYChange(point1, setPoint1, e)}}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className={`${css.flex}`}>
                            <div className={`${css.parallelogram}`}></div>
                        </div>

                        <div className={`${css.bottom150}`}>
                            <div className={`${css.coordinateRight} ${css.flex2} ${css.flex3}`}>
                                <div className={`${css.test} ${css.flex}`}>
                                    <div className={`${css.flex} ${css.center}`}>
                                        <p className={`${css.margin}`}><b>X</b></p>
                                        <input defaultValue={4}
                                            className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'x3'}
                                            onChange={(e) => {onPointXChange(point3, setPoint3, e)}}
                                        />
                                        <p className={`${css.margin}`}><b>Y</b></p>
                                        <input defaultValue={-3}
                                            className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'y3'}
                                            onChange={(e) => {onPointYChange(point3, setPoint3, e)}}
                                        />
                                    </div>

                                </div>

                                <div className={`${css.test} ${css.flex} ${css.positionRightCoordinate}`}>
                                    <div className={`${css.flex} ${css.center}`}>
                                        <p className={`${css.margin}`}><b>X</b></p>
                                        <input defaultValue={3}
                                            className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'x4'}
                                            disabled={true} onChange={(e) => {onPointXChange(point4, setPoint4, e)}}
                                        />
                                        <p className={`${css.margin}`}><b>Y</b></p>
                                        <input defaultValue={-7}
                                                className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'y4'}
                                                disabled={true} onChange={(e) => {onPointYChange(point4, setPoint4, e)}}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className={`${css.flex} ${css.margin_center}`}>
                            <button onClick={onDrawButtonClick} className={`${css.button}`}>Паралелограм</button>
                        </div>
                    </div>

                    <div className={`${css.text}`}>
                        <p>Рух дзеркального відображення паралелограма:</p>
                    </div>

                    <div className={`${css.movementRangeBlock}`}>
                        <input className={`${css.move}`} onChange={(e)=> {onMovementChange(e)}} id={'movement_range'}
                               type="range"
                               name='movement_range' defaultValue={0}
                               min={-100} max={100} step={1}/>
                        <button onClick={reset} className={`${css.button}`}>Скидання</button>
                    </div>

                </div>

                <div>
                    <div>
                        <canvas height={425} width={425}  id={'movement_canvas'}
                                className={`${css.movementCanvas}`}
                                onWheel={onWheelFunction}
                        >
                        </canvas>

                        <div>
                            <a id={'movement_canvas_link'} download={'movement.png'}/>
                            <button onClick={download_img_movement}
                                    className={`${css.button} ${css.positionLeft}`}>Зберегти
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export {MovePracticePage};