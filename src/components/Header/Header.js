import {NavLink} from 'react-router-dom';

import css from './Header.module.css';

const Header = () => {
    return (
        <header>
            <div className={css.whiteLineBig}></div>
            <div className={css.display}>

                <div className={css.logo}>
                    <div>
                        <img src="http://drive.google.com/uc?export=view&id=1lz5b16c2S14kCPf7cCg2mpKnFYNwRA0_"
                             alt="main-icon"/>
                    </div>
                    <div className={css.mainText}>ProFractal</div>
                </div>

                <div className={css.links}>
                    <NavLink to={'fractal'}>Фрактали</NavLink>
                    <NavLink to={'color-models'}>Колірні моделі</NavLink>
                    <NavLink to={'move-figure'}>Рух фігури</NavLink>
                </div>

            </div>
            <div className={css.whiteLineSmall}></div>
        </header>
    );
};

export {Header};