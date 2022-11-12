import {Title} from '../../components';
import {icons} from '../../constants';

import css from './MovePractisePage.module.css'
import {InputBar} from '../../components/InputBar/InputBar';
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
                        <canvas height={425} width={425} id={'movement_canvas'} className={`${css.movementCanvas}`}>
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