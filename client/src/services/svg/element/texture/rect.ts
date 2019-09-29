import { SVGBrush } from '../svg.brush';
import { ITexture } from './i-texture';

export class RectTexture implements ITexture {
    create(brush: SVGBrush): void {
        brush.element = brush.renderer.createElement('g', 'svg');
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        const rec = brush.renderer.createElement('rect', 'svg');
        brush.renderer.setAttribute(rec, 'x', x.toString());
        brush.renderer.setAttribute(rec, 'y', y.toString());
        brush.renderer.setAttribute(rec, 'width', brush.lineWidth.toString());
        brush.renderer.setAttribute(rec, 'height', brush.lineWidth.toString());
        brush.renderer.appendChild(brush.element, rec);
    }
}
