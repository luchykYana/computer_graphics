import React, {useEffect, useState} from 'react';

import css from './InputBar.module.css'

const InputBar = ({arr_text, setPoint}) => {
    const [isValue1Set, setIsValue1Set] = useState(false);
    const [isValue2Set, setIsValue2Set] = useState(false);

    const [a, setA] = useState(0);
    const [b, setB] = useState(0);

    const range = 10;

    useEffect(()=> {
        if(isValue1Set && isValue2Set) {
            setPoint( {x: a, y: b});
        }
    }, [isValue1Set, isValue2Set, a, b])

    return (
        <div className={`${css.test} ${css.flex}`}>
            <div className={`${css.flex} ${css.center}`}>
                <p className={`${css.margin}`}><b>{arr_text[0]}</b></p>
                <input className={`${css.margin} ${css.input}`}
                       type='number'
                       min={-range}
                       max={range}
                       // id={'x'}

                       onInput={ (e) => {
                           console.log('change: ' + e.target.value)

                           if(e.target.value.length === 0) {
                               setIsValue1Set(false);
                               setA(0);
                           }
                           else {
                               setIsValue1Set(true);
                               setA(Number(e.target.value));
                           }
                       }

                       }
                />
                <p className={`${css.margin}`}><b>{arr_text[1]}</b></p>
                <input className={`${css.margin} ${css.input}`}
                       type='number'
                       min={-range}
                       max={range}
                       // id={'y'}

                       onInput={ (e) => {
                           console.log('change: ' + e.target.value)

                           if(e.target.value.length === 0) {
                               setIsValue2Set(false);
                               setB(0);
                           }
                           else {
                               setIsValue2Set(true);
                               setB(Number(e.target.value));
                           }
                       }

                       }
                />
            </div>

        </div>
    );
};

export {InputBar};