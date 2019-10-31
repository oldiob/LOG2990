import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { DOMRenderer } from 'src/utils/dom-renderer';

export class SVGText implements SVGInterface {
    element: any;

    constructor(x: number, y: number) {
        this.element = DOMRenderer.createElement('text', 'svg');
        this.element.innerHTML = 'a';
        DOMRenderer.setAttribute(this.element, 'x', x.toString());
        DOMRenderer.setAttribute(this.element, 'y', y.toString());
        console.log('svg text works');
    }
    isAt(x: number, y: number): boolean {
        throw new Error('Method not implemented.');
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
}
