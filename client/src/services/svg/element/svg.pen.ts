import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine } from 'src/utils/math';
import { SVGInterface } from './svg.interface';

export class SVGPen implements SVGInterface {

    constructor(x: number, y: number) {
        this.cursor = [x, y];
        this.points.push(this.cursor);
        this.polyline = DOMRenderer.createElement('polyline', 'svg');
        DOMRenderer.setAttribute(this.polyline, 'fill', 'none');
        this.line = DOMRenderer.createElement('line', 'svg');
        DOMRenderer.setAttribute(this.line, 'fill', 'none');
        DOMRenderer.setAttribute(this.line, 'stroke-dasharray', '4');
        this.element = DOMRenderer.createElement('g', 'svg');
        DOMRenderer.setAttribute(this.polyline, 'stroke', '4');
        DOMRenderer.appendChild(this.element, this.polyline);
        DOMRenderer.setAttribute(this.polyline, 'stroke-linejoin', 'round');
        DOMRenderer.appendChild(this.element, this.polyline);
        DOMRenderer.appendChild(this.element, this.line);

        this.fullRender();
    }

    element: any;
    polyline: any;
    line: any;

    cursor: number[];
    points: number[][] = [];
    minWidth: number;
    maxWidth: number;
    lineWidth: number;

    private fullRender(): void {
        this.renderAnchors();
        //this.renderCursor();
    }

    private renderCursor(): void {
        let lastPoint = this.points[this.points.length - 1];
        if (!lastPoint) {
            lastPoint = this.cursor;
        }
        const distance = Math.sqrt(Math.pow(Math.abs(this.cursor[0] - lastPoint[0]), 2) +
            Math.pow(Math.abs(this.cursor[1] - lastPoint[1]), 2));

        this.lineWidth = this.minWidth + this.maxWidth * ( 1 / distance);
        if (this.lineWidth > this.maxWidth) {
            this.lineWidth = this.maxWidth;
        } else if (this.lineWidth < this.minWidth) {
            this.lineWidth = this.minWidth;
        }
        this.setWidth(this.lineWidth);
        /*
        DOMRenderer.setAttribute(this.line, 'x1', `${lastPoint[0]}`);
        DOMRenderer.setAttribute(this.line, 'y1', `${lastPoint[1]}`);
        DOMRenderer.setAttribute(this.line, 'x2', `${this.cursor[0]}`);
        DOMRenderer.setAttribute(this.line, 'y2', `${this.cursor[1]}`);
        */
    }

    private renderAnchors(): void {
        /* DOMRenderer.setAttribute(this.polyline,
            'points',
            this.points.map((point: number[]) => `${point[0]},${point[1]}`).join(' ')); */
    }

    addAnchor(x: number, y: number): void {
        let lastPoint = this.points[this.points.length - 1];
        if (!lastPoint) {
            lastPoint = this.cursor;
        }
        this.points.push([x, y]);
        this.renderAnchors();
        const circle: any = DOMRenderer.createElement('circle', 'svg');
        const distance = Math.sqrt(Math.pow(Math.abs(this.cursor[0] - lastPoint[0]), 2) +
            Math.pow(Math.abs(this.cursor[1] - lastPoint[1]), 2));

        this.lineWidth = this.minWidth + this.maxWidth * ( 1 / distance);
        if (this.lineWidth > this.maxWidth) {
            this.lineWidth = this.maxWidth;
        } else if (this.lineWidth < this.minWidth) {
            this.lineWidth = this.minWidth;
        }
        const radius = this.lineWidth / 2;

        const currentColor = this.polyline.attributes.stroke.nodeValue;

        DOMRenderer.setAttribute(circle, 'cx', x.toString());
        DOMRenderer.setAttribute(circle, 'cy', y.toString());
        DOMRenderer.setAttribute(circle, 'r', radius.toString());
        DOMRenderer.setAttribute(circle, 'fill', currentColor);
        DOMRenderer.appendChild(this.element, circle);
    }

    setCursor(x: number, y: number): void {
        this.cursor = [x, y];
        this.renderCursor();
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
        for (const child of this.element.children) {
            if (child.nodeName === 'circle') {
                DOMRenderer.setAttribute(child, 'fill', color);
            } else {
                DOMRenderer.setAttribute(child, 'stroke', color);
            }
        }
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
        DOMRenderer.setAttribute(this.polyline, 'stroke-width', width.toString());
        DOMRenderer.setAttribute(this.line, 'stroke-width', width.toString());
    }

    finish(): void {
        this.points.push([this.cursor[0], this.cursor[1]]);
        this.end();
    }

    end(): void {
        DOMRenderer.removeChild(this.line.parentNode, this.line);
        this.renderAnchors();
    }

    popAnchor(): void {
        this.points.pop();
        this.fullRender();
    }

}
