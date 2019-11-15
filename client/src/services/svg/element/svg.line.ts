import { SVGAbstract } from 'src/services/svg/element/svg.abstract';
import { JunctionType, LineType } from 'src/services/tool/tool-options/i-tool';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine } from 'src/utils/math';

export class SVGLine extends SVGAbstract {

    anchors: number[][] = [];
    cursor: number[];
    width = 5;
    junctionWidth = 5;
    element: any;
    polyline: any;
    circle: any;
    constructor(x: number, y: number, junctionWidth: number, lineType: LineType, junctionType: JunctionType) {
        super();

        this.cursor = [x, y];
        this.anchors.push(this.cursor);
        this.polyline = DOMRenderer.createElement('polyline', 'svg');
        DOMRenderer.setAttribute(this.polyline, 'fill', 'none');
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

        this.fullRender();
    }

    private fullRender(): void {
        this.renderAnchors();
    }

    private renderAnchors(): void {
        DOMRenderer.setAttribute(this.polyline,
            'points',
            this.anchors.map((point: number[]) => `${point[0]},${point[1]}`).join(' '));
    }

    setWidth(width: number) {
        this.width = width;
        DOMRenderer.setAttribute(this.polyline, 'stroke-width', width.toString());
    }

    getPrimary(): string {
        const child = this.element.children[0];
        if (child.nodeName === 'circle') {
            return child.getAttribute('fill');
        } else {
            return child.getAttribute('stroke');
        }
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

    isAtAdjusted(x: number, y: number): boolean {
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
        const isInside = this.isAtAdjusted(x, y);
        this.width = tempWidth;

        return isInside;
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
        this.anchors[this.anchors.length - 1] = this.cursor;
        this.renderAnchors();
    }

    lineLoop(): void {
        this.anchors.push([this.cursor[0], this.cursor[1]]);
        this.anchors.push([this.anchors[0][0], this.anchors[0][1]]);
    }

    finish(): void {
        this.anchors.push([this.cursor[0], this.cursor[1]]);
    }

    end(): void {
        DOMRenderer.removeChild(this.element.parentNode, this.element);
        this.renderAnchors();
    }

    popAnchor(): void {
        this.anchors.pop();
        this.fullRender();
    }
}
