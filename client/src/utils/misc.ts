import { Color } from "./color";

export const getPixelData = (imageData: ImageData, x: number, y: number): Color => {
    const pixelIndex: number = Math.round((y * imageData.width + x) * 4);
    return new Color(
        imageData.data[pixelIndex + 0],
        imageData.data[pixelIndex + 1],
        imageData.data[pixelIndex + 2],
        imageData.data[pixelIndex + 3]);
};
