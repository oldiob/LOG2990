import { vectorMinus, vectorModule } from 'src/utils/math';
import { IStamp } from './stamp/i-stamp';
import { SVGAbstract } from './svg.abstract';

export class SVGStamp extends SVGAbstract {

    private readonly IMAGE_SIZE = 10;
    private emoji: IStamp;

    element: any;
    angle: number;
    width: number;
    imagePaths: string;

    constructor(x: number, y: number, width: number, emoji: IStamp, angle: number, imagePath: string) {
        super();

        this.width = width * this.IMAGE_SIZE;
        this.angle = angle;
        this.emoji = emoji;
        this.emoji.create(this);
        this.imagePaths = imagePath;

        this.emoji.addPoint(this, x, y);
    }

    isAtAdjusted(x: number, y: number): boolean {
        const vectorTo: number[] = vectorMinus([x, y], this.position);
        return vectorModule(vectorTo) <= this.width;
    }

    isIn(x: number, y: number, r: number): boolean {
        const tempWidth = this.width;
        this.width += r;
        const isInside = this.isAt(x, y);
        this.width = tempWidth;

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
