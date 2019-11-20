import { DOMRenderer } from 'src/utils/dom-renderer';
import { vectorMinus, vectorPlus } from 'src/utils/math';
import { SVGAbstract } from './svg.abstract';

export class SVGCalligraphy extends SVGAbstract {

    private pointsTop: number[][] = [];
    private pointsBot: number[][] = [];
    private offset = [5, 5];
    element: any;
    lineWidth = 1;

    constructor() {
        super();

        this.element = DOMRenderer.createElement('path', 'svg');
        DOMRenderer.setAttribute(this.element, 'fill-rule', 'nonzero');
        DOMRenderer.setAttribute(this.element, 'stroke-linejoin', 'arcs');
        DOMRenderer.setAttribute(this.element, 'stroke-linecap', 'round');
    }

    isAtAdjusted(x: number, y: number): boolean {
        /*const WIDTH_MARGIN = 10.0;
        const width: number = this.lineWidth + WIDTH_MARGIN;
        for (let i = 0; i < this.points.length - 1; i++) {
            if (isAtLine([x, y], this.points[i], this.points[i + 1], width)) {
                return true;
            }
        }
        */
        return false;
    }
    isIn(x: number, y: number, r: number): boolean {
        const tempWidth = this.lineWidth;
        this.lineWidth += r;
        const isInside = this.isAt(x, y);
        this.lineWidth = tempWidth;

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
        this.lineWidth = width;
        DOMRenderer.setAttribute(this.element, 'stroke-width', this.lineWidth.toString());
    }

    addPoint(x: number, y: number): void {
        this.pointsTop.push(vectorPlus([x, y], this.offset));
        this.pointsBot.push(vectorMinus([x, y], this.offset));
        this.setPathPoints();
    }

    private setPathPoints(): void {
        let d: string = 'm' + this.pointsTop[0].join(' ');
       //  let dlol: string = 'M' + this.pointsBot[this.pointsBot.length - 1].join(' ');

        this.pointsTop.forEach((point: number[]) => {
            d += ', L' + point.join(' ');
        });

        this.pointsBot.reverse();
        this.pointsBot.forEach((point: number[]) => {
            d += ', L' + point.join(' ');
        });
        this.pointsBot.reverse();

        d += 'Z';

        DOMRenderer.setAttribute(this.element, 'd', d);
    }

}
