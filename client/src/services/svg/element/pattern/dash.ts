import { SVGLine } from '../svg.line';
import { IPattern } from './i-pattern';

export class DashMotif implements IPattern {
    create(line: SVGLine): void {
        console.log('DASH');
        line.element = line.renderer.createElement('g', 'svg');
        const lineLine = line.renderer.createElement('line', 'svg');
        const polyline = line.renderer.createElement('polyline', 'svg');
        line.renderer.setAttribute(lineLine, 'fill', 'none');
        line.renderer.setAttribute(lineLine, 'stroke-dasharray', '4');

        line.renderer.setAttribute(polyline, 'fill', 'none');
        line.renderer.setAttribute(polyline, 'stroke-dasharray', '4');

        line.renderer.appendChild(line.element, polyline);
        line.renderer.appendChild(line.element, line);
    }
}
