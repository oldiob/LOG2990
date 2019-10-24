import { DOMRenderer } from 'src/utils/dom-renderer';
import { isAtLine } from 'src/utils/math';
import { SVGInterface } from './svg.interface';
import { ITexture } from './texture/i-texture';

export class SVGBrush implements SVGInterface {
    element: any;

    previousX = 0;
    previousY = 0;

    points: number[][];

    lineWidth: number;

    texture: ITexture;

    constructor(width: number, texture: ITexture) {
        this.points = [];
        this.lineWidth = width;
        this.texture = texture;

        this.texture.create(this);
    }

    isAt(x: number, y: number): boolean {
        const additionnalWidth = 10.0;
        const width: number = this.lineWidth + additionnalWidth;
        for (let i = 0; i < this.points.length - 1; i++) {
            if (isAtLine([x, y], this.points[i], this.points[i + 1], width)) {
                return true;
            }
        }

        return false;
    }
    isIn(x: number, y: number, r: number): boolean {
        const tempWidth = this.lineWidth;
        this.lineWidth = r;
        const isInside = this.isAt(x, y);
        this.lineWidth = tempWidth;

        return isInside;
    }

    getPrimary(): string {
        return this.element.getAttribute('stroke');
    }

    getSecondary(): string {
        return '';
    }

    setPrimary(color: string): void {
        DOMRenderer.setAttribute(this.element, 'stroke', color);
    }
    setSecondary(color: string): void {
        // No secondary for brush
    }

    setWidth(width: number): void {
        this.lineWidth = width;
        DOMRenderer.setAttribute(this.element, 'stroke-width', width.toString());
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
