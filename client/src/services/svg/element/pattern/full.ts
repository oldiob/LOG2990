import { SVGLine } from '../svg.line';
import { IPattern } from './i-pattern';

export class FullMotif implements IPattern {
    create(line: SVGLine): void {
        line.element = line.renderer.createElement('g', 'svg');
    }
    addPoint(line: SVGLine, x: number, y: number): void {
        const lineLine = line.renderer.createElement('line', 'svg');
        const polyline = line.renderer.createElement('polyline', 'svg');
        line.renderer.setAttribute(lineLine, 'fill', 'none');
        line.renderer.setAttribute(lineLine, 'stroke-dasharray', '4');

        line.renderer.setAttribute(polyline, 'fill', 'none');

        line.renderer.appendChild(line.element, polyline);
        line.renderer.appendChild(line.element, line);
    }
}
