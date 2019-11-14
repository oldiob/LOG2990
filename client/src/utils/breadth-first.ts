import { getPixelData } from './misc';
import { vectorPlus } from './math';

export class BreadthFirst {

    private allPixels: Pixel[];
    private firstPixel: Pixel;
    corners: number[][];

    constructor(position: number[], private image: ImageData, private tolerance: number) {
        this.allPixels = [];
        this.firstPixel = this.createFirstPixel(position);
        this.corners = this.createCorners(position);
    }

    private createCorners(position: number[]): number[][] {
        const corners: number[][] = [];

        this.fillPixels();

        return corners;
    }

    private fillPixels(): void {
        while (true) {
            let currentPixel = this.firstPixel;
            let layerToFill = 1;

            
        }
    }

    private createFirstPixel(position: number[]): Pixel {
        const firstPixel = this.createPixel(position);
        this.populatePixel(firstPixel);
        return firstPixel;
    }

    private createPixel(pos: number[]): Pixel {
        const pixel: Pixel = { position: pos, children: [] };
        this.allPixels.push(pixel);
        return pixel;
    }

    private populatePixel(pixel: Pixel): Pixel {
        for (let x = -1; x <= 1; x += 2) {
            for (let y = -1; y <= 1; y += 2) {
                const childPosition = vectorPlus(pixel.position, [x, y]);
                if (this.isPositionAcceptable(childPosition) && !this.isPositionCovered(childPosition)) {
                    pixel.children.push(this.createPixel(childPosition));
                }
            }
        }

        return pixel;
    }

    private isPositionAcceptable(position: number[]) {
        const positionColor = getPixelData(this.image, position[0], position[1]);
        const startingColor = getPixelData(this.image, this.firstPixel.position[0], this.firstPixel.position[1]);

        const positionSum = positionColor.red + positionColor.blue + positionColor.green + positionColor.alpha;
        const startingSum = startingColor.red + startingColor.blue + startingColor.green + startingColor.alpha;

        const delta = positionSum - startingSum;

        return startingSum * this.tolerance >= delta;
    }

    private isPositionCovered(position: number[]) {
        let doesExist = false;

        this.allPixels.forEach((pixel: Pixel) => {
            if (pixel.position === position) {
                doesExist = true;
                return;
            }
        });

        return doesExist;
    }
}

interface Pixel {
    position: number[];
    children: Pixel[];
}
