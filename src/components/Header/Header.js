import {Link, NavLink} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router';

import {icons} from '../../constants';

import css from './Header.module.css';

const Header = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('fractal')){
            document.getElementById('body').style.backgroundColor = '#90CCF4';
        }

        if (location.pathname.includes('color')){
            document.getElementById('body').style.backgroundColor = '#F3D250';
        }

        if (location.pathname.includes('move')){
            document.getElementById('body').style.backgroundColor = '#F78888';
        }
    });



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
                    <NavLink to={'fractal'} defaultValue={'fractal'}>Фрактали</NavLink>
                    <NavLink to={'color-models'} defaultValue={'color-models'}>Колірні моделі</NavLink>
                    <NavLink to={'move-figure'} defaultValue={'move-figure'}>Рух фігури</NavLink>
                </div>

            </div>
            <div className={css.whiteLineSmall}></div>
        </header>
    );
};

export {Header};