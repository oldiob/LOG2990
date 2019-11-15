import { Color } from "./color";

export const getPixelData = (imageData: ImageData, x: number, y: number): Color => {
    const pixelIndex: number = Math.round((y * imageData.width + x) * 4);
    return new Color(
        imageData.data[pixelIndex + 0],
        imageData.data[pixelIndex + 1],
        imageData.data[pixelIndex + 2],
        imageData.data[pixelIndex + 3]);
};

const setPixelData = (imageData: ImageData, color: Color, x: number, y: number): void => {
    const pixelIndex: number = Math.round((y * imageData.width + x) * 4);
    imageData.data[pixelIndex + 0] = color.red;
    imageData.data[pixelIndex + 1] = color.green;
    imageData.data[pixelIndex + 2] = color.blue;
    imageData.data[pixelIndex + 3] = color.alpha;
};

export const getImageData = (positions: number[][], color: Color): ImageData => {
    const xRange = [Infinity, -Infinity];
    const yRange = [Infinity, -Infinity];

    positions.forEach((pos: number[]) => {
        if (pos[0] < xRange[0]) {
            xRange[0] = pos[0];
        }
        if (pos[0] > xRange[1]) {
            xRange[1] = pos[0];
        }
        if (pos[1] < yRange[0]) {
            yRange[0] = pos[1];
        }
        if (pos[1] > yRange[1]) {
            yRange[1] = pos[1];
        }
    });

    const image: ImageData = new ImageData(xRange[1] - xRange[0], yRange[1] - yRange[0]);

    setPixelData(image, color, 0, 0);

    positions.forEach((pos: number[]) => {
        setPixelData(image, color, pos[0] - xRange[0], pos[1] - yRange[0]);
    });

    return image;
};
