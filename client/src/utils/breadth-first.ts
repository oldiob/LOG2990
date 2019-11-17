import { Color } from './color';
import { vectorPlus, vectorMultiply } from './math';
import { getPixelData, getXYRange, getAverageColor } from './image-manipulations';
import { Queue } from './queue';

export class BreadthFirst {

    positions: number[][];
    private firstPixel: Pixel;

    private covered: boolean[][];

    constructor(position: number[], private image: ImageData, private tolerance: number, private approximationSize: number) {
        this.initEmptyCovered();

        this.positions = [];

        position[0] = Math.round(position[0]);
        position[1] = Math.round(position[1]);

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
        this.addToPositions(pos);
        return pixel;
    }

    private addToPositions(position: number[]) {
        const xyRange = getXYRange(this.approximationSize);

        xyRange.forEach((delta: number[]) => {
            const realPosition = vectorPlus(position, delta);
            realPosition[0] = Math.round(realPosition[0]);
            realPosition[1] = Math.round(realPosition[1]);
            this.setPixelCovered(realPosition);
            this.positions.push(realPosition);
        });
    }

    private setPixelCovered(position: number[]) {
        this.covered[position[0]][position[1]] = true;
    }

    private populatePixel(pixel: Pixel): void {
        const xyRange = getXYRange(3);

        xyRange.forEach((delta: number[]) => {
            const childPosition = vectorPlus(pixel.position, vectorMultiply(delta, this.approximationSize));
            childPosition[0] = Math.round(childPosition[0]);
            childPosition[1] = Math.round(childPosition[1]);
            if (this.isPositionAcceptable(childPosition)) {
                pixel.children.push(this.createPixel(childPosition));
            }
        });
    }

    private isPositionAcceptable(position: number[]) {
        return this.isRightColor(position) && this.isPositionInRange(position) && !this.isPositionCovered(position);
    }

    private isRightColor(position: number[]) {
        const positionColor: Color = getAverageColor(this.image, position, this.approximationSize);
        const startingColor: Color = getPixelData(this.image, this.firstPixel.position[0], this.firstPixel.position[1]);

        const positionSum = positionColor.red + positionColor.blue + positionColor.green + positionColor.alpha;
        const startingSum = startingColor.red + startingColor.blue + startingColor.green + startingColor.alpha;

        const delta = Math.abs(positionSum - startingSum);

        return startingSum * this.tolerance >= delta;
    }

    private isPositionInRange(position: number[]) {
        return position[0] > 0 && position[0] < this.image.width &&
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
