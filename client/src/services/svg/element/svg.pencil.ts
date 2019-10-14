import { Renderer2 } from '@angular/core';
import { SVGInterface } from './svg.interface';
import { isAtLine } from 'src/utils/math';

export class SVGPencil implements SVGInterface {
    element: any;

    points: number[][] = [];

    lineWidth = 1;

    constructor(private renderer: Renderer2) {
        this.element = this.renderer.createElement('polyline', 'svg');

        this.renderer.setAttribute(this.element, 'fill', 'none');
        this.renderer.setAttribute(this.element, 'stroke-linecap', 'round');
        this.renderer.setAttribute(this.element, 'stroke-linejoin', 'round');
    }

    isAt(x: number, y: number): boolean {
        const WIDTH_MARGIN = 10.0;
        const width: number = this.lineWidth + WIDTH_MARGIN;
        for (let i = 0; i < this.points.length - 1; i++) {
            if (isAtLine([x, y], [this.points[i], this.points[i + 1]], width)) {
                return true;
            }
        }

        return false;
    }
    isIn(x: number, y: number, r: number): boolean {
        return false;
    }

    setPrimary(color: string): void {
        this.renderer.setAttribute(this.element, 'stroke', color);
    }

    setSecondary(color: string): void {
        // NO OP
    }

    setWidth(width: number): void {
        this.lineWidth = width;
        this.renderer.setAttribute(this.element, 'stroke-width', width.toString());
    }

    addPoint(x: number, y: number): void {
        this.points.push([x, y]);
        this.renderer.setAttribute(this.element, 'points', this.pointsAttribute());
    }

    // [[1, 2], [3, 4]] -> 1,2 3,4
    private pointsAttribute(): string {
        return this.points.map((e) => `${e[0]},${e[1]}`).join(' ');
    }
}
