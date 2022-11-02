import {useEffect, useState} from 'react';

import {Pipette, Title} from '../../components';
import {icons} from '../../constants';
import {modelFunc} from '../../helper';

import css from './ColorPractisePage.module.css';

const ColorPracticePage = () => {
    const imageHeight = 220, imageWidth = 400;

    const [isImageSet, setIsImageSet] = useState(false);
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    const [mousePos1, setMousePos1] = useState({x1: 0, y1: 0});
    const [mousePos2, setMousePos2] = useState({x2: 0, y2: 0});
    const [mousePosMain, setMousePosMain] = useState(false);
    const [mousePosData, setMousePosData] = useState();
    const [isAreaChosen, setIsAreaChosen] = useState(false);



    useEffect(()=>{
        let x, y;
        if(mousePos1.x1 < mousePos2.x2 && mousePos1.y1 < mousePos2.y2) {
            x = mousePos1.x1;
            y = mousePos1.y1;
        } else if(mousePos1.x1 < mousePos2.x2 && mousePos1.y1 > mousePos2.y2) {
            x = mousePos1.x1;
            y = mousePos2.y2;
        } else if(mousePos1.x1 > mousePos2.x2 && mousePos1.y1 < mousePos2.y2) {
            x = mousePos2.x2;
            y = mousePos1.y1;
        } else if(mousePos1.x1 > mousePos2.x2 && mousePos1.y1 > mousePos2.y2) {
            x = mousePos2.x2;
            y = mousePos2.y2
        } else if(mousePos1.x1 === mousePos2.x2 && mousePos1.y1 === mousePos2.y2){
            x = 0;
            y = 0;
        }

        console.log(`position x: ${x}\ty:${y} `)

        let width = Math.abs(mousePos1.x1 - mousePos2.x2);
        let height = Math.abs(mousePos1.y1 - mousePos2.y2);

        console.log(`w: ${width}\t h: ${height}`)

        if(width > 10 || height > 10) {
            setIsAreaChosen(true);
        } else setIsAreaChosen(false);

    }, [mousePos2]);

    useEffect(()=>{

        let x, y;
        if(mousePos1.x1 < mousePos2.x2 && mousePos1.y1 < mousePos2.y2) {
            x = mousePos1.x1;
            y = mousePos1.y1;
        } else if(mousePos1.x1 < mousePos2.x2 && mousePos1.y1 > mousePos2.y2) {
            x = mousePos1.x1;
            y = mousePos2.y2;
        } else if(mousePos1.x1 > mousePos2.x2 && mousePos1.y1 < mousePos2.y2) {
            x = mousePos2.x2;
            y = mousePos1.y1;
        } else if(mousePos1.x1 > mousePos2.x2 && mousePos1.y1 > mousePos2.y2) {
            x = mousePos2.x2;
            y = mousePos2.y2
        } else console.log('exception')

        let width = Math.abs(mousePos1.x1 - mousePos2.x2);
        let height = Math.abs(mousePos1.y1 - mousePos2.y2);

        if(isAreaChosen) {
            // let hsl_canvas = document.getElementById('hsl_canvas');
            // let hsl_context = hsl_canvas.getContext('2d');
            //
            // hsl_context.clearRect(0, 0, hsl_canvas.width, hsl_canvas.height);
            //
            // let imageDataRGB = getImageDataFromCanvas('rgb_canvas');
            // drawEditedImage(imageDataRGB, 'hsl_canvas')

            let hsl_canvas = document.getElementById('hsl_canvas');
            let hsl_context = hsl_canvas.getContext('2d');

            hsl_context.beginPath();
            hsl_context.rect(x, y, width, height);
            hsl_context.strokeStyle = `rgb(255, 255, 255)`;
            hsl_context.stroke();

            setIsAreaChosen(false);
        }
    }, [isAreaChosen]);

    function drawEditedImage(newData, canvasID) {
        const canvasEdited = document.getElementById(canvasID);
        const ctxEdited = canvasEdited.getContext('2d');
        canvasEdited.width = imageWidth;
        canvasEdited.height = imageHeight;
        ctxEdited.putImageData(newData, 0, 0);
    }

    const getImageDataFromCanvas = (canvasName) => {
        const canvas = document.getElementById(canvasName);
        const context = canvas.getContext('2d')

        return context.getImageData(0, 0, canvas.width, canvas.height);
    }

    const dispatchMyEvent = (value, elementID) => {
        let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(document.getElementById(elementID), value);
        let ev1 = new Event('input', {bubbles: true});
        document.getElementById(elementID).dispatchEvent(ev1);
    }

    const loadPhotos = () => {
        setIsImageSet(true);

        const imageData1 = getImageDataFromCanvas('rgb_canvas');
        const imageData2 = getImageDataFromCanvas('rgb_canvas');

        editPixelsHSL(imageData1.data);
        drawEditedImage(imageData1, 'hsl_canvas');

        editPixelsCMYK(imageData2.data);
        drawEditedImage(imageData2, 'cmyk_canvas');

        function editPixelsHSL(imgData, mas1 = [0, 0, 0], mas2 = [0, 0, 0]) {
            for (let i = 0; i < imgData.length; i += 4) {
                mas1 = modelFunc.RGBtoHSL(imgData[i], imgData[i + 1], imgData[i + 2]);
                mas2 = modelFunc.HSLtoRGB(mas1[0], mas1[1], mas1[2]);
                imageData1.data[i] = mas2[0];
                imageData1.data[i + 1] = mas2[1];
                imageData1.data[i + 2] = mas2[2];
            }
        }

        function editPixelsCMYK(imgData, mas1 = [0, 0, 0, 0], mas2 = [0, 0, 0]) {
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
        let rgbCanvas = document.getElementById("rgb_canvas");
        let rgbCtx = rgbCanvas.getContext('2d');

        let reader = new FileReader();
        reader.onload = function (event) {
            let image = new Image();
            image.onload = function () {
                rgbCtx.drawImage(image, 0, 0, rgbCanvas.width, rgbCanvas.height);
                loadPhotos();
            }
            image.src = event.target.result + '';
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    const buttonClick = () => {
        document.getElementById('myInput').click();
    }

    const buttonDeleteClick = () => {
        setIsImageSet(false);

        let rgbCanvas = document.getElementById("rgb_canvas");
        let cmykCanvas = document.getElementById("cmyk_canvas");
        let hslCanvas = document.getElementById("hsl_canvas");

        let rgbCtx = rgbCanvas.getContext('2d');
        let cmykCtx = cmykCanvas.getContext('2d');
        let hslCtx = hslCanvas.getContext('2d');

        rgbCtx.clearRect(0, 0, imageWidth, imageHeight);
        cmykCtx.clearRect(0, 0, imageWidth, imageHeight);
        hslCtx.clearRect(0, 0, imageWidth, imageHeight);

        resetValues();
    }

    const getRangeOfValues = () => {
        let res = [];

        if (document.getElementById('red').checked === true) {
            res.push({min: 330, max: 30});
        }
        if (document.getElementById('yellow').checked === true) {
            res.push({min: 30, max: 90});
        }
        if (document.getElementById('green').checked === true) {
            res.push({min: 90, max: 150});
        }
        if (document.getElementById('cyan').checked === true) {
            res.push({min: 150, max: 210});
        }
        if (document.getElementById('blue').checked === true) {
            res.push({min: 210, max: 270});
        }
        if (document.getElementById('magenta').checked === true) {
            res.push({min: 270, max: 330});
        }

        return res;
    }

    const onSaturationChange = (event) => {
        document.getElementById('saturationValue').value = event.target.value;
        const value = event.target.value;

        let ranges = getRangeOfValues();
        let imageData = getImageDataFromCanvas('rgb_canvas');

        if (mousePosMain === true) {
            editPixelsChangeSaturation(mousePosData.data);
            //щсь тут треба далі у функції правити, якщо в нас є фрагмент, у верху є useState з даними
        } else {
            editPixelsChangeSaturation(imageData.data);
        }

        drawEditedImage(imageData, 'hsl_canvas');

        function editPixelsChangeSaturation(imgData) {
            let mas1 = [0, 0, 0];
            let mas2 = [0, 0, 0];
            for (let i = 0; i < imgData.length; i += 4) {
                mas1 = modelFunc.RGBtoHSL(imgData[i], imgData[i + 1], imgData[i + 2]);
                const h = mas1[0];

                let isPixelNeeded = false;

                for (let j = 0; j < ranges.length; j++) {
                    if (ranges[j].min < ranges[j].max) {
                        isPixelNeeded = isPixelNeeded || (h >= ranges[j].min && h <= ranges[j].max);
                    } else {
                        isPixelNeeded = isPixelNeeded || (h >= ranges[j].min || h <= ranges[j].max);
                    }
                }

                if (isPixelNeeded) {
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

        let ranges = getRangeOfValues();
        let imageData = getImageDataFromCanvas('rgb_canvas');

        editPixelsChangeLightness(imageData.data);
        drawEditedImage(imageData, 'hsl_canvas');

        function editPixelsChangeLightness(imgData) {
            let mas1 = [0, 0, 0];
            let mas2 = [0, 0, 0];
            for (let i = 0; i < imgData.length; i += 4) {
                mas1 = modelFunc.RGBtoHSL(imgData[i], imgData[i + 1], imgData[i + 2]);
                const h = mas1[0];

                let isPixelNeeded = false;

                for (let j = 0; j < ranges.length; j++) {
                    if (ranges[j].min < ranges[j].max) {
                        isPixelNeeded = isPixelNeeded || (h >= ranges[j].min && h <= ranges[j].max);
                    } else {
                        isPixelNeeded = isPixelNeeded || (h >= ranges[j].min || h <= ranges[j].max);
                    }
                }

                if (isPixelNeeded) {
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

    const resetValues = () => {
        dispatchMyEvent(0, 'lightness');
        dispatchMyEvent(0, 'saturation');

        dispatchMyEvent(0, 'C');
        dispatchMyEvent(0, 'M');
        dispatchMyEvent(0, 'Y');
        dispatchMyEvent(0, 'K');

        dispatchMyEvent(0, 'H');
        dispatchMyEvent(0, 'S');
        dispatchMyEvent(100, 'L');
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

    const changePipe1 = (cmyk, rgb, {x, y}) => {
        const pipette = document.getElementById('pipette1');
        const pipette_text = document.getElementById('pipette1_text');
        const pipette_img = document.getElementById('pipette1_img_fill');
        pipette.style.top = `${mousePos.y - 90}px`;
        pipette.style.left = `${mousePos.x + 5}px`;
        pipette.style.display = 'block';
        pipette_text.innerText = `CMYK ( ${(cmyk[0] * 100).toFixed(0)}; ${(cmyk[1] * 100).toFixed(0)}; ${(cmyk[2] * 100).toFixed(0)}; ${(cmyk[3] * 100).toFixed(0)})\n(X: ${x}; Y: ${y})`;
        pipette_img.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    }
    const changePipe2 = (hsl, rgb, {x, y}) => {
        const pipette = document.getElementById('pipette2');
        const pipette_text = document.getElementById('pipette2_text');
        const pipette_img = document.getElementById('pipette2_img_fill');
        pipette.style.top = `${mousePos.y - 90}px`;
        pipette.style.left = `${mousePos.x + 5}px`;
        pipette.style.display = 'block';
        pipette_text.innerText = `HSL ( ${(hsl[0])}; ${(hsl[1] * 100).toFixed(0)}; ${(hsl[2] * 100).toFixed(0)}\n(X: ${x}; Y: ${y}))`;
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
                changePipe1(cmyk, rgb, {x, y});
            }
            if (e.target.id === 'hsl_canvas') {
                changePipe2(hsl, rgb, {x, y});
            }
        }

        return {cmyk, hsl, rgb};
    }

    const disappearPipe1 = () => document.getElementById('pipette1').style.display = 'none';
    const disappearPipe2 = () => document.getElementById('pipette2').style.display = 'none';

    const changeParams1 = (cmyk) => {
        dispatchMyEvent(Math.round(cmyk[0] * 100), 'C');
        dispatchMyEvent(Math.round(cmyk[1] * 100), 'M');
        dispatchMyEvent(Math.round(cmyk[2] * 100), 'Y');
        dispatchMyEvent(Math.round(cmyk[3] * 100), 'K');
    }

    const changeParams2 = (hsl) => {
        dispatchMyEvent(Math.round(hsl[0]), 'H');
        dispatchMyEvent(Math.round(hsl[1] * 100), 'S');
        dispatchMyEvent(Math.round(hsl[2] * 100), 'L');
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

    const cmyk_color_change = () => {
        let c = document.getElementById('C').value;
        let m = document.getElementById('M').value;
        let y = document.getElementById('Y').value;
        let k = document.getElementById('K').value;

        let [r, g, b] = modelFunc.CMYKtoRGB(c / 100, m / 100, y / 100, k / 100);
        document.getElementById('CMYK').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    const hsl_color_change = () => {
        let h = document.getElementById('H').value;
        let s = document.getElementById('S').value;
        let l = document.getElementById('L').value;

        let [r, g, b] = modelFunc.HSLtoRGB(h, s / 100, l / 100);
        document.getElementById('HSL').style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    const down = (e) => {
        const object = getMousePosition(e.target, e);
        setMousePos1({x1: object.x, y1: object.y});
        console.log(object);
        // console.log('down: ' + mousePos1.x1 + '|'  + mousePos1.y1)
    }

    const up = (e) => {
        const object = getMousePosition(e.target, e);
        console.log(object);
        setMousePos2({x2: object.x, y2: object.y})

        let hsl_canvas = document.getElementById('hsl_canvas');
        let hsl_context = hsl_canvas.getContext('2d');

        hsl_context.clearRect(0, 0, hsl_canvas.width, hsl_canvas.height);

        let imageDataRGB = getImageDataFromCanvas('rgb_canvas');
        drawEditedImage(imageDataRGB, 'hsl_canvas')

        // console.log('up: ' + mousePos2.x2 + '|'  + mousePos2.y2)



        // count();
        //
        // function count() {
        //
        //
        //     const context = e.target.getContext('2d')
        //
        //
        //
        //     let data = context.getImageData(x, y,width, height);
        //     setMousePosData(data);
        //
        //     if(width > 10 || height > 10) {
        //         setMousePosMain(true);
        //     } else {
        //         setMousePosMain(false);
        //     }
        //     console.log(data);
        // }
    }

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
                                    <input defaultValue={0} onChange={cmyk_color_change} type={'number'}
                                           className={`${css.pixelInfo}`} id={'C'} min={0} max={100} step={1}></input>
                                </div>
                                <div className={`${css.flex} ${css.letterGap} ${css.cmykWidthLetter}`}>
                                    <h3>(Magenta) Пурпуровий</h3>
                                    <input defaultValue={0} onChange={cmyk_color_change} type={'number'}
                                           className={`${css.pixelInfo}`} id={'M'} min={0} max={100} step={1}></input>
                                </div>
                            </div>
                            <div className={`${css.flex} ${css.letterGroupGap2}`}>
                                <div className={`${css.flex} ${css.letterGap} ${css.cmykWidthLetter}`}>
                                    <h3>(Yellow) Жовтий</h3>
                                    <input defaultValue={0} onChange={cmyk_color_change} type={'number'}
                                           className={`${css.pixelInfo}`} id={'Y'} min={0} max={100} step={1}></input>
                                </div>
                                <div className={`${css.flex} ${css.letterGap} ${css.cmykWidthLetter}`}>
                                    <h3>(Key) Чорний</h3>
                                    <input defaultValue={0} onChange={cmyk_color_change} type={'number'}
                                           className={`${css.pixelInfo}`} id={'K'} min={0} max={100} step={1}></input>
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
                                    <input defaultValue={0} onChange={hsl_color_change} type={'number'}
                                           className={`${css.pixelInfo}`} id={'H'} min={0} max={360} step={1}></input>
                                </div>
                                <div className={`${css.flex} ${css.letterGap} ${css.hslWidthLetter}`}>
                                    <h3>(Saturation) Насиченість</h3>
                                    <input defaultValue={0} onChange={hsl_color_change} type={'number'}
                                           className={`${css.pixelInfo}`} id={'S'} min={0} max={100} step={1}></input>
                                </div>
                                <div className={`${css.flex} ${css.letterGap} ${css.hslWidthLetter}`}>
                                    <h3>(Lightness) Світлота</h3>
                                    <input defaultValue={100} onChange={hsl_color_change} type={'number'}
                                           className={`${css.pixelInfo}`} id={'L'} min={0} max={100} step={1}></input>
                                </div>

                            </div>

                            <div className={css.inputContainer}>
                                <div className={`${css.radioButtonContainer}`}>
                                    <div className={`${css.flex}`}>
                                        <div className={`${css.radioItem} ${css.red}`}>
                                            <label htmlFor='red'>
                                                <input onChange={resetValues} id={'red'} type="checkbox"
                                                       name={'saturationRadio'} value={'red'}/>
                                                <div>red</div>
                                            </label>
                                        </div>

                                        <div className={`${css.radioItem} ${css.yellow}`}>
                                            <label htmlFor='yellow'>
                                                <input onChange={resetValues} id={'yellow'} type="checkbox"
                                                       name={'saturationRadio'} value={'yellow'} defaultChecked={true}/>
                                                <div>yellow</div>
                                            </label>
                                        </div>

                                        <div className={`${css.radioItem} ${css.green}`}>
                                            <label htmlFor='green'>
                                                <input onChange={resetValues} id={'green'} type="checkbox"
                                                       name={'saturationRadio'} value={'green'}/>
                                                <div>green</div>
                                            </label>
                                        </div>
                                    </div>
                                    <div className={`${css.flex}`}>
                                        <div className={`${css.radioItem} ${css.cyan}`}>
                                            <label htmlFor='cyan'>
                                                <input onChange={resetValues} id={'cyan'} type="checkbox"
                                                       name={'saturationRadio'} value={'cyan'}/>
                                                <div>cyan</div>
                                            </label>
                                        </div>

                                        <div className={`${css.radioItem} ${css.blue}`}>
                                            <label htmlFor='blue'>
                                                <input onChange={resetValues} id={'blue'} type="checkbox"
                                                       name={'saturationRadio'} value={'blue'}/>
                                                <div>blue</div>
                                            </label>
                                        </div>

                                        <div className={`${css.radioItem} ${css.magenta}`}>
                                            <label htmlFor='magenta'>
                                                <input onChange={resetValues} id={'magenta'} type="checkbox"
                                                       name={'saturationRadio'} value={'magenta'}/>
                                                <div>magenta</div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${css.flex} ${css.radioButtonContainer}`}>
                                    <input onChange={onSaturationChange} id={'saturation'} type="range"
                                           name='saturation' defaultValue={0}
                                           min={-100} max={100} step={1}/>
                                    <input className={`${css.pixelInfo}`} defaultValue={0} type="text"
                                           id={'saturationValue'} disabled/>
                                </div>

                                <div className={`${css.flex} ${css.radioButtonContainer}`}>
                                    <input onChange={onLightnessChange} id={'lightness'} type="range"
                                           name='lightness' defaultValue={0}
                                           min={-100} max={100} step={1}/>
                                    <input className={`${css.pixelInfo}`} defaultValue={0} type="text"
                                           id={'lightnessValue'} disabled/>
                                </div>
                            </div>

                        </div>
                        <button className={`${css.button} ${css.positionRight}`} onClick={resetValues}>Скинути</button>
                    </div>
                </div>

                <div>
                    <div className={`${css.flex}`}>
                        <div>
                            <canvas id={'cmyk_canvas'} className={`${css.colorCanvas}`} width={imageWidth}
                                    height={imageHeight} onMouseMove={mouseMove} onMouseLeave={disappearPipe1}
                                    onClick={clickPipe}></canvas>

                            <div>
                                <a id={'cmyk_link'} download={'CMYK.png'}/>
                                <button onClick={download_img_cmyk}
                                        className={`${css.button} ${css.positionLeft}`}>Зберегти
                                </button>
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
                                    onClick={clickPipe} onMouseDown={down} onMouseUp={up}></canvas>

                            <div>
                                <a id={'hsl_link'} download={'HSL.png'}/>
                                <button onClick={download_img_hsl}
                                        className={`${css.button} ${css.positionLeft}`}>Зберегти
                                </button>
                            </div>
                        </div>
                        {!isImageSet && <img onClick={buttonClick} className={`${css.uploadButton}`} src={icons.upload}
                                             alt="upload"/>}
                        {isImageSet &&
                            <img onClick={buttonDeleteClick} className={`${css.deleteButton}`} src={icons.trash}
                                 alt="delete"/>}
                    </div>

                    <div>
                        <canvas id={'rgb_canvas'} className={`${css.rgb_canvas}`} width={imageWidth}
                                height={imageHeight}></canvas>
                    </div>

                    <Pipette n={1}/>
                    <Pipette n={2}/>
                </div>

                <input onClick={(event) => {
                    event.target.value = null;
                }} onChange={ImageChange} id={'myInput'} name={'fileName'} type="file"/>
            </div>

        </div>
    );
};

export {ColorPracticePage};