import { SVGBrush } from '../svg.brush';
import { ITexture } from './i-texture';
import { RendererProvider } from 'src/services/renderer-provider/renderer-provider.service';

export class CircleTexture implements ITexture {
    create(brush: SVGBrush): void {
        brush.element = RendererProvider.renderer.createElement('g', 'svg');
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        const radius = brush.lineWidth;
        const circle = RendererProvider.renderer.createElement('circle', 'svg');
        RendererProvider.renderer.setAttribute(circle, 'cx', x.toString());
        RendererProvider.renderer.setAttribute(circle, 'cy', y.toString());
        RendererProvider.renderer.setAttribute(circle, 'r', radius.toString());
        RendererProvider.renderer.setAttribute(circle, 'fill', 'none');
        RendererProvider.renderer.appendChild(brush.element, circle);
    }
}
