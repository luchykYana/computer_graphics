import {useLocation, useNavigate} from 'react-router';
import {useEffect, useState} from 'react';

import {arrows, userPath, userPath2} from '../../constants';

import css from './Footer.module.css';

const Footer = () => {
    const [path, setPath] = useState(0);
    const navigate = useNavigate();
    const {pathname} = useLocation();

    useEffect(() => {
        let currentPath = pathname;
        if (pathname.endsWith('/')) {
            currentPath = pathname.slice(0, pathname.length - 1);
        }

        const num = userPath.findIndex(el => el === currentPath);

        setPath(num);
    }, [pathname])

    const forward = () => navigate(userPath[path + 1], {replace: true});
    const back = () => navigate(userPath2[path - 1], {replace: true});

    return (
        <div className={css.flex}>
            <div onClick={back} className={`${css.left_arrow}`}><img src={arrows.arrow_left} alt="left"/></div>
            <div onClick={forward} className={`${css.right_arrow}`}><img src={arrows.arrow_right} alt="right"/></div>
        </div>
    );
};

export {Footer};