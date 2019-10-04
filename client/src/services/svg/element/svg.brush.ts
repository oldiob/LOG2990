import { Renderer2 } from '@angular/core';
import { SVGInterface } from './svg.interface';
import { ITexture } from './texture/i-texture';
import { atLine } from 'src/utils/math';

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

    /**
     * Projects v0 vector onto v1 vector
     */
    private project(v0: number[], v1: number[]): number[] {
        const dot: number = v0[0] * v1[0] + v0[1] * v1[1];
        const moduleSquare: number = v1[0] * v1[0] + v1[1] * v1[1];

        const ratio = dot / moduleSquare;

        return [ratio * v1[0], ratio * v1[1]];
    }
}
