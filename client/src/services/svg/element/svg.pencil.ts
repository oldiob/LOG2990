import { Renderer2 } from '@angular/core';
import { SVGInterface } from './svg.interface';
import { atLine } from 'src/utils/math';

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

        const invisibleBorder = 10.0;
        const width: number = this.lineWidth + invisibleBorder;

        let point0: number[] = this.points[0];
        for (let i = 1; i < this.points.length; i++) {
            const point1 = this.points[i];

            if (atLine([x, y], [point0, point1], width)) {
                return true;
            }

            point0 = point1;
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
        // No secondary for the pencil
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
