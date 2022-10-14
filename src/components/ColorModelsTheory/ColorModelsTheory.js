import {Title} from '../Title/Title';
import {icons, images} from '../../constants';

import './ColorModelTheory.css'

const ColorModelsTheory = () => {
    return (
        <div className={'content'}>
            <Title icon_name={icons.book} caption={'CMYK та HSL — колірні моделі?'}/>

            <div className={"flex grid mt-10"}>
                <div className={"flex text-theory"}>
                    <p><strong>CMYK</strong> — субтрактивна колірна модель, використовується у поліграфії, перш за все при
                        багатофарбовому друці. Українською перші три кольори називають так: блакитний, пурпуровий, жовтий; але професіонали
                        мають на увазі ціан, маджента та жовтий.</p>
                </div>
                <div>
                    <img className={"img-theory"} src={images.cmyk} alt="cmyk model"/>
                </div>
            </div>

            <div className={"flex grid"}>
                <div className={"flex text-theory"}>
                    <p><strong>HSL</strong> — колірна модель, в якій будь-який колір визначається трьома характеристиками: кольоровим тоном,
                        наприклад, синім, червоним, жовтим тощо; насиченістю, тобто частиною чистого кольору, без домішки
                        чорної та білої фарб; «світністю», тобто близькістю до білого кольору. Схожа на колірну модель HSV.</p>
                </div>
                <div>
                    <img className={"img-theory"} src={images.hsl} alt="hsl model"/>
                </div>
            </div>
        </div>
    );
};

export {ColorModelsTheory};