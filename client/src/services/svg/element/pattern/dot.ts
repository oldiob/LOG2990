import { SVGLine } from '../svg.line';
import { IPattern } from './i-pattern';

export class DotMotif implements IPattern {
    create(line: SVGLine): void {
        // line.element = line.renderer.createElement('g', 'svg');
        console.log('DOT');
        line.element = line.renderer.createElement('g', 'svg');
        const lineLine = line.renderer.createElement('line', 'svg');
        const polyline = line.renderer.createElement('polyline', 'svg');
        line.renderer.setAttribute(lineLine, 'fill', 'none');
        line.renderer.setAttribute(lineLine, 'stroke-dasharray', '4');

        line.renderer.setAttribute(polyline, 'fill', 'none');
        line.renderer.setAttribute(polyline, 'stroke-dasharray', '0.1 10');
        line.renderer.setAttribute(polyline, 'stroke-linecap', 'round');

        line.renderer.appendChild(line.element, polyline);
        line.renderer.appendChild(line.element, line);
    }
}
