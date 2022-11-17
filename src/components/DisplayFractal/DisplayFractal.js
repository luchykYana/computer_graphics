import {Title} from '../Title/Title';
import {Message} from '../Message/Message';
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
    const buildDragonFractal = (d) => {
        // клас 2-д точки, допоміжний
        const Point = function (x, y) {
            this.x = x;
            this.y = y;
        }

        // початкові налаштування
        const canvas = document.getElementById('fractal_canvas');
        const ctx = canvas.getContext('2d');

        //початкові точки
        let points = [new Point(canvas.width * 2 / 7, canvas.height * 2 / 5),
            new Point(canvas.width * 6 / 7, canvas.height * 2 / 5)];

        // ітеративна побудова
        for (let i = 0; i < d; i++) {
            step(points);
            drawCurve(points);
        }

        // повертає точку між двома існуючими точками в даному напрямку
        function bend(p1, p2, direction) {
            let xLength = p2.x - p1.x;
            let yLength = p2.y - p1.y;

            //поворот вправо або вліво
            let angle = direction * Math.PI / 4;

            let newX = (xLength * Math.cos(angle) - yLength * Math.sin(angle)) * (Math.sqrt(2) / 2) + p1.x;
            let newY = (xLength * Math.sin(angle) + yLength * Math.cos(angle)) * (Math.sqrt(2) / 2) + p1.y;

            // let newX = (xLength * Math.cos(angle) - yLength * Math.sin(angle)) * 1 + p1.x;
            // let newY = (xLength * Math.sin(angle) + yLength * Math.cos(angle)) * 1 + p1.y;

            return new Point(newX, newY);
        }

        // підвищуємо деталізацію, обраховуючи наступні точки
        function step(points) {
            for (let i = 1; i < points.length; i += 2) {
                let newPoint = bend(points[i - 1], points[i], i % 4 === 3 ? -1 : 1);

                // Крива Леві
                // let newPoint = bend(points[i - 1], points[i], i % 2 === 0 ? 1 : -1);

                points.splice(i, 0, newPoint);
            }
        }

        // малює фрактальну криву
        function drawCurve(points) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 1; i < points.length; i++) {
                drawSegment(points[i - 1], points[i]);
            }

            // малює 1 сегмент фракталу
            function drawSegment(p1, p2) {
                ctx.strokeStyle = 'rgb(255, 0, 0)';
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }

    const buildBarnsleyFractal = (d) => {
        let canvas = document.getElementById("fractal_canvas");
        let ctx = canvas.getContext('2d');
        let x = 0, y = 0;

        // очищає канвас та заново малює по кількості ітерацій
        function draw(d) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < d * 500; i++)
                update();
        }

        function update() {
            let nextX, nextY, r = Math.random();
            if (r < 0.01) {                                // стебло
                nextX = 0;
                nextY = 0.16 * y;
            } else if (r < 0.86) {                         // верхня частина папороті
                nextX = 0.85 * x + 0.04 * y;
                nextY = -0.04 * x + 0.85 * y + 1.6;
            } else if (r < 0.93) {                         // ліві великі частини
                nextX = 0.20 * x - 0.26 * y;
                nextY = 0.23 * x + 0.22 * y + 1.6;
            } else {                                       // праві великі частини
                nextX = -0.15 * x + 0.28 * y;
                nextY = 0.26 * x + 0.24 * y + 0.44;
            }

            //
            let plotX = canvas.width * (x + 3) / 6;
            let plotY = canvas.height - canvas.height * ((y + 2) / 14);

            drawFilledCircle(plotX, plotY, 1);

            x = nextX;
            y = nextY;
        }

        // малює крапочку
        const drawFilledCircle = (centerX, centerY, radius) => {
            ctx.beginPath();
            ctx.fillStyle = "green";
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, true);
            ctx.fill();
        };

        draw(d);
    }

    const buildCesaroFractal = (d) => {
        const canvas = document.getElementById('fractal_canvas');
        const ctx = canvas.getContext('2d');

        // клас 2-д точки, допоміжний
        const Point = function (x, y) {
            this.x = x;
            this.y = y;
        }

        // побудувати початковий трикутник
        let A = new Point(10, 300);
        let B = new Point(490, 300);
        let C = new Point(250, 100);

        drawTriangle(A, B, C);
        cesaro(A, B, C);

        function cesaro(a, b, c, iter = 1) {
            if (iter < d) {
                // знайти координати точок 4 і 5
                let [p4, p5] = getPoints(a, b, c);

                // побудувати трикутники на знайдених точках
                drawTriangle(c, a, p4);  // 3 1 4
                drawTriangle(b, c, p5);  // 2 3 5

                // очистити зайві частини рисунку
                clearLine(p4, p5);

                // рекурсивні виклики для лівої і правої частини
                cesaro(c, a, p4, iter + 1); // точки 3 1 4
                cesaro(b, c, p5, iter + 1); // точки 2 3 5
            }

            // замальовує поверх лінії кольором фону
            function clearLine(a, b) {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = 'rgb(245, 245, 245)'
                ctx.lineWidth = 4;
                ctx.stroke();
                ctx.lineWidth = 1;
            }

            function getPoints(a, b, c) {
                let incrLeft;
                let Xtmp = 0;
                if (a.y === b.y || ((c.y > a.y && c.y < b.y) || (c.y < a.y && c.y > b.y)) ||
                    (a.x < b.x)) {
                    Xtmp = -2
                }

                if (a.y < b.y) {
                    incrLeft = 1;
                } else {
                    incrLeft = -1;
                }

                let x4, y4, x5, y5;
                let distance1, distance2, distance3, distance4;
                let flag = true;

                for (let x1 = (a.x + b.x) / 2, x2 = x1;
                     (x1 > Math.min(a.x, b.x) && x1 < Math.max(a.x, b.x)) &&
                     (x2 < Math.max(a.x, b.x) && x2 > Math.min(a.x, b.x)) && flag;
                     x1 += 1 + Xtmp, x2 += -1 - Xtmp) {

                    for (let y1 = (a.y + b.y) / 2, y2 = y1;
                         (y1 >= Math.min(a.y, b.y) && y1 <= Math.max(a.y, b.y)) &&
                         (y2 >= Math.min(a.y, b.y) && y2 <= Math.max(a.y, b.y));
                         y1 += -incrLeft, y2 += incrLeft) {

                        distance1 = getDistance(c, new Point(x1, y1));
                        distance2 = getDistance(a, new Point(x1, y1));

                        distance3 = getDistance(c, new Point(x2, y2));
                        distance4 = getDistance(b, new Point(x2, y2));

                        if (Math.abs(distance2 - distance1) < 1 && Math.abs(distance3 - distance4) < 1) {
                            x4 = x1;
                            y4 = y1;
                            x5 = x2;
                            y5 = y2;
                            flag = false;
                            break;
                        }
                    }
                }

                return [new Point(x4, y4), new Point(x5, y5)];
            }
        }

        function drawTriangle(a, b, c) {
            ctx.beginPath();
            ctx.moveTo(c.x, c.y);
            ctx.lineTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.lineTo(c.x, c.y);
            ctx.strokeStyle = 'rgb(255, 0, 0)';
            ctx.stroke();
        }

        function getDistance(a, b) {
            let [dx, dy] = [b.x - a.x, b.y - a.y];
            return Math.sqrt(dx * dx + dy * dy);
        }
    }

    const buildGilbertFractal = (d) => {
        const canvas = document.getElementById('fractal_canvas');
        const ctx = canvas.getContext('2d');

        const totalLength = canvas.height < canvas.width ? 0.9 * canvas.height : 0.9 * canvas.width;

        // довжина одного відрізка залежно від ітерації
        let start_length = totalLength / (Math.pow(2, d) - 1);

        let currentX = (canvas.width - totalLength) / 2;
        let currentY = (canvas.height - totalLength) / 2;

        gilbert(d, start_length, 0);	//виклик рекурсивної функції Гільберта-Пеано

        function gilbert(dep, dx, dy)       //функція, яка викликає формування ліній в потрібному порядку
        {
            if (dep > 1) gilbert(dep - 1, dy, dx);
            draw(dx, dy);
            if (dep > 1) gilbert(dep - 1, dx, dy);
            draw(dy, dx);
            if (dep > 1) gilbert(dep - 1, dx, dy);
            draw(-dx, -dy);
            if (dep > 1) gilbert(dep - 1, -dy, -dx);

            // функція малювання лінії
            function draw(dx, dy) {
                ctx.beginPath();
                ctx.moveTo(currentX, currentY);
                ctx.lineTo(currentX + dx, currentY + dy);
                ctx.closePath();
                ctx.stroke();
                currentX += dx;
                currentY += dy;
            }
        }
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

        setTimeout(() => {
            document.getElementById("fractal_test_save").style.top = '250px';
            document.getElementById("fractal_test_save").style.right = '180px';
            document.getElementById("fractal_test_save").style.display = 'flex';
        }, 2000);
    };

    const enter = () => document.getElementById('fractal_test_info').style.display = 'flex';
    const leave = () => document.getElementById('fractal_test_info').style.display = 'none';

    return (
        <div className={'content'}>
            <Title icon_name={icons.pencil} caption={fractal_header_name}/>

            <div className={'flex grid '}>
                <div id={'left_side'}>
                    <div><p><b>{fractal_name} — </b>{fractal_description}</p></div>

                    <Message icon={icons.info_1} title={'Ітерація'} text={'Ітерація це повторення одноманітної дії'}
                             id={'fractal_test_info'} c={icons.close}/>

                    <div className={'flex grid mt-60 mlMinus60'}>
                        <label htmlFor='iterations' onMouseEnter={enter} onMouseLeave={leave}>Кількість ітерацій:</label>
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
                    <Message icon={icons.info_1} title={'Інформація'} text={'Файл успішно збережено'}
                             c={icons.close} id={'fractal_test_save'}/>
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