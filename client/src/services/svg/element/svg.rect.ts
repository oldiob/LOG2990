import { Renderer2 } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';

export class SVGRect implements SVGInterface {
    element: any;

    private x1: number;
    private y1: number;

    private x2: number;
    private y2: number;

    private pointSize: number;
    private strokeOpacity: number;
    private fillOpacity: number;

    constructor(x: number, y: number, private renderer: Renderer2) {
        this.element = this.renderer.createElement('rect', 'svg');
        this.x1 = this.x2 = x;
        this.y1 = this.y2 = y;
        this.pointSize = 1;
        this.strokeOpacity = 1;
        this.fillOpacity = 1;
        this.renderer.setAttribute(this.element, 'fill', 'none');
        this.renderer.setAttribute(this.element, 'x', `${this.x1}`);
        this.renderer.setAttribute(this.element, 'y', `${this.y1}`);
    }

    isAt(x: number, y: number): boolean {
        let minX: number = this.x1;
        let maxX: number = this.x2;
        let minY: number = this.y1;
        let maxY: number = this.y2;
        if (minX > maxX) {
            const tmp: number = minX;
            minX = maxX;
            maxX = tmp;
        }
        if (minY > maxY) {
            const tmp: number = minY;
            minY = maxY;
            maxY = tmp;
        }
        return (minX <= x && x <= maxX && minY <= y && y <= maxY);
    }
    isIn(x: number, y: number, r: number): boolean {
        return true;
    }
    setPrimary(color: string): void {
        this.renderer.setAttribute(this.element, 'fill', color);

    }
    setSecondary(color: string): void {
        this.renderer.setAttribute(this.element, 'stroke', color);
    }
    setPointSize(pointSize: number): void {
        this.pointSize = pointSize;
        this.renderer.setAttribute(this.element, 'stroke-width', this.pointSize.toString());
    }
    setFillOpacity(fillOpacity: number): void {
        this.fillOpacity = fillOpacity;
    }
    setStrokeOpacity(strokeOpacity: number): void {
        this.strokeOpacity = strokeOpacity;
    }
    setTraceType(traceType: number): void {
        if (traceType === 0) {
            this.setFillOpacity(0);
            this.renderer.setAttribute(this.element, 'fill-opacity', this.fillOpacity.toString());
            this.renderer.setAttribute(this.element, 'stroke-opacity', this.strokeOpacity.toString());
        } else if (traceType === 1) {
            this.setStrokeOpacity(0);
            this.renderer.setAttribute(this.element, 'fill-opacity', this.fillOpacity.toString());
            this.renderer.setAttribute(this.element, 'stroke-opacity', this.strokeOpacity.toString());
        } else if (traceType === 2) {
            this.renderer.setAttribute(this.element, 'fill-opacity', this.fillOpacity.toString());
            this.renderer.setAttribute(this.element, 'stroke-opacity', this.strokeOpacity.toString());
        } else {
            this.setFillOpacity(0);
            this.renderer.setAttribute(this.element, 'fill-opacity', this.fillOpacity.toString());
            this.renderer.setAttribute(this.element, 'stroke-opacity', this.strokeOpacity.toString());
        }
    }
    setCursor(x: number, y: number) {
        this.x2 = x;
        this.y2 = y;
        let minX: number = this.x1;
        let maxX: number = this.x2;
        let minY: number = this.y1;
        let maxY: number = this.y2;
        if (minX > maxX) {
            const tmp: number = minX;
            minX = maxX;
            maxX = tmp;
        }
        if (minY > maxY) {
            const tmp: number = minY;
            minY = maxY;
            maxY = tmp;
        }
        this.renderer.setAttribute(this.element, 'x', `${minX}`);
        this.renderer.setAttribute(this.element, 'y', `${minY}`);
        this.renderer.setAttribute(this.element, 'width', `${maxX - minX}`);
        this.renderer.setAttribute(this.element, 'height', `${maxY - minY}`);
    }
}
