import React, {useState} from 'react';

import {DisplayFractal} from "../DisplayFractal/DisplayFractal";
import {fractal_description} from "../../constants";

import './FractalNavigate.css'

const FractalNavigate = () => {
    const [isFractalDragonEnabled, setIsFractalDragonEnabled] = useState(true);
    const [isFractalBarnsleyEnabled, setIsFractalBarnsleyEnabled] = useState(false);
    const [isFractalCesaroEnabled, setIsFractalCesaroEnabled] = useState(false);
    const [isFractalGilbertEnabled, setIsFractalGilbertEnabled] = useState(false);

    return (
        <div>
            {isFractalDragonEnabled && <DisplayFractal fractal_header_name={'Фрактал Хартера — Хейтуея'}
                                                       fractal_name={'Крива дракона'}
                                                       fractal_description={fractal_description.fractal_dragon}/> }

            {isFractalBarnsleyEnabled && <DisplayFractal fractal_header_name={'Фрактал Барнслі'}
                                                         fractal_name={'Папороть Барнслі'}
                                                         fractal_description={fractal_description.fractal_barnsley}/> }

            {isFractalCesaroEnabled && <DisplayFractal fractal_header_name={'Фрактал Чезаро'}
                                                       fractal_name={'Лінія Чезаро'}
                                                       fractal_description={fractal_description.fractal_cesaro}/> }

            {isFractalGilbertEnabled && <DisplayFractal fractal_header_name={'Фрактал Гільберта-Пеано'}
                                                        fractal_name={'Крива Гільберта'}
                                                        fractal_description={fractal_description.fractal_gilbert_peano}/> }

            <div className={'flex grid absolute'}>
                <button disabled={isFractalDragonEnabled} onClick={() => {
                    setIsFractalDragonEnabled(true);
                    setIsFractalCesaroEnabled(false);
                    setIsFractalGilbertEnabled(false);
                    setIsFractalBarnsleyEnabled(false);
                }}>Дракон</button>

                <button disabled={isFractalBarnsleyEnabled} onClick={() => {
                    setIsFractalDragonEnabled(false);
                    setIsFractalCesaroEnabled(false);
                    setIsFractalGilbertEnabled(false);
                    setIsFractalBarnsleyEnabled(true);
                }}>Папороть</button>

                <button disabled={isFractalCesaroEnabled} onClick={() => {
                    setIsFractalDragonEnabled(false);
                    setIsFractalCesaroEnabled(true);
                    setIsFractalGilbertEnabled(false);
                    setIsFractalBarnsleyEnabled(false);
                }}>Лінія</button>

                <button disabled={isFractalGilbertEnabled} onClick={() => {
                    setIsFractalDragonEnabled(false);
                    setIsFractalCesaroEnabled(false);
                    setIsFractalGilbertEnabled(true);
                    setIsFractalBarnsleyEnabled(false);
                }}>Крива</button>
            </div>
        </div>
    );
};

export {FractalNavigate};