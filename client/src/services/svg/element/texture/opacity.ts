import { SVGBrush } from '../svg.brush';
import { ITexture } from './i-texture';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider';

export class OpacityTexture implements ITexture {

    create(brush: SVGBrush): void {
        brush.element = RendererProvider.renderer.createElement('polyline', 'svg');

        RendererProvider.renderer.setAttribute(brush.element, 'fill', 'none');
        RendererProvider.renderer.setAttribute(brush.element, 'stroke-linecap', 'round');
        RendererProvider.renderer.setAttribute(brush.element, 'stroke-linejoin', 'round');

        RendererProvider.renderer.setAttribute(brush.element, 'stroke-width', brush.lineWidth.toString());
        RendererProvider.renderer.setAttribute(brush.element, 'filter', 'url(#opacity)');
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        RendererProvider.renderer.setAttribute(brush.element, 'points', brush.pointsAttribute());
    }
}
