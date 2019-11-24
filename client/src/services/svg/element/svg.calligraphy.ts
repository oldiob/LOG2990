import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine, vectorMinus, vectorPlus } from 'src/utils/math';
import { SVGAbstract } from './svg.abstract';

export class SVGCalligraphy extends SVGAbstract {

    private pointsTop: number[][];
    private pointsBot: number[][];
    private offset: number[];
    element: any;
    width: number;
    angle: number;
    angles: number[];
    radian: number;

    constructor(angle: number) {
        super();
        this.element = DOMRenderer.createElement('path', 'svg');
        DOMRenderer.setAttribute(this.element, 'stroke-linejoin', 'arcs');
        DOMRenderer.setAttribute(this.element, 'stroke-linecap', 'square');
        this.pointsBot = [];
        this.pointsTop = [];
        this.angle = angle;
        this.radian = ((this.angle) * 180) / Math.PI;
        this.offset = [5, 5];
        this.angles = [Math.cos(this.radian) * 2, Math.sin(this.radian) * 2];
    }

    isAtAdjusted(x: number, y: number): boolean {
        const WIDTH_MARGIN = 10.0;
        const width: number = this.width + WIDTH_MARGIN;
        for (let i = 0; i < this.pointsTop.length - 1; i++) {
            for (let j = 0; j < this.pointsBot.length - 1; j++) {
                if (isAtLine([x, y], this.pointsTop[i], this.pointsTop[i + 1], width) ||
                    isAtLine([x, y], this.pointsBot[j], this.pointsBot[j + 1], width)) {
                    return true;
                }
            }
        }

        return false;
    }

    isIn(x: number, y: number): boolean {
        const isInside = this.isAt(x, y);

        return isInside;
    }

    getPrimary(): string {
        return this.element.getAttribute('fill') && this.element.getAttribute('stroke');
    }

    getSecondary(): string {
        return '';
    }

    setPrimary(color: string): void {
        DOMRenderer.setAttribute(this.element, 'fill', color);
        DOMRenderer.setAttribute(this.element, 'stroke', color);
    }

    setSecondary(color: string): void {
        // NO OP
    }

    setWidth(width: number): void {
        this.width = width;
        DOMRenderer.setAttribute(this.element, 'stroke-width', this.width.toString());
    }

    addPoint(x: number, y: number): void {
        this.pointsTop.push(vectorPlus([x, y], this.offset));
        this.pointsBot.push(vectorMinus([x, y], this.offset));
        this.setPathPoints();
    }

    private setPathPoints(): void {
        let d: string = 'M' + vectorPlus(this.pointsTop[0], this.angles) + ' ';
       //  let dlol: string = 'M' + this.pointsBot[this.pointsBot.length - 1].join(' ');

        this.pointsTop.forEach((point: number[]) => {
            d += ', L' + (point[0] + this.angles[0]) + ','
                       + (point[1] + this.angles[1]) + ' ';
        });

        this.pointsBot.reverse();
        this.pointsBot.forEach((point: number[]) => {
            d += ', L' + (point[0] - this.angles[0]) + ','
                       + (point[1] - this.angles[1]) + ' ';
        });
        this.pointsBot.reverse();

        d += 'Z';

        DOMRenderer.setAttribute(this.element, 'd', d);
    }

}
