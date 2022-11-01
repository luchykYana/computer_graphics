import css from '../../pages/ColorPracticePage/ColorPractisePage.module.css';
import {icons} from '../../constants';

const Pipette = ({n}) => {
    return (
        <div className={`${css.pipette}`} id={`pipette${n}`}>
            <div className={`${css.pipette_text}`} id={`pipette${n}_text`}></div>
            <div>
                <div className={`${css.pipette_img_fill}`} id={`pipette${n}_img_fill`}></div>
                <img src={icons.pipette_2} alt="pipette"/>
            </div>
        </div>
    );
};

export {Pipette};