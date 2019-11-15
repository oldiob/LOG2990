import { SVGAbstract } from 'src/services/svg/element/svg.interface';
import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine } from 'src/utils/math';

export class SVGCalligraphy extends SVGAbstract {

    anchors: number[][] = [];
    cursor: number[];
    width: number;
    element: any;
    color: string;

    private latestPoint: number[];

    constructor(x: number, y: number) {
        super();
        this.cursor = [x, y];
        // this.anchors.push([x, y]);
        this.latestPoint = [x, y];
        this.element = DOMRenderer.createElement('g', 'svg');
    }

    private addLine(): void {
        const calligraphy = DOMRenderer.createElement('polyline', 'svg');
        DOMRenderer.setAttribute(calligraphy, 'fill', this.color);
        DOMRenderer.setAttribute(calligraphy, 'stroke', this.color);
        DOMRenderer.setAttribute(calligraphy, 'stroke-width', this.width.toString());

        DOMRenderer.setAttribute(calligraphy, 'points', `${this.latestPoint[0]}, ${this.latestPoint[1]},
                                                         ${this.cursor[0] + 10}, ${this.cursor[1] - 10}`);
        DOMRenderer.appendChild(this.element, calligraphy);
        this.latestPoint = this.cursor;
    }

    setWidth(width: number): void {
        this.width = width;
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

    isAtAdjusted(x: number, y: number): boolean {
        for (let i = 0; i < this.anchors.length - 1; i++) {
            if (isAtLine([x, y], this.anchors[i], this.anchors[i + 1], this.width)) {
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

    addAnchor(x: number, y: number): void {
        this.cursor = [x, y ];
        // this.anchors.push([x , y]);
        this.addLine();
    }
}
