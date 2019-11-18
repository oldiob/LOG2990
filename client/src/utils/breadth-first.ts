import { Color } from './color';
import { vectorPlus } from './math';
import { getPixelData, getXYRange } from './image-manipulations';
import { Queue } from './queue';

export class BreadthFirst {

    positions: number[][];

    private covered: boolean[][];
    private startingColor: Color;
    private startingColorSum: number;

    constructor(position: number[], private image: ImageData, private tolerance: number, private approximationSize: number) {
        this.initEmptyCovered();

        this.positions = [];

        position[0] = Math.round(position[0]);
        position[1] = Math.round(position[1]);

        const firstPixel: Pixel = this.createPixel(position);
        this.startingColor = getPixelData(image, firstPixel.position[0], firstPixel.position[1]);
        this.startingColorSum = this.startingColor.red + this.startingColor.green + this.startingColor.blue + this.startingColor.alpha;

        this.fillPixels(firstPixel);
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

    private fillPixels(firstPixel: Pixel): void {

        const toFill: Queue<Pixel> = new Queue<Pixel>();

        toFill.push(firstPixel);

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
        try {
            this.covered[position[0]][position[1]] = true;
        } catch (e) {
            console.log(position, this.image.width, this.image.height);
        }
    }

    private populatePixel(pixel: Pixel): void {

        for (let x = -this.approximationSize; x <= this.approximationSize; x += this.approximationSize) {
            for (let y = -this.approximationSize; y <= this.approximationSize; y += this.approximationSize) {
                const childPosition = vectorPlus(pixel.position, [x, y]);
                childPosition[0] = Math.round(childPosition[0]);
                childPosition[1] = Math.round(childPosition[1]);
                if (this.isPositionAcceptable(childPosition)) {
                    pixel.children.push(this.createPixel(childPosition));
                }
            }
        }
    }

    private isPositionAcceptable(position: number[]) {
        return this.isPositionInRange(position) && !this.isPositionCovered(position) && this.isRightColor(position);
    }

    private isRightColor(position: number[]) {
        const positionColor: Color = getPixelData(this.image, position[0], position[1]);

        const delta =
            Math.abs(positionColor.red - this.startingColor.red) +
            Math.abs(positionColor.green - this.startingColor.green) +
            Math.abs(positionColor.blue - this.startingColor.blue) +
            Math.abs(positionColor.alpha - this.startingColor.alpha);

        return this.startingColorSum * this.tolerance >= delta;
    }

    private isPositionInRange(position: number[]) {
        return position[0] >= 0 && position[0] < this.image.width &&
            position[1] >= 0 && position[1] < this.image.height;
    }

    private isPositionCovered(position: number[]) {
        return this.covered[position[0]][position[1]];
    }
}

interface Pixel {
    position: number[];
    children: Pixel[];
}
