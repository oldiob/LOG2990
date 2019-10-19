import { IStamp } from './stamp/i-stamp';
import { SVGInterface } from './svg.interface';

export class SVGStamp implements SVGInterface {
    IMAGESIZE = 10;
    element: any;
    previousX = 0;
    previousY = 0;

    points: number[][];

    angles: number;
    lineWidth: number;

    stampTexture: IStamp;

    imagePaths: string;

    constructor(width: number, stamp: IStamp, angle: number, imagePath: string) {
        this.points = [];
        this.lineWidth = width * this.IMAGESIZE;
        this.angles = angle;
        this.stampTexture = stamp;
        this.stampTexture.create(this);
        this.imagePaths = imagePath;
    }

    isAt(x: number, y: number): boolean {
        return false;
    }
    isIn(x: number, y: number): boolean {
        return false;
    }
    setPrimary(color: string): void {
        // No primary for stamp
    }
    setSecondary(color: string): void {
        // No secondary for stamp
    }
    addPoint(x: number, y: number): void {
        this.points.push([x, y]);
        this.stampTexture.addPoint(this, x, y);
    }
}
