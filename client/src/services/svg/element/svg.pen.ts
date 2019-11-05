import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine } from 'src/utils/math';

export class SVGPen implements SVGInterface {

    anchors: number[][] = [];
    cursor: number[];
    width = 5;
    element: any;
    polyline: any;
    line: any;
    circle: any;
    minWidth: number;
    maxWidth: number;

    lineStack: any[][] = [];

    constructor(x: number, y: number) {
        this.cursor = [x, y];
        this.anchors.push(this.cursor);
        this.polyline = DOMRenderer.createElement('polyline', 'svg');
        DOMRenderer.setAttribute(this.polyline, 'fill', 'none');
        this.line = DOMRenderer.createElement('line', 'svg');
        DOMRenderer.setAttribute(this.line, 'fill', 'none');
        DOMRenderer.setAttribute(this.line, 'stroke', '4');
        this.element = DOMRenderer.createElement('g', 'svg');
        DOMRenderer.setAttribute(this.polyline, 'stroke', '4');
        DOMRenderer.appendChild(this.element, this.polyline);
        DOMRenderer.appendChild(this.element, this.line);

        this.addLine();
    }

    private addLine(): void {
        const currentPoint = this.anchors[this.anchors.length - 1];
        let lastPoint = this.anchors[this.anchors.length - 1];
        if (!lastPoint) {
            lastPoint = this.cursor;
        }

        const distance = Math.sqrt(Math.pow(Math.abs(currentPoint[0] - lastPoint[0]), 2) +
            Math.pow(Math.abs(currentPoint[1] - lastPoint[1]), 2));

        this.width = this.minWidth + this.maxWidth * ( 1 / (distance / 1));
        if (this.width > this.maxWidth) {
            this.width = this.maxWidth;
        } else if (this.width < this.minWidth) {
            this.width = this.minWidth;
        }

        let tempLine: any;

        tempLine = DOMRenderer.createElement('line', 'svg');
        DOMRenderer.setAttribute(tempLine, 'fill', 'none');
        DOMRenderer.setAttribute(tempLine, 'stroke', '4');
        DOMRenderer.setAttribute(tempLine, 'stroke-width', this.width.toString());
        DOMRenderer.setAttribute(this.line, 'x1', `${lastPoint[0]}`);
        DOMRenderer.setAttribute(this.line, 'y1', `${lastPoint[1]}`);
        DOMRenderer.setAttribute(this.line, 'x2', `${currentPoint[0]}`);
        DOMRenderer.setAttribute(this.line, 'y2', `${currentPoint[1]}`);
        DOMRenderer.appendChild(this.element, tempLine);
        this.lineStack.push(tempLine);
        /*for (let i = 0; i < this.lineStack.length; i++) {
            DOMRenderer.appendChild(this.element, this.lineStack[i]);
        }*/
        /*this.setWidth(this.width);
        DOMRenderer.setAttribute(this.polyline,
            'points',
            this.anchors.map((point: number[]) => `${point[0]},${point[1]}`).join(' '));*/
    }

    setWidth(width: number) {
        this.width = width;
        DOMRenderer.setAttribute(this.polyline, 'stroke-width', width.toString());
        DOMRenderer.setAttribute(this.line, 'stroke-width', width.toString());
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
            if (child.nodeName === 'circle') {
                DOMRenderer.setAttribute(child, 'fill', color);
            } else {
                DOMRenderer.setAttribute(child, 'stroke', color);
            }
        }
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

    popAnchor(): void {
        this.anchors.pop();
        this.addLine();
    }
}
