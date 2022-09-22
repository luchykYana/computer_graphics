import React, {useLayoutEffect} from 'react';
import {Title} from '../Title/Title';
import {icons} from '../../constants';

import './DisplayFractal.css'

const DisplayFractal = ({fractal_header_name, fractal_name, fractal_description, dragon, barnsley, cesaro, gilbert, count= 20}) => {

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

        draw(250 - 128 , 130 , 250 + 128 , 130 , d);
    }
    const buildBarnsleyFractal = (d) => {
        console.log('buildBarnsleyFractal\nvalue: ' + d)
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

        if (h < w) { total_length = 0.9 * h; }
        else { total_length = 0.9 * w; }

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

        if (dragon) { buildDragonFractal(depth); }
        else if (gilbert) {buildGilbertFractal(depth);}
        else if (barnsley) {buildBarnsleyFractal(depth);}
        else if (cesaro) {buildCesaroFractal(depth);}
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
                        <select id='iterations' name='iterations' onChange={buildFractal} >
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