import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine } from 'src/utils/math';
import { SVGAbstract } from './svg.abstract';

export class SVGPencil extends SVGAbstract {

    private points: number[][];
    private lineWidth: number;

    element: any;

    constructor() {
        super();
        this.points = [];
        this.element = DOMRenderer.createElement('polyline', 'svg');

        DOMRenderer.setAttribute(this.element, 'fill', 'none');
        DOMRenderer.setAttribute(this.element, 'stroke-linecap', 'round');
        DOMRenderer.setAttribute(this.element, 'stroke-linejoin', 'round');
        DOMRenderer.setAttribute(this.element, 'points', '');
    }

    protected isAtAdjusted(x: number, y: number): boolean {
        const WIDTH_MARGIN = 10.0;
        const width: number = this.lineWidth + WIDTH_MARGIN;
        for (let i = 0; i < this.points.length - 1; i++) {
            if (isAtLine([x, y], this.points[i], this.points[i + 1], width)) {
                return true;
            }
        }

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
        return this.element.getAttribute('stroke');
    }

    getSecondary(): string {
        return '';
    }

    setPrimary(color: string): void {
        DOMRenderer.setAttribute(this.element, 'stroke', color);
    }

    setSecondary(color: string): void {
        //
    }

    setWidth(width: number): void {
        this.lineWidth = width;
        DOMRenderer.setAttribute(this.element, 'stroke-width', this.lineWidth.toString());
    }

    addPoint(x: number, y: number): void {
        this.points.push([x, y]);

        const currentPoints = this.element.attributes.points.nodeValue;
        DOMRenderer.setAttribute(this.element, 'points', currentPoints + ` ${x},${y}`);
    }
}
