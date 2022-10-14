import {useNavigate} from 'react-router';
import css from '../FirstPage/FirstPage.module.css';
import {icons} from '../../constants';

import css2 from './LastPage.module.css';

const LastPage = () => {
    const navigate = useNavigate();

    const start = () => navigate('../', {replace: true});

    return (
        <div className={css.bgColor}>
            <div className={`${css.d_flex} ${css.title} ${css2.title}`}>
                <div><img src={icons.main_icon} alt="main"/></div>
                <div>Ти молодець!</div>
            </div>

            <div className={css.second_title}>У тебе вийшло, ти:</div>

            <div className={css.background_squares}>
                <div className={`${css.square_110} ${css.red_square}`}></div>
                <div className={`${css.square_110} ${css.blue_square}`}></div>
                <div className={`${css.square_110} ${css.yellow_square}`}></div>
                <div className={`${css.square_110} ${css.blue_square}`}></div>
                <div className={`${css.square_110} ${css.red_square}`}></div>
                <div className={`${css.square_110} ${css.yellow_square}`}></div>
            </div>

            <div>
                <div className={`${css.d_flex} ${css.points}`}>
                    <div className={`${css.blue_square} ${css.square}`}></div>
                    <div className={css.point_img}><img src={icons.pencil} alt="pencil"/></div>
                    <div>Побачив на власні очі фрактал-папороть, криву, пряму та навіть <b>Дракона</b>!</div>
                </div>

                <div className={`${css.d_flex} ${css.points}`}>
                    <div className={`${css.red_square} ${css.square}`}></div>
                    <div className={css.point_img}><img src={icons.brush} alt="brush"/></div>
                    <div>Розібрав <b>по пікселю</b> будь-яку свою картинку у 2 колірних моделях</div>
                </div>

                <div className={`${css.d_flex} ${css.points}`}>
                    <div className={`${css.yellow_square} ${css.square}`}></div>
                    <div className={css.point_img}><img src={icons.ruler} alt="ruler"/></div>
                    <div>
                        Побудував паралелограм <b>дзеркально прямої</b> та відправив його в далечінь координатної
                        площини
                    </div>
                </div>
            </div>

            <div className={`${css.first_page_button} ${css.d_flex}`}>
                <button id={css['first_page_button']} onClick={start}>На початок!</button>
            </div>
        </div>
    );
};

export {LastPage};