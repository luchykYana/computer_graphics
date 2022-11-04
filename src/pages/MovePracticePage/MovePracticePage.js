import {Title} from "../../components";
import {icons} from "../../constants";

import css from './MovePractisePage.module.css'

const MovePracticePage = () => {
    return (
        <div className={`${css.content}`}>
            <Title caption={"Рух паралелограма вздовж прямої"} icon_name={icons.ruler}></Title>
        </div>
    );
};

export {MovePracticePage};