import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine } from 'src/utils/math';

export class SVGPen implements SVGInterface {

    anchors: number[][] = [];
    cursor: number[];
    width: number;
    element: any;
    minWidth: number;
    maxWidth: number;
    color: string;

    private latestPoint: number[];

    constructor(x: number, y: number) {
        this.cursor = [x, y];
        this.anchors.push([x, y]);
        this.latestPoint = [x, y];
        this.element = DOMRenderer.createElement('g', 'svg');

    }

    private addLine(): void {
        const distance = Math.sqrt(Math.pow(Math.abs(this.cursor[0] - this.latestPoint[0]), 2) +
            Math.pow(Math.abs(this.cursor[1] - this.latestPoint[1]), 2));

        this.width = this.minWidth + this.maxWidth * ( 3 / distance);
        if (this.width > this.maxWidth) {
            this.width = this.maxWidth;
        }

        const line = DOMRenderer.createElement('polyline', 'svg');
        DOMRenderer.setAttribute(line, 'stroke', this.color);
        DOMRenderer.setAttribute(line, 'stroke-width', this.width.toString());
        DOMRenderer.setAttribute(line, 'stroke-linecap', 'round');
        DOMRenderer.setAttribute(line, 'stroke-linejoin', 'round');
        DOMRenderer.setAttribute(line,
            'points',
             `${this.latestPoint[0]},${this.latestPoint[1]},${this.cursor[0]},${this.cursor[1]}`);
        DOMRenderer.appendChild(this.element, line);
        this.latestPoint = this.cursor;
    }

    setMinWidth(minWidth: number): void {
        this.minWidth = minWidth;
    }

    setMaxWidth(maxWidth: number): void {
        this.maxWidth = maxWidth;
    }

    getPrimary(): string {
        const child = this.element.children[0];
        return child.getAttribute('stroke');

    }

    getSecondary(): string {
        return '';
    }

    setPrimary(color: string) {
        for (const child of this.element.children) {
                DOMRenderer.setAttribute(child, 'stroke', color);
        }
        this.color = color;
    }

    setSecondary(color: string) {
        // NO OP
    }

    isAt(x: number, y: number): boolean {
        const additionnalWidth = 10.0;
        const width: number = this.width + additionnalWidth;
        for (let i = 0; i < this.anchors.length - 1; i++) {
            if (isAtLine([x, y], this.anchors[i], this.anchors[i + 1], width)) {
                return true;
            }
        }
        return false;
    }

    isIn(x: number, y: number, r: number): boolean {
        const tempWidth = this.width;
        this.width += r;
        const isInside = this.isAt(x, y);
        this.width = tempWidth;

        return isInside;
    }

    addAnchor(x: number, y: number): void {
        this.cursor = [x, y];
        this.anchors.push([x, y]);
        this.addLine();
    }
}
