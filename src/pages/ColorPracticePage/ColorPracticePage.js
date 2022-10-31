import {Title} from '../../components';
import {icons} from '../../constants';

import css from './ColorPractisePage.module.css';

function getCMYKFromRGB(r, g, b){
    r = r / 255;
    g = g / 255;
    b = b / 255;
    let  c = 1 - r, m = 1 - g, y = 1 - b, k;
    k = Math.min(c, m, y);
    if (k === 1) {
        c =	0;
        m =	0;
        y =	0;
    }
    else {
        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);
    }

    return [c, m, y, k ];
}

function getRGBFromCMYK(c,m, y, k){
    let	r, g, b;
    if(k === 1) {
        r =	0;
        g =	0;
        b =	0;
    }
    else {
        r =	(1 - k - c * (1 - k) ) * 255;
        g =	(1 - k - m * (1 - k) ) * 255;
        b =	(1 - k - y * (1 - k) ) * 255;
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
    const loadPhotos = () => {
        let canvas_rgb = document.getElementById('rgb_canvas');
        let context_rgb = canvas_rgb.getContext('2d')

        let imageData = context_rgb.getImageData(0, 0, canvas_rgb.width, canvas_rgb.height);

        editPixelsHSL(imageData.data);
        drawEditedImage(imageData, 'hsl_canvas');

        imageData = context_rgb.getImageData(0, 0, canvas_rgb.width, canvas_rgb.height);

        editPixelsCMYK(imageData.data);
        drawEditedImage(imageData, 'cmyk_canvas');

        function editPixelsHSL(imgData) {
            let mas1 = [0, 0, 0];
            let mas2 = [0, 0, 0];
            for (let i = 0; i < imgData.length; i += 4) {
                mas1 = ConvertRGBtoHSL(imgData[i], imgData[i + 1], imgData[i + 2]);
                mas2 = ConvertHSLtoRGB(mas1[0], mas1[1], mas1[2]);
                imageData.data[i] = mas2[0];
                imageData.data[i + 1] = mas2[1];
                imageData.data[i + 2] = mas2[2];
            }
        }

        function editPixelsCMYK(imgData) {
            let mas1 = [0, 0, 0, 0];
            let mas2 = [0, 0, 0];
            for (let i = 0; i < imgData.length; i += 4) {
                mas1 = getCMYKFromRGB(imgData[i], imgData[i + 1], imgData[i + 2]);
                mas2 = getRGBFromCMYK(mas1[0], mas1[1], mas1[2], mas1[3]);
                imageData.data[i] = mas2[0];
                imageData.data[i + 1] = mas2[1];
                imageData.data[i + 2] = mas2[2];
            }
        }

        function drawEditedImage(newData, canvasID) {
            let canvasEdited = document.getElementById(canvasID);
            let ctxEdited = canvasEdited.getContext('2d');
            canvasEdited.width = 300;
            canvasEdited.height = 180;
            ctxEdited.putImageData(newData, 0, 0);
        }
    }

    const ImageChange = (e) => {
        let rgbCanvas = document.getElementById("rgb_canvas");
        let rgbCtx = rgbCanvas.getContext('2d');
        rgbCanvas.width = 300;
        rgbCanvas.height = 180;
        let reader = new FileReader();
        reader.onload = function (event) {
            let image = new Image();
            image.onload = function () {
                rgbCtx.drawImage(image, 0, 0, rgbCanvas.width, rgbCanvas.height);
                loadPhotos();
            }
            image.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    return (
        <div className={`${css.content}`}>
            <Title icon_name={icons.pencil} caption={'Перетворення моделей'}/>

            <div>
                <canvas id={'rgb_canvas'} className={`${css.colorCanvas}`} width="300" height="180"></canvas>
                <canvas id={'cmyk_canvas'} className={`${css.colorCanvas}`} width="300" height="180"></canvas>
                <canvas id={'hsl_canvas'} className={`${css.colorCanvas}`} width="300" height="180"></canvas>

                <input onChange={ImageChange} id={'myInput'} name={'fileName'} type="file"/>
            </div>
        </div>
    );
};

export {ColorPracticePage};