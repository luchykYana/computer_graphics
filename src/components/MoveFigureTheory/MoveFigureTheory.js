import css from './MoveFigureTheory.module.css'
import {Title} from "../Title/Title";
import {icons, images} from "../../constants";
import {MovementTheoryItem} from "../MovementTheoryItem/MovementTheoryItem";

const MoveFigureTheory = () => {
    return (
        <div className={`${css.content}`}>
            <div className={`${css.margin_left}`}><Title caption={"Паралелограм та пряма: основне"} icon_name={icons.book}></Title></div>

            <div className={`${css.flex} ${css.mt10}`}>
                <MovementTheoryItem
                    caption={"Паралелограм"}
                    img_link={images.parallelogram}
                    arr_description={
                        ["1. Протилежні сторони рівні",
                        "2. Протилежні кути рівні",
                        "3. Для побудови паралелограма достатньо 3 точок"
                    ]}
                />

                <MovementTheoryItem
                    caption={"Пряма y = aX + b"}
                    img_link={images.linekx}
                    arr_description={
                        ["1. a < 0 — функція спадна",
                            "2. a > 0 — функція зростаюча",
                            "3. b — рух функції по прямій y"
                        ]}
                />

            </div>


        </div>
    );
};

export {MoveFigureTheory};