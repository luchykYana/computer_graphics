import {Title} from '../../components';
import {icons} from '../../constants';

import css from './ColorPractisePage.module.css';
import {useState} from "react";

function getCMYKFromRGB(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    let c = 1 - r, m = 1 - g, y = 1 - b, k;
    k = Math.min(c, m, y);
    if (k === 1) {
        c = 0;
        m = 0;
        y = 0;
    } else {
        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);
    }

    return [c, m, y, k];
}

function getRGBFromCMYK(c, m, y, k) {
    let r, g, b;
    if (k === 1) {
        r = 0;
        g = 0;
        b = 0;
    } else {
        r = (1 - k - c * (1 - k)) * 255;
        g = (1 - k - m * (1 - k)) * 255;
        b = (1 - k - y * (1 - k)) * 255;
    }

    return [r, g, b];
}

const ConvertRGBtoHSL = (r, g, b) => {
    [r, g, b] = [r / 255, g / 255, b / 255];
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l;

    if (max === min) {
        h = 0;
    } else if (max === r && g >= b) {
        h = 60 * (g - b) / (max - min);
    } else if (max === r && g < b) {
        h = 60 * (g - b) / (max - min) + 360;
    } else if (max === g) {
        h = 60 * (b - r) / (max - min) + 120;
    } else if (max === b) {
        h = 60 * ((r - g) / (max - min)) + 240;
    }

    l = (max + min) / 2;

    if (l === 0 || max === min) {
        s = 0;
    } else if (l > 0 && l < 0.5) {
        s = (max - min) / (2 * l);
    } else if (l >= 0.5 && l !== 1) {
        s = (max - min) / (2 - (max + min));
    }

    return [Math.round(h), s, l];
}

const ConvertHSLtoRGB = (h, s, l) => {
    let [r, g, b] = [0, 0, 0];

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;

    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (h >= 300 && h <= 360) {
        r = c;
        g = 0;
        b = x;
    }

    r = (r + m) * 255;
    g = (g + m) * 255;
    b = (b + m) * 255;

    return [Math.round(r), Math.round(g), Math.round(b)];
}

const ColorPracticePage = () => {
    const imageHeight = 200;
    const imageWidth = 400;

    const [isImageSet, setIsImageSet] = useState(false);


    const loadPhotos = () => {
        setIsImageSet(true);
        let canvas_cmyk = document.getElementById('cmyk_canvas');
        let context_cmyk = canvas_cmyk.getContext('2d')

        let imageData1 = context_cmyk.getImageData(0, 0, canvas_cmyk.width, canvas_cmyk.height);
        let imageData2 = imageData1;

        editPixelsHSL(imageData1.data);
        drawEditedImage(imageData1, 'hsl_canvas');

        // imageData = context_cmyk.getImageData(0, 0, canvas_cmyk.width, canvas_cmyk.height);

        editPixelsCMYK(imageData2.data);
        drawEditedImage(imageData2, 'cmyk_canvas');

        function editPixelsHSL(imgData) {
            let mas1 = [0, 0, 0];
            let mas2 = [0, 0, 0];
            for (let i = 0; i < imgData.length; i += 4) {
                mas1 = ConvertRGBtoHSL(imgData[i], imgData[i + 1], imgData[i + 2]);
                mas2 = ConvertHSLtoRGB(mas1[0], mas1[1], mas1[2]);
                imageData1.data[i] = mas2[0];
                imageData1.data[i + 1] = mas2[1];
                imageData1.data[i + 2] = mas2[2];
            }
        }

        function editPixelsCMYK(imgData) {
            let mas1 = [0, 0, 0, 0];
            let mas2 = [0, 0, 0];
            for (let i = 0; i < imgData.length; i += 4) {
                mas1 = getCMYKFromRGB(imgData[i], imgData[i + 1], imgData[i + 2]);
                mas2 = getRGBFromCMYK(mas1[0], mas1[1], mas1[2], mas1[3]);
                imageData2.data[i] = mas2[0];
                imageData2.data[i + 1] = mas2[1];
                imageData2.data[i + 2] = mas2[2];
            }
        }

        function drawEditedImage(newData, canvasID) {
            let canvasEdited = document.getElementById(canvasID);
            let ctxEdited = canvasEdited.getContext('2d');
            canvasEdited.width = imageWidth;
            canvasEdited.height = imageHeight;
            ctxEdited.putImageData(newData, 0, 0);
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
        // let rgbCanvas = document.getElementById("rgb_canvas");
        let cmykCanvas = document.getElementById("cmyk_canvas");
        let hslCanvas = document.getElementById("hsl_canvas");

        // let rgbCtx = rgbCanvas.getContext('2d');
        let cmykCtx = cmykCanvas.getContext('2d');
        let hslCtx = hslCanvas.getContext('2d');

        // rgbCtx.clearRect(0, 0, imageWidth, imageHeight);
        cmykCtx.clearRect(0, 0, imageWidth, imageHeight);
        hslCtx.clearRect(0, 0, imageWidth, imageHeight);
    }

    const onSaturationChange = (event) => {
        document.getElementById('saturationValue').value = event.target.value;
        const value = event.target.value;
        console.log(value)
        let minRange, maxRange;

        if(document.getElementById('red').checked === true) {
            minRange = 300; maxRange= 60;
        } else if (document.getElementById('green').checked === true) {
            minRange = 60; maxRange= 180;
        } else if (document.getElementById('blue').checked === true) {
            minRange = 180; maxRange= 300;
        }

        let canvas_cmyk = document.getElementById('cmyk_canvas');
        let context_cmyk = canvas_cmyk.getContext('2d')

        let imageData = context_cmyk.getImageData(0, 0, canvas_cmyk.width, canvas_cmyk.height);

        editPixelsHSL(imageData.data);
        drawEditedImage(imageData, 'hsl_canvas');


        function editPixelsHSL(imgData) {
            let mas1 = [0, 0, 0];
            let mas2 = [0, 0, 0];
            for (let i = 0; i < imgData.length; i += 4) {
                // get hsl values
                mas1 = ConvertRGBtoHSL(imgData[i], imgData[i + 1], imgData[i + 2]);
                const h = mas1[0];
                if(h >= minRange && h <= maxRange) {
                    // console.log(`${mas1[0]} ${mas1[1]} ${mas1[2]}`)
                    let s = mas1[1];
                    // console.log(s)
                    s += (value / 100);
                    if(s > 1) s = 1;
                    if(s < 0 ) s = 0;

                    // console.log(s)

                    mas2 = ConvertHSLtoRGB(mas1[0], s, mas1[2]);
                    imageData.data[i] = mas2[0];
                    imageData.data[i + 1] = mas2[1];
                    imageData.data[i + 2] = mas2[2];

                    // console.log(`${mas2[0]} ${mas2[1]} ${mas2[2]}`)

                    // break;
                }
            }
        }

        function drawEditedImage(newData, canvasID) {
            let canvasEdited = document.getElementById(canvasID);
            let ctxEdited = canvasEdited.getContext('2d');
            canvasEdited.width = imageWidth;
            canvasEdited.height = imageHeight;
            ctxEdited.putImageData(newData, 0, 0);
        }


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
            <input id={'green'} type="radio" name={'saturationRadio'} value={'green'} />
            <label htmlFor='green'>green</label>
            <input id={'blue'} type="radio" name={'saturationRadio'} value={'blue'} />
            <label htmlFor='blue'>blue</label>


            <input onChange={onSaturationChange} id={'saturation'} type="range" name='saturation' defaultValue={0} min={-100} max={100}/>
            <input  defaultValue={0} type="text" id={'saturationValue'}/>

        </div>
    );
};

export {ColorPracticePage};