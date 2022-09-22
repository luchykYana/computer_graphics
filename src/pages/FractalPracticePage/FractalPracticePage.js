import {DisplayFractal} from "../../components/DisplayFractal/DisplayFractal";
import {fractal_description} from "../../constants";
import {useState} from "react";

const FractalPracticePage = () => {
    const [isFractalDragonEnabled, setIsFractalDragonEnabled] = useState(true);
    const [isFractalBarnsleyEnabled, setIsFractalBarnsleyEnabled] = useState(false);
    const [isFractalCesaroEnabled, setIsFractalCesaroEnabled] = useState(false);
    const [isFractalGilbertEnabled, setIsFractalGilbertEnabled] = useState(false);

    return (
        <div>
            {isFractalDragonEnabled && <DisplayFractal fractal_header_name={'Фрактал Хартера — Хейтуея'} fractal_name={'Крива дракона'}
                            fractal_description={fractal_description.fractal_dragon}/> }

            {isFractalBarnsleyEnabled && <DisplayFractal fractal_header_name={'Фрактал Барнслі'} fractal_name={'Папороть Барнслі'}
                            fractal_description={fractal_description.fractal_barnsley}/> }

            {isFractalCesaroEnabled && <DisplayFractal fractal_header_name={'Фрактал Чезаро'} fractal_name={'Лінія Чезаро'}
                            fractal_description={fractal_description.fractal_cesaro}/> }

            {isFractalGilbertEnabled && <DisplayFractal fractal_header_name={'Фрактал Гільберта-Пеано'} fractal_name={'Крива Гільберта'}
                            fractal_description={fractal_description.fractal_gilbert_peano}/> }

        </div>
    );
};

export {FractalPracticePage};