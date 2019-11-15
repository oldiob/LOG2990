import { getPixelData } from './misc';
import { vectorPlus } from './math';
import { Queue } from './queue';
import { Color } from './color';

export class BreadthFirst {

    positions: number[][];
    private firstPixel: Pixel;

    private covered: boolean[][];

    constructor(position: number[], private image: ImageData, private tolerance: number) {
        this.initEmptyCovered();

        this.positions = [];

        this.firstPixel = this.createPixel(position);

        this.fillPixels();
    }

    private initEmptyCovered(): void {
        this.covered = [];
        for (let x = 0; x < this.image.width; x++) {
            this.covered.push([]);
            for (let y = 0; y < this.image.height; y++) {
                this.covered[x].push(false);
            }
        }
    }

    private fillPixels(): void {

        const toFill: Queue<Pixel> = new Queue<Pixel>();

        toFill.push(this.firstPixel);

        while (true) {
            const pixelToFill: Pixel | null = toFill.next();

            if (pixelToFill === null) {
                return;
            }

            this.populatePixel(pixelToFill);

            pixelToFill.children.forEach((child: Pixel) => {
                toFill.push(child);
            });
        }
    }

    private createPixel(pos: number[]): Pixel {
        const pixel: Pixel = { position: pos, children: [] };
        this.positions.push(pos);
        this.covered[pos[0]][pos[1]] = true;
        return pixel;
    }

    private populatePixel(pixel: Pixel): void {
        const xyRange = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        xyRange.forEach((delta: number[]) => {
            const childPosition = vectorPlus(pixel.position, delta);
            if (this.isPositionAcceptable(childPosition)) {
                pixel.children.push(this.createPixel(childPosition));
            }
        });
    }

    private isPositionAcceptable(position: number[]) {
        return this.isRightColor(position) && this.isPositionInRange(position) && !this.isPositionCovered(position);
    }

    private isRightColor(position: number[]) {
        const positionColor: Color = getPixelData(this.image, position[0], position[1]);
        const startingColor: Color = getPixelData(this.image, this.firstPixel.position[0], this.firstPixel.position[1]);

        const positionSum = positionColor.red + positionColor.blue + positionColor.green + positionColor.alpha;
        const startingSum = startingColor.red + startingColor.blue + startingColor.green + startingColor.alpha;

        const delta = Math.abs(positionSum - startingSum);

        return startingSum * this.tolerance >= delta;
    }

    private isPositionInRange(position: number[]) {
        return  position[0] > 0 && position[0] < this.image.width &&
                position[1] > 0 && position[1] < this.image.height;
    }

    private isPositionCovered(position: number[]) {
        return this.covered[position[0]][position[1]];
    }
}

interface Pixel {
    position: number[];
    children: Pixel[];
}
