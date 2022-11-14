import {Title} from '../../components';
import {icons} from '../../constants';

import css from './MovePractisePage.module.css'
import {useEffect, useState} from 'react';

const MovePracticePage = () => {
    const range = 16;

    const [line, setLine] = useState({k: 0, x: 0});
    const [point1, setPoint1] = useState({x: 0, y: 0});
    const [point2, setPoint2] = useState({x: 0, y: 0});
    const [point3, setPoint3] = useState({x: 0, y: 0});
    const [point4, setPoint4] = useState({x: 0, y: 0});

    const [gridSize, setGridSize] = useState(25);

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
        draw_line_kx()
        draw_parallelogram();
        ctx.translate(-1 * (y_axis_distance_grid_lines * gridSize), -1 * ( x_axis_distance_grid_lines * gridSize) );
    }, [gridSize]);

    useEffect(() => {
        console.log(line)
        onDrawLine();
        onDrawParallelogram();
    }, [line]);

    useEffect(() => {
        console.log(point1)
        console.log(point2)
        console.log(point3)
        console.log(point4)
    }, [point1, point2, point3, point4]);

    const reset = () => {
        setPoint1({x: 0, y: 0})
        setPoint2({x: 0, y: 0})
        setPoint3({x: 0, y: 0})
        setPoint4({x: 0, y: 0})
        setLine({k: 0, x: 0})

        let arr = document.getElementsByTagName('input');
        for (let item of arr) {
            item.value = '';
        }
    }

    const onMovementChange = () => {
        console.log('on movement change')
    }

    const onDrawParallelogram = () => {
        console.log('onDrawParallelogram')
        const canvas = document.getElementById('movement_canvas');
        const [ctx, x_axis_distance_grid_lines, y_axis_distance_grid_lines] = repetitiveActions();

        ctx.clearRect(0, 0,  canvas.width, canvas.height);

        draw_xy_graph();
        draw_line_kx();
        draw_parallelogram();

        ctx.translate(-1 * (y_axis_distance_grid_lines * gridSize), -1 * ( x_axis_distance_grid_lines * gridSize) );
    }

    const draw_parallelogram = () => {
        // todo
        // here we need to implement drawing of the parallelogram ;)
        // i'll look here later
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


            // let X = -x * scale;
            // let Y = (x * line.k + line.x) * scale;
            //
            // let X1 = (x + 1) * scale;
            // let Y1 = (-(x + 1) * line.k + line.x) * scale;
            //
            // ctx.moveTo(X, Y);
            // ctx.lineTo(X1, Y1);
        }

        ctx.stroke();
    }
    
    const onDrawLine = () => {
        const canvas = document.getElementById('movement_canvas');
        const [ctx, x_axis_distance_grid_lines, y_axis_distance_grid_lines] = repetitiveActions();

        ctx.clearRect(0, 0,  canvas.width, canvas.height);

        draw_xy_graph();
        draw_line_kx();

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
        var grid_size = gridSize;
        var x_axis_starting_point = {number: 1, suffix: ''};
        var y_axis_starting_point = {number: 1, suffix: ''};

        const canvas = document.getElementById('movement_canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0,  canvas.width, canvas.height);

        // canvas width
        var canvas_width = canvas.width;

        // canvas height
        var canvas_height = canvas.height;

        // no of vertical grid lines
        var num_lines_x = Math.floor(canvas_height / grid_size);

        // no of horizontal grid lines
        var num_lines_y = Math.floor(canvas_width / grid_size);


        var x_axis_distance_grid_lines = Math.floor(num_lines_x / 2);
        var y_axis_distance_grid_lines = Math.floor(num_lines_y / 2);


        // ctx.translate(y_axis_distance_grid_lines * grid_size, x_axis_distance_grid_lines * grid_size);

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
                ctx.moveTo(0, grid_size * i);
                ctx.lineTo(canvas_width, grid_size * i);
            } else {
                ctx.moveTo(0, grid_size * i + 0.5);
                ctx.lineTo(canvas_width, grid_size * i + 0.5);
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
                ctx.moveTo(grid_size * i, 0);
                ctx.lineTo(grid_size * i, canvas_height);
            } else {
                ctx.moveTo(grid_size * i + 0.5, 0);
                ctx.lineTo(grid_size * i + 0.5, canvas_height);
            }
            ctx.stroke();
        }

        ctx.translate(y_axis_distance_grid_lines * grid_size, x_axis_distance_grid_lines * grid_size);

        // Ticks marks along the positive X-axis
        for (let i = 1; i < (num_lines_y - y_axis_distance_grid_lines); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(grid_size * i + 0.5, -3);
            ctx.lineTo(grid_size * i + 0.5, 3);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(x_axis_starting_point.number * i + x_axis_starting_point.suffix, grid_size * i - 2, 15);
        }

// Ticks marks along the negative X-axis
        for (let i = 1; i < y_axis_distance_grid_lines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-grid_size * i + 0.5, -3);
            ctx.lineTo(-grid_size * i + 0.5, 3);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'end';
            ctx.fillText(-x_axis_starting_point.number * i + x_axis_starting_point.suffix, -grid_size * i + 3, 15);
        }

        // Ticks marks along the positive Y-axis
// Positive Y-axis of graph is negative Y-axis of the canvas
        for (let i = 1; i < (num_lines_x - x_axis_distance_grid_lines); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-3, grid_size * i + 0.5);
            ctx.lineTo(3, grid_size * i + 0.5);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(-y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, grid_size * i + 3);
        }

// Ticks marks along the negative Y-axis
// Negative Y-axis of graph is positive Y-axis of the canvas
        for (let i = 1; i < x_axis_distance_grid_lines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-3, -grid_size * i + 0.5);
            ctx.lineTo(3, -grid_size * i + 0.5);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, -grid_size * i + 3);
        }
    }

    const onWheelFunction = (e) => {
        if(e.deltaY > 0 &&  gridSize > 15 ) {
            setGridSize(gridSize/2);
        } else if(e.deltaY < 0 && gridSize < 100) {
            setGridSize(gridSize * 2);
        }
    }



    const onPageLoad = () =>{
        console.log('onload')
        const [ctx, x_axis_distance_grid_lines, y_axis_distance_grid_lines] = repetitiveActions();
        draw_xy_graph();
        ctx.translate(-1 * (y_axis_distance_grid_lines * gridSize), -1 * ( x_axis_distance_grid_lines * gridSize) );
    }


    const onLineKChange = (local_line, set_line_func, e) => {
        if (e.target.value.length !== 0 && Math.abs(Number(e.target.value)) <= range) {
            set_line_func({k: Number(e.target.value), x: local_line.x});
        } else {
            set_line_func({k: 0, x: local_line.x});
            e.target.value = '';
        }
    }

    const onLineXChange = (local_line, set_line_func, e) => {
        if (e.target.value.length !== 0 && Math.abs(Number(e.target.value)) <= range) {
            set_line_func({k: local_line.k, x: Number(e.target.value)});
        }else {
            set_line_func({k: local_line.k, x: 0});
            e.target.value = '';
        }
    }

    const onPointXChange = (local_point, set_point_func, e) => {
        if (e.target.value.length !== 0) {
            set_point_func({x: Number(e.target.value), y: local_point.y});
        }
    }

    const onPointYChange = (local_point, set_point_func, e) => {
        if (e.target.value.length !== 0) {
            set_point_func({x: local_point.x, y: Number(e.target.value)});
        }
    }

    return (
        <div className={`${css.content}`} onLoad={onPageLoad}>
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
                                           defaultValue={0} onChange={(e) => {onLineKChange(line, setLine, e)}}
                                    />
                                    <p className={`${css.margin}`}><b>* X + </b></p>
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'x'}
                                           defaultValue={0} onChange={(e) => {onLineXChange(line, setLine, e)}}
                                    />
                                </div>

                            </div>

                            <button onClick={onDrawLine} className={`${css.button} ${css.margin_left}`}>Пряма</button>
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
                                        <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'x2'}
                                               onChange={(e) => {onPointXChange(point2, setPoint2, e)}}
                                        />
                                        <p className={`${css.margin}`}><b>Y</b></p>
                                        <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'y2'}
                                               onChange={(e) => {onPointYChange(point2, setPoint2, e)}}
                                        />
                                    </div>
                                </div>

                                <div className={`${css.test} ${css.flex}`}>
                                    <div className={`${css.flex} ${css.center}`}>
                                        <p className={`${css.margin}`}><b>X</b></p>
                                        <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'x1'}
                                               onChange={(e) => {onPointXChange(point1, setPoint1, e)}}
                                        />
                                        <p className={`${css.margin}`}><b>Y</b></p>
                                        <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'y1'}
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
                                        <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'x3'}
                                               onChange={(e) => {onPointXChange(point3, setPoint3, e)}}
                                        />
                                        <p className={`${css.margin}`}><b>Y</b></p>
                                        <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'y3'}
                                               onChange={(e) => {onPointYChange(point3, setPoint3, e)}}
                                        />
                                    </div>

                                </div>

                                <div className={`${css.test} ${css.flex} ${css.positionRightCoordinate}`}>
                                    <div className={`${css.flex} ${css.center}`}>
                                        <p className={`${css.margin}`}><b>X</b></p>
                                        <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'x4'}
                                               disabled={false} onChange={(e) => {onPointXChange(point4, setPoint4, e)}}
                                        />
                                        <p className={`${css.margin}`}><b>Y</b></p>
                                        <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range} id={'y4'}
                                               disabled={false} onChange={(e) => {onPointYChange(point4, setPoint4, e)}}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className={`${css.flex} ${css.margin_center}`}>
                            <button onClick={onDrawParallelogram} className={`${css.button}`}>Паралелограм</button>
                        </div>
                    </div>

                    <div className={`${css.text}`}>
                        <p>Рух дзеркального відображення паралелограма:</p>
                    </div>

                    <div className={`${css.movementRangeBlock}`}>
                        <input className={`${css.move}`} onChange={onMovementChange} id={'movement_range'}
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