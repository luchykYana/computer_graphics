import React, {useLayoutEffect} from 'react';
import {Title} from '../Title/Title';
import {icons} from '../../constants';

import './DisplayFractal.css'

const DisplayFractal = ({
                            fractal_header_name,
                            fractal_name,
                            fractal_description,
                            dragon,
                            barnsley,
                            cesaro,
                            gilbert,
                            count = 20
                        }) => {

    let selectItems = [];

    for (let i = 1; i <= count; i++) {
        selectItems.push(<option value={i}>{i}</option>);
    }

    const buildDragonFractal = (d) => {
        const canvas = document.getElementById('fractal_canvas');
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(255,0,0)';

        // async function draw(x1, y1, x2, y2, dep) {
        function draw(x1, y1, x2, y2, dep) {
            if (dep === 0) {
                ctx.fillRect(x1, y1, 1, 1);
                ctx.fillRect(x2, y2, 1, 1);
                return;
            }

            let dx = (x2 - x1) / 2;
            let dy = (y2 - y1) / 2;
            //смещение по х и у
            let x_tmp = x1 + dx - dy;
            let y_tmp = y1 + dy + dx;

            // await new Promise(resolve => setTimeout(resolve, 1000));
            draw(x1, y1, x_tmp, y_tmp, dep - 1);
            draw(x2, y2, x_tmp, y_tmp, dep - 1);

        }

        draw(250 - 128, 130, 250 + 128, 130, d);
    }
    const buildBarnsleyFractal = (d) => {
        console.log('buildBarnsleyFractal\nvalue: ' + d)
        let canvas;
        let canvasContext;

        let x = 0, y = 0;

        function draw (d) {
            canvas = document.getElementById("fractal_canvas");
            canvasContext = canvas.getContext('2d');

            canvasContext.fillStyle = "white";
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);

                for (let i = 0; i < d * 500; i++)
                    update();
        }

        function update() {

            let nextX, nextY;
            let r = Math.random();
            if (r < 0.01) {
                nextX =  0;
                nextY =  0.16 * y;
            } else if (r < 0.86) {
                nextX =  0.85 * x + 0.04 * y;
                nextY = -0.04 * x + 0.85 * y + 1.6;
            } else if (r < 0.93) {
                nextX =  0.20 * x - 0.26 * y;
                nextY =  0.23 * x + 0.22 * y + 1.6;
            } else {
                nextX = -0.15 * x + 0.28 * y;
                nextY =  0.26 * x + 0.24 * y + 0.44;
            }

            // Scaling and positioning
            let plotX = canvas.width * (x + 3) / 6;
            let plotY = canvas.height - canvas.height * ((y + 2) / 14);

            drawFilledCircle(plotX, plotY, 1, "green");

            x = nextX;
            y = nextY;

        }
        const drawFilledCircle = (centerX, centerY, radius, color) => {
            canvasContext.beginPath();
            canvasContext.fillStyle = color;
            canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
            canvasContext.fill();
        };

        draw(d);
    }
    const buildCesaroFractal = (d) => {
        console.log('buildCesaroFractal\nvalue: ' + d)
    }
    const buildGilbertFractal = (d) => {
        function Drawing(dx, dy)//функція формування лінії
        {
            ctx.beginPath();
            ctx.moveTo(LastX, LastY);
            ctx.lineTo(LastX + dx, LastY + dy);
            ctx.closePath();
            ctx.stroke();
            LastX += dx;
            LastY += dy;
        }

        function Hilbert(dep, dx, dy)//функція, яка викликає формування ліній в потрібному порядку
        {
            if (dep > 1) Hilbert(dep - 1, dy, dx);
            Drawing(dx, dy);
            if (dep > 1) Hilbert(dep - 1, dx, dy);
            Drawing(dy, dx);
            if (dep > 1) Hilbert(dep - 1, dx, dy);
            Drawing(-dx, -dy);
            if (dep > 1) Hilbert(dep - 1, -dy, -dx);
        }

        // console.log('buildGilbertFractal\nvalue: ' + d)

        const canvas = document.getElementById('fractal_canvas');
        const ctx = canvas.getContext('2d');
        const h = canvas.height;
        const w = canvas.width;

        let total_length;

        if (h < w) {
            total_length = 0.9 * h;
        } else {
            total_length = 0.9 * w;
        }

        let start_x = (w - total_length) / 2;
        let start_y = (h - total_length) / 2;

        let start_length = total_length / (Math.pow(2, d) - 1);

        let LastX = start_x;
        let LastY = start_y;
        Hilbert(d, start_length, 0);	//виклик рекурсивної функції Hilbert
    }

    const OleksandrTestDragonFunction = (d) => {
        const canvas = document.getElementById('fractal_canvas');
        const ctx = canvas.getContext('2d');

        ctx.strokeStyle = 'rgb(255,0,0)';

        let length = 600;

        /*
        The dragon curve drawn using an L-system.
        variables : X Y
        constants : F + −
        start  : FX
        rules  : (X → X+YF+), (Y → -FX−Y)
        angle  : 90°
        Here, F means "draw forward", − means "turn left 90°", and + means "turn right 90°".
        X and Y do not correspond to any drawing action and are only used to control the evolution of the curve.
        */

        const dragonCurve = function (depth) {
            //base case
            if (depth <= 1) {
                return 'FX';
            }
            // if(depth < 1) return

            let turtle = dragonCurve(depth - 1);
            let newTurtle = '';
            for (let i = 0; i < turtle.length; i++) {

                if (turtle.charAt(i) === 'X') {
                    newTurtle += 'X+YF+';
                } else if (turtle.charAt(i) === 'Y') {
                    newTurtle += '-FX-Y';
                } else {
                    newTurtle += turtle.charAt(i);
                }
            }
            return newTurtle;
        };

        const turtleDraw = function (text, startx, starty, length) {
            let direction = 0;
            let x = startx;
            let y = starty;

            ctx.beginPath();

            for (let i = 0; i < text.length; i++) {

                if (text.charAt(i) === 'F') {
                    //'F', draw forward length in direction
                    let endx = x + length * Math.cos(direction * 0.017453292519);
                    let endy = y + length * Math.sin(direction * 0.017453292519);

                    // let red = x/400 * 255;
                    // let blue = y/400 * 255;
                    // let green = (x + y + 300)/400 * 255;
                    // stroke(red, green, blue);

                    // line(x,y,endx,endy);
                    ctx.moveTo(x, y);
                    ctx.lineTo(endx, endy);
                    ctx.stroke();

                    x = endx;
                    y = endy;
                } else if (text.charAt(i) === '-') {
                    //'-' add 90 degrees to direction
                    direction += 90;
                } else if (text.charAt(i) === '+') {
                    //'+' subtract 90 degrees from direction
                    direction -= 90;
                }
            }
        };

        // fill(0, 0, 0);
        // rect(0,0,width,height);
        // stroke(255, 0, 0);

        //strokeWeight(3);
        //line(0,0,400,400);

        const dragon = dragonCurve(d);
        // alert(canvas.width/2)
        // alert(canvas.height/2)
        length /= Math.pow(2, d);
        turtleDraw(dragon, canvas.width / 2 - 100, canvas.height / 2 + 50, length);

        /*High definition... runs kinda slow
        var dragon = dragonCurve(16);
        turtleDraw(dragon,90,150,1);
        //*/
    }

    const buildFractal = (e) => {
        const canvas = document.getElementById('fractal_canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const depth = e.target.value;

        if (dragon) {
            // buildDragonFractal(depth);       // not to delete code
            OleksandrTestDragonFunction(depth); // to be renamed later
        } else if (gilbert) {
            buildGilbertFractal(depth);
        } else if (barnsley) {
            buildBarnsleyFractal(depth);
        } else if (cesaro) {
            buildCesaroFractal(depth);
        }
    };

    const download_img = () => {
        const canvas = document.getElementById("fractal_canvas");
        const a = document.getElementById("a");
        a.href = canvas.toDataURL("image/png");
        a.click();
    };

    return (
        <div className={'content'}>
            <Title icon_name={icons.pencil} caption={fractal_header_name}/>

            <div className={'flex grid '}>
                <div id={'left_side'}>
                    <div><p><b>{fractal_name} — </b>{fractal_description}</p></div>
                    <div className={'flex grid mt-60'}>
                        <label htmlFor='iterations'>Кількість ітерацій:</label>
                        <select id='iterations' name='iterations' onChange={buildFractal}>
                            {selectItems}
                        </select>
                    </div>
                    <div className={'mt-20 text-hint'}>
                        <p>Побудова фракталу - це повторюваний процес.</p>
                        <p>Від кількості ітерацій залежить результат побудови.</p>
                    </div>
                </div>
                <div>
                    <div>
                        <canvas id="fractal_canvas" width="500" height="340"></canvas>
                    </div>
                    <a id={'a'} download={fractal_header_name += '.png'}/>
                    <button className={'save_button'} onClick={download_img}>Зберегти</button>
                </div>
            </div>

        </div>
    );
};

export {DisplayFractal};