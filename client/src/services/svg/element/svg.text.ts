import { SVGInterface } from 'src/services/svg/element/svg.interface';
import { DOMRenderer } from 'src/utils/dom-renderer';

export class SVGText implements SVGInterface {
  element: any;
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
    constructor() {
      const textElement = DOMRenderer.createElement('rect', 'svg');
    }
}
