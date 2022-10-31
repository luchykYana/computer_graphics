import {Title} from '../Title/Title';
import {icons, images} from '../../constants';

import css from './ColorModelTheory.module.css';

const ColorModelsTheory = () => {
    return (
        <div className={`${css.content}`}>
            <Title icon_name={icons.book} caption={'CMYK та HSL — колірні моделі?'}/>

            <div className={`${css.grid} ${css.mt10} ${css.flex}`}>
                <div className={`${css.textTheory} ${css.flex}`}>
                    <p><strong>CMYK</strong> — субтрактивна колірна модель, використовується у поліграфії, перш за все при
                        багатофарбовому друці. Українською перші три кольори називають так: блакитний, пурпуровий, жовтий; але професіонали
                        мають на увазі ціан, маджента та жовтий.</p>
                </div>
                <div>
                    <img className={`${css.imgTheory}`} src={images.cmyk} alt="cmyk model"/>
                </div>
            </div>

            <div className={`${css.grid} ${css.flex}`}>
                <div className={`${css.flex} ${css.textTheory}`}>
                    <p><strong>HSL</strong> — колірна модель, в якій будь-який колір визначається трьома характеристиками: кольоровим тоном,
                        наприклад, синім, червоним, жовтим тощо; насиченістю, тобто частиною чистого кольору, без домішки
                        чорної та білої фарб; «світністю», тобто близькістю до білого кольору. Схожа на колірну модель HSV.</p>
                </div>
                <div>
                    <img className={`${css.imgTheory}`} src={images.hsl} alt="hsl model"/>
                </div>
            </div>
        </div>
    );
};

export {ColorModelsTheory};