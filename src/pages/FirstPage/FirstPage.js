import {useNavigate} from 'react-router';

import {icons} from '../../constants';

import css from './FirstPage.module.css';

const FirstPage = () => {
    const navigate = useNavigate();

    const start = () => navigate('../content/fractal', {replace: true});

    return (
        <div className={css.bgColor}>
            <div className={`${css.d_flex} ${css.title}`}>
                <div><img src={icons.main_icon} alt="main"/></div>
                <div>Раді вітати вас у ProFractal</div>
            </div>

            <div className={css.second_title}>Тут ви зможете:</div>

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
                    <div>Побачити на власні очі фрактал-папороть, криву, пряму та навіть <b>Дракона</b>!</div>
                </div>

                <div className={`${css.d_flex} ${css.points}`}>
                    <div className={`${css.red_square} ${css.square}`}></div>
                    <div className={css.point_img}><img src={icons.brush} alt="brush"/></div>
                    <div>Розібрати <b>по пікселю</b> будь-яку свою картинку у 2 колірних моделях</div>
                </div>

                <div className={`${css.d_flex} ${css.points}`}>
                    <div className={`${css.yellow_square} ${css.square}`}></div>
                    <div className={css.point_img}><img src={icons.ruler} alt="ruler"/></div>
                    <div>
                        Побудувати паралелограм <b>дзеркально прямої</b> та відправити його в далечінь координатної
                        площини
                    </div>
                </div>
            </div>

            <div className={`${css.first_page_button} ${css.d_flex}`}>
                <button id={css['first_page_button']} onClick={start}>Заінтригували? Що ж, давайте розпочинати!</button>
            </div>
        </div>
    );
};

export {FirstPage};