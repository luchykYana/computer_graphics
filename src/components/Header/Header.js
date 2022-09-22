import {Link, NavLink} from 'react-router-dom';

import css from './Header.module.css';
import {icons} from '../../constants';

const Header = () => {
    return (
        <header>
            <div className={css.whiteLineBig}></div>
            <div className={css.display}>

                <div className={css.logo}>
                    <div>
                        <img src={`${icons.main_icon}`}
                             alt='main-icon' width='70px'/>
                    </div>
                    <div className={css.mainText}><Link to={'/'}>ProFractal</Link></div>
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