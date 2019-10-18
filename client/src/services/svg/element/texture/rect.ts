import { SVGBrush } from '../svg.brush';
import { ITexture } from './i-texture';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider.service';

export class RectTexture implements ITexture {
    create(brush: SVGBrush): void {
        brush.element = RendererProvider.renderer.createElement('g', 'svg');
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        const rec = RendererProvider.renderer.createElement('rect', 'svg');
        RendererProvider.renderer.setAttribute(rec, 'x', x.toString());
        RendererProvider.renderer.setAttribute(rec, 'y', y.toString());
        RendererProvider.renderer.setAttribute(rec, 'width', brush.lineWidth.toString());
        RendererProvider.renderer.setAttribute(rec, 'height', brush.lineWidth.toString());
        RendererProvider.renderer.appendChild(brush.element, rec);
    }
}
