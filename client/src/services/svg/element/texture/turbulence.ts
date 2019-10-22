import { DOMRenderer } from 'src/utils/dom-renderer';
import { SVGBrush } from '../svg.brush';
import { ITexture } from './i-texture';

export class TurbulenceTexture implements ITexture {

    create(brush: SVGBrush): void {
        brush.element = DOMRenderer.createElement('polyline', 'svg');

        DOMRenderer.setAttribute(brush.element, 'fill', 'none');
        DOMRenderer.setAttribute(brush.element, 'stroke-linecap', 'round');
        DOMRenderer.setAttribute(brush.element, 'stroke-linejoin', 'round');

        DOMRenderer.setAttribute(brush.element, 'stroke-width', brush.lineWidth.toString());
        DOMRenderer.setAttribute(brush.element, 'filter', 'url(#turbulence)');
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        DOMRenderer.setAttribute(brush.element, 'points', brush.pointsAttribute());
    }
}
