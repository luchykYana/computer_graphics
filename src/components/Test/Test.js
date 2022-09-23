import {images, icons, fractal_title} from '../../constants';

import css from '../../pages/FractalTestPage/FractalTestPage.module.css';

const Test = () => {
    const checkResults = () => {
        const correctAnswers = [3,4,2,1];
        const selects = document.getElementsByTagName('select');
        const answers = [];
        const results = [];

        for (const select of selects) {
            answers.push(select.value);
        }

        for (let i = 0; i < 4; i++) {
            if(answers[i] == correctAnswers[i]) {
                results.push(true);
            } else {
                results.push(false);
            }
        }

        for (let i = 0; i < 4; i++) {
            if(results[i] === true) {
                selects[i].style.backgroundColor = '#1ed072';
            } else {
                selects[i].style.backgroundColor = '#ea3033';
            }
        }

        setTimeout(()=> {
            for (const select of selects) {
                select.style.backgroundColor = 'white';
            }
        }, 2000);
    }

    const hint = (e) => {
        const fractal = e.target.id;
        const elem = document.getElementById(`${fractal}_hint`);
        console.log(e.clientX);
        console.log(e.clientY);
        if (e.clientY < 400) {
            elem.style.top = '130px';
        } else {
            elem.style.top = '330px';
        }
        elem.style.display = 'block';
    }

    const hideHint = (e) => {
        const fractal = e.target.id;
        const elem = document.getElementById(`${fractal}_hint`);
        elem.style.display = 'none';
    }

    return (
        <div>
            <div className={`${css.flex} ${css.fractals}`}>
                <div className={css.flex}>

                    <div className={css.left_fractals}>
                        <div className={css.left_fractals_first}>1.&nbsp;
                            <div className={css.hint} id={'fractal_dragon_hint'}>
                                <div className={`${css.flex} ${css.hint_grid}`}>
                                    <div><img src={icons.light_bulb} alt="hint" className={css.hint_icon}/></div>
                                    <div>Підказка</div>
                                </div>
                                <div>{fractal_title.fractal_dragon}</div>
                            </div>

                            <img src={images.fractal_dragon} alt="dragon fractal" className={css.image}/>
                            <img src={icons.hint} alt="hint" className={css.image2} id={'fractal_dragon'}
                                 onMouseEnter={hint} onMouseLeave={hideHint}/>
                        </div>

                        <div>3.&nbsp;
                            <div className={css.hint} id={'fractal_cesaro_hint'}>
                                <div className={`${css.flex} ${css.hint_grid}`}>
                                    <div><img src={icons.light_bulb} alt="hint" className={css.hint_icon}/></div>
                                    <div>Підказка</div>
                                </div>
                                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fractal_title.fractal_cesaro}</div>
                            </div>

                            <img src={images.fractal_cesaro} alt="cesaro fractal" className={css.image}/>
                            <img src={icons.hint} alt="hint" className={css.image2} id={'fractal_cesaro'}
                                 onMouseEnter={hint} onMouseLeave={hideHint}/>
                        </div>
                    </div>

                    <div className={css.right_fractals}>
                        <div className={css.right_fractals_first}>2.&nbsp;
                            <div className={css.hint} id={'fractal_barnsley_hint'}>
                                <div className={`${css.flex} ${css.hint_grid}`}>
                                    <div><img src={icons.light_bulb} alt="hint" className={css.hint_icon}/></div>
                                    <div>Підказка</div>
                                </div>
                                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fractal_title.fractal_barnsley}</div>
                            </div>

                            <img src={images.fractal_barnsley} alt="barnsley fractal" className={css.image}/>
                            <img src={icons.hint} alt="hint" className={css.image2} id={'fractal_barnsley'}
                                 onMouseEnter={hint} onMouseLeave={hideHint}/>
                        </div>

                        <div>4.&nbsp;
                            <div className={css.hint} id={'fractal_gilbert_peano_hint'}>
                                <div className={`${css.flex} ${css.hint_grid}`}>
                                    <div><img src={icons.light_bulb} alt="hint" className={css.hint_icon}/></div>
                                    <div>Підказка</div>
                                </div>
                                <div>&nbsp;&nbsp;&nbsp;&nbsp;{fractal_title.fractal_gilbert_peano}</div>
                            </div>

                            <img src={images.fractal_gilbert_peano} alt="gilbert_peano fractal" className={css.image}/>
                            <img src={icons.hint} alt="hint" className={css.image2} id={'fractal_gilbert_peano'}
                                 onMouseEnter={hint} onMouseLeave={hideHint}/>
                        </div>
                    </div>

                </div>
                <div>
                    <div className={css.selects}>
                        <div>
                            <select name="select_1" id="select_1" className={css.select}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </select>
                            <label htmlFor='select_1'>Фрактал Чезаро</label>
                        </div>
                        <div>
                            <select name="select_2" id="select_2" className={css.select}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </select>
                            <label htmlFor='select_2'>Фрактал Гільберта-Пеано</label>
                        </div>
                        <div>
                            <select name="select_3" id="select_3" className={css.select}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </select>
                            <label htmlFor='select_3'>Фрактал Барнслі</label>
                        </div>
                        <div>
                            <select name="select_4" id="select_4" className={css.select}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </select>
                            <label htmlFor='select_4'>Фрактал Хартера-Хейтуа</label>
                        </div>
                    </div>

                    <button onClick={checkResults}>Перевірити</button>
                </div>
            </div>
        </div>
    );
};

export {Test};