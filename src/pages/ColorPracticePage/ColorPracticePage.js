import {useState} from 'react';

import {Title} from '../../components';
import {icons} from '../../constants';
import {modelFunc} from '../../helper';

import css from './ColorPractisePage.module.css';

const ColorPracticePage = () => {
    const imageHeight = 220;
    const imageWidth = 400;

    const [isImageSet, setIsImageSet] = useState(false);
    const [mousePos, setMousePos] = useState({x: 0, y: 0});

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
        resetValues();
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

        resetValues();
    }

    const getRangeOfValues = () => {
        let min, max;

        if (document.getElementById('red').checked === true) {
            min = 0;
            max = 60;
        } else if (document.getElementById('yellow').checked === true) {
            min = 60;
            max = 120;
        } else if (document.getElementById('green').checked === true) {
            min = 120;
            max = 180;
        } else if (document.getElementById('cyan').checked === true) {
            min = 180;
            max = 240;
        } else if (document.getElementById('blue').checked === true) {
            min = 240;
            max = 300;
        } else if (document.getElementById('magenta').checked === true) {
            min = 300;
            max = 360;
        }
        console.log([min, max])
        return [min, max]
    }

    const onSaturationChange = (event) => {
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

                    mas2 = modelFunc.HSLtoRGB(mas1[0], mas1[1], l);
                    imageData.data[i] = mas2[0];
                    imageData.data[i + 1] = mas2[1];
                    imageData.data[i + 2] = mas2[2];
                }
            }
        }
    }

    const resetValues = (e) => {
        let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(document.getElementById('lightness'), 0);

        let ev1 = new Event('input', {bubbles: true});
        document.getElementById('lightness').dispatchEvent(ev1);

        nativeInputValueSetter.call(document.getElementById('saturation'), 0);

        let ev2 = new Event('input', {bubbles: true});
        document.getElementById('saturation').dispatchEvent(ev2);

        document.getElementById('CMYK').style.backgroundColor = `rgb(253, 253, 253)`;
        document.getElementById('C').innerText = ``;
        document.getElementById('M').innerText = ``;
        document.getElementById('Y').innerText = ``;
        document.getElementById('K').innerText = ``;

        document.getElementById('HSL').style.backgroundColor = `rgb(253, 253, 253)`;
        document.getElementById('H').innerText = ``;
        document.getElementById('S').innerText = ``;
        document.getElementById('L').innerText = ``;
    }

    const getMousePosition = (canvas, e) => {
        let rect = canvas.getBoundingClientRect();
        return {
            x: Math.round(e.clientX - rect.left),
            y: Math.round(e.clientY - rect.top)
        };
    }
    const getMousePositionAll = (e) => {
        setMousePos({x: e.clientX, y: e.clientY});
    }

    const changePipe1 = (cmyk, rgb) => {
        const pipette = document.getElementById('pipette1');
        const pipette_text = document.getElementById('pipette1_text');
        const pipette_img = document.getElementById('pipette1_img_fill');
        pipette.style.top = `${mousePos.y - 90}px`;
        pipette.style.left = `${mousePos.x + 5}px`;
        pipette.style.display = 'block';
        pipette_text.innerText = `CMYK ( ${(cmyk[0] * 100).toFixed(0)}; ${(cmyk[1] * 100).toFixed(0)}; ${(cmyk[2] * 100).toFixed(0)}; ${(cmyk[3] * 100).toFixed(0)} )`;
        pipette_img.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    }
    const changePipe2 = (hsl, rgb) => {
        const pipette = document.getElementById('pipette2');
        const pipette_text = document.getElementById('pipette2_text');
        const pipette_img = document.getElementById('pipette2_img_fill');
        pipette.style.top = `${mousePos.y - 90}px`;
        pipette.style.left = `${mousePos.x + 5}px`;
        pipette.style.display = 'block';
        pipette_text.innerText = `HSL ( ${(hsl[0])}; ${(hsl[1] * 100).toFixed(0)}; ${(hsl[2] * 100).toFixed(0)} )`;
        pipette_img.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    }

    const mouseMove = (e) => {
        let {x, y} = getMousePosition(e.target, e);
        const imageData = e.target.getContext('2d').getImageData(0, 0, e.target.width, e.target.height).data;
        const index = (e.target.width * (y - 1) + x) * 4;
        const rgb = [imageData[index], imageData[index + 1], imageData[index + 2]];
        const cmyk = modelFunc.RGBtoCMYK(rgb[0], rgb[1], rgb[2]);
        const hsl = modelFunc.RGBtoHSL(rgb[0], rgb[1], rgb[2]);

        if (isImageSet === true) {
            if (e.target.id === 'cmyk_canvas') {
                changePipe1(cmyk, rgb);
            }
            if (e.target.id === 'hsl_canvas') {
                changePipe2(hsl, rgb);
            }
        }

        return {cmyk, hsl, rgb};
    }

    const disappearPipe1 = () => document.getElementById('pipette1').style.display = 'none';
    const disappearPipe2 = () => document.getElementById('pipette2').style.display = 'none';

    const changeParams1 = (cmyk, rgb) => {
        document.getElementById('CMYK').style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        document.getElementById('C').innerText = `${(cmyk[0] * 100).toFixed(0)}`;
        document.getElementById('M').innerText = `${(cmyk[1] * 100).toFixed(0)}`;
        document.getElementById('Y').innerText = `${(cmyk[2] * 100).toFixed(0)}`;
        document.getElementById('K').innerText = `${(cmyk[3] * 100).toFixed(0)}`;
    }
    const changeParams2 = (hsl, rgb) => {
        document.getElementById('HSL').style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
        document.getElementById('H').innerText = `${hsl[0]}`;
        document.getElementById('S').innerText = `${(hsl[1] * 100).toFixed(0)}`;
        document.getElementById('L').innerText = `${(hsl[2] * 100).toFixed(0)}`;
    }

    const clickPipe = (e) => {
        const {cmyk, hsl, rgb} = mouseMove(e);

        if (isImageSet === true) {
            if (e.target.id === 'cmyk_canvas') {
                changeParams1(cmyk, rgb);
            }
            if (e.target.id === 'hsl_canvas') {
                changeParams2(hsl, rgb);
            }
        }
    }


    const download_img_cmyk = () => {
        const canvas = document.getElementById('cmyk_canvas');
        const a = document.getElementById('cmyk_link');
        a.href = canvas.toDataURL("image/png");
        a.click();
    };

    const download_img_hsl = () => {
        const canvas = document.getElementById('hsl_canvas');
        const a = document.getElementById('hsl_link');
        a.href = canvas.toDataURL("image/png");
        a.click();
    };

    return (
        <div className={`${css.content}`} onMouseMove={getMousePositionAll}>
            <Title icon_name={icons.brush} caption={'Перетворення моделей'}/>

            <div className={`${css.flex} ${css.height} ${css.gap}`}>
                <div>
                    <div className={`${css.flex} ${css.colorLetters}`}>
                        <div className={`${css.mainLetters} ${css.flex}`}>
                            <div className={`${css.mbMain}`}><h2>CMYK</h2></div>
                            <div className={`${css.pixelInfo2}`} id={'CMYK'}></div>
                        </div>
                        <div className={`${css.sLetters}`}>
                            <div className={`${css.flex} ${css.letterGroupGap2}`}>
                                <div className={`${css.flex} ${css.letterGap} ${css.cmykWidthLetter}`}>
                                    <h3>(Cyan) Блакитний</h3>
                                    <div className={`${css.pixelInfo}`} id={'C'}></div>
                                </div>
                                <div className={`${css.flex} ${css.letterGap} ${css.cmykWidthLetter}`}>
                                    <h3>(Magenta) Пурпуровий</h3>
                                    <div className={`${css.pixelInfo}`} id={'M'}></div>
                                </div>
                            </div>
                            <div className={`${css.flex} ${css.letterGroupGap2}`}>
                                <div className={`${css.flex} ${css.letterGap} ${css.cmykWidthLetter}`}>
                                    <h3>(Yellow) Жовтий</h3>
                                    <div className={`${css.pixelInfo}`} id={'Y'}></div>
                                </div>
                                <div className={`${css.flex} ${css.letterGap} ${css.cmykWidthLetter}`}>
                                    <h3>(Key) Чорний</h3>
                                    <div className={`${css.pixelInfo}`} id={'K'}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={`${css.flex} ${css.colorLetters}`}>

                            <div className={`${css.mainLetters} ${css.flex}`}>
                                <div className={`${css.mbMain}`}><h2>HSL</h2></div>
                                <div className={`${css.pixelInfo2}`} id={'HSL'}></div>
                            </div>
                            <div className={`${css.flex} ${css.letterGroupGap}`}>

                                <div className={`${css.flex} ${css.letterGap} ${css.hslWidthLetter}`}>
                                    <h3>(Hue) Відтінок</h3>
                                    <div className={`${css.pixelInfo}`} id={'H'}></div>

                                    <div className={`${css.radioButtonContainer}`}>
                                        <div className={`${css.flex}`}>
                                            <div className={`${css.radioItem}`}>
                                                <input onChange={resetValues} id={'red'} type="radio" name={'saturationRadio'} value={'red'} defaultChecked={true}/>
                                                <label htmlFor='red'>red</label>
                                            </div>

                                            <div className={`${css.radioItem}`}>
                                                <input onChange={resetValues} id={'yellow'} type="radio" name={'saturationRadio'} value={'yellow'} />
                                                <label htmlFor='yellow'>yellow</label>
                                            </div>

                                            <div className={`${css.radioItem}`}>
                                                <input onChange={resetValues} id={'green'} type="radio" name={'saturationRadio'} value={'green'} />
                                                <label htmlFor='green'>green</label>
                                            </div>
                                        </div>
                                        <div className={`${css.flex}`}>
                                            <div className={`${css.radioItem}`}>
                                                <input onChange={resetValues} id={'cyan'} type="radio" name={'saturationRadio'} value={'cyan'} />
                                                <label htmlFor='cyan'>cyan</label>
                                            </div>

                                            <div className={`${css.radioItem}`}>
                                                <input onChange={resetValues} id={'blue'} type="radio" name={'saturationRadio'} value={'blue'} />
                                                <label htmlFor='blue'>blue</label>
                                            </div>

                                            <div className={`${css.radioItem}`}>
                                                <input onChange={resetValues} id={'magenta'} type="radio" name={'saturationRadio'} value={'magenta'} />
                                                <label htmlFor='magenta'>magenta</label>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className={`${css.flex} ${css.letterGap} ${css.hslWidthLetter}`}>
                                    <h3>(Saturation) Насиченість</h3>
                                    <div className={`${css.pixelInfo}`} id={'S'}></div>

                                    <div className={`${css.flex}`}>
                                        <input onChange={onSaturationChange} id={'saturation'} type="range" name='saturation' defaultValue={0}
                                               min={-100} max={100} step={1}/>
                                        <input className={`${css.pixelInfo}`} defaultValue={0} type="text" id={'saturationValue'} disabled/>
                                    </div>

                                </div>
                                <div className={`${css.flex} ${css.letterGap} ${css.hslWidthLetter}`}>
                                    <h3>(Lightness) Світлота</h3>
                                    <div className={`${css.pixelInfo}`} id={'L'}></div>

                                    <div>
                                        <input onChange={onLightnessChange} id={'lightness'} type="range" name='lightness' defaultValue={0}
                                               min={-100} max={100} step={1}/>
                                        <input className={`${css.pixelInfo}`} defaultValue={0} type="text" id={'lightnessValue'} disabled/>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <button className={`${css.button} ${css.positionRight}`} onClick={resetValues}>Скинути</button>
                    </div>
                </div>

                <div>
                    <div className={`${css.flex}`}>
                        <div className={css.overflow}>
                            <canvas id={'cmyk_canvas'} className={`${css.colorCanvas}`} width={imageWidth}
                                    height={imageHeight} onMouseMove={mouseMove} onMouseLeave={disappearPipe1}
                                    onClick={clickPipe}></canvas>

                            <div>
                                <a id={'cmyk_link'} download={'CMYK.png'}/>
                                <button onClick={download_img_cmyk} className={`${css.button} ${css.positionLeft}`}>Зберегти</button>
                            </div>
                        </div>


                        {!isImageSet && <img onClick={buttonClick} className={`${css.uploadButton}`} src={icons.upload}
                                             alt="upload"/>}
                        {isImageSet &&
                            <img onClick={buttonDeleteClick} className={`${css.deleteButton}`} src={icons.trash}
                                 alt="delete"/>}
                    </div>
                    <div className={`${css.flex}`}>
                        <div>
                            <canvas id={'hsl_canvas'} className={`${css.colorCanvas}`} width={imageWidth}
                                    height={imageHeight} onMouseMove={mouseMove} onMouseLeave={disappearPipe2}
                                    onClick={clickPipe}></canvas>

                            <div>
                                <a id={'hsl_link'} download={'HSL.png'}/>
                                <button onClick={download_img_hsl} className={`${css.button} ${css.positionLeft}`}>Зберегти</button>
                            </div>
                        </div>
                        {!isImageSet && <img onClick={buttonClick} className={`${css.uploadButton}`} src={icons.upload}
                                             alt="upload"/>}
                        {isImageSet &&
                            <img onClick={buttonDeleteClick} className={`${css.deleteButton}`} src={icons.trash}
                                 alt="delete"/>}
                    </div>

                    <div className={`${css.pipette}`} id={'pipette1'}>
                        <div className={`${css.pipette_text}`} id={'pipette1_text'}></div>
                        <div>
                            <div className={`${css.pipette_img_fill}`} id={'pipette1_img_fill'}></div>
                            <img src={icons.pipette_2} alt="pipette"/>
                        </div>
                    </div>


                    <div className={`${css.pipette}`} id={'pipette2'}>
                        <div className={`${css.pipette_text}`} id={'pipette2_text'}></div>
                        <div>
                            <div className={`${css.pipette_img_fill}`} id={'pipette2_img_fill'}></div>
                            <img src={icons.pipette_2} alt="pipette2"/>
                        </div>
                    </div>
                </div>

                <input onClick={(event) => {
                    event.target.value = null;
                }} onChange={ImageChange} id={'myInput'} name={'fileName'} type="file"/>
            </div>



        </div>
    );
};

export {ColorPracticePage};