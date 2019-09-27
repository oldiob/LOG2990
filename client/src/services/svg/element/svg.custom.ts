import { Renderer2 } from '@angular/core';
import { SVGInterface } from './svg.interface';

export class SVGCustom implements SVGInterface {
    element: any;

    previousX = 0;
    previousY = 0;

    isFilterIni = false;

    filterBlur: any;
    filterBlurContent: any;
    parent: any;

    points: number[][];

    lineWidth: number;

    constructor(private renderer: Renderer2) {
        if (!this.isFilterIni) {
          this.isFilterIni = true;
          this.iniFilters();
        }
        this.points = [];
        this.element = this.renderer.createElement('g', 'svg');

    }
    iniFilters() {
        this.filterBlur = this.renderer.createElement('filter', 'svg');
        this.renderer.setAttribute(this.filterBlur, 'id', 'blur');
        this.filterBlurContent = this.renderer.createElement('feGaussianBlur', 'svg');
        this.renderer.setAttribute(this.filterBlurContent, 'stdDeviation', '2');
        this.renderer.appendChild(this.filterBlur, this.filterBlurContent);
    }

    isAt(x: number, y: number): boolean {
        if (this.points.length === 0) {
            // should never happen, but to avoid mistakes
            return false;
        }

        let halfWidthSquared: number = (this.lineWidth * this.lineWidth) / 4.0 ;

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
                console.log('IS AT');
                return true;
            }

            const parallel = this.project(toCoordVector, directionVector);
            const perpendicular = [toCoordVector[0] - parallel[0], toCoordVector[1] - parallel[1]];

            const perpendicularDistanceSquared = (perpendicular[0] * perpendicular[0] + perpendicular[1] * perpendicular[1]);
            if (perpendicularDistanceSquared <= halfWidthSquared) {
                const lenRatio: number = parallel[0] / directionVector[0];
                if (lenRatio <= 1.0 && lenRatio >= 0.0) {
                    console.log('IS AT');
                    return true;
                }
            }

            point0 = point1;
        }

        console.log('IS NOT AT');
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

        this.paintBrushII(x, y);

        this.renderer.setAttribute(this.element, 'points', this.pointsAttribute());
    }

    paintBrush(x: number, y: number): void {
      const radius = this.lineWidth;
      const circle = this.renderer.createElement('circle', 'svg');
      this.renderer.setAttribute(circle, 'cx', x.toString());
      this.renderer.setAttribute(circle, 'cy', y.toString());
      this.renderer.setAttribute(circle, 'r', radius.toString());
      this.renderer.setAttribute(circle, 'fill', 'none');
      this.renderer.setAttribute(circle, 'stroke', 'black');
      this.renderer.appendChild(this.element, circle);
    }

    paintBrushII(x: number, y: number): void {
      const radius = this.lineWidth;
      if (Math.abs(x - this.previousX) >= radius || Math.abs(y - this.previousY) >=  radius) {
        this.previousX = x;
        this.previousY = y;
        this.paintBrush(x, y);
        this.paintBrush(x - radius*2, y);
        this.paintBrush(x + radius*2, y);
        this.paintBrush(x, y - radius*2);
        this.paintBrush(x, y + radius*2);
      }
    }


    // [[1, 2], [3, 4]] -> 1,2 3,4
    private pointsAttribute(): string {
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
