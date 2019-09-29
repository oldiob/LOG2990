import { SVGBrush } from '../svg.brush';
import { ITexture } from './i-texture';

export class CircleTexture implements ITexture {
    create(brush: SVGBrush): void {
        brush.element = brush.renderer.createElement('g', 'svg');
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        const radius = brush.lineWidth;
        const circle = brush.renderer.createElement('circle', 'svg');
        brush.renderer.setAttribute(circle, 'cx', x.toString());
        brush.renderer.setAttribute(circle, 'cy', y.toString());
        brush.renderer.setAttribute(circle, 'r', radius.toString());
        brush.renderer.setAttribute(circle, 'fill', 'none');
        brush.renderer.appendChild(brush.element, circle);
    }
}