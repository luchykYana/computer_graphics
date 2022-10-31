import {Title} from '../../components';
import {icons} from '../../constants';

import css from './ColorPractisePage.module.css';

const ColorPracticePage = () => {
    return (
        <div className={`${css.content}`}>
            <Title icon_name={icons.pencil} caption={'Перетворення моделей'}/>
        </div>
    );
};

export {ColorPracticePage};