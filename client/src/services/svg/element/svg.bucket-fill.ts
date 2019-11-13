import { SVGAbstract } from './svg.interface';

export class SVGBucketFill extends SVGAbstract {

    element: any;

    private points: number[][];

    constructor(image: ImageData, tolerance: number) {
        super();

        this.points = this.createPoints(image, tolerance);
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

    private createPoints(image: ImageData, tolerance: number) {
        return [];
    }
}

interface Pixel {
    position: number[];
    childIndex: number;
    children: Pixel[];
}