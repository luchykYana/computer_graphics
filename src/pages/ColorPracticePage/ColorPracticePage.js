import {useState} from 'react';

import {Title} from '../../components';
import {icons} from '../../constants';
import {modelFunc} from '../../helper';

import css from './ColorPractisePage.module.css';

const ColorPracticePage = () => {
    const imageHeight = 200;
    const imageWidth = 400;

    const [isImageSet, setIsImageSet] = useState(false);

    function drawEditedImage(newData, canvasID) {
        let canvasEdited = document.getElementById(canvasID);
        let ctxEdited = canvasEdited.getContext('2d');
        canvasEdited.width = imageWidth;
        canvasEdited.height = imageHeight;
        ctxEdited.putImageData(newData, 0, 0);
    }

    const getImageDataFromCanvas = (canvasName) => {
        let canvas = document.getElementById(canvasName);
        let context = canvas.getContext('2d')

        let data = context.getImageData(0, 0, canvas.width, canvas.height);
        return data;
    }

    const loadPhotos = () => {
        setIsImageSet(true);

        let imageData1 = getImageDataFromCanvas('cmyk_canvas')
        let imageData2 = imageData1;

        editPixelsHSL(imageData1.data);
        drawEditedImage(imageData1, 'hsl_canvas');

        editPixelsCMYK(imageData2.data);
        drawEditedImage(imageData2, 'cmyk_canvas');

        function editPixelsHSL(imgData) {
            let mas1 = [0, 0, 0];
            let mas2 = [0, 0, 0];
            for (let i = 0; i < imgData.length; i += 4) {
                mas1 = modelFunc.RGBtoHSL(imgData[i], imgData[i + 1], imgData[i + 2]);
                mas2 = modelFunc.HSLtoRGB(mas1[0], mas1[1], mas1[2]);
                imageData1.data[i] = mas2[0];
                imageData1.data[i + 1] = mas2[1];
                imageData1.data[i + 2] = mas2[2];
            }
        }

        function editPixelsCMYK(imgData) {
            let mas1 = [0, 0, 0, 0];
            let mas2 = [0, 0, 0];
            for (let i = 0; i < imgData.length; i += 4) {
                mas1 = modelFunc.RGBtoCMYK(imgData[i], imgData[i + 1], imgData[i + 2]);
                mas2 = modelFunc.CMYKtoRGB(mas1[0], mas1[1], mas1[2], mas1[3]);
                imageData2.data[i] = mas2[0];
                imageData2.data[i + 1] = mas2[1];
                imageData2.data[i + 2] = mas2[2];
            }
        }
    }

    const ImageChange = (e) => {
        let cmykCanvas = document.getElementById("cmyk_canvas");
        let cmykCtx = cmykCanvas.getContext('2d');
        cmykCanvas.width = imageWidth;
        cmykCanvas.height = imageHeight;
        let reader = new FileReader();
        reader.onload = function (event) {
            let image = new Image();
            image.onload = function () {
                cmykCtx.drawImage(image, 0, 0, cmykCanvas.width, cmykCanvas.height);
                loadPhotos();
            }
            image.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const buttonClick = () => {
        document.getElementById('myInput').click();
    }

    const buttonDeleteClick = () => {
        setIsImageSet(false);

        let cmykCanvas = document.getElementById("cmyk_canvas");
        let hslCanvas = document.getElementById("hsl_canvas");

        let cmykCtx = cmykCanvas.getContext('2d');
        let hslCtx = hslCanvas.getContext('2d');

        cmykCtx.clearRect(0, 0, imageWidth, imageHeight);
        hslCtx.clearRect(0, 0, imageWidth, imageHeight);
    }

    const getRangeOfValues = () => {
        let min, max;

        if(document.getElementById('red').checked === true) {
            min = 0; max= 60;
        } else if (document.getElementById('yellow').checked === true) {
            min = 60; max= 120;
        } else if (document.getElementById('green').checked === true) {
            min = 120; max= 180;
        } else if (document.getElementById('cyan').checked === true) {
            min = 180; max= 240;
        } else if (document.getElementById('blue').checked === true) {
            min = 240; max= 300;
        } else if (document.getElementById('magenta').checked === true) {
            min = 300; max= 360;
        }

        return [min, max]
    }

    const onSaturationChange = (event) => {
        console.log('saturation change')
        document.getElementById('saturationValue').value = event.target.value;
        const value = event.target.value;

        let [minRange, maxRange] = getRangeOfValues();
        let imageData = getImageDataFromCanvas('cmyk_canvas');

        editPixelsChangeSaturation(imageData.data);
        drawEditedImage(imageData, 'hsl_canvas');

        function editPixelsChangeSaturation(imgData) {
            let mas1 = [0, 0, 0];
            let mas2 = [0, 0, 0];
            for (let i = 0; i < imgData.length; i += 4) {
                mas1 = modelFunc.RGBtoHSL(imgData[i], imgData[i + 1], imgData[i + 2]);
                const h = mas1[0];
                if (h >= minRange && h <= maxRange) {
                    let s = mas1[1];

                    s += (value / 100);
                    if (s > 1) s = 1;
                    if (s < 0) s = 0;

                    mas2 = modelFunc.HSLtoRGB(mas1[0], s, mas1[2]);
                    imageData.data[i] = mas2[0];
                    imageData.data[i + 1] = mas2[1];
                    imageData.data[i + 2] = mas2[2];
                }
            }
        }
    }

    const onLightnessChange = (event) => {
        console.log('lightness change')
        document.getElementById('lightnessValue').value = event.target.value;
        const value = event.target.value;

        let [minRange, maxRange] = getRangeOfValues();
        let imageData = getImageDataFromCanvas('cmyk_canvas');

        editPixelsChangeLightness(imageData.data);
        drawEditedImage(imageData, 'hsl_canvas');

        function editPixelsChangeLightness(imgData) {
            let mas1 = [0, 0, 0];
            let mas2 = [0, 0, 0];
            for (let i = 0; i < imgData.length; i += 4) {
                mas1 = modelFunc.RGBtoHSL(imgData[i], imgData[i + 1], imgData[i + 2]);
                const h = mas1[0];
                if (h >= minRange && h <= maxRange) {
                    let l = mas1[2];

                    l += (value / 100);

                    if (l > 1) l = 1;
                    if (l < 0) l = 0;

                    mas2 = modelFunc.RGBtoHSL(mas1[0], mas1[1], l);
                    imageData.data[i] = mas2[0];
                    imageData.data[i + 1] = mas2[1];
                    imageData.data[i + 2] = mas2[2];
                }
            }
        }
    }

    const resetValues = (e) => {
        document.getElementById('lightness').value = 0;
        document.getElementById('saturation').value = 0;

        let event = new Event('change');
        // document.getElementById('lightness').dispatchEvent(event);
        document.getElementById('saturation').dispatchEvent(event);

        document.getElementById('lightness').dispatchEvent(new window.Event('change', { bubbles: true }))

    }

    return (
        <div className={`${css.content}`}>
            <Title icon_name={icons.brush} caption={'Перетворення моделей'}/>

            <div className={`${css.flex} ${css.height} ${css.gap}`}>
                <div>
                    <div className={`${css.flex} ${css.colorLetters}`}>

                        <div className={`${css.mainLetters} ${css.flex}`}>
                            <div className={`${css.mbMain}`}><h2>CMYK</h2></div>
                            <div className={`${css.pixelInfo2}`}></div>
                        </div>
                        <div className={`${css.sLetters}`}>
                            <div className={`${css.flex} ${css.letterGroupGap2}`}>
                                <div className={`${css.flex} ${css.letterGap} ${css.cmykWidthLetter}`}>
                                    <h3>(Cyan) Блакитний</h3>
                                    <div className={`${css.pixelInfo}`}></div>
                                </div>

                                <div className={`${css.flex} ${css.letterGap} ${css.cmykWidthLetter}`}>
                                    <h3>(Magenta) Пурпуровий</h3>
                                    <div className={`${css.pixelInfo}`}></div>
                                </div>
                            </div>

                            <div className={`${css.flex} ${css.letterGroupGap2}`}>
                                <div className={`${css.flex} ${css.letterGap} ${css.cmykWidthLetter}`}>
                                    <h3>(Yellow) Жовтий</h3>
                                    <div className={`${css.pixelInfo}`}></div>
                                </div>

                                <div className={`${css.flex} ${css.letterGap} ${css.cmykWidthLetter}`}>
                                    <h3>(Key) Чорний</h3>
                                    <div className={`${css.pixelInfo}`}></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={`${css.flex} ${css.colorLetters}`}>

                        <div className={`${css.mainLetters} ${css.flex}`}>
                            <div className={`${css.mbMain}`}><h2>HSL</h2></div>
                            <div className={`${css.pixelInfo2}`}></div>
                        </div>
                        <div className={`${css.flex} ${css.letterGroupGap}`}>

                            <div className={`${css.flex} ${css.letterGap} ${css.hslWidthLetter}`}>
                                <h3>(Hue) Відтінок</h3>
                                <div className={`${css.pixelInfo}`}></div>
                            </div>
                            <div className={`${css.flex} ${css.letterGap} ${css.hslWidthLetter}`}>
                                <h3>(Saturation) Насиченість</h3>
                                <div className={`${css.pixelInfo}`}></div>
                            </div>
                            <div className={`${css.flex} ${css.letterGap} ${css.hslWidthLetter}`}>
                                <h3>(Lightness) Світлота</h3>
                                <div className={`${css.pixelInfo}`}></div>
                            </div>

                        </div>

                    </div>
                </div>

                <div>
                    <div>
                        <canvas id={'cmyk_canvas'} className={`${css.colorCanvas}`} width={imageWidth}
                                height={imageHeight}></canvas>
                        {!isImageSet && <img onClick={buttonClick} className={`${css.uploadButton}`} src={icons.upload}
                                             alt="upload"/>}
                        {isImageSet &&
                            <img onClick={buttonDeleteClick} className={`${css.deleteButton}`} src={icons.trash}
                                 alt="delete"/>}
                    </div>
                    <div>
                        <canvas id={'hsl_canvas'} className={`${css.colorCanvas}`} width={imageWidth}
                                height={imageHeight}></canvas>
                        {!isImageSet && <img onClick={buttonClick} className={`${css.uploadButton}`} src={icons.upload}
                                             alt="upload"/>}
                        {isImageSet &&
                            <img onClick={buttonDeleteClick} className={`${css.deleteButton}`} src={icons.trash}
                                 alt="delete"/>}
                    </div>
                </div>

                <input onClick={(event) => {
                    event.target.value = null;
                }} onChange={ImageChange} id={'myInput'} name={'fileName'} type="file"/>
            </div>
            <input id={'red'} type="radio" name={'saturationRadio'} value={'red'} defaultChecked={true}/>
            <label htmlFor='red'>red</label>
            <input id={'yellow'} type="radio" name={'saturationRadio'} value={'yellow'} />
            <label htmlFor='yellow'>yellow</label>
            <input id={'green'} type="radio" name={'saturationRadio'} value={'green'} />
            <label htmlFor='green'>green</label>
            <input id={'cyan'} type="radio" name={'saturationRadio'} value={'cyan'} />
            <label htmlFor='cyan'>cyan</label>
            <input id={'blue'} type="radio" name={'saturationRadio'} value={'blue'} />
            <label htmlFor='blue'>blue</label>
            <input id={'magenta'} type="radio" name={'saturationRadio'} value={'magenta'} />
            <label htmlFor='magenta'>magenta</label>

            <input onChange={onSaturationChange} id={'saturation'} type="range" name='saturation' defaultValue={0}
                   min={-100} max={100}/>
            <input defaultValue={0} type="text" id={'saturationValue'}/>

            <input onChange={onLightnessChange} id={'lightness'} type="range" name='lightness' defaultValue={0} min={-100} max={100}/>
            <input  defaultValue={0} type="text" id={'lightnessValue'}/>

            <button onClick={resetValues} >Reset</button>

        </div>
    );
};

export {ColorPracticePage};