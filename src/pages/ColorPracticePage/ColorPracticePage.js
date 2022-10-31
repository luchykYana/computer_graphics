import {Title} from '../../components';
import {icons} from '../../constants';

import css from './ColorPractisePage.module.css';


const ConvertRGBtoHSV = (r, g, b) => {
    [r, g, b] = [r/ 255, g / 255, b / 255];
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let [h, s, v] = [0, 0, 0];
    if (max === min) {
        h = 0;
    }
    else if (max === r && g >= b) {
        h = 60 * (g - b) / (max - min);
    }
    else if (max === r && g < b ) {
        h = 60 * (g - b) / (max - min) + 360;
    }
    else if(max === g) {
       h = 60 * (b - r) / (max - min) + 120;
    }
    else {
        h = 60 * (r - g) / (max - min) + 240;
    }

    if(max === 0) {
        s = 0;
    }
    else {
        s = 1 - (min / max)
    }

    v = max;
    return [h, s * 100, v * 100];
    }

const ColorPracticePage = () => {
    return (
        <div className={`${css.content}`}>
            <Title icon_name={icons.pencil} caption={'Перетворення моделей'}/>
        </div>
    );
};

export {ColorPracticePage};