import React from 'react';

import './Title.css';

const Title = ({imageClassName, caption}) => {
    return (
        <div className={'flex margin-title margin-top-20'}>
            <div className={imageClassName}></div>
            <div className={'margin-left-50'}><h1>{caption}</h1></div>
        </div>
    );
};

export  {Title};