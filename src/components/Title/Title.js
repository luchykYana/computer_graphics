import React from 'react';

import './Title.css';
import '../../App.css'

const Title = ({icon_name, caption}) => {
    return (
        <div className={'flex margin-title margin-top-20'}>
            <img src={`${icon_name}`} alt="icon"/>
            <div className={'margin-left'}><h1>{caption}</h1></div>
        </div>
    );
};

export  {Title};