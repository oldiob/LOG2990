import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { JunctionType, LineType } from 'src/services/tool/tool-options/i-tool';
import { Point } from 'src/utils/geo-primitives';
import { isAtLine } from 'src/utils/math';

export class SVGLine implements SVGInterface {

    anchors: Point[] = [];
    cursor: Point;
    width = 5;
    junctionWidth = 5;
    renderer: RendererProvider;
    element: any;
    polyline: any;
    line: any;
    circle: any;
    constructor(x: number, y: number, junctionWidth: number, lineType: LineType, junctionType: JunctionType) {
        this.anchors.push(new Point(x, y));
        this.cursor = new Point(x, y);
        this.polyline = RendererProvider.renderer.createElement('polyline', 'svg');
        RendererProvider.renderer.setAttribute(this.polyline, 'fill', 'none');
        this.line = RendererProvider.renderer.createElement('line', 'svg');
        RendererProvider.renderer.setAttribute(this.line, 'fill', 'none');
        RendererProvider.renderer.setAttribute(this.line, 'stroke-dasharray', '4');
        this.element = RendererProvider.renderer.createElement('g', 'svg');
        switch (lineType) {
            case LineType.FullLine:
                RendererProvider.renderer.setAttribute(this.polyline, 'stroke', '4');
                break;
            case LineType.DashLine:
                RendererProvider.renderer.setAttribute(this.polyline, 'stroke-dasharray', '4');
                break;
            case LineType.DotLine:
                RendererProvider.renderer.setAttribute(this.polyline, 'stroke-dasharray', '0.1 10');
                RendererProvider.renderer.setAttribute(this.polyline, 'stroke-linecap', 'round');
                break;
        }
        RendererProvider.renderer.appendChild(this.element, this.polyline);
        switch (junctionType) {
            case JunctionType.Angle:
                RendererProvider.renderer.setAttribute(this.polyline, 'stroke-linejoin', 'miter');
                RendererProvider.renderer.appendChild(this.element, this.polyline);
                break;
            case JunctionType.Round:
                RendererProvider.renderer.setAttribute(this.polyline, 'stroke-linejoin', 'round');
                RendererProvider.renderer.appendChild(this.element, this.polyline);
                break;
            case JunctionType.Dot:
                this.junctionWidth = junctionWidth;
                RendererProvider.renderer.setAttribute(this.polyline, 'stroke-linejoin', 'round');
                this.circle = RendererProvider.renderer.createElement('circle', 'svg');
                RendererProvider.renderer.setAttribute(this.circle, 'cx', x.toString());
                RendererProvider.renderer.setAttribute(this.circle, 'cy', y.toString());
                RendererProvider.renderer.setAttribute(this.circle, 'r', this.junctionWidth.toString());
                RendererProvider.renderer.setAttribute(this.circle, 'fill', 'black');
                RendererProvider.renderer.appendChild(this.element, this.polyline);
                RendererProvider.renderer.appendChild(this.element, this.circle);

                break;
                }
        RendererProvider.renderer.appendChild(this.element, this.line);

        this.fullRender();
    }

    private fullRender(): void {
        this.renderAnchors();
        this.renderCursor();
    }

    private renderCursor(): void {
        let lastPoint: Point = this.anchors[this.anchors.length - 1];
        if (!lastPoint) {
            lastPoint = this.cursor;
        }
        RendererProvider.renderer.setAttribute(this.line, 'x1', `${lastPoint.x}`);
        RendererProvider.renderer.setAttribute(this.line, 'y1', `${lastPoint.y}`);
        RendererProvider.renderer.setAttribute(this.line, 'x2', `${this.cursor.x}`);
        RendererProvider.renderer.setAttribute(this.line, 'y2', `${this.cursor.y}`);
    }

    private renderAnchors(): void {
        RendererProvider.renderer.setAttribute(this.polyline,
            'points',
            this.anchors.map((point: Point) => {
                return point.toString();
            }).join(' '));
    }

    setWidth(width: number) {
        this.width = width;
        RendererProvider.renderer.setAttribute(this.polyline, 'stroke-width', width.toString());
        RendererProvider.renderer.setAttribute(this.line, 'stroke-width', width.toString());
    }

    setPrimary(color: string) {
        RendererProvider.renderer.setAttribute(this.polyline, 'stroke', color);
        RendererProvider.renderer.setAttribute(this.line, 'stroke', color);
    }

    setSecondary(color: string) {
        // NO OP
    }

    isAt(x: number, y: number): boolean {
        const additionnalWidth = 10.0;
        const width: number = this.width + additionnalWidth;
        for (let i = 0; i < this.anchors.length - 1; i++) {
            if (isAtLine([x, y], this.anchors[i].toVector(), this.anchors[i + 1].toVector(), width)) {
                return true;
            }
        }
        return false;
    }

    isIn(x: number, y: number, r: number): boolean {
        return false;
    }

    addAnchor(x: number, y: number, junctionType: JunctionType): void {
        this.anchors.push(new Point(x, y));
        if (junctionType === JunctionType.Dot) {
            this.circle = RendererProvider.renderer.createElement('circle', 'svg');
            RendererProvider.renderer.setAttribute(this.circle, 'cx', x.toString());
            RendererProvider.renderer.setAttribute(this.circle, 'cy', y.toString());
            RendererProvider.renderer.setAttribute(this.circle, 'r', this.junctionWidth.toString());
            RendererProvider.renderer.setAttribute(this.circle, 'fill', 'black');
            RendererProvider.renderer.appendChild(this.element, this.circle);
        }
        this.renderAnchors();
    }

    setCursor(x: number, y: number): void {
        this.cursor = new Point(x, y);
        this.renderCursor();
    }

    lineLoop(): void {
        this.anchors.push(new Point(this.cursor.x, this.cursor.y));
        this.anchors.push(new Point(this.anchors[0].x, this.anchors[0].y));
        this.end();
    }

    finish(): void {
        this.anchors.push(new Point(this.cursor.x, this.cursor.y));
        this.end();
    }

    end(): void {
        RendererProvider.renderer.removeChild(this.line.parentNode, this.line);
        this.renderAnchors();
    }

    popAnchor(): void {
        this.anchors.pop();
        this.fullRender();
    }
}
