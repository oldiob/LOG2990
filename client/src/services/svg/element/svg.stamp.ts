import { vectorMinus, vectorModule } from 'src/utils/math';
import { IStamp } from './stamp/i-stamp';
import { SVGAbstract } from './svg.abstract';

export class SVGStamp extends SVGAbstract {
    IMAGESIZE = 10;
    element: any;
    previousX = 0;
    previousY = 0;

    position: number[];

    angles: number;
    lineWidth: number;

    stampTexture: IStamp;

    imagePaths: string;

    constructor(x: number, y: number, width: number, stamp: IStamp, angle: number, imagePath: string) {
        super();

        this.lineWidth = width * this.IMAGESIZE;
        this.angles = angle;
        this.stampTexture = stamp;
        this.stampTexture.create(this);
        this.imagePaths = imagePath;

        this.position = [x, y];
        this.stampTexture.addPoint(this, x, y);
    }

    isAtAdjusted(x: number, y: number): boolean {
        const vectorTo: number[] = vectorMinus([x, y], this.position);
        return vectorModule(vectorTo) <= this.lineWidth;
    }

    isIn(x: number, y: number, r: number): boolean {
        const tempWidth = this.lineWidth;
        this.lineWidth += r;
        const isInside = this.isAt(x, y);
        this.lineWidth = tempWidth;

        return isInside;
    }
    getPrimary(): string {
        return '';
    }
    getSecondary(): string {
        return '';
    }
    setPrimary(color: string): void {
        // No primary for stamp
    }
    setSecondary(color: string): void {
        // No secondary for stamp
    }
}
