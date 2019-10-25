import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine } from 'src/utils/math';
import { SVGInterface } from './svg.interface';

export class SVGPen implements SVGInterface {
    element: any;

    points: number[][] = [];
    minWidth: number;
    maxWidth: number;
    lineWidth: number;

    constructor() {
        this.element = DOMRenderer.createElement('polyline', 'svg');

        DOMRenderer.setAttribute(this.element, 'fill', 'none');
        DOMRenderer.setAttribute(this.element, 'stroke-linecap', 'round');
        DOMRenderer.setAttribute(this.element, 'stroke-linejoin', 'round');
    }

    isAt(x: number, y: number): boolean {
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
        return false;
    }

    setPrimary(color: string): void {
        DOMRenderer.setAttribute(this.element, 'stroke', color);
    }

    setSecondary(color: string): void {
        // NO OP
    }

    setMinWidth(minWidth: number): void {
        this.minWidth = minWidth;
    }

    setMaxWidth(maxWidth: number): void {
        this.maxWidth = maxWidth;
    }

    setWidth(width: number): void {
        this.lineWidth = width;
        DOMRenderer.setAttribute(this.element, 'stroke-width', width.toString());
    }

    addPoint(x: number, y: number): void {
        let distance: number;
        this.points.push([x, y]);
        const sizeOfPoint: number = this.points.length;

        distance = Math.sqrt(Math.pow(Math.abs(this.points[sizeOfPoint][0] - this.points[sizeOfPoint - 1][0]), 2) +
                            Math.pow(Math.abs(this.points[sizeOfPoint][0] - this.points[sizeOfPoint - 1][0]), 2));

        this.lineWidth = this.minWidth + this.maxWidth * (distance / 100);
        if (this.lineWidth > this.maxWidth) {
            this.lineWidth = this.maxWidth;
        } else if (this.lineWidth < this.minWidth) {
            this.lineWidth = this.minWidth;
        }
        this.setWidth(this.lineWidth);

        DOMRenderer.setAttribute(this.element, 'points', this.pointsAttribute());
    }

    // [[1, 2], [3, 4]] -> 1,2 3,4
    private pointsAttribute(): string {
        return this.points.map((e) => `${e[0]},${e[1]}`).join(' ');
    }
}
