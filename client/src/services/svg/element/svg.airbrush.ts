import { DOMRenderer } from 'src/utils/dom-renderer';
import { Point } from 'src/utils/geo-primitives';
import { SVGAbstract } from './svg.abstract';

export class SVGAirbrush extends SVGAbstract {
    element: any;
    readonly MAX_ANGLE = 360;
    readonly POINT_RADIUS = 1;

    constructor(x: number, y: number) {
        super();

        this.element = DOMRenderer.createElement('g', 'svg');
        DOMRenderer.setAttribute(this.element, 'x', x.toString());
        DOMRenderer.setAttribute(this.element, 'y', y.toString());
    }

    spray(rate: number, diameter: number, x: number, y: number): void {
        for (let i = 0; i < rate; i++) {
            const point = this.getRandomPointCercle(x, y, diameter);
            const singlePoint = DOMRenderer.createElement('circle', 'svg');
            DOMRenderer.setAttribute(singlePoint, 'cx', point.x.toString());
            DOMRenderer.setAttribute(singlePoint, 'cy', point.y.toString());
            DOMRenderer.setAttribute(singlePoint, 'r', (this.POINT_RADIUS).toString());
            DOMRenderer.appendChild(this.element, singlePoint);
        }
    }
    getRandomPointCercle(x0: number, y0: number, diameter: number): Point {
        const maxR = diameter / 2;
        const r = this.getRandom(maxR);
        const t = this.getRandom(this.MAX_ANGLE);
        const x = x0 + r * Math.cos(t);
        const y = y0 + r * Math.sin(t);
        return new Point(x, y);
    }
    getRandom(max: number) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    isIn(x: number, y: number, r: number): boolean {
        throw new Error('Method not implemented.');
    }
    getPrimary(): string {
        throw new Error('Method not implemented.');
    }
    getSecondary(): string {
        return '';
    }
    setPrimary(color: string): void {
        DOMRenderer.setAttribute(this.element, 'fill', color);
    }
    setSecondary(color: string): void {
        //
    }
    protected isAtAdjusted(x: number, y: number): boolean {
        throw new Error('Method not implemented.');
    }
}
