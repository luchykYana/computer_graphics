import {DisplayFractal} from "../../components/DisplayFractal/DisplayFractal";
import {fractal_description} from "../../constants";
import {Footer} from "../../components";

const FractalPracticePage = () => {
    return (
        <div>
            <DisplayFractal fractal_header_name={'Фрактал Хартера — Хейтуея'} fractal_name={'Крива дракона'} fractal_description={fractal_description.fractal_dragon}/>
            <Footer/>
            <DisplayFractal fractal_header_name={'Фрактал Барнслі'} fractal_name={'Папороть Барнслі'} fractal_description={fractal_description.fractal_barnsley}/>
            <Footer/>
            <DisplayFractal fractal_header_name={'Фрактал Чезаро'} fractal_name={'Лінія Чезаро'} fractal_description={fractal_description.fractal_cesaro}/>
            <Footer/>
            <DisplayFractal fractal_header_name={'Фрактал Гільберта-Пеано'} fractal_name={'Крива Гільберта'} fractal_description={fractal_description.fractal_gilbert_peano}/>
        </div>
    );
};

export {FractalPracticePage};