import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { JunctionType, LineType } from 'src/services/tool/tool-options/i-tool';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine } from 'src/utils/math';

export class SVGLine implements SVGInterface {

    anchors: number[][] = [];
    cursor: number[];
    width = 5;
    junctionWidth = 5;
    element: any;
    polyline: any;
    line: any;
    circle: any;
    constructor(x: number, y: number, junctionWidth: number, lineType: LineType, junctionType: JunctionType) {
        this.cursor = [x, y];
        this.anchors.push(this.cursor);
        this.polyline = DOMRenderer.createElement('polyline', 'svg');
        DOMRenderer.setAttribute(this.polyline, 'fill', 'none');
        this.line = DOMRenderer.createElement('line', 'svg');
        DOMRenderer.setAttribute(this.line, 'fill', 'none');
        DOMRenderer.setAttribute(this.line, 'stroke-dasharray', '4');
        this.element = DOMRenderer.createElement('g', 'svg');
        switch (lineType) {
            case LineType.FullLine:
                DOMRenderer.setAttribute(this.polyline, 'stroke', '4');
                break;
            case LineType.DashLine:
                DOMRenderer.setAttribute(this.polyline, 'stroke-dasharray', '4');
                break;
            case LineType.DotLine:
                DOMRenderer.setAttribute(this.polyline, 'stroke-dasharray', `0.1 ${5 * this.width}`);
                DOMRenderer.setAttribute(this.polyline, 'stroke-linecap', 'round');
                break;
        }
        DOMRenderer.appendChild(this.element, this.polyline);
        switch (junctionType) {
            case JunctionType.Angle:
                DOMRenderer.setAttribute(this.polyline, 'stroke-linejoin', 'miter');
                DOMRenderer.appendChild(this.element, this.polyline);
                break;
            case JunctionType.Round:
                DOMRenderer.setAttribute(this.polyline, 'stroke-linejoin', 'round');
                DOMRenderer.appendChild(this.element, this.polyline);
                break;
            case JunctionType.Dot:
                this.junctionWidth = junctionWidth;
                DOMRenderer.setAttribute(this.polyline, 'stroke-linejoin', 'round');
                this.circle = DOMRenderer.createElement('circle', 'svg');
                DOMRenderer.setAttribute(this.circle, 'cx', x.toString());
                DOMRenderer.setAttribute(this.circle, 'cy', y.toString());
                DOMRenderer.setAttribute(this.circle, 'r', this.junctionWidth.toString());
                DOMRenderer.setAttribute(this.circle, 'fill', 'black');
                DOMRenderer.appendChild(this.element, this.polyline);
                DOMRenderer.appendChild(this.element, this.circle);

                break;
                }
        DOMRenderer.appendChild(this.element, this.line);

        this.fullRender();
    }

    private fullRender(): void {
        this.renderAnchors();
        this.renderCursor();
    }

    private renderCursor(): void {
        let lastPoint = this.anchors[this.anchors.length - 1];
        if (!lastPoint) {
            lastPoint = this.cursor;
        }
        DOMRenderer.setAttribute(this.line, 'x1', `${lastPoint[0]}`);
        DOMRenderer.setAttribute(this.line, 'y1', `${lastPoint[1]}`);
        DOMRenderer.setAttribute(this.line, 'x2', `${this.cursor[0]}`);
        DOMRenderer.setAttribute(this.line, 'y2', `${this.cursor[1]}`);
    }

    private renderAnchors(): void {
        DOMRenderer.setAttribute(this.polyline,
            'points',
            this.anchors.map((point: number[]) => `${point[0]},${point[1]}`).join(' '));
    }

    setWidth(width: number) {
        this.width = width;
        DOMRenderer.setAttribute(this.polyline, 'stroke-width', width.toString());
        DOMRenderer.setAttribute(this.line, 'stroke-width', width.toString());
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
        return false;
    }

    addAnchor(x: number, y: number, junctionType: JunctionType): void {
        this.anchors.push([x, y]);
        if (junctionType === JunctionType.Dot) {
            const currentColor = this.polyline.attributes.stroke.nodeValue;

            this.circle = DOMRenderer.createElement('circle', 'svg');
            DOMRenderer.setAttribute(this.circle, 'cx', x.toString());
            DOMRenderer.setAttribute(this.circle, 'cy', y.toString());
            DOMRenderer.setAttribute(this.circle, 'r', this.junctionWidth.toString());
            DOMRenderer.setAttribute(this.circle, 'fill', currentColor);
            DOMRenderer.appendChild(this.element, this.circle);
        }
        this.renderAnchors();
    }

    setCursor(x: number, y: number): void {
        this.cursor = [x, y];
        this.renderCursor();
    }

    lineLoop(): void {
        this.anchors.push([this.cursor[0], this.cursor[1]]);
        this.anchors.push([this.anchors[0][0], this.anchors[0][1]]);
        this.end();
    }

    finish(): void {
        this.anchors.push([this.cursor[0], this.cursor[1]]);
        this.end();
    }

    end(): void {
        DOMRenderer.removeChild(this.line.parentNode, this.line);
        this.renderAnchors();
    }

    popAnchor(): void {
        this.anchors.pop();
        this.fullRender();
    }
}
