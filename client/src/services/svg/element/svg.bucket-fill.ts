import { SVGAbstract } from './svg.interface';
import { BreadthFirst } from 'src/utils/breadth-first';
import { getImageData } from 'src/utils/misc';
import { Color } from 'src/utils/color';

export class SVGBucketFill extends SVGAbstract {

    element: any;

    constructor(position: number[], color: Color, image: ImageData, tolerance: number) {
        super();

        const breadthFirst = new BreadthFirst(position, image, tolerance);
        const pixelPositions: number[][] = breadthFirst.positions;

        const imData = getImageData(pixelPositions, color);
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
}
