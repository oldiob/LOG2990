import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { LineType } from 'src/services/tool/tool-options/i-tool';
import { Point } from 'src/utils/geo-primitives';
import { isAtLine } from 'src/utils/math';
<<<<<<< HEAD
<<<<<<< HEAD
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';
import { atLine } from 'src/utils/math';
import { IMotif } from './motif/i-motif';
=======
import { IPattern } from './pattern/i-pattern';
>>>>>>> Add Patterns in ToolBar
=======
>>>>>>> Add Dot, Full And Dash Line

export class SVGLine implements SVGInterface {

    anchors: Point[] = [];
    cursor: Point;
    width: number = 5;
    element: any;
    polyline: any;
    line: any;
    circle: any;
    marker: any;
    constructor(x: number, y: number, lineType: LineType, renderer: Renderer2) {
        this.renderer = renderer;

        this.anchors.push(new Point(x, y));
        this.cursor = new Point(x, y);
        this.polyline = this.renderer.createElement('polyline', 'svg');
        this.renderer.setAttribute(this.polyline, 'fill', 'none');
        this.line = this.renderer.createElement('line', 'svg');
        this.renderer.setAttribute(this.line, 'fill', 'none');
        this.renderer.setAttribute(this.line, 'stroke-dasharray', '4');
        this.element = this.renderer.createElement('g', 'svg');
        switch (lineType) {
            case LineType.FullLine:
                this.renderer.setAttribute(this.polyline, 'stroke', '4');
                break;
            case LineType.DashLine:
                this.renderer.setAttribute(this.polyline, 'stroke-dasharray', '4');
                break;
            case LineType.DotLine:
                this.renderer.setAttribute(this.polyline, 'stroke-dasharray', '0.1 10');
                this.renderer.setAttribute(this.polyline, 'stroke-linecap', 'round');
                break;
        }
        this.renderer.appendChild(this.element, this.polyline);
        this.renderer.appendChild(this.element, this.line);

        this.fullRender();
        // this.renderer.setAttribute(this.polyline, 'marker-start', 'url(#dot)');
        // this.renderer.setAttribute(this.polyline, 'marker-mid', 'url(#dot)');
        // this.renderer.setAttribute(this.polyline, 'marker-end', 'url(#dot)');
        // MOTIF
        // 1. Lignes pointillé (trait)
        // this.renderer.setAttribute(this.polyline, 'stroke-dasharray', '4');

        // 2. Lignes pointillé (point) // pas trouvé encore
        // this.renderer.setAttribute(this.polyline, 'stroke-dasharray', '0.1 10');
        // this.renderer.setAttribute(this.polyline, 'stroke-linecap', 'round');

        // 3. Lignes continue par defaut
        // this.renderer.setAttribute(this.polyline, 'stroke', '4');

        // JONCTION

        // 1. ANGLE
        // this.renderer.setAttribute(this.polyline, 'stroke-linejoin', 'miter');
        // 2. ARRONDI
        // this.renderer.setAttribute(this.polyline, 'stroke-linejoin', 'round');
        // stroke-linejoin: round

        // 3. POINT
        // this.marker = this.renderer.createElement('marker', 'svg');
        // this.renderer.setAttribute(this.marker, 'id', 'dot');
        // this.renderer.setAttribute(this.marker, 'refX', '25');
        // this.renderer.setAttribute(this.marker, 'refY', '25');
        // this.renderer.setAttribute(this.marker, 'markerWidth', '25');
        // this.renderer.setAttribute(this.marker, 'markerHeight', '25');

        // this.circle = this.renderer.createElement('circle', 'svg');
        // this.renderer.setAttribute(this.circle, 'cx', '12.5');
        // this.renderer.setAttribute(this.circle, 'cy', '12.5');
        // this.renderer.setAttribute(this.circle, 'r', '12.5');
        // this.renderer.setAttribute(this.circle, 'fill', 'red');

        // // this.renderer.appendChild(this.marker, this.circle);
        // // this.renderer.appendChild(this.element, this.marker);
    }

    private fullRender() {
        this.renderAnchors();
        this.renderCursor();
    }

    private renderCursor() {
        let lastPoint: Point = this.anchors[this.anchors.length - 1];
        if (!lastPoint) {
            lastPoint = this.cursor;
        }
        RendererProvider.renderer.setAttribute(this.line, 'x1', `${lastPoint.x}`);
        RendererProvider.renderer.setAttribute(this.line, 'y1', `${lastPoint.y}`);
        RendererProvider.renderer.setAttribute(this.line, 'x2', `${this.cursor.x}`);
        RendererProvider.renderer.setAttribute(this.line, 'y2', `${this.cursor.y}`);
    }

    private renderAnchors() {
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

    addAnchor(x: number, y: number) {
        this.anchors.push(new Point(x, y));
        // this.motif.addPoint(this, this, this, x, y);
        this.renderAnchors();
    }

    setCursor(x: number, y: number) {
        this.cursor = new Point(x, y);
        this.renderCursor();
    }

    lineLoop() {
        this.anchors.push(new Point(this.cursor.x, this.cursor.y));
        this.anchors.push(new Point(this.anchors[0].x, this.anchors[0].y));
        this.end();
    }

    finish() {
        this.anchors.push(new Point(this.cursor.x, this.cursor.y));
        this.end();
    }

    end() {
        RendererProvider.renderer.removeChild(this.line.parentNode, this.line);
        this.renderAnchors();
    }

    popAnchor() {
        this.anchors.pop();
        this.fullRender();
    }
}
