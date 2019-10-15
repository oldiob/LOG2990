import { Renderer2 } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { Point } from 'src/utils/geo-primitives';
import { atLine } from 'src/utils/math';

export class SVGLine implements SVGInterface {

    anchors: Point[] = [];
    cursor: Point;
    width: number = 5;
    renderer: Renderer2;
    element: any;
    polyline: any;
    line: any;

    constructor(x: number, y: number, renderer: Renderer2) {
        this.renderer = renderer;

        this.anchors.push(new Point(x, y));
        this.cursor = new Point(x, y);

        this.polyline = this.renderer.createElement('polyline', 'svg');
        this.renderer.setAttribute(this.polyline, 'fill', 'none');

        this.line = this.renderer.createElement('line', 'svg');
        this.renderer.setAttribute(this.line, 'fill', 'none');
        this.renderer.setAttribute(this.line, 'stroke-dasharray', '4');

        this.element = this.renderer.createElement('g', 'svg');
        this.renderer.appendChild(this.element, this.polyline);
        this.renderer.appendChild(this.element, this.line);

        this.fullRender();
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
        this.renderer.setAttribute(this.line, 'x1', `${lastPoint.x}`);
        this.renderer.setAttribute(this.line, 'y1', `${lastPoint.y}`);
        this.renderer.setAttribute(this.line, 'x2', `${this.cursor.x}`);
        this.renderer.setAttribute(this.line, 'y2', `${this.cursor.y}`);
    }

    private renderAnchors() {
        this.renderer.setAttribute(this.polyline,
            'points',
            this.anchors.map((point: Point) => {
                return point.toString();
            }).join(' '));
    }

    setWidth(width: number) {
        this.width = width;
        this.renderer.setAttribute(this.polyline, 'stroke-width', width.toString());
        this.renderer.setAttribute(this.line, 'stroke-width', width.toString());
    }

    setPrimary(color: string) {
        this.renderer.setAttribute(this.polyline, 'stroke', color);
        this.renderer.setAttribute(this.line, 'stroke', color);
    }

    setSecondary(color: string) {
        // NO OP
    }

    isAt(x: number, y: number): boolean {
        const additionnalWidth = 10.0;
        const width: number = this.width + additionnalWidth;
        for (let i = 0; i < this.anchors.length - 1; i++) {
            if (atLine([x, y], [this.anchors[i].toVector(), this.anchors[i + 1].toVector()], width)) {
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
        this.renderer.removeChild(this.line.parentNode, this.line);
        this.renderAnchors();
    }

    popAnchor() {
        this.anchors.pop();
        this.fullRender();
    }
}
