import { Renderer2 } from '@angular/core';
import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { TraceType } from 'src/services/tool/tool-options/i-shape-tool';

export class SVGRect implements SVGInterface {
    element: any;

    x1: number;
    y1: number;

    x2: number;
    y2: number;

    pointSize = 1;
    stroke = true;
    fill = true;

    constructor(x: number, y: number, private renderer: Renderer2) {
        this.element = this.renderer.createElement('polygon', 'svg');
        this.x1 = this.x2 = x;
        this.y1 = this.y2 = y;
        this.renderer.setAttribute(this.element, 'fill', 'none');
        this.renderer.setAttribute(this.element, 'x', `${this.x1}`);
        this.renderer.setAttribute(this.element, 'y', `${this.y1}`);
    }

    isAt(x: number, y: number): boolean {
        // Find maximum and minimum values
        const minX: number = Math.min(this.x1, this.x2);
        const maxX: number = Math.max(this.x1, this.x2);
        const minY: number = Math.min(this.y1, this.y2);
        const maxY: number = Math.max(this.y1, this.y2);
        return (minX <= x && x <= maxX && minY <= y && y <= maxY);
    }

    isIn(x: number, y: number, r: number): boolean {
        return true;
    }
    setPrimary(color: string): void {
        if (this.fill) {
            this.renderer.setAttribute(this.element, 'fill', color);
        }

    }
    setSecondary(color: string): void {
        if (this.stroke) {
            this.renderer.setAttribute(this.element, 'stroke', color);
        }
    }
    setPointSize(pointSize: number): void {
        this.pointSize = pointSize;
        this.renderer.setAttribute(this.element, 'stroke-width', this.pointSize.toString());
    }
    setTraceType(traceType: TraceType): void {
        switch (traceType) {
            case TraceType.BorderOnly:
                this.fill = false;
                this.stroke = true;
                this.renderer.setAttribute(this.element, 'fill-opacity', '0');
                this.renderer.setAttribute(this.element, 'stroke-opacity', '1');
                break;
            case TraceType.FillOnly:
                this.fill = true;
                this.stroke = false;
                this.renderer.setAttribute(this.element, 'fill-opacity', '1');
                this.renderer.setAttribute(this.element, 'stroke-opacity', '0');
                break;
            case TraceType.FillAndBorder:
                this.fill = true;
                this.stroke = true;
                this.renderer.setAttribute(this.element, 'fill-opacity', '1');
                this.renderer.setAttribute(this.element, 'stroke-opacity', '1');
                break;
        }
    }
    setCursor(x: number, y: number, shift: boolean) {
        if (shift) {
            const diffX = x - this.x1;
            const diffY = y - this.y1;
            if (Math.abs(diffX) < Math.abs(diffY)) {
                y = this.y1 + Math.abs(diffX) * Math.sign(diffY);
            } else {
                x = this.x1 + Math.abs(diffY) * Math.sign(diffX);
            }
        }
        this.x2 = x;
        this.y2 = y;
        this.renderer.setAttribute(this.element, 'points', `${this.x1},${this.y1}
                                                            ${this.x2},${this.y1}
                                                            ${this.x2},${this.y2}
                                                            ${this.x1},${this.y2}`);
    }
}
