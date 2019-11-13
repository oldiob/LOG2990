import { SVGAbstract } from './svg.interface';

export class SVGBucketFill extends SVGAbstract {

    element: any;

    constructor(image: ImageData, tolerance: number) {
        super();

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
