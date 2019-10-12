import { Renderer2 } from '@angular/core';
import { IStamp } from './stamp/i-stamp';
import { SVGInterface } from './svg.interface';

export class SVGStamp implements SVGInterface {
    element: any;

    previousX = 0;
    previousY = 0;

    points: number[][];

    lineWidth: number;

    stampTexture: IStamp;
    icons: string[];
    constructor(public renderer: Renderer2, width: number, stamp: IStamp) {
        this.points = [];
        this.lineWidth = width;
        this.stampTexture = stamp;
        this.icons = [];
        this.stampTexture.create(this);
    }

    isAt(x: number, y: number): boolean {
        if (this.points.length === 0) {
            // should never happen, but to avoid mistakes
            return false;
        }

        let halfWidthSquared: number = (this.lineWidth * this.lineWidth) / 4.0;

        // width min 4
        if (halfWidthSquared < 16.0) {
            halfWidthSquared = 16.0;
        }

        let point0: number[] = this.points[0];
        for (let i = 1; i < this.points.length; i++) {
            const point1 = this.points[i];
            const directionVector = [point1[0] - point0[0], point1[1] - point0[1]];

            const toCoordVector = [x - point0[0], y - point0[1]];
            const toCoordDistanceSquared = toCoordVector[0] * toCoordVector[0] + toCoordVector[1] * toCoordVector[1];

            // Check is coords are close enough to a cordner
            if (toCoordDistanceSquared <= halfWidthSquared) {
                return true;
            }

            const parallel = this.project(toCoordVector, directionVector);
            const perpendicular = [toCoordVector[0] - parallel[0], toCoordVector[1] - parallel[1]];

            const perpendicularDistanceSquared = (perpendicular[0] * perpendicular[0] + perpendicular[1] * perpendicular[1]);
            if (perpendicularDistanceSquared <= halfWidthSquared) {
                const lenRatio: number = parallel[0] / directionVector[0];
                if (lenRatio <= 1.0 && lenRatio >= 0.0) {
                    return true;
                }
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
        this.icons.push('./assets/images/emoji.png');
        this.icons.push('./assets/images/angel.png');
        this.stampTexture.addPoint(this.icons[0], this, x, y);
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
