import { Renderer2 } from '@angular/core';
import { SVGInterface } from './svg.interface';
import { ITexture } from './texture/i-texture';
import { isAtLine } from 'src/utils/math';

export class SVGBrush implements SVGInterface {
    element: any;

    previousX = 0;
    previousY = 0;

    points: number[][];

    lineWidth: number;

    texture: ITexture;

    constructor(public renderer: Renderer2, width: number, texture: ITexture) {
        this.points = [];
        this.lineWidth = width;
        this.texture = texture;

        this.texture.create(this);
    }

    isAt(x: number, y: number): boolean {
        const additionnalWidth = 10.0;
        const width: number = this.lineWidth + additionnalWidth;
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
        // No secondary for brush
    }

    setWidth(width: number): void {
        this.lineWidth = width;
        this.renderer.setAttribute(this.element, 'stroke-width', width.toString());
    }

    addPoint(x: number, y: number): void {
        this.points.push([x, y]);

        this.texture.addPoint(this, x, y);
    }

    // [[1, 2], [3, 4]] -> 1,2 3,4
    pointsAttribute(): string {
        return this.points.map((e) => e.join(',')).join(' ');
    }
}
