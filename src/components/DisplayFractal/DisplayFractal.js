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

        function draw (d) {
            canvas = document.getElementById("fractal_canvas");
            canvasContext = canvas.getContext('2d');

            canvasContext.fillStyle = "white";
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);

                for (let i = 0; i < d * 500 ; i++)
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
        const Point = function(x, y) {
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
        function bend (p1, p2, direction) {
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
        function step (points) {
            for (let i = 1; i < points.length; i+=2) {
                let newPoint = bend(points[i - 1], points[i],
                    parseInt(i / 2) % 2 === 0 ? 1 : -1);
                points.splice(i, 0, newPoint);
            }
        }

        // рисує 1 сегмент фракталу
        function drawSegment (p1, p2, context) {
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
                        <canvas id="fractal_canvas" width="500" height="340"> </canvas>
                    </div>
                    <a id={'a'} download={fractal_header_name +='.png'}/>
                    <button className={'save_button'} onClick={download_img}>Зберегти</button>

                </div>
            </div>
        </div>
    );
};

export {DisplayFractal};