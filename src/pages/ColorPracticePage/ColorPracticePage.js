import {Title} from '../../components';
import {icons} from '../../constants';

import css from './ColorPractisePage.module.css';
import {useEffect} from "react";

const ConvertRGBtoHSL = (r, g, b) => {
    [r, g, b] = [r / 255, g / 255, b / 255];
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let [h, s, l] = [0, 0, 0];

    if (max === min) {
        h = 0;
    } else if (max === r && g >= b) {
        h = Math.round(60 * (g - b) / (max - min));
    } else if (max === r && g < b) {
        h = Math.round(60 * (g - b) / (max - min) + 360);
    } else if (max === g) {
        h = Math.round(60 * (b - r) / (max - min) + 120);
    } else {
        h = Math.round(60 * (r - g) / (max - min) + 240);
    }

    l = Math.round((max + min) * 0.5);

    if (l === 0 || max === min) {
        s = 0;
    } else if (l > 0 && l < 0.5) {
        s = (max - min) / (2 * l);
    } else {
        s = (max - min) / (2 - 2 * l);
    }

    return [h, s, l];
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
    } else {
        r = c;
        g = 0;
        b = x;
    }

    r = (r + m) * 255;
    g = (g + m) * 255;
    b = (b + m) * 255;

    return [r, g, b];
}

const ColorPracticePage = () => {
    // const [imageLink, setImageLink] = useEffect();


    const loadPhoto = () => {
        let canvas_rgb = document.getElementById('rgb_canvas');
        // let canvas_hsl = document.getElementById('hsl_canvas');
        // let canvas_cmyk = document.getElementById('cmyk_canvas');
        let context_rgb = canvas_rgb.getContext('2d');
        // let context_hsl = canvas_hsl.getContext('2d');
        // let context_cmyk = canvas_cmyk.getContext('2d');

        make_image();

        function make_image() {
            let base_image = new Image();

            // base_image.src = icons.img + "?not-from-cache-please";
            base_image.src = icons.img;
            // base_image.src = imageLink;
            // base_image.width = 20;
            base_image.onload = () => {
                context_rgb.drawImage(base_image, 0, 0, canvas_rgb.width, canvas_rgb.height);
            }
            base_image.setAttribute('crossOrigin', '');

            // context_hsl.drawImage(base_image, 0, 0, canvas_hsl.width, canvas_hsl.height);
            // context_cmyk.drawImage(base_image, 0, 0, canvas_cmyk.width, canvas_cmyk.height);
        }

        let imageData = context_rgb.getImageData(0, 0, canvas_rgb.width, canvas_rgb.height);

        // let data = imageData.data;
        // console.log(data);

        editPixels(imageData.data);
        drawEditedImage(imageData);

        function editPixels(imgData) {
            for (let i = 0; i < imgData.length; i += 3) {
                [imageData[i], imageData[i + 1], imageData[i + 2]] = ConvertRGBtoHSL(imgData[i], imgData[i + 1], imgData[i + 2]);
                [imageData[i], imageData[i + 1], imageData[i + 2]] = ConvertHSLtoRGB(imgData[i], imgData[i + 1], imgData[i + 2]);
            }
        }

        function drawEditedImage(newData) {
            let canvasEdited = document.getElementById("hsl_canvas");
            let ctxEdited = canvasEdited.getContext('2d');
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
                // generateCMYK();
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
                <button onClick={loadPhoto}>Вибрати фото</button>

                <input onChange={ImageChange} id={'myInput'} name={'fileName'} type="file"/>
            </div>
        </div>
    );
};

export {ColorPracticePage};