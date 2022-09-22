import React from 'react';

import './Title.css';

const Title = ({icon_name, caption}) => {
    return (
        <div className={'flex margin-title margin-top-20'}>
            <img src={`${icon_name}`} alt=""/>
            <div className={'margin-left-50'}><h1>{caption}</h1></div>
        </div>
    );
};

export  {Title};