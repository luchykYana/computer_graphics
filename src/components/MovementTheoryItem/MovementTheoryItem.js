import React from 'react';

import css from './MovementTheoryItem.module.css'

const MovementTheoryItem = ({caption, img_link, arr_description}) => {
    return (
        <div className={`${css.test}`}>
            <h2 className={`${css.center}`}>{caption}</h2>

            <img className={`${css.image} ${css.center}`} src={img_link} alt="moving theory image"/>

            {arr_description}
        </div>
    );
};

export {MovementTheoryItem};