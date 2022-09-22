import {useNavigate} from "react-router";

import css from './FirstPage.module.css';

const FirstPage = () => {
    const navigate = useNavigate();

    const start = () => navigate('../content/fractal', {replace: true});

    return (
        <div className={css.bgColor}>
            FirstPage
            <button onClick={start}>Заінтригували? Що ж, давайте розпочинати!</button>

        </div>
    );
};

export {FirstPage};