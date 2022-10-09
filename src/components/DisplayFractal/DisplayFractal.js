import React from 'react';
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
        selectItems.push(<option key={i} value={i}>{i}</option>);
    }

    const buildBarnsleyFractal = (d) => {
        let canvas;
        let canvasContext;

        let x = 0, y = 0;

        function draw(d) {
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
                nextX = 0;
                nextY = 0.16 * y;
            } else if (r < 0.86) {
                nextX = 0.85 * x + 0.04 * y;
                nextY = -0.04 * x + 0.85 * y + 1.6;
            } else if (r < 0.93) {
                nextX = 0.20 * x - 0.26 * y;
                nextY = 0.23 * x + 0.22 * y + 1.6;
            } else {
                nextX = -0.15 * x + 0.28 * y;
                nextY = 0.26 * x + 0.24 * y + 0.44;
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
        // побудувати початковий трикутник
        const canvas = document.getElementById('fractal_canvas');
        const ctx = canvas.getContext('2d');

        // клас 2-д точки, допоміжний
        const Point = function (x, y) {
            this.x = x;
            this.y = y;
        }

        console.log(d)
        const getDistance = (a, b) => {
            let [dx, dy] = [b.x - a.x, b.y - a.y]
            let distance = Math.sqrt(dx * dx + dy * dy);
            return distance;
        }

        // add a default limit of three as we don't want an infinite loop
        const cesaro = (a, b, c, iter = 1) => {
            const getPoints = (a, b, c) => {
                // let t = a.x * a.x - c.x * c.x + a.y * a.y - c.y * c.y;
                //
                // let y44 = (-(a.x * b.y - b.x * a.y) * (2 * c.x - 2 * a.x) - t * (b.y - a.y)) /
                //     ((b.x - a.x) * (2 * c.x - 2 * a.x) + (b.y - a.y) * (2 * c.y - 2 * a.y));

                console.info("--------------")
                console.info("a.y:" + a.y)
                console.info("b.y:" + b.y)
                console.info("--------------")
                let incrLeft;
                if (a.y < b.y) {
                    incrLeft = 1;
                } else {
                    incrLeft = -1;
                }

                console.info("get points")

                let x4, y4, x5, y5;
                let distance1, distance2, distance3, distance4;

                for (let x1 = (a.x + b.x) / 2, x2 = x1;
                     x1 > Math.min(a.x, b.x) && x1 < Math.max(a.x, b.x),
                     x2 < Math.max(a.x, b.x) && x2 > Math.min(a.x, b.x);
                     x1 += incrLeft, x2 += -incrLeft) {

                    console.info("--------------")
                    console.info("inc:" + incrLeft)
                    console.info("x1:" + x1, "x2:" + x2)
                    console.info("--------------")

                    console.info("outer loop: ")

                    for (let y1 = (a.y + b.y) / 2, y2 = y1;
                         y1 >= Math.min(a.y, b.y) && y1 <= Math.max(a.y, b.y),
                         y2 >= Math.min(a.y, b.y) && y2 <= Math.max(a.y, b.y);
                         y1 += -incrLeft, y2 += incrLeft) {
                        console.info("x1:" + x1 + " y1: " + y1 + " x2:" + x2 + " y2: " + y2)

                        distance1 = getDistance(c, new Point(x1, y1))
                        distance2 = getDistance(a, new Point(x1, y1))

                        distance3 = getDistance(c, new Point(x2, y2))
                        distance4 = getDistance(b, new Point(x2, y2))

                        if (Math.abs(distance2 - distance1) < 0.8 && Math.abs(distance3 - distance4) < 0.8) {
                            console.error("x1:" + x1 + " y1: " + y1 + " x2:" + x2 + " y2: " + y2)
                            console.error("d1: " + distance1 + " d2: " + distance2)
                            console.error("d3: " + distance3 + " d4: " + distance4)

                            x4 = x1;
                            x5 = x2;
                            y4 = y1;
                            y5 = y2;
                            break;
                        }

                        // if (a.y === b.y) {
                        //    break;
                        // }
                    }
                }

                return [new Point(x4, y4), new Point(x5, y5)];
            }

            if (iter < d) {
                console.error(iter)
                console.error(a)
                console.error(b)
                console.error(c)
                // знайти координати точок 4 і 5
                let [p4, p5] = getPoints(a, b, c)

                console.warn(p4)
                console.warn(p5)

                // побудувати трикутники на знайдених точках
                drawTriangle(c, a, p4)  // 3 1 4
                drawTriangle(b, c, p5)  // 2 3 5

                ctx.clearRect(p4.x + 1, p4.y - 1, p5.x - p4.x - 2, 2);

                // +++++
                // ctx.clearRect(p4.x + 1, p5.y - 1 , p5.x - p4.x - 1, p4.y - p5.y  + 2);
                //+++++++++

                // рекурсивні виклики для лівої і правої частини
                cesaro(c, a, p4, iter + 1) // точки 3 1 4
                console.error("after left part")
                cesaro(b, c, p5, iter + 1) // точки 2 3 5
                console.error("after right part")
// //*************
//
//             // test
//             let p6 = new Point(95, 200)
//             let p7 = new Point(170, 114)
//
//             drawTriangle(a, p6, p4)
//             drawTriangle(p4, c, p7)
//
//             ctx.clearRect(p6.x + 1, p7.y - 1 , p7.x - p6.x - 1, p6.y - p7.y + 2);
//             //-----------
                // ctx.clearRect(p6.x , p7.y  , p7.x - p6.x - 1, p6.y - p7.y );
                // ctx.clearRect(p4.x + 1, p5.y - 1 , p5.x - p4.x - 1, p4.y - p5.y  + 2);
            }
        }

        const drawTriangle = (a, b, c) => {
            ctx.beginPath();
            ctx.moveTo(c.x, c.y);
            ctx.lineTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.lineTo(c.x, c.y);
            ctx.strokeStyle = 'rgb(255, 0, 0)';
            ctx.stroke();
        }

        let A = new Point(10, 300);
        let B = new Point(490, 300);
        let C = new Point(250, 100);

        drawTriangle(A, B, C);
        cesaro(A, B, C)
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

    const buildFractal = (e) => {
        const canvas = document.getElementById('fractal_canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const depth = e.target.value;

        if (dragon) {
            buildDragonFractal(depth);
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

    const buildDragonFractal = (d) => {
        // клас 2-д точки, допоміжний
        const Point = function (x, y) {
            this.x = x;
            this.y = y;
        }

        // початкові налаштування
        const canvas = document.getElementById('fractal_canvas');
        const ctx = canvas.getContext('2d');

        let points = [new Point(canvas.width * 2 / 7, canvas.height * 2 / 5),
            new Point(canvas.width * 6 / 7, canvas.height * 2 / 5)];

        // ітеративна побудова
        for (let i = 0; i < d; i++) {
            step(points);
            drawCurve(points, ctx, canvas);
        }

        // повертає точку між двома існуючими точками в даному напрямку
        function bend(p1, p2, direction) {
            let xLength = p2.x - p1.x;
            let yLength = p2.y - p1.y;

            let angle = direction * Math.PI / 4;

            let newX = (xLength * Math.cos(angle) - yLength * Math.sin(angle))
                * 0.707106781 + p1.x;
            let newY = (xLength * Math.sin(angle) + yLength * Math.cos(angle))
                * 0.707106781 + p1.y;

            return new Point(newX, newY);
        }

        // підвищуємо деталізацію, обраховуючи наступні точки
        function step(points) {
            for (let i = 1; i < points.length; i += 2) {
                let newPoint = bend(points[i - 1], points[i],
                    parseInt(i / 2) % 2 === 0 ? 1 : -1);
                points.splice(i, 0, newPoint);
            }
        }

        // рисує 1 сегмент фракталу
        function drawSegment(p1, p2, context) {
            context.strokeStyle = 'rgb(255, 0, 0)';
            context.beginPath();
            context.moveTo(p1.x, p1.y);
            context.lineTo(p2.x, p2.y);
            context.stroke();
        }

        // рисує фрактаьну криву
        function drawCurve(points, context, canvas) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 1; i < points.length; i++) {
                drawSegment(points[i - 1], points[i], context);
            }
        }
    }

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