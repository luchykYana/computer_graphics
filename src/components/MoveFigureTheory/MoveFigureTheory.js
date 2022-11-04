import css from './MoveFigureTheory.module.css'
import {Title} from "../Title/Title";
import {icons} from "../../constants";

const MoveFigureTheory = () => {
    return (
        <div className={`${css.content}`}>
            <Title caption={"Паралелограм та пряма: основне"} icon_name={icons.book}></Title>


        </div>
    );
};

export {MoveFigureTheory};