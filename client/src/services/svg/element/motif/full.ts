import { SVGLine } from '../svg.line';
import { IMotif } from './i-motif';

export class FullMotif implements IMotif {
    create(line: SVGLine, polyline: SVGLine, fullline: SVGLine): void {
        line.element = line.renderer.createElement('line', 'svg');
        polyline.element = polyline.renderer.createElement('polyline', 'svg');
        fullline.element = fullline.renderer.createElement('g', 'svg');
    }
    addPoint(line: SVGLine, polyline: SVGLine, fullline: SVGLine, x: number, y: number): void {
        line.renderer.setAttribute(line.element, 'fill', 'none');
        line.renderer.setAttribute(line.element, 'stroke-dasharray', '4');

        polyline.renderer.setAttribute(polyline.element, 'fill', 'none');

        fullline.renderer.appendChild(fullline.element, polyline);
        fullline.renderer.appendChild(fullline.element, line);
    }
}
