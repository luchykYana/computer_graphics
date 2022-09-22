import React, {useLayoutEffect} from 'react';
import {Title} from '../Title/Title';
import {icons} from '../../constants';

import './DisplayFractal.css'

const DisplayFractal = ({fractal_header_name, fractal_name, fractal_description, dragon, barnsley, cesaro, gilbert}) => {

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
        console.log('buildGilbertFractal\nvalue: ' + d)
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
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                            <option value='7'>7</option>
                            <option value='8'>8</option>
                            <option value='9'>9</option>
                            <option value='10'>10</option>
                            <option value='11'>11</option>
                            <option value='12'>12</option>
                            <option value='13'>13</option>
                            <option value='14'>14</option>
                            <option value='15'>15</option>
                            <option value='16'>16</option>
                            <option value='17'>17</option>
                            <option value='18'>18</option>
                            <option value='19'>19</option>
                            <option value='20'>20</option>
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