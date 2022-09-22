import React from 'react';
import {Title} from "../Title/Title";
import {icons} from "../../constants";

import './DisplayFractal.css'

const DisplayFractal = ({fractal_header_name, fractal_name, fractal_description}) => {
    return (
        <div className={'content'}>
            <Title icon_name={icons.pencil} caption={fractal_header_name}/>

            <div className={'flex grid '}>
                <div id={'left_side'}>
                    <div><p><b>{fractal_name} — </b>{fractal_description}</p></div>
                    <div className={'flex grid mt-60'}>
                        <label htmlFor='iterations'>Кількість ітерацій:</label>
                        <select id='iterations' name='iterations'>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                        </select>
                    </div>
                    <div className={'mt-20 text-hint'}>
                        <p>Побудова фракталу - це повторюваний процес.</p>
                        <p>Від кількості ітерацій залежить результат побудови.</p>
                    </div>
                </div>
                <div>
                    <div>
                        <canvas id="fractal_canvas" width="340" height="340"> </canvas>
                    </div>
                    <button className={'save_button'} onClick={() => {alert('button SAVE was clicked')}}>Зберегти</button>
                </div>
            </div>

        </div>
    );
};

export {DisplayFractal};