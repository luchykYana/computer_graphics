import React from 'react';
import {Title} from "../Title/Title";
import './FractalTheory.css';
import {icons, images} from "../../constants";

const FractalTheory = () => {
    return (
        <div className={'content'}>
            <Title icon_name={icons.book} caption={'Що таке фрактал?'}/>

            <div className={'flex grid'} >
                <div className={'fractal-theory-text'}>
                    <p>Слово фрактал утворено від латинського fractus і в перекладі означає той, що складається з фрагментів (подрібнений).</p>
                    <br/>
                    <p>Фракталом називається структура, що складається з частин, які в якомусь сенсі подібні до цілого.</p>
                    <br/>
                    <p>В основі цього явища лежить дуже проста ідея: нескінчену по красі і різноманітності множину фігур можна отримати з відносно простих конструкцій за допомогою всього двох операцій - копіювання і масштабування.</p>
                </div>
                <div>
                    <img id='fractal_theory' src={images.fractal_theory} alt="fractal"/>
                </div>
            </div>
        </div>
    );
};

export {FractalTheory};