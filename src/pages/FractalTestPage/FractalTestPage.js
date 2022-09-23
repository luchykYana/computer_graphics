import {icons, images} from '../../constants';
import {Test, Title} from '../../components';

import css from './FractalTestPage.module.css';
import React from "react";

const FractalTestPage = () => {
    return (
        <div className={css.content}>
            <Title icon_name={icons.question} caption={'Практична хвилинка'}/>

            <Test/>

        </div>
    );
};

export {FractalTestPage};