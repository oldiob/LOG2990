import { SVGBrush } from '../svg.brush';
import { ITexture } from './i-texture';

export class TurbulenceTexture implements ITexture {

    create(brush: SVGBrush): void {
        brush.element = brush.renderer.createElement('polyline', 'svg');

        brush.renderer.setAttribute(brush.element, 'fill', 'none');
        brush.renderer.setAttribute(brush.element, 'stroke-linecap', 'round');
        brush.renderer.setAttribute(brush.element, 'stroke-linejoin', 'round');

        brush.renderer.setAttribute(brush.element, 'stroke-width', brush.lineWidth.toString());
        brush.renderer.setAttribute(brush.element, 'filter', 'url(#turbulence)');
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        brush.renderer.setAttribute(brush.element, 'points', brush.pointsAttribute());
    }
}
