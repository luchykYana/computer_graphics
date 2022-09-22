import {arrows} from "../../constants";

import css from './Footer.module.css';
import {useNavigate} from "react-router";

const Footer = () => {
    const navigate = useNavigate();

    const forward = () => navigate(1);
    const back = () => navigate(-1);

    return (
        <div className={css.flex}>
            <div onClick={back}><img src={arrows.arrow_left} alt="left"/></div>
            <div onClick={forward}><img src={arrows.arrow_right} alt="right"/></div>
        </div>
    );
};

export {Footer};