import { DOMRenderer } from 'src/utils/dom-renderer';
import { SVGAbstract } from './svg.interface';

export class SVGAirbrush extends SVGAbstract {
    element: any;

    constructor(x: number, y: number) {
        super();

        this.element = DOMRenderer.createElement('g', 'svg');
        DOMRenderer.setAttribute(this.element, 'x', x.toString());
        DOMRenderer.setAttribute(this.element, 'y', y.toString());

    }
    spree(rate: number, diameter: number, x: number, y: number): void {
      for (let i = 0; i < rate; i++) {
        const point = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(point, 'x', x.toString());
        DOMRenderer.setAttribute(point, 'y', y.toString());
        DOMRenderer.appendChild(this.element, point);
      }
    }
    isIn(x: number, y: number, r: number): boolean {
      throw new Error('Method not implemented.');
    }
    getPrimary(): string {
      throw new Error('Method not implemented.');
    }
    getSecondary(): string {
      throw new Error('Method not implemented.');
    }
    setPrimary(color: string): void {
      throw new Error('Method not implemented.');
    }
    setSecondary(color: string): void {
      throw new Error('Method not implemented.');
    }
    protected isAtAdjusted(x: number, y: number): boolean {
      throw new Error('Method not implemented.');
    }

}
