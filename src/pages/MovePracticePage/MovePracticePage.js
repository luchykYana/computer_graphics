import {Message, Title} from '../../components';
import {icons} from '../../constants';

import css from './MovePractisePage.module.css'
import {useEffect, useState} from 'react';
import {matrix} from '../../helper';

const MovePracticePage = () => {
    const range = 16;
    const [interv, setInterv] = useState(0);

    const [line, setLine] = useState({k: 1, b: 1});

    const [point1, setPoint1] = useState({x: -4, y: -7});
    const [point2, setPoint2] = useState({x: -3, y: -3});
    const [point3, setPoint3] = useState({x: 4, y: -3});
    const [point4, setPoint4] = useState({x: 3, y: -7});

    const [backup_point1, setBackupPoint1] = useState({x: -4, y: -7});
    const [backup_point2, setBackupPoint2] = useState({x: -3, y: -3});
    const [backup_point3, setBackupPoint3] = useState({x: 4, y: -3});
    const [backup_point4, setBackupPoint4] = useState({x: 3, y: -7});

    const [mirrorPoint1, setMirrorPoint1] = useState({x: 0, y: 0});
    const [mirrorPoint2, setMirrorPoint2] = useState({x: 0, y: 0});
    const [mirrorPoint3, setMirrorPoint3] = useState({x: 0, y: 0});
    const [mirrorPoint4, setMirrorPoint4] = useState({x: 0, y: 0});

    const [coordinatIncrement, setCoordinatIncrement] = useState(0)

    const [isMovable, setIsMovable] = useState(true);

    const [isValid, setIsValid] = useState(true);

    const [move, setMove] = useState(0);

    const [gridSize, setGridSize] = useState(25);

    const [isReset, setIsReset] = useState(false);

    const [isKSet, setIsKSet] = useState(true);
    const [isBSet, setIsBSet] = useState(true);

    // true - намалювати основну фігуру
    // false - намалювати відображення
    const [isDrawParallelogram, setIsDrawParallelogram] = useState(true);

    const start = () => {
        setInterv(setInterval(()=>{
            setIsDrawParallelogram(current => ! current);
            }, 1000)
        );
    }

    useEffect(()=>{
        if(!isKSet && !isBSet) {
            displayInfoFillValues();
        }
    }, [isKSet, isBSet]);

    useEffect(() => {
        if(!isValid) {
            displayWarningNotExist();
            setTimeout(displayInfoReset, 3500);
            setTimeout(reset, 5000);
        }
    }, [isValid]);

    useEffect(() => {
        setMove(0);

        let mirror = matrix.getMirrorValues(point1, point2, point3, point4, line);

        setMirrorPoint1({x: mirror[0][0], y: mirror[0][1]});
        setMirrorPoint2({x: mirror[1][0], y: mirror[1][1]});
        setMirrorPoint3({x: mirror[2][0], y: mirror[2][1]});
        setMirrorPoint4({x: mirror[3][0], y: mirror[3][1]});

        // порахуйте площу трикутника, який утворюють 3 точки.
        // Якщо всі точки лежать на прямій, то його площа дорівнює нулю

        // обчислимо площу трикутика за формулою Герона

        const d = (p1, p2) => {
            return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
        }

        const a = d(point1, point2);
        const b = d(point2, point3);
        const c = d(point1, point3);

        const p = (a + b + c) / 2;
        const s = Math.sqrt(p * (p - a) * (p - b) * (p - c));

        if (!(s < 0.00001)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [point1, point2, point3, point4, line]);

    useEffect(() => {
        if (isReset) {
            document.getElementById('k').value = line.k;
            document.getElementById('b').value = line.b;

            document.getElementById(`x1`).value = point1.x;
            document.getElementById(`y1`).value = point1.y;

            document.getElementById(`x2`).value = point2.x;
            document.getElementById(`y2`).value = point2.y;

            document.getElementById(`x3`).value = point3.x;
            document.getElementById(`y3`).value = point3.y;

            document.getElementById(`x4`).value = point4.x;
            document.getElementById(`y4`).value = point4.y;

            document.getElementById(`movement_range`).value = 0;
            setCoordinatIncrement(0);
        }
        setIsReset(false);
    }, [isReset]);

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
        if (isKSet || isBSet) {
            draw_line_kx();
        }

        if (isDrawParallelogram ) {
            draw_parallelogram(point1, point2, point3, point4);
        } else {
            draw_parallelogram(mirrorPoint1, mirrorPoint2, mirrorPoint3, mirrorPoint4, 'magenta');
        }

        ctx.translate(-1 * (y_axis_distance_grid_lines * gridSize), -1 * (x_axis_distance_grid_lines * gridSize));
    }, [gridSize, point1, point2, point3, point4, isKSet, isBSet, isDrawParallelogram, line]);

    useEffect(() => {
        // знаходимо точку 4 при введених значеннях точок 1 2 3
        // середина діагоналі паралелограма
        let pointO = {x: (point1.x + point3.x) / 2, y: (point1.y + point3.y) / 2}
        // координати точки 4
        setPoint4({x: 2 * pointO.x - point2.x, y: 2 * pointO.y - point2.y})

        document.getElementById(`x1`).value = point1.x;
        document.getElementById(`y1`).value = point1.y;

        document.getElementById(`x2`).value = point2.x;
        document.getElementById(`y2`).value = point2.y;

        document.getElementById(`x3`).value = point3.x;
        document.getElementById(`y3`).value = point3.y;

        document.getElementById(`x4`).value = point4.x;
        document.getElementById(`y4`).value = point4.y;

    }, [point1, point2, point3]);

    useEffect(() => {
        let dx, dy;
        if(line.k > 0) {
            dx =   coordinatIncrement;
            dy =   coordinatIncrement;
        } else if (line.k < 0) {
            dx =   coordinatIncrement;
            dy = - coordinatIncrement;
        } else if(line.k === 0) {
            dx =   coordinatIncrement;
            dy =   0;
        } else {
            console.log('exception');
        }


        if(!( ( (Math.abs(backup_point1.x + dx * (5/gridSize)) >= range || Math.abs(backup_point1.y + dy * (5/gridSize)) >= range ||
               Math.abs(backup_point2.x + dx * (5/gridSize)) >= range || Math.abs(backup_point2.y + dy * (5/gridSize)) >= range))
            ||
              (Math.abs(backup_point3.x + dx * (5/gridSize)) >= range || Math.abs( backup_point3.y + dy * (5/gridSize)) >= range ||
               Math.abs(backup_point4.x + dx * (5/gridSize)) >= range || Math.abs(backup_point4.y + dy * (5/gridSize)) >= range) ) ) {
            setPoint1({x: backup_point1.x + dx * (5/gridSize), y: backup_point1.y + dy * (5/gridSize)});
            setPoint2({x: backup_point2.x + dx * (5/gridSize), y: backup_point2.y + dy * (5/gridSize)});
            setPoint3({x: backup_point3.x + dx * (5/gridSize), y: backup_point3.y + dy * (5/gridSize)});
            setPoint4({x: backup_point4.x + dx * (5/gridSize), y: backup_point4.y + dy * (5/gridSize)});
        }
    }, [coordinatIncrement]);


    const reset = () => {
        setPoint1({x: -4, y: -7})
        setPoint2({x: -3, y: -3})
        setPoint3({x: 4, y: -3})
        setPoint4({x: 3, y: -7})
        setLine({k: 1, b: 1})

        clearInterval(interv);
        setInterv(0)
        setIsDrawParallelogram(true);
        setIsReset(true);
    }

    const onMovementChange = (e) => {
        let value = e.target.value;
        setCoordinatIncrement(value)
    }

    const draw_parallelogram = (p1, p2, p3, p4, color = 'blue') => {
        const canvas = document.getElementById('movement_canvas');
        const ctx = canvas.getContext('2d');
        const scale = -gridSize;

        ctx.beginPath();
        ctx.lineWidth = 2
        ctx.strokeStyle = color;

        for (let x = 0; x < Math.max(canvas.width, canvas.height); x++) {
            ctx.moveTo(p1.x * gridSize, p1.y * scale);
            ctx.lineTo(p2.x * gridSize, p2.y * scale);
            ctx.lineTo(p3.x * gridSize, p3.y * scale);
            ctx.lineTo(p4.x * gridSize, p4.y * scale);
            ctx.lineTo(p1.x * gridSize, p1.y * scale);
        }

        ctx.stroke();
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
            let Y = (x * line.k + line.b) * scale;

            let X1 = (x + 1) * scale;
            let Y1 = (-(x + 1) * line.k + line.b) * scale;

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

        ctx.clearRect(0, 0, canvas_width, canvas_height);

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
        if (e.deltaY > 0 && gridSize > 15) {
            setGridSize(gridSize / 2);
        } else if (e.deltaY < 0 && gridSize < 100) {
            setGridSize(gridSize * 2);
        }
    }

    const onLineKChange = (local_line, set_line_func, e) => {
        if (e.target.value.length !== 0 && Math.abs(Number(e.target.value)) <= range) {
            set_line_func({k: Number(e.target.value), b: local_line.b});
            setIsKSet(true);
        } else if (Math.abs(Number(e.target.value)) > range) {
            displayWarningOutOfBound();
            setIsReset(true);
            setIsKSet(true);
        } else {
            setIsKSet(false);
            setLine({k: 0, b: local_line.b})
        }
    }

    const onLineBChange = (local_line, set_line_func, e) => {
        if (e.target.value.length !== 0 && Math.abs(Number(e.target.value)) <= range) {
            set_line_func({k: local_line.k, b: Number(e.target.value)});
            setIsBSet(true);
        } else if (Math.abs(Number(e.target.value)) > range) {
            displayWarningOutOfBound();
            setIsReset(true);
            setIsBSet(true);
        } else {
            setIsBSet(false);
            setLine({k: local_line.k, b: 0})
        }
    }

    const onPointXChange = (local_point, set_point_func, set_backup_point, e) => {
        if (e.target.value.length !== 0 && Math.abs(Number(e.target.value)) <= range) {
            set_point_func({x: Number(e.target.value), y: local_point.y});
            set_backup_point({x: Number(e.target.value), y: local_point.y});
        } else if (Math.abs(Number(e.target.value)) > range) {
            displayWarningOutOfBound();
            setIsReset(true);
        } else {
            displayInfoFillValues();
        }
    }

    const onPointYChange = (local_point, set_point_func, set_backup_point, e) => {
        if (e.target.value.length !== 0 && Math.abs(Number(e.target.value)) <= range) {
            set_point_func({x: local_point.x, y: Number(e.target.value)});
            set_backup_point({x: local_point.x, y: Number(e.target.value)});
        } else if (Math.abs(Number(e.target.value)) > range) {
            displayWarningOutOfBound();
            setIsReset(true);
        } else {
            displayInfoFillValues();
        }
    }

    const displayInfoFillValues = () => {
        document.getElementById("fill_info").style.bottom = '10px';
        document.getElementById("fill_info").style.right = '10px';
        document.getElementById("fill_info").style.display = 'flex';

        setTimeout(() => {
            document.getElementById("fill_info").style.display = 'none';
        }, 3000);
    }

    const displayInfoReset = () => {
        document.getElementById("not_exist_info_reset").style.bottom = '10px';
        document.getElementById("not_exist_info_reset").style.right = '10px';
        document.getElementById("not_exist_info_reset").style.display = 'flex';

        setTimeout(() => {
            document.getElementById("not_exist_info_reset").style.display = 'none';
        }, 3000);
    }

    const displayWarningNotExist = () => {
        document.getElementById("not_exist_warning").style.bottom = '10px';
        document.getElementById("not_exist_warning").style.right = '10px';
        document.getElementById("not_exist_warning").style.display = 'flex';

        setTimeout(() => {
            document.getElementById("not_exist_warning").style.display = 'none';
        }, 3000);
    }

    const displayWarningOutOfBound = () => {
        document.getElementById("out_of_bound_warning").style.bottom = '10px';
        document.getElementById("out_of_bound_warning").style.right = '10px';
        document.getElementById("out_of_bound_warning").style.display = 'flex';

        setTimeout(() => {
            document.getElementById("out_of_bound_warning").style.display = 'none';
        }, 3000);
    }

    return (
        <div className={`${css.content}`}>
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
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range}
                                           max={range} id={'k'}
                                           defaultValue={1} onChange={(e) => {
                                        onLineKChange(line, setLine, e)
                                    }}
                                    />
                                    <p className={`${css.margin}`}><b>* X + </b></p>
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range}
                                           max={range} id={'b'}
                                           defaultValue={1} onChange={(e) => {
                                        onLineBChange(line, setLine, e)
                                    }}
                                    />
                                </div>

                            </div>
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
                                               className={`${css.margin} ${css.input}`} type='number' min={-range}
                                               max={range} id={'x2'}
                                               onChange={(e) => {
                                                   onPointXChange(point2, setPoint2, setBackupPoint2, e)
                                               }}
                                        />
                                        <p className={`${css.margin}`}><b>Y</b></p>
                                        <input defaultValue={-3}
                                               className={`${css.margin} ${css.input}`} type='number' min={-range}
                                               max={range} id={'y2'}
                                               onChange={(e) => {
                                                   onPointYChange(point2, setPoint2, setBackupPoint2, e)
                                               }}
                                        />
                                    </div>
                                </div>

                                <div className={`${css.test} ${css.flex}`}>
                                    <div className={`${css.flex} ${css.center}`}>
                                        <p className={`${css.margin}`}><b>X</b></p>
                                        <input defaultValue={-4}
                                               className={`${css.margin} ${css.input}`} type='number' min={-range}
                                               max={range} id={'x1'}
                                               onChange={(e) => {
                                                   onPointXChange(point1, setPoint1, setBackupPoint1, e)
                                               }}
                                        />
                                        <p className={`${css.margin}`}><b>Y</b></p>
                                        <input defaultValue={-7}
                                               className={`${css.margin} ${css.input}`} type='number' min={-range}
                                               max={range} id={'y1'}
                                               onChange={(e) => {
                                                   onPointYChange(point1, setPoint1, setBackupPoint1, e)
                                               }}
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
                                               className={`${css.margin} ${css.input}`} type='number' min={-range}
                                               max={range} id={'x3'}
                                               onChange={(e) => {
                                                   onPointXChange(point3, setPoint3, setBackupPoint3, e)
                                               }}
                                        />
                                        <p className={`${css.margin}`}><b>Y</b></p>
                                        <input defaultValue={-3}
                                               className={`${css.margin} ${css.input}`} type='number' min={-range}
                                               max={range} id={'y3'}
                                               onChange={(e) => {
                                                   onPointYChange(point3, setPoint3, setBackupPoint3, e)
                                               }}
                                        />
                                    </div>

                                </div>

                                <div className={`${css.test} ${css.flex} ${css.positionRightCoordinate}`}>
                                    <div className={`${css.flex} ${css.center}`}>
                                        <p className={`${css.margin}`}><b>X</b></p>
                                        <input defaultValue={3}
                                               className={`${css.margin} ${css.input}`} type='number' min={-range}
                                               max={range} id={'x4'}
                                               disabled={true} onChange={(e) => {
                                            onPointXChange(point4, setPoint4, setBackupPoint4, e)
                                        }}
                                        />
                                        <p className={`${css.margin}`}><b>Y</b></p>
                                        <input defaultValue={-7}
                                               className={`${css.margin} ${css.input}`} type='number' min={-range}
                                               max={range} id={'y4'}
                                               disabled={true} onChange={(e) => {
                                            onPointYChange(point4, setPoint4, setBackupPoint4, e)
                                        }}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className={`${css.margin_center} ${css.buttons}`}>

                            <div className={`${css.flex} ${css.margin_center}`}>
                                <button onClick={start} className={`${css.button}`}>Рух у часі</button>
                            </div>
                            <div className={`${css.flex} ${css.margin_center}`}>
                                <button onClick={reset} className={`${css.button}`}>Скидання</button>
                            </div>

                        </div>

                    </div>

                    <div className={`${css.text}`}>
                        <p>Рух дзеркального відображення паралелограма:</p>
                    </div>

                    <div className={`${css.movementRangeBlock}`}>
                        <input className={`${css.move}`} onChange={(e) => {
                            onMovementChange(e)
                        }} id={'movement_range'}
                               type="range"
                               name='movement_range' defaultValue={0}
                               min={-50} max={50} step={1}/>
                    </div>
                </div>

                <div>
                    <div>
                        <Message icon={icons.warning_1} title={'Попередження'} text={'Парелелограм, побудований на вказаних вершинах, не може існувати.'}
                                 c={icons.close} id={'not_exist_warning'}/>

                        <Message icon={icons.warning_1} title={'Попередження'} text={'Введене значення виходить за допустимі межі.'}
                                 c={icons.close} id={'out_of_bound_warning'}/>

                        <Message icon={icons.info_1} title={'Інформація'} text={'Буде встановлено початкові значення.'}
                                 c={icons.close} id={'not_exist_info_reset'}/>

                        <Message icon={icons.info_1} title={'Інформація'} text={'Заповніть значення в комірку.'}
                                 c={icons.close} id={'fill_info'}/>

                        <canvas height={425} width={425} id={'movement_canvas'}
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