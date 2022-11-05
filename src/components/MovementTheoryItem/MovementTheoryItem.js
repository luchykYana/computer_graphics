import React from 'react';

import css from './MovementTheoryItem.module.css'

const MovementTheoryItem = ({caption, img_link, arr_description}) => {
    return (
        <div className={`${css.test}`}>
            <h2 className={`${css.center} ${css.mt10}`}>{caption}</h2>

            <div className={`${css.flex}`}>
                <img className={`${css.image} ${css.center} ${css.mt10}`} src={img_link} alt="moving theory image"/>

                <div className={`${css.center} ${css.mt10} ${css.forText}`}>
                    {arr_description.map(x =>
                        <p className={`${css.mt10} ${css.text}`}>{x}</p>
                    )}

                </div>
            </div>

        </div>
    );
};

export {MovementTheoryItem};