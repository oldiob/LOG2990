import { SVGAbstract } from './svg.interface';

export class SVGBucketFill extends SVGAbstract {

    element: any;

    private points: number[][];

    constructor(position: number[], image: ImageData, tolerance: number) {
        super();

        this.points = this.createPoints(position, image, tolerance);
    }

    isIn(x: number, y: number, r: number): boolean {
        return false;
    }

    getPrimary(): string {
        return '';
    }
    getSecondary(): string {
        return '';
    }
    setPrimary(color: string): void {
        return;
    }
    setSecondary(color: string): void {
        return;
    }

    protected isAtAdjusted(x: number, y: number): boolean {
        return false;
    }

    private createPoints(position: number[], image: ImageData, tolerance: number) {
        let isFilled = false;

        const allPixels: Pixel[] = [];
        let currentPixel = this.newPixel(position);
        this.populatePixel(currentPixel, allPixels);

        while (!isFilled) {
        }
    }

    private newPixel(pos: number[]): Pixel {
        return { position: pos, childIndex: 0, children: [] };
    }

    private populatePixel(pixel: Pixel, allPixels: Pixel[]): Pixel {
        const pixel = {
            position: pos,
            childIndex: 0,
            children: [],
        };

        for (let x = -1; x <= 1; x += 2) {
            for (let y = -1; y <= 1; y += 2) {

            }
        }

        return pixel;
    }

    private doesPixelExist()
}

interface Pixel {
    position: number[];
    childIndex: number;
    children: Pixel[];
}
