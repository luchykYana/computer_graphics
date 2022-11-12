import {Title} from '../../components';
import {icons} from '../../constants';

import css from './MovePractisePage.module.css'
import {useEffect, useState} from 'react';

const MovePracticePage = () => {
    const range = 10;

    const [line, setLine] = useState({k: 0, x: 0});
    const [point1, setPoint1] = useState({x: 0, y: 0});
    const [point2, setPoint2] = useState({x: 0, y: 0});
    const [point3, setPoint3] = useState({x: 0, y: 0});
    const [point4, setPoint4] = useState({x: 0, y: 0});

    useEffect(()=> {
        // console.log(line)
        // console.log(point1);
        // console.log(point2);
        // console.log(point3);
        // console.log(point4);
    }, [point1, point2, point3, point4, line]);

    const reset = () => {
        setPoint1({x: 0, y: 0})
        setPoint2({x: 0, y: 0})
        setPoint3({x: 0, y: 0})
        setPoint4({x: 0, y: 0})
        setLine({k: 0, x: 0})

        let arr = document.getElementsByTagName('input');
        for(let item of arr) {
            item.value = '';
        }
    }

    const onMovementChange = () => {
        console.log('on movement change')
    }

    const draw_parallelogram = () => {
        console.log('draw_parallelogram')
        console.log(point1.x, point1.y)
        console.log(point2.x, point2.y)
        console.log(point3.x, point3.y)
        console.log(point4.x, point4.y)
    }
    
    const draw_line_kx = () => {
        console.log('draw line kx')
        console.log(line.k, line.x)
    }

    const download_img_movement = () => {
        const canvas = document.getElementById('movement_canvas');
        const a = document.getElementById('movement_canvas_link');
        a.href = canvas.toDataURL('image/png');
        a.click();
    }

    const draw_xy_graph = () => {
        console.log('works')
        var grid_size = 25;
        var x_axis_starting_point = { number: 1, suffix: '' };
        var y_axis_starting_point = { number: 1, suffix: '' };

        const canvas = document.getElementById('movement_canvas');
        const ctx = canvas.getContext('2d');

        // canvas width
        var canvas_width = canvas.width;

        // canvas height
        var canvas_height = canvas.height;

        // no of vertical grid lines
        var num_lines_x = Math.floor(canvas_height/grid_size);

        // no of horizontal grid lines
        var num_lines_y = Math.floor(canvas_width/grid_size);


        var x_axis_distance_grid_lines = Math.floor(num_lines_x/2);
        var y_axis_distance_grid_lines = Math.floor(num_lines_y/2);


        // Draw grid lines along X-axis
        for(let i=0; i<=num_lines_x; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;

            // If line represents X-axis draw in different color
            if(i === x_axis_distance_grid_lines)
                ctx.strokeStyle = "#000000";
            else
                ctx.strokeStyle = "#e9e9e9";

            if(i === num_lines_x) {
                ctx.moveTo(0, grid_size*i);
                ctx.lineTo(canvas_width, grid_size*i);
            }
            else {
                ctx.moveTo(0, grid_size*i+0.5);
                ctx.lineTo(canvas_width, grid_size*i+0.5);
            }
            ctx.stroke();
        }

        // Draw grid lines along Y-axis
        for(let i=0; i<=num_lines_y; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;

            // If line represents Y-axis draw in different color
            if(i == y_axis_distance_grid_lines)
                ctx.strokeStyle = "#000000";
            else
                ctx.strokeStyle = "#e9e9e9";

            if(i == num_lines_y) {
                ctx.moveTo(grid_size*i, 0);
                ctx.lineTo(grid_size*i, canvas_height);
            }
            else {
                ctx.moveTo(grid_size*i+0.5, 0);
                ctx.lineTo(grid_size*i+0.5, canvas_height);
            }
            ctx.stroke();
        }

        ctx.translate(y_axis_distance_grid_lines*grid_size, x_axis_distance_grid_lines*grid_size);

        // Ticks marks along the positive X-axis
        for(let i=1; i<(num_lines_y - y_axis_distance_grid_lines); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(grid_size*i+0.5, -3);
            ctx.lineTo(grid_size*i+0.5, 3);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(x_axis_starting_point.number*i + x_axis_starting_point.suffix, grid_size*i-2, 15);
        }

// Ticks marks along the negative X-axis
        for(let i=1; i<y_axis_distance_grid_lines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-grid_size*i+0.5, -3);
            ctx.lineTo(-grid_size*i+0.5, 3);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'end';
            ctx.fillText(-x_axis_starting_point.number*i + x_axis_starting_point.suffix, -grid_size*i+3, 15);
        }

        // Ticks marks along the positive Y-axis
// Positive Y-axis of graph is negative Y-axis of the canvas
        for(let i=1; i<(num_lines_x - x_axis_distance_grid_lines); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-3, grid_size*i+0.5);
            ctx.lineTo(3, grid_size*i+0.5);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(-y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, grid_size*i+3);
        }

// Ticks marks along the negative Y-axis
// Negative Y-axis of graph is positive Y-axis of the canvas
        for(let i=1; i<x_axis_distance_grid_lines; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#000000";

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-3, -grid_size*i+0.5);
            ctx.lineTo(3, -grid_size*i+0.5);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillText(y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, -grid_size*i+3);
        }




    }

    return (
        <div className={`${css.content}`}>
            <Title caption={'Рух паралелограма вздовж прямої'} icon_name={icons.ruler}></Title>

            <div className={`${css.flex}`}>
                <div className={`${css.left} ${css.mt}`}>
                    <div className={`${css.mt}`}>
                        <p>Введіть параметри а і b для графіку функції:</p>
                    </div>

                    <div className={`${css.mt} ${css.flex}`}>
                        <div className={`${css.test} ${css.flex}`}>
                            <div className={`${css.flex} ${css.center}`}>
                                <p className={`${css.margin}`}><b>y = </b></p>
                                <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range}
                                       id={'k'}
                                       onChange={(e) => {
                                           if (e.target.value.length !== 0) {
                                               setLine({k: Number(e.target.value), x:line.x});
                                           }
                                       }
                                   }
                                />
                                <p className={`${css.margin}`}><b>* X + </b></p>
                                <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range}
                                       id={'x'}
                                       onChange={(e) => {
                                           if (e.target.value.length !== 0) {
                                               setLine({k:line.k, x: Number(e.target.value)});
                                           }
                                       }
                                   }
                               />
                            </div>

                        </div>

                        <button onClick={draw_line_kx} className={`${css.button}`}>Пряма</button>
                    </div>

                    <div className={`${css.mt}`}>
                        <p>Введіть координати 3 точок для паралелограма:</p>
                    </div>

                    <div className={`${css.mt} `}>
                        <div className={`${css.top150}`}>
                            <div className={`${css.test} ${css.flex}`}>
                                <div className={`${css.flex} ${css.center}`}>
                                    <p className={`${css.margin}`}><b>X</b></p>
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range}
                                           id={'x2'}
                                           onChange={(e) => {
                                               if (e.target.value.length !== 0) {
                                                   setPoint2({x: Number(e.target.value), y: point2.y});
                                               }
                                           }
                                       }
                                    />
                                    <p className={`${css.margin}`}><b>Y</b></p>
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range}
                                           id={'y2'}
                                               onChange={(e) => {
                                               if (e.target.value.length !== 0) {
                                               setPoint2({x: point2.x, y: Number(e.target.value)});
                                           }
                                           }
                                       }
                                    />
                                </div>

                            </div>

                            <div className={`${css.test} ${css.flex}`}>
                                <div className={`${css.flex} ${css.center}`}>
                                    <p className={`${css.margin}`}><b>X</b></p>
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range}
                                           id={'x3'}
                                           onChange={(e) => {
                                               if (e.target.value.length !== 0) {
                                                   setPoint3({x: Number(e.target.value), y: point3.y});
                                               }
                                           }
                                           }
                                    />
                                    <p className={`${css.margin}`}><b>Y</b></p>
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range}
                                           id={'y3'}
                                           onChange={(e) => {
                                               if (e.target.value.length !== 0) {
                                                   setPoint3({x: point3.x, y: Number(e.target.value)});
                                               }
                                           }
                                           }
                                    />
                                </div>

                            </div>
                        </div>

                        <div className={`${css.bottom150}`}>
                            <div className={`${css.test} ${css.flex}`}>
                                <div className={`${css.flex} ${css.center}`}>
                                    <p className={`${css.margin}`}><b>X</b></p>
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range}
                                           id={'x1'}
                                           onChange={(e) => {
                                               if (e.target.value.length !== 0) {
                                                   setPoint1({x: Number(e.target.value), y: point1.y});
                                               }
                                           }
                                           }
                                    />
                                    <p className={`${css.margin}`}><b>Y</b></p>
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range}
                                           id={'y1'}
                                           onChange={(e) => {
                                               if (e.target.value.length !== 0) {
                                                   setPoint1({x: point1.x, y: Number(e.target.value)});
                                               }
                                           }
                                           }
                                    />
                                </div>

                            </div>

                            <div className={`${css.test} ${css.flex}`}>
                                <div className={`${css.flex} ${css.center}`}>
                                    <p className={`${css.margin}`}><b>X</b></p>
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range}
                                           id={'x4'} disabled
                                           onChange={(e) => {
                                               if (e.target.value.length !== 0) {
                                                   setPoint4({x: Number(e.target.value), y: point4.y});
                                               }
                                           }
                                           }
                                    />
                                    <p className={`${css.margin}`}><b>Y</b></p>
                                    <input className={`${css.margin} ${css.input}`} type='number' min={-range} max={range}
                                           id={'y4'} disabled
                                           onChange={(e) => {
                                               if (e.target.value.length !== 0) {
                                                   setPoint4({x: point4.x, y: Number(e.target.value)});
                                               }
                                           }
                                           }
                                    />
                                </div>

                            </div>

                            <button onClick={draw_parallelogram}
                                    className={`${css.button}`}>Паралелограм
                            </button>
                        </div>
                    </div>

                    <div>
                        <div className={`${css.mt}`}>
                            <p>Рух дзеркального відображення паралелограма</p>
                        </div>
                        <div className={`${css.mt}`}>
                            <input className={`${css.move}`} onChange={onMovementChange} id={'movement_range'} type="range"
                                   name='movement_range' defaultValue={0}
                                   min={-100} max={100} step={1}/>
                            <button onClick={reset} className={`${css.button}`}>Скидання</button>
                        </div>
                    </div>

                </div>

                <div>
                    <div>
                        <canvas height={425} width={425} onClick={draw_xy_graph} id={'movement_canvas'} className={`${css.movementCanvas}`}>
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
};

export {MovePracticePage};