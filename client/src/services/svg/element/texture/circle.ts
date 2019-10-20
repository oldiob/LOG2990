import { SVGBrush } from '../svg.brush';
import { ITexture } from './i-texture';
import { DOMRenderer } from 'src/utils/dom-renderer';

export class CircleTexture implements ITexture {
    create(brush: SVGBrush): void {
        brush.element = DOMRenderer.createElement('g', 'svg');
    }
    addPoint(brush: SVGBrush, x: number, y: number): void {
        const radius = brush.lineWidth;
        const circle = DOMRenderer.createElement('circle', 'svg');
        DOMRenderer.setAttribute(circle, 'cx', x.toString());
        DOMRenderer.setAttribute(circle, 'cy', y.toString());
        DOMRenderer.setAttribute(circle, 'r', radius.toString());
        DOMRenderer.setAttribute(circle, 'fill', 'none');
        DOMRenderer.appendChild(brush.element, circle);
    }
}
