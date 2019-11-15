import { getPixelData } from './misc';
import { vectorPlus } from './math';
import { Queue } from './queue';

export class BreadthFirst {

    private allPixels: Pixel[];
    private firstPixel: Pixel;
    corners: number[][];

    constructor(position: number[], private image: ImageData, private tolerance: number) {
        this.allPixels = [];
        this.firstPixel = this.createPixel(position);

        this.fillPixels();
    }

    private fillPixels(): void {

        const toFill: Queue<Pixel> = new Queue<Pixel>();
        toFill.push(this.firstPixel);

        console.log('First', toFill);
        while (true) {
            const pixelToFill: Pixel | null = toFill.next();
            console.log('After Next', toFill);

            if (pixelToFill === null) {
                break;
            }

            console.log('Unpopulated', pixelToFill);
            this.populatePixel(pixelToFill);
            console.log('Populated', pixelToFill);

            pixelToFill.children.forEach((child: Pixel) => {
                toFill.push(child);
            });

            console.log('After Fill', toFill);
        }
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
