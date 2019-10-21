import { SVGBrush } from '../svg.brush';
import { ITexture } from './i-texture';
import { DOMRenderer } from 'src/utils/dom-renderer';

export class RectTexture implements ITexture {
    create(brush: SVGBrush): void {
        brush.element = DOMRenderer.createElement('g', 'svg');
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        const rec = DOMRenderer.createElement('rect', 'svg');
        DOMRenderer.setAttribute(rec, 'x', x.toString());
        DOMRenderer.setAttribute(rec, 'y', y.toString());
        DOMRenderer.setAttribute(rec, 'width', brush.lineWidth.toString());
        DOMRenderer.setAttribute(rec, 'height', brush.lineWidth.toString());
        DOMRenderer.appendChild(brush.element, rec);
    }
}
