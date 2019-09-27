import { SVGInterface } from './svg.interface';
import { Renderer2 } from '@angular/core';

export class SVGPencil implements SVGInterface {
    element: any;

    points: number[][];

    constructor(private renderer: Renderer2) {
        this.element = this.renderer.createElement('polyline');

        this.renderer.setAttribute(this.element, 'fill', 'none');
        this.renderer.setAttribute(this.element, 'stroke-linecap', 'round');     
        this.renderer.setAttribute(this.element, 'stroke-linejoin', 'round');        
    }


    isAt(x: number, y: number): boolean {
        return false;
    }
    isIn(x: number, y: number, r: number): boolean {
        return false;
    }
    setPrimary(color: string): void {
        this.renderer.setAttribute(this.element, 'stroke', color);        
    }
    setSecondary(color: string): void {
        return;
    }

    setThickness(thickness: string): void {
        this.renderer.setAttribute(this.element, 'stroke-width', thickness);
    }

    addPoint(x: number, y: number): void {
        this.points.push([x, y]);

        this.renderer.setAttribute(this.element, 'points', this.pointsAttribute());
    }

    // [[1, 2], [3, 4]] -> 1,2 3,4
    private pointsAttribute(): string {
        return this.points.map(e => e.join(',')).join(' ');
    }
}